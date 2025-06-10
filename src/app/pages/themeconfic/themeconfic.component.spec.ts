import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeconficComponent } from './themeconfic.component';

describe('ThemeconficComponent', () => {
  let component: ThemeconficComponent;
  let fixture: ComponentFixture<ThemeconficComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemeconficComponent]
    });
    fixture = TestBed.createComponent(ThemeconficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
