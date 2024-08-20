import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Depense = () => {
  const [depenses, setDepenses] = useState([]);

  useEffect(() => {
    // Récupération des dépenses depuis l'API
    const fetchDepenses = async () => {
      try {
        const response = await axios.get('http://localhost:4000/depenses');
        setDepenses(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des dépenses:', error);
      }
    };

    fetchDepenses();
  }, []);

  // Fonction pour supprimer une dépense
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette dépense ?')) {
      try {
        await axios.delete(`http://localhost:4000/depenses/${id}`);
        setDepenses((prevDepenses) => prevDepenses.filter((depense) => depense.id !== id));
      } catch (error) {
        console.error('Erreur lors de la suppression de la dépense:', error);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-mono text-yellow-400 mb-4">Liste des Dépenses</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-green-700 text-2xl text-white font-light border-b">TITRE</th>
            <th className="py-2 px-4 bg-green-700 text-2xl text-white font-light border-b">MONTANT</th>
            <th className="py-2 px-4 bg-green-700 text-2xl text-white font-light border-b">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {depenses.map((depense) => (
            <tr key={depense.id}>
              <td className="py-2 px-4 border-b">{depense.titre}</td>
              <td className="py-2 px-4 border-b">{depense.montant} CFA</td>
              <td className="py-2 px-4 border-b">
              <Link to={`/modifierDepense/${depense.id}`}>
                  <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 ml-2">
                    Modifier
                  </button>
                </Link>
                <button
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                  onClick={() => handleDelete(depense.id)}
                >
                  Supprimer
                </button>
                
              </td>
            </tr>
          ))}
          {/* Ligne pour le bouton Ajouter */}
          <tr>
            <td colSpan="3" className="py-2 px-4 border-b text-center">
              <Link to="/ajoutDepense">
                <button className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-900">
                  Ajouter une nouvelle dépense
                </button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Depense;
