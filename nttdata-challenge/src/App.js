import { useEffect, useState } from "react";
import { getAllUsers } from "./service/api-fetch"

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((data) => {
        console.log('DATA del API', data);
        console.log('DATA del RESULTS', data.results);
        setUsers(data.results)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])
  console.log('usuario 1', users[0].gender)
  return (
    <div>
      <h1>Holaa</h1>
      <p>{users ? users[0]?.gender : "Loading..."}</p>
      {/* <p>{users[0].name}</p> */}
    </div>
  );
}

export default App;
