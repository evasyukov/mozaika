import styled from "styled-components"
import { Link } from "react-router-dom"

import {
  H2,
  ButtonSecondary,
  SkillsBlock,
  Avatar,
} from "../../../../components"
import { Contacts } from "./components"

function ProfileBlockContainer({ className, profile, isUserProfile, id }) {
  return (
    <div className={className}>
      <div className="profile-main">
        <div className="profile-info">
          <H2 textAling="left">
            {profile.name} {profile.lastName}
          </H2>

          <p className="profile-role">{profile.direction}</p>
          <p className="profile-description">{profile.description}</p>

          <div className="profile-contacts">
            {profile.contacts.map((contact) => {
              return <Contacts key={contact} icon="📧" text={contact} />
            })}
          </div>

          <SkillsBlock skills={profile.skills} />
        </div>
        <div className="profile-settings">
          <Avatar size="140" />
          {isUserProfile && (
            <Link to={`/profile/${id}/edit`}>
              <ButtonSecondary>Редактировать профиль</ButtonSecondary>
            </Link>
          )}
        </div>
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

  background-color: #151821;
  border: 1px solid #1f2330;
  border-radius: 12px;

  .profile-main {
    display: flex;

    width: 100%;
  }

  .profile-role {
    font-size: 14px;
    color: #9a9a9a;
  }

  .profile-description {
    width: 80%;
    margin-top: 8px;

    font-size: 14px;
    color: #dcdcdc;
  }

  .profile-contacts {
    display: flex;
    gap: 12px;

    margin: 24px 0;
  }

  .profile-settings {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
`
