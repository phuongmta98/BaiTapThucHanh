using Misa.ApplicationCore.Entities;
using Misa.ApplicationCore.Interface;
using MISA.Entity.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Misa.ApplicationCore
{
    public class CustomerGroupService:BaseService
    {
        public CustomerGroupService(IBaseContext baseContext, ICustomerContext customerContext) :base(baseContext,customerContext)
        {

        }
    }
}
