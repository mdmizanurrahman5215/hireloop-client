import { Toaster } from 'react-hot-toast';
// import Sidebar from "../components/dashboard/Sidebar";

export const metadata = {
  title: "Recruiter Dashboard",
  description: "Find your best career",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0B0D13] text-gray-100 flex font-sans antialiased">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1F2937',
            color: '#fff',
            borderRadius: '12px',
            fontSize: '14px',
          },
        }}
      />
      {/* <Sidebar /> */}
      <main className="flex-1 flex flex-col min-w-0">{children}</main>
    </div>
  );
}