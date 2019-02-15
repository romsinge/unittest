import { TestBed } from '@angular/core/testing';

import { MasterService } from './master.service';
import { ValueService } from './value.service';

describe('MasterService', () => {
  let service: MasterService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.get(MasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get MyValue from getValue', () => {
    expect(service.getValue()).toBe('MyValue')
  })

  it('should get MyValue from getValue from value spy', () => {
    
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue'])
    
    valueServiceSpy.getValue.and.returnValue('MyValue')

    let masterService = new MasterService(valueServiceSpy)

    expect(masterService.getValue()).toBe('MyValue', 'did not return MyValue')
    expect(valueServiceSpy.getValue.calls.count()).toBe(1)
    expect(valueServiceSpy.getValue.calls.mostRecent().returnValue).toBe('MyValue')
  })
});
