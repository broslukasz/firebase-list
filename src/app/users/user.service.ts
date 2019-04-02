import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class UserService {
  private readonly baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  public findAll(): Observable<User[]> {
      return this.http.get<User[]>(`${this.baseUrl}`);
  }

  public remove(userId: string): Observable<User[]> {
    return this.http.delete<User[]>(`${this.baseUrl}/${userId}`).pipe(
      catchError((error) => {
        alert('Couldnt Remove');
        throw new Error(error);
      }),
      mergeMap(() => {
        alert('User Removed');
        return this.findAll();
      })
    );
  }

  public edit(user: User): Observable<User[]> {
    return this.http.patch<User[]>(`${this.baseUrl}/${user.id}`, user).pipe(
      mergeMap(() => {
        return this.findAll();
      })
    );
  }
}
