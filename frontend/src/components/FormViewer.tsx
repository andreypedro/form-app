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

  const handleChange = (question: string, value: string) => {
    setAnswers({ ...answers, [question]: value });
  };

  const handleSubmit = async () => {
    console.log("Submitted Answers:", answers);

    if (!id) {
      alert("Form ID is missing.");
      return;
    }

    // Verifica se há respostas antes de enviar
    if (Object.keys(answers).length === 0) {
      alert("Please fill out the form before submitting.");
      return;
    }

    try {
      const response = await submitFormAnswers(id, { answers });
      console.log("Form submitted successfully:", response.data);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert("Failed to submit the form. Please try again.");
    }
  };

  const fieldArray = Object.values(fields);

  return (
    <div className="space-y-6">
      {fieldArray.map((field, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            {field.question}
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
