export class Course {
    key: string;
    nume: string;
    curs: boolean;
    laborator: boolean;
    seminar: boolean;
    proiect: boolean;

    constructor() {
        this.curs = true;
        this.laborator = false;
        this.seminar = false;
        this.proiect = false;
    }
}
