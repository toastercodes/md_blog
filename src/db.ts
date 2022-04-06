import mongoose from "mongoose";

const db = async (dbUri: string) => {
    try {
        await mongoose.connect(dbUri)
        .then(() => {
            console.log(`Connected to DB.`);
        });
    } catch(e) {
        console.error(e);
    }
}

export default db;