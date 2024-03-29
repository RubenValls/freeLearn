import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirstSectionMainComponent } from './first-section-main.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

describe('FirstSectionMainComponent', () => {
  let component: FirstSectionMainComponent;
  let fixture: ComponentFixture<FirstSectionMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirstSectionMainComponent, ButtonComponent]
    });

    fixture = TestBed.createComponent(FirstSectionMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('The best content you decide how it fits your success');
  });

  it('should render paragraph in a p tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('Specialize in development, regardless of your level of knowledge and experience, we will tailor our approach to meet your goals.');
  });

  it('should render app-button component', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-button')).toBeTruthy();
  });
});
