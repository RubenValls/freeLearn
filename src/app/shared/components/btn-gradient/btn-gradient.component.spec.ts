import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BtnGradientComponent } from './btn-gradient.component';

fdescribe('BtnGradientComponent', () => {
  let component: BtnGradientComponent;
  let fixture: ComponentFixture<BtnGradientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnGradientComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnGradientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct input properties', () => {
    component.buttonText = 'Test Button';
    component.routerLink = '/test';
    fixture.detectChanges();

    expect(component.buttonText).toEqual('Test Button');
    expect(component.routerLink).toEqual('/test');
  });
});