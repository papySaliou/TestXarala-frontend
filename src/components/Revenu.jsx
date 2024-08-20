import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import nécessaire pour rediriger vers une autre page
import axios from 'axios';

export const Revenu = () => {
  const [revenus, setRevenus] = useState([]);
  const [loading, setLoading] = useState(true); // État pour le chargement des données
  const [error, setError] = useState(null); // État pour les erreurs

  useEffect(() => {
    // Récupération des revenus depuis l'API
    const fetchRevenus = async () => {
      try {
        const response = await axios.get('http://localhost:4000/revenu');
        setRevenus(response.data);
      } catch (error) {
        setError('Erreur lors de la récupération des revenus.');
        console.error('Erreur lors de la récupération des revenus:', error);
      } finally {
        setLoading(false); // Terminer le chargement
      }
    };

    fetchRevenus();
  }, []);

  // Fonction pour supprimer un revenu
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce revenu ?')) {
      try {
        await axios.delete(`http://localhost:4000/revenu/${id}`);
        // Met à jour l'état pour supprimer le revenu supprimé
        setRevenus((prevRevenus) => prevRevenus.filter((revenu) => revenu.id !== id));
      } catch (error) {
        setError('Erreur lors de la suppression du revenu.');
        console.error('Erreur lors de la suppression du revenu:', error);
      }
    }
  };

  if (loading) {
    return <div>Chargement...</div>; // Message de chargement
  }

  if (error) {
    return <div className="text-red-500">{error}</div>; // Message d'erreur
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-mono text-yellow-400 mb-4">Liste des Revenus</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 bg-green-700 px-4 text-2xl text-white font-light border-b">TITRE</th>
            <th className="py-2 bg-green-700 px-4 text-2xl text-white font-light border-b">MONTANT</th>
            <th className="py-2 bg-green-700 px-4 text-2xl text-white font-light border-b">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {revenus.map((revenu) => (
            <tr key={revenu.id}>
              <td className="py-2 px-4 border-b">{revenu.titre}</td>
              <td className="py-2 px-4 border-b">{revenu.montant} CFA</td>
              <td className="py-2 px-4 border-b flex gap-2">
                <Link to={`/modifierRevenu/${revenu.id}`}>
                  <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700">
                    Modifier
                  </button>
                </Link>
                <button
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                  onClick={() => handleDelete(revenu.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
          {/* Ligne pour le bouton Ajouter Revenu */}
          <tr>
            <td colSpan="3" className="py-2 px-4 border-b text-center">
              <Link to="/ajoutRevenu">
                <button className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-900">
                  Ajouter un nouveau revenu
                </button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
