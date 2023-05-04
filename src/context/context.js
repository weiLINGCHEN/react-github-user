import React, { useState, useEffect, createContext, useContext } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState("");
  const [request, setRequest] = useState({ limit: 0, remaining: 0 });
  const [error, setError] = useState({
    notFound: false,
    emptyInput: false,
    noRemainingRequest: false,
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const resUser = await axios(`${rootUrl}/users/${input}`);

      const resRepos = await axios(
        `${rootUrl}/users/${input}/repos?per_page=100`
      );
      const resFollowers = await axios(`${rootUrl}/users/${input}/followers`);

      setGithubUser(resUser.data);
      setRepos(resRepos.data);
      setFollowers(resFollowers.data);
      setLoading(false);
      setInput("");
      setError({
        notFound: false,
        emptyInput: false,
        noRemainingRequest: false,
      });
    } catch (error) {
      if (error.response.data.message === "Not Found") {
        setError({ ...error, notFound: true });
        setLoading(false);
        return;
      }
      setLoading(false);
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (input) {
      fetchData();
      fetchRequest();
    } else {
      setError({ ...error, emptyInput: true });
    }
  };
  // fetch request
  const fetchRequest = async () => {
    try {
      const {
        data: {
          rate: { remaining, limit },
        },
      } = await axios.get(`${rootUrl}/rate_limit`);
      setRequest({ limit, remaining });

      if (remaining === 0) {
        setError({ ...error, noRemainingRequest: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        input,
        setInput,
        handleSubmit,
        request,

        error,
        loading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };

export const useGlobalContext = () => {
  return useContext(GithubContext);
};
