export const fetchItems = async () => {
  try {
    const response = await fetch("/api/items");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};
