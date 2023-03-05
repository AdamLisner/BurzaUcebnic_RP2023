import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductComponent";
import FloatingButton from "../../components/FloatingButton";
import CategoryDisplay from "../../src/Categories";
import { BsSortNumericUpAlt } from "react-icons/bs";
import { BsSortNumericDownAlt } from "react-icons/bs";
import styles from "../../styles/allProducts.module.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import noProduct from "../../assets/Empty-bro.png"
//function redirect(props)

export const getServerSideProps = async () => {
  const domain = process.env.NEXTAUTH_URL;
  const res = await fetch(domain + "/api/products");
  const data = await res.json();

  return {
    props: { product: data },
  };
};
//   const product = await prisma.product.findFirst();
//   console.log(product);

//   return product;
// }

const allProducts = ({ product }) => {
  //console.log(getStaticProps);

  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategorySelection = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = product.filter((p) =>
    selectedCategory === "all" ? true : p.category === selectedCategory
  );
  const [sorted, setSorted] = useState(false);
  const handleSort = () => {
    setSorted(!sorted);
  };

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sorted) {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  if (!product) {
    return (
      <div>
        <h1>Jejda, něco se porouchalo</h1>
      </div>
    );
  }

  const { data: session } = useSession();

  return (
    <>
      <div className="flex align-middle m-6">
        <FormControl sx={{ m: 1, minWidth: 250 }}>
          <InputLabel id="demo-simple-select-helper-label">Předměty</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={selectedCategory}
            label="Předmět"
            onChange={handleCategorySelection}
          >
            <MenuItem value="all">Vše</MenuItem>
            {Object.entries(CategoryDisplay).map(([key, value]) => (
              <MenuItem value={key} key={key}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button onClick={handleSort}>
          {sorted ? (
            <BsSortNumericUpAlt size={30} />
          ) : (
            <BsSortNumericDownAlt size={30} />
          )}
        </Button>
      </div>
      {sortedProducts.length !== 0 ? (
        <div className="grid justify-evenly  product-container sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 xl:grid-cols-3 ">
        {sortedProducts.map((product) => (
          <div key={product.id} className=" flex justify-center">
            <ProductCard
              name={product.name}
              id={product.id}
              imageURL={product.imageURL}
              price={product.price}
              sellerName={product.seller.name}
              sellerProfileUrl={product.seller.id}
              sellerImage={product.seller.image}
              canGoForward={session}
            />
          </div>
        ))}
      </div>
      ):(
        <div className="flex flex-col justify-center items-center mb-10">
                      <Image src={noProduct} height={500} width={500} />
<h1>V této kategorii nemáme žádné knihy.</h1>
          </div>
      )}
      
      <FloatingButton />
    </>
  );
};

export default allProducts;
