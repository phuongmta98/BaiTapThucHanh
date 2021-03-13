using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Misa.ApplicationCore;
using Misa.ApplicationCore.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCuk.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class BaseController<MISAEntity> : ControllerBase
    {
        IBaseService _baseService;
        public BaseController(IBaseService baseService)
        {
            this._baseService = baseService;
        }
        /// <summary>
        /// Lấy thông tin danh sách khách hàng
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Get()
        {
         
            var entities = _baseService.GetAll<MISAEntity>().ToList();
            if (entities.Count > 0)
            {
                return StatusCode(200, entities);
            }
            else
            {
                return StatusCode(204, entities);
            }
        }
        /// <summary>
        /// Lấy thông tin khách hàng theo ID
        /// </summary>
        /// <param name="customerId">Id khách hàng</param>
        /// <returns></returns>
        [HttpGet("{entityId}")]
        public IActionResult GetById(Guid entityId)
        {
           
            var entity = _baseService.GetObjectById<MISAEntity>(entityId);
            if (entity != null)
            {
                return StatusCode(200, entity);
            }
            else
            {
                return StatusCode(204, entity);
            }
        }
        /// <summary>
        /// Thêm mới một khách hàng
        /// </summary>
        /// <param name="customer">Thông tin 1 khách hàng</param>
        /// <returns>Số khách hàng được thêm thành công</returns>
        [HttpPost]
        public IActionResult Insert(MISAEntity entity)
        {

           
          
            var serviceResult = _baseService.InsertObject<MISAEntity>(entity);
            if (serviceResult.MISACode == MisaCode.IsValid && (int)serviceResult.Data > 0)
            {
                return Created("Thêm khách hàng mới thành công", entity);
            }
            if (serviceResult.MISACode == MisaCode.NotValid)
            {
                return BadRequest(serviceResult.Data);
            }
            else
            {
                return NoContent();
            }
        }
        // [HttpDelete]
        //public IActionResult DeleteCustomer(Guid customerId)
        //{
        //    var customerService = new CustomerService();
        //    var res = customerService.DeleteCustomer(customerId);
        //    if(res>0)
        //    {
        //        return StatusCode(200, "Xoa khach hang thanh cong");

        //    }
        //    else
        //    {
        //        return StatusCode(400, "Xoa khong thanh cong");
        //    }
        //}

    }
}
