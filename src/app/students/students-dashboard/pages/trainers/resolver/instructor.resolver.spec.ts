import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { instructorResolver } from './instructor.resolver';

describe('instructorResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => instructorResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
