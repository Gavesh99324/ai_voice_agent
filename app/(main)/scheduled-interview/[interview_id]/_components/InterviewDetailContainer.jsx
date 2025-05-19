import React from 'react';
import { Clock, Calendar, MessageCircleCodeIcon } from 'lucide-react';
import moment from 'moment';

function InterviewDetailContainer({ interviewDetail }) {


  return (
    <div className={"p-5 bg-white rounded-lg mt-5"}>
      <h2 className={"text-green-500"}>{interviewDetail?.jobPosition}</h2>

      <div className={"mt-4 flex justify-between items-center lg:pr-25"}>
        <div>
            <h2 className={"text-xs text-gray-600"}>Duration</h2>
            <h2 className={"text-sm font-bold flex items-center gap-2 mt-2"}><Clock className={"h-4 w-4"} /> {interviewDetail?.duration}</h2>
        </div>

        <div>
            <h2 className={"text-xs text-gray-600"}>Created On</h2>
            <h2 className={"text-sm font-bold flex items-center gap-2 mt-2"}><Calendar className={"h-4 w-4"} /> {moment(interviewDetail?.created_at).format('MMMM Do YYYY')}</h2>
        </div>

        {interviewDetail?.type &&
        <div>
            <h2 className={"text-xs text-gray-600"}>Type</h2>
            <h2 className={"text-sm font-bold flex items-center gap-2 mt-2"}><Clock className={"h-4 w-4"} /> {JSON.parse(interviewDetail?.type)}</h2>
        </div>
        }
      </div>

      <div className={"mt-5"}>
        <h2 className={"font-bold"}>Job Description</h2>
        <p className={"mt-2 text-sm leading-6"}>{interviewDetail?.jobDescription}</p>
      </div>

      <div className={"mt-5"}>
        <h2 className={"font-bold"}>Interview Questions</h2>

        <div className={"grid grid-cols-2 gap-3 mt-3"}>
            {Array.isArray(interviewDetail?.questionList) && interviewDetail.questionList.length > 0 ? (
              interviewDetail.questionList.map((item, index) => (
               <h2 key={index} className="text-xs flex">
                  <MessageCircleCodeIcon className="h-6 w-6 pr-1 text-green-400" /> {item?.question}
               </h2>
            ))
              ) : (
            <p className="text-xs text-gray-500 col-span-2">No questions available.</p>
        )}
        </div>

      </div>
    </div>
  )
}

export default InterviewDetailContainer;
