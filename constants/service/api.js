import callApi from "./config";

export const getListUsers = async (page) => {
  const url = `https://reqres.in/api/users?page=${page}`;
  return callApi({
    url,
    method: "GET",
  });
};

export const editUserData = async ({ data, payload }) => {
  const url = `https://reqres.in/api/users/${data.id}`;
  return callApi({
    url,
    method: "PUT",
    body: JSON.stringify(payload),
  });
};

export const deleteUserData = async ({ data }) => {
  const url = `https://reqres.in/api/users/${data.id}`;
  return callApi({
    url,
    method: "DELETE",
  });
};

export const createNewUser = async ({ payload }) => {
  const url = `https://reqres.in/api/users`;
  return callApi({
    url,
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const getChartData = async () => {
  const response = await fetch(
    `https://gold-price-live.p.rapidapi.com/get_metal_prices`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "gold-price-live.p.rapidapi.com",
        "x-rapidapi-key": "d248379d4amsh2de36214966a452p1dfea5jsn84c10a03b94d",
      },
    }
  );
  return response.json();
};
