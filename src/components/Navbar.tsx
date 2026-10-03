import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='fixed w-full z-50  bg-white/80 backdrop-blur-sm'>
      <div className='max-w-8xl mx-auto px-4 sm:px-6 xl:px-8'>
        <div className='flex items-center justify-between h-20'>
          <div className='flex-shrink-0 flex items-center'>
            <a href='#home'>
              <img
                src='/paras_logo.png'
                className='h-10 sm:h-12 md:h-14 w-auto max-w-[240px] sm:max-w-[280px] object-contain transition-transform duration-200 hover:scale-105'
                alt='Paras Business Park Logo'
              />
            </a>
          </div>

          <div className='hidden xl:block'>
            <div className='ml-10 flex items-center space-x-6'>
              {[
                'Home',
                'About',
                'Features',
                'Gallery',
                'Amenities',
                'Site Plans',
                'Location',
                'Bookings',
                'Contact',
                'Blogs',
              ].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`transition-colors px-3 py-2 rounded-md text-sm font-bold ${
                    item === 'Bookings'
                      ? 'bg-primary/10 text-primary hover:bg-primary hover:text-white border border-primary/30 rounded-lg'
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div className='xl:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='text-gray-700 hover:text-primary transition-colors'
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className='xl:hidden bg-white/95 backdrop-blur-sm shadow-xl'
        >
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            {[
              'Home',
              'About',
              'Features',
              'Gallery',
              'Amenities',
              'Site Plans',
              'Location',
              'Bookings',
              'Contact',
              'Blogs',
            ].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className='text-gray-700 hover:text-primary block px-3 py-2 rounded-md text-base font-medium'
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      )}


    </nav>
  );
}
