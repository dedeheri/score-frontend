import { useEffect } from "react";
import Card from "../../components/Card";
import CardSkeleton from "../../components/CardSkeleton";
import TableSkeleton from "../../components/TableSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { setHome } from "../../context/action/staff-action";
import LoadingBar from "react-top-loading-bar";
import TableSchedule from "../../components/TableSchedule";
import Grid from "../../components/Grid";
import NoData from "../../components/NoData";

function Home() {
  const dispatch = useDispatch();
  const {
    data: aktivityList,
    isFetching,
    loadingBar,
  } = useSelector((state) => state.activity);

  useEffect(() => {
    dispatch(setHome());
  }, [dispatch]);

  // tables
  const columnName = ["Kode", "Guru", "Kelas", "Pelajaran", "Hari", "Waktu"];

  console.log(aktivityList?.result?.map((c) => c.schedule.length === 0));

  return (
    <Grid loadingBarValue={loadingBar}>
      {isFetching ? (
        <CardSkeleton />
      ) : (
        <Card
          studentCount={aktivityList.countStudents}
          teacherCount={aktivityList.countTeacher}
          staffCount={aktivityList.countStaff}
          scheduleCount={aktivityList.countSchedule}
          classCount={aktivityList.countClass}
        />
      )}

      {isFetching ? (
        <TableSkeleton />
      ) : Boolean(
          !aktivityList?.result?.map((c) => c.schedule.length === 0).toString()
        ) ? (
        <NoData />
      ) : (
        <div className="space-y-4 mt-10">
          <h1 className="text-xl font-bold ">Aktivitas Hari ini</h1>
          <TableSchedule data={aktivityList} columnName={columnName} />
        </div>
      )}
    </Grid>
  );
}

export default Home;
