import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { UserService } from './user.service';
import { instance, mock } from 'ts-mockito';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialog, MatTableModule } from '@angular/material';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  const userServiceMock: UserService = mock(UserService);

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
