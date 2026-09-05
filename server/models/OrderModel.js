import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "product",
        },
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        duration: {
          type: String,
          required: true,
        },
        rating: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
      },
    ],
    recipientInfo: {
      fullName: { type: String, required: [true, "fullname is required"] },
      email: { type: String, required: [true, "email is required"] },
      phoneNumber: {
        type: String,
        required: [true, "phone number is required"],
        maxlength: [11, "maximum phone number length must be 11"],
      },
    },
    deliveryAddress: {
      address: { type: String, required: [true, "address is required"] },
      state: { type: String, required: [true, "state is required"] },
      city: { type: String, required: [true, "city is required"] },
    },
    status: {
      type: String,
      default: "paid",
      enum: ["pending", "paid", "delivered", "cancelled"],
      index: true,
    },
    paymentRef: { type: String, required: true, unique: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

const ORDER = mongoose.model("order", orderSchema);
export default ORDER;
