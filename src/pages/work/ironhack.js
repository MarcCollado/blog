import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import styles from './work.module.css';
import { Layout } from '../../components/Layout';
import { Header } from '../../components/Header';
import '../../styles/tabs.css';
import { renderFilteredBlogCards } from '../../utils/helpers';

const Ironhack = ({ data, location }) => {
  const workIronhackCoverImg = data.workIronhackCoverImg.childImageSharp.fluid;
  const workIronhackSeoImg =
    data.workIronhackCoverImg.childImageSharp.fluid.src;
  const workIronhack = {
    title: data.workIronhack.edges[0].node.frontmatter.title,
    excerpt: data.workIronhack.edges[0].node.frontmatter.excerpt,
    html: data.workIronhack.edges[0].node.html
  };
  const ironhackBlogPosts = data.ironhackBlogPosts.edges;
  const renderIronhackBlogCards = renderFilteredBlogCards.bind(
    null,
    ironhackBlogPosts
  );
  const workIronhackInsightsCoverImg =
    data.workIronhackInsightsCoverImg.childImageSharp.fluid;
  const workIronhackStoriesCoverImg =
    data.workIronhackStoriesCoverImg.childImageSharp.fluid;

  return (
    <Layout
      title={workIronhack.title}
      description={workIronhack.excerpt}
      pathname={location.pathname}
      image={workIronhackSeoImg}
    >
      <Header title={workIronhack.title} tagline={workIronhack.excerpt} />
      <Img
        className={styles.image}
        title={workIronhack.title}
        alt={workIronhack.excerpt}
        fluid={workIronhackCoverImg}
      />
      <div dangerouslySetInnerHTML={{ __html: workIronhack.html }} />
      <Tabs>
        <TabList>
          <Tab>
            <p>Industry insights</p>
          </Tab>
          <Tab>
            <p>Ironhack stories</p>
          </Tab>
        </TabList>

        <TabPanel>
          <p>
            Education is changing for the better. At Ironhack I had a unique
            opportunity to be part and lead this revolution; using technology to
            create the tools for our students to boost their careers and become
            digital creators themselves.
          </p>
          <Img
            className={styles.image}
            title="Ironhack insights"
            alt="Ironhack is changing education for the better."
            fluid={workIronhackInsightsCoverImg}
          />
          <p>
            Thousands of graduates across eleven locations have taught me a lot
            about education and how we learn. Here is a recollection of posts
            around educational products and methodologies. What has worked, what
            has not, and the lessons we have learned along the way.
          </p>
          {renderIronhackBlogCards('idea')}
        </TabPanel>
        <TabPanel>
          <p>
            Back in 2015, when I joined Ironhack, it looked nothing like today.
            We were barely ten of us and the idea of changing people lives in
            just two months sounded more of a wild dream rather than an
            attainable reality.
          </p>
          <Img
            className={styles.image}
            title="Ironhack stories"
            alt="Recollection of posts that cover my story at Ironhack from a more confidential, idiosyncratic perspective."
            fluid={workIronhackStoriesCoverImg}
          />
          <p>
            After more than four years, I have accumulated thousands of stories,
            from being a student myself to scaling campuses operations. Here is
            a recollection of posts that cover my story at Ironhack from a more
            confidential, idiosyncratic perspective.
          </p>
          {renderIronhackBlogCards('memoir')}
        </TabPanel>
      </Tabs>
    </Layout>
  );
};

export const query = graphql`
  {
    workIronhackCoverImg: file(relativePath: { eq: "ironhack-cover.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
          src
        }
      }
    }
    workIronhack: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(src)/(markdown)/(work)/(ironhack)/" }
      }
      limit: 1
    ) {
      ...pageInfo
    }
    workIronhackInsightsCoverImg: file(
      relativePath: { eq: "ironhack-insights.jpg" }
    ) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    workIronhackStoriesCoverImg: file(
      relativePath: { eq: "ironhack-barcelona.jpg" }
    ) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    ironhackBlogPosts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(src)/(markdown)/(blog)/" }
        frontmatter: { tags: { in: ["ironhack"] } }
      }
      limit: 100
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      ...allBlogPosts
    }
  }
`;

Ironhack.propTypes = {
  data: PropTypes.shape({
    workIronhackCoverImg: PropTypes.object.isRequired,
    workIronhack: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              excerpt: PropTypes.string.isRequired
            })
          })
        })
      )
    }),
    workIronhackInsightsCoverImg: PropTypes.object.isRequired,
    workIronhackStoriesCoverImg: PropTypes.object.isRequired,
    ironhackBlogPosts: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              date: PropTypes.string.isRequired,
              path: PropTypes.string.isRequired,
              tags: PropTypes.arrayOf(PropTypes.string).isRequired,
              excerpt: PropTypes.string.isRequired
            })
          })
        })
      )
    })
  }).isRequired
};

export default Ironhack;
