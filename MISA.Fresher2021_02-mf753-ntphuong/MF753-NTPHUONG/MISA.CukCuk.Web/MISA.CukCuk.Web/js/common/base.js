class BaseJS {
    constructor() {
        this.getDataUrl = null;
        this.setDataUrl();
        this.loadData();
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
                            break;
                        case "money":
                            value = formatMoney(value);
                            td.addClass("text-align-right");debugger;
                            break;
                        default:
                            break;
                    }
                    //if (fieldName == "DateOfBirth") {
                    //    value = formatDate(value);
                    //}
                    //if (fieldName == "Salary") {
                    //    value = formatMoney(value);
                    //}
                    
                    //if (fieldName == "Gender") {
                    //    var check = `<input type="checkbox"/>`;
                    //    if (obj[fieldName]==1)
                    //    check = `<input type="checkbox" checked/>`;
                    //    value = check;
                    //}

                    (td).append(value);
                    $(tr).append(td);

                    //debugger;
                })

                $('table tbody').append(tr);

                //    var tr = $(`<tr>
                //            <td><div><span>`+ item['EmployeeCode'] + `</span></div></td>
                //            <td><div><span>`+ item['FullName'] + `</span></div></td>
                //            <td><div style="text-align:center"><span>`+ check + `</span></div></td>
                //            <td><div style="text-align:center"><span>`+ dateOfBirth + `</span></div></td>
                //            <td><div><span>`+ item['EmployeeCode'] + `</span></div></td>
                //            <td><div><span>`+ item['PhoneNumber'] + `</span></div></td>
                //            <td><div><span>`+ item['Email'] + `</span></div></td>
                //            <td style="max-width:150px"><span style="width:150px">`+ item['Address'] + `</span></td>
                //            <td><div style="text-align:right;"><span>`+ salary + `</span></div></td>
                //            <td><div><span>`+ item['PersonalTaxCode'] + `</span></div></td>
                //            </tr>`
                //    );
                //    $('table tbody').append(tr);
                //    //debugger;
            })

        }).fail(function (res) {

        })

    }
}