import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from '@/components/ui/progress';

function CandidateFeedbackDialog({ candidate }) {
  let parsedFeedback = {};

  try {
    parsedFeedback = JSON.parse(candidate?.feedback || '{}'); // parsing just candidate.feedback
  } catch (error) {
    console.error("Failed to parse feedback JSON:", error);
  }

  const rating = parsedFeedback?.feedback?.rating;
  const summary = parsedFeedback?.feedback?.summery;
  const recommendation = parsedFeedback?.feedback?.RecommendationMsg;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className={"text-primary"}>View Report</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription asChild>
            <div className={"mt-5"}>
              <div className={"flex justify-between items-center"}>
                <div className="flex items-center gap-3">
                  <h2 className="bg-primary p-3 px-3 font-bold text-gray-500 rounded-full">
                    {candidate.name?.charAt(0).toUpperCase()}
                  </h2>
                  <div className="text-left">
                    <h2 className="font-bold">{candidate?.userName}</h2>
                    <h2 className="text-sm text-gray-500">{candidate?.userEmail}</h2>
                  </div>
                </div>
                <div className={"flex gap-3 items-center"}>
                  <h2 className={"text-blue-500 text-2xl font-bold"}>{rating?.communication}/10</h2>
                </div>
              </div>

              <div className={"mt-5"}>
                <h2 className={"font-bold"}>Skills Assessment</h2>
                <div className={"mt-3 grid grid-cols-2 gap-10"}>
                  <div>
                    <h2 className={"flex justify-between"}>
                      Technical Skills <span>{rating?.technicalSkills}/10</span>
                    </h2>
                    <Progress className="mt-2" value={rating?.technicalSkills * 10} />
                  </div>
                  <div>
                    <h2 className={"flex justify-between"}>
                      Communication <span>{rating?.communication}/10</span>
                    </h2>
                    <Progress className="mt-2" value={rating?.communication * 10} />
                  </div>
                  <div>
                    <h2 className={"flex justify-between"}>
                      Problem Solving <span>{rating?.problemSolving}/10</span>
                    </h2>
                    <Progress className="mt-2" value={rating?.problemSolving * 10} />
                  </div>
                  <div>
                    <h2 className={"flex justify-between"}>
                      Experience <span>{rating?.experience}/10</span>
                    </h2>
                    <Progress className="mt-2" value={rating?.experience * 10} />
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <h2 className="font-bold">Summary</h2>
                <p className="text-sm mt-2">{summary}</p>
              </div>

              <div className="mt-5">
                <h2 className="font-bold">Recommendation</h2>
                <p className="text-sm mt-2">{recommendation}</p>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CandidateFeedbackDialog;