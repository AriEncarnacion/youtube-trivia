export async function postMethod(apiUrl: string, args: any): Promise<any> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${apiUrl}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(args),
  })

  return response.json()
}

export async function getMethod(apiUrl: string): Promise<any> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${apiUrl}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  })

  return response.json()
}

interface FetcherConfig {
  url: string
  args: any
}

export const postFetcher = async (config: FetcherConfig) => {
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
    return await response.json()
  } catch (error) {
    throw new Error("Failed to fetch data: " + error)
  }
}
