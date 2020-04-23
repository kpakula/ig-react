import React, { useEffect } from "react";

function WrongPage(props) {
  useEffect(() => {
    redirectToHomePage();
  }, []);

  const redirectToHomePage = () => {
    setTimeout(() => {
      props.history.push("/");
    }, 2000);
  };

  return (
    <div>
      Wrong page
      <button onClick={redirectToHomePage}>Click</button>
    </div>
  );
}

export default WrongPage;
