import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import '../styles/Report.css'
import { format } from 'date-fns';
import Update from '../components/Update';
import { Authcontext } from '../components/Authcontext';
import {API_URL} from '../api'


const Report = () => {
  const [financelog, setFinancelog] = useState([]);
  const [update, setUpdate] = useState(false)
  const [updateID, setUpdateID] = useState(null);
  const { demo } = useContext(Authcontext)


  useEffect(() => {
    fetchItems();
  }, []);



  const fetchItems = async () => {
    try {
      if (demo) {
        setFinancelog(
          [{ amount: 500, categoryName: 'Food', shortDate: '02-08-2024', type: 'Expense', note: '' },
          { amount: 100, categoryName: 'Food', shortDate: '03-08-2024', type: 'Expense', note: '' },
          { amount: 1000, categoryName: 'Shopping', shortDate: '03-08-2024', type: 'Expense', note: '' },
          { amount: 50000, categoryName: 'Salary', shortDate: '01-08-2024', type: 'Income', note: '' },
          ]
        )

      } else {
        setFinancelog([])
        const response = await fetch(API_URL)
        const result = await response.json()
        if (response.ok) {
          if (Array.isArray(result.data)) {
            setFinancelog(result.data);

          } else {
            console.error('API response is not an array:');
          }
        }
      }

    } catch (error) {
      console.error('Error fetching items:', error.message);
    }
  };

  const formtDate = (value) => {
    const formattedDate = format(new Date(value), "dd-MM-yyyy")
    return formattedDate
  }

  const handleUpdate = (id) => {
    if (demo) {
      alert("Please register to use this feature")
    } else {
      setUpdateID(id)
      setUpdate(true)
    }

  }


  const handleDelete = (id) => {
    if (demo) {
      alert("Please register to use this feature")

    } else {
      setUpdate(false)
      DeletLog(id)
    }

  }

  const DeletLog = async (id) => {
    try {
      const response = await fetch((`${API_URL}${id}`), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.ok) {
        fetchItems();
      }
    } catch (error) {
      console.log(error.message)
    }

  }

  const handleUpdateSuccess = () => {
    setUpdate(false);
    fetchItems();
  };

  return (
    <div className='tabledata'>
      {Array.isArray(financelog) && financelog.length > 0 ? (

        <table>
          <thead className='tableContainer'>
            <tr>
              <th>Id</th>
              <th>Date</th>
              <th>Category</th>
              <th>Type</th>
              <th>Note</th>
              <th>Amount</th>
              <th>UPDATE</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {financelog.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{formtDate(item.shortDate)}</td>
                <td>{item.categoryName}</td>
                <td>{item.type}</td>
                <td>{item.note}</td>
                <td>{item.amount}</td>
                <td>
                  <button className='btnUpdate' onClick={() => handleUpdate(item.financeID)}>Update</button>
                </td>

                <td><button className='btnDelete' onClick={() => handleDelete(item.financeID)} >Delete</button></td>

                {update && updateID === item.financeID &&
                  (<Update ID={item.financeID} isFinanceLog={true} OnUpdate={handleUpdateSuccess} />)}

              </tr>
            ))}
          </tbody>
        </table>
      ) : (<h2 className='NoReport'>Loading. Please wait...</h2>)}
    </div>
  )
}

export default Report
