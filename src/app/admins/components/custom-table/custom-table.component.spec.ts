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

  it('should initialize dataSubscription on ngOnInit', () => {
    const data = of([1, 2, 3]);
    component.data = data;
    component.ngOnInit();
    expect(component.dataSubscription).toBeDefined();
  });

  it('should unsubscribe dataSubscription on ngOnDestroy', () => {
    const data = of([1, 2, 3]);
    component.data = data;
    component.ngOnInit();
    
    const fakeSubscription = new Subscription();
    spyOn(fakeSubscription, 'unsubscribe');

    component.dataSubscription = fakeSubscription;

    component.ngOnDestroy();
    expect(component.dataSubscription.unsubscribe).toHaveBeenCalled();
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
  });
});
