import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenaraiFaqComponent } from './senarai-faq.component';

describe('SenaraiFaqComponent', () => {
  let component: SenaraiFaqComponent;
  let fixture: ComponentFixture<SenaraiFaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenaraiFaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenaraiFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
