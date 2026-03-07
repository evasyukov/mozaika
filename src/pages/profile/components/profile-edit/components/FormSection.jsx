import styled from "styled-components"

function FormSectionContainer({ children, className, label }) {
  return (
    <div className={className}>
      {label && (
        <div className="group-header">
          <label>{label}</label>
        </div>
      )}
      {children}
    </div>
  )
}

export const FormSection = styled(FormSectionContainer)`
  display: flex;
  flex-direction: column;
  gap: 10px;

  position: relative;
  padding: 18px;

  background-color: #11141b;
  border: 1px solid #1e2233;
  border-radius: 12px;

  transition: 0.2s ease;

  &:hover {
    border-color: #2a2f45;
  }

  &::before {
    content: "";

    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;

    width: 4px;

    background-color: #7c7cff;
    border-radius: 12px 0 0 12px;
    opacity: 0.5;
  }

  .group-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  label {
    font-size: 14px;
    color: #b0b0b0;
  }

  .add {
    background-color: #1f2330;
    color: #e6e6e6;
    font-size: 12px;

    border: 1px solid #2a2f45;
    border-radius: 6px;

    padding: 8px 16px;
    cursor: pointer;

    &:hover {
      background-color: #353b53be;
    }
  }
`
