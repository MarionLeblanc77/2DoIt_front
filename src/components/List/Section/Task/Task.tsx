import { useEffect } from "react";
import { useAppDispatch } from "../../../../store/hooks-redux";
import "./Task.scss";
import getTasks from "../../../../store/middlewares/getTasks";

function Task() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  return <li>Do this</li>;
}

export default Task;
