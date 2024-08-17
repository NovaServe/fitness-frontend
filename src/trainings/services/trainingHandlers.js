import {buildRequestParams} from '../../users/services/userUtils';
import {loggedIn, on401} from '../../share/services/globalHandlers';
import {WARNING} from '../../share/components/alert/messages';
import {ERROR_OCCURED_MESSAGE, ERROR_OCCURED_STATUS} from '../../share/services/globalMessages';

export const handleGetTrainings = async (
  filterFormData,
  requestApiFunc,
  setContent,
  setStartRange,
  setEndRange,
  dispatch,
  navigate,
  setMessage,
  setMessageType) => {
  const requestParams = buildRequestParams(filterFormData, null);
  try {
    const res = await requestApiFunc(requestParams);
    if (res.status === 200) {
      setContent(res.body.content);
      setStartRange(res.body.startRange);
      setEndRange(res.body.endRange);
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