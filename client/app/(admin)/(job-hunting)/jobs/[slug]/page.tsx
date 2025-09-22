"use client";

import React, { use } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import JobForm from "@/components/job/JobForm";
import { Job } from "@/types";

const GET_JOB_BY_ID = gql`
  query GetJobById($id: ID!) {
    getJobById(id: $id) {
      id
      role
      description
      company
      location
      resumePosted {
        id
        content
        dateCreated
        version
      }
      dateCreated
      lead
      salaryMin
      salaryMax
      status
      referenceLink
      isExternalWebsite
      withGithubLink
      withLinkedinLink
      withPortfolioLink
      withCoverLetter
      dateApprovedRejected
    }
  }
`;

const JobDetailPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);
  type GetJobByIdType = {
    getJobById: Job;
  };
  const { data, loading } = useQuery<GetJobByIdType>(GET_JOB_BY_ID, {
    variables: { id: slug },
  });

  if (loading) return <div>Loading...</div>;
  if (!data?.getJobById)
    return <div className="text-red-500">Job not found.</div>;

  return <JobForm mode="edit" initialJob={data.getJobById} jobId={slug} />;
};

export default JobDetailPage;
