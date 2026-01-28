import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useParams } from "react-router-dom"
import styled from "styled-components"

import { ProfileBlock, SkillsBlock, ProjectBlock } from "./components"
import { selectUserRole, selectUserId, selectUserInfo } from "../../selectors"
import { ROLE } from "../../constants"
import { profileIdThunk } from "../../slices/profile/profileThunk"

function ProfileContainer({ className }) {
  const { id } = useParams()
  const dispatch = useDispatch()

  const authUserId = useSelector(selectUserId)
  const roleId = useSelector(selectUserRole)

  const profile = useSelector(selectUserInfo)
  const status = useSelector((state) => state.profile.status)
  const error = useSelector((state) => state.profile.error)

  const profileId = id ?? authUserId

  useEffect(() => {
    if (profileId) dispatch(profileIdThunk(profileId))
  }, [profileId, dispatch])

  if (roleId === ROLE.GUEST) return <Navigate to="/authorization" />
  if (status === "loading") return <div>Загрузка профиля...</div>
  if (status === "failed") return <div>{error}</div>
  if (!profile) return null

  return (
    <div className={className}>
      <ProfileBlock info={profile.profile} />
      <SkillsBlock skills={profile.profile.skills} />
      <ProjectBlock projects={profile.projects} />
    </div>
  )
}

export const Profile = styled(ProfileContainer)`
  display: flex;
  flex-direction: column;
  gap: 30px;
`
