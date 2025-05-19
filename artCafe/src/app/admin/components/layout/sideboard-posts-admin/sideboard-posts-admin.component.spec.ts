import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideboardPostsAdminComponent } from './sideboard-posts-admin.component';

describe('SideboardPostsAdminComponent', () => {
  let component: SideboardPostsAdminComponent;
  let fixture: ComponentFixture<SideboardPostsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideboardPostsAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideboardPostsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
