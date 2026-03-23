import "./App.css";
import { Link, Outlet, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <main className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#7c3aed] opacity-20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#2563eb] opacity-20 blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full bg-[#db2777] opacity-10 blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-10 py-5 border-b border-white/10 backdrop-blur-md bg-white/5">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
            <span className="text-white text-sm font-black">C</span>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">ChatRoom</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-2">
          <Link to={"/"}>
            <div className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              location.pathname === "/"
                ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}>
              Join
            </div>
          </Link>
          <Link to={"/chat"}>
            <div className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              location.pathname === "/chat"
                ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}>
              Chat
            </div>
          </Link>
        </div>
      </nav>

      {/* Page content */}
      <section className="relative z-10 flex items-center justify-center min-h-[calc(100vh-73px)]">
        <Outlet />
      </section>
    </main>
  );
}

export default App;