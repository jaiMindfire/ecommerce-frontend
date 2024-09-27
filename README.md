# E-commerce App

## Overview

This document provides a comprehensive overview of the functionalities present in the e-commerce application. The app allows users to browse products, manage their cart, and customize their experience with features like dark mode and product search.

## Features

### 1. Product Listing

- **Home Screen**: Displays a list of products.
- **Pagination**: Implements pagination for product listings, fetching data from the backend.
- **Caching**: Utilizes RTK Query for caching product data to improve performance and reduce server load.

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
- RTK Query is integrated for efficient data fetching and caching.

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
`REACT_APP_API_URL="http://localhost:5000"`

2) Run `npm start` to start the app in developmentmode.

3) Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
