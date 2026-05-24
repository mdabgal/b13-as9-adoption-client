"use client"
import React from 'react';
import heroImg from "@/assets/images/hero2.jpg";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from "framer-motion";
const Hero = () => {
    return (
         <section className="w-full bg-white dark:bg-gray-800 py-12 md:py-24">
            
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                   
              <div className="order-2 lg:order-1 text-center lg:text-left">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 text-green-600 bg-green-50 rounded-full font-bold text-sm tracking-wide">
         <span>TRUSTED PET ADOPTION</span>
                            </div>
                            
         <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-[1.1]">
            Find Your New <br /> 
                <span className="text-green-600">Best Friend</span>
                            </h1 >
                            
             <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed">
                     Join our community of pet lovers. We help you find the perfect 
                         companion from local shelters. Give a second chance to a pet in need.
                            </p>

         {/* <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
             <Link
                 href="/pets"
               className="px-10 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-green-200 text-center text-lg"
                 >
                Adopt Now
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-10 py-4 border-2 border-gray-800 dark:border-gray-600 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 font-bold rounded-lg transition-all text-center text-lg"
                                >
                                    Get Started
                                </Link>
                            </div> */}


                            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">

  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Link
      href="/pets"
      className="px-10 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-green-200 text-center text-lg block"
    >
      Adopt Now
    </Link>
  </motion.div>

  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Link
      href="/register"
      className="px-10 py-4 border-2 border-gray-800 dark:border-gray-600 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 font-bold rounded-lg transition-all text-center text-lg block"
    >
      Get Started
    </Link>
  </motion.div>

</div>

                          
             <div className="flex items-center justify-center lg:justify-start gap-8 pt-8">
                     <div>
                     <p className="text-2xl font-bold text-gray-900 dark:text-white">1,200+</p>
                 <p className="text-sm text-gray-500">Pets Housed</p>
                    </div>
                                <div className="w-px h-10 bg-gray-200"></div>
                                <div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">850+</p>
                                    <p className="text-sm text-gray-500">Happy Families</p>
                                </div>
                            </div>
                        </div>
                          </div>

                    <div className="order-1 lg:order-2">
                        <div className="relative">
                         
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-green-100 rounded-full -z-10 blur-3xl opacity-60"></div>
                            
                 <div className="relative overflow-hidden rounded-2xl shadow-2xl border-[10px] border-white dark:border-gray-800 transform lg:-rotate-2 hover:rotate-0 transition-transform duration-500">
                 <Image
                      src={heroImg}
                       alt='hero Img'
                       width={500}
                       priority={true}
                      height={200}

                     className='w-full h-[300px] md:h-[500px] lg:h-[600px] object-cover rounded-2xl'
                  />
                                
                              
                                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                           <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl">
                                           
                        </div>
                      <div>
                           <p className="text-sm font-bold text-gray-900">Buddy is waiting</p>
                          <p className="text-xs text-gray-600">Golden Retriever • 2 years</p>
                           </div>
                            </div>
                           <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-1 rounded-md uppercase">
                                        Available
                           </span>
                                </div>
                 </div>
                        </div>
                         </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;