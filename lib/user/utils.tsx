import slug from 'slug';

export const slugUsername = (username: string): any => slug(username,'_');

export interface User{
    _id: string;
    email: string;
    emailVerified: boolean;
    password: string;
    name: string;
    profilePicture: string;
    createdAt: Date;
    updatedAt: Date;
}

