// Типы экшенов
export const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

// Синхронный экшен с таймаутом и колбэком
export const fetchData = (callback) => {
  return (dispatch) => {
    dispatch({ type: FETCH_DATA_REQUEST });

    setTimeout(() => {
      try {
        // имитация синхронного запроса
        const fakeResponse = { message: "Данные получены!" };

        dispatch({ type: FETCH_DATA_SUCCESS, payload: fakeResponse });

        // вызываем колбэк, если он передан
        if (callback) callback({ ok: true, data: fakeResponse });
      } catch (error) {
        dispatch({ type: FETCH_DATA_FAILURE, error: "Ошибка запроса" });
        if (callback) callback({ ok: false, error: "Ошибка запроса" });
      }
    }, 2000); // задержка 2 секунды
  };
};
