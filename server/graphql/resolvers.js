import { Jobs, Resumes, CoverLetterTemplates } from "../db/connector.js";

export const resolvers = {
  Query: {
    getJobs: async () => {
      return await Jobs.find();
    },
    getJobById: async (_, { id }) => {
      return await Jobs.findById(id);
    },
    getResumes: async () => {
      return await Resumes.find();
    },
    getCoverLetterTemplates: async () => {
      return await CoverLetterTemplates.find();
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
        dateCreated,
        dateApprovedRejected,
        lead,
        salaryMin,
        salaryMax,
        status,
        isExternalWebsite,
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
        dateCreated,
        dateApprovedRejected,
        lead,
        salaryMin,
        salaryMax,
        status,
        isExternalWebsite,
        withGithubLink,
        withLinkedinLink,
        withPortfolioLink,
        withCoverLetter,
        referenceLink,
      });
      if (resumePosted && resumePosted.id) {
        const resume = await Resumes.findById(resumePosted.id);
        newJob.resumePosted = resume;
      }

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
      await Jobs.findOneAndDelete({ _id: id });
      return "The job is successfully deleted.";
    },

    createResume: async (_, { input }) => {
      const { content, dateCreated } = input;
      const latestResume = await Resumes.findOne({ dateCreated })
        .sort({ version: -1 })
        .exec();

      const nextVersion = latestResume ? latestResume.version + 1 : 1;

      const newResume = new Resumes({
        content,
        dateCreated,
        version: nextVersion,
      });

      newResume.id = newResume._id;
      await newResume.save();
      return newResume;
    },

    createCoverLetterTemplate: async (_, { input }) => {
      const { title, content, dateCreated } = input;
      const newCoverLetterTemplate = new CoverLetterTemplates({
        title,
        content,
        dateCreated,
      });

      newCoverLetterTemplate.id = newCoverLetterTemplate._id;
      await newCoverLetterTemplate.save();
      return newCoverLetterTemplate;
    },
  },
};

export default resolvers;
