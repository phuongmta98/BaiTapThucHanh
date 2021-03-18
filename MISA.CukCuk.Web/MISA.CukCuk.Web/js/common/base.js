$(document).ready(function () {
    var status = "a";
  
    $('#btn-add').click(function () {
        document.getElementById('m-dialog').style.display = 'block';
    })
    $('#btn-close').click(function () {
        document.getElementById('m-dialog').style.display = 'none';

    })

   //  $('table tbody').click(editData);
    $('table tbody').on('dblclick', 'tr', function() {
      
    //   document.getElementById('m-dialog').style.display = 'block';
        customerID = $(this).data().id;
        //getCustomerById(customerID);
        getByID(customerID);
       
    });
    $('#btn-save').click(saveData);
    $('#btn-delete').click(deleteData);

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
                    tr.data("id", obj.CustomerId);
                  
       
                })

                $('table tbody').append(tr);

            })

        }).fail(function (res) {

        })

    }


}


function getByID(customerID) {
    document.getElementById('m-dialog').style.display = 'block';
    status = "edit";
    // lay hang duoc chon
    $.ajax({
        url: "http://api.manhnv.net/api/customers" + "/" + customerID,
        method: "GET"
        //data: JSON.stringify(customer),
        //contentType: "application/json"

    }).done(function (res) {
     
        $('#customerCode').val(res.CustomerCode),
            $('#email').val(res.Email),
            $('#fullName').val(res.FullName),
            $('#phoneNumber').val(res.PhoneNumber),
            $('#gender').val(formatGender(res.Gender)),
         //   document.getElementById('dateOfBirth').value((res.DateOfBirth)),
            $('#address').val(res.Address)
            $('#dateOfBirth').val(formatDate(res.DateOfBirth))
      
    }).fail(function (res) {

    });
   
}
function deleteData() {
    $.ajax({
        url: "http://api.manhnv.net/api/customers" + "/" + customerID,
        method: "DELETE"

    }).done(function (res) {
        alert("xoa thanh cong");

    }).fail(function (res) {
        alert("xoa khong thanh cong");
    });

}
function saveData() {
  
    var customer = getDataInForm();
    if (status == "edit") {
        if (validateData(customer)) {
            $.ajax({
                url: "http://api.manhnv.net/api/customers" + "/" + customerID,
                method: "PUT",
                data: JSON.stringify(customer),
                contentType: "application/json"

            }).done(function (response) {

                // Thông báo kết quả
                alert("Sửa thành công");
                //đóng dialog
                document.getElementById('m-dialog').style.display = 'none';
                //Load lại dữ liệu
                //   loadData();


            }).fail(function (res) {
                alert("sua khong thành công");

            });
           

        } 
    }
    else {
        $.ajax({
            url: "http://api.manhnv.net/api/customers",
            method: "POST",
            data: JSON.stringify(customer),
            contentType: "application/json"

        }).done(function (response) {

            // Thông báo kết quả
            alert("Thêm thành công");
            //đóng dialog
            document.getElementById('m-dialog').style.display = 'none';
            //Load lại dữ liệu
            //   loadData();


        }).fail(function (res) {
            alert("them khong thành công");

        });

    }
}

   

function getDataInForm() {
    var customer = {
        CustomerCode: $('#customerCode').val(),
        Email: $('#email').val(),
        FullName: $('#fullName').val(),
        PhoneNumber: $('#phoneNumber').val(),
        Gender: $('#gender').val(),
        Address: $('#address').val(),
        DateOfBirth: $('#dateOfBirth').val()
    };
  
}
function validateData(customer) {
    //check mã
    if (customer.CustomerCode == "") {
        alert("ma khách hàng không được phép để trống");
        $('#customerCode').focus();
        return false;
    }
    //check mã
    if (customer.Email == "") {
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
    if (customer.FullName == "") {
        alert('Tên khách hàng không được phép để trống');
        $('#fullName').focus();
        return false;
    }
    //check mã
    if (customer.PhoneNumber == "") {
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