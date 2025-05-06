"use client";

import React from 'react';
import { useUser } from '@/app/provider';

function WelcomeContainer() {

    const { user } = useUser() || {};
    console.log(user);
    console.log('user:', user);


    /*
     if (!user) {
        return <div>Loading...</div>; // Show loading state until user data is available
      }
    */


  return (
    <div>
      <div className={"bg-white p-3 rounded-2xl"}>
        <h2 className={"text-lg font-bold"}>Welcome Back, {user?.name || 'Guest'}</h2>
        <h2 className={"text-secondary"}>AI-Driven Interviews, Simplified, Hustle-Free Hiring</h2>
      </div>
    </div>
  )
}

export default WelcomeContainer;
