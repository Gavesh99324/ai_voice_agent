import React from 'react'

function InterviewCard({ interview }) {
  return (
    <div>
       <div>
        <div className={"h-[40px] w-[40px] bg-primary rounded-full"}></div>
        <h2>{interview}</h2>
       </div>
    </div>
  )
}

export default InterviewCard;
