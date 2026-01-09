import { API } from "@/utils/api";

const getAll = async () => {
  try {
    const response = await fetch(API.BLOG.GET_ALL, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Failed - Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("========= Error Get All Blogs:", error);
    return false;
  }
};

const getBlogById = async (id: string) => {
  try {
    const response = await fetch(`${API.BLOG.GET_BLOG_BY_ID}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`Login failed - Status: ${response.status}`);
      throw new Error(`Get Product Failed - Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("========= Error Get Blog:", error);
    throw error;
  }
};

export const BlogService = {
  getAll,
  getBlogById,
};
