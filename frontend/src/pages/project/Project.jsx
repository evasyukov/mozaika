import { useEffect, useLayoutEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useParams, useMatch } from "react-router-dom"
import styled from "styled-components"

import { selectProjectData, selectAuthUser } from "../../selectors"
import { projectThunk } from "../../slices/project/projectThunk"
import { ROLES } from "../../constants"
import { resetProjectData } from "../../slices/project/projectSlice"

import { ProjectContent, ProjectForm } from "./components"

function ProjectContainer({ className }) {
  const params = useParams()
  const dispatch = useDispatch()

  const isCreating = !!useMatch({ path: "/project", end: true })
  const isEditing = !!useMatch({ path: "/project/:id/edit", end: true })

  const { data, status, error } = useSelector(selectProjectData)

  const { roleId, id, isInitialized } = useSelector(selectAuthUser)

  // сброс проекта при создании
  useLayoutEffect(() => {
    if (isCreating) {
      dispatch(resetProjectData())
    }
  }, [dispatch, isCreating])

  useEffect(() => {
    if (!isCreating && params.id) {
      dispatch(projectThunk(params.id))
    }
  }, [params.id, isCreating, dispatch])

  if (!isCreating && status === "loading") {
    return <div>Загрузка проекта...</div>
  }

  if (isInitialized && roleId === ROLES.GUEST) {
    return <Navigate to="/login" />
  }

  if (!isCreating && status === "succeeded" && !data) {
    return <div>Проект не найден</div>
  }

  if (!isCreating && (!data?.project || !data?.author)) {
    return <div>Проект не найден</div>
  }

  const project = data?.project
  const author = data?.author
  const isAuthor = author && id === author.id

  const SpecificProjectPage =
    isCreating || isEditing ? (
      isEditing && !isAuthor ? (
        <Navigate to={`/project/${params.id}`} />
      ) : (
        <div className={className}>
          <ProjectForm
            key={project?.id || "new"}
            project={project}
            status={isEditing ? "editing" : "creating"}
          />
        </div>
      )
    ) : (
      <div className={className}>
        <ProjectContent project={project} author={author} isAuthor={isAuthor} />
      </div>
    )

  return error ? <div>{error}</div> : SpecificProjectPage
}

export const Project = styled(ProjectContainer)`
  width: 900px;
  margin: 0 auto;
  padding: 32px 24px 80px;
`
