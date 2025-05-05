"use client";

import React from 'react';
import { IoIosMic } from "react-icons/io";
import LoginImage from '../../public/login.jpg';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { supabase } from '@/services/supabaseClient';


function Login() {

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })

    if (error) {
      console.log('Error:', error.message);
    }
  }



  return (
    <div className='flex justify-center items-center h-screen mt-10 mb-10'>
      <div className='flex flex-col items-center gap-6 border rounded-2xl p-8'>
        
        <div className='flex items-center gap-3 relative'>
          <motion.div
            className="absolute w-12 h-12 rounded-full border-2 border-green-300"
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
        </div>

        <div className='flex flex-col items-center'>
          <Image 
            src={LoginImage} 
            alt="login" 
            width={600} 
            height={400} 
            className='w-[400px] h-[250px] rounded-2xl'
            priority 
          /> 
          <h2 className='text-2xl font-bold text-center mt-5'>Welcome to Voxicruit</h2>
          <p className='text-gray-500 text-center'>Sign In With Google Authentication</p>
          <Button className={'mt-7 w-full'} onClick={signInWithGoogle}>
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
