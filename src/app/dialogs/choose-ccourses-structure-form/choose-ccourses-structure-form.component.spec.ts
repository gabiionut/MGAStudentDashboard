import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCcoursesStructureFormComponent } from './choose-ccourses-structure-form.component';

describe('ChooseCcoursesStructureFormComponent', () => {
  let component: ChooseCcoursesStructureFormComponent;
  let fixture: ComponentFixture<ChooseCcoursesStructureFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseCcoursesStructureFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseCcoursesStructureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
