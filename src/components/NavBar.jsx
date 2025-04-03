import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <div className="flex items-center justify-center gap-10 bg-slate-600 p-4 rounded-lg shadow-md">
      <NavLink
        to="/"
        className="text-white font-semibold text-lg p-2 rounded-md hover:bg-blue-500 hover:text-white transition-colors"
        
      >
        Add Note
      </NavLink>
      <NavLink
        to="/notes"
        className="text-white font-semibold text-lg p-2 rounded-md hover:bg-blue-500 hover:text-white transition-colors"
        
      >
        Note List
      </NavLink>
    </div>
  );
}

export default NavBar;
