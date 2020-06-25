import * as mongoose from 'mongoose';
import Product from '../interfaces/product.interface';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    category: {
      type: String,
      enum: ['Yams', 'Fruits', 'Vegetables'],
      default: 'Yams',
    },
    qty: {
      type: Number,
      required: true,
      validate: function (value: number) {
        if (value < 0) return false;
      },
    },
    price: {
      type: Number,
      required: true,
      validate: function (value: number) {
        if (value < 0) return false;
      },
    },
    image: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<Product & mongoose.Document>(
  'Product',
  productSchema
);

export default ProductModel;
