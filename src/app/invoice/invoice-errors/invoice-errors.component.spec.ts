import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceErrorsComponent } from './invoice-errors.component';

describe('InvoiceErrorsComponent', () => {
  let component: InvoiceErrorsComponent;
  let fixture: ComponentFixture<InvoiceErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceErrorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
