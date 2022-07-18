import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Grid from "../../components/Grid";
import InputPassword from "../../components/InputPassword";
import TableSkeleton from "../../components/TableSkeleton";

// router
import { useLocation } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";
import {
  detailAccount,
  updatePasswordAccount,
} from "../../context/action/staff-action";
import NoData from "../../components/NoData";
import Spin from "../../components/Spin";

function UpdatePassword() {
  const {
    DETAIL_ACCOUNT: { loading, loadingBar, error },
    UPDATE_PASSWORD: { fetching, error: errorUpdate },
  } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const params = useLocation();

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  useEffect(() => {
    dispatch(detailAccount(params.search));
  }, [dispatch, params]);

  function handleUpdatePassword(e) {
    e.preventDefault();
    dispatch(updatePasswordAccount(password, repeatPassword, params.search));
  }

  return (
    <Grid loadingBarValue={loadingBar}>
      <form onSubmit={handleUpdatePassword}>
        {loading ? (
          <TableSkeleton />
        ) : error ? (
          <NoData />
        ) : (
          <div className="max-w-md mx-auto space-y-4">
            {errorUpdate?.validation &&
              errorUpdate?.validation?.map(({ msg }, i) => (
                <div key={i} className="bg-red-100 p-1 rounded-md w-full">
                  <h1 className="font-base text-red-500 text-xl">{msg}</h1>
                </div>
              ))}

            <InputPassword
              title={"Kata Sandi"}
              placeholder={"••••••••"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputPassword
              title={"Ulangi Kata Sandi"}
              placeholder={"••••••••"}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            {fetching ? <Spin width={"w-full"} /> : <Button title={"Reset"} />}
          </div>
        )}
      </form>
    </Grid>
  );
}

export default UpdatePassword;
