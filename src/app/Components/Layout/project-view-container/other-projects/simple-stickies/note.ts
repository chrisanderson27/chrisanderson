export class Note {
    // noteId: number;
    title: string;
    note: string;
    stickydate: string;
    status: string;
    color: string;

    constructor( title: string, note: string, stickydate: string, status: string, color: string) {
        // this.noteId = noteId;
        this.title = title;
        this.note = note;
        this.stickydate = stickydate;
        this.status = status;
        this.color = color;
    }
}
