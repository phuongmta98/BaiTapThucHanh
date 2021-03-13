using Misa.ApplicationCore.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Misa.ApplicationCore.Interface
{
    public interface ICustomerContext
    {
        public Customer GetCustomerByCode(string customerCode);
    }
}
