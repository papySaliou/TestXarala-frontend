import React, { useState } from 'react';
import axios from 'axios';
import budget from '../assets/budget.png'; // Vous pouvez remplacer cette image par une autre si nécessaire
import { useNavigate } from 'react-router-dom';

export const AjoutRevenu = () => {
  const [titre, setTitre] = useState('');
  const [montant, setMontant] = useState('');
  const [error, setError] = useState(null); // Ajout d'un état pour les erreurs
  const navigate = useNavigate(); // Hook pour la redirection

  const handleChamp1Change = (e) => setTitre(e.target.value);
  const handleChamp2Change = (e) => setMontant(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const montantNumber = parseFloat(montant);

    if (isNaN(montantNumber)) {
      setError('Le montant doit être un nombre valide.');
      return;
    }

    const revenuData = {
      titre,
      montant: montantNumber
    };

    try {
      await axios.post('http://localhost:4000/revenu', revenuData);
      console.log('Revenu ajouté');
      navigate('/'); // Redirection vers la page d'accueil ou la liste des revenus
    } catch (error) {
      setError(error.response ? error.response.data : 'Erreur lors de l\'ajout du revenu.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="bg-white p-8 rounded-lg w-full max-w-xl"
        onSubmit={handleSubmit}
      >
        <div className="mb-2 text-center">
          <img
            src={budget}
            alt="Revenu"
            className="w-40 h-40 mx-auto mb-4"
          />
          <p className='text-green-900 font-semibold m-5'>Gestion du Budget</p>
        </div>
        <h1 className="text-3xl font-semibold text-green-900 mb-6">AJOUTER REVENUS</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label htmlFor="champ1" className="block text-sm text-green-900 font-semibold mb-2">TITRE</label>
          <input
            type="text"
            id="champ1"
            value={titre}
            onChange={handleChamp1Change}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="champ2" className="block text-sm text-green-900 font-semibold mb-2">MONTANT</label>
          <input
            type="text"
            id="champ2"
            value={montant}
            onChange={handleChamp2Change}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-green-900 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Valider
        </button>
      </form>
    </div>
  );
};
