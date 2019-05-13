import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Layout } from '../../components/Layout';
import { Header } from '../../components/Header';
import { BlogCard } from '../../components/BlogCard';

const BlogPage = ({ data }) => {
  const BlogData = data.allMarkdownRemark.edges;
  const renderCards = BlogData
    // Get md files
    .filter((edge) => !!edge.node.frontmatter.date)
    .map((edge) => (
      // Generate a feed of BlogPosts
      <BlogCard
        key={edge.node.id}
        title={edge.node.frontmatter.title}
        date={edge.node.frontmatter.date}
        path={edge.node.frontmatter.path}
        excerpt={edge.node.frontmatter.excerpt}
      />
    ));

  return (
    <Layout>
      <Header tagline="Things I've Written" title="Blog" />
      {renderCards}
    </Layout>
  );
};

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(src)/(markdown)/(blog)/" } }
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      ...BlogData
    }
  }
`;

BlogPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              date: PropTypes.string.isRequired,
              path: PropTypes.string.isRequired,
              excerpt: PropTypes.string.isRequired
            })
          })
        })
      )
    })
  }).isRequired
};

export default BlogPage;
