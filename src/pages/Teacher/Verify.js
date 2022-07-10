import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import AuthGrid from "../../components/AuthGrid";
import Back from "../../components/Back";
import Button from "../../components/Button";
import Input from "../../components/Input";
import InputPassword from "../../components/InputPassword";
import { setVerifyNextStep } from "../../context/action/login-action";
function Verify() {
  const dispatch = useDispatch();
  const {
    verifyUsers: { errorNextStep: error, errorAccountHashReady },
  } = useSelector((state) => state.authorization);
  const { search } = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const router = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setErrorPassword("Password do not match");
    }

    dispatch(setVerifyNextStep(search, email, password, router));
  };

  return (
    <AuthGrid text={"Email dan Kata Sandi"}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col my-10 space-y-4 items-center"
      >
        {errorPassword && <span className="text-red-500">{errorPassword}</span>}
        {errorAccountHashReady && (
          <span className="text-red-500">{errorAccountHashReady}</span>
        )}

        {error && (
          <span className="text-red-500">{error.map(({ msg }) => msg)}</span>
        )}

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

        <Button width={"w-full"} title={"Kirim"} />
        <Back
          onClick={() => router("/")}
          width={"w-full"}
          title={"Kembali Ke Login"}
        />
      </form>
    </AuthGrid>
  );
}

export default Verify;
