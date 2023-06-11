const User = require('../models/User');

exports.index = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.json(err);
  }
};

exports.create = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    res.json(user);
  } catch (err) {
    res.json(err);
  }

};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const user = await User.update({ name, email, password }, { where: { id } });
    res.json(user);
  } catch (err) {
    res.json(err);
  }
};

exports.destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.destroy({ where: { id } });
    res.json(user);
  } catch (err) {
    res.json(err);
  }
}