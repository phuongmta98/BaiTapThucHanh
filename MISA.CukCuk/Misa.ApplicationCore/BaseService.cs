using Misa.ApplicationCore.Entities;
using Misa.ApplicationCore.Enums;
using Misa.ApplicationCore.Interface;


using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;


namespace Misa.ApplicationCore
{
    public class BaseService: IBaseService

    {
        IBaseContext _baseContext;
        ICustomerContext _customerContext;
        public BaseService(IBaseContext baseContext, ICustomerContext customerContext)
        {
        this._baseContext = baseContext;
            this._customerContext = customerContext;
        }
        #region Method
        public IEnumerable<MISAEntity> GetAll<MISAEntity>()
        {
           
            var entities = _baseContext.GetAll<MISAEntity>();
            return entities;
        }
        public MISAEntity GetObjectById<MISAEntity>(Guid entityId)
        {
          
            var entitie= _baseContext.GetObjectById < MISAEntity > (entityId);
            return entitie;
        }
        public ServiceResult InsertObject<MISAEntity>(MISAEntity entity)
        {
            //valideate dữ liệu
            // Check mã để trống
          
            var serviceResult = new ServiceResult();
         
            var className = typeof(MISAEntity).Name;
            var propertyName = entity.GetType().GetProperty($"{className}Code");
            var propertyValue = propertyName.GetValue(entity).ToString();
            if (propertyName != null )
            {
                if(propertyValue == "")
                {
                    var msg = new
                    {
                        devMsg = new { fieldName = "customerCode", msg = "Mã khách hàng bị trống" },
                        userMsg = "mã khách hàng bị trống",
                        code = MisaCode.NotValid,
                    };
                    serviceResult.Msg = "Mã khách hàng bị trống";
                    serviceResult.Data = msg;
                    serviceResult.MISACode = MisaCode.NotValid;
                    return serviceResult;
                }
                if (_customerContext.GetCustomerByCode(propertyValue)!=null)
                {
                    var msg = new
                    {
                        devMsg = new { fieldName = "customerCode", msg = "Mã khách hàng bị trung" },
                        userMsg = "mã khách hàng bị trung",
                        code = MisaCode.NotValid,
                    };
                    serviceResult.Msg = "Mã khách hàng bị trung";
                    serviceResult.Data = msg;
                    serviceResult.MISACode = MisaCode.NotValid;
                    return serviceResult;
                }

            }

            // nếu dữ liệu hợp lệ
            var rowAffect = _baseContext.InsertObject<MISAEntity>(entity);
            serviceResult.MISACode = MisaCode.IsValid;
            serviceResult.Data = rowAffect;
            serviceResult.Msg = "Thêm khách hàng thành công";
            return serviceResult;

        }
        #endregion

    }
}
