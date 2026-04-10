export type Product = {
  id: number;
  name: string;
  category: string;
  hairType: string;
  price: number;
  image: string;
  description?: string;
  benefits?: string[];
  collection?: "wigs" | "maintenance";
};
