import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideboardPostComponent } from './sideboard-post.component';

describe('SideboardPostComponent', () => {
  let component: SideboardPostComponent;
  let fixture: ComponentFixture<SideboardPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideboardPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideboardPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
