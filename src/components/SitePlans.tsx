import { motion, AnimatePresence } from 'framer-motion';
import { MovingCards } from './ui/moving-cards';
import { useState } from 'react';
import { X } from 'lucide-react';

interface Plan {
  image: string;
  title: string;
  description: string;
  area?: string;
  features?: string[];
}

export function SitePlans() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const plans: Plan[] = [
    {
      image: '/12.jpg',
      title: 'B1 First Floor Layout',
      description:
        'Features premium office spaces with a professional ambiance.',
      // area: '30,000 sq ft',
      // features: ['24/7 Access', 'Valet Parking', 'Concierge Service'],
    },
    {
      image: '/1.jpg',
      title: 'Building Overview',
      description:
        'Experience a blend of retail elegance and a grand lobby designed to impress.',
      // area: '30,000 sq ft',
      // features: ['24/7 Access', 'Valet Parking', 'Concierge Service'],
    },
    {
      image: '/2.jpg',
      title: 'Basement Floor Plan',
      description:
        'Designed for convenience, offering spacious parking areas for all visitors.',
      // area: '30,000 sq ft',
      // features: ['24/7 Access', 'Valet Parking', 'Concierge Service'],
    },
    {
      image: '/4.jpg',
      title: 'Ground Floor Layout',
      description:
        'Features premium retail spaces ideal for high-end shopping experiences.',
      // area: '30,000 sq ft',
      // features: ['24/7 Access', 'Valet Parking', 'Concierge Service'],
    },
    {
      image: '/5.jpg',
      title: '2nd & 3rd Floor Design',
      description:
        'Optimized for modern businesses with premium office spaces.',
      // area: '30,000 sq ft',
      // features: ['24/7 Access', 'Valet Parking', 'Concierge Service'],
    },
    {
      image: '/6.jpg',
      title: 'Multipurpose Floors',
      description:
        'A perfect blend of office spaces and engaging gaming areas.',
      // area: '30,000 sq ft',
      // features: ['24/7 Access', 'Valet Parking', 'Concierge Service'],
    },
    {
      image: '/7.jpg',
      title: 'B1 Building Basement',
      description:
        'Offers ample parking facilities tailored for high occupancy.',
      // area: '30,000 sq ft',
      // features: ['24/7 Access', 'Valet Parking', 'Concierge Service'],
    },
    {
      image: '/8.jpg',
      title: 'B1 Ground Floor Plan',
      description:
        'Home to luxurious retail spaces catering to premium brands.',
      // area: '30,000 sq ft',
      // features: ['24/7 Access', 'Valet Parking', 'Concierge Service'],
    },
    {
      image: '/9.jpg',
      title: 'B2 Building Basement',
      description:
        'A spacious and secure parking solution for the B2 building.',
      // area: '30,000 sq ft',
      // features: ['24/7 Access', 'Valet Parking', 'Concierge Service'],
    },
    {
      image: '/10.jpg',
      title: 'B2 Ground Floor Plan',
      description:
        'Designed with efficiency, providing additional parking space.',
      // area: '30,000 sq ft',
      // features: ['24/7 Access', 'Valet Parking', 'Concierge Service'],
    },
    {
      image: '/11.jpg',
      title: 'B2 Residential Spaces',
      description: 'Discover luxurious living in the elegant B2 building.',
      // area: '30,000 sq ft',
      // features: ['24/7 Access', 'Valet Parking', 'Concierge Service'],
    },
  ];

  return (
    <section id='site plans' className='py-20 bg-gray-50'>
      <div className='max-w-8xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className='text-4xl font-bold text-gray-900 mb-4'
          >
            Site Plans
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className='text-xl text-gray-600'
          >
            Thoughtfully Designed Spaces for Every Business
          </motion.p>
        </div>

        <MovingCards
          items={plans}
          className='mb-12'
          onItemClick={setSelectedPlan}
        />

        <AnimatePresence>
          {selectedPlan && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlan(null)}
              className='fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4'
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className='bg-white rounded-xl max-w-4xl w-full overflow-hidden relative'
              >
                <button
                  onClick={() => setSelectedPlan(null)}
                  className='absolute top-1 right-1 text-white hover:text-black z-50'
                >
                  <X className='w-8 h-8 font-bold text-2xl' />
                </button>
                <div className='grid'>
                  <div className='md:h-[650px] overflow-y-auto'>
                    <div className='min-h-full w-full'>
                      <img
                        src={selectedPlan.image}
                        alt={selectedPlan.title}
                        className='w-full h-auto object-contain'
                        loading='lazy'
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
