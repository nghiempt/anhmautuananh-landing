import { API } from "@/utils/api";

const getAll = async () => {
  try {
    const response = await fetch(API.ACCOUNT.GET_ALL, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Failed - Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("========= Error Get All Accounts:", error);
    return false;
  }
};

const updateAccount = async (id: any, payload: any) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch(`${API.ACCOUNT.UPDATE}/${id}`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: "follow",
    });
    if (!response.ok) {
      throw new Error(`Failed - Status: ${response.status}`);
    }

    return true;
  } catch (error: any) {
    console.error("========= Error Update Account:", error);
    return false;
  }
};

const changePassword = async (id: any, payload: any) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch(`${API.ACCOUNT.CHANGE_PASSWORD}/${id}`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: "follow",
    });
    if (!response.ok) {
      throw new Error(`Failed - Status: ${response.status}`);
    }

    return true;
  } catch (error: any) {
    console.error("========= Error Update Account:", error);
    return false;
  }
};

const loginAccountEmail = async (email: string, password: string) => {
  try {
    const response = await fetch(API.AUTH.LOGIN_MANUAL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    //   if (!response.ok) {
    //     console.error(
    //       `Login failed - Status: ${response.status}`,
    //       JSON.stringify({ email, password })
    //     );
    //     throw new Error(`Đăng nhập thất bại - Status: ${response.status}`);
    //   }

    //   const data = await response.json();
    //   return data;
    // } catch (error) {
    //   console.error("========= Error Login:", error);
    //   throw error;
    // }

    // Parse response body trước, kể cả khi không ok
    const data = await response.json();

    // Nếu có message từ server, trả về data để xử lý ở component
    if (!response.ok) {
      console.error(
        `Login failed - Status: ${response.status}`,
        JSON.stringify({ email, password })
      );
      // Trả về data thay vì throw error để có thể check message
      return data;
    }

    return data;
  } catch (error) {
    console.error("========= Error Login:", error);
    throw error;
  }
};

const loginAccountPhone = async (phone: string, password: string) => {
  try {
    const response = await fetch(API.AUTH.LOGIN_MANUAL_PHONE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, password }),
    });

    //   if (!response.ok) {
    //     console.error(
    //       `Login failed - Status: ${response.status}`,
    //       JSON.stringify({ phone, password })
    //     );
    //     throw new Error(`Đăng nhập thất bại - Status: ${response.status}`);
    //   }

    //   const data = await response.json();
    //   return data;
    // } catch (error) {
    //   console.error("========= Error Login:", error);
    //   throw error;
    // }
    // Parse response body trước, kể cả khi không ok
    const data = await response.json();

    // Nếu có message từ server, trả về data để xử lý ở component
    if (!response.ok) {
      console.error(
        `Login failed - Status: ${response.status}`,
        JSON.stringify({ phone, password })
      );
      // Trả về data thay vì throw error để có thể check message
      return data;
    }

    return data;
  } catch (error) {
    console.error("========= Error Login:", error);
    throw error;
  }
};

const getAccountById = async (id: string) => {
  try {
    const response = await fetch(`${API.ACCOUNT.GET_ACCOUNT_BY_ID}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`Login failed - Status: ${response.status}`);
      throw new Error(`Get Account Failed - Status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("========= Error Get Account:", error);
    throw error;
  }
};

export const AccountService = {
  getAll,
  updateAccount,
  loginAccountEmail,
  getAccountById,
  loginAccountPhone,
  changePassword,
};
