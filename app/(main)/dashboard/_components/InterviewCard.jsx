import React from 'react';
import moment from 'moment';
import { Button } from '@/components/ui/button';
import { Copy, Send } from 'lucide-react';
import { toast } from 'sonner';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

function InterviewCard({ interview, viewDetail=false }) {

  const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interview?.interview_id; 

   const copyLink = () => {
      navigator.clipboard.writeText(url);
      toast('Link Copied');
    }

    const onSend = () => {
      window.location.href = 'mailto:' + interview?.userEmail + '?subject=' + interview?.jobPosition + '&body=' + interview?.jobDescription;
    }


  return (
    <div className={"p-5 bg-white rounded-lg border"}>
       <div className={"flex items-center justify-between"}>
          <div className={"h-[40px] w-[40px] bg-primary rounded-full"}></div>
          <h2 className={"text-sm"}>{moment(interview?.created_at).format('MMMM Do YYYY, h:mm:ss a')}</h2>
       </div>

       <h2 className={"text-black font-bold mt-3 text-lg"}>{interview?.jobPosition}</h2>
       <h2 className={"mt-2 flex justify-between text-gray-500"}>{interview?.duration}
        <span className={"text-green-700"}>{interview['interview-feedback']?.length} User</span>
       </h2>

       {!viewDetail? 
       <div className={"flex gap-3 w-full mt-5"}>
        <Button variant={'outline'} className={"flex-1"} onClick={() => copyLink()}><Copy /> Copy Link</Button>
        <Button className={"flex-1"} onClick={() => onSend()}><Send /> Send Invite</Button>
       </div>
       : 
       <Link href={'/scheduled-interview/' + interview?.interview_id + '/details'}>
        <Button className={"mt-5 w-full"} variant={'outline'}>View Detail <ArrowRight /></Button>
       </Link>
       }
    </div>
  )
}

export default InterviewCard;
