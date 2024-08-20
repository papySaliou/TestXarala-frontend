import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Rapport = () => {
  const [depenses, setDepenses] = useState([]);
  const [revenus, setRevenus] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const depensesResponse = await axios.get('http://localhost:4000/depenses');
        const revenusResponse = await axios.get('http://localhost:4000/revenu');
        setDepenses(depensesResponse.data);
        setRevenus(revenusResponse.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error.response ? error.response.data : error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-semibold text-green-900 mb-6">Liste des Dépenses</h1>
        <ul className="bg-white p-4 border border-gray-300 rounded-md mb-8">
          {depenses.length > 0 ? (
            depenses.map((depense) => (
              <li key={depense.id} className="mb-2 p-2 border-b border-gray-200">
                <p><strong>Titre:</strong> {depense.titre}</p>
                <p><strong>Montant:</strong> {depense.montant} €</p>
              </li>
            ))
          ) : (
            <p>Aucune dépense trouvée.</p>
          )}
        </ul>

        <h1 className="text-3xl font-semibold text-green-900 mb-6">Liste des Revenus</h1>
        <ul className="bg-white p-4 border border-gray-300 rounded-md">
          {revenus.length > 0 ? (
            revenus.map((revenu) => (
              <li key={revenu.id} className="mb-2 p-2 border-b border-gray-200">
                <p><strong>Titre:</strong> {revenu.titre}</p>
                <p><strong>Montant:</strong> {revenu.montant} €</p>
              </li>
            ))
          ) : (
            <p>Aucun revenu trouvé.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

