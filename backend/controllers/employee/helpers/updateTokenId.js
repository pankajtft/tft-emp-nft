const Employee = require("../../../models/employee");

const updateTokenId = async (_empId, tokenId) => {
  Employee.findOneAndUpdate(
    { "empDetail.empCode": _empId },
    {
      tokenId: tokenId,
    },
    (err, item) => {
      if (err) {
        console.log(err);
      } else {
        console.log("token id updated");
      }
    }
  );
};

module.exports = { updateTokenId };
