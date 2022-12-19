const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  _empId: {
    type: String,
    required: true,
  },
  _employeeName: {
    type: String,
  },
  tokenId: {
    type: Number,
  },
  email: {
    type: String,
  },
  experience: {
    type: Number,
  },
  project_hash: {
    type: String,
  },
  projects: [
    {
      project_name: {
        type: String,
      },
      project_start_date: {
        type: Date,
      },
      project_end_date: {
        type: Date,
      },
      team_size: {
        type: Number,
      },
      role: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Employee", employeeSchema);


