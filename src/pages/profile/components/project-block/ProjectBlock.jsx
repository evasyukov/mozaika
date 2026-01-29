import styled from "styled-components"

import { H2, ButtonPrimary, Project } from "../../../../components"

function ProjectBlockContainer({ className, projects, isUserProfile }) {
  return (
    <div className={className}>
      {!isUserProfile ? (
        <div className="section-header">
          <H2 textAling="left" margin="0 0 16px">
            Проекты пользователя
          </H2>
        </div>
      ) : (
        <div className="section-header">
          <H2 textAling="left" margin="0 0 16px">
            Мои проекты
          </H2>
          <ButtonPrimary>Создать проект</ButtonPrimary>
        </div>
      )}

      <div className="projects">
        {projects.map((project) => (
          <Project
            key={project.id}
            name={project.name}
            title={project.title}
            skills={project.skills}
          />
        ))}
      </div>
    </div>
  )
}

export const ProjectBlock = styled(ProjectBlockContainer)`
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .projects {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }
`
