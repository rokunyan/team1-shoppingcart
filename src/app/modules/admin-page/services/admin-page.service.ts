import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { User } from '../../user/models/user';

@Injectable({
  providedIn: 'root',
})
export class AdminPageService {
  private serverUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.serverUrl).pipe(
      // map((users) => users.filter((user) => user.isAdmin === false)),
      tap((guests) => console.log('Customers:', guests))
    );
  }

  getUserById(id: string): Observable<User> {
    const url = `${this.serverUrl}/${id}`;
    return this.http
      .get<User>(url)
      .pipe(tap((user) => console.log(`Fetched user ${id}: `, user)));
  }

  deactivate(user: User): Observable<User> {
    const url = `${this.serverUrl}/${user.id}`;
    const updateUser = { ...user, isActive: false };
    return this.http
      .put<User>(url, updateUser)
      .pipe(
        tap((updatedUser: User) =>
          console.log(`Updated user ${updateUser.id} `, updateUser)
        )
      );
  }

  addUser(user: User): Observable<User> {
    return this.http
      .post<User>(this.serverUrl, user)
      .pipe(tap((newUser: User) => console.log('Adding a user ', newUser)));
  }
}
