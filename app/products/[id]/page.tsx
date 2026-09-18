'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getProductById, ProductDetail as ProductDetailType } from "@/api/api";
import { useCart } from "@/context/Cart";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { addItem, removeItem, superRemoveItem } = useCart();

  useEffect(() => {


    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = (product: ProductDetailType) => {
    addItem(product);
  };
  const handleRemoveFromCart = (product: ProductDetailType) => {
    removeItem(product);
  };

  const handleSuperRemoveFromCart = (product: ProductDetailType) => {
    superRemoveItem(product);
  };

  if (loading) {
    return (
      <main>
        <h2>Cargando...</h2>
      </main>
    );
  }

  if (notFound) {
    return (
      <main>
        <h2>Producto no encontrado</h2>
        <Link href="/" className="volver">
          Volver al catálogo
        </Link>
      </main>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <main>
      <Link href="/" className="volver">
        Volver al catálogo
      </Link>
      <div className="detalleProducto">
        <div className="imgCont">
          <img
            className="imagenDetalle"
            src={product.images?.[0] ?? product.thumbnail}
            alt={product.title}
          />
        </div>
        <div className="textos2">
          <h1 className="titleItem">{product.title}</h1>
          <p>
            {product.category}
            {product.brand ? ` · ${product.brand}` : ""}
          </p>
          <p>{product.description}</p>
          <div>
            <span>${product.price}</span>

            <span>Stock: {product.stock}</span>
          </div>
          <button
            onClick={() => handleAddToCart(product)}
            disabled={product.stock <= 0}
            className="addItem"
          >
            {product.stock > 0 ? "Agregar al carrito" : "Agotado"}
          </button>

          <button
            onClick={() => handleRemoveFromCart(product)}
            className="addItem"
          >
            - 1
          </button>

          <button
            onClick={() => handleSuperRemoveFromCart(product)}
            className="addItem"
          >
            Eliminar por completo este item
          </button>
        </div>
      </div>
    </main>
  );
}
