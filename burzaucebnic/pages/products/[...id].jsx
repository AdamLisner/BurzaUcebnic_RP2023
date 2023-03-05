import { useRouter } from "next/router";
import ProductDetail from "../../components/ProductDetail";
import { getSession } from "next-auth/react";
import { useState } from "react";
import ConformForm from "../../components/PurchaseConformation";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import notFound from "../../assets/DNF.png";
/**
 * 
 * @param {*} time 
 * @returns 
 */
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
/**
 * @async
 * @function
 * @param {*} context 
 * @returns 
 */
export async function getServerSideProps(context) {
  // const session = req.session;
  const id = context.params.id;

  try {
    const session = await getSession(context);
    const data = await fetch(
      process.env.NEXTAUTH_URL + `/api/products/${id}`
    ).then((res) => res.json());
    console.log(data);
    console.log(session.user.id, "sesna more");

    return {
      props: {
        product: data,
        userID: session.user.id,
        userEmail: session.user.email,
        userName: session.user.name,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        product: null,
        userID: null,
        userEmail: null,
        userName: null,
      },
    };
  }
}
/**
 * @async
 * @function
 * @param {*} productId 
 * @returns 
 */
const handleUpdateProductSoldStatus = async (productId) => {
  try {
    const res = await fetch("/api/products/updateProductSoldStatus", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: productId }),
    });

    const updatedProduct = await res.json();
    console.log(updatedProduct);
  } catch (err) {
    console.error(error);
    return error;
  }
};
/**
 * @async
 * @function
 * @param {*} productId 
 * @param {*} buyerId 
 * @returns 
 */
const handleCreatingNewPurchase = async (productId, buyerId) => {
  try {
    const res = await fetch("/api/purchase/createPurchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, buyerId }),
    });
    console.log(JSON.stringify({ productId, buyerId }));
    const purchase = await res.json();
    console.log(purchase);
  } catch (err) {
    console.error(error);
    return error;
  }
};
/**
 * 
 * @param {*} product 
 * @param {*} buyerEmail 
 * @param {*} buyerName 
 * @returns 
 */
const sendEmail = async (product, buyerEmail, buyerName) => {
  console.log("call");

  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const url = `${baseUrl}/api/email`;

    const response = await fetch(url, {
      body: JSON.stringify({
        email: product.seller.email,
        name: product.seller.name,
        productName: product.name,
        productImage: product.imageURL,
        buyerEmail: buyerEmail,
        buyerName: buyerName,
        price: product.price,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { data, errors } = await response.json();

    if (errors) {
      throw new Error(errors[0].message);
    }

    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
/**
 * 
 * @param {*} 
 * @returns 
 */
const product = ({ product, userID, userEmail, userName }) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handlePurchase = async (e) => {
    setLoading(true);
    await delay(2000);

    try {
    //  await handleUpdateProductSoldStatus(product.id);
    } catch (error) {
      return error.message;
    }
    try {
   ///   await handleCreatingNewPurchase(product.id, userID);
    } catch (error) {
      return error.message;
    }
    await sendEmail(product, userEmail, userName);

    setLoading(false);

    router.push("/middlepage/purchaseCreated");
  };
  const [showPopUp, setShowPopUp] = useState(false);

  

  const canBuy = () => {
    if (product === null || userID === "") {
      return false;
    } else if (product.seller.id === userID) {
      return true;
    } else {
      return false;
    }
  };

  

  if (product === null) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <Image src={notFound} height={400} />
        <p className="text-xl">Produkt nebyl nalezen</p>
      </div>
    );
  }

  return (
    <div className={`flex-col justify-center`}>
      {/* {showPopUp && ( // Render the overlay and popup only when showPopUp is true
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "revert", // Semi-transparent black background
            zIndex: 10, // Make sure the overlay appears on top of everything else
          }}
          onClick={() => setShowPopUp(false)} // Close the popup when the overlay is clicked
        ></div>
      )} */}

      {loading ? (
        <Stack
          alignItems="center"
          justifyContent="center"
          direction="column"
          zIndex={55}
          sx={{
            backgroundColor: "gray",
            opacity: 0.8,
            height: "100vh",
            width: "100vw",

            position: "fixed",
            top: 0,
            left: 0,
          }}
        >
          <CircularProgress
            zIndex={56}
            size={120}
            sx={{ opacity: 1 }}
            thickness={6}
          />
          <h1 className="mt-6 font-bold text-white">
            Vyčkejte na zpracování...
          </h1>
        </Stack>
      ) : (
        <></>
      )}
      <div key={product.id} className="flex justify-center">
        <ProductDetail
          isSeller={product.seller.id}
          name={product.name}
          imageUrl={product.imageURL}
          price={product.price}
          sellerName={product.seller.name}
          sellerProfileUrl={product.seller.id}
          sellerImage={product.seller.image}
          category={product.category}
          canBuy={canBuy()}
          onBuy={() => setShowPopUp(true)}
          handleClick={(e) => {
            e.preventDefault();
            router.push("/");
          }} // Pass the setShowPopUp function as a prop
        />
        {showPopUp ? (
          <ConformForm
            name={product.name}
            handlePurchase={handlePurchase}
            handleClose={() => setShowPopUp(false)}
            open={showPopUp}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default product;
