const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());

app.use(cookieParser());

app.use(express.static('public'))

app.set('trust proxy', true);

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);
    setAuthCookie(res, user.token);
    res.send({
      id: user._id,
    });
  }
});

apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});


apiRouter.get('/user/:email', async (req, res) => {
  const user = await DB.getUser(req.params.email);
  if (user) {
    const token = req?.cookies.token;
    res.send({ email: user.email, authenticated: token === user.token});
    return;
  }
  res.status(404).send({ msg: 'Unknown'});
});


apiRouter.get('/schedule', async (_req, res) => {
  const schedule = await DB.getSchedule();
  res.send(schedule);
});


apiRouter.get('/waags', async (_req, res) => {
  const waag = await DB.getWaag();
  res.send(waag);
});

apiRouter.post('/event/add', async (req, res) => {
  DB.addEvent(req.body);
  const schedule = await DB.getSchedule();
  res.send(schedule);
});


apiRouter.post('/event/delete', async (req, res) => {
  DB.deleteEvent(req.body);
  const schedule = await DB.getSchedule();
  res.send(schedule);
});

apiRouter.post('/waag/add', async (req, res) => {
  DB.addWaag(req.body);
  const waag = await DB.getWaag();
  res.send(waag);
});

apiRouter.post('/waag/delete', async (req, res) => {
  DB.deleteWaag(req.body);
  const schedule = await DB.getSchedule();
  res.send(schedule);
});


var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);


secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized'});
  }
})



var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);


secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized'});
  }
})


app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});


app.use((_req, res) => {
  res.sendFile('index.html', {root: 'public'});
});

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);
