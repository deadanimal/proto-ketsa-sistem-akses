import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KelulusanPermitComponent } from './kelulusan-permit.component';

describe('KelulusanPermitComponent', () => {
  let component: KelulusanPermitComponent;
  let fixture: ComponentFixture<KelulusanPermitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KelulusanPermitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KelulusanPermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
