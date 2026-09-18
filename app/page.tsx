'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts, Product } from "@/api/api";
import { useCart } from "@/context/Cart";


export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem, removeItem, superRemoveItem } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem(product);
  };

  const handleRemoveFromCart = (product: any) => {
    removeItem(product);
  };

  const handleSuperRemoveFromCart = (product: any) => {
    superRemoveItem(product);
  };


  if (loading) {
    return (
      <main>
        <h2>Cargando...</h2>
      </main>
    )
  }

  return (
    <main>
      <h1>
        Catalogo de productos
      </h1>
      <div className="ListaProductos">
        {products.map((product) => (
          <div
            key={product.id}
            className="iteam"
          >
            <Link href={`/products/${product.id}`}>
              <img
                src={product.thumbnail}
                alt={product.title}
              />
            </Link>
            <div className="textos">
              <Link href={`/products/${product.id}`}>
                <h2 className="titleItem">
                  {product.title}
                </h2>
              </Link>
              <p>
                {product.category}
              </p>
              <div >
                <span className="">
                  ${product.price}
                </span>
                <span className="">
                  Stock: {product.stock}
                </span>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                disabled={product.stock <= 0}
                className="addItem"
              >
                {product.stock > 0 ? "Agregar al carrito" : "Agotado"}
              </button>

              <button
                onClick={() => handleSuperRemoveFromCart(product)}
                className="addItem"
              >
                Eliminar por completo este item
              </button>

              <button
                onClick={() => handleRemoveFromCart(product)}
                className="addItem"
              >
                - 1
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
