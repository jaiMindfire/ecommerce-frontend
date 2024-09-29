import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Switch,
  Badge,
  Drawer,
  InputBase,
  Box,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Search as SerachIcon,
  ShoppingCart as ShoppingCartIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../features/auth/authSlice";
import { setSearchTerm } from "../features/products/productsSlice";
import { useTheme } from "../context/ThemeContext";
import { styled, alpha } from "@mui/material/styles";
import {
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";
import LoginSignupModal from "./LoginSignupModal";
import { usePopup } from "../context/LoginPopupContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
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
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { toggleTheme, isDarkMode } = useTheme();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isModalOpen, openModal, closeModal } = usePopup();


  const handleSearch = (e: any) => {
    dispatch(setSearchTerm(e.target.value));
    navigate("/")
  };

  const handleChange = (e: any) => {
    if (e.target.value === "") {
      dispatch(setSearchTerm(e.target.value));
    }
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate('/')
    openModal();
  };

  const handleCartClick = ()=>{
    if(isLoggedIn){
      navigate("/cart")
    }
    else{
      openModal();
    }
  }

  return (
    <>
      <AppBar position="static" color={isDarkMode ? "default" : "primary"}>
        <Toolbar>
          {/* <IconButton
            edge="start"
            color="inherit"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton> */}

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            E-Commerce
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SerachIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(e);
                }
              }}
              onChange={handleChange}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Switch
            checked={isDarkMode}
            onChange={toggleTheme}
            icon={<LightModeIcon />}
            checkedIcon={<DarkModeIcon />}
          />

          <IconButton color="inherit">
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon onClick={handleCartClick} />
            </Badge>
          </IconButton>

          {isLoggedIn ? (
            <>
              <IconButton edge="end" color="inherit" onClick={handleMenu}>
                <Avatar
                  alt="User Avatar"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                >
                  JB
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <IconButton color="inherit" onClick={openModal}>
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
      >
        <Typography variant="h5" sx={{ p: 2 }}>
          E-Commerce
        </Typography>
      </Drawer>
      <LoginSignupModal open={isModalOpen} handleClose={closeModal} />
    </>
  );
};

export default Navbar;
