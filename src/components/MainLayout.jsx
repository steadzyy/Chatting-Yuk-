import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import ThemeProvider from "../pages/ThemeContext";

export default function MainLayout() {
  return (
    <>
      <ThemeProvider>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="grow">
        <Outlet />
        </div>
      </div>

      </ThemeProvider>
    </>
  );
}
