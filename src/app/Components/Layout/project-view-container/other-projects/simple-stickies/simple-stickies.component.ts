import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Note } from './note';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { code } from 'src/app/Models/SourceCode.model';
import { MatDialog } from '@angular/material';
import { SourceCodeViewComponent } from 'src/app/source-code-view/source-code-view.component';
import { SourceCodeService } from 'src/app/Services/source-code.service';

@Component({
  selector: 'app-simple-stickies',
  templateUrl: './simple-stickies.component.html',
  styleUrls: ['./simple-stickies.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class SimpleStickiesComponent implements OnInit {
  notes: any;
  batch = 20;
  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  snapshot;
  noteDoc: AngularFirestoreDocument<Note>;

  notesCollection: AngularFirestoreCollection<Note>;

  newContent = "type note here";



  sourceCode = [
    ['notes.component.html', code.stickies.html],
    ['notes.component.scss', code.stickies.scss],
    ['notes.component.ts', code.stickies.ts]];

  constructor(private db: AngularFirestore, private dialog: MatDialog, private service: SourceCodeService) {
    this.service.currentSourceCode = this.sourceCode;

  }

  ngOnInit() {
    this.notesCollection = this.db.collection('notes', ref => ref.orderBy('stickydate', 'desc'));
    this.notes = this.notesCollection.valueChanges();
    this.snapshot = this.notesCollection.snapshotChanges().subscribe(res => {
      this.snapshot = res;
      console.log(this.snapshot);
    });
  }

  // used by angular ngFor to compare and re-render only items in the loop which has changed
  trackByIdx(i) {
    return i;
  }

  addNote() {
    let date = new Date();
    let noteToAdd: Note = new Note("", this.newContent, date.toISOString(), 'incomplete', 'yellow')
    this.notesCollection.add({ ...noteToAdd });
    // this.notesCollection.get()
  }

  displayId(x) {
    console.log(x);
  }

  changeColor(index, color) {
    // get noteRef at this id
    let id = this.snapshot[index].payload.doc.id;
    this.noteDoc = this.db.doc('notes/' + id);
    // subscribe to this note, cast it as a new one, and update it
    let newNote: Note;
    this.notesCollection.doc(id).get().subscribe(res => {
      newNote = res.data() as Note;
      newNote.color = color;
      this.noteDoc.set(newNote);
    });
  }
  deleteNote(index) {
    // get noteRef at this id
    let id = this.snapshot[index].payload.doc.id;
    this.notesCollection.doc(id).delete();
  }

  updateNote(index, note: Note) {
    console.log('inside updateNote');
    let id = this.snapshot[index].payload.doc.id;
    this.noteDoc = this.db.doc('notes/' + id);
    this.notesCollection.doc(id).get().subscribe(res => {
      this.noteDoc.set(note);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(SourceCodeViewComponent, {
      maxWidth: '100vw',
      width: '80%',
      maxHeight: '100vh',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  close() {
    this.dialog.closeAll();
  }


}
