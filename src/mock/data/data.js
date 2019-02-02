import Mock from 'mockjs';
import admin from '@/assets/admin.png'

//模拟登陆用户
const LoginUsers = 
  {
    id: '250671',
    name: '赵燕军',
    role: 'admin',
    rolename: '员工',
    gender: 'm'
  };
//模拟用户
const Users = [];

Users.push({id: '050116', name: '吕辉', role: 'leader', rolename: '领导', gender: 'm'})
Users.push({id: '050275', name: '李强', role: 'emp', rolename: '员工', gender: 'm'})
Users.push({id: '050117', name: '张社教', role: 'emp', rolename: '员工', gender: 'm'})
Users.push({id: '050310', name: '郑宝山', role: 'emp', rolename: '员工', gender: 'm'})
Users.push({id: '050113', name: '柳泉', role: 'emp', rolename: '员工', gender: 'm'})
Users.push({id: '250016', name: '李楠', role: 'emp', rolename: '员工', gender: 'f'})
Users.push({id: '250671', name: '赵燕军', role: 'emp', rolename: '员工', gender: 'm'})
Users.push({id: '264488', name: '李子延', role: 'emp', rolename: '员工', gender: 'm'})

// for (let i = 0; i < 10; i++) {
//   Users.push(Mock.mock({
//     id: Mock.Random.string('number',6,6),   //生成一事通ID
//     name: Mock.Random.cname(),
//     role: Mock.Random.pick(['emp','leader']),
//     rolename: Mock.Random.pick(['员工','领导']),
//     gender: Mock.Random.pick(['m','f'])
//   }));
// }

//值班信息表
const DutySchedules = []

DutySchedules.push({dutydate: '2019-01-02', dutymanager: '张社教',dutymanagerid: '050117', dutyemp: '赵燕军',dutyempid: '250671',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-01-03', dutymanager: '张社教',dutymanagerid: '050117', dutyemp: '柳泉', dutyempid: '050113', remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-01-04', dutymanager: '张社教',dutymanagerid: '050117', dutyemp: '李强',dutyempid: '050275',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-01-05', dutymanager: '赵燕军',dutymanagerid: '250671', dutyemp: '张社教',dutyempid: '050117',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-01-06', dutymanager: '赵燕军',dutymanagerid: '250671', dutyemp: '郑宝山',dutyempid: '050310',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-01-07', dutymanager: '赵燕军',dutymanagerid: '250671', dutyemp: '李子延',dutyempid: '264488',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-01-08', dutymanager: '赵燕军', dutymanagerid: '250671',dutyemp: '李楠', dutyempid: '250016', remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-01-09', dutymanager: '赵燕军',dutymanagerid: '250671', dutyemp: '赵燕军',dutyempid: '250671',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-01-10', dutymanager: '赵燕军',dutymanagerid: '250671', dutyemp: '柳泉',dutyempid: '050113',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-01-11', dutymanager: '赵燕军',dutymanagerid: '250671', dutyemp: '李强',dutyempid: '050275',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-01-12', dutymanager: '李强',dutymanagerid: '050275', dutyemp: '郑宝山',dutyempid: '050310',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-01-13', dutymanager: '李强',dutymanagerid: '050275', dutyemp: '李子延',dutyempid: '264488',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-01-14', dutymanager: '李强',dutymanagerid: '050275', dutyemp: '李楠',dutyempid: '250016',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-01-15', dutymanager: '李强',dutymanagerid: '050275', dutyemp: '赵燕军',dutyempid: '250671',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-01-16', dutymanager: '李强',dutymanagerid: '050275', dutyemp: '柳泉',dutyempid: '050113',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-01-17', dutymanager: '李强',dutymanagerid: '050275', dutyemp: '李强',dutyempid: '050275',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-01-18', dutymanager: '李强',dutymanagerid: '050275', dutyemp: '张社教',dutyempid: '050117',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-01-19', dutymanager: '吕辉',dutymanagerid: '050116', dutyemp: '李子延',dutyempid: '264488',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-01-20', dutymanager: '吕辉',dutymanagerid: '050116', dutyemp: '李楠',dutyempid: '250016',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-01-21', dutymanager: '吕辉',dutymanagerid: '050116', dutyemp: '赵燕军',dutyempid: '250671',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-01-22', dutymanager: '吕辉',dutymanagerid: '050116', dutyemp: '柳泉',dutyempid: '050113',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-01-23', dutymanager: '吕辉',dutymanagerid: '050116', dutyemp: '李强',dutyempid: '050275',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-01-24', dutymanager: '吕辉',dutymanagerid: '050116', dutyemp: '张社教',dutyempid: '050117',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-01-25', dutymanager: '吕辉',dutymanagerid: '050116', dutyemp: '郑宝山',dutyempid: '050310',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-01-26', dutymanager: '李楠',dutymanagerid: '250016', dutyemp: '李楠',dutyempid: '250016',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-01-27', dutymanager: '李楠',dutymanagerid: '250016', dutyemp: '赵燕军',dutyempid: '250671',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-01-28', dutymanager: '李楠',dutymanagerid: '250016', dutyemp: '柳泉',dutyempid: '050113',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-01-29', dutymanager: '李楠',dutymanagerid: '250016', dutyemp: '李强',dutyempid: '050275',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-01-30', dutymanager: '李楠',dutymanagerid: '250016', dutyemp: '张社教',dutyempid: '050117',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-01-31', dutymanager: '李楠',dutymanagerid: '250016', dutyemp: '郑宝山',dutyempid: '050310',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-02-01', dutymanager: '张社教',dutymanagerid: '050117', dutyemp: '李子延',dutyempid: '264488',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-02-02', dutymanager: '张社教',dutymanagerid: '050117', dutyemp: '赵燕军', dutyempid: '250671', remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-02-03', dutymanager: '张社教',dutymanagerid: '050117', dutyemp: '吕辉',dutyempid: '050116',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-02-04', dutymanager: '吕辉',dutymanagerid: '050116', dutyemp: '吕辉',dutyempid: '050116',  remark: '', isWeekend: '', isHoliday: '1'})
DutySchedules.push({dutydate: '2019-02-05', dutymanager: '吕辉',dutymanagerid: '050116', dutyemp: '王海涛',dutyempid: '050148',  remark: '', isWeekend: '', isHoliday: '1'})
DutySchedules.push({dutydate: '2019-02-06', dutymanager: '吕辉',dutymanagerid: '050116', dutyemp: '张社教',dutyempid: '050117',  remark: '', isWeekend: '', isHoliday: '1'})
DutySchedules.push({dutydate: '2019-02-07', dutymanager: '吕辉',dutymanagerid: '050116', dutyemp: '柳泉',dutyempid: '050113',  remark: '', isWeekend: '', isHoliday: '1'})
DutySchedules.push({dutydate: '2019-02-08', dutymanager: '吕辉',dutymanagerid: '050116', dutyemp: '杜玉洁',dutyempid: '250996',  remark: '', isWeekend: '', isHoliday: '1'})
DutySchedules.push({dutydate: '2019-02-09', dutymanager: '吕辉',dutymanagerid: '050116', dutyemp: '李强',dutyempid: '050275',  remark: '', isWeekend: '', isHoliday: '1'})
DutySchedules.push({dutydate: '2019-02-10', dutymanager: '吕辉',dutymanagerid: '050116', dutyemp: '郑宝山',dutyempid: '050310',  remark: '', isWeekend: '', isHoliday: '1'})

DutySchedules.push({dutydate: '2019-02-11', dutymanager: '李楠',dutymanagerid: '250016', dutyemp: '李楠',dutyempid: '250016',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-02-12', dutymanager: '李楠',dutymanagerid: '250016', dutyemp: '赵燕军',dutyempid: '250671',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-02-13', dutymanager: '李楠',dutymanagerid: '250016', dutyemp: '李子延',dutyempid: '264488',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-02-14', dutymanager: '李楠',dutymanagerid: '250016', dutyemp: '张社教',dutyempid: '050117',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-02-15', dutymanager: '李楠',dutymanagerid: '250016', dutyemp: '郑宝山',dutyempid: '050310',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-02-16', dutymanager: '李楠',dutymanagerid: '250016', dutyemp: '赵燕军',dutyempid: '250671',  remark: '', isWeekend: '', isHoliday: ''})
DutySchedules.push({dutydate: '2019-02-17', dutymanager: '李楠',dutymanagerid: '250016', dutyemp: '李子延',dutyempid: '264488',  remark: '', isWeekend: '', isHoliday: ''})

//对周末情况做标记，周六周日remark字段设置为1 ; 节假日值班也需要将remark
for(var i=0; i<DutySchedules.length; i++){
  let day = new Date(DutySchedules[i].dutydate).getDay()
  if(day === 0 || day === 6)
    DutySchedules[i].isWeekend = '1'
}

console.log("DutySchedules:")
console.table(DutySchedules)

// //将姓名和id组合
// let DutyScheduleNew = []
// for (let i = 0; i < DutySchedules.size; i++) {
//   let schedule = DutySchedules[i]
//   for(let j = 0; j < Users.size; j++){
    
//     if(schedule.dutymanager === Users[j].name){
//       schedule.dutymanagerid =  Users[j].id
//     }
//     if(schedule.dutyemp === Users[j].name){
//       schedule.dutyempid =  Users[j].id
//     }
//   }
//   DutyScheduleNew.push(schedule);
// }

//值班记录
const DutyRecords = []

DutyRecords.push({dutyempid: '050275', dutyempname: '李强',dutydate: '2018/12/20', dutystatus: '1', breakstatus: '0', isWeekend: '', isHoliday: '', isSwap:'', swapempid:'', swapempname:'', swapdate:''})
DutyRecords.push({dutyempid: '050275', dutyempname: '李强',dutydate: '2019/1/4', dutystatus: '1', breakstatus: '0', isWeekend: '', isHoliday: '', isSwap:'', swapempid:'', swapempname:'', swapdate:''})
DutyRecords.push({dutyempid: '050275', dutyempname: '李强',dutydate: '2019/1/11', dutystatus: '1', breakstatus: '0', isWeekend: '', isHoliday: '', isSwap:'', swapempid:'', swapempname:'', swapdate:''})
DutyRecords.push({dutyempid: '050117', dutyempname: '张社教',dutydate: '2018/12/20', dutystatus: '1', breakstatus: '0', isWeekend: '', isHoliday: '', isSwap:'', swapempid:'', swapempname:'', swapdate:''})
DutyRecords.push({dutyempid: '050117', dutyempname: '张社教',dutydate: '2019/1/4', dutystatus: '1', breakstatus: '0', isWeekend: '', isHoliday: '', isSwap:'', swapempid:'', swapempname:'', swapdate:''})
DutyRecords.push({dutyempid: '050117', dutyempname: '张社教',dutydate: '2019/1/11', dutystatus: '1', breakstatus: '0', isWeekend: '', isHoliday: '', isSwap:'', swapempid:'', swapempname:'', swapdate:''})
DutyRecords.push({dutyempid: '050310', dutyempname: '郑宝山',dutydate: '2018/12/20', dutystatus: '1', breakstatus: '0', isWeekend: '', isHoliday: '', isSwap:'', swapempid:'', swapempname:'', swapdate:''})
DutyRecords.push({dutyempid: '050310', dutyempname: '郑宝山',dutydate: '2019/1/4', dutystatus: '1', breakstatus: '0', isWeekend: '', isHoliday: '', isSwap:'', swapempid:'', swapempname:'', swapdate:''})
DutyRecords.push({dutyempid: '050310', dutyempname: '郑宝山',dutydate: '2019/1/11', dutystatus: '1', breakstatus: '0', isWeekend: '', isHoliday: '', isSwap:'', swapempid:'', swapempname:'', swapdate:''})
DutyRecords.push({dutyempid: '050113', dutyempname: '柳泉',dutydate: '2018/12/20', dutystatus: '1', breakstatus: '0', isWeekend: '', isHoliday: '', isSwap:'', swapempid:'', swapempname:'', swapdate:''})
DutyRecords.push({dutyempid: '050113', dutyempname: '柳泉',dutydate: '2019/1/4', dutystatus: '1', breakstatus: '0', isWeekend: '', isHoliday: '', isSwap:'', swapempid:'', swapempname:'', swapdate:''})
DutyRecords.push({dutyempid: '050113', dutyempname: '柳泉',dutydate: '2019/1/11', dutystatus: '1', breakstatus: '0', isWeekend: '', isHoliday: '', isSwap:'', swapempid:'', swapempname:'', swapdate:''})
DutyRecords.push({dutyempid: '250016', dutyempname: '李楠',dutydate: '2018/12/20', dutystatus: '1', breakstatus: '0', isWeekend: '', isHoliday: '', isSwap:'', swapempid:'', swapempname:'', swapdate:''})
DutyRecords.push({dutyempid: '250016', dutyempname: '李楠',dutydate: '2019/1/4', dutystatus: '1', breakstatus: '0', isWeekend: '', isHoliday: '', isSwap:'', swapempid:'', swapempname:'', swapdate:''})
DutyRecords.push({dutyempid: '250016', dutyempname: '李楠',dutydate: '2019/1/11', dutystatus: '1', breakstatus: '0', isWeekend: '', isHoliday: '', isSwap:'', swapempid:'', swapempname:'', swapdate:''})
DutyRecords.push({dutyempid: '250671', dutyempname: '赵燕军',dutydate: '2018/1/9', dutystatus: '1', breakstatus: '0', isWeekend: '', isHoliday: '', isSwap:'', swapempid:'', swapempname:'', swapdate:''})
DutyRecords.push({dutyempid: '250671', dutyempname: '赵燕军',dutydate: '2019/1/15', dutystatus: '1', breakstatus: '0', isWeekend: '', isHoliday: '', isSwap:'', swapempid:'', swapempname:'', swapdate:''})
DutyRecords.push({dutyempid: '250671', dutyempname: '赵燕军',dutydate: '2019/1/21', dutystatus: '1', breakstatus: '0', isWeekend: '', isHoliday: '', isSwap:'', swapempid:'', swapempname:'', swapdate:''})
DutyRecords.push({dutyempid: '250671', dutyempname: '赵燕军',dutydate: '2019/1/27', dutystatus: '1', breakstatus: '0', isWeekend: '', isHoliday: '', isSwap:'', swapempid:'', swapempname:'', swapdate:''})
DutyRecords.push({dutyempid: '264488', dutyempname: '李子延',dutydate: '2018/12/20', dutystatus: '1', breakstatus: '0', isWeekend: '', isHoliday: '', isSwap:'', swapempid:'', swapempname:'', swapdate:''})
DutyRecords.push({dutyempid: '264488', dutyempname: '李子延',dutydate: '2019/1/4', dutystatus: '1', breakstatus: '0', isWeekend: '', isHoliday: '', isSwap:'', swapempid:'', swapempname:'', swapdate:''})
DutyRecords.push({dutyempid: '264488', dutyempname: '李子延',dutydate: '2019/1/11', dutystatus: '1', breakstatus: '0', isWeekend: '', isHoliday: '', isSwap:'', swapempid:'', swapempname:'', swapdate:''})

//周末标志置为1
for(var i=0; i<DutyRecords.length; i++){
  let day = new Date(DutyRecords[i].dutydate).getDay()
  if(day === 0 || day === 6)
    DutyRecords[i].isWeekend = '1'
}

console.log("DutyRecords:")
console.table(DutyRecords)

//换休记录
const BreakRecords = []


BreakRecords.push({"breakempid":"050117","breakempname":"张社教","breakdate":"2019/1/24","dutydates":[{dutydate:"2018/12/20"},{dutydate:"2019/1/4"},{dutydate:"2019/1/11"}],"submitdate":"2019/1/18","status":"0"})
BreakRecords.push({"breakempid":"264488","breakempname":"李子延","breakdate":"2019/1/24","dutydates":[{dutydate:"2018/12/20"},{dutydate:"2019/1/4"},{dutydate:"2019/1/11"}],"submitdate":"2019/1/18","status":"0"})
BreakRecords.push({"breakempid":"250671","breakempname":"赵燕军","breakdate":"2019/1/24","dutydates":[{dutydate:"2018/12/20"},{dutydate:"2019/1/4"},{dutydate:"2019/1/11"}],"submitdate":"2019/1/18","status":"1"})
BreakRecords.push({"breakempid":"250016","breakempname":"李楠","breakdate":"2019/1/24","dutydates":[{dutydate:"2018/12/20"},{dutydate:"2019/1/4"},{dutydate:"2019/1/11"}],"submitdate":"2019/1/18","status":"1"})

//换班记录
const SwapRecords = []

SwapRecords.push({dutyempid: '264488', dutyempname: '李子延',dutydate: '2019/1/11', swapempid:'050310', swapempname:'郑宝山', swapdate:'2019/1/12', status: '0'})

export { LoginUsers, Users ,DutySchedules, BreakRecords, SwapRecords, DutyRecords};