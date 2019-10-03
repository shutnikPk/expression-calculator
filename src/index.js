function eval() {
    // Do not use eval!!!
    return;
}


function expressionCalculator(expr) {
    let arr = [];
    let idx, idx2;
    let count;

    expr += ")";
    expr = "(" + expr;

    let b = expr.replace(/\s/g, '');
    //console.log(b);
    count = expr.replace(/\d/g, '');
    count = count.split('');
    let res = 0;
    for (let i = 0; i < count.length; i++) {
        if (count[i] == "(") {
            res++;
        } else if (count[i] == ")") {
            res--;
        }
    }
    // console.log(res);


    if (res === 0) {

        for (let i = 0; i < count.length - 1; i++) {
            idx = b.lastIndexOf("(");
            idx2 = b.indexOf(')', idx);
            arr[i] = b.slice(idx, idx2 + 1);

            b = b.replace(arr[i], ff1(arr[i]));
           //console.log(b);
        }
    } else {
        throw ("ExpressionError: Brackets must be paired");
    }



    if (b == Infinity) {
        throw ("TypeError: Division by zero.")
    }
    // console.log("b=" + b);  
    b = parseFloat(b);
    Number(b);
   // console.log(b);
    return b;
}

function ff1(ver) {
    let ses = ver;
    ses = ses.slice(1, ses.length - 1);
    let arr = [];

    setString();


    calc();

    function calc() {

        while (arr.indexOf('/') != -1) {
            sep();
        }
        // console.log('/= ' + arr);

        while (arr.indexOf('*') != -1) {
            mult();
        }
        // console.log('*= ' + arr);

        while (arr.indexOf('-') != -1) {
            minus();
        }
        //console.log('-= ' + arr);

        while (arr.indexOf('+') != -1) {
            plus();
        }


    }



    function setString() {
        let i = 0;
        while (ses.length != 0) {

            arr[i] = parseFloat(ses);
            ses = ses.replace(arr[i], '');
            i++;
            arr[i] = ses.slice(0, 1);
            ses = ses.replace(arr[i], '');
            i++;

        }
        delete(arr[arr.length - 1]);
        arr = arr.filter(function (el) {
            return el != undefined;
        });
        return arr;
    }

    function mult() {
        let i = arr.indexOf('*')
        arr[i] = arr[i - 1] * arr[i + 1];
        delete(arr[i - 1]);
        delete(arr[i + 1]);
        arr = arr.filter(function (el) {
            return el != undefined;
        });
    }

    function sep() {
        let i = arr.indexOf('/')
        if (arr[i + 1] == 0) {
            throw ("TypeError: Division by zero.")
        }
        arr[i] = arr[i - 1] / arr[i + 1];
        delete(arr[i - 1]);
        delete(arr[i + 1]);
        arr = arr.filter(function (el) {
            return el != undefined;
        });
    }

    function plus() {
        let i = arr.indexOf('+')
        arr[i] = arr[i - 1] + arr[i + 1];
        delete(arr[i - 1]);
        delete(arr[i + 1]);
        arr = arr.filter(function (el) {
            return el != undefined;
        });
    }

    function minus() {
        let i = arr.indexOf('-')
        arr[i] = arr[i - 1] - arr[i + 1];
        delete(arr[i - 1]);
        delete(arr[i + 1]);
        arr = arr.filter(function (el) {
            return el != undefined;
        });
    }
    return arr;
}

module.exports = {
    expressionCalculator
}