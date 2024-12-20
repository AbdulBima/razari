import type { Metadata } from "next";
import "../globals.css";


export const metadata: Metadata = {
  title: "Authentication",
  description: "Razora",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className='poppins-regular'
      >
        {children}
      </body>
    </html>
  );
}
