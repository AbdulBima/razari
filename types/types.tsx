import React from "react";




export type DiagnosisRecord = {
  submitterId: string;
  time: string;
  gender: string;
  diagnosis: string;
  ageGroup: string;
  companyId: string;
  clinicId: string;
};



// Type for possible categories
export type Category = "Diagnosis" | "Admission" | "Birth" | "Emergency" | "Death";

// Type for category icons
export const categoryIcons = {
  Diagnosis: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="#356966"
        d="M12 14v8H4a8 8 0 0 1 8-8m0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6s6 2.685 6 6s-2.685 6-6 6m9.446 7.032l1.504 1.503l-1.415 1.415l-1.503-1.504a4 4 0 1 1 1.414-1.414M18 20a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
      />
    </svg>
  ),
  Admission: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="#356966"
        d="M20 9.556V3h-2v2H6V3H4v6.557C2.81 10.25 2 11.526 2 13v4a1 1 0 0 0 1 1h1v4h2v-4h12v4h2v-4h1a1 1 0 0 0 1-1v-4c0-1.474-.811-2.75-2-3.444M11 9H6V7h5zm7 0h-5V7h5z"
      />
    </svg>
  ),
  Birth: (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
      <path
        fill="#356966"
        d="M12 2q2.075 0 3.888.788t3.174 2.15t2.15 3.175T22 12q0 2.05-.788 3.875t-2.15 3.188t-3.175 2.15T12 22q-2.05 0-3.875-.788t-3.187-2.15t-2.15-3.187T2 12q0-2.075.788-3.887t2.15-3.175t3.187-2.15T12 2m-2 5q0 .825.588 1.413T12 9t1.413-.587T14 7t-.587-1.412T12 5t-1.412.588T10 7m2 3q-1.65 0-3.075.538T7.5 12.5v4q0 1.425 1.425 1.938T12 18.95q.425 0 .713-.288T13 17.95t-.288-.712T12 16.95q-.5.05-.975-.05t-.95-.3q-.275-.125-.35-.388t.1-.462q.425-.425 1-.588T12 15q.925 0 1.713.325t.787 1.125v.85q0 .3.213.525t.512.225q.575 0 .925-.475t.35-1.075v-4q0-1.425-1.425-1.963T12 10m0 4.5q-.525 0-.888-.363t-.362-.887t.363-.888T12 12t.888.363t.362.887t-.363.888T12 14.5"
      />
    </svg>
  ),
  Death: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="#356966"
        d="M2.05 13h19.9c-.5 5.05-4.76 9-9.95 9c-5.18 0-9.45-3.95-9.95-9m19.9-2H2.05c.5-5.05 4.77-9 9.95-9s9.45 3.95 9.95 9M12 6.75a2.5 2.5 0 0 0-2.5-2.5A2.5 2.5 0 0 0 7 6.75a2.5 2.5 0 0 0 2.5 2.5a2.5 2.5 0 0 0 2.5-2.5"
      />
    </svg>
  ),
  Emergency: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="#356966"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75s9.75-4.365 9.75-9.75S17.385 2.25 12 2.25m0 4.627a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0v-5.5a.75.75 0 0 1 .75-.75m.75 8.996v.5a.75.75 0 0 1-1.5 0v-.5a.75.75 0 0 1 1.5 0"
      />
    </svg>
  ),
};
