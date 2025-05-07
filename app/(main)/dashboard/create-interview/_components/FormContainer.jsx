import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
   

function FormContainer() {
  return (
    <div className={"p-5 bg-gray-50"}>
      <div>
        <h2 className={"text-sm"}>Job Position</h2>
        <Input placeholder={"Software Engineer"} className={"mt-2"}/>
      </div>
      <div className={"mt-5"}>
        <h2 className={"text-sm"}>Job Description</h2>
        <Textarea placeholder={"Enter Details"} className={"mt-2 h-[200px]"}/>
      </div>
      <div className={"mt-5"}>
        <h2 className={"text-sm"}>Interview Duration</h2>
        <Select>
          <SelectTrigger className="w-[180px]">
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
    </div>
  )
}

export default FormContainer;
