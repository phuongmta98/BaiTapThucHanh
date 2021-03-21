using System;
using System.Collections.Generic;
using System.Text;

namespace Misa.ApplicationCore.Enums
{
    public enum MisaCode
    {
        IsValid = 100,
        NotValid = 400,
        Susscess = 201,
        IsEmpty = 401
    }
    public enum EntityState
    {
        AddNew=1,
        Update=2,
        Delete=3
    }
}
