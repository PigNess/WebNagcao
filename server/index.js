const dns =require('dns');
dns.setServers(['1.1.1.1','1.0.0.1']);
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

// Middlewares
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// APIs

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});
app.use('/api/admin', require('./api/admin.js'));
app.use('/api/customer', require('./api/customer.js'));
app.use('/admin', express.static(path.resolve(__dirname, '../client-admin-vite/build')));
app.get('admin/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client-admin-vite/build', 'index.html'))
});
app.use('/', express.static(path.resolve(__dirname, '../client-customer-vite/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client-customer-vite/build', 'index.html'));
});
// Start server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

//mongodb+srv://chixeom0506_db_user:CHI123@tramhuong.zny48hk.mongodb.net/

