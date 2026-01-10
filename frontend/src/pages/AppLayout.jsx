import AppNavbar from "../components/AppNavbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <AppNavbar />
      <main className="px-10 py-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
