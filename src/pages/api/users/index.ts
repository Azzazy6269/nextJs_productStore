import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handles(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();

    if (req.method === 'GET') {
        const users = await User.find();
        return res.status(200).json(users);
    }

    if (req.method === 'POST') {
        const { firstName } = req.body;
        const user = await User.create({ firstName });
        return res.status(201).json(user);
    }

    if (req.method === 'PATCH') {
        const { firstName, id } = req.body;
        const user = await User.findByIdAndUpdate(id, { firstName }, { new: true });
        return res.status(200).json(user);
    }

    if (req.method === 'DELETE') {
        const { id } = req.body;
        await User.findByIdAndDelete(id);
        return res.status(200).json({ message: "User deleted successfully" });
    }
    
    return res.status(405).json({ message: "Method not allowed" });
}