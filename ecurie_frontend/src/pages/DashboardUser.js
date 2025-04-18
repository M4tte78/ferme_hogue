import { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardUser() {
  const [chevaux, setChevaux] = useState([]);

  useEffect(() => {
    const fetchChevaux = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/chevaux/mes-chevaux', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setChevaux(res.data);
      } catch (err) {
        console.error("Erreur chargement chevaux :", err);
      }
    };

    fetchChevaux();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Bienvenue sur votre espace propriétaire</h2>
      <h3>Vos chevaux :</h3>
      {chevaux.length === 0 ? (
        <p>Aucun cheval trouvé.</p>
      ) : (
        <ul>
          {chevaux.map((cheval) => (
            <li key={cheval.id_cheval}>
              <strong>{cheval.nom}</strong> ({cheval.race}) — Né(e) le {new Date(cheval.date_naissance).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DashboardUser;
