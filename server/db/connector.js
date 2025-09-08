import mongoose from "mongoose";

async function connectToDB() {
  const mongoDBURI = process.env.MONGODB_URI;
  await mongoose.connect(mongoDBURI);

  console.log("DB Connection Successful");
}

connectToDB();

const resumeSchema = new mongoose.Schema({
  id: String,
  content: String,
  dateCreated: String,
  version: Number,
});

const coverLetterTemplateSchema = new mongoose.Schema({
  id: String,
  title: String,
  content: String,
  dateCreated: String,
});

const jobSchema = new mongoose.Schema({
  id: String,
  role: String,
  description: String,
  company: String,
  location: String,
  resumePosted: resumeSchema,
  dateCreated: String,
  dateApprovedRejected: String,
  lead: {
    type: String,
    enum: ["LINKEDIN", "INDEED", "GLASSDOOR"],
  },
  salaryMin: Number,
  salaryMax: Number,
  status: {
    type: String,
    enum: ["SENT", "REPLIED", "ACCEPTED", "REJECTED"],
  },
  isExternalWebsite: Boolean,
  withGithubLink: Boolean,
  withLinkedinLink: Boolean,
  withPortfolioLink: Boolean,
  withCoverLetter: Boolean,
  referenceLink: String,
});

const Jobs = mongoose.model("Job", jobSchema);
const Resumes = mongoose.model("Resume", resumeSchema);
const CoverLetterTemplates = mongoose.model(
  "CoverLetterTemplate",
  coverLetterTemplateSchema
);

export { Jobs, Resumes, CoverLetterTemplates };
