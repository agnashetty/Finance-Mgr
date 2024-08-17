import React, { useCallback, useContext, useEffect, useState } from 'react'
import '../styles/AddCategory.css'
import Update from '../components/Update';
import { get_CategoryList } from '../pages/CategoryList'
import { Authcontext } from './Authcontext';
import {Category_URL} from '../api'

const AddCategory = () => {
    const [data, setData] = useState({ Name: '', CategoryType: 'Expense' });
    const [category, setCategory] = useState([]);
    const [updateID, setUpdateID] = useState(null);
    const [update, setUpdate] = useState(false)
    const { demo } = useContext(Authcontext)



    const fetchCategories = useCallback(async () => {
        try {
            if (demo) {
                if(data.CategoryType = 'Expense'){
                    setCategory([{ id: 1, name: 'Food' }, { id: 2, name: 'Shopping' }])

                }else{
                    setCategory([{ id: 1, name: 'Salary' }])

                }
            } else {
                const categories = await get_CategoryList(data.CategoryType);
                setCategory(categories.data)
            }

        } catch (error) {
            console.log('Error fetching items: proc - fetchCategories', error.message)
        }
    }, [data.CategoryType]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories])

    useEffect(() => {
        fetchCategories();
    }, [])

    const AddNewCategory = async (e) => {
        e.preventDefault()
        try {
            if (demo) {
                alert("Please register to use this feature..!")
            } else {
                const response = await fetch(Category_URL, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })

                if (response.ok) {
                    document.getElementById('categorytxt').value = '';
                    alert("Data added succesfully")
                    fetchCategories();
                } else {
                    console.log("Error in fetching data")
                }
            }


        } catch (error) {
            console.log(error.message)
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }


    const handleUpdate = (id) => {
        setUpdateID(id)
        setUpdate(true)
    }

    const handleUpdateSuccess = () => {
        setUpdate(false);

    };

    return (
        < div className='category_container'>
            <div className="category_form">
                <form action="" onSubmit={AddNewCategory} className=''>

                    <div className="radiocontainer">
                        <label htmlFor="expense" >EXPENSE</label>
                        <input type="radio" name="CategoryType" value="Expense" id="expense" onChange={handleChange} checked={data.CategoryType === 'Expense'} />
                    </div>
                    <div className="radiocontainer">
                        <label htmlFor="income" >INCOME</label>
                        <input type="radio" name="CategoryType" value="Income" id="income" onChange={handleChange} checked={data.CategoryType === 'Income'} />
                    </div>
                    <label htmlFor="">Enter new category</label>

                    <div className="input-group">
                        <input type="text" name='Name' id='categorytxt' onChange={handleChange} />
                        <button className='btn_add' >Add</button>
                    </div>
                </form>
            </div>
            {/* aog cr? add length properpty */}
            <div className="CategoryList">
                <h3 className='title'>CATEGORIES:</h3>
                <div className="list">
                    <tbody >
                        {Array.isArray(category) && category.length > 0 ? (
                            category.map((item) => (
                                <tr key={item.id} >
                                    <td className='tdata'>{item.name}</td>
                                    <button className='btndelete' onClick={() => handleUpdate(item.id)} >Update</button>
                                    {update && updateID === item.id &&
                                        (<Update ID={item.id} isFinanceLog={false} OnUpdate={handleUpdateSuccess} />)}

                                </tr>
                            ))
                        ) : (
                            <tr>No categories available.</tr>
                        )}
                    </tbody>
                </div>

            </div>

        </div>
    )
}

export default AddCategory
