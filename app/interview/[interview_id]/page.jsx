"use client";

import React from 'react';
import InterviewHeader from '../_components/InterviewHeader';
import { motion } from 'framer-motion';
import { IoIosMic } from "react-icons/io";
import { TypeAnimation } from 'react-type-animation';

function Interview() {
  return (
    <div className={"px-10 md:px-28 lg:px-48 xl:px-64 mt-16"}>
      <div className={"flex justify-center border rounded-xl"}>
        <div className='flex items-center gap-3 relative'>

          <IoIosMic size={30} color="#A3EB1E" className="relative z-10" />

          <TypeAnimation
            sequence={['Voxicruit']}
            wrapper="span"
            speed={20}
            style={{ fontSize: '20px', fontWeight: 'bold', display: 'inline-block' }}
            repeat={0}
            cursor={false}
          />
          <span className="blinking-dot">.</span>
        </div>
      </div>
    </div>
  )
}

export default Interview;

