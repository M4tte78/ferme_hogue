import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './GestionChevauxAdmin.css';
import { AuthContext } from '../utils/AuthContext';

function GestionProprietairesAdmin() {
  const { user } = useContext(AuthContext);
  const [proprietaires, setProprietaires] = useState([]);
  const [form, setForm] = useState({
    nom: '', prenom: '', email: '', telephone: '', adresse: '', mot_de_passe: 'azerty'
  });

  useEffect(() => {
    if (!user) return;

    axios.get('http://localhost:5000/api/utilisateurs?role=proprietaire', {
      headers: { Authorization: `Bearer ${user.token}` }
    }).then(res => setProprietaires(res.data));
  }, [user]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const headers = { Authorization: `Bearer ${user.token}` };
    await axios.post('http://localhost:5000/api/auth/register', { ...form }, { headers });
    const res = await axios.get('http://localhost:5000/api/utilisateurs?role=proprietaire', { headers });
    setProprietaires(res.data);
    setForm({ nom: '', prenom: '', email: '', telephone: '', adresse: '', mot_de_passe: 'azerty' });
  };

  return (
    <div className="page">
      <h2>Gestion des Propriétaires</h2>

      <input type="text" placeholder="Rechercher un propriétaire..." className="search-bar" />

      <table>
        <thead>
          <tr>
            <th>Nom</th><th>Email</th><th>Téléphone</th><th>Adresse</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {proprietaires.map((p, idx) => (
            <tr key={idx}>
              <td><strong>{p.prenom} {p.nom}</strong></td>
              <td>{p.email}</td>
              <td>{p.telephone || '-'}</td>
              <td>{p.adresse || '-'}</td>
              <td>
                <button>👁️</button>
                <button>✏️</button>
                <button>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleSubmit} className="cheval-form">
        <h3>Ajouter un propriétaire</h3>
        <input name="prenom" placeholder="Prénom" onChange={handleChange} value={form.prenom} />
        <input name="nom" placeholder="Nom" onChange={handleChange} value={form.nom} />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} value={form.email} />
        <input name="telephone" placeholder="Téléphone" onChange={handleChange} value={form.telephone} />
        <input name="adresse" placeholder="Adresse" onChange={handleChange} value={form.adresse} />
        <div className="form-actions">
          <button type="button">Annuler</button>
          <button type="submit">Enregistrer</button>
        </div>
      </form>
    </div>
  );
}

export default GestionProprietairesAdmin;
