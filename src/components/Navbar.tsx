// React Imports
import React, { useState } from "react";
// 3rd Party Imports
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Switch,
  Badge,
  Drawer,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  AccountCircle as AccountCircleIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Static Imports
import { RootState } from "@store/index";
import { logout } from "@store/redux/authSlice";
import { setSearchTerm } from "@store/redux/productsSlice";
import { toggleTheme } from "@store/redux/themeSlice";
import { usePopup } from "@store/context/LoginPopupContext";
import LoginSignupModal from "./LoginSignupModal";
import { APP_ICON, AVATAR_URL } from "@constants/index";

// Styled Components
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.light, 0.15),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar: React.FC = () => {
  //states
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  //Redux-states
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.token);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  //hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isModalOpen, openModal, closeModal } = usePopup();

  //Function to toggle theme between light and dark mode
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  //Function to handle search input to search products
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(setSearchTerm((e.target as HTMLInputElement).value));
      navigate("/");
    }
  };

  //Function to clear search term if input is empty
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      dispatch(setSearchTerm(e.target.value));
    }
  };

  // Function to open user menu
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to close user menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Function to handle user logout
  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate("/");
    openModal();
  };

  // Function to handle cart click
  const handleCartClick = () => {
    if (isLoggedIn) {
      navigate("/cart");
    } else {
      openModal();
    }
  };

  return (
    <>
      <AppBar position="static" color={isDarkMode ? "default" : "primary"}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
            aria-label="Home"
          >
            {APP_ICON}
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Products"
              onKeyDown={handleSearch}
              onChange={handleChange}
              aria-label="Search products"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <label htmlFor="theme-switch">
            <Switch
              id="theme-switch"
              checked={isDarkMode}
              onChange={handleToggleTheme}
              icon={<LightModeIcon />}
              checkedIcon={<DarkModeIcon />}
              inputProps={{ "aria-label": "theme-switch" }}
            />
          </label>
          <IconButton color="inherit" title="View cart" aria-label="View cart">
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon onClick={handleCartClick} />
            </Badge>
          </IconButton>

          {isLoggedIn ? (
            <>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleMenu}
                aria-label="User menu"
              >
                <Avatar alt="User Avatar" src={AVATAR_URL}></Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <IconButton color="inherit" onClick={openModal} aria-label="Login">
              <AccountCircleIcon />
              <Typography variant="body1" sx={{ ml: 1 }}>
                Login
              </Typography>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        aria-labelledby="drawer-title"
      >
        <Typography id="drawer-title" variant="h5" sx={{ p: 2 }}>
          {APP_ICON}
        </Typography>
      </Drawer>

      {/* Login/Signup Modal */}
      <LoginSignupModal open={isModalOpen} handleClose={closeModal} />
    </>
  );
};

export default Navbar;
