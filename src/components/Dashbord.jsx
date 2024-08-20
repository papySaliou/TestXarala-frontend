import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Depense from './depense';
// import Depense from './Depense'; // Assurez-vous d'importer le composant Depense

const Dashboard = () => {
  const [revenus, setRevenus] = useState([]);
  const [depenses, setDepenses] = useState([]);
  const [totalRevenus, setTotalRevenus] = useState(0);
  const [totalDepenses, setTotalDepenses] = useState(0);
  const [solde, setSolde] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les revenus depuis l'API
        const revenusResponse = await axios.get('http://localhost:4000/revenu');
        const revenusData = revenusResponse.data;
        setRevenus(revenusData);

        // Récupérer les dépenses depuis l'API
        const depensesResponse = await axios.get('http://localhost:4000/depenses');
        const depensesData = depensesResponse.data;
        setDepenses(depensesData);

        // Calculer le total des revenus
        const totalRevenusCalc = revenusData.reduce((acc, revenu) => acc + revenu.montant, 0);
        setTotalRevenus(totalRevenusCalc);

        // Calculer le total des dépenses
        const totalDepensesCalc = depensesData.reduce((acc, depense) => acc + depense.montant, 0);
        setTotalDepenses(totalDepensesCalc);

        // Calculer le solde restant
        setSolde(totalRevenusCalc - totalDepensesCalc);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header budgets={totalRevenus} depenses={totalDepenses} solde={solde} />
      <Depense depenses={depenses} totalRevenus={totalRevenus} />
    </div>
  );
};

export default Dashboard;
