import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { Contact } from '../interfaces/contact'
import { of } from 'rxjs'

let fakeContacts: Contact[] = [
  {
      "firstName": "Romain",
      "lastName": "Signes",
      "email": "romain.signes@gmail.com"
  },
  {
      "firstName": "Michel",
      "lastName": "Dupont",
      "email": "m.d@gmail.com"
  }
]

describe('DataService', () => {
  let service: DataService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    })
    service = TestBed.get(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should receive contacts from server', (done: DoneFn) => {
    service.getContacts().subscribe(contacts => {
      expect(contacts).toBeDefined()
      expect(contacts instanceof Array).toBe(true)

      contacts.forEach(contact => {
        expect(contact.firstName).toBeDefined()
        expect(contact.lastName).toBeDefined()
        expect(contact.email).toBeDefined()
      })
      done()
    })
  })

  it('should receive contacts from spy httpClient', (done: DoneFn) => {
    let httpClientSpy: { get: jasmine.Spy } = jasmine.createSpyObj('HttpClient', ['get'])
    
    service = new DataService(httpClientSpy as any)

    httpClientSpy.get.and.returnValue(of(fakeContacts))

    service.getContacts().subscribe(contacts => {
      expect(contacts).toBeDefined()
      expect(contacts instanceof Array).toBe(true)

      contacts.forEach(contact => {
        expect(contact.firstName).toBeDefined()
        expect(contact.lastName).toBeDefined()
        expect(contact.email).toBeDefined()
      })
      done()
    })

    expect(httpClientSpy.get.calls.count()).toBe(1)
  })

  // it('should receive contacts from spy httpClient', (done: DoneFn) => {
  //   let httpClientSpy = {
  //     get: () => {
  //       return of(fakeContacts)
  //     }
  //   }

  //   spyOn(httpClientSpy, 'get')

  //   service = new DataService(httpClientSpy as any)

  //   service.getContacts().subscribe(contacts => {
  //     expect(contacts).toBeDefined()
  //     done()
  //   })

  //   expect(httpClientSpy.get).toHaveBeenCalledTimes(1)
  // })
});
