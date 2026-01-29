import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
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

function ProjectContainer({ className }) {
  const { id } = useParams()
  const dispatch = useDispatch()

  const data = useSelector(selectProjectData)
  const status = useSelector(selectProjectStatus)
  const error = useSelector(selectProjectError)
  const roleId = useSelector(selectUserRole)
  const authUserId = useSelector(selectUserId)

  useEffect(() => {
    if (id) {
      dispatch(projectThunk(id))
    }
  }, [id, dispatch])

  if (roleId === ROLE.GUEST) return <Navigate to="/authorization" />
  if (status === "loading") return <div>Загрузка профиля...</div>
  if (status === "failed") return <div>{error}</div>
  if (!data) return null

  const { project, author } = data

  const isAuthor = authUserId === author.id

  return (
    <div className={className}>
      <section className="project-header">
        <div className="project-header-top">
          <h1 className="project-title">{project.name}</h1>

          {isAuthor && (
            <a className="edit-project-button">Редактировать</a>
          )}
        </div>

        <p className="project-short-description">{project.title}</p>

        <div className="project-meta">
          {project.skills.map((skill) => (
            <span key={skill} className="tag">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="project-content">
        <div className="project-section">
          <h2>Описание проекта</h2>
          <p>{project.description}</p>
        </div>

        <div className="project-section author">
          <h2>Автор проекта</h2>
          <div className="author-card">
            <div className="author-avatar"></div>
            <span className="author-name">
              {author.name} {author.lastName}
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}

export const Project = styled(ProjectContainer)`
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 24px 80px;

  .project-header {
    margin-bottom: 32px;
  }

  .project-header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }

  .edit-project-button {
    font-size: 14px;
    color: #a0a0ff;
    text-decoration: none;

    padding: 6px 10px;
    border-radius: 6px;
    border: 1px solid #2a2f45;
    background: #1f2330;
  }

  .edit-project-button:hover {
    background: #262b3d;
  }

  .project-title {
    margin: 0 0 8px;
    font-size: 32px;
  }

  .project-short-description {
    margin: 0 0 16px;
    color: #b0b0b0;
  }

  .project-meta {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .tag {
    background: #1f2330;
    border: 1px solid #2a2f45;
    border-radius: 999px;
    padding: 6px 12px;
    font-size: 13px;
  }

  /* ===== Sections ===== */

  .project-section {
    margin-bottom: 32px;
  }

  .project-section h2 {
    margin-bottom: 12px;
    font-size: 20px;
  }

  .project-section p,
  .project-section li {
    color: #cfcfcf;
    line-height: 1.6;
  }

  .project-section ul {
    padding-left: 20px;
  }

  /* ===== Author ===== */

  .author-card {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .author-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #2a2f45;
  }

  .author-name {
    font-weight: 600;
  }
`
