import styled from "styled-components"

function ButtonContainer({ className, children, ...props }) {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  )
}

export const ButtonPrimary = styled(ButtonContainer)`
  background-color: #7c7cff;
  color: #0f1115;

  border: none;
  border-radius: 6px;

  padding: 8px 14px;
  font-weight: 500;

  user-select: none;
  cursor: pointer;

  &:hover {
    background-color: #9191fb;
  }
`
