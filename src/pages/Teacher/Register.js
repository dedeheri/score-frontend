import Button from "../../components/Button";
import Spin from "../../components/Spin";
import Input from "../../components/Input";
import { useNavigate, createSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import AuthGrid from "../../components/AuthGrid";
import { verify } from "../../context/action/teacher";
import { RESET_VERIFY_TEACHER } from "../../context/actionType/actionTypeTeacher";
import { XIcon } from "@heroicons/react/outline";

function Register() {
  const router = useNavigate();
  const dispatch = useDispatch();

  const [identityNumber, setIdentityNumber] = useState("");
  const {
    REGISTRATION_TEACHER: { data: users, error, next, fetching },
  } = useSelector((state) => state.authorization);

  const [closeNotif, setCloseNotif] = useState(false);

  const check = async (e) => {
    e.preventDefault();
    dispatch(verify(identityNumber));
  };

  const handleSearch = () => {
    router({
      pathname: "/signup/teacher/verify",
      search: `${createSearchParams({
        identityNumber: users?.result?.identityNumber,
      })}`,
    });
  };

  useEffect(() => {
    error?.message || users?.result
      ? setCloseNotif(true)
      : setCloseNotif(false);
  }, [error, users]);

  useEffect(() => {
    return () => dispatch({ type: RESET_VERIFY_TEACHER });
  }, []);

  return (
    <AuthGrid text={"Registrasi Guru"}>
      <form className="flex flex-col space-y-4 items-center">
        <div className="space-y-4">
          <p className="font-base text-lg text-gray-600 w-full leading-5">
            Untuk Melanjutkan pendaftaran, Anda harus memvalidasi Number
            Indititas. Jika tidak tersedia, silakan hubungi staf
          </p>

          {closeNotif && error?.message && (
            <div className="bg-red-100 py-1 px-3 rounded-md w-full animate-slide-down flex justify-between items-center">
              <h1 className="font-base text-red-500 text-lg">
                {error?.message}
              </h1>

              <div
                onClick={() => setCloseNotif((prev) => !prev)}
                className="hover:bg-red-200 rounded-full p-0.5 cursor-pointer duration-200"
              >
                <XIcon className="w-5 text-red-500 " />
              </div>
            </div>
          )}

          {closeNotif && users?.result && (
            <div className="bg-green-100 py-1 px-3 rounded-md w-full animate-slide-down flex justify-between items-center">
              <div>
                <p className="text-green-700">
                  Nama : {users?.result?.fullName}
                </p>
                <p className="text-green-700">
                  No Indentitas : {users?.result?.identityNumber}
                </p>
              </div>

              <div
                onClick={() => setCloseNotif((prev) => !prev)}
                className="hover:bg-green-200 rounded-full p-0.5 cursor-pointer duration-200"
              >
                <XIcon className="w-5 text-green-500 " />
              </div>
            </div>
          )}
        </div>
        <Input
          width={"w-full"}
          type={"number"}
          title={"Nip"}
          placeholder={"Nip"}
          onChange={(e) => setIdentityNumber(e.target.value)}
        />

        {next ? (
          <Button width={"w-full"} onClick={handleSearch} title={"Next"} />
        ) : fetching ? (
          <Spin width={"w-full"} />
        ) : (
          <Button width={"w-full"} onClick={check} title={"Check"} />
        )}
      </form>
    </AuthGrid>
  );
}

export default Register;
