import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderDetailsComponent } from './folder-details.component';

describe('FolderDetailsComponent', () => {
  let component: FolderDetailsComponent;
  let fixture: ComponentFixture<FolderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});