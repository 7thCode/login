import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GensimComponent } from './gensim.component';

describe('GensimComponent', () => {
  let component: GensimComponent;
  let fixture: ComponentFixture<GensimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GensimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GensimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
