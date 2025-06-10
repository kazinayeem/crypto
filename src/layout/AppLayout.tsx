import React from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
