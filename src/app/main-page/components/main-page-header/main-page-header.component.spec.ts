import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageHeaderComponent } from './main-page-header.component';
import { MainPageModule } from '../../main-page.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('MainPageHeaderComponent', () => {
  let component: MainPageHeaderComponent;
  let fixture: ComponentFixture<MainPageHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainPageHeaderComponent],
      imports: [MainPageModule, RouterTestingModule]
    });
    fixture = TestBed.createComponent(MainPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render logo in an img tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.logo img')).toBeTruthy();
  });

  it('should render app-btn-gradient component', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-btn-gradient')).toBeTruthy();
  });
});
