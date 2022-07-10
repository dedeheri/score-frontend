import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "../../components/Search";
import TableSkeleton from "../../components/TableSkeleton";
import TableTeacher from "../../components/TableTeacher";
import Sort from "../../components/Sort";
import Grid from "../../components/Grid";

import { REMOVE_GET_DETAIL_TEACHER } from "../../context/action/action-type";
import { setTeacher } from "../../context/action/staff-action";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import ButtonSlide from "../../components/ButtonSlide";
import { Add } from "../../components/Staff";
import AddTeacherItem from "../../components/Staff/Add/AddTeacherItem";
import Pagination from "../../components/Pagination";
import NoData from "../../components/NoData";

function Teacher() {
  const {
    getData: { data: teachers, page, isFetching },

    data,
    loadingBar,
    errorValidation,
    errorMessage,
    refreshPage,
  } = useSelector((state) => state.teacher);

  // add teacher

  const { search } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTeacher(search));

    return () => {
      dispatch({ type: REMOVE_GET_DETAIL_TEACHER });
    };
  }, [search]);

  // search term
  const [searchTerm, setSearchTerm] = useState("");
  const [teacherList, setTeacherList] = useState([]);

  useEffect(() => {
    const filtered = teachers?.filter((fill) => {
      return fill.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setTeacherList(filtered);
  }, [teachers, searchTerm]);

  useEffect(() => {
    if (refreshPage == true) {
      window.location.reload();
    }
  }, [refreshPage]);

  // slide
  const [addSlide, setAddSlide] = useState(false);

  const columnName = ["Kode Guru", "No Indititas", "Nama", "Alamat", "Status"];
  return (
    <Grid loadingBarValue={loadingBar}>
      <div className="flex justify-between items-center">
        {/* dekstop */}
        <Search onChange={(e) => setSearchTerm(e.target.value)} />
        <div className="space-x-2 flex items-center">
          {/* search */}
          <Sort />
          {/* add */}

          <ButtonSlide addSlide={addSlide} setAddSlide={setAddSlide} />
          <Add
            addSlide={addSlide}
            setAddSlide={setAddSlide}
            title={"Tambah Guru"}
          >
            <AddTeacherItem
              errorValidation={errorValidation}
              errorMessage={errorMessage}
            />
          </Add>
        </div>
      </div>
      {/* table */}
      <div className="mt-10">
        {isFetching ? (
          <TableSkeleton />
        ) : teacherList?.length === 0 ? (
          <NoData />
        ) : (
          <div className="space-y-3">
            <TableTeacher columnName={columnName} list={teacherList} />
            <Pagination page={page} />
          </div>
        )}
      </div>
    </Grid>
  );
}

export default Teacher;
