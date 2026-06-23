import React from 'react';
import { useSession, signOut, signIn } from "next-auth/react"; 

const Navbar = () => {
  const { data: session } = useSession(); 

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> 
              </svg>
            </div>
            <ul tabIndex={-1} className="dropdown-content menu menu-sm bg-base-100 rounded-box z-[10] mt-3 w-52 p-2 shadow">
              <li><a>Homepage</a></li>
              <li><a>Portfolio</a></li>
              <li><a>About</a></li>
            </ul>
          </div>
        </div>

        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>

        <div className="navbar-end gap-2">
          <button className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> 
            </svg>
          </button>
          
          <button className="btn btn-ghost btn-circle mr-2">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> 
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>

          {session ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border border-base-300">
                <div className="w-10 rounded-full">
                  <img 
                    alt="User Avatar" 
                    src={session.user?.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                  />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[10] mt-3 w-52 p-2 shadow">
                <li className="px-4 py-2 font-semibold text-xs border-b border-base-200 mb-1">
                  Hi, {session.user?.name}
                </li>
                <li>
                  <button onClick={() => signOut()} className="text-error font-medium">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <button onClick={() => signIn()} className="btn btn-primary btn-sm capitalize">
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;