import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  Grid,
  Button,
} from "@mui/material";

function Transaction({ transaction }) {
  return (
    <Card>
      <CardHeader title="Transaction History" />
      <Divider />
      <Box p={2}>
        <Grid container spacing={0}></Grid>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 item-center">
          <tr>
            <th pxscope="col" className="py-5 px-20">
              Transaction Hash
            </th>
            <th scope="col" className="py-5 px-20">
              Event
            </th>
            <th scope="col" className="py-5 px-20">
              Gas Price
            </th>
            <th scope="col" className="py-5 px-20">
              Time stamp
            </th>
          </tr>
        </thead>
        {transaction.map((trans) => (
          <tbody>
            <tr className="bg-white item-center border-black border-separate border border-slate-300">
              <td className="py-4 px-6 text-center capitalize text-sm">
                {trans.transactionHash}
              </td>
              <td className="py-4 px-6 text-center text-sm">
                {trans.eventName}
              </td>
              <td className="py-4 px-6 text-center capitalize text-sm">
                {trans.gasUsed} Ether
              </td>

              <td className="py-4 px-6 text-center text-sm">
                {trans.timestamps}
              </td>
            </tr>
          </tbody>
        ))}
      </Box>
    </Card>
  );
}

export default Transaction;
