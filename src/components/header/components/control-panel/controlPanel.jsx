import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { selectUserRole } from "../../../../selectors"
import { logout } from "../../../../slices/auth/authSlice"
import { ROLE } from "../../../../constants"

function ControlPanelContainer({ className }) {
  const roleId = useSelector(selectUserRole)
  const dispatch = useDispatch()

  return (
    <div className={className}>
      <div className="auth-button">
        {roleId !== ROLE.GUEST ? (
          <Link to="/profile">Профиль</Link>
        ) : (
          <Link to="/authorization">Авторизация</Link>
        )}
      </div>

      {roleId !== ROLE.GUEST ? (
        <div className="logout-button">
          <Link to="/" onClick={() => dispatch(logout())}>
            Выход
          </Link>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export const ControlPanel = styled(ControlPanelContainer)`
  display: flex;
  align-items: center;

  .auth-button {
    width: 130px;

    background-color: #1f2330;
    border: 1px solid #2a2f45;
    border-radius: 6px;

    font: inherit;
    text-align: center;

    cursor: pointer;
    user-select: none;
  }

  .auth-button:hover {
    background-color: #262b3d;
  }

  .auth-button a {
    display: block;
    width: 100%;
    height: 100%;

    padding: 8px 16px;
  }
`
