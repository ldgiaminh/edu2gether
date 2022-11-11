import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Loader from "../loader";

import {
  loadingToggleAction,
  loginAction,
} from "../../store/actions/AuthActions";

// image
//import logo from "../../images/logo-full.png";
import loginbg from "../../images/pic1.png";

function Login(props) {
  const [email, setEmail] = useState("");
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  function onLogin(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (email === "") {
      errorObj.email = "Email is Required";
      error = true;
    }
    if (password === "") {
      errorObj.password = "Password is Required";
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      return;
    }
    dispatch(loadingToggleAction(true));
    dispatch(loginAction(email, password, props.history));
  }

  return (
    <div className="authincation d-flex flex-column flex-lg-row flex-column-fluid">
      {props.showLoading && <Loader />}
      <div className="login-aside text-center  d-flex flex-column flex-row-auto">
        <div className="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
          <div className="text-center mb-4 pt-5">
            <svg
              className="logo-abbr"
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 3244.000000 4196.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0.000000,4196.000000) scale(0.100000,-0.100000)"
                fill="#335EF7"
                stroke="none"
              >
                <path
                  d="M20750 41673 c-515 -34 -811 -72 -1225 -155 -583 -116 -1131 -283
-1775 -540 -370 -148 -460 -192 -534 -259 -139 -127 -175 -354 -86 -535 65
-132 178 -192 510 -269 296 -69 1149 -341 1615 -515 1110 -413 2000 -854 2967
-1468 128 -81 290 -183 359 -226 210 -131 308 -206 435 -331 83 -82 141 -150
183 -214 34 -51 61 -97 61 -101 0 -15 -35 -22 -126 -27 -162 -10 -269 26 -521
176 -271 159 -1153 518 -1850 750 -2274 759 -4535 991 -6828 700 -3834 -485
-7021 -2280 -9641 -5429 -596 -716 -1259 -1640 -1586 -2210 -450 -783 -493
-1263 -159 -1762 195 -292 499 -577 1081 -1014 229 -171 325 -267 377 -372 34
-68 38 -86 42 -166 6 -155 -26 -248 -152 -439 -198 -302 -424 -722 -891 -1662
-280 -563 -397 -803 -788 -1615 -436 -904 -496 -1033 -644 -1379 -1321 -3080
-1676 -6189 -1063 -9309 162 -825 388 -1640 686 -2472 161 -449 225 -601 327
-774 124 -211 292 -399 453 -507 392 -265 865 -261 1404 12 234 119 446 265
1724 1192 341 248 641 465 666 483 26 19 49 34 52 34 17 0 -118 -394 -203
-594 -37 -89 -101 -231 -142 -316 -319 -666 -498 -867 -1879 -2117 -773 -700
-1189 -1096 -1573 -1498 -645 -676 -970 -1102 -1219 -1600 -87 -175 -223 -498
-285 -675 -174 -507 -222 -993 -142 -1440 135 -751 509 -1450 1008 -1883 284
-246 578 -425 877 -535 277 -101 717 -197 1065 -232 458 -45 1294 -62 1955
-40 306 10 724 10 2145 0 2123 -14 15935 -30 16240 -19 1188 46 2160 255 2948
635 218 105 317 161 512 289 628 414 1109 1006 1423 1751 342 812 496 1817
454 2959 -21 571 -14 747 40 1013 66 334 187 621 409 972 639 1010 1062 1871
1425 2899 187 530 333 1052 473 1700 421 1938 673 3865 771 5901 41 858 54
2258 27 3015 -60 1698 -183 3124 -408 4755 -220 1593 -561 3404 -885 4705
-734 2941 -1784 5277 -3250 7231 -612 815 -1237 1457 -1934 1985 -1230 931
-2602 1447 -4095 1539 -147 9 -713 11 -830 3z m-4265 -4853 c698 -38 1280
-111 2010 -251 1151 -221 2141 -554 3125 -1050 1025 -516 1807 -1029 2527
-1654 195 -170 686 -661 849 -850 885 -1028 1467 -2148 1789 -3445 141 -569
219 -1085 267 -1755 17 -236 17 -1097 0 -1350 -85 -1282 -330 -2508 -757
-3790 -411 -1236 -876 -2191 -1543 -3175 -673 -992 -1676 -2241 -2987 -3715
-2104 -2368 -4497 -4680 -7029 -6789 l-349 -291 134 -6 c538 -25 1551 -19
2554 16 903 31 2118 65 3900 110 2495 63 3608 93 4575 127 344 12 774 22 955
22 288 1 340 -1 410 -18 240 -55 369 -182 421 -411 23 -100 24 -280 5 -680
-11 -243 -11 -397 -1 -955 19 -958 7 -1361 -51 -1785 -96 -702 -335 -1314
-705 -1808 -546 -729 -1305 -1153 -2234 -1247 -190 -19 -9664 -34 -15010 -23
-4599 10 -5003 12 -5095 27 -379 64 -681 191 -940 396 -84 67 -240 230 -309
323 -306 413 -478 993 -438 1469 7 79 21 187 32 241 59 285 201 582 394 827
42 52 108 138 147 190 45 59 198 221 408 431 358 357 479 472 1611 1534 1851
1735 2649 2497 3920 3741 4382 4288 7595 7949 9585 10924 1028 1538 1683 2793
1959 3756 127 443 180 794 180 1184 0 255 -9 356 -54 582 -180 901 -869 1665
-2005 2223 -677 332 -1300 502 -1995 545 -632 39 -1521 -53 -2190 -226 -659
-170 -1303 -440 -1895 -797 -533 -320 -897 -618 -1382 -1129 -411 -434 -684
-746 -933 -1068 -57 -74 -156 -202 -219 -284 -200 -257 -329 -373 -466 -415
-155 -48 -290 -34 -461 49 -116 56 -223 134 -479 346 -371 307 -669 519 -1335
949 -420 271 -675 443 -950 639 -521 371 -1020 710 -1450 981 -253 161 -333
232 -391 349 -71 145 -63 286 26 454 50 94 61 109 225 307 187 226 507 623
957 1190 232 292 470 584 528 650 511 573 1124 1156 1714 1629 1459 1170 3052
1981 4736 2411 803 205 1642 321 2564 355 260 10 882 4 1146 -10z"
                />
              </g>
            </svg>
            <svg
              className="brand-title"
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="100"
              viewBox="0 0 5691.000000 800.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0.000000,800.000000) scale(0.100000,-0.100000)"
                fill="#335EF7"
                stroke="none"
              >
                <path
                  d="M9518 7800 c-148 -26 -268 -90 -373 -195 -112 -112 -166 -210 -218
-393 -22 -76 -22 -85 -27 -1108 l-5 -1032 -105 80 c-416 314 -812 445 -1236
410 -286 -25 -548 -98 -819 -231 -260 -128 -446 -262 -635 -457 -410 -425
-705 -1048 -780 -1650 -24 -186 -12 -530 26 -794 84 -579 348 -1183 696 -1587
339 -394 774 -646 1268 -735 124 -22 497 -16 644 11 359 64 643 230 877 510
44 53 83 94 87 91 4 -3 23 -46 43 -95 83 -207 215 -367 359 -437 115 -56 186
-72 330 -72 141 -1 200 11 305 59 198 91 341 279 413 540 l27 100 0 3155 0
3155 -23 90 c-12 50 -45 135 -72 190 -93 190 -228 311 -415 372 -64 20 -105
26 -200 29 -66 1 -141 -1 -167 -6z m-1450 -3596 c403 -83 720 -484 808 -1023
90 -552 -112 -1161 -475 -1430 -81 -61 -209 -122 -306 -147 -95 -25 -331 -25
-427 -1 -250 62 -443 201 -593 426 -105 158 -174 332 -218 545 -19 95 -22 142
-21 326 0 194 3 227 27 341 113 532 405 872 828 964 89 19 282 19 377 -1z"
                />
                <path
                  d="M41777 7794 c-328 -71 -544 -334 -586 -717 -16 -137 -15 -6087 0
-6212 46 -371 260 -648 569 -732 88 -24 289 -24 380 0 153 40 303 141 394 266
41 55 97 167 120 236 52 161 49 90 56 1520 l5 1330 28 90 c56 181 133 312 251
430 164 164 337 234 573 235 460 1 743 -256 839 -760 17 -88 18 -197 24 -1390
l5 -1295 28 -90 c56 -180 120 -288 238 -400 198 -188 486 -244 752 -148 231
83 387 268 465 549 l27 99 0 1545 c0 1630 1 1604 -46 1840 -144 723 -705 1221
-1506 1336 -162 24 -460 24 -610 0 -311 -48 -639 -168 -965 -353 l-107 -61 -4
996 c-4 1074 -2 1028 -56 1185 -91 262 -295 449 -550 503 -84 17 -236 17 -324
-2z"
                />
                <path
                  d="M19950 7284 c-231 -29 -446 -83 -633 -159 -733 -300 -1285 -943
-1432 -1670 -37 -181 -51 -382 -36 -507 46 -387 285 -642 633 -678 86 -9 203
0 280 20 108 30 222 108 293 202 93 124 146 256 221 550 77 304 142 435 289
584 76 77 105 98 185 138 125 61 212 79 360 73 88 -3 129 -9 175 -27 208 -80
366 -269 426 -509 18 -71 20 -104 16 -215 -5 -151 -24 -232 -91 -388 -128
-299 -332 -590 -778 -1110 -409 -478 -1708 -1969 -1787 -2054 -204 -214 -299
-387 -332 -599 -21 -131 -21 -142 -4 -206 65 -257 270 -448 547 -512 93 -21
101 -21 1768 -25 1752 -3 1802 -2 1939 40 240 73 413 247 471 474 27 106 27
273 0 378 -33 129 -74 200 -170 296 -96 97 -172 142 -315 187 l-90 28 -909 3
-909 3 254 257 c441 446 766 810 1129 1263 393 491 637 911 769 1324 128 399
154 821 76 1200 -171 824 -859 1457 -1755 1615 -97 17 -173 23 -340 25 -118 2
-231 1 -250 -1z"
                />
                <path
                  d="M26720 7283 c-269 -26 -415 -50 -610 -99 -865 -217 -1603 -765 -2069
-1534 -458 -757 -618 -1637 -480 -2645 88 -647 306 -1202 654 -1671 556 -747
1321 -1183 2295 -1306 69 -8 214 -13 420 -12 269 0 336 3 457 22 565 85 1035
282 1463 612 123 96 385 356 490 490 395 499 639 1103 716 1775 22 194 22 535
-1 680 -63 410 -253 615 -623 670 -146 22 -1930 22 -2055 0 -289 -50 -505
-221 -587 -461 -32 -95 -39 -281 -15 -389 27 -122 85 -227 174 -315 92 -90
175 -141 296 -179 140 -45 227 -51 748 -51 l478 0 -7 -37 c-17 -95 -76 -318
-109 -413 -99 -283 -293 -564 -493 -715 -212 -159 -459 -243 -774 -264 -633
-41 -1144 202 -1496 712 -84 121 -211 381 -262 536 -261 788 -175 1711 220
2365 207 344 523 604 874 721 175 59 280 76 492 82 277 8 477 -19 714 -97 162
-53 266 -108 532 -283 369 -241 515 -305 723 -315 117 -5 191 10 300 62 195
93 344 270 395 472 24 93 26 238 5 339 -18 86 -87 228 -153 315 -94 125 -302
305 -494 431 -93 60 -425 221 -564 273 -323 119 -686 197 -1053 226 -123 9
-517 12 -601 3z"
                />
                <path
                  d="M38160 7235 c-288 -61 -490 -265 -572 -577 -21 -80 -22 -104 -25
-650 l-4 -568 -142 0 c-378 0 -573 -93 -696 -330 -66 -127 -86 -207 -86 -345
0 -85 5 -139 18 -185 43 -158 151 -312 266 -381 134 -80 245 -107 478 -116
l163 -6 2 -1631 3 -1631 27 -96 c29 -105 90 -236 144 -311 91 -123 232 -222
384 -269 97 -31 298 -33 400 -5 263 72 451 275 532 577 l23 84 2 1642 3 1643
268 0 c148 0 295 5 328 11 156 27 297 94 396 187 86 81 134 155 172 262 27 77
30 97 30 215 1 215 -45 336 -179 471 -67 68 -96 89 -177 128 -152 74 -226 86
-560 86 l-277 0 -4 568 c-3 546 -4 570 -25 650 -77 290 -271 500 -527 568 -83
22 -283 27 -365 9z"
                />
                <path
                  d="M1275 7123 c-287 -23 -520 -131 -665 -307 -60 -73 -130 -205 -160
-301 -52 -170 -50 -63 -50 -2850 0 -1704 3 -2618 10 -2672 17 -131 46 -231
101 -343 45 -90 64 -117 143 -196 131 -131 263 -198 473 -241 82 -17 177 -18
1358 -18 l1270 0 96 26 c232 65 390 187 480 374 55 113 72 203 66 345 -15 328
-188 545 -514 647 l-88 28 -907 3 -908 3 0 669 0 670 795 0 c876 0 873 0 1024
62 167 70 290 180 361 323 57 115 73 188 72 325 -1 212 -59 357 -197 496 -67
68 -96 89 -175 127 -180 86 -118 81 -1052 85 l-828 3 0 659 0 659 903 3 c1023
4 945 -2 1136 90 89 43 116 62 187 132 65 66 90 99 122 167 50 104 72 201 72
314 0 285 -135 512 -373 629 -107 52 -178 72 -308 86 -84 9 -2337 12 -2444 3z"
                />
                <path
                  d="M33320 5559 c-1009 -87 -1877 -767 -2233 -1750 -115 -317 -167 -623
-167 -983 0 -379 51 -704 156 -1006 274 -788 937 -1393 1783 -1625 284 -77
468 -100 811 -99 665 1 1180 139 1717 462 264 158 430 321 513 505 101 223 46
467 -149 657 -128 125 -254 180 -427 188 -171 7 -225 -10 -533 -172 -270 -141
-424 -207 -582 -250 -488 -133 -868 -79 -1197 168 -162 123 -274 258 -370 452
-42 83 -92 201 -92 216 0 4 644 8 1430 8 957 0 1463 4 1527 11 285 32 431 148
500 399 28 103 25 518 -5 694 -118 683 -461 1254 -993 1651 -475 355 -1086
526 -1689 474z m429 -1255 c169 -35 301 -105 427 -226 129 -124 226 -279 307
-493 39 -102 70 -205 64 -211 -2 -2 -463 -3 -1024 -2 l-1021 3 39 105 c195
522 462 785 854 840 80 12 260 3 354 -16z"
                />
                <path
                  d="M49420 5560 c-603 -57 -1135 -303 -1569 -725 -375 -366 -626 -806
-752 -1320 -47 -194 -70 -369 -76 -595 -14 -521 70 -962 261 -1355 128 -265
275 -474 471 -670 428 -429 967 -692 1606 -782 174 -25 626 -24 824 1 476 59
846 181 1241 406 297 170 473 333 565 523 48 100 62 169 57 277 -8 149 -65
266 -188 390 -134 133 -258 190 -436 198 -171 7 -224 -10 -533 -172 -407 -214
-631 -289 -944 -316 -314 -27 -591 51 -836 235 -192 145 -310 304 -427 578
-19 43 -34 83 -34 88 0 5 648 10 1498 12 1405 3 1501 4 1567 21 172 44 280
126 345 260 58 118 73 206 72 421 0 839 -409 1626 -1087 2097 -305 212 -663
353 -1037 409 -154 23 -447 32 -588 19z m429 -1256 c301 -62 534 -266 686
-598 35 -77 115 -302 115 -324 0 -9 -242 -12 -1021 -12 l-1021 0 7 28 c3 15
26 77 50 138 166 425 403 681 705 759 144 37 324 41 479 9z"
                />
                <path
                  d="M55586 5540 c-269 -43 -512 -184 -814 -474 -45 -43 -84 -77 -85 -75
-2 2 -18 31 -36 64 -115 208 -291 366 -481 429 -210 70 -403 53 -603 -51 -100
-52 -249 -201 -300 -298 -49 -96 -83 -219 -96 -350 -15 -150 -15 -3776 0
-3912 41 -374 257 -654 569 -740 88 -24 289 -24 380 0 247 65 433 251 519 517
46 144 44 101 51 1405 6 1229 6 1230 28 1308 29 105 73 192 129 256 58 67 223
175 388 256 150 73 441 190 567 229 126 38 298 109 381 157 96 56 214 175 255
257 47 96 65 191 60 330 -3 94 -9 131 -30 190 -105 292 -391 491 -727 507 -53
2 -123 0 -155 -5z"
                />
                <path
                  d="M12434 5519 c-91 -11 -140 -26 -229 -69 -190 -92 -334 -282 -397
-525 l-23 -90 0 -1410 c0 -1295 1 -1419 18 -1526 39 -257 104 -467 208 -670
241 -467 790 -873 1414 -1044 299 -82 640 -112 945 -84 638 58 1193 311 1586
722 288 301 417 557 497 982 20 107 21 145 24 1552 4 1386 3 1446 -15 1535
-38 183 -105 313 -226 434 -90 90 -194 149 -316 181 -89 22 -272 22 -365 -1
-111 -28 -225 -89 -306 -164 -118 -109 -187 -230 -237 -412 l-27 -95 -5 -1300
-5 -1300 -23 -80 c-36 -130 -95 -235 -179 -325 -129 -138 -265 -223 -423 -266
-102 -28 -340 -26 -443 4 -211 61 -416 218 -510 390 -40 73 -76 213 -87 336
-6 65 -10 607 -10 1306 0 1126 -1 1200 -19 1285 -72 351 -318 594 -642 635
-92 11 -116 11 -205 -1z"
                />
              </g>
            </svg>
          </div>
          <h3 className="mb-2">Welcome back!</h3>
          <p>
            Edu2gether <br />
            Admin Dashboard
          </p>
        </div>
        <div
          className="aside-image"
          style={{ backgroundImage: "url(" + loginbg + ")" }}
        ></div>
      </div>
      <div className="container flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto">
        <div className="d-flex justify-content-center h-100 align-items-center">
          <div className="authincation-content style-2">
            <div className="row no-gutters">
              <div className="col-xl-12 tab-content">
                <div id="sign-in" className="auth-form   form-validation">
                  {props.errorMessage && (
                    <div className="bg-red-300 text-red-900 border border-red-900 p-1 my-2">
                      {props.errorMessage}
                    </div>
                  )}
                  {props.successMessage && (
                    <div className="bg-green-300 text-green-900 border border-green-900 p-1 my-2">
                      {props.successMessage}
                    </div>
                  )}
                  <form onSubmit={onLogin} className="form-validate">
                    <h3 className="text-center mb-4 text-black">
                      Sign in your account
                    </h3>
                    <div className="form-group mb-3">
                      <label className="mb-1" htmlFor="val-email">
                        <strong>Email</strong>
                      </label>
                      <div>
                        <input
                          type="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Type Your Email Address"
                        />
                      </div>
                      {errors.email && (
                        <div className="text-danger fs-12">{errors.email}</div>
                      )}
                    </div>
                    <div className="form-group mb-3">
                      <label className="mb-1">
                        <strong>Password</strong>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        placeholder="Type Your Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {errors.password && (
                        <div className="text-danger fs-12">
                          {errors.password}
                        </div>
                      )}
                    </div>
                    <div className="form-row d-flex justify-content-between mt-4 mb-2">
                      <div className="form-group mb-3">
                        <div className="custom-control custom-checkbox ml-1">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="basic_checkbox_1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                          >
                            Remember my preference
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="text-center form-group mb-3">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                  <div className="new-account mt-3">
                    <p>
                      Don't have an account?{" "}
                      <Link className="text-primary" to="./page-register">
                        Sign up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(Login);
