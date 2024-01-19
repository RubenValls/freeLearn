import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

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
});
