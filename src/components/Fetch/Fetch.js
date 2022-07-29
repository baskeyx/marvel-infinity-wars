const Fetch = async (url, params) => {
  const request = await fetch(url, params)
    .then(async (response) => {
      if (response.status) return { status: response.ok, payload: await response.json() };
      throw new Error(response);
    })
    .catch((error) => ({ status: false, payload: error }));
  return request;
};

export default Fetch;
