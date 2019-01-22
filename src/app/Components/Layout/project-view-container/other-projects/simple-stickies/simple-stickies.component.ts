import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { code } from 'src/app/Models/SourceCode.model';
import { MatDialog } from '@angular/material';
import { SourceCodeViewComponent } from 'src/app/source-code-view/source-code-view.component';
import { SourceCodeService } from 'src/app/Services/source-code.service';
import * as faker from '../../../../../faker.js';
import { Post } from './post';
import { AnimationBuilder, style, animate } from '@angular/animations';


@Component({
  selector: 'app-simple-stickies',
  templateUrl: './simple-stickies.component.html',
  styleUrls: ['./simple-stickies.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class SimpleStickiesComponent implements OnInit {
  posts: any;
  batch = 20;
  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  snapshot;
  postDoc: AngularFirestoreDocument<Post>;

  postsCollection: AngularFirestoreCollection<Post>;

  newContent = "type note here";



  sourceCode = [
    ['notes.component.html', code.stickies.html],
    ['notes.component.scss', code.stickies.scss],
    ['notes.component.ts', code.stickies.ts]];

  constructor(private db: AngularFirestore, private dialog: MatDialog, private service: SourceCodeService,
    private _builder: AnimationBuilder) {
    this.service.currentSourceCode = this.sourceCode;
  }
  ngOnInit() {
    this.postsCollection = this.db.collection('posts', ref => ref.orderBy('date', 'desc'));
    this.posts = this.postsCollection.valueChanges();
    this.snapshot = this.postsCollection.snapshotChanges().subscribe(res => {
      this.snapshot = res;
      console.log(this.snapshot);
    });
  }

  // used by angular ngFor to compare and re-render only items in the loop which has changed
  trackByIdx(i) {
    return i;
  }

  addPost() {
    let randomName = faker.name.findName();
    let paragraph = faker.lorem.paragraph();
    let profileUrl: string = faker.internet.avatar();
    // profileUrl = 'https' + profileUrl.substring(5);
    let postType = faker.random.number() % 2 === 0 ? 'text' : 'img';
    console.log(profileUrl);
    console.log(randomName);
    console.log(paragraph);
    let date = new Date();
    let postToAdd: Post = new Post(randomName, profileUrl, date.toISOString(), paragraph, faker.random.image(), postType, '');
    // "", this.newContent, , 'incomplete', 'yellow');


    this.postsCollection.add({ ...postToAdd });
    // this.notesCollection.get()
  }

  displayId(x) {
    console.log(x);
  }

  liked(index) {
    let id = this.snapshot[index].payload.doc.id;
    this.postDoc = this.db.doc('posts/' + id);
    this.postsCollection.doc(id).get().subscribe(res => {
      let post: Post = { ...res.data() } as Post;
      post.liked = !post.liked;
      this.postDoc.set(post);
    }
    );
  }

  changeColor(index, color) {
  

    // get noteRef at this id
    let id = this.snapshot[index].payload.doc.id;
    this.postDoc = this.db.doc('posts/' + id);
    // subscribe to this note, cast it as a new one, and update it
    let newPost: Post;
    this.postsCollection.doc(id).get().subscribe(res => {
      newPost = res.data() as Post;
      newPost.color = color;
      this.postDoc.set(newPost);

    });


  }
  deleteNote(index) {
    // get noteRef at this id
    let id = this.snapshot[index].payload.doc.id;
    this.postsCollection.doc(id).delete();
  }

  updateNote(index, post: Post) {
    console.log('inside updatepost');
    let id = this.snapshot[index].payload.doc.id;
    this.postDoc = this.db.doc('posts/' + id);
    this.postsCollection.doc(id).get().subscribe(res => {
      this.postDoc.set(post);
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
