import styled from "styled-components"

function ButtonContainer({ className, children }) {
  return <button className={className}>{children}</button>
}

export const ButtonSecondary = styled(ButtonContainer)`
  background-color: #1f2330;
  color: #e6e6e6;

  border: 1px solid #2a2f45;
  border-radius: 6px;

  padding: 8px 14px;
  cursor: pointer;

  user-select: none;

  &:hover {
    background: #333951;
  }
`
