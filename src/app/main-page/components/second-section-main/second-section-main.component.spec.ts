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
        { provide: Store, useValue: { select: () => of([]), dispatch: () => {} } }
      ],
      imports: [MainPageModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondSectionMainComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment currentIndex by 4 when next is called', () => {
    component.currentIndex = 0;
    component.visibleTechnologies = ['1', '2', '3', '4', '5', '6']
    component.next();
    expect(component.currentIndex).toEqual(4);
  });

  it('should decrement currentIndex by 4 when prev is called', () => {
    component.currentIndex = 4;
    component.visibleTechnologies = ['1', '2', '3', '4', '5', '6']
    component.prev();
    expect(component.currentIndex).toEqual(0);
  });
});
