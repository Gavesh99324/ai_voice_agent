import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import  axios  from 'axios';
import { Button } from '@/components/ui/button';
import QuestionListContainer from './questionListContainer';
import { supabase } from '@/services/supabaseClient';
import { InterviewType } from '@/services/Constants';
import { useUser } from '@/app/provider';
import { v4 as uuidv4 } from 'uuid';
import { Loader2 } from 'lucide-react';


function QuestionList({ formData, onCreateLink }) {

  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState();
  const {user} = useUser(); 
  const [saveLoading, setSaveLoading] = useState(false);


    useEffect(() => {
        if (formData) {
           GenerateQuestionList();
        }
    }, [formData])

    const onFinish = async () => {
      setSaveLoading(true);

      const interview_id = uuidv4();
      
      const { data, error } = await supabase
          .from('Interviews')
          .insert([
        {
          type: formData.InterviewType,
          jobPosition: formData.jobPosition,
          jobDescription: formData.jobDescription,
          duration: formData.duration,
          questionList: questionList,
          userEmail: user?.email,
          interview_id: interview_id,
        },
      ])
    .select()
    
      const userUpdate = await supabase
        .from('Users')
        .update({ credits: Number(user?.credits) - 1 })
        .eq('email', '' + user?.email)
        .select()
      console.log(userUpdate);
          
    setSaveLoading(false);
    onCreateLink(interview_id)

    }

    const GenerateQuestionList = async () => {
      setLoading(true);
      try {
      const result = await axios.post('/api/ai-model', {
        ...formData
      });
      console.log(result.data.content);

      let contentString = result.data.content.trim();

     if (contentString.startsWith("```json")) {
        contentString = contentString.replace("```json", "").replace("```", "").trim();
     }

     const Content = JSON.parse(contentString);

      setQuestionList(Content?.interviewQuestions);
      setLoading(false);

    } catch (error) {
      toast('Server Error, Try Again');
      setLoading(false);
  }
}
 
  return (
    <div>
      {loading && 
      <div className={"p-5 bg-blue-50 rounded-xl border border-primary flex gap-5 items-center"}>
        <Loader2Icon className={"animate-spin"} />
        <div>
          <h2 className={"font-medium"}>Generating Interview Questions</h2>
          <p className={"text-primary"}>Our AI is crafting your interview questions based on your position</p>
        </div>
      </div>
      }
  
      {questionList?.length > 0 &&
      <div>
        <QuestionListContainer questionList={questionList} />
      </div>
        } 

        <div className={"flex justify-end mt-10"}>
          <Button onClick={onFinish} disabled={saveLoading}>
            {saveLoading && <Loader2 className={"animate-spin"} />}
            Create Interview Link & Finish
          </Button>
        </div>

    </div>
  )
}

export default QuestionList;
