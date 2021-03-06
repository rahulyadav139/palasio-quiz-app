import { useCallback } from 'react';

const useFetch = () => {
  const sendData = useCallback(async (path, transferData) => {
    try {
      const res = await fetch(path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transferData),
      });

      const data = await res.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getData = useCallback(async path => {
    try {
      const res = await fetch(path);

      if (!res.ok) throw new Error('Something went wrong!');

      const data = await res.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  return {
    sendData,
    getData,
  };
};

export { useFetch };
