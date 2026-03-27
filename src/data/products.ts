import { Product } from "@/types/product";

const products: Product[] = [
  {
    id: 1,
    name: "Student Blend Wig",
    category: "Students",
    hairType: "Blend",
    price: 18000,
    image:
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb",
  },
  {
    id: 2,
    name: "Bridal Human Hair Wig",
    category: "Brides",
    hairType: "Human Hair",
    price: 75000,
    image:
      "https://images.unsplash.com/photo-1618354691373-4aeb1a7bbf7c",
  },
  {
    id: 3,
    name: "Working-Class Bone Straight Wig",
    category: "Working-Class",
    hairType: "Bone Straight",
    price: 42000,
    image:
      "https://images.unsplash.com/photo-1619983081563-430f63602796",
  },
  {
    id: 4,
    name: "Luxury Raw Donor Hair",
    category: "Luxury",
    hairType: "Raw Donor",
    price: 120000,
    image:
      "https://images.unsplash.com/photo-1622473590773-f588134b6ce7",
  },
];

export default products;
