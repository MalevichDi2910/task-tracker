import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Login } from "features/auth/ui/login/login";
import "./App.css";
import { TodolistsList } from "features/TodolistsList/TodolistsList";
import { ErrorSnackbar } from "common/components";
import { useActions } from "common/hooks";
import { selectIsLoggedIn } from "features/auth/model/auth.selectors";
import { selectAppStatus, selectIsInitialized } from "app/app.selectors";
import { authThunks } from "features/auth/model/auth.slice";

function App() {
  const status = useSelector(selectAppStatus);
  const isInitialized = useSelector(selectIsInitialized);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { initializeApp, logout } = useActions(authThunks);

  useEffect(() => {
    initializeApp();
  }, []);

  const logoutHandler = () => logout();

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="App">
        <ErrorSnackbar />
        <AppBar position="static" sx={{backgroundColor: '#7e57c2'}}>
          <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
            <IconButton edge="start" color="inherit" aria-label="menu"  sx={{mr: 2}}>
              <Menu />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>TASK TRACKER</Typography>
            {isLoggedIn && (
              <Button color="inherit" onClick={logoutHandler}>
                Log out
              </Button>
            )}
          </Toolbar>
          {status === "loading" && <LinearProgress color={'secondary'}/>}
        </AppBar>
        <Container fixed>
          <Routes>
            <Route path={"/"} element={<TodolistsList />} />
            <Route path={"/login"} element={<Login />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
