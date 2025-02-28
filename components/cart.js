"use client";

import { XIcon } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Button} from "./ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { CardHeader } from "./ui/card";
import { useContext } from "react";
import Image from "next/image";
import { CartContext } from "@/context/cart";



export function Cart({toggle}) {
const { cartItems, addToCart, removeFromCart, clearCartItems, getCartTotal } = useContext(CartContext); //destructuring cartItems from CartContext

    return (
    <div className="fixed overflow-y-auto w-9/12 bg-neutral-900 px-4 py-10 inset-0 md:w-[400px]">
        {/* Button to close the cart */}
        <h2 className="text-2xl font-bold text-neutral-100 flex justify-between items-center flex-wrap gap-4">
            Your cart {""}
            <Button variant="secondary" onClick={toggle}>
                <XIcon />
            </Button>
        </h2>

        {/* Product in cart component */}
        <div>        
            {cartItems.map((product, index) => (
                <Card key={index} className="mb-2 mt-2 bg-neutral-800 border-neutral-800 text-white">
                    <CardHeader>
                        
                        <Image src={product.image.thumbnail} alt={product.name} width={60} height={60} className="rounded-lg"/>
                                         
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <CardTitle>{product.name}</CardTitle>
                        <ul className="flex items-center gap-2 mt-2">
                            <li>
                                <Button variant="secondary" size="sm" onClick={()=> removeFromCart(product)}>-</Button>
                            </li>
                            <li>{product.quantity}</li>
                            <li>
                                <Button variant="secondary" size="sm" onClick={()=> addToCart(product)}>+</Button>
                            </li>
                            
                        </ul>
                        <CardDescription className="text-neutral-300">
                            ${product.price.toFixed(2)}
                        </CardDescription>
                        
                    </CardContent>
                </Card>
            ))}
        </div>

        {/* Button to remove all items from cart component */}
            {
            cartItems.length > 0
            ? <div className="mt-4 flex justify-between items-center p-1">
                <CardTitle className="text-white">Total: ${getCartTotal().toFixed(2)}</CardTitle>
            <Button variant="destructive" onClick={()=> clearCartItems()}>
                            <Trash2 /> Clear Cart
            </Button>  
            </div>
            : <div className="space-y-2 mt-4">
                <p className="text-neutral-300">Your cart is empty...</p>
            </div>
        }
        </div>
    );
}
