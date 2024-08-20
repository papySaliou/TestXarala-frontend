import React, { useState } from 'react';
import { AjoutDepense } from './AjoutDepense';
import { AjoutRevenu } from './AjoutRevenu';
import Depense from './depense';
import { Revenu } from './revenu';
import Header from './Header';
import Card from './Card';
// import { ListeDepenses } from './ListeDepenses';
// import { ListeRevenus } from './ListeRevenus';

export const Transaction = () => {
  const [afficherFormulaire, setAfficherFormulaire] = useState('depense');

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* <div className="mb-6">
        <button
          onClick={() => setAfficherFormulaire('depense')}
          className={`py-2 px-4 mr-4 rounded ${afficherFormulaire === 'depense' ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Ajouter Dépense
        </button>
        <button
          onClick={() => setAfficherFormulaire('revenu')}
          className={`py-2 px-4 rounded ${afficherFormulaire === 'revenu' ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Ajouter Revenu
        </button>
      </div> */}
      <div className="w-full max-w-4xl">
        <Header />
        <div>
          {/* <Card /> */}
        </div>
       
        {/* {afficherFormulaire === 'depense' ? <AjoutDepense /> : <AjoutRevenu />} */}
      </div>
      <div className="w-full max-w-2xl mt-8">
        <Depense />
        <Revenu />
      </div>
    </div>
  );
};
