// import { createContext, useContext, useState, useEffect } from "react";
// import { getAllUsers } from "../service/api-fetch"

// const AuthContext = createContext();

// function AuthProvider({ children }) {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     getAllUsers()
//       .then((data) => {
//         console.log('DATA del API', data);
//         console.log('DATA del RESULTS', data.results);
//         setUsers(data.results)
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [])

//   return (
//     <AuthContext.Provider
//       value={{
//         users,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// function useAuth() {
//   return useContext(AuthContext);
// }

// export { AuthProvider, useAuth };
