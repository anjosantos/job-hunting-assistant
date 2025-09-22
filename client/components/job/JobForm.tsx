"use client";

import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { useState, useEffect } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Checkbox from "@/components/form/input/Checkbox";
import TextArea from "@/components/form/input/TextArea";
import DatePicker from "@/components/form/date-picker";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import Alert from "@/components/ui/alert/Alert";
import { PlusIcon, ChevronDownIcon } from "@/icons";

import { type Job, type Resume, Lead, Status } from "@/types";
import { removeTypename } from "@/utils/helpers";

export type JobFormMode = "create" | "edit" | "view";

interface JobFormProps {
  mode: JobFormMode;
  initialJob?: Job;
  onSuccess?: () => void;
  jobId?: string;
}

const GET_RESUMES = gql`
  query GetResumes {
    getResumes {
      id
      dateCreated
      version
      content
    }
  }
`;

const UPDATE_JOB = gql`
  mutation UpdateJob(
    $id: ID!
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
    updateJob(
      input: {
        id: $id
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

export default function JobForm({
  mode,
  initialJob,
  onSuccess,
  jobId,
}: JobFormProps) {
  const [job, setJob] = useState<Job>(
    initialJob || {
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
    }
  );
  const [isSuccess, setIsSuccess] = useState(false);
  type JobErrors = {
    role: string;
    description: string;
    company: string;
    location: string;
    resumePosted: string;
    dateCreated: string;
    lead: string;
  };

  const [jobErrors, setJobErrors] = useState<JobErrors>({
    role: "",
    description: "",
    company: "",
    location: "",
    resumePosted: "",
    dateCreated: "",
    lead: "",
  });

  const { data: getResumesData, loading: getResumesLoading } = useQuery<{
    getResumes: Resume[];
  }>(GET_RESUMES);
  const [createJob, { loading: createJobLoading }] = useMutation(CREATE_JOB, {
    onCompleted: () => {
      setJob({
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
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);

      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });
  const [updateJob, { loading: updateJobLoading }] = useMutation(UPDATE_JOB, {
    onCompleted: () => {
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
      if (onSuccess) onSuccess();

      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    onError: (error) => console.error("Update error:", error),
  });

  useEffect(() => {
    if (initialJob) setJob(initialJob);
  }, [initialJob]);

  const validateJob = (job: Job): boolean => {
    let isValid = true;
    const errors: any = {};
    if (!job.role || job.role.trim() === "") {
      errors.role = "Role is required.";
      isValid = false;
    }
    if (!job.description || job.description.trim() === "") {
      errors.description = "Description is required.";
      isValid = false;
    }
    if (!job.company || job.company.trim() === "") {
      errors.company = "Company is required.";
      isValid = false;
    }
    if (!job.location || job.location.trim() === "") {
      errors.location = "Location is required.";
      isValid = false;
    }
    if (!job.resumePosted) {
      errors.resumePosted = "Resume is required.";
      isValid = false;
    }
    if (!job.dateCreated || job.dateCreated.trim() === "") {
      errors.dateCreated = "Date Created is required.";
      isValid = false;
    }
    if (!job.lead || job.lead.trim() === "") {
      errors.lead = "Lead source is required.";
      isValid = false;
    }
    setJobErrors(errors);
    return isValid;
  };

  const handleSubmit = () => {
    if (job.salaryMin === "") {
      job.salaryMin = 0;
    }
    if (job.salaryMax === "") {
      job.salaryMax = 0;
    }
    if (!validateJob(job)) return;

    console.log(job);
    if (mode === "create") {
      createJob({
        variables: {
          ...job,
        },
      });
    } else if (mode === "edit" && jobId) {
      const newJob = removeTypename(job);
      updateJob({
        variables: {
          ...newJob,
        },
      });
    }
  };

  const leadOptions = [
    { value: Lead.LINKEDIN as string, label: "LinkedIn" },
    { value: Lead.INDEED as string, label: "Indeed" },
    { value: Lead.GLASSDOOR as string, label: "Glassdoor" },
  ];

  if (getResumesLoading) return <p>Data loading...</p>;

  const isReadOnly = mode === "view";

  return (
    <div>
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-6">
          {isSuccess && (
            <Alert
              variant="success"
              title="Success!"
              message={
                mode === "create"
                  ? "The job has been created and added to your job list."
                  : "The job has been updated."
              }
              showLink={false}
            />
          )}
          <ComponentCard
            title={
              mode === "create"
                ? "Create Job"
                : mode === "edit"
                ? "Edit Job"
                : "View Job"
            }
          >
            <div className="space-y-6">
              <div>
                <Label>Role</Label>
                <Input
                  type="text"
                  value={job.role}
                  onChange={(e) =>
                    setJob((prev) => ({ ...prev, role: e.target.value }))
                  }
                  placeholder="Enter role here"
                  hint={jobErrors.role}
                  error={!!jobErrors.role}
                  disabled={isReadOnly}
                />
              </div>
              <div>
                <Label>Description</Label>
                <TextArea
                  value={job.description}
                  onChange={(value) =>
                    setJob((prev) => ({ ...prev, description: value }))
                  }
                  placeholder="Enter description here"
                  rows={6}
                  hint={jobErrors.description}
                  error={!!jobErrors.description}
                  disabled={isReadOnly}
                />
              </div>
              <div>
                <Label>Company</Label>
                <Input
                  type="text"
                  value={job.company}
                  onChange={(e) =>
                    setJob((prev) => ({ ...prev, company: e.target.value }))
                  }
                  placeholder="Enter company here"
                  hint={jobErrors.company}
                  error={!!jobErrors.company}
                  disabled={isReadOnly}
                />
              </div>
              <div>
                <Label>Resume</Label>
                {getResumesData && getResumesData.getResumes ? (
                  <div className="relative">
                    <Select
                      id="select-resume"
                      options={getResumesData.getResumes.map(
                        (resume: Resume) => ({
                          value: resume.id,
                          label: `${resume.dateCreated}-v${resume.version}`,
                        })
                      )}
                      placeholder="Select a resume"
                      value={job.resumePosted?.id || ""}
                      onChange={(value: string) => {
                        const selectedResume = getResumesData.getResumes.find(
                          (r) => r.id === value
                        );
                        setJob((prev) => ({
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
                      error={!!jobErrors.resumePosted}
                      hint={jobErrors.resumePosted}
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
                  value={job.location}
                  onChange={(e) =>
                    setJob((prev) => ({ ...prev, location: e.target.value }))
                  }
                  placeholder="Enter location here"
                  hint={jobErrors.location}
                  error={!!jobErrors.location}
                  disabled={isReadOnly}
                />
              </div>
              <div>
                <DatePicker
                  id="date-picker-date-created"
                  label="Date Created"
                  placeholder="Select a date"
                  value={job.dateCreated}
                  onChange={(dates, currentDateString) => {
                    setJob((prev) => ({
                      ...prev,
                      dateCreated: currentDateString,
                    }));
                  }}
                  error={!!jobErrors.dateCreated}
                  hint={jobErrors.dateCreated}
                  // @ts-ignore
                  disabled={isReadOnly}
                />
              </div>
              <div>
                <Label>Lead</Label>
                <div className="relative">
                  <Select
                    options={leadOptions}
                    placeholder="Select an option"
                    value={job.lead as string}
                    onChange={(value: string) => {
                      setJob((prev) => ({ ...prev, lead: value as Lead }));
                    }}
                    className="dark:bg-dark-900"
                    error={!!jobErrors.lead}
                    hint={jobErrors.lead}
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
                    value={job.salaryMin}
                    onChange={(e) =>
                      setJob((prev) => ({
                        ...prev,
                        salaryMin: e.target.value ? Number(e.target.value) : "",
                      }))
                    }
                    placeholder="Min Salary"
                    disabled={isReadOnly}
                  />
                </div>
                <div>
                  <Label>Salary Max</Label>
                  <Input
                    type="number"
                    value={job.salaryMax}
                    onChange={(e) =>
                      setJob((prev) => ({
                        ...prev,
                        salaryMax: e.target.value ? Number(e.target.value) : "",
                      }))
                    }
                    placeholder="Max Salary"
                    disabled={isReadOnly}
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={job.isExternalWebsite}
                    onChange={(value) =>
                      setJob((prev) => ({ ...prev, isExternalWebsite: value }))
                    }
                    disabled={isReadOnly}
                  />
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Is redirected to External Website?
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={job.withGithubLink}
                    onChange={(value) =>
                      setJob((prev) => ({ ...prev, withGithubLink: value }))
                    }
                    disabled={isReadOnly}
                  />
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Did you send your Github Link?
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={job.withLinkedinLink}
                    onChange={(value) =>
                      setJob((prev) => ({ ...prev, withLinkedinLink: value }))
                    }
                    disabled={isReadOnly}
                  />
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Did you send your LinkedIn Link?
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={job.withPortfolioLink}
                    onChange={(value) =>
                      setJob((prev) => ({ ...prev, withPortfolioLink: value }))
                    }
                    disabled={isReadOnly}
                  />
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Did you send your Portfolio Link?
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={job.withCoverLetter}
                    onChange={(value) =>
                      setJob((prev) => ({ ...prev, withCoverLetter: value }))
                    }
                    disabled={isReadOnly}
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
                  value={job.referenceLink}
                  onChange={(e) =>
                    setJob((prev) => ({
                      ...prev,
                      referenceLink: e.target.value,
                    }))
                  }
                  placeholder="Enter reference link here"
                  disabled={isReadOnly}
                />
              </div>
              {mode !== "view" && (
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    variant="primary"
                    startIcon={mode === "create" ? <PlusIcon /> : undefined}
                    onClick={handleSubmit}
                    disabled={createJobLoading || updateJobLoading}
                  >
                    {mode === "create"
                      ? createJobLoading
                        ? "Creating..."
                        : "Create"
                      : updateJobLoading
                      ? "Updating..."
                      : "Update"}
                  </Button>
                </div>
              )}
            </div>
          </ComponentCard>
        </div>
      </div>
    </div>
  );
}
