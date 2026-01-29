export function checkIsUserProfile(authUserId, userProfileId = authUserId) {
  const isUserProfile = authUserId === userProfileId
  return isUserProfile
}
