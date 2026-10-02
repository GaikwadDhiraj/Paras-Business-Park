import { motion } from 'framer-motion';
import { AnimatedText } from './ui/animated-text';
import {
  Lock,
  Building2,
  Store,
  Home,
  DoorOpen,
  Film,
  Trees,
  ParkingSquare,
} from 'lucide-react';

export function About() {
  const stats = [
    {
      icon: Lock,
      value: '35000 sq ft.',
      label: 'Privately Accessed',
    },
    {
      icon: Building2,
      value: 'G+6 Storey',
      label: 'Spacious Building',
    },
    {
      icon: Store,
      value: 'Multiple',
      label: 'Showroom Shops & Offices',
    },
    {
      icon: Home,
      value: '2 & 3 BHK',
      label: 'Luxurious Residences',
    },
    {
      icon: DoorOpen,
      value: 'Designer',
      label: 'Entrance Lobby',
    },
    {
      icon: Film,
      value: '3 Screens',
      label: 'Large Multiplex',
    },
    {
      icon: Trees,
      value: 'Abundant',
      label: 'Open Spaces',
    },
    {
      icon: ParkingSquare,
      value: 'Ample',
      label: 'Parking Spaces',
    },
  ];

  return (
    <section id='about' className='py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <AnimatedText
            text='About Paras Business Park'
            className='text-4xl font-bold text-gray-900 mb-4'
          />
          <AnimatedText
            text='A Premium Business Destination in the Heart of the Solapur City'
            className='text-xl text-gray-600'
          />
        </div>

        <div className='grid md:grid-cols-2 gap-12 '>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className='flex flex-col justify-evenly mt-4'
          >
            <img
              src='/building1.jpg'
              alt='Paras Business Park Building'
              className='rounded-lg shadow-xl hover:scale-105 hover:transition  hover:ease-in-out'
            />
            <img
              src='/building2.jpg'
              alt='Paras Business Park Building'
              className='rounded-lg shadow-xl hover:scale-105 hover:transition  hover:ease-in-out'
            />
          </motion.div>

          <div className='space-y-6'>
            <AnimatedText
              text='Setting New Standards in Commercial Real Estate'
              className='text-2xl font-bold text-gray-900'
            />

            <p className='text-gray-600'>
              Paras Business Park is a state-of-the-art commercial complex
              designed to meet the evolving needs of modern businesses. With its
              strategic location, world-class amenities, and sustainable design,
              we offer the perfect environment for your business to thrive.
            </p>

            <div className='grid grid-cols-2 gap-6'>
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className='text-center p-4 rounded-lg bg-primary_lite bg-opacity-20'
                >
                  <stat.icon className='w-8 h-8 mx-auto text-primary mb-2' />
                  <div className='text-2xl font-bold text-secondary'>
                    {stat.value}
                  </div>
                  <div className='text-sm text-gray-600'>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// import { motion } from 'framer-motion';
// import { AnimatedText } from './ui/animated-text';
// import {
//   Lock,
//   Building2,
//   Store,
//   Home,
//   DoorOpen,
//   Film,
//   Trees,
//   ParkingSquare,
// } from 'lucide-react';

// export function About() {
//   const stats = [
//     {
//       icon: Lock,
//       value: '1 Acre',
//       label: 'Privately Accessed',
//     },
//     {
//       icon: Building2,
//       value: 'G+7 Storey',
//       label: 'Spacious Building',
//     },
//     {
//       icon: Store,
//       value: 'Multiple',
//       label: 'Showroom Shops & Offices',
//     },
//     {
//       icon: Home,
//       value: '2 & 3 BHK',
//       label: 'Luxurious Residences',
//     },
//     {
//       icon: DoorOpen,
//       value: 'Designer',
//       label: 'Entrance Lobby',
//     },
//     {
//       icon: Film,
//       value: '3 Screens',
//       label: 'Large Multiplex',
//     },
//     {
//       icon: Trees,
//       value: 'Abundant',
//       label: 'Open Spaces',
//     },
//     {
//       icon: ParkingSquare,
//       value: 'Ample',
//       label: 'Parking Spaces',
//     },
//   ];

//   return (
//     <section id='about' className='py-20 bg-white'>
//       <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
//         <div className='text-center mb-16'>
//           <AnimatedText
//             text='About Paras Business Park'
//             className='text-4xl font-bold text-gray-900 mb-4'
//           />
//           <AnimatedText
//             text='A Premium Business Destination in the Heart of the Solapur City'
//             className='text-xl text-gray-600'
//           />
//         </div>

//         <div className='grid md:grid-cols-2 gap-12 '>
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//             className='flex flex-col justify-evenly mt-4'
//           >
//             <img
//               src='/building1.jpg'
//               alt='Paras Business Park Building'
//               className='rounded-lg shadow-xl hover:scale-105 hover:transition  hover:ease-in-out'
//             />
//             <img
//               src='/building2.jpg'
//               alt='Paras Business Park Building'
//               className='rounded-lg shadow-xl hover:scale-105 hover:transition  hover:ease-in-out'
//             />
//           </motion.div>

//           <div className='space-y-6'>
//             <AnimatedText
//               text='Setting New Standards in Commercial Real Estate'
//               className='text-2xl font-bold text-gray-900'
//             />

//             <p className='text-gray-600'>
//               Paras Business Park is a state-of-the-art commercial complex
//               designed to meet the evolving needs of modern businesses. With its
//               strategic location, world-class amenities, and sustainable design,
//               we offer the perfect environment for your business to thrive.
//             </p>

//             <div className='grid grid-cols-2 gap-6'>
//               {stats.map((stat, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                   className='relative text-center p-4 rounded-lg bg-primary_lite bg-opacity-20 border-2 border-transparent hover:border-gradient transition-all duration-300 ease-in-out'
//                 >
//                   <stat.icon className='w-8 h-8 mx-auto text-primary mb-2' />
//                   <div className='text-2xl font-bold text-secondary'>
//                     {stat.value}
//                   </div>
//                   <div className='text-sm text-gray-600'>{stat.label}</div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       <style>
//         {`
//           .hover\\:border-gradient {
//   border-width: 2px;
//   border-image-slice: 1;
//   border-image-source: linear-gradient(90deg, #ff5733, #ffbd69, #ff5733);
//   transition: border 0.3s ease-in-out;
// }

//         `}
//       </style>
//     </section>
//   );
// }
