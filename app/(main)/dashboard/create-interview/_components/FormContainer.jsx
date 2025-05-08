import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { InterviewType } from '@/services/Constants';
import { ArrowRight } from 'lucide-react';


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from '@/components/ui/button';
   

function FormContainer({ onHandleInputChange }) {

  const [interviewType, setInterviewType] = useState([]);
  
  useEffect(() => {
    if (interviewType) {
      onHandleInputChange('InterviewType', interviewType);
    }
  }, [interviewType]);

  const AddInterviewType = (type) => {
    const data = interviewType.includes(type);
    if (!data) {
      setInterviewType(prev => [...prev, type]);
    } else {
      const result = interviewType.filter(item => item !== type);
      setInterviewType(result);
    }
  }


  return (
    <>
    <div className={"p-5 bg-[rgba(163,235,30,0.1)] rounded-2xl"}>
      <div>
        <h2 className={"text-sm font-medium"}>Job Position</h2>
        <Input placeholder={"Software Engineer"} className={"mt-2"}
        onChange={(event) => onHandleInputChange('JobPosition', event.target.value)}
          />
      </div>
      <div className={"mt-5"}>
        <h2 className={"text-sm font-medium"}>Job Description</h2>
        <Textarea placeholder={"Enter Details"} className={"mt-2 h-[50px]"}
        onChange={(event) => onHandleInputChange('JobDescription', event.target.value)}
         />
      </div>
      <div className={"mt-5"}>
        <h2 className={"text-sm font-medium"}>Interview Duration</h2>
        <Select onValueChange={(value) => onHandleInputChange('Duration', value)} >
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5 Min">5 Min</SelectItem>
            <SelectItem value="15 Min">15 Min</SelectItem>
            <SelectItem value="30 Min">30 Min</SelectItem>
            <SelectItem value="45 Min">45 Min</SelectItem>
            <SelectItem value="60 Min">60 Min</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className={"mt-5"}>
        <h2 className={"text-sm font-medium"}>Interview Type</h2>
        <div className={"flex gap-3 flex-wrap mt-2"}>
            {InterviewType.map((type, index) => (
                <div key={index} className={`  flex items-center cursor-pointer gap-2 p-1 text-black hover:bg-[rgba(163,235,30,0.4)] border border-gray-300 rounded-2xl 
                  ${interviewType.includes(type.title) && 'text-[rgba(163,235,30,0.9)] text-primary'}
                   `} 
                onClick={() => AddInterviewType(type.title)}
                 >
                    <type.icon className={"h-4 w-4"}/>
                    <span>{type.title}</span>
                </div>
            ))}
        </div>
      </div>
    </div>

      {/*
      <div className={"mt-10 flex justify-end"}>
        <Button>Generate Question <ArrowRight /></Button>
      </div>
      <div className={"mt-1 flex"}>
        <Button>Cancel</Button>
      </div>
      */}

      <div className="mt-10 flex justify-end gap-38">
        <Button variant="outline">Cancel</Button>
        <Button>Generate Question <ArrowRight /></Button>
      </div>

    </>
  )
}

export default FormContainer;
