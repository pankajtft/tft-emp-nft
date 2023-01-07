const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
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
      skills: {
        type: Array,
      },
    },
    tokenId: {
      type: Number,
    },
    projDetails: [
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
    transactionDetails: [
      // {
      //   transactionHash: {
      //     type: String,
      //   },
      //   eventName: {
      //     type: String,
      //   },
      //   gasUsed: {
      //     type: Number,
      //   },
      //   timestamps: {
      //     type: String,
      //   },
      // },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Employee", employeeSchema);
