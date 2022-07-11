import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";
import Back from "./Back";
import Input from "./Input";
import { useState, useEffect } from "react";
import {
  setDetailOneSchedule,
  setUpdateSchedule,
} from "../context/action/staff-action";
import UpdateSkeleton from "./UpdateSkeleton";
import NoData from "./NoData";
import Grid from "./Grid";
import Spin from "./Spin";

import * as actionType from "../context/actionType/actionTypeStaff";

function Update() {
  const dispatch = useDispatch();
  const {
    DETAIL: { data, loading, error, loadingBar },
    UPDATE: { error: errorUpdate, fetching },
  } = useSelector((state) => state.schedule);

  const { search } = useLocation();
  useEffect(() => {
    dispatch(setDetailOneSchedule(search));
  }, [dispatch, search]);
  const [course, setCourse] = useState("");
  const [classRoom, setClassRoom] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  // navigate
  const navigate = useNavigate();
  useEffect(() => {
    setCourse(data?.schedule?.course);
    setClassRoom(data?.schedule?.classRoom);
    setDay(data?.schedule?.day);
    setTime(data?.schedule?.time);
  }, [data]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch(setUpdateSchedule(search, course, classRoom, day, time, navigate));
  };

  useEffect(() => {
    return () => dispatch({ type: actionType.REMOVE_UPDATE_DATA_SCHEDULE });
  }, []);

  return (
    <Grid loadingBarValue={loadingBar}>
      {loading ? (
        <UpdateSkeleton />
      ) : error ? (
        <NoData />
      ) : (
        <div className="space-y-4">
          {errorUpdate?.message && (
            <div className="space-y-2">
              {errorUpdate?.message?.map((er, i) => (
                <div
                  key={i}
                  className="bg-red-50 px-3 py-1 rounded-md w-full animate-slide-in-up"
                >
                  <h1 className="text-red-500 font-medium text-lg">{er.msg}</h1>
                </div>
              ))}
            </div>
          )}
          <form onSubmit={handleUpdate}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <Input
                width={"w-full"}
                title={"Pelajaran"}
                value={course || ""}
                onChange={(e) => setCourse(e.target.value)}
              />
              <Input
                width={"w-full"}
                title={"Kelas"}
                value={classRoom || ""}
                onChange={(e) => setClassRoom(e.target.value)}
              />
              <Input
                width={"w-full"}
                title={"Hari"}
                value={day || ""}
                onChange={(e) => setDay(e.target.value)}
              />
              <Input
                width={"w-full"}
                title={"Waktu"}
                value={time || ""}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="md:flex md:space-x-2 justify-end space-y-2 mt-10 md:mt-4 md:space-y-0">
              <Back
                width={"md:w-52"}
                title={"Batal"}
                onClick={() => navigate("/staff/schedule")}
              />

              {fetching ? (
                <Spin width={"md:w-52"} />
              ) : (
                <Button width={"md:w-52"} title={"Edit"} type="submit" />
              )}
            </div>
          </form>
        </div>
      )}
    </Grid>
  );
}
export default Update;
