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

  const handleCreateCoverLetterTemplate = () => {
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
