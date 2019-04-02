import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from './user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
  private readonly baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  public findAll(): Observable<User[]> {
      return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  public remove(userId: string): Observable<User[]> {
    return this.http.delete<User[]>(`${this.baseUrl}/users/${userId}`);
  }
}
