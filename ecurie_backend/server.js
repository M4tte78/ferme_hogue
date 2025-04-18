const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./models');

// Routes
const authRoutes = require('./routes/auth.routes');
const chevalRoutes = require('./routes/cheval.routes');
const personnelRoutes = require('./routes/personnel.routes');
const comptaRoutes = require('./routes/compta.routes');
const traitementRoutes = require('./routes/traitement.routes');
const utilisateurRoutes = require('./routes/utilisateur.routes');



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/chevaux', chevalRoutes);
app.use('/api/personnel', personnelRoutes);
app.use('/api/compta', comptaRoutes);
app.use('/api/traitements', traitementRoutes);

// Utilisateurs routes
app.use('/api/utilisateurs', utilisateurRoutes);

// Port + lancement
const PORT = process.env.PORT || 5000;
db.sequelize.sync().then(() => {
  app.listen(PORT, '127.0.0.1', () => {
    console.log(`✅ Server is running on http://127.0.0.1:${PORT}`);
  });
});
