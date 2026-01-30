import styled from "styled-components"

import { H2 } from "../../../../components"

function ProjectContentContainer({ className, project, author, isAuthor }) {
  return (
    <div className={className}>
      <header>
        <div className="top">
          <h1>{project.name}</h1>
          {isAuthor && <a className="edit">Редактировать</a>}
        </div>

        <p className="subtitle">{project.title}</p>

        <div className="skills">
          {project.skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </header>

      <section>
        <H2 textAling="left" margin="0 0 12px 0">
          Описание проекта
        </H2>
        <p>{project.description}</p>
      </section>

      <section>
        <H2 textAling="left" margin="0 0 12px 0">
          Автор проекта
        </H2>
        <div className="author">
          <div className="avatar" />
          <span>
            {author.name} {author.lastName}
          </span>
        </div>
      </section>
    </div>
  )
}

export const ProjectContent = styled(ProjectContentContainer)`
  header {
    margin-bottom: 32px;
  }

  header h1 {
    margin: 0 0 8px;
    font-size: 32px;
  }

  header .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }

  .edit {
    background-color: #1f2330;
    border: 1px solid #2a2f45;
    border-radius: 6px;

    font-size: 14px;
    color: #a0a0ff;

    padding: 6px 10px;

    text-decoration: none;

    &:hover {
      background-color: #262b3d;
    }
  }

  .subtitle {
    margin: 0 0 16px;
    color: #b0b0b0;
  }

  .skills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    span {
      background-color: #1f2330;
      border: 1px solid #2a2f45;
      border-radius: 999px;

      padding: 6px 12px;
      font-size: 13px;
    }
  }

  section {
    margin-bottom: 32px;

    p,
    li {
      color: #cfcfcf;
      line-height: 1.6;
    }

    ul {
      padding-left: 20px;
    }
  }

  .author {
    display: flex;
    align-items: center;
    gap: 12px;

    .avatar {
      width: 48px;
      height: 48px;

      background-color: #2a2f45;
      border-radius: 50%;
    }
  }
`
