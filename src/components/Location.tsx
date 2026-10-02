import { motion } from 'framer-motion';

const landmarksData = [
  {
    category: 'Connectivity',
    icon: '🚗',
    places: [
      'Vijapur Road - 15 Mins',
      'Akkalkot Road - 10 Mins',
      'Kolhapur Road - 10 Mins',
      'Tuljapur Road - 10 Mins',
    ],
  },
  {
    category: 'Healthcare',
    icon: '🏥',
    places: [
      'Yashodhara Hospital - 5 Mins',
      'Ashwini Hospital - 8 Mins',
      'Unique Hospital - 3 Mins',
    ],
  },
  {
    category: 'Hotels & Entertainment',
    icon: '🎭',
    places: [
      'Park Chowpaty - 10 Mins',
      'Oasis Mall - 15 Mins',
      'Hotel Aishwarya - 15 Mins',
      'Hotel City Park - 15 Mins',
    ],
  },
  {
    category: 'Commercial Hubs',
    icon: '🏢',
    places: [
      'Navi Peth - 5 Mins',
      'Laxmi Market - 3 Mins',
      'Saraf Bazar - 5 Mins',
      'Chatti Galli - 5 Mins',
      'Park Chowk - 7 Mins',
    ],
  },
  {
    category: 'Education Institutes',
    icon: '🎓',
    places: [
      'Saraswati School - 5 Mins',
      'Siddheshwar Highschool - 5 Mins',
      'Siddheshwar Home Science - 5 Mins',
    ],
  },
  {
    category: 'Faith & Historical Sites',
    icon: '⛪',
    places: [
      'Ganapati Ghat Mandir - 5 Mins',
      'Famous Bhuikot Fort - 5 Mins',
      'Siddheshwar Mandir - 5 Mins',
    ],
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function Location() {
  return (
    <section
      id='location'
      className='py-16 bg-gradient-to-b from-neutral-900 to-neutral-800'
    >
      <div className=' container mx-auto px-4'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-5xl font-bold text-white mb-4'>
            Strategic Location
          </h2>
          <p className='text-gray-300 text-lg max-w-2xl mx-auto'>
            Discover the perfect blend of connectivity and convenience in a
            prime location that caters to all your needs.
          </p>
        </motion.div>

        <div className='grid lg:grid-cols-10 gap-8'>
          <motion.div
            className='lg:col-span-5 w-full'
            variants={staggerContainer}
            initial='initial'
            animate='animate'
          >
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              {landmarksData.map((category, index) => (
                <motion.div
                  key={index}
                  className='bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-neutral-700'
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <div className='flex items-center gap-3 mb-4'>
                    <span className='text-2xl'>{category.icon}</span>
                    <h4 className='text-white font-semibold text-lg sm:text-xl'>
                      {category.category}
                    </h4>
                  </div>
                  <ul className='space-y-2'>
                    {category.places.map((place, idx) => (
                      <li
                        key={idx}
                        className='text-gray-300 hover:text-yellow-400 transition-all pl-4 border-l border-neutral-700 text-sm sm:text-base'
                      >
                        {place}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className='lg:col-span-5 space-y-6 w-full'
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className='bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-neutral-700'>
              <h3 className='text-white text-lg sm:text-xl font-semibold mb-4'>
                Location Map
              </h3>
              <div className='w-full bg-neutral-700/50 rounded-lg overflow-hidden'>
                <iframe
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3440.1565206360515!2d75.90266128211911!3d17.67398090314371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc5db6c776555f1%3A0xea015ee88a1278c!2sParas%20Business%20Park!5e1!3m2!1sen!2sin!4v1742235709460!5m2!1sen!2sin'
                  className='w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[608px]'
                  loading='lazy'
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
