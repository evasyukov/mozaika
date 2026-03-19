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
  font-weight: 600;

  border: none;
  border-radius: 8px;

  padding: 10px 18px;
  user-select: none;
  cursor: pointer;
  
  &:hover {
    background-color: #9191fb;
  }
`
