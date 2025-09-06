export const typeDefs = `
    type Job {
      id: ID
      role: String
      description: String
      company: String
      location: String
      resumePosted: String
      datePosted: String
      lead: String
      salary: String
      status: String
      withGithubLink: Boolean
      withLinkedinLink: Boolean
      withPortfolioLink: Boolean
      withCoverLetter: Boolean
      referenceLink: String
    }

    input JobInput {
      id: ID
      role: String
      description: String
      company: String
      location: String
      resumePosted: String
      datePosted: String
      lead: String
      salary: String
      status: String
      withGithubLink: Boolean
      withLinkedinLink: Boolean
      withPortfolioLink: Boolean
      withCoverLetter: Boolean
      referenceLink: String
    }

    type Query {
      getJobs: [Job]
      getJobById(id: ID!): Job
    }

    type Mutation {
      createJob(input: JobInput): Job
      updateJob(input: JobInput): Job
      deleteJob(id: ID!): String
    }

`;

export default typeDefs;
