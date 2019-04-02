import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { instance, mock } from 'ts-mockito';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UserService,
      {provide: AngularFireDatabase, useValue: instance(mock(AngularFireDatabase))}
    ]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
