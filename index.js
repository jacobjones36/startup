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

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

let schedule = loc;
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