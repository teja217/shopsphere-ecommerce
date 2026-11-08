import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    images: [{ type: String }],
    category: { type: String },
    stock: { type: Number },
  },
  quantity: { type: Number, required: true, min: 1, default: 1 },
  addedAt: { type: Date, default: Date.now },
});

const cartSchema = new mongoose.Schema(
  {
    sessionId: { type: String, default: 'default-session' },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

export const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);
