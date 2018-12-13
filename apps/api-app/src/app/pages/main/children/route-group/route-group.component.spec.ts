import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteGroupComponent } from './route-group.component';

describe('RouteGroupComponent', () => {
  let component: RouteGroupComponent;
  let fixture: ComponentFixture<RouteGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
