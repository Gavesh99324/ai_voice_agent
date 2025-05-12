"use client";

import React from 'react';
import InterviewHeader from '../_components/InterviewHeader';
import { motion } from 'framer-motion';
import { IoIosMic } from "react-icons/io";
import { TypeAnimation } from 'react-type-animation';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';

function Interview() {
  return (
    <div className={"px-10 md:px-28 lg:px-48 xl:px-64 mt-16"}>
      <div className={"flex flex-col items-center justify-center border rounded-xl bg-white p-5 lg:px-52"}>
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
          <span className="blinking-dot"></span>
        </div>
        <h2 className={"mt-3"}>AI-Powered Interview Platform</h2>
        <Image src={'/Int1.png'} width={300} height={200} alt={"interview"} />

        <h2 className={"font-bold text-xl mt-3"}>Full stack developer interview</h2>
        <h2 className={"flex gap-2 items-center text-gray-400 mt-3"}><Clock className={"w-4 h-4"} /> 30 min</h2>

        <div className={"w-full"}>
          <h2>Enter Full Name</h2>
          <Input placeholder="e.g. John Doe" />
        </div>

        <div className={"p-3 bg-blue-100 gap-4 rounded-lg mt-3"}>
          <Info className={"text-primary"} />
          <h2 className={"font-bold"}>Before you begin</h2>
          <ul className=''>
            <li className={"text-sm text-primary"}>- Test your camera and microphone</li>
            <li className={"text-sm text-primary"}>- Ensure you have a stable internet connection</li>
            <li className={"text-sm text-primary"}>- Find a Quiet place for interview</li>
          </ul>
        </div>
      </div>
    </div>
  )
};

export default Interview;

