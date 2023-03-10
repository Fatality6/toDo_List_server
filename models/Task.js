import mongoose, { Schema } from "mongoose";

//схема для создания нового поста
const Taskschema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true},
        text: { type: String, required: true },
        completed: { type: Boolean, default: false },
        editedByAdmin: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
)

export default mongoose.model('Task', Taskschema)