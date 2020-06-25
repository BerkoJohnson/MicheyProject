interface Product {
  _id?: string;
  title: string;
  category: string;
  qty: number;
  price: number;
  image?: any;
  // votes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default Product;
