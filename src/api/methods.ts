export const fetchData = async <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch jobs: ${response.statusText}`);
  }
  return response.json();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const post = async <T>(url: string, body: any): Promise<T> =>
  await fetchData<T>(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
