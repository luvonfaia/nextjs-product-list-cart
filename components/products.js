"use client";

import products from "@/data.json";
import { Button } from "./ui/button";
import Image from "next/image";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "./ui/card";
import { ShoppingCart } from "lucide-react";
import { useContext, useState } from "react";
import { CartContext } from "@/context/cart";
import { Cart,  } from "./cart";





export default function Products() {
  const [showCart, setShowCart] = useState(false); //state to show cart otherwise its hidden
  const { cartItems, addToCart} = useContext(CartContext); //destructuring addToCart from CartContext
  const toggle = () => setShowCart(!showCart); //function to toggle the cart (show the cart)

  
  return (
    <>
    <section>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button onClick={toggle}>Cart ({cartItems && cartItems.length})</Button>
      </div>
    </section>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {(
          products.map((product, index) => (
            <Card key={index}>
              <CardHeader>
                <Image
                  src={product.image.desktop}
                  alt={product.name}
                  width={1920}
                  height={1080}
                  className="w-full rounded-lg" 
                />
                <Button onClick={() => addToCart(product)}>
                  <ShoppingCart /> Add to cart
                </Button>
              </CardHeader>

              <CardContent className="space-y-2">
                <CardDescription>{product.category}</CardDescription>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>${product.price.toFixed(2)}</CardDescription>
              </CardContent>
            </Card>
          ))
        )}
      </div>

        { showCart && <Cart toggle={toggle}/>}

      </>

  );
}