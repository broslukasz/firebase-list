import { TestBed } from '@angular/core/testing';

import { UserDataService } from './user-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [UserDataService]
  }));

  it('should be created', () => {
    const service: UserDataService = TestBed.get(UserDataService);
    expect(service).toBeTruthy();
  });
});
