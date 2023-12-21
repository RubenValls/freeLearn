import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NewTechFormComponent } from './new-tech-form.component';
import { TechService } from '../../service/tech.service';
import { AdminsModule } from 'src/app/admins/admins.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NewTechFormComponent', () => {
  let component: NewTechFormComponent;
  let fixture: ComponentFixture<NewTechFormComponent>;
  let techService: TechService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AdminsModule, BrowserAnimationsModule],
      declarations: [NewTechFormComponent],
      providers: [
        { provide: TechService, useValue: { addTechnology: jasmine.createSpy('addTechnology') } }
      ]
    });

    fixture = TestBed.createComponent(NewTechFormComponent);
    component = fixture.componentInstance;
    techService = TestBed.inject(TechService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addTechnology when onSubmit is called with valid form', () => {
    component.newTechForm.setValue({
      name: 'Angular',
      imagePath: 'path/to/image',
      description: 'A platform for building web applications.',
      courses: []
    });

    component.onSubmit();

    expect(techService.addTechnology).toHaveBeenCalledWith({
      name: 'Angular',
      imagePath: 'path/to/image',
      description: 'A platform for building web applications.',
      courses: []
    });
  });

  it('should not call addTechnology when onSubmit is called with invalid form', () => {
    component.newTechForm.setValue({
      name: '',
      imagePath: '',
      description: '',
      courses: []
    });

    component.onSubmit();

    expect(techService.addTechnology).not.toHaveBeenCalled();
  });
});
