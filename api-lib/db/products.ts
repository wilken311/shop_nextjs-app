import { connectToDatabase } from "api-lib/mongodb";
import { Product } from "@/lib/product";
import { ObjectId } from "mongodb";

export const findAllProducts = async (): Promise<Product[]> => {
        const { db } = await connectToDatabase();
        const data = await db.collection('products').find().toArray();
        return data;
}

export const findProduct = async (_id: ObjectId): Promise<Product>=>{
        const { db } = await connectToDatabase();
        const query = {_id: new ObjectId(_id)};
        const data= await db.collection('products').findOne(query);
        return data;
}

export const insertProduct = async (product: Product,userId: string): Promise<void> => {
        const { db } = await connectToDatabase();
        await db.collection('products').insertOne({...product,userId});
}

export const updateProduct = async (_id: ObjectId, product: Product,userId: string): Promise<void> => {
        const { db } = await connectToDatabase();
        const filter = { _id: new ObjectId(_id) };
        const updatedData = { $set:  {...product,userId} };
        await db.collection('products').updateOne( filter, updatedData );
}

export const deleteProduct = async (_id: ObjectId): Promise<void> => {
        const { db } = await connectToDatabase();
        await db.collection('products').deleteOne({ _id: new ObjectId(_id) })
}




