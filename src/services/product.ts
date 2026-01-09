import { API } from "@/utils/api";

const getAll = async () => {
  try {
    const response = await fetch(API.PRODUCT.GET_ALL, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Failed - Status: ${response.status}`);
    }
    const data = await response.json();
    let tmp: any = [];
    data.data?.forEach((item: any) => {
      if (!item?.deleted_at) {
        tmp.push(item);
      }
    });
    return { data: tmp };
  } catch (error: any) {
    console.error("========= Error Get All Products:", error);
    return false;
  }
};

const getProductById = async (id: string) => {
  try {
    const response = await fetch(`${API.PRODUCT.GET_PRODUCT_BY_ID}/${id}`, {
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
    console.error("========= Error Get Account:", error);
    throw error;
  }
};

export const ProductService = {
  getAll,
  getProductById,
};
