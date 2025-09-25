import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Volunteer Management</h1>
      </header>

      <main className="flex-grow p-6">{children}</main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        © 2025 Non-Profit Organization
      </footer>
    </div>
  );
};

export default Layout;
