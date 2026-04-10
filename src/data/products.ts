import { Product } from "@/types/product";

const products: Product[] = [
  {
    id: 1,
    name: "Student Blend Wig",
    category: "Students",
    hairType: "Blend",
    price: 18000,
    image:
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&q=80",
    description: "A soft everyday wig designed for easy styling and a student-friendly budget.",
    benefits: ["Lightweight feel", "Daily wear", "Easy upkeep"],
    collection: "wigs",
  },
  {
    id: 2,
    name: "Bridal Human Hair Wig",
    category: "Brides",
    hairType: "Human Hair",
    price: 75000,
    image:
      "https://images.unsplash.com/photo-1618354691373-4aeb1a7bbf7c?auto=format&fit=crop&w=900&q=80",
    description: "A polished bridal piece with natural movement, soft lace, and event-ready fullness.",
    benefits: ["Natural finish", "Soft lace", "Ceremony ready"],
    collection: "wigs",
  },
  {
    id: 3,
    name: "Working-Class Bone Straight Wig",
    category: "Working-Class",
    hairType: "Bone Straight",
    price: 42000,
    image:
      "https://images.unsplash.com/photo-1619983081563-430f63602796?auto=format&fit=crop&w=900&q=80",
    description: "A sleek office-friendly unit with a clean straight finish for repeat weekly wear.",
    benefits: ["Sleek finish", "Low fuss", "Professional look"],
    collection: "wigs",
  },
  {
    id: 4,
    name: "Luxury Raw Donor Hair",
    category: "Luxury",
    hairType: "Raw Donor",
    price: 120000,
    image:
      "https://images.unsplash.com/photo-1622473590773-f588134b6ce7?auto=format&fit=crop&w=900&q=80",
    description: "A premium raw donor option with dense fullness, long wear life, and rich texture.",
    benefits: ["Premium density", "Long lifespan", "Luxury texture"],
    collection: "wigs",
  },
];

export default products;
