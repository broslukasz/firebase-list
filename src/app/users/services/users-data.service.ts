import { Injectable, OnDestroy } from '@angular/core';

import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { tap } from 'rxjs/internal/operators/tap';
import { cloneDeep } from 'lodash-es';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UsersDataService implements OnDestroy {
  private readonly baseUrl = `${environment.apiUrl}/users`;
  private usersSource = new BehaviorSubject<User[] | null>(null);

  private editSubscription: Subscription;

  constructor(private http: HttpClient) {
  }

  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`).pipe(
      catchError((error) => {
        alert('Error');
        throw new Error(error);
      }),
    );
  }

  remove(userId: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${userId}`).pipe(
      tap(() => {
        alert('User Removed');
      }),
      map(() => {
        return userId;
      }),
      catchError((error) => {
        alert('Couldnt Remove');
        throw new Error(error);
      }),
    );
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

