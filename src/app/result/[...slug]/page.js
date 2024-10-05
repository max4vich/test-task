import { notFound } from 'next/navigation'

const VehicleModels = async ({ params }) => {
    const slug = params.slug;
    const makeId =params. slug[0];
    const year = params.slug[1];
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );


  const data = await response.json();
  const models = data.Results || []

    if (!models.length) {
        notFound()
    }

  return (
    <div className="p-4">
      <ul className="mt-4 space-y-2">
        {models.length > 0 ? (
          models.map((model) => (
            <li key={model.Model_Id} className="border p-2 rounded-md shadow">
              {model.Model_Name}
            </li>
          ))
        ) : (
          <li className="text-gray-500">No models found.</li>
        )}
      </ul>
    </div>
  );
};

export default VehicleModels;
