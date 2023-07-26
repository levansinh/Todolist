import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema(
  {
    task_name: { type: String, required: "true" },
    description: { type: String, required: "true" },
    id_user: { type: String },
    completed: { type: Boolean, default: false },
    important: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const TodoModel = mongoose.model("ToDo", schema);
