import styled from "styled-components"

function ContactsContainer({ className, icon, text }) {
  return (
    <div className={className}>
      <div className="icon">{icon}</div>
      <div className="text">{text}</div>
    </div>
  )
}

export const Contacts = styled(ContactsContainer)`
  display: flex;
  gap: 3px;

  margin-right: 20px;

  font-size: 13px;
  color: #b0b0b0;
`
