export class Course {
    materie: string;
    curs: boolean;
    laborator: boolean;
    seminar: boolean;
    proiect: boolean;

    constructor() {
        this.curs = false;
        this.laborator = false;
        this.seminar = false;
        this.proiect = false;
    }
}