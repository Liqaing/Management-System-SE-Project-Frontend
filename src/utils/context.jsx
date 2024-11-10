import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .post("/api/auth/token")
      .then((res) => {
        const data = res.data;
        const userData = {
          isLogin: data.data.isLogin,
          username: data.data.username,
          role: data.data.role,
        };
        setUser(userData);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
        setIsReady(true);
      });
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser, loading, setLoading }}>
      {isReady ? props.children : null}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node,
};

export { AppContext, AppProvider };
