import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    client: {
      name: { type: String, required: true },
      surname: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      region: { type: String, required: true },
      city: { type: String, required: true },
      warehouse: { type: String, required: true },
    },
    items: [
      {
        name: { type: String, required: true },
        size: { type: String, required: true },
        amount: { type: Number, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
      },
    ],
    total: { type: Number, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
