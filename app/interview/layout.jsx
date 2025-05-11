import React from 'react';
import InterviewHeader from './_components/InterviewHeader';

function InterviewLayout({children}) {
  return (
    <div>
      <InterviewHeader />
      {children}
    </div>
  )
}

export default InterviewLayout;
 