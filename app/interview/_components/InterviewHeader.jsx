'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { IoIosMic } from "react-icons/io";
import { TypeAnimation } from 'react-type-animation';

function InterviewHeader() {
  return (
    <div className={"p-4 shadow-sm"}>
      <div className='flex items-center gap-3 relative'>
          <motion.div
            className="absolute w-11 h-11 rounded-full border-2 border-green-300"
            animate={{ scale: [1, 1.5, 2], opacity: [1, 0.6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
          />

          <IoIosMic size={50} color="#A3EB1E" className="relative z-10" />

          <TypeAnimation
            sequence={['Voxicruit']}
            wrapper="span"
            speed={20}
            style={{ fontSize: '30px', fontWeight: 'bold', display: 'inline-block' }}
            repeat={0}
            cursor={false}
          />
          <span className="blinking-dot">.</span>
        </div>
    </div>
  )
};

export default InterviewHeader;
