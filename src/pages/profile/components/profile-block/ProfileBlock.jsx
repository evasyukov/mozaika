import styled from "styled-components"

import { H2, ButtonSecondary } from "../../../../components"
import { Contacts } from "./components"

function ProfileBlockContainer({ className, info }) {
  return (
    <div className={className}>
      <div className="profile-main">
        <div className="profile-info">
          <H2 textAling="left">
            {info.name} {info.lastName}
          </H2>

          <p className="profile-role">{info.about}</p>

          <p className="profile-description">{info.description}</p>

          <div className="profile-contacts">
            {info.contacts.map((contact) => {
              return <Contacts key={contact} icon="📧" text={contact} />
            })}
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
