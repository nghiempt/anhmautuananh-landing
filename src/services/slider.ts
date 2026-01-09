import { API } from "@/utils/api";

const getAll = async () => {
  try {
    const response = await fetch(API.SLIDER.GET_ALL_SLIDER, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Failed - Status: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error: any) {
    console.error("========= Error Get All Slider:", error);
    return false;
  }
};

export const SliderService = {
  getAll,
};
