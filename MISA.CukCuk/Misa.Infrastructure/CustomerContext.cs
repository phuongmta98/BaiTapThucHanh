
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using Dapper;
using System.Linq;
using System.Reflection;
using Misa.ApplicationCore.Model;
using Misa.ApplicationCore.Interface;

namespace Misa.Infrastructure
{
    public class CustomerContext : BaseContext, ICustomerContext
    {

        #region Method
        public CustomerContext()
        {

        }

        public Customer GetCustomerByCode(string customerCode)
        {
            var procName = "Proc_GetCustomerByCode";
            var customer = _dbConnection.Query<Customer>(procName, param:new { CustomerCode = customerCode }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return customer;
        }
        //public int DeleteCustomer(Guid customerId)
        //{

        //    var res = _dbConnection.Execute("Proc_DeleteCustomer", new { CustomertId = customerId }, commandType: CommandType.StoredProcedure);
        //    return res;
        //}
      
        #endregion
    }
   
}
