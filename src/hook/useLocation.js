import { useEffect, useState } from "react";

const useLocation = (detector) => {
  const [state, setState] = useState({
    loading: true,
    location: undefined,
    error: undefined,
  });

  useEffect(() => {
    Promise.resolve(detector())
      .then((location) => setState({ loading: false, location }))
      .catch((error) => setState({ loading: false, error }));
  }, []);

  return state;
};

export default useLocation;
