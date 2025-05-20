import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import { Button } from '@/components/ui/button';


function CandidateList({ candidateList }) {
  return (
   <div className={"p-5"}>
  <h2 className={"font-bold text-lg mb-5"}>Candidates: {candidateList?.length}</h2>

  {Array.isArray(candidateList) && candidateList.length > 0 ? (
    candidateList.map((candidate, index) => (
      <div key={index} className="p-5 flex items-center justify-between bg-green-100 rounded-lg">

        <div className="flex items-center gap-3">
          <h2 className="bg-primary p-3 px-3.5 font-bold text-gray-500 rounded-full">
            {candidate.name?.charAt(0).toUpperCase()}
          </h2>
          <div className="text-left">
            <h2 className="font-bold">{candidate?.userName}</h2>
            <h2 className="text-sm text-gray-500">
              Completed On: {moment(candidate?.created_id).format('MMMM Do YYYY')}
            </h2>
          </div>
        </div>

        <Button variant={"outline"} className={"text-primary"}>
          View Report
        </Button>
      </div>
    ))
  ) : (
    <p className="text-sm text-gray-500">No candidates available.</p>
  )}
</div>
   )
};

export default CandidateList;
