import { patchProfile } from "../api"

export async function updateProfile({ id, formData }) {
  try {
    const response = await patchProfile({
      id,
      profile: {
        name: formData.name,
        last_name: formData.lastName,
        direction: formData.direction,
        description: formData.description,
        skills: formData.skills,
        contacts: formData.contacts,
        profile_visibility: formData.isPublic,
      },
    })

    return { error: null, response }
  } catch (error) {
    return { error: error.message, response: null }
  }
}
