import { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"

import { selectUserRole, selectUserInfo } from "../../../../selectors"
import { logout } from "../../../../slices/auth/authSlice"
import { ROLE } from "../../../../constants"

function ControlPanelContainer({ className }) {
  const roleId = useSelector(selectUserRole)
  const profile = useSelector(selectUserInfo)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
    setIsOpen(false)
  }

  if (!profile) return null

  return (
    <div className={className} ref={menuRef}>
      {roleId !== ROLE.GUEST ? (
        <div className="menu-wrapper">
          <button
            type="button"
            className="menu-button"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {profile.profile.name + " " + profile.profile.lastName} ▾
          </button>

          {isOpen && (
            <div className="dropdown">
              <Link
                to="/profile"
                className="dropdown-item"
                onClick={() => setIsOpen(false)}
              >
                Профиль
              </Link>
              <Link
                to="/project"
                className="dropdown-item"
                onClick={() => setIsOpen(false)}
              >
                Создать проект
              </Link>
              <button
                className="dropdown-item logout-item"
                onClick={handleLogout}
              >
                Выход
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="auth-button">
          <Link to="/authorization">Авторизация</Link>
        </div>
      )}
    </div>
  )
}

export const ControlPanel = styled(ControlPanelContainer)`
  display: flex;
  align-items: center;
  position: relative;

  .menu-wrapper {
    position: relative;
  }

  .menu-button {
    background-color: #1f2330;
    color: #e6e6e6;
    font: inherit;

    border: 1px solid #2a2f45;
    border-radius: 6px;

    padding: 8px 16px;

    cursor: pointer;
    user-select: none;
    transition: 0.2s;

    &:hover {
      background-color: #262b3d;
    }
  }

  .dropdown {
    display: flex;
    flex-direction: column;

    min-width: 180px;
    z-index: 10;

    position: absolute;
    top: 100%;
    right: 0;

    background-color: #1f2330;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    border: 1px solid #2a2f45;
    border-radius: 8px;

    margin-top: 8px;
  }

  .dropdown-item {
    padding: 10px 16px;
    text-align: left;
    background: none;

    border: none;
    border-radius: 8px;
    color: #e6e6e6;

    cursor: pointer;
    text-decoration: none;
    transition: 0.2s;

    &:hover {
      background-color: #353b53;
    }
  }

  .logout-item {
    font: inherit;

    &:hover {
      background-color: #ff6b6b40;
    }
  }

  .auth-button a {
    display: block;
    width: 100%;
    height: 100%;

    padding: 8px 16px;

    background-color: #1f2330;
    color: #e6e6e6;

    border-radius: 6px;
    border: 1px solid #2a2f45;
    text-decoration: none;

    &:hover {
      background-color: #262b3d;
    }
  }
`
