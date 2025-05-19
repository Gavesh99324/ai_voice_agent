import React from 'react';
import moment from 'moment';
import { Button } from '@/components/ui/button';
import { Copy, Send } from 'lucide-react';
import { toast } from 'sonner';

function InterviewCard({ interview }) {

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
       <h2 className={"mt-2"}>{interview?.duration}</h2>

       <div className={"flex gap-3 w-full mt-5"}>
        <Button variant={'outline'} className={"flex-1"} onClick={() => copyLink()}><Copy /> Copy Link</Button>
        <Button className={"flex-1"} onClick={() => onSend()}><Send /> Send Invite</Button>
       </div>
    </div>
  )
}

export default InterviewCard;
