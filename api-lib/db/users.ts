import { User } from "@/lib/user";
import { connectToDatabase } from "api-lib/mongodb";
import bcrypt from 'bcryptjs';
import normalizeEmail from 'validator/lib/normalizeEmail';
import { ObjectId } from 'mongodb';

export const insertUser = async (user: User): Promise<User> => {
    const { db } = await connectToDatabase();
    let userData = {
        email: user.email,
        emailVerified: false,
        password: await bcrypt.hash(user.password, 10),
        name: user.name,
        profilePicture: "",
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    }
    const { insertedId } = await db.collection('users').insertOne(userData)
    user._id = insertedId;
    return user;
}


export const findUserWithEmailAndPassword = async (email: string, password: string) => {
    const { db } = await connectToDatabase();
    const normalEmail = normalizeEmail(email);
    const userData = await db.collection('users').findOne({ email: normalEmail })
    if (userData && (await bcrypt.compare(password, userData.password))) {
        return { ...userData, password: undefined }; // filtered out password
    }
    return null;
}

export const findUserForAuth = async (_id: ObjectId): Promise<User> => {
    const { db } = await connectToDatabase();
    const userData = await db.collection('users').findOne({ _id: new ObjectId(_id) }, { projection: { password: 0 } })
    return userData || null;
}

export const findUserByEmail =async (email:string): Promise <User> => {
    const { db } = await connectToDatabase();
    const normalEmail = normalizeEmail(email);
    const userData = await db.collection('users').findOne({ email: normalEmail }, { projection: dbProjectionUsers() })
    return userData || null; 
}

export function dbProjectionUsers(prefix = '') {
    return {
      [`${prefix}password`]: 0,
      [`${prefix}email`]: 0,
      [`${prefix}emailVerified`]: 0,
    };
  }
