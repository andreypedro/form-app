import React, { useState } from "react";
import api, { createForm } from "../services/api";

interface Field {
  type: string;
  question: string;
  required: boolean;
}

export default function FormBuilder() {
  const [fields, setFields] = useState<Field[]>([]);
  const [formName, setFormName] = useState("");
  const [status, setStatus] = useState<string>("typing");

  const addField = () => {
    setFields([...fields, { type: "text", question: "", required: false }]);
  };

  const handleFieldChange = <K extends keyof Field>(
    index: number,
    key: K,
    value: Field[K]
  ) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
  };

  const handleSubmit = async () => {
    const formattedFields = fields.reduce((acc, field, index) => {
      acc[`field-${index + 1}`] = field;
      return acc;
    }, {} as Record<string, Field>);

    const formData = { name: formName, fields: [formattedFields] };

    try {
      const response = await createForm(formData);

      if (response.status === 200) {
        setStatus("sent");
      }
    } catch (error) {
      console.error("Error saving form:", error);
      alert("Failed to save the form. Please try again.");
    }
  };

  if (status === "sent") {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">
          Form was created successfully!
        </h2>
        <p>Your form has been saved.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <input
        type="text"
        placeholder="Form Name"
        value={formName}
        onChange={(e) => setFormName(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className=" bg-gray-50 p-4 rounded-lg shadow-md">
        {fields.map((field, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center gap-4 mb-4"
          >
            <input
              type="text"
              placeholder="Question"
              value={field.question}
              onChange={(e) =>
                handleFieldChange(index, "question", e.target.value)
              }
              className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={field.type}
              onChange={(e) => handleFieldChange(index, "type", e.target.value)}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="text">Text</option>
              <option value="textarea">Textarea</option>
              <option value="date">Date</option>
            </select>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={field.required}
                onChange={(e) =>
                  handleFieldChange(index, "required", e.target.checked)
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-gray-700">Required</span>
            </label>
          </div>
        ))}
        <div className="text-center gap-4">
          <button
            onClick={addField}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Add Field
          </button>
        </div>
      </div>

      <div className="text-center gap-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Save Form
        </button>
      </div>
    </div>
  );
}
