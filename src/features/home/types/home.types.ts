export type Product = {
  id: string;
  title: string;
  price: number;
  thumbnailUrl: string;
};

export type HomeStackParamList = {
  Home: undefined;
  ProductDetails: { productId: string };
};
