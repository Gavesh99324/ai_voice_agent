"use client";

import React from 'react';
import { useUser } from '@/app/provider';

function WelcomeContainer() {

    const { user } = useUser() || {};
    console.log(user);
    console.log('user:', user);


  return (
    <div>
      <div className={"p-3 rounded-2xl"} style={{ backgroundColor: 'rgba(163, 235, 30, 0.4)' }}>
        <h2 className={"text-lg font-bold"}>Welcome Back, {user?.name || 'Guest'}</h2>
        <h2 className={"text-secondary"}>AI-Driven Interviews, Simplified, Hustle-Free Hiring</h2>
      </div>
    </div>
  )
}

export default WelcomeContainer;
