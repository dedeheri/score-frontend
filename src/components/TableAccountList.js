import moment from "moment";
import { createSearchParams, useNavigate } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";

import { useDispatch } from "react-redux";
import { deleteAccount } from "../context/action/staff-action";
const TableAccountList = ({ data }) => {
  const coulums = ["No", "Nama", "No Indititas", "Sunting", "Terdaftar"];

  const dispatch = useDispatch();

  const Router = useNavigate();

  function handleResetPassword(id) {
    Router({
      pathname: "/staff/account/reset",
      search: `${createSearchParams({
        accountId: id,
      })}`,
    });
  }

  const handleDelete = (name, id) => {
    confirmAlert({
      title: `Anda yakin untuk menghapus data, ${name}?`,
      message: "Data tidak dapat diurungkan!",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(deleteAccount(id));
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div className="mt-3 font-roboto overflow-scroll scrollbar-hide">
      <table className="min-w-full table-fixed">
        <thead>
          <tr>
            {coulums.map((items, key) => (
              <th key={key} className="whitespace-nowrap text-md text-left">
                {items}
              </th>
            ))}
            <th className="relative">
              <span className="sr-only">action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((e, i) => (
            <tr key={i} className="text-black">
              <td className="text-md whitespace-nowrap">{i + 1}</td>
              <td className="text-md whitespace-nowrap">{e.fullName}</td>
              <td className="text-md whitespace-nowrap">{e.identityNumber}</td>
              <td className="text-md whitespace-nowrap">
                {moment(e.updatedAt, "YYYYMMDD").fromNow()}
              </td>
              <td className="text-md whitespace-nowrap">
                {moment(e.createdAt, "YYYYMMDD").fromNow()}
              </td>
              <td>
                <div className="flex space-x-1 relative">
                  <button onClick={() => handleResetPassword(e.authId)}>
                    <p className="hover:bg-green-400 transition duration-400 bg-green-300 p-1 cursor-pointer rounded-lg">
                      Edit
                    </p>
                  </button>
                  <button onClick={() => handleDelete(e.fullName, e.authId)}>
                    <p className="hover:bg-red-400 transition duration-400 bg-red-300 p-1 cursor-pointer rounded-lg">
                      Hapus
                    </p>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableAccountList;
