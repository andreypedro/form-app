import FormBuilder from "../components/FormBuilder";

export default function CreateFormPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">
        Create a New Form
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <FormBuilder />
      </div>
    </div>
  );
}
