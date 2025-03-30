// src/app/interfaces/models.ts

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    image: string;
  }
  
  export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
    reactions: {
      likes: number;
      dislikes: number;
    };
  }
  
  
  export interface Comment {
    id: number;
    body: string;
    postId: number;
    user: {
      id: number;
      username: string;
    };
  }
  