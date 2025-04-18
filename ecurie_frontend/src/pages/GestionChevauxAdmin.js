import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './GestionChevauxAdmin.css';
import { AuthContext } from '../utils/AuthContext';

function GestionChevauxAdmin() {
  const { user } = useContext(AuthContext);
  const [chevaux, setChevaux] = useState([]);
  const [proprietaires, setProprietaires] = useState([]);
  const [form, setForm] = useState({
    nom: '', race: '', date_naissance: '', proprietaire_id: '', notes: ''
  });

  // 🔄 Chargement des chevaux et propriétaires
  useEffect(() => {
    if (!user) return;

    const headers = { Authorization: `Bearer ${user.token}` };

    axios.get('http://localhost:5000/api/chevaux', { headers })
      .then(res => setChevaux(res.data));

    axios.get('http://localhost:5000/api/utilisateurs?role=proprietaire', { headers })
      .then(res => setProprietaires(res.data));
  }, [user]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const headers = { Authorization: `Bearer ${user.token}` };
    await axios.post('http://localhost:5000/api/chevaux', form, { headers });
    const res = await axios.get('http://localhost:5000/api/chevaux', { headers });
    setChevaux(res.data);
    setForm({ nom: '', race: '', date_naissance: '', proprietaire_id: '', notes: '' });
  };

  return (
    <div className="page">
      <h2>Gestion des Chevaux</h2>
      <input type="text" placeholder="Rechercher des chevaux..." className="search-bar" />

      <table>
        <thead>
          <tr>
            <th>Nom</th><th>Race</th><th>Âge</th><th>Propriétaire</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {chevaux.map((cheval, idx) => (
            <tr key={idx}>
              <td><strong>{cheval.nom}</strong></td>
              <td>{cheval.race}</td>
              <td>{new Date().getFullYear() - new Date(cheval.date_naissance).getFullYear()} ans</td>
              <td>{cheval?.Utilisateur?.prenom} {cheval?.Utilisateur?.nom}</td>
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
        <h3>Ajouter un nouveau cheval</h3>
        <input name="nom" placeholder="Nom" onChange={handleChange} value={form.nom} />
        <input name="race" placeholder="Race" onChange={handleChange} value={form.race} />
        <input name="date_naissance" type="date" onChange={handleChange} value={form.date_naissance} />
        <select name="proprietaire_id" onChange={handleChange} value={form.proprietaire_id}>
          <option value="">Sélectionner un propriétaire</option>
          {proprietaires.map(p => (
            <option key={p.id_user} value={p.id_user}>{p.prenom} {p.nom}</option>
          ))}
        </select>
        <textarea name="notes" placeholder="Notes" onChange={handleChange} value={form.notes}></textarea>
        <div className="form-actions">
          <button type="button">Annuler</button>
          <button type="submit">Enregistrer</button>
        </div>
      </form>
    </div>
  );
}

export default GestionChevauxAdmin;
