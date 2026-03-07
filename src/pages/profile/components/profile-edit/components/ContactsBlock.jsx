import styled from "styled-components"

function ContactsBlockContainer({ contacts = [  ], onRemove, className }) {
  return (
    <div className={className}>
      {contacts.map((contact) => (
        <div key={contact} className="contact-edit">
          <input value={contact} readOnly />
          <button type="button" onClick={() => onRemove(contact)}>
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

export const ContactsBlock = styled(ContactsBlockContainer)`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .contact-edit {
    display: flex;
    gap: 10px;
  }

  .contact-edit input {
    flex: 1;
  }

  .contact-edit button {
    background: none;
    border: none;
    color: #a7a7a7;
    cursor: pointer;

    &:hover {
      color: #fff;
    }
  }
`
