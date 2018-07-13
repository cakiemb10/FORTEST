<?PHP
//--------------------------------------------
// E-MAP¶èÊ¬¡ÊS¡§¥¹¥¿¥ó¥À¡¼¥É¡¢L¡§¥é¥¤¥È¡¢N¡§¥Þ¥Ã¥×¥ê¥ó¥¯¡Ë
//--------------------------------------------
$D_SERVICE_TYPE = "S";

//--------------------------------------------
//¥ì¥¹¥Ý¥ó¥¹¥Ø¥Ã¥Àcharset½ÐÎÏ
//--------------------------------------------
$D_RESPONSE_CHARSET = 0;

//--------------------------------------------
//¥ê¥Õ¥¡¥é¡¼Ç§¾Ú
//--------------------------------------------
//µö²Ä¥ê¥Õ¥¡¥é¡¼
$D_ALLOW_REFERER  = "*";
//NULLµö²Ä
$D_ALLOW_REFERER_NULL = 1;

//--------------------------------------------
// ¥¢¥¯¥»¥¹¸µIPÇ§¾Ú
//--------------------------------------------
//µö²ÄIP
//$D_ALLOW_IP = "";

//--------------------------------------------
//BASICÇ§¾Ú
//--------------------------------------------
$D_BASIC_AUTH["dev"]  = 1;
$D_BASIC_AUTH["test"] = 1;
$D_BASIC_AUTH["www"]  = 0;

//--------------------------------------------
// SSLÀÜÂ³¡Êhttps¥¢¥¯¥»¥¹¡Ë
//--------------------------------------------
$D_SSL_ACCESS = 1;

//--------------------------------------------
// iPhone¤«¤é¤Î¥¢¥¯¥»¥¹¤ò·ÈÂÓ¤Ø¥ê¥À¥¤¥ì¥¯¥È
//--------------------------------------------
$D_IPHONE_REDIRECT = 0;
//--------------------------------------------
// Android¤«¤é¤Î¥¢¥¯¥»¥¹¤ò·ÈÂÓ¤Ø¥ê¥À¥¤¥ì¥¯¥È
//--------------------------------------------
$D_ANDROID_REDIRECT = 0;

//--------------------------------------------
// iPhone¤«¤é¤Î¥¢¥¯¥»¥¹¤ò¥¹¥Þ¥Û¤Ø¥ê¥À¥¤¥ì¥¯¥È
//--------------------------------------------
//$D_IPHONE_REDIRECT_SMT = ;
//--------------------------------------------
// iPad¤«¤é¤Î¥¢¥¯¥»¥¹¤ò¥¹¥Þ¥Û¤Ø¥ê¥À¥¤¥ì¥¯¥È
//--------------------------------------------
//$D_IPAD_REDIRECT_SMT = ;
//--------------------------------------------
// Android¤«¤é¤Î¥¢¥¯¥»¥¹¤ò¥¹¥Þ¥Û¤Ø¥ê¥À¥¤¥ì¥¯¥È
//--------------------------------------------
//$D_ANDROID_REDIRECT_SMT = ;

//--------------------------------------------
// ·ÈÂÓURL¤òhttps¤ÇÉ½¼¨
//--------------------------------------------
//$D_MBURL_HTTPS = ;

//--------------------------------------------
// TOP¥Ú¡¼¥¸¶èÊ¬
//--------------------------------------------
$D_TOP_PAGE_KBN = '0';// 0¡§É¸½àTOP¡¢1¡§µÒÀèTOP¡¢2¡§ZDCÍÂ¤ê¡Êasp¡Ë

//--------------------------------------------
// TOP¥Ú¡¼¥¸¤Î¥ê¥ó¥¯
//--------------------------------------------
//$D_HISTORY_TOP_LINK = "javascript:parent.location.href='';";

//--------------------------------------------
//É½¼¨
//--------------------------------------------
//µòÅÀÌ¾É½¼¨Ê¸»úÎó
$D_USER_DEFNAME = "Å¹ÊÞ";
//¥Õ¥é¥°¹àÌÜÉ½¼¨Íó
$D_USER_SERVICENAME = "¥µ¡¼¥Ó¥¹";

//--------------------------------------------
//ÃÏ¿ÞÉ½¼¨
//--------------------------------------------
//½é´üÃÏ¿ÞÉ½¼¨°ÌÃÖ(°ÞÅÙ)
$D_INIT_LAT = 128440300;
//½é´üÃÏ¿ÞÉ½¼¨°ÌÃÖ(·ÐÅÙ)
$D_INIT_LON = 503173140;

//½é´üÉ½¼¨½Ì¼Ü
$D_INIT_LVL = 13;
//°ÌÃÖ¸¡º÷·èÄê¸å
//¡Ê-1¡§½é´üÉ½¼¨»þ¤Ï$D_INIT_LVL¤Ë½à¤¸¡¢ºÆÉ½¼¨»þ¤Ï¸½½Ì¼Ü¤Î¤Þ¤Þ¡Ë
$D_INIT_LVL_SEARCH = 13;
//¾ÜºÙÁªÂò¸å
//¡Ê-1¡§½é´üÉ½¼¨»þ¤Ï$D_INIT_LVL¤Ë½à¤¸¡¢ºÆÉ½¼¨»þ¤Ï¸½½Ì¼Ü¤Î¤Þ¤Þ¡Ë
$D_INIT_LVL_DETAIL = 13;
//°õºþ²èÌÌ
//¡Ê-1¡§$D_INIT_LVL¤Ë½à¤¸¤ë¡Ë
$D_INIT_LVL_PRINT  = 13;

//µòÅÀÉ½¼¨ºÇ¾®½Ì¼Ü
$D_VIEW_ICON_MAX = 1;
//»ØÄêµòÅÀ°Ê³°ÈóÉ½¼¨¶èÊ¬
$D_DSP_OTHER_KBN = 0;
//¥ì¥¤¥ä¡¼¶èÊ¬
$D_MAP_LAYER_KBN = 2;
//ÃÏ¿ÞÃæ¿´¥Þ¡¼¥¯
$D_MAPCENTER_MARK = "0";
//ÃÏ¿ÞÃæ¿´¥Þ¡¼¥¯¡Ê°õºþ²èÌÌ¡Ë
$D_MAPCENTER_MARK_P = "0";

//--------------------------------------------
//µòÅÀ¸¡º÷
//--------------------------------------------
//¸¡º÷¾ò·ï(AND,OR)
$D_SHOP_COND = "AND";
//µòÅÀ¥ê¥¹¥È¹Ô¿ô
$D_SHOP_PAGE = 5;
//ºÇÂç·ï¿ô
$D_SHOP_MAX  = 50;
//¾ÜºÙÉ½¼¨¤·¤¿¤é¥ê¥¹¥È¾Ã¤¹¤«¡Ê0:¾Ã¤µ¤Ê¤¤¡¢1:¾Ã¤¹¡Ë
$D_SHOP_CLOSELIST = "1";


//--------------------------------------------
//¸¡º÷Áë
//--------------------------------------------
//³Æ¥ê¥¹¥È¹Ô¿ô
$D_SEARCH_SHOPLIST_PAGE = 30;
//½»½ê¥ê¥¹¥È¤ò¤É¤Î³¬ÁØ¤Þ¤Ç·¡¤ê²¼¤²¤ë¤«¡Ê1¡§ÅÔÆ»ÉÜ¸©¡¢2¡§»Ô¶èÄ®Â¼¡¢3¡§Âç»ú¡¢4¡§»úÃúÌÜ¡¢5¡§³¹¶è¡¢6¡§ÃÏÈÖ¡Ê»ÞÈÖ¡Ë
$D_ADDRL_BOTTOM_LVL = 6;

//--------------------------------------------
//µòÅÀ¥¨¥ê¥¢¸¡º÷¤ÎÉ½¼¨Ì¾¾Î
//--------------------------------------------
// ¥¨¥ê¥¢¸¡º÷
$D_HISTORY_NAME["ShopA"]   = "Å¹ÊÞ¥ê¥¹¥È";	// Ì¾¾Î
$D_SEARCH_SHOPA_DISPNM[1]  = "½»½ê";	// Âè1³¬ÁØ
$D_SEARCH_SHOPA_DISPNM[2]  = "½»½ê";	// Âè2³¬ÁØ
// ¥¨¥ê¥¢¸¡º÷£²
$D_HISTORY_NAME["ShopA_2"] = "Å¹ÊÞ¥ê¥¹¥È";	// Ì¾¾Î
$D_SEARCH_SHOPA_DISPNM[3]  = "½»½ê";	// Âè1³¬ÁØ
$D_SEARCH_SHOPA_DISPNM[4]  = "½»½ê";	// Âè2³¬ÁØ
// ¥¨¥ê¥¢¸¡º÷£³
$D_HISTORY_NAME["ShopA_3"] = "Å¹ÊÞ¥ê¥¹¥È";	// Ì¾¾Î
$D_SEARCH_SHOPA_DISPNM[5]  = "½»½ê";	// Âè1³¬ÁØ
$D_SEARCH_SHOPA_DISPNM[6]  = "½»½ê";	// Âè2³¬ÁØ
// ¥¨¥ê¥¢¸¡º÷£´
$D_HISTORY_NAME["ShopA_4"] = "Å¹ÊÞ¥ê¥¹¥È";	// Ì¾¾Î
$D_SEARCH_SHOPA_DISPNM[7]  = "½»½ê";	// Âè1³¬ÁØ
$D_SEARCH_SHOPA_DISPNM[8]  = "½»½ê";	// Âè2³¬ÁØ
// ¥¨¥ê¥¢¸¡º÷£µ
$D_HISTORY_NAME["ShopA_5"] = "Å¹ÊÞ¥ê¥¹¥È";	// Ì¾¾Î
$D_SEARCH_SHOPA_DISPNM[9]  = "½»½ê";	// Âè1³¬ÁØ
$D_SEARCH_SHOPA_DISPNM[10] = "½»½ê";	// Âè2³¬ÁØ

//--------------------------------------------
//ºÇ´ó±Ø¸¡º÷
//--------------------------------------------
$D_ST_RAD = 5000;

//--------------------------------------------
//ºÇ´ó»ÜÀß¸¡º÷
//--------------------------------------------
//ºÇÂç·ï¿ô
$D_POI_MAX = 50;
//¥¸¥ã¥ó¥ë²ÄÊÑ
$arr_D_POI_JNRMN = array();
$arr_D_POI_JNRMN[] = '00160';
$arr_D_POI_JNRMN[] = '00250';
$arr_D_POI_JNRMN[] = '00140';
$arr_D_POI_JNRMN[] = '00170';
$arr_D_POI_JNRMN[] = '00220';
$arr_D_POI_JNRMN[] = '00240';
$arr_D_POI_JNRMN[] = '00130';
$arr_D_POI_JNRMN[] = '00110';
$arr_D_POI_JNRMN[] = '00120';
if (count($arr_D_POI_JNRMN)) $D_POI_JNRMN = implode(',', $arr_D_POI_JNRMN);

//--------------------------------------------
//Æ°ºî
//--------------------------------------------
//¥ë¡¼¥È¸¡º÷
$D_ROUTE_TYPE	 = 0;
//µòÅÀ¥¢¥¤¥³¥ó¥¯¥ê¥Ã¥¯
$D_KYO_ICON_CLK  = 1;
// µòÅÀ¥¢¥¤¥³¥ó½Å¤Ê¤ê»þ¤Ë¿á¤­½Ð¤·¤Ë¤Þ¤È¤á¤ÆÉ½¼¨
$D_KYO_ICON_OVERLAP = 1;

//--------------------------------------------
//ÀÜÂ³I/F
//--------------------------------------------
//Standard½»½êÀÜÂ³I/F
$D_STANDARD_ADDR_IF = 0;

//--------------------------------------------
//¹àÌÜÌ¾
//--------------------------------------------
//µòÅÀ°ìÍ÷
$D_KYO_COL_NAME[0][0] = "name";
$D_KYO_COL_NAME[0][1] = "col_05";
$D_KYO_COL_NAME[0][2] = "col_06";
$D_KYO_COL_NAME[0][3] = "col_07";
$D_KYO_COL_NAME[0][4] = "col_08";
$D_KYO_COL_NAME[0][5] = "col_09";
$D_KYO_COL_NAME[0][6] = "col_10";
$D_KYO_COL_NAME[0][7] = "addr";
$D_KYO_COL_NAME[0][8] = "col_14";
$D_KYO_COL_NAME[0][9] = "col_15";
$D_KYO_COL_NAME[0][10] = "col_19";
$D_KYO_COL_NAME[0][11] = "col_20";
$D_KYO_COL_NAME[0][12] = "col_27";
$D_KYO_COL_NAME[0][13] = "col_29";
$D_KYO_COL_NAME[0][14] = "col_36";
$D_KYO_COL_NAME[0][15] = "col_37";
$D_KYO_COL_NAME[0][16] = "col_43";
$D_KYO_COL_NAME[0][17] = "col_44";
$D_KYO_COL_NAME[0][18] = "col_86";
$D_KYO_COL_NAME[0][19] = "col_119";
$D_KYO_COL_NAME[0][20] = "col_120";
$D_KYO_COL_NAME[0][21] = "col_121";
$D_KYO_COL_NAME[0][22] = "col_122";
$D_KYO_COL_NAME[0][23] = "col_123";
$D_KYO_COL_NAME[0][24] = "col_124";
$D_KYO_COL_NAME[0][25] = "col_127";
$D_KYO_COL_NAME[0][26] = "col_128";
$D_KYO_COL_NAME[0][27] = "col_129";
$D_KYO_COL_NAME[0][28] = "col_130";
$D_KYO_COL_NAME[0][29] = "col_131";
$D_KYO_COL_NAME[0][30] = "col_132";
$D_KYO_COL_NAME[0][31] = "col_135";
$D_KYO_COL_NAME[0][32] = "col_136";
$D_KYO_COL_NAME[0][33] = "col_137";
$D_KYO_COL_NAME[0][34] = "col_138";
$D_KYO_COL_NAME[0][35] = "col_139";
$D_KYO_COL_NAME[0][36] = "col_140";
$D_KYO_COL_NAME[0][37] = "col_143";
$D_KYO_COL_NAME[0][38] = "col_144";
$D_KYO_COL_NAME[0][39] = "col_145";
$D_KYO_COL_NAME[0][40] = "col_146";
$D_KYO_COL_NAME[0][41] = "col_147";
$D_KYO_COL_NAME[0][42] = "col_148";
$D_KYO_COL_NAME[0][43] = "col_151";
$D_KYO_COL_NAME[0][44] = "col_152";
$D_KYO_COL_NAME[0][45] = "col_153";
$D_KYO_COL_NAME[0][46] = "col_154";
$D_KYO_COL_NAME[0][47] = "col_155";
$D_KYO_COL_NAME[0][48] = "col_156";
$D_KYO_COL_NAME[0][49] = "col_157";
$D_KYO_COL_NAME[0][50] = "col_158";
$D_KYO_COL_NAME[0][51] = "col_184";
$D_KYO_COL_NAME[0][52] = "col_192";
$D_KYO_COL_NAME[0][53] = "col_193";
$D_KYO_COL_NAME[0][54] = "col_194";
$D_KYO_COL_NAME[0][55] = "col_195";
//¿á¤­½Ð¤·
$D_KYO_COL_NAME[3][0] = "name";
$D_KYO_COL_NAME[3][1] = "col_05";
$D_KYO_COL_NAME[3][2] = "col_06";
$D_KYO_COL_NAME[3][3] = "col_07";
$D_KYO_COL_NAME[3][4] = "col_08";
$D_KYO_COL_NAME[3][5] = "col_09";
$D_KYO_COL_NAME[3][6] = "col_10";
$D_KYO_COL_NAME[3][7] = "addr";
$D_KYO_COL_NAME[3][8] = "col_14";
$D_KYO_COL_NAME[3][9] = "col_15";
$D_KYO_COL_NAME[3][10] = "col_19";
$D_KYO_COL_NAME[3][11] = "col_20";
$D_KYO_COL_NAME[3][12] = "col_27";
$D_KYO_COL_NAME[3][13] = "col_29";
$D_KYO_COL_NAME[3][14] = "col_36";
$D_KYO_COL_NAME[3][15] = "col_37";
$D_KYO_COL_NAME[3][16] = "col_43";
$D_KYO_COL_NAME[3][17] = "col_44";
$D_KYO_COL_NAME[3][18] = "col_86";
$D_KYO_COL_NAME[3][19] = "col_119";
$D_KYO_COL_NAME[3][20] = "col_120";
$D_KYO_COL_NAME[3][21] = "col_121";
$D_KYO_COL_NAME[3][22] = "col_122";
$D_KYO_COL_NAME[3][23] = "col_123";
$D_KYO_COL_NAME[3][24] = "col_124";
$D_KYO_COL_NAME[3][25] = "col_127";
$D_KYO_COL_NAME[3][26] = "col_128";
$D_KYO_COL_NAME[3][27] = "col_129";
$D_KYO_COL_NAME[3][28] = "col_130";
$D_KYO_COL_NAME[3][29] = "col_131";
$D_KYO_COL_NAME[3][30] = "col_132";
$D_KYO_COL_NAME[3][31] = "col_135";
$D_KYO_COL_NAME[3][32] = "col_136";
$D_KYO_COL_NAME[3][33] = "col_137";
$D_KYO_COL_NAME[3][34] = "col_138";
$D_KYO_COL_NAME[3][35] = "col_139";
$D_KYO_COL_NAME[3][36] = "col_140";
$D_KYO_COL_NAME[3][37] = "col_143";
$D_KYO_COL_NAME[3][38] = "col_144";
$D_KYO_COL_NAME[3][39] = "col_145";
$D_KYO_COL_NAME[3][40] = "col_146";
$D_KYO_COL_NAME[3][41] = "col_147";
$D_KYO_COL_NAME[3][42] = "col_148";
$D_KYO_COL_NAME[3][43] = "col_151";
$D_KYO_COL_NAME[3][44] = "col_152";
$D_KYO_COL_NAME[3][45] = "col_153";
$D_KYO_COL_NAME[3][46] = "col_154";
$D_KYO_COL_NAME[3][47] = "col_155";
$D_KYO_COL_NAME[3][48] = "col_156";
$D_KYO_COL_NAME[3][49] = "col_157";
$D_KYO_COL_NAME[3][50] = "col_158";
$D_KYO_COL_NAME[3][51] = "col_184";
$D_KYO_COL_NAME[3][52] = "col_192";
$D_KYO_COL_NAME[3][53] = "col_193";
$D_KYO_COL_NAME[3][54] = "col_194";
$D_KYO_COL_NAME[3][55] = "col_195";
//µòÅÀ¾ÜºÙ
$D_KYO_COL_NAME[1][0] = "name";
$D_KYO_COL_NAME[1][1] = "col_01";
$D_KYO_COL_NAME[1][2] = "col_02";
$D_KYO_COL_NAME[1][3] = "col_03";
$D_KYO_COL_NAME[1][4] = "col_04";
$D_KYO_COL_NAME[1][5] = "col_05";
$D_KYO_COL_NAME[1][6] = "col_06";
$D_KYO_COL_NAME[1][7] = "col_07";
$D_KYO_COL_NAME[1][8] = "col_08";
$D_KYO_COL_NAME[1][9] = "col_09";
$D_KYO_COL_NAME[1][10] = "col_10";
$D_KYO_COL_NAME[1][11] = "addr";
$D_KYO_COL_NAME[1][12] = "col_11";
$D_KYO_COL_NAME[1][13] = "col_12";
$D_KYO_COL_NAME[1][14] = "col_13";
$D_KYO_COL_NAME[1][15] = "col_14";
$D_KYO_COL_NAME[1][16] = "col_15";
$D_KYO_COL_NAME[1][17] = "col_16";
$D_KYO_COL_NAME[1][18] = "col_17";
$D_KYO_COL_NAME[1][19] = "col_18";
$D_KYO_COL_NAME[1][20] = "col_19";
$D_KYO_COL_NAME[1][21] = "col_20";
$D_KYO_COL_NAME[1][22] = "col_21";
$D_KYO_COL_NAME[1][23] = "col_22";
$D_KYO_COL_NAME[1][24] = "col_23";
$D_KYO_COL_NAME[1][25] = "col_24";
$D_KYO_COL_NAME[1][26] = "col_25";
$D_KYO_COL_NAME[1][27] = "col_26";
$D_KYO_COL_NAME[1][28] = "col_27";
$D_KYO_COL_NAME[1][29] = "col_28";
$D_KYO_COL_NAME[1][30] = "col_29";
$D_KYO_COL_NAME[1][31] = "col_30";
$D_KYO_COL_NAME[1][32] = "col_31";
$D_KYO_COL_NAME[1][33] = "col_32";
$D_KYO_COL_NAME[1][34] = "col_33";
$D_KYO_COL_NAME[1][35] = "col_34";
$D_KYO_COL_NAME[1][36] = "col_35";
$D_KYO_COL_NAME[1][37] = "col_36";
$D_KYO_COL_NAME[1][38] = "col_37";
$D_KYO_COL_NAME[1][39] = "col_38";
$D_KYO_COL_NAME[1][40] = "col_39";
$D_KYO_COL_NAME[1][41] = "col_40";
$D_KYO_COL_NAME[1][42] = "col_41";
$D_KYO_COL_NAME[1][43] = "col_42";
$D_KYO_COL_NAME[1][44] = "col_43";
$D_KYO_COL_NAME[1][45] = "col_44";
$D_KYO_COL_NAME[1][46] = "col_45";
$D_KYO_COL_NAME[1][47] = "col_46";
$D_KYO_COL_NAME[1][48] = "col_47";
$D_KYO_COL_NAME[1][49] = "col_48";
$D_KYO_COL_NAME[1][50] = "col_49";
$D_KYO_COL_NAME[1][51] = "col_50";
$D_KYO_COL_NAME[1][52] = "col_51";
$D_KYO_COL_NAME[1][53] = "col_52";
$D_KYO_COL_NAME[1][54] = "col_53";
$D_KYO_COL_NAME[1][55] = "col_54";
$D_KYO_COL_NAME[1][56] = "col_55";
$D_KYO_COL_NAME[1][57] = "col_56";
$D_KYO_COL_NAME[1][58] = "col_57";
$D_KYO_COL_NAME[1][59] = "col_58";
$D_KYO_COL_NAME[1][60] = "col_59";
$D_KYO_COL_NAME[1][61] = "col_60";
$D_KYO_COL_NAME[1][62] = "col_61";
$D_KYO_COL_NAME[1][63] = "col_62";
$D_KYO_COL_NAME[1][64] = "col_63";
$D_KYO_COL_NAME[1][65] = "col_64";
$D_KYO_COL_NAME[1][66] = "col_65";
$D_KYO_COL_NAME[1][67] = "col_66";
$D_KYO_COL_NAME[1][68] = "col_67";
$D_KYO_COL_NAME[1][69] = "col_68";
$D_KYO_COL_NAME[1][70] = "col_69";
$D_KYO_COL_NAME[1][71] = "col_70";
$D_KYO_COL_NAME[1][72] = "col_71";
$D_KYO_COL_NAME[1][73] = "col_72";
$D_KYO_COL_NAME[1][74] = "col_73";
$D_KYO_COL_NAME[1][75] = "col_74";
$D_KYO_COL_NAME[1][76] = "col_75";
$D_KYO_COL_NAME[1][77] = "col_76";
$D_KYO_COL_NAME[1][78] = "col_77";
$D_KYO_COL_NAME[1][79] = "col_78";
$D_KYO_COL_NAME[1][80] = "col_79";
$D_KYO_COL_NAME[1][81] = "col_80";
$D_KYO_COL_NAME[1][82] = "col_81";
$D_KYO_COL_NAME[1][83] = "col_82";
$D_KYO_COL_NAME[1][84] = "col_83";
$D_KYO_COL_NAME[1][85] = "col_84";
$D_KYO_COL_NAME[1][86] = "col_85";
$D_KYO_COL_NAME[1][87] = "col_86";
$D_KYO_COL_NAME[1][88] = "col_87";
$D_KYO_COL_NAME[1][89] = "col_88";
$D_KYO_COL_NAME[1][90] = "col_89";
$D_KYO_COL_NAME[1][91] = "col_90";
$D_KYO_COL_NAME[1][92] = "col_91";
$D_KYO_COL_NAME[1][93] = "col_92";
$D_KYO_COL_NAME[1][94] = "col_93";
$D_KYO_COL_NAME[1][95] = "col_94";
$D_KYO_COL_NAME[1][96] = "col_95";
$D_KYO_COL_NAME[1][97] = "col_96";
$D_KYO_COL_NAME[1][98] = "col_97";
$D_KYO_COL_NAME[1][99] = "col_98";
$D_KYO_COL_NAME[1][100] = "col_99";
$D_KYO_COL_NAME[1][101] = "col_100";
$D_KYO_COL_NAME[1][102] = "col_101";
$D_KYO_COL_NAME[1][103] = "col_102";
$D_KYO_COL_NAME[1][104] = "col_103";
$D_KYO_COL_NAME[1][105] = "col_104";
$D_KYO_COL_NAME[1][106] = "col_105";
$D_KYO_COL_NAME[1][107] = "col_106";
$D_KYO_COL_NAME[1][108] = "col_107";
$D_KYO_COL_NAME[1][109] = "col_108";
$D_KYO_COL_NAME[1][110] = "col_109";
$D_KYO_COL_NAME[1][111] = "col_110";
$D_KYO_COL_NAME[1][112] = "col_111";
$D_KYO_COL_NAME[1][113] = "col_112";
$D_KYO_COL_NAME[1][114] = "col_113";
$D_KYO_COL_NAME[1][115] = "col_114";
$D_KYO_COL_NAME[1][116] = "col_115";
$D_KYO_COL_NAME[1][117] = "col_116";
$D_KYO_COL_NAME[1][118] = "col_117";
$D_KYO_COL_NAME[1][119] = "col_118";
$D_KYO_COL_NAME[1][120] = "col_119";
$D_KYO_COL_NAME[1][121] = "col_120";
$D_KYO_COL_NAME[1][122] = "col_121";
$D_KYO_COL_NAME[1][123] = "col_122";
$D_KYO_COL_NAME[1][124] = "col_123";
$D_KYO_COL_NAME[1][125] = "col_124";
$D_KYO_COL_NAME[1][126] = "col_125";
$D_KYO_COL_NAME[1][127] = "col_126";
$D_KYO_COL_NAME[1][128] = "col_127";
$D_KYO_COL_NAME[1][129] = "col_128";
$D_KYO_COL_NAME[1][130] = "col_129";
$D_KYO_COL_NAME[1][131] = "col_130";
$D_KYO_COL_NAME[1][132] = "col_131";
$D_KYO_COL_NAME[1][133] = "col_132";
$D_KYO_COL_NAME[1][134] = "col_133";
$D_KYO_COL_NAME[1][135] = "col_134";
$D_KYO_COL_NAME[1][136] = "col_135";
$D_KYO_COL_NAME[1][137] = "col_136";
$D_KYO_COL_NAME[1][138] = "col_137";
$D_KYO_COL_NAME[1][139] = "col_138";
$D_KYO_COL_NAME[1][140] = "col_139";
$D_KYO_COL_NAME[1][141] = "col_140";
$D_KYO_COL_NAME[1][142] = "col_141";
$D_KYO_COL_NAME[1][143] = "col_142";
$D_KYO_COL_NAME[1][144] = "col_143";
$D_KYO_COL_NAME[1][145] = "col_144";
$D_KYO_COL_NAME[1][146] = "col_145";
$D_KYO_COL_NAME[1][147] = "col_146";
$D_KYO_COL_NAME[1][148] = "col_147";
$D_KYO_COL_NAME[1][149] = "col_148";
$D_KYO_COL_NAME[1][150] = "col_149";
$D_KYO_COL_NAME[1][151] = "col_150";
$D_KYO_COL_NAME[1][152] = "col_151";
$D_KYO_COL_NAME[1][153] = "col_152";
$D_KYO_COL_NAME[1][154] = "col_153";
$D_KYO_COL_NAME[1][155] = "col_154";
$D_KYO_COL_NAME[1][156] = "col_155";
$D_KYO_COL_NAME[1][157] = "col_156";
$D_KYO_COL_NAME[1][158] = "col_157";
$D_KYO_COL_NAME[1][159] = "col_158";
$D_KYO_COL_NAME[1][160] = "col_159";
$D_KYO_COL_NAME[1][161] = "col_160";
$D_KYO_COL_NAME[1][162] = "col_161";
$D_KYO_COL_NAME[1][163] = "col_162";
$D_KYO_COL_NAME[1][164] = "col_163";
$D_KYO_COL_NAME[1][165] = "col_164";
$D_KYO_COL_NAME[1][166] = "col_165";
$D_KYO_COL_NAME[1][167] = "col_166";
$D_KYO_COL_NAME[1][168] = "col_167";
$D_KYO_COL_NAME[1][169] = "col_168";
$D_KYO_COL_NAME[1][170] = "col_169";
$D_KYO_COL_NAME[1][171] = "col_170";
$D_KYO_COL_NAME[1][172] = "col_171";
$D_KYO_COL_NAME[1][173] = "col_172";
$D_KYO_COL_NAME[1][174] = "col_173";
$D_KYO_COL_NAME[1][175] = "col_174";
$D_KYO_COL_NAME[1][176] = "col_175";
$D_KYO_COL_NAME[1][177] = "col_176";
$D_KYO_COL_NAME[1][178] = "col_177";
$D_KYO_COL_NAME[1][179] = "col_178";
$D_KYO_COL_NAME[1][180] = "col_179";
$D_KYO_COL_NAME[1][181] = "col_180";
$D_KYO_COL_NAME[1][182] = "col_181";
$D_KYO_COL_NAME[1][183] = "col_182";
$D_KYO_COL_NAME[1][184] = "col_183";
$D_KYO_COL_NAME[1][185] = "col_184";
$D_KYO_COL_NAME[1][186] = "col_185";
$D_KYO_COL_NAME[1][187] = "col_186";
$D_KYO_COL_NAME[1][188] = "col_187";
$D_KYO_COL_NAME[1][189] = "col_188";
$D_KYO_COL_NAME[1][190] = "col_189";
$D_KYO_COL_NAME[1][191] = "col_190";
$D_KYO_COL_NAME[1][192] = "col_191";
$D_KYO_COL_NAME[1][193] = "col_192";
$D_KYO_COL_NAME[1][194] = "col_193";
$D_KYO_COL_NAME[1][195] = "col_194";
$D_KYO_COL_NAME[1][196] = "col_195";
//°õºþ
$D_KYO_COL_NAME[2][0] = "name";
$D_KYO_COL_NAME[2][1] = "col_01";
$D_KYO_COL_NAME[2][2] = "col_02";
$D_KYO_COL_NAME[2][3] = "col_03";
$D_KYO_COL_NAME[2][4] = "col_04";
$D_KYO_COL_NAME[2][5] = "col_05";
$D_KYO_COL_NAME[2][6] = "col_06";
$D_KYO_COL_NAME[2][7] = "col_07";
$D_KYO_COL_NAME[2][8] = "col_08";
$D_KYO_COL_NAME[2][9] = "col_09";
$D_KYO_COL_NAME[2][10] = "col_10";
$D_KYO_COL_NAME[2][11] = "addr";
$D_KYO_COL_NAME[2][12] = "col_11";
$D_KYO_COL_NAME[2][13] = "col_12";
$D_KYO_COL_NAME[2][14] = "col_13";
$D_KYO_COL_NAME[2][15] = "col_14";
$D_KYO_COL_NAME[2][16] = "col_15";
$D_KYO_COL_NAME[2][17] = "col_16";
$D_KYO_COL_NAME[2][18] = "col_17";
$D_KYO_COL_NAME[2][19] = "col_18";
$D_KYO_COL_NAME[2][20] = "col_19";
$D_KYO_COL_NAME[2][21] = "col_20";
$D_KYO_COL_NAME[2][22] = "col_21";
$D_KYO_COL_NAME[2][23] = "col_22";
$D_KYO_COL_NAME[2][24] = "col_23";
$D_KYO_COL_NAME[2][25] = "col_24";
$D_KYO_COL_NAME[2][26] = "col_25";
$D_KYO_COL_NAME[2][27] = "col_26";
$D_KYO_COL_NAME[2][28] = "col_27";
$D_KYO_COL_NAME[2][29] = "col_28";
$D_KYO_COL_NAME[2][30] = "col_29";
$D_KYO_COL_NAME[2][31] = "col_30";
$D_KYO_COL_NAME[2][32] = "col_31";
$D_KYO_COL_NAME[2][33] = "col_32";
$D_KYO_COL_NAME[2][34] = "col_33";
$D_KYO_COL_NAME[2][35] = "col_34";
$D_KYO_COL_NAME[2][36] = "col_35";
$D_KYO_COL_NAME[2][37] = "col_36";
$D_KYO_COL_NAME[2][38] = "col_37";
$D_KYO_COL_NAME[2][39] = "col_38";
$D_KYO_COL_NAME[2][40] = "col_39";
$D_KYO_COL_NAME[2][41] = "col_40";
$D_KYO_COL_NAME[2][42] = "col_41";
$D_KYO_COL_NAME[2][43] = "col_42";
$D_KYO_COL_NAME[2][44] = "col_43";
$D_KYO_COL_NAME[2][45] = "col_44";
$D_KYO_COL_NAME[2][46] = "col_45";
$D_KYO_COL_NAME[2][47] = "col_46";
$D_KYO_COL_NAME[2][48] = "col_47";
$D_KYO_COL_NAME[2][49] = "col_48";
$D_KYO_COL_NAME[2][50] = "col_49";
$D_KYO_COL_NAME[2][51] = "col_50";
$D_KYO_COL_NAME[2][52] = "col_51";
$D_KYO_COL_NAME[2][53] = "col_52";
$D_KYO_COL_NAME[2][54] = "col_53";
$D_KYO_COL_NAME[2][55] = "col_54";
$D_KYO_COL_NAME[2][56] = "col_55";
$D_KYO_COL_NAME[2][57] = "col_56";
$D_KYO_COL_NAME[2][58] = "col_57";
$D_KYO_COL_NAME[2][59] = "col_58";
$D_KYO_COL_NAME[2][60] = "col_59";
$D_KYO_COL_NAME[2][61] = "col_60";
$D_KYO_COL_NAME[2][62] = "col_61";
$D_KYO_COL_NAME[2][63] = "col_62";
$D_KYO_COL_NAME[2][64] = "col_63";
$D_KYO_COL_NAME[2][65] = "col_64";
$D_KYO_COL_NAME[2][66] = "col_65";
$D_KYO_COL_NAME[2][67] = "col_66";
$D_KYO_COL_NAME[2][68] = "col_67";
$D_KYO_COL_NAME[2][69] = "col_68";
$D_KYO_COL_NAME[2][70] = "col_69";
$D_KYO_COL_NAME[2][71] = "col_70";
$D_KYO_COL_NAME[2][72] = "col_71";
$D_KYO_COL_NAME[2][73] = "col_72";
$D_KYO_COL_NAME[2][74] = "col_73";
$D_KYO_COL_NAME[2][75] = "col_74";
$D_KYO_COL_NAME[2][76] = "col_75";
$D_KYO_COL_NAME[2][77] = "col_76";
$D_KYO_COL_NAME[2][78] = "col_77";
$D_KYO_COL_NAME[2][79] = "col_78";
$D_KYO_COL_NAME[2][80] = "col_79";
$D_KYO_COL_NAME[2][81] = "col_80";
$D_KYO_COL_NAME[2][82] = "col_81";
$D_KYO_COL_NAME[2][83] = "col_82";
$D_KYO_COL_NAME[2][84] = "col_83";
$D_KYO_COL_NAME[2][85] = "col_84";
$D_KYO_COL_NAME[2][86] = "col_85";
$D_KYO_COL_NAME[2][87] = "col_86";
$D_KYO_COL_NAME[2][88] = "col_87";
$D_KYO_COL_NAME[2][89] = "col_88";
$D_KYO_COL_NAME[2][90] = "col_89";
$D_KYO_COL_NAME[2][91] = "col_90";
$D_KYO_COL_NAME[2][92] = "col_91";
$D_KYO_COL_NAME[2][93] = "col_92";
$D_KYO_COL_NAME[2][94] = "col_93";
$D_KYO_COL_NAME[2][95] = "col_94";
$D_KYO_COL_NAME[2][96] = "col_95";
$D_KYO_COL_NAME[2][97] = "col_96";
$D_KYO_COL_NAME[2][98] = "col_97";
$D_KYO_COL_NAME[2][99] = "col_98";
$D_KYO_COL_NAME[2][100] = "col_99";
$D_KYO_COL_NAME[2][101] = "col_100";
$D_KYO_COL_NAME[2][102] = "col_101";
$D_KYO_COL_NAME[2][103] = "col_102";
$D_KYO_COL_NAME[2][104] = "col_103";
$D_KYO_COL_NAME[2][105] = "col_104";
$D_KYO_COL_NAME[2][106] = "col_105";
$D_KYO_COL_NAME[2][107] = "col_106";
$D_KYO_COL_NAME[2][108] = "col_107";
$D_KYO_COL_NAME[2][109] = "col_108";
$D_KYO_COL_NAME[2][110] = "col_109";
$D_KYO_COL_NAME[2][111] = "col_110";
$D_KYO_COL_NAME[2][112] = "col_111";
$D_KYO_COL_NAME[2][113] = "col_112";
$D_KYO_COL_NAME[2][114] = "col_113";
$D_KYO_COL_NAME[2][115] = "col_114";
$D_KYO_COL_NAME[2][116] = "col_115";
$D_KYO_COL_NAME[2][117] = "col_116";
$D_KYO_COL_NAME[2][118] = "col_117";
$D_KYO_COL_NAME[2][119] = "col_118";
$D_KYO_COL_NAME[2][120] = "col_119";
$D_KYO_COL_NAME[2][121] = "col_120";
$D_KYO_COL_NAME[2][122] = "col_121";
$D_KYO_COL_NAME[2][123] = "col_122";
$D_KYO_COL_NAME[2][124] = "col_123";
$D_KYO_COL_NAME[2][125] = "col_124";
$D_KYO_COL_NAME[2][126] = "col_125";
$D_KYO_COL_NAME[2][127] = "col_126";
$D_KYO_COL_NAME[2][128] = "col_127";
$D_KYO_COL_NAME[2][129] = "col_128";
$D_KYO_COL_NAME[2][130] = "col_129";
$D_KYO_COL_NAME[2][131] = "col_130";
$D_KYO_COL_NAME[2][132] = "col_131";
$D_KYO_COL_NAME[2][133] = "col_132";
$D_KYO_COL_NAME[2][134] = "col_133";
$D_KYO_COL_NAME[2][135] = "col_134";
$D_KYO_COL_NAME[2][136] = "col_135";
$D_KYO_COL_NAME[2][137] = "col_136";
$D_KYO_COL_NAME[2][138] = "col_137";
$D_KYO_COL_NAME[2][139] = "col_138";
$D_KYO_COL_NAME[2][140] = "col_139";
$D_KYO_COL_NAME[2][141] = "col_140";
$D_KYO_COL_NAME[2][142] = "col_141";
$D_KYO_COL_NAME[2][143] = "col_142";
$D_KYO_COL_NAME[2][144] = "col_143";
$D_KYO_COL_NAME[2][145] = "col_144";
$D_KYO_COL_NAME[2][146] = "col_145";
$D_KYO_COL_NAME[2][147] = "col_146";
$D_KYO_COL_NAME[2][148] = "col_147";
$D_KYO_COL_NAME[2][149] = "col_148";
$D_KYO_COL_NAME[2][150] = "col_149";
$D_KYO_COL_NAME[2][151] = "col_150";
$D_KYO_COL_NAME[2][152] = "col_151";
$D_KYO_COL_NAME[2][153] = "col_152";
$D_KYO_COL_NAME[2][154] = "col_153";
$D_KYO_COL_NAME[2][155] = "col_154";
$D_KYO_COL_NAME[2][156] = "col_155";
$D_KYO_COL_NAME[2][157] = "col_156";
$D_KYO_COL_NAME[2][158] = "col_157";
$D_KYO_COL_NAME[2][159] = "col_158";
$D_KYO_COL_NAME[2][160] = "col_159";
$D_KYO_COL_NAME[2][161] = "col_160";
$D_KYO_COL_NAME[2][162] = "col_161";
$D_KYO_COL_NAME[2][163] = "col_162";
$D_KYO_COL_NAME[2][164] = "col_163";
$D_KYO_COL_NAME[2][165] = "col_164";
$D_KYO_COL_NAME[2][166] = "col_165";
$D_KYO_COL_NAME[2][167] = "col_166";
$D_KYO_COL_NAME[2][168] = "col_167";
$D_KYO_COL_NAME[2][169] = "col_168";
$D_KYO_COL_NAME[2][170] = "col_169";
$D_KYO_COL_NAME[2][171] = "col_170";
$D_KYO_COL_NAME[2][172] = "col_171";
$D_KYO_COL_NAME[2][173] = "col_172";
$D_KYO_COL_NAME[2][174] = "col_173";
$D_KYO_COL_NAME[2][175] = "col_174";
$D_KYO_COL_NAME[2][176] = "col_175";
$D_KYO_COL_NAME[2][177] = "col_176";
$D_KYO_COL_NAME[2][178] = "col_177";
$D_KYO_COL_NAME[2][179] = "col_178";
$D_KYO_COL_NAME[2][180] = "col_179";
$D_KYO_COL_NAME[2][181] = "col_180";
$D_KYO_COL_NAME[2][182] = "col_181";
$D_KYO_COL_NAME[2][183] = "col_182";
$D_KYO_COL_NAME[2][184] = "col_183";
$D_KYO_COL_NAME[2][185] = "col_184";
$D_KYO_COL_NAME[2][186] = "col_185";
$D_KYO_COL_NAME[2][187] = "col_186";
$D_KYO_COL_NAME[2][188] = "col_187";
$D_KYO_COL_NAME[2][189] = "col_188";
$D_KYO_COL_NAME[2][190] = "col_189";
$D_KYO_COL_NAME[2][191] = "col_190";
$D_KYO_COL_NAME[2][192] = "col_191";
$D_KYO_COL_NAME[2][193] = "col_192";
$D_KYO_COL_NAME[2][194] = "col_193";
$D_KYO_COL_NAME[2][195] = "col_194";
$D_KYO_COL_NAME[2][196] = "col_195";
//µòÅÀ¾ÜºÙ(·ÈÂÓÍÑ¡Ë
$D_KYO_COL_NAME[4][0] = "name";
$D_KYO_COL_NAME[4][1] = "col_01";
$D_KYO_COL_NAME[4][2] = "col_02";
$D_KYO_COL_NAME[4][3] = "col_03";
$D_KYO_COL_NAME[4][4] = "col_04";
$D_KYO_COL_NAME[4][5] = "col_05";
$D_KYO_COL_NAME[4][6] = "col_06";
$D_KYO_COL_NAME[4][7] = "col_07";
$D_KYO_COL_NAME[4][8] = "col_08";
$D_KYO_COL_NAME[4][9] = "col_09";
$D_KYO_COL_NAME[4][10] = "col_10";
$D_KYO_COL_NAME[4][11] = "addr";
$D_KYO_COL_NAME[4][12] = "col_11";
$D_KYO_COL_NAME[4][13] = "col_12";
$D_KYO_COL_NAME[4][14] = "col_13";
$D_KYO_COL_NAME[4][15] = "col_14";
$D_KYO_COL_NAME[4][16] = "col_15";
$D_KYO_COL_NAME[4][17] = "col_16";
$D_KYO_COL_NAME[4][18] = "col_17";
$D_KYO_COL_NAME[4][19] = "col_18";
$D_KYO_COL_NAME[4][20] = "col_19";
$D_KYO_COL_NAME[4][21] = "col_20";
$D_KYO_COL_NAME[4][22] = "col_21";
$D_KYO_COL_NAME[4][23] = "col_22";
$D_KYO_COL_NAME[4][24] = "col_23";
$D_KYO_COL_NAME[4][25] = "col_24";
$D_KYO_COL_NAME[4][26] = "col_25";
$D_KYO_COL_NAME[4][27] = "col_26";
$D_KYO_COL_NAME[4][28] = "col_27";
$D_KYO_COL_NAME[4][29] = "col_28";
$D_KYO_COL_NAME[4][30] = "col_29";
$D_KYO_COL_NAME[4][31] = "col_30";
$D_KYO_COL_NAME[4][32] = "col_31";
$D_KYO_COL_NAME[4][33] = "col_32";
$D_KYO_COL_NAME[4][34] = "col_33";
$D_KYO_COL_NAME[4][35] = "col_34";
$D_KYO_COL_NAME[4][36] = "col_35";
$D_KYO_COL_NAME[4][37] = "col_36";
$D_KYO_COL_NAME[4][38] = "col_37";
$D_KYO_COL_NAME[4][39] = "col_38";
$D_KYO_COL_NAME[4][40] = "col_39";
$D_KYO_COL_NAME[4][41] = "col_40";
$D_KYO_COL_NAME[4][42] = "col_41";
$D_KYO_COL_NAME[4][43] = "col_42";
$D_KYO_COL_NAME[4][44] = "col_43";
$D_KYO_COL_NAME[4][45] = "col_44";
$D_KYO_COL_NAME[4][46] = "col_45";
$D_KYO_COL_NAME[4][47] = "col_46";
$D_KYO_COL_NAME[4][48] = "col_47";
$D_KYO_COL_NAME[4][49] = "col_48";
$D_KYO_COL_NAME[4][50] = "col_49";
$D_KYO_COL_NAME[4][51] = "col_50";
$D_KYO_COL_NAME[4][52] = "col_51";
$D_KYO_COL_NAME[4][53] = "col_52";
$D_KYO_COL_NAME[4][54] = "col_53";
$D_KYO_COL_NAME[4][55] = "col_54";
$D_KYO_COL_NAME[4][56] = "col_55";
$D_KYO_COL_NAME[4][57] = "col_56";
$D_KYO_COL_NAME[4][58] = "col_57";
$D_KYO_COL_NAME[4][59] = "col_58";
$D_KYO_COL_NAME[4][60] = "col_59";
$D_KYO_COL_NAME[4][61] = "col_60";
$D_KYO_COL_NAME[4][62] = "col_61";
$D_KYO_COL_NAME[4][63] = "col_62";
$D_KYO_COL_NAME[4][64] = "col_63";
$D_KYO_COL_NAME[4][65] = "col_64";
$D_KYO_COL_NAME[4][66] = "col_65";
$D_KYO_COL_NAME[4][67] = "col_66";
$D_KYO_COL_NAME[4][68] = "col_67";
$D_KYO_COL_NAME[4][69] = "col_68";
$D_KYO_COL_NAME[4][70] = "col_69";
$D_KYO_COL_NAME[4][71] = "col_70";
$D_KYO_COL_NAME[4][72] = "col_71";
$D_KYO_COL_NAME[4][73] = "col_72";
$D_KYO_COL_NAME[4][74] = "col_73";
$D_KYO_COL_NAME[4][75] = "col_74";
$D_KYO_COL_NAME[4][76] = "col_75";
$D_KYO_COL_NAME[4][77] = "col_76";
$D_KYO_COL_NAME[4][78] = "col_77";
$D_KYO_COL_NAME[4][79] = "col_78";
$D_KYO_COL_NAME[4][80] = "col_79";
$D_KYO_COL_NAME[4][81] = "col_80";
$D_KYO_COL_NAME[4][82] = "col_81";
$D_KYO_COL_NAME[4][83] = "col_82";
$D_KYO_COL_NAME[4][84] = "col_83";
$D_KYO_COL_NAME[4][85] = "col_84";
$D_KYO_COL_NAME[4][86] = "col_85";
$D_KYO_COL_NAME[4][87] = "col_86";
$D_KYO_COL_NAME[4][88] = "col_87";
$D_KYO_COL_NAME[4][89] = "col_88";
$D_KYO_COL_NAME[4][90] = "col_89";
$D_KYO_COL_NAME[4][91] = "col_90";
$D_KYO_COL_NAME[4][92] = "col_91";
$D_KYO_COL_NAME[4][93] = "col_92";
$D_KYO_COL_NAME[4][94] = "col_93";
$D_KYO_COL_NAME[4][95] = "col_94";
$D_KYO_COL_NAME[4][96] = "col_95";
$D_KYO_COL_NAME[4][97] = "col_96";
$D_KYO_COL_NAME[4][98] = "col_97";
$D_KYO_COL_NAME[4][99] = "col_98";
$D_KYO_COL_NAME[4][100] = "col_99";
$D_KYO_COL_NAME[4][101] = "col_100";
$D_KYO_COL_NAME[4][102] = "col_101";
$D_KYO_COL_NAME[4][103] = "col_102";
$D_KYO_COL_NAME[4][104] = "col_103";
$D_KYO_COL_NAME[4][105] = "col_104";
$D_KYO_COL_NAME[4][106] = "col_105";
$D_KYO_COL_NAME[4][107] = "col_106";
$D_KYO_COL_NAME[4][108] = "col_107";
$D_KYO_COL_NAME[4][109] = "col_108";
$D_KYO_COL_NAME[4][110] = "col_109";
$D_KYO_COL_NAME[4][111] = "col_110";
$D_KYO_COL_NAME[4][112] = "col_111";
$D_KYO_COL_NAME[4][113] = "col_112";
$D_KYO_COL_NAME[4][114] = "col_113";
$D_KYO_COL_NAME[4][115] = "col_114";
$D_KYO_COL_NAME[4][116] = "col_115";
$D_KYO_COL_NAME[4][117] = "col_116";
$D_KYO_COL_NAME[4][118] = "col_117";
$D_KYO_COL_NAME[4][119] = "col_118";
$D_KYO_COL_NAME[4][120] = "col_119";
$D_KYO_COL_NAME[4][121] = "col_120";
$D_KYO_COL_NAME[4][122] = "col_121";
$D_KYO_COL_NAME[4][123] = "col_122";
$D_KYO_COL_NAME[4][124] = "col_123";
$D_KYO_COL_NAME[4][125] = "col_124";
$D_KYO_COL_NAME[4][126] = "col_125";
$D_KYO_COL_NAME[4][127] = "col_126";
$D_KYO_COL_NAME[4][128] = "col_127";
$D_KYO_COL_NAME[4][129] = "col_128";
$D_KYO_COL_NAME[4][130] = "col_129";
$D_KYO_COL_NAME[4][131] = "col_130";
$D_KYO_COL_NAME[4][132] = "col_131";
$D_KYO_COL_NAME[4][133] = "col_132";
$D_KYO_COL_NAME[4][134] = "col_133";
$D_KYO_COL_NAME[4][135] = "col_134";
$D_KYO_COL_NAME[4][136] = "col_135";
$D_KYO_COL_NAME[4][137] = "col_136";
$D_KYO_COL_NAME[4][138] = "col_137";
$D_KYO_COL_NAME[4][139] = "col_138";
$D_KYO_COL_NAME[4][140] = "col_139";
$D_KYO_COL_NAME[4][141] = "col_140";
$D_KYO_COL_NAME[4][142] = "col_141";
$D_KYO_COL_NAME[4][143] = "col_142";
$D_KYO_COL_NAME[4][144] = "col_143";
$D_KYO_COL_NAME[4][145] = "col_144";
$D_KYO_COL_NAME[4][146] = "col_145";
$D_KYO_COL_NAME[4][147] = "col_146";
$D_KYO_COL_NAME[4][148] = "col_147";
$D_KYO_COL_NAME[4][149] = "col_148";
$D_KYO_COL_NAME[4][150] = "col_149";
$D_KYO_COL_NAME[4][151] = "col_150";
$D_KYO_COL_NAME[4][152] = "col_151";
$D_KYO_COL_NAME[4][153] = "col_152";
$D_KYO_COL_NAME[4][154] = "col_153";
$D_KYO_COL_NAME[4][155] = "col_154";
$D_KYO_COL_NAME[4][156] = "col_155";
$D_KYO_COL_NAME[4][157] = "col_156";
$D_KYO_COL_NAME[4][158] = "col_157";
$D_KYO_COL_NAME[4][159] = "col_158";
$D_KYO_COL_NAME[4][160] = "col_159";
$D_KYO_COL_NAME[4][161] = "col_160";
$D_KYO_COL_NAME[4][162] = "col_161";
$D_KYO_COL_NAME[4][163] = "col_162";
$D_KYO_COL_NAME[4][164] = "col_163";
$D_KYO_COL_NAME[4][165] = "col_164";
$D_KYO_COL_NAME[4][166] = "col_165";
$D_KYO_COL_NAME[4][167] = "col_166";
$D_KYO_COL_NAME[4][168] = "col_167";
$D_KYO_COL_NAME[4][169] = "col_168";
$D_KYO_COL_NAME[4][170] = "col_169";
$D_KYO_COL_NAME[4][171] = "col_170";
$D_KYO_COL_NAME[4][172] = "col_171";
$D_KYO_COL_NAME[4][173] = "col_172";
$D_KYO_COL_NAME[4][174] = "col_173";
$D_KYO_COL_NAME[4][175] = "col_174";
$D_KYO_COL_NAME[4][176] = "col_175";
$D_KYO_COL_NAME[4][177] = "col_176";
$D_KYO_COL_NAME[4][178] = "col_177";
$D_KYO_COL_NAME[4][179] = "col_178";
$D_KYO_COL_NAME[4][180] = "col_179";
$D_KYO_COL_NAME[4][181] = "col_180";
$D_KYO_COL_NAME[4][182] = "col_181";
$D_KYO_COL_NAME[4][183] = "col_182";
$D_KYO_COL_NAME[4][184] = "col_183";
$D_KYO_COL_NAME[4][185] = "col_184";
$D_KYO_COL_NAME[4][186] = "col_185";
$D_KYO_COL_NAME[4][187] = "col_186";
$D_KYO_COL_NAME[4][188] = "col_187";
$D_KYO_COL_NAME[4][189] = "col_188";
$D_KYO_COL_NAME[4][190] = "col_189";
$D_KYO_COL_NAME[4][191] = "col_190";
$D_KYO_COL_NAME[4][192] = "col_191";
$D_KYO_COL_NAME[4][193] = "col_192";
$D_KYO_COL_NAME[4][194] = "col_193";
$D_KYO_COL_NAME[4][195] = "col_194";
$D_KYO_COL_NAME[4][196] = "col_195";
//µòÅÀ¾ÜºÙ(¥¹¥Þ¡¼¥È¥Õ¥©¥óÍÑ¡Ë
$D_KYO_COL_NAME[5][0] = "name";
$D_KYO_COL_NAME[5][1] = "col_01";
$D_KYO_COL_NAME[5][2] = "col_02";
$D_KYO_COL_NAME[5][3] = "col_03";
$D_KYO_COL_NAME[5][4] = "col_04";
$D_KYO_COL_NAME[5][5] = "col_05";
$D_KYO_COL_NAME[5][6] = "col_06";
$D_KYO_COL_NAME[5][7] = "col_07";
$D_KYO_COL_NAME[5][8] = "col_08";
$D_KYO_COL_NAME[5][9] = "col_09";
$D_KYO_COL_NAME[5][10] = "col_10";
$D_KYO_COL_NAME[5][11] = "addr";
$D_KYO_COL_NAME[5][12] = "col_11";
$D_KYO_COL_NAME[5][13] = "col_12";
$D_KYO_COL_NAME[5][14] = "col_13";
$D_KYO_COL_NAME[5][15] = "col_14";
$D_KYO_COL_NAME[5][16] = "col_15";
$D_KYO_COL_NAME[5][17] = "col_16";
$D_KYO_COL_NAME[5][18] = "col_17";
$D_KYO_COL_NAME[5][19] = "col_18";
$D_KYO_COL_NAME[5][20] = "col_19";
$D_KYO_COL_NAME[5][21] = "col_20";
$D_KYO_COL_NAME[5][22] = "col_21";
$D_KYO_COL_NAME[5][23] = "col_22";
$D_KYO_COL_NAME[5][24] = "col_23";
$D_KYO_COL_NAME[5][25] = "col_24";
$D_KYO_COL_NAME[5][26] = "col_25";
$D_KYO_COL_NAME[5][27] = "col_26";
$D_KYO_COL_NAME[5][28] = "col_27";
$D_KYO_COL_NAME[5][29] = "col_28";
$D_KYO_COL_NAME[5][30] = "col_29";
$D_KYO_COL_NAME[5][31] = "col_30";
$D_KYO_COL_NAME[5][32] = "col_31";
$D_KYO_COL_NAME[5][33] = "col_32";
$D_KYO_COL_NAME[5][34] = "col_33";
$D_KYO_COL_NAME[5][35] = "col_34";
$D_KYO_COL_NAME[5][36] = "col_35";
$D_KYO_COL_NAME[5][37] = "col_36";
$D_KYO_COL_NAME[5][38] = "col_37";
$D_KYO_COL_NAME[5][39] = "col_38";
$D_KYO_COL_NAME[5][40] = "col_39";
$D_KYO_COL_NAME[5][41] = "col_40";
$D_KYO_COL_NAME[5][42] = "col_41";
$D_KYO_COL_NAME[5][43] = "col_42";
$D_KYO_COL_NAME[5][44] = "col_43";
$D_KYO_COL_NAME[5][45] = "col_44";
$D_KYO_COL_NAME[5][46] = "col_45";
$D_KYO_COL_NAME[5][47] = "col_46";
$D_KYO_COL_NAME[5][48] = "col_47";
$D_KYO_COL_NAME[5][49] = "col_48";
$D_KYO_COL_NAME[5][50] = "col_49";
$D_KYO_COL_NAME[5][51] = "col_50";
$D_KYO_COL_NAME[5][52] = "col_51";
$D_KYO_COL_NAME[5][53] = "col_52";
$D_KYO_COL_NAME[5][54] = "col_53";
$D_KYO_COL_NAME[5][55] = "col_54";
$D_KYO_COL_NAME[5][56] = "col_55";
$D_KYO_COL_NAME[5][57] = "col_56";
$D_KYO_COL_NAME[5][58] = "col_57";
$D_KYO_COL_NAME[5][59] = "col_58";
$D_KYO_COL_NAME[5][60] = "col_59";
$D_KYO_COL_NAME[5][61] = "col_60";
$D_KYO_COL_NAME[5][62] = "col_61";
$D_KYO_COL_NAME[5][63] = "col_62";
$D_KYO_COL_NAME[5][64] = "col_63";
$D_KYO_COL_NAME[5][65] = "col_64";
$D_KYO_COL_NAME[5][66] = "col_65";
$D_KYO_COL_NAME[5][67] = "col_66";
$D_KYO_COL_NAME[5][68] = "col_67";
$D_KYO_COL_NAME[5][69] = "col_68";
$D_KYO_COL_NAME[5][70] = "col_69";
$D_KYO_COL_NAME[5][71] = "col_70";
$D_KYO_COL_NAME[5][72] = "col_71";
$D_KYO_COL_NAME[5][73] = "col_72";
$D_KYO_COL_NAME[5][74] = "col_73";
$D_KYO_COL_NAME[5][75] = "col_74";
$D_KYO_COL_NAME[5][76] = "col_75";
$D_KYO_COL_NAME[5][77] = "col_76";
$D_KYO_COL_NAME[5][78] = "col_77";
$D_KYO_COL_NAME[5][79] = "col_78";
$D_KYO_COL_NAME[5][80] = "col_79";
$D_KYO_COL_NAME[5][81] = "col_80";
$D_KYO_COL_NAME[5][82] = "col_81";
$D_KYO_COL_NAME[5][83] = "col_82";
$D_KYO_COL_NAME[5][84] = "col_83";
$D_KYO_COL_NAME[5][85] = "col_84";
$D_KYO_COL_NAME[5][86] = "col_85";
$D_KYO_COL_NAME[5][87] = "col_86";
$D_KYO_COL_NAME[5][88] = "col_87";
$D_KYO_COL_NAME[5][89] = "col_88";
$D_KYO_COL_NAME[5][90] = "col_89";
$D_KYO_COL_NAME[5][91] = "col_90";
$D_KYO_COL_NAME[5][92] = "col_91";
$D_KYO_COL_NAME[5][93] = "col_92";
$D_KYO_COL_NAME[5][94] = "col_93";
$D_KYO_COL_NAME[5][95] = "col_94";
$D_KYO_COL_NAME[5][96] = "col_95";
$D_KYO_COL_NAME[5][97] = "col_96";
$D_KYO_COL_NAME[5][98] = "col_97";
$D_KYO_COL_NAME[5][99] = "col_98";
$D_KYO_COL_NAME[5][100] = "col_99";
$D_KYO_COL_NAME[5][101] = "col_100";
$D_KYO_COL_NAME[5][102] = "col_101";
$D_KYO_COL_NAME[5][103] = "col_102";
$D_KYO_COL_NAME[5][104] = "col_103";
$D_KYO_COL_NAME[5][105] = "col_104";
$D_KYO_COL_NAME[5][106] = "col_105";
$D_KYO_COL_NAME[5][107] = "col_106";
$D_KYO_COL_NAME[5][108] = "col_107";
$D_KYO_COL_NAME[5][109] = "col_108";
$D_KYO_COL_NAME[5][110] = "col_109";
$D_KYO_COL_NAME[5][111] = "col_110";
$D_KYO_COL_NAME[5][112] = "col_111";
$D_KYO_COL_NAME[5][113] = "col_112";
$D_KYO_COL_NAME[5][114] = "col_113";
$D_KYO_COL_NAME[5][115] = "col_114";
$D_KYO_COL_NAME[5][116] = "col_115";
$D_KYO_COL_NAME[5][117] = "col_116";
$D_KYO_COL_NAME[5][118] = "col_117";
$D_KYO_COL_NAME[5][119] = "col_118";
$D_KYO_COL_NAME[5][120] = "col_119";
$D_KYO_COL_NAME[5][121] = "col_120";
$D_KYO_COL_NAME[5][122] = "col_121";
$D_KYO_COL_NAME[5][123] = "col_122";
$D_KYO_COL_NAME[5][124] = "col_123";
$D_KYO_COL_NAME[5][125] = "col_124";
$D_KYO_COL_NAME[5][126] = "col_125";
$D_KYO_COL_NAME[5][127] = "col_126";
$D_KYO_COL_NAME[5][128] = "col_127";
$D_KYO_COL_NAME[5][129] = "col_128";
$D_KYO_COL_NAME[5][130] = "col_129";
$D_KYO_COL_NAME[5][131] = "col_130";
$D_KYO_COL_NAME[5][132] = "col_131";
$D_KYO_COL_NAME[5][133] = "col_132";
$D_KYO_COL_NAME[5][134] = "col_133";
$D_KYO_COL_NAME[5][135] = "col_134";
$D_KYO_COL_NAME[5][136] = "col_135";
$D_KYO_COL_NAME[5][137] = "col_136";
$D_KYO_COL_NAME[5][138] = "col_137";
$D_KYO_COL_NAME[5][139] = "col_138";
$D_KYO_COL_NAME[5][140] = "col_139";
$D_KYO_COL_NAME[5][141] = "col_140";
$D_KYO_COL_NAME[5][142] = "col_141";
$D_KYO_COL_NAME[5][143] = "col_142";
$D_KYO_COL_NAME[5][144] = "col_143";
$D_KYO_COL_NAME[5][145] = "col_144";
$D_KYO_COL_NAME[5][146] = "col_145";
$D_KYO_COL_NAME[5][147] = "col_146";
$D_KYO_COL_NAME[5][148] = "col_147";
$D_KYO_COL_NAME[5][149] = "col_148";
$D_KYO_COL_NAME[5][150] = "col_149";
$D_KYO_COL_NAME[5][151] = "col_150";
$D_KYO_COL_NAME[5][152] = "col_151";
$D_KYO_COL_NAME[5][153] = "col_152";
$D_KYO_COL_NAME[5][154] = "col_153";
$D_KYO_COL_NAME[5][155] = "col_154";
$D_KYO_COL_NAME[5][156] = "col_155";
$D_KYO_COL_NAME[5][157] = "col_156";
$D_KYO_COL_NAME[5][158] = "col_157";
$D_KYO_COL_NAME[5][159] = "col_158";
$D_KYO_COL_NAME[5][160] = "col_159";
$D_KYO_COL_NAME[5][161] = "col_160";
$D_KYO_COL_NAME[5][162] = "col_161";
$D_KYO_COL_NAME[5][163] = "col_162";
$D_KYO_COL_NAME[5][164] = "col_163";
$D_KYO_COL_NAME[5][165] = "col_164";
$D_KYO_COL_NAME[5][166] = "col_165";
$D_KYO_COL_NAME[5][167] = "col_166";
$D_KYO_COL_NAME[5][168] = "col_167";
$D_KYO_COL_NAME[5][169] = "col_168";
$D_KYO_COL_NAME[5][170] = "col_169";
$D_KYO_COL_NAME[5][171] = "col_170";
$D_KYO_COL_NAME[5][172] = "col_171";
$D_KYO_COL_NAME[5][173] = "col_172";
$D_KYO_COL_NAME[5][174] = "col_173";
$D_KYO_COL_NAME[5][175] = "col_174";
$D_KYO_COL_NAME[5][176] = "col_175";
$D_KYO_COL_NAME[5][177] = "col_176";
$D_KYO_COL_NAME[5][178] = "col_177";
$D_KYO_COL_NAME[5][179] = "col_178";
$D_KYO_COL_NAME[5][180] = "col_179";
$D_KYO_COL_NAME[5][181] = "col_180";
$D_KYO_COL_NAME[5][182] = "col_181";
$D_KYO_COL_NAME[5][183] = "col_182";
$D_KYO_COL_NAME[5][184] = "col_183";
$D_KYO_COL_NAME[5][185] = "col_184";
$D_KYO_COL_NAME[5][186] = "col_185";
$D_KYO_COL_NAME[5][187] = "col_186";
$D_KYO_COL_NAME[5][188] = "col_187";
$D_KYO_COL_NAME[5][189] = "col_188";
$D_KYO_COL_NAME[5][190] = "col_189";
$D_KYO_COL_NAME[5][191] = "col_190";
$D_KYO_COL_NAME[5][192] = "col_191";
$D_KYO_COL_NAME[5][193] = "col_192";
$D_KYO_COL_NAME[5][194] = "col_193";
$D_KYO_COL_NAME[5][195] = "col_194";
$D_KYO_COL_NAME[5][196] = "col_195";

//--------------------------------------------
//¶èÊ¬¹àÌÜÌ¾¾Î
//--------------------------------------------
//¶èÊ¬¹àÌÜÌ¾¾Î¥ê¥¹¥È
$D_KBN_ITEM_NAME["COL_01"]["1"] = "Í¹ÊØ";
$D_KBN_ITEM_NAME["COL_01"]["2"] = "¤æ¤¦¤Á¤ç";
$D_KBN_ITEM_NAME["COL_01"]["3"] = "¤«¤ó¤Ý";
$D_KBN_ITEM_NAME["COL_01"]["4"] = "Í¹ÊØ¡õ¤æ¤¦¤Á¤ç";
$D_KBN_ITEM_NAME["COL_01"]["5"] = "¤æ¤¦¤Á¤ç¾®·¿ATM";
$D_KBN_ITEM_NAME["COL_09"]["f"] = "Ìµ";
$D_KBN_ITEM_NAME["COL_09"]["t"] = "Í­";
$D_KBN_ITEM_NAME["COL_11"]["01"] = "ËÌ³¤Æ»";
$D_KBN_ITEM_NAME["COL_11"]["02"] = "ÀÄ¿¹¸©";
$D_KBN_ITEM_NAME["COL_11"]["03"] = "´ä¼ê¸©";
$D_KBN_ITEM_NAME["COL_11"]["04"] = "µÜ¾ë¸©";
$D_KBN_ITEM_NAME["COL_11"]["05"] = "½©ÅÄ¸©";
$D_KBN_ITEM_NAME["COL_11"]["06"] = "»³·Á¸©";
$D_KBN_ITEM_NAME["COL_11"]["07"] = "Ê¡Åç¸©";
$D_KBN_ITEM_NAME["COL_11"]["08"] = "°ñ¾ë¸©";
$D_KBN_ITEM_NAME["COL_11"]["09"] = "ÆÊÌÚ¸©";
$D_KBN_ITEM_NAME["COL_11"]["10"] = "·²ÇÏ¸©";
$D_KBN_ITEM_NAME["COL_11"]["11"] = "ºë¶Ì¸©";
$D_KBN_ITEM_NAME["COL_11"]["12"] = "ÀéÍÕ¸©";
$D_KBN_ITEM_NAME["COL_11"]["13"] = "ÅìµþÅÔ";
$D_KBN_ITEM_NAME["COL_11"]["14"] = "¿ÀÆàÀî¸©";
$D_KBN_ITEM_NAME["COL_11"]["15"] = "¿·³ã¸©";
$D_KBN_ITEM_NAME["COL_11"]["16"] = "ÉÙ»³¸©";
$D_KBN_ITEM_NAME["COL_11"]["17"] = "ÀÐÀî¸©";
$D_KBN_ITEM_NAME["COL_11"]["18"] = "Ê¡°æ¸©";
$D_KBN_ITEM_NAME["COL_11"]["19"] = "»³Íü¸©";
$D_KBN_ITEM_NAME["COL_11"]["20"] = "Ä¹Ìî¸©";
$D_KBN_ITEM_NAME["COL_11"]["21"] = "´ôÉì¸©";
$D_KBN_ITEM_NAME["COL_11"]["22"] = "ÀÅ²¬¸©";
$D_KBN_ITEM_NAME["COL_11"]["23"] = "°¦ÃÎ¸©";
$D_KBN_ITEM_NAME["COL_11"]["24"] = "»°½Å¸©";
$D_KBN_ITEM_NAME["COL_11"]["25"] = "¼¢²ì¸©";
$D_KBN_ITEM_NAME["COL_11"]["26"] = "µþÅÔÉÜ";
$D_KBN_ITEM_NAME["COL_11"]["27"] = "ÂçºåÉÜ";
$D_KBN_ITEM_NAME["COL_11"]["28"] = "Ê¼¸Ë¸©";
$D_KBN_ITEM_NAME["COL_11"]["29"] = "ÆàÎÉ¸©";
$D_KBN_ITEM_NAME["COL_11"]["30"] = "ÏÂ²Î»³¸©";
$D_KBN_ITEM_NAME["COL_11"]["31"] = "Ä»¼è¸©";
$D_KBN_ITEM_NAME["COL_11"]["32"] = "Åçº¬¸©";
$D_KBN_ITEM_NAME["COL_11"]["33"] = "²¬»³¸©";
$D_KBN_ITEM_NAME["COL_11"]["34"] = "¹­Åç¸©";
$D_KBN_ITEM_NAME["COL_11"]["35"] = "»³¸ý¸©";
$D_KBN_ITEM_NAME["COL_11"]["36"] = "ÆÁÅç¸©";
$D_KBN_ITEM_NAME["COL_11"]["37"] = "¹áÀî¸©";
$D_KBN_ITEM_NAME["COL_11"]["38"] = "°¦É²¸©";
$D_KBN_ITEM_NAME["COL_11"]["39"] = "¹âÃÎ¸©";
$D_KBN_ITEM_NAME["COL_11"]["40"] = "Ê¡²¬¸©";
$D_KBN_ITEM_NAME["COL_11"]["41"] = "º´²ì¸©";
$D_KBN_ITEM_NAME["COL_11"]["42"] = "Ä¹ºê¸©";
$D_KBN_ITEM_NAME["COL_11"]["43"] = "·§ËÜ¸©";
$D_KBN_ITEM_NAME["COL_11"]["44"] = "ÂçÊ¬¸©";
$D_KBN_ITEM_NAME["COL_11"]["45"] = "µÜºê¸©";
$D_KBN_ITEM_NAME["COL_11"]["46"] = "¼¯»ùÅç¸©";
$D_KBN_ITEM_NAME["COL_11"]["47"] = "²­Æì¸©";
$D_KBN_ITEM_NAME["COL_16"]["0"] = "°ì»þÊÄº¿¤Ê¤É";
$D_KBN_ITEM_NAME["COL_16"]["1"] = "Í¹ÊØ¶É¡Ê¤æ¤¦¤æ¤¦¡¢¶ä¹ÔÊ»Àß¡Ë";
$D_KBN_ITEM_NAME["COL_16"]["2"] = "Í¹ÊØ¶É¡Ê¤æ¤¦¤Á¤çÊ»Àß¡Ë";
$D_KBN_ITEM_NAME["COL_16"]["3"] = "¤æ¤¦¤Á¤çÃ±ÆÈ";
$D_KBN_ITEM_NAME["COL_16"]["4"] = "Í¹ÊØ¶É¡Ê¤æ¤¦¤æ¤¦Ê»Àß¡Ë";
$D_KBN_ITEM_NAME["COL_16"]["5"] = "Í¹ÊØÈÖ¹æËöÈø¤¬¡Ö99¡×";
$D_KBN_ITEM_NAME["COL_16"]["6"] = "¤æ¤¦¤æ¤¦Ã±ÆÈ";
$D_KBN_ITEM_NAME["COL_16"]["7"] = "Í¹ÊØ¶ÉÃ±ÆÈ";
$D_KBN_ITEM_NAME["COL_16"]["8"] = "ATM½ÐÄ¥½ê";
$D_KBN_ITEM_NAME["COL_16"]["9"] = "¤½¤ÎÂ¾";
$D_KBN_ITEM_NAME["COL_17"]["f"] = "ÈóÉ½¼¨";
$D_KBN_ITEM_NAME["COL_17"]["t"] = "É½¼¨";
$D_KBN_ITEM_NAME["COL_18"]["1"] = "ËÌ³¤Æ»";
$D_KBN_ITEM_NAME["COL_18"]["10"] = "Ãæ¹ñ";
$D_KBN_ITEM_NAME["COL_18"]["11"] = "»Í¹ñ";
$D_KBN_ITEM_NAME["COL_18"]["12"] = "¶å½£";
$D_KBN_ITEM_NAME["COL_18"]["13"] = "²­Æì";
$D_KBN_ITEM_NAME["COL_18"]["2"] = "ÅìËÌ";
$D_KBN_ITEM_NAME["COL_18"]["3"] = "´ØÅì";
$D_KBN_ITEM_NAME["COL_18"]["4"] = "Åìµþ";
$D_KBN_ITEM_NAME["COL_18"]["5"] = "Æî´ØÅì";
$D_KBN_ITEM_NAME["COL_18"]["6"] = "¿®±Û";
$D_KBN_ITEM_NAME["COL_18"]["7"] = "ËÌÎ¦";
$D_KBN_ITEM_NAME["COL_18"]["8"] = "Åì³¤";
$D_KBN_ITEM_NAME["COL_18"]["9"] = "¶áµ¦";
$D_KBN_ITEM_NAME["COL_22"]["00"] = "¤½¤ÎÂ¾";
$D_KBN_ITEM_NAME["COL_22"]["01"] = "Í¹ÊØ¶É";
$D_KBN_ITEM_NAME["COL_22"]["02"] = "Áë¸ýÊ¬¼¼";
$D_KBN_ITEM_NAME["COL_22"]["03"] = "´Ê°×Í¹ÊØ¶É";
$D_KBN_ITEM_NAME["COL_22"]["04"] = "½ÐÄ¥½ê";
$D_KBN_ITEM_NAME["COL_31"]["01"] = "¡ÊÉÔÌÀ¡Ë";
$D_KBN_ITEM_NAME["COL_31"]["21"] = "¡ÊÉÔÌÀ¡Ë";
$D_KBN_ITEM_NAME["COL_40"]["01"] = "Ä¾±ÄÅ¹";
$D_KBN_ITEM_NAME["COL_40"]["02"] = "ATM½ÐÄ¥½ê";
$D_KBN_ITEM_NAME["COL_46"]["01"] = "¡ÊÉÔÌÀ¡Ë";
$D_KBN_ITEM_NAME["COL_106"]["0"] = "¼è°·Ìµ";
$D_KBN_ITEM_NAME["COL_106"]["1"] = "¼è°·Ãæ";
$D_KBN_ITEM_NAME["COL_106"]["2"] = "¼è°·Ää»ß";
$D_KBN_ITEM_NAME["COL_108"]["0"] = "¼è°·Ìµ";
$D_KBN_ITEM_NAME["COL_108"]["1"] = "¼è°·Ãæ";
$D_KBN_ITEM_NAME["COL_108"]["2"] = "¼è°·Ää»ß";
$D_KBN_ITEM_NAME["COL_110"]["0"] = "¼è°·Ìµ";
$D_KBN_ITEM_NAME["COL_110"]["1"] = "¼è°·Ãæ";
$D_KBN_ITEM_NAME["COL_110"]["2"] = "¼è°·Ää»ß";
$D_KBN_ITEM_NAME["COL_112"]["0"] = "¼è°·Ìµ";
$D_KBN_ITEM_NAME["COL_112"]["1"] = "¼è°·Ãæ";
$D_KBN_ITEM_NAME["COL_112"]["2"] = "¼è°·Ää»ß";
$D_KBN_ITEM_NAME["COL_184"]["11"] = "Å¹ÊÞ";
$D_KBN_ITEM_NAME["COL_184"]["12"] = "ATM½ÐÄ¥½ê";

//--------------------------------------------
// ¹Ê¤ê¹þ¤ß¾ò·ï¡Ê¥Á¥§¥Ã¥¯¥Ü¥Ã¥¯¥¹¡¢¥ê¥¹¥È¥Ü¥Ã¥¯¥¹¡Ë
//--------------------------------------------
$D_COND_GRP_ANDOR = 'AND';
$cond_g_cnt = -1;
$cond_g_cnt++;
$D_COND_ANDOR[$cond_g_cnt] = 'AND';
$D_COND[1] = array(
'type'=>'SL'
,'opts'=>array(
	 '1'=>array('', '')
	,'2'=>array('COL_17:f','ÈóÉ½¼¨')
	,'3'=>array('COL_17:t','É½¼¨')
	)
);
$D_COND_GRP[$cond_g_cnt][] = '1';
$D_COND[2] = array(
'type'=>'SL'
,'opts'=>array(
	 '1'=>array('', '')
	,'2'=>array('COL_106:0','¼è°·Ìµ')
	,'3'=>array('COL_106:1','¼è°·Ãæ')
	,'4'=>array('COL_106:2','¼è°·Ää»ß')
	)
);
$D_COND_GRP[$cond_g_cnt][] = '2';
$D_COND[3] = array(
'type'=>'SL'
,'opts'=>array(
	 '1'=>array('', '')
	,'2'=>array('COL_108:0','¼è°·Ìµ')
	,'3'=>array('COL_108:1','¼è°·Ãæ')
	,'4'=>array('COL_108:2','¼è°·Ää»ß')
	)
);
$D_COND_GRP[$cond_g_cnt][] = '3';
$D_COND[4] = array(
'type'=>'SL'
,'opts'=>array(
	 '1'=>array('', '')
	,'2'=>array('COL_110:0','¼è°·Ìµ')
	,'3'=>array('COL_110:1','¼è°·Ãæ')
	,'4'=>array('COL_110:2','¼è°·Ää»ß')
	)
);
$D_COND_GRP[$cond_g_cnt][] = '4';
$D_COND[5] = array(
'type'=>'SL'
,'opts'=>array(
	 '1'=>array('', '')
	,'2'=>array('COL_112:0','¼è°·Ìµ')
	,'3'=>array('COL_112:1','¼è°·Ãæ')
	,'4'=>array('COL_112:2','¼è°·Ää»ß')
	)
);
$D_COND_GRP[$cond_g_cnt][] = '5';

$cond_g_cnt++;
$D_COND_ANDOR[$cond_g_cnt] = 'AND';
$D_COND[6] = array('type'=>'CB', 'val'=>'COL_51:1');
$D_COND_GRP[$cond_g_cnt][] = '6';
$D_COND[7] = array('type'=>'CB', 'val'=>'COL_52:1');
$D_COND_GRP[$cond_g_cnt][] = '7';
$D_COND[8] = array('type'=>'CB', 'val'=>'COL_53:1');
$D_COND_GRP[$cond_g_cnt][] = '8';
$D_COND[9] = array('type'=>'CB', 'val'=>'COL_54:1');
$D_COND_GRP[$cond_g_cnt][] = '9';
$D_COND[10] = array('type'=>'CB', 'val'=>'COL_55:1');
$D_COND_GRP[$cond_g_cnt][] = '10';
$D_COND[11] = array('type'=>'CB', 'val'=>'COL_56:1');
$D_COND_GRP[$cond_g_cnt][] = '11';
$D_COND[12] = array('type'=>'CB', 'val'=>'COL_57:1');
$D_COND_GRP[$cond_g_cnt][] = '12';
$D_COND[13] = array('type'=>'CB', 'val'=>'COL_58:1');
$D_COND_GRP[$cond_g_cnt][] = '13';
$D_COND[14] = array('type'=>'CB', 'val'=>'COL_59:1');
$D_COND_GRP[$cond_g_cnt][] = '14';
$D_COND[15] = array('type'=>'CB', 'val'=>'COL_60:1');
$D_COND_GRP[$cond_g_cnt][] = '15';
$D_COND[16] = array('type'=>'CB', 'val'=>'COL_61:1');
$D_COND_GRP[$cond_g_cnt][] = '16';
$D_COND[17] = array('type'=>'CB', 'val'=>'COL_62:1');
$D_COND_GRP[$cond_g_cnt][] = '17';
$D_COND[18] = array('type'=>'CB', 'val'=>'COL_63:1');
$D_COND_GRP[$cond_g_cnt][] = '18';
$D_COND[19] = array('type'=>'CB', 'val'=>'COL_64:1');
$D_COND_GRP[$cond_g_cnt][] = '19';
$D_COND[20] = array('type'=>'CB', 'val'=>'COL_65:1');
$D_COND_GRP[$cond_g_cnt][] = '20';
$D_COND[21] = array('type'=>'CB', 'val'=>'COL_66:1');
$D_COND_GRP[$cond_g_cnt][] = '21';
$D_COND[22] = array('type'=>'CB', 'val'=>'COL_67:1');
$D_COND_GRP[$cond_g_cnt][] = '22';
$D_COND[23] = array('type'=>'CB', 'val'=>'COL_68:1');
$D_COND_GRP[$cond_g_cnt][] = '23';
$D_COND[24] = array('type'=>'CB', 'val'=>'COL_69:1');
$D_COND_GRP[$cond_g_cnt][] = '24';
$D_COND[25] = array('type'=>'CB', 'val'=>'COL_70:1');
$D_COND_GRP[$cond_g_cnt][] = '25';
$D_COND[26] = array('type'=>'CB', 'val'=>'COL_71:1');
$D_COND_GRP[$cond_g_cnt][] = '26';
$D_COND[27] = array('type'=>'CB', 'val'=>'COL_72:1');
$D_COND_GRP[$cond_g_cnt][] = '27';
$D_COND[28] = array('type'=>'CB', 'val'=>'COL_73:1');
$D_COND_GRP[$cond_g_cnt][] = '28';
$D_COND[29] = array('type'=>'CB', 'val'=>'COL_74:1');
$D_COND_GRP[$cond_g_cnt][] = '29';
$D_COND[30] = array('type'=>'CB', 'val'=>'COL_75:1');
$D_COND_GRP[$cond_g_cnt][] = '30';
$D_COND[31] = array('type'=>'CB', 'val'=>'COL_76:1');
$D_COND_GRP[$cond_g_cnt][] = '31';
$D_COND[32] = array('type'=>'CB', 'val'=>'COL_77:1');
$D_COND_GRP[$cond_g_cnt][] = '32';
$D_COND[33] = array('type'=>'CB', 'val'=>'COL_78:1');
$D_COND_GRP[$cond_g_cnt][] = '33';
$D_COND[34] = array('type'=>'CB', 'val'=>'COL_79:1');
$D_COND_GRP[$cond_g_cnt][] = '34';
$D_COND[35] = array('type'=>'CB', 'val'=>'COL_80:1');
$D_COND_GRP[$cond_g_cnt][] = '35';
$D_COND[36] = array('type'=>'CB', 'val'=>'COL_81:1');
$D_COND_GRP[$cond_g_cnt][] = '36';
$D_COND[37] = array('type'=>'CB', 'val'=>'COL_82:1');
$D_COND_GRP[$cond_g_cnt][] = '37';
$D_COND[38] = array('type'=>'CB', 'val'=>'COL_83:1');
$D_COND_GRP[$cond_g_cnt][] = '38';
$D_COND[39] = array('type'=>'CB', 'val'=>'COL_84:1');
$D_COND_GRP[$cond_g_cnt][] = '39';
$D_COND[40] = array('type'=>'CB', 'val'=>'COL_85:1');
$D_COND_GRP[$cond_g_cnt][] = '40';
$D_COND[41] = array('type'=>'CB', 'val'=>'COL_86:1');
$D_COND_GRP[$cond_g_cnt][] = '41';
$D_COND[42] = array('type'=>'CB', 'val'=>'COL_87:1');
$D_COND_GRP[$cond_g_cnt][] = '42';
$D_COND[43] = array('type'=>'CB', 'val'=>'COL_88:1');
$D_COND_GRP[$cond_g_cnt][] = '43';
$D_COND[44] = array('type'=>'CB', 'val'=>'COL_89:1');
$D_COND_GRP[$cond_g_cnt][] = '44';
$D_COND[45] = array('type'=>'CB', 'val'=>'COL_90:1');
$D_COND_GRP[$cond_g_cnt][] = '45';
$D_COND[46] = array('type'=>'CB', 'val'=>'COL_91:1');
$D_COND_GRP[$cond_g_cnt][] = '46';
$D_COND[47] = array('type'=>'CB', 'val'=>'COL_92:1');
$D_COND_GRP[$cond_g_cnt][] = '47';
$D_COND[48] = array('type'=>'CB', 'val'=>'COL_93:1');
$D_COND_GRP[$cond_g_cnt][] = '48';
$D_COND[49] = array('type'=>'CB', 'val'=>'COL_94:1');
$D_COND_GRP[$cond_g_cnt][] = '49';
$D_COND[50] = array('type'=>'CB', 'val'=>'COL_95:1');
$D_COND_GRP[$cond_g_cnt][] = '50';
$D_COND[51] = array('type'=>'CB', 'val'=>'COL_96:1');
$D_COND_GRP[$cond_g_cnt][] = '51';
$D_COND[52] = array('type'=>'CB', 'val'=>'COL_97:1');
$D_COND_GRP[$cond_g_cnt][] = '52';
$D_COND[53] = array('type'=>'CB', 'val'=>'COL_98:1');
$D_COND_GRP[$cond_g_cnt][] = '53';
$D_COND[54] = array('type'=>'CB', 'val'=>'COL_99:1');
$D_COND_GRP[$cond_g_cnt][] = '54';
$D_COND[55] = array('type'=>'CB', 'val'=>'COL_100:1');
$D_COND_GRP[$cond_g_cnt][] = '55';
$D_COND[56] = array('type'=>'CB', 'val'=>'COL_101:1');
$D_COND_GRP[$cond_g_cnt][] = '56';
$D_COND[57] = array('type'=>'CB', 'val'=>'COL_102:1');
$D_COND_GRP[$cond_g_cnt][] = '57';
$D_COND[58] = array('type'=>'CB', 'val'=>'COL_103:1');
$D_COND_GRP[$cond_g_cnt][] = '58';
$D_COND[59] = array('type'=>'CB', 'val'=>'COL_104:1');
$D_COND_GRP[$cond_g_cnt][] = '59';
$D_COND[60] = array('type'=>'CB', 'val'=>'COL_105:1');
$D_COND_GRP[$cond_g_cnt][] = '60';
$D_COND[61] = array('type'=>'CB', 'val'=>'COL_114:1');
$D_COND_GRP[$cond_g_cnt][] = '61';
$D_COND[62] = array('type'=>'CB', 'val'=>'COL_115:1');
$D_COND_GRP[$cond_g_cnt][] = '62';
$D_COND[63] = array('type'=>'CB', 'val'=>'COL_116:1');
$D_COND_GRP[$cond_g_cnt][] = '63';
$D_COND[64] = array('type'=>'CB', 'val'=>'COL_117:1');
$D_COND_GRP[$cond_g_cnt][] = '64';
$D_COND[65] = array('type'=>'CB', 'val'=>'COL_118:1');
$D_COND_GRP[$cond_g_cnt][] = '65';
$D_COND[66] = array('type'=>'CB', 'val'=>'COL_167:1');
$D_COND_GRP[$cond_g_cnt][] = '66';
$D_COND[67] = array('type'=>'CB', 'val'=>'COL_168:1');
$D_COND_GRP[$cond_g_cnt][] = '67';
$D_COND[68] = array('type'=>'CB', 'val'=>'COL_169:1');
$D_COND_GRP[$cond_g_cnt][] = '68';
$D_COND[69] = array('type'=>'CB', 'val'=>'COL_170:1');
$D_COND_GRP[$cond_g_cnt][] = '69';
$D_COND[70] = array('type'=>'CB', 'val'=>'COL_171:1');
$D_COND_GRP[$cond_g_cnt][] = '70';
$D_COND[71] = array('type'=>'CB', 'val'=>'COL_172:1');
$D_COND_GRP[$cond_g_cnt][] = '71';
$D_COND[72] = array('type'=>'CB', 'val'=>'COL_173:1');
$D_COND_GRP[$cond_g_cnt][] = '72';
$D_COND[73] = array('type'=>'CB', 'val'=>'COL_174:1');
$D_COND_GRP[$cond_g_cnt][] = '73';
$D_COND[74] = array('type'=>'CB', 'val'=>'COL_175:1');
$D_COND_GRP[$cond_g_cnt][] = '74';
$D_COND[75] = array('type'=>'CB', 'val'=>'COL_176:1');
$D_COND_GRP[$cond_g_cnt][] = '75';
$D_COND[76] = array('type'=>'CB', 'val'=>'COL_177:1');
$D_COND_GRP[$cond_g_cnt][] = '76';
$D_COND[77] = array('type'=>'CB', 'val'=>'COL_178:1');
$D_COND_GRP[$cond_g_cnt][] = '77';
$D_COND[78] = array('type'=>'CB', 'val'=>'COL_179:1');
$D_COND_GRP[$cond_g_cnt][] = '78';
$D_COND[79] = array('type'=>'CB', 'val'=>'COL_180:1');
$D_COND_GRP[$cond_g_cnt][] = '79';
$D_COND[80] = array('type'=>'CB', 'val'=>'COL_181:1');
$D_COND_GRP[$cond_g_cnt][] = '80';

//--------------------------------------------
//µòÅÀ¡ÊÊ£¿ô¡Ë²èÁüÄêµÁ¥ê¥¹¥È
//--------------------------------------------

//--------------------------------------------
//Å¹ÊÞ±ÜÍ÷ÍúÎò¤ÎCookieÊÝÂ¸
//--------------------------------------------
$D_COOKIE_SHOPDTL_MAX = 0; //µòÅÀ¾ÜºÙÊÝÂ¸·ï¿ô

?>
