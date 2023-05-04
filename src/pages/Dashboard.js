import React from "react";
import { Info, Repos, User, Search, Navbar } from "../components";
import loadingImage from "../images/preloader.gif";
import { useGlobalContext } from "../context/context";

const Dashboard = () => {
  const { loading } = useGlobalContext();

  return (
    <main>
      <Navbar />
      <Search />
      {loading ? (
        <section>
          <div className="section-center">
            <img className="loading-img" src={loadingImage} alt="loading" />
          </div>
        </section>
      ) : (
        <>
          <Info />
          <User />
          <Repos />
        </>
      )}
    </main>
  );
};

export default Dashboard;
