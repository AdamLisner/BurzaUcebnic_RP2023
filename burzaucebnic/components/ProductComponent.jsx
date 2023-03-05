import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/ProductCard.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
/**
 * Component for displaying the product in the `/products` endpoint
 * @param {*} props
 * @returns {ReactComponentElement}
 */
function ProductCard(props) {
  return (
    <div className="flex flex-col align-middle w-96 max-96 p-5 border m-3 justify-center">
      <Image
        className="w-80 h-80 object-contain mb-5 rounded-3xl"
        src={props.imageURL}
        alt={props.name}
        width={360}
        height={360}
      />
      <div className="">
        {props.canGoForward ? (
          <Link href="/products/[id]" as={`/products/${props.id}`}>
            <h1 className={styles.hover_underline_animation}>{props.name}</h1>
          </Link>
        ) : (
          <button
            onClick={() => {
              signIn("google", {
                callbackUrl: process.env.NEXTAUTH_URL,
              });
            }}
          >
            <h1 className={styles.hover_underline_animation}>{props.name}</h1>
          </button>
        )}
      </div>
      <div className="flex flex-row justify-between p-3">
        <p className="font-bold ">{props.price} Kč</p>
        {/* <h4>{props.sellerName}</h4> */}
        <a href={`/profile/${props.sellerProfileUrl}`}>
          <Image
            className="rounded-full  mx-2  transition-all duration-500 hover:scale-125"
            src={props.sellerImage}
            alt={props.sellerName}
            height={32}
            width={32}
          />
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
