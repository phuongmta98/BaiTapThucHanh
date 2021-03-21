using Misa.ApplicationCore.Entities;
using Misa.ApplicationCore.Enums;
using Misa.ApplicationCore.Interface;
using Misa.ApplicationCore.Model;
using MISA.Entity.Model;
using System;
using System.Collections.Generic;

namespace Misa.ApplicationCore
{
    public class CustomerService : BaseService, ICustomerService
    {
        ICustomerContext _customerContext;
        public CustomerService(IBaseContext baseContext, ICustomerContext customerContext) :base(baseContext)
        {
            this._customerContext = customerContext;
        }
   
        // lay thong tin khach hang theo Code
        public Customer GetCustomerByCode(string customerCode)
        {
          
            var customer = _customerContext.GetCustomerByCode(customerCode);
            return customer;
        }
        protected override void ValidateCustomer<Customer>(Customer customer)
        {
            //base.ValidateCustomer(customer);
            var propertyName = customer.GetType().GetProperty("CustomerCode");
            var propertyValue = propertyName.GetValue(customer).ToString();
            if (_customerContext.GetCustomerByCode(propertyValue) != null)
            {
                //var msg = new
                //{
                //    devMsg = new { fieldName = "customerCode", msg = "Mã khách hàng bị trung" },
                //    userMsg = "mã khách hàng bị trung",
                //    code = MisaCode.NotValid,
                //};
                serviceResult.Msg = Properties.Resources.ErrorMsg_CodeDupplicate;
                //serviceResult.Data = msg;
                serviceResult.isValid = false;
                serviceResult.MISACode = MisaCode.NotValid;
             
            }

        }
        //public int DeleteCustomer(Guid customerId)
        //{
        //    var customerContext = new CustomerContext();
        //    var res = customerContext.DeleteCustomer(customerId);
        //    return res;
        //}

    }
}
