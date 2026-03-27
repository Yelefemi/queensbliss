import React from 'react';

const collections = [
  {
    title: 'Students',
    img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
    filter: 'students',
  },
  {
    title: 'Brides',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    filter: 'brides',
  },
  {
    title: 'Working-Class',
    img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    filter: 'working-class',
  },
  {
    title: 'Luxury',
    img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
    filter: 'luxury',
  },
];

const categories = [
  {
    title: 'Blend',
    img: 'https://images.unsplash.com/photo-1542831371-d531d36971e6?auto=format&fit=crop&w=800&q=80',
    filter: 'blend',
  },
  {
    title: 'Human Hair',
    img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    filter: 'human-hair',
  },
  {
    title: 'Raw Donor',
    img: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=800&q=80',
    filter: 'raw-donor',
  },
  {
    title: 'Bond Straight',
    img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
    filter: 'bond-straight',
  },
];

export default function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
      {/* Collections */}
      <h2 className="text-3xl font-bold mb-8 text-center">Shop by Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-16">
        {collections.map(({ title, img, filter }) => (
          <div key={title} className="relative rounded-lg overflow-hidden shadow-lg group">
            <img
              src={img}
              alt={title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white p-4">
              <h3 className="text-2xl font-semibold mb-3">{title}</h3>
              <a
                href={`/shop?collection=${filter}`}
                className="bg-pink-600 px-4 py-2 rounded hover:bg-pink-700 transition"
              >
                Explore
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Categories */}
      <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        {categories.map(({ title, img, filter }) => (
          <div key={title} className="relative rounded-lg overflow-hidden shadow-lg group">
            <img
              src={img}
              alt={title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white p-4">
              <h3 className="text-2xl font-semibold mb-3">{title}</h3>
              <a
                href={`/shop?category=${filter}`}
                className="bg-pink-600 px-4 py-2 rounded hover:bg-pink-700 transition"
              >
                Explore
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
