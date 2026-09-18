'use client'

import { useCart } from "@/context/Cart"
import cartImg from "../assets/cart.png"
import Link from "next/link"

const NavBar = () => {
    const { cart } = useCart()
    return (
        <div className="navBar">
                <Link href="/" className="nameShop">
                    <h2>
                        ShopHub
                    </h2>
                </Link>
            <div className="cartChimba">
                <img className="cartChimbaImg" src={cartImg.src} alt="Carrito de compras" />
                <span className="infoCart">{cart.length}</span>
            </div>
        </div>
    )
}
export default NavBar