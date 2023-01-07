const Employee = require("../../../models/employee");

const storeTransaction = async (_id, transactionHash, eventName, gasUsed) => {
  try {
    const timestamps = new Date();
    const updates = {
      transactionHash,
      eventName,
      gasUsed,
      timestamps,
    };
    console.log(updates);
    const employee = await Employee.findByIdAndUpdate(_id, {
      $push: { transactionDetails: updates },
    });
    return employee;
  } catch (err) {
    return err;
  }
};

module.exports = { storeTransaction };
