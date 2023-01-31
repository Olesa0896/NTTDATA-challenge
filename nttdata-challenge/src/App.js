import { useEffect } from "react";
import { getAllUsers } from "./service/api-fetch"

function App() {
  useEffect(() => {
    getAllUsers()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])
  return (
    <div>
      <h1>Holaa</h1>
    </div>
  );
}

export default App;
