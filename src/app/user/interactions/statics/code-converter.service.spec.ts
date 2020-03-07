import { TestBed } from '@angular/core/testing';

import { CodeConverter } from './code.converter';

describe('CodeConverter', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CodeConverter = TestBed.get(CodeConverter);
    expect(service).toBeTruthy();
  });
});
