export class UploadFile {
    key: string;
    file: File;
    name: string;
    url: string;
    mime: string;
    image: string;
    createdAt: Date = new Date();

    constructor(file: File) {
        this.file = file;
    }
}
