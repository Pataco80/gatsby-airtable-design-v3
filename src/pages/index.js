import React from 'react'
import { graphql } from 'gatsby'
import {
  Layout,
  Hero,
  About,
  Projects,
  Survey,
  Slider,
  GridProjects,
} from '../components'

const HomePage = ({ data }) => {
  const {
    projectsList: { nodes: projects },
    customersList: { nodes: custoer },
  } = data
  return (
    <Layout>
      <Hero />
      <About />
      <Projects projects={projects} title="Latest Projects" page />
      <Slider customers={custoer} />
    </Layout>
  )
}

export default HomePage

export const query = graphql`
  {
    projectsList: allAirtable(
      filter: { table: { eq: "products" } }
      limit: 3
      sort: { fields: data___date, order: DESC }
    ) {
      nodes {
        data {
          name
          category
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
    customersList: allAirtable(filter: { table: { eq: "customers" } }) {
      nodes {
        data {
          name
          quote
          title
          image {
            localFiles {
              childImageSharp {
                gatsbyImageData(
                  formats: WEBP
                  layout: FIXED
                  placeholder: BLURRED
                  width: 150
                  height: 150
                )
              }
            }
          }
        }
        id
      }
    }
  }
`
