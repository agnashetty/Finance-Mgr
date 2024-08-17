import axios from 'axios';

const API_URL = "/FinanceLog/";
const Week_Url = "/FinanceLog/Weekly";
const Category_URL = "/Category/";
const Category_Expense = "/FinanceLog/CategoryExpense";
const Category_Income = "/FinanceLog/CategoryIncome";
const Month_Url = "/FinanceLog/Monthly/";
const MonthExpense_Url = "FinanceLog/Month-Expense/";
const MonthIncome_Url = "/FinanceLog/Month-Income/";
const Reg_URL = "/User/register";
const Login_URL = "/User/login";
const Logout_URL = "/User/logout";
const Total_Income = "/FinanceLog/TotalIncome";
const Total_Expense = "/FinanceLog/TotalExpense";
const Token_Url = "/User/SetToken";
export {API_URL, Token_Url, Week_Url,Category_URL,Month_Url,MonthExpense_Url,MonthIncome_Url,Reg_URL,Login_URL,Logout_URL,Category_Expense,Category_Income,Total_Income,Total_Expense};