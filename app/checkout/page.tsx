'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts, Product } from "@/api/api";
import { useCart } from "@/context/Cart";


export default function Checkout() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pago, setPago] = useState("")
    const [teminos, setTerminos] = useState(false)



    const [listo, setListo] = useState(false)

    const { cart, valorApagar, vaciar, cantidadItem } = useCart();

    useEffect(()=>{
        console.log(teminos)

        if (cantidadItem > 0){
            if(name !== ""){
                if(email !== ""){
                    if(teminos){
                        if (pago !== ""){
                            setListo(true)
                        }
                    }
                }
            }
        }
        else{        setListo(false)


        }
    },[name, email, pago,teminos, cantidadItem])

    return (
        <main>
            <h1>
                Resumen Compra
            </h1>
            <div className="listaItemCarro">
                {cart.map(item => {

                    return (
                        <div className="itemCarro">
                            <h4>{item.id} - {item.title}</h4>
                            <h4>Cantidad: {item.cantidad}</h4>
                            <h4>Subtotal: {item.cantidad * item.price}</h4>
                        </div>
                    )
                })}

                <h3>Valor a pagar: {valorApagar}</h3>
            </div>
            <h1>
                Formulario Compra
            </h1>
            <form onSubmit={(e)=> {
                e.preventDefault()
                setName("")
                setEmail("")
                setListo(false)
                setPago("")
                vaciar()
                alert("Listoooo")
            }}>
                <input type="text" placeholder="Nombre" value={name} onChange={(e) => {
                    setName(e.target.value)
                }} />
                <input type="text" value={email} placeholder="Email" onChange={(e) => {
                    setEmail(e.target.value)
                }} />
                <select value={pago} onChange={(e) => {
                    setPago(e.target.value)
                }}>
                    <option>Visa</option>
                    <option>Mastercard</option>
                </select>
                <div>
                    Accepto terminos y condiciones
                    <input checked={teminos} onChange={()=> {
                        setTerminos(!teminos)
                    }} type="checkbox" />
                </div>

                <button type="submit"  disabled={!listo} onClick={() => {


                }}>Confirmar</button>
            </form>

        </main>
    )
}