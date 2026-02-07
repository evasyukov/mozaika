import { useEffect, useLayoutEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useParams, useMatch } from "react-router-dom"
import styled from "styled-components"

import {
  selectProjectData,
  selectProjectStatus,
  selectProjectError,
  selectUserRole,
  selectUserId,
} from "../../selectors"
import { projectThunk } from "../../slices/project/projectThunk"
import { ROLE } from "../../constants"
import { resetProjectData } from "../../slices/project/projectSlice"

import { ProjectContent, ProjectForm } from "./components"

function ProjectContainer({ className }) {
  const params = useParams()
  const dispatch = useDispatch()

  const isCreating = !!useMatch("/project")
  const isEditing = !!useMatch("/project/:id/edit")

  const data = useSelector(selectProjectData)
  const status = useSelector(selectProjectStatus)
  const error = useSelector(selectProjectError)

  const roleId = useSelector(selectUserRole)
  const authUserId = useSelector(selectUserId)

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

  if (roleId === ROLE.GUEST) {
    return <Navigate to="/authorization" />
  }

  if (!isCreating && status === "loading") {
    return <div>Загрузка проекта...</div>
  }

  if (!isCreating && !data) return null

  const project = data?.project
  const author = data?.author
  const isAuthor = author && authUserId === author.id

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
