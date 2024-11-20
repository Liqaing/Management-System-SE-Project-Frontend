import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const EventCart = () => {
  return (
    <Card sx={{ width: 200 }}>
      <CardMedia
        sx={{ height: 200 }} // Adjusted the height to maintain aspect ratio
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-ciKijY18I0-wpWNQzrNpz5gwr70q2DRH5HNlphkOcFdwqKq6ftyMEkE&s"
      />
      <CardContent>
        <Typography variant="h6">Indian Fast Food</Typography> 
        <Typography variant="body2">50% off on your first order</Typography>
        <div className="py-1 space-y-1"> 
          <p>{"mumbai"}</p>
          <p className="text-xs text-blue-500">February 14, 2024 12:00 AM</p> 
          <p className="text-xs text-red-500">February 15, 2024 12:00 AM</p> 
        </div>
      </CardContent>
      {false && (
        <CardActions>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};

export default EventCart;