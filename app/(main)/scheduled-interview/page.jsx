"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/provider';
import InterviewCard from '../dashboard/_components/InterviewCard';
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';


function ScheduledInterview() {
 
    const {user} = useUser();
    const [InterviewList, setInterviewList] = useState([]);

    useEffect(() => {
        user && GetInterviewList();
    }, [user])

    const GetInterviewList = async () => {
        const {data, error} = await supabase
          .from('Interviews')
          .select(`jobPosition, duration, interview_id, interview-feedback(userEmail)`)
          .eq('userEmail', user?.email)
          //.eq('"interview-feedback".userEmail', user?.email)
          .order('id', { ascending: false })

          if (error) {
           console.error("Error fetching interviews:", error);
           setInterviewList([]);
        } else {
           setInterviewList(data); 
        }
    }


  return (
    <div className={"mt-15"}>
      <h2 className={"font-black text-xl"}>Interview List with User Reports</h2>

      {InterviewList?.length == 0 && (
              <div className={"p-5 flex flex-col gap-3 items-center mt-5"}>
                <Video className={"h-10 w-10 text-primary"} /> 
                <h2>No Interviews Found</h2>
                <Button>+ Create New Interview</Button>
              </div>
            )}
      
            {InterviewList && 
              <div className={"grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5 mt-5"}>
                {InterviewList?.map((interview, index) => (
                  <InterviewCard interview={interview} key={index} 
                  viewDetail={true}
                  />
                ))}
              </div>
            }
    </div>
  )
}

export default ScheduledInterview;
