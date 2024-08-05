import { WARNING} from '../alert/messages';
import {ERROR_OCCURED_MESSAGE, ERROR_OCCURED_STATUS} from '../../services/globalMessages';
import {buildRequestParams} from '../../../users/services/userUtils';
import {loggedIn, on401} from '../../services/globalHandlers';

export const handleGenericFilterSubmission = async (
  formData,
  pageNumber,
  actionFunc,
  setEntities,
  setTotalPages,
  setTotalElements,
  setPageNumber,
  dispatch,
  navigate,
  setMessage,
  setMessageType) => {
  const requestParams = buildRequestParams(formData, pageNumber);
  try {
    const res = await actionFunc(requestParams);
    if (res.status === 200) {
      setEntities(res.body.content);
      setPageNumber(res.body.number);
      setTotalPages(res.body.totalPages);
      setTotalElements(res.body.totalElements);
      loggedIn(dispatch);
    } else if (res.status === 401) {
      on401(dispatch, navigate);
    } else {
      setMessageType(WARNING);
      setMessage(ERROR_OCCURED_STATUS + res.status);
    }
  } catch (error) {
    setMessageType(WARNING);
    setMessage(ERROR_OCCURED_MESSAGE + error.message);
  }
};