import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CySytlesComponent } from './cy-sytles.component';

describe('CySytlesComponent', () => {
  let component: CySytlesComponent;
  let fixture: ComponentFixture<CySytlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CySytlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CySytlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
