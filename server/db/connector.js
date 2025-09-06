import mongoose from "mongoose";

async function connectToDB() {
  const mongoDBURI = process.env.MONGODB_URI;
  await mongoose.connect(mongoDBURI);

  console.log("DB Connection Successful");
}

connectToDB();

const jobSchema = new mongoose.Schema({
  id: String,
  role: String,
  description: String,
  company: String,
  location: String,
  resumePosted: String,
  datePosted: String,
  lead: String,
  salary: String,
  status: String,
  withGithubLink: Boolean,
  withLinkedinLink: Boolean,
  withPortfolioLink: Boolean,
  withCoverLetter: Boolean,
  referenceLink: String,
});

const Jobs = mongoose.model("Job", jobSchema);

export { Jobs };
