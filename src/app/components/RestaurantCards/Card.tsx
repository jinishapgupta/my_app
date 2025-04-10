import React from "react";
import { Card as MuiCard, CardContent, CardMedia, Typography, Box, Chip } from "@mui/material";
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
  deliveryEtaMinutes: { rangeLower: number; rangeUpper: number } | null;
}

export default function Card({ restaurant }: { restaurant: Restaurant }) {
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${restaurant.address.firstLine}, ${restaurant.address.city}, ${restaurant.address.postalCode}`
  )}`;

  return (
    <MuiCard
      sx={{
        maxWidth: 200,
        borderRadius: 2,
        boxShadow: 2,
        position: "relative",
        overflow: "hidden",
        padding: "8px",
      }}
    >
      <CardMedia
        component="img"
        height="100"
        image={restaurant.logoUrl}
        alt={restaurant.name}
        sx={{
          objectFit: "contain",
          padding: "4px",
        }}
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
          <LocationOnIcon sx={{ fontSize: 18 }} />
        </a>
      </Box>

      <CardContent
        sx={{
          padding: "8px 4px",
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        <Typography
          variant="subtitle1"
          component="div"
          sx={{
            fontSize: "0.85rem",
            fontWeight: "bold",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {restaurant.name}
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.3 }}>
          {restaurant.cuisines.map((cuisine, index) => (
            <Chip
              key={index}
              label={cuisine.name}
              color="primary"
              size="small"
              sx={{
                borderRadius: "10px",
                fontSize: "0.6rem",
                padding: "0px 4px",
                height: "16px",
              }}
            />
          ))}
        </Box>

        <Box sx={{ display: "flex", gap: 0.5, mt: 0.5 }}>
          <Chip
            icon={<LocalShippingIcon sx={{ fontSize: 14 }} />}
            label={`£${restaurant.deliveryCost.toFixed(2)}`}
            size="small"
            sx={{
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontSize: "0.7rem",
              fontWeight: 500,
            }}
          />

          <Chip
            icon={<AccessTimeIcon sx={{ fontSize: 14 }} />}
            label={
              restaurant.deliveryEtaMinutes
                ? `${restaurant.deliveryEtaMinutes.rangeLower}-${restaurant.deliveryEtaMinutes.rangeUpper} mins`
                : "N/A"
            }
            size="small"
            sx={{
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontSize: "0.7rem",
              fontWeight: 500,
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.3,
            mt: 0.5,
          }}
        >
          <Chip
            label={`${restaurant.rating.starRating.toFixed(1)} / 5`}
            size="small"
            sx={{
              backgroundColor: "#FFECB3", 
              color: "#757575", 
              fontSize: "0.8rem",
              fontWeight: "bold",
              borderRadius: "16px", 
              padding: "0 6px",
              height: "20px",
            }}
          />
        </Box>
      </CardContent>
    </MuiCard>
  );
}