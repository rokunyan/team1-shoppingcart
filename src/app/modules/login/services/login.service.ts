import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor() {}

  password: any | undefined

  setRetrievePassword = (password : any) => {
      this.password = password
  }

  getRetrievePassword = () => {
    return this.password
  }

}

