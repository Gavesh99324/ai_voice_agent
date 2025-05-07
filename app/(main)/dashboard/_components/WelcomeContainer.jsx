"use client";

import React from 'react';
import { useUser } from '@/app/provider';
import Image from 'next/image';

function WelcomeContainer() {

    const { user } = useUser() || {};
    console.log(user);
    console.log('user:', user);


  return (
    <div className={"p-2 rounded-xl w-full flex justify-between items-center"} style={{ backgroundColor: 'rgba(163, 235, 30, 0.4)' }}>
      <div>
        <h2 className={"text-medium font-bold"}>Welcome Back, {user?.name || 'Guest'}</h2>
        <h2 className={"text-gray-500 text-sm"}>AI-Driven Interviews, Simplified, Hustle-Free Hiring</h2>
      </div>
      {user&& <Image className="rounded-full" src={user?.picture} width={40} height={40} alt={'Welcome Image'} />}
    </div>
  )
}

export default WelcomeContainer;
