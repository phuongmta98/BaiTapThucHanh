using Misa.ApplicationCore.Entities;
using Misa.ApplicationCore.Interface;
using Misa.ApplicationCore.Model;
using MISA.Entity.Model;
using System;
using System.Collections.Generic;

namespace Misa.ApplicationCore
{
    public class CustomerService:BaseService, ICustomerService
    {
        ICustomerContext _customerContext;
        public CustomerService(IBaseContext baseContext, ICustomerContext customerContext):base(baseContext, customerContext)
        {
             this._customerContext = customerContext;
        }
   
        // lay thong tin khach hang theo Code
        public Customer GetCustomerByCode(string customerCode)
        {
          
            var customer = _customerContext.GetCustomerByCode(customerCode);
            return customer;
        }
        //public int DeleteCustomer(Guid customerId)
        //{
        //    var customerContext = new CustomerContext();
        //    var res = customerContext.DeleteCustomer(customerId);
        //    return res;
        //}
       
    }
}
