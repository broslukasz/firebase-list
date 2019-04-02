import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { UserService } from './user.service';
import { instance, mock, when } from 'ts-mockito';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialog, MatTableModule } from '@angular/material';
import { usersFactory } from '../../test/users-factory';
import { of } from 'rxjs/internal/observable/of';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  const userServiceMock: UserService = mock(UserService);

  when(userServiceMock.findAll()).thenReturn(of([usersFactory.build()]));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule],
      declarations: [ UsersComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).overrideComponent(UsersComponent, {
      set: {
        providers: [
          {provide: UserService, useValue: instance(userServiceMock)},
          {provide: MatDialog, useValue: instance(mock(MatDialog))}
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
