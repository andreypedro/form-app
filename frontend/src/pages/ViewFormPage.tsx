import { useEffect, useState } from "react";
import { getFormById } from "../services/api";
import { useParams } from "react-router-dom";
import FormViewer from "../components/FormViewer";

interface Field {
  type: string;
  question: string;
  required: boolean;
}

export default function ViewFormPage() {
  const { id } = useParams<{ id: string }>();
  const [formName, setFormName] = useState<string>("");
  const [fields, setFields] = useState<Field[]>([]);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        if (!id) {
          return;
        }
        const response = await getFormById(id);

        if (response.status !== 200) {
          throw new Error("Failed to fetch form");
        }

        const data = response.data as any;

        console.log(data.data);
        setFormName(data.data.name);
        setFields(data.data.fields);
      } catch (error) {
        console.error("Error fetching form:", error);
      }
    };

    fetchForm();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">
        {formName}
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <FormViewer name={formName} fields={fields} />
      </div>
    </div>
  );
}
