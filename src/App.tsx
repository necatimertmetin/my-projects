import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CssBaseline,
  ThemeProvider,
  createTheme,
  IconButton,
  Stack,
  LinearProgress,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ComputerCard from "./components/Card";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  owner: {
    login: string;
  };
  has_pages: boolean;
}

const App: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    fetch("https://api.github.com/users/necatimertmetin/repos?per_page=500")
      .then((response) => response.json())
      .then((data: Repo[]) => {
        const pagesRepos = data.filter((repo) => repo.has_pages);
        setRepos(pagesRepos);
      })
      .catch((error) => console.error("Error fetching repos:", error));
  }, []);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#1976d2",
      },
    },
    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
    },
  });

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const colors: (
    | "dark"
    | "blue"
    | "green"
    | "orange"
    | "pink"
    | "purple"
    | "silver"
    | "yellow"
  )[] = [
    "blue", // "#A9C7E1"
    "dark", // "#333333"
    "green", // "#B3D1C4"
    "orange", // "#FFBDA2"
    "pink", // "#ffcfc1"
    "purple", // "#AAA5D3"
    "silver", // "#C3C6C7"
    "yellow", // "#f9ce84"
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "20px 0",
          }}
        >
          <Typography variant="h4" component="h1">
            My GitHub Pages Projects
          </Typography>
          <IconButton onClick={handleToggleDarkMode} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </header>

        {repos.length === 0 ? (
          <LinearProgress />
        ) : (
          <Stack spacing={20}>
            {repos.map((repo, index) => (
              <>
                {console.log(repo)}
                <ComputerCard
                  color={colors[index % colors.length]} // Cycle through the colors
                  width={600}
                  title={
                    repo.name.charAt(0).toUpperCase() +
                    repo.name.slice(1).toLowerCase()
                  }
                  description={repo.description || "No description provided."}
                  iframeSrc={`https://${repo.owner.login}.github.io/${repo.name}`}
                  buttonText1="View Repository"
                  buttonText2="View Project"
                  buttonAction1={() => {
                    window.open(
                      `https://github.com/${repo.owner.login}/${repo.name}`,
                      "_blank",
                      "noopener noreferrer"
                    );
                  }}
                  buttonAction2={() => {
                    window.open(
                      `https://${repo.owner.login}.github.io/${repo.name}`,
                      "_blank",
                      "noopener noreferrer"
                    );
                  }}
                  isDarkMode={darkMode} // Toggle this for dark mode
                  index={index}
                />
              </>
            ))}
          </Stack>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;
