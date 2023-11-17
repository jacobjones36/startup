const express = require('express');
const app = express();
const DB = require('./database.js');

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.get('/schedule', async (_req, res) => {
  const schedule = await DB.getSchedule();
  res.send(schedule);
});

apiRouter.post('/event', async (req, res) => {
  DB.addEvent(req.body);
  const schedule = await DB.getSchedule();
  res.send(schedule);
});

apiRouter.get('/waags', async (_ereq, res) => {
  const waag = await DB.getWaag();
  res.send(waag);
});

apiRouter.post('/waag', async (req, res) => {
  DB.addWaag(req.body);
  const waag = await DB.getWaag();
  res.send(waag);
});

app.use((_req, res) => {
  res.sendFile('index.html', {root: 'public'});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
