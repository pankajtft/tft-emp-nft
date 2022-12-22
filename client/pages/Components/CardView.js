import {
  Tooltip,
  IconButton,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
} from '@mui/material';
import Label from "react";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import Link from "next/link";
import { useRouter } from "next/router";

const getLabelForStatus = (status) => {
  const map = {
    failed: {
      text: 'Failed',
      color: 'error'
    },
    completed: {
      text: 'Completed',
      color: 'success'
    },
    pending: {
      text: 'Pending',
      color: 'warning'
    }
  };

  const { text = '', color = '' } = map[status] || {};

  return <Label color={color}>{text}</Label>;
};

const CardView = ({ data }) => {

  const theme = useTheme();

  return (
    //     <div class="relative group w-96 h-96 overflow-hidden bg-black m-auto mt-12">
    //   <img class="object-cover w-full h-full transform duration-700 backdrop-opacity-100 group-hover:opacity-40" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ861kKtQQNaB-ldRWBs6MQqTVkShMh9tEJOn_BQKmrmSFHu76MI-TOTA-lGnloYzZgKvk&usqp=CAU" />
    //   <div class="absolute w-full h-full shadow-2xl opacity-10 transform duration-500 inset-y-full group-hover:-inset-y-0"></div>
    //   <div class="absolute bg-gradient-to-t from-black w-full h-full transform duration-500 inset-y-3/4 group-hover:-inset-y-0 justify-evenly">
    //     <div class="absolute w-full flex place-content-center">
    //       <p class="capitalize font-serif font-bold text-3xl text-center shadow-2xl text-white mt-10">{data?.name}</p>
    //     </div>
    //     <div class="w-full flex flex-col place-content-center mt-20 ">
    //       <p class="font-sans text-left w-4/5 text-white mt-5 mx-4">Experience: <span class="font-sans text-left w-4/5 text-white mt-5 mx-4">{data?.experience}</span></p>
    //       <p class="font-sans text-left w-4/5 text-white mt-5 mx-4">Email: <span class="font-sans text-right w-4/5 text-white mt-5 mx-4">{data?.email}</span></p>
    //       <p class="font-sans text-left w-4/5 text-white mt-5 mx-4">Employee Code: <span class="font-sans text-left w-4/5 text-white mt-5 mx-4">{data?.employeeCode}</span></p>
    //     </div>
    //     <button class="absolute left-1/4 bottom-4 bg-white text-black hover:bg-purple-500 font-bold rounded-lg h-10 w-48">
    //       <Link
    //       href={{
    //         pathname: "/Listing/EmployeeDetails",
    //         query: data
    //       }}
    //       >
    //       See More
    //       </Link>
    //       </button>
    //   </div>
    // </div>

    < TableContainer className='bg-gradient-to-r from-[#332575] to-[#928DAB] sticky top-0 z-50'>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="right">
              <Typography
                variant="body1"
                fontWeight="bold"
                color="text.primary"
                gutterBottom
                noWrap
              >
                <button>
                  <Link
                    href={{
                      pathname: "/Listing/EmployeeDetails",
                      query: data  
                    }}
                  >
                    {data?.name}
                  </Link>
                </button>
              </Typography>
            </TableCell>

            <TableCell>
              <Typography
                variant="body1"
                fontWeight="bold"
                color="text.primary"
                gutterBottom
                noWrap
              >
                {data?.employeeCode}
              </Typography>
            </TableCell>

            <TableCell align="right">
              <Typography
                variant="body1"
                fontWeight="bold"
                color="text.primary"
                gutterBottom
                noWrap
              >
                {data?.email}
              </Typography>
            </TableCell>

            <TableCell>
              <Typography
                variant="body1"
                fontWeight="bold"
                color="text.primary"
                gutterBottom
                noWrap
              >
                {data?.experience}
              </Typography>
            </TableCell>

            <TableCell>
              <Typography
                variant="body1"
                fontWeight="bold"
                color="text.primary"
                gutterBottom
                noWrap
              >
                {data?.designation}
              </Typography>
            </TableCell>

            <TableCell>
              <Typography
                variant="body1"
                fontWeight="bold"
                color="text.primary"
                gutterBottom
                noWrap
              >
                {data?.projName}
              </Typography>
            </TableCell>

            <TableCell>
              <Typography
                variant="body1"
                fontWeight="bold"
                color="text.primary"
                gutterBottom
                noWrap
              >
                {data?.startDate}
              </Typography>
            </TableCell>

            <TableCell>
              <Typography
                variant="body1"
                fontWeight="bold"
                color="text.primary"
                gutterBottom
                noWrap
              >
                {data?.endDate}
              </Typography>
            </TableCell>

            <TableCell>
              <Typography
                variant="body1"
                fontWeight="bold"
                color="text.primary"
                gutterBottom
                noWrap
              >
                {data?.teamSize}
              </Typography>
            </TableCell>

            <TableCell align="right">
                      success
              {/* {getLabelForStatus(data?.status)} */}

            </TableCell>
            <TableCell align="right">
              <Tooltip title="Edit Order" arrow>
                <IconButton
                  sx={{
                    '&:hover': {
                      // background: theme.colors.primary.lighter
                    },
                    color: theme.palette.primary.main
                  }}
                  color="inherit"
                  size="small"
                >
                  <EditTwoToneIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Order" arrow>
                <IconButton
                  sx={{
                    // '&:hover': { background: theme.colors.error.lighter },
                    color: theme.palette.error.main
                  }}
                  color="inherit"
                  size="small"
                >
                  <DeleteTwoToneIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </TableCell>

          </TableRow>
        </TableHead>
      </Table>
    </TableContainer >
  )
}

export default CardView