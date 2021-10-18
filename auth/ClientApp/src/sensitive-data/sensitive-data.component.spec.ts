import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensitiveDataComponent } from './sensitive-data.component';

describe('SensitiveDataComponent', () => {
  let component: SensitiveDataComponent;
  let fixture: ComponentFixture<SensitiveDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensitiveDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensitiveDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
