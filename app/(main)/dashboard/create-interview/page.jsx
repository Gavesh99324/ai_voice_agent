"use client"; 

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import FormContainer from './_components/FormContainer';
import QuestionList from './_components/QuestionList';
import { toast } from 'sonner';
import InterviewLink from './_components/InterviewLink';
import { useUser } from '@/app/provider';

function CreateInterview() {

    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({}); 
    const [interviewId, setInterviewId] = useState();

    const {user} = useUser();

    const onHandleInputChange = (field, value) => {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
      console.log("Form Data:", formData);
    }

    const onGotoNext = () => {

      if (user?.credits <= 0) {
        toast('You need to buy credits to create an interview. Please buy credits and try again.')
        return;
      }

      if (!formData?.jobPosition || !formData?.jobDescription || !formData?.duration || !formData?.InterviewType) {
        toast('Please enter all details');
        return;
      }
      setStep(step + 1);
    }
 
    const onCreateLink = (interview_id) => {
      setInterviewId(interview_id);
      setStep(step + 1);
    }

  return (
    <div className={"mt-15 px-10 md:px-24 lg:px-44 xl:px-56"}>
      <div className={"flex gap-5 items-center"}>
        <ArrowLeft onClick={() => router.back()} className={"cursor-pointer"} />
        <h2 className={"font-bold text-2xl"}>Create New Interview</h2>
      </div>
        <Progress value={step * 33.33} className={"my-5"}/>
        {step === 1? <FormContainer onHandleInputChange={onHandleInputChange} 
        GoToNext={() => onGotoNext()}
        />
        : step === 2? <QuestionList formData={formData} onCreateLink={(interview_id) => onCreateLink(interview_id)} /> 
        : step == 3 ? <InterviewLink interviewId = {interviewId}
           formData={formData}
          /> : "" }
    </div>
  )
}

export default CreateInterview;
