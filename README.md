# E-commerce App

## Overview

This document provides a comprehensive overview of the functionalities present in the e-commerce application. The app allows users to browse products, manage their cart, and customize their experience with features like dark mode and product search.

## Features

### 1. Product Listing

- **Home Screen**: Displays a list of products.
- **Pagination**: Implements pagination for product listings, fetching data from the backend.
- **Caching**: Data is cached using Next.js.

### 2. Product Detail View

- **Product Details**: Users can view detailed information about a selected product.
- **Add to Cart**: Option to add the product to the cart directly from the product detail view.

### 3. Cart Management

- **Logged-Out Users**: Users can add items to the cart while logged out.
- **Data Synchronization**: Upon logging in, cart data stored in local storage is synced with the database, and the local state is updated accordingly.

### 4. View Cart

- **Cart Items**: Users can view items in their cart.
- **Update Quantity**: Option to modify the quantity of each product in the cart.
- **Remove Items**: Users can remove products from their cart.
- **Order Summary**: Provides a summary total items and amount in cart.

### 5. Checkout Process

- **Checkout**: Users can proceed to checkout.
- **State Update**: Updates the local state and database with the products being purchased.

### 6. User Experience Enhancements

- **Light/Dark Mode Toggle**: Users can switch between light and dark mode for better accessibility and comfort.
- **Product Search**: Allows users to search for products quickly using a search bar.

## Implementation Details

### State Management

- Utilizes [Redux Toolkit](https://redux-toolkit.js.org/) for state management.

### User Authentication

- Implements authentication flow allowing users to log in and sync their cart.
- Uses local storage to temporarily hold cart items for logged-out users.

### Responsiveness

- The app is designed to be responsive, providing a seamless experience across various devices.

## Future Enhancements

- Integration of payment gateways for streamlined checkout.
- User profile management with order history.
- Enhanced product filtering and sorting options.


## Steps to run in local

1) Add a .env file in root of project with content as:
`NEXT_PUBLIC_API_URL="http://localhost:5000"`

2) Run `npm run dev` to start the next.js app in development mode.

3) Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the Next.js app in production mode after building it.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production.
Next.js optimizes the build for the best performance, utilizing Static Site Generation (SSG) and Server-Side Rendering (SSR) where applicable.
