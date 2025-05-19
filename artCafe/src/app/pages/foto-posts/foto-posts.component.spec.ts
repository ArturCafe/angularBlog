import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoPostsComponent } from './foto-posts.component';

describe('FotoPostsComponent', () => {
  let component: FotoPostsComponent;
  let fixture: ComponentFixture<FotoPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FotoPostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FotoPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
