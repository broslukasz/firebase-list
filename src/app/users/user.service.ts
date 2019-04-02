import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from './user';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { flatMap, mergeMap } from 'rxjs/operators';

@Injectable()
export class UserService {
  private readonly baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  public findAll(): Observable<User[]> {
      return this.http.get<User[]>(`${this.baseUrl}`);
  }

  public remove(userId: string): Observable<{}> {
    return this.http.delete<{}>(`${this.baseUrl}/${userId}`);
  }

  public edit(user: User): Observable<User[]> {
    return this.http.patch<User[]>(`${this.baseUrl}/${user.id}`, user).pipe(
      mergeMap(() => {
        return this.findAll();
      })
    );
  }
}
