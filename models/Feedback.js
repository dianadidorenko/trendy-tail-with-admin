import mongoose, { Schema } from "mongoose";

const FeedbackSchema = new Schema(
  {
    name: { type: String, required: true },
    message: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  { timestamps: true }
);

const FeedbackModel =
  mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema);

export default FeedbackModel;
