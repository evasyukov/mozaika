import styled from "styled-components"

function ButtonContainer({ className, formError, status, children }) {
  return (
    <button
      className={className}
      disabled={!!formError || status === "loading"}
    >
      {children}
    </button>
  )
}

export const AuthButton = styled(ButtonContainer)`
  background-color: #7c7cff;
  border: none;
  border-radius: 6px;

  color: #0f1117;
  font-size: 16px;
  font-weight: 600;

  padding: 10px;
  cursor: pointer;

  & :hover {
    background-color: #8b8bff;
  }

  & :disabled {
    color: #0f111782;
    background-color: #8b8bff7c;
    cursor: default;
  }
`
