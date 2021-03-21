
using Misa.ApplicationCore.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Misa.ApplicationCore.Entities
{
    public class ServiceResult
    {
        public bool isValid = true;
        public string Msg { get; set; }
        public object Data { get; set; }
        public MisaCode MISACode { get; set; }
    }
}
