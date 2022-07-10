import React, { useState } from "react";

// components
import Button from "../../components/Button";
import Input from "../../components/Input";
import Spin from "../../components/Spin";
import Back from "../../components/Back";
import AuthGrid from "../../components/AuthGrid";

// image
import logo from "../../assets/images/logo.png";

// redux
import { useSelector, useDispatch } from "react-redux";
import { verifyNoIndentityStudent } from "../../context/action/student";
import { createSearchParams, useNavigate } from "react-router-dom";

function Registrasi() {
  const dispatch = useDispatch();
  const router = useNavigate();
  const {
    REGISTRATION_STUDENT: { data, fetching, error, next },
  } = useSelector((state) => state.authorization);

  // state
  const [identityNumber, setIndentityNumber] = useState("");

  // handle information
  function handleCheckIndentityNumber(e) {
    e.preventDefault();
    dispatch(verifyNoIndentityStudent(identityNumber));
  }

  const handleSearch = () => {
    router({
      pathname: "/signup/student/verify",
      search: `${createSearchParams({
        identityNumber: data?.result?.identityNumber,
      })}`,
    });
  };

  return (
    <AuthGrid text={"Registrasi Siswa"}>
      {/* Image */}

      <div className="flex flex-col space-y-8 items-center">
        <div className="space-y-3">
          <p className="font-base text-lg text-gray-600 w-full">
            Untuk Melanjutkan pendaftaran, Anda harus memvalidasi Number
            Indititas. Jika tidak tersedia, silakan hubungi staff
          </p>

          {error?.message && (
            <div className="bg-red-100 p-1 rounded-md w-full mx-auto">
              <h1 className="font-base text-red-500 text-xl">
                {error?.message}
              </h1>
            </div>
          )}

          {data?.result && (
            <div className="font-medium  text-lg w-full bg-green-100 p-1 rounded-md">
              <p className="text-green-700">Nama : {data?.result?.fullName}</p>
              <p className="text-green-700">
                No Indentitas : {data?.result?.identityNumber}
              </p>
              <p className="text-green-700">
                Kelas : {data?.result?.classRoom}
              </p>
            </div>
          )}
        </div>
      </div>

      <form
        onSubmit={handleCheckIndentityNumber}
        className="flex flex-col space-y-3 items-center"
      >
        <Input
          width={"w-full"}
          type={"number"}
          title={"No Identitas"}
          placeholder={"No Identitas"}
          onChange={(e) => setIndentityNumber(e.target.value)}
        />

        {next ? (
          <Button
            width={"w-full"}
            onClick={handleSearch}
            title={"Selanjutnya"}
          />
        ) : fetching ? (
          <Spin />
        ) : (
          <Button width={"w-full"} title={"Validasi"} />
        )}

        {error?.message && (
          <Back
            width={"w-full"}
            title={"Kemabli ke Login"}
            onClick={() => router("/")}
          />
        )}
      </form>
      {/* form */}
    </AuthGrid>
  );
}

export default Registrasi;
