function getAjaxMethod(url, callback) {
    $.ajax({
        method: "GET",
        url: url,
        contentType: "application/json; charset=utf-8"
    })
    .done(function (success) {
        callback(success);
    })
    .fail(function (fail) {
        console.log(fail);
        alert('처리 실패. 관리자에게 문의하세여.');
    });
}

function postAjaxMethod(url, param, callback) {
    $.ajax({
        method: "POST",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(param)
    })
    .done(function (success) {
        callback(success);
    })
    .fail(function (fail) {
        console.log(fail);
        alert('처리 실패. 관리자에게 문의하세여.');
    });
}

function putAjaxMethod(url, param, callback) {
    $.ajax({
        method: "PUT",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(param)
    })
    .done(function (success) {
        callback(success);
    })
    .fail(function (fail) {
        console.log(fail);
        alert('처리 실패. 관리자에게 문의하세여.');
    });
}

function deleteAjaxMethod(url, callback) {
    $.ajax({
        method: "DELETE",
        url: url,
        contentType: "application/json; charset=utf-8"
    })
    .done(function (success) {
        callback(success);
    })
    .fail(function (fail) {
        console.log(fail);
        alert('처리 실패. 관리자에게 문의하세여.');
    });
}

function imageAjaxMethod(url, data, callback) {
    $.ajax({
        method: "POST",
        url: url,
        processData: false,
        contentType: false,
        data: data
    }).done(function (success) {
        callback(success);
    }).fail(function (fail) {
        console.log(fail);
        alert('처리 실패. 관리자에게 문의하세여.');
    })
}

function tradeStatus(status) {
    let result = '';
    switch(status) {
        case 0:
            result = '거래등록';
            break;
        case 1:
            result = '거래시작';
            break;
        case 2:
            result = '구매확인';
            break;
        case 3:
            result = '판매완료';
            break;
        case 4:
            result = '거래완료';
            break;
        case 5:
            result = '이의제기';
            break;
        case 6:
            result = '거래완료(관리자처리)';
            break;
        case 101:
            result = '거래시작';
            break;
        case 102:
            result = '구매확인';
            break;
        case 103:
            result = '판매완료';
            break;
        case 104:
            result = '거래완료';
            break;
        case 105:
            result = '이의제기';
            break;
        default:
            result = '';
            break;
    }

    return result;
}