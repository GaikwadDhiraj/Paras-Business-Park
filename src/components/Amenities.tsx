import { motion } from 'framer-motion';
import { Building, HeartPulse, Shield } from 'lucide-react';

export function Amenities() {
  const amenities = [
    {
      icon: Building,
      title: 'High-Speed Elevators',
      details: [
        'Three branded lifts',
        'Smart card access',
        'High-speed operation',
        'Service elevator',
        'Emergency backup',
      ],
    },
    {
      icon: HeartPulse,
      title: 'Medical Facilities',
      details: [
        'First aid center',
        'Emergency response',
        'Ambulance on call',
        'Trained medical staff',
      ],
    },
    {
      icon: Shield,
      title: 'Security Systems',
      details: [
        '24/7 CCTV surveillance',
        'Biometric access',
        'Security personnel',
        'Fire safety systems',
      ],
    },
  ];

  return (
    <section id='amenities' className='py-20 bg-neutral-900'>
      <div className='max-w-7xl md:pb-24 mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
            World-Class Amenities
          </h2>
          <p className='text-gray-400 text-lg'>
            Exceptional facilities, Everything You Need Under One Roof.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {amenities.map((amenity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className='group perspective cursor-pointer'
            >
              <div className='relative preserve-3d group-hover:my-rotate-y-180 duration-1000 w-full h-72'>
                <div className='absolute backface-hidden w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-700 rounded-xl p-6 flex flex-col items-center justify-center'>
                  <amenity.icon className='w-16 h-16 text-primary mb-4' />
                  <h3 className='text-xl font-semibold text-white mb-2'>
                    {amenity.title}
                  </h3>
                  <p className='text-gray-400 text-center'>
                    Click to learn more
                  </p>
                </div>
                <div className='absolute my-rotate-y-180 backface-hidden w-full h-full bg-primary rounded-xl p-6 flex items-center justify-center'>
                  <ul className='text-white text-lg text-center space-y-2'>
                    {amenity.details.map((detail, i) => (
                      <li key={i}>• {detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>
        {`
          .perspective {
            perspective: 1000px;
          }
          .preserve-3d {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
          .my-rotate-y-180 {
            transform: rotateY(180deg);
          }
          .group:hover .group-hover\\:my-rotate-y-180 {
            transform: rotateY(180deg);
          }
        `}
      </style>
    </section>
  );
}

// import { motion } from "framer-motion";
// import { Dumbbell, Car, Coffee, Wifi, Shield, Zap, Phone, Building } from "lucide-react";

// export function Amenities() {
//   const amenities = [
//     {
//       icon: Dumbbell,
//       title: "Fitness Center",
//       description: "State-of-the-art gym with modern equipment",
//     },
//     {
//       icon: Car,
//       title: "Parking",
//       description: "Multi-level parking with valet service",
//     },
//     {
//       icon: Coffee,
//       title: "Cafeteria",
//       description: "Multi-cuisine food court and coffee shops",
//     },
//     {
//       icon: Wifi,
//       title: "High-Speed Internet",
//       description: "Fiber-optic connectivity throughout",
//     },
//     {
//       icon: Shield,
//       title: "Security",
//       description: "24/7 security with CCTV surveillance",
//     },
//     {
//       icon: Zap,
//       title: "Power Backup",
//       description: "100% power backup for uninterrupted operations",
//     },
//     {
//       icon: Phone,
//       title: "Conference Facilities",
//       description: "Modern meeting and conference rooms",
//     },
//     {
//       icon: Building,
//       title: "Recreation Area",
//       description: "Landscaped gardens and breakout zones",
//     },
//   ];

//   return (
//     <section id="amenities" className="py-20 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//             className="text-4xl font-bold text-gray-900 mb-4"
//           >
//             Premium Amenities
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             viewport={{ once: true }}
//             className="text-xl text-gray-600"
//           >
//             Everything You Need Under One Roof
//           </motion.p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {amenities.map((amenity, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               viewport={{ once: true }}
//               whileHover={{ scale: 1.05 }}
//               className="bg-purple-50 p-6 rounded-xl text-center"
//             >
//               <amenity.icon className="w-12 h-12 mx-auto text-purple-600 mb-4" />
//               <h3 className="text-xl font-bold text-gray-900 mb-2">{amenity.title}</h3>
//               <p className="text-gray-600">{amenity.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
