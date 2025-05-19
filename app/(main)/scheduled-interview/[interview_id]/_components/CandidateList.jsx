import React from 'react';

function CandidateList({ candidateList }) {
  return (
    <div className={"p-5"}>
      <h2 className={"font-bold text-lg mb-5"}>Candidates:</h2>
      {Array.isArray(candidateList) && candidateList.length > 0 ? (
          candidateList.map((candidate, index) => (
        <div key={index} className="p-5">
           {/*<h2>{candidate.userName[0]}</h2> */}
           <h2>{candidate.name?.charAt(0).toUpperCase()}</h2>
        </div>
    ))
      ) : (
     <p className="text-sm text-gray-500">No candidates available.</p>
  )}
   </div>
  )
}

export default CandidateList;
