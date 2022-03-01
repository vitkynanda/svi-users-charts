import Layout from "../../components/layout";
import UsersTable from "../../components/user-table";
import DialogLayout from "../../components/dialog";
import { TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { createNewUser, getListUsers } from "../../constants/service/api";
import PaginationData from "../../components/pagination";

export default function Users() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery(["users", page], () =>
    getListUsers(page)
  );
  const [payload, setPayload] = useState({
    name: "",
    job: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const { mutate: addUser } = useMutation((data) => createNewUser(data), {
    onSuccess: () => {
      toast.success("New user created successfully");
    },
  });

  console.log(data);

  return (
    <Layout title="Users">
      <div className="flex items-center justify-between">
        <DialogLayout
          title="Add User"
          payload={payload}
          action={addUser}
          icons={<AddIcon />}
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
        <PaginationData
          page={page}
          setPage={setPage}
          totalPage={data?.total_pages}
        />
      </div>

      <UsersTable data={data} isLoading={isLoading} />
    </Layout>
  );
}
