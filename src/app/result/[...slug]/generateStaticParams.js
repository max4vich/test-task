export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/GetMakesForVehicleType/car?format=json`,
  );
  const data = await response.json();

  const paths = [];

  if (Array.isArray(data.Results)) {
    for (const make of data.Results) {
      for (let year = 2015; year <= 2024; year++) {
        paths.push({
          slug: [make.MakeId.toString(), year.toString()],
        });
      }
    }
  }

  return paths;
}
