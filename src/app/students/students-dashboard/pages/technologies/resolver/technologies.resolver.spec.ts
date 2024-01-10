import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { technologiesResolver } from './technologies.resolver';

describe('technologiesResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => technologiesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
