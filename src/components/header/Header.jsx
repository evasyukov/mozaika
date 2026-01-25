import { Link } from "react-router-dom"
import styled from "styled-components"

function HeaderContainer({ className }) {
  const roleId = false

  return (
    <header className={className}>
      <div className="header-content">
        
        <div className="logo">
          <span className="logo-text">
            <Link to="/">Мозаика</Link>
          </span>
          <p className="logo-slogan">
            собирай проекты по кусочкам вместе с командной
          </p>
        </div>

        <span className="header-description">
          Платформа для совместной разработки учебных проектов
        </span>

        <div className="auth-button">
          {roleId ? (
            <Link to="/profile">Профиль</Link>
          ) : (
            <Link to="/authorization">Авторизация</Link>
          )}
        </div>
      </div>
    </header>
  )
}

export const Header = styled(HeaderContainer)`
  background-color: #151821;
  border-bottom: 1px solid #1f2330;

  & .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
  }

  & .logo-text {
    font-size: 32px;
    font-weight: 600;
  }

  & .logo-slogan {
    font-size: 14px;
    font-weight: 400;
    color: #8080cc;

    font-style: italic;
  }

  & .header-description {
    font-size: 14px;
    color: #a0a0a0;
  }

  .auth-button {
    width: 130px;

    background: #1f2330;
    border: 1px solid #2a2f45;
    border-radius: 6px;

    font: inherit;
    text-align: center;

    cursor: pointer;
    user-select: none;
  }

  .auth-button:hover {
    background: #262b3d;
  }

  .auth-button a {
    display: block;
    width: 100%;
    height: 100%;

    padding: 8px 16px;
  }
`
