import React from "react";
import { Card as MuiCard, CardContent, CardMedia, Typography, Box, Chip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface Restaurant {
  name: string;
  cuisines: { name: string }[];
  rating: { starRating: number };
  address: { firstLine: string; city: string; postalCode: string };
  logoUrl: string;
}

export default function Card({ restaurant }: { restaurant: Restaurant }) {
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${restaurant.address.firstLine}, ${restaurant.address.city}, ${restaurant.address.postalCode}`
  )}`;

  return (
    <MuiCard sx={{ minWidth: 200, borderRadius: 2, boxShadow: 2, position: "relative" }}>
      {/* Restaurant Image */}
      <CardMedia
        component="img"
        height="120" // Reduced height
        image={restaurant.logoUrl}
        alt={restaurant.name}
      />

      {/* Location Icon in Top-Right Corner */}
      <Box
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
        }}
      >
        <a
          href={googleMapsLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <LocationOnIcon color="primary" sx={{ fontSize: 24 }} />
        </a>
      </Box>

      <CardContent sx={{ padding: "8px", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
        {/* Restaurant Name */}
       

        {/* Cuisines as Pills */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1 }}>
          {restaurant.cuisines.map((cuisine, index) => (
            <Chip
              key={index}
              label={cuisine.name}
              color="primary"
              size="small"
              sx={{ borderRadius: "16px", fontSize: "0.65rem", padding: "2px 4px" }} // Smaller pills
            />
          ))}
        </Box>
        <Typography variant="subtitle1" component="div" gutterBottom sx={{ fontSize: "1rem", fontWeight: "bold" }}>
          {restaurant.name}
        </Typography>
        {/* Rating as Stars (Moved to Bottom) */}
        <Box sx={{ display: "flex", alignItems: "center", paddingBottom: 1, paddingTop: 1 }}>
          {[...Array(5)].map((_, index) => (
            <StarIcon
              key={index}
              sx={{
                fontSize: 16, // Reduced star size
                color: index < restaurant.rating.starRating ? "#FFD700" : "#E0E0E0",
              }}
            />
          ))}
        </Box>
      </CardContent>
    </MuiCard>
  );
}