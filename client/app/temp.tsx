import { gql } from "@apollo/client";

import { query } from "../lib/ApolloClient";
import { type Job } from "../types";
import CreateJobClient from "./create-job-client";

export const Home = async () => {
  const GET_JOBS = gql`
    query GetJobs {
      getJobs {
        id
        role
        description
        company
        location
        resumePosted
        datePosted
        lead
        salary
        status
        withGithubLink
        withLinkedinLink
        withPortfolioLink
        withCoverLetter
        referenceLink
      }
    }
  `;

  const GET_JOB_BY_ID = gql`
    query GetJobById($id: ID!) {
      getJobById(id: $id) {
        id
        role
        description
        company
        location
        resumePosted
        datePosted
        lead
        salary
        status
        withGithubLink
        withLinkedinLink
        withPortfolioLink
        withCoverLetter
        referenceLink
      }
    }
  `;

  type GetJobsType = {
    getJobs: Job[];
  };

  type GetJobByIdType = {
    getJobById: Job;
  };

  const { data: getJobsData } = await query<GetJobsType>({ query: GET_JOBS });
  const { data: getJobByIdData } = await query<GetJobByIdType>({
    query: GET_JOB_BY_ID,
    variables: { id: "1" },
  });

  return (
    
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <CreateJobClient />
      <div>
        <>
          <h1> Chosen Job: </h1>
          <p>
            {getJobByIdData && getJobByIdData.getJobById
              ? getJobByIdData.getJobById.role
              : "No job selected"}
          </p>
          <p>
            {getJobByIdData && getJobByIdData.getJobById
              ? getJobByIdData.getJobById.description
              : "No job selected"}
          </p>
          <p>
            {getJobByIdData && getJobByIdData.getJobById
              ? getJobByIdData.getJobById.company
              : "No job selected"}
          </p>
          <p>
            {getJobByIdData && getJobByIdData.getJobById
              ? getJobByIdData.getJobById.location
              : "No job selected"}
          </p>
          <p>
            {getJobByIdData && getJobByIdData.getJobById
              ? getJobByIdData.getJobById.resumePosted
              : "No job selected"}
          </p>
          <p>
            {getJobByIdData && getJobByIdData.getJobById
              ? getJobByIdData.getJobById.datePosted
              : "No job selected"}
          </p>
          <p>
            {getJobByIdData && getJobByIdData.getJobById
              ? getJobByIdData.getJobById.lead
              : "No job selected"}
          </p>
        </>
      </div>

      <h1> Jobs</h1>
      <div>
        {getJobsData &&
          getJobsData.getJobs.map((job, index) => (
            <div key={`jobContainer${index}`}>
              <p> Role: {job.role}</p>
              <p> Description: {job.description}</p>
              <p> Company: {job.company}</p>
              <p> Location: {job.location}</p>
              <p> Resume Posted: {job.resumePosted}</p>
              <p> Date Posted: {job.datePosted}</p>
              <p> Lead: {job.lead}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
