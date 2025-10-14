import { UserType } from 'src/cared-profile/enum/user-type.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserType[]) =>
  Reflect.metadata(ROLES_KEY, roles);
