import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      },
    },
    time: {
      type: String,
      default: function () {
        return new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
    important: {
      type: Boolean,
      required: true,
      default: false,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    upcomming: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const ToDo = mongoose.model("ToDo", TodoSchema);

export default ToDo;
