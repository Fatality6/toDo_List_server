import mongoose, { Schema } from "mongoose";


const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        boards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }]
    },
    { timestamps: true }
)
export default mongoose.model('User', UserSchema)