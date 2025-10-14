import { User } from './user';

export interface InertiaProps {
  flash?: {
    success?: string;
    error?: string;
  };
  auth: {
    user: User;
  };
}
