import { TestBed } from '@angular/core/testing';

import { UsersDataService } from './users-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UsersDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [UsersDataService]
  }));

  it('should be created', () => {
    const service: UsersDataService = TestBed.get(UsersDataService);
    expect(service).toBeTruthy();
  });
});
