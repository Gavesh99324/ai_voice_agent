import React from 'react';
import Link from 'next/link';
import moment from 'moment';


function CandidateList({ candidateList }) {
  return (
    <div className={"p-5"}>
      <h2 className={"font-bold text-lg mb-5"}>Candidates: {candidateList?.length}</h2>
      {Array.isArray(candidateList) && candidateList.length > 0 ? (
          candidateList.map((candidate, index) => (
        <div key={index} className="p-5 flex gap-3 items-center bg-white rounded-lg">
           {/*<h2 className={"bg-primary p-3 px-4.5 rounded-full"}>{candidate.userName[0]}</h2> */}
           <h2 className={"bg-primary p-3 px-4.5 font-bold text-gray-500 rounded-full"}>{candidate.name?.charAt(0).toUpperCase()}</h2>
           <div>
            <h2 className={"font-bold"}>{candidate?.userName}</h2>
            <h2 className={"text-sm text-gray-500"}>Completed On: {moment(candidate?.created_id).format('MMMM Do YYYY')}</h2>
           </div>
        </div>
    ))
      ) : (
     <p className="text-sm text-gray-500">No candidates available.</p>
  )}
   </div>
  )
};

export default CandidateList;
