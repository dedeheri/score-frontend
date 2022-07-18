import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import AuthGrid from "../../components/AuthGrid";
import Button from "../../components/Button";
import Input from "../../components/Input";
import InputPassword from "../../components/InputPassword";
import Spin from "../../components/Spin";
import { setVerifyNextStep } from "../../context/action/teacher";

function Verify() {
  const dispatch = useDispatch();
  const {
    NEXT_REGISTRATION_TEACHER: { fetching, error },
  } = useSelector((state) => state.authorization);
  const { search } = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const router = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      setVerifyNextStep(search, email, password, repeatPassword, router)
    );
  };

  return (
    <AuthGrid text={"Email dan Kata Sandi"}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col my-10 space-y-4 items-center"
      >
        {error?.message && (
          <h1 className="font-base text-red-500 text-xl bg-red-100 p-1 w-full  rounded-md">
            {error?.message}
          </h1>
        )}

        {error?.validation &&
          error?.validation?.map(({ msg }, i) => (
            <div key={i} className="bg-red-100 p-1 rounded-md w-full">
              <h1 className="font-base text-red-500 text-xl">{msg}</h1>
            </div>
          ))}

        <Input
          title={"Email"}
          placeholder="Email"
          width={"w-full"}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputPassword
          title={"Kata Sandi"}
          placeholder={"Kata Sandi"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputPassword
          title={"Ulangi Kata Sandi"}
          placeholder={"Ulangi Kata Sandi"}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />

        {fetching ? (
          <Spin width={"w-full"} />
        ) : (
          <Button width={"w-full"} title={"Kirim"} />
        )}
      </form>
    </AuthGrid>
  );
}

export default Verify;
