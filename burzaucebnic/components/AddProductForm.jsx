import React, { use, useState } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";

import { storage } from "../src/firebase";
import { ref } from "firebase/storage";
import { MdCloudUpload } from "react-icons/md";
import { BsCloudCheckFill } from "react-icons/bs";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { uuidv4 } from "@firebase/util";
import CategoryDisplay from "../src/Categories";
import { InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

const defBlue = "rgb(37 99 235)";
let uploaded = false;

/**
 * A custom React hook that returns an object with the currently selected file and a callback to update it.
 *
 * @returns {{
 *   file: (File | null),
 *   handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
 * }}
 */

function useFileHook() {
  const [file, setFile] = useState(null);

  /**
   * Callback function to update the `file` state with the selected file from an `input[type=file]` element.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The `ChangeEvent` object from the input element.
   */
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return { file, handleFileChange };
}

/**
 * AddProductForm is a React functional component that displays a form for adding a new product to the database.
 * 
 
 * @returns JSX element that renders a form with fields for product name, price, category, and an image upload field.
*/
function AddProductForm() {
  // retrieve user session and status of the session from the Next.js `useSession()` hook
  const { data: session, status } = useSession({ required: true });

  // Initialize state variables for selected category, image file, product name, product price, image URL, and image upload status.  const [selectedCategory, setSelectedCategory] = useState("CJ");
  const { file, handleFileChange } = useFileHook();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("AJ");

  // Get Next.js router object
  const router = useRouter();
  /**
   *
   * @param {*} event
   */
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  /**
   * Uploads an image file to Firebase Storage and retrieves its download URL.
   * @async
   * @function
   * @returns {Promise<number>} Returns a Promise that resolves to 1 when the image has been successfully uploaded and its download URL retrieved, or 0 if no file was selected.
   */
  const uploadImage = async () => {
    if (file === null) {
      return 0;
    }
    setUploading(true); // change the state of the upload button

    let fileNameFB = uuidv4() + (file.type === "image/jpeg" ? ".jpg" : ".png"); // generate a unique file name for the image

    const imageRef = ref(storage, `/images/${fileNameFB}`); // initialize storage reference
    // upload the image to Firebase Storage
    await uploadBytes(imageRef, file)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
            uploaded = true;
            setUploading(false);
            return 1;
          })
          .catch((error) => {
            console.error(error.message, "error getting image url");
            return 2;
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  /**
   *
   * Sends product data to the database using a POST request.
   *
   * @async
   * @function
   * @param {Event} e - The event triggered by the form submission
   * @returns {Promise<Object|Error>} - A promise that resolves with the product data if the request is successful, or rejects with an error if it fails
   * @throws {Error} - Throws an error if the response from the server includes errors.
   */
  async function sendDataToDatabase(e) {
    e.preventDefault();

    // save the state of the form to variables
    let productName = name;
    let productPrice = price;
    let productImageUrl = url;

    // retrieve id of the user from the `useSession()` hook
    let userID = session.user.id;

    try {
      const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
      const url = `${baseUrl}/api/createProduct`;

      const response = await fetch(url, {
        // create the body of the request
        body: JSON.stringify({
          name: productName,
          price: parseInt(productPrice),
          userId: userID,
          imageURL: productImageUrl,
          category: selectedCategory,
        }),
        // declare http method
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Parse the response data and handle any errors
      const { data, errors } = await response.json();

      if (errors) {
        throw new Error(errors[0].message);
      }

      // Navigate to the product created confirmation page on success
      router.push("/middlepage/productCreated");
      uploaded = false;

      return data;
    } catch (error) {
      console.error(error);
      // Navigate to the products page on error
      router.push("/products");
      uploaded = false;
      return error;
    }
  }
  return (
    <form className="bg-white p-6 ">
      <h2 className="text-lg font-medium mb-4">
        Přidejte novou knihu do nabídky
      </h2>
      <div className="flex flex-col gap-12">
        <div className="mb-4">
          <InputLabel id="demo-simple-select-helper-label">Název</InputLabel>
          <TextField
            sx={{ width: 1 }}
            required
            id="outlined"
            type="text"
            onChange={handleNameChange}
            maxLength="120"
          />
        </div>

        <div className="mb-4">
          <InputLabel id="demo-simple-select-helper-label">Cena</InputLabel>
          <TextField
            sx={{ width: 1 }}
            required
            id="outlined"
            type="number"
            InputProps={{
              inputProps: { min: 0 },
            }}
            onChange={handlePriceChange}
            min={0}
          />
        </div>

        <FormControl sx={{ width: 1 }}>
          <InputLabel id="demo-simple-select-helper-label">Předměty</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={selectedCategory}
            label="Předmět"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categoryArray.map((category) => (
              <MenuItem value={category} key={category}>
                {CategoryDisplay[category]}{" "}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className="mb-4">
          <InputLabel id="demo-simple-select-helper-label">
            Fotografie
          </InputLabel>

          <div className="flex">
            <input
              className="border border-gray-400 p-2 rounded-lg w-full"
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              placeholder="Enter image file"
              accept="image/png, image/jpeg"
              required
            />
            <button
              className="mx-8 text-5xl  hover:text-blue-800"
              onClick={uploadImage}
              type="button"
              disabled={uploaded}
            >
              {uploaded ? (
                <BsCloudCheckFill color={defBlue} />
              ) : (
                <MdCloudUpload
                  color={uploaded ? defBlue : defBlue}
                  className="hover:"
                />
              )}
            </button>
          </div>
          {uploading && (
            <p className="text-gray-600 text-sm">Nahrávám fotku...</p>
          )}
          {uploaded && (
            <p className="text-gray-600 text-sm">
              Fotografie byla úspěšně nahrána.
            </p>
          )}
        </div>
        <div className="w-full flex justify-center">
          <button
            className={` text-white p-2 rounded-lg  transition-colors ${
              uploaded ? "bg-blue-600 hover:bg-blue-800" : "bg-gray-500"
            }`}
            disabled={!uploaded}
            onClick={(e) => {
              sendDataToDatabase(e);
            }}
          >
            Add Product
          </button>
        </div>
      </div>
    </form>
  );
}

/**
 * Object containing category names as properties with their corresponding values as strings.
 * @enum {string}
 */
const Category = {
  AJ: "AJ",
  NJ: "NJ",
  CJ: "CJ",
  FJ: "FJ",
  RJ: "RJ",
  L: "L",
  M: "M",
  PRG: "PRG",
  ZSV: "ZSV",
  D: "D",
  FY: "FY",
  BI: "BI",
  ZE: "ZE",
  HU: "HU",
  VU: "VU",
  CH: "CH",
  OSTATNI: "OSTATNI",
};

const categoryArray = Object.values(Category);

export default AddProductForm;
