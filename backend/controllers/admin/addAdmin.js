const Admin = require("../../models/admin");

const addAdmin = async (req, res) => {
  console.log(req.body);
  try {
    const all_admin = await Admin.create(req.body);
    res.status(200).json(all_admin);
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports = { addAdmin };
