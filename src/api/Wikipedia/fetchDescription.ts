// services/fetchDescription.ts
export async function fetchDescription(query: string): Promise<string | null> {
  // "origin=*" helps bypass CORS in MediaWiki
  const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&format=json&origin=*&titles=${encodeURIComponent(
    query
  )}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error("Wikipedia fetch error:", response.statusText);
      return null;
    }

    const data = await response.json();
    const pages = data?.query?.pages;
    if (!pages) return null;

    // The keys in 'pages' are page IDs. Grab the first page ID:
    const pageId = Object.keys(pages)[0];
    if (!pageId) return null;

    const extract = pages[pageId]?.extract;
    if (!extract) return null;

    // Return the first 500 characters or the entire thing
    return extract.substring(0, 500);
  } catch (error) {
    console.error("Error fetching description:", error);
    return null;
  }
}
