exports.handler = async (event) => {
  const body = JSON.parse(event.body || "{}");

  const res = await fetch("https://api.your-ai-service.com/...endpoint...", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GEMINI_API_KEY}`
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  };
};
