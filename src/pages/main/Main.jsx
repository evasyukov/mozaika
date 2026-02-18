import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"

import { ProjectCard } from "../../components"
import { projectsThunk } from "../../slices/projects/projectsThunk"
import { selectProjects } from "../../selectors"

function MainContainer({ className }) {
  const dispatch = useDispatch()
  const projects = useSelector(selectProjects)
  const status = useSelector((state) => state.projects.status) 

  useEffect(() => {
    dispatch(projectsThunk())
  }, [dispatch])

  if (status === "loading" || !projects) {
    return <div>Загрузка проектов...</div>
  }

  return (
    <div className={className}>
      <div className="filters">
        <input type="text" placeholder="Поиск проекта..." />{" "}
        {/* TODO: добавить фильтрацию */}
      </div>

      <div className="project-list">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            name={project.name}
            title={project.title}
            skills={project.skills}
            authorName={project.authorName}
            createdAt={project.createdAt}
            isFooter={true}
          />
        ))}
      </div>
    </div>
  )
}

export const Main = styled(MainContainer)`
  width: 1200px;
  margin: 0 auto;
  padding: 24px;

  .filters {
    display: flex;
    flex-direction: column;

    margin: 32px 0;
  }

  .project-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }

  .filters input {
    padding: 10px 14px;

    background: #151821;
    color: #e6e6e6;
    font-size: 14px;

    border: 1px solid #2a2f45;
    border-radius: 6px;
  }
`
