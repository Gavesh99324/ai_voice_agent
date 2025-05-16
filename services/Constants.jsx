import { LayoutDashboard, Calendar, List, WalletCards, Settings, Code2Icon, User2Icon, BriefcaseBusinessIcon, Puzzle, ShieldCheck } from "lucide-react";


export const SideBarOptions = [
    {
        name: 'Dashboard',
        icon: LayoutDashboard,
        path: '/dashboard'
    },
    {
        name: 'Scheduled Interview',
        icon: Calendar,
        path: '/scheduled-interview'
    },
    {
        name: 'All Interview',
        icon: List,
        path: '/all-interview'
    },
    {
        name: 'Billing',
        icon: WalletCards,
        path: '/billing'
    },
    {
        name: 'Settings',
        icon: Settings,
        path: '/settings'
    },
];


export const InterviewType = [
    {
        title: "Technical",
        icon: Code2Icon
    },
    {
        title: "Behavioral",
        icon: User2Icon
    },
    {
        title: "Experience",
        icon: BriefcaseBusinessIcon
    },
    {
        title: "Problem Solving",
        icon: Puzzle
    },
    {
        title: "Leadership",
        icon: ShieldCheck
    }
]


export const QUESTIONS_PROMPT = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:
Job Title: {{jobTitle}}
Job Description: {{jobDescription}}
Interview Duration: {{duration}}
Interview Type: {{type}}

📌 Your task:
Analyze the job description to identify key responsibilities, required skills, and expected experience.
Generate a list of interview questions depends on interview duration.
Adjust the number and depth of questions to match the interview duration.
Ensure the questions match the tone and structure of a real-life {{type}} interview.
🧩 Format your response in JSON format with array list of questions.
format: interviewQuestions=[
{
  question:"",
  type:'Technical/Behavioral/Experience/Problem Solving/Leaseship'
},{
  ...
}
]

🎯 The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.
`;


export const FEEDBACK_PROMPT = ` {{conversation}}  
Depends on this Interview Conversation between assistant and user,  
Give me feedback for user interview. Give me rating out of 10 for technical Skills, 
Communication, Problem Solving, Experience. Also give me summery in 3 lines about the 
interview and one line to let me know whether is recommanded for hire or not with msg. 
Give me response in JSON format  

{  
  feedback:{  
    rating:{  
      tecnhicalSkills:5,  
      communication:6,  
      problemSolving:4,  
      experince:7  
    },  
    summery:"The candidate has moderate technical skills and good communication. Problem-solving abilities need enhancement. Overall, they show potential but need more structured thinking.",  
    Recommendation:"No",  
    RecommendationMsg:"Not recommended for hire currently. Consider after further development in problem-solving."  
  }  
}

`



