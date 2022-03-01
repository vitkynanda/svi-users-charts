/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  getListUsers,
  editUserData,
  deleteUserData,
} from "../../constants/service/api";
import { useQuery, useMutation, useQueryClient } from "react-query";
import DialogLayout from "../dialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import { CircularProgress } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(59 130 246 / 0.5)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Row = ({ row }) => {
  const queryClient = useQueryClient();
  const [payload, setPayload] = React.useState({
    name: "",
    job: "",
  });
  const { mutate: editUser } = useMutation((data) => editUserData(data), {
    onSuccess: () => {
      toast.success("Edited user data successfully");
      queryClient.invalidateQueries("users");
    },
  });
  const { mutate: deleteUser, isSuccess } = useMutation((data) =>
    deleteUserData(data)
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  return (
    <StyledTableRow>
      <StyledTableCell component="th" scope="row">
        {row.id}
      </StyledTableCell>
      <StyledTableCell>
        <img src={row.avatar} alt="user-image" className="rounded-full w-20" />
      </StyledTableCell>
      <StyledTableCell>
        <p className="capitalize">
          {row.first_name} {row.last_name}
        </p>
      </StyledTableCell>
      <StyledTableCell>{row.email}</StyledTableCell>
      <StyledTableCell>
        <div className="flex space-x-2">
          <DialogLayout
            title="Edit User"
            data={row}
            payload={payload}
            action={editUser}
            icons={<EditIcon />}
          >
            <div className="space-y-3 w-72 py-2">
              <TextField
                id="outlined-basic"
                label="Name"
                name="name"
                value={payload.name}
                onChange={handleChange}
                variant="outlined"
                className="w-full"
              />
              <TextField
                id="outlined-basic"
                label="Job"
                name="job"
                value={payload.job}
                onChange={handleChange}
                variant="outlined"
                className="w-full"
              />
            </div>
          </DialogLayout>
          <DialogLayout
            title="Delete User"
            action={deleteUser}
            data={row}
            icons={<DeleteIcon />}
          >
            <div>Are you sure want to delete this user ?</div>
          </DialogLayout>
        </div>
      </StyledTableCell>
    </StyledTableRow>
  );
};

const UsersTable = ({ data, isLoading }) => {
  React.useEffect(() => {}, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>User Avatar</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <StyledTableRow>
              <StyledTableCell colSpan={5}>
                <div className="w-full flex items-center justify-center h-72">
                  <CircularProgress />
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ) : (
            data?.data?.map((row, id) => <Row key={id} row={row} />)
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
