import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateImagePostsComponent } from './create-image-posts.component';

describe('CreateImagePostsComponent', () => {
  let component: CreateImagePostsComponent;
  let fixture: ComponentFixture<CreateImagePostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateImagePostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateImagePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
