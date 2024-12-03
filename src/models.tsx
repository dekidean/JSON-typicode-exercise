// src/models.ts

interface GenericModel {
  id: number;
  title: string;
}

export interface Photo extends GenericModel {
  url: string;
}

export interface Album extends GenericModel {
  userId: number;
}

export interface User extends GenericModel {
  username: string;
  email: string;
}

export interface Post extends GenericModel {
  userId: number;
  body: string;
}

export interface Comment extends GenericModel {
  name: string;
  body: string;
}

export interface Todo extends GenericModel {
  completed: boolean;
}
