import React from "react";

import ListView from "#components/ListView";
import { useAppContext } from "#utils/appContext";
import { STATUS } from "#utils/constants";
import useFetch, { getReq, postReq, putReq, deleteReq } from "#utils/useFetch";

const DataManager = ({ entityName, fields, maxItems, offsetBottom }) => {
  const {
    appContext: { status },
  } = useAppContext();
  const { response: responseGet, doFetch: doGet } = useFetch();
  const { response: responsePut, doFetch: doPut } = useFetch();
  const { response: responsePost, doFetch: doPost } = useFetch();
  const { response: responseDelete, doFetch: doDelete } = useFetch();
  const [data, setData] = React.useState(responseGet);

  React.useEffect(() => {
    doGet(getReq(`/api/${entityName}/get`, { sort: fields.sort }));
  }, [responsePost, responsePut, responseDelete]);
  React.useEffect(() => {
    if (responseGet) setData([...responseGet]);
  }, [responseGet]);

  const handleNew = (data) => doPost(postReq(`/api/${entityName}/add`, data));
  const handleSave = (data) =>
    doPut(putReq(`/api/${entityName}/${data[fields.key]}`, data));
  const handleDelete = (data) =>
    doDelete(deleteReq(`/api/${entityName}/${data[fields.key]}`));

  return (
    <>
      {status !== STATUS.error && data && (
        <ListView
          fields={fields}
          data={data}
          editable
          actions={{ new: handleNew, save: handleSave, delete: handleDelete }}
          maxItems={maxItems}
          offsetBottom={offsetBottom}
        />
      )}
    </>
  );
};

export default DataManager;
