import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  employee_name: {
    type: String,
    required: true,
  },
  employee_code: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  project_hash: {
    type: String,
    required: true,
  },
  projects: [
    {
      project_name: {
        type: String,
        required: true,
      },
      project_start_date: {
        type: Date,
        required: true,
      },
      project_end_date: {
        type: Date,
        required: true,
      },
      team_size: {
        type: Number,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
    },
  ],
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
