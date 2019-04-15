import * as Factory from 'factory.ts';
import { User } from '../app/models/user.model';

export const usersFactory = Factory.makeFactory<User>({
  birthDate: '',
  city: '',
  id: '',
  name: '',
  number: '',
  phone: '',
  street: '',
  surname: ''
});
