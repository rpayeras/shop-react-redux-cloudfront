import React, { useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Cart from "components/MainLayout/components/Cart";
import { Link, useHistory } from "react-router-dom";
import { checkLogin, removeAuthData } from "services/authService";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "store/userSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    homeLink: {
      color: "white",
      textDecoration: "none",
    },
  })
);

export default function Header() {
  const { logged } = useSelector(selectUser);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const auth = true;
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const isLogged = checkLogin();

    if (isLogged) {
      dispatch(login());
      history.push("/");
    }
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    removeAuthData();
    setAnchorEl(null);

    dispatch(logout());

    history.push("/");
  };

  const handleLogin = () => {
    setAnchorEl(null);
    const urlRedirect = process.env.REACT_APP_LOGIN_REDIRECT;

    console.log("Redirecting to login...");

    if (urlRedirect) {
      window.location.href = urlRedirect;
    }
  };

  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Link className={classes.homeLink} to="/">
            My Store!
          </Link>
        </Typography>

        {auth && (
          <div>
            {!logged && (
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleLogin}
                color="inherit"
              >
                Login
              </IconButton>
            )}
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                component={Link}
                to="/admin/orders"
                onClick={handleClose}
              >
                Manage orders
              </MenuItem>
              <MenuItem
                component={Link}
                to="/admin/products"
                onClick={handleClose}
              >
                Manage products
              </MenuItem>
              <MenuItem component={Link} to="/" onClick={handleLogout}>
                Logout
              </MenuItem>
            </Menu>
          </div>
        )}
        <Cart />
      </Toolbar>
    </AppBar>
  );
}
