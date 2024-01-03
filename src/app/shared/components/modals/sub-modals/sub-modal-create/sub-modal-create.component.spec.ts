import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubModalCreateComponent } from './sub-modal-create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SubModalCreateComponent', () => {
  let component: SubModalCreateComponent;
  let fixture: ComponentFixture<SubModalCreateComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<any>>;

  beforeEach(() => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    TestBed.configureTestingModule({
      declarations: [SubModalCreateComponent],
      imports: [
        SharedModule,
        MatDialogModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: mockDialogRef }
      ]
    });
    fixture = TestBed.createComponent(SubModalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
