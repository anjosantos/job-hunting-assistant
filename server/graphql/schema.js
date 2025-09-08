export const typeDefs = `

    enum Status {
      SENT
      REPLIED
      ACCEPTED
      REJECTED
    }

    enum Lead {
      LINKEDIN
      INDEED
      GLASSDOOR
    }

    type Resume {
      id: ID
      content: String
      dateCreated: String
      version: Int
    }

    type CoverLetterTemplate {
      id: ID
      title: String
      content: String
      dateCreated: String
    }

    type Job {
      id: ID
      role: String
      description: String
      company: String
      location: String
      resumePosted: Resume
      dateCreated: String
      dateApprovedRejected: String
      lead: Lead
      salaryMax: Int
      salaryMin: Int
      status: Status
      isExternalWebsite: Boolean
      withGithubLink: Boolean
      withLinkedinLink: Boolean
      withPortfolioLink: Boolean
      withCoverLetter: Boolean
      referenceLink: String
    }

    input ResumeInput {
      id: ID
      content: String
      dateCreated: String
      version: Int
    }

    input CoverLetterTemplateInput {
      id: ID
      title: String
      content: String
      dateCreated: String
    }

    input JobInput {
      id: ID
      role: String
      description: String
      company: String
      location: String
      resumePosted: ResumeInput
      dateCreated: String
      dateApprovedRejected: String
      lead: Lead
      salaryMin: Int
      salaryMax: Int
      status: Status
      isExternalWebsite: Boolean
      withGithubLink: Boolean
      withLinkedinLink: Boolean
      withPortfolioLink: Boolean
      withCoverLetter: Boolean
      referenceLink: String
    }

    type Query {
      getJobs: [Job]
      getJobById(id: ID!): Job
      getResumes: [Resume]
      getCoverLetterTemplate: [CoverLetterTemplate]
    }

    type Mutation {
      createJob(input: JobInput): Job
      updateJob(input: JobInput): Job
      deleteJob(id: ID!): String
      createResume(input: ResumeInput): Resume
      createCoverLetterTemplate(input: CoverLetterTemplateInput): CoverLetterTemplate
    }

`;

export default typeDefs;
