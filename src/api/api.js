import axios from 'axios';

let base = '';


//换休管理

//添加值班记录
export const addDutyRecords = params => { return axios.post(`${base}/dutyrecords/add`, { params: params }); };

//获取值班记录
export const getDutyRecord = params => { return axios.post(`${base}/dutyrecords/get`, { params: params }); };

//获排班记录
export const getDutySchedule = params => { return axios.get(`${base}/dutyschedule/get`, { params: params }); };

//按值班人ID获取排班记录
export const getDutySchedulebyEmpid = params => { return axios.post(`${base}/dutyschedule/getbyempid`, { params: params }); };

//获取值班日期
export const getDutyDates = params => { return axios.post(`${base}/dutydate/get`, { params: params }); };


//添加换休申请记录
export const addBreakRecords = params => { return axios.post(`${base}/breakrecords/add`, { params: params }); };

//获换休记录
export const getBreakRecords = params => { return axios.get(`${base}/breakrecords/get`, { params: params }); };

//更新换休记录
export const updateBreakRecords = params => { return axios.post(`${base}/breakrecords/update`, { params: params }); };

//获取登录人员信息(测试用)
export const getLoginUser = params => { return axios.get(`${base}/loginuser/get`, { params: params }); };

//获取人员信息
export const getUserInfo = params => { return axios.post(`${base}/userinfo/get`, { params: params }); };

//获取所有人员信息
export const getAllUserInfo = params => { return axios.get(`${base}/userinfo/getall`, { params: params }); };

//添加换休申请记录
export const addSwapRecords = params => { return axios.post(`${base}/swaprecords/add`, { params: params }); };









//人员管理

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };


//角色管理


export const getRoleList = params => { return axios.get(`${base}/role/list`, { params: params }); };

export const getRoleListPage = params => { return axios.get(`${base}/role/listpage`, { params: params }); };

export const removeRole = params => { return axios.get(`${base}/role/remove`, { params: params }); };

export const batchRemoveRole = params => { return axios.get(`${base}/role/batchremove`, { params: params }); };

export const editRole = params => { return axios.get(`${base}/role/edit`, { params: params }); };

export const addRole = params => { return axios.get(`${base}/role/add`, { params: params }); };


//客户管理
export const getCustListPage = params => { return axios.get(`${base}/cust/listpage`, { params: params }); };

export const editCust = params => { return axios.get(`${base}/cust/edit`, { params: params }); };

export const removeCust = params => { return axios.get(`${base}/cust/remove`, { params: params }); };

export const addCusts = params => { return axios.post(`${base}/cust/add`, params); };

//分润结果管理

export const addProfitShareResult = params => { return axios.post(`${base}/profitshareresult/add`, params); };

export const getProfitShareResult = params => { return axios.get(`${base}/profitshareresult/list`, { params: params }); };

export const editProfitShareResult = params => { return axios.post(`${base}/profitshareresult/edit`, params); };