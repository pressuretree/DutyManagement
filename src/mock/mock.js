import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers, Users ,DutySchedules, BreakRecords, SwapRecords, DutyRecords} from './data/data';

let _LoginUsers = LoginUsers;
let _Users = Users;
let _DutySchedules = DutySchedules;
let _BreakRecords = BreakRecords;
let _SwapRecords = SwapRecords;
let _DutyRecords = DutyRecords;

export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });

    //登录
    mock.onPost('/login').reply(config => {
      let {username, password} = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u));
              user.password = undefined;
              return true;
            }
          });

          if (hasUser) {
            resolve([200, { code: 200, msg: '请求成功', user }]);
          } else {
            resolve([200, { code: 500, msg: '账号或密码错误' }]);
          }
        }, 1000);
      });
    });


    //获取已登录用户信息
    mock.onGet('/loginuser/get').reply(config => {
      console.log("获取已登录用户信息2")
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            loginuser: _LoginUsers
          }]);
        }, 1000);
      });
    });


    //获取用户信息
    mock.onPost('/userinfo/get').reply(config => {
      console.log("获取用户信息......")
      let {empid, empname} = JSON.parse(config.data).params;

      console.log("empid:",empid,"empname:", empname,"---------")

      let userinfo = {}

      for(var p in _Users){
        if(empname != '' && _Users[p].name === empname){
          userinfo = _Users[p]
          break
        }else{
          if(empid === _Users[p].id){
            userinfo = _Users[p]
            break
          }
        }
      }

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            userinfo: userinfo
          }]);
        }, 1000);
      });
    });

    //获取所有用户信息
    mock.onGet('/userinfo/getall').reply(config => {
      console.log("获取所有用户信息......")

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: _Users
          }]);
        }, 1000);
      });
    });


    //获取排班信息
    mock.onGet('/dutyschedule/get').reply(config => {
      console.log("获取排班信息。。。。")
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            dutyschedule: _DutySchedules
          }]);
        }, 1000);
      });
    });

    //按值班人id获取排班信息
    mock.onPost('/dutyschedule/getbyempid').reply(config => {
      let id = JSON.parse(config.data).params.empid
      let dutyschedulebyid = []
      let now = new Date().getTime()
      for(var i=0; i<_DutySchedules.length; i++){
        let date = new Date(_DutySchedules[i].dutydate).getTime()
        if(date > now){
          if( _DutySchedules[i].dutyempid === id ){
            dutyschedulebyid.push(_DutySchedules[i])
          }
        }
      }
      console.log("按值班人ID获取排班信息。。。。")
      console.table(dutyschedulebyid)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            dutyschedulebyid: dutyschedulebyid
          }]);
        }, 1000);
      });
    });

    //值班管理
    //增加值班记录
    mock.onPost('/dutyrecords/add').reply(config => {

      console.log("config:",config)
      let { dutyempid, dutyempname, dutydate, dutystatus, breakstatus } = JSON.parse(config.data).params;
      _DutyRecords.push({
              dutyempid: dutyempid,
              dutyempname: dutyempname,
              dutydate: dutydate,
              dutystatus: dutystatus,   // 0:未确认   1：已确认
              breakstatus: breakstatus
      });

      console.log("_DutyRecords:", _DutyRecords)

      //发短信通知

      //response
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '提交成功！'
          }]);
        }, 500);
      });
    });

    //获取值班记录
    mock.onPost('/dutyrecords/get').reply(config => {
      let {dutyempid, dutydate} = JSON.parse(config.data).params;
      let result = _DutyRecords.filter(record => {
        if (record.dutydate.indexOf(dutydate)== -1 && record.dutyempid.indexOf(dutyempid) == -1) return false;
        return true;
      });

      console.log("result: ", result)

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            result: result
          }]);
        }, 1000);
      });
    });

    //获取值班日期
    mock.onPost('/dutydate/get').reply(config => {
      let {dutyempid, breakstatus} = JSON.parse(config.data).params;
      console.log("dutyempid:",dutyempid,"breakstatus:",breakstatus)
      console.log("_DutyRecords",_DutyRecords)

      // let result = _DutyRecords.filter(record => {
      //     if(record.dutyempid.indexOf(dutyempid)== -1 && record.breakstatus.indexOf(breakstatus) == -1) return false;
      //     return true;
      // });
      let result = []
      for(var p in _DutyRecords){
        if(_DutyRecords[p].dutyempid === dutyempid && _DutyRecords[p].breakstatus === breakstatus)
          result.push(_DutyRecords[p])
      }

      console.log("result: ", result)

      let dates = []
      for(var item in result){
        dates.push({dutydate:result[item].dutydate,isWeekend: result[item].isWeekend,isHoliday: result[item].isHoliday})
      }
      console.table("dutydates:",dates)

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            dutydates: dates
          }]);
        }, 1000);
      });
    });

    //换休管理
    //增加换休记录
    mock.onPost('/breakrecords/add').reply(config => {

      console.log("config:",config)
      console.log("添加换休记录。。。。。。")
      let { breakempid, breakempname, breakdate, dutydates, submitdate, status} = JSON.parse(config.data).params;
      _BreakRecords.push({
              breakempid: breakempid,
              breakempname: breakempname,
              breakdate:  breakdate,
              dutydates:  dutydates,
              submitdate: submitdate,
              status: status
      });

      console.log("_BreakRecords:", _BreakRecords)
      console.log("_DutyRecords:", _DutyRecords)

      console.log("修改值班记录换休标志。。。。。。")
      for(var record in _DutyRecords){
        for( var p in dutydates){
          console.log("record",record,"dutydate:",dutydates[p])
          if(_DutyRecords[record].dutyempid == breakempid && _DutyRecords[record].dutydate == dutydates[p].dutydate){
            _DutyRecords[record].breakstatus = '1'
          }
        }
      }
      console.log("_DutyRecords:", _DutyRecords)

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '提交成功！'
          }]);
        }, 500);
      });
    });

    //获取换休信息
    mock.onGet('/breakrecords/get').reply(config => {
      console.log("获取换休信息。。。。")
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            breakrecords: _BreakRecords
          }]);
        }, 1000);
      });
    });

   //更新换休信息
    mock.onPost('/breakrecords/update').reply(config => {
      console.log("更新换休信息。。。。","config:",config)
      let record = JSON.parse(config.data).params;
      for(var rec in _BreakRecords){
        if(_BreakRecords[rec].breakempid == record.breakempid && _BreakRecords[rec].breakdate == record.breakdate){
          _BreakRecords[rec].status = '1'
        }
      }

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            // breakrecords: _BreakRecords
          }]);
        }, 1000);
      });
    });



    //换班管理
    //增加换班记录
    mock.onPost('/swaprecords/add').reply(config => {

      console.log("config:",config)
      console.log("添加换休记录。。。。。。")
      let { dutyempid, dutyempname, dutydate, swapempid, swapempname,swapdate, status} = JSON.parse(config.data).params;
      _SwapRecords.push({
            dutyempid: dutyempid, 
            dutyempname: dutyempname,
            dutydate: dutydate, 
            swapempid: swapempid, 
            swapempname: swapempname, 
            swapdate: swapdate, 
            status: status
      });

      console.log("_SwapRecords:", _SwapRecords)

      // console.log("修改排班表排班信息")
      // for(var record in _DutyRecords){
      //   for( var p in dutydates){
      //     console.log("record",record,"dutydate:",dutydates[p])
      //     if(_DutyRecords[record].dutyempid == breakempid && _DutyRecords[record].dutydate == dutydates[p].dutydate){
      //       _DutyRecords[record].breakstatus = '1'
      //     }
      //   }
      // }
      // console.log("_DutyRecords:", _DutyRecords)

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '提交成功！'
          }]);
        }, 500);
      });
    });




    //用户管理

    //获取用户列表
    mock.onGet('/user/list').reply(config => {
      let {name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: mockUsers
          }]);
        }, 1000);
      });
    });

    //获取用户列表（分页）
    mock.onGet('/user/listpage').reply(config => {
      let {page, name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockUsers
          }]);
        }, 1000);
      });
    });

    //删除用户
    mock.onGet('/user/remove').reply(config => {
      let { id } = config.params;
      _Users = _Users.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //批量删除用户
    mock.onGet('/user/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _Users = _Users.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //编辑用户
    mock.onGet('/user/edit').reply(config => {
      let { id, name, addr, age, birth, sex } = config.params;
      _Users.some(u => {
        if (u.id === id) {
          u.name = name;
          u.addr = addr;
          u.age = age;
          u.birth = birth;
          u.sex = sex;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 500);
      });
    });

    //新增用户
    mock.onGet('/user/add').reply(config => {
      let { id, name, role, team} = config.params;
      _Users.push({
        id: id,
        name: name,
        role: role,
        team: team
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 500);
      });
    });


    //角色管理
    //获取角色列表
    mock.onGet('/role/list').reply(config => {
      let {name} = config.params;
      let mockRoles = _Roles.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: mockRoles
          }]);
        }, 1000);
      });
    });

    //获取角色列表（分页）
    mock.onGet('/role/listpage').reply(config => {
      let {page, name} = config.params;
      let mockRoles = _Roles.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockRoles.length;
      mockRoles = mockRoles.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockRoles
          }]);
        }, 1000);
      });
    });

    //删除角色
    mock.onGet('/role/remove').reply(config => {
      let { id } = config.params;
      _Roles = _Roles.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //批量删除角色
    mock.onGet('/role/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _Roles = _Roles.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //编辑角色
    mock.onGet('/role/edit').reply(config => {
      let { id, name, addr, age, birth, sex } = config.params;
      _Roles.some(u => {
        if (u.id === id) {
          u.name = name;
          u.addr = addr;
          u.age = age;
          u.birth = birth;
          u.sex = sex;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 500);
      });
    });

    //新增角色
    mock.onGet('/role/add').reply(config => {
      let { id, name, role, team} = config.params;
      _Roles.push({
        id: id,
        name: name,
        role: role,
        team: team
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 500);
      });
    });


    //客户管理
    //获取角色列表（分页）
    mock.onGet('/cust/listpage').reply(config => {
      let {page, name} = config.params;
      let mockCusts = _Custs.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockCusts.length;
      mockCusts = mockCusts.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            custs: mockCusts
          }]);
        }, 1000);
      });
    });

    //编辑客户信息
    mock.onGet('/cust/edit').reply(config => {
      let { bankid, bankname, custid, custname, custtype, custnetincome, team , allocated, profitdistributed} = config.params;
      console.log("config.params:",config.params)
      _Custs.some(u => {
        if (u.bankid === bankid && u.custid === custid) {
          u.team = team
          u.allocated = allocated
          u.profitdistributed = profitdistributed
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 500);
      });
    });

    //删除客户
    mock.onGet('/cust/remove').reply(config => {
      let { bankid, custid } = config.params;
      _Custs = _Custs.filter(u => u.bankid !== bankid && u.custid !== custid);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //新增客户
    mock.onPost('/cust/add').reply(config => {
        console.log("config:",config)
        let paramtype = typeof(config.data)
        let param = JSON.parse(config.data)
        console.log("param:",param)
        if(Object.prototype.toString.call(param) === '[object Array]'){
          console.log("参数是数组")
          for(var i=0; i<param.length; i++){
            _Custs.push(
                {
                    bankid: param[i].bankid,
                    bankname: param[i].bankname,
                    custid: param[i].custid,
                    custname: param[i].custname,
                    custtype: param[i].custtype,
                    custnetincome: param[i].custnetincome,
                    team: '',
                    allocated: false,
                    profitdistributed: false
                }
            )
          }
        }
        else{
          console.log("参数是对象")
          _Custs.push(
              {
                    bankid: param.bankid,
                    bankname: param.bankname,
                    custid: param.custid,
                    custname: param.custname,
                    custtype: param.custtype,
                    custnetincome: param.custnetincome,
                    team: '',
                    allocated: false,
                    profitdistributed: false
              }
          )
        }
  
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 500);
      });
    });


    //分润结果管理

    //增加分润结果
    mock.onPost('/profitshareresult/add').reply(config => {

      console.log("config.data:",JSON.parse(config.data))
      let result = JSON.parse(config.data)
      // for(var i=0; i<result.length; i++){
      //   _ProfitShareResult.push(result[i]);
      // }

      //添加审批标志位
      for(var i=0; i<result.plan.length; i++){
        result.approved = false
        result.rejected = false
      }


        _ProfitShareResult.push(result);

      console.log("_ProfitShareResult:",_ProfitShareResult)

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 500);
      });
    });

    //获取分润结果信息
    mock.onGet('/profitshareresult/list').reply(config => {
      let {pageinfo, searchform} = config.params;
      console.log("pageinfo:",pageinfo,"searchform:",searchform)
      let mockProfitShareResult = _ProfitShareResult.filter(plan => {
        if (searchform.custname && plan.cust.custname.indexOf(searchform.custname) == -1) 
          return false;
        return true;
      });
      console.log("mockProfitShareResult:",mockProfitShareResult)
      let total = mockProfitShareResult.length;
      let pagesize = pageinfo.pageSize
      let page = pageinfo.page
      console.log("pagesize:",pagesize,"page:",page)
      mockProfitShareResult = mockProfitShareResult.filter((u, index) => index < pagesize * page && index >= pagesize * (page - 1));
      console.log("mockProfitShareResult:",mockProfitShareResult)
      console.log("_ProfitShareResult",_ProfitShareResult)
      
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            profitShareResult: mockProfitShareResult
          }]);
        }, 1000);
      });
    });

    //编辑分润结果
    mock.onPost('/profitshareresult/edit').reply(config => {
      let result = JSON.parse(config.data)
      console.log("config.data:",result)
// debugger
      console.log("修改前_ProfitShareResult:",_ProfitShareResult)
      //更新分润结果信息
      //  _ProfitShareResult.some(u => {
      //   if (u.cust.bankid === result.data.cust.bankid && u.cust.custid === result.data.cust.custid) {
      //     u = result.data          
      //     return true;
      //   }
      // });
      for(var i=0; i<_ProfitShareResult.length; i++){
        if(_ProfitShareResult[i].cust.bankid === result.data.cust.bankid &&
           _ProfitShareResult[i].cust.custid === result.data.cust.custid)
        {
            _ProfitShareResult[i] = result.data
        }
      }


      console.log("修改后_ProfitShareResult:",_ProfitShareResult)



      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 500);
      });
    });



  }
};