import React from 'react';
import { Home, ArrowRight, Info } from 'lucide-react';

const InterviewComplete = () => {
  return (
    <div className="bg-midnight text-white font-sans antialiased flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col items-center justify-center space-y-8 py-16">
        <div className="rounded-full bg-seaGreen p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-14 w-14 text-[#A3EB1E]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-center text-black">Interview Complete!</h1>
        <p className="text-lg text-gray-900 text-center">
          Thank you for participating in the AI-driven interview with Voxicruit
        </p>

        <div className="rounded-xl overflow-hidden shadow-lg">
          <img
            src="/complete.jpg"
            alt="Interview Illustration"
            className="w-full h-auto object-cover max-w-100"
            style={{
              backgroundImage: 'url("complete.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '1200px',
              height: '300px'
            }}
          />
        </div>

        <div className="bg-midnightLighter rounded-xl p-8 shadow-md w-full max-w-xl space-y-4">
          <div className="flex items-center justify-center rounded-full bg-midnightLightest w-12 h-12 mx-auto">
            {/*<Info className="h-6 w-6 text-black" /> */}
            <svg
              xmlns={"Info"}
              className="h-6 w-6 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-semibold text-center text-[#A3EB1E]">What's Next?</h2>
          <p className="text-gray-700 text-center">
            The Voxicruit will review your interview responses and will contact you soon regarding the next steps.
          </p>
          <p className="text-gray-500 text-sm text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Response within 2-3 business days
          </p>
        </div>

        <div className="flex space-x-4">
          <button className="bg-midnightLightest text-[#A3EB1E] hover:text-black rounded-lg py-3 px-6 flex items-center space-x-2 transition duration-300 ease-in-out cursor-pointer">
            <Home className="h-5 w-5" />
            <span className={"text-[#A3EB1E]"}>Return to Homepage</span>
          </button>
          <button className="bg-electricBlue hover:bg-electricBlueDark text-white rounded-lg py-3 px-6 flex items-center space-x-2 transition duration-300 ease-in-out">
            <span>View Other Opportunities</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </main>

      <footer className="bg-midnightLighter text-gray-400 text-center py-4">
        <p>&copy; 2025 Voxicruit. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default InterviewComplete;