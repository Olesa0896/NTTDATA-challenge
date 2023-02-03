import { React, useEffect, useState, useMemo } from "react";
import styled from "@emotion/styled";
import { ImSortAmountDesc, ImSortAmountAsc, ImFilter, ImDownload } from "react-icons/im";
import csvDownload from 'json-to-csv-export';
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px
`;

const Link = styled.a`
  border-radius: 4px;
  background: ${colors.blue[500]};
  color: ${colors.white};
  text-align:center;
  cursor: pointer;
  max-width: 200px;
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
  const dataToConvert = {
    data: users,
    filename: 'users_data',
    delimiter: ',',
    headers: ["name", "lastName", "age", "gender", "email", "nat", "picture"]
  }


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
          return setUsers(filterUsers)
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  return (
    <Wrapper>
      <Link onClick={() => csvDownload(dataToConvert)}>Download CSV <ImDownload /> </Link>

      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                column.Header === 'Edad' ?
                  <TableHeader {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {column.isSorted ? (column.isSortedDesc ? <ImSortAmountDesc style={{ paddingTop: "2px" }} /> : <ImSortAmountAsc style={{ paddingTop: "2px" }} />) : <ImFilter style={{ width: "12px", height: "12px", marginTop: "4px", marginLeft: "4px" }} />}
                  </TableHeader>
                  :
                  <TableHeader {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {/* {column.isSorted ? (column.isSortedDesc ? <ImSortAmountDesc style={{ paddingTop: "2px" }} /> : <ImSortAmountAsc style={{ paddingTop: "2px" }} />) : <ImFilter style={{ width: "12px", height: "12px", marginTop: "4px", marginLeft: "4px" }} />} */}
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
    </Wrapper>
  );

}