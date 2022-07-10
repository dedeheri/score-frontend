import React from "react";

function TableSchedule({ data, columnName }) {
  return (
    <div className="border rounded-xl font-roboto overflow-scroll scrollbar-hide">
      <table className="min-w-full">
        <thead>
          <tr className="border-b">
            {columnName?.map((items, key) => (
              <th
                key={key}
                className="whitespace-nowrap text-md py-3 px-3 text-left "
              >
                {items}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.result?.data?.map((c) => (
            <tr
              key={c.teacherName}
              className="transition border-b duration-300 hover:bg-gray-100 text-black "
            >
              <td className="text-md whitespace-nowrap px-3 p-1">
                {c.teacherName}
              </td>
              <td className="text-md whitespace-nowrap px-3 p-1">
                {c.schedule.course}
              </td>
              <td className="text-md whitespace-nowrap px-3 p-1">
                {c.schedule.classRoom}
              </td>
              <td className="text-md whitespace-nowrap px-3 p-1">
                {c.schedule.day}
              </td>
              <td className="text-md whitespace-nowrap px-3 p-1">
                {c.schedule.time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableSchedule;
