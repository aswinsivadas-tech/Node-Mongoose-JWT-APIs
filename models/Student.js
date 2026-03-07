import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 2 },
    marks: { type: Number, required: true, min: 0, max: 100 },
    class: { type: String, required: true, min: 0, max: 100 },
  },
  { timestamps: true },
);

export default mongoose.model("Student", studentSchema);
