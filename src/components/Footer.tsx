export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-secondary text-white py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div className='space-y-4'>
            <div>
              <div className='flex items-end '>
                <img src='/vite.png' className='w-12 h-12 text-primary' />
                <span className='text-lg font-bold'>PARAS BUSINESS PARK</span>
              </div>
              <p className='ml-4 text-gray-400'>
                Where Business Meets Innovation
              </p>
            </div>
            {/* <p className='text-lg font-bold ml-4'>Follow us on:</p> */}
            <div className='grid items-center ml-6 mr-8 grid-cols-4 '>
              <a href='https://www.instagram.com/paras_business_park?igsh=azN2ZnlodHZ6Z3M=9'>
                <img src='/instagram.png' className='w-8 h-8' />
              </a>
              <a href='https://www.youtube.com/channel/UCpyV-jPoe5CPt6UA_CYcZEg'>
                <img src='/youtube.png' className='w-8 h-8' />
              </a>
              <a href='https://x.com/ParasBizzPark'>
                <img src='/twitter.png' className='w-8 h-8 ' />
              </a>
              <a href='https://www.facebook.com/profile.php?id=61571490455673&mibextid=ZbWKwL'>
                <img src='/facebook.png' className='w-8 h-8' />
              </a>
            </div>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <a
                  href='#about'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href='#features'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href='#gallery'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href='#site plans'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Site plans
                </a>
              </li>
              <li>
                <a
                  href='#bookings'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Bookings (Shops & 2/3 BHK)
                </a>
              </li>
              <li>
                <a
                  href='#contact'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href='#blogs'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Blogs & News
                </a>
              </li>
            </ul>



          </div>

          <div>
            <h3 className='text-lg flex items-center font-semibold '>
              Project By
            </h3>
            <ul className=' text-gray-400 mb-2'>
              <li>M/s. Priyadarshani Corporation</li>
            </ul>
            <h3 className='text-lg flex items-center font-semibold '>
              Architect
            </h3>
            <ul className=' text-gray-400 mb-2'>
              <li>Ar.Mahesh M. Patil</li>
            </ul>
            <h3 className='text-lg flex items-center font-semibold  '>
              Legal Advisior
            </h3>
            <ul className=' text-gray-400 mb-2'>
              <li>Adv.Raghunath V. Damle</li>
              <li>Adv.Umesh B. Marathe</li>
            </ul>
            <h3 className='text-lg flex items-center font-semibold'>
              Structural Design
            </h3>
            <ul className=' text-gray-400 mb-2'>
              <li>Er.Prakesh A.Sangave</li>
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4'>Office Hours</h3>
            <ul className='space-y-2 text-gray-400'>
              <li>Monday - Friday</li>
              <li>9:00 AM - 6:00 PM</li>
              <li>Saturday</li>
              <li>9:00 AM - 5:00 PM</li>
            </ul>
          </div>
        </div>

        <div className='border-t border-gray-800 mt-12 pt-8 text-center text-gray-400'>
          <p>&copy; {currentYear} Paras Business Park. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
