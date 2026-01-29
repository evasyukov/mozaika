import styled from "styled-components"

import { ButtonPrimary } from "../button-primary/ButtonPrimary"
import { Skill } from "../../pages/profile/components/skills-block/components/Skill"
import { Link } from "react-router-dom"

function ProjectContainer({ className, id, name, title, skills }) {
  const isFooter = false

  return (
    <div className={className}>
      <Link to={`/project/${id}`}>
        <h3>{name}</h3>
      </Link>
      <p>{title}</p>

      <div className="tags">
        {skills.map((skill) => {
          return <Skill skillName={skill} key={skill}/>
        })}
      </div>

      {isFooter ? (
        <div className="project-footer">
          <span className="author">Автор: Егор</span>
          <ButtonPrimary>Подробнее</ButtonPrimary>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export const ProjectCard = styled(ProjectContainer)`
  display: flex;
  flex-direction: column;
  gap: 14px;
  background: #151821;
  border: 1px solid #1f2330;
  border-radius: 10px;
  padding: 20px;
  width: 800px;
  F h3 {
    font-size: 18px;
  }

  p {
    font-size: 14px;
    color: #b5b5b5;
  }

  .tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .tags span {
    background: #1f2330;
    border: 1px solid #2a2f45;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 12px;
  }

  .project-footer {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`
