import Layout from "../components/layout";
import CardLayout from "../components/card";
import GroupIcon from "@mui/icons-material/Group";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <Layout title="Dashboard">
      <div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto">
        <CardLayout>
          <div
            onClick={() => router.push("/users")}
            className="flex flex-col items-center justify-center h-32"
          >
            <GroupIcon sx={{ fontSize: "30px" }} />
            <p>Users</p>
          </div>
        </CardLayout>
        <CardLayout>
          <div
            onClick={() => router.push("/chart")}
            className="flex flex-col items-center justify-center h-32"
          >
            <SsidChartIcon sx={{ fontSize: "30px" }} />
            <p>Chart</p>
          </div>
        </CardLayout>
      </div>
    </Layout>
  );
}
