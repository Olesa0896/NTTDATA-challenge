import styled from "@emotion/styled";
import { Users } from "./components/users"

const TableWrapp = styled.div`
  display: flex;
  justify-content: center;
  padding: 32px
`;
function App() {

  return (
    <div>
      <h1>Holaa</h1>
      <TableWrapp>
        <Users />
      </TableWrapp>
    </div>
  );
}

export default App;
