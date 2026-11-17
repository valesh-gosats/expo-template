export type PendingCartItem = {
  nonce: string;
  productId: string;
  title: string;
  price: number;
};

export type ShippingDetails = {
  fullName: string;
  address: string;
  city: string;
};

export type CartLine = {
  productId: string;
  title: string;
  price: number;
  quantity: number;
};

export type SubmitOrderInput = {
  userId: string;
  lines: Pick<CartLine, 'productId' | 'quantity'>[];
};

export type Order = {
  id: string;
  total: number;
};

export type CheckoutStackParamList = {
  Cart: { pendingItem?: PendingCartItem } | undefined;
  Shipping: undefined;
  Payment: undefined;
};
