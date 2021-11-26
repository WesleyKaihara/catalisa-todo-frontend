import 'antd/dist/antd.css';
import axios from 'axios';
import localStorageHelper from './helpers/localstorage-helper'

axios.defaults.baseURL = 'https://catalisa-todo-backend.lab.smarppy.com';

axios.interceptors.request.use((request) =>{
    request.headers.token = localStorageHelper.getToken();
    return request;
})