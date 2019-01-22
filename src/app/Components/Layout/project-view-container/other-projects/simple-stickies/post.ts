export class Post {
    // noteId: number;
    name: string;
    profileUrl: string;
    date: string;
    post: string;
    img: string;
    postType: string;
    color: string;
    liked: boolean;

    constructor(name: string, profileUrl: string, date: string, post: string, img: string, postType: string, color: string) {
        this.name = name;
        this.profileUrl = profileUrl;
        this.date = date;
        this.post = post;
        this.img = img;
        this.postType = postType;
        this.color = color;

    }

    // this.noteId = noteId;
}
