import styled from "@emotion/styled";
import { colors, typography } from "./styles"
import { Users } from "./components/users"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 64px;
  background: ${colors.background}
`;

const TableWrapp = styled.div`
  display: flex;
  justify-content: center;
  padding: 32px
`;

const Title = styled.div`
  ${typography.head.xxl};
  color: ${colors.gray.dark}
`;

function App() {

  return (
    <Wrapper>
      <Title>JARVIS SAC</Title>
      <TableWrapp>
        <Users />
      </TableWrapp>
    </Wrapper>
  );
}

export default App;
