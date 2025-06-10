import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropSaverComponent } from './crop-saver.component';

describe('CropSaverComponent', () => {
  let component: CropSaverComponent;
  let fixture: ComponentFixture<CropSaverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CropSaverComponent]
    });
    fixture = TestBed.createComponent(CropSaverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
