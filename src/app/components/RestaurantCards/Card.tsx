import React from "react";
import { Card as MuiCard, CardContent, CardMedia, Typography, Box, Chip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalShippingIcon from "@mui/icons-material/LocalShipping"; 
import AccessTimeIcon from "@mui/icons-material/AccessTime"; 

interface Restaurant {
  id: string;
  name: string;
  cuisines: { name: string }[];
  rating: { starRating: number };
  address: { firstLine: string; city: string; postalCode: string };
  logoUrl: string;
  deliveryCost: number;
  deliveryEtaMinutes: { rangeLower: number; rangeUpper: number };
}

export default function Card({ restaurant }: { restaurant: Restaurant }) {
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${restaurant.address.firstLine}, ${restaurant.address.city}, ${restaurant.address.postalCode}`
  )}`;

  return (
    <MuiCard
      sx={{
        maxWidth: 220,
        borderRadius: 2,
        boxShadow: 3,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <CardMedia
        component="img"
        height="120"
        image={restaurant.logoUrl}
        alt={restaurant.name}
        sx={{ objectFit: "contain" ,padding: "8px", }}
      />

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
          style={{ textDecoration: "none", color: "#98aba9" }}
        >
          <LocationOnIcon color="#98aba9" sx={{ fontSize: 20 }} />
        </a>
      </Box>

      <CardContent
        sx={{
          padding: "8px",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography
          variant="subtitle1"
          component="div"
          sx={{
            fontSize: "0.95rem",
            fontWeight: "bold",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {restaurant.name}
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {restaurant.cuisines.map((cuisine, index) => (
            <Chip
              key={index}
              label={cuisine.name}
              color="primary"
              size="small"
              sx={{
                borderRadius: "16px",
                fontSize: "0.65rem",
                padding: "2px 6px",
              }}
            />
          ))}
        </Box>

        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          <Chip
            icon={<LocalShippingIcon sx={{ fontSize: 16 }} />}
            label={`£${restaurant.deliveryCost.toFixed(2)}`}
            size="small"
            sx={{
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontSize: "0.75rem",
              fontWeight: 500,
            }}
          />

          <Chip
            icon={<AccessTimeIcon sx={{ fontSize: 16 }} />}
            label={`${restaurant.deliveryEtaMinutes.rangeLower}-${restaurant.deliveryEtaMinutes.rangeUpper} mins`}
            size="small"
            sx={{
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontSize: "0.75rem",
              fontWeight: 500,
            }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1 }}>
          {[...Array(5)].map((_, index) => (
            <StarIcon
              key={index}
              sx={{
                fontSize: 16,
                color: index < restaurant.rating.starRating ? "#FFD700" : "#E0E0E0",
              }}
            />
          ))}
        </Box>
      </CardContent>
    </MuiCard>
  );
}