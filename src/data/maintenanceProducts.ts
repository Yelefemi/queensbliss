import { Product } from "@/types/product";

const maintenanceProducts: Product[] = [
  {
    id: 101,
    name: "Hydration Repair Shampoo",
    category: "Shampoo",
    hairType: "Dry Hair",
    price: 8500,
    image:
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=900&q=80",
    description:
      "A sulfate-light cleanser that removes buildup without stripping moisture from wigs or natural hair.",
    benefits: ["Cleanses gently", "Reduces dryness", "Safe for weekly care"],
    collection: "maintenance",
  },
  {
    id: 102,
    name: "Silk Slip Conditioner",
    category: "Conditioner",
    hairType: "Frizzy Hair",
    price: 9200,
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80",
    description:
      "A smoothing conditioner designed to restore softness, detangle strands, and tame flyaways.",
    benefits: ["Boosts slip", "Softens texture", "Helps with detangling"],
    collection: "maintenance",
  },
  {
    id: 103,
    name: "Scalp Soothe Growth Oil",
    category: "Treatment",
    hairType: "Protective Styles",
    price: 6500,
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80",
    description:
      "A lightweight oil blend that helps keep the scalp calm and nourished while wearing braids or wigs.",
    benefits: ["Targets dry scalp", "Lightweight finish", "Daily-use friendly"],
    collection: "maintenance",
  },
  {
    id: 104,
    name: "Curl Refresh Leave-In",
    category: "Styling",
    hairType: "Curly Hair",
    price: 7800,
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    description:
      "A moisture-rich leave-in cream that revives curls, defines shape, and cuts down breakage from dryness.",
    benefits: ["Defines curls", "Adds moisture", "Helps reduce frizz"],
    collection: "maintenance",
  },
  {
    id: 105,
    name: "Lace Wig Revive Spray",
    category: "Wig Care",
    hairType: "Lace Front Wigs",
    price: 7000,
    image:
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=900&q=80",
    description:
      "A quick-refresh spray made to restore shine and softness to lace wigs between wash days.",
    benefits: ["Refreshes shine", "Light mist formula", "Made for wigs"],
    collection: "maintenance",
  },
  {
    id: 106,
    name: "Heat Shield Serum",
    category: "Styling",
    hairType: "Straight Hair",
    price: 9900,
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80",
    description:
      "A smoothing serum that helps protect strands before hot tools while keeping straight styles polished.",
    benefits: ["Adds shine", "Helps with heat styling", "Controls flyaways"],
    collection: "maintenance",
  },
];

export default maintenanceProducts;
