This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# ParcialWeb




## Decisiones de Arquitectura y Cambios del Parcial


Punto 1 (Evolución del Contexto): Explique cómo cambió el modelo de datos dentro de CartContext respecto al preparcial y cómo aseguró la inmutabilidad de la información al manipular las cantidades y productos en memoria.

Punto 1 (Evolución del Contexto): Con respecto al preparcial, ahora dentro del estado cart se guardan objetos que contienen la informacion de cada producto y ademas la cantidad de veces que se agrego al carrito. Para asegurar la inmutabilidad de la informacion, se utilizo el operador spread para crear un nuevo objeto con la informacion actualizada y no modificar el objeto original.

Punto 2 (Cálculo de Totales): Se utilizo un useEffect y un nuevo estado, entonces lo que hace el useEffect es ejecutar una funcion cada vez que el estado Cart es modificado. Esta funcion recorre el array de cart (Actualizado) y calcula el total de productos y el total de precio, luego actualiza los estados correspondientes.

Punto 3 (Arquitectura del Formulario): Se creo un estado por cada varible del formulario, y se creo un onchange para cada input que actualiza el estado correspondiente. Luego se creo un onsubmit que evita el comportamiento por defecto del formulario y vacia todo. Ademas se uso un useEffect para validar que todos los campos esten completos y habilitar el boton de submit solo cuando todos los campos esten completos.