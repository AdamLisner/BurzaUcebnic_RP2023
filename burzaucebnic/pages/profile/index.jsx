import React, { use } from "react";
import { getSession, useSession, signIn, signOut } from "next-auth/react";
import ProductCard from "../../components/ProductComponent";
import ConformForm from "../../components/PurchaseConformation";
import Image from "next/image";
import nothing from "../../assets/Empty-bro.png";

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      props: {
        products: [],
      },
    };
  }
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const url = `${baseUrl}/api/userProducts/${session.user.id}`;
  const products = await fetch(url).then((res) => res.json());

  // make API call to fetch products of the currently logged in user

  return {
    props: {
      products: products,
    },
  };
}

const Account = ({ products }) => {
  const { data: session, status } = useSession({ required: true });

  // console.log(products + " co to je");
  // console.log(query + " query");
  // console.log(user);

  // console.log(session);
  if (session && status === "authenticated") {
    return (
      <div className="flex flex-col">
        <div className="flex flex-col items-center ">
          <Image
            src={session.user.image}
            alt="avatar"
            className="rounded-full h-32 w-32 m-5"
            height={150}
            width={150}
          />
          <p className="text-2xl">
            <b>{session.user.name}</b>
          </p>
        </div>

        <h2 className=" ml-12 mb-6 text-4xl underline underline-offset-8">
          Vaše knihy:
        </h2>
        {products && products.length ? (
          <div className="grid justify-evenly  product-container sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 xl:grid-cols-3 ">
            {products.map((product) => (
              <div key={product.id} className=" flex justify-center">
                <ProductCard
                  name={product.name}
                  id={product.id}
                  imageURL={product.imageURL}
                  price={product.price}
                  sellerName={product.seller.name}
                  sellerProfileUrl={product.seller.id}
                  sellerImage={product.seller.image}
                  canGoForward={true}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <Image src={nothing} height={500} width={500} />
            <h1 className="text-2xl mb-12 text-center">
              Zdá se, že vaše knihovna je ještě prázdná
            </h1>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <p>Přihlaš se</p>
      </div>
    );
  }
};

export default Account;
