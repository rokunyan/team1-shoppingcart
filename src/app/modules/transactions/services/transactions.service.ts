import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../user/models/user';
import { UserService } from '../../user/services/user.service';
import { Transactions } from '../models/transactions';
import { Observable, of, map, tap} from 'rxjs';
import { table } from 'console';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  serviceURL = "http://localhost:3000/transactions"

  constructor(private http: HttpClient, private userService: UserService) {
  }

  getCurrentUserId = () => {
    const user = this.userService.getCurrentUser();
    if (user && user.id) {
      return user.id;
    }
    return null;
  };

  getAllTransactionsByUser(): Observable<Transactions[]> {
    let currentUserId = this.getCurrentUserId()
    if (currentUserId === null || currentUserId === '0') {
      return of([]);
    }
    
    return this.http.get<Transactions[]>(this.serviceURL).pipe(
      map((transactions) =>
        transactions.filter(
          (transactions) =>
            transactions.userId === currentUserId
        )
      ),
      tap((data) => console.log(data))
    );
  }

  addTransaction = (transaction: Transactions) => {
    return this.http.post(this.serviceURL,transaction)
  }
}
