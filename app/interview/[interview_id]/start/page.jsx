"use client";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Timer, Mic, Phone, Loader2Icon } from 'lucide-react';
import { InterviewDataContext } from '@/context/InterviewDataContext';
import Image from 'next/image';
import Vapi from "@vapi-ai/web";
import AlertConfirmation from './_components/AlertConfirmation';
import { toast } from 'sonner';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function StartInterview() {
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const vapiRef = useRef(null);
  const [activeUser, setActiveUser] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [conversation, setConversation] = useState([]);
  const { interview_id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const callStartedRef = useRef(false);

  const formatTime = (totalSeconds) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}.${minutes}.${seconds}`;
  };

  useEffect(() => {
    vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
    const vapi = vapiRef.current;
    let interval;

    const handleMessage = (message) => {
      console.log('Message:', message);
      if (message?.conversation) {
        const convoString = JSON.stringify(message.conversation);
        console.log('Conversation:', convoString);
        setConversation(convoString);
      }
    };

    vapi.on("call-start", () => {
      console.log("Call has started.");
      toast('Call Connected...');
      setSecondsElapsed(0);

      interval = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    });

    vapi.on("speech-start", () => {
      console.log("Assistant speech has started.");
      setActiveUser(false);
    });

    vapi.on("speech-end", () => {
      console.log("Assistant speech has ended.");
      setActiveUser(true);
    });

    vapi.on("call-end", () => {
      console.log("Call has ended.");
      toast('Interview Ended');
      clearInterval(interval);
      callStartedRef.current = false;  
      GenerateFeedback();
    });

    vapi.on("message", handleMessage);

    return () => {
      vapi.off("message", handleMessage);
      clearInterval(interval);
    };
  }, []);  

  useEffect(() => {
    if (interviewInfo && !callStartedRef.current) {
      callStartedRef.current = true;
      startCall();
    }
  }, [interviewInfo]);

  const startCall = async () => {
       
    if (interviewInfo?.participants) {
      
    interviewInfo.participants.forEach((participant) => {
       console.log(`Participant name: ${participant.name}, email: ${participant.email}`);    
       sendNotification(participant.email, "Interview is starting");
      });

  } else {
    console.warn("Participants list is missing or null");
  }

    const vapi = vapiRef.current;
    let questionList = "";

    (interviewInfo?.interviewData?.questionList || []).forEach((item) => {
        questionList += item?.question + ", ";
  });

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobPosition}?`,
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions and assess their responses.
Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. 
Example: "Hey there! Welcome to your ${interviewInfo?.interviewData?.jobPosition} interview. Let’s get started with a few questions!"
Ask one question at a time and wait for the candidate’s response before proceeding. 
Keep the questions clear and concise. 
Questions: ${questionList}
If the candidate struggles, offer hints or rephrase the question without giving away the answer.
Example: "Need a hint? Think about how React tracks component updates!"
Provide brief, encouraging feedback after each answer. 
Example: "Nice! That’s a solid answer." / "Hmm, not quite! Want to try again?"
Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let’s tackle a tricky one!"
After 5–7 questions, wrap up the interview smoothly by summarizing their performance.
Example: "That was great! You handled some tough questions well. Keep sharpening your skills!"
End on a positive note: "Thanks for chatting! Hope to see you crushing projects soon!"
Key Guidelines:
✔️ Be friendly, engaging, and witty
✔️ Keep responses short and natural, like a real conversation
✔️ Adapt based on the candidate’s confidence level
✔️ Ensure the interview remains focused on React
`.trim(),
          },
        ],
      },
    };

    try {
      await vapi.start(assistantOptions);
    } catch (err) {
      console.error("Vapi start error:", err);
    }
  };

  const GenerateFeedback = async () => {
  setLoading(true);
  try {
    const result = await axios.post('/api/ai-feedback', { conversation });
    const content = result.data.content;

    let feedbackData;

    try {
      const FINAL_CONTENT = content.replace(/```json/g, "").replace(/```/g, "").trim();
      feedbackData = JSON.parse(FINAL_CONTENT); 
    } catch (parseErr) {
      console.warn("Parsing fallback: returning raw string as feedback");
      feedbackData = { raw: content }; 
    }

    const { data, error } = await supabase
      .from('interview-feedback')
      .insert([
        {
          userName: interviewInfo?.userName,
          userEmail: interviewInfo?.userEmail,
          interview_id: interview_id,
          feedback: JSON.stringify(feedbackData), 
          recommended: false,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      toast.error("Failed to save feedback.");
      setLoading(false);
      return;
    }

    console.log("Feedback saved:", data);
    router.replace('/interview/' + interview_id + '/completed');
  } catch (err) {
    console.error("Feedback generation error:", err);
    toast.error("Error generating feedback.");
  } finally {
    setLoading(false);
  }
};
   
  const stopInterview = () => {
    vapiRef.current?.stop();
  };

  return (
    <div className="p-20 lg:px-48 xl:px-56">
      <h2 className="font-bold text-2xl flex justify-between">
        Interview Session
        <span className="flex items-center gap-2">
          <Timer />
          {formatTime(secondsElapsed)}
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
        
        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <div className="relative w-[60px] h-[60px]">
            {!activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
            )}
            <Image
              src="/Face.jpg"
              alt="face"
              width={100}
              height={100}
              className="w-[60px] h-[60px] rounded-full object-cover"
            />
          </div>
          <h2>Recruiter</h2>
        </div>

        
        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <div className="relative w-[60px] h-[60px]">
            {activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
            )}
            <h2 className="text-2xl bg-primary text-white p-3 rounded-full px-5">
              {interviewInfo?.userName?.[0] || 'U'}
            </h2>
          </div>
          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>

      <div className="flex items-center gap-5 mt-5 justify-center">
         <Mic className="h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer" />
        {/*<AlertConfirmation stopInterview={stopInterview}> */}
  {
    !loading 
    ? (
      <Phone 
        className="h-12 w-12 p-3 bg-red-500 text-white rounded-full cursor-pointer"
        onClick={() => stopInterview()}
      />
    ) 
    : (
      <Loader2Icon className='animate-spin' />
    )
  }
  {/*</AlertConfirmation>*/}
      </div>

      <h2 className="text-sm text-gray-400 mt-5 text-center">Interview in Progress...</h2>
    </div>
  );
}

export default StartInterview;