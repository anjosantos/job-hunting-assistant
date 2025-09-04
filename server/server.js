import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const jobs = [
  {
    id: "1",
    role: "Software Engineer",
    description: "Develop and maintain web applications.",
    company: "Tech Corp",
    location: "New York, NY",
    resumePosted: "version2023-10-01",
    datePosted: "2023-10-01",
    lead: "LinkedIn",
    salary: "120000",
    status: "Sent",
    withGithubLink: true,
    withLinkedinLink: true,
    withPortfolioLink: false,
    withCoverLetter: false,
    referenceLink: "https://www.linkedin.com/in/johndoe",
  },
];

const typeDefs = `
    type Query {
      getJobs: [Job]
      getJobById(id: ID!): Job
    }

    type Mutation {
      createJob(role: String!, description: String!, company: String!, location: String!, resumePosted: String!, datePosted: String!, lead: String!): Job
    }

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
`;

const resolvers = {
  Query: {
    getJobs: () => {
      return jobs;
    },
    getJobById: (parent, args) => {
      const id = args.id;
      return jobs.find((job) => job.id === id);
    },
  },
  Mutation: {
    createJob: (parent, args) => {
      const {
        role,
        description,
        company,
        location,
        resumePosted,
        datePosted,
        lead,
      } = args;
      const newJob = {
        id: (jobs.length + 1).toString(),
        role,
        description,
        company,
        location,
        resumePosted,
        datePosted,
        lead,
      };
      jobs.push(newJob);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server Running at: ${url}`);

///// Query, Mutation
//// typeDefs, resolvers
