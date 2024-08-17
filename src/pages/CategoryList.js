import {Category_URL} from '../api'

//const Category_URL = "https://localhost:7130/Category";


export const get_CategoryList = async (value) => {
    try {
     const response = await fetch(`${Category_URL}?type=${value}`)
      if (response.ok){
        const result = await response.json()
        console.log(result)
        return result;
      }else{
        console.log('cannot fetch categories')
      }
    

    } catch (error) {
      console.log('Error fetching items:', error.message)
    }
  }

 