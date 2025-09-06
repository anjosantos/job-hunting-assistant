import { Jobs } from "../db/connector.js";

export const resolvers = {
  Query: {
    getJobs: async () => {
      const allJobs = await Jobs.find();
      return allJobs;
    },
    getJobById: async (_, args) => {
      const id = args.id;
      const job = await Jobs.findById(id);
      return job;
    },
  },
  Mutation: {
    createJob: async (_, { input }) => {
      const {
        role,
        description,
        company,
        location,
        resumePosted,
        datePosted,
        lead,
        salary,
        status,
        withGithubLink,
        withLinkedinLink,
        withPortfolioLink,
        withCoverLetter,
        referenceLink,
      } = input;
      const newJob = new Jobs({
        role,
        description,
        company,
        location,
        resumePosted,
        datePosted,
        lead,
        salary,
        status,
        withGithubLink,
        withLinkedinLink,
        withPortfolioLink,
        withCoverLetter,
        referenceLink,
      });
      newJob.id = newJob._id;
      await newJob.save();
      return newJob;
    },
    updateJob: async (_, { input }) => {
      const updatedJob = await Jobs.findOneAndUpdate({ _id: input.id }, input, {
        new: true,
      });
      return updatedJob;
    },

    deleteJob: async (_, { id }) => {
      await Jobs.findOneAndDelete(id);
      return "The job is successfully deleted.";
    },
  },
};

export default resolvers;
