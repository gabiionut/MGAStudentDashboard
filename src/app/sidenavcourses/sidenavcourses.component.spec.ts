import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavcoursesComponent } from './sidenavcourses.component';

describe('SidenavcoursesComponent', () => {
  let component: SidenavcoursesComponent;
  let fixture: ComponentFixture<SidenavcoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavcoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavcoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

