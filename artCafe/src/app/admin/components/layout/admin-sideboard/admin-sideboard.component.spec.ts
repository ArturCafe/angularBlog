import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSideboardComponent } from './admin-sideboard.component';

describe('AdminSideboardComponent', () => {
  let component: AdminSideboardComponent;
  let fixture: ComponentFixture<AdminSideboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSideboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSideboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
