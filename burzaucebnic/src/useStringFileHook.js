import { useState } from "react";

function useStringFileHook() {
  const [string1, setString1] = useState("");
  const [string2, setString2] = useState("");
  const [file, setFile] = useState(null);

  return {
    string1,
    setString1,
    string2,
    setString2,
    file,
    setFile,
  };
}

export default useStringFileHook;
