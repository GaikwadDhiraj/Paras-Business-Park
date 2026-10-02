import { motion } from 'framer-motion';
import { AnimatedText } from './ui/animated-text';
import {
  Shield,
  Zap,
  Leaf,
  Wifi,
  Coffee,
  Car,
  Lock,
  Phone,
  Building,
} from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Shield,
      title: '24/7 Security',
      description:
        'Round-the-clock security with CCTV surveillance and trained personnel',
    },
    {
      icon: Zap,
      title: 'Power Backup',
      description: 'Generator backup for lifts and common areas',
    },
    {
      icon: Leaf,
      title: 'Green Building',
      description:
        'Solar powered common lights and lifts to reduce maintenance costs',
    },
    {
      icon: Wifi,
      title: 'High-Speed Internet',
      description: 'Fiber-optic connectivity with redundant networks',
    },
    {
      icon: Coffee,
      title: 'Food Court',
      description: 'Multi-cuisine food court with premium dining options',
    },
    {
      icon: Car,
      title: 'Ample Parking',
      description: 'Multiple parking with EV charging stations',
    },
    {
      icon: Lock,
      title: 'Access Control',
      description: 'Biometric access control for enhanced security',
    },
    {
      icon: Phone,
      title: 'Smart Building',
      description: 'Building management system with mobile app control',
    },
    {
      icon: Building,
      title: 'Modern Architecture',
      description:
        'Contemporary design with premium materials and cutting-edge construction techniques',
    },
  ];

  return (
    <section id='features' className='py-20 bg-neutral-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Animated Heading */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <AnimatedText
            text='Premium Features'
            className='text-4xl md:text-5xl font-bold text-white mb-4 animate__animated animate__fadeInUp'
          />
          <AnimatedText
            text='Discover what makes PARAS BUSINESS PARK the ideal choice for your business'
            className='text-xl text-gray-400 animate__animated animate__fadeInUp animate__delay-1s'
          />
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ translateY: -8 }}
              className={`bg-neutral-800 rounded-xl p-6 transition-all duration-300 hover:transform hover:-translate-y-2 animate__animated animate__fadeInUp ${
                index % 3 === 1
                  ? 'animate__delay-1s'
                  : index % 3 === 2
                  ? 'animate__delay-2s'
                  : ''
              }`}
            >
              <div className='w-16 h-16 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6'>
                <feature.icon className='w-10 h-10 text-primary' />
              </div>
              <h3 className='text-xl font-semibold text-white mb-3'>
                {feature.title}
              </h3>
              <p className='text-gray-400'>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
