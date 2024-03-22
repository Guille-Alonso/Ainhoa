import { FaEye } from "react-icons/fa";
import React from 'react'
import { Table } from 'reactstrap'

const TableOrdersProducts = () => {
  return (
    <Table responsive>
    <thead>
      <tr>
        <th>
          #
        </th>
        <th>
          Table heading
        </th>
        <th>
          Table heading
        </th>
        <th>
          Table heading
        </th>
        <th>
          Table heading
        </th>
        <th>
          Table heading
        </th>
        <th>
         Ver
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">
          1
        </th>
        <td>
          Table cell
        </td>
        <td>
          Table cell
        </td>
        <td>
          Table cell
        </td>
        <td>
          Table cell
        </td>
        <td>
          Table cell
        </td>
        <td>
        <FaEye onClick={()=>console.log("fdsfsdfd")}/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          2
        </th>
        <td>
          Table cell
        </td>
        <td>
          Table cell
        </td>
        <td>
          Table cell
        </td>
        <td>
          Table cell
        </td>
        <td>
          Table cell
        </td>
        <td>
        <FaEye onClick={()=>console.log("fdsfsdfd")}/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          3
        </th>
        <td>
          Table cell
        </td>
        <td>
          Table cell
        </td>
        <td>
          Table cell
        </td>
        <td>
          Table cell
        </td>
        <td>
          Table cell
        </td>
        <td>
        <FaEye onClick={()=>console.log("fdsfsdfd")}/>
        </td>
      </tr>
    </tbody>
  </Table>
  )
}

export default TableOrdersProducts