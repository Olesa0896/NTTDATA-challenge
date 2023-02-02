import { React, useEffect, useState, useMemo } from "react";
import styled from "@emotion/styled";
import { ImSortAmountDesc, ImSortAmountAsc, ImFilter } from "react-icons/im";
import { GrFilter } from "react-icons/gr";
import { useSortBy, useTable } from "react-table";
import { getAllUsers } from "../../service/api-fetch.js";
import { colors } from "../../styles"

const Table = styled.table`
  border-collapse: collapse;
  text-align: center;
  align-self: center;
  border: 1px solid ${colors.white}
`;

const TableHead = styled.thead`
  background:${colors.blue[500]};
  border: 1px solid ${colors.white};
  text-align: center;
  color: ${colors.white};
`;

const TableHeader = styled.th`
  border: 1px solid ${colors.white};
  border-bottom: 4px solid ${colors.white};
  min-width: 100px;
  padding: 4px;
`;

const TableBody = styled.tbody`
  text-align: center;
`;

const TableRow = styled.tr`
  background: ${(props) =>
    (props.id % 2) === 0 ? props.color : colors.blue[100]
  };
  min-width: 100px;
`;

const TableData = styled.td`
text-align: center;
padding: 2px 18px;
border: 1px solid ${colors.white}
`;

const Img = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%
`;
const Div = styled.div`
  background-color: ${colors.white};
  display: flex;
  margin: 0;
  height: 64px;
  width: 64px;
  justify-content: center;
  align-items: center;
`;


export function Users() {
  const [users, setUsers] = useState([]);

  const columns = useMemo(() => [
    {
      Header: "Nombre",
      accessor: "name"
    },
    {
      Header: "Apellido",
      accessor: "lastName"
    },
    {
      Header: "Edad",
      accessor: "age"
    },
    {
      Header: "Genero",
      accessor: "gender"
    },
    {
      Header: "Email",
      accessor: "email"
    },
    {
      Header: "Nacionalidad",
      accessor: "nat"
    },
    {
      Header: "Foto",
      accessor: "picture.medium",
      Cell: tableProps => (
        <Div>
          <Img
            src={tableProps.row.original.picture.medium}
            alt='user'
          />
        </Div>
      )
    }
  ], [])

  const tableInstance = useTable({ columns, data: users }, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  useEffect(() => {
    getAllUsers()
      .then((data) => {
        const filterUsers = [];
        data.results.map((user) => {
          let newObject = {
            "name": user.name.first,
            "lastName": user.name.last,
            "age": user.dob.age,
            "gender": user.gender,
            "email": user.email,
            "nat": user.nat,
            "picture": user.picture
          };
          filterUsers.push(newObject);
          setUsers(filterUsers)
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  return (
    <Table {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableHeader {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                {column.isSorted ? (column.isSortedDesc ? <ImSortAmountDesc style={{ paddingTop: "2px" }} /> : <ImSortAmountAsc style={{ paddingTop: "2px" }} />) : <ImFilter style={{ width: "12px", height: "12px", marginTop: "4px", marginLeft: "4px" }} />}
              </TableHeader>
            ))}
          </tr>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row, idx) => {
          prepareRow(row);
          return <TableRow id={idx} color={`${colors.blue[300]}`} {...row.getRowProps()}>
            {row.cells.map((cell, idx) => (
              <TableData {...cell.getCellProps()}>
                {cell.render('Cell')}
              </TableData>
            ))}
          </TableRow>
        })}

      </TableBody>
    </Table>
  );

}