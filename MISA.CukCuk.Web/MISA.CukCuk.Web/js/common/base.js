$(document).ready(function () {
    var status = "a";

})
class BaseJS {


    constructor() {
        this.getDataUrl = null;
        this.setDataUrl();
        this.loadData();
        this.initEvent();


    }

    initEvent() {
        $('#btn-add').click(function () {
            document.getElementById('m-dialog').style.display = 'block';
        })
        $('#btn-close').click(function () {
            document.getElementById('m-dialog').style.display = 'none';

        })
        $('table tbody').on('dblclick', 'tr', function () {
            //dialogDetail.dialog('open');
            document.getElementById('m-dialog').style.display = 'block';

            customerID = $(this).data().id;
            //getCustomerById(customerID);
            getByID(customerID);

        });
        $('input[required]').blur(function () {
            var value = $(this).val();
            if (!value) {
                $(this).addClass('border-red');
                //$(this).focus();
                $(this).attr('title', 'trường này không được phép bỏ trống')
                $(this).attr('validate', false);
            }
            else {
                $(this).removeClass('border-red');
                $(this).attr('validate', true);
            }
        })
        $('input[type=email]').blur(function () {
            var value = $(this).val();
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(value)) {
                $(this).addClass('border-red');
                //$(this).focus();
                $(this).attr("title", "email không đúng định dạng");
                $(this).attr('validate', false);
            }
            else {
                $(this).removeClass('border-red');
                $(this).attr('validate', true);
            }
        });
        //$('#btn-save').click(function () {
        //    var inputRequireds = $('input[required],input[type=email]');

        //    $.each(inputRequireds, function (index, input) {
        //        $(input).trigger('blur');
        //    })
        //    var inputNotValids = $('input[validate="false"]');
        //    if (inputNotValids.length>0) {
        //        alert("Dữ liệu không hợp lệ, vui lòng kiểm tra lại");
        //        inputNotValids[0].focus();
        //        return;
                
        //    }

        //});
        $('#btn-save').click(saveData);

        $('#btn-delete').click(deleteData);


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
            $('#memberCardCode').val(res.MemberCardCode),
            $('#customerGroupName').val(res.CustomerGroupName),
            $('#companyName').val(res.CompanyName),
            $('#companyTaxCode').val(res.CompanyTaxCode),

            $('#email').val(res.Email),
            $('#fullName').val(res.FullName),
            $('#phoneNumber').val(res.PhoneNumber),
            $('#gender').val(formatGender(res.Gender)),
            //   document.getElementById('dateOfBirth').value((res.DateOfBirth)),
            $('#address').val(res.Address)
        $('#dateOfBirth').val(formatDate(res.DateOfBirth))

        if ($('#gender').val() == 'Nữ') {
            $('#gender')
        }

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
    var inputRequireds = $('input[required],input[type=email]');

    $.each(inputRequireds, function (index, input) {
        $(input).trigger('blur');
    })
    var inputNotValids = $('input[validate="false"]');
    if (inputNotValids.length > 0) {
        alert("Dữ liệu không hợp lệ, vui lòng kiểm tra lại");
        inputNotValids[0].focus();
        return;

    }

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
        if (validateData(customer)) {
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
    debugger;

}


function getDataInForm() {
    var customer = {
        CustomerCode: $('#customerCode').val(),

        Email: $('#email').val(),
        FullName: $('#fullName').val(),
        PhoneNumber: $('#phoneNumber').val(),
        Gender: $('#gender').val(),
        Address: $('#address').val(),
        DateOfBirth: $('#dateOfBirth').val(),

        MemberCardCode: $('#memberCardCode').val(),
        CustomerGroupName: $('#customerGroupName').val(),
        CompanyName: $('#companyName').val(),
        CompanyTaxCode: $('#companyTaxCode').val()
    };
    return customer;


}
function validateData(customer) {
    //check mã
    if (customer.CustomerCode == "") {
        alert("ma khách hàng không được phép để trống");
        $('#customerCode').focus();
        return false;
    }
    //check mã
    //if (customer.Email == "") {
    //    alert('email không được phép để trống');
    //    $('#email').focus();
    //    return false;
    //}
    //else {
    //    if (validateEmail(customer.Email) == false) {
    //        alert('email không hợp lệ');
    //        $('#email').focus();
    //        return false;
    //    }
    //}
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
