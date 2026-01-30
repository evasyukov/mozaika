import styled from "styled-components"

function ButtonContainer({ className, children }) {
  return <button className={className}>{children}</button>
}

export const ButtonPrimary = styled(ButtonContainer)`
  background-color: #7c7cff;
  color: #0f1115;

  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;

  user-select: none;

  &:hover {
    background-color: #9191fb;
  }
`
