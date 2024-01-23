import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent]
    });
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have defined inputs', () => {
    component.label = 'Test';
    component.routerLink = '/test';
    component.primary = true;
    component.type = 'primary';
    component.size = 'small';
    component.iconName = 'icon';
    component.iconPosition = 'end';

    expect(component.label).toBeDefined();
    expect(component.routerLink).toBeDefined();
    expect(component.primary).toBeDefined();
    expect(component.type).toBeDefined();
    expect(component.size).toBeDefined();
    expect(component.iconName).toBeDefined();
    expect(component.iconPosition).toBeDefined();
  });

  it('should emit onClick event', () => {
    spyOn(component.onClick, 'emit');
    component.onClick.emit();

    expect(component.onClick.emit).toHaveBeenCalled();
  });

  it('should return correct classes', () => {
    component.type = 'primary';
    component.size = 'small';

    const classes = component.classes;

    expect(classes).toContain('button');
    expect(classes).toContain('primary');
    expect(classes).toContain('small');
  });

  it('should emit onClick event when the button is clicked', () => {
    spyOn(component.onClick, 'emit');
    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    buttonElement.click();

    expect(component.onClick.emit).toHaveBeenCalled();
  });

  it('should handle different combinations of primary and type', () => {
    component.primary = true;
    component.type = 'secondary';
    fixture.detectChanges();

    const classes = component.classes;

    expect(classes).toContain('button');
    expect(classes).toContain('secondary');
    expect(classes).not.toContain('primary');
  });
});
