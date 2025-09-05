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

import { type Job } from "@/types";

export const CreateJob = () => {
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

  const handleCreateJob = () => {
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

  const options = [
    { value: "LinkedIn", label: "LinkedIn" },
    { value: "Indeed", label: "Indeed" },
    { value: "Glassdoor", label: "Glassdoor" },
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
                  onChange={(e) =>
                    setNewJob((prev) => ({ ...prev, location: e.target.value }))
                  }
                  placeholder="Enter location here"
                />
              </div>
              <div>
                <DatePicker
                  id="date-picker-resume-posted"
                  label="Resume Posted"
                  placeholder="Select a date"
                  onChange={(dates, currentDateString) => {
                    setNewJob((prev) => ({
                      ...prev,
                      resumePosted: currentDateString,
                    }));
                  }}
                />
              </div>
              <div>
                <DatePicker
                  id="date-picker-date-posted"
                  label="Date Posted"
                  placeholder="Select a date"
                  onChange={(dates, currentDateString) => {
                    setNewJob((prev) => ({
                      ...prev,
                      datePosted: currentDateString,
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
                    onChange={(value: string) => {
                      setNewJob((prev) => ({
                        ...prev,
                        lead: value,
                      }));
                    }}
                    className="dark:bg-dark-900"
                  />
                  <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                    <ChevronDownIcon />
                  </span>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  size="sm"
                  variant="primary"
                  startIcon={<PlusIcon />}
                  onClick={handleCreateJob}
                >
                  Create
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
