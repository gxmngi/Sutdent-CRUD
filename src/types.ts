export interface User {
  id: string;
  name: string;
  avatar: string;
  lastActive: Date;
}

export interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: User;
  collaborators: User[];
}