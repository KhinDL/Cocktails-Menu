// services/fetchCommonsImages.ts
export async function fetchCommonsImages(
  query: string,
  limit = 10
): Promise<string[]> {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
    query
  )}&gsrnamespace=6&gsrlimit=${limit}&prop=imageinfo&iiprop=url&format=json&origin=*`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(
        "Error fetching from Wikimedia Commons:",
        response.statusText
      );
      return [];
    }

    const data = await response.json();
    const pages = data?.query?.pages;
    if (!pages) {
      return [];
    }

    // Each page has an array 'imageinfo' with at least one object containing 'url'
    const imageUrls: string[] = Object.values(pages)
      .map((page: any) => {
        const imageInfo = page.imageinfo?.[0];
        return imageInfo?.url;
      })
      .filter(Boolean) as string[];

    return imageUrls;
  } catch (error) {
    console.error("Error fetching Commons images:", error);
    return [];
  }
}
