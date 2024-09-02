import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  serviceURL = "http://localhost:3000/"
  
  constructor(private http: HttpClient) { }

  getAllUsers = () =>{
    return this.http.get(`${this.serviceURL}users`)
  }

  getCurrentUser = () => {
    
    let session = localStorage.getItem('session');
    if(session){
      return JSON.parse(session)
    }
  }

  updateUser = (user : User) => {
    localStorage.setItem('session', JSON.stringify(user))
    return this.http.put(`${this.serviceURL}users/${user.id}`, user)
  }
}
