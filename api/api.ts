const BASE_URL = "https://dummyjson.com";

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
  stock: number;
}

export interface ProductDetail extends Product {
  description: string;
  brand?: string;
  images: string[];
}

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(
    `${BASE_URL}/products?limit=8&select=id,title,price,category,thumbnail,stock`
  );

  if (!res.ok) {
    alert("Esto esta raro")
  }

  const data: ProductsResponse = await res.json();
  return data.products;
}

export async function getProductById(id: string | number): Promise<ProductDetail> {
  const res = await fetch(`${BASE_URL}/products/${id}`);

  if (!res.ok) {
    throw new Error(`Producto no encontrado (${res.status})`);
  }

  return res.json();
}
