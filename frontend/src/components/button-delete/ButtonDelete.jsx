import styled from "styled-components"

function ButtonContainer({ className, children, ...props }) {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  )
}

export const ButtonDelete = styled(ButtonContainer)`
  background-color: #301f1fe5;
  border: 1px solid #452a2a;
  border-radius: 6px;

  font-size: 14px;
  color: #ffa0a0;

  padding: 6px 10px;

  user-select: none;
  cursor: pointer;

  &:hover {
    background-color: #3d2626;
  }
`
