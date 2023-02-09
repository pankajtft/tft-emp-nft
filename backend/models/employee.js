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
      designation: {
        type: String,
      },
      isSkillSynced: {
        type: Boolean,
        default: false,
      },
    },
    minted: {
      type: Boolean,
      default:false
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
        isEdited: {
          type: Boolean,
          default: false,
        },
        isSynced: {
          type: Boolean,
          default: false,
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
