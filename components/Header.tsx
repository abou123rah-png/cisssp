import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-[#00853F] text-white shadow-lg sticky top-0 z-50 border-b-4 border-[#FDEF42]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            {/* Styled Logo Icon */}
            <div className="bg-white p-2 rounded-full border-2 border-[#E31B23]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#00853F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight uppercase">
                Lycée Thiaroye
              </h1>
              <p className="text-xs text-[#FDEF42] font-semibold tracking-wider">SALLE DES PROFS NUMÉRIQUE</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
             <span className="flex items-center px-3 py-1 rounded bg-[#006b32] text-sm font-medium border border-[#FDEF42]">
                <span className="w-2 h-2 rounded-full bg-[#E31B23] mr-2 animate-pulse"></span>
                Système Actif
             </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;