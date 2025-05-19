import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentaryFormComponent } from './comentary-form.component';

describe('ComentaryFormComponent', () => {
  let component: ComentaryFormComponent;
  let fixture: ComponentFixture<ComentaryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComentaryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComentaryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
