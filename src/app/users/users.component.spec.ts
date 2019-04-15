import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { UserService } from './services/user.service';
import { instance, mock } from 'ts-mockito';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialog, MatTableModule } from '@angular/material';
import { UsersDataService } from './services/users-data.service';
import { provideMockStore } from '@ngrx/store/testing';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  const userServiceMock: UserService = mock(UserService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule],
      declarations: [ UsersComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: MatDialog, useValue: instance(mock(MatDialog))},
        {provide: UsersDataService, useValue: instance(mock(UsersDataService))},
        provideMockStore({ initialState: [] }),
      ]
    }).overrideComponent(UsersComponent, {
      set: {
        providers: [
          {provide: UserService, useValue: instance(userServiceMock)}
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
