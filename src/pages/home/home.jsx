import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid2,
} from "@mui/material";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import table from "../../assets/table.jpg";
import staff from "../../assets/staff.jpg";
import order from "../../assets/order.jpg";
import report from "../../assets/report.jpg";
import menu from "../../assets/menu.jpg";
import { Menu, Report } from "@mui/icons-material";
import Navbar from "../../components/NavBar";

const HomePage = () => {
  return (
    <Box>
      <Navbar />

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Restaurant Manager
        </Typography>
        <Typography variant="body1" paragraph>
          Easily manage tables, orders, and staff with our powerful system.
        </Typography>

        <Grid2 container spacing={4}>
          {/* Card 1: Manage Orders */}
          <Grid2 item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={order}
                alt="Manage Orders"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Manage Orders
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  View and manage all incoming orders. Track their status in
                  real-time.
                </Typography>
              </CardContent>
              <Button size="small" startIcon={<LocalDiningIcon />}>
                Manage Orders
              </Button>
            </Card>
          </Grid2>

          {/* Card 2: Manage Tables */}
          <Grid2 item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={table}
                alt="Manage Tables"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Manage Tables
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Allocate tables and manage reservations with ease.
                </Typography>
              </CardContent>
              <Button size="small" startIcon={<TableRestaurantIcon />}>
                Manage Tables
              </Button>
            </Card>
          </Grid2>

          {/* Card 3: Manage Staff */}
          <Grid2 item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={staff}
                alt="Manage Staff"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Manage Staff
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Track staff shifts, roles, and performance all in one place.
                </Typography>
              </CardContent>
              <Button size="small" startIcon={<AccountCircleIcon />}>
                Manage Staff
              </Button>
            </Card>
          </Grid2>

          {/* Card 4: Manage Menu */}
          <Grid2 item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={menu}
                alt="Manage menu"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Manage Menu
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Track and manage menu in the restaurant.
                </Typography>
              </CardContent>
              <Button size="small" startIcon={<Menu />}>
                Manage Menu
              </Button>
            </Card>
          </Grid2>

          {/* Card 5: Report */}
          <Grid2 item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={report}
                alt="Report"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Report
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Track and keep in touch with your restaurant with details
                  report.
                </Typography>
              </CardContent>
              <Button size="small" startIcon={<Report />}>
                Report
              </Button>
            </Card>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};

export default HomePage;
