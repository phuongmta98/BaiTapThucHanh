using System;
using System.Collections.Generic;
using System.Text;

namespace Misa.ApplicationCore.Interface
{
    public interface IBaseContext
    {
        public IEnumerable<MISAEntity> GetAll<MISAEntity>();
        public MISAEntity GetObjectById<MISAEntity>(Guid entityId);
        public int InsertObject<MISAEntity>(MISAEntity entity);
    }
}
