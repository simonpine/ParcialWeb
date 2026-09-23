'use client';

import { useState } from "react";
import { useCart } from "@/context/Cart";


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Checkout() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        pago: "",
        terminos: false,
    })
    const [touched, setTouched] = useState({
        name: false,
        email: false,
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [orderConfirmed, setOrderConfirmed] = useState(false)

    const { cart, valorApagar, vaciar, cantidadItem } = useCart();

    const handleChange = (e: any) => {
        const { name, value, type } = e.target
        const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value
        setForm((prev) => ({ ...prev, [name]: newValue }))
    }

    const handleBlur = (e: any) => {
        const { name } = e.target
        setTouched((prev) => ({ ...prev, [name]: true }))
    }

    const nameError = form.name.trim().length < 5 ? "El nombre debe tener al menos 5 caracteres" : ""
    const emailError = !EMAIL_REGEX.test(form.email) ? "El correo no tiene un formato válido" : ""

    const listo = cantidadItem > 0 && !nameError && !emailError && form.pago !== "" && form.terminos

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (isSubmitting) return

        setOrderConfirmed(false)
        setIsSubmitting(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500))
            vaciar()
            setForm({ name: "", email: "", pago: "", terminos: false })
            setTouched({ name: false, email: false })
            setOrderConfirmed(true)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main>
            <h1>
                Resumen Compra
            </h1>
            <div className="listaItemCarro">
                {cart.map(item => {

                    return (
                        <div key={item.id} className="itemCarro">
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
            {orderConfirmed && (
                <p className="confirmacionPedido">Pedido confirmado con éxito!</p>
            )}
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Nombre" value={form.name} onChange={handleChange} onBlur={handleBlur} />
                {touched.name && nameError && <p className="errorCampo">{nameError}</p>}

                <input type="text" name="email" value={form.email} placeholder="Email" onChange={handleChange} onBlur={handleBlur} />
                {touched.email && emailError && <p className="errorCampo">{emailError}</p>}

                <select name="pago" value={form.pago} onChange={handleChange}>
                    <option value="">Seleccione</option>
                    <option value="Visa">Visa</option>
                    <option value="Mastercard">Mastercard</option>
                </select>
                <div>
                    Accepto terminos y condiciones
                    <input checked={form.terminos} name="terminos" onChange={handleChange} type="checkbox" />
                </div>

                <button type="submit" disabled={!listo || isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Confirmar"}
                </button>
            </form>

        </main>
    )
}