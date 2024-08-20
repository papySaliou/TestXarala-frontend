import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Depense from "./components/depense";
import { Rapport } from "./components/rapport";
import { AjoutDepense } from "./components/AjoutDepense";
import { AjoutRevenu } from "./components/AjoutRevenu";
import { Transaction } from "./components/Transaction";
import { ModifierRevenu } from "./components/Modifierrevenu";
import { ModifierDepense } from "./components/ModifierDepense";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Transaction />} />
        <Route path="/ajoutDepense" element={<AjoutDepense />} />
        <Route path="/ajoutRevenu" element={<AjoutRevenu />} />
        <Route path="/depenses" element={<Depense />} />
        <Route path="/rapport" element={<Rapport />} />
        <Route path="/modifierRevenu/:id" element={<ModifierRevenu />} />
        <Route path="/modifierDepense/:id" element={<ModifierDepense />} />
      </Routes>
    </Router>
  );
}
