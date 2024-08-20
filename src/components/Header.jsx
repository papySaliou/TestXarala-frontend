import React from 'react';
import budget from '../assets/budget.png';

const Header = () => {
  return (
    <div className="p-4 text-white mt-20">
      {/* Section de l'image et du texte, alignés verticalement */}
      <div className="flex flex-col items-center mt-28">
        <img src={budget} alt="Budget" className="w-52 h-52  " />
        <span className="text-2xl text-green-700 font-normal">Gestion du Budget</span>
      </div>
      
    </div>
  );
};

export default Header;
