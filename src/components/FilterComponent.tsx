"use client";
//React Imports
import React, { useEffect, useState } from "react";
// 3rd Party Imports
import {
  Box,
  Typography,
  Slider,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
  SelectChangeEvent,
  CircularProgress,
  Card,
  InputLabel,
} from "@mui/material";
import { styled, ThemeProvider } from "@mui/system";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import {
  setPriceRange,
  setSelectedCategory,
  setSelectedRating,
} from "@store/redux/productsSlice";
import { RootState } from "@store/index";
import { getCategories } from "@services/productsApi";
import setParams from "@utils/setParams";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

// Styled Components
const StyledBox = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
  },
}));

export const SpinnerWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "10vh",
  backgroundColor: theme.palette.background.default,
}));

const ShoppingFilterPage: React.FC = () => {
  //states
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [localPriceRange, setLocalPriceRange] = useState<number[]>([0, 1000]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  //redux-states
  const selectedCategory = useSelector(
    (state: RootState) => state.products.selectedCategory
  );
  const selectedRating = useSelector(
    (state: RootState) => state.products.selectedRating
  );
  const theme = useSelector((state: RootState) => state.theme.theme);
  //hooks
  const isMobile = useMediaQuery("(max-width:1000px)");
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  //variables
  let debounceTimer: any;

  // Handle price change with debouncing
  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setLocalPriceRange(newValue as number[]);
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      setParams(
        searchParams,
        newValue as number[],
        replace,
        pathname,
        "priceRange"
      );
    }, 500);
  };

  // Handle brand checkbox changes
  const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const brand = event.target.name;
    setSelectedCategories((prev) => {
      const curr = prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand];
      setParams(searchParams, curr, replace, pathname, "categories");
      return curr;
    });
  };

  // Handle rating selection change
  const handleRatingChange = (event: SelectChangeEvent<number>) => {
    console.log(event.target.value);
    setParams(
      searchParams,
      Number(event.target.value),
      replace,
      pathname,
      "rating"
    );
    dispatch(setSelectedRating(Number(event.target.value)));
  };

  // Toggle drawer for mobile view
  const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent<Element> | React.MouseEvent<Element>) => {
      if (
        event.type === "keydown" &&
        (event as React.KeyboardEvent).key === "Tab"
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const fetchCategories = async () => {
    setIsFetching(true);
    try {
      const data = await getCategories();
      setCategories(data);
      setIsFetching(false);
    } catch {
      console.log("error");
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter content for the drawer
  const filterContent = (
    <Box
      sx={{
        width: isMobile ? "100%" : 250,
        padding: 2,
        backgroundColor: theme.palette.background.paper,
        overflow: "auto",
        maxHeight: "90vh",
        "&::-webkit-scrollbar": { width: "10px" },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#888",
          borderRadius: "10px",
        },
      }}
    >
      <StyledBox>
        <Typography variant="subtitle1" gutterBottom>
          Price Range
        </Typography>
        <Slider
          value={localPriceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          aria-label="Price range"
        />
        <Typography variant="body2">
          ${localPriceRange[0]} - ${localPriceRange[1]}
        </Typography>
      </StyledBox>

      <StyledBox sx={{ marginTop: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Categories
        </Typography>
        {isFetching ? (
          <SpinnerWrapper>
            <CircularProgress />
          </SpinnerWrapper>
        ) : (
          categories?.map((brand) => (
            <FormControlLabel
              key={brand}
              control={
                <Checkbox
                  checked={selectedCategories.includes(brand)}
                  onChange={handleBrandChange}
                  name={brand}
                  aria-label={`Select category ${brand}`}
                />
              }
              label={brand}
            />
          ))
        )}
      </StyledBox>

      <StyledBox sx={{ marginTop: 2 }}>
        {/* <Typography variant="subtitle1" gutterBottom>
          Rating
        </Typography> */}
        <InputLabel id="rating-select-label">Rating</InputLabel>
        <Select
          value={selectedRating}
          onChange={handleRatingChange}
          fullWidth
          labelId="rating-select-label"
          id="select"
        >
          <MenuItem value={0}>All Ratings</MenuItem>
          {[4, 3, 2, 1].map((rating) => (
            <MenuItem key={rating} value={rating}>
              {rating} <StarIcon /> & above
            </MenuItem>
          ))}
        </Select>
      </StyledBox>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Grid container spacing={2}>
          {/* Filter section for larger screens */}
          {!isMobile && (
            <Grid item xs={12} sm={3}>
              {filterContent}
            </Grid>
          )}
          <Grid item xs={12} sm={isMobile ? 12 : 9}>
            <Box sx={{ padding: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                {/* Filter button for mobile view */}
                {isMobile && (
                  <IconButton
                    onClick={toggleDrawer(true)}
                    aria-label="Open filter"
                  >
                    <FilterListIcon />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Drawer component for mobile filter options */}
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", padding: 1 }}>
            <IconButton onClick={toggleDrawer(false)} aria-label="Close filter">
              <CloseIcon />
            </IconButton>
          </Box>
          {filterContent}
        </Drawer>
      </Box>
    </ThemeProvider>
  );
};

export default ShoppingFilterPage;
