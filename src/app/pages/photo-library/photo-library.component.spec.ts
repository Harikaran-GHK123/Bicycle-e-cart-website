import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoLibraryComponent } from './photo-library.component';

describe('PhotoLibraryComponent', () => {
  let component: PhotoLibraryComponent;
  let fixture: ComponentFixture<PhotoLibraryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoLibraryComponent]
    });
    fixture = TestBed.createComponent(PhotoLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
