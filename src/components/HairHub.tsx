export default function HairHub() {
  const stylists = [
    {
      name: 'Tina Styles',
      img: 'https://randomuser.me/api/portraits/women/50.jpg',
      bio: 'Expert in braids and natural styles.',
      link: '/stylists/tina-styles',
    },
    {
      name: 'James Curlz',
      img: 'https://randomuser.me/api/portraits/men/45.jpg',
      bio: 'Specializes in wig installations.',
      link: '/stylists/james-curlz',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Stylists</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {stylists.map(({ name, img, bio, link }) => (
          <a
            key={name}
            href={link}
            className="bg-pink-50 rounded-lg p-6 shadow flex items-center gap-6 hover:bg-pink-100 transition"
          >
            <img
              src={img}
              alt={name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="text-pink-700">{bio}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
