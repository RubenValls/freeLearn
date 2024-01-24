import { TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { ResizeService } from './resize.service';
import { NgZone } from '@angular/core';

describe('ResizeService', () => {
  let service: ResizeService;
  let ngZone: NgZone;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResizeService);
    ngZone = TestBed.inject(NgZone);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have isSmallScreen$ observable', () => {
    expect(service.isSmallScreen$).toBeDefined();
  });

  it('should initialize isSmallScreen$ based on window width', () => {
    service.isSmallScreen$.subscribe(isSmallScreen => {
      expect(isSmallScreen).toBe(window.innerWidth < 700);
    });
  });

  it('should update isSmallScreen$ when window size is less than width', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(500);
    service.checkScreenSize(700);
    service.isSmallScreen$.subscribe(isSmallScreen => {
      expect(isSmallScreen).toBe(true);
    });
  });

  it('should update isSmallScreen$ when window size is greater than width', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(800);
    service.checkScreenSize(700);
    service.isSmallScreen$.subscribe(isSmallScreen => {
      expect(isSmallScreen).toBe(false);
    });
  });
  
  it('should update isSmallScreen$ inside NgZone after window resize', fakeAsync(() => {
    let isSmallScreenValue: boolean | undefined;

    service.isSmallScreen$.subscribe(isSmallScreen => {
      isSmallScreenValue = isSmallScreen;
    });

    spyOnProperty(window, 'innerWidth').and.returnValue(600);
    window.dispatchEvent(new Event('resize'));

    flush();

    expect(isSmallScreenValue).toBe(false);
  }));
});
