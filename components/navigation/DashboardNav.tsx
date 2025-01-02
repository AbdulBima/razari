"use client";

const DashboardNavbar = () => {
  return (
    <div className="  bg-white  py-6 border-b border-opacity-30  px-6 h-16 bg- border-bwhite hidden md:flex items-center justify-between  ml-[15vw] fixed top-0 left-0 right-0 z-50">
      {/* Search Bar */}
      <div className="flex items-center space-x-3">
        <div className="relative">
        <h1 className="text-sm font-medium"> Welcome Back, Musa John</h1>
        </div>
      </div>

      {/* Right-side icons and user profile */}
      <div className="flex items-center space-x-6">
        {/* Notification Icon */}
        <button className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="#356966"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              color="#356966"
            >
              <path d="M5.158 11.491c-.073 1.396.011 2.882-1.236 3.817A2.3 2.3 0 0 0 3 17.153C3 18.15 3.782 19 4.8 19h14.4c1.018 0 1.8-.85 1.8-1.847c0-.726-.342-1.41-.922-1.845c-1.247-.935-1.163-2.421-1.236-3.817a6.851 6.851 0 0 0-13.684 0" />
              <path d="M10.5 3.125C10.5 3.953 11.172 5 12 5s1.5-1.047 1.5-1.875S12.828 2 12 2s-1.5.297-1.5 1.125M15 19a3 3 0 1 1-6 0" />
            </g>
          </svg>
        </button>
        

        {/* Settings Icon */}
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="#356966"
              d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zm2.8-6.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5"
            />
          </svg>
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#356966] text-white flex items-center justify-center rounded-full text-sm font-bold">
            JD
          </div>
          <span className="text-gray-600 text-sm font-medium">
            john.doe@example.com
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
