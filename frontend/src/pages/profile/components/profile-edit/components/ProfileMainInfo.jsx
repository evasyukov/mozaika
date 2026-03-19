import styled from "styled-components"

import { FormSection } from "./FormSection"

function ProfileMainInfoContainer({ className, profile, onChange }) {
  return (
    <div className={className}>
      <FormSection>
        <input
          value={profile.name}
          onChange={(e) => onChange("name", e.target.value)}
        />
      </FormSection>

      <FormSection>
        <select
          value={profile.direction}
          onChange={(e) => onChange("direction", e.target.value)}
        >
          <option>Frontend</option>
          <option>Backend</option>
          <option>Fullstack</option>
        </select>
      </FormSection>

      <FormSection>
        <textarea
          rows="4"
          value={profile.about}
          onChange={(e) => onChange("about", e.target.value)}
        />
      </FormSection>
    </div>
  )
}

export const ProfileMainInfo = styled(ProfileMainInfoContainer)`
  .edit-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
    
  input,
  select,
  textarea {
    background-color: #1f2330;
    border: 1px solid #2a2f45;
    border-radius: 6px;
    padding: 10px 12px;
    color: #e6e6e6;
  }

  textarea {
    resize: vertical;
  }
`
