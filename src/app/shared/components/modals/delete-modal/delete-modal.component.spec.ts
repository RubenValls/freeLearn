import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModalComponent } from './delete-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';

describe('DeleteModalComponent', () => {
  let component: DeleteModalComponent;
  let fixture: ComponentFixture<DeleteModalComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<any>>;

  beforeEach(() => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [DeleteModalComponent],
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
    fixture = TestBed.createComponent(DeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call close on dialogRef when close is called', () => {
    component.close();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should call close on dialogRef with true when onDelete is called', () => {
    component.onDelete();
    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });
});
