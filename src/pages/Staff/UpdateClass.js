import { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
// redux
import {
  setDetailClass,
  setTeacher,
  setUpdateClass,
} from "../../context/action/staff-action";
import * as actionType from "../../context/actionType/actionTypeStaff";
// icon
import { SelectorIcon } from "@heroicons/react/solid";
// components
import { Listbox, Transition } from "@headlessui/react";
import Grid from "../../components/Grid";
import Spin from "../../components/Spin";
import NoData from "../../components/NoData";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Back from "../../components/Back";
import UpdateSkeleton from "../../components/UpdateSkeleton";

function UpdateClass() {
  const {
    DETAIL: { data: classRooms, loadingBar, loading, error: errorDetail },
    UPDATE: { fetching, error },
  } = useSelector((state) => state.classRoomList);
  const {
    getData: { data, isFetching },
  } = useSelector((state) => state.teacher);

  const dispatch = useDispatch();
  const { search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setDetailClass(search));
    dispatch(setTeacher("?sort?-1"));
  }, [dispatch, search]);

  useEffect(() => {
    return () => dispatch({ type: actionType.REMOVE_DETAIL_CLASSROOM });
  }, []);
  useEffect(() => {
    return () => dispatch({ type: actionType.REMOVE_UPDATE_DATA_CLASSROOM });
  }, []);

  const [homeRoomTeacher, setHomeRoomTeacher] = useState("");
  const [classRoom, setClassRoom] = useState("");

  useEffect(() => {
    setHomeRoomTeacher(classRooms?.result?.homeRoomTeacher);
    setClassRoom(classRooms?.result?.classRoom);
  }, [classRooms]);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(setUpdateClass(search, homeRoomTeacher, classRoom, navigate));
  };

  return (
    <Grid loadingBarValue={loadingBar}>
      {loading ? (
        <UpdateSkeleton />
      ) : errorDetail ? (
        <NoData />
      ) : (
        <div className="space-y-4">
          {error?.validation &&
            error?.validation?.map((er, i) => (
              <div
                key={i}
                className="bg-red-50 px-3 py-1 rounded-md w-full animate-slide-in-up"
              >
                <h1 className="text-red-500 font-medium text-lg">{er.msg}</h1>
              </div>
            ))}
          <form onSubmit={handleUpdate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Listbox value={homeRoomTeacher} onChange={setHomeRoomTeacher}>
                <div className="relative">
                  <div className="block text-lg mb-1 font-medium text-gray-700 font-roboto">
                    Wali Kelas
                  </div>
                  <Listbox.Button className="relative h-11 w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg border cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                    <span className="block truncate">
                      {isFetching ? "Loading..." : homeRoomTeacher}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute w-full z-50 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-xl max-h-80 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {data?.map((cls, index) => (
                        <Listbox.Option
                          key={index}
                          className={({ active }) =>
                            `${
                              active
                                ? "text-gray-900 bg-gray-100"
                                : "text-gray-900"
                            }
                          cursor-default select-none relative py-2 pl-4 pr-4`
                          }
                          value={cls.fullName}
                        >
                          {({ active }) => (
                            <>
                              <span
                                className={`${
                                  active ? "font-medium" : "font-normal"
                                } block truncate`}
                              >
                                {cls.fullName}
                              </span>
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>

              <Input
                onChange={(e) => setClassRoom(e.target.value)}
                value={classRoom || ""}
                width={"w-full"}
                title={"Kelas"}
              />
            </div>
            <div className="md:flex md:space-x-2 justify-end space-y-2 mt-10 md:mt-4 md:space-y-0">
              <Back
                onClick={() => navigate("/staff/class")}
                width={"md:w-52  w-full"}
                title={"Batal"}
              />
              {fetching ? (
                <Spin width={"md:w-52 w-full"} />
              ) : (
                <Button width={"md:w-52 w-full"} title={"Edit"} type="submit" />
              )}
            </div>
          </form>
        </div>
      )}
    </Grid>
  );
}

export default UpdateClass;
