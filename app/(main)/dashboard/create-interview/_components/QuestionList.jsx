import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import  axios  from 'axios';



function QuestionList({ formData }) {

  const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (formData) {
            GenerateQuestionList();
        }
    }, [formData])

    const GenerateQuestionList = async () => {
      setLoading(true);
      try {
      const result = await axios.post('/api/ai-model', {
        ...formData
      });
      console.log(result.data);
      setLoading(false);

    } catch (error) {
      toast('Server Error, Try Again');
      setLoading(false);
    }

    }
 
  return (
    <div>
      {loading && 
      <div className={"p-5 bg-blue-50 rounded-xl border border-gray-100 flex gap-5 items-center"}>
        <Loader2Icon className={"animate-spin"} />
        <div>
          <h2>Generating Interview Questions</h2>
          <p>Our AI is crafting your interview questions based on your position</p>
        </div>
      </div>
      }
    </div>
  )
}

export default QuestionList;
