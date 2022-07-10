import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { setClassRoomList } from "../../context/action/staff-action";

import LoadingBar from "react-top-loading-bar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TableSkeleton from "../../components/TableSkeleton";
import Search from "../../components/Search";
import { Add, AddClassItem } from "../../components/Staff";
import TableClass from "../../components/TableClass";
import ButtonSlide from "../../components/ButtonSlide";
import Sort from "../../components/Sort";
import Grid from "../../components/Grid";
import NoData from "../../components/NoData";

function ClassList() {
  const dispatch = useDispatch();
  const { data, isFetching, loadingBar } = useSelector(
    (state) => state.classRoomList
  );

  const [addSlide, setAddSlide] = useState(false);
  const { search } = useLocation();

  useEffect(() => {
    dispatch(setClassRoomList(search));
  }, [search]);

  // search
  const [searchTerm, setSearchTerm] = useState("");
  const [classList, SetclassList] = useState([]);
  useEffect(() => {
    const filtered = data?.result?.filter((fil) => {
      return fil.homeRoomTeacher
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
    SetclassList(filtered);
  }, [data, searchTerm]);

  const coulums = ["Kode Kelas", "Kelas", "Wali Kelas"];
  return (
    <Grid loadingBarValue={loadingBar}>
      <div className="flex justify-between items-center">
        <Search onChange={(e) => setSearchTerm(e.target.value)} />
        <div className="space-x-2 flex items-center">
          <Sort />
          <ButtonSlide addSlide={addSlide} setAddSlide={setAddSlide} />
          <Add
            title={"Tambah Kelas"}
            addSlide={addSlide}
            setAddSlide={setAddSlide}
          >
            <AddClassItem setAddSlide={setAddSlide} />
          </Add>
        </div>
      </div>
      <div className="mt-10">
        {isFetching ? (
          <TableSkeleton />
        ) : classList?.length === 0 ? (
          <NoData />
        ) : (
          <TableClass coulums={coulums} list={classList} />
        )}
      </div>
    </Grid>
  );
}

export default ClassList;
