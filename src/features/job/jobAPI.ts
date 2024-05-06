export const fetchJobs = async (offset: number) => {
  try {
    const body = JSON.stringify({ limit: 12, offset });

    const response = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch jobs: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};
