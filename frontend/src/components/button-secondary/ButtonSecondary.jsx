import styled from "styled-components"

function ButtonContainer({ className, children, ...props }) {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  )
}

export const ButtonSecondary = styled(ButtonContainer)`
  background-color: #1f2330;
  border: 1px solid #2a2f45;
  border-radius: 6px;

  font-size: 14px;
  color: #a0a0ff;

  padding: 6px 10px;

  user-select: none;
  cursor: pointer;

  &:hover {
    background-color: #262b3d;
  }
`
