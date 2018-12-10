import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  opened = true;
  constructor() { }

  toggle() {
    this.opened = !this.opened;
  }
}
