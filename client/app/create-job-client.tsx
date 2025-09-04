"use client";

import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";

import { type Job } from "../types";

const CreateJobClient = () => {
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

  const [createJob] = useMutation(CREATE_JOB);

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
  );
};

export default CreateJobClient;
