"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/provider';
import InterviewCard from '../dashboard/_components/InterviewCard';
import { Video } from 'lucide-react';

function AllInterview() {

    
    const [ InterviewList, setInterviewList ] = useState([]);
    const {user} = useUser();

    useEffect(() => {
      user && GetInterviewList();
    }, [user])

    const GetInterviewList = async () => {
       let { data: Interviews, error } = await supabase
          .from('Interviews')
          .select('*') 
          .eq('userEmail', user?.email)
          .order('id', { ascending: false })

          console.log(Interviews);
          setInterviewList(Interviews);

    }
  
  return (
    <div className={"my-5"}>
      <h2 className={"font-bold text-2xl mt-15"}>All Interview Records</h2>

      {InterviewList?.length == 0 && (
        <div className={"p-5 flex flex-col gap-3 items-center mt-5"}>
          <Video className={"h-10 w-10 text-primary"} /> 
          <h2>No Interviews Found</h2>
          <Button>+ Create New Interview</Button>
        </div>
      )}

      {InterviewList && 
        <div className={"grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5 mt-5"}>
          {InterviewList.map((interview, index) => (
            <InterviewCard interview={interview} key={index} />
          ))}
        </div>
      }

    </div>
  )
}

export default AllInterview;
