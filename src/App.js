import React, { useEffect, useState } from "react";
import WhetherFetchData from "./Components/WhetherFetchData";

function App() {
  const [position, setPosition] = useState({});

  // Getting the users location
  useEffect(() => {
    const getUserPosition = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const data = {
            lat: pos.coords.latitude,
            long: pos.coords.longitude,
          };
          setPosition(data);
        });
      }
    };

    getUserPosition();
  }, []);

  return (
    <>
      <WhetherFetchData position={position} />
    </>
  );
}

export default App;
