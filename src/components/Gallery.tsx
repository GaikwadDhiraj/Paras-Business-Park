import { ParallaxScroll } from './ui/parallax-scroll';

export function Gallery() {
  const images = [
    {
      url: '/gallary/recep.jpg',
      title: 'Reception Area',
    },
    {
      url: '/gallary/multiplex.jpg',
      title: 'Multiplex',
    },
    {
      url: '/gallary/colab.jpg',
      title: 'Collaborative Spaces',
    },
    {
      url: '/gallary/office.jpg',
      title: 'Modern Office Spaces',
    },

    {
      url: '/gallary/cafe.jpg',
      title: 'Cafeteria',
    },
    {
      url: '/gallary/store.jpg',
      title: 'Store',
    },
    {
      url: '/gallary/outdoor.jpg',
      title: 'Outdoor Area',
    },
    {
      url: '/gallary/confer.jpg',
      title: 'Conference Center',
    },
    {
      url: '/gallary/private.jpg',
      title: 'Private Offices',
    },
  ];

  return (
    <section id='gallery' className='py-20 bg-white'>
      <div className='text-center mb-16'>
        <h2 className='text-4xl font-bold text-gray-900 mb-4'>
          Project Gallery
        </h2>
        <p className='text-xl text-gray-600'>
          Experience Luxury in Every Detail
        </p>
      </div>
      <ParallaxScroll images={images} />
    </section>
  );
}
