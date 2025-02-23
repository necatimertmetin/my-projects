import {
  CardActions,
  Button,
  Typography,
  Box,
  createTheme,
  ThemeProvider,
  Stack,
} from "@mui/material";
import { Mac } from "./Mac";

// Define your custom colors
const colors = {
  blue: "#A9C7E1",
  dark: "#333333",
  green: "#B3D1C4",
  orange: "#FFBDA2",
  pink: "#ffcfc1",
  purple: "#AAA5D3",
  silver: "#C3C6C7",
  yellow: "#f9ce84",
};

// Helper function to generate secondary color based on primary
const getSecondaryColor = (primaryColor: keyof typeof colors) => {
  const colorShades: Record<keyof typeof colors, string> = {
    blue: "#6C9FB8", // Lighter shade of blue
    dark: "#444444", // Darker shade of dark
    green: "#A1D6A1", // Lighter green
    orange: "#FF7C4A", // Lighter orange
    pink: "#FFB3B3", // Lighter pink
    purple: "#B78EC6", // Lighter purple
    silver: "#A6B0B0", // Lighter silver
    yellow: "#F4D185", // Lighter yellow
  };

  return colorShades[primaryColor] || "#888888"; // Default fallback
};

// Define the light and dark themes with the new color palette
const lightTheme = (primaryColor: keyof typeof colors) =>
  createTheme({
    palette: {
      mode: "light",
      primary: {
        main: colors[primaryColor],
      },
      secondary: {
        main: getSecondaryColor(primaryColor),
      },
      background: {
        default: "#fff",
        paper: "#f4f4f4", // Lighter background for cards/papers
      },
      text: {
        primary: "#000",
        secondary: "#555", // Dark text for readability
      },
    },
  });

const darkTheme = (primaryColor: keyof typeof colors) =>
  createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: colors[primaryColor],
      },
      secondary: {
        main: getSecondaryColor(primaryColor),
      },
      background: {
        default: "#333",
        paper: "#212121", // Darker paper background for cards/papers
      },
      text: {
        primary: "#fff",
        secondary: "#ccc", // Lighter text for dark mode
      },
    },
  });

interface ComputerCardProps {
  color: keyof typeof colors;
  width: number;
  title: string;
  description: string;
  iframeSrc: string;
  buttonText1: string;
  buttonText2: string;
  buttonAction1: () => void;
  buttonAction2: () => void;
  isDarkMode: boolean;
  index?: number;
}

function ComputerCard({
  color,
  width,
  title,
  description,
  iframeSrc,
  buttonText1,
  buttonText2,
  buttonAction1,
  buttonAction2,
  isDarkMode,
  index,
}: ComputerCardProps) {
  const theme = isDarkMode ? darkTheme(color) : lightTheme(color);

  return (
    <ThemeProvider theme={theme}>
      <Stack
        direction={index && index % 2 === 1 ? "row-reverse" : "row"} // Swap positions based on index
        width={width * 2}
        gap={10}
      >
        <Mac color={color} width={width}>
          <iframe
            src={iframeSrc}
            style={{
              width: "1920px",
              height: "1080px",
              transform: `scale(${width / 1920})`,
              transformOrigin: "0 0",
              border: "none",
            }}
          />
        </Mac>

        <Stack
          flex={1}
          sx={{
            borderRadius: "32px",
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)", // Soft shadow for content area
          }}
        >
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              padding: "12px 20px",
              marginBottom: "12px",
              borderRadius: "16px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)", // Subtle shadow on title box
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, color: theme.palette.text.primary }}
            >
              {title}
            </Typography>
          </Box>

          <Typography
            variant="body1"
            paragraph
            sx={{
              fontSize: "16px",
              lineHeight: "1.6",
              color: theme.palette.text.secondary,
              padding: 2,
            }}
            flex={1}
          >
            {description}
          </Typography>

          <CardActions sx={{ paddingTop: "12px" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "24px", // Rounded buttons
                textTransform: "none", // No uppercase
                fontWeight: 600,
                padding: "8px 16px",
              }}
              onClick={buttonAction1}
            >
              {buttonText1}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                borderRadius: "24px", // Rounded buttons
                textTransform: "none", // No uppercase
                fontWeight: 600,
                padding: "8px 16px",
              }}
              onClick={buttonAction2}
            >
              {buttonText2}
            </Button>
          </CardActions>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}

export default ComputerCard;
