import styled from "styled-components"

function ToggleProfileContainer({ className, isPublic, onChange }) {
  return (
    <div className={className}>
      <label className="toggle">
        <input type="checkbox" checked={isPublic} onChange={onChange} />
        <span className="slider"></span>
      </label>
      <span>Публичный профиль</span>
    </div>
  )
}

export const ToggleProfile = styled(ToggleProfileContainer)`
  display: flex;
  align-items: center;
  gap: 12px;

  .toggle {
    position: relative;
    width: 40px;
    height: 22px;
  }

  .toggle input {
    display: none;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    background-color: #2a2f45;
    border-radius: 22px;
    width: 100%;
    height: 100%;
    transition: 0.2s;
  }

  .slider::before {
    content: "";
    position: absolute;
    height: 16px;
    width: 16px;
    left: 3px;
    top: 3px;
    background-color: #fff;
    border-radius: 50%;
    transition: 0.2s;
  }

  .toggle input:checked + .slider {
    background-color: #7c7cff;
  }

  .toggle input:checked + .slider::before {
    transform: translateX(18px);
  }
`
