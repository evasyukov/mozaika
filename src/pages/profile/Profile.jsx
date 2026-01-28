import styled from "styled-components"

import { ProfileBlock, SkillsBlock, ProjectBlock } from "./components"

function ProfileContainer({ className }) {
  return (
    <div className={className}>
      <ProfileBlock />
      <SkillsBlock />
      <ProjectBlock />
    </div>
  )
}

export const Profile = styled(ProfileContainer)`
  display: flex;
  flex-direction: column;
  gap: 30px;
`
