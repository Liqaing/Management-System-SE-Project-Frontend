import PropTypes from "prop-types";
import { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  return (
    <AppContext.Provider value={{ user, setUser, loading, setLoading }}>
      {props.children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node,
};

export { AppContext, AppProvider };
