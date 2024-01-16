import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeCoursesComponent } from "./home-courses.component";

describe('HomeCoursesComponent', () => {
  let component: HomeCoursesComponent;
  let fixture: ComponentFixture<HomeCoursesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeCoursesComponent],
    });
    fixture = TestBed.createComponent(HomeCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});