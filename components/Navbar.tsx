'use client'

import { useCart } from "@/context/Cart"
import cartImg from "../assets/cart.png"
import Link from "next/link"

const NavBar = () => {
    const { cantidadItem, vaciar } = useCart()
    return (
        <div className="navBar">
            <Link href="/" className="nameShop">
                <h2>
                    ShopHub
                </h2>
            </Link>
                      <button onClick={vaciar}>
                    Vaciar Carrito
                </button>
            <div>
      
                <Link href="/checkout" >
                  <div className="cartChimba">
                      <img className="cartChimbaImg" src={cartImg.src} alt="Carrito de compras" />
                      <span className="infoCart">{cantidadItem}</span>
                  </div>
                </Link>
            </div>
        </div>
    )
}
export default NavBar