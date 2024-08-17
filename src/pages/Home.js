import '../styles/Home.css'
import PieChart from '../components/PieChart'
import { useContext, useEffect, useState } from 'react'
import { format, getDate } from 'date-fns';
import { Authcontext } from '../components/Authcontext';
import {Week_Url} from '../api'


const Home = ({isdataAdded, onUpdate}) => {

  const {demo} = useContext(Authcontext)
  const [weeklydata, setWeeklydata] = useState([]);
  const formtDate = (value) => {
    const formattedDate = format(new Date(value), "dd-MM-yyyy")
    return formattedDate
  }

  useEffect(() => {
    fetchItems();
  }, [])

  const fetchItems = async () => {
    try {
      if (demo){
        const today = new Date()
        setWeeklydata(
          [{ amount: 500, categoryName: 'Food', shortDate: today, type: 'Expense', note: '' },
          { amount: 100, categoryName: 'Food', shortDate: today, type: 'Expense', note: '' },
          { amount: 1000, categoryName: 'Shopping', shortDate: today, type: 'Expense', note: '' },
          { amount: 50000, categoryName: 'Salary', shortDate: today, type: 'Income', note: '' },
         
          ]
        )
      }else{
        const response = await fetch(Week_Url)
        const result = await response.json()
        if (response.ok) {
          if (Array.isArray(result.data)) {
            setWeeklydata(result.data);
          } else {
            console.error('API response is not an array:');
          }
        }
      }
      
    } catch (error) {
      console.error('Error fetching items:', error.message);
    }
  };

  return (
    <div className="Maincontainer">
      <div className='Homecontainer'>
        <PieChart isdataAdded={isdataAdded} onUpdate={onUpdate} />
      </div>


      <div className="weekly">
      <label className='weekTitle'>WEEKLY REPORT</label>
        {Array.isArray(weeklydata) && weeklydata.length > 0 ?
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
                {weeklydata.map((item, index) => {
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
            <h2>Loading..Please wait...</h2>
          )}

      </div >

    </div>
  )

}


export default Home
