import styled from "styled-components"

// eslint-disable-next-line no-unused-vars
function AvatarContainer({ className, size = "60" }) {
  return <div className={className}></div>
}

export const Avatar = styled(AvatarContainer)`
  width: ${({ size }) => size || "0"}px;
  height: ${({ size }) => size || "0"}px;

  border-radius: 50%;
  background-color: #2a2f45;
`
