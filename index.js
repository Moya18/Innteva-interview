var express = require("express"),
app = express(),
bodyParser  = require("body-parser"),
methodOverride = require("method-override");
const mongoose = require('mongoose');
const User = require('./models/User');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

router.get('/getUsers', async (req, res) => {
   try {
      const users = await User.find();
      res.json(users);
   } catch (err) {
      res.json({ message: err });
   }
});

router.get('/getUsersByRole', async (req, res) => {
   try {
      const users = await User.find({ role: req.body.role });
      res.json(users);
   } catch (err) {
      res.json({ message: err });
   }
});

router.get('/getUsersByPermission', async (req, res) => {
   try {
      const users = await User.find({ permissions: req.body.permissions  });
      res.json(users);
   } catch (err) {
      res.json({ message: err });
   }
});

router.get('/getUsersActive', async (req, res) => {
   try {
      const users = await User.find({ status: "activo"  });
      res.json(users);
   } catch (err) {
      res.json({ message: err });
   }
});

router.get('/getUsersNotActive', async (req, res) => {
   try {
      const users = await User.find({ status: "inactivo"  });
      res.json(users);
   } catch (err) {
      res.json({ message: err });
   }
});

router.get('/:id', async (req, res) => {
   try {
      const user = await User.findById({ _id: req.params.id });
      res.json(user);
   } catch (err) {
      res.json({ message: err });
   }
});

router.delete('/:id', async (req, res) => {
   try {
      const user = await User.deleteOne({ _id: req.params.id });
      res.json(user);
   } catch (err) {
      res.json({ message: err });
   }
});

router.patch('/:userId', async (req, res) => {
   try {
      const user = await User.updateOne(
         { _id: req.params.userId  },
         { $set: { 
      username: req.body.username,
      email: req.body.email,
      names: req.body.names,
      paternal_surname: req.body.paternal_surname,
      maternal_surname: req.body.maternal_surname,
      age: req.body.age,
      role: req.body.role,
      permissions: req.body.permissions
          } }
         );
         res.json(user);
   } catch (err) {
      res.json({ message: err });
   }
});

router.post('/createUser', (req, res) => {
   const user = new User({
      username: req.body.username,
      email: req.body.email,
      names: req.body.names,
      paternal_surname: req.body.paternal_surname,
      maternal_surname: req.body.maternal_surname,
      age: req.body.age,
      role: req.body.role,
      permissions: req.body.permissions,
      status: req.body.status
   });
   
   user.save()
   .then(data => { res.json(data); })
   .catch(err => { res.json({ message: err });
   });
});

app.use(router);

mongoose.connect('mongodb://innteva:innteva1@ds261486.mlab.com:61486/innteva-rest-api', 
{ useNewUrlParser: true }, 
() => console.log('Connected to database')
);

app.listen(3000, function() {
  console.log("Server running on http://localhost:3000");
});

