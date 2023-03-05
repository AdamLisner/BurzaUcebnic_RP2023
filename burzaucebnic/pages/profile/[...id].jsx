import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import ProductCard from "../../components/ProductComponent";
import Image from "next/image";

export async function getServerSideProps({ query }) {
  const { id } = query;

  try {
    const data = await fetch(
      process.env.NEXTAUTH_URL + `/api/users/${id}`
    ).then((res) => res.json());

    const products = await fetch(
      process.env.NEXTAUTH_URL + `/api/userProducts/${id}`
    ).then((res) => res.json());

    return {
      props: {
        profile: data,
        query: id[0],
        products: products,
      },
    };
  } catch (error) {
    return {
      props: {
        profile: null,
        products: null,
      },
    };
  }
}

const Profile = ({ profile, query, products }) => {
  const { data, status } = useSession({ required: true });
  const router = useRouter();

  if (status === "authenticated") {
    //console.log(data + " tady to je");
    console.log(query);
    console.log(data.user);
    if (data.user.email === profile.email) {
      router.push("/profile");
    }
  }

  if (profile === null) {
    return (
      <div>
        <h1>Jejda, tento profil asi neexistuje...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center my-10">
        <Image
          src={profile.image}
          alt=""
          height={150}
          width={150}
          className="rounded-full h-32 w-32 m-5"
        />
        <h1 className="text-2xl font-medium mb-1">{profile.name}</h1>
        <a href={`mailto:${profile.email}`} className="font-thin text-gray-600">
          {profile.email}
        </a>
      </div>
      <div className="grid justify-evenly  product-container sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 xl:grid-cols-3 ">
        {products.map((product) => (
          <div key={product.id} className="flex justify-center">
            <ProductCard
              name={product.name}
              id={product.id}
              imageURL={product.imageURL}
              price={product.price}
              sellerName={product.seller.name}
              sellerProfileUrl={product.seller.id}
              sellerImage={product.seller.image}
              canGoForward={data}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Profile;
