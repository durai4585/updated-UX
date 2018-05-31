import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DribbblePostComponent } from './dribbble-post.component';

describe('DribbblePostComponent', () => {
  let component: DribbblePostComponent;
  let fixture: ComponentFixture<DribbblePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DribbblePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DribbblePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
