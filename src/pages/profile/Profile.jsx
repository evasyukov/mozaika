import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useMatch, useParams } from "react-router-dom"
import styled from "styled-components"

import { ProfileBlock, ProfileEdit, ProjectBlock } from "./components"
import { selectUserRole, selectUserId, selectUserInfo } from "../../selectors"
import { ROLE } from "../../constants"
import { profileIdThunk } from "../../slices/profile/profileThunk"
import { checkIsUserProfile } from "../../utils"

function ProfileContainer({ className }) {
  const { id } = useParams()
  const dispatch = useDispatch()

  const authUserId = useSelector(selectUserId)
  const roleId = useSelector(selectUserRole)

  const profile = useSelector(selectUserInfo)
  const status = useSelector((state) => state.profile.status)
  const error = useSelector((state) => state.profile.error)

  const isEditing = !!useMatch("/profile/:id/edit")

  const profileId = id ?? authUserId

  const isUserProfile = checkIsUserProfile(authUserId, id)

  useEffect(() => {
    if (profileId) dispatch(profileIdThunk(profileId))
  }, [profileId, dispatch])

  if (roleId === ROLE.GUEST) return <Navigate to="/authorization" />
  if (status === "loading") return <div>Загрузка профиля...</div>
  if (status === "failed") return <div>{error}</div>
  if (!profile) return null

  return (
    <div className={className}>
      {!isEditing && (
        <>
          <ProfileBlock
            profile={profile.profile}
            isUserProfile={isUserProfile}
            id={profileId}
          />
          <ProjectBlock
            projects={profile.projects}
            isUserProfile={isUserProfile}
          />
        </>
      )}

      {isEditing && (
        <ProfileEdit profileInfo={profile.profile} isEditing={isEditing} />
      )}
    </div>
  )
}

export const Profile = styled(ProfileContainer)`
  display: flex;
  flex-direction: column;
  gap: 30px;

  padding: 24px 0;
`
