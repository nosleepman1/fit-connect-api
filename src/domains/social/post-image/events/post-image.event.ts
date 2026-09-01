

export class PostImageEvent {
    constructor(
        public readonly userId: string,
        public readonly postId: string,
        public readonly file: Express.Multer.File,
    ) { }
}