import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValueService {

  value: string = 'MyValue' 

  constructor() { }

  getValue(): string {
    return this.value
  }

  getAsyncValue(): Observable<string> {
    return of(this.value)
  }

  async getPromiseValue2(): Promise<string> {
    return this.value
  }

  async getPromiseValue(): Promise<string> {
    let value = await this.getPromiseValue2()
    return value
  }
}
