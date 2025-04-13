import { useEffect, useState } from "react";
import { getAllForms } from "../services/api";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = (await getAllForms()) as any;
        setForms(response.data.data);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };

    fetchForms();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Welcome to the Form Builder</h1>
      <p className="mb-4">
        This is a simple form builder application. You can create, view, and
        manage your forms.
      </p>
      <p>Select a form bellow to answer.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        {forms.map((form: any) => (
          <Link to={`/form/${form.id}`} key={form.id} className="no-underline">
            <div key={form.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">{form.name}</h2>
              <p>Click to fill out the questions.</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
