import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTableComponent } from './custom-table.component';
import { of } from 'rxjs';
import { AdminsModule } from '../../admins.module';
import { provideMockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageEvent } from '@angular/material/paginator';
import { DetailModalComponent } from 'src/app/shared/components/modals/detail-modal/detail-modal.component';
import { MatDialog } from '@angular/material/dialog';

describe('CustomTableComponent', () => {
  let component: CustomTableComponent;
  let fixture: ComponentFixture<CustomTableComponent>;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomTableComponent],
      imports: [
        AdminsModule,
        BrowserAnimationsModule,
      ],
      providers: [provideMockStore()]
    });
    fixture = TestBed.createComponent(CustomTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialog = TestBed.inject(MatDialog);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have all variables defined', () => {
    expect(component.displayedColumns).toBeDefined();
    expect(component.data).toBeDefined();
    expect(component.rows).toBeDefined();
    expect(component.onEdit).toBeDefined();
    expect(component.onDelete).toBeDefined();
    expect(component.modalWith).toBeDefined();
    expect(component.modalHeight).toBeDefined();
    expect(component.modalTitle).toBeDefined();
    expect(component.dataSubscription).toBeDefined();
    expect(component.dataSource).toBeDefined();
    expect(component.columns).toBeDefined();
  });

  it('should initialize dataSubscription on ngOnInit', () => {
    const data = of([1, 2, 3]);
    component.data = data;
    component.ngOnInit();
    expect(component.dataSubscription).toBeDefined();
  });

  it('should unsubscribe dataSubscription on ngOnDestroy', () => {
    const data = of([{ id: 1 }, { id: 2 }]);
    component.data = data;
    component.ngOnInit();
    component.ngOnDestroy();
    expect(component.dataSubscription?.closed).toBeTrue();
  });

  it('should open dialog event when handleModal is called', () => {
    const element = {};
    const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    mockDialogRef.afterClosed.and.returnValue(of({}));

    spyOn(component.dialog, 'open').and.returnValue(mockDialogRef);
    spyOn(component.onEdit, 'emit'); 

    component.handleModal(element);

    expect(component.dialog.open).toHaveBeenCalled();
  });

  it('should calculate average rating correctly', () => {
    const ratings = [{ rating: 1 }, { rating: 2 }, { rating: 3 }];
    const average = component.getRatingAverage(ratings);
    expect(average).toEqual(2);
    expect(average).not.toEqual(1);
  });

  it('should emit pageChange event with correct data on onPageChange', () => {
    const pageEvent: PageEvent = {
      pageIndex: 2,
      pageSize: 10,
      length: 30,
    };

    const pageChangeSpy = spyOn(component.pageChange, 'emit');

    component.onPageChange(pageEvent);

    expect(component.currentPage).toEqual(pageEvent.pageIndex);
    expect(component.pageSize).toEqual(pageEvent.pageSize);
    expect(pageChangeSpy).toHaveBeenCalledWith(pageEvent);
  });

  it('should open dialog with totalCourses and rating', () => {
    const element = {
      courses: [1, 2, 3],
      rating: [4, 5]
    };
    const dialogSpy = spyOn(dialog, 'open');

    component.handleModal(element);

    expect(dialogSpy).toHaveBeenCalledWith(DetailModalComponent, {
      width: component.modalWith,
      height: component.modalHeight,
      data: {
        data: element,
        title: component.modalTitle,
        rows: component.rows,
        totalCourses: element.courses.length,
        rating: element.rating.length,
        onEdit: jasmine.any(Function),
        onDelete: jasmine.any(Function),
      }
    });
  });
});
