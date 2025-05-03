import React from 'react';
import { IoIosMic } from "react-icons/io";

function Login() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <IoIosMic size={50} color="#3DA9FC" />
        <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Voxicruit</span>
      </div>
    </div>
  );
}

export default Login;
