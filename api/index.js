const app = require('./servers');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Conectado na porta http://localhost:${PORT}`);
});
