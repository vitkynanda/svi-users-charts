import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Line } from "react-chartjs-2";
import formatTime from "../../utils/formatTime";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxHeight: 500,
  bgcolor: "background.paper",
  borderRadius: 2,
  border: "1px solid lightgray",
  boxShadow: 24,
  p: 4,
};

export default function DetailChart({ data, options, price, pair }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    setDetailData({
      labels: [],
      datasets: [
        {
          backgroundColor: "rgb(255, 99, 132, 0.8)",
          borderColor: "rgba(255, 99, 132, 0.2)",
          data: [],
          fill: true,
          label: "Price",
        },
      ],
    });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [detailData, setDetailData] = React.useState({
    labels: [],
    datasets: [
      {
        backgroundColor: "rgb(255, 99, 132, 0.8)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        data: [],
        fill: true,
        label: "Price",
      },
    ],
  });

  React.useEffect(() => {
    setDetailData({
      labels: [...detailData.labels, formatTime()],
      datasets: [
        {
          ...detailData.datasets[0],
          data: [...detailData.datasets[0].data, price],
        },
      ],
    });
  }, [data]);

  return (
    <div>
      <Button onClick={handleOpen}>Open Detail</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Detail Chart
          </Typography>
          <div>
            <p className="text-sm">
              Currency : {pair} || Value : ${price}
            </p>
            <p className="text-sm">
              Date : 0{new Date().getDate()}-0{new Date().getMonth() + 1}-
              {new Date().getFullYear()}
            </p>
          </div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
          <div className="h-72">
            <Line data={detailData} options={options} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
