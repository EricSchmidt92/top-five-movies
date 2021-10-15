import { IUser } from '../models/IUser';
import Express, { Request } from 'express';

declare global {
  namespace Express {
    interface IUser extends User {}
  }
}
