import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CustomCardComponent } from "./custom-card.component";
import { StudentsModule } from "src/app/students/students.module";
import { By } from '@angular/platform-browser';

describe('CustomCardComponent', () => {
  let component: CustomCardComponent;
  let fixture: ComponentFixture<CustomCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomCardComponent],
      imports: [
        StudentsModule
      ]
    });
    fixture = TestBed.createComponent(CustomCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.data = {
      imagePath: 'test',
      imageUrl: 'test',
      name: 'test',
    }
    expect(component).toBeTruthy();
  });

  it('should display imagePath if provided', () => {
    component.data = {
      imagePath: 'testImagePath',
      imageUrl: '',
      name: 'test',
    }
    fixture.detectChanges();
    const imgElement = fixture.debugElement.query(By.css('.card img'));
    expect(imgElement.nativeElement.src).toContain('testImagePath');
  });

  it('should display imageUrl if imagePath is not provided', () => {
    component.data = {
      imagePath: '',
      imageUrl: 'testImageUrl',
      name: 'test',
    }
    fixture.detectChanges();
    const imgElement = fixture.debugElement.query(By.css('.card img.course'));
    expect(imgElement.nativeElement.src).toContain('testImageUrl');
  });

  it('should display name if provided', () => {
    component.data = {
      imagePath: '',
      imageUrl: '',
      name: 'testName',
    }
    fixture.detectChanges();
    const pElement = fixture.debugElement.query(By.css('.card p'));
    expect(pElement.nativeElement.textContent).toContain('testName');
  });
});
