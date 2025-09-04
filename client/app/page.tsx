"use client";

import { useState } from "react";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";

export const Home = () => {
  type Job = {
    id: string;
    role: string;
    description: string;
    company: string;
    location: string;
    resumePosted: string;
    datePosted: string;
    lead: string;
    salary: string;
    status: string;
    withGithubLink: boolean;
    withLinkedinLink: boolean;
    withPortfolioLink: boolean;
    withCoverLetter: boolean;
    referenceLink: string;
  };
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

  const CREATE_JOB = gql`
    mutation CreateJob(
      $role: String!
      $description: String!
      $company: String!
      $location: String!
      $resumePosted: String!
      $datePosted: String!
      $lead: String!
    ) {
      createJob(
        role: $role
        description: $description
        company: $company
        location: $location
        resumePosted: $resumePosted
        datePosted: $datePosted
        lead: $lead
      ) {
        id
      }
    }
  `;
  const [newJob, setNewJob] = useState<Job>({
    id: "",
    role: "",
    description: "",
    company: "",
    location: "",
    resumePosted: "",
    datePosted: "",
    lead: "",
    salary: "",
    status: "",
    withGithubLink: false,
    withLinkedinLink: false,
    withPortfolioLink: false,
    withCoverLetter: false,
    referenceLink: "",
  });

  type GetJobsType = {
    getJobs: Job[];
  };

  type GetJobByIdType = {
    getJobById: Job;
  };

  const {
    data: getJobsData,
    error: getJobsError,
    loading: getJobsLoading,
  } = useQuery<GetJobsType>(GET_JOBS);

  const { data: getJobByIdData, loading: getJobByIdLoading } =
    useQuery<GetJobByIdType>(GET_JOB_BY_ID, {
      variables: { id: "2" },
    });

  const [createJob] = useMutation(CREATE_JOB);

  if (getJobsLoading) return <p> Data loading...</p>;

  if (getJobsError) return <p> Error: {getJobsError.message}</p>;

  const handleCreateJob = async () => {
    console.log(newJob);
    createJob({
      variables: {
        role: newJob?.role,
        description: newJob?.description,
        company: newJob?.company,
        location: newJob?.location,
        resumePosted: newJob?.resumePosted,
        datePosted: newJob?.datePosted,
        lead: newJob?.lead,
      },
    });
  };
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div>
        <input
          placeholder="Role..."
          onChange={(e) =>
            setNewJob((prev) => ({ ...prev, role: e.target.value }))
          }
        />
        <input
          placeholder="Description..."
          onChange={(e) =>
            setNewJob((prev) => ({ ...prev, description: e.target.value }))
          }
        />
        <input
          placeholder="Company..."
          onChange={(e) =>
            setNewJob((prev) => ({ ...prev, company: e.target.value }))
          }
        />
        <input
          placeholder="Location..."
          onChange={(e) =>
            setNewJob((prev) => ({ ...prev, location: e.target.value }))
          }
        />
        <input
          placeholder="Resume Posted..."
          onChange={(e) =>
            setNewJob((prev) => ({ ...prev, resumePosted: e.target.value }))
          }
        />
        <input
          placeholder="Date Posted..."
          onChange={(e) =>
            setNewJob((prev) => ({ ...prev, datePosted: e.target.value }))
          }
        />
        <input
          placeholder="Lead..."
          onChange={(e) =>
            setNewJob((prev) => ({ ...prev, lead: e.target.value }))
          }
        />
        <button onClick={handleCreateJob}> Create Job</button>
      </div>

      <div>
        {getJobByIdLoading ? (
          <p> Loading job...</p>
        ) : (
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
        )}
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
