import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const HomePage = () => {
  return (
    <Box>
      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Restaurant Manager
        </Typography>
        <Typography variant="body1" paragraph>
          Easily manage tables, orders, and staff with our powerful system.
        </Typography>

        <Grid container spacing={4}>
          {/* Card 1: Manage Orders */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image="https://source.unsplash.com/featured/?food"
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
          </Grid>

          {/* Card 2: Manage Tables */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image="https://source.unsplash.com/featured/?restaurant"
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
          </Grid>

          {/* Card 3: Manage Staff */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image="https://source.unsplash.com/featured/?people"
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
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
