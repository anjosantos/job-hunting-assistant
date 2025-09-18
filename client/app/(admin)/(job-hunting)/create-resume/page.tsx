"use client";

import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import TextArea from "@/components/form/input/TextArea";
import DatePicker from "@/components/form/date-picker";
import Button from "@/components/ui/button/Button";
import Alert from "@/components/ui/alert/Alert";
import { PlusIcon } from "@/icons";

import { type Resume } from "@/types";

export const CreateResumePage = () => {
  const [newResume, setNewResume] = useState<Resume>({
    id: "",
    content: "",
    dateCreated: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);

  type ResumeErrors = {
    content: string;
    dateCreated: string;
  };

  const [resumeErrors, setResumeErrors] = useState<ResumeErrors>({
    content: "",
    dateCreated: "",
  });

  const CREATE_RESUME = gql`
    mutation CreateResume($content: String!, $dateCreated: String!) {
      createResume(input: { content: $content, dateCreated: $dateCreated }) {
        id
      }
    }
  `;

  const [createResume, { loading }] = useMutation(CREATE_RESUME, {
    onCompleted: () => {
      setNewResume({
        id: "",
        content: "",
        dateCreated: "",
      });
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);

      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  });

  const validateResume = (newResume: Resume) => {
    let isValid = true;
    const errors: ResumeErrors = {
      content: "",
      dateCreated: "",
    };

    if (!newResume.content || newResume.content.trim() === "") {
      errors.content = "Content is required.";
      isValid = false;
    }

    if (!newResume.dateCreated || newResume.dateCreated.trim() === "") {
      errors.dateCreated = "Date Created is required.";
      isValid = false;
    }

    setResumeErrors(errors);
    return isValid;
  };

  const handleCreateResume = () => {
    if (!validateResume(newResume)) {
      return;
    }

    createResume({
      variables: {
        content: newResume.content,
        dateCreated: newResume.dateCreated,
      },
    });
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-6">
          {isSuccess && (
            <Alert
              variant="success"
              title="Success!"
              message="The resume has been created and added to your resume list."
              showLink={false}
            />
          )}
          <ComponentCard title="Create Resume">
            <div className="space-y-6">
              <div>
                <Label>Content</Label>
                <TextArea
                  value={newResume.content}
                  onChange={(value) =>
                    setNewResume((prev) => ({
                      ...prev,
                      content: value,
                    }))
                  }
                  placeholder="Enter resume content"
                  rows={20}
                  error={resumeErrors.content !== ""}
                  hint={resumeErrors.content}
                />
              </div>
              <div>
                <DatePicker
                  id="date-picker-date-created"
                  label="Date Created"
                  placeholder="Select a date"
                  value={newResume.dateCreated}
                  onChange={(dates, currentDateString) => {
                    setNewResume((prev) => ({
                      ...prev,
                      dateCreated: currentDateString,
                    }));
                  }}
                  error={resumeErrors.dateCreated !== ""}
                  hint={resumeErrors.dateCreated}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  size="sm"
                  variant="primary"
                  startIcon={<PlusIcon />}
                  onClick={handleCreateResume}
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

export default CreateResumePage;
