import { useState, useEffect, useRef, FormEvent } from 'react';
import { Mail, MapPin, Phone, Check, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
interface IntersectionOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

interface FormValues {
  name: string;
  email: string;
  phone: string;
  place: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  place?: string;
  message?: string;
}

const useInView = (
  ref: React.RefObject<HTMLElement>,
  options: IntersectionOptions = {}
) => {
  const [isInView, setIsInView] = useState<boolean>(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (options.freezeOnceVisible) {
          observer.unobserve(ref.current!);
        }
      }
    }, options);

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return isInView;
};

export function Contact(): JSX.Element {
  const svgRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(svgRef, { freezeOnceVisible: true });
  const [startAnimation, setStartAnimation] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    email: '',
    phone: '',
    place: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (isInView) {
      setStartAnimation(true);
      // Start timer to show form after 2.5 seconds
      const timer = setTimeout(() => {
        setShowForm(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formValues.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formValues.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formValues.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formValues.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }
    if (!formValues.place.trim()) {
      newErrors.place = 'Place is required';
    }
    if (!formValues.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // 1. Send via EmailJS (original email system)
      const emailPromise = emailjs.send(
        'service_rk4l94g',
        'template_ptjdo1a',
        {
          name: formValues.name,
          email: formValues.email,
          phone: formValues.phone,
          place: formValues.place,
          message: formValues.message,
          to_email: 'parasbusinesspark@gmail.com',
        },
        '_ZtJgXsdlblGBy_hx'
      ).catch((err) => console.error('EmailJS notification error:', err));

      // 2. Save to Neon PostgreSQL Database via API
      const dbPromise = fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      }).then(async (res) => {
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || 'Failed to save to database');
        }
        return res.json();
      });

      await Promise.allSettled([emailPromise, dbPromise]);

      setSubmitSuccess(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormValues({
          name: '',
          email: '',
          phone: '',
          place: '',
          message: '',
        });
        setSubmitSuccess(false);
      }, 4000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ message: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <section id='contact'>
      <div className='min-h-screen w-full bg-background py-32 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center'>
            <div className='w-full lg:w-1/2 space-y-6'>
              <div className='flex flex-col items-center md:items-start mb-8'>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className='text-4xl md:text-6xl font-bold text-gray-900 md:mb-4'
                >
                  Get in Touch
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className='text-xl ml-4 text-gray-600'
                >
                  We'd Love to Hear from You
                </motion.p>
              </div>

              <div className='space-y-2 md:space-y-4 w-full flex flex-col items-start ml-8 md:ml-0'>
                <div className='flex items-center gap-4 justify-center lg:justify-start p-4 rounded-lg hover:bg-accent transition-colors'>
                  <Mail className='w-6 h-6 flex-shrink-0' />
                  <div>
                    <a href='mailto:parasbusinesspark@gmail.com'>
                      <h2 className='font-semibold'>Mail</h2>
                      <span className='text-gray-600'>
                        parasbusinesspark@gmail.com
                      </span>
                    </a>
                  </div>
                </div>

                <div className='flex items-center gap-4 justify-center lg:justify-start p-4 rounded-lg hover:bg-accent transition-colors'>
                  <MapPin className='w-6 h-6 flex-shrink-0' />
                  <div>
                    <h2 className='font-semibold'>Address</h2>
                    <span className='text-gray-600'>
                      CS No.5/A1, South Kasba, Datta Chowk, Solapur 413007
                      Maharashtra India
                    </span>
                  </div>
                </div>

                <div className='flex items-center gap-4 justify-center lg:justify-start p-4 rounded-lg hover:bg-accent transition-colors'>
                  <Phone className='w-6 h-6 flex-shrink-0' />
                  <div>
                    <h2 className='font-semibold'>Phone</h2>
                    <div className='flex flex-col'>
                      <a href='tel:8888466667'>
                        <span className='text-gray-600 tracking-widest'>
                          8888466667
                        </span>
                      </a>
                      <a href='tel:8390905030'>
                        <span className='text-gray-600 tracking-widest'>
                          8390905030
                        </span>
                      </a>
                      <a href='tel:8390905040'>
                        <span className='text-gray-600 tracking-widest'>
                          8390905040
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='w-full lg:w-1/2 relative h-[400px] sm:h-[450px]'>
              <div
                ref={svgRef}
                className='absolute inset-0 flex items-center justify-center'
              >
                {!showForm ? (
                  <svg
                    viewBox='0 0 32.666 32.666'
                    className='w-4/5 h-4/5 sm:w-full sm:h-full text-orange-500'
                    style={{ maxWidth: '400px', maxHeight: '400px' }}
                  >
                    <path
                      strokeWidth={0.2}
                      fill='none'
                      stroke='currentColor'
                      className={startAnimation ? 'animate-draw' : ''}
                      d='M28.189,16.504h-1.666c0-5.437-4.422-9.858-9.856-9.858l-0.001-1.664C23.021,4.979,28.189,10.149,28.189,16.504z
                    M16.666,7.856L16.665,6.192c4.487,0,8.129,3.633,8.129,8.113h-1.665C23.129,10.722,20.243,7.856,16.666,7.856z
                    M16.333,0C7.326,0,0,7.326,0,16.334c0,9.006,7.326,16.332,16.333,16.332c0.557,0,1.007-0.45,1.007-1.006
                    c0-0.559-0.45-1.01-1.007-1.01c-7.896,0-14.318-6.424-14.318-14.316c0-7.896,6.422-14.319,14.318-14.319
                    c7.896,0,14.317,6.424,14.317,14.319c0,3.299-1.756,6.568-4.269,7.954c-0.913,0.502-1.903,0.751-2.959,0.761
                    c0.634-0.377,1.183-0.887,1.591-1.529c0.08-0.121,0.186-0.228,0.238-0.359c0.328-0.789,0.357-1.684,0.555-2.518
                    c0.243-1.064-4.658-3.143-5.084-1.814c-0.154,0.492-0.39,2.048-0.699,2.458c-0.275,0.366-0.953,0.192-1.377-0.168
                    c-1.117-0.952-2.364-2.351-3.458-3.457l0.002-0.001c-0.028-0.029-0.062-0.061-0.092-0.092c-0.031-0.029-0.062-0.062-0.093-0.092
                    v0.002c-1.106-1.096-2.506-2.34-3.457-3.459c-0.36-0.424-0.534-1.102-0.168-1.377c0.41-0.311,1.966-0.543,2.458-0.699
                    c1.326-0.424-0.75-5.328-1.816-5.084c-0.832,0.195-1.727,0.227-2.516,0.553c-0.134,0.057-0.238,0.16-0.359,0.24
                    c-2.799,1.774-3.16,6.082-0.428,9.292c1.041,1.228,2.127,2.416,3.245,3.576l-0.006,0.004c0.031,0.031,0.063,0.06,0.095,0.09
                    c0.03,0.031,0.059,0.062,0.088,0.095l0.006-0.006c1.16,1.118,2.535,2.765,4.769,4.255c4.703,3.141,8.312,2.264,10.438,1.098
                    c3.67-2.021,5.312-6.338,5.312-9.719C32.666,7.326,25.339,0,16.333,0z'
                    />
                  </svg>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className='w-full max-w-md'
                  >
                    {submitSuccess ? (
                      <div className='bg-white rounded-xl shadow-lg p-8 text-center'>
                        <div className='bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                          <Check className='h-8 w-8 text-green-500' />
                        </div>
                        <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                          Message Sent!
                        </h3>
                        <p className='text-gray-600'>
                          Thank you for reaching out. We'll get back to you
                          soon.
                        </p>
                      </div>
                    ) : (
                      <form
                        onSubmit={handleSubmit}
                        className='space-y-2 mt-4 w-full max-w-md bg-white border rounded-xl shadow-lg p-6'
                      >
                        <div>
                          <label
                            htmlFor='name'
                            className='block text-sm font-medium text-gray-700'
                          >
                            Name
                          </label>
                          <input
                            type='text'
                            id='name'
                            name='name'
                            value={formValues.name}
                            onChange={handleChange}
                            className={`mt-1 p-2 bg-gray-50 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                              errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.name && (
                            <p className='mt-1 text-sm text-red-500'>
                              {errors.name}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor='email'
                            className='block text-sm font-medium text-gray-700'
                          >
                            Email
                          </label>
                          <input
                            type='email'
                            id='email'
                            name='email'
                            value={formValues.email}
                            onChange={handleChange}
                            className={`mt-1 p-2 bg-gray-50 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                              errors.email
                                ? 'border-red-500'
                                : 'border-gray-300'
                            }`}
                          />
                          {errors.email && (
                            <p className='mt-1 text-sm text-red-500'>
                              {errors.email}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor='phone'
                            className='block text-sm font-medium text-gray-700'
                          >
                            Phone
                          </label>
                          <input
                            type='number'
                            id='phone'
                            name='phone'
                            value={formValues.phone}
                            onChange={handleChange}
                            className={`mt-1 p-2 bg-gray-50 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                              errors.phone
                                ? 'border-red-500'
                                : 'border-gray-300'
                            }`}
                          />
                          {errors.phone && (
                            <p className='mt-1 text-sm text-red-500'>
                              {errors.phone}
                            </p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor='place'
                            className='block text-sm font-medium text-gray-700'
                          >
                            Place
                          </label>
                          <input
                            type='text'
                            id='place'
                            name='place'
                            value={formValues.place}
                            onChange={handleChange}
                            className={`mt-1 p-2 bg-gray-50 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                              errors.place
                                ? 'border-red-500'
                                : 'border-gray-300'
                            }`}
                          />
                          {errors.place && (
                            <p className='mt-1 text-sm text-red-500'>
                              {errors.place}
                            </p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor='message'
                            className='block text-sm font-medium text-gray-700'
                          >
                            Message
                          </label>
                          <textarea
                            id='message'
                            name='message'
                            rows={3}
                            value={formValues.message}
                            onChange={handleChange}
                            className={`mt-1 p-2 block w-full bg-gray-50 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                              errors.message
                                ? 'border-red-500'
                                : 'border-gray-300'
                            }`}
                          ></textarea>
                          {errors.message && (
                            <p className='mt-1 text-sm text-red-500'>
                              {errors.message}
                            </p>
                          )}
                        </div>

                        <button
                          type='submit'
                          disabled={isSubmitting}
                          className='w-full bg-orange-500 text-white py-3 px-6 rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center'
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className='animate-spin mr-2 h-5 w-5' />
                              Sending...
                            </>
                          ) : (
                            'Send Message'
                          )}
                        </button>
                      </form>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes draw {
            from { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
            to { stroke-dasharray: 1000; stroke-dashoffset: 0; }
          }

          .animate-draw { animation: draw 5s ease-in-out infinite; }
        `}
      </style>
    </section>
  );
}
