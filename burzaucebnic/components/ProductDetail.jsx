import React from "react";
import { Link } from "next/link";
import Image from "next/image";

function ProductDetail(props) {
  return (
    <div className="overflow-hidden flex flex-col justify-center items-center w-full mt-6">
      <div className=" flex flex-col items-center">
        <h2 className="text-2xl font-bold p-4 w-full text-justify ">
          {props.name}
        </h2>

        <Image
          src={props.imageUrl}
          alt={props.name}
          className="object-contain max-h-fit border rounded-lg"
          height={600}
          width={600}
        />
      </div>
      <div className="flex flex-row justify-between p-4 align-middle  w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
        <span className="text-blue-500 font-medium text-lg">
          {props.price} Kč
        </span>
        {props.canBuy ? (
          <></>
        ) : (
          <button
            className="bg-blue-500 text-white rounded-lg p-4 text-xl"
            onClick={props.onBuy}
          >
            Zakoupit
          </button>
        )}

        <a href={`/profile/${props.sellerProfileUrl}`}>
          <Image
            className="rounded-full  mx-2 hover:scale-105"
            src={props.sellerImage}
            alt={props.sellerName}
            height={40}
            width={40}
          />
        </a>
      </div>
      <p className="p-4">{props.description}</p>
    </div>
  );
}

export default ProductDetail;
