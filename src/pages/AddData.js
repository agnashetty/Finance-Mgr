import React, { useEffect, useState, useRef, useCallback, useContext } from 'react'
import '../styles/AddData.css'
import { get_CategoryList } from '../pages/CategoryList'
import { Authcontext } from '../components/Authcontext'
import {API_URL, Week_Url} from '../api'


const AddData = ({onDataAdded}) => {

  const [showform, setShowform] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [category, setCategory] = useState([])
  const [data, setData] = useState({
    Amount: 0,
    CategoryName: '',
    ShortDate: null, type: 'Expense', Note: '', CategoryID: 0
  })

  const {demo, IsdataAdd} = useContext(Authcontext);

  // const API_URL = "https://localhost:7130/FinanceLog";
  // const Week_Url = "https://localhost:7130/FinanceLog/Weekly";
  const formRef = useRef(null);

  const handleClickOutside = useCallback((e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      setShowform(!showform)
      setIsVisible(!isVisible)
    }

  }, [showform, isVisible]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);


  useEffect(() => {
    fetchCategories();
  }, [data.type]);


  useEffect(() => {
    fetchCategories();
  }, [])

  const fetchCategories = async () => {
    try {
      const categories = await get_CategoryList(data.type);

      setCategory(categories.data)
      if (categories.data) {
        if (categories.data.length > 0) {
          setData(prevData => ({
            ...prevData,
            CategoryName: categories.data[0].name
          }));
        }

      }

    } catch (error) {
      console.log('Error fetching categories: proc - fetchCategories', error.message)
    }
  };


  const fetchWeekItems = async () => {
    try {
      const response = await fetch(Week_Url)
      const result = await response.json()
      if (response.ok) {
        if (Array.isArray(result.data)) {
          setWeeklydata(result.data);
          console.log(result.data)
        } else {
          console.error('API response is not an array:');
        }
      }
    } catch (error) {
      console.error('Error fetching items:', error.message);
    }
  };


  const AddBtn_click = () => {
    setShowform(!showform)
    setIsVisible(!isVisible)
  }



  const SubmitData = async (e) => {
    e.preventDefault()
    try {
      if (demo){
       alert("Please Register to use this Feature..!")
      }else{
        const response = await fetch(API_URL, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
  
        if (response.ok) {
          setShowform(!showform)
          setIsVisible(!isVisible)
          alert("Data added succesfully")
          onDataAdded();
          fetchWeekItems();
        } else {
          alert("Something went wrong..")
          const errorData = await response.json();
          console.log('Error:', response.statusText, errorData);
        }
      }
     
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    })

  }


  return (
    <div >
      {isVisible && (
        <button className='btnplus' onClick={() => AddBtn_click()}>+</button>
      )}

      {showform && (
        <div className="form-container">
          <form action="" ref={formRef} onSubmit={SubmitData} className='formAddData'>
            <label >Amount</label>
            <input type="number" name='Amount' onChange={handleChange} required />
            <label >Category</label>
            <select name="CategoryName" id="" value={data.CategoryName} onChange={handleChange} required>
              {Array.isArray(category) && category.length > 0 ? category.map((item) =>
              (<option name='CategoryName' key={item.id}> {item.name}</option>
              )) : ('No category!')}
            </select>
            <label >Date</label>
            <input type="date" name='ShortDate' onChange={handleChange} required />
            <label >Note</label>
            <input type="text" name='Note' onChange={handleChange} />
            <select name="type" id="type" onChange={handleChange} required>
              <option value="Expense"  >Expense</option>
              <option value="Income" >Income</option>
            </select>

            <input type="submit" value="Submit" />
          </form>


        </div>

      )}


    </div>
  )
}

export default AddData
