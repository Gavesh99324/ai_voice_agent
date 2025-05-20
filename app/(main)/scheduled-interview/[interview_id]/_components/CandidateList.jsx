import React from 'react';
import moment from 'moment';
import CandidateFeedbackDialog from './CandidateFeedbackDialog';


function CandidateList({ candidateList }) {
  return (
   <div className={"p-5"}>
  <h2 className={"font-bold text-lg mb-5"}>Candidates: {candidateList?.length}</h2>

  {Array.isArray(candidateList) && candidateList.length > 0 ? (
    candidateList.map((candidate, index) => (
      <div key={index} className="p-5 flex items-center justify-between bg-green-100 rounded-lg">

        <div className="flex items-center gap-3">
          <h2 className="bg-primary p-3 px-3 font-bold text-gray-500 rounded-full">
            {candidate.name?.charAt(0).toUpperCase()}
          </h2>
          <div className="text-left">
            <h2 className="font-bold">{candidate?.userName}</h2>
            <h2 className="text-sm text-gray-500">
              Completed On: {moment(candidate?.created_id).format('MMMM Do YYYY')}
            </h2>
          </div>
        </div>

        <div className={"flex gap-3 items-center"}>
          <h2 className={"text-blue-500"}>6/10</h2>
          <CandidateFeedbackDialog candidate={candidate} />
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
