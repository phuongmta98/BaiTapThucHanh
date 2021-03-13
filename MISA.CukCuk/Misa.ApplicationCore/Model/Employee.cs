using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.Entity.Model
{
    /// <summary>
    /// Thông tin nhân viên
    /// CrteatedBy: Nguyễn Thị Phượng
    /// Ngày: 3/3/2021
    /// </summary>
    public class Employee
    {
        #region Declare
        /// <summary>
        /// Khởi tạo một danh sách nhân viên tĩnh
        /// </summary>
        public static List<Employee> ListEmployee = new List<Employee>();
        #endregion

        #region Constructor
        /// <summary>
        /// Hàm khởi tạo không tham số
        /// </summary>
        public Employee()
        {

        }
        /// <summary>
        /// Hàm khỏi tạo với 2 tham số
        /// </summary>
        /// <param name="EmployeeCode">Mã nhân viên</param>
        /// <param name="FullName">Họ và tên nhân viên</param>
        public Employee(string EmployeeCode, string FullName) 
        {
            this.EmployeeId = Guid.NewGuid();
            this.EmployeeCode = EmployeeCode;
            this.FullName = FullName;

        }
        #endregion
        #region Properties
        /// <summary>
        /// Khóa chính
        /// </summary>
        public Guid EmployeeId { get; set; }
        /// <summary>
        /// Mã nhân viên
        /// </summary>
        public string EmployeeCode { get; set; }
        /// <summary>
        /// Họ và tên nhân viên
        /// </summary>
        public string FullName { get; set; }
        /// <summary>
        /// Giới tính: 0- nữ, 1- nam
        /// </summary>
        public int Gender { get; set; }
        /// <summary>
        /// Tình trạng hôn nhân
        /// 0- độc thân, 1- đã kết hôn
        /// </summary>
        public int MaritalStatus { get; set; }
        /// <summary>
        /// Ngày sinh
        /// Định dạng dd/MM/yyyy
        /// </summary>
        public DateTime? DateOfBirth { get; set; }
        /// <summary>
        /// Lương của nhân viên
        /// </summary>
        public Double Salary { get; set; }
        #endregion
        #region Method
        #endregion
        #region Other
        #endregion


    }
}
