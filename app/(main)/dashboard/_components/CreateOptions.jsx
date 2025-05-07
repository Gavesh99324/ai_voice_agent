import React from 'react';
import { Video } from 'lucide-react';

function CreateOptions() {
  return (
    <div className={"grid grid-cols-2 gap-5"}>
      <div className={"bg-white border border-gray-200 rounded-lg p-5"}>
        <Video className={"p-3 text-primary bg-blue-50 rounded-lg h-13 w-13"} />
        <h2 className={'font-bold'}>Create New Interview</h2>
        <p className={'text-gray-500'}>Create AI Interviews and Schedule them with Candidates</p>
      </div>
      <div>
        Phone Screening
      </div>
    </div>
  )
}

export default CreateOptions;
