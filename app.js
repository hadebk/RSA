$(document).ready(function () {
    //--------------------------------------------------------------------------------------------------------------
    // variabels initalization
    var message;
    var ns, zs, ds, es = 7;
    var nr, zr, dr, er = 7;
    var arrOfwords = [];
    var arrOfChar = [];
    var arrOfNum = [];
    var encrypted_message = [];
    var decrypted_message = [];
    //--------------------------------------------------------
    
    //--------------------------------------------------------
    $(".encryption").click(convert_char_to_number);
    $(".decryption").click(convert_number_to_char);
    //--------------------------------------------------------
    function encryption(plainText) {
        var cipher = Math.pow(plainText, er) % nr;
        return cipher;
    }
    //--------------------------------------------------------
    function decryption(ciph) {
        if (dr % 2 == 0) { // splite large value of d, so can i calc math.pow(cipher,d).
            G = 1
            for (var i = 1; i <= dr / 2; i++) {
                F = (ciph * ciph) % nr
                G = (F * G) % nr
            }
        } else {
            G = ciph
            for (var i = 1; i <= dr / 2; i++) {
                F = (ciph * ciph) % nr
                G = (F * G) % nr
            }
        }
        return G;
    }
    //--------------------------------------------------------
    function convert_char_to_number() { // convert the text to encrypted message 
        message = $(".message").val();
        arrOfChar = message.split(""); // split the text to chars
        console.log("arrofchar : " + arrOfChar);
        for (let x in arrOfChar) {
            arrOfNum.push(arrOfChar[x].charCodeAt(0)); // convert char to number
        }
        console.log("arrofnum : " + arrOfNum);
        for (let z in arrOfNum) {
            encrypted_message.push(encryption(arrOfNum[z])); // do encryption
        }
        console.log("encrypted-message : " + encrypted_message);
        var dec_mess = "";
        for (let i in encrypted_message) {
            dec_mess += encrypted_message[i];
        }
        $(".encrypted_message").text(dec_mess); // appear message in textarea
    }
    //--------------------------------------------------------
    function convert_number_to_char() { // convert encrypted message to text 
        for (let i in encrypted_message) {
            decrypted_message.push(decryption(encrypted_message[i])); /**** problem decrypted_message ****/
        }
        console.log("decrypted-mess :" + decrypted_message);
        var result = "";
        for (let z in decrypted_message) {
            result += String.fromCharCode(decrypted_message[z]); // convert number to char
        }
        console.log("decrypted-message : " + result);
        $(".decrypted_tex").text(result);
    }
    //-------------------------------------------------------------
    // sender operations
    $(".generate_sender").click(function () {
        var ps = $(".ps").val();
        var qs = $(".qs").val();

        // key generation
        if (test_prime(ps) === true && test_prime(qs) === true) {
            ns = ps * qs;
            zs = (ps - 1) * (qs - 1);
            if (gcd(es, zs) == 1) {
                ds = modInverse(es, zs);
                /*if (ds == es) {
                    ds = ds + ns
                }*/
                $(".first_num_public_s").text(es + ",");
                $(".second_num-public_s").text(ns);
                $(".first_num_private_s").text(ds + ",");
                $(".second_num_private_s").text(ns);
            } else {
                alert("gcd(e,z) not equal to 1, pleas enter another primary number");
                return false;
            }
        } else {
            alert("Pleas enter primary number");
        }
    });
    //----------------------------------------------------
    // reciver operations
    $(".generate_reciver").click(function () {
        var pr = $(".pr").val();
        var qr = $(".qr").val();

        // key generation
        if (test_prime(pr) === true && test_prime(qr) === true) {
            nr = pr * qr;
            zr = (pr - 1) * (qr - 1);
            if (gcd(er, zr) == 1) {
                dr = modInverse(er, zr);
                /*if (dr == er) {
                    dr = dr + nr
                }*/
                $(".first_num_public_r").text(er + ",");
                $(".second_num-public_r").text(nr);
                $(".first_num_private_r").text(dr + ",");
                $(".second_num_private_r").text(nr);
            } else {
                alert("gcd(e,z) not equal to 1, pleas enter another primary number");
                return false;
            }
        } else {
            alert("Pleas enter primary number");
        }
    });
    //--------------------------------------------------------
    /* functions of gcd(),calculate modular multiplicated invers() and test primary number() */
    //--------------------------------------------------------
    function modInverse(a, m) { // calculate modular multiplicated invers
        // validate inputs
  [a, m] = [Number(a), Number(m)]
        if (Number.isNaN(a) || Number.isNaN(m)) {
            return NaN // invalid input
        }
        a = (a % m + m) % m
        if (!a || m < 2) {
            return NaN // invalid input
        }
        // find the gcd
        const s = []
        let b = m
        while (b) {
    [a, b] = [b, a % b]
            s.push({
                a,
                b
            })
        }
        if (a !== 1) {
            return NaN // inverse does not exists
        }
        // find the inverse
        let x = 1
        let y = 0
        for (let i = s.length - 2; i >= 0; --i) {
    [x, y] = [y, x - y * Math.floor(s[i].a / s[i].b)]
        }
        return (y % m + m) % m
    } // end of modInverse
    //-----------------------------------------------------------
    function test_prime(n) { // test values of q,p if they primary or not

        if (n === 1) {
            return false;
        } else if (n === 2) {
            return true;
        } else {
            for (var x = 2; x < n; x++) {
                if (n % x === 0) {
                    return false;
                }
            }
            return true;
        }
    } // end of test_prime()
    //-------------------------------------------------------------
    function gcd(x, y) { // calculate gcd
        if ((typeof x !== 'number') || (typeof y !== 'number'))
            return false;
        x = Math.abs(x);
        y = Math.abs(y);
        while (y) {
            var t = y;
            y = x % y;
            x = t;
        }
        return x;
    } // end of gcd
    //--------------------------------------------------------------------------------------------------------------
});
