// src/components/Cart/CartItem.tsx
import React from "react";
import { Add, Remove, Delete } from "@mui/icons-material";
import { CartItem } from "../types/cartTypes";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  useTheme,
  styled,
} from "@mui/material";

interface CartItemProps {
  item: CartItem;
  handleUpdateQuantity: (quantity: number, originalQuantity: number) => void;
  onRemove: (productId: string) => void;
}

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  width: 150,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: 200,
  },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  flexGrow: 1,
}));

const QuantityControl = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginTop: theme.spacing(1),
}));

const CartProduct: React.FC<CartItemProps> = ({
  item,
  handleUpdateQuantity,
  onRemove,
}) => {

  return (
    <StyledCard>
      <StyledCardMedia
        image={item.product.imageUrl}
        aria-label={`Image of ${item.product.name}`}
      />
      <StyledCardContent>
        <Typography variant="h6" component="div">
          {item.product?.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Price: ${item.product?.price.toFixed(2)}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Total: ${(item.product?.price * item.quantity).toFixed(2)}
        </Typography>
        <QuantityControl>
          <IconButton
            onClick={() =>
              handleUpdateQuantity(item.quantity - 1, item.quantity)
            }
            aria-label="Decrease quantity"
          >
            <Remove />
          </IconButton>
          <Typography sx={{ margin: "0 10px" }}>{item.quantity}</Typography>
          <IconButton
            onClick={() =>
              handleUpdateQuantity(item.quantity + 1, item.quantity)
            }
            aria-label="Increase quantity"
          >
            <Add />
          </IconButton>
        </QuantityControl>
        <Button
          variant="outlined"
          color="error"
          startIcon={<Delete />}
          onClick={() => onRemove(item.product?._id)}
          sx={{ marginTop: 2 }}
          aria-label={`Remove ${item.product?.name} from cart`}
        >
          Remove
        </Button>
      </StyledCardContent>
    </StyledCard>
  );
};

export default CartProduct;
