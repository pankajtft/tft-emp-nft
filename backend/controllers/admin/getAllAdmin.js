const Admin = require("../../models/admin");
const getAllAdmin = async (req, res) => {
  try {
    const admin_data = await Admin.find({
      isDeleted: false,
      isActive: true,
    });
    res.status(200).send(admin_data);
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports = { getAllAdmin };
