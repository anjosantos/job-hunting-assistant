"use client";

import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Checkbox from "@/components/form/input/Checkbox";
import TextArea from "@/components/form/input/TextArea";
import DatePicker from "@/components/form/date-picker";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import { PlusIcon, ChevronDownIcon } from "@/icons";

import { type Job, type Resume, Lead, Status } from "@/types";

export const CreateJobPage = () => {
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
    salaryMin: "",
    salaryMax: "",
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
      $resumePosted: ResumeInput
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

  const GET_RESUMES = gql`
    query GetResumes {
      getResumes {
        id
        dateCreated
        version
      }
    }
  `;

  type GetResumesType = {
    getResumes: Resume[];
  };

  const {
    data: getResumesData,
    error: getResumesError,
    loading: getResumesLoading,
  } = useQuery<GetResumesType>(GET_RESUMES);

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
        salaryMin: "",
        salaryMax: "",
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
    if (newJob.salaryMin === "") {
      newJob.salaryMin = 0;
    }
    if (newJob.salaryMax === "") {
      newJob.salaryMax = 0;
    }
    console.log(newJob, "newJob");
    createJob({
      variables: {
        ...newJob,
      },
    });
  };

  const leadOptions = [
    { value: Lead.LINKEDIN as string, label: "LinkedIn" },
    { value: Lead.INDEED as string, label: "Indeed" },
    { value: Lead.GLASSDOOR as string, label: "Glassdoor" },
  ];

  if (getResumesLoading) return <p> Data loading...</p>;

  return (
    <div>
      <div className="grid grid-cols-1 gap-6">
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
                <TextArea
                  value={newJob.description}
                  onChange={(value) =>
                    setNewJob((prev) => ({
                      ...prev,
                      description: value,
                    }))
                  }
                  placeholder="Enter description here"
                  rows={6}
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
                <Label>Resume</Label>
                {getResumesData && getResumesData.getResumes ? (
                  <div className="relative">
                    <Select
                      options={getResumesData.getResumes.map(
                        (resume: Resume) => ({
                          value: resume.id,
                          label: `${resume.dateCreated}-v${resume.version}`,
                        })
                      )}
                      placeholder="Select a resume"
                      value={newJob.resumePosted?.id || ""}
                      onChange={(value: string) => {
                        const selectedResume = getResumesData.getResumes.find(
                          (r) => r.id === value
                        );
                        setNewJob((prev) => ({
                          ...prev,
                          resumePosted: {
                            id: selectedResume ? selectedResume.id : "",
                            content: selectedResume
                              ? selectedResume.content
                              : "",
                            version: selectedResume
                              ? selectedResume.version
                              : 0,
                          } as Resume,
                        }));
                      }}
                      className="dark:bg-dark-900"
                    />
                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                      <ChevronDownIcon />
                    </span>
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
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
                    options={leadOptions}
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
                        salaryMin: e.target.value ? Number(e.target.value) : "",
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
                        salaryMax: e.target.value ? Number(e.target.value) : "",
                      }))
                    }
                    placeholder="Max Salary"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={newJob.isExternalWebsite}
                    onChange={(value) =>
                      setNewJob((prev) => ({
                        ...prev,
                        isExternalWebsite: value,
                      }))
                    }
                  />
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Is redirected to External Website?
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={newJob.withGithubLink}
                    onChange={(value) =>
                      setNewJob((prev) => ({
                        ...prev,
                        withGithubLink: value,
                      }))
                    }
                  />
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Did you send your Github Link?
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={newJob.withLinkedinLink}
                    onChange={(value) =>
                      setNewJob((prev) => ({
                        ...prev,
                        withLinkedinLink: value,
                      }))
                    }
                  />
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Did you send your LinkedIn Link?
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={newJob.withPortfolioLink}
                    onChange={(value) =>
                      setNewJob((prev) => ({
                        ...prev,
                        withPortfolioLink: value,
                      }))
                    }
                  />
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Did you send your Portfolio Link?
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={newJob.withCoverLetter}
                    onChange={(value) =>
                      setNewJob((prev) => ({
                        ...prev,
                        withCoverLetter: value,
                      }))
                    }
                  />
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Did you send a Cover Letter?
                  </span>
                </div>
              </div>

              <div>
                <Label>Reference Link</Label>
                <Input
                  type="text"
                  value={newJob.referenceLink}
                  onChange={(e) =>
                    setNewJob((prev) => ({
                      ...prev,
                      referenceLink: e.target.value,
                    }))
                  }
                  placeholder="Enter reference link here"
                />
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

export default CreateJobPage;
