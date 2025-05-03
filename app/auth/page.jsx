"use client";

import React from 'react';
import { IoIosMic } from "react-icons/io";
import Img from '../../public/login.jpg';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';
import { motion } from "framer-motion";

function Login() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex flex-col items-center gap-6'>
        
        <div className='flex items-center gap-3 relative'>
          <motion.div
            className="absolute w-12 h-12 rounded-full border-2 border-green-300"
            animate={{ scale: [1, 1.5, 2], opacity: [1, 0.6, 0] }}
            transition={{ repeat: Infinity, duration: 1, ease: "easeOut" }}
          />

          <IoIosMic size={50} color="#A3EB1E" className="relative z-10" />

          <TypeAnimation
            sequence={['Voxicruit']}
            wrapper="span"
            speed={70}
            style={{ fontSize: '30px', fontWeight: 'bold', display: 'inline-block' }}
            repeat={0}
            cursor={false}
          />
        </div>

        <div>
          <Image 
            src={Img} 
            alt="login" 
            width={600} 
            height={400} 
            className='w-[400px] h-[250px]' 
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
