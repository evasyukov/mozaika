import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import styled from "styled-components"

import { H2, Input, ButtonPrimary, AuthFormError } from "../../../../components"
import { AddSkills } from "./components/AddSkills"
import { saveProjectThunk } from "../../../../slices/project/projectThunk"
import { selectUserId } from "../../../../selectors"

const projectFormSchema = yup.object().shape({
  name: yup
    .string()
    .required("Введите имя проекта")
    .min(4, "Имя проекта должно содержать минимум 4 символа")
    .max(30, "Имя проекта должно иметь не более 30 символов")
    .matches(
      /^[a-zA-Zа-яА-ЯёЁ0-9]+$/,
      "Имя проекта может содержать только буквы и цифры",
    ),
  title: yup
    .string()
    .required("Напишите краткое описание проекта")
    .min(4, "Описание проекта должно содержать минимум 4 символа")
    .max(50, "Описание проекта должно иметь не более 50 символов"),
})

function ProjectFormContainer({ className, project }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      title: "",
    },
    resolver: yupResolver(projectFormSchema),
  })

  const dispatch = useDispatch()
  const authUserId = useSelector(selectUserId)
  const navigate = useNavigate()

  const [description, setDescription] = useState("")
  const [skills, setSkills] = useState([])
  const [errorSkill, setErrorSkill] = useState("")

  useEffect(() => {
    if (project) {
      reset({
        name: project.name,
        title: project.title,
      })
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDescription(project.description)
      setSkills(project.skills)
    }
  }, [project, reset])

  const addSkill = (skill) => {
    setSkills((prev) => [...prev, skill])
  }
  const removeSkill = (skill) => {
    setSkills((prev) => prev.filter((item) => item !== skill))
  }

  function nameDescription({ target }) {
    setDescription(target.value)
  }

  const onSubmit = ({ name, title }) => {
    if (skills.length < 1) {
      setErrorSkill("Добавьте хотя бы один навык")
      return
    }

    const projectData = {
      name,
      title,
      description,
      skills,
      authUserId,
      projectId: project?.id,
    }

    dispatch(
      saveProjectThunk({
        data: projectData,
      }),
    )

    navigate("/profile")
  }

  const formError = errors.name?.message || errors.title?.message || errorSkill

  return (
    <div className={className}>
      <H2 margin="0 0 32px">Создание проекта</H2>

      {formError && <AuthFormError>{formError}</AuthFormError>}

      <form className="project-form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          title="Название проекта"
          placeholder="Например: Мозаика"
          {...register("name")}
        />
        <Input
          type="text"
          title="Краткое описание"
          placeholder="Коротко свой опишите проект"
          {...register("title")}
        />

        <Input
          type="text"
          field="textarea"
          title="Описание проекта"
          placeholder="Опишите идею, цели и задачи проекта"
          value={description}
          onChange={nameDescription}
        />

        <AddSkills skills={skills} onAdd={addSkill} onRemove={removeSkill} />

        <ButtonPrimary>Создать проект</ButtonPrimary>
      </form>
    </div>
  )
}

export const ProjectForm = styled(ProjectFormContainer)`
  width: 600px;
  margin: 0 auto;

  .project-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`
