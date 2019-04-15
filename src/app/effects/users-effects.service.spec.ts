import { TestBed } from '@angular/core/testing';

import { UsersEffects } from './users-effects.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UsersDataService } from '../users/services/users-data.service';
import { instance, mock } from 'ts-mockito';
import { Actions } from '@ngrx/effects';

describe('UsersEffects', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UsersEffects,
      HttpClientTestingModule,
      {provide: UsersDataService, useValue: instance(mock(UsersDataService))},
      {provide: Actions, useValue: instance(mock(Actions))}
    ]
  }));

  it('should be created', () => {
    const service: UsersEffects = TestBed.get(UsersEffects);
    expect(service).toBeTruthy();
  });
});
