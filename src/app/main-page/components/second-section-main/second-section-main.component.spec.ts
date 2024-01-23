import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { SecondSectionMainComponent } from './second-section-main.component';
import { TechService } from 'src/app/admins/admins-dashboard/pages/technologies/service/tech.service';
import { MainPageModule } from '../../main-page.module';

describe('SecondSectionMainComponent', () => {
  let component: SecondSectionMainComponent;
  let fixture: ComponentFixture<SecondSectionMainComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondSectionMainComponent ],
      providers: [
        { provide: TechService, useValue: {} },
        { provide: Store, useValue: { select: () => of([
          {},
          {},
          {},
          {},
          {},
          {},
        ]), dispatch: () => {} } }
      ],
      imports: [MainPageModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondSectionMainComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined technologies$ variable', () => {
    expect(component.technologies$).toBeDefined();
  });

  it('should have a defined visibleTechnologies variable', () => {
    expect(component.visibleTechnologies).toBeDefined();
  });

  it('should have a defined currentIndex variable', () => {
    expect(component.currentIndex).toBeDefined();
  });

  it('should have a defined techSubscription variable', () => {
    expect(component.techSubscription).toBeDefined();
  });

  it('should initialize with first four technologies', () => {
    expect(component.visibleTechnologies.length).toEqual(4);
  });

  it('should go to next technologies', () => {
    const initialIndex = component.currentIndex;
    component.next();
    expect(component.currentIndex).toEqual(initialIndex + 1);
  });

  it('should go to previous technologies', () => {
    component.currentIndex = 1;
    const initialIndex = component.currentIndex;
    component.prev();
    expect(component.currentIndex).toEqual(initialIndex - 1);
  });

  it('should update visible technologies', () => {
    component.currentIndex = 1;
    component.updateVisibleTechnologies();
    expect(component.visibleTechnologies.length).toEqual(4);
  });

  it('should handle going to next after reaching the end', () => {
    component.currentIndex = 5; // Assuming there are 6 technologies in the array
    component.next();
    expect(component.currentIndex).toEqual(0);
  });

  it('should handle going to previous after reaching the beginning', () => {
    component.currentIndex = 0;
    component.prev();
    expect(component.currentIndex).toEqual(2); // Assuming there are 6 technologies in the array
  });

  it('should handle going to previous when currentIndex is 0', () => {
    component.currentIndex = 0;
    component.prev();
    expect(component.currentIndex).toEqual(2); // Assuming there are 6 technologies in the array
  });

  it('should unsubscribe on ngOnDestroy', () => {
    spyOn(component.techSubscription!, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.techSubscription!.unsubscribe).toHaveBeenCalled();
  });
});
