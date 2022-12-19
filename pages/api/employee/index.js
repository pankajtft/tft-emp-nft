import nextConnect from "next-connect";
import middleware from "../database";
const Employee = require("../models/employee");
const handler = nextConnect();

handler.use(middleware);

// async function handler(req, res) {
//   if (req.method == "GET") {
handler.get(async (req, res) => {
  // try {
  //   // Create a new employee document
  //   const employee = new Employee({
  //     employee_name: "John Smith",
  //     employee_code: "JS001",
  //     email: "john.smith@example.com",
  //     experience: 5,
  //     project_hash: "abc123",
  //     projects: [
  //       {
  //         project_name: "Project A",
  //         project_start_date: "2022-01-01",
  //         project_end_date: "2022-06-30",
  //         team_size: 10,
  //         role: "Lead Developer",
  //       },
  //     ],
  //   });

  //   // Save the employee document to the database
  //   await employee.insertOne();

  //   res.status(200).json({ success: true });
  // } catch (error) {
  //   res.status(500).json({ error: error });
  // }

  try {
    const collection = req.db.collection("employees");
    const data = {
      employee_name: "John Smith",
      employee_code: "JS001",
      email: "john.smith@example.com",
      experience: 5,
      project_hash: "abc123",
      projects: [
        {
          project_name: "Project A",
          project_start_date: "2022-01-01",
          project_end_date: "2022-06-30",
          team_size: 10,
          role: "Lead Developer",
        },
        {
          project_name: "Project B",
          project_start_date: "2022-07-01",
          project_end_date: "2022-12-31",
          team_size: 5,
          role: "Developer",
        },
      ],
    };
    const result = await collection.insertOne(data);
    console.log(`Inserted document with ID: ${result.insertedId}`);

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default handler;
