import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateModalComponent } from './update-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('UpdateModalComponent', () => {
  let component: UpdateModalComponent;
  let fixture: ComponentFixture<UpdateModalComponent>;
  let matDialogRefSpy: jasmine.SpyObj<MatDialogRef<UpdateModalComponent>>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [UpdateModalComponent],
      imports: [
        SharedModule,
        MatDialogModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} }, 
        { provide: MatDialogRef, useValue: spy },
        MatDialog, 
      ]
    });
    fixture = TestBed.createComponent(UpdateModalComponent);
    component = fixture.componentInstance;
    matDialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<UpdateModalComponent>>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize title', () => {
    component.ngOnInit();
    expect(component.title).toEqual(component.data.title);
  });

  it('should call onEdit and close dialog on update', () => {
    component.data.onEdit = jasmine.createSpy('onEdit');
    component.data.editData = 'editData';
    component.onUpdate();
    expect(component.data.onEdit).toHaveBeenCalledWith('editData');
    expect(matDialogRefSpy.close).toHaveBeenCalledWith(true);
  });

  it('should close dialog', () => {
    component.close();
    expect(matDialogRefSpy.close).toHaveBeenCalled();
  });
});
