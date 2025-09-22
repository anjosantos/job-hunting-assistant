"use client";

import React, { use } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Job } from "@/types";
import { get } from "http";

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
      }
      dateCreated
      lead
      salaryMin
      salaryMax
      status
    }
  }
`;

const JobDetailPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);

  type GetJobByIdType = {
    getJobById: Job;
  };
  const { data: getJobByIdData, loading: getJobByIdLoading } =
    useQuery<GetJobByIdType>(GET_JOB_BY_ID, {
      variables: { id: slug },
    });

  if (getJobByIdLoading) {
    return <div>Loading...</div>;
  }

  if (!getJobByIdData && !getJobByIdLoading) {
    return (
      <div className="p-8">
        <PageBreadcrumb pageTitle="Job Not Found" />
        <div className="text-red-500 mt-4">Job not found.</div>
      </div>
    );
  }

  if (getJobByIdData) {
    return (
      <div className="p-8">
        <PageBreadcrumb pageTitle={`Job: ${getJobByIdData.getJobById.role}`} />
        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold mb-4">
            {getJobByIdData.getJobById.role}
          </h2>
          <div className="mb-2">
            <span className="font-semibold">Company:</span>{" "}
            {getJobByIdData.getJobById.company}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Location:</span>{" "}
            {getJobByIdData.getJobById.location}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Description:</span>{" "}
            {getJobByIdData.getJobById.description}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Resume Posted:</span>{" "}
            {getJobByIdData.getJobById.resumePosted?.id || "N/A"}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Salary Min:</span>{" "}
            {getJobByIdData.getJobById.salaryMin}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Salary Max:</span>{" "}
            {getJobByIdData.getJobById.salaryMax}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Date Created:</span>{" "}
            {getJobByIdData.getJobById.dateCreated}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Lead:</span>{" "}
            {getJobByIdData.getJobById.lead}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Status:</span>{" "}
            {getJobByIdData.getJobById.status}
          </div>
        </div>
      </div>
    );
  }
};

export default JobDetailPage;
