const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  empDetail: {
    empCode: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  skills: {
    type: Array,
  },
  tokenId: {
    type: Number,
  },
  projects: [
    {
      projectName: {
        type: String,
      },
      projectStartDate: {
        type: Date,
      },
      projectEndDate: {
        type: Date,
      },
      teamSize: {
        type: Number,
      },
      designation: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Employee", employeeSchema);
