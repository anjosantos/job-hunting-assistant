"use client";

import { useEffect } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import { ChevronDownIcon } from "@/icons";

import { type Resume, type Job, type CoverLetterTemplate } from "@/types";

const GenerateCoverLetterPage = () => {
  const [input, setInput] = useState(``);
  const [resumeContent, setResumeContent] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [coverLetterTemplateContent, setCoverLetterTemplateContent] =
    useState("");

  useEffect(() => {
    setInput(`
      I want to apply to this job:
      ${jobDescription}

      Here is my resume:
      ${resumeContent}

      I want to create a new cover letter and use this a reference/template:
      ${coverLetterTemplateContent}
      `);
  }, [resumeContent, jobDescription]);

  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/generate-cover-letter",
    }),
  });

  const GET_RESUMES = gql`
    query GetResumes {
      getResumes {
        id
        content
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

  const GET_COVER_LETTER_TEMPLATES = gql`
    query GetCoverLetterTemplates {
      getCoverLetterTemplates {
        title
        content
      }
    }
  `;

  type CoverLetterTemplatesType = {
    getCoverLetterTemplates: CoverLetterTemplate[];
  };

  const {
    data: getCoverLetterTemplatesData,
    error: getCoverLetterTemplatesError,
    loading: getCoverLetterTemplatesLoading,
  } = useQuery<CoverLetterTemplatesType>(GET_COVER_LETTER_TEMPLATES);

  const GET_JOBS = gql`
    query GetJobs {
      getJobs {
        role
        description
        company
      }
    }
  `;

  type GetJobsType = {
    getJobs: Job[];
  };

  const {
    data: getJobsData,
    error: getJobsError,
    loading: getJobsLoading,
  } = useQuery<GetJobsType>(GET_JOBS);

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      {messages
        .filter((message) => message.role !== "user")
        .map((message) => (
          <div>
            {message.parts.map((part, index) =>
              part.type === "text" ? <span key={index}>{part.text}</span> : null
            )}
          </div>
        ))}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) {
            sendMessage({ text: input });
            setInput("");
          }
        }}
      >
        <div className="space-y-4">
          <div>
            <Label>Select Job</Label>
            {getJobsData && getJobsData.getJobs ? (
              <div className="relative">
                <Select
                  options={getJobsData.getJobs.map((job: Job) => ({
                    value: job.description,
                    label: `${job.company} - ${job.role}`,
                  }))}
                  placeholder="Select a job"
                  value={jobDescription || ""}
                  onChange={(value: string) => {
                    setJobDescription(value);
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
            <Label>Select Resume</Label>
            {getResumesData && getResumesData.getResumes ? (
              <div className="relative">
                <Select
                  options={getResumesData.getResumes.map((resume: Resume) => ({
                    value: resume.content,
                    label: `${resume.dateCreated}-v${resume.version}`,
                  }))}
                  placeholder="Select a resume"
                  value={resumeContent || ""}
                  onChange={(value: string) => {
                    setResumeContent(value);
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
            <Label>Select Cover Letter Template</Label>
            {getCoverLetterTemplatesData &&
            getCoverLetterTemplatesData.getCoverLetterTemplates ? (
              <div className="relative">
                <Select
                  options={getCoverLetterTemplatesData.getCoverLetterTemplates.map(
                    (coverLetterTemplate: CoverLetterTemplate) => ({
                      value: coverLetterTemplate.content,
                      label: coverLetterTemplate.title,
                    })
                  )}
                  placeholder="Select a cover letter template"
                  value={coverLetterTemplateContent || ""}
                  onChange={(value: string) => {
                    setCoverLetterTemplateContent(value);
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

          <div className="flex justify-end">
            <Button size="sm" variant="primary" type="submit">
              Generate
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GenerateCoverLetterPage;
