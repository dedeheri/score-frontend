import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setStudent } from "../../context/action/staff-action";
import { useLocation } from "react-router-dom";

import Filter from "../../components/Filter";
import Grid from "../../components/Grid";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";
import TableStudent from "../../components/TableStundents";
import TableSkeleton from "../../components/TableSkeleton";
import Sort from "../../components/Sort";
import ButtonSlide from "../../components/ButtonSlide";
import { Add } from "../../components/Staff";
import AddStudentItem from "../../components/Staff/Add/AddStudentItem";
import NoData from "../../components/NoData";

function Students() {
  // state
  const [addSlide, setAddSlide] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [studentList, setStudentList] = useState([]);

  const dispatch = useDispatch();
  const {
    DELETE: { data: messageDelete },
    GET: { data, loading, loadingBar },
    ADD: { data: dataAdd },
  } = useSelector((state) => state.student);

  // get Data
  const { search } = useLocation();
  useEffect(() => {
    dispatch(setStudent(search));
  }, [dispatch, search, dataAdd, messageDelete]);

  // search
  useEffect(() => {
    const filtered = data?.result?.filter((n) =>
      n.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setStudentList(filtered);
  }, [data, searchTerm]);

  const columnName = ["Kode Siswa", "No Indititas", "Nama", "Kelas", "Alamat"];
  return (
    <Grid loadingBarValue={loadingBar}>
      <div className="flex justify-between items-center">
        <Search onChange={(e) => setSearchTerm(e.target.value)} />
        <div className="space-x-2 flex items-center">
          <Sort />
          <Filter extend={false} />

          <ButtonSlide addSlide={addSlide} setAddSlide={setAddSlide} />
          <Add
            addSlide={addSlide}
            setAddSlide={setAddSlide}
            title={"Tambah Siswa"}
          >
            <AddStudentItem setAddSlide={setAddSlide} />
          </Add>
        </div>
      </div>
      <div className="mt-10">
        {loading ? (
          <TableSkeleton />
        ) : studentList?.length === 0 ? (
          <NoData />
        ) : (
          <div className="space-y-3">
            <TableStudent columnName={columnName} list={studentList} />
            <Pagination page={data?.page} />
          </div>
        )}
      </div>
    </Grid>
  );
}

export default Students;
