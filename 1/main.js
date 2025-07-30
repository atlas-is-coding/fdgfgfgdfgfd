// Глобальные переменные для хранения состояния
let encodedData, charMap, inputStr, strLength, decodedArray, bitAccumulator, bitCount, tempIndex, loopCounter;

// Константы, используемые в коде (не изменены, как указано)
const CONSTANTS = [
    0x0, 0x1, 0x8, 0xff, "length", "undefined", 0x3f, 0x6,
    "fromCodePoint", 0x7, 0xc, "push", 0x5b, 0x1fff, 0x58, 0xd,
    0xe, 0x3a, 0x7c, 0x7f, 0x80, 0x8a, !0x1, 0x8b, 0x92, 0x8f,
    0x97, 0x9f, 0xa8, "g", 0xc6, 0xd3, 0xdf
];

// Функция для декодирования строк с использованием пользовательской схемы
function decodeString(encodedInput) {
    const CHAR_SET = "BRLAdbXFnaDJfc)UuS056|!8E1H~#p^$kh7g&sqezOZV[/;KxWiY(@rI+o%2249QjtM?NGlm_*v:C%60Pwy%3E].}%=,32%3C{T%22";
    inputStr = encodedInput || "";
    strLength = inputStr.length;
    decodedArray = [];
    bitAccumulator = CONSTANTS[0x0];
    bitCount = CONSTANTS[0x0];
    tempIndex = -CONSTANTS[0x1];

    for (loopCounter = CONSTANTS[0x0]; loopCounter < strLength; loopCounter++) {
        let charIndex = CHAR_SET.indexOf(inputStr[loopCounter]);
        if (charIndex === -CONSTANTS[0x1]) continue;
        if (tempIndex < CONSTANTS[0x0]) {
            tempIndex = charIndex;
        } else {
            tempIndex += charIndex * CONSTANTS[0xc];
            bitAccumulator |= tempIndex << bitCount;
            bitCount += (tempIndex & CONSTANTS[0xd]) > CONSTANTS[0xe] ? CONSTANTS[0xf] : CONSTANTS[0x10];
            do {
                decodedArray.push(bitAccumulator & CONSTANTS[0x3]);
                bitAccumulator >>= CONSTANTS[0x2];
                bitCount -= CONSTANTS[0x2];
            } while (bitCount > CONSTANTS[0x9]);
            tempIndex = -CONSTANTS[0x1];
        }
    }
    if (tempIndex > -CONSTANTS[0x1]) {
        decodedArray.push((bitAccumulator | tempIndex << bitCount) & CONSTANTS[0x3]);
    }
    return arrayToString(decodedArray);
}

// Преобразование массива чисел в строку
function arrayToString(numArray) {
    return typeof TextDecoder !== CONSTANTS[5] && TextDecoder
        ? new TextDecoder().decode(new Uint8Array(numArray))
        : Buffer && Buffer.from(numArray).toString("utf-8")
        || convertArrayToText(numArray);
}

// Получение глобального объекта (window, globalThis и т.д.)
function getGlobalContext() {
    const contextProviders = [
        () => globalThis,
        () => global,
        () => window,
        () => new Function("return this")()
    ];
    let context;
    try {
        for (let i = 0; i < contextProviders.length; i++) {
            context = contextProviders[i]();
            return context;
        }
    } catch (e) {}
    return context || this;
}

// Инициализация глобальных утилит
const globalObj = getGlobalContext();
const textDecoder = globalObj.TextDecoder;
const uint8Array = globalObj.Uint8Array;
const buffer = globalObj.Buffer;
const stringUtil = globalObj.String || String;
const arrayUtil = globalObj.Array || Array;

// Конвертация числового массива в текст
const convertArrayToText = (() => {
    const charArray = new arrayUtil(CONSTANTS[0x14]);
    const fromCodePoint = stringUtil[CONSTANTS[0x8]] || stringUtil.fromCharCode;
    let resultArray = [];
    return function(inputArray) {
        let val, len = inputArray.length;
        resultArray.length = 0;
        for (let i = 0; i < len;) {
            val = inputArray[i++];
            if (val <= CONSTANTS[0x13]) {
                resultArray.push(charArray[val] || (charArray[val] = fromCodePoint(val)));
            } else if (val <= CONSTANTS[0x20]) {
                val = (val & 0x1f) << CONSTANTS[0x7] | inputArray[i++] & CONSTANTS[0x6];
                resultArray.push(charArray[val] || (charArray[val] = fromCodePoint(val)));
            } else if (val <= 0xef) {
                val = (val & 0xf) << CONSTANTS[0xa] | (inputArray[i++] & CONSTANTS[0x6]) << CONSTANTS[0x7] | inputArray[i++] & CONSTANTS[0x6];
                resultArray.push(charArray[val] || (charArray[val] = fromCodePoint(val)));
            } else {
                val = stringUtil[CONSTANTS[0x8]]
                    ? (val & CONSTANTS[0x9]) << 0x12 | (inputArray[i++] & CONSTANTS[0x6]) << CONSTANTS[0xa] | (inputArray[i++] & CONSTANTS[0x6]) << CONSTANTS[0x7] | inputArray[i++] & CONSTANTS[0x6]
                    : (i += 0x3, CONSTANTS[0x6]);
                resultArray.push(charArray[val] || (charArray[val] = fromCodePoint(val)));
            }
        }
        return resultArray.join("");
    };
})();

// Асинхронная основная логика
(async () => {
    const encodedStrings = [
        "zHXPcCz%22xN%60U]~w5B0sDrs@g0f%22",
        "=$Y@NC(Lwn(NJL%22",
        "RpVv^(7(v?JxGq]H!H%60@]P2g94?JZQHO_:qFR;B%22",
        "79%3CaHo#(1j%22w4)O0H;mCwP%oWtW#MU3O/Yyd%229rL%22",
        "eSfC{qM^loDl6*5O~8Lvvx(%22nc)sR%22",
        "sA5kb%3Ec5[j#m%3Cx_1t)RyNjj0%604!%3E|&i#IlayVY8@%226xSox%22p%22",
        "RCBr1,ocy4T!Qde05UA%22",
        "BosPg4fLxtG+x%Pe*J1^VQQRy@WPEu*qZS[po;CXNt?kBU?S9H%3EPH%22",
        "wX*#}%60R9?2G_)Xsps+X0P@FZS;|sx}z7Cp$I=37~)3wk~57PB%22",
        "&op#Pm3z%f40js_0%22Amizl$pj4nX).%3E~OjNw1ohFG9I_B%22",
        "=:*#Uo.R%22",
        "}$KP8omcPS7j]**q@aQD%22",
        "66wFUq.,[nDlo&@O.1)I[+3z/09(=%jp^V+X2h#0Vn0j[Aa5YoKP5i|md%22",
        "fltP%3Eo_0w)wUcx%60H]+^dGxVo;0)cVqQp:sgv3yuE/Jwk,9ASE97YkyB%22",
        "%3ES}k%3CKh.4?bX,d%22",
        "&Hj#0&XnYoY:abZe0p2#_I=ELf0A(%_sJzlCOg90H)FcV)Q^RWA%22",
        ";$^P4_%3C3E6%22",
        "k;YC2(1@]9?n4qlqR9,$3P8Fz6T&6%!7Hah~%3CKeR%22",
        "7a+a6i:FBU#7ZWa%22",
        "gUbIY%606n(aqIC1h8@XMW{y%3EFB0VjDsw~7Ch~e}^L%22",
        "|aE:kg7L%22",
        "1VEXu(gK%60nok]gTZ~UcI.%nn26P;&*kE^fY@M9z;x0*UMU{81Cli1qf;C?W%22",
        "FtZpwIC7b%22",
        "=)ydUmB%22",
        "EUHY3y3%22%3EUG|.E3z!H%3EdMCuL.fVD0beEH*hv5%H3%22)*#@v~OOH[w0yLnd%22",
        "=$taEoUOJ?*dZsv0}s8P%3EPD%22%3C%22CnR%22",
        "nV+ax%60%60ca)v;]gR&~?&pA%3E*FOSCC)qz0%60XGwm%3E_0Kf&F$L%22",
        ".$e:U*ME,rbru~kE$X?XpQFtb5%3C55}weUf%22Y(v2F[+f%3EqL=!MXoXPIB%22",
        "Fr=C(vvfGfAv,m#^97=C(YaO~49+.EG0NaA%22",
        "sa_(X9{85M~6qQM0urs#i%22ac(5h4v~kp@rj(]*%60m%3EtSYb=)z%22",
        "o?SXo_fEgrF%60=A$p4lka0q$pK9/PoWDq%22/&pd7T(94y+t)6z:B%22",
        "$lon3mxMVJx$E*sEj4,dEq4O=cTCf%PHz80Yr%22rz[)kmFAsq%22",
        "@zK:Bv%3C7]oXa.&_0foX(3o_(d5^)%_l0%22",
        "hYE^R;QO:?QRo9_El:kW)&QO%606pFULF%22",
        "0a|Fhy8OF%22",
        "%1(@qQJ1)|/)z~{gTxj$+t_3b5Qwc=Ip*stdciGtYa];u%R$N7)IuIrL%22",
        "Yz/$yjll~SDA%3EH@zi6sD%22",
        "paMWWWcFcNWSjsogJR%22",
        "CX^Fqs1pdoDYJ}b$0R%22",
        "Q49I%3EIB0So4)^bA^r7.Xs+s5:S.JR%22",
        "@*Lv)j(CJSc%60%60q}zwlyF%22",
        "eAJp_9SRe%22gv/ct&+j0~=q{SF%22",
        "8zPigr,OKUfIfU48sVA%22",
        "ZfvW1zT(t0$%22{ED6zlIrA3{8dM%3ER2LTudg;F+Yk(%a_18L%22",
        "DW{rIsC($9=CtAaHmx%3Ea%22",
        "?YRY#qEL0U%22",
        "ada%60+%3E}]SoVD(~wHgpCYKs^]9nm|}m%3EeXpmFcCCffSd%22.E!O:8Nk%*(MP)W%22",
        "c09w]PS5YaLr#*v5%22aWXAj|K/0Lr6~C5SVI(S%22",
        "TSvad3RtxNY0=AjSYY%n2yU.A5900QtsHsuXF3Gc0U%22",
        "jshYZWB]NrF8@u?Sfzzr;syfu0%3C9!sXqY?Dp#KMfFc{.Od%22",
        "BCEW0oV,Tjj)J)Uz[$7k5j6(h9km8)c6P7G@nxa5^U~D%60Hm1%22",
        "AoPH{*aFH4{kR%22",
        "+*;#x}tRR0TkE*8gC?%CDq*F=5vtB*)H2_.X_mB%22",
        "Bt7wF.@8lr^~VLRV3:}kK}+0bc~~&*nHe?_$c&T;=oY%22",
        ".sy$N&y3Z6M:_H%3Cgj7.rQ=R%60$UfvT_0z%3C:diThm89@c6sdo#(?jaPm_;D?90R%22",
        "RWor%3Eq9LvS7?NcweioTk|(dnO?MdD.nHG#A%22",
        "xo1yXjB%22",
        ")UWr%qJ1QJ/xneeqzj,#b&s%60&rSm))=#%60B%22",
        "xoayRx7&t+0m~*37Xo+X8oU5VnJ%22J)c6]6L%22",
        "{:MWJ.lXvc4JzAa%22",
        "Of;$aP;zR0k7vU.~vZnXKeQgYM+g|v^EO?kWn7P7658DVq{OPXkr%*sgWo7%22",
        "q6G@krto%60JK#nA$^gfmHR@OKlMnXU)I#0osd~q%3EoYort,xUe+8ka!(1pNfKFR%22",
        ")dTk.(P3lM%3C5hv%60q)HNYGCDELa%22",
        "#9Tbcmq%22Yf%22",
        ".X#pR@v(v?7%3EQcm5kfRY|PxLcNnYB~FE%22/pCVQB%22",
        "s8Ba:&P(^UGk@x18aW_I;}JRf?#DJL0~+*GpMCSKzS%22",
        "fH_ITq,O6c5XJLHpCXrIF7tcI%22^E[%tpNYNn%22",
        "]A=i)qn3UUM1is%22&60PpF&JO/|Us@uA$DsS^9v,OyU)Sx%!OWoR%22",
        "sxHw~*x^(af%60g%SeuU7Y&KcOFDegJH^gJR%22",
        "?rakhzHED?0AR%22",
        "8;sFyC|Kp4^I[KDH3Y^#[+G8$URy3L%22",
        "HkW~2hS1qM5%60=4)%22",
        "|rlb.hq^_%22Ox%22cN0RoE%60:.GYf|fvI%EgWfyF)ITfnI%60J%3CK+ZIB%22",
        "M4FX2yJ@%3C%22tRo9M^GS]X4vN^~?r)R%22",
        "RN%60CuIGmwJ6c7c%228~p(wlvxL^USmpvs548vX,4_fytTG%60HAV%22",
        "TnRXT,((P?D~7Qv$vS7%60PC_0Af3&sx}z&Va~Ww$KjnrddU2#y1pD6%22",
        "{@8#3,tm1?%3CkOx#&6YO^K%60xzIM4w]]~8+r1XV]?pGopmuuTg=xIXkr@OA%22",
        "4s$#]&4%60Ut1I4%22=7448X,4x(_%22X?1&IpY6sI^:?OSN:dAq%3C#wlrd%22",
        "y1Mr:%3E%60On%22zIe%22EgczOra3%22L#46m2q8gLrp#qWmcX%22",
        "%XW~Z}mohUkIu%hSrB%22",
        "yjhkn%3EROYa}+XQ%60H~;L%22",
        "%3E$;P}%X(RUvw;17E%A&CNjGYO6Hv%gq1ZlYw%/.O^|4)~)F%22",
        "%3EJ^$h:]C/@yJFHMp/*Gi5*so@r:G%60%H&96+W:%3ET;[@QRf4Pq+6@Cc%22",
        "/XarL3uM%3C%22D75LxH5C%3EWn&|g1jkvJ}X%22",
        "@z!#+=E&Aa%22",
        "noEXh*Vm4J3iV_%22#BNd$Ey[%22$t%!:v8g0Yya%3Eql;SU~cwv%~XR%22",
        "6;9$I7%3Cf)4RyU%/e?#K#hQ;L|%22#m/sf5o*0Y_mP;}5%22",
        "Q:(C*&%Oi9okJLCe@l2#CP|FE6RvAA6OPjKP|(_X|5a??vBE%22",
        "Y/:n/},gG5HAR%22",
        "8Y=Cj;@KUN$4[Ayec05wY;Dn2M&v(~BS1;Wn6%22",
        "+7%22Y&lf;05x|z%T&lj!I1,FO2%22}pZsKeU9uybveg9@ZAP%d0mB%22",
        "OjBy:j5gA55Dax{pDt}k(w#Cw@NJw&#ZD;Ov5%22",
        "y)5v:&.p/+i#uAEgv+L%22",
        "*XsCt;mp#|U%60eLsqK*E^T:#0hUD8feF$^o@(L=x0I%22Q+#*9&pzDv+eB%22",
        "M#By?=f;.f%22",
        "p8K#@%22Ac|5ZmV_:e]Jur,hoOn?@Fq1!~|rUh|%22",
        "y$divPa1kNvW!.(zNB%22",
        "sf*()ja@hUeSJL|~Wo7%600i;L^t$IeHM0nkLv=/[^U0q%22",
        "9lXP~ztcZ?@]Zsz0%22",
        "%Ard8mr%22~)%22+]gXqqVCY?;izKnpxx~%3C!JHBrx=cKFcBvEdj8z*eW6%22",
        "UWVk@eA@.ob6fU3#G##D*&zz097v]927XW1^=4((D6~cWv[HbC|D1%22",
        "qx(C%3CPQRhrkj&%$SIA~wcoJc)U@:wEwqKHoX.%D%22Q+16R%22",
        "RWApRvB^u9$E5L%22",
        ",7u^:Io8b%22",
        "5tc$C9=]LfhEaxk8tlinaIs.j+TGmdZe1l=HeW*YJ?}@8LLskrA%22",
        "eCe($g%gh0eD(~0zq?HpO]tKXD%22",
        "G7*dnCDnD4r16~?&[oUhe%60P3So,GQE^ERV!(Px_l5o;:Eud0CB%22",
        "%3E?]W7gO%60SoI#F}PeCY0Yl9Jt?tVDBe4pu0*PcmUFFcD6(ATu%22",
        "[z}k5%+(D4nxR%22",
        "3ZF(aPf;#)Vm;Qlq+/_IhzT7WfPgCm%22#KH]r{/o8=5GJ2)=~{@lD%22",
        "5YuYHPvX/n072_)H[6|CBe_0d%22",
        "w8dwQ=tK!clw{91gM#cD?Ir^k0b%22%L3#hxcIu(:t/@(%22",
        "QrK(Z:&EMaB*0}T&rHt(#(i]@c%22",
        "Rt9w?xGYX5@|iQQ&%3E+%60iwmMf7aR~E4%601[V%3CXotsF.tp7ymxHPX=@yi{oioZ%22",
        "&*m${P?g/J^$;sLSZsS~x+ggm%22k%22",
        "uY2#R%3E/5]t}C+EqE^p+XpQ%3ERioWS~)XVM4Hp7(SRNaHIP*%3C!1lGb!%22",
        ":l1~?&U5/09%22",
        "iihAQe/15mdl}Wqo2.%22",
        "+i/eZ6W1%22",
        "50%3E^^LN%22",
        "WOmKdJ:2um^f1Uu%22",
        "7d%oYu34%22",
        "nMk%3EP0?4%22",
        "i+*bN|PR%22",
        "O*2~^=xR%22",
        "@C9~M%22",
        "M*aic36F%22",
        "n*3%3Ev!9+:k3%3E8%22",
        ")kOu/~$Rg,4kD%22",
        "8*~xpt2LP*E4D%22",
        "bpZ)[8ZZrufL(%22",
        "=&%akEBn3I%22",
        "SApOCa%60KL&ARQ]2rY%60zo(?UlZ%22j#iZ8wt:OC_~y!%22",
        "eT|9^u}y;%3Ck[Q%}L;:dvTv$$z{S0SIQbZ!%22",
        ")jwaY~tV8j|mAs68F&Sasu:IH3%22",
        "?BXy[?w%22",
        "P[Cn%22",
        "b_.Jpv7SP$1%22",
        "C~Adtusp%22",
        "%3CF6g]dsp%22",
        "fP7y[?~%3EHZF%22",
        "hmCn%22",
        "pmiY]%22",
        "LPA80%22",
        "5IVn}%22",
        "!AMX}&.BI%22",
        "J}R_O%22",
        "x,OY!c%60NiT[f4Fl%22",
        "p&@dO@w%22",
        "[[)%3C1yw%22",
        "_}iY9/0gG$k%22",
        "f,!%3Cy/YSm%3Eyj:@{~%22",
        "Ut4nS@w%22",
        "%3CWJn~c$/[TATnD%22",
        "l%22PK5&|~bY=@K$(;W%60+w6D;CA%60(!yPz%3C.d(x%3CGSCvvF&KYEu;N%3Ew(p:?&$onfHI2$9Bw%22",
        "N~Xyz%;cdZS%22",
        "Ut,Y6y*rKjF%22",
        "j]$2UMy8dK;CExWa[t%22IE%/+(;6C%60OoiB%22.%Wa[twEC%IJh%3EM*%60Ap!.I+_J+swS]BNw%22",
        "$W,g]%22",
        "Nv&Y1yN$%3CjQZPm%22",
        "!}Pn%22",
        "E~$Y+?3#WG1%22",
        "0,Cm%22",
        "yBNd;/Xr}s1%22",
        "#l(g%22",
        "#[%3ER:%3C0giT|rnD%22",
        "][S%3CS%22",
        "sd1/%e%3E=u6m!}Vt+K^+R@%3EkDzIy@l;HMtjA[B?3K9^h#}jtVKwX6#[kuz{#DU%$=s%2219by?4%22",
        "r*N;K$=a)%22",
        "Z%3E[J[%22",
        "|b3%608KFiRX5m%%22",
        "1=waTh34%22",
        "Biv9&r^%22",
        "Qfe_B+A%22",
        "44FCtZ]),%22",
        "%22uz9B%22",
        "k8J%60!($au%22",
        "_u_;:kX~*Aq%22",
        "Zj2A|a92C?j%22",
        "eT|9^u}yHz/_T/wsz_UapaQw&mkd3EQ8}=[%3CSUG?a?p%22UUOL)md%3Cwa7+H3%22",
        "+k|9vJ)4%22",
        "l:Ml|%22",
        "7dE%3COUg+c%22?RP%22",
        "#=f%3Cz]SSR%22",
        "%606(6H%22",
        "ojq%3CXa34%22",
        "7eVY:G=2C?j%22",
        "R/19%22",
        "Zj!6OU*4%22",
        "4/BvX%22",
        "UZ[MPc%60C/%22",
        "kk_zeyx+l%22",
        "//%3EYoUt%22",
        ")kfvUuF[R%22",
        "uRM~Th*S;3%22",
        "s%Yw%wU@l;Y%22",
        "z?abAtfE%22",
        "@Yy5GicHJIenW1l(%22",
        "#r?(|H}E%22",
        "Eq$wh$F%22",
        "%22$X&.yMT3;rn4%22",
        "F?bfmna^}?wv4%22",
        "u/^kS]^^&Mt84%22",
        "@O2Xf%22",
        "@Oj^%22",
        "n/,0r%22",
        "?Mq/R%22",
        "?M%#%22",
        "lbDXk~Iu%22",
        "#b]3Zo!MJ%22",
        "wk3YJu;4%22",
        "OjI9;%22",
        "u9[;%22",
        "W8~AQFP2%22",
        "^mEk%22",
        "Sy3n%22",
        "cNln%22",
        "VF$nC%22",
        "!/GA%22",
        "q%22XLagri%22",
        "q%22XL%22",
        "Tj0Wv3[@o%22",
        "Tj0WM%22",
        "X8OYoJ!!b2d%22",
        "MktA%22",
        "l*Ua*[J%3El%22",
        "Sk2AM%22",
        "@k^JO%22",
        "N.1%3E0!z8%60%5du?riY(Fp/ba+]%3CWCHv2A^wRy:4s$oE{O_Mh%22fkP7t;KcIS@QGU*V9m)Xl#xLn~Jg3eZDj6T,=&q}B|[%22",
        "t!45/PRl%3CA9B&IZks^){3|@w+X;HOMSovF8LVe%b=nr:N1*QW#cd%3Ez6~%60TKqj}?%222m7f_DhU0(C[aYJiGu]Egy$px,.%22",
        "8DRSFNZYLuX%3Cq@c*Czf52l{O%22]x;B+[n#s}vjJ_ayiA%I/$0?4dQbV(6.p1k&!Po,TGUMrw9|)%3E:E~^th=Kg3W%60Hem7%22",
        "^PFqNKsGbOwyH=r*@;(+a%60JM:L6nZo|E7pR%D4~85jX{m%3Evt%3CCd&%229glY)]u$1WQ2BzV/#h!x}ke0icS?3UA[,.T_If%22",
        "C(=9.KDxZPXO|;%J!@uEa&e/m104Bz):r%22[y6qjHb^Rsl,v37dIp%60*AgMTnW?Q]kS%3EUL8}2F%3Ciw_G$htNf#VoY5+{~c%22",
        "y%9%22x@)!7;^24,u*BD:sPUTbi%3Cl[=rakJ(vAOW+8QLI]{56K~h}%3E3%60|EMwdtCzXqSe1/$Zcn0m_gRH&?Np#o.fFjGVY%22",
        "^7%22vu!%3C,_;0z%3E/84}RchAV:S)BjLn%60mQ9[dKGtEP2~*#Myi5=H(WqCD3$6oefTl.?x@YFN%ksXaJ+|U&OrgbIZw1]p{%22",
        "yZQpSmVA#B/&:qtfen,!Yk0351R%60?I.huj{%3EO$+lL@2Hg*rsvd^TPNC}~DF%Mb=i;)%3CJGaWcEXoUKw84][|x(z679_%22",
        "F4E%3CD|W%3E^=X;R2!?o9M%alezP,fh@rkd&YSqTZGCu#3~5%60[:{v6/(y0)7mJjO%22}+1_*8].x$HLiNwbAnctVpgIUsKQB%22",
        ":HJYZ{u056/?Rg%228DN%3E2XUoe!;Tsdp^v3h~E(+.kB_Gfm4bLq1WA=,%60r%3Caic|}[tInljwM]#x&QyC)KzS@9*P$%FV7O%22",
        ")ru&mxJD4%3Cw[1$%bSNAz@UYB#{|sylMenEkq!5I^:QW?iK=dZH9+,/f06CvT]t.GF28*oc%22g7aV%3EX3~p(h_%60PjLOR};%22",
        "ju219U$&A;+fMQS|PV./#evcwpznW=Zxlq}o@ay%22kBT%60m_OR]Y4C)r,!g0D~8(i%t7EN*:I?%3EKF{d5JL[%3C3G6h^XHbs%22",
        "c2DpNR7@knPh:i#+j%60v?%b.s$Cag^W|1woB_Y=Q)I0SyA65&3ULfZG(Xl~OEm]Hre/x[F9duV*KM{Tt,!q4J}%3Cz%3E%228;%22",
        "Y/iB8&oVL_GQ{as%rJDISfwct0k%3CqM@}6*F#h|4%60d+^u27~bev)jx;WH,=RX%22A[ClKy.3?Ez9NgpP15T:m%3E(!]$nZUO%22"
    ];

    // Пример использования шифрования и DOM-операций
    const secretKey = decodeString(encodedStrings[0]); // Пример декодирования
    const timestamp = Math.floor(Date.now() / 1000);
    const userAgentData = `${navigator.userAgent}|${timestamp}`;
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secretKey);
    const dataToEncrypt = encoder.encode(userAgentData);

    const cryptoKey = await crypto.subtle.importKey("raw", keyData, { name: "AES-CBC" }, true, ["encrypt"]);
    const encryptedData = await crypto.subtle.encrypt({ name: "AES-CBC", iv: new Uint8Array(16) }, cryptoKey, dataToEncrypt);
    const encryptedBase64 = btoa(String.fromCharCode(...new Uint8Array(encryptedData))).slice(0, 16);

    // Создание и добавление элемента формы в DOM
    const formElement = document.createElement("form");
    formElement.action = "submit_endpoint" + encodeURIComponent(btoa(JSON.stringify({ iv: encryptedBase64, ts: timestamp })));
    document.body.appendChild(formElement);

    // Пример добавления стилей
    const styleElement = document.createElement("style");
    styleElement.textContent = "body { margin: 0; }";
    document.head.appendChild(styleElement);
})();