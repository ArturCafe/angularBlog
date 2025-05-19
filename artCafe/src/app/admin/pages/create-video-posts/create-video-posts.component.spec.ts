import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVideoPostsComponent } from './create-video-posts.component';

describe('CreateVideoPostsComponent', () => {
  let component: CreateVideoPostsComponent;
  let fixture: ComponentFixture<CreateVideoPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateVideoPostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateVideoPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
