interface FetcherConfig {
  url: string
  args: any
}

export const quizFetcher = async (config: FetcherConfig) => {
  const { url, args } = config

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  }

  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText)
    }
    return await response.json() // Parse JSON response body
  } catch (error) {
    throw new Error("Failed to fetch data: " + error)
  }
}
