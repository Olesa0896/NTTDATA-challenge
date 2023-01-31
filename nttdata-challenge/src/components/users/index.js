import { useEffect, useState } from "react";
import { getAllUsers } from "./service/api-fetch"

export function Users() {
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

}