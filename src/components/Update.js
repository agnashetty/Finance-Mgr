import React, { useEffect, useState } from 'react'
import { get_CategoryList } from '../pages/CategoryList'
import '../styles/Update.css'
import { API_URL,Category_URL } from '../api';




const Update = ({ ID, isFinanceLog, OnUpdate }) => {

    const [isopen, setIsopen] = useState(true)
    const [category, setCategory] = useState([]);
    const [data, setData] = useState({
        shortDate: '',
        categoryName: '',
        type: '',
        note: '',
        amount: null
    });



    const fetchCategories = async (value) => {
        try {
            const categories = await get_CategoryList(value);

            setCategory(categories.data)

            console.log('error in fetching catgeories')




        } catch (error) {
            console.log('Error fetching categories: proc - fetchCategories', error.message)
        }
    };

    useEffect(() => {

        console.log(ID)
        if (isFinanceLog) {
            GetDataByID(ID, API_URL)
        } else {
            GetDataByID(ID, Category_URL)
        }

    }, [ID]);


  

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target.value)
        setData({
            ...data,
            [name]: value
        })
    }



    const GetDataByID = async (ID, url) => {
        try {
            const response = await fetch(`${url}/${ID}`)
            const result = await response.json()
            if (response.ok) {

                setData(result.data)
                fetchCategories(result.data.type);
                console.log(result.data.type)
            }

        } catch (error) {
            console.log(error.message)
        }
    }



    const UpdateData = async (e, url) => {
        e.preventDefault();
        try {
            const response = await fetch(`${url}/${ID}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
            if (response.ok) {
                OnUpdate();
                alert("Data Updated succesfully")
            } else {
                console.log("Error in fetching data")

            }
        } catch (error) {
            console.log(error.message)
        }

    }


    const setClose = () => {
        setIsopen(false)
    }

    return (
        <div>
            {isopen &&
                <div className='Updatecontainer'>

                    {isFinanceLog ? (
                        <form action="" onSubmit={(e) => UpdateData(e, API_URL)} className='financeform'>
                            <label >Amount</label>
                            <input type="number" name='Amount' onChange={handleChange} required />
                            <label >Category</label>
                            <select name="CategoryName" id=""  onChange={handleChange} required>
                                {category.length > 0 ? category.map((item) =>
                                (<option name='CategoryName' key={item.id}> {item.name}</option>
                                )) : ('')}
                            </select>
                            <label >Date</label>
                            <input type="date" name='ShortDate' onChange={handleChange} required />
                            <label >Note</label>
                            <input type="text" name='Note' onChange={handleChange} />
                            <select name="type" id="type"  onChange={handleChange} required>
                                <option value="Expense"  >Expense</option>
                                <option value="Income" >Income</option>
                            </select>

                            <input type="submit" value="Submit" />
                        </form>
                    ) : (
                        <form action="" onSubmit={() => UpdateData(Category_URL)} className='categoryform'>
                            <input type="radio" name="CategoryType" value="Expense" id="expense" onChange={handleChange} checked={data.CategoryType === 'Expense'} />
                            <label htmlFor="expense">Expense</label>
                            <input type="radio" name="CategoryType" value="Income" id="income" onChange={handleChange} checked={data.CategoryType === 'Income'} />
                            <label htmlFor="income">Income</label>
                            <input type="text" name='Name' id='categorytxt' onChange={handleChange} />
                            <input type="submit" value="Submit" />
                        </form>
                    )}
                    <div className='closebtn'>
                    <button onClick={setClose} >Close</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Update
