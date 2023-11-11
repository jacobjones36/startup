const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.get('/schedule', (_req, res) => {
  res.send(schedule);
});

apiRouter.post('/event', (req, res) => {
  schedule = updateSchedule(req.body, schedule);
  res.send(schedule);
});

apiRouter.get('/waags', (_ereq, res) => {
    res.send(waag);
});

apiRouter.post('/waag', (req, res) => {
    waag = updateWaag(req.body, waag);
    res.send(waag);
});

app.use((_req, res) => {
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

let schedule = [];
function updateSchedule(newEvent, schedule) {
  let found = false;
  for (const [i, prevEvent] of schedule.entries()) {
    if (newEvent.event > prevEvent.event) {
      schedule.splice(i, 0, newEvent);
      found = true;
      break;
    }
  }

  if (!found) {
    schedule.push(newEvent);
  }

  if (schedule.length > 10) {
    schedule.length = 10;
  }

  return schedule;
}

let waag = [];
function updateWaag(newWaag, waag) {
  let found = false;
  for (const [i, prevWaag] of waag.entries()) {
    if (newWaag.event > prevWaag.event) {
      waag.splice(i, 0, newWaag);
      found = true;
      break;
    }
  }

  if (!found) {
    waag.push(newWaag);
  }

  if (waag.length > 10) {
    waag.length = 10;
  }

  return waag;
}
