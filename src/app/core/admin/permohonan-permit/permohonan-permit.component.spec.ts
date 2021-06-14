import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermohonanPermitComponent } from './permohonan-permit.component';

describe('PermohonanPermitComponent', () => {
  let component: PermohonanPermitComponent;
  let fixture: ComponentFixture<PermohonanPermitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermohonanPermitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermohonanPermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
