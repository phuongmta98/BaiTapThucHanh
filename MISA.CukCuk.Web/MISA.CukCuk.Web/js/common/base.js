$(document).ready(function () {

    $('#btn-add').click(function () {
        document.getElementById('m-dialog').style.display = 'block';
    })
    $('#btn-close').click(function () {
        document.getElementById('m-dialog').style.display = 'none';

    })
    $('#btn-save').click(function () {
        var customer = getDataInForm();
        if (validateData(customer)) {
           
                    $.ajax({
                        url: "http://api.manhnv.net/api/employees",
                        method: "POST",
                        data: JSON.stringify(customer),
                        contentType: "application/json"
                    }).done(function (response) {

                        // Thông báo kết quả
                        alert("Thêm thành công");
                        //đóng dialog
                        document.getElementById('m-dialog').style.display = 'none';
                        //Load lại dữ liệu
                        loadData();

                    }).fail(function (res) {


                    });
         
        }
      
    })

})
class BaseJS {

    constructor() {
        this.getDataUrl = null;
        this.setDataUrl();
        this.loadData();
        //this.showDialog();
    }

    loadData() {
        var columns = $('table thead th');
        var fieldName = [];
        var getDataUrl = this.getDataUrl;
        $.ajax({
            url: getDataUrl,
            method: "GET",
        }).done(function (res) {
            var data = res;
            //  debugger;
            $.each(res, function (index, obj) {

                //var 
                var tr = $('<tr></tr>');
                //Lay thong tin
                $.each(columns, function (index, th) {
                    var td = $('<td><div><span></span></div></td>');
                    var fieldName = $(th).attr('fieldName');
                    var formatType = $(th).attr('formatType');
                    var value = obj[fieldName];

                    switch (formatType) {
                        case "ddmmyyyy":
                            value = formatDate(value);
                            td.addClass("text-align-center");
                            break;
                        case "money":
                            value = formatMoney(value);
                            td.addClass("text-align-right");
                            break;
                        case "gender":
                            value = formatGender(value);
                            td.addClass("text-align-center");
                            break;
                        case "address":
                            td.css({ 'max-width': '100px;' });
                            break;
                        default:
                            break;
                    }


                    (td).append(value);
                    $(tr).append(td);

                })

                $('table tbody').append(tr);

            })

        }).fail(function (res) {

        })

    }
  


}
function getDataInForm() {
    var customer = {
        EmployeeCode: $('#employeeCode').val(),
        Email: $('#email').val(),
        FullName: $('#fullName').val(),
        PhoneNumber: $('#phoneNumber').val(),
        Gender: $('#gender').val(),
        Address: $('#address').val(),
        DateOfBirth: $('#dateOfBirth').val()
    };
    return customer;
}
function validateData(customer) {
    //check mã
    if (customer.EmployeeCode=="") {
        alert("ma khách hàng không được phép để trống");
        $('#employeeCode').focus();
        return false;
    }
    //check mã
    if (customer.Email=="") {
        alert('email không được phép để trống');
        $('#email').focus();
        return false;
    }
    else {
        if (validateEmail(customer.Email) == false) {
            alert('email không hợp lệ');
            $('#email').focus();
            return false;
        }
    }
    //check mã
    if (customer.FullName=="") {
        alert('Tên khách hàng không được phép để trống');
        $('#fullName').focus();
        return false;
    }
    //check mã
    if (customer.PhoneNumber=="") {
        alert('Số điện thoại khách hàng không được phép để trống');
        $('#phoneNumber').focus();
        return false;
    }
    return true;

}
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}