
export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
    rating: number;
  }
  

  export interface PaginatedProductsResponse {
    success: boolean;
    data: Product[];
    pagination: {
      totalItems: number;
      totalPages: number;
      currentPage: number;
    };
  }
  
  export interface ProductSearchQuery {
    page: number;
    limit: number;
    keyword: string;
  }
  