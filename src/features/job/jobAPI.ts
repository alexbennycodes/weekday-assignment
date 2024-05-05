const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const body = JSON.stringify({ limit: 10, offset: 0 });

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body,
};

export const fetchJobs = async () => {
  try {
    const res = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    );

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};
