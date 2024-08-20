import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Card = () => {
  const [revenus, setRevenus] = useState([]);
  const [depenses, setDepenses] = useState([]);
  const [solde, setSolde] = useState(0);

  useEffect(() => {
    // Fonction pour récupérer les revenus
    const fetchRevenus = async () => {
      try {
        const response = await axios.get('http://localhost:4000/revenu');
        setRevenus(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des revenus:', error);
      }
    };

    // Fonction pour récupérer les dépenses
    const fetchDepenses = async () => {
      try {
        const response = await axios.get('http://localhost:4000/depenses');
        setDepenses(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des dépenses:', error);
      }
    };

    // Appel des fonctions pour récupérer les données
    fetchRevenus();
    fetchDepenses();
  }, []);

  useEffect(() => {
    // Fonction pour calculer le solde
    const calculateSolde = () => {
      const totalRevenus = revenus.reduce((acc, revenu) => acc + revenu.montant, 0);
      const totalDepenses = depenses.reduce((acc, depense) => acc + depense.montant, 0);
      setSolde(totalRevenus - totalDepenses);
    };

    // Calculer le solde lorsque les revenus ou les dépenses changent
    calculateSolde();
  }, [revenus, depenses]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-mono text-yellow-400 mb-4">Solde Actuel</h2>
      <p className="text-xl font-semibold">Solde : {solde} CFA</p>
      {/* Ajoutez ici les autres éléments de votre composant */}
    </div>
  );
};

export default Card;
