import React from "react";

import { useAppContext } from "#utils/appContext";
import { CONFIG, STATUS } from "#utils/constants";

const useFetch = () => {
  const [response, setResponse] = React.useState(null);
  const { dispatch } = useAppContext();

  const resolvePromise = ({ json, error }) => {
    if (json) setResponse(json);
    window.setTimeout(
      () =>
        dispatch({
          status: typeof error === "undefined" ? STATUS.complete : STATUS.error,
        }),
      CONFIG.fetchDelay,
    );
  };

  const doFetch = (...fetches) => {
    if (!fetches.length) return;
    dispatch({ status: STATUS.loading });
    const promises = fetches.map((f) => getFetch(f));
    if (promises.length > 1) {
      Promise.all(promises)
        .then((json) => resolvePromise({ json }))
        .catch((error) => resolvePromise({ error }));
    } else {
      promises[0]
        .then((json) => resolvePromise({ json }))
        .catch((error) => resolvePromise({ error }));
    }
  };
  return { response, doFetch };
};

const getFetch = (fetchObj) =>
  fetch(fetchObj.url, fetchObj.options).then((response) => {
    if (response.ok) return response.json();
    throw response;
  });

const createReq = (url, method, param) => ({
  url:
    method === "GET"
      ? `${url}${param ? "?" + new URLSearchParams(param) : ""}`
      : url,
  options: {
    method,
    body: method === "GET" ? null : JSON.stringify(param),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  },
});

//The GET method requests a representation of the specified resource. Requests using GET should only retrieve data
const getReq = (url, param) => createReq(url, "GET", param);
//The POST method submits an entity to the specified resource, often causing a change in state or side effects on the server
const postReq = (url, param) => createReq(url, "POST", param);
//The PUT method replaces all current representations of the target resource with the request payload
const putReq = (url, param) => createReq(url, "PUT", param);
//The PATCH method applies partial modifications to a resource
const patchReq = (url, param) => createReq(url, "PATCH", param);
//The DELETE method deletes the specified resource
const deleteReq = (url, param) => createReq(url, "DELETE", param);

export default useFetch;
export { getReq, postReq, putReq, patchReq, deleteReq };
