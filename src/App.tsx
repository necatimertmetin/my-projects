import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
  CssBaseline,
  ThemeProvider,
  createTheme,
  IconButton,
  Link,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

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

  const getRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor.padStart(6, "0");
  };

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
          <Typography variant="body1" color="textSecondary" align="center">
            No GitHub Pages projects found.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {repos.map((repo) => (
              <Grid size={4} key={repo.id}>
                <Card
                  sx={{
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={`https://fakeimg.pl/600x140/${getRandomColor()}/ffffff?text=${
                      repo?.name
                    }&font=bebas`}
                    alt={repo.name}
                  />
                  <CardContent>
                    <Typography component="div" variant="h6" gutterBottom>
                      <Link
                        href={`https://${repo.owner.login}.github.io/${repo.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                        sx={{ textDecoration: "inherit", color: "inherit" }}
                      >
                        {repo.name.toUpperCase()}
                      </Link>
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {repo.description || "No description provided."}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      href={`https://github.com/${repo.owner.login}/${repo.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Repository
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      href={`https://${repo.owner.login}.github.io/${repo.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;
