<?PHP
if ($_SERVER['HTTP_HOST'] == 'www.e-map.ne.jp') {
	//www.e-map.ne.jpへのアクセスはmap.japanpost.jpにリダイレクト
	//	header( "HTTP/1.1 301 Moved Permanently" );
	//	$tmp_prtcl = empty($_SERVER["HTTPS"]) ? "http://" : "https://";
	//	header("Location: ".$tmp_prtcl."map.japanpost.jp".$_SERVER["REQUEST_URI"]);
	//www.e-map.ne.jpへのアクセス禁止
	header("HTTP/1.1 404 Not Found");
	exit;
}

//--------------------------------------------
// SSL接続（httpsアクセス）
//--------------------------------------------
// 「http」→「https」へリダイレクト
if (!isset($_SERVER['HTTP_X_FORWARDED_PROTO']) || $_SERVER['HTTP_X_FORWARDED_PROTO'] != 'https') {
	if (strpos($script_name, '.htm') && ($_SERVER['HTTP_HOST'] !== '127.0.0.1')) {
		$https_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
		header("Location: $https_url");
		exit;
	}
}

// cgi/inc/jkn.inc fw_normalize()を移植
function mapjapanpost_fw_normalize($str) {
	$str = mb_convert_kana( $str, "KVC");		// 半角カナ→全角カナ、ひらがな→全角カナ、濁音を１文字に
	$str = mb_convert_kana( $str, "rn"  );		// 全角英字→半角英字、全角数字→半角数字
	$str = strtoupper($str);					// 英小文字→英大文字
	$str = mb_ereg_replace( "　", "", $str );	// 全角スペース除去
	$str = mb_ereg_replace( " ",  "", $str );	// 半角スペース除去
	$str = mb_ereg_replace( "ヴ", "ヴ", $str );
	$str = mb_ereg_replace( "ァ", "ア", $str );
	$str = mb_ereg_replace( "ィ", "イ", $str );
	$str = mb_ereg_replace( "ゥ", "ウ", $str );
	$str = mb_ereg_replace( "ェ", "エ", $str );
	$str = mb_ereg_replace( "ォ", "オ", $str );
	$str = mb_ereg_replace( "ッ", "ツ", $str );
	$str = mb_ereg_replace( "ャ", "ヤ", $str );
	$str = mb_ereg_replace( "ュ", "ユ", $str );
	$str = mb_ereg_replace( "ョ", "ヨ", $str );
	$str = mb_ereg_replace( "ヮ", "ワ", $str );
	$str = mb_ereg_replace( "ヵ", "カ", $str );
	$str = mb_ereg_replace( "ヶ", "ケ", $str );
	$str = mb_ereg_replace( "ー", "−", $str );
	$str = mb_ereg_replace( "-",  "−", $str );
	$str = mb_ereg_replace( "ﾞ",  "゛", $str );
	$str = mb_ereg_replace( "／",  "/", $str );
	$str = mb_ereg_replace( "＊",  "*", $str );
	$str = mb_ereg_replace( "%",  "％", $str );
	$str = mb_ereg_replace( "&",  "＆", $str );
	$str = mb_ereg_replace( "\|",  "｜", $str );
	$str = mb_ereg_replace( "#",  "＃", $str );
	$str = mb_ereg_replace( "\+",  "＋", $str );
	$str = mb_ereg_replace( "[（）\(\)\[\]＠@'’・･〜]",  "", $str );
	return $str;
}

// 年末年始お知らせ自動クローズ
$date_time = date('YmdH');
//$date_time = date('YmdH', time()+(13 *24*60*60)-(8*60*60));
$D_FREE_VAR[":date_time"] = $date_time;
if ($date_time < '2018010409') {
	$D_FREE_VAR[":nenshi"] = 1;
}

// ajaxの場合httpプロトコルなので、画像パス用にhttpsも準備
if ($protocol == 'http') {
	$D_FREE_VAR[":D_DIR_COMPANY_HTTPS"] = str_replace("http://", "https://", $D_DIR_COMPANY);
} else {
	$D_FREE_VAR[":D_DIR_COMPANY_HTTPS"] = $D_DIR_COMPANY;
}

if ($D_EMAP_ENV == 'www') {
	//canonicalタグ指定
	switch($script_name) {
		case 'index.htm':
		case 'top.htm':
			$D_FREE_VAR[":canonical_url"] = $D_DIR_BASE_G;
			break;
		case 'shop_dtl.htm':
			$D_FREE_VAR[":canonical_url"] = $D_DIR_BASE_G."dtl/$kid/";
			break;
		case 'shop_print.htm':
			$D_FREE_VAR[":canonical_url"] = $D_DIR_BASE_G."prt/$kid/";
			break;
		default:
			break;
	}
}

// 最寄り検索（初期表示縮尺で検索）
$D_INIT_LVL_CSTM = 16;		// スケール100m
$D_INIT_LVL_CSTM_RE = 14;	// スケール500m（スケール100mで0件だった場合）
$D_MSG_NKYOTEN_NOLIST = "地図表示範囲内に店舗がありません。<br>地図を移動させたり、縮尺を変更いただくと、<br>付近の店舗を表示します。";

// charset出力
$D_RESPONSE_CHARSET = 1;

// 世界測地系で検索
$D_DATUM = 'WGS84';
//$D_CONVERT_DATUM_H = 1;
//$D_CONVERT_DATUM_H_ZOOM = 16;
//$D_CONVERT_DATUM_H_MINLAT = 111525003;
//$D_CONVERT_DATUM_H_MAXLAT = 148978827;
$D_KYOTEN_WGS_COL['LAT'] = 'COL_192';
$D_KYOTEN_WGS_COL['LON'] = 'COL_193';

if ($D_EMAP_ENV == 'www') {
	$D_GOOGLEMAPS_CID = 'gme-japanpostcoltd1';
	$D_GOOGLEMAPS_CHANNEL = $D_CID;
	$D_FREE_VAR[":en_url"] = "https://{$GLOBAL_DOMAIN}/p/en/search/";	// 英語
	$D_FREE_VAR[":tw_url"] = "https://{$GLOBAL_DOMAIN}/p/tw/search/";	// 中国語（繁体字）
	$D_FREE_VAR[":cn_url"] = "https://{$GLOBAL_DOMAIN}/p/cn/search/";	// 中国語（簡体字）
	$D_FREE_VAR[":ko_url"] = "https://{$GLOBAL_DOMAIN}/p/ko/search/";	// 韓国語
	$D_FREE_VAR[":th_url"] = "https://{$GLOBAL_DOMAIN}/p/th/search/";	// タイ語
	$D_FREE_VAR[":fr_url"] = "https://{$GLOBAL_DOMAIN}/p/fr/search/";	// フランス語
	$D_FREE_VAR[":it_url"] = "https://{$GLOBAL_DOMAIN}/p/it/search/";	// イタリア語
} else if ($D_EMAP_ENV == 'test') {
	$D_GOOGLEMAPS_CID = 'gme-zenrindatacomcoltd';
	if ($hostname == 'aws-storenavi-web0001' || $hostname == 'aws-storenavi-web2001') {
		$D_GOOGLEMAPS_CID = 'gme-japanpostcoltd1';
	}
	$D_GOOGLEMAPS_CHANNEL = $D_CID;
	$D_FREE_VAR[":en_url"] = "https://{$GLOBAL_DOMAIN}/p/en/".$D_CID."/";	// 英語
	$D_FREE_VAR[":tw_url"] = "https://{$GLOBAL_DOMAIN}/p/tw/".$D_CID."/";	// 中国語（繁体字）
	$D_FREE_VAR[":cn_url"] = "https://{$GLOBAL_DOMAIN}/p/cn/".$D_CID."/";	// 中国語（簡体字）
	$D_FREE_VAR[":ko_url"] = "https://{$GLOBAL_DOMAIN}/p/ko/".$D_CID."/";	// 韓国語
	$D_FREE_VAR[":th_url"] = "https://{$GLOBAL_DOMAIN}/p/th/".$D_CID."/";	// タイ語
	$D_FREE_VAR[":fr_url"] = "https://{$GLOBAL_DOMAIN}/p/fr/".$D_CID."/";	// フランス語
	$D_FREE_VAR[":it_url"] = "https://{$GLOBAL_DOMAIN}/p/it/".$D_CID."/";	// イタリア語
}

// 複合ルート検索
// WebAPI（複合ルート）
$D_CORE_IF_V3_KEY = "JSZ4e6e6493bc00|M3wAj";
// バス移動含む
$D_SEARCH_COMB_ROUTE_USE_BUS = 1;
// バスルートの取得API
$D_SEARCH_COMB_ROUTE_BUS_API = 'web';
// ルートマッチング（自動車）API(road_path_drive)の経路候補の優先度
$D_ROUTE_ROAD_PATH_DRIVE_PRIORITY = 'general';
// バス停上限
$D_SEARCH_COMB_ROUTE_BUSSTOP_LIMIT = 55;
// バス停ルートのタイムアウト防止の為に
$D_AJAX_TIMEOUT = 30000;

// ルート検索
//スタート地点アイコン
$D_ROUTE_START_IMAGE = $D_DIR_COMPANY."images/icon_start_large.png";
$D_ROUTE_START_OFFSET_X = 13;
$D_ROUTE_START_OFFSET_Y = 34;
//ゴール地点アイコン（無し）
$D_ROUTE_GOAL_IMAGE = $D_DIR_COMPANY."images/spacer.gif";
// ルート線
$D_ROUTE_WALK_COLOR = '#0060EC';
$D_ROUTE_WALK_OPACITY = '0.7';
$D_ROUTE_CAR_COLOR = '#0060EC';
$D_ROUTE_CAR_OPACITY = '0.7';
$D_ROUTE_TRAIN_COLOR = '#0060EC';
$D_ROUTE_TRAIN_OPACITY = '0.7';

// 企業画像管理ツールでアップした画像を使用
$D_USE_CP_IMG = 1;

// スマホサイトTOPのURL
$D_FREE_VAR[":sp_site_url"] = $D_SMT_URL_HTTPS;
// スマホのUAでアクセスした際、ページの一番上にバナー表示
if ($carrier->isSmartPhone()) {
	$D_FREE_VAR[":smt_banner_show"] = 1;
}

// 郵便番号検索
$D_JPPOST_SEARCH_ZIP = 1;
// 郵便番号にハイフン付与
$D_KYOTEN_ITEM_ZIP = 'col_10';

// パンくずのTOPの名称
$D_HISTORY_TOP_NAME = "郵便局・ATMをさがす";

// 「フリースクロール地図でさがす」の緯度経度
$D_FREE_VAR[":free_scroll_lat"] = 35.69065277;
$D_FREE_VAR[":free_scroll_lon"] = 139.706638889;

// 「店舗・ATM名からさがす」
if ($script_name == "search.htm" && $col == "FREE_SRCH") {
	if (str_replace(array(" ", "　"), "", $keyword) != "") $D_FREE_VAR[":search_errpr_tab"] = 1;
	$D_FREE_VAR[":postname"] = 1;
	// パンくず
	$D_HISTORY_NAME["ShopW"] = "店舗フリーワード";
	// エラーメッセージ
	switch ($cond1) {
	case 2:
		$D_MSG_SEARCH_NODATA["ShopW"] = "該当する店舗名がありませんでした。<br>入力内容を変えて再度検索してください。<br>";
		$D_MSG_SEARCH_NULL["ShopW"] = "店舗名を入力してください。";
		$D_MSG_SEARCH_MAXPAGE["ShopW"] = "該当する店舗名が多いため<br>入力内容を変えて再度検索してください。<br>";
		break;
	case 3:
		$D_MSG_SEARCH_NODATA["ShopW"] = "該当するATM名がありませんでした。<br>入力内容を変えて再度検索してください。<br>";
		$D_MSG_SEARCH_NULL["ShopW"] = "ATM名を入力してください。";
		$D_MSG_SEARCH_MAXPAGE["ShopW"] = "該当するATM名が多いため<br>入力内容を変えて再度検索してください。<br>";
		break;
	default:
		$D_MSG_SEARCH_NODATA["ShopW"] = "該当する店舗・ATM名がありませんでした。<br>入力内容を変えて再度検索してください。<br>";
		$D_MSG_SEARCH_NULL["ShopW"] = "店舗・ATM名を入力してください。";
		$D_MSG_SEARCH_MAXPAGE["ShopW"] = "該当する店舗・ATM名が多いため<br>入力内容を変えて再度検索してください。<br>";
		break;
	}
}
// 「住所からさがす」
if ($script_name == "search.htm" && $col == "FREE_SRCH_02") {
	if (str_replace(array(" ", "　"), "", $keyword) != "") $D_FREE_VAR[":search_errpr_tab"] = 1;
	$D_FREE_VAR[":postaddr"] = 1;
	// パンくず
	$D_HISTORY_NAME["ShopW"] = "住所フリーワード";
	// エラーメッセージ
	switch ($cond1) {
	case 2:
		$D_MSG_SEARCH_NODATA["ShopW"] = "該当する店舗住所がありませんでした。<br>入力内容を変えて再度検索してください。<br>";
		$D_MSG_SEARCH_NULL["ShopW"] = "店舗住所を入力してください。";
		$D_MSG_SEARCH_MAXPAGE["ShopW"] = "該当する店舗住所が多いため<br>入力内容を変えて再度検索してください。<br>";
		break;
	case 3:
		$D_MSG_SEARCH_NODATA["ShopW"] = "該当するATM住所がありませんでした。<br>入力内容を変えて再度検索してください。<br>";
		$D_MSG_SEARCH_NULL["ShopW"] = "ATM住所を入力してください。";
		$D_MSG_SEARCH_MAXPAGE["ShopW"] = "該当するATM住所が多いため<br>入力内容を変えて再度検索してください。<br>";
		break;
	default:
		$D_MSG_SEARCH_NODATA["ShopW"] = "該当する店舗・ATM住所がありませんでした。<br>入力内容を変えて再度検索してください。<br>";
		$D_MSG_SEARCH_NULL["ShopW"] = "店舗・ATM住所を入力してください。";
		$D_MSG_SEARCH_MAXPAGE["ShopW"] = "該当する店舗・ATM住所が多いため<br>入力内容を変えて再度検索してください。<br>";
		break;
	}
}
// 「住所リストから選択」
if ($script_name == "search.htm" && $type == "ShopA" && $area1 && $area2 && $cond1) {
	$D_FREE_VAR[":search_errpr_tab"] = 1;
	$D_FREE_VAR[":postarea"] = 1;
	// 店舗リスト初期表示時は店舗タブを選択
	if (!isset($page) || $page == "") $cond1 = $_VARS["cond1"] = 2;
	// エラーメッセージ
	switch ($cond1) {
	case 2:
		$D_MSG_SEARCH_NODATA["ShopA"] = "該当する店舗がありませんでした。<br>住所を変えて再度検索してください。";
		break;
	case 3:
		$D_MSG_SEARCH_NODATA["ShopA"] = "該当するATMがありませんでした。<br>住所を変えて再度検索してください。";
		break;
	default:
		$D_MSG_SEARCH_NODATA["ShopA"] = "該当する店舗・ATMがありませんでした。<br>住所を変えて再度検索してください。";
		break;
	}
}

// 店舗外設置ＡＴＭの取扱店番号
$JPNPOST_TENPO_GAI_ATM_NO_LIST = array(
	"90591","90592","90593","90594","90595","81591","81592","81595","82591","82595","83591","83595","84591","84595","85591","85595",
	"86591","86595","09591","09592","09593","09595","09618","03691","03692","03693","03695","03709","04591","04595",
	"04599","10591","10592","10593","10595","10609","06591","06595","07591","07595","08591","08595","01691","01692","01693",
	"01694","01695","01696","01697","01698","01701","01702","01723","01724","01725","01726","01727","01728",
	"11591","11595","12591","12595","31591","31595","32591","32595","33591","33595","20499","20591","20592","20593","20595","20596","20597","20598","22591","22595","23591","23595",
	"24591","24595","40591","40592","40593","40594","40601","40618","42591","42592","42593","42595","42599",
	"44591","44592","44595","44599","45391","45395","45399","46591","46595","47591","47595","51691","51692","51695","52591","52595",
	"53591","53595","54591","54595","55591","55595","61591","61595","62591","62595","63591","63595","64591","64595","71591","71595","72591","72595","73591",
	"74791","74792","74793","74795","76591","76595","77591","77595","78591","70591"
);
$D_FREE_VAR[":tenpo_gai_atm_no"] = $JPNPOST_TENPO_GAI_ATM_NO_LIST[0];

// 「取扱店番号からさがす」の検索結果
if ($script_name == "search.htm" && $col == "COL_03") {
	// パンくず
	$D_HISTORY_NAME["ShopW"] = "取扱店番号からさがす";
	// エラーメッセージ
	$D_MSG_SEARCH_NODATA["ShopW"] = "該当する取扱店番号がありませんでした。<br>入力内容を変えて再度検索してください。<br>";
	$D_MSG_SEARCH_NULL["ShopW"] = "取扱店番号を入力してください。";
	$D_MSG_SEARCH_MAXPAGE["ShopW"] = "該当する取扱店番号が多いため<br>入力内容を変えて再度検索してください。<br>";
	// 取扱店番号についてリンクをクリックした場合
	if ($atmlink == 1) {
		// パンくずからキーワードをカット
		$D_HISTORY_NAME_KEYWORD_CUT["ShopW"] = 1;
	}
	// 店舗外設置ＡＴＭの取扱店番号と一致した場合
	if (in_array(str_replace("　", "", $keyword), $JPNPOST_TENPO_GAI_ATM_NO_LIST, true)) {
		// エラー画面を差し替える
		$D_CUSTOM_SEARCH_ERROR_TPL = "tenpo_gai_atm.tpl";
	}
}

// エラーメッセージ
$D_MSG_SEARCH_NODATA["ZipW"] = "該当する郵便番号がありませんでした。";
$D_MSG_SEARCH_NODATA["ZipW"] .= "<br>入力番号を変えて再度検索してください。";
$D_MSG_SEARCH_NODATA["ZipW"] .= "<br>";
$D_MSG_SEARCH_NODATA["ZipW"] .= "<br>※大口の事業所・郵便局の個別郵便番号（例：○○○-8799等）による郵便番号検索はできませんので、「店舗・ATM名からさがす」「住所からさがす」等から再度検索してください。";

// 「名所等からさがす」
// Solr I/Fを使う
$D_SEARCH_POI_SOLR = 1;
// 施設ジャンル[金融機関]を非表示とする
$D_SEARCH_POI_JNRMN_NG = '00170';

if ($script_name == "search.htm") {
	if ($type == "ShopW" && isset($keyword) && $keyword != '') {
		// 「表」文字化け対応で末尾に付加された全角スペースを除去
		$tmp_sort_keyword = $keyword;
		$kwlen = mb_strlen($tmp_sort_keyword);
		for ($i = 0; $i < $kwlen; $i++) {
			if (mb_substr($tmp_sort_keyword, mb_strlen($tmp_sort_keyword)-1, 1) != '　') break;
			$tmp_sort_keyword = mb_substr($tmp_sort_keyword, 0, mb_strlen($tmp_sort_keyword)-1);
		}
		$tmp_sort_keyword = mapjapanpost_fw_normalize($tmp_sort_keyword);
		//店舗FWソート順
		// 1.ゆうちょ併設店（併設店フラグ＝1010 or 1110）
		$D_SHOPW_KYOTEN_SORT  = "";
		$D_SHOPW_KYOTEN_SORT .= "CASE CONCAT_WS('', COL_05, COL_06, COL_07, COL_08) WHEN '1010' THEN 1 WHEN '1110' THEN 1 ELSE 2 END";
		if ($col == "FREE_SRCH") {
			// 「店舗・ATM名からさがす」
			// 2.店舗名完全一致（郵便局名、郵便局名(全角かな字)、郵便支店名、郵便支店名(全角かな字)、銀行直営店名、銀行直営店名(全角かな字)）
			$D_SHOPW_KYOTEN_SORT .= ",";
			$D_SHOPW_KYOTEN_SORT .= "CASE func_normalize(COL_20) WHEN '$tmp_sort_keyword' THEN 1 ELSE (";
			$D_SHOPW_KYOTEN_SORT .= " CASE func_normalize(COL_21) WHEN '$tmp_sort_keyword' THEN 1 ELSE (";
			$D_SHOPW_KYOTEN_SORT .= "  CASE func_normalize(COL_29) WHEN '$tmp_sort_keyword' THEN 2 ELSE (";
			$D_SHOPW_KYOTEN_SORT .= "   CASE func_normalize(COL_30) WHEN '$tmp_sort_keyword' THEN 2 ELSE (";
			$D_SHOPW_KYOTEN_SORT .= "    CASE func_normalize(COL_37) WHEN '$tmp_sort_keyword' THEN 3 ELSE (";
			$D_SHOPW_KYOTEN_SORT .= "     CASE func_normalize(COL_38) WHEN '$tmp_sort_keyword' THEN 3 ELSE";
			$D_SHOPW_KYOTEN_SORT .= "     9 END";
			$D_SHOPW_KYOTEN_SORT .= "    ) END";
			$D_SHOPW_KYOTEN_SORT .= "   ) END";
			$D_SHOPW_KYOTEN_SORT .= "  ) END";
			$D_SHOPW_KYOTEN_SORT .= " ) END";
			$D_SHOPW_KYOTEN_SORT .= ") END";
		} elseif ($col == "FREE_SRCH_02") {
			// 「住所からさがす」
			// 2.住所完全一致
			$D_SHOPW_KYOTEN_SORT .= ",";
			$D_SHOPW_KYOTEN_SORT .= "CASE func_normalize(ADDR) WHEN '$tmp_sort_keyword' THEN 1 ELSE 2 END";
		} elseif ($col == "COL_03") {
			// 「取扱店番号からさがす」
			// 2.完全一致は必要なし
		}
		// 3.郵便局名(全角かな字)、郵便支店名(全角かな字)、銀行直営店名(全角かな字)を連結した文字列
		$D_SHOPW_KYOTEN_SORT .= ",";
		$D_SHOPW_KYOTEN_SORT .= "CONCAT_WS('',COL_21, COL_30, COL_38)"; // Danh - 20171027 - update sql to PostgreSQL
	}

	if ($type == "ShopA") {
		//店舗エリアソート順
		// 1.ゆうちょ併設店（併設店フラグ＝1010 or 1110）
		$D_SHOPA_KYOTEN_SORT  = "";
		$D_SHOPA_KYOTEN_SORT .= "CASE CONCAT_WS('', COL_05, COL_06, COL_07, COL_08) WHEN '1010' THEN 1 WHEN '1110' THEN 1 ELSE 2 END";
		// 3.郵便局名(全角かな字)、郵便支店名(全角かな字)、銀行直営店名(全角かな字)を連結した文字列
		$D_SHOPA_KYOTEN_SORT .= ",";
		$D_SHOPA_KYOTEN_SORT .= "CONCAT_WS('',COL_21, COL_30, COL_38)"; // Danh - 20171027 - update sql to PostgreSQL
	}
}

// 詳細にcond適用
$D_USE_COND_DETAIL = 1;

// 詳細エラー時のリダイレクト先URL
$D_KID_NOTFOUND_REDIRECT_URL = "$protocol://" . $D_DOMAIN_G . "/pc/error_japanpost.htm";

// 詳細のタブ表示
if ($script_name == "shop_dtl.htm" && $jptab != "") {
	$D_FREE_VAR[":jptab_".$jptab] = 1;
}

// Google Maps API
$D_GOOGLEMAPS = 1;
// 拠点アイコンに任意アイコンを使用
$D_GOOGLEMAPS_ICON_CUSTOM = 1;
// 地図検索時のイベント変更
$D_GOOGLEMAPS_SEARCH_EVENT_IDLE = 1;
// マップタイプ切り替えコントローラの非表示
$D_GOOGLEMAPS_MAP_TYPE_CONTROL_INVISIBLE = 1;

// 主要なスポット(POI)のアイコンを消す
$D_GOOGLEMAPS_POI_INVISIBLE = 0;
// 主要なスポット(POI)の情報ウィンドウを無効化
$D_GOOGLEMAPS_POI_CLICK_INFOWINDOW_DISABLE = 1;
// お店表示
//$D_GOOGLEMAPS_POI_BUSINESS = 1;
//$D_GOOGLEMAPS_POI_EXCLUDE_BUSINESS = 1;
$D_GOOGLEMAPS_POI_BUSINESS_DETAILS[] = "poi.attraction";
$D_GOOGLEMAPS_POI_BUSINESS_DETAILS[] = "poi.government";
$D_GOOGLEMAPS_POI_BUSINESS_DETAILS[] = "poi.medical";
$D_GOOGLEMAPS_POI_BUSINESS_DETAILS[] = "poi.park";
$D_GOOGLEMAPS_POI_BUSINESS_DETAILS[] = "poi.place_of_worship";
$D_GOOGLEMAPS_POI_BUSINESS_DETAILS[] = "poi.school";
$D_GOOGLEMAPS_POI_BUSINESS_DETAILS[] = "poi.sports_complex";

//マーカークラスター取りやめ
//// MarkerClusterer（要markerclustere.js）
//$D_GOOGLEMAPS_MARKER_CLUSTERER = 1;
//$D_GOOGLEMAPS_MARKER_CLUSTERER_CLICK_ZOOM_FALSE = 1;	// クリック時のズームを無効化
//$D_GOOGLEMAPS_MARKER_CLUSTERER_CLICK_OPEN_MSG = 1;		// クリック時に吹き出しを表示
//// クラスタリングする範囲
//$D_GOOGLEMAPS_MARKER_CLUSTERER_GLID_SIZE = 30;
//// アイコンのスタイル設定
//$D_GOOGLEMAPS_MARKER_CLUSTERER_STYLES = "{
//	 url: '".$D_DIR_COMPANY."images/m1.png'
//	,height: 53
//	,width: 52
//}";

//駐車場の台数チェック
$D_COL_VAL_CHK['col_14'][] = array('0', '0');
//駐車場備考が「※お知らせ」「※東日本」「※熊本」で始まる場合、
//最寄り一覧／拠点検索一覧にも駐車場備考を表示する。
$D_COL_VAL_CHK['col_15'][] = array('※お知らせ', 'INFO');
$D_COL_VAL_CHK['col_15'][] = array('※東日本'  , 'EASTJPN');
$D_COL_VAL_CHK['col_15'][] = array('※熊本'    , 'KUMAMOTO');

//※PCではカラム名は小文字にすること！！
//貯金ONチェック
$D_FLAGS_ANY_ON['chokin'] = array('col_57','col_58','col_59','col_62','col_63','col_64');
//為替ONチェック
$D_FLAGS_ANY_ON['kawase'] = array('col_68','col_69');
//振替ONチェック
$D_FLAGS_ANY_ON['furikae'] = array('col_72','col_73','col_74');
//簡易払いONチェック
$D_FLAGS_ANY_ON['kanih'] = array('col_80','col_81');
//生命保険ONチェック
$D_FLAGS_ANY_ON['seiho'] = array('col_96','col_97','col_98','col_99','col_100');
//生命保険メッセージチェック
$D_FLAGS_ANY_ON['seiho_msg'] = array('col_98','col_99');
//ゆうゆう時間チェック
$D_COLUMNS_ANY_VALUE['yuuyuu_time'] = array('col_151','col_153','col_155');
//貯金時間チェック
$D_COLUMNS_ANY_VALUE['chokin_time'] = array('col_127','col_128','col_129','col_130','col_131','col_132');
//くらしを支える郵便局サービスメッセージチェック
$D_COLUMNS_ANY_MATCH_VALUE['kurashi_service_msg'] = array(
	'col_105' => 1,
	'col_106' => 1,
	'col_108' => 1,
	'col_110' => 1,
	'col_112' => 1,
	'col_114' => 1
);
//郵便サービス（集荷・配送）電話番号チェック
$D_COLUMNS_ANY_VALUE['syuuka_tel'] = array('col_33','col_34');
//郵便サービス（集荷・配送を除く）電話番号チェック
$D_COLUMNS_ANY_VALUE['madoguchi_tel'] = array('col_23','col_25');
//郵便時間とゆうゆう時間の比較
$D_TIME_COMP_COLS = array(
	array('col_119', 'col_151'),
	array('col_119', 'col_152'),
	array('col_120', 'col_151'),
	array('col_120', 'col_152'),
	array('col_121', 'col_153'),
	array('col_121', 'col_154'),
	array('col_122', 'col_153'),
	array('col_122', 'col_154'),
	array('col_123', 'col_155'),
	array('col_123', 'col_156'),
	array('col_124', 'col_155'),
	array('col_124', 'col_156'),
);
//ゆうゆう時間表示チェック
//$D_FLAGS_ANY_ON['yuuyuu_only_time1'] = array('col_119_LTE_col_151_TIME','col_119_GTE_col_152_TIME','col_120_LTE_col_151_TIME','col_120_GTE_col_152_TIME');
//$D_FLAGS_ANY_ON['yuuyuu_only_time2'] = array('col_121_LTE_col_153_TIME','col_121_GTE_col_154_TIME','col_122_LTE_col_153_TIME','col_122_GTE_col_154_TIME');
//$D_FLAGS_ANY_ON['yuuyuu_only_time3'] = array('col_123_LTE_col_155_TIME','col_123_GTE_col_156_TIME','col_124_LTE_col_155_TIME','col_124_GTE_col_156_TIME');
$D_FLAGS_ALL_ON['yuuyuu_bunkatsu'] = array('col_05','col_06','col_169');

//時刻を整形
//郵便時刻
$D_KYOTEN_ITEM_TIME['col_119'] = 1;
$D_KYOTEN_ITEM_TIME['col_120'] = 1;
$D_KYOTEN_ITEM_TIME['col_121'] = 1;
$D_KYOTEN_ITEM_TIME['col_122'] = 1;
$D_KYOTEN_ITEM_TIME['col_123'] = 1;
$D_KYOTEN_ITEM_TIME['col_124'] = 1;
//ゆうゆう時刻
$D_KYOTEN_ITEM_TIME['col_151'] = 1;
$D_KYOTEN_ITEM_TIME['col_152'] = 1;
$D_KYOTEN_ITEM_TIME['col_153'] = 1;
$D_KYOTEN_ITEM_TIME['col_154'] = 1;
$D_KYOTEN_ITEM_TIME['col_155'] = 1;
$D_KYOTEN_ITEM_TIME['col_156'] = 1;
//貯金時刻
$D_KYOTEN_ITEM_TIME['col_127'] = 1;
$D_KYOTEN_ITEM_TIME['col_128'] = 1;
$D_KYOTEN_ITEM_TIME['col_129'] = 1;
$D_KYOTEN_ITEM_TIME['col_130'] = 1;
$D_KYOTEN_ITEM_TIME['col_131'] = 1;
$D_KYOTEN_ITEM_TIME['col_132'] = 1;
//ATM時刻
$D_KYOTEN_ITEM_TIME['col_135'] = 1;
$D_KYOTEN_ITEM_TIME['col_136'] = 1;
$D_KYOTEN_ITEM_TIME['col_137'] = 1;
$D_KYOTEN_ITEM_TIME['col_138'] = 1;
$D_KYOTEN_ITEM_TIME['col_139'] = 1;
$D_KYOTEN_ITEM_TIME['col_140'] = 1;
//保険時刻
$D_KYOTEN_ITEM_TIME['col_143'] = 1;
$D_KYOTEN_ITEM_TIME['col_144'] = 1;
$D_KYOTEN_ITEM_TIME['col_145'] = 1;
$D_KYOTEN_ITEM_TIME['col_146'] = 1;
$D_KYOTEN_ITEM_TIME['col_147'] = 1;
$D_KYOTEN_ITEM_TIME['col_148'] = 1;

//詳細画面（貯金・ＡＴＭタブの「貯金サービスについて」の電話番号固定表示）
//$D_COL_VAL_CHK['kid'][] = array('300100788000', '300100788000');	//向島郵便局
//詳細画面（貯金・ＡＴＭタブの営業時間欄に備考追加）
$D_COL_VAL_CHK['kid'][] = array('300101083000', '300101083000');	//ゆうちょ銀行　京橋店
$D_COL_VAL_CHK['kid'][] = array('300101056000', '300101056000');	//ゆうちょ銀行　立川店
$D_COL_VAL_CHK['kid'][] = array('300102001000', '300102001000');	//ゆうちょ銀行　横浜港店
$D_COL_VAL_CHK['kid'][] = array('300109067000', '300109067000');	//ゆうちょ銀行　都筑店
$D_COL_VAL_CHK['kid'][] = array('300141019000', '300141019000');	//ゆうちょ銀行　大阪東店
$D_COL_VAL_CHK['kid'][] = array('300140194000', '300140194000');	//ゆうちょ銀行　高槻店

if(isset($area1)) $tpl['CUST_AREA1'] = $area1;
if(isset($area2)) $tpl['CUST_AREA2'] = $area2;

//--------------------------------------------
// 複数絞り込み条件（チェックボックス、リストボックス）
//--------------------------------------------
$D_COND = array();
$D_COND_GRP = array();
$D_COND_ANDOR = array();

$D_COND[1] = array(
'type'=>'SL'
,'opts'=>array(
	 '1'=>array('', 'すべて')
	,'2'=>array('COL_40!:02 OR COL_40:@@NULL@@','店舗')
	,'3'=>array('COL_09:t','ATM')
	)
);
$D_COND[2] = array('type'=>'CB', 'val'=>'COL_51:1');
$D_COND[3] = array('type'=>'CB', 'val'=>'COL_52:1');
$D_COND[4] = array('type'=>'CB', 'val'=>'COL_53:1');
$D_COND[5] = array('type'=>'CB', 'val'=>'COL_54:1');
$D_COND[6] = array('type'=>'CB', 'val'=>'COL_55:1');
$D_COND[7] = array('type'=>'CB', 'val'=>'COL_27!:@@NULL@@');
$D_COND[8] = array('type'=>'CB', 'val'=>'(COL_57:1 OR COL_58:1 OR COL_59:1 OR COL_62:1 OR COL_63:1 OR COL_64:1)');
$D_COND[9] = array('type'=>'CB', 'val'=>'(COL_68:1 OR COL_69:1)');
$D_COND[10] = array('type'=>'CB', 'val'=>'(COL_72:1 OR COL_73:1 OR COL_74:1)');
$D_COND[11] = array('type'=>'CB', 'val'=>'COL_75:1');
$D_COND[12] = array('type'=>'CB', 'val'=>'COL_85:1');
$D_COND[13] = array('type'=>'CB', 'val'=>'COL_86:1');
$D_COND[14] = array('type'=>'CB', 'val'=>'COL_91:1');
$D_COND[15] = array('type'=>'CB', 'val'=>'COL_92:1');
$D_COND[16] = array('type'=>'CB', 'val'=>'COL_93:1');
$D_COND[17] = array('type'=>'CB', 'val'=>'COL_95:1');
$D_COND[18] = array('type'=>'CB', 'val'=>'COL_168:1');
$D_COND[19] = array('type'=>'CB', 'val'=>'((COL_22:03 AND COL_96:1) OR (COL_22!:03 AND (COL_96:1 OR COL_97:1 OR COL_98:1 OR COL_99:1 OR COL_100:1)))');
$D_COND[20] = array('type'=>'CB', 'val'=>'COL_102:1');
$D_COND[21] = array('type'=>'CB', 'val'=>'COL_101:1');
$D_COND[22] = array('type'=>'CB', 'val'=>'COL_103:1');
$D_COND[23] = array('type'=>'CB', 'val'=>'COL_104:1');
$D_COND[24] = array('type'=>'CB', 'val'=>'COL_93:1');
$D_COND[25] = array('type'=>'CB', 'val'=>'COL_70:1');
$D_COND[26] = array('type'=>'CB', 'val'=>'COL_106:1');
$D_COND[27] = array('type'=>'CB', 'val'=>'COL_108:1');
$D_COND[28] = array('type'=>'CB', 'val'=>'COL_110:1');
$D_COND[29] = array('type'=>'CB', 'val'=>'COL_112:1');
$D_COND[30] = array('type'=>'CB', 'val'=>'COL_114:1');
$D_COND[31] = array('type'=>'CB', 'val'=>'COL_14!:0');
$D_COND[32] = array('type'=>'CB', 'val'=>'COL_171:1');
$D_COND[33] = array('type'=>'CB', 'val'=>'COL_170:1');
//「郵便サービスから選ぶ」のご利用時間
//    「郵便窓口」を選択した場合
$D_COND[101] = array(
'type'=>'SL'
,'opts'=>array(
	// 平日
	 '101'=>array('(COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:000000 AND COL_120:TIME2:GT:000000) OR (COL_119:TIME2:GTE:000000 AND COL_119:TIME2:LT:070000))','')
	,'102'=>array('(COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:070000 AND COL_120:TIME2:GT:070000) OR (COL_119:TIME2:GTE:070000 AND COL_119:TIME2:LT:080000))','')
	,'103'=>array('(COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:080000 AND COL_120:TIME2:GT:080000) OR (COL_119:TIME2:GTE:080000 AND COL_119:TIME2:LT:090000))','')
	,'104'=>array('(COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:090000 AND COL_120:TIME2:GT:090000) OR (COL_119:TIME2:GTE:090000 AND COL_119:TIME2:LT:100000))','')
	,'105'=>array('(COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:100000 AND COL_120:TIME2:GT:100000) OR (COL_119:TIME2:GTE:100000 AND COL_119:TIME2:LT:110000))','')
	,'106'=>array('(COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:110000 AND COL_120:TIME2:GT:110000) OR (COL_119:TIME2:GTE:110000 AND COL_119:TIME2:LT:120000))','')
	,'107'=>array('(COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:120000 AND COL_120:TIME2:GT:120000) OR (COL_119:TIME2:GTE:120000 AND COL_119:TIME2:LT:130000))','')
	,'108'=>array('(COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:130000 AND COL_120:TIME2:GT:130000) OR (COL_119:TIME2:GTE:130000 AND COL_119:TIME2:LT:140000))','')
	,'109'=>array('(COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:140000 AND COL_120:TIME2:GT:140000) OR (COL_119:TIME2:GTE:140000 AND COL_119:TIME2:LT:150000))','')
	,'110'=>array('(COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:150000 AND COL_120:TIME2:GT:150000) OR (COL_119:TIME2:GTE:150000 AND COL_119:TIME2:LT:160000))','')
	,'111'=>array('(COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:160000 AND COL_120:TIME2:GT:160000) OR (COL_119:TIME2:GTE:160000 AND COL_119:TIME2:LT:170000))','')
	,'112'=>array('(COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:170000 AND COL_120:TIME2:GT:170000) OR (COL_119:TIME2:GTE:170000 AND COL_119:TIME2:LT:180000))','')
	,'113'=>array('(COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:180000 AND COL_120:TIME2:GT:180000) OR (COL_119:TIME2:GTE:180000 AND COL_119:TIME2:LT:190000))','')
	,'114'=>array('(COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:190000 AND COL_120:TIME2:GT:190000) OR (COL_119:TIME2:GTE:190000 AND COL_119:TIME2:LT:200000))','')
	,'115'=>array('(COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:200000 AND COL_120:TIME2:GT:200000) OR (COL_119:TIME2:GTE:200000 AND COL_119:TIME2:LT:210000))','')
	,'116'=>array('(COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:210000 AND COL_120:TIME2:GT:210000) OR (COL_119:TIME2:GTE:210000 AND COL_119:TIME2:LT:220000))','')
	,'117'=>array('(COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:220000 AND COL_120:TIME2:GT:220000) OR (COL_119:TIME2:GTE:220000 AND COL_119:TIME2:LT:230000))','')
	,'118'=>array('(COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:230000 AND COL_120:TIME2:GT:230000) OR (COL_119:TIME2:GTE:230000 AND COL_119:TIME2:LT:240000))','')
	// 土曜
	,'201'=>array('(COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:000000 AND COL_122:TIME2:GT:000000) OR (COL_121:TIME2:GTE:000000 AND COL_121:TIME2:LT:070000))','')
	,'202'=>array('(COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:070000 AND COL_122:TIME2:GT:070000) OR (COL_121:TIME2:GTE:070000 AND COL_121:TIME2:LT:080000))','')
	,'203'=>array('(COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:080000 AND COL_122:TIME2:GT:080000) OR (COL_121:TIME2:GTE:080000 AND COL_121:TIME2:LT:090000))','')
	,'204'=>array('(COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:090000 AND COL_122:TIME2:GT:090000) OR (COL_121:TIME2:GTE:090000 AND COL_121:TIME2:LT:100000))','')
	,'205'=>array('(COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:100000 AND COL_122:TIME2:GT:100000) OR (COL_121:TIME2:GTE:100000 AND COL_121:TIME2:LT:110000))','')
	,'206'=>array('(COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:110000 AND COL_122:TIME2:GT:110000) OR (COL_121:TIME2:GTE:110000 AND COL_121:TIME2:LT:120000))','')
	,'207'=>array('(COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:120000 AND COL_122:TIME2:GT:120000) OR (COL_121:TIME2:GTE:120000 AND COL_121:TIME2:LT:130000))','')
	,'208'=>array('(COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:130000 AND COL_122:TIME2:GT:130000) OR (COL_121:TIME2:GTE:130000 AND COL_121:TIME2:LT:140000))','')
	,'209'=>array('(COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:140000 AND COL_122:TIME2:GT:140000) OR (COL_121:TIME2:GTE:140000 AND COL_121:TIME2:LT:150000))','')
	,'210'=>array('(COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:150000 AND COL_122:TIME2:GT:150000) OR (COL_121:TIME2:GTE:150000 AND COL_121:TIME2:LT:160000))','')
	,'211'=>array('(COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:160000 AND COL_122:TIME2:GT:160000) OR (COL_121:TIME2:GTE:160000 AND COL_121:TIME2:LT:170000))','')
	,'212'=>array('(COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:170000 AND COL_122:TIME2:GT:170000) OR (COL_121:TIME2:GTE:170000 AND COL_121:TIME2:LT:180000))','')
	,'213'=>array('(COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:180000 AND COL_122:TIME2:GT:180000) OR (COL_121:TIME2:GTE:180000 AND COL_121:TIME2:LT:190000))','')
	,'214'=>array('(COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:190000 AND COL_122:TIME2:GT:190000) OR (COL_121:TIME2:GTE:190000 AND COL_121:TIME2:LT:200000))','')
	,'215'=>array('(COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:200000 AND COL_122:TIME2:GT:200000) OR (COL_121:TIME2:GTE:200000 AND COL_121:TIME2:LT:210000))','')
	,'216'=>array('(COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:210000 AND COL_122:TIME2:GT:210000) OR (COL_121:TIME2:GTE:210000 AND COL_121:TIME2:LT:220000))','')
	,'217'=>array('(COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:220000 AND COL_122:TIME2:GT:220000) OR (COL_121:TIME2:GTE:220000 AND COL_121:TIME2:LT:230000))','')
	,'218'=>array('(COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:230000 AND COL_122:TIME2:GT:230000) OR (COL_121:TIME2:GTE:230000 AND COL_121:TIME2:LT:240000))','')
	// 日曜・休日
	,'301'=>array('(COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:000000 AND COL_124:TIME2:GT:000000) OR (COL_123:TIME2:GTE:000000 AND COL_123:TIME2:LT:070000))','')
	,'302'=>array('(COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:070000 AND COL_124:TIME2:GT:070000) OR (COL_123:TIME2:GTE:070000 AND COL_123:TIME2:LT:080000))','')
	,'303'=>array('(COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:080000 AND COL_124:TIME2:GT:080000) OR (COL_123:TIME2:GTE:080000 AND COL_123:TIME2:LT:090000))','')
	,'304'=>array('(COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:090000 AND COL_124:TIME2:GT:090000) OR (COL_123:TIME2:GTE:090000 AND COL_123:TIME2:LT:100000))','')
	,'305'=>array('(COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:100000 AND COL_124:TIME2:GT:100000) OR (COL_123:TIME2:GTE:100000 AND COL_123:TIME2:LT:110000))','')
	,'306'=>array('(COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:110000 AND COL_124:TIME2:GT:110000) OR (COL_123:TIME2:GTE:110000 AND COL_123:TIME2:LT:120000))','')
	,'307'=>array('(COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:120000 AND COL_124:TIME2:GT:120000) OR (COL_123:TIME2:GTE:120000 AND COL_123:TIME2:LT:130000))','')
	,'308'=>array('(COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:130000 AND COL_124:TIME2:GT:130000) OR (COL_123:TIME2:GTE:130000 AND COL_123:TIME2:LT:140000))','')
	,'309'=>array('(COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:140000 AND COL_124:TIME2:GT:140000) OR (COL_123:TIME2:GTE:140000 AND COL_123:TIME2:LT:150000))','')
	,'310'=>array('(COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:150000 AND COL_124:TIME2:GT:150000) OR (COL_123:TIME2:GTE:150000 AND COL_123:TIME2:LT:160000))','')
	,'311'=>array('(COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:160000 AND COL_124:TIME2:GT:160000) OR (COL_123:TIME2:GTE:160000 AND COL_123:TIME2:LT:170000))','')
	,'312'=>array('(COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:170000 AND COL_124:TIME2:GT:170000) OR (COL_123:TIME2:GTE:170000 AND COL_123:TIME2:LT:180000))','')
	,'313'=>array('(COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:180000 AND COL_124:TIME2:GT:180000) OR (COL_123:TIME2:GTE:180000 AND COL_123:TIME2:LT:190000))','')
	,'314'=>array('(COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:190000 AND COL_124:TIME2:GT:190000) OR (COL_123:TIME2:GTE:190000 AND COL_123:TIME2:LT:200000))','')
	,'315'=>array('(COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:200000 AND COL_124:TIME2:GT:200000) OR (COL_123:TIME2:GTE:200000 AND COL_123:TIME2:LT:210000))','')
	,'316'=>array('(COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:210000 AND COL_124:TIME2:GT:210000) OR (COL_123:TIME2:GTE:210000 AND COL_123:TIME2:LT:220000))','')
	,'317'=>array('(COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:220000 AND COL_124:TIME2:GT:220000) OR (COL_123:TIME2:GTE:220000 AND COL_123:TIME2:LT:230000))','')
	,'318'=>array('(COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:230000 AND COL_124:TIME2:GT:230000) OR (COL_123:TIME2:GTE:230000 AND COL_123:TIME2:LT:240000))','')
	// 曜日のみ
	,'1'=>array('(COL_119!:00:00:00 AND COL_119!:@@NULL@@) OR (COL_120!:00:00:00 AND COL_120!:@@NULL@@)','')
	,'2'=>array('(COL_121!:00:00:00 AND COL_121!:@@NULL@@) OR (COL_122!:00:00:00 AND COL_122!:@@NULL@@)','')
	,'3'=>array('(COL_123!:00:00:00 AND COL_123!:@@NULL@@) OR (COL_124!:00:00:00 AND COL_124!:@@NULL@@)','')
	// 時間帯のみ
	,'01'=>array(
	 			 '( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:000000 AND COL_120:TIME2:GT:000000) OR (COL_119:TIME2:GTE:000000 AND COL_119:TIME2:LT:070000)) )'
	 		.' OR ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:000000 AND COL_122:TIME2:GT:000000) OR (COL_121:TIME2:GTE:000000 AND COL_121:TIME2:LT:070000)) )'
	 		.' OR ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:000000 AND COL_124:TIME2:GT:000000) OR (COL_123:TIME2:GTE:000000 AND COL_123:TIME2:LT:070000)) )'
			,'')
	,'02'=>array(
				 '( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:070000 AND COL_120:TIME2:GT:070000) OR (COL_119:TIME2:GTE:070000 AND COL_119:TIME2:LT:080000)) )'
			.' OR ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:070000 AND COL_122:TIME2:GT:070000) OR (COL_121:TIME2:GTE:070000 AND COL_121:TIME2:LT:080000)) )'
			.' OR ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:070000 AND COL_124:TIME2:GT:070000) OR (COL_123:TIME2:GTE:070000 AND COL_123:TIME2:LT:080000)) )'
			,'')
	,'03'=>array(
				 '( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:080000 AND COL_120:TIME2:GT:080000) OR (COL_119:TIME2:GTE:080000 AND COL_119:TIME2:LT:090000)) )'
			.' OR ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:080000 AND COL_122:TIME2:GT:080000) OR (COL_121:TIME2:GTE:080000 AND COL_121:TIME2:LT:090000)) )'
			.' OR ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:080000 AND COL_124:TIME2:GT:080000) OR (COL_123:TIME2:GTE:080000 AND COL_123:TIME2:LT:090000)) )'
			,'')
	,'04'=>array(
				 '( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:090000 AND COL_120:TIME2:GT:090000) OR (COL_119:TIME2:GTE:090000 AND COL_119:TIME2:LT:100000)) )'
			.' OR ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:090000 AND COL_122:TIME2:GT:090000) OR (COL_121:TIME2:GTE:090000 AND COL_121:TIME2:LT:100000)) )'
			.' OR ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:090000 AND COL_124:TIME2:GT:090000) OR (COL_123:TIME2:GTE:090000 AND COL_123:TIME2:LT:100000)) )'
			,'')
	,'05'=>array(
				 '( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:100000 AND COL_120:TIME2:GT:100000) OR (COL_119:TIME2:GTE:100000 AND COL_119:TIME2:LT:110000)) )'
			.' OR ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:100000 AND COL_122:TIME2:GT:100000) OR (COL_121:TIME2:GTE:100000 AND COL_121:TIME2:LT:110000)) )'
			.' OR ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:100000 AND COL_124:TIME2:GT:100000) OR (COL_123:TIME2:GTE:100000 AND COL_123:TIME2:LT:110000)) )'
			,'')
	,'06'=>array(
				 '( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:110000 AND COL_120:TIME2:GT:110000) OR (COL_119:TIME2:GTE:110000 AND COL_119:TIME2:LT:120000)) )'
			.' OR ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:110000 AND COL_122:TIME2:GT:110000) OR (COL_121:TIME2:GTE:110000 AND COL_121:TIME2:LT:120000)) )'
			.' OR ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:110000 AND COL_124:TIME2:GT:110000) OR (COL_123:TIME2:GTE:110000 AND COL_123:TIME2:LT:120000)) )'
			,'')
	,'07'=>array(
				 '( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:120000 AND COL_120:TIME2:GT:120000) OR (COL_119:TIME2:GTE:120000 AND COL_119:TIME2:LT:130000)) )'
			.' OR ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:120000 AND COL_122:TIME2:GT:120000) OR (COL_121:TIME2:GTE:120000 AND COL_121:TIME2:LT:130000)) )'
			.' OR ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:120000 AND COL_124:TIME2:GT:120000) OR (COL_123:TIME2:GTE:120000 AND COL_123:TIME2:LT:130000)) )'
			,'')
	,'08'=>array(
				 '( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:130000 AND COL_120:TIME2:GT:130000) OR (COL_119:TIME2:GTE:130000 AND COL_119:TIME2:LT:140000)) )'
			.' OR ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:130000 AND COL_122:TIME2:GT:130000) OR (COL_121:TIME2:GTE:130000 AND COL_121:TIME2:LT:140000)) )'
			.' OR ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:130000 AND COL_124:TIME2:GT:130000) OR (COL_123:TIME2:GTE:130000 AND COL_123:TIME2:LT:140000)) )'
			,'')
	,'09'=>array(
				 '( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:140000 AND COL_120:TIME2:GT:140000) OR (COL_119:TIME2:GTE:140000 AND COL_119:TIME2:LT:150000)) )'
			.' OR ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:140000 AND COL_122:TIME2:GT:140000) OR (COL_121:TIME2:GTE:140000 AND COL_121:TIME2:LT:150000)) )'
			.' OR ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:140000 AND COL_124:TIME2:GT:140000) OR (COL_123:TIME2:GTE:140000 AND COL_123:TIME2:LT:150000)) )'
			,'')
	,'10'=>array(
				 '( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:150000 AND COL_120:TIME2:GT:150000) OR (COL_119:TIME2:GTE:150000 AND COL_119:TIME2:LT:160000)) )'
			.' OR ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:150000 AND COL_122:TIME2:GT:150000) OR (COL_121:TIME2:GTE:150000 AND COL_121:TIME2:LT:160000)) )'
			.' OR ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:150000 AND COL_124:TIME2:GT:150000) OR (COL_123:TIME2:GTE:150000 AND COL_123:TIME2:LT:160000)) )'
			,'')
	,'11'=>array(
				 '( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:160000 AND COL_120:TIME2:GT:160000) OR (COL_119:TIME2:GTE:160000 AND COL_119:TIME2:LT:170000)) )'
			.' OR ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:160000 AND COL_122:TIME2:GT:160000) OR (COL_121:TIME2:GTE:160000 AND COL_121:TIME2:LT:170000)) )'
			.' OR ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:160000 AND COL_124:TIME2:GT:160000) OR (COL_123:TIME2:GTE:160000 AND COL_123:TIME2:LT:170000)) )'
			,'')
	,'12'=>array(
				 '( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:170000 AND COL_120:TIME2:GT:170000) OR (COL_119:TIME2:GTE:170000 AND COL_119:TIME2:LT:180000)) )'
			.' OR ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:170000 AND COL_122:TIME2:GT:170000) OR (COL_121:TIME2:GTE:170000 AND COL_121:TIME2:LT:180000)) )'
			.' OR ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:170000 AND COL_124:TIME2:GT:170000) OR (COL_123:TIME2:GTE:170000 AND COL_123:TIME2:LT:180000)) )'
			,'')
	,'13'=>array(
				 '( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:180000 AND COL_120:TIME2:GT:180000) OR (COL_119:TIME2:GTE:180000 AND COL_119:TIME2:LT:190000)) )'
			.' OR ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:180000 AND COL_122:TIME2:GT:180000) OR (COL_121:TIME2:GTE:180000 AND COL_121:TIME2:LT:190000)) )'
			.' OR ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:180000 AND COL_124:TIME2:GT:180000) OR (COL_123:TIME2:GTE:180000 AND COL_123:TIME2:LT:190000)) )'
			,'')
	,'14'=>array(
				 '( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:190000 AND COL_120:TIME2:GT:190000) OR (COL_119:TIME2:GTE:190000 AND COL_119:TIME2:LT:200000)) )'
			.' OR ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:190000 AND COL_122:TIME2:GT:190000) OR (COL_121:TIME2:GTE:190000 AND COL_121:TIME2:LT:200000)) )'
			.' OR ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:190000 AND COL_124:TIME2:GT:190000) OR (COL_123:TIME2:GTE:190000 AND COL_123:TIME2:LT:200000)) )'
			,'')
	,'15'=>array(
				 '( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:200000 AND COL_120:TIME2:GT:200000) OR (COL_119:TIME2:GTE:200000 AND COL_119:TIME2:LT:210000)) )'
			.' OR ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:200000 AND COL_122:TIME2:GT:200000) OR (COL_121:TIME2:GTE:200000 AND COL_121:TIME2:LT:210000)) )'
			.' OR ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:200000 AND COL_124:TIME2:GT:200000) OR (COL_123:TIME2:GTE:200000 AND COL_123:TIME2:LT:210000)) )'
			,'')
	,'16'=>array(
				 '( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:210000 AND COL_120:TIME2:GT:210000) OR (COL_119:TIME2:GTE:210000 AND COL_119:TIME2:LT:220000)) )'
			.' OR ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:210000 AND COL_122:TIME2:GT:210000) OR (COL_121:TIME2:GTE:210000 AND COL_121:TIME2:LT:220000)) )'
			.' OR ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:210000 AND COL_124:TIME2:GT:210000) OR (COL_123:TIME2:GTE:210000 AND COL_123:TIME2:LT:220000)) )'
			,'')
	,'17'=>array(
				 '( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:220000 AND COL_120:TIME2:GT:220000) OR (COL_119:TIME2:GTE:220000 AND COL_119:TIME2:LT:230000)) )'
			.' OR ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:220000 AND COL_122:TIME2:GT:220000) OR (COL_121:TIME2:GTE:220000 AND COL_121:TIME2:LT:230000)) )'
			.' OR ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:220000 AND COL_124:TIME2:GT:220000) OR (COL_123:TIME2:GTE:220000 AND COL_123:TIME2:LT:230000)) )'
			,'')
	,'18'=>array(
				 '( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:230000 AND COL_120:TIME2:GT:230000) OR (COL_119:TIME2:GTE:230000 AND COL_119:TIME2:LT:240000)) )'
			.' OR ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:230000 AND COL_122:TIME2:GT:230000) OR (COL_121:TIME2:GTE:230000 AND COL_121:TIME2:LT:240000)) )'
			.' OR ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:230000 AND COL_124:TIME2:GT:230000) OR (COL_123:TIME2:GTE:230000 AND COL_123:TIME2:LT:240000)) )'
			,'')
	)
);
//    「ゆうゆう窓口」を選択した場合
$D_COND[102] = array(
'type'=>'SL'
,'opts'=>array(
	// 平日
	 '101'=>array('( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:000000 AND COL_152:TIME2:GT:000000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:000000 AND COL_151:TIME2:LT:070000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:000000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:070000) )','')
	,'102'=>array('( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:070000 AND COL_152:TIME2:GT:070000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:070000 AND COL_151:TIME2:LT:080000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:070000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:080000) )','')
	,'103'=>array('( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:080000 AND COL_152:TIME2:GT:080000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:080000 AND COL_151:TIME2:LT:090000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:080000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:090000) )','')
	,'104'=>array('( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:090000 AND COL_152:TIME2:GT:090000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:090000 AND COL_151:TIME2:LT:100000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:090000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:100000) )','')
	,'105'=>array('( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:100000 AND COL_152:TIME2:GT:100000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:100000 AND COL_151:TIME2:LT:110000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:100000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:110000) )','')
	,'106'=>array('( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:110000 AND COL_152:TIME2:GT:110000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:110000 AND COL_151:TIME2:LT:120000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:110000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:120000) )','')
	,'107'=>array('( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:120000 AND COL_152:TIME2:GT:120000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:120000 AND COL_151:TIME2:LT:130000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:120000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:130000) )','')
	,'108'=>array('( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:130000 AND COL_152:TIME2:GT:130000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:130000 AND COL_151:TIME2:LT:140000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:130000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:140000) )','')
	,'109'=>array('( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:140000 AND COL_152:TIME2:GT:140000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:140000 AND COL_151:TIME2:LT:150000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:140000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:150000) )','')
	,'110'=>array('( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:150000 AND COL_152:TIME2:GT:150000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:150000 AND COL_151:TIME2:LT:160000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:150000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:160000) )','')
	,'111'=>array('( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:160000 AND COL_152:TIME2:GT:160000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:160000 AND COL_151:TIME2:LT:170000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:160000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:170000) )','')
	,'112'=>array('( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:170000 AND COL_152:TIME2:GT:170000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:170000 AND COL_151:TIME2:LT:180000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:170000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:180000) )','')
	,'113'=>array('( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:180000 AND COL_152:TIME2:GT:180000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:180000 AND COL_151:TIME2:LT:190000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:180000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:190000) )','')
	,'114'=>array('( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:190000 AND COL_152:TIME2:GT:190000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:190000 AND COL_151:TIME2:LT:200000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:190000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:200000) )','')
	,'115'=>array('( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:200000 AND COL_152:TIME2:GT:200000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:200000 AND COL_151:TIME2:LT:210000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:200000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:210000) )','')
	,'116'=>array('( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:210000 AND COL_152:TIME2:GT:210000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:210000 AND COL_151:TIME2:LT:220000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:210000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:220000) )','')
	,'117'=>array('( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:220000 AND COL_152:TIME2:GT:220000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:220000 AND COL_151:TIME2:LT:230000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:220000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:230000) )','')
	,'118'=>array('( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:230000 AND COL_152:TIME2:GT:230000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:230000 AND COL_151:TIME2:LT:240000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:230000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:240000) )','')
	// 土曜
	,'201'=>array('( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:000000 AND COL_154:TIME2:GT:000000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:000000 AND COL_153:TIME2:LT:070000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:000000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:070000) )','')
	,'202'=>array('( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:070000 AND COL_154:TIME2:GT:070000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:070000 AND COL_153:TIME2:LT:080000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:070000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:080000) )','')
	,'203'=>array('( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:080000 AND COL_154:TIME2:GT:080000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:080000 AND COL_153:TIME2:LT:090000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:080000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:090000) )','')
	,'204'=>array('( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:090000 AND COL_154:TIME2:GT:090000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:090000 AND COL_153:TIME2:LT:100000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:090000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:100000) )','')
	,'205'=>array('( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:100000 AND COL_154:TIME2:GT:100000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:100000 AND COL_153:TIME2:LT:110000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:100000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:110000) )','')
	,'206'=>array('( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:110000 AND COL_154:TIME2:GT:110000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:110000 AND COL_153:TIME2:LT:120000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:110000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:120000) )','')
	,'207'=>array('( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:120000 AND COL_154:TIME2:GT:120000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:120000 AND COL_153:TIME2:LT:130000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:120000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:130000) )','')
	,'208'=>array('( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:130000 AND COL_154:TIME2:GT:130000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:130000 AND COL_153:TIME2:LT:140000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:130000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:140000) )','')
	,'209'=>array('( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:140000 AND COL_154:TIME2:GT:140000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:140000 AND COL_153:TIME2:LT:150000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:140000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:150000) )','')
	,'210'=>array('( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:150000 AND COL_154:TIME2:GT:150000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:150000 AND COL_153:TIME2:LT:160000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:150000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:160000) )','')
	,'211'=>array('( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:160000 AND COL_154:TIME2:GT:160000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:160000 AND COL_153:TIME2:LT:170000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:160000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:170000) )','')
	,'212'=>array('( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:170000 AND COL_154:TIME2:GT:170000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:170000 AND COL_153:TIME2:LT:180000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:170000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:180000) )','')
	,'213'=>array('( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:180000 AND COL_154:TIME2:GT:180000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:180000 AND COL_153:TIME2:LT:190000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:180000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:190000) )','')
	,'214'=>array('( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:190000 AND COL_154:TIME2:GT:190000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:190000 AND COL_153:TIME2:LT:200000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:190000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:200000) )','')
	,'215'=>array('( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:200000 AND COL_154:TIME2:GT:200000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:200000 AND COL_153:TIME2:LT:210000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:200000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:210000) )','')
	,'216'=>array('( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:210000 AND COL_154:TIME2:GT:210000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:210000 AND COL_153:TIME2:LT:220000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:210000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:220000) )','')
	,'217'=>array('( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:220000 AND COL_154:TIME2:GT:220000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:220000 AND COL_153:TIME2:LT:230000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:220000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:230000) )','')
	,'218'=>array('( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:230000 AND COL_154:TIME2:GT:230000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:230000 AND COL_153:TIME2:LT:240000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:230000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:240000) )','')
	// 日曜・休日
	,'301'=>array('( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:000000 AND COL_156:TIME2:GT:000000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:000000 AND COL_155:TIME2:LT:070000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:000000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:070000) )','')
	,'302'=>array('( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:070000 AND COL_156:TIME2:GT:070000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:070000 AND COL_155:TIME2:LT:080000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:070000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:080000) )','')
	,'303'=>array('( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:080000 AND COL_156:TIME2:GT:080000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:080000 AND COL_155:TIME2:LT:090000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:080000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:090000) )','')
	,'304'=>array('( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:090000 AND COL_156:TIME2:GT:090000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:090000 AND COL_155:TIME2:LT:100000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:090000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:100000) )','')
	,'305'=>array('( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:100000 AND COL_156:TIME2:GT:100000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:100000 AND COL_155:TIME2:LT:110000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:100000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:110000) )','')
	,'306'=>array('( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:110000 AND COL_156:TIME2:GT:110000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:110000 AND COL_155:TIME2:LT:120000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:110000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:120000) )','')
	,'307'=>array('( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:120000 AND COL_156:TIME2:GT:120000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:120000 AND COL_155:TIME2:LT:130000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:120000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:130000) )','')
	,'308'=>array('( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:130000 AND COL_156:TIME2:GT:130000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:130000 AND COL_155:TIME2:LT:140000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:130000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:140000) )','')
	,'309'=>array('( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:140000 AND COL_156:TIME2:GT:140000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:140000 AND COL_155:TIME2:LT:150000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:140000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:150000) )','')
	,'310'=>array('( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:150000 AND COL_156:TIME2:GT:150000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:150000 AND COL_155:TIME2:LT:160000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:150000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:160000) )','')
	,'311'=>array('( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:160000 AND COL_156:TIME2:GT:160000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:160000 AND COL_155:TIME2:LT:170000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:160000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:170000) )','')
	,'312'=>array('( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:170000 AND COL_156:TIME2:GT:170000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:170000 AND COL_155:TIME2:LT:180000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:170000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:180000) )','')
	,'313'=>array('( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:180000 AND COL_156:TIME2:GT:180000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:180000 AND COL_155:TIME2:LT:190000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:180000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:190000) )','')
	,'314'=>array('( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:190000 AND COL_156:TIME2:GT:190000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:190000 AND COL_155:TIME2:LT:200000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:190000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:200000) )','')
	,'315'=>array('( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:200000 AND COL_156:TIME2:GT:200000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:200000 AND COL_155:TIME2:LT:210000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:200000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:210000) )','')
	,'316'=>array('( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:210000 AND COL_156:TIME2:GT:210000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:210000 AND COL_155:TIME2:LT:220000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:210000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:220000) )','')
	,'317'=>array('( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:220000 AND COL_156:TIME2:GT:220000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:220000 AND COL_155:TIME2:LT:230000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:220000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:230000) )','')
	,'318'=>array('( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:230000 AND COL_156:TIME2:GT:230000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:230000 AND COL_155:TIME2:LT:240000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:230000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:240000) )','')
	// 曜日のみ
	,'1'=>array('( (COL_151!:00:00:00 AND COL_151!:@@NULL@@) OR (COL_152!:00:00:00 AND COL_152!:@@NULL@@) )','')
	,'2'=>array('( (COL_153!:00:00:00 AND COL_153!:@@NULL@@) OR (COL_154!:00:00:00 AND COL_154!:@@NULL@@) )','')
	,'3'=>array('( (COL_155!:00:00:00 AND COL_155!:@@NULL@@) OR (COL_156!:00:00:00 AND COL_156!:@@NULL@@) )','')
	// 時間帯のみ
	,'01'=>array(
	 			 '( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:000000 AND COL_152:TIME2:GT:000000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:000000 AND COL_151:TIME2:LT:070000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:000000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:070000) )'
	 		.' OR ( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:000000 AND COL_154:TIME2:GT:000000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:000000 AND COL_153:TIME2:LT:070000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:000000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:070000) )'
	 		.' OR ( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:000000 AND COL_156:TIME2:GT:000000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:000000 AND COL_155:TIME2:LT:070000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:000000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:070000) )'
			,'')
	,'02'=>array(
				 '( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:070000 AND COL_152:TIME2:GT:070000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:070000 AND COL_151:TIME2:LT:080000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:070000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:080000) )'
			.' OR ( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:070000 AND COL_154:TIME2:GT:070000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:070000 AND COL_153:TIME2:LT:080000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:070000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:080000) )'
			.' OR ( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:070000 AND COL_156:TIME2:GT:070000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:070000 AND COL_155:TIME2:LT:080000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:070000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:080000) )'
			,'')
	,'03'=>array(
				 '( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:080000 AND COL_152:TIME2:GT:080000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:080000 AND COL_151:TIME2:LT:090000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:080000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:090000) )'
			.' OR ( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:080000 AND COL_154:TIME2:GT:080000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:080000 AND COL_153:TIME2:LT:090000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:080000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:090000) )'
			.' OR ( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:080000 AND COL_156:TIME2:GT:080000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:080000 AND COL_155:TIME2:LT:090000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:080000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:090000) )'
			,'')
	,'04'=>array(
				 '( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:090000 AND COL_152:TIME2:GT:090000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:090000 AND COL_151:TIME2:LT:100000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:090000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:100000) )'
			.' OR ( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:090000 AND COL_154:TIME2:GT:090000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:090000 AND COL_153:TIME2:LT:100000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:090000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:100000) )'
			.' OR ( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:090000 AND COL_156:TIME2:GT:090000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:090000 AND COL_155:TIME2:LT:100000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:090000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:100000) )'
			,'')
	,'05'=>array(
				 '( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:100000 AND COL_152:TIME2:GT:100000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:100000 AND COL_151:TIME2:LT:110000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:100000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:110000) )'
			.' OR ( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:100000 AND COL_154:TIME2:GT:100000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:100000 AND COL_153:TIME2:LT:110000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:100000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:110000) )'
			.' OR ( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:100000 AND COL_156:TIME2:GT:100000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:100000 AND COL_155:TIME2:LT:110000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:100000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:110000) )'
			,'')
	,'06'=>array(
				 '( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:110000 AND COL_152:TIME2:GT:110000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:110000 AND COL_151:TIME2:LT:120000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:110000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:120000) )'
			.' OR ( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:110000 AND COL_154:TIME2:GT:110000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:110000 AND COL_153:TIME2:LT:120000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:110000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:120000) )'
			.' OR ( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:110000 AND COL_156:TIME2:GT:110000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:110000 AND COL_155:TIME2:LT:120000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:110000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:120000) )'
			,'')
	,'07'=>array(
				 '( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:120000 AND COL_152:TIME2:GT:120000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:120000 AND COL_151:TIME2:LT:130000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:120000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:130000) )'
			.' OR ( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:120000 AND COL_154:TIME2:GT:120000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:120000 AND COL_153:TIME2:LT:130000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:120000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:130000) )'
			.' OR ( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:120000 AND COL_156:TIME2:GT:120000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:120000 AND COL_155:TIME2:LT:130000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:120000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:130000) )'
			,'')
	,'08'=>array(
				 '( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:130000 AND COL_152:TIME2:GT:130000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:130000 AND COL_151:TIME2:LT:140000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:130000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:140000) )'
			.' OR ( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:130000 AND COL_154:TIME2:GT:130000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:130000 AND COL_153:TIME2:LT:140000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:130000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:140000) )'
			.' OR ( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:130000 AND COL_156:TIME2:GT:130000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:130000 AND COL_155:TIME2:LT:140000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:130000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:140000) )'
			,'')
	,'09'=>array(
				 '( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:140000 AND COL_152:TIME2:GT:140000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:140000 AND COL_151:TIME2:LT:150000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:140000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:150000) )'
			.' OR ( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:140000 AND COL_154:TIME2:GT:140000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:140000 AND COL_153:TIME2:LT:150000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:140000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:150000) )'
			.' OR ( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:140000 AND COL_156:TIME2:GT:140000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:140000 AND COL_155:TIME2:LT:150000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:140000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:150000) )'
			,'')
	,'10'=>array(
				 '( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:150000 AND COL_152:TIME2:GT:150000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:150000 AND COL_151:TIME2:LT:160000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:150000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:160000) )'
			.' OR ( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:150000 AND COL_154:TIME2:GT:150000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:150000 AND COL_153:TIME2:LT:160000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:150000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:160000) )'
			.' OR ( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:150000 AND COL_156:TIME2:GT:150000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:150000 AND COL_155:TIME2:LT:160000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:150000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:160000) )'
			,'')
	,'11'=>array(
				 '( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:160000 AND COL_152:TIME2:GT:160000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:160000 AND COL_151:TIME2:LT:170000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:160000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:170000) )'
			.' OR ( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:160000 AND COL_154:TIME2:GT:160000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:160000 AND COL_153:TIME2:LT:170000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:160000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:170000) )'
			.' OR ( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:160000 AND COL_156:TIME2:GT:160000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:160000 AND COL_155:TIME2:LT:170000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:160000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:170000) )'
			,'')
	,'12'=>array(
				 '( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:170000 AND COL_152:TIME2:GT:170000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:170000 AND COL_151:TIME2:LT:180000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:170000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:180000) )'
			.' OR ( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:170000 AND COL_154:TIME2:GT:170000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:170000 AND COL_153:TIME2:LT:180000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:170000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:180000) )'
			.' OR ( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:170000 AND COL_156:TIME2:GT:170000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:170000 AND COL_155:TIME2:LT:180000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:170000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:180000) )'
			,'')
	,'13'=>array(
				 '( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:180000 AND COL_152:TIME2:GT:180000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:180000 AND COL_151:TIME2:LT:190000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:180000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:190000) )'
			.' OR ( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:180000 AND COL_154:TIME2:GT:180000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:180000 AND COL_153:TIME2:LT:190000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:180000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:190000) )'
			.' OR ( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:180000 AND COL_156:TIME2:GT:180000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:180000 AND COL_155:TIME2:LT:190000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:180000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:190000) )'
			,'')
	,'14'=>array(
				 '( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:190000 AND COL_152:TIME2:GT:190000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:190000 AND COL_151:TIME2:LT:200000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:190000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:200000) )'
			.' OR ( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:190000 AND COL_154:TIME2:GT:190000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:190000 AND COL_153:TIME2:LT:200000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:190000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:200000) )'
			.' OR ( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:190000 AND COL_156:TIME2:GT:190000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:190000 AND COL_155:TIME2:LT:200000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:190000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:200000) )'
			,'')
	,'15'=>array(
				 '( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:200000 AND COL_152:TIME2:GT:200000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:200000 AND COL_151:TIME2:LT:210000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:200000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:210000) )'
			.' OR ( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:200000 AND COL_154:TIME2:GT:200000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:200000 AND COL_153:TIME2:LT:210000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:200000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:210000) )'
			.' OR ( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:200000 AND COL_156:TIME2:GT:200000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:200000 AND COL_155:TIME2:LT:210000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:200000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:210000) )'
			,'')
	,'16'=>array(
				 '( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:210000 AND COL_152:TIME2:GT:210000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:210000 AND COL_151:TIME2:LT:220000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:210000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:220000) )'
			.' OR ( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:210000 AND COL_154:TIME2:GT:210000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:210000 AND COL_153:TIME2:LT:220000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:210000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:220000) )'
			.' OR ( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:210000 AND COL_156:TIME2:GT:210000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:210000 AND COL_155:TIME2:LT:220000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:210000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:220000) )'
			,'')
	,'17'=>array(
				 '( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:220000 AND COL_152:TIME2:GT:220000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:220000 AND COL_151:TIME2:LT:230000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:220000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:230000) )'
			.' OR ( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:220000 AND COL_154:TIME2:GT:220000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:220000 AND COL_153:TIME2:LT:230000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:220000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:230000) )'
			.' OR ( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:220000 AND COL_156:TIME2:GT:220000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:220000 AND COL_155:TIME2:LT:230000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:220000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:230000) )'
			,'')
	,'18'=>array(
				 '( (COL_151!:00:00:00 OR COL_152!:00:00:00) AND (COL_151<COL_152 AND COL_151:TIME2:LTE:230000 AND COL_152:TIME2:GT:230000) OR (COL_151<COL_152 AND COL_151:TIME2:GTE:230000 AND COL_151:TIME2:LT:240000) OR (COL_151>COL_152 AND COL_152:TIME2:GT:000000 AND COL_152:TIME2:GT:230000) OR (COL_151>COL_152 AND COL_151:TIME2:LTE:240000 AND COL_151:TIME2:LT:240000) )'
			.' OR ( (COL_153!:00:00:00 OR COL_154!:00:00:00) AND (COL_153<COL_154 AND COL_153:TIME2:LTE:230000 AND COL_154:TIME2:GT:230000) OR (COL_153<COL_154 AND COL_153:TIME2:GTE:230000 AND COL_153:TIME2:LT:240000) OR (COL_153>COL_154 AND COL_154:TIME2:GT:000000 AND COL_154:TIME2:GT:230000) OR (COL_153>COL_154 AND COL_153:TIME2:LTE:240000 AND COL_153:TIME2:LT:240000) )'
			.' OR ( (COL_155!:00:00:00 OR COL_156!:00:00:00) AND (COL_155<COL_156 AND COL_155:TIME2:LTE:230000 AND COL_156:TIME2:GT:230000) OR (COL_155<COL_156 AND COL_155:TIME2:GTE:230000 AND COL_155:TIME2:LT:240000) OR (COL_155>COL_156 AND COL_156:TIME2:GT:000000 AND COL_156:TIME2:GT:230000) OR (COL_155>COL_156 AND COL_155:TIME2:LTE:240000 AND COL_155:TIME2:LT:240000) )'
			,'')
	)
);
//「貯金サービスから選ぶ」のご利用時間
//    「変額年金保険」以外を選択した場合
$D_COND[103] = array(
'type'=>'SL'
,'opts'=>array(
	// 平日
	 '101'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:000000 AND COL_128:TIME2:GT:000000) OR (COL_127:TIME2:GTE:000000 AND COL_127:TIME2:LT:070000))','')
	,'102'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:070000 AND COL_128:TIME2:GT:070000) OR (COL_127:TIME2:GTE:070000 AND COL_127:TIME2:LT:080000))','')
	,'103'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:080000 AND COL_128:TIME2:GT:080000) OR (COL_127:TIME2:GTE:080000 AND COL_127:TIME2:LT:090000))','')
	,'104'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:090000 AND COL_128:TIME2:GT:090000) OR (COL_127:TIME2:GTE:090000 AND COL_127:TIME2:LT:100000))','')
	,'105'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:100000 AND COL_128:TIME2:GT:100000) OR (COL_127:TIME2:GTE:100000 AND COL_127:TIME2:LT:110000))','')
	,'106'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:110000 AND COL_128:TIME2:GT:110000) OR (COL_127:TIME2:GTE:110000 AND COL_127:TIME2:LT:120000))','')
	,'107'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:120000 AND COL_128:TIME2:GT:120000) OR (COL_127:TIME2:GTE:120000 AND COL_127:TIME2:LT:130000))','')
	,'108'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:130000 AND COL_128:TIME2:GT:130000) OR (COL_127:TIME2:GTE:130000 AND COL_127:TIME2:LT:140000))','')
	,'109'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:140000 AND COL_128:TIME2:GT:140000) OR (COL_127:TIME2:GTE:140000 AND COL_127:TIME2:LT:150000))','')
	,'110'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:150000 AND COL_128:TIME2:GT:150000) OR (COL_127:TIME2:GTE:150000 AND COL_127:TIME2:LT:160000))','')
	,'111'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:160000 AND COL_128:TIME2:GT:160000) OR (COL_127:TIME2:GTE:160000 AND COL_127:TIME2:LT:170000))','')
	,'112'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:170000 AND COL_128:TIME2:GT:170000) OR (COL_127:TIME2:GTE:170000 AND COL_127:TIME2:LT:180000))','')
	,'113'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:180000 AND COL_128:TIME2:GT:180000) OR (COL_127:TIME2:GTE:180000 AND COL_127:TIME2:LT:190000))','')
	,'114'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:190000 AND COL_128:TIME2:GT:190000) OR (COL_127:TIME2:GTE:190000 AND COL_127:TIME2:LT:200000))','')
	,'115'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:200000 AND COL_128:TIME2:GT:200000) OR (COL_127:TIME2:GTE:200000 AND COL_127:TIME2:LT:210000))','')
	,'116'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:210000 AND COL_128:TIME2:GT:210000) OR (COL_127:TIME2:GTE:210000 AND COL_127:TIME2:LT:220000))','')
	,'117'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:220000 AND COL_128:TIME2:GT:220000) OR (COL_127:TIME2:GTE:220000 AND COL_127:TIME2:LT:230000))','')
	,'118'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:230000 AND COL_128:TIME2:GT:230000) OR (COL_127:TIME2:GTE:230000 AND COL_127:TIME2:LT:240000))','')
	// 土曜
	,'201'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:000000 AND COL_130:TIME2:GT:000000) OR (COL_129:TIME2:GTE:000000 AND COL_129:TIME2:LT:070000))','')
	,'202'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:070000 AND COL_130:TIME2:GT:070000) OR (COL_129:TIME2:GTE:070000 AND COL_129:TIME2:LT:080000))','')
	,'203'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:080000 AND COL_130:TIME2:GT:080000) OR (COL_129:TIME2:GTE:080000 AND COL_129:TIME2:LT:090000))','')
	,'204'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:090000 AND COL_130:TIME2:GT:090000) OR (COL_129:TIME2:GTE:090000 AND COL_129:TIME2:LT:100000))','')
	,'205'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:100000 AND COL_130:TIME2:GT:100000) OR (COL_129:TIME2:GTE:100000 AND COL_129:TIME2:LT:110000))','')
	,'206'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:110000 AND COL_130:TIME2:GT:110000) OR (COL_129:TIME2:GTE:110000 AND COL_129:TIME2:LT:120000))','')
	,'207'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:120000 AND COL_130:TIME2:GT:120000) OR (COL_129:TIME2:GTE:120000 AND COL_129:TIME2:LT:130000))','')
	,'208'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:130000 AND COL_130:TIME2:GT:130000) OR (COL_129:TIME2:GTE:130000 AND COL_129:TIME2:LT:140000))','')
	,'209'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:140000 AND COL_130:TIME2:GT:140000) OR (COL_129:TIME2:GTE:140000 AND COL_129:TIME2:LT:150000))','')
	,'210'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:150000 AND COL_130:TIME2:GT:150000) OR (COL_129:TIME2:GTE:150000 AND COL_129:TIME2:LT:160000))','')
	,'211'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:160000 AND COL_130:TIME2:GT:160000) OR (COL_129:TIME2:GTE:160000 AND COL_129:TIME2:LT:170000))','')
	,'212'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:170000 AND COL_130:TIME2:GT:170000) OR (COL_129:TIME2:GTE:170000 AND COL_129:TIME2:LT:180000))','')
	,'213'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:180000 AND COL_130:TIME2:GT:180000) OR (COL_129:TIME2:GTE:180000 AND COL_129:TIME2:LT:190000))','')
	,'214'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:190000 AND COL_130:TIME2:GT:190000) OR (COL_129:TIME2:GTE:190000 AND COL_129:TIME2:LT:200000))','')
	,'215'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:200000 AND COL_130:TIME2:GT:200000) OR (COL_129:TIME2:GTE:200000 AND COL_129:TIME2:LT:210000))','')
	,'216'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:210000 AND COL_130:TIME2:GT:210000) OR (COL_129:TIME2:GTE:210000 AND COL_129:TIME2:LT:220000))','')
	,'217'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:220000 AND COL_130:TIME2:GT:220000) OR (COL_129:TIME2:GTE:220000 AND COL_129:TIME2:LT:230000))','')
	,'218'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:230000 AND COL_130:TIME2:GT:230000) OR (COL_129:TIME2:GTE:230000 AND COL_129:TIME2:LT:240000))','')
	// 日曜・休日
	,'301'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:000000 AND COL_132:TIME2:GT:000000) OR (COL_131:TIME2:GTE:000000 AND COL_131:TIME2:LT:070000))','')
	,'302'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:070000 AND COL_132:TIME2:GT:070000) OR (COL_131:TIME2:GTE:070000 AND COL_131:TIME2:LT:080000))','')
	,'303'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:080000 AND COL_132:TIME2:GT:080000) OR (COL_131:TIME2:GTE:080000 AND COL_131:TIME2:LT:090000))','')
	,'304'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:090000 AND COL_132:TIME2:GT:090000) OR (COL_131:TIME2:GTE:090000 AND COL_131:TIME2:LT:100000))','')
	,'305'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:100000 AND COL_132:TIME2:GT:100000) OR (COL_131:TIME2:GTE:100000 AND COL_131:TIME2:LT:110000))','')
	,'306'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:110000 AND COL_132:TIME2:GT:110000) OR (COL_131:TIME2:GTE:110000 AND COL_131:TIME2:LT:120000))','')
	,'307'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:120000 AND COL_132:TIME2:GT:120000) OR (COL_131:TIME2:GTE:120000 AND COL_131:TIME2:LT:130000))','')
	,'308'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:130000 AND COL_132:TIME2:GT:130000) OR (COL_131:TIME2:GTE:130000 AND COL_131:TIME2:LT:140000))','')
	,'309'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:140000 AND COL_132:TIME2:GT:140000) OR (COL_131:TIME2:GTE:140000 AND COL_131:TIME2:LT:150000))','')
	,'310'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:150000 AND COL_132:TIME2:GT:150000) OR (COL_131:TIME2:GTE:150000 AND COL_131:TIME2:LT:160000))','')
	,'311'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:160000 AND COL_132:TIME2:GT:160000) OR (COL_131:TIME2:GTE:160000 AND COL_131:TIME2:LT:170000))','')
	,'312'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:170000 AND COL_132:TIME2:GT:170000) OR (COL_131:TIME2:GTE:170000 AND COL_131:TIME2:LT:180000))','')
	,'313'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:180000 AND COL_132:TIME2:GT:180000) OR (COL_131:TIME2:GTE:180000 AND COL_131:TIME2:LT:190000))','')
	,'314'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:190000 AND COL_132:TIME2:GT:190000) OR (COL_131:TIME2:GTE:190000 AND COL_131:TIME2:LT:200000))','')
	,'315'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:200000 AND COL_132:TIME2:GT:200000) OR (COL_131:TIME2:GTE:200000 AND COL_131:TIME2:LT:210000))','')
	,'316'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:210000 AND COL_132:TIME2:GT:210000) OR (COL_131:TIME2:GTE:210000 AND COL_131:TIME2:LT:220000))','')
	,'317'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:220000 AND COL_132:TIME2:GT:220000) OR (COL_131:TIME2:GTE:220000 AND COL_131:TIME2:LT:230000))','')
	,'318'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:230000 AND COL_132:TIME2:GT:230000) OR (COL_131:TIME2:GTE:230000 AND COL_131:TIME2:LT:240000))','')
	// 曜日のみ
	,'1'=>array('(COL_127!:00:00:00 AND COL_127!:@@NULL@@) OR (COL_128!:00:00:00 AND COL_128!:@@NULL@@)','')
	,'2'=>array('(COL_129!:00:00:00 AND COL_129!:@@NULL@@) OR (COL_130!:00:00:00 AND COL_130!:@@NULL@@)','')
	,'3'=>array('(COL_131!:00:00:00 AND COL_131!:@@NULL@@) OR (COL_132!:00:00:00 AND COL_132!:@@NULL@@)','')
	// 時間帯のみ
	,'01'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:000000 AND COL_128:TIME2:GT:000000) OR (COL_127:TIME2:GTE:000000 AND COL_127:TIME2:LT:070000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:000000 AND COL_130:TIME2:GT:000000) OR (COL_129:TIME2:GTE:000000 AND COL_129:TIME2:LT:070000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:000000 AND COL_132:TIME2:GT:000000) OR (COL_131:TIME2:GTE:000000 AND COL_131:TIME2:LT:070000)) )'
			,'')
	,'02'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:070000 AND COL_128:TIME2:GT:070000) OR (COL_127:TIME2:GTE:070000 AND COL_127:TIME2:LT:080000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:070000 AND COL_130:TIME2:GT:070000) OR (COL_129:TIME2:GTE:070000 AND COL_129:TIME2:LT:080000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:070000 AND COL_132:TIME2:GT:070000) OR (COL_131:TIME2:GTE:070000 AND COL_131:TIME2:LT:080000)) )'
			,'')
	,'03'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:080000 AND COL_128:TIME2:GT:080000) OR (COL_127:TIME2:GTE:080000 AND COL_127:TIME2:LT:090000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:080000 AND COL_130:TIME2:GT:080000) OR (COL_129:TIME2:GTE:080000 AND COL_129:TIME2:LT:090000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:080000 AND COL_132:TIME2:GT:080000) OR (COL_131:TIME2:GTE:080000 AND COL_131:TIME2:LT:090000)) )'
			,'')
	,'04'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:090000 AND COL_128:TIME2:GT:090000) OR (COL_127:TIME2:GTE:090000 AND COL_127:TIME2:LT:100000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:090000 AND COL_130:TIME2:GT:090000) OR (COL_129:TIME2:GTE:090000 AND COL_129:TIME2:LT:100000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:090000 AND COL_132:TIME2:GT:090000) OR (COL_131:TIME2:GTE:090000 AND COL_131:TIME2:LT:100000)) )'
			,'')
	,'05'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:100000 AND COL_128:TIME2:GT:100000) OR (COL_127:TIME2:GTE:100000 AND COL_127:TIME2:LT:110000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:100000 AND COL_130:TIME2:GT:100000) OR (COL_129:TIME2:GTE:100000 AND COL_129:TIME2:LT:110000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:100000 AND COL_132:TIME2:GT:100000) OR (COL_131:TIME2:GTE:100000 AND COL_131:TIME2:LT:110000)) )'
			,'')
	,'06'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:110000 AND COL_128:TIME2:GT:110000) OR (COL_127:TIME2:GTE:110000 AND COL_127:TIME2:LT:120000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:110000 AND COL_130:TIME2:GT:110000) OR (COL_129:TIME2:GTE:110000 AND COL_129:TIME2:LT:120000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:110000 AND COL_132:TIME2:GT:110000) OR (COL_131:TIME2:GTE:110000 AND COL_131:TIME2:LT:120000)) )'
			,'')
	,'07'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:120000 AND COL_128:TIME2:GT:120000) OR (COL_127:TIME2:GTE:120000 AND COL_127:TIME2:LT:130000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:120000 AND COL_130:TIME2:GT:120000) OR (COL_129:TIME2:GTE:120000 AND COL_129:TIME2:LT:130000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:120000 AND COL_132:TIME2:GT:120000) OR (COL_131:TIME2:GTE:120000 AND COL_131:TIME2:LT:130000)) )'
			,'')
	,'08'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:130000 AND COL_128:TIME2:GT:130000) OR (COL_127:TIME2:GTE:130000 AND COL_127:TIME2:LT:140000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:130000 AND COL_130:TIME2:GT:130000) OR (COL_129:TIME2:GTE:130000 AND COL_129:TIME2:LT:140000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:130000 AND COL_132:TIME2:GT:130000) OR (COL_131:TIME2:GTE:130000 AND COL_131:TIME2:LT:140000)) )'
			,'')
	,'09'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:140000 AND COL_128:TIME2:GT:140000) OR (COL_127:TIME2:GTE:140000 AND COL_127:TIME2:LT:150000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:140000 AND COL_130:TIME2:GT:140000) OR (COL_129:TIME2:GTE:140000 AND COL_129:TIME2:LT:150000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:140000 AND COL_132:TIME2:GT:140000) OR (COL_131:TIME2:GTE:140000 AND COL_131:TIME2:LT:150000)) )'
			,'')
	,'10'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:150000 AND COL_128:TIME2:GT:150000) OR (COL_127:TIME2:GTE:150000 AND COL_127:TIME2:LT:160000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:150000 AND COL_130:TIME2:GT:150000) OR (COL_129:TIME2:GTE:150000 AND COL_129:TIME2:LT:160000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:150000 AND COL_132:TIME2:GT:150000) OR (COL_131:TIME2:GTE:150000 AND COL_131:TIME2:LT:160000)) )'
			,'')
	,'11'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:160000 AND COL_128:TIME2:GT:160000) OR (COL_127:TIME2:GTE:160000 AND COL_127:TIME2:LT:170000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:160000 AND COL_130:TIME2:GT:160000) OR (COL_129:TIME2:GTE:160000 AND COL_129:TIME2:LT:170000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:160000 AND COL_132:TIME2:GT:160000) OR (COL_131:TIME2:GTE:160000 AND COL_131:TIME2:LT:170000)) )'
			,'')
	,'12'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:170000 AND COL_128:TIME2:GT:170000) OR (COL_127:TIME2:GTE:170000 AND COL_127:TIME2:LT:180000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:170000 AND COL_130:TIME2:GT:170000) OR (COL_129:TIME2:GTE:170000 AND COL_129:TIME2:LT:180000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:170000 AND COL_132:TIME2:GT:170000) OR (COL_131:TIME2:GTE:170000 AND COL_131:TIME2:LT:180000)) )'
			,'')
	,'13'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:180000 AND COL_128:TIME2:GT:180000) OR (COL_127:TIME2:GTE:180000 AND COL_127:TIME2:LT:190000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:180000 AND COL_130:TIME2:GT:180000) OR (COL_129:TIME2:GTE:180000 AND COL_129:TIME2:LT:190000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:180000 AND COL_132:TIME2:GT:180000) OR (COL_131:TIME2:GTE:180000 AND COL_131:TIME2:LT:190000)) )'
			,'')
	,'14'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:190000 AND COL_128:TIME2:GT:190000) OR (COL_127:TIME2:GTE:190000 AND COL_127:TIME2:LT:200000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:190000 AND COL_130:TIME2:GT:190000) OR (COL_129:TIME2:GTE:190000 AND COL_129:TIME2:LT:200000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:190000 AND COL_132:TIME2:GT:190000) OR (COL_131:TIME2:GTE:190000 AND COL_131:TIME2:LT:200000)) )'
			,'')
	,'15'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:200000 AND COL_128:TIME2:GT:200000) OR (COL_127:TIME2:GTE:200000 AND COL_127:TIME2:LT:210000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:200000 AND COL_130:TIME2:GT:200000) OR (COL_129:TIME2:GTE:200000 AND COL_129:TIME2:LT:210000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:200000 AND COL_132:TIME2:GT:200000) OR (COL_131:TIME2:GTE:200000 AND COL_131:TIME2:LT:210000)) )'
			,'')
	,'16'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:210000 AND COL_128:TIME2:GT:210000) OR (COL_127:TIME2:GTE:210000 AND COL_127:TIME2:LT:220000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:210000 AND COL_130:TIME2:GT:210000) OR (COL_129:TIME2:GTE:210000 AND COL_129:TIME2:LT:220000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:210000 AND COL_132:TIME2:GT:210000) OR (COL_131:TIME2:GTE:210000 AND COL_131:TIME2:LT:220000)) )'
			,'')
	,'17'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:220000 AND COL_128:TIME2:GT:220000) OR (COL_127:TIME2:GTE:220000 AND COL_127:TIME2:LT:230000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:220000 AND COL_130:TIME2:GT:220000) OR (COL_129:TIME2:GTE:220000 AND COL_129:TIME2:LT:230000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:220000 AND COL_132:TIME2:GT:220000) OR (COL_131:TIME2:GTE:220000 AND COL_131:TIME2:LT:230000)) )'
			,'')
	,'18'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:230000 AND COL_128:TIME2:GT:230000) OR (COL_127:TIME2:GTE:230000 AND COL_127:TIME2:LT:240000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:230000 AND COL_130:TIME2:GT:230000) OR (COL_129:TIME2:GTE:230000 AND COL_129:TIME2:LT:240000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:230000 AND COL_132:TIME2:GT:230000) OR (COL_131:TIME2:GTE:230000 AND COL_131:TIME2:LT:240000)) )'
			,'')
	)


);
//    「変額年金保険」を選択した場合
$D_COND[104] = array(
'type'=>'SL'
,'opts'=>array(
	// 平日
	 '101'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:000000 AND COL_128:TIME2:GT:000000) OR (COL_127:TIME2:GTE:000000 AND COL_127:TIME2:LT:070000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:000000 AND COL_144:TIME2:GT:000000) OR (COL_143:TIME2:GTE:000000 AND COL_143:TIME2:LT:070000)) )','')
	,'102'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:070000 AND COL_128:TIME2:GT:070000) OR (COL_127:TIME2:GTE:070000 AND COL_127:TIME2:LT:080000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:070000 AND COL_144:TIME2:GT:070000) OR (COL_143:TIME2:GTE:070000 AND COL_143:TIME2:LT:080000)) )','')
	,'103'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:080000 AND COL_128:TIME2:GT:080000) OR (COL_127:TIME2:GTE:080000 AND COL_127:TIME2:LT:090000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:080000 AND COL_144:TIME2:GT:080000) OR (COL_143:TIME2:GTE:080000 AND COL_143:TIME2:LT:090000)) )','')
	,'104'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:090000 AND COL_128:TIME2:GT:090000) OR (COL_127:TIME2:GTE:090000 AND COL_127:TIME2:LT:100000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:090000 AND COL_144:TIME2:GT:090000) OR (COL_143:TIME2:GTE:090000 AND COL_143:TIME2:LT:100000)) )','')
	,'105'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:100000 AND COL_128:TIME2:GT:100000) OR (COL_127:TIME2:GTE:100000 AND COL_127:TIME2:LT:110000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:100000 AND COL_144:TIME2:GT:100000) OR (COL_143:TIME2:GTE:100000 AND COL_143:TIME2:LT:110000)) )','')
	,'106'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:110000 AND COL_128:TIME2:GT:110000) OR (COL_127:TIME2:GTE:110000 AND COL_127:TIME2:LT:120000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:110000 AND COL_144:TIME2:GT:110000) OR (COL_143:TIME2:GTE:110000 AND COL_143:TIME2:LT:120000)) )','')
	,'107'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:120000 AND COL_128:TIME2:GT:120000) OR (COL_127:TIME2:GTE:120000 AND COL_127:TIME2:LT:130000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:120000 AND COL_144:TIME2:GT:120000) OR (COL_143:TIME2:GTE:120000 AND COL_143:TIME2:LT:130000)) )','')
	,'108'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:130000 AND COL_128:TIME2:GT:130000) OR (COL_127:TIME2:GTE:130000 AND COL_127:TIME2:LT:140000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:130000 AND COL_144:TIME2:GT:130000) OR (COL_143:TIME2:GTE:130000 AND COL_143:TIME2:LT:140000)) )','')
	,'109'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:140000 AND COL_128:TIME2:GT:140000) OR (COL_127:TIME2:GTE:140000 AND COL_127:TIME2:LT:150000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:140000 AND COL_144:TIME2:GT:140000) OR (COL_143:TIME2:GTE:140000 AND COL_143:TIME2:LT:150000)) )','')
	,'110'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:150000 AND COL_128:TIME2:GT:150000) OR (COL_127:TIME2:GTE:150000 AND COL_127:TIME2:LT:160000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:150000 AND COL_144:TIME2:GT:150000) OR (COL_143:TIME2:GTE:150000 AND COL_143:TIME2:LT:160000)) )','')
	,'111'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:160000 AND COL_128:TIME2:GT:160000) OR (COL_127:TIME2:GTE:160000 AND COL_127:TIME2:LT:170000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:160000 AND COL_144:TIME2:GT:160000) OR (COL_143:TIME2:GTE:160000 AND COL_143:TIME2:LT:170000)) )','')
	,'112'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:170000 AND COL_128:TIME2:GT:170000) OR (COL_127:TIME2:GTE:170000 AND COL_127:TIME2:LT:180000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:170000 AND COL_144:TIME2:GT:170000) OR (COL_143:TIME2:GTE:170000 AND COL_143:TIME2:LT:180000)) )','')
	,'113'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:180000 AND COL_128:TIME2:GT:180000) OR (COL_127:TIME2:GTE:180000 AND COL_127:TIME2:LT:190000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:180000 AND COL_144:TIME2:GT:180000) OR (COL_143:TIME2:GTE:180000 AND COL_143:TIME2:LT:190000)) )','')
	,'114'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:190000 AND COL_128:TIME2:GT:190000) OR (COL_127:TIME2:GTE:190000 AND COL_127:TIME2:LT:200000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:190000 AND COL_144:TIME2:GT:190000) OR (COL_143:TIME2:GTE:190000 AND COL_143:TIME2:LT:200000)) )','')
	,'115'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:200000 AND COL_128:TIME2:GT:200000) OR (COL_127:TIME2:GTE:200000 AND COL_127:TIME2:LT:210000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:200000 AND COL_144:TIME2:GT:200000) OR (COL_143:TIME2:GTE:200000 AND COL_143:TIME2:LT:210000)) )','')
	,'116'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:210000 AND COL_128:TIME2:GT:210000) OR (COL_127:TIME2:GTE:210000 AND COL_127:TIME2:LT:220000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:210000 AND COL_144:TIME2:GT:210000) OR (COL_143:TIME2:GTE:210000 AND COL_143:TIME2:LT:220000)) )','')
	,'117'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:220000 AND COL_128:TIME2:GT:220000) OR (COL_127:TIME2:GTE:220000 AND COL_127:TIME2:LT:230000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:220000 AND COL_144:TIME2:GT:220000) OR (COL_143:TIME2:GTE:220000 AND COL_143:TIME2:LT:230000)) )','')
	,'118'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:230000 AND COL_128:TIME2:GT:230000) OR (COL_127:TIME2:GTE:230000 AND COL_127:TIME2:LT:240000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:230000 AND COL_144:TIME2:GT:230000) OR (COL_143:TIME2:GTE:230000 AND COL_143:TIME2:LT:240000)) )','')
	// 土曜
	,'201'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:000000 AND COL_130:TIME2:GT:000000) OR (COL_129:TIME2:GTE:000000 AND COL_129:TIME2:LT:070000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:000000 AND COL_146:TIME2:GT:000000) OR (COL_145:TIME2:GTE:000000 AND COL_145:TIME2:LT:070000)) )','')
	,'202'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:070000 AND COL_130:TIME2:GT:070000) OR (COL_129:TIME2:GTE:070000 AND COL_129:TIME2:LT:080000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:070000 AND COL_146:TIME2:GT:070000) OR (COL_145:TIME2:GTE:070000 AND COL_145:TIME2:LT:080000)) )','')
	,'203'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:080000 AND COL_130:TIME2:GT:080000) OR (COL_129:TIME2:GTE:080000 AND COL_129:TIME2:LT:090000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:080000 AND COL_146:TIME2:GT:080000) OR (COL_145:TIME2:GTE:080000 AND COL_145:TIME2:LT:090000)) )','')
	,'204'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:090000 AND COL_130:TIME2:GT:090000) OR (COL_129:TIME2:GTE:090000 AND COL_129:TIME2:LT:100000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:090000 AND COL_146:TIME2:GT:090000) OR (COL_145:TIME2:GTE:090000 AND COL_145:TIME2:LT:100000)) )','')
	,'205'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:100000 AND COL_130:TIME2:GT:100000) OR (COL_129:TIME2:GTE:100000 AND COL_129:TIME2:LT:110000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:100000 AND COL_146:TIME2:GT:100000) OR (COL_145:TIME2:GTE:100000 AND COL_145:TIME2:LT:110000)) )','')
	,'206'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:110000 AND COL_130:TIME2:GT:110000) OR (COL_129:TIME2:GTE:110000 AND COL_129:TIME2:LT:120000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:110000 AND COL_146:TIME2:GT:110000) OR (COL_145:TIME2:GTE:110000 AND COL_145:TIME2:LT:120000)) )','')
	,'207'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:120000 AND COL_130:TIME2:GT:120000) OR (COL_129:TIME2:GTE:120000 AND COL_129:TIME2:LT:130000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:120000 AND COL_146:TIME2:GT:120000) OR (COL_145:TIME2:GTE:120000 AND COL_145:TIME2:LT:130000)) )','')
	,'208'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:130000 AND COL_130:TIME2:GT:130000) OR (COL_129:TIME2:GTE:130000 AND COL_129:TIME2:LT:140000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:130000 AND COL_146:TIME2:GT:130000) OR (COL_145:TIME2:GTE:130000 AND COL_145:TIME2:LT:140000)) )','')
	,'209'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:140000 AND COL_130:TIME2:GT:140000) OR (COL_129:TIME2:GTE:140000 AND COL_129:TIME2:LT:150000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:140000 AND COL_146:TIME2:GT:140000) OR (COL_145:TIME2:GTE:140000 AND COL_145:TIME2:LT:150000)) )','')
	,'210'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:150000 AND COL_130:TIME2:GT:150000) OR (COL_129:TIME2:GTE:150000 AND COL_129:TIME2:LT:160000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:150000 AND COL_146:TIME2:GT:150000) OR (COL_145:TIME2:GTE:150000 AND COL_145:TIME2:LT:160000)) )','')
	,'211'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:160000 AND COL_130:TIME2:GT:160000) OR (COL_129:TIME2:GTE:160000 AND COL_129:TIME2:LT:170000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:160000 AND COL_146:TIME2:GT:160000) OR (COL_145:TIME2:GTE:160000 AND COL_145:TIME2:LT:170000)) )','')
	,'212'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:170000 AND COL_130:TIME2:GT:170000) OR (COL_129:TIME2:GTE:170000 AND COL_129:TIME2:LT:180000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:170000 AND COL_146:TIME2:GT:170000) OR (COL_145:TIME2:GTE:170000 AND COL_145:TIME2:LT:180000)) )','')
	,'213'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:180000 AND COL_130:TIME2:GT:180000) OR (COL_129:TIME2:GTE:180000 AND COL_129:TIME2:LT:190000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:180000 AND COL_146:TIME2:GT:180000) OR (COL_145:TIME2:GTE:180000 AND COL_145:TIME2:LT:190000)) )','')
	,'214'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:190000 AND COL_130:TIME2:GT:190000) OR (COL_129:TIME2:GTE:190000 AND COL_129:TIME2:LT:200000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:190000 AND COL_146:TIME2:GT:190000) OR (COL_145:TIME2:GTE:190000 AND COL_145:TIME2:LT:200000)) )','')
	,'215'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:200000 AND COL_130:TIME2:GT:200000) OR (COL_129:TIME2:GTE:200000 AND COL_129:TIME2:LT:210000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:200000 AND COL_146:TIME2:GT:200000) OR (COL_145:TIME2:GTE:200000 AND COL_145:TIME2:LT:210000)) )','')
	,'216'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:210000 AND COL_130:TIME2:GT:210000) OR (COL_129:TIME2:GTE:210000 AND COL_129:TIME2:LT:220000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:210000 AND COL_146:TIME2:GT:210000) OR (COL_145:TIME2:GTE:210000 AND COL_145:TIME2:LT:220000)) )','')
	,'217'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:220000 AND COL_130:TIME2:GT:220000) OR (COL_129:TIME2:GTE:220000 AND COL_129:TIME2:LT:230000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:220000 AND COL_146:TIME2:GT:220000) OR (COL_145:TIME2:GTE:220000 AND COL_145:TIME2:LT:230000)) )','')
	,'218'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:230000 AND COL_130:TIME2:GT:230000) OR (COL_129:TIME2:GTE:230000 AND COL_129:TIME2:LT:240000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:230000 AND COL_146:TIME2:GT:230000) OR (COL_145:TIME2:GTE:230000 AND COL_145:TIME2:LT:240000)) )','')
	// 日曜・休日
	,'301'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:000000 AND COL_132:TIME2:GT:000000) OR (COL_131:TIME2:GTE:000000 AND COL_131:TIME2:LT:070000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:000000 AND COL_148:TIME2:GT:000000) OR (COL_147:TIME2:GTE:000000 AND COL_147:TIME2:LT:070000)) )','')
	,'302'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:070000 AND COL_132:TIME2:GT:070000) OR (COL_131:TIME2:GTE:070000 AND COL_131:TIME2:LT:080000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:070000 AND COL_148:TIME2:GT:070000) OR (COL_147:TIME2:GTE:070000 AND COL_147:TIME2:LT:080000)) )','')
	,'303'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:080000 AND COL_132:TIME2:GT:080000) OR (COL_131:TIME2:GTE:080000 AND COL_131:TIME2:LT:090000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:080000 AND COL_148:TIME2:GT:080000) OR (COL_147:TIME2:GTE:080000 AND COL_147:TIME2:LT:090000)) )','')
	,'304'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:090000 AND COL_132:TIME2:GT:090000) OR (COL_131:TIME2:GTE:090000 AND COL_131:TIME2:LT:100000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:090000 AND COL_148:TIME2:GT:090000) OR (COL_147:TIME2:GTE:090000 AND COL_147:TIME2:LT:100000)) )','')
	,'305'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:100000 AND COL_132:TIME2:GT:100000) OR (COL_131:TIME2:GTE:100000 AND COL_131:TIME2:LT:110000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:100000 AND COL_148:TIME2:GT:100000) OR (COL_147:TIME2:GTE:100000 AND COL_147:TIME2:LT:110000)) )','')
	,'306'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:110000 AND COL_132:TIME2:GT:110000) OR (COL_131:TIME2:GTE:110000 AND COL_131:TIME2:LT:120000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:110000 AND COL_148:TIME2:GT:110000) OR (COL_147:TIME2:GTE:110000 AND COL_147:TIME2:LT:120000)) )','')
	,'307'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:120000 AND COL_132:TIME2:GT:120000) OR (COL_131:TIME2:GTE:120000 AND COL_131:TIME2:LT:130000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:120000 AND COL_148:TIME2:GT:120000) OR (COL_147:TIME2:GTE:120000 AND COL_147:TIME2:LT:130000)) )','')
	,'308'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:130000 AND COL_132:TIME2:GT:130000) OR (COL_131:TIME2:GTE:130000 AND COL_131:TIME2:LT:140000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:130000 AND COL_148:TIME2:GT:130000) OR (COL_147:TIME2:GTE:130000 AND COL_147:TIME2:LT:140000)) )','')
	,'309'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:140000 AND COL_132:TIME2:GT:140000) OR (COL_131:TIME2:GTE:140000 AND COL_131:TIME2:LT:150000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:140000 AND COL_148:TIME2:GT:140000) OR (COL_147:TIME2:GTE:140000 AND COL_147:TIME2:LT:150000)) )','')
	,'310'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:150000 AND COL_132:TIME2:GT:150000) OR (COL_131:TIME2:GTE:150000 AND COL_131:TIME2:LT:160000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:150000 AND COL_148:TIME2:GT:150000) OR (COL_147:TIME2:GTE:150000 AND COL_147:TIME2:LT:160000)) )','')
	,'311'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:160000 AND COL_132:TIME2:GT:160000) OR (COL_131:TIME2:GTE:160000 AND COL_131:TIME2:LT:170000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:160000 AND COL_148:TIME2:GT:160000) OR (COL_147:TIME2:GTE:160000 AND COL_147:TIME2:LT:170000)) )','')
	,'312'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:170000 AND COL_132:TIME2:GT:170000) OR (COL_131:TIME2:GTE:170000 AND COL_131:TIME2:LT:180000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:170000 AND COL_148:TIME2:GT:170000) OR (COL_147:TIME2:GTE:170000 AND COL_147:TIME2:LT:180000)) )','')
	,'313'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:180000 AND COL_132:TIME2:GT:180000) OR (COL_131:TIME2:GTE:180000 AND COL_131:TIME2:LT:190000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:180000 AND COL_148:TIME2:GT:180000) OR (COL_147:TIME2:GTE:180000 AND COL_147:TIME2:LT:190000)) )','')
	,'314'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:190000 AND COL_132:TIME2:GT:190000) OR (COL_131:TIME2:GTE:190000 AND COL_131:TIME2:LT:200000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:190000 AND COL_148:TIME2:GT:190000) OR (COL_147:TIME2:GTE:190000 AND COL_147:TIME2:LT:200000)) )','')
	,'315'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:200000 AND COL_132:TIME2:GT:200000) OR (COL_131:TIME2:GTE:200000 AND COL_131:TIME2:LT:210000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:200000 AND COL_148:TIME2:GT:200000) OR (COL_147:TIME2:GTE:200000 AND COL_147:TIME2:LT:210000)) )','')
	,'316'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:210000 AND COL_132:TIME2:GT:210000) OR (COL_131:TIME2:GTE:210000 AND COL_131:TIME2:LT:220000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:210000 AND COL_148:TIME2:GT:210000) OR (COL_147:TIME2:GTE:210000 AND COL_147:TIME2:LT:220000)) )','')
	,'317'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:220000 AND COL_132:TIME2:GT:220000) OR (COL_131:TIME2:GTE:220000 AND COL_131:TIME2:LT:230000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:220000 AND COL_148:TIME2:GT:220000) OR (COL_147:TIME2:GTE:220000 AND COL_147:TIME2:LT:230000)) )','')
	,'318'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:230000 AND COL_132:TIME2:GT:230000) OR (COL_131:TIME2:GTE:230000 AND COL_131:TIME2:LT:240000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:230000 AND COL_148:TIME2:GT:230000) OR (COL_147:TIME2:GTE:230000 AND COL_147:TIME2:LT:240000)) )','')
	// 曜日のみ
	,'1'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_127!:@@NULL@@ AND COL_128!:00:00:00 AND COL_128!:@@NULL@@ ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_143!:@@NULL@@ AND COL_144!:00:00:00 AND COL_144!:@@NULL@@ )','')
	,'2'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_129!:@@NULL@@ AND COL_130!:00:00:00 AND COL_130!:@@NULL@@ ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_145!:@@NULL@@ AND COL_146!:00:00:00 AND COL_146!:@@NULL@@ )','')
	,'3'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_131!:@@NULL@@ AND COL_132!:00:00:00 AND COL_132!:@@NULL@@ ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_147!:@@NULL@@ AND COL_148!:00:00:00 AND COL_148!:@@NULL@@ )','')
	// 時間帯のみ
	,'01'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:000000 AND COL_128:TIME2:GT:000000) OR (COL_127:TIME2:GTE:000000 AND COL_127:TIME2:LT:070000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:000000 AND COL_144:TIME2:GT:000000) OR (COL_143:TIME2:GTE:000000 AND COL_143:TIME2:LT:070000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:000000 AND COL_130:TIME2:GT:000000) OR (COL_129:TIME2:GTE:000000 AND COL_129:TIME2:LT:070000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:000000 AND COL_146:TIME2:GT:000000) OR (COL_145:TIME2:GTE:000000 AND COL_145:TIME2:LT:070000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:000000 AND COL_132:TIME2:GT:000000) OR (COL_131:TIME2:GTE:000000 AND COL_131:TIME2:LT:070000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:000000 AND COL_148:TIME2:GT:000000) OR (COL_147:TIME2:GTE:000000 AND COL_147:TIME2:LT:070000)) ) )'
			,'')
	,'02'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:070000 AND COL_128:TIME2:GT:070000) OR (COL_127:TIME2:GTE:070000 AND COL_127:TIME2:LT:080000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:070000 AND COL_144:TIME2:GT:070000) OR (COL_143:TIME2:GTE:070000 AND COL_143:TIME2:LT:080000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:070000 AND COL_130:TIME2:GT:070000) OR (COL_129:TIME2:GTE:070000 AND COL_129:TIME2:LT:080000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:070000 AND COL_146:TIME2:GT:070000) OR (COL_145:TIME2:GTE:070000 AND COL_145:TIME2:LT:080000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:070000 AND COL_132:TIME2:GT:070000) OR (COL_131:TIME2:GTE:070000 AND COL_131:TIME2:LT:080000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:070000 AND COL_148:TIME2:GT:070000) OR (COL_147:TIME2:GTE:070000 AND COL_147:TIME2:LT:080000)) ) )'
			,'')
	,'03'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:080000 AND COL_128:TIME2:GT:080000) OR (COL_127:TIME2:GTE:080000 AND COL_127:TIME2:LT:090000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:080000 AND COL_144:TIME2:GT:080000) OR (COL_143:TIME2:GTE:080000 AND COL_143:TIME2:LT:090000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:080000 AND COL_130:TIME2:GT:080000) OR (COL_129:TIME2:GTE:080000 AND COL_129:TIME2:LT:090000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:080000 AND COL_146:TIME2:GT:080000) OR (COL_145:TIME2:GTE:080000 AND COL_145:TIME2:LT:090000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:080000 AND COL_132:TIME2:GT:080000) OR (COL_131:TIME2:GTE:080000 AND COL_131:TIME2:LT:090000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:080000 AND COL_148:TIME2:GT:080000) OR (COL_147:TIME2:GTE:080000 AND COL_147:TIME2:LT:090000)) ) )'
			,'')
	,'04'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:090000 AND COL_128:TIME2:GT:090000) OR (COL_127:TIME2:GTE:090000 AND COL_127:TIME2:LT:100000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:090000 AND COL_144:TIME2:GT:090000) OR (COL_143:TIME2:GTE:090000 AND COL_143:TIME2:LT:100000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:090000 AND COL_132:TIME2:GT:090000) OR (COL_131:TIME2:GTE:090000 AND COL_131:TIME2:LT:100000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:090000 AND COL_148:TIME2:GT:090000) OR (COL_147:TIME2:GTE:090000 AND COL_147:TIME2:LT:100000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:090000 AND COL_130:TIME2:GT:090000) OR (COL_129:TIME2:GTE:090000 AND COL_129:TIME2:LT:100000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:090000 AND COL_146:TIME2:GT:090000) OR (COL_145:TIME2:GTE:090000 AND COL_145:TIME2:LT:100000)) ) )'
			,'')
	,'05'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:100000 AND COL_128:TIME2:GT:100000) OR (COL_127:TIME2:GTE:100000 AND COL_127:TIME2:LT:110000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:100000 AND COL_144:TIME2:GT:100000) OR (COL_143:TIME2:GTE:100000 AND COL_143:TIME2:LT:110000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:100000 AND COL_130:TIME2:GT:100000) OR (COL_129:TIME2:GTE:100000 AND COL_129:TIME2:LT:110000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:100000 AND COL_146:TIME2:GT:100000) OR (COL_145:TIME2:GTE:100000 AND COL_145:TIME2:LT:110000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:100000 AND COL_132:TIME2:GT:100000) OR (COL_131:TIME2:GTE:100000 AND COL_131:TIME2:LT:110000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:100000 AND COL_148:TIME2:GT:100000) OR (COL_147:TIME2:GTE:100000 AND COL_147:TIME2:LT:110000)) ) )'
			,'')
	,'06'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:110000 AND COL_128:TIME2:GT:110000) OR (COL_127:TIME2:GTE:110000 AND COL_127:TIME2:LT:120000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:110000 AND COL_144:TIME2:GT:110000) OR (COL_143:TIME2:GTE:110000 AND COL_143:TIME2:LT:120000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:110000 AND COL_130:TIME2:GT:110000) OR (COL_129:TIME2:GTE:110000 AND COL_129:TIME2:LT:120000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:110000 AND COL_146:TIME2:GT:110000) OR (COL_145:TIME2:GTE:110000 AND COL_145:TIME2:LT:120000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:110000 AND COL_132:TIME2:GT:110000) OR (COL_131:TIME2:GTE:110000 AND COL_131:TIME2:LT:120000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:110000 AND COL_148:TIME2:GT:110000) OR (COL_147:TIME2:GTE:110000 AND COL_147:TIME2:LT:120000)) ) )'
			,'')
	,'07'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:120000 AND COL_128:TIME2:GT:120000) OR (COL_127:TIME2:GTE:120000 AND COL_127:TIME2:LT:130000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:120000 AND COL_144:TIME2:GT:120000) OR (COL_143:TIME2:GTE:120000 AND COL_143:TIME2:LT:130000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:120000 AND COL_130:TIME2:GT:120000) OR (COL_129:TIME2:GTE:120000 AND COL_129:TIME2:LT:130000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:120000 AND COL_146:TIME2:GT:120000) OR (COL_145:TIME2:GTE:120000 AND COL_145:TIME2:LT:130000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:120000 AND COL_132:TIME2:GT:120000) OR (COL_131:TIME2:GTE:120000 AND COL_131:TIME2:LT:130000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:120000 AND COL_148:TIME2:GT:120000) OR (COL_147:TIME2:GTE:120000 AND COL_147:TIME2:LT:130000)) ) )'
			,'')
	,'08'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:130000 AND COL_128:TIME2:GT:130000) OR (COL_127:TIME2:GTE:130000 AND COL_127:TIME2:LT:140000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:130000 AND COL_144:TIME2:GT:130000) OR (COL_143:TIME2:GTE:130000 AND COL_143:TIME2:LT:140000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:130000 AND COL_130:TIME2:GT:130000) OR (COL_129:TIME2:GTE:130000 AND COL_129:TIME2:LT:140000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:130000 AND COL_146:TIME2:GT:130000) OR (COL_145:TIME2:GTE:130000 AND COL_145:TIME2:LT:140000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:130000 AND COL_132:TIME2:GT:130000) OR (COL_131:TIME2:GTE:130000 AND COL_131:TIME2:LT:140000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:130000 AND COL_148:TIME2:GT:130000) OR (COL_147:TIME2:GTE:130000 AND COL_147:TIME2:LT:140000)) ) )'
			,'')
	,'09'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:140000 AND COL_128:TIME2:GT:140000) OR (COL_127:TIME2:GTE:140000 AND COL_127:TIME2:LT:150000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:140000 AND COL_144:TIME2:GT:140000) OR (COL_143:TIME2:GTE:140000 AND COL_143:TIME2:LT:150000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:140000 AND COL_130:TIME2:GT:140000) OR (COL_129:TIME2:GTE:140000 AND COL_129:TIME2:LT:150000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:140000 AND COL_146:TIME2:GT:140000) OR (COL_145:TIME2:GTE:140000 AND COL_145:TIME2:LT:150000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:140000 AND COL_132:TIME2:GT:140000) OR (COL_131:TIME2:GTE:140000 AND COL_131:TIME2:LT:150000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:140000 AND COL_148:TIME2:GT:140000) OR (COL_147:TIME2:GTE:140000 AND COL_147:TIME2:LT:150000)) ) )'
			,'')
	,'10'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:150000 AND COL_128:TIME2:GT:150000) OR (COL_127:TIME2:GTE:150000 AND COL_127:TIME2:LT:160000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:150000 AND COL_144:TIME2:GT:150000) OR (COL_143:TIME2:GTE:150000 AND COL_143:TIME2:LT:160000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:150000 AND COL_130:TIME2:GT:150000) OR (COL_129:TIME2:GTE:150000 AND COL_129:TIME2:LT:160000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:150000 AND COL_146:TIME2:GT:150000) OR (COL_145:TIME2:GTE:150000 AND COL_145:TIME2:LT:160000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:150000 AND COL_132:TIME2:GT:150000) OR (COL_131:TIME2:GTE:150000 AND COL_131:TIME2:LT:160000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:150000 AND COL_148:TIME2:GT:150000) OR (COL_147:TIME2:GTE:150000 AND COL_147:TIME2:LT:160000)) ) )'
			,'')
	,'11'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:160000 AND COL_128:TIME2:GT:160000) OR (COL_127:TIME2:GTE:160000 AND COL_127:TIME2:LT:170000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:160000 AND COL_144:TIME2:GT:160000) OR (COL_143:TIME2:GTE:160000 AND COL_143:TIME2:LT:170000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:160000 AND COL_130:TIME2:GT:160000) OR (COL_129:TIME2:GTE:160000 AND COL_129:TIME2:LT:170000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:160000 AND COL_146:TIME2:GT:160000) OR (COL_145:TIME2:GTE:160000 AND COL_145:TIME2:LT:170000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:160000 AND COL_132:TIME2:GT:160000) OR (COL_131:TIME2:GTE:160000 AND COL_131:TIME2:LT:170000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:160000 AND COL_148:TIME2:GT:160000) OR (COL_147:TIME2:GTE:160000 AND COL_147:TIME2:LT:170000)) ) )'
			,'')
	,'12'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:170000 AND COL_128:TIME2:GT:170000) OR (COL_127:TIME2:GTE:170000 AND COL_127:TIME2:LT:180000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:170000 AND COL_144:TIME2:GT:170000) OR (COL_143:TIME2:GTE:170000 AND COL_143:TIME2:LT:180000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:170000 AND COL_130:TIME2:GT:170000) OR (COL_129:TIME2:GTE:170000 AND COL_129:TIME2:LT:180000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:170000 AND COL_146:TIME2:GT:170000) OR (COL_145:TIME2:GTE:170000 AND COL_145:TIME2:LT:180000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:170000 AND COL_132:TIME2:GT:170000) OR (COL_131:TIME2:GTE:170000 AND COL_131:TIME2:LT:180000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:170000 AND COL_148:TIME2:GT:170000) OR (COL_147:TIME2:GTE:170000 AND COL_147:TIME2:LT:180000)) ) )'
			,'')
	,'13'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:180000 AND COL_128:TIME2:GT:180000) OR (COL_127:TIME2:GTE:180000 AND COL_127:TIME2:LT:190000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:180000 AND COL_144:TIME2:GT:180000) OR (COL_143:TIME2:GTE:180000 AND COL_143:TIME2:LT:190000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:180000 AND COL_130:TIME2:GT:180000) OR (COL_129:TIME2:GTE:180000 AND COL_129:TIME2:LT:190000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:180000 AND COL_146:TIME2:GT:180000) OR (COL_145:TIME2:GTE:180000 AND COL_145:TIME2:LT:190000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:180000 AND COL_132:TIME2:GT:180000) OR (COL_131:TIME2:GTE:180000 AND COL_131:TIME2:LT:190000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:180000 AND COL_148:TIME2:GT:180000) OR (COL_147:TIME2:GTE:180000 AND COL_147:TIME2:LT:190000)) ) )'
			,'')
	,'14'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:190000 AND COL_128:TIME2:GT:190000) OR (COL_127:TIME2:GTE:190000 AND COL_127:TIME2:LT:200000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:190000 AND COL_144:TIME2:GT:190000) OR (COL_143:TIME2:GTE:190000 AND COL_143:TIME2:LT:200000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:190000 AND COL_130:TIME2:GT:190000) OR (COL_129:TIME2:GTE:190000 AND COL_129:TIME2:LT:200000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:190000 AND COL_146:TIME2:GT:190000) OR (COL_145:TIME2:GTE:190000 AND COL_145:TIME2:LT:200000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:190000 AND COL_132:TIME2:GT:190000) OR (COL_131:TIME2:GTE:190000 AND COL_131:TIME2:LT:200000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:190000 AND COL_148:TIME2:GT:190000) OR (COL_147:TIME2:GTE:190000 AND COL_147:TIME2:LT:200000)) ) )'
			,'')
	,'15'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:200000 AND COL_128:TIME2:GT:200000) OR (COL_127:TIME2:GTE:200000 AND COL_127:TIME2:LT:210000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:200000 AND COL_144:TIME2:GT:200000) OR (COL_143:TIME2:GTE:200000 AND COL_143:TIME2:LT:210000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:200000 AND COL_130:TIME2:GT:200000) OR (COL_129:TIME2:GTE:200000 AND COL_129:TIME2:LT:210000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:200000 AND COL_146:TIME2:GT:200000) OR (COL_145:TIME2:GTE:200000 AND COL_145:TIME2:LT:210000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:200000 AND COL_132:TIME2:GT:200000) OR (COL_131:TIME2:GTE:200000 AND COL_131:TIME2:LT:210000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:200000 AND COL_148:TIME2:GT:200000) OR (COL_147:TIME2:GTE:200000 AND COL_147:TIME2:LT:210000)) ) )'
			,'')
	,'16'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:210000 AND COL_128:TIME2:GT:210000) OR (COL_127:TIME2:GTE:210000 AND COL_127:TIME2:LT:220000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:210000 AND COL_144:TIME2:GT:210000) OR (COL_143:TIME2:GTE:210000 AND COL_143:TIME2:LT:220000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:210000 AND COL_130:TIME2:GT:210000) OR (COL_129:TIME2:GTE:210000 AND COL_129:TIME2:LT:220000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:210000 AND COL_146:TIME2:GT:210000) OR (COL_145:TIME2:GTE:210000 AND COL_145:TIME2:LT:220000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:210000 AND COL_132:TIME2:GT:210000) OR (COL_131:TIME2:GTE:210000 AND COL_131:TIME2:LT:220000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:210000 AND COL_148:TIME2:GT:210000) OR (COL_147:TIME2:GTE:210000 AND COL_147:TIME2:LT:220000)) ) )'
			,'')
	,'17'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:220000 AND COL_128:TIME2:GT:220000) OR (COL_127:TIME2:GTE:220000 AND COL_127:TIME2:LT:230000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:220000 AND COL_144:TIME2:GT:220000) OR (COL_143:TIME2:GTE:220000 AND COL_143:TIME2:LT:230000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:220000 AND COL_130:TIME2:GT:220000) OR (COL_129:TIME2:GTE:220000 AND COL_129:TIME2:LT:230000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:220000 AND COL_146:TIME2:GT:220000) OR (COL_145:TIME2:GTE:220000 AND COL_145:TIME2:LT:230000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:220000 AND COL_132:TIME2:GT:220000) OR (COL_131:TIME2:GTE:220000 AND COL_131:TIME2:LT:230000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:220000 AND COL_148:TIME2:GT:220000) OR (COL_147:TIME2:GTE:220000 AND COL_147:TIME2:LT:230000)) ) )'
			,'')
	,'18'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:230000 AND COL_128:TIME2:GT:230000) OR (COL_127:TIME2:GTE:230000 AND COL_127:TIME2:LT:240000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:230000 AND COL_144:TIME2:GT:230000) OR (COL_143:TIME2:GTE:230000 AND COL_143:TIME2:LT:240000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:230000 AND COL_130:TIME2:GT:230000) OR (COL_129:TIME2:GTE:230000 AND COL_129:TIME2:LT:240000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:230000 AND COL_146:TIME2:GT:230000) OR (COL_145:TIME2:GTE:230000 AND COL_145:TIME2:LT:240000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:230000 AND COL_132:TIME2:GT:230000) OR (COL_131:TIME2:GTE:230000 AND COL_131:TIME2:LT:240000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:230000 AND COL_148:TIME2:GT:230000) OR (COL_147:TIME2:GTE:230000 AND COL_147:TIME2:LT:240000)) ) )'
			,'')
	)
);
//「保険サービスから選ぶ」のご利用時間
//    「変額年金保険」以外を選択した場合
$D_COND[105] = array(
'type'=>'SL'
,'opts'=>array(
	// 平日
	 '101'=>array('(COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:000000 AND COL_144:TIME2:GT:000000) OR (COL_143:TIME2:GTE:000000 AND COL_143:TIME2:LT:070000))','')
	,'102'=>array('(COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:070000 AND COL_144:TIME2:GT:070000) OR (COL_143:TIME2:GTE:070000 AND COL_143:TIME2:LT:080000))','')
	,'103'=>array('(COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:080000 AND COL_144:TIME2:GT:080000) OR (COL_143:TIME2:GTE:080000 AND COL_143:TIME2:LT:090000))','')
	,'104'=>array('(COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:090000 AND COL_144:TIME2:GT:090000) OR (COL_143:TIME2:GTE:090000 AND COL_143:TIME2:LT:100000))','')
	,'105'=>array('(COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:100000 AND COL_144:TIME2:GT:100000) OR (COL_143:TIME2:GTE:100000 AND COL_143:TIME2:LT:110000))','')
	,'106'=>array('(COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:110000 AND COL_144:TIME2:GT:110000) OR (COL_143:TIME2:GTE:110000 AND COL_143:TIME2:LT:120000))','')
	,'107'=>array('(COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:120000 AND COL_144:TIME2:GT:120000) OR (COL_143:TIME2:GTE:120000 AND COL_143:TIME2:LT:130000))','')
	,'108'=>array('(COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:130000 AND COL_144:TIME2:GT:130000) OR (COL_143:TIME2:GTE:130000 AND COL_143:TIME2:LT:140000))','')
	,'109'=>array('(COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:140000 AND COL_144:TIME2:GT:140000) OR (COL_143:TIME2:GTE:140000 AND COL_143:TIME2:LT:150000))','')
	,'110'=>array('(COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:150000 AND COL_144:TIME2:GT:150000) OR (COL_143:TIME2:GTE:150000 AND COL_143:TIME2:LT:160000))','')
	,'111'=>array('(COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:160000 AND COL_144:TIME2:GT:160000) OR (COL_143:TIME2:GTE:160000 AND COL_143:TIME2:LT:170000))','')
	,'112'=>array('(COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:170000 AND COL_144:TIME2:GT:170000) OR (COL_143:TIME2:GTE:170000 AND COL_143:TIME2:LT:180000))','')
	,'113'=>array('(COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:180000 AND COL_144:TIME2:GT:180000) OR (COL_143:TIME2:GTE:180000 AND COL_143:TIME2:LT:190000))','')
	,'114'=>array('(COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:190000 AND COL_144:TIME2:GT:190000) OR (COL_143:TIME2:GTE:190000 AND COL_143:TIME2:LT:200000))','')
	,'115'=>array('(COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:200000 AND COL_144:TIME2:GT:200000) OR (COL_143:TIME2:GTE:200000 AND COL_143:TIME2:LT:210000))','')
	,'116'=>array('(COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:210000 AND COL_144:TIME2:GT:210000) OR (COL_143:TIME2:GTE:210000 AND COL_143:TIME2:LT:220000))','')
	,'117'=>array('(COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:220000 AND COL_144:TIME2:GT:220000) OR (COL_143:TIME2:GTE:220000 AND COL_143:TIME2:LT:230000))','')
	,'118'=>array('(COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:230000 AND COL_144:TIME2:GT:230000) OR (COL_143:TIME2:GTE:230000 AND COL_143:TIME2:LT:240000))','')
	// 土曜
	,'201'=>array('(COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:000000 AND COL_146:TIME2:GT:000000) OR (COL_145:TIME2:GTE:000000 AND COL_145:TIME2:LT:070000))','')
	,'202'=>array('(COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:070000 AND COL_146:TIME2:GT:070000) OR (COL_145:TIME2:GTE:070000 AND COL_145:TIME2:LT:080000))','')
	,'203'=>array('(COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:080000 AND COL_146:TIME2:GT:080000) OR (COL_145:TIME2:GTE:080000 AND COL_145:TIME2:LT:090000))','')
	,'204'=>array('(COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:090000 AND COL_146:TIME2:GT:090000) OR (COL_145:TIME2:GTE:090000 AND COL_145:TIME2:LT:100000))','')
	,'205'=>array('(COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:100000 AND COL_146:TIME2:GT:100000) OR (COL_145:TIME2:GTE:100000 AND COL_145:TIME2:LT:110000))','')
	,'206'=>array('(COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:110000 AND COL_146:TIME2:GT:110000) OR (COL_145:TIME2:GTE:110000 AND COL_145:TIME2:LT:120000))','')
	,'207'=>array('(COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:120000 AND COL_146:TIME2:GT:120000) OR (COL_145:TIME2:GTE:120000 AND COL_145:TIME2:LT:130000))','')
	,'208'=>array('(COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:130000 AND COL_146:TIME2:GT:130000) OR (COL_145:TIME2:GTE:130000 AND COL_145:TIME2:LT:140000))','')
	,'209'=>array('(COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:140000 AND COL_146:TIME2:GT:140000) OR (COL_145:TIME2:GTE:140000 AND COL_145:TIME2:LT:150000))','')
	,'210'=>array('(COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:150000 AND COL_146:TIME2:GT:150000) OR (COL_145:TIME2:GTE:150000 AND COL_145:TIME2:LT:160000))','')
	,'211'=>array('(COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:160000 AND COL_146:TIME2:GT:160000) OR (COL_145:TIME2:GTE:160000 AND COL_145:TIME2:LT:170000))','')
	,'212'=>array('(COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:170000 AND COL_146:TIME2:GT:170000) OR (COL_145:TIME2:GTE:170000 AND COL_145:TIME2:LT:180000))','')
	,'213'=>array('(COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:180000 AND COL_146:TIME2:GT:180000) OR (COL_145:TIME2:GTE:180000 AND COL_145:TIME2:LT:190000))','')
	,'214'=>array('(COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:190000 AND COL_146:TIME2:GT:190000) OR (COL_145:TIME2:GTE:190000 AND COL_145:TIME2:LT:200000))','')
	,'215'=>array('(COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:200000 AND COL_146:TIME2:GT:200000) OR (COL_145:TIME2:GTE:200000 AND COL_145:TIME2:LT:210000))','')
	,'216'=>array('(COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:210000 AND COL_146:TIME2:GT:210000) OR (COL_145:TIME2:GTE:210000 AND COL_145:TIME2:LT:220000))','')
	,'217'=>array('(COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:220000 AND COL_146:TIME2:GT:220000) OR (COL_145:TIME2:GTE:220000 AND COL_145:TIME2:LT:230000))','')
	,'218'=>array('(COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:230000 AND COL_146:TIME2:GT:230000) OR (COL_145:TIME2:GTE:230000 AND COL_145:TIME2:LT:240000))','')
	// 日曜・休日
	,'301'=>array('(COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:000000 AND COL_148:TIME2:GT:000000) OR (COL_147:TIME2:GTE:000000 AND COL_147:TIME2:LT:070000))','')
	,'302'=>array('(COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:070000 AND COL_148:TIME2:GT:070000) OR (COL_147:TIME2:GTE:070000 AND COL_147:TIME2:LT:080000))','')
	,'303'=>array('(COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:080000 AND COL_148:TIME2:GT:080000) OR (COL_147:TIME2:GTE:080000 AND COL_147:TIME2:LT:090000))','')
	,'304'=>array('(COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:090000 AND COL_148:TIME2:GT:090000) OR (COL_147:TIME2:GTE:090000 AND COL_147:TIME2:LT:100000))','')
	,'305'=>array('(COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:100000 AND COL_148:TIME2:GT:100000) OR (COL_147:TIME2:GTE:100000 AND COL_147:TIME2:LT:110000))','')
	,'306'=>array('(COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:110000 AND COL_148:TIME2:GT:110000) OR (COL_147:TIME2:GTE:110000 AND COL_147:TIME2:LT:120000))','')
	,'307'=>array('(COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:120000 AND COL_148:TIME2:GT:120000) OR (COL_147:TIME2:GTE:120000 AND COL_147:TIME2:LT:130000))','')
	,'308'=>array('(COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:130000 AND COL_148:TIME2:GT:130000) OR (COL_147:TIME2:GTE:130000 AND COL_147:TIME2:LT:140000))','')
	,'309'=>array('(COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:140000 AND COL_148:TIME2:GT:140000) OR (COL_147:TIME2:GTE:140000 AND COL_147:TIME2:LT:150000))','')
	,'310'=>array('(COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:150000 AND COL_148:TIME2:GT:150000) OR (COL_147:TIME2:GTE:150000 AND COL_147:TIME2:LT:160000))','')
	,'311'=>array('(COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:160000 AND COL_148:TIME2:GT:160000) OR (COL_147:TIME2:GTE:160000 AND COL_147:TIME2:LT:170000))','')
	,'312'=>array('(COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:170000 AND COL_148:TIME2:GT:170000) OR (COL_147:TIME2:GTE:170000 AND COL_147:TIME2:LT:180000))','')
	,'313'=>array('(COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:180000 AND COL_148:TIME2:GT:180000) OR (COL_147:TIME2:GTE:180000 AND COL_147:TIME2:LT:190000))','')
	,'314'=>array('(COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:190000 AND COL_148:TIME2:GT:190000) OR (COL_147:TIME2:GTE:190000 AND COL_147:TIME2:LT:200000))','')
	,'315'=>array('(COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:200000 AND COL_148:TIME2:GT:200000) OR (COL_147:TIME2:GTE:200000 AND COL_147:TIME2:LT:210000))','')
	,'316'=>array('(COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:210000 AND COL_148:TIME2:GT:210000) OR (COL_147:TIME2:GTE:210000 AND COL_147:TIME2:LT:220000))','')
	,'317'=>array('(COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:220000 AND COL_148:TIME2:GT:220000) OR (COL_147:TIME2:GTE:220000 AND COL_147:TIME2:LT:230000))','')
	,'318'=>array('(COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:230000 AND COL_148:TIME2:GT:230000) OR (COL_147:TIME2:GTE:230000 AND COL_147:TIME2:LT:240000))','')
	// 曜日のみ
	,'1'=>array('(COL_143!:00:00:00 AND COL_143!:@@NULL@@) OR (COL_144!:00:00:00 AND COL_144!:@@NULL@@)','')
	,'2'=>array('(COL_145!:00:00:00 AND COL_145!:@@NULL@@) OR (COL_146!:00:00:00 AND COL_146!:@@NULL@@)','')
	,'3'=>array('(COL_147!:00:00:00 AND COL_147!:@@NULL@@) OR (COL_148!:00:00:00 AND COL_148!:@@NULL@@)','')
	// 時間帯のみ
	,'01'=>array(
				 '( (COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:000000 AND COL_144:TIME2:GT:000000) OR (COL_143:TIME2:GTE:000000 AND COL_143:TIME2:LT:070000)) )'
			.' OR ( (COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:000000 AND COL_146:TIME2:GT:000000) OR (COL_145:TIME2:GTE:000000 AND COL_145:TIME2:LT:070000)) )'
			.' OR ( (COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:000000 AND COL_148:TIME2:GT:000000) OR (COL_147:TIME2:GTE:000000 AND COL_147:TIME2:LT:070000)) )'
			,'')
	,'02'=>array(
				 '( (COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:070000 AND COL_144:TIME2:GT:070000) OR (COL_143:TIME2:GTE:070000 AND COL_143:TIME2:LT:080000)) )'
			.' OR ( (COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:070000 AND COL_146:TIME2:GT:070000) OR (COL_145:TIME2:GTE:070000 AND COL_145:TIME2:LT:080000)) )'
			.' OR ( (COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:070000 AND COL_148:TIME2:GT:070000) OR (COL_147:TIME2:GTE:070000 AND COL_147:TIME2:LT:080000)) )'
			,'')
	,'03'=>array(
				 '( (COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:080000 AND COL_144:TIME2:GT:080000) OR (COL_143:TIME2:GTE:080000 AND COL_143:TIME2:LT:090000)) )'
			.' OR ( (COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:080000 AND COL_146:TIME2:GT:080000) OR (COL_145:TIME2:GTE:080000 AND COL_145:TIME2:LT:090000)) )'
			.' OR ( (COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:080000 AND COL_148:TIME2:GT:080000) OR (COL_147:TIME2:GTE:080000 AND COL_147:TIME2:LT:090000)) )'
			,'')
	,'04'=>array(
				 '( (COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:090000 AND COL_144:TIME2:GT:090000) OR (COL_143:TIME2:GTE:090000 AND COL_143:TIME2:LT:100000)) )'
			.' OR ( (COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:090000 AND COL_146:TIME2:GT:090000) OR (COL_145:TIME2:GTE:090000 AND COL_145:TIME2:LT:100000)) )'
			.' OR ( (COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:090000 AND COL_148:TIME2:GT:090000) OR (COL_147:TIME2:GTE:090000 AND COL_147:TIME2:LT:100000)) )'
			,'')
	,'05'=>array(
				 '( (COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:100000 AND COL_144:TIME2:GT:100000) OR (COL_143:TIME2:GTE:100000 AND COL_143:TIME2:LT:110000)) )'
			.' OR ( (COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:100000 AND COL_146:TIME2:GT:100000) OR (COL_145:TIME2:GTE:100000 AND COL_145:TIME2:LT:110000)) )'
			.' OR ( (COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:100000 AND COL_148:TIME2:GT:100000) OR (COL_147:TIME2:GTE:100000 AND COL_147:TIME2:LT:110000)) )'
			,'')
	,'06'=>array(
				 '( (COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:110000 AND COL_144:TIME2:GT:110000) OR (COL_143:TIME2:GTE:110000 AND COL_143:TIME2:LT:120000)) )'
			.' OR ( (COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:110000 AND COL_146:TIME2:GT:110000) OR (COL_145:TIME2:GTE:110000 AND COL_145:TIME2:LT:120000)) )'
			.' OR ( (COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:110000 AND COL_148:TIME2:GT:110000) OR (COL_147:TIME2:GTE:110000 AND COL_147:TIME2:LT:120000)) )'
			,'')
	,'07'=>array(
				 '( (COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:120000 AND COL_144:TIME2:GT:120000) OR (COL_143:TIME2:GTE:120000 AND COL_143:TIME2:LT:130000)) )'
			.' OR ( (COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:120000 AND COL_146:TIME2:GT:120000) OR (COL_145:TIME2:GTE:120000 AND COL_145:TIME2:LT:130000)) )'
			.' OR ( (COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:120000 AND COL_148:TIME2:GT:120000) OR (COL_147:TIME2:GTE:120000 AND COL_147:TIME2:LT:130000)) )'
			,'')
	,'08'=>array(
				 '( (COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:130000 AND COL_144:TIME2:GT:130000) OR (COL_143:TIME2:GTE:130000 AND COL_143:TIME2:LT:140000)) )'
			.' OR ( (COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:130000 AND COL_146:TIME2:GT:130000) OR (COL_145:TIME2:GTE:130000 AND COL_145:TIME2:LT:140000)) )'
			.' OR ( (COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:130000 AND COL_148:TIME2:GT:130000) OR (COL_147:TIME2:GTE:130000 AND COL_147:TIME2:LT:140000)) )'
			,'')
	,'09'=>array(
				 '( (COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:140000 AND COL_144:TIME2:GT:140000) OR (COL_143:TIME2:GTE:140000 AND COL_143:TIME2:LT:150000)) )'
			.' OR ( (COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:140000 AND COL_146:TIME2:GT:140000) OR (COL_145:TIME2:GTE:140000 AND COL_145:TIME2:LT:150000)) )'
			.' OR ( (COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:140000 AND COL_148:TIME2:GT:140000) OR (COL_147:TIME2:GTE:140000 AND COL_147:TIME2:LT:150000)) )'
			,'')
	,'10'=>array(
				 '( (COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:150000 AND COL_144:TIME2:GT:150000) OR (COL_143:TIME2:GTE:150000 AND COL_143:TIME2:LT:160000)) )'
			.' OR ( (COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:150000 AND COL_146:TIME2:GT:150000) OR (COL_145:TIME2:GTE:150000 AND COL_145:TIME2:LT:160000)) )'
			.' OR ( (COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:150000 AND COL_148:TIME2:GT:150000) OR (COL_147:TIME2:GTE:150000 AND COL_147:TIME2:LT:160000)) )'
			,'')
	,'11'=>array(
				 '( (COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:160000 AND COL_144:TIME2:GT:160000) OR (COL_143:TIME2:GTE:160000 AND COL_143:TIME2:LT:170000)) )'
			.' OR ( (COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:160000 AND COL_146:TIME2:GT:160000) OR (COL_145:TIME2:GTE:160000 AND COL_145:TIME2:LT:170000)) )'
			.' OR ( (COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:160000 AND COL_148:TIME2:GT:160000) OR (COL_147:TIME2:GTE:160000 AND COL_147:TIME2:LT:170000)) )'
			,'')
	,'12'=>array(
				 '( (COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:170000 AND COL_144:TIME2:GT:170000) OR (COL_143:TIME2:GTE:170000 AND COL_143:TIME2:LT:180000)) )'
			.' OR ( (COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:170000 AND COL_146:TIME2:GT:170000) OR (COL_145:TIME2:GTE:170000 AND COL_145:TIME2:LT:180000)) )'
			.' OR ( (COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:170000 AND COL_148:TIME2:GT:170000) OR (COL_147:TIME2:GTE:170000 AND COL_147:TIME2:LT:180000)) )'
			,'')
	,'13'=>array(
				 '( (COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:180000 AND COL_144:TIME2:GT:180000) OR (COL_143:TIME2:GTE:180000 AND COL_143:TIME2:LT:190000)) )'
			.' OR ( (COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:180000 AND COL_146:TIME2:GT:180000) OR (COL_145:TIME2:GTE:180000 AND COL_145:TIME2:LT:190000)) )'
			.' OR ( (COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:180000 AND COL_148:TIME2:GT:180000) OR (COL_147:TIME2:GTE:180000 AND COL_147:TIME2:LT:190000)) )'
			,'')
	,'14'=>array(
				 '( (COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:190000 AND COL_144:TIME2:GT:190000) OR (COL_143:TIME2:GTE:190000 AND COL_143:TIME2:LT:200000)) )'
			.' OR ( (COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:190000 AND COL_146:TIME2:GT:190000) OR (COL_145:TIME2:GTE:190000 AND COL_145:TIME2:LT:200000)) )'
			.' OR ( (COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:190000 AND COL_148:TIME2:GT:190000) OR (COL_147:TIME2:GTE:190000 AND COL_147:TIME2:LT:200000)) )'
			,'')
	,'15'=>array(
				 '( (COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:200000 AND COL_144:TIME2:GT:200000) OR (COL_143:TIME2:GTE:200000 AND COL_143:TIME2:LT:210000)) )'
			.' OR ( (COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:200000 AND COL_146:TIME2:GT:200000) OR (COL_145:TIME2:GTE:200000 AND COL_145:TIME2:LT:210000)) )'
			.' OR ( (COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:200000 AND COL_148:TIME2:GT:200000) OR (COL_147:TIME2:GTE:200000 AND COL_147:TIME2:LT:210000)) )'
			,'')
	,'16'=>array(
				 '( (COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:210000 AND COL_144:TIME2:GT:210000) OR (COL_143:TIME2:GTE:210000 AND COL_143:TIME2:LT:220000)) )'
			.' OR ( (COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:210000 AND COL_146:TIME2:GT:210000) OR (COL_145:TIME2:GTE:210000 AND COL_145:TIME2:LT:220000)) )'
			.' OR ( (COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:210000 AND COL_148:TIME2:GT:210000) OR (COL_147:TIME2:GTE:210000 AND COL_147:TIME2:LT:220000)) )'
			,'')
	,'17'=>array(
				 '( (COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:220000 AND COL_144:TIME2:GT:220000) OR (COL_143:TIME2:GTE:220000 AND COL_143:TIME2:LT:230000)) )'
			.' OR ( (COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:220000 AND COL_146:TIME2:GT:220000) OR (COL_145:TIME2:GTE:220000 AND COL_145:TIME2:LT:230000)) )'
			.' OR ( (COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:220000 AND COL_148:TIME2:GT:220000) OR (COL_147:TIME2:GTE:220000 AND COL_147:TIME2:LT:230000)) )'
			,'')
	,'18'=>array(
				 '( (COL_143!:00:00:00 OR COL_144!:00:00:00) AND ((COL_143:TIME2:LTE:230000 AND COL_144:TIME2:GT:230000) OR (COL_143:TIME2:GTE:230000 AND COL_143:TIME2:LT:240000)) )'
			.' OR ( (COL_145!:00:00:00 OR COL_146!:00:00:00) AND ((COL_145:TIME2:LTE:230000 AND COL_146:TIME2:GT:230000) OR (COL_145:TIME2:GTE:230000 AND COL_145:TIME2:LT:240000)) )'
			.' OR ( (COL_147!:00:00:00 OR COL_148!:00:00:00) AND ((COL_147:TIME2:LTE:230000 AND COL_148:TIME2:GT:230000) OR (COL_147:TIME2:GTE:230000 AND COL_147:TIME2:LT:240000)) )'
			,'')
	)
);
//    「変額年金保険」を選択した場合
$D_COND[106] = array(
'type'=>'SL'
,'opts'=>array(
	// 平日
	 '101'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:000000 AND COL_128:TIME2:GT:000000) OR (COL_127:TIME2:GTE:000000 AND COL_127:TIME2:LT:070000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:000000 AND COL_144:TIME2:GT:000000) OR (COL_143:TIME2:GTE:000000 AND COL_143:TIME2:LT:070000)) )','')
	,'102'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:070000 AND COL_128:TIME2:GT:070000) OR (COL_127:TIME2:GTE:070000 AND COL_127:TIME2:LT:080000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:070000 AND COL_144:TIME2:GT:070000) OR (COL_143:TIME2:GTE:070000 AND COL_143:TIME2:LT:080000)) )','')
	,'103'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:080000 AND COL_128:TIME2:GT:080000) OR (COL_127:TIME2:GTE:080000 AND COL_127:TIME2:LT:090000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:080000 AND COL_144:TIME2:GT:080000) OR (COL_143:TIME2:GTE:080000 AND COL_143:TIME2:LT:090000)) )','')
	,'104'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:090000 AND COL_128:TIME2:GT:090000) OR (COL_127:TIME2:GTE:090000 AND COL_127:TIME2:LT:100000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:090000 AND COL_144:TIME2:GT:090000) OR (COL_143:TIME2:GTE:090000 AND COL_143:TIME2:LT:100000)) )','')
	,'105'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:100000 AND COL_128:TIME2:GT:100000) OR (COL_127:TIME2:GTE:100000 AND COL_127:TIME2:LT:110000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:100000 AND COL_144:TIME2:GT:100000) OR (COL_143:TIME2:GTE:100000 AND COL_143:TIME2:LT:110000)) )','')
	,'106'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:110000 AND COL_128:TIME2:GT:110000) OR (COL_127:TIME2:GTE:110000 AND COL_127:TIME2:LT:120000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:110000 AND COL_144:TIME2:GT:110000) OR (COL_143:TIME2:GTE:110000 AND COL_143:TIME2:LT:120000)) )','')
	,'107'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:120000 AND COL_128:TIME2:GT:120000) OR (COL_127:TIME2:GTE:120000 AND COL_127:TIME2:LT:130000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:120000 AND COL_144:TIME2:GT:120000) OR (COL_143:TIME2:GTE:120000 AND COL_143:TIME2:LT:130000)) )','')
	,'108'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:130000 AND COL_128:TIME2:GT:130000) OR (COL_127:TIME2:GTE:130000 AND COL_127:TIME2:LT:140000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:130000 AND COL_144:TIME2:GT:130000) OR (COL_143:TIME2:GTE:130000 AND COL_143:TIME2:LT:140000)) )','')
	,'109'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:140000 AND COL_128:TIME2:GT:140000) OR (COL_127:TIME2:GTE:140000 AND COL_127:TIME2:LT:150000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:140000 AND COL_144:TIME2:GT:140000) OR (COL_143:TIME2:GTE:140000 AND COL_143:TIME2:LT:150000)) )','')
	,'110'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:150000 AND COL_128:TIME2:GT:150000) OR (COL_127:TIME2:GTE:150000 AND COL_127:TIME2:LT:160000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:150000 AND COL_144:TIME2:GT:150000) OR (COL_143:TIME2:GTE:150000 AND COL_143:TIME2:LT:160000)) )','')
	,'111'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:160000 AND COL_128:TIME2:GT:160000) OR (COL_127:TIME2:GTE:160000 AND COL_127:TIME2:LT:170000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:160000 AND COL_144:TIME2:GT:160000) OR (COL_143:TIME2:GTE:160000 AND COL_143:TIME2:LT:170000)) )','')
	,'112'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:170000 AND COL_128:TIME2:GT:170000) OR (COL_127:TIME2:GTE:170000 AND COL_127:TIME2:LT:180000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:170000 AND COL_144:TIME2:GT:170000) OR (COL_143:TIME2:GTE:170000 AND COL_143:TIME2:LT:180000)) )','')
	,'113'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:180000 AND COL_128:TIME2:GT:180000) OR (COL_127:TIME2:GTE:180000 AND COL_127:TIME2:LT:190000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:180000 AND COL_144:TIME2:GT:180000) OR (COL_143:TIME2:GTE:180000 AND COL_143:TIME2:LT:190000)) )','')
	,'114'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:190000 AND COL_128:TIME2:GT:190000) OR (COL_127:TIME2:GTE:190000 AND COL_127:TIME2:LT:200000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:190000 AND COL_144:TIME2:GT:190000) OR (COL_143:TIME2:GTE:190000 AND COL_143:TIME2:LT:200000)) )','')
	,'115'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:200000 AND COL_128:TIME2:GT:200000) OR (COL_127:TIME2:GTE:200000 AND COL_127:TIME2:LT:210000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:200000 AND COL_144:TIME2:GT:200000) OR (COL_143:TIME2:GTE:200000 AND COL_143:TIME2:LT:210000)) )','')
	,'116'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:210000 AND COL_128:TIME2:GT:210000) OR (COL_127:TIME2:GTE:210000 AND COL_127:TIME2:LT:220000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:210000 AND COL_144:TIME2:GT:210000) OR (COL_143:TIME2:GTE:210000 AND COL_143:TIME2:LT:220000)) )','')
	,'117'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:220000 AND COL_128:TIME2:GT:220000) OR (COL_127:TIME2:GTE:220000 AND COL_127:TIME2:LT:230000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:220000 AND COL_144:TIME2:GT:220000) OR (COL_143:TIME2:GTE:220000 AND COL_143:TIME2:LT:230000)) )','')
	,'118'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:230000 AND COL_128:TIME2:GT:230000) OR (COL_127:TIME2:GTE:230000 AND COL_127:TIME2:LT:240000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:230000 AND COL_144:TIME2:GT:230000) OR (COL_143:TIME2:GTE:230000 AND COL_143:TIME2:LT:240000)) )','')
	// 土曜
	,'201'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:000000 AND COL_130:TIME2:GT:000000) OR (COL_129:TIME2:GTE:000000 AND COL_129:TIME2:LT:070000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:000000 AND COL_146:TIME2:GT:000000) OR (COL_145:TIME2:GTE:000000 AND COL_145:TIME2:LT:070000)) )','')
	,'202'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:070000 AND COL_130:TIME2:GT:070000) OR (COL_129:TIME2:GTE:070000 AND COL_129:TIME2:LT:080000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:070000 AND COL_146:TIME2:GT:070000) OR (COL_145:TIME2:GTE:070000 AND COL_145:TIME2:LT:080000)) )','')
	,'203'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:080000 AND COL_130:TIME2:GT:080000) OR (COL_129:TIME2:GTE:080000 AND COL_129:TIME2:LT:090000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:080000 AND COL_146:TIME2:GT:080000) OR (COL_145:TIME2:GTE:080000 AND COL_145:TIME2:LT:090000)) )','')
	,'204'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:090000 AND COL_130:TIME2:GT:090000) OR (COL_129:TIME2:GTE:090000 AND COL_129:TIME2:LT:100000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:090000 AND COL_146:TIME2:GT:090000) OR (COL_145:TIME2:GTE:090000 AND COL_145:TIME2:LT:100000)) )','')
	,'205'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:100000 AND COL_130:TIME2:GT:100000) OR (COL_129:TIME2:GTE:100000 AND COL_129:TIME2:LT:110000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:100000 AND COL_146:TIME2:GT:100000) OR (COL_145:TIME2:GTE:100000 AND COL_145:TIME2:LT:110000)) )','')
	,'206'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:110000 AND COL_130:TIME2:GT:110000) OR (COL_129:TIME2:GTE:110000 AND COL_129:TIME2:LT:120000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:110000 AND COL_146:TIME2:GT:110000) OR (COL_145:TIME2:GTE:110000 AND COL_145:TIME2:LT:120000)) )','')
	,'207'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:120000 AND COL_130:TIME2:GT:120000) OR (COL_129:TIME2:GTE:120000 AND COL_129:TIME2:LT:130000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:120000 AND COL_146:TIME2:GT:120000) OR (COL_145:TIME2:GTE:120000 AND COL_145:TIME2:LT:130000)) )','')
	,'208'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:130000 AND COL_130:TIME2:GT:130000) OR (COL_129:TIME2:GTE:130000 AND COL_129:TIME2:LT:140000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:130000 AND COL_146:TIME2:GT:130000) OR (COL_145:TIME2:GTE:130000 AND COL_145:TIME2:LT:140000)) )','')
	,'209'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:140000 AND COL_130:TIME2:GT:140000) OR (COL_129:TIME2:GTE:140000 AND COL_129:TIME2:LT:150000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:140000 AND COL_146:TIME2:GT:140000) OR (COL_145:TIME2:GTE:140000 AND COL_145:TIME2:LT:150000)) )','')
	,'210'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:150000 AND COL_130:TIME2:GT:150000) OR (COL_129:TIME2:GTE:150000 AND COL_129:TIME2:LT:160000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:150000 AND COL_146:TIME2:GT:150000) OR (COL_145:TIME2:GTE:150000 AND COL_145:TIME2:LT:160000)) )','')
	,'211'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:160000 AND COL_130:TIME2:GT:160000) OR (COL_129:TIME2:GTE:160000 AND COL_129:TIME2:LT:170000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:160000 AND COL_146:TIME2:GT:160000) OR (COL_145:TIME2:GTE:160000 AND COL_145:TIME2:LT:170000)) )','')
	,'212'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:170000 AND COL_130:TIME2:GT:170000) OR (COL_129:TIME2:GTE:170000 AND COL_129:TIME2:LT:180000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:170000 AND COL_146:TIME2:GT:170000) OR (COL_145:TIME2:GTE:170000 AND COL_145:TIME2:LT:180000)) )','')
	,'213'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:180000 AND COL_130:TIME2:GT:180000) OR (COL_129:TIME2:GTE:180000 AND COL_129:TIME2:LT:190000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:180000 AND COL_146:TIME2:GT:180000) OR (COL_145:TIME2:GTE:180000 AND COL_145:TIME2:LT:190000)) )','')
	,'214'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:190000 AND COL_130:TIME2:GT:190000) OR (COL_129:TIME2:GTE:190000 AND COL_129:TIME2:LT:200000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:190000 AND COL_146:TIME2:GT:190000) OR (COL_145:TIME2:GTE:190000 AND COL_145:TIME2:LT:200000)) )','')
	,'215'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:200000 AND COL_130:TIME2:GT:200000) OR (COL_129:TIME2:GTE:200000 AND COL_129:TIME2:LT:210000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:200000 AND COL_146:TIME2:GT:200000) OR (COL_145:TIME2:GTE:200000 AND COL_145:TIME2:LT:210000)) )','')
	,'216'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:210000 AND COL_130:TIME2:GT:210000) OR (COL_129:TIME2:GTE:210000 AND COL_129:TIME2:LT:220000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:210000 AND COL_146:TIME2:GT:210000) OR (COL_145:TIME2:GTE:210000 AND COL_145:TIME2:LT:220000)) )','')
	,'217'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:220000 AND COL_130:TIME2:GT:220000) OR (COL_129:TIME2:GTE:220000 AND COL_129:TIME2:LT:230000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:220000 AND COL_146:TIME2:GT:220000) OR (COL_145:TIME2:GTE:220000 AND COL_145:TIME2:LT:230000)) )','')
	,'218'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:230000 AND COL_130:TIME2:GT:230000) OR (COL_129:TIME2:GTE:230000 AND COL_129:TIME2:LT:240000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:230000 AND COL_146:TIME2:GT:230000) OR (COL_145:TIME2:GTE:230000 AND COL_145:TIME2:LT:240000)) )','')
	// 日曜・休日
	,'301'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:000000 AND COL_132:TIME2:GT:000000) OR (COL_131:TIME2:GTE:000000 AND COL_131:TIME2:LT:070000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:000000 AND COL_148:TIME2:GT:000000) OR (COL_147:TIME2:GTE:000000 AND COL_147:TIME2:LT:070000)) )','')
	,'302'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:070000 AND COL_132:TIME2:GT:070000) OR (COL_131:TIME2:GTE:070000 AND COL_131:TIME2:LT:080000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:070000 AND COL_148:TIME2:GT:070000) OR (COL_147:TIME2:GTE:070000 AND COL_147:TIME2:LT:080000)) )','')
	,'303'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:080000 AND COL_132:TIME2:GT:080000) OR (COL_131:TIME2:GTE:080000 AND COL_131:TIME2:LT:090000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:080000 AND COL_148:TIME2:GT:080000) OR (COL_147:TIME2:GTE:080000 AND COL_147:TIME2:LT:090000)) )','')
	,'304'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:090000 AND COL_132:TIME2:GT:090000) OR (COL_131:TIME2:GTE:090000 AND COL_131:TIME2:LT:100000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:090000 AND COL_148:TIME2:GT:090000) OR (COL_147:TIME2:GTE:090000 AND COL_147:TIME2:LT:100000)) )','')
	,'305'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:100000 AND COL_132:TIME2:GT:100000) OR (COL_131:TIME2:GTE:100000 AND COL_131:TIME2:LT:110000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:100000 AND COL_148:TIME2:GT:100000) OR (COL_147:TIME2:GTE:100000 AND COL_147:TIME2:LT:110000)) )','')
	,'306'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:110000 AND COL_132:TIME2:GT:110000) OR (COL_131:TIME2:GTE:110000 AND COL_131:TIME2:LT:120000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:110000 AND COL_148:TIME2:GT:110000) OR (COL_147:TIME2:GTE:110000 AND COL_147:TIME2:LT:120000)) )','')
	,'307'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:120000 AND COL_132:TIME2:GT:120000) OR (COL_131:TIME2:GTE:120000 AND COL_131:TIME2:LT:130000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:120000 AND COL_148:TIME2:GT:120000) OR (COL_147:TIME2:GTE:120000 AND COL_147:TIME2:LT:130000)) )','')
	,'308'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:130000 AND COL_132:TIME2:GT:130000) OR (COL_131:TIME2:GTE:130000 AND COL_131:TIME2:LT:140000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:130000 AND COL_148:TIME2:GT:130000) OR (COL_147:TIME2:GTE:130000 AND COL_147:TIME2:LT:140000)) )','')
	,'309'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:140000 AND COL_132:TIME2:GT:140000) OR (COL_131:TIME2:GTE:140000 AND COL_131:TIME2:LT:150000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:140000 AND COL_148:TIME2:GT:140000) OR (COL_147:TIME2:GTE:140000 AND COL_147:TIME2:LT:150000)) )','')
	,'310'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:150000 AND COL_132:TIME2:GT:150000) OR (COL_131:TIME2:GTE:150000 AND COL_131:TIME2:LT:160000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:150000 AND COL_148:TIME2:GT:150000) OR (COL_147:TIME2:GTE:150000 AND COL_147:TIME2:LT:160000)) )','')
	,'311'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:160000 AND COL_132:TIME2:GT:160000) OR (COL_131:TIME2:GTE:160000 AND COL_131:TIME2:LT:170000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:160000 AND COL_148:TIME2:GT:160000) OR (COL_147:TIME2:GTE:160000 AND COL_147:TIME2:LT:170000)) )','')
	,'312'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:170000 AND COL_132:TIME2:GT:170000) OR (COL_131:TIME2:GTE:170000 AND COL_131:TIME2:LT:180000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:170000 AND COL_148:TIME2:GT:170000) OR (COL_147:TIME2:GTE:170000 AND COL_147:TIME2:LT:180000)) )','')
	,'313'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:180000 AND COL_132:TIME2:GT:180000) OR (COL_131:TIME2:GTE:180000 AND COL_131:TIME2:LT:190000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:180000 AND COL_148:TIME2:GT:180000) OR (COL_147:TIME2:GTE:180000 AND COL_147:TIME2:LT:190000)) )','')
	,'314'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:190000 AND COL_132:TIME2:GT:190000) OR (COL_131:TIME2:GTE:190000 AND COL_131:TIME2:LT:200000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:190000 AND COL_148:TIME2:GT:190000) OR (COL_147:TIME2:GTE:190000 AND COL_147:TIME2:LT:200000)) )','')
	,'315'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:200000 AND COL_132:TIME2:GT:200000) OR (COL_131:TIME2:GTE:200000 AND COL_131:TIME2:LT:210000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:200000 AND COL_148:TIME2:GT:200000) OR (COL_147:TIME2:GTE:200000 AND COL_147:TIME2:LT:210000)) )','')
	,'316'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:210000 AND COL_132:TIME2:GT:210000) OR (COL_131:TIME2:GTE:210000 AND COL_131:TIME2:LT:220000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:210000 AND COL_148:TIME2:GT:210000) OR (COL_147:TIME2:GTE:210000 AND COL_147:TIME2:LT:220000)) )','')
	,'317'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:220000 AND COL_132:TIME2:GT:220000) OR (COL_131:TIME2:GTE:220000 AND COL_131:TIME2:LT:230000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:220000 AND COL_148:TIME2:GT:220000) OR (COL_147:TIME2:GTE:220000 AND COL_147:TIME2:LT:230000)) )','')
	,'318'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:230000 AND COL_132:TIME2:GT:230000) OR (COL_131:TIME2:GTE:230000 AND COL_131:TIME2:LT:240000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:230000 AND COL_148:TIME2:GT:230000) OR (COL_147:TIME2:GTE:230000 AND COL_147:TIME2:LT:240000)) )','')
	// 曜日のみ
	,'1'=>array('( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_127!:@@NULL@@ AND COL_128!:00:00:00 AND COL_128!:@@NULL@@ ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_143!:@@NULL@@ AND COL_144!:00:00:00 AND COL_144!:@@NULL@@ )','')
	,'2'=>array('( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_129!:@@NULL@@ AND COL_130!:00:00:00 AND COL_130!:@@NULL@@ ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_145!:@@NULL@@ AND COL_146!:00:00:00 AND COL_146!:@@NULL@@ )','')
	,'3'=>array('( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_131!:@@NULL@@ AND COL_132!:00:00:00 AND COL_132!:@@NULL@@ ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_147!:@@NULL@@ AND COL_148!:00:00:00 AND COL_148!:@@NULL@@ )','')
	// 時間帯のみ
	,'01'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:000000 AND COL_128:TIME2:GT:000000) OR (COL_127:TIME2:GTE:000000 AND COL_127:TIME2:LT:070000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:000000 AND COL_144:TIME2:GT:000000) OR (COL_143:TIME2:GTE:000000 AND COL_143:TIME2:LT:070000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:000000 AND COL_130:TIME2:GT:000000) OR (COL_129:TIME2:GTE:000000 AND COL_129:TIME2:LT:070000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:000000 AND COL_146:TIME2:GT:000000) OR (COL_145:TIME2:GTE:000000 AND COL_145:TIME2:LT:070000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:000000 AND COL_132:TIME2:GT:000000) OR (COL_131:TIME2:GTE:000000 AND COL_131:TIME2:LT:070000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:000000 AND COL_148:TIME2:GT:000000) OR (COL_147:TIME2:GTE:000000 AND COL_147:TIME2:LT:070000)) ) )'
			,'')
	,'02'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:070000 AND COL_128:TIME2:GT:070000) OR (COL_127:TIME2:GTE:070000 AND COL_127:TIME2:LT:080000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:070000 AND COL_144:TIME2:GT:070000) OR (COL_143:TIME2:GTE:070000 AND COL_143:TIME2:LT:080000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:070000 AND COL_130:TIME2:GT:070000) OR (COL_129:TIME2:GTE:070000 AND COL_129:TIME2:LT:080000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:070000 AND COL_146:TIME2:GT:070000) OR (COL_145:TIME2:GTE:070000 AND COL_145:TIME2:LT:080000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:070000 AND COL_132:TIME2:GT:070000) OR (COL_131:TIME2:GTE:070000 AND COL_131:TIME2:LT:080000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:070000 AND COL_148:TIME2:GT:070000) OR (COL_147:TIME2:GTE:070000 AND COL_147:TIME2:LT:080000)) ) )'
			,'')
	,'03'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:080000 AND COL_128:TIME2:GT:080000) OR (COL_127:TIME2:GTE:080000 AND COL_127:TIME2:LT:090000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:080000 AND COL_144:TIME2:GT:080000) OR (COL_143:TIME2:GTE:080000 AND COL_143:TIME2:LT:090000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:080000 AND COL_130:TIME2:GT:080000) OR (COL_129:TIME2:GTE:080000 AND COL_129:TIME2:LT:090000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:080000 AND COL_146:TIME2:GT:080000) OR (COL_145:TIME2:GTE:080000 AND COL_145:TIME2:LT:090000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:080000 AND COL_132:TIME2:GT:080000) OR (COL_131:TIME2:GTE:080000 AND COL_131:TIME2:LT:090000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:080000 AND COL_148:TIME2:GT:080000) OR (COL_147:TIME2:GTE:080000 AND COL_147:TIME2:LT:090000)) ) )'
			,'')
	,'04'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:090000 AND COL_128:TIME2:GT:090000) OR (COL_127:TIME2:GTE:090000 AND COL_127:TIME2:LT:100000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:090000 AND COL_144:TIME2:GT:090000) OR (COL_143:TIME2:GTE:090000 AND COL_143:TIME2:LT:100000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:090000 AND COL_132:TIME2:GT:090000) OR (COL_131:TIME2:GTE:090000 AND COL_131:TIME2:LT:100000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:090000 AND COL_148:TIME2:GT:090000) OR (COL_147:TIME2:GTE:090000 AND COL_147:TIME2:LT:100000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:090000 AND COL_130:TIME2:GT:090000) OR (COL_129:TIME2:GTE:090000 AND COL_129:TIME2:LT:100000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:090000 AND COL_146:TIME2:GT:090000) OR (COL_145:TIME2:GTE:090000 AND COL_145:TIME2:LT:100000)) ) )'
			,'')
	,'05'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:100000 AND COL_128:TIME2:GT:100000) OR (COL_127:TIME2:GTE:100000 AND COL_127:TIME2:LT:110000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:100000 AND COL_144:TIME2:GT:100000) OR (COL_143:TIME2:GTE:100000 AND COL_143:TIME2:LT:110000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:100000 AND COL_130:TIME2:GT:100000) OR (COL_129:TIME2:GTE:100000 AND COL_129:TIME2:LT:110000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:100000 AND COL_146:TIME2:GT:100000) OR (COL_145:TIME2:GTE:100000 AND COL_145:TIME2:LT:110000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:100000 AND COL_132:TIME2:GT:100000) OR (COL_131:TIME2:GTE:100000 AND COL_131:TIME2:LT:110000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:100000 AND COL_148:TIME2:GT:100000) OR (COL_147:TIME2:GTE:100000 AND COL_147:TIME2:LT:110000)) ) )'
			,'')
	,'06'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:110000 AND COL_128:TIME2:GT:110000) OR (COL_127:TIME2:GTE:110000 AND COL_127:TIME2:LT:120000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:110000 AND COL_144:TIME2:GT:110000) OR (COL_143:TIME2:GTE:110000 AND COL_143:TIME2:LT:120000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:110000 AND COL_130:TIME2:GT:110000) OR (COL_129:TIME2:GTE:110000 AND COL_129:TIME2:LT:120000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:110000 AND COL_146:TIME2:GT:110000) OR (COL_145:TIME2:GTE:110000 AND COL_145:TIME2:LT:120000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:110000 AND COL_132:TIME2:GT:110000) OR (COL_131:TIME2:GTE:110000 AND COL_131:TIME2:LT:120000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:110000 AND COL_148:TIME2:GT:110000) OR (COL_147:TIME2:GTE:110000 AND COL_147:TIME2:LT:120000)) ) )'
			,'')
	,'07'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:120000 AND COL_128:TIME2:GT:120000) OR (COL_127:TIME2:GTE:120000 AND COL_127:TIME2:LT:130000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:120000 AND COL_144:TIME2:GT:120000) OR (COL_143:TIME2:GTE:120000 AND COL_143:TIME2:LT:130000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:120000 AND COL_130:TIME2:GT:120000) OR (COL_129:TIME2:GTE:120000 AND COL_129:TIME2:LT:130000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:120000 AND COL_146:TIME2:GT:120000) OR (COL_145:TIME2:GTE:120000 AND COL_145:TIME2:LT:130000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:120000 AND COL_132:TIME2:GT:120000) OR (COL_131:TIME2:GTE:120000 AND COL_131:TIME2:LT:130000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:120000 AND COL_148:TIME2:GT:120000) OR (COL_147:TIME2:GTE:120000 AND COL_147:TIME2:LT:130000)) ) )'
			,'')
	,'08'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:130000 AND COL_128:TIME2:GT:130000) OR (COL_127:TIME2:GTE:130000 AND COL_127:TIME2:LT:140000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:130000 AND COL_144:TIME2:GT:130000) OR (COL_143:TIME2:GTE:130000 AND COL_143:TIME2:LT:140000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:130000 AND COL_130:TIME2:GT:130000) OR (COL_129:TIME2:GTE:130000 AND COL_129:TIME2:LT:140000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:130000 AND COL_146:TIME2:GT:130000) OR (COL_145:TIME2:GTE:130000 AND COL_145:TIME2:LT:140000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:130000 AND COL_132:TIME2:GT:130000) OR (COL_131:TIME2:GTE:130000 AND COL_131:TIME2:LT:140000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:130000 AND COL_148:TIME2:GT:130000) OR (COL_147:TIME2:GTE:130000 AND COL_147:TIME2:LT:140000)) ) )'
			,'')
	,'09'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:140000 AND COL_128:TIME2:GT:140000) OR (COL_127:TIME2:GTE:140000 AND COL_127:TIME2:LT:150000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:140000 AND COL_144:TIME2:GT:140000) OR (COL_143:TIME2:GTE:140000 AND COL_143:TIME2:LT:150000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:140000 AND COL_130:TIME2:GT:140000) OR (COL_129:TIME2:GTE:140000 AND COL_129:TIME2:LT:150000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:140000 AND COL_146:TIME2:GT:140000) OR (COL_145:TIME2:GTE:140000 AND COL_145:TIME2:LT:150000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:140000 AND COL_132:TIME2:GT:140000) OR (COL_131:TIME2:GTE:140000 AND COL_131:TIME2:LT:150000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:140000 AND COL_148:TIME2:GT:140000) OR (COL_147:TIME2:GTE:140000 AND COL_147:TIME2:LT:150000)) ) )'
			,'')
	,'10'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:150000 AND COL_128:TIME2:GT:150000) OR (COL_127:TIME2:GTE:150000 AND COL_127:TIME2:LT:160000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:150000 AND COL_144:TIME2:GT:150000) OR (COL_143:TIME2:GTE:150000 AND COL_143:TIME2:LT:160000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:150000 AND COL_130:TIME2:GT:150000) OR (COL_129:TIME2:GTE:150000 AND COL_129:TIME2:LT:160000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:150000 AND COL_146:TIME2:GT:150000) OR (COL_145:TIME2:GTE:150000 AND COL_145:TIME2:LT:160000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:150000 AND COL_132:TIME2:GT:150000) OR (COL_131:TIME2:GTE:150000 AND COL_131:TIME2:LT:160000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:150000 AND COL_148:TIME2:GT:150000) OR (COL_147:TIME2:GTE:150000 AND COL_147:TIME2:LT:160000)) ) )'
			,'')
	,'11'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:160000 AND COL_128:TIME2:GT:160000) OR (COL_127:TIME2:GTE:160000 AND COL_127:TIME2:LT:170000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:160000 AND COL_144:TIME2:GT:160000) OR (COL_143:TIME2:GTE:160000 AND COL_143:TIME2:LT:170000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:160000 AND COL_130:TIME2:GT:160000) OR (COL_129:TIME2:GTE:160000 AND COL_129:TIME2:LT:170000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:160000 AND COL_146:TIME2:GT:160000) OR (COL_145:TIME2:GTE:160000 AND COL_145:TIME2:LT:170000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:160000 AND COL_132:TIME2:GT:160000) OR (COL_131:TIME2:GTE:160000 AND COL_131:TIME2:LT:170000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:160000 AND COL_148:TIME2:GT:160000) OR (COL_147:TIME2:GTE:160000 AND COL_147:TIME2:LT:170000)) ) )'
			,'')
	,'12'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:170000 AND COL_128:TIME2:GT:170000) OR (COL_127:TIME2:GTE:170000 AND COL_127:TIME2:LT:180000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:170000 AND COL_144:TIME2:GT:170000) OR (COL_143:TIME2:GTE:170000 AND COL_143:TIME2:LT:180000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:170000 AND COL_130:TIME2:GT:170000) OR (COL_129:TIME2:GTE:170000 AND COL_129:TIME2:LT:180000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:170000 AND COL_146:TIME2:GT:170000) OR (COL_145:TIME2:GTE:170000 AND COL_145:TIME2:LT:180000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:170000 AND COL_132:TIME2:GT:170000) OR (COL_131:TIME2:GTE:170000 AND COL_131:TIME2:LT:180000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:170000 AND COL_148:TIME2:GT:170000) OR (COL_147:TIME2:GTE:170000 AND COL_147:TIME2:LT:180000)) ) )'
			,'')
	,'13'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:180000 AND COL_128:TIME2:GT:180000) OR (COL_127:TIME2:GTE:180000 AND COL_127:TIME2:LT:190000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:180000 AND COL_144:TIME2:GT:180000) OR (COL_143:TIME2:GTE:180000 AND COL_143:TIME2:LT:190000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:180000 AND COL_130:TIME2:GT:180000) OR (COL_129:TIME2:GTE:180000 AND COL_129:TIME2:LT:190000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:180000 AND COL_146:TIME2:GT:180000) OR (COL_145:TIME2:GTE:180000 AND COL_145:TIME2:LT:190000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:180000 AND COL_132:TIME2:GT:180000) OR (COL_131:TIME2:GTE:180000 AND COL_131:TIME2:LT:190000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:180000 AND COL_148:TIME2:GT:180000) OR (COL_147:TIME2:GTE:180000 AND COL_147:TIME2:LT:190000)) ) )'
			,'')
	,'14'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:190000 AND COL_128:TIME2:GT:190000) OR (COL_127:TIME2:GTE:190000 AND COL_127:TIME2:LT:200000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:190000 AND COL_144:TIME2:GT:190000) OR (COL_143:TIME2:GTE:190000 AND COL_143:TIME2:LT:200000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:190000 AND COL_130:TIME2:GT:190000) OR (COL_129:TIME2:GTE:190000 AND COL_129:TIME2:LT:200000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:190000 AND COL_146:TIME2:GT:190000) OR (COL_145:TIME2:GTE:190000 AND COL_145:TIME2:LT:200000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:190000 AND COL_132:TIME2:GT:190000) OR (COL_131:TIME2:GTE:190000 AND COL_131:TIME2:LT:200000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:190000 AND COL_148:TIME2:GT:190000) OR (COL_147:TIME2:GTE:190000 AND COL_147:TIME2:LT:200000)) ) )'
			,'')
	,'15'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:200000 AND COL_128:TIME2:GT:200000) OR (COL_127:TIME2:GTE:200000 AND COL_127:TIME2:LT:210000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:200000 AND COL_144:TIME2:GT:200000) OR (COL_143:TIME2:GTE:200000 AND COL_143:TIME2:LT:210000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:200000 AND COL_130:TIME2:GT:200000) OR (COL_129:TIME2:GTE:200000 AND COL_129:TIME2:LT:210000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:200000 AND COL_146:TIME2:GT:200000) OR (COL_145:TIME2:GTE:200000 AND COL_145:TIME2:LT:210000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:200000 AND COL_132:TIME2:GT:200000) OR (COL_131:TIME2:GTE:200000 AND COL_131:TIME2:LT:210000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:200000 AND COL_148:TIME2:GT:200000) OR (COL_147:TIME2:GTE:200000 AND COL_147:TIME2:LT:210000)) ) )'
			,'')
	,'16'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:210000 AND COL_128:TIME2:GT:210000) OR (COL_127:TIME2:GTE:210000 AND COL_127:TIME2:LT:220000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:210000 AND COL_144:TIME2:GT:210000) OR (COL_143:TIME2:GTE:210000 AND COL_143:TIME2:LT:220000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:210000 AND COL_130:TIME2:GT:210000) OR (COL_129:TIME2:GTE:210000 AND COL_129:TIME2:LT:220000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:210000 AND COL_146:TIME2:GT:210000) OR (COL_145:TIME2:GTE:210000 AND COL_145:TIME2:LT:220000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:210000 AND COL_132:TIME2:GT:210000) OR (COL_131:TIME2:GTE:210000 AND COL_131:TIME2:LT:220000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:210000 AND COL_148:TIME2:GT:210000) OR (COL_147:TIME2:GTE:210000 AND COL_147:TIME2:LT:220000)) ) )'
			,'')
	,'17'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:220000 AND COL_128:TIME2:GT:220000) OR (COL_127:TIME2:GTE:220000 AND COL_127:TIME2:LT:230000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:220000 AND COL_144:TIME2:GT:220000) OR (COL_143:TIME2:GTE:220000 AND COL_143:TIME2:LT:230000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:220000 AND COL_130:TIME2:GT:220000) OR (COL_129:TIME2:GTE:220000 AND COL_129:TIME2:LT:230000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:220000 AND COL_146:TIME2:GT:220000) OR (COL_145:TIME2:GTE:220000 AND COL_145:TIME2:LT:230000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:220000 AND COL_132:TIME2:GT:220000) OR (COL_131:TIME2:GTE:220000 AND COL_131:TIME2:LT:230000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:220000 AND COL_148:TIME2:GT:220000) OR (COL_147:TIME2:GTE:220000 AND COL_147:TIME2:LT:230000)) ) )'
			,'')
	,'18'=>array(
				 '( ( COL_36!:@@NULL@@ AND COL_127!:00:00:00 AND COL_128!:00:00:00 AND ((COL_127:TIME2:LTE:230000 AND COL_128:TIME2:GT:230000) OR (COL_127:TIME2:GTE:230000 AND COL_127:TIME2:LT:240000)) ) OR ( COL_43!:@@NULL@@ AND COL_143!:00:00:00 AND COL_144!:00:00:00 AND ((COL_143:TIME2:LTE:230000 AND COL_144:TIME2:GT:230000) OR (COL_143:TIME2:GTE:230000 AND COL_143:TIME2:LT:240000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_129!:00:00:00 AND COL_130!:00:00:00 AND ((COL_129:TIME2:LTE:230000 AND COL_130:TIME2:GT:230000) OR (COL_129:TIME2:GTE:230000 AND COL_129:TIME2:LT:240000)) ) OR ( COL_43!:@@NULL@@ AND COL_145!:00:00:00 AND COL_146!:00:00:00 AND ((COL_145:TIME2:LTE:230000 AND COL_146:TIME2:GT:230000) OR (COL_145:TIME2:GTE:230000 AND COL_145:TIME2:LT:240000)) ) )'
			.' OR ( ( COL_36!:@@NULL@@ AND COL_131!:00:00:00 AND COL_132!:00:00:00 AND ((COL_131:TIME2:LTE:230000 AND COL_132:TIME2:GT:230000) OR (COL_131:TIME2:GTE:230000 AND COL_131:TIME2:LT:240000)) ) OR ( COL_43!:@@NULL@@ AND COL_147!:00:00:00 AND COL_148!:00:00:00 AND ((COL_147:TIME2:LTE:230000 AND COL_148:TIME2:GT:230000) OR (COL_147:TIME2:GTE:230000 AND COL_147:TIME2:LT:240000)) ) )'
			,'')
	)
);
//「ATMから選ぶ」のご利用時間
$D_COND[107] = array(
'type'=>'SL'
,'opts'=>array(
	// 平日
	 '101'=>array('(COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:000000 AND COL_136:TIME2:GT:000000) OR (COL_135:TIME2:GTE:000000 AND COL_135:TIME2:LT:070000))','')
	,'102'=>array('(COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:070000 AND COL_136:TIME2:GT:070000) OR (COL_135:TIME2:GTE:070000 AND COL_135:TIME2:LT:080000))','')
	,'103'=>array('(COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:080000 AND COL_136:TIME2:GT:080000) OR (COL_135:TIME2:GTE:080000 AND COL_135:TIME2:LT:090000))','')
	,'104'=>array('(COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:090000 AND COL_136:TIME2:GT:090000) OR (COL_135:TIME2:GTE:090000 AND COL_135:TIME2:LT:100000))','')
	,'105'=>array('(COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:100000 AND COL_136:TIME2:GT:100000) OR (COL_135:TIME2:GTE:100000 AND COL_135:TIME2:LT:110000))','')
	,'106'=>array('(COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:110000 AND COL_136:TIME2:GT:110000) OR (COL_135:TIME2:GTE:110000 AND COL_135:TIME2:LT:120000))','')
	,'107'=>array('(COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:120000 AND COL_136:TIME2:GT:120000) OR (COL_135:TIME2:GTE:120000 AND COL_135:TIME2:LT:130000))','')
	,'108'=>array('(COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:130000 AND COL_136:TIME2:GT:130000) OR (COL_135:TIME2:GTE:130000 AND COL_135:TIME2:LT:140000))','')
	,'109'=>array('(COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:140000 AND COL_136:TIME2:GT:140000) OR (COL_135:TIME2:GTE:140000 AND COL_135:TIME2:LT:150000))','')
	,'110'=>array('(COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:150000 AND COL_136:TIME2:GT:150000) OR (COL_135:TIME2:GTE:150000 AND COL_135:TIME2:LT:160000))','')
	,'111'=>array('(COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:160000 AND COL_136:TIME2:GT:160000) OR (COL_135:TIME2:GTE:160000 AND COL_135:TIME2:LT:170000))','')
	,'112'=>array('(COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:170000 AND COL_136:TIME2:GT:170000) OR (COL_135:TIME2:GTE:170000 AND COL_135:TIME2:LT:180000))','')
	,'113'=>array('(COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:180000 AND COL_136:TIME2:GT:180000) OR (COL_135:TIME2:GTE:180000 AND COL_135:TIME2:LT:190000))','')
	,'114'=>array('(COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:190000 AND COL_136:TIME2:GT:190000) OR (COL_135:TIME2:GTE:190000 AND COL_135:TIME2:LT:200000))','')
	,'115'=>array('(COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:200000 AND COL_136:TIME2:GT:200000) OR (COL_135:TIME2:GTE:200000 AND COL_135:TIME2:LT:210000))','')
	,'116'=>array('(COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:210000 AND COL_136:TIME2:GT:210000) OR (COL_135:TIME2:GTE:210000 AND COL_135:TIME2:LT:220000))','')
	,'117'=>array('(COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:220000 AND COL_136:TIME2:GT:220000) OR (COL_135:TIME2:GTE:220000 AND COL_135:TIME2:LT:230000))','')
	,'118'=>array('(COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:230000 AND COL_136:TIME2:GT:230000) OR (COL_135:TIME2:GTE:230000 AND COL_135:TIME2:LT:240000))','')
	// 土曜
	,'201'=>array('(COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:000000 AND COL_138:TIME2:GT:000000) OR (COL_137:TIME2:GTE:000000 AND COL_137:TIME2:LT:070000))','')
	,'202'=>array('(COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:070000 AND COL_138:TIME2:GT:070000) OR (COL_137:TIME2:GTE:070000 AND COL_137:TIME2:LT:080000))','')
	,'203'=>array('(COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:080000 AND COL_138:TIME2:GT:080000) OR (COL_137:TIME2:GTE:080000 AND COL_137:TIME2:LT:090000))','')
	,'204'=>array('(COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:090000 AND COL_138:TIME2:GT:090000) OR (COL_137:TIME2:GTE:090000 AND COL_137:TIME2:LT:100000))','')
	,'205'=>array('(COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:100000 AND COL_138:TIME2:GT:100000) OR (COL_137:TIME2:GTE:100000 AND COL_137:TIME2:LT:110000))','')
	,'206'=>array('(COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:110000 AND COL_138:TIME2:GT:110000) OR (COL_137:TIME2:GTE:110000 AND COL_137:TIME2:LT:120000))','')
	,'207'=>array('(COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:120000 AND COL_138:TIME2:GT:120000) OR (COL_137:TIME2:GTE:120000 AND COL_137:TIME2:LT:130000))','')
	,'208'=>array('(COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:130000 AND COL_138:TIME2:GT:130000) OR (COL_137:TIME2:GTE:130000 AND COL_137:TIME2:LT:140000))','')
	,'209'=>array('(COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:140000 AND COL_138:TIME2:GT:140000) OR (COL_137:TIME2:GTE:140000 AND COL_137:TIME2:LT:150000))','')
	,'210'=>array('(COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:150000 AND COL_138:TIME2:GT:150000) OR (COL_137:TIME2:GTE:150000 AND COL_137:TIME2:LT:160000))','')
	,'211'=>array('(COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:160000 AND COL_138:TIME2:GT:160000) OR (COL_137:TIME2:GTE:160000 AND COL_137:TIME2:LT:170000))','')
	,'212'=>array('(COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:170000 AND COL_138:TIME2:GT:170000) OR (COL_137:TIME2:GTE:170000 AND COL_137:TIME2:LT:180000))','')
	,'213'=>array('(COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:180000 AND COL_138:TIME2:GT:180000) OR (COL_137:TIME2:GTE:180000 AND COL_137:TIME2:LT:190000))','')
	,'214'=>array('(COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:190000 AND COL_138:TIME2:GT:190000) OR (COL_137:TIME2:GTE:190000 AND COL_137:TIME2:LT:200000))','')
	,'215'=>array('(COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:200000 AND COL_138:TIME2:GT:200000) OR (COL_137:TIME2:GTE:200000 AND COL_137:TIME2:LT:210000))','')
	,'216'=>array('(COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:210000 AND COL_138:TIME2:GT:210000) OR (COL_137:TIME2:GTE:210000 AND COL_137:TIME2:LT:220000))','')
	,'217'=>array('(COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:220000 AND COL_138:TIME2:GT:220000) OR (COL_137:TIME2:GTE:220000 AND COL_137:TIME2:LT:230000))','')
	,'218'=>array('(COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:230000 AND COL_138:TIME2:GT:230000) OR (COL_137:TIME2:GTE:230000 AND COL_137:TIME2:LT:240000))','')
	// 日曜・休日
	,'301'=>array('(COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:000000 AND COL_140:TIME2:GT:000000) OR (COL_139:TIME2:GTE:000000 AND COL_139:TIME2:LT:070000))','')
	,'302'=>array('(COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:070000 AND COL_140:TIME2:GT:070000) OR (COL_139:TIME2:GTE:070000 AND COL_139:TIME2:LT:080000))','')
	,'303'=>array('(COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:080000 AND COL_140:TIME2:GT:080000) OR (COL_139:TIME2:GTE:080000 AND COL_139:TIME2:LT:090000))','')
	,'304'=>array('(COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:090000 AND COL_140:TIME2:GT:090000) OR (COL_139:TIME2:GTE:090000 AND COL_139:TIME2:LT:100000))','')
	,'305'=>array('(COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:100000 AND COL_140:TIME2:GT:100000) OR (COL_139:TIME2:GTE:100000 AND COL_139:TIME2:LT:110000))','')
	,'306'=>array('(COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:110000 AND COL_140:TIME2:GT:110000) OR (COL_139:TIME2:GTE:110000 AND COL_139:TIME2:LT:120000))','')
	,'307'=>array('(COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:120000 AND COL_140:TIME2:GT:120000) OR (COL_139:TIME2:GTE:120000 AND COL_139:TIME2:LT:130000))','')
	,'308'=>array('(COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:130000 AND COL_140:TIME2:GT:130000) OR (COL_139:TIME2:GTE:130000 AND COL_139:TIME2:LT:140000))','')
	,'309'=>array('(COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:140000 AND COL_140:TIME2:GT:140000) OR (COL_139:TIME2:GTE:140000 AND COL_139:TIME2:LT:150000))','')
	,'310'=>array('(COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:150000 AND COL_140:TIME2:GT:150000) OR (COL_139:TIME2:GTE:150000 AND COL_139:TIME2:LT:160000))','')
	,'311'=>array('(COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:160000 AND COL_140:TIME2:GT:160000) OR (COL_139:TIME2:GTE:160000 AND COL_139:TIME2:LT:170000))','')
	,'312'=>array('(COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:170000 AND COL_140:TIME2:GT:170000) OR (COL_139:TIME2:GTE:170000 AND COL_139:TIME2:LT:180000))','')
	,'313'=>array('(COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:180000 AND COL_140:TIME2:GT:180000) OR (COL_139:TIME2:GTE:180000 AND COL_139:TIME2:LT:190000))','')
	,'314'=>array('(COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:190000 AND COL_140:TIME2:GT:190000) OR (COL_139:TIME2:GTE:190000 AND COL_139:TIME2:LT:200000))','')
	,'315'=>array('(COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:200000 AND COL_140:TIME2:GT:200000) OR (COL_139:TIME2:GTE:200000 AND COL_139:TIME2:LT:210000))','')
	,'316'=>array('(COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:210000 AND COL_140:TIME2:GT:210000) OR (COL_139:TIME2:GTE:210000 AND COL_139:TIME2:LT:220000))','')
	,'317'=>array('(COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:220000 AND COL_140:TIME2:GT:220000) OR (COL_139:TIME2:GTE:220000 AND COL_139:TIME2:LT:230000))','')
	,'318'=>array('(COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:230000 AND COL_140:TIME2:GT:230000) OR (COL_139:TIME2:GTE:230000 AND COL_139:TIME2:LT:240000))','')
	// 曜日のみ
	,'1'=>array('(COL_135!:00:00:00 AND COL_135!:@@NULL@@) OR (COL_136!:00:00:00 AND COL_136!:@@NULL@@)','')
	,'2'=>array('(COL_137!:00:00:00 AND COL_137!:@@NULL@@) OR (COL_138!:00:00:00 AND COL_138!:@@NULL@@)','')
	,'3'=>array('(COL_139!:00:00:00 AND COL_139!:@@NULL@@) OR (COL_140!:00:00:00 AND COL_140!:@@NULL@@)','')
	// 時間帯のみ
	,'01'=>array(
				 '( (COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:000000 AND COL_136:TIME2:GT:000000) OR (COL_135:TIME2:GTE:000000 AND COL_135:TIME2:LT:070000)) )'
			.' OR ( (COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:000000 AND COL_138:TIME2:GT:000000) OR (COL_137:TIME2:GTE:000000 AND COL_137:TIME2:LT:070000)) )'
			.' OR ( (COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:000000 AND COL_140:TIME2:GT:000000) OR (COL_139:TIME2:GTE:000000 AND COL_139:TIME2:LT:070000)) )'
			,'')
	,'02'=>array(
				 '( (COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:070000 AND COL_136:TIME2:GT:070000) OR (COL_135:TIME2:GTE:070000 AND COL_135:TIME2:LT:080000)) )'
			.' OR ( (COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:070000 AND COL_138:TIME2:GT:070000) OR (COL_137:TIME2:GTE:070000 AND COL_137:TIME2:LT:080000)) )'
			.' OR ( (COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:070000 AND COL_140:TIME2:GT:070000) OR (COL_139:TIME2:GTE:070000 AND COL_139:TIME2:LT:080000)) )'
			,'')
	,'03'=>array(
				 '( (COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:080000 AND COL_136:TIME2:GT:080000) OR (COL_135:TIME2:GTE:080000 AND COL_135:TIME2:LT:090000)) )'
			.' OR ( (COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:080000 AND COL_138:TIME2:GT:080000) OR (COL_137:TIME2:GTE:080000 AND COL_137:TIME2:LT:090000)) )'
			.' OR ( (COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:080000 AND COL_140:TIME2:GT:080000) OR (COL_139:TIME2:GTE:080000 AND COL_139:TIME2:LT:090000)) )'
			,'')
	,'04'=>array(
				 '( (COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:090000 AND COL_136:TIME2:GT:090000) OR (COL_135:TIME2:GTE:090000 AND COL_135:TIME2:LT:100000)) )'
			.' OR ( (COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:090000 AND COL_138:TIME2:GT:090000) OR (COL_137:TIME2:GTE:090000 AND COL_137:TIME2:LT:100000)) )'
			.' OR ( (COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:090000 AND COL_140:TIME2:GT:090000) OR (COL_139:TIME2:GTE:090000 AND COL_139:TIME2:LT:100000)) )'
			,'')
	,'05'=>array(
				 '( (COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:100000 AND COL_136:TIME2:GT:100000) OR (COL_135:TIME2:GTE:100000 AND COL_135:TIME2:LT:110000)) )'
			.' OR ( (COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:100000 AND COL_138:TIME2:GT:100000) OR (COL_137:TIME2:GTE:100000 AND COL_137:TIME2:LT:110000)) )'
			.' OR ( (COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:100000 AND COL_140:TIME2:GT:100000) OR (COL_139:TIME2:GTE:100000 AND COL_139:TIME2:LT:110000)) )'
			,'')
	,'06'=>array(
				 '( (COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:110000 AND COL_136:TIME2:GT:110000) OR (COL_135:TIME2:GTE:110000 AND COL_135:TIME2:LT:120000)) )'
			.' OR ( (COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:110000 AND COL_138:TIME2:GT:110000) OR (COL_137:TIME2:GTE:110000 AND COL_137:TIME2:LT:120000)) )'
			.' OR ( (COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:110000 AND COL_140:TIME2:GT:110000) OR (COL_139:TIME2:GTE:110000 AND COL_139:TIME2:LT:120000)) )'
			,'')
	,'07'=>array(
				 '( (COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:120000 AND COL_136:TIME2:GT:120000) OR (COL_135:TIME2:GTE:120000 AND COL_135:TIME2:LT:130000)) )'
			.' OR ( (COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:120000 AND COL_138:TIME2:GT:120000) OR (COL_137:TIME2:GTE:120000 AND COL_137:TIME2:LT:130000)) )'
			.' OR ( (COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:120000 AND COL_140:TIME2:GT:120000) OR (COL_139:TIME2:GTE:120000 AND COL_139:TIME2:LT:130000)) )'
			,'')
	,'08'=>array(
				 '( (COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:130000 AND COL_136:TIME2:GT:130000) OR (COL_135:TIME2:GTE:130000 AND COL_135:TIME2:LT:140000)) )'
			.' OR ( (COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:130000 AND COL_138:TIME2:GT:130000) OR (COL_137:TIME2:GTE:130000 AND COL_137:TIME2:LT:140000)) )'
			.' OR ( (COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:130000 AND COL_140:TIME2:GT:130000) OR (COL_139:TIME2:GTE:130000 AND COL_139:TIME2:LT:140000)) )'
			,'')
	,'09'=>array(
				 '( (COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:140000 AND COL_136:TIME2:GT:140000) OR (COL_135:TIME2:GTE:140000 AND COL_135:TIME2:LT:150000)) )'
			.' OR ( (COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:140000 AND COL_138:TIME2:GT:140000) OR (COL_137:TIME2:GTE:140000 AND COL_137:TIME2:LT:150000)) )'
			.' OR ( (COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:140000 AND COL_140:TIME2:GT:140000) OR (COL_139:TIME2:GTE:140000 AND COL_139:TIME2:LT:150000)) )'
			,'')
	,'10'=>array(
				 '( (COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:150000 AND COL_136:TIME2:GT:150000) OR (COL_135:TIME2:GTE:150000 AND COL_135:TIME2:LT:160000)) )'
			.' OR ( (COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:150000 AND COL_138:TIME2:GT:150000) OR (COL_137:TIME2:GTE:150000 AND COL_137:TIME2:LT:160000)) )'
			.' OR ( (COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:150000 AND COL_140:TIME2:GT:150000) OR (COL_139:TIME2:GTE:150000 AND COL_139:TIME2:LT:160000)) )'
			,'')
	,'11'=>array(
				 '( (COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:160000 AND COL_136:TIME2:GT:160000) OR (COL_135:TIME2:GTE:160000 AND COL_135:TIME2:LT:170000)) )'
			.' OR ( (COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:160000 AND COL_138:TIME2:GT:160000) OR (COL_137:TIME2:GTE:160000 AND COL_137:TIME2:LT:170000)) )'
			.' OR ( (COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:160000 AND COL_140:TIME2:GT:160000) OR (COL_139:TIME2:GTE:160000 AND COL_139:TIME2:LT:170000)) )'
			,'')
	,'12'=>array(
				 '( (COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:170000 AND COL_136:TIME2:GT:170000) OR (COL_135:TIME2:GTE:170000 AND COL_135:TIME2:LT:180000)) )'
			.' OR ( (COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:170000 AND COL_138:TIME2:GT:170000) OR (COL_137:TIME2:GTE:170000 AND COL_137:TIME2:LT:180000)) )'
			.' OR ( (COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:170000 AND COL_140:TIME2:GT:170000) OR (COL_139:TIME2:GTE:170000 AND COL_139:TIME2:LT:180000)) )'
			,'')
	,'13'=>array(
				 '( (COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:180000 AND COL_136:TIME2:GT:180000) OR (COL_135:TIME2:GTE:180000 AND COL_135:TIME2:LT:190000)) )'
			.' OR ( (COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:180000 AND COL_138:TIME2:GT:180000) OR (COL_137:TIME2:GTE:180000 AND COL_137:TIME2:LT:190000)) )'
			.' OR ( (COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:180000 AND COL_140:TIME2:GT:180000) OR (COL_139:TIME2:GTE:180000 AND COL_139:TIME2:LT:190000)) )'
			,'')
	,'14'=>array(
				 '( (COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:190000 AND COL_136:TIME2:GT:190000) OR (COL_135:TIME2:GTE:190000 AND COL_135:TIME2:LT:200000)) )'
			.' OR ( (COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:190000 AND COL_138:TIME2:GT:190000) OR (COL_137:TIME2:GTE:190000 AND COL_137:TIME2:LT:200000)) )'
			.' OR ( (COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:190000 AND COL_140:TIME2:GT:190000) OR (COL_139:TIME2:GTE:190000 AND COL_139:TIME2:LT:200000)) )'
			,'')
	,'15'=>array(
				 '( (COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:200000 AND COL_136:TIME2:GT:200000) OR (COL_135:TIME2:GTE:200000 AND COL_135:TIME2:LT:210000)) )'
			.' OR ( (COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:200000 AND COL_138:TIME2:GT:200000) OR (COL_137:TIME2:GTE:200000 AND COL_137:TIME2:LT:210000)) )'
			.' OR ( (COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:200000 AND COL_140:TIME2:GT:200000) OR (COL_139:TIME2:GTE:200000 AND COL_139:TIME2:LT:210000)) )'
			,'')
	,'16'=>array(
				 '( (COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:210000 AND COL_136:TIME2:GT:210000) OR (COL_135:TIME2:GTE:210000 AND COL_135:TIME2:LT:220000)) )'
			.' OR ( (COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:210000 AND COL_138:TIME2:GT:210000) OR (COL_137:TIME2:GTE:210000 AND COL_137:TIME2:LT:220000)) )'
			.' OR ( (COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:210000 AND COL_140:TIME2:GT:210000) OR (COL_139:TIME2:GTE:210000 AND COL_139:TIME2:LT:220000)) )'
			,'')
	,'17'=>array(
				 '( (COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:220000 AND COL_136:TIME2:GT:220000) OR (COL_135:TIME2:GTE:220000 AND COL_135:TIME2:LT:230000)) )'
			.' OR ( (COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:220000 AND COL_138:TIME2:GT:220000) OR (COL_137:TIME2:GTE:220000 AND COL_137:TIME2:LT:230000)) )'
			.' OR ( (COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:220000 AND COL_140:TIME2:GT:220000) OR (COL_139:TIME2:GTE:220000 AND COL_139:TIME2:LT:230000)) )'
			,'')
	,'18'=>array(
				 '( (COL_135!:00:00:00 OR COL_136!:00:00:00) AND ((COL_135:TIME2:LTE:230000 AND COL_136:TIME2:GT:230000) OR (COL_135:TIME2:GTE:230000 AND COL_135:TIME2:LT:240000)) )'
			.' OR ( (COL_137!:00:00:00 OR COL_138!:00:00:00) AND ((COL_137:TIME2:LTE:230000 AND COL_138:TIME2:GT:230000) OR (COL_137:TIME2:GTE:230000 AND COL_137:TIME2:LT:240000)) )'
			.' OR ( (COL_139!:00:00:00 OR COL_140!:00:00:00) AND ((COL_139:TIME2:LTE:230000 AND COL_140:TIME2:GT:230000) OR (COL_139:TIME2:GTE:230000 AND COL_139:TIME2:LT:240000)) )'
			,'')
	)
);
//「他サービスから選ぶ」のご利用時間
//    「宝くじ」を選択した場合
$D_COND[108] = array(
'type'=>'SL'
,'opts'=>array(
	// 平日
	 '101'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:000000 AND COL_128:TIME2:GT:000000) OR (COL_127:TIME2:GTE:000000 AND COL_127:TIME2:LT:070000))','')
	,'102'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:070000 AND COL_128:TIME2:GT:070000) OR (COL_127:TIME2:GTE:070000 AND COL_127:TIME2:LT:080000))','')
	,'103'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:080000 AND COL_128:TIME2:GT:080000) OR (COL_127:TIME2:GTE:080000 AND COL_127:TIME2:LT:090000))','')
	,'104'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:090000 AND COL_128:TIME2:GT:090000) OR (COL_127:TIME2:GTE:090000 AND COL_127:TIME2:LT:100000))','')
	,'105'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:100000 AND COL_128:TIME2:GT:100000) OR (COL_127:TIME2:GTE:100000 AND COL_127:TIME2:LT:110000))','')
	,'106'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:110000 AND COL_128:TIME2:GT:110000) OR (COL_127:TIME2:GTE:110000 AND COL_127:TIME2:LT:120000))','')
	,'107'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:120000 AND COL_128:TIME2:GT:120000) OR (COL_127:TIME2:GTE:120000 AND COL_127:TIME2:LT:130000))','')
	,'108'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:130000 AND COL_128:TIME2:GT:130000) OR (COL_127:TIME2:GTE:130000 AND COL_127:TIME2:LT:140000))','')
	,'109'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:140000 AND COL_128:TIME2:GT:140000) OR (COL_127:TIME2:GTE:140000 AND COL_127:TIME2:LT:150000))','')
	,'110'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:150000 AND COL_128:TIME2:GT:150000) OR (COL_127:TIME2:GTE:150000 AND COL_127:TIME2:LT:160000))','')
	,'111'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:160000 AND COL_128:TIME2:GT:160000) OR (COL_127:TIME2:GTE:160000 AND COL_127:TIME2:LT:170000))','')
	,'112'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:170000 AND COL_128:TIME2:GT:170000) OR (COL_127:TIME2:GTE:170000 AND COL_127:TIME2:LT:180000))','')
	,'113'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:180000 AND COL_128:TIME2:GT:180000) OR (COL_127:TIME2:GTE:180000 AND COL_127:TIME2:LT:190000))','')
	,'114'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:190000 AND COL_128:TIME2:GT:190000) OR (COL_127:TIME2:GTE:190000 AND COL_127:TIME2:LT:200000))','')
	,'115'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:200000 AND COL_128:TIME2:GT:200000) OR (COL_127:TIME2:GTE:200000 AND COL_127:TIME2:LT:210000))','')
	,'116'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:210000 AND COL_128:TIME2:GT:210000) OR (COL_127:TIME2:GTE:210000 AND COL_127:TIME2:LT:220000))','')
	,'117'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:220000 AND COL_128:TIME2:GT:220000) OR (COL_127:TIME2:GTE:220000 AND COL_127:TIME2:LT:230000))','')
	,'118'=>array('(COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:230000 AND COL_128:TIME2:GT:230000) OR (COL_127:TIME2:GTE:230000 AND COL_127:TIME2:LT:240000))','')
	// 土曜
	,'201'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:000000 AND COL_130:TIME2:GT:000000) OR (COL_129:TIME2:GTE:000000 AND COL_129:TIME2:LT:070000))','')
	,'202'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:070000 AND COL_130:TIME2:GT:070000) OR (COL_129:TIME2:GTE:070000 AND COL_129:TIME2:LT:080000))','')
	,'203'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:080000 AND COL_130:TIME2:GT:080000) OR (COL_129:TIME2:GTE:080000 AND COL_129:TIME2:LT:090000))','')
	,'204'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:090000 AND COL_130:TIME2:GT:090000) OR (COL_129:TIME2:GTE:090000 AND COL_129:TIME2:LT:100000))','')
	,'205'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:100000 AND COL_130:TIME2:GT:100000) OR (COL_129:TIME2:GTE:100000 AND COL_129:TIME2:LT:110000))','')
	,'206'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:110000 AND COL_130:TIME2:GT:110000) OR (COL_129:TIME2:GTE:110000 AND COL_129:TIME2:LT:120000))','')
	,'207'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:120000 AND COL_130:TIME2:GT:120000) OR (COL_129:TIME2:GTE:120000 AND COL_129:TIME2:LT:130000))','')
	,'208'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:130000 AND COL_130:TIME2:GT:130000) OR (COL_129:TIME2:GTE:130000 AND COL_129:TIME2:LT:140000))','')
	,'209'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:140000 AND COL_130:TIME2:GT:140000) OR (COL_129:TIME2:GTE:140000 AND COL_129:TIME2:LT:150000))','')
	,'210'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:150000 AND COL_130:TIME2:GT:150000) OR (COL_129:TIME2:GTE:150000 AND COL_129:TIME2:LT:160000))','')
	,'211'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:160000 AND COL_130:TIME2:GT:160000) OR (COL_129:TIME2:GTE:160000 AND COL_129:TIME2:LT:170000))','')
	,'212'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:170000 AND COL_130:TIME2:GT:170000) OR (COL_129:TIME2:GTE:170000 AND COL_129:TIME2:LT:180000))','')
	,'213'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:180000 AND COL_130:TIME2:GT:180000) OR (COL_129:TIME2:GTE:180000 AND COL_129:TIME2:LT:190000))','')
	,'214'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:190000 AND COL_130:TIME2:GT:190000) OR (COL_129:TIME2:GTE:190000 AND COL_129:TIME2:LT:200000))','')
	,'215'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:200000 AND COL_130:TIME2:GT:200000) OR (COL_129:TIME2:GTE:200000 AND COL_129:TIME2:LT:210000))','')
	,'216'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:210000 AND COL_130:TIME2:GT:210000) OR (COL_129:TIME2:GTE:210000 AND COL_129:TIME2:LT:220000))','')
	,'217'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:220000 AND COL_130:TIME2:GT:220000) OR (COL_129:TIME2:GTE:220000 AND COL_129:TIME2:LT:230000))','')
	,'218'=>array('(COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:230000 AND COL_130:TIME2:GT:230000) OR (COL_129:TIME2:GTE:230000 AND COL_129:TIME2:LT:240000))','')
	// 日曜・休日
	,'301'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:000000 AND COL_132:TIME2:GT:000000) OR (COL_131:TIME2:GTE:000000 AND COL_131:TIME2:LT:070000))','')
	,'302'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:070000 AND COL_132:TIME2:GT:070000) OR (COL_131:TIME2:GTE:070000 AND COL_131:TIME2:LT:080000))','')
	,'303'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:080000 AND COL_132:TIME2:GT:080000) OR (COL_131:TIME2:GTE:080000 AND COL_131:TIME2:LT:090000))','')
	,'304'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:090000 AND COL_132:TIME2:GT:090000) OR (COL_131:TIME2:GTE:090000 AND COL_131:TIME2:LT:100000))','')
	,'305'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:100000 AND COL_132:TIME2:GT:100000) OR (COL_131:TIME2:GTE:100000 AND COL_131:TIME2:LT:110000))','')
	,'306'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:110000 AND COL_132:TIME2:GT:110000) OR (COL_131:TIME2:GTE:110000 AND COL_131:TIME2:LT:120000))','')
	,'307'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:120000 AND COL_132:TIME2:GT:120000) OR (COL_131:TIME2:GTE:120000 AND COL_131:TIME2:LT:130000))','')
	,'308'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:130000 AND COL_132:TIME2:GT:130000) OR (COL_131:TIME2:GTE:130000 AND COL_131:TIME2:LT:140000))','')
	,'309'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:140000 AND COL_132:TIME2:GT:140000) OR (COL_131:TIME2:GTE:140000 AND COL_131:TIME2:LT:150000))','')
	,'310'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:150000 AND COL_132:TIME2:GT:150000) OR (COL_131:TIME2:GTE:150000 AND COL_131:TIME2:LT:160000))','')
	,'311'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:160000 AND COL_132:TIME2:GT:160000) OR (COL_131:TIME2:GTE:160000 AND COL_131:TIME2:LT:170000))','')
	,'312'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:170000 AND COL_132:TIME2:GT:170000) OR (COL_131:TIME2:GTE:170000 AND COL_131:TIME2:LT:180000))','')
	,'313'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:180000 AND COL_132:TIME2:GT:180000) OR (COL_131:TIME2:GTE:180000 AND COL_131:TIME2:LT:190000))','')
	,'314'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:190000 AND COL_132:TIME2:GT:190000) OR (COL_131:TIME2:GTE:190000 AND COL_131:TIME2:LT:200000))','')
	,'315'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:200000 AND COL_132:TIME2:GT:200000) OR (COL_131:TIME2:GTE:200000 AND COL_131:TIME2:LT:210000))','')
	,'316'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:210000 AND COL_132:TIME2:GT:210000) OR (COL_131:TIME2:GTE:210000 AND COL_131:TIME2:LT:220000))','')
	,'317'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:220000 AND COL_132:TIME2:GT:220000) OR (COL_131:TIME2:GTE:220000 AND COL_131:TIME2:LT:230000))','')
	,'318'=>array('(COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:230000 AND COL_132:TIME2:GT:230000) OR (COL_131:TIME2:GTE:230000 AND COL_131:TIME2:LT:240000))','')
	// 曜日のみ
	,'1'=>array('(COL_127!:00:00:00 AND COL_127!:@@NULL@@) OR (COL_128!:00:00:00 AND COL_128!:@@NULL@@)','')
	,'2'=>array('(COL_129!:00:00:00 AND COL_129!:@@NULL@@) OR (COL_130!:00:00:00 AND COL_130!:@@NULL@@)','')
	,'3'=>array('(COL_131!:00:00:00 AND COL_131!:@@NULL@@) OR (COL_132!:00:00:00 AND COL_132!:@@NULL@@)','')
	// 時間帯のみ
	,'01'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:000000 AND COL_128:TIME2:GT:000000) OR (COL_127:TIME2:GTE:000000 AND COL_127:TIME2:LT:070000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:000000 AND COL_130:TIME2:GT:000000) OR (COL_129:TIME2:GTE:000000 AND COL_129:TIME2:LT:070000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:000000 AND COL_132:TIME2:GT:000000) OR (COL_131:TIME2:GTE:000000 AND COL_131:TIME2:LT:070000)) )'
			,'')
	,'02'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:070000 AND COL_128:TIME2:GT:070000) OR (COL_127:TIME2:GTE:070000 AND COL_127:TIME2:LT:080000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:070000 AND COL_130:TIME2:GT:070000) OR (COL_129:TIME2:GTE:070000 AND COL_129:TIME2:LT:080000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:070000 AND COL_132:TIME2:GT:070000) OR (COL_131:TIME2:GTE:070000 AND COL_131:TIME2:LT:080000)) )'
			,'')
	,'03'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:080000 AND COL_128:TIME2:GT:080000) OR (COL_127:TIME2:GTE:080000 AND COL_127:TIME2:LT:090000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:080000 AND COL_130:TIME2:GT:080000) OR (COL_129:TIME2:GTE:080000 AND COL_129:TIME2:LT:090000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:080000 AND COL_132:TIME2:GT:080000) OR (COL_131:TIME2:GTE:080000 AND COL_131:TIME2:LT:090000)) )'
			,'')
	,'04'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:090000 AND COL_128:TIME2:GT:090000) OR (COL_127:TIME2:GTE:090000 AND COL_127:TIME2:LT:100000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:090000 AND COL_130:TIME2:GT:090000) OR (COL_129:TIME2:GTE:090000 AND COL_129:TIME2:LT:100000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:090000 AND COL_132:TIME2:GT:090000) OR (COL_131:TIME2:GTE:090000 AND COL_131:TIME2:LT:100000)) )'
			,'')
	,'05'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:100000 AND COL_128:TIME2:GT:100000) OR (COL_127:TIME2:GTE:100000 AND COL_127:TIME2:LT:110000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:100000 AND COL_130:TIME2:GT:100000) OR (COL_129:TIME2:GTE:100000 AND COL_129:TIME2:LT:110000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:100000 AND COL_132:TIME2:GT:100000) OR (COL_131:TIME2:GTE:100000 AND COL_131:TIME2:LT:110000)) )'
			,'')
	,'06'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:110000 AND COL_128:TIME2:GT:110000) OR (COL_127:TIME2:GTE:110000 AND COL_127:TIME2:LT:120000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:110000 AND COL_130:TIME2:GT:110000) OR (COL_129:TIME2:GTE:110000 AND COL_129:TIME2:LT:120000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:110000 AND COL_132:TIME2:GT:110000) OR (COL_131:TIME2:GTE:110000 AND COL_131:TIME2:LT:120000)) )'
			,'')
	,'07'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:120000 AND COL_128:TIME2:GT:120000) OR (COL_127:TIME2:GTE:120000 AND COL_127:TIME2:LT:130000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:120000 AND COL_130:TIME2:GT:120000) OR (COL_129:TIME2:GTE:120000 AND COL_129:TIME2:LT:130000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:120000 AND COL_132:TIME2:GT:120000) OR (COL_131:TIME2:GTE:120000 AND COL_131:TIME2:LT:130000)) )'
			,'')
	,'08'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:130000 AND COL_128:TIME2:GT:130000) OR (COL_127:TIME2:GTE:130000 AND COL_127:TIME2:LT:140000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:130000 AND COL_130:TIME2:GT:130000) OR (COL_129:TIME2:GTE:130000 AND COL_129:TIME2:LT:140000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:130000 AND COL_132:TIME2:GT:130000) OR (COL_131:TIME2:GTE:130000 AND COL_131:TIME2:LT:140000)) )'
			,'')
	,'09'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:140000 AND COL_128:TIME2:GT:140000) OR (COL_127:TIME2:GTE:140000 AND COL_127:TIME2:LT:150000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:140000 AND COL_130:TIME2:GT:140000) OR (COL_129:TIME2:GTE:140000 AND COL_129:TIME2:LT:150000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:140000 AND COL_132:TIME2:GT:140000) OR (COL_131:TIME2:GTE:140000 AND COL_131:TIME2:LT:150000)) )'
			,'')
	,'10'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:150000 AND COL_128:TIME2:GT:150000) OR (COL_127:TIME2:GTE:150000 AND COL_127:TIME2:LT:160000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:150000 AND COL_130:TIME2:GT:150000) OR (COL_129:TIME2:GTE:150000 AND COL_129:TIME2:LT:160000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:150000 AND COL_132:TIME2:GT:150000) OR (COL_131:TIME2:GTE:150000 AND COL_131:TIME2:LT:160000)) )'
			,'')
	,'11'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:160000 AND COL_128:TIME2:GT:160000) OR (COL_127:TIME2:GTE:160000 AND COL_127:TIME2:LT:170000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:160000 AND COL_130:TIME2:GT:160000) OR (COL_129:TIME2:GTE:160000 AND COL_129:TIME2:LT:170000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:160000 AND COL_132:TIME2:GT:160000) OR (COL_131:TIME2:GTE:160000 AND COL_131:TIME2:LT:170000)) )'
			,'')
	,'12'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:170000 AND COL_128:TIME2:GT:170000) OR (COL_127:TIME2:GTE:170000 AND COL_127:TIME2:LT:180000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:170000 AND COL_130:TIME2:GT:170000) OR (COL_129:TIME2:GTE:170000 AND COL_129:TIME2:LT:180000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:170000 AND COL_132:TIME2:GT:170000) OR (COL_131:TIME2:GTE:170000 AND COL_131:TIME2:LT:180000)) )'
			,'')
	,'13'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:180000 AND COL_128:TIME2:GT:180000) OR (COL_127:TIME2:GTE:180000 AND COL_127:TIME2:LT:190000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:180000 AND COL_130:TIME2:GT:180000) OR (COL_129:TIME2:GTE:180000 AND COL_129:TIME2:LT:190000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:180000 AND COL_132:TIME2:GT:180000) OR (COL_131:TIME2:GTE:180000 AND COL_131:TIME2:LT:190000)) )'
			,'')
	,'14'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:190000 AND COL_128:TIME2:GT:190000) OR (COL_127:TIME2:GTE:190000 AND COL_127:TIME2:LT:200000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:190000 AND COL_130:TIME2:GT:190000) OR (COL_129:TIME2:GTE:190000 AND COL_129:TIME2:LT:200000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:190000 AND COL_132:TIME2:GT:190000) OR (COL_131:TIME2:GTE:190000 AND COL_131:TIME2:LT:200000)) )'
			,'')
	,'15'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:200000 AND COL_128:TIME2:GT:200000) OR (COL_127:TIME2:GTE:200000 AND COL_127:TIME2:LT:210000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:200000 AND COL_130:TIME2:GT:200000) OR (COL_129:TIME2:GTE:200000 AND COL_129:TIME2:LT:210000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:200000 AND COL_132:TIME2:GT:200000) OR (COL_131:TIME2:GTE:200000 AND COL_131:TIME2:LT:210000)) )'
			,'')
	,'16'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:210000 AND COL_128:TIME2:GT:210000) OR (COL_127:TIME2:GTE:210000 AND COL_127:TIME2:LT:220000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:210000 AND COL_130:TIME2:GT:210000) OR (COL_129:TIME2:GTE:210000 AND COL_129:TIME2:LT:220000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:210000 AND COL_132:TIME2:GT:210000) OR (COL_131:TIME2:GTE:210000 AND COL_131:TIME2:LT:220000)) )'
			,'')
	,'17'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:220000 AND COL_128:TIME2:GT:220000) OR (COL_127:TIME2:GTE:220000 AND COL_127:TIME2:LT:230000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:220000 AND COL_130:TIME2:GT:220000) OR (COL_129:TIME2:GTE:220000 AND COL_129:TIME2:LT:230000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:220000 AND COL_132:TIME2:GT:220000) OR (COL_131:TIME2:GTE:220000 AND COL_131:TIME2:LT:230000)) )'
			,'')
	,'18'=>array(
				 '( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:230000 AND COL_128:TIME2:GT:230000) OR (COL_127:TIME2:GTE:230000 AND COL_127:TIME2:LT:240000)) )'
			.' OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:230000 AND COL_130:TIME2:GT:230000) OR (COL_129:TIME2:GTE:230000 AND COL_129:TIME2:LT:240000)) )'
			.' OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:230000 AND COL_132:TIME2:GT:230000) OR (COL_131:TIME2:GTE:230000 AND COL_131:TIME2:LT:240000)) )'
			,'')
	)
);
//    「宝くじ」以外を選択した場合
$D_COND[109] = array(
'type'=>'SL'
,'opts'=>array(
	// 平日
	 '101'=>array('( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:000000 AND COL_120:TIME2:GT:000000 ) OR (COL_119:TIME2:GTE:000000 AND COL_119:TIME2:LT:070000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:000000 AND COL_128:TIME2:GT:000000 ) OR (COL_127:TIME2:GTE:000000 AND COL_127:TIME2:LT:070000 )) )','')
	,'102'=>array('( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:070000 AND COL_120:TIME2:GT:070000 ) OR (COL_119:TIME2:GTE:070000 AND COL_119:TIME2:LT:080000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:070000 AND COL_128:TIME2:GT:070000 ) OR (COL_127:TIME2:GTE:070000 AND COL_127:TIME2:LT:080000 )) )','')
	,'103'=>array('( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:080000 AND COL_120:TIME2:GT:080000 ) OR (COL_119:TIME2:GTE:080000 AND COL_119:TIME2:LT:090000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:080000 AND COL_128:TIME2:GT:080000 ) OR (COL_127:TIME2:GTE:080000 AND COL_127:TIME2:LT:090000 )) )','')
	,'104'=>array('( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:090000 AND COL_120:TIME2:GT:090000 ) OR (COL_119:TIME2:GTE:090000 AND COL_119:TIME2:LT:100000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:090000 AND COL_128:TIME2:GT:090000 ) OR (COL_127:TIME2:GTE:090000 AND COL_127:TIME2:LT:100000 )) )','')
	,'105'=>array('( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:100000 AND COL_120:TIME2:GT:100000 ) OR (COL_119:TIME2:GTE:100000 AND COL_119:TIME2:LT:110000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:100000 AND COL_128:TIME2:GT:100000 ) OR (COL_127:TIME2:GTE:100000 AND COL_127:TIME2:LT:110000 )) )','')
	,'106'=>array('( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:110000 AND COL_120:TIME2:GT:110000 ) OR (COL_119:TIME2:GTE:110000 AND COL_119:TIME2:LT:120000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:110000 AND COL_128:TIME2:GT:110000 ) OR (COL_127:TIME2:GTE:110000 AND COL_127:TIME2:LT:120000 )) )','')
	,'107'=>array('( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:120000 AND COL_120:TIME2:GT:120000 ) OR (COL_119:TIME2:GTE:120000 AND COL_119:TIME2:LT:130000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:120000 AND COL_128:TIME2:GT:120000 ) OR (COL_127:TIME2:GTE:120000 AND COL_127:TIME2:LT:130000 )) )','')
	,'108'=>array('( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:130000 AND COL_120:TIME2:GT:130000 ) OR (COL_119:TIME2:GTE:130000 AND COL_119:TIME2:LT:140000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:130000 AND COL_128:TIME2:GT:130000 ) OR (COL_127:TIME2:GTE:130000 AND COL_127:TIME2:LT:140000 )) )','')
	,'109'=>array('( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:140000 AND COL_120:TIME2:GT:140000 ) OR (COL_119:TIME2:GTE:140000 AND COL_119:TIME2:LT:150000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:140000 AND COL_128:TIME2:GT:140000 ) OR (COL_127:TIME2:GTE:140000 AND COL_127:TIME2:LT:150000 )) )','')
	,'110'=>array('( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:150000 AND COL_120:TIME2:GT:150000 ) OR (COL_119:TIME2:GTE:150000 AND COL_119:TIME2:LT:160000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:150000 AND COL_128:TIME2:GT:150000 ) OR (COL_127:TIME2:GTE:150000 AND COL_127:TIME2:LT:160000 )) )','')
	,'111'=>array('( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:160000 AND COL_120:TIME2:GT:160000 ) OR (COL_119:TIME2:GTE:160000 AND COL_119:TIME2:LT:170000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:160000 AND COL_128:TIME2:GT:160000 ) OR (COL_127:TIME2:GTE:160000 AND COL_127:TIME2:LT:170000 )) )','')
	,'112'=>array('( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:170000 AND COL_120:TIME2:GT:170000 ) OR (COL_119:TIME2:GTE:170000 AND COL_119:TIME2:LT:180000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:170000 AND COL_128:TIME2:GT:170000 ) OR (COL_127:TIME2:GTE:170000 AND COL_127:TIME2:LT:180000 )) )','')
	,'113'=>array('( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:180000 AND COL_120:TIME2:GT:180000 ) OR (COL_119:TIME2:GTE:180000 AND COL_119:TIME2:LT:190000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:180000 AND COL_128:TIME2:GT:180000 ) OR (COL_127:TIME2:GTE:180000 AND COL_127:TIME2:LT:190000 )) )','')
	,'114'=>array('( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:190000 AND COL_120:TIME2:GT:190000 ) OR (COL_119:TIME2:GTE:190000 AND COL_119:TIME2:LT:200000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:190000 AND COL_128:TIME2:GT:190000 ) OR (COL_127:TIME2:GTE:190000 AND COL_127:TIME2:LT:200000 )) )','')
	,'115'=>array('( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:200000 AND COL_120:TIME2:GT:200000 ) OR (COL_119:TIME2:GTE:200000 AND COL_119:TIME2:LT:210000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:200000 AND COL_128:TIME2:GT:200000 ) OR (COL_127:TIME2:GTE:200000 AND COL_127:TIME2:LT:210000 )) )','')
	,'116'=>array('( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:210000 AND COL_120:TIME2:GT:210000 ) OR (COL_119:TIME2:GTE:210000 AND COL_119:TIME2:LT:220000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:210000 AND COL_128:TIME2:GT:210000 ) OR (COL_127:TIME2:GTE:210000 AND COL_127:TIME2:LT:220000 )) )','')
	,'117'=>array('( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:220000 AND COL_120:TIME2:GT:220000 ) OR (COL_119:TIME2:GTE:220000 AND COL_119:TIME2:LT:230000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:220000 AND COL_128:TIME2:GT:220000 ) OR (COL_127:TIME2:GTE:220000 AND COL_127:TIME2:LT:230000 )) )','')
	,'118'=>array('( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:230000 AND COL_120:TIME2:GT:230000 ) OR (COL_119:TIME2:GTE:230000 AND COL_119:TIME2:LT:240000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:230000 AND COL_128:TIME2:GT:230000 ) OR (COL_127:TIME2:GTE:230000 AND COL_127:TIME2:LT:240000 )) )','')
	// 土曜
	,'201'=>array('( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:000000 AND COL_122:TIME2:GT:000000 ) OR (COL_121:TIME2:GTE:000000 AND COL_121:TIME2:LT:070000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:000000 AND COL_130:TIME2:GT:000000 ) OR (COL_129:TIME2:GTE:000000 AND COL_129:TIME2:LT:070000 )) )','')
	,'202'=>array('( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:070000 AND COL_122:TIME2:GT:070000 ) OR (COL_121:TIME2:GTE:070000 AND COL_121:TIME2:LT:080000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:070000 AND COL_130:TIME2:GT:070000 ) OR (COL_129:TIME2:GTE:070000 AND COL_129:TIME2:LT:080000 )) )','')
	,'203'=>array('( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:080000 AND COL_122:TIME2:GT:080000 ) OR (COL_121:TIME2:GTE:080000 AND COL_121:TIME2:LT:090000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:080000 AND COL_130:TIME2:GT:080000 ) OR (COL_129:TIME2:GTE:080000 AND COL_129:TIME2:LT:090000 )) )','')
	,'204'=>array('( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:090000 AND COL_122:TIME2:GT:090000 ) OR (COL_121:TIME2:GTE:090000 AND COL_121:TIME2:LT:100000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:090000 AND COL_130:TIME2:GT:090000 ) OR (COL_129:TIME2:GTE:090000 AND COL_129:TIME2:LT:100000 )) )','')
	,'205'=>array('( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:100000 AND COL_122:TIME2:GT:100000 ) OR (COL_121:TIME2:GTE:100000 AND COL_121:TIME2:LT:110000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:100000 AND COL_130:TIME2:GT:100000 ) OR (COL_129:TIME2:GTE:100000 AND COL_129:TIME2:LT:110000 )) )','')
	,'206'=>array('( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:110000 AND COL_122:TIME2:GT:110000 ) OR (COL_121:TIME2:GTE:110000 AND COL_121:TIME2:LT:120000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:110000 AND COL_130:TIME2:GT:110000 ) OR (COL_129:TIME2:GTE:110000 AND COL_129:TIME2:LT:120000 )) )','')
	,'207'=>array('( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:120000 AND COL_122:TIME2:GT:120000 ) OR (COL_121:TIME2:GTE:120000 AND COL_121:TIME2:LT:130000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:120000 AND COL_130:TIME2:GT:120000 ) OR (COL_129:TIME2:GTE:120000 AND COL_129:TIME2:LT:130000 )) )','')
	,'208'=>array('( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:130000 AND COL_122:TIME2:GT:130000 ) OR (COL_121:TIME2:GTE:130000 AND COL_121:TIME2:LT:140000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:130000 AND COL_130:TIME2:GT:130000 ) OR (COL_129:TIME2:GTE:130000 AND COL_129:TIME2:LT:140000 )) )','')
	,'209'=>array('( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:140000 AND COL_122:TIME2:GT:140000 ) OR (COL_121:TIME2:GTE:140000 AND COL_121:TIME2:LT:150000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:140000 AND COL_130:TIME2:GT:140000 ) OR (COL_129:TIME2:GTE:140000 AND COL_129:TIME2:LT:150000 )) )','')
	,'210'=>array('( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:150000 AND COL_122:TIME2:GT:150000 ) OR (COL_121:TIME2:GTE:150000 AND COL_121:TIME2:LT:160000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:150000 AND COL_130:TIME2:GT:150000 ) OR (COL_129:TIME2:GTE:150000 AND COL_129:TIME2:LT:160000 )) )','')
	,'211'=>array('( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:160000 AND COL_122:TIME2:GT:160000 ) OR (COL_121:TIME2:GTE:160000 AND COL_121:TIME2:LT:170000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:160000 AND COL_130:TIME2:GT:160000 ) OR (COL_129:TIME2:GTE:160000 AND COL_129:TIME2:LT:170000 )) )','')
	,'212'=>array('( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:170000 AND COL_122:TIME2:GT:170000 ) OR (COL_121:TIME2:GTE:170000 AND COL_121:TIME2:LT:180000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:170000 AND COL_130:TIME2:GT:170000 ) OR (COL_129:TIME2:GTE:170000 AND COL_129:TIME2:LT:180000 )) )','')
	,'213'=>array('( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:180000 AND COL_122:TIME2:GT:180000 ) OR (COL_121:TIME2:GTE:180000 AND COL_121:TIME2:LT:190000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:180000 AND COL_130:TIME2:GT:180000 ) OR (COL_129:TIME2:GTE:180000 AND COL_129:TIME2:LT:190000 )) )','')
	,'214'=>array('( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:190000 AND COL_122:TIME2:GT:190000 ) OR (COL_121:TIME2:GTE:190000 AND COL_121:TIME2:LT:200000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:190000 AND COL_130:TIME2:GT:190000 ) OR (COL_129:TIME2:GTE:190000 AND COL_129:TIME2:LT:200000 )) )','')
	,'215'=>array('( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:200000 AND COL_122:TIME2:GT:200000 ) OR (COL_121:TIME2:GTE:200000 AND COL_121:TIME2:LT:210000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:200000 AND COL_130:TIME2:GT:200000 ) OR (COL_129:TIME2:GTE:200000 AND COL_129:TIME2:LT:210000 )) )','')
	,'216'=>array('( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:210000 AND COL_122:TIME2:GT:210000 ) OR (COL_121:TIME2:GTE:210000 AND COL_121:TIME2:LT:220000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:210000 AND COL_130:TIME2:GT:210000 ) OR (COL_129:TIME2:GTE:210000 AND COL_129:TIME2:LT:220000 )) )','')
	,'217'=>array('( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:220000 AND COL_122:TIME2:GT:220000 ) OR (COL_121:TIME2:GTE:220000 AND COL_121:TIME2:LT:230000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:220000 AND COL_130:TIME2:GT:220000 ) OR (COL_129:TIME2:GTE:220000 AND COL_129:TIME2:LT:230000 )) )','')
	,'218'=>array('( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:230000 AND COL_122:TIME2:GT:230000 ) OR (COL_121:TIME2:GTE:230000 AND COL_121:TIME2:LT:240000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:230000 AND COL_130:TIME2:GT:230000 ) OR (COL_129:TIME2:GTE:230000 AND COL_129:TIME2:LT:240000 )) )','')
	// 日曜・休日
	,'301'=>array('( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:000000 AND COL_124:TIME2:GT:000000 ) OR (COL_123:TIME2:GTE:000000 AND COL_123:TIME2:LT:070000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:000000 AND COL_132:TIME2:GT:000000 ) OR (COL_131:TIME2:GTE:000000 AND COL_131:TIME2:LT:070000 )) )','')
	,'302'=>array('( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:070000 AND COL_124:TIME2:GT:070000 ) OR (COL_123:TIME2:GTE:070000 AND COL_123:TIME2:LT:080000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:070000 AND COL_132:TIME2:GT:070000 ) OR (COL_131:TIME2:GTE:070000 AND COL_131:TIME2:LT:080000 )) )','')
	,'303'=>array('( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:080000 AND COL_124:TIME2:GT:080000 ) OR (COL_123:TIME2:GTE:080000 AND COL_123:TIME2:LT:090000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:080000 AND COL_132:TIME2:GT:080000 ) OR (COL_131:TIME2:GTE:080000 AND COL_131:TIME2:LT:090000 )) )','')
	,'304'=>array('( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:090000 AND COL_124:TIME2:GT:090000 ) OR (COL_123:TIME2:GTE:090000 AND COL_123:TIME2:LT:100000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:090000 AND COL_132:TIME2:GT:090000 ) OR (COL_131:TIME2:GTE:090000 AND COL_131:TIME2:LT:100000 )) )','')
	,'305'=>array('( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:100000 AND COL_124:TIME2:GT:100000 ) OR (COL_123:TIME2:GTE:100000 AND COL_123:TIME2:LT:110000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:100000 AND COL_132:TIME2:GT:100000 ) OR (COL_131:TIME2:GTE:100000 AND COL_131:TIME2:LT:110000 )) )','')
	,'306'=>array('( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:110000 AND COL_124:TIME2:GT:110000 ) OR (COL_123:TIME2:GTE:110000 AND COL_123:TIME2:LT:120000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:110000 AND COL_132:TIME2:GT:110000 ) OR (COL_131:TIME2:GTE:110000 AND COL_131:TIME2:LT:120000 )) )','')
	,'307'=>array('( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:120000 AND COL_124:TIME2:GT:120000 ) OR (COL_123:TIME2:GTE:120000 AND COL_123:TIME2:LT:130000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:120000 AND COL_132:TIME2:GT:120000 ) OR (COL_131:TIME2:GTE:120000 AND COL_131:TIME2:LT:130000 )) )','')
	,'308'=>array('( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:130000 AND COL_124:TIME2:GT:130000 ) OR (COL_123:TIME2:GTE:130000 AND COL_123:TIME2:LT:140000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:130000 AND COL_132:TIME2:GT:130000 ) OR (COL_131:TIME2:GTE:130000 AND COL_131:TIME2:LT:140000 )) )','')
	,'309'=>array('( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:140000 AND COL_124:TIME2:GT:140000 ) OR (COL_123:TIME2:GTE:140000 AND COL_123:TIME2:LT:150000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:140000 AND COL_132:TIME2:GT:140000 ) OR (COL_131:TIME2:GTE:140000 AND COL_131:TIME2:LT:150000 )) )','')
	,'310'=>array('( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:150000 AND COL_124:TIME2:GT:150000 ) OR (COL_123:TIME2:GTE:150000 AND COL_123:TIME2:LT:160000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:150000 AND COL_132:TIME2:GT:150000 ) OR (COL_131:TIME2:GTE:150000 AND COL_131:TIME2:LT:160000 )) )','')
	,'311'=>array('( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:160000 AND COL_124:TIME2:GT:160000 ) OR (COL_123:TIME2:GTE:160000 AND COL_123:TIME2:LT:170000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:160000 AND COL_132:TIME2:GT:160000 ) OR (COL_131:TIME2:GTE:160000 AND COL_131:TIME2:LT:170000 )) )','')
	,'312'=>array('( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:170000 AND COL_124:TIME2:GT:170000 ) OR (COL_123:TIME2:GTE:170000 AND COL_123:TIME2:LT:180000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:170000 AND COL_132:TIME2:GT:170000 ) OR (COL_131:TIME2:GTE:170000 AND COL_131:TIME2:LT:180000 )) )','')
	,'313'=>array('( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:180000 AND COL_124:TIME2:GT:180000 ) OR (COL_123:TIME2:GTE:180000 AND COL_123:TIME2:LT:190000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:180000 AND COL_132:TIME2:GT:180000 ) OR (COL_131:TIME2:GTE:180000 AND COL_131:TIME2:LT:190000 )) )','')
	,'314'=>array('( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:190000 AND COL_124:TIME2:GT:190000 ) OR (COL_123:TIME2:GTE:190000 AND COL_123:TIME2:LT:200000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:190000 AND COL_132:TIME2:GT:190000 ) OR (COL_131:TIME2:GTE:190000 AND COL_131:TIME2:LT:200000 )) )','')
	,'315'=>array('( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:200000 AND COL_124:TIME2:GT:200000 ) OR (COL_123:TIME2:GTE:200000 AND COL_123:TIME2:LT:210000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:200000 AND COL_132:TIME2:GT:200000 ) OR (COL_131:TIME2:GTE:200000 AND COL_131:TIME2:LT:210000 )) )','')
	,'316'=>array('( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:210000 AND COL_124:TIME2:GT:210000 ) OR (COL_123:TIME2:GTE:210000 AND COL_123:TIME2:LT:220000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:210000 AND COL_132:TIME2:GT:210000 ) OR (COL_131:TIME2:GTE:210000 AND COL_131:TIME2:LT:220000 )) )','')
	,'317'=>array('( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:220000 AND COL_124:TIME2:GT:220000 ) OR (COL_123:TIME2:GTE:220000 AND COL_123:TIME2:LT:230000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:220000 AND COL_132:TIME2:GT:220000 ) OR (COL_131:TIME2:GTE:220000 AND COL_131:TIME2:LT:230000 )) )','')
	,'318'=>array('( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:230000 AND COL_124:TIME2:GT:230000 ) OR (COL_123:TIME2:GTE:230000 AND COL_123:TIME2:LT:240000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:230000 AND COL_132:TIME2:GT:230000 ) OR (COL_131:TIME2:GTE:230000 AND COL_131:TIME2:LT:240000 )) )','')
	// 曜日のみ
	,'1'=>array('( (COL_119!:00:00:00 AND COL_119!:@@NULL@@) OR (COL_120!:00:00:00 AND COL_120!:@@NULL@@) ) OR ( (COL_127!:00:00:00 AND COL_127!:@@NULL@@) OR (COL_128!:00:00:00 AND COL_128!:@@NULL@@) )','')
	,'2'=>array('( (COL_121!:00:00:00 AND COL_121!:@@NULL@@) OR (COL_122!:00:00:00 AND COL_122!:@@NULL@@) ) OR ( (COL_129!:00:00:00 AND COL_129!:@@NULL@@) OR (COL_130!:00:00:00 AND COL_130!:@@NULL@@) )','')
	,'3'=>array('( (COL_123!:00:00:00 AND COL_123!:@@NULL@@) OR (COL_124!:00:00:00 AND COL_124!:@@NULL@@) ) OR ( (COL_131!:00:00:00 AND COL_131!:@@NULL@@) OR (COL_132!:00:00:00 AND COL_132!:@@NULL@@) )','')
	// 時間帯のみ
	,'01'=>array(
				 '( ( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:000000 AND COL_120:TIME2:GT:000000 ) OR (COL_119:TIME2:GTE:000000 AND COL_119:TIME2:LT:070000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:000000 AND COL_128:TIME2:GT:000000 ) OR (COL_127:TIME2:GTE:000000 AND COL_127:TIME2:LT:070000 )) ) )'
			.' OR ( ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:000000 AND COL_122:TIME2:GT:000000 ) OR (COL_121:TIME2:GTE:000000 AND COL_121:TIME2:LT:070000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:000000 AND COL_130:TIME2:GT:000000 ) OR (COL_129:TIME2:GTE:000000 AND COL_129:TIME2:LT:070000 )) ) )'
			.' OR ( ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:000000 AND COL_124:TIME2:GT:000000 ) OR (COL_123:TIME2:GTE:000000 AND COL_123:TIME2:LT:070000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:000000 AND COL_132:TIME2:GT:000000 ) OR (COL_131:TIME2:GTE:000000 AND COL_131:TIME2:LT:070000 )) ) )'
			,'')
	,'02'=>array(
				 '( ( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:070000 AND COL_120:TIME2:GT:070000 ) OR (COL_119:TIME2:GTE:070000 AND COL_119:TIME2:LT:080000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:070000 AND COL_128:TIME2:GT:070000 ) OR (COL_127:TIME2:GTE:070000 AND COL_127:TIME2:LT:080000 )) ) )'
			.' OR ( ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:070000 AND COL_122:TIME2:GT:070000 ) OR (COL_121:TIME2:GTE:070000 AND COL_121:TIME2:LT:080000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:070000 AND COL_130:TIME2:GT:070000 ) OR (COL_129:TIME2:GTE:070000 AND COL_129:TIME2:LT:080000 )) ) )'
			.' OR ( ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:070000 AND COL_124:TIME2:GT:070000 ) OR (COL_123:TIME2:GTE:070000 AND COL_123:TIME2:LT:080000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:070000 AND COL_132:TIME2:GT:070000 ) OR (COL_131:TIME2:GTE:070000 AND COL_131:TIME2:LT:080000 )) ) )'
			,'')
	,'03'=>array(
				 '( ( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:080000 AND COL_120:TIME2:GT:080000 ) OR (COL_119:TIME2:GTE:080000 AND COL_119:TIME2:LT:090000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:080000 AND COL_128:TIME2:GT:080000 ) OR (COL_127:TIME2:GTE:080000 AND COL_127:TIME2:LT:090000 )) ) )'
			.' OR ( ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:080000 AND COL_122:TIME2:GT:080000 ) OR (COL_121:TIME2:GTE:080000 AND COL_121:TIME2:LT:090000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:080000 AND COL_130:TIME2:GT:080000 ) OR (COL_129:TIME2:GTE:080000 AND COL_129:TIME2:LT:090000 )) ) )'
			.' OR ( ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:080000 AND COL_124:TIME2:GT:080000 ) OR (COL_123:TIME2:GTE:080000 AND COL_123:TIME2:LT:090000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:080000 AND COL_132:TIME2:GT:080000 ) OR (COL_131:TIME2:GTE:080000 AND COL_131:TIME2:LT:090000 )) ) )'
			,'')
	,'04'=>array(
				 '( ( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:090000 AND COL_120:TIME2:GT:090000 ) OR (COL_119:TIME2:GTE:090000 AND COL_119:TIME2:LT:100000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:090000 AND COL_128:TIME2:GT:090000 ) OR (COL_127:TIME2:GTE:090000 AND COL_127:TIME2:LT:100000 )) ) )'
			.' OR ( ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:090000 AND COL_122:TIME2:GT:090000 ) OR (COL_121:TIME2:GTE:090000 AND COL_121:TIME2:LT:100000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:090000 AND COL_130:TIME2:GT:090000 ) OR (COL_129:TIME2:GTE:090000 AND COL_129:TIME2:LT:100000 )) ) )'
			.' OR ( ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:090000 AND COL_124:TIME2:GT:090000 ) OR (COL_123:TIME2:GTE:090000 AND COL_123:TIME2:LT:100000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:090000 AND COL_132:TIME2:GT:090000 ) OR (COL_131:TIME2:GTE:090000 AND COL_131:TIME2:LT:100000 )) ) )'
			,'')
	,'05'=>array(
				 '( ( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:100000 AND COL_120:TIME2:GT:100000 ) OR (COL_119:TIME2:GTE:100000 AND COL_119:TIME2:LT:110000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:100000 AND COL_128:TIME2:GT:100000 ) OR (COL_127:TIME2:GTE:100000 AND COL_127:TIME2:LT:110000 )) ) )'
			.' OR ( ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:100000 AND COL_122:TIME2:GT:100000 ) OR (COL_121:TIME2:GTE:100000 AND COL_121:TIME2:LT:110000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:100000 AND COL_130:TIME2:GT:100000 ) OR (COL_129:TIME2:GTE:100000 AND COL_129:TIME2:LT:110000 )) ) )'
			.' OR ( ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:100000 AND COL_124:TIME2:GT:100000 ) OR (COL_123:TIME2:GTE:100000 AND COL_123:TIME2:LT:110000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:100000 AND COL_132:TIME2:GT:100000 ) OR (COL_131:TIME2:GTE:100000 AND COL_131:TIME2:LT:110000 )) ) )'
			,'')
	,'06'=>array(
				 '( ( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:110000 AND COL_120:TIME2:GT:110000 ) OR (COL_119:TIME2:GTE:110000 AND COL_119:TIME2:LT:120000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:110000 AND COL_128:TIME2:GT:110000 ) OR (COL_127:TIME2:GTE:110000 AND COL_127:TIME2:LT:120000 )) ) )'
			.' OR ( ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:110000 AND COL_122:TIME2:GT:110000 ) OR (COL_121:TIME2:GTE:110000 AND COL_121:TIME2:LT:120000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:110000 AND COL_130:TIME2:GT:110000 ) OR (COL_129:TIME2:GTE:110000 AND COL_129:TIME2:LT:120000 )) ) )'
			.' OR ( ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:110000 AND COL_124:TIME2:GT:110000 ) OR (COL_123:TIME2:GTE:110000 AND COL_123:TIME2:LT:120000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:110000 AND COL_132:TIME2:GT:110000 ) OR (COL_131:TIME2:GTE:110000 AND COL_131:TIME2:LT:120000 )) ) )'
			,'')
	,'07'=>array(
				 '( ( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:120000 AND COL_120:TIME2:GT:120000 ) OR (COL_119:TIME2:GTE:120000 AND COL_119:TIME2:LT:130000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:120000 AND COL_128:TIME2:GT:120000 ) OR (COL_127:TIME2:GTE:120000 AND COL_127:TIME2:LT:130000 )) ) )'
			.' OR ( ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:120000 AND COL_122:TIME2:GT:120000 ) OR (COL_121:TIME2:GTE:120000 AND COL_121:TIME2:LT:130000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:120000 AND COL_130:TIME2:GT:120000 ) OR (COL_129:TIME2:GTE:120000 AND COL_129:TIME2:LT:130000 )) ) )'
			.' OR ( ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:120000 AND COL_124:TIME2:GT:120000 ) OR (COL_123:TIME2:GTE:120000 AND COL_123:TIME2:LT:130000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:120000 AND COL_132:TIME2:GT:120000 ) OR (COL_131:TIME2:GTE:120000 AND COL_131:TIME2:LT:130000 )) ) )'
			,'')
	,'08'=>array(
				 '( ( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:130000 AND COL_120:TIME2:GT:130000 ) OR (COL_119:TIME2:GTE:130000 AND COL_119:TIME2:LT:140000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:130000 AND COL_128:TIME2:GT:130000 ) OR (COL_127:TIME2:GTE:130000 AND COL_127:TIME2:LT:140000 )) ) )'
			.' OR ( ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:130000 AND COL_122:TIME2:GT:130000 ) OR (COL_121:TIME2:GTE:130000 AND COL_121:TIME2:LT:140000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:130000 AND COL_130:TIME2:GT:130000 ) OR (COL_129:TIME2:GTE:130000 AND COL_129:TIME2:LT:140000 )) ) )'
			.' OR ( ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:130000 AND COL_124:TIME2:GT:130000 ) OR (COL_123:TIME2:GTE:130000 AND COL_123:TIME2:LT:140000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:130000 AND COL_132:TIME2:GT:130000 ) OR (COL_131:TIME2:GTE:130000 AND COL_131:TIME2:LT:140000 )) ) )'
			,'')
	,'09'=>array(
				 '( ( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:140000 AND COL_120:TIME2:GT:140000 ) OR (COL_119:TIME2:GTE:140000 AND COL_119:TIME2:LT:150000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:140000 AND COL_128:TIME2:GT:140000 ) OR (COL_127:TIME2:GTE:140000 AND COL_127:TIME2:LT:150000 )) ) )'
			.' OR ( ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:140000 AND COL_122:TIME2:GT:140000 ) OR (COL_121:TIME2:GTE:140000 AND COL_121:TIME2:LT:150000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:140000 AND COL_130:TIME2:GT:140000 ) OR (COL_129:TIME2:GTE:140000 AND COL_129:TIME2:LT:150000 )) ) )'
			.' OR ( ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:140000 AND COL_124:TIME2:GT:140000 ) OR (COL_123:TIME2:GTE:140000 AND COL_123:TIME2:LT:150000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:140000 AND COL_132:TIME2:GT:140000 ) OR (COL_131:TIME2:GTE:140000 AND COL_131:TIME2:LT:150000 )) ) )'
			,'')
	,'10'=>array(
				 '( ( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:150000 AND COL_120:TIME2:GT:150000 ) OR (COL_119:TIME2:GTE:150000 AND COL_119:TIME2:LT:160000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:150000 AND COL_128:TIME2:GT:150000 ) OR (COL_127:TIME2:GTE:150000 AND COL_127:TIME2:LT:160000 )) ) )'
			.' OR ( ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:150000 AND COL_122:TIME2:GT:150000 ) OR (COL_121:TIME2:GTE:150000 AND COL_121:TIME2:LT:160000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:150000 AND COL_130:TIME2:GT:150000 ) OR (COL_129:TIME2:GTE:150000 AND COL_129:TIME2:LT:160000 )) ) )'
			.' OR ( ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:150000 AND COL_124:TIME2:GT:150000 ) OR (COL_123:TIME2:GTE:150000 AND COL_123:TIME2:LT:160000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:150000 AND COL_132:TIME2:GT:150000 ) OR (COL_131:TIME2:GTE:150000 AND COL_131:TIME2:LT:160000 )) ) )'
			,'')
	,'11'=>array(
				 '( ( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:160000 AND COL_120:TIME2:GT:160000 ) OR (COL_119:TIME2:GTE:160000 AND COL_119:TIME2:LT:170000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:160000 AND COL_128:TIME2:GT:160000 ) OR (COL_127:TIME2:GTE:160000 AND COL_127:TIME2:LT:170000 )) ) )'
			.' OR ( ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:160000 AND COL_122:TIME2:GT:160000 ) OR (COL_121:TIME2:GTE:160000 AND COL_121:TIME2:LT:170000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:160000 AND COL_130:TIME2:GT:160000 ) OR (COL_129:TIME2:GTE:160000 AND COL_129:TIME2:LT:170000 )) ) )'
			.' OR ( ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:160000 AND COL_124:TIME2:GT:160000 ) OR (COL_123:TIME2:GTE:160000 AND COL_123:TIME2:LT:170000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:160000 AND COL_132:TIME2:GT:160000 ) OR (COL_131:TIME2:GTE:160000 AND COL_131:TIME2:LT:170000 )) ) )'
			,'')
	,'12'=>array(
				 '( ( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:170000 AND COL_120:TIME2:GT:170000 ) OR (COL_119:TIME2:GTE:170000 AND COL_119:TIME2:LT:180000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:170000 AND COL_128:TIME2:GT:170000 ) OR (COL_127:TIME2:GTE:170000 AND COL_127:TIME2:LT:180000 )) ) )'
			.' OR ( ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:170000 AND COL_122:TIME2:GT:170000 ) OR (COL_121:TIME2:GTE:170000 AND COL_121:TIME2:LT:180000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:170000 AND COL_130:TIME2:GT:170000 ) OR (COL_129:TIME2:GTE:170000 AND COL_129:TIME2:LT:180000 )) ) )'
			.' OR ( ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:170000 AND COL_124:TIME2:GT:170000 ) OR (COL_123:TIME2:GTE:170000 AND COL_123:TIME2:LT:180000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:170000 AND COL_132:TIME2:GT:170000 ) OR (COL_131:TIME2:GTE:170000 AND COL_131:TIME2:LT:180000 )) ) )'
			,'')
	,'13'=>array(
				 '( ( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:180000 AND COL_120:TIME2:GT:180000 ) OR (COL_119:TIME2:GTE:180000 AND COL_119:TIME2:LT:190000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:180000 AND COL_128:TIME2:GT:180000 ) OR (COL_127:TIME2:GTE:180000 AND COL_127:TIME2:LT:190000 )) ) )'
			.' OR ( ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:180000 AND COL_122:TIME2:GT:180000 ) OR (COL_121:TIME2:GTE:180000 AND COL_121:TIME2:LT:190000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:180000 AND COL_130:TIME2:GT:180000 ) OR (COL_129:TIME2:GTE:180000 AND COL_129:TIME2:LT:190000 )) ) )'
			.' OR ( ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:180000 AND COL_124:TIME2:GT:180000 ) OR (COL_123:TIME2:GTE:180000 AND COL_123:TIME2:LT:190000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:180000 AND COL_132:TIME2:GT:180000 ) OR (COL_131:TIME2:GTE:180000 AND COL_131:TIME2:LT:190000 )) ) )'
			,'')
	,'14'=>array(
				 '( ( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:190000 AND COL_120:TIME2:GT:190000 ) OR (COL_119:TIME2:GTE:190000 AND COL_119:TIME2:LT:200000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:190000 AND COL_128:TIME2:GT:190000 ) OR (COL_127:TIME2:GTE:190000 AND COL_127:TIME2:LT:200000 )) ) )'
			.' OR ( ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:190000 AND COL_122:TIME2:GT:190000 ) OR (COL_121:TIME2:GTE:190000 AND COL_121:TIME2:LT:200000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:190000 AND COL_130:TIME2:GT:190000 ) OR (COL_129:TIME2:GTE:190000 AND COL_129:TIME2:LT:200000 )) ) )'
			.' OR ( ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:190000 AND COL_124:TIME2:GT:190000 ) OR (COL_123:TIME2:GTE:190000 AND COL_123:TIME2:LT:200000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:190000 AND COL_132:TIME2:GT:190000 ) OR (COL_131:TIME2:GTE:190000 AND COL_131:TIME2:LT:200000 )) ) )'
			,'')
	,'15'=>array(
				 '( ( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:200000 AND COL_120:TIME2:GT:200000 ) OR (COL_119:TIME2:GTE:200000 AND COL_119:TIME2:LT:210000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:200000 AND COL_128:TIME2:GT:200000 ) OR (COL_127:TIME2:GTE:200000 AND COL_127:TIME2:LT:210000 )) ) )'
			.' OR ( ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:200000 AND COL_122:TIME2:GT:200000 ) OR (COL_121:TIME2:GTE:200000 AND COL_121:TIME2:LT:210000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:200000 AND COL_130:TIME2:GT:200000 ) OR (COL_129:TIME2:GTE:200000 AND COL_129:TIME2:LT:210000 )) ) )'
			.' OR ( ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:200000 AND COL_124:TIME2:GT:200000 ) OR (COL_123:TIME2:GTE:200000 AND COL_123:TIME2:LT:210000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:200000 AND COL_132:TIME2:GT:200000 ) OR (COL_131:TIME2:GTE:200000 AND COL_131:TIME2:LT:210000 )) ) )'
			,'')
	,'16'=>array(
				 '( ( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:210000 AND COL_120:TIME2:GT:210000 ) OR (COL_119:TIME2:GTE:210000 AND COL_119:TIME2:LT:220000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:210000 AND COL_128:TIME2:GT:210000 ) OR (COL_127:TIME2:GTE:210000 AND COL_127:TIME2:LT:220000 )) ) )'
			.' OR ( ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:210000 AND COL_122:TIME2:GT:210000 ) OR (COL_121:TIME2:GTE:210000 AND COL_121:TIME2:LT:220000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:210000 AND COL_130:TIME2:GT:210000 ) OR (COL_129:TIME2:GTE:210000 AND COL_129:TIME2:LT:220000 )) ) )'
			.' OR ( ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:210000 AND COL_124:TIME2:GT:210000 ) OR (COL_123:TIME2:GTE:210000 AND COL_123:TIME2:LT:220000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:210000 AND COL_132:TIME2:GT:210000 ) OR (COL_131:TIME2:GTE:210000 AND COL_131:TIME2:LT:220000 )) ) )'
			,'')
	,'17'=>array(
				 '( ( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:220000 AND COL_120:TIME2:GT:220000 ) OR (COL_119:TIME2:GTE:220000 AND COL_119:TIME2:LT:230000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:220000 AND COL_128:TIME2:GT:220000 ) OR (COL_127:TIME2:GTE:220000 AND COL_127:TIME2:LT:230000 )) ) )'
			.' OR ( ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:220000 AND COL_122:TIME2:GT:220000 ) OR (COL_121:TIME2:GTE:220000 AND COL_121:TIME2:LT:230000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:220000 AND COL_130:TIME2:GT:220000 ) OR (COL_129:TIME2:GTE:220000 AND COL_129:TIME2:LT:230000 )) ) )'
			.' OR ( ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:220000 AND COL_124:TIME2:GT:220000 ) OR (COL_123:TIME2:GTE:220000 AND COL_123:TIME2:LT:230000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:220000 AND COL_132:TIME2:GT:220000 ) OR (COL_131:TIME2:GTE:220000 AND COL_131:TIME2:LT:230000 )) ) )'
			,'')
	,'18'=>array(
				 '( ( (COL_119!:00:00:00 OR COL_120!:00:00:00) AND ((COL_119:TIME2:LTE:230000 AND COL_120:TIME2:GT:230000 ) OR (COL_119:TIME2:GTE:230000 AND COL_119:TIME2:LT:240000 )) ) OR ( (COL_127!:00:00:00 OR COL_128!:00:00:00) AND ((COL_127:TIME2:LTE:230000 AND COL_128:TIME2:GT:230000 ) OR (COL_127:TIME2:GTE:230000 AND COL_127:TIME2:LT:240000 )) ) )'
			.' OR ( ( (COL_121!:00:00:00 OR COL_122!:00:00:00) AND ((COL_121:TIME2:LTE:230000 AND COL_122:TIME2:GT:230000 ) OR (COL_121:TIME2:GTE:230000 AND COL_121:TIME2:LT:240000 )) ) OR ( (COL_129!:00:00:00 OR COL_130!:00:00:00) AND ((COL_129:TIME2:LTE:230000 AND COL_130:TIME2:GT:230000 ) OR (COL_129:TIME2:GTE:230000 AND COL_129:TIME2:LT:240000 )) ) )'
			.' OR ( ( (COL_123!:00:00:00 OR COL_124!:00:00:00) AND ((COL_123:TIME2:LTE:230000 AND COL_124:TIME2:GT:230000 ) OR (COL_123:TIME2:GTE:230000 AND COL_123:TIME2:LT:240000 )) ) OR ( (COL_131!:00:00:00 OR COL_132!:00:00:00) AND ((COL_131:TIME2:LTE:230000 AND COL_132:TIME2:GT:230000 ) OR (COL_131:TIME2:GTE:230000 AND COL_131:TIME2:LT:240000 )) ) )'
			,'')
	)
);
// 常に有効な絞り込み条件
// 表示フラグがONで、かつ「かんぽ店舗」を除外
$D_COND[200] = array('type'=>'CB', 'val'=>'COL_17:t AND (COL_19!:@@NULL@@ OR COL_27!:@@NULL@@ OR COL_36!:@@NULL@@)');
$_VARS['cond200'] = 1;


$D_COND_GRP_ANDOR = 'AND';
$D_COND_GRP[0] = array(1,2,3,4,5,6,7,8,9,10,
						11,12,13,14,15,16,17,18,19,20,
						21,22,23,24,25,26,27,28,29,30,
						31,32,33);
$D_COND_ANDOR[0] = 'AND';
$D_COND_GRP[1] = array(200);
$D_COND_ANDOR[1] = 'AND';
$D_COND_GRP[2] = array(101,102);
$D_COND_ANDOR[2] = 'OR';
$D_COND_GRP[3] = array(103,104);
$D_COND_ANDOR[3] = 'OR';
$D_COND_GRP[4] = array(105,106);
$D_COND_ANDOR[4] = 'OR';
$D_COND_GRP[5] = array(107);
$D_COND_ANDOR[5] = 'OR';
$D_COND_GRP[6] = array(108,109);
$D_COND_ANDOR[6] = 'OR';

//--------------------------------------------
//印刷画面
//--------------------------------------------
//印刷画面で最寄り拠点アイコンを表示するか（0：表示しない、1：表示する）
$D_SHOP_PRINT_SEARCH = 1;

//--------------------------------------------
//検索結果
//--------------------------------------------
//住所リスト／駅リストでカナ絞り込みを使用（0：使用しない、1：使用する）
$D_SEARCH_KANA = 1;
//拠点エリアの住所リストでカナ絞り込みを使用（0：使用しない、1：使用する）
$D_SEARCH_SHOPA_KANA = 1;

//--------------------------------------------
//検索結果（テーブル形式）のレイアウト情報
//--------------------------------------------
//列数
//※この設定を変更した場合、search_table.tplとsearch_addrtable.tplのHTMLを調整する必要があります。
$D_SEARCH_TABLE_COLS = 3;
//行数
$D_SEARCH_TABLE_ROWS = 8;
//１ページの表示件数（※編集不可）
$D_SEARCH_TABLE_PAGE = $D_SEARCH_TABLE_COLS * $D_SEARCH_TABLE_ROWS;

$D_SEARCH_MAXPAGE["ShopW"] = 1000;
$D_SEARCH_MAXPAGE["ShopA"] = 1000;

//--------------------------------------------
// フリーワード検索
//--------------------------------------------
//フリーワード複合検索用フラグ
$D_COMB_FW_ZIP  = 1;	//郵便番号フリーワード
$D_COMB_FW_ADDR = 1;	//住所フリーワード
$D_COMB_FW_ST   = 1;	//駅フリーワード
$D_COMB_FW_POI  = 0;	//施設フリーワード
$D_COMB_FW_SHOP = 1;	//拠点フリーワード
//フリーワード複合検索出力件数
$D_COMB_FW_ZIP_MAX  = 5;	//郵便番号フリーワード
$D_COMB_FW_ADDR_MAX = 5;	//住所フリーワード
$D_COMB_FW_ST_MAX   = 5;	//駅フリーワード
$D_COMB_FW_POI_MAX  = 5;	//施設フリーワード
$D_COMB_FW_SHOP_MAX = 5;	//拠点フリーワード

//--------------------------------------------
// 複合ルートの出発地複合フリーワード検索
//--------------------------------------------
//フリーワード複合検索用フラグ
$D_DEPT_FW_ZIP  = 0;	//郵便番号フリーワード
$D_DEPT_FW_ADDR = 1;	//住所フリーワード
$D_DEPT_FW_ST   = 1;	//駅フリーワード
$D_DEPT_FW_POI  = 0;	//施設フリーワード
//フリーワード複合検索出力件数
$D_DEPT_FW_ZIP_MAX  = 0;	//郵便番号フリーワード
$D_DEPT_FW_ADDR_MAX = 90;	//住所フリーワード($D_SEARCH_MAXPAGE["AddrW"] * $D_SEARCH_LIST_PAGE)
$D_DEPT_FW_ST_MAX   = 216;	//駅フリーワード($D_SEARCH_MAXPAGE["StW"] * $D_SEARCH_TABLE_PAGE)
$D_DEPT_FW_POI_MAX  = 0;	//施設フリーワード

?>
