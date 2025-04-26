import React from "react";
import { Card, CardMedia, CardContent, Button } from "@mui/material";
import { ArrowDownward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const baseTheme = createTheme(); // Define base theme first

const theme = createTheme(baseTheme, {
  palette: {
    salmon: baseTheme.palette.augmentColor({
      color: {
        main: "#FF5733",
      },
      name: "salmon",
    }),
  },
});

export default function ImageCard({ image, title, navigateTo }) {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <div className="flex justify-center items-center min-h-screen">
        <Card className="max-w-sm shadow-lg rounded-lg overflow-hidden bg-dark">
          {/* Image Section */}
          <CardMedia
            component="img"
            className="w-full h-100 object-cover"
            image={image}
            alt="Image"
          />

          {/* Button Section */}
          <CardContent className="flex justify-center">
            <Button
              variant="contained"
              className="bg-[#FF9933] hover:bg-[#E68A00] text-white px-6 py-2 rounded flex items-center gap-2 transition-all duration-300 btn btn-secondary"
              onClick={() => navigate(navigateTo)}
            >
              {title}
              <ArrowDownward fontSize="small" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}
