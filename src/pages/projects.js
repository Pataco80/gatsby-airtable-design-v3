import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { Layout, Projects, Algolia } from '../components'

const ProjectsPage = ({ data }) => {
  const {
    projectsList: { nodes: projects },
  } = data

  return (
    <Wrapper>
      <Layout>
        <Projects projects={projects} title="All Projects" page />
      </Layout>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  min-height: 100vh;
  background: var(--clr-grey-10);
  nav {
    background: var(--clr-primary-7);
  }
`

export default ProjectsPage

export const query = graphql`
  {
    projectsList: allAirtable(
      filter: { table: { eq: "products" } }
      sort: { fields: data___date, order: DESC }
    ) {
      nodes {
        data {
          name
          categories
          date(formatString: "DD, MMM YYYY", locale: "CH")
          image {
            localFiles {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED
                  placeholder: BLURRED
                  formats: WEBP
                )
              }
            }
          }
        }
      }
    }
  }
`
