import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaklumBalasComponent } from './maklum-balas.component';

describe('MaklumBalasComponent', () => {
  let component: MaklumBalasComponent;
  let fixture: ComponentFixture<MaklumBalasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaklumBalasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaklumBalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
