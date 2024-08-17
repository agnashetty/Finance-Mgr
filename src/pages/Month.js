import React, { useState, useEffect } from 'react'
import { format } from 'date-fns';
import '../styles/Month.css'
import {Month_Url,MonthExpense_Url,MonthIncome_Url} from '../api'

const Month = () => {
  // const Month_Url = "https://localhost:7130/FinanceLog/Monthly/";
  // const MonthExpense_Url = "https://localhost:7130/FinanceLog/Month-Expense/";
  // const MonthIncome_Url = "https://localhost:7130/FinanceLog/Month-Income/";
  const [monthData, setMonthData] = useState([])

  useEffect(() => {
    fetchItems(Month_Url);
  }, [])

  const date = new Date();
  const currentMonth = date.getMonth() + 1; // getMonth() returns 0-11, so add 1 to get 1-12
  const currentYear = date.getFullYear();


  const formtDate = (value) => {
    const formattedDate = format(new Date(value), "dd-MM-yyyy")
    return formattedDate
  }


  const fetchItems = async (Month_Url) => {
    try {
      const response = await fetch(`${Month_Url}?year=${currentYear}&month=${currentMonth}`)
      const result = await response.json()
      if (response.ok) {
        if (Array.isArray(result.data)) {
          setMonthData(result.data);
          console.log(result.data)
        } else {
          console.error('API response is not an array:');
        }
      }
    } catch (error) {
      console.error('Error fetching items:', error.message);
    }
  };


  const fetchByType = async (Url) => {
    try {
      fetchItems(Url);
    } catch (error) {

    }
  }

  return (
    <div>
      <div className="btn-filter">
        <button onClick={() => fetchByType(Month_Url)}>ALL</button>
        <button onClick={() => fetchByType(MonthExpense_Url)}>EXPENSE</button>
        <button onClick={() => fetchByType(MonthIncome_Url)}>INCOME</button>
      </div>


      <div className="monthly">
        {Array.isArray(monthData) && monthData.length > 0 ?
          (
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Note</th>
                  <th>Amount</th>
                </tr>
              </thead>

              <tbody>
                {monthData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{formtDate(item.shortDate)}</td>
                      <td>{item.categoryName}</td>
                      <td>{item.type}</td>
                      <td>{item.note}</td>
                      <td>{item.amount}</td>
                    </tr>
                  )

                })}
              </tbody>
            </table>

          ) : (
            <h2 className='NoReport'>Loading..Please wait...</h2>
          )}

      </div >
    </div>
  )
}

export default Month