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
    counter();
    if (counter() == 0) {
        count = b.split(')');

        for (let i = 0; i < count.length - 1; i++) {
            idx = b.lastIndexOf("(");
            idx2 = b.indexOf(')', idx);
            arr[i] = b.slice(idx, idx2 + 1);

            b = b.replace(arr[i], ff1(arr[i]));
        }
    } else {
        throw ("ExpressionError: Brackets must be paired")
    }

    function counter() {
        count = b.replace(/\d/g, '');
        count = count.split("");
        let res = 0;
        for (let i = 0; i < count.length; i++) {
            if (count[i] == "(") {
                res++
            } else if (count[i] == ")") {
                res--
            }
        }
        return res;
    }
   // console.log("b=" + b);
   b=parseFloat(b);b=+b;
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
       // console.log('-= ' + arr);

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
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == '*') {
                arr[i] = arr[i - 1] * arr[i + 1];
                delete(arr[i - 1]);
                delete(arr[i + 1]);
                arr = arr.filter(function (el) {
                    return el != undefined;
                });
            }
        }
    }

    function sep() {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == '/'&& arr[i]!="0") {
                arr[i] = arr[i - 1] / arr[i + 1];
                delete(arr[i - 1]);
                delete(arr[i + 1]);
                arr = arr.filter(function (el) {
                    return el != undefined;
                });
            }else throw ("TypeError: Division by zero.")
            
        }
    }

    function plus() {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == '+') {
                arr[i] = arr[i - 1] + arr[i + 1];
                delete(arr[i - 1]);
                delete(arr[i + 1]);
                arr = arr.filter(function (el) {
                    return el != undefined;
                });
            }
        }
    }

    function minus() {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == '-') {
                arr[i] = arr[i - 1] - arr[i + 1];
                delete(arr[i - 1]);
                delete(arr[i + 1]);
            }
            arr = arr.filter(function (el) {
                return el != undefined;
            });
        }
    }
    return arr;
}

module.exports = {
    expressionCalculator
}