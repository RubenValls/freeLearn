import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubDetailModalComponent } from './sub-detail-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';

describe('SubDetailModalComponent', () => {
  let component: SubDetailModalComponent;
  let fixture: ComponentFixture<SubDetailModalComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<any>>;

  beforeEach(() => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [SubDetailModalComponent],
      imports: [
        SharedModule,
        MatDialogModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: mockDialogRef }
      ]
    });
    fixture = TestBed.createComponent(SubDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
