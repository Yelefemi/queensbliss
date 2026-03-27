export default function Hairtypes() {
  const occasions = [
    {
      title: 'Bridal Bliss',
      description: 'Perfect styles for your special day',
      img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      link: '/shop?collection=bridal-bliss',
    },
    {
      title: 'Campus Queen',
      description: 'Trendy styles for students',
      img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
      link: '/shop?collection=campus-queen',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Featured Collections</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {occasions.map(({ title, description, img, link }) => (
          <a
            key={title}
            href={link}
            className="relative rounded-lg overflow-hidden shadow-lg group"
          >
            <img
              src={img}
              alt={title}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white p-6">
              <h3 className="text-3xl font-semibold mb-2">{title}</h3>
              <p className="mb-4">{description}</p>
              <button className="bg-pink-600 px-6 py-3 rounded hover:bg-pink-700 transition">
                Explore
              </button>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
