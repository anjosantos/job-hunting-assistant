"use client";

import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import TextArea from "@/components/form/input/TextArea";
import Input from "@/components/form/input/InputField";
import DatePicker from "@/components/form/date-picker";
import Button from "@/components/ui/button/Button";
import Alert from "@/components/ui/alert/Alert";
import { PlusIcon } from "@/icons";

import { type CoverLetterTemplate } from "@/types";

export const CreateCoverLetterTemplatePage = () => {
  const [newCoverLetterTemplate, setNewCoverLetterTemplate] =
    useState<CoverLetterTemplate>({
      id: "",
      title: "",
      content: "",
      dateCreated: "",
    });
  const [isSuccess, setIsSuccess] = useState(false);
  const [coverLetterTemplateErrors, setCoverLetterTemplateErrors] = useState({
    title: "",
    content: "",
    dateCreated: "",
  });

  const CREATE_CoverLetterTemplate = gql`
    mutation CreateCoverLetterTemplate(
      $title: String!
      $content: String!
      $dateCreated: String!
    ) {
      createCoverLetterTemplate(
        input: { title: $title, content: $content, dateCreated: $dateCreated }
      ) {
        id
      }
    }
  `;

  const [createCoverLetterTemplate, { loading }] = useMutation(
    CREATE_CoverLetterTemplate,
    {
      onCompleted: () => {
        setNewCoverLetterTemplate({
          id: "",
          title: "",
          content: "",
          dateCreated: "",
        });
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);

        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    }
  );

  const validateCoverLetterTemplate = (
    newCoverLetterTemplate: CoverLetterTemplate
  ) => {
    let isValid = true;
    const errors = {
      title: "",
      content: "",
      dateCreated: "",
    };

    if (!newCoverLetterTemplate.title.trim()) {
      errors.title = "Title is required.";
      isValid = false;
    }

    if (!newCoverLetterTemplate.content.trim()) {
      errors.content = "Content is required.";
      isValid = false;
    }

    if (!newCoverLetterTemplate.dateCreated.trim()) {
      errors.dateCreated = "Date Created is required.";
      isValid = false;
    }

    setCoverLetterTemplateErrors(errors);
    return isValid;
  };

  const handleCreateCoverLetterTemplate = () => {
    if (!validateCoverLetterTemplate(newCoverLetterTemplate)) {
      return;
    }

    createCoverLetterTemplate({
      variables: {
        title: newCoverLetterTemplate.title,
        content: newCoverLetterTemplate.content,
        dateCreated: newCoverLetterTemplate.dateCreated,
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
              message="The cover letter template has been created and added to your template list."
              showLink={false}
            />
          )}
          <ComponentCard title="Create CoverLetterTemplate">
            <div className="space-y-6">
              <div>
                <Label>Title</Label>
                <Input
                  type="text"
                  value={newCoverLetterTemplate.title}
                  onChange={(e) =>
                    setNewCoverLetterTemplate((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  placeholder="Enter title here"
                  error={coverLetterTemplateErrors.title !== ""}
                  hint={coverLetterTemplateErrors.title}
                />
              </div>
              <div>
                <Label>Content</Label>
                <TextArea
                  value={newCoverLetterTemplate.content}
                  onChange={(value) =>
                    setNewCoverLetterTemplate((prev) => ({
                      ...prev,
                      content: value,
                    }))
                  }
                  placeholder="Enter CoverLetterTemplate content"
                  rows={20}
                  error={coverLetterTemplateErrors.content !== ""}
                  hint={coverLetterTemplateErrors.content}
                />
              </div>
              <div>
                <DatePicker
                  id="date-picker-date-created"
                  label="Date Created"
                  placeholder="Select a date"
                  value={newCoverLetterTemplate.dateCreated}
                  onChange={(dates, currentDateString) => {
                    setNewCoverLetterTemplate((prev) => ({
                      ...prev,
                      dateCreated: currentDateString,
                    }));
                  }}
                  error={coverLetterTemplateErrors.dateCreated !== ""}
                  hint={coverLetterTemplateErrors.dateCreated}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  size="sm"
                  variant="primary"
                  startIcon={<PlusIcon />}
                  onClick={handleCreateCoverLetterTemplate}
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

export default CreateCoverLetterTemplatePage;
