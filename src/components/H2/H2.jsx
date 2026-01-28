import styled from "styled-components"

// eslint-disable-next-line no-unused-vars
function H2Container({ children, className, textAling }) {
  return <h2 className={className}>{children}</h2>
}

export const H2 = styled(H2Container)`
  margin: 0;
  text-align: ${({ textAling }) => textAling || "center"};
};
`
