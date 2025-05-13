"use client";

import React, { useContext } from 'react';
import { Timer, Mic, Phone } from 'lucide-react';
import { InterviewDataContext } from '@/context/InterviewDataContext';
import Image from 'next/image';
import Vapi from "@vapi-ai/web";


function StartInterview() {

  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const vapi = new Vapi("YOUR_API_KEY");
 
  return (
    <div className="p-20 lg:px-48 xl:px-56">
      <h2 className="font-bold text-2xl flex justify-between">
        Interview Session
        <span className="flex items-center gap-2">
          <Timer />
          00.00.00
        </span>
      </h2> 

      <div className={"grid grid-cols-1 md:grid-cols-2 gap-7 mt-5"}>
        <div className={"bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center"}>
          <Image src={'/Face.jpg'} alt={"face"} width={100} height={100} className={"w-[60px] h-[60px] rounded-full object-cover"} />
          <h2>Recruiter</h2>
        </div>
        <div className={"bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center"}>
          <h2 className={"text-2xl bg-primary text-white p-3 rounded-full px-5"}>{interviewInfo?.userName?.[0] || 'U'}</h2>
          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>

      <div className={"flex items-center gap-5 mt-5 justify-center"}>
        <Mic className={"h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer"} />
        <Phone className={"h-12 w-12 p-3 bg-green-500 text-white rounded-full cursor-pointer"} />
      </div>

      <h2 className={"text-sm text-gray-400 mt-5 text-center"}>Interview in Progress...</h2>

    </div>
  );
}

export default StartInterview;
