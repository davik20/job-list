import type { NextPage } from "next";
import JobListings from "../components/JobListings";
import UserLayout from "../components/layouts/UserLayout";

const Home: NextPage = () => {
  return (
    <UserLayout>
      <JobListings />
    </UserLayout>
  );
};

export default Home;
