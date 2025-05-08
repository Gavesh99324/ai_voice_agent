import React, { useEffect } from 'react';

function QuestionList({ formData }) {

    useEffect(() => {
        if (formData) {
            GenerateQuestionList();
        }
    }, [formData])

    const GenerateQuestionList = () => {
    }
 

  return (
    <div>
      question list
    </div>
  )
}

export default QuestionList;
