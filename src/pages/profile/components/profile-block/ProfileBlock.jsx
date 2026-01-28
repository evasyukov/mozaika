import styled from "styled-components"

import { H2, ButtonSecondary } from "../../../../components"
import { Contacts } from "./components"

function ProfileBlockContainer({ className }) {
  return (
    <div className={className}>
      <div className="profile-main">
        <div className="profile-info">
          <H2 textAling="left">Егор Васюков</H2>

          <p className="profile-role">Frontend-разработчик</p>

          <p className="profile-description">
            Изучаю frontend, люблю архитектуру интерфейсов и аккуратный код. Ищу
            команду для учебных и pet-проектов. Открыт к обмену опытом и готов
            вкладываться в совместные инициативы. Хочу развиваться в направлении
            создания удобных и эстетичных пользовательских решений.
          </p>

          <div className="profile-contacts">
            <Contacts icon="📧" text="egor@example.com" />
            <Contacts icon="💬" text="telegram: @egor" />
            <Contacts icon="🐙" text="github.com/egor" />
          </div>
        </div>
        <div className="avatar"></div>
      </div>

      <div className="profile-settings">
        <ButtonSecondary>Редактировать профиль</ButtonSecondary>
        <ButtonSecondary>Сделать профиль публичным</ButtonSecondary>
      </div>
    </div>
  )
}

export const ProfileBlock = styled(ProfileBlockContainer)`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 1000px;

  padding: 24px;

  background: #151821;
  border: 1px solid #1f2330;
  border-radius: 12px;

  & .profile-main {
    display: flex;
    gap: 24px;

    width: 100%;
  }

  & .avatar {
    width: 140px;
    height: 140px;

    border-radius: 50%;
    background-color: #000;
  }

  & .profile-info {
    flex: 1;
  }

  & .profile-role {
    font-size: 14px;
    color: #9a9a9a;
  }

  & .profile-description {
    width: 80%;
    margin-top: 8px;

    font-size: 14px;
    color: #dcdcdc;
  }

  & .profile-contacts {
    display: flex;
    gap: 12px;

    margin-top: 12px;
  }

  & .profile-settings {
    display: flex;
    gap: 12px;
  }
`
