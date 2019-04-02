import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FirebaseObject } from '../../core/enums/firebase-object';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) {}

  public getUsers(): Observable<User[]> {
    return this.db.object<User[]>(FirebaseObject.Users).valueChanges();
  }
}
