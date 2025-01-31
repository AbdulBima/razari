const companySideNavItems = [
  {
    href: "/cmpx/dashboard",
    label: "Dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <g fill="none" stroke="currentColor">
          <circle cx="19" cy="5" r="2.5" strokeWidth="1.5" />
          <path
            strokeLinecap="round"
            strokeWidth="1.5"
            d="M21.25 10v5.25a6 6 0 0 1-6 6h-6.5a6 6 0 0 1-6-6v-6.5a6 6 0 0 1 6-6H14"
          />
          <path
            strokeLinecap="round"
            strokeWidth="1.6"
            d="M8.276 16.036v-4.388m3.83 4.388V8.769m3.618 7.267v-5.51"
          />
        </g>
      </svg>
    ),
  },
  {
    href: "/cmpx/insights",
    label: "Insights",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M20 16c-.092 0-.18.021-.27.027l-.892-2.674A2.98 2.98 0 0 0 20 11c0-1.654-1.346-3-3-3s-3 1.346-3 3c0 .38.078.741.208 1.076l-2.722 2.333A2.97 2.97 0 0 0 10 14c-1.654 0-3 1.346-3 3s1.346 3 3 3a2.99 2.99 0 0 0 2.412-1.232l3.603 1.08c-.002.052-.015.1-.015.152c0 2.206 1.794 4 4 4s4-1.794 4-4s-1.794-4-4-4m-3-6c.551 0 1 .449 1 1s-.449 1-1 1s-1-.449-1-1s.449-1 1-1m-7 8c-.551 0-1-.449-1-1s.449-1 1-1s1 .449 1 1s-.449 1-1 1m2.985-1.148a3 3 0 0 0-.193-.928l2.722-2.333a2.96 2.96 0 0 0 1.43.403l.885 2.656a4 4 0 0 0-1.236 1.284zM20 22c-1.103 0-2-.897-2-2s.897-2 2-2s2 .898 2 2s-.897 2-2 2"
        />
        <path
          fill="currentColor"
          d="M27.496 9.864L16 3.158L7.504 8.114L6.496 6.386l9-5.25a1 1 0 0 1 1.008 0l12 7zm-10.992 21l-1.008-1.728L27 22.426V12h2v11a1 1 0 0 1-.496.864zm-4.008-1.75l-9-5.25A1 1 0 0 1 3 23V9h2v13.426l8.504 4.96z"
        />
      </svg>
    ),
  },

  {
    href: "/cmpx/staffs",
    label: "Staff",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 640 512"
      >
        <path
          fill="currentColor"
          d="M72 88a56 56 0 1 1 112 0a56 56 0 1 1-112 0m-8 157.7c-10 11.2-16 26.1-16 42.3s6 31.1 16 42.3v-84.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5V416c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32v-26.8C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112h32c24 0 46.2 7.5 64.4 20.3zM448 416v-21.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176h32c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2V416c0 17.7-14.3 32-32 32h-64c-17.7 0-32-14.3-32-32m8-328a56 56 0 1 1 112 0a56 56 0 1 1-112 0m120 157.7v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128a64 64 0 1 1 0-128m-80 272c0 16.2 6 31 16 42.3v-84.7c-10 11.3-16 26.1-16 42.3zm144-42.3v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zm64 42.3c0 44.7-26.2 83.2-64 101.2V448c0 17.7-14.3 32-32 32h-64c-17.7 0-32-14.3-32-32v-42.8c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112h32c61.9 0 112 50.1 112 112"
        />
      </svg>
    ),
  },
  {
    href: "/cmpx/clinics",
    label: "Clinics",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 16 16"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M13.25 12a.75.75 0 1 0 0 1.5a.75.75 0 0 0 0-1.5m-.75-1.372a2.251 2.251 0 1 0 1.5 0v-.378a3 3 0 0 0-3-3H8.75V5.372a2.25 2.25 0 1 0-1.5 0V7.25H5a3 3 0 0 0-3 3v.378a2.251 2.251 0 1 0 1.5 0v-.378A1.5 1.5 0 0 1 5 8.75h2.25v1.878a2.251 2.251 0 1 0 1.5 0V8.75H11a1.5 1.5 0 0 1 1.5 1.5zM2.75 12a.75.75 0 1 0 0 1.5a.75.75 0 0 0 0-1.5m4.5.75a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0M8 2.5A.75.75 0 1 0 8 4a.75.75 0 0 0 0-1.5"
          clipRule="evenodd"
        />
      </svg>
    ),
  },

  {
    href: "/cmpx/profile",
    label: "Profile",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <g fill="currentColor" stroke="currentColor">
          <path
            fill="currentColor"
            d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2"
            opacity="0.16"
          />
          <path
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
          />
          <circle cx="12" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
        </g>
      </svg>
    ),
  },

  {
    href: "/cmpx/billing",
    label: "Billing",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M7 15h3a1 1 0 0 0 0-2H7a1 1 0 0 0 0 2M19 5H5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3m1 12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6h16Zm0-8H4V8a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z"
        />
      </svg>
    ),
  },

  {
    href: "/cmpx/support",
    label: "Support",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 512 512"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M422.401 217.174c-6.613-67.84-46.72-174.507-170.666-174.507c-123.947 0-164.054 106.667-170.667 174.507c-23.2 8.805-38.503 31.079-38.4 55.893v29.867c0 32.99 26.744 59.733 59.733 59.733c32.99 0 59.734-26.744 59.734-59.733v-29.867c-.108-24.279-14.848-46.095-37.334-55.253c4.267-39.254 25.174-132.48 126.934-132.48s122.453 93.226 126.72 132.48c-22.44 9.178-37.106 31.009-37.12 55.253v29.867a59.95 59.95 0 0 0 33.92 53.76c-8.96 16.853-31.787 39.68-87.894 46.506c-11.215-17.03-32.914-23.744-51.788-16.023c-18.873 7.72-29.646 27.717-25.71 47.725s21.48 34.432 41.872 34.432a42.67 42.67 0 0 0 37.973-23.68c91.52-10.454 120.747-57.6 129.92-85.334c24.817-8.039 41.508-31.301 41.173-57.386v-29.867c.103-24.814-15.2-47.088-38.4-55.893m-302.933 85.76c0 9.425-7.641 17.066-17.067 17.066s-17.066-7.64-17.066-17.066v-29.867a17.067 17.067 0 1 1 34.133 0zm264.533-29.867c0-9.426 7.641-17.067 17.067-17.067s17.067 7.641 17.067 17.067v29.867c0 9.425-7.641 17.066-17.067 17.066s-17.067-7.64-17.067-17.066z"
        />
      </svg>
    ),
  },
];

export default companySideNavItems;
