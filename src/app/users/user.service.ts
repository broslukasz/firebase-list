import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, mergeMap } from 'rxjs/operators';
import { tap } from 'rxjs/internal/operators/tap';
import { cloneDeep } from 'lodash-es';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class UserService {
  private readonly baseUrl = `${environment.apiUrl}/users`;
  users: User[];

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<User[]> {
    if (this.users) {
      return of(this.users);
    }

    return this.http.get<User[]>(`${this.baseUrl}`).pipe(
      tap(data => this.users = data),
      catchError((error) => {
        alert('Error');
        throw new Error(error);
      }),
    );
  }

  remove(userId: string): Observable<User[]> {
    return this.http.delete<User[]>(`${this.baseUrl}/${userId}`).pipe(
      tap(() => {
        const removedUser = this.users.find(user => user.id === userId);
        const index = this.users.indexOf(removedUser);
        this.users.splice(index, 1);
        this.users = cloneDeep(this.users);
      }),
      mergeMap(() => {
        alert('User Removed');
        return this.findAll();
      }),
      catchError((error) => {
        alert('Couldnt Remove');
        throw new Error(error);
      }),
    );
  }

  edit(editedUser: User): Observable<User[]> {
    return this.http.put<User[]>(`${this.baseUrl}`, editedUser, httpOptions).pipe(
      tap(() => {
        this.users = this.users.map((user => user.id === editedUser.id ? editedUser : user));
      }),
      mergeMap(() => {
        alert('User Updated');
        return this.findAll();
      }),
      catchError((error) => {
        alert('Couldnt update user');
        throw new Error(error);
      }),
    );
  }
}
