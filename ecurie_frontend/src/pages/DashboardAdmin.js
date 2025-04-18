import { useNavigate } from 'react-router-dom';
import './DashboardAdmin.css';

function DashboardAdmin() {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Chevaux',
      desc: 'Gérer les chevaux',
      icon: '🐴',
      path: '/admin/chevaux',
      color: '#1976d2',
    },
    {
      title: 'Propriétaires',
      desc: 'Gérer les propriétaires',
      icon: '🧍‍♂️',
      path: '/admin/proprietaires',
      color: '#2e7d32',
    },
    {
      title: 'Personnel',
      desc: 'Gérer les personnel',
      icon: '🧑‍💼',
      path: '/admin/personnel',
      color: '#9c27b0',
    },
    {
      title: 'Médicaments',
      desc: 'Gérer les médicaments',
      icon: '💊',
      path: '/admin/medicaments',
      color: '#f9a825',
    },
    {
      title: 'Traitements',
      desc: 'Gérer les traitements',
      icon: '📅',
      path: '/admin/traitements',
      color: '#e53935',
    },
    {
      title: 'Comptabilité',
      desc: 'Gérer les comptabilité',
      icon: '💰',
      path: '/admin/compta',
      color: '#3f51b5',
    },
  ];

  return (
    <div className="admin-container">
      <h2>Tableau de bord</h2>
      <div className="card-grid">
        {sections.map((s, idx) => (
          <div key={idx} className="admin-card" onClick={() => navigate(s.path)}>
            <div className="icon" style={{ backgroundColor: s.color }}>{s.icon}</div>
            <div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardAdmin;
