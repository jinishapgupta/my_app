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
  deliveryEtaMinutes: { rangeLower: number; rangeUpper: number } | null;
}

export default function Card({ restaurant }: { restaurant: Restaurant }) {
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${restaurant.address.firstLine}, ${restaurant.address.city}, ${restaurant.address.postalCode}`
  )}`;

  return (
    <MuiCard
      sx={{
        maxWidth: 200, // Reduced width for compactness
        borderRadius: 2,
        boxShadow: 2, // Slightly lighter shadow for a cleaner look
        position: "relative",
        overflow: "hidden",
        padding: "8px", // Added padding for overall spacing
      }}
    >
      <CardMedia
        component="img"
        height="100" // Reduced height for compactness
        image={restaurant.logoUrl}
        alt={restaurant.name}
        sx={{
          objectFit: "contain",
          padding: "4px", // Reduced padding
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
          <LocationOnIcon sx={{ fontSize: 18 }} /> {/* Adjusted icon size */}
        </a>
      </Box>

      <CardContent
        sx={{
          padding: "8px 4px", // Reduced padding for compactness
          display: "flex",
          flexDirection: "column",
          gap: 0.5, // Reduced gap between elements
        }}
      >
        <Typography
          variant="subtitle1"
          component="div"
          sx={{
            fontSize: "0.85rem", // Slightly smaller font size
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
                borderRadius: "10px", // Slightly smaller border radius
                fontSize: "0.6rem", // Smaller font size
                padding: "0px 4px", // Compact padding
                height: "16px", // Reduced height
              }}
            />
          ))}
        </Box>

        <Box sx={{ display: "flex", gap: 0.5, mt: 0.5 }}>
          <Chip
            icon={<LocalShippingIcon sx={{ fontSize: 14 }} />} // Smaller icon
            label={`£${restaurant.deliveryCost.toFixed(2)}`}
            size="small"
            sx={{
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontSize: "0.7rem", // Smaller font size
              fontWeight: 500,
            }}
          />

          <Chip
            icon={<AccessTimeIcon sx={{ fontSize: 14 }} />} // Smaller icon
            label={
              restaurant.deliveryEtaMinutes
                ? `${restaurant.deliveryEtaMinutes.rangeLower}-${restaurant.deliveryEtaMinutes.rangeUpper} mins`
                : "N/A" // Fallback label if deliveryEtaMinutes is null or undefined
            }
            size="small"
            sx={{
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontSize: "0.7rem", // Smaller font size
              fontWeight: 500,
            }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3, mt: 0.5 }}>
          {[...Array(5)].map((_, index) => (
            <StarIcon
              key={index}
              sx={{
                fontSize: 14, // Smaller star size
                color: index < restaurant.rating.starRating ? "#FFD700" : "#E0E0E0",
              }}
            />
          ))}
        </Box>
      </CardContent>
    </MuiCard>
  );
}