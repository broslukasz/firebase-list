import { Injectable, OnDestroy } from '@angular/core';

import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { tap } from 'rxjs/internal/operators/tap';
import { cloneDeep } from 'lodash-es';
import { environment } from '../../../environments/environment';
import { User } from '../user.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class UserDataService implements OnDestroy {
  private readonly baseUrl = `${environment.apiUrl}/users`;
  private usersSource = new BehaviorSubject<User[] | null>(null);
  users$: Observable<User[] | null> = this.usersSource.asObservable();

  private usersSubscription: Subscription;
  private deleteSubscription: Subscription;
  private editSubscription: Subscription;

  constructor(private http: HttpClient) {
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
    this.editSubscription.unsubscribe();
  }

  findAll(): void {
    this.usersSubscription = this.http.get<User[]>(`${this.baseUrl}`).pipe(
      catchError((error) => {
        alert('Error');
        throw new Error(error);
      }),
    ).subscribe((users: User[]) => {
      this.usersSource.next(users);
    });
  }

  remove(userId: string): void {
    this.deleteSubscription =  this.http.delete<User[]>(`${this.baseUrl}/${userId}`).pipe(
      tap(() => {
        alert('User Removed');
      }),
      catchError((error) => {
        alert('Couldnt Remove');
        throw new Error(error);
      }),
    ).subscribe(() => {
      const users = this.usersSource.getValue();
      const index = users.findIndex(user => user.id === userId);
      users.splice(index, 1);
      this.usersSource.next(cloneDeep(users));
    });
  }

  edit(editedUser: User): void {
    this.editSubscription = this.http.put<User>(`${this.baseUrl}`, editedUser, httpOptions).pipe(
      tap(() => {
        alert('User Updated');
      }),
      catchError((error) => {
        alert('Couldnt update user');
        throw new Error(error);
      }),
    ).subscribe(() => {
      let users: User[] = Array.from(this.usersSource.getValue());
      users = users.map((user => user.id === editedUser.id ? editedUser : user));
      this.usersSource.next(cloneDeep(users));
    });
  }
}

