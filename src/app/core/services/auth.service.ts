import { Inject, Injectable } from '@angular/core';
import { UserService } from '../../modules/user/services/user.service';
import { User } from '../../modules/user/models/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  session: any
  isAdmin: boolean = false
  validUsers: User[] | undefined

  constructor(private userService : UserService) {
    let session: any = userService.getCurrentUser()
    
    if(session){
      this.session = session
      this.isAdmin = this.session.isAdmin}

    this.userService.getAllUsers().pipe(tap((x) => this.validUsers = x as User[])).subscribe()
   }

   isValidCred(email: string, password: string){
    let user = this.validUsers?.find((u) => u.email === email && u.password === password && u.isActive)
    if(user){
      this.session = user;
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('session', JSON.stringify(this.session));
      }
    }
    return user
  }

}
