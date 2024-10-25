import { Box, Typography } from "@mui/material";
import LinkBtn from "../../components/ui/Link";

const ErrorPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        bgcolor: "background.default",
        color: "text.primary",
        padding: 3,
      }}
    >
      <Typography
        variant="h1"
        component="h2"
        sx={{ fontWeight: "bold", fontSize: "6rem" }}
      >
        404
      </Typography>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Oops! Page not found.
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 4 }}>
        The page you are looking for does not exist or an other error occurred.
      </Typography>
      <LinkBtn variant="contained" color="primary" to="/" sx={{ marginTop: 2 }}>
        Go to Homepage
      </LinkBtn>
    </Box>
  );
};

export default ErrorPage;
