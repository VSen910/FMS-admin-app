import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFaculty } from './create-faculty';

describe('CreateFaculty', () => {
  let component: CreateFaculty;
  let fixture: ComponentFixture<CreateFaculty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFaculty]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFaculty);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
