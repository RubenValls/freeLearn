import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteModalComponent } from './delete-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Store, StoreModule } from '@ngrx/store';

describe('DeleteModalComponent', () => {
  let component: DeleteModalComponent;
  let fixture: ComponentFixture<DeleteModalComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<any>>;
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(() => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockStore = jasmine.createSpyObj('Store', ['dispatch']);

    TestBed.configureTestingModule({
      declarations: [DeleteModalComponent],
      imports: [
        SharedModule,
        MatDialogModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: Store, useValue: mockStore }
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

  it('should call onDelete when provided in data', () => {
    const onDeleteSpy = jasmine.createSpy();
    component.data.onDelete = onDeleteSpy;
    component.onDelete();
    expect(onDeleteSpy).toHaveBeenCalled();
  });

  it('should call onEdit and dispatch action when provided in data', () => {
    const onEditSpy = jasmine.createSpy();
    component.data.onEdit = onEditSpy;
    component.data.editData = { value: 'test' };
    component.onDelete();
    expect(onEditSpy).toHaveBeenCalledWith('test', true);
    expect(mockStore.dispatch).toHaveBeenCalled();
  });
});
