import Axios from 'axios'

export const get = async <T>(route: string) => {
  const config = {}

  try {
    const response = await Axios.get<T[]>(route, config);
    let responseData = response.data;

    if (responseData === null) {
      responseData = [];
    }

    if (responseData instanceof Object) {
      return responseData;
    } else {
      responseData = [];
    }
    return responseData;
  } catch (error) {
    if (Axios.isCancel(error)) {
      return;
    }

    return Promise.reject(error)
  }
}