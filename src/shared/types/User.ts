export interface User {
  actor: string;
  permission: string;
  avatar: string;
  createdAt: Date;
  name: string;
  isMember: boolean;
  memberLevel: string;
}
