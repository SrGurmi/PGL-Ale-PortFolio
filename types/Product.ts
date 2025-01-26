export type Product = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  isInCar: boolean;
};

export const getDefaultProduct = () => {
  return {
    id: "",
    category: "",
    isInCar: false,
    name: "",
    price: 0,
    quantity: 0,
  };
};
