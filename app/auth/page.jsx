import React from 'react';
import { IoIosMic } from "react-icons/io";
import Img from '../../public/login.jpg';
import Image from 'next/image';

function Login() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex flex-col items-center gap-6'>
        {/* Icon and Text Row */}
        <div className='flex items-center gap-3'>
          <IoIosMic size={50} color="#A3EB1E" />
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Voxicruit</span>
        </div>

        {/* Image Section */}
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
