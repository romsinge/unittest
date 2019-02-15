import { TestBed } from '@angular/core/testing';

import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.get(ValueService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not be of type String', () => {
    expect(service instanceof String).not.toBe(true)
  });

  it('should be of type ValueService', () => {
    expect(service instanceof ValueService).toBe(true)
  });

  it('should return MyValue with getValue()', () => {
    expect(service.getValue()).toBe('MyValue')
  })

  it('should return string with getValue()', () => {
    expect(typeof service.getValue()).toBe("string")
  })

  it('should return MyValue with getAsyncValue', (done: DoneFn) => {
    service.getAsyncValue().subscribe(value => {
      expect(value).toBe('MyValue')
      // NE PAS OUBLIER POUR LES TESTS ASYNCHRONES
      done()
    })
  })

  it('should return string with getAsyncValue', (done: DoneFn) => {
    service.getAsyncValue().subscribe(value => {
      expect(typeof value).toBe('string')
      done()
    })
  })

  it('should return MyValue with getPromiseValue', (done: DoneFn) => {
    service.getPromiseValue().then(value => {
      expect(value).toBe('MyValue')
      done()
    })
  })
});
