import express from 'express';
const app = express();

app.use('/.well-known', express.static('public'));

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
