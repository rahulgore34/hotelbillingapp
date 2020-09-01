import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillSummeryComponent } from './bill-summery.component';

describe('BillSummeryComponent', () => {
  let component: BillSummeryComponent;
  let fixture: ComponentFixture<BillSummeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillSummeryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
