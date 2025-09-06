"use client";

import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import DatePicker from "@/components/form/date-picker";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import { PlusIcon, ChevronDownIcon } from "@/icons";

import { type Job, Lead, Status } from "@/types";

export const CreateJob = () => {
  const [newJob, setNewJob] = useState<Job>({
    id: "",
    role: "",
    description: "",
    company: "",
    location: "",
    resumePosted: null,
    dateCreated: "",
    dateApprovedRejected: "",
    lead: "",
    salaryMin: 0,
    salaryMax: 0,
    status: Status.SENT,
    isExternalWebsite: false,
    withGithubLink: false,
    withLinkedinLink: false,
    withPortfolioLink: false,
    withCoverLetter: false,
    referenceLink: "",
  });

  const CREATE_JOB = gql`
    mutation CreateJob(
      $role: String
      $description: String
      $company: String
      $location: String
      $resumePosted: [ResumeInput]
      $dateCreated: String
      $dateApprovedRejected: String
      $lead: Lead
      $salaryMin: Int
      $salaryMax: Int
      $status: Status
      $isExternalWebsite: Boolean
      $withGithubLink: Boolean
      $withLinkedinLink: Boolean
      $withPortfolioLink: Boolean
      $withCoverLetter: Boolean
      $referenceLink: String
    ) {
      createJob(
        input: {
          role: $role
          description: $description
          company: $company
          location: $location
          resumePosted: $resumePosted
          dateCreated: $dateCreated
          dateApprovedRejected: $dateApprovedRejected
          lead: $lead
          salaryMin: $salaryMin
          salaryMax: $salaryMax
          status: $status
          isExternalWebsite: $isExternalWebsite
          withGithubLink: $withGithubLink
          withLinkedinLink: $withLinkedinLink
          withPortfolioLink: $withPortfolioLink
          withCoverLetter: $withCoverLetter
          referenceLink: $referenceLink
        }
      ) {
        id
      }
    }
  `;

  const [createJob, { loading }] = useMutation(CREATE_JOB, {
    onCompleted: () => {
      setNewJob({
        id: "",
        role: "",
        description: "",
        company: "",
        location: "",
        resumePosted: null,
        dateCreated: "",
        dateApprovedRejected: "",
        lead: "",
        salaryMin: 0,
        salaryMax: 0,
        status: Status.SENT,
        isExternalWebsite: false,
        withGithubLink: false,
        withLinkedinLink: false,
        withPortfolioLink: false,
        withCoverLetter: false,
        referenceLink: "",
      });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  const handleCreateJob = () => {
    createJob({
      variables: {
        ...newJob,
      },
    });
  };

  const options = [
    { value: Lead.LINKEDIN as string, label: "LinkedIn" },
    { value: Lead.INDEED as string, label: "Indeed" },
    { value: Lead.GLASSDOOR as string, label: "Glassdoor" },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <ComponentCard title="Create Job">
            <div className="space-y-6">
              <div>
                <Label>Role</Label>
                <Input
                  type="text"
                  value={newJob.role}
                  onChange={(e) =>
                    setNewJob((prev) => ({ ...prev, role: e.target.value }))
                  }
                  placeholder="Enter role here"
                />
              </div>

              <div>
                <Label>Description</Label>
                <Input
                  type="text"
                  value={newJob.description}
                  onChange={(e) =>
                    setNewJob((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Enter description here"
                />
              </div>

              <div>
                <Label>Company</Label>
                <Input
                  type="text"
                  value={newJob.company}
                  onChange={(e) =>
                    setNewJob((prev) => ({ ...prev, company: e.target.value }))
                  }
                  placeholder="Enter company here"
                />
              </div>

              <div>
                <Label>Location</Label>
                <Input
                  type="text"
                  value={newJob.location}
                  onChange={(e) =>
                    setNewJob((prev) => ({ ...prev, location: e.target.value }))
                  }
                  placeholder="Enter location here"
                />
              </div>

              <div>
                <DatePicker
                  id="date-picker-date-created"
                  label="Date Created"
                  placeholder="Select a date"
                  value={newJob.dateCreated}
                  onChange={(dates, currentDateString) => {
                    setNewJob((prev) => ({
                      ...prev,
                      dateCreated: currentDateString,
                    }));
                  }}
                />
              </div>

              <div>
                <Label>Lead</Label>
                <div className="relative">
                  <Select
                    options={options}
                    placeholder="Select an option"
                    value={newJob.lead as string} // must be string
                    onChange={(value: string) => {
                      setNewJob((prev) => ({
                        ...prev,
                        lead: value as Lead, // cast string to enum
                      }));
                    }}
                    className="dark:bg-dark-900"
                  />
                  <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                    <ChevronDownIcon />
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Salary Min</Label>
                  <Input
                    type="number"
                    value={newJob.salaryMin}
                    onChange={(e) =>
                      setNewJob((prev) => ({
                        ...prev,
                        salaryMin: Number(e.target.value),
                      }))
                    }
                    placeholder="Min Salary"
                  />
                </div>
                <div>
                  <Label>Salary Max</Label>
                  <Input
                    type="number"
                    value={newJob.salaryMax}
                    onChange={(e) =>
                      setNewJob((prev) => ({
                        ...prev,
                        salaryMax: Number(e.target.value),
                      }))
                    }
                    placeholder="Max Salary"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  size="sm"
                  variant="primary"
                  startIcon={<PlusIcon />}
                  onClick={handleCreateJob}
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create"}
                </Button>
              </div>
            </div>
          </ComponentCard>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
