import { Home } from "react-feather";
import "./Nav.scss";
import { useRef } from "react";

function Nav() {
  const isOpen = useRef<boolean>(false);

  return (
    <div className="Nav">
      {isOpen.current ? (
        <div className="Nav__open">
          <img src="" alt="" />
        </div>
      ) : (
        <Home color="black" />
      )}
    </div>
  );
}

export default Nav;
