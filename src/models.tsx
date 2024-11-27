export interface Photo {
  id: number;
  title: string;
  url: string;
}

export interface Album {
  id: number;
  title: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Comment {
  id: number;
  name: string;
  body: string;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
}
