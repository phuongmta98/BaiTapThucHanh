//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;


//using MISA.Entity.Model;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

//namespace MISA.CukCuk.API.Controllers
//{
//    /// <summary>
//    /// api Thêm, sửa, xóa, lấy danh sách nhân viên
//    /// CreatedBy: Nguyễn Thị Phượng
//    /// Ngày: 3/3/2021
//    /// </summary>
//    [Route("api/[controller]")]
//    [ApiController]
//    public class EmployeesController : ControllerBase
//    {/// <summary>
//    /// Lấy thông tin danh sách nhân viên
//    /// </summary>
//    /// <returns></returns>
//    //[HttpGet]
//    //public List<Employee> Test()
//    //    {
//    //        var employees = Employee.ListEmployee;
//    //        var employee = new Employee();
//    //        for (int i = 0; i < 10; i++)
//    //        {
//    //            employee.EmployeeCode = $"Test00{i + 1}";
//    //            employees.Add(employee);
//    //        }
//    //        return employees;
//    //    }

//        [HttpGet]
//        public IActionResult GetEmployees()
//        {
//            var employeeService = new EmployeeService();
//            var employees = employeeService.GetEmployees();
//            if (employees.Count > 0)
//            {
//                return StatusCode(200, employees);
//            }
//            else
//            {
//                return StatusCode(204, employees);
//            }


//        }
//        /// <summary>
//        /// Thêm mới 1 nhân viên, kiểm tra mã khách hàng trùng hoặc để trống thì sẽ đưa ra thông báo tương ứng
//        /// </summary>
//        /// <param name="employee">Thông tin nhân viên cần thêm</param>
//        /// <returns></returns>
//        [HttpPost]
//        public IActionResult InsertEmployee(Employee employee)
//        {
//            var employeeService = new EmployeeService();

//            var employeeCode = Employee.ListEmployee.Where(c => c.EmployeeCode == employee.EmployeeCode).FirstOrDefault();
//            if (employee.EmployeeCode == "")
//            {
//                return StatusCode(400, new
//                {
//                    devMsg = "EmployeeCode required",
//                    userMsg=" Mã khách hàng không được bỏ trống",
//                    errorrCode="1998",
//                    moreInfo="",
//                    TraceId=""

//                });
//            }
//            else if (employeeCode != null)
//            {
//                return StatusCode(400, new
//                {
//                    devMsg = "EmployeeCode is unique",
//                    userMsg = " Mã khách hàng đã tồn tại",
//                    errorrCode = "1998",
//                    moreInfo = "",
//                    TraceId = ""
//                });
//            }
//            else
//            {
//                employeeService.InsertEmployee(employee);
//                return StatusCode(201, "Thêm thành công");
//            }
//        }
//        /// <summary>
//        /// Sửa thông tin nhân viên theo Id nhân viên
//        /// </summary>
//        /// <param name="employee"></param>
//        [HttpPut]
//        public void EditEmployee(Employee employee)
//        {
//            var employeeService = new EmployeeService();
//             employeeService.EditEmployee(employee);
//        }
//        /// <summary>
//        /// Xóa nhân viên khỏi danh sách
//        /// </summary>
//        /// <param name="employeeId"></param>
//        [HttpDelete]
//        public void DeleteEmployee(Guid employeeId)
//        {
//            var employeeService = new EmployeeService();
//            employeeService.DeleteEmployee(employeeId);
//        }

//    }
//}
