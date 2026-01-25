import styled from "styled-components"

function H2Container({ children, className }) {
  return <h2 className={className}>{children}</h2>
}

export const H2 = styled(H2Container)`
  margin: 0;
  text-align: center;
`
