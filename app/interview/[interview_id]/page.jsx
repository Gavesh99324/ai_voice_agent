"use client";

import React, { useContext, useEffect, useState } from 'react';
import InterviewHeader from '../_components/InterviewHeader';
import { motion } from 'framer-motion';
import { IoIosMic } from "react-icons/io";
import { TypeAnimation } from 'react-type-animation';
import Image from 'next/image';
import { Clock, Info, Video, Settings, Loader2Icon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { supabase } from '@/services/supabaseClient';
import { toast } from 'sonner';
import { InterviewDataContext } from '@/context/InterviewDataContext';
import { useRouter } from 'next/navigation';
import QuestionList from '@/app/(main)/dashboard/create-interview/_components/QuestionList';

function Interview() {

  const {interview_id} = useParams();
  console.log(interview_id);

  useEffect(() => {
    interview_id && GetInterviewDetails();
  }, [interview_id]);

  const [interviewData, setInterviewData] = useState();
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const {interviewInfo, setInterviewInfo} = useContext(InterviewDataContext);

  const router = useRouter(); 


  const GetInterviewDetails = async () => {
    setLoading(true); 
    try{
    let { data: Interviews, error } = await supabase
      .from('Interviews')
      .select("jobPosition, jobDescription, duration, type")
      .eq('interview_id', interview_id); 

      setInterviewData(Interviews[0]);
      setLoading(false);
      if (Interviews?.length == 0) {
        toast('Incorrect Interview Link');
        return; 
      }
      console.log(Interviews[0]);

    } catch (e) {
      setLoading(false);
      toast('Incorrect Interview Link');
    }
  }

  const onJoinInterview = async () => {
    setLoading(true);
    let { data: Interviews, error } = await supabase
     .from('Interviews')
     .select('*')    
     .eq('interview_id', interview_id); 
 
     console.log(Interviews[0]);
     setInterviewInfo({
      userName: userName,
      userEmail: userEmail,
      interviewData: Interviews[0]
     });
     router.push('/interview/' + interview_id + '/start');
     setLoading(false);
  }

  return (
    <div className={"px-10 md:px-28 lg:px-40 xl:px-64 mt-16 mb-20"}>
      <div className={"flex flex-col items-center justify-center border rounded-xl bg-white p-5 lg:px-52 mb-20"}>
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

        <h2 className={"font-bold text-xl mt-3"}>{interviewData?.jobPosition}</h2>
        <h2 className={"flex gap-2 items-center text-gray-400 mt-3"}><Clock className={"w-4 h-4"} /> {interviewData?.duration}</h2>

        <div className={"w-full"}>
          <h2>Enter Full Name</h2>
          <Input placeholder="e.g. John Doe" value={userName} onChange={(event) => setUserName(event.target.value)}/>
        </div>

        <div className={"w-full"}>
          <h2>Enter Your Email</h2>
          <Input placeholder="e.g. john@gmail.com" value={userName} onChange={(event) => setUserEmail(event.target.value)}/>
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

        <Button className={"mt-5 w-full font-bold"} disabled={userName.trim() === '' } onClick={() => {onJoinInterview()}}>
          <Video/>{loading && <Loader2Icon />}Join Interview
        </Button>
        <Button className={"mt-5 w-full font-bold bg-gray-300"} ><Settings/>Test Audio & Video</Button>
      </div>
    </div>
  )
};

export default Interview;

