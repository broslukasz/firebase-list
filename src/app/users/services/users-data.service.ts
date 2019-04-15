import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { tap } from 'rxjs/internal/operators/tap';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  private readonly baseUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

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
      map(() => userId),
      catchError((error) => {
        alert('Couldnt Remove');
        throw new Error(error);
      }),
    );
  }

  edit(editedUser: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}`, editedUser, httpOptions).pipe(
      tap(() => {
        alert('User Updated');
      }),
      map(() => editedUser),
      catchError((error) => {
        alert('Couldnt update user');
        throw new Error(error);
      }),
    );
  }
}

