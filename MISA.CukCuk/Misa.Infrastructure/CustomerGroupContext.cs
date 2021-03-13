
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using MySqlConnector;
using Dapper;
using MISA.Entity.Model;
using Misa.ApplicationCore.Interface;

namespace Misa.Infrastructure
{
    /// <summary>
    /// Các service đối với nhóm khách hàng
    /// </summary>
    public class CustomerGroupContext : BaseContext
    {
  
        /// <summary>
        /// Thêm mới 1 khách hàng
        /// </summary>
        /// <param name="customerGroup">nhóm khách hàng</param>
        /// <returns>Số khách hàng thêm thành công</returns>
        //public int InsertCustomerGroup(CustomerGroup customerGroup)
        //{
        //    var properties = customerGroup.GetType().GetProperties();
        //    var parameters = new DynamicParameters();
        //    foreach (var property in properties)
        //    {
        //        var propertyName = property.Name;
        //        var propertyValue = property.GetValue(customerGroup);
        //        var propertyType = property.PropertyType;
        //        if (propertyType == typeof(Guid) || propertyType == typeof(Guid?))
        //        {
        //            parameters.Add($"@{propertyName}", propertyValue, DbType.String);

        //        }
        //        else
        //        {
        //            parameters.Add($"@{propertyName}", propertyValue);
        //        }

        //    }
          
        //    var rowAffects = _dbConnection.Execute("Proc_InsertCustomerGroup", customerGroup, commandType: CommandType.StoredProcedure);
        //    return rowAffects;
        //}

    }
}
