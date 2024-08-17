import React, { useContext } from 'react'
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import "../styles/PieChart.css"
import { Authcontext } from './Authcontext';
import {Category_Expense,Category_Income,Total_Income,Total_Expense} from '../api'


ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({isdataAdded, onUpdate}) => {
const {demo} = useContext(Authcontext)
    const [TotalIncome, setTotalIncome] = useState(0)
    const [TotalExpense, setTotalExpense] = useState(0)
    const [ExpenseData, setExpensedata] = useState([])
    const [IncomeData, setIncomeData] = useState([])
const [Balance , setBalance]= useState(0);

useEffect(() => {
  
        getTotalExpense();
        getTotalIncome();
        getExpenseByCategory();
        getIncomeByCategory();
  
}, [])

    useEffect(() => {
        if (isdataAdded){
            getTotalExpense();
            getTotalIncome();
            getExpenseByCategory();
            getIncomeByCategory();
            onUpdate();
        }
       
    }, [isdataAdded])


    const getExpenseByCategory = async () => {
        try {
            if (!demo ){
                const response = await fetch(Category_Expense)
                if (response.ok) {
                    const result = await response.json()
                    setExpensedata(result.data)
                }
            }
          
        } catch (error) {
            console.log(error.message)
        }
    }

    const getIncomeByCategory = async () => {
        try {
            if (!demo ){
                const response = await fetch(Category_Income)
                if (response.ok) {
                    const result = await response.json()
                    setIncomeData(result.data)
                }
            }
        
        } catch (error) {
            console.log(error.message)
        }
    }

    const getTotalIncome = async () => {
        try {
            if(demo){
                setTotalIncome(50000)
                setBalance(48400)
               
            }else{
                const response = await fetch(Total_Income)
                if (response.ok) {
                    const result = await response.json()
                   if (result){
                    setTotalIncome(result)
                    setBalance(TotalIncome - TotalExpense)
                   }
                }
            }
          
        } catch (error) {
            console.log(error.message)
        }
    }



    const getTotalExpense = async () => {
        try {
            if (demo){
                setTotalExpense(1600)
            }else{
                const response = await fetch(Total_Expense)
                if (response.ok) {
                    const result = await response.json()
                    setTotalExpense(result)
                }
            }
           
        } catch (error) {
            console.log(error.message)
        }
    }


    const Expensedata =(Array.isArray(ExpenseData) && ExpenseData.length > 0) ? {
        labels: ExpenseData.map(item => item.categoryName),
        datasets: [
            {
                data: ExpenseData.map(expense => expense.amount),
                backgroundColor: [
                    'rgba(237, 245, 109 , 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(149, 155, 54 , 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
              
            },
        ]
    } : {
        labels: ['Category A', 'Category B', 'Category C', 'Category D'],
        datasets: [
            {
                label: ["Income"],
                data: [300, 50, 100, 150],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const Incomeedata = (Array.isArray(IncomeData) && IncomeData.length > 0) ? {
        labels: IncomeData.map(item => item.categoryName),
        datasets: [
            {
                data: IncomeData.map(income => income.amount),
                backgroundColor: [
                    'rgba(237, 245, 109 , 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(149, 155, 54 , 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ]
    }: {
        labels: ['Category A', 'Category B', 'Category C', 'Category D'],
        datasets: [
            {
                label: ["Income"],
                data: [300, 50, 100, 150],
                backgroundColor: [
                    'rgba(252, 245, 148, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }





    return (
        <div className='piecontainer'>
            <div className="expenseChart">
                <div className="Incomepiechart">
                <Pie data={Expensedata} ></Pie>
                </div>
                <h2>Total Expense: Rs.{TotalExpense}/-</h2>
            </div>

            <div className="incomeChart">
                <div className="Expensepiechart">
                    <Pie data={Incomeedata} ></Pie>
                </div>
                <h2>Total Income: Rs.{TotalIncome}/- </h2>
            </div>
            <div className="balance">
                
            <p><b>Balance : Rs.{Balance}</b> </p>
            </div>
           
        </div>
    )
}

export default PieChart
