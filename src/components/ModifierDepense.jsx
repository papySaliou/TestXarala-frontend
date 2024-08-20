import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export const ModifierDepense = () => {
  const { id } = useParams();
  const [depense, setDepense] = useState({ titre: '', montant: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepense = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/depenses/${id}`);
        setDepense(response.data);
      } catch (error) {
        setError('Erreur lors de la récupération des données de la dépense.');
      }
    };

    fetchDepense();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepense((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const montantNumber = parseFloat(depense.montant);

    if (isNaN(montantNumber)) {
      setError('Le montant doit être un nombre valide.');
      return;
    }

    try {
      await axios.put(`http://localhost:4000/depenses/${id}`, {
        ...depense,
        montant: montantNumber
      });
      navigate('/'); // Redirection après la modification
    } catch (error) {
      setError('Erreur lors de la modification de la dépense.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="bg-white p-8 rounded-lg w-full max-w-xl"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-semibold text-green-900 mb-6">MODIFIER DÉPENSE</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label htmlFor="titre" className="block text-sm text-green-900 font-semibold mb-2">TITRE</label>
          <input
            type="text"
            id="titre"
            name="titre"
            value={depense.titre}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="montant" className="block text-sm text-green-900 font-semibold mb-2">MONTANT</label>
          <input
            type="text"
            id="montant"
            name="montant"
            value={depense.montant}
            onChange={handleChange}
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
