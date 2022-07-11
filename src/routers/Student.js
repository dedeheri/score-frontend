import Cookies from "js-cookie";
import objectHash from "object-hash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Container from "../components/Container";
import Forbidden from "../components/Forbidden";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SidebarItem from "../components/Student/SidebarItem";
import { REMOVE_DATA_USER } from "../context/action/action-type";
import { getLoadUserStudent } from "../context/action/user-load-action";
import Home from "../pages/Student/Home";
import Score from "../pages/Student/Score";

function Student() {
  const dispatch = useDispatch();
  const [protec, setProtec] = useState(true);
  const [menu, setMenu] = useState(false);

  const { error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getLoadUserStudent());
    Cookies.get("secure-To") &&
    Cookies.get("secure-2nd") == objectHash("Student")
      ? setProtec(true)
      : setProtec(false);

    if (error === "Wrong Token") window.location.reload();
  }, [dispatch, error]);

  useEffect(() => {
    return () => dispatch({ type: REMOVE_DATA_USER });
  }, []);

  return (
    <>
      {protec ? (
        error ? (
          <Forbidden error={error} />
        ) : (
          <>
            <Navbar menu={menu} setMenu={setMenu} />
            <Container>
              <Sidebar menu={menu} setMenu={setMenu}>
                <SidebarItem />
              </Sidebar>

              <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/score"} element={<Score />} />
              </Routes>
            </Container>
          </>
        )
      ) : (
        <Routes>
          <Route path="*" element={<Navigate to={"/"} />}></Route>
        </Routes>
      )}
    </>
  );
}

export default Student;
