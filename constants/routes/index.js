import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import SsidChartIcon from "@mui/icons-material/SsidChart";

const routes = [
  {
    name: "Dashboard",
    path: "/",
    isVisited: false,
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    path: "/users",
    isVisited: false,
    icon: <GroupIcon />,
  },
  {
    name: "Chart",
    path: "/chart",
    isVisited: false,
    icon: <SsidChartIcon />,
  },
];

export default routes;
