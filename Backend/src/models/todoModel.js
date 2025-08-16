import { model, Schema } from "mongoose";

const todoSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    isCompleted: {
      type: Boolean,
      required: [true, "Task completion is required"],
      default: false,
    },
    createdBy: {
      type: Schema.ObjectId,
      ref: "User",
      required: [true, "Please specify the User"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Todo = model("Todo", todoSchema);
export default Todo;
