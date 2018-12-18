const db = require('../models');

module.exports = {
  findAll: (req, res) => {
    db.User.findAll({}).then((results) => {
      res.json(results);
    });
  },
  findOne: (req, res) => {
    res.json({
      msg: `Find One: ${req.params.id}`,
    });
  },
  create: (req, res) => {
    db.User.create(req.body).then((results) => {
      res.json(results);
    });
  },
  update: (req, res) => {
    res.json({
      msg: 'Update One: ${req.params.id}',
    });
  },
  delete: (req, res) => {
    db.User.destroy({where: {id: req.params.id}}).then((results) => {
      res.json(results);
    });
  },
};
