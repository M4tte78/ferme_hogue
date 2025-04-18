import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardUser from './pages/DashboardUser';
import GestionChevauxAdmin from './pages/GestionChevauxAdmin';
import GestionProprietairesAdmin from './pages/GestionProprietairesAdmin';
import GestionPersonnelAdmin from './pages/GestionPersonnelAdmin';
import GestionMedicamentsAdmin from './pages/GestionMedicamentsAdmin';
import GestionTraitementsAdmin from './pages/GestionTraitementsAdmin';
import GestionComptaAdmin from './pages/GestionComptaAdmin';

import { AuthProvider, AuthContext } from './utils/AuthContext';
import { useContext } from 'react';

function DashboardRouter() {
  const { user } = useContext(AuthContext);

  if (!user) return <p>Connexion requise...</p>;

  return user.roles.includes('admin') ? <DashboardAdmin /> : <DashboardUser />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<DashboardRouter />} />

          {/* Routes admin */}
          <Route path="/admin/chevaux" element={<GestionChevauxAdmin />} />
          <Route path="/admin/proprietaires" element={<GestionProprietairesAdmin />} />
          <Route path="/admin/personnel" element={<GestionPersonnelAdmin />} />
          <Route path="/admin/medicaments" element={<GestionMedicamentsAdmin />} />
          <Route path="/admin/traitements" element={<GestionTraitementsAdmin />} />
          <Route path="/admin/compta" element={<GestionComptaAdmin />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
