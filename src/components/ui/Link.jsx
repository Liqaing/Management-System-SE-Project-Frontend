import { Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";

const LinkBtn = (props) => {
  return (
    <MuiLink
      component={RouterLink}
      to={props.to}
      sx={{
        ...props.sx,
      }}
    >
      {props.children}
    </MuiLink>
  );
};

LinkBtn.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
  sx: PropTypes.object,
};

export default LinkBtn;
