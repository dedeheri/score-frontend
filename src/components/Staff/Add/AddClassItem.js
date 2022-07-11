import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addClassRoom, setTeacher } from "../../../context/action/staff-action";

// icons
import { SelectorIcon } from "@heroicons/react/solid";

// components
import { Listbox, Transition } from "@headlessui/react";
import Input from "../../Input";
import Spin from "../../Spin";
import Button from "../../Button";

import * as actionType from "../../../context/actionType/actionTypeStaff";

function AddClassItem({ setAddSlide }) {
  const dispatch = useDispatch();
  const {
    getData: { data: teachers, page, isFetching },
  } = useSelector((state) => state.teacher);

  const {
    ADD: { message, error, fetching },
  } = useSelector((state) => state.classRoomList);

  const [classRoom, setClassRoom] = useState("");
  const [homeRoomTeacher, setHomeRoomTeacher] = useState("");

  useEffect(() => {
    dispatch(setTeacher(`?page=1&limit=${page?.total}`));
  }, []);

  useEffect(() => {
    setHomeRoomTeacher(teachers?.[0]?.fullName);
  }, [teachers]);

  const handleAddClass = (e) => {
    e.preventDefault();
    dispatch(addClassRoom(homeRoomTeacher, classRoom));
  };

  useEffect(() => {
    if (message?.message?.length > 0) {
      setAddSlide(false);
    }
  }, [message]);

  // remove data post in state when success
  useEffect(() => {
    return () => dispatch({ type: actionType.REMOVE_ADD_CLASSROOM });
  }, []);

  return (
    <Fragment>
      <form onSubmit={handleAddClass} className="space-y-3">
        {error?.validation && (
          <div className="space-y-1">
            {error?.validation?.map((err, i) => (
              <div className="flex flex-col " key={i}>
                <h1 className="bg-red-100 text-black p-1 rounded-lg font-medium">
                  {err.msg}
                </h1>
              </div>
            ))}
          </div>
        )}
        {/* ListBox */}
        <Listbox value={homeRoomTeacher} onChange={setHomeRoomTeacher}>
          <div className="relative">
            <div className="block text-lg mb-1 font-medium text-gray-700 font-roboto">
              Guru
            </div>
            <Listbox.Button className="relative h-11 w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg border cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
              <span className="block truncate">
                {isFetching ? (
                  <div className="animate-pulse">
                    <div className="bg-gray-100 h-6 w-1/2 rounded-lg " />
                  </div>
                ) : (
                  homeRoomTeacher
                )}
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
                {teachers?.map((teacher, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `${active ? "text-gray-900 bg-gray-100" : "text-gray-900"}
                      cursor-default select-none relative py-2 pl-4 pr-4`
                    }
                    value={teacher.fullName}
                  >
                    {({ active }) => (
                      <>
                        <span
                          className={`${
                            active ? "font-medium" : "font-normal"
                          } block truncate`}
                        >
                          {teacher.fullName}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
        {/* End ListBox */}

        <Input
          title={"Kelas"}
          placeholder={"Kelas"}
          onChange={(e) => setClassRoom(e.target.value)}
        />
        <div className="flex justify-end ">
          <div className="md:w-52 w-full">
            {fetching ? (
              <Spin />
            ) : (
              <Button width={"md:w-52 w-full"} title="Tambah" />
            )}
          </div>
        </div>
      </form>
    </Fragment>
  );
}

export default AddClassItem;
