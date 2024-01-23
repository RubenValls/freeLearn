import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTableComponent } from './custom-table.component';
import { Subscription, of } from 'rxjs';
import { AdminsModule } from '../../admins.module';
import { provideMockStore } from '@ngrx/store/testing';

describe('CustomTableComponent', () => {
  let component: CustomTableComponent;
  let fixture: ComponentFixture<CustomTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomTableComponent],
      imports: [
        AdminsModule
      ],
      providers: [provideMockStore()]
    });
    fixture = TestBed.createComponent(CustomTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
});
