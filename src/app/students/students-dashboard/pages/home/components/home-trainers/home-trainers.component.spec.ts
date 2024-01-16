import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeTrainersComponent } from "./home-trainers.component";


describe('HomeTrainersComponent', () => {
  let component: HomeTrainersComponent;
  let fixture: ComponentFixture<HomeTrainersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeTrainersComponent],
    });
    fixture = TestBed.createComponent(HomeTrainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});