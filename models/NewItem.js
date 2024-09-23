import mongoose, { Schema } from "mongoose";

const NewItemSchema = new Schema(
  {
    name: { type: String, required: true },
    urlName: { type: String, required: true },
    category: { type: String, required: true },
    categoryShow: { type: String, required: true },
    type: { type: String },
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    brand: { type: String, required: true },
    season: { type: String },
    colors: [{ type: String }],
    material: { type: String },
    sizes: [
      {
        size: { type: String, required: true },
        price: { type: String, required: true },
      },
    ],
    characteristics: [{ type: String }],
    careInstructions: [{ type: String }],
    materialAdditionalInfo: { type: String },
  },
  { timestamps: true }
);

const NewItemModel =
  mongoose.models.NewItem || mongoose.model("NewItem", NewItemSchema);

export default NewItemModel;
