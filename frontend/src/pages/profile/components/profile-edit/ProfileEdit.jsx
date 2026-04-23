import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import styled from "styled-components"

import {
  H2,
  SkillsBlock,
  ButtonPrimary,
  ButtonSecondary,
  ButtonBack,
  AuthFormError,
} from "../../../../components"
import { FormSection, ContactsBlock } from "./components"
import { updateProfileThunk } from "../../../../slices/profile/profileThunk"

const editingSchema = yup.object().shape({
  name: yup
    .string()
    .required("Напишите имя")
    .min(3, "Имя должно содержать минимум 3 символа")
    .max(20, "Имя должно содержать не более 20 символов")
    .matches(
      /^[a-zA-Zа-яА-ЯёЁ]+(?:[ -][a-zA-Zа-яА-ЯёЁ]+)*$/,
      "Имя может содержать только буквы (русские и латинские)",
    ),
  direction: yup.string().required("Выберите направление"),
})

function ProfileEditContainer({ className, profileInfo }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      lastName: "",
      direction: "",
      description: "",
      skills: [],
      contacts: [],
    },
    resolver: yupResolver(editingSchema),
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [skillsState, setSkillsState] = useState([])
  const [newSkill, setNewSkill] = useState("")

  const [contactsState, setContactsState] = useState([])
  const [newContact, setNewContact] = useState("")

  useEffect(() => {
    if (!profileInfo) return

    reset({
      name: profileInfo.name,
      lastName: profileInfo.lastName,
      direction: profileInfo.direction,
      description: profileInfo.description || "",
    })

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSkillsState(profileInfo.skills || [])
    setContactsState(profileInfo.contacts || [])
  }, [profileInfo, reset])

  const handleRemoveSkill = (skillToRemove) => {
    setSkillsState((prev) => prev.filter((skill) => skill !== skillToRemove))
  }

  const onSubmit = (formData) => {
    const profileData = {
      ...formData,
      skills: skillsState,
      contacts: contactsState,
    }

    dispatch(updateProfileThunk(profileData))
      .unwrap()
      .then(() => navigate(-1))
      .catch((err) => console.error(err))
  }

  const errorMessage = Object.values(errors)[0]?.message

  return (
    <div className={className}>
      <div className="edit-header">
        <ButtonBack onClick={() => navigate(-1)} />
        <H2>Редактирование профиля</H2>
      </div>
      {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}

      <form className="edit-form" onSubmit={handleSubmit(onSubmit)}>
        <FormSection label="Имя">
          <input placeholder="Имя" {...register("name")} />
          <input placeholder="Фамилия" {...register("lastName")} />
        </FormSection>

        <FormSection label="Направление">
          <select {...register("direction")}>
            <option>Frontend разработчик</option>
            <option>Backend разработчик</option>
            <option>Fullstack разработчик</option>
          </select>
        </FormSection>

        <FormSection label="О себе">
          <textarea rows="4" {...register("description")} />
        </FormSection>

        <FormSection label="Навыки">
          <div className="skills-add-wrapper">
            <SkillsBlock skills={skillsState} onRemove={handleRemoveSkill} />
            <div className="add-item">
              <input
                className="add-input"
                placeholder="Новый навык"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <button
                type="button"
                className="add-button"
                onClick={() => {
                  if (newSkill && !skillsState.includes(newSkill)) {
                    setSkillsState([...skillsState, newSkill])
                    setNewSkill("")
                  }
                }}
              >
                +
              </button>
            </div>
          </div>
        </FormSection>

        <FormSection label="Контакты">
          <ContactsBlock
            contacts={contactsState}
            onRemove={(contact) =>
              setContactsState((prev) => prev.filter((c) => c !== contact))
            }
          />
          <div className="add-item">
            <input
              className="add-input"
              placeholder="Новый контакт"
              value={newContact}
              onChange={(e) => setNewContact(e.target.value)}
            />
            <button
              type="button"
              className="add-button"
              onClick={() => {
                if (newContact && !contactsState.includes(newContact)) {
                  setContactsState([...contactsState, newContact])
                  setNewContact("")
                }
              }}
            >
              +
            </button>
          </div>
        </FormSection>

        <div className="form-actions">
          <ButtonSecondary onClick={() => navigate(-1)}>Отмена</ButtonSecondary>
          <ButtonPrimary>Сохранить</ButtonPrimary>
        </div>
      </form>
    </div>
  )
}

export const ProfileEdit = styled(ProfileEditContainer)`
  width: 760px;

  background: linear-gradient(145deg, #151821, #13161d);
  border: 1px solid #222638;
  border-radius: 16px;

  padding: 36px;
  margin: 24px 0;

  .edit-header {
    margin-bottom: 24px;
  }

  .edit-form {
    display: flex;
    flex-direction: column;
    gap: 24px;

    margin-top: 24px;
  }

  input,
  select,
  textarea {
    padding: 10px 12px;

    background-color: #1f2330;
    color: #e6e6e6;

    border: 1px solid #2a2f45;
    border-radius: 6px;
  }

  textarea {
    font-size: 16px;
    resize: vertical;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }

  .add-item {
    display: flex;
    gap: 8px;
    margin-top: 16px;
  }

  .add-input {
    padding: 10px 12px;
    border-radius: 6px;
  }

  .add-button {
    padding: 0 16px;
    border-radius: 6px;
    background-color: #2a2f45;
    color: #e6e6e6;
    border: 1px solid #2a2f45;
    cursor: pointer;
    font-weight: bold;
    transition: 0.2s;
  }

  .add-button:hover {
    background-color: #353b53;
    color: #dedeff;
  }
`
