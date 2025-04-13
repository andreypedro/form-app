import { useState } from "react";
import { useParams } from "react-router-dom";
import { submitFormAnswers } from "../services/api";

interface Field {
  type: string;
  question: string;
  required: boolean;
}

interface FormViewerProps {
  name: string;
  fields: Field[];
}

export default function FormViewer({ name, fields }: FormViewerProps) {
  const { id } = useParams<{ id: string }>();
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<string>("typing");

  const handleChange = (question: string, value: string) => {
    setAnswers({ ...answers, [question]: value });
  };

  const handleSubmit = async () => {
    if (!id) {
      alert("Form ID is missing.");
      return;
    }

    const missingFields = fieldArray
      .filter((field) => field.required && !answers[field.question])
      .map((field) => field.question);

    if (missingFields.length > 0) {
      alert(`Please fill out the required fields: ${missingFields.join(", ")}`);
      return;
    }

    try {
      const response = await submitFormAnswers(id, { answers });

      if (response.status === 200) {
        setStatus("sent");
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to submit the form. Please try again.";
      console.error("Error submitting answers:", errorMessage);
    }
  };

  if (status === "sent") {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">
          Thank you for your submission!
        </h2>
        <p>Your answers have been submitted successfully.</p>
      </div>
    );
  }

  const fieldArray = fields.flatMap((fieldObj) =>
    Object.entries(fieldObj).map(([key, field]) => ({
      key,
      ...field,
    }))
  );

  return (
    <div className="space-y-6">
      {fieldArray.map((field, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            {field.question}{" "}
            {field.required && <span className="text-red-500">*</span>}
          </label>
          {field.type === "text" && (
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleChange(field.question, e.target.value)}
            />
          )}
          {field.type === "textarea" && (
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleChange(field.question, e.target.value)}
            />
          )}
          {field.type === "datetime" && (
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleChange(field.question, e.target.value)}
            />
          )}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Submit
      </button>
    </div>
  );
}
