import {
    Box,
    Typography,
    Card,
    CardHeader,
    Divider,
    Avatar,
    Grid,
    Button
} from '@mui/material';

function Transaction() {
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
                            Gas Price
                        </th>
                        <th scope="col" className="py-5 px-20">
                            Event
                        </th>
                        <th scope="col" className="py-5 px-20">
                            Time stamp
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white item-center border-black border-separate border border-slate-300">
                        <td className="py-4 px-6 text-center capitalize text-sm">
                        0xb6ef276beaacf77a31532977c0a6231a35055ef80d8fab4eeb7c1ff602821de7
                        </td>
                        <td className="py-4 px-6 text-center capitalize text-sm">
                        0.000000021504396409 Ether
                        </td>
                        <td className="py-4 px-6 text-center text-sm">
                        mintEmployeeNFT 
                        </td>
                        <td className="py-4 px-6 text-center text-sm">
                        Jan-04-2023 03:56:11 PM +UTC
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr className="bg-white item-center border-black border-separate border border-slate-300">
                        <td className="py-4 px-6 text-center capitalize text-sm">
                        0xb6ef276beaacf77a31532977c0a6231a35055ef80d8fab4eeb7c1ff602821de7
                        </td>
                        <td className="py-4 px-6 text-center capitalize text-sm">
                        0.000000021504396409 Ether
                        </td>
                        <td className="py-4 px-6 text-center text-sm">
                        skillUpdate 
                        </td>
                        <td className="py-4 px-6 text-center text-sm">
                        Jan-04-2023 03:56:11 PM +UTC
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr className="bg-white item-center border-black border-separate border border-slate-300">
                        <td className="py-4 px-6 text-center capitalize text-sm">
                        0xb6ef276beaacf77a31532977c0a6231a35055ef80d8fab4eeb7c1ff602821de7
                        </td>
                        <td className="py-4 px-6 text-center capitalize text-sm">
                        0.000000021504396409 Ether
                        </td>
                        <td className="py-4 px-6 text-center text-sm">
                        AddProject 
                        </td>
                        <td className="py-4 px-6 text-center text-sm">
                        Jan-04-2023 03:56:11 PM +UTC
                        </td>
                    </tr>
                </tbody>
            </Box>
        </Card>
    )
}

export default Transaction;