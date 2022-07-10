import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import {
  setAccount,
  setConfirmationAccount,
} from "../../context/action/staff-action";
import Search from "../../components/Search";
import moment from "moment";
import CardSkeleton from "../../components/CardSkeleton";
import Grid from "../../components/Grid";
import NoData from "../../components/NoData";
import TableAccountList from "../../components/TableAccountList";

function Account() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { data, isFetching, loadingBar, error, success } = useSelector(
    (state) => state.account
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [dataSearch, setDataSearch] = useState([]);

  useEffect(() => {
    dispatch(setAccount(location.search));
  }, [location.search, success]);

  useEffect(() => {
    const filterd = data?.users?.filter((e) => {
      return e.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setDataSearch(filterd);
  }, [data, searchTerm]);

  const router = useNavigate();
  const handleQueryTeacher = (props) => {
    router({
      search: `${createSearchParams({
        sort: props,
      })}`,
    });
  };

  const updateAccountConfirmation = (id) => {
    dispatch(setConfirmationAccount(id));
  };

  const condi = location.search.slice(6, location.search.length);
  const activeState = "bg-gray-200 rounded-lg px-3";
  const notActiveState = "text-gray-500 px-3";

  return (
    <Grid loadingBarValue={loadingBar}>
      <div className="space-y-6">
        {error && <div>{error.message}</div>}
        {isFetching ? (
          <CardSkeleton />
        ) : data?.confirmation?.length !== 0 ? (
          <div className="space-y-3">
            <h1 className="text-xl">Konfirmasi Akun</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {data?.confirmation?.map((e, i) => (
                <div key={i} className="border p-2 rounded-xl">
                  <div className="flex justify-between items-center">
                    <p className="font-bold">{e.fullName}</p>
                    <p>{e.codeTeacher}</p>
                  </div>
                  <p>{e.identityNumber}</p>
                  <p>{moment(e.createdAt, "YYYYMMDD").fromNow()}</p>
                  <div className="flex space-x-1 justify-end mt-8 ">
                    <p
                      onClick={() => updateAccountConfirmation(e._id)}
                      className="text-green-500 cursor-pointer p-1 hover:bg-gray-100 hover:rounded-md"
                    >
                      Konfirmasi
                    </p>
                    <div className="border-l" />
                    <p className="text-red-500 cursor-pointer p-1 hover:bg-gray-100 hover:rounded-md ">
                      Hapus
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="space-y-1">
          <h1 className="text-2xl">Akun Terdaftar</h1>

          <div className="flex justify-between items-center ">
            <div className="flex">
              <button
                onClick={() => handleQueryTeacher("Staff")}
                className={`text-xl cursor-pointer ${
                  condi == "Staff" ? activeState : notActiveState
                }`}
              >
                Staff
              </button>
              <button
                onClick={() => handleQueryTeacher("Teacher")}
                className={`text-xl cursor-pointer ${
                  condi == "Teacher" ? activeState : notActiveState
                }`}
              >
                Guru
              </button>
              <button
                onClick={() => handleQueryTeacher("Student")}
                className={`text-xl cursor-pointer  ${
                  condi == "Student" ? activeState : notActiveState
                }`}
              >
                Siswa
              </button>
            </div>
            <Search
              type={"text"}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {dataSearch?.length === 0 ? (
            <NoData />
          ) : (
            <TableAccountList data={dataSearch} />
          )}
        </div>
      </div>
    </Grid>
  );
}

export default Account;
