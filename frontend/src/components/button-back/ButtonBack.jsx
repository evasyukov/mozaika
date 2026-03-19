import styled from "styled-components"

function ButtonBackContainer({ className, onClick }) {
  return (
    <button type="button" onClick={onClick} className={className}>
      ← Назад
    </button>
  )
}

export const ButtonBack = styled(ButtonBackContainer)`
  background: none;
  border: none;
  color: #7c7cff;
  cursor: pointer;
`
