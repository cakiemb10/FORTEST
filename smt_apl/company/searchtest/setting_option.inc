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

// 路線リスト検索利用不可（TOPへリダイレクト）
// if ($script_name == 'search_rosen.htm') {
// 	if (!isset($line) || $line == '') {
// 		header('HTTP/1.1 301 Moved Permanently');
// 		header('Location: '.$D_DIR_BASE_G);
// 		exit;
// 	}
// }

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

if ($D_EMAP_ENV == 'www') {
	//canonicalタグ指定
	switch($script_name) {
		case 'index.htm':
		case 'search.htm':
			$D_FREE_VAR[":canonical_url"] = $D_DIR_BASE_G;
			break;
		case 'shop_inf.htm':
			$D_FREE_VAR[":canonical_url"] = $D_DIR_BASE_G."inf/$kid/";
			break;
		case 'shop_map.htm':
			$D_FREE_VAR[":canonical_url"] = $D_DIR_BASE_G."map/$kid/";
			break;
		default:
			break;
	}
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

// charset出力
$D_RESPONSE_CHARSET = 1;

// PCサイトTOPのURL
$D_FREE_VAR[":pc_site_url"] = $D_PC2_URL;

if ($D_EMAP_ENV == 'www') {
	$D_GOOGLEMAPS_CID = 'gme-japanpostcoltd1';
	$D_GOOGLEMAPS_CHANNEL = $D_CID;
} else if ($D_EMAP_ENV == 'test') {
	$D_GOOGLEMAPS_CID = 'gme-zenrindatacomcoltd';
	if ($hostname == 'aws-storenavi-web0001' || $hostname == 'aws-storenavi-web2001') {
		$D_GOOGLEMAPS_CID = 'gme-japanpostcoltd1';
	}
	$D_GOOGLEMAPS_CHANNEL = $D_CID;
}
$D_FREE_VAR[":en_url"] = "https://{$GLOBAL_DOMAIN}/smt/en/search/nmap.htm?auto=1";	// 英語
$D_FREE_VAR[":tw_url"] = "https://{$GLOBAL_DOMAIN}/smt/tw/search/nmap.htm?auto=1";	// 中国語（繁体字）
$D_FREE_VAR[":cn_url"] = "https://{$GLOBAL_DOMAIN}/smt/cn/search/nmap.htm?auto=1";	// 中国語（簡体字）
$D_FREE_VAR[":ko_url"] = "https://{$GLOBAL_DOMAIN}/smt/ko/search/nmap.htm?auto=1";	// 韓国語
$D_FREE_VAR[":th_url"] = "https://{$GLOBAL_DOMAIN}/smt/th/search/nmap.htm?auto=1";	// タイ語
$D_FREE_VAR[":fr_url"] = "https://{$GLOBAL_DOMAIN}/smt/fr/search/nmap.htm?auto=1";	// フランス語
$D_FREE_VAR[":it_url"] = "https://{$GLOBAL_DOMAIN}/smt/it/search/nmap.htm?auto=1";	// イタリア語
$D_FREE_VAR[":D_DIR_BASE_G"] = $D_DIR_BASE_G;

// ローカルに用意しているjquery-3.1.1.min.jsを使用する
$D_DISABLE_JQUERY = 1;

// WebAPI（複合ルート）
$D_CORE_IF_V3_KEY = "JSZ4e6e6493bc00|M3wAj";

// 地図の縮尺
$D_INIT_LVL = 18;			// 初期表示縮尺
$D_INIT_LVL_DETAIL = 18;	// 店舗地図縮尺

// ヘッダーの高さの分だけ、地図の高さを減らす
$D_NMAP_ANY_DISP_PX = 45;
$D_MAP_ANY_DISP_PX = 45;

// 「店舗・ATM名からさがす」
if (($script_name == "fw.htm" || $script_name == "fw_list.htm") && $col == "FREE_SRCH") {
	$D_FREE_VAR[":postname"] = 1;
}
// 「住所からさがす」
if (($script_name == "fw.htm" || $script_name == "fw_list.htm") && $col == "FREE_SRCH_02") {
	$D_FREE_VAR[":postaddr"] = 1;
}
$D_MSG_SEARCH_NULL["FW"] = "駅名を入力して再度検索してください。";

// 最寄り検索
$D_INIT_LVL_CSTM = 16;		// スケール100m
$D_INIT_LVL_CSTM_RE = 14;	// スケール500m（スケール100mで0件だった場合）
$D_NF_MSG_OFFSET_X = -130;
$D_NF_MSG_OFFSET_Y = -15;

// 現在地ルート表示
// 複合ルート表示でバス区間がある場合は地図にポップアップ表示
$routemyloc_str = "routemyloc";
$buscomment_str = "usebus";
if ($script_name == "shop_inf.htm") {
	$D_FREE_VAR[":map_url_add"] = "&".$routemyloc_str."=1";
} elseif ($script_name == "route_srch_comb.htm") {
	$D_FREE_VAR[":map_url_add"] = "&".$buscomment_str."=1";
} elseif ($script_name == "shop_map.htm") {
	if (${$routemyloc_str} == 1) {
		$D_FREE_VAR[":search_route"] = 1;
	}
	if (${$buscomment_str} == 1) {
		$D_FREE_VAR[":bus_comment"] = 1;
	}
}
// 現在地ルート検索は世界測地系で行う
$D_ROUTE_SEARCH_MYLOC_WGS = 1;
//スタート地点アイコン
$D_ROUTE_START_IMAGE = $D_DIR_COMPANY."img/icon_start.png";
$D_ROUTE_START_OFFSET_X = 13;
$D_ROUTE_START_OFFSET_Y = 34;
//ゴール地点アイコン（無し）
$D_ROUTE_GOAL_IMAGE = $D_DIR_COMPANY."img/spacer.gif";
// ルート線
$D_ROUTE_WALK_COLOR = '#0060EC';
$D_ROUTE_WALK_OPACITY = '0.7';
$D_ROUTE_CAR_COLOR = '#0060EC';
$D_ROUTE_CAR_OPACITY = '0.7';
$D_ROUTE_TRAIN_COLOR = '#0060EC';
$D_ROUTE_TRAIN_OPACITY = '0.7';

// 複合ルート検索時にページの頭に店舗名を表示させるため、店舗詳細情報を取得
$D_SEARCH_COMB_ROUTE_USE_BUS = 1;
$D_SRCH_FWLIST_TO_SRCH_ROUTE_COMB = 1;
$D_SRCH_FW_GET_SHOPINFO = 1;
$D_NFW_SEARCH_TOP_LINK = 1;
// バスルートの取得API
$D_SEARCH_COMB_ROUTE_BUS_API = 'web';
// ルートマッチング（自動車）API(road_path_drive)の経路候補の優先度
$D_ROUTE_ROAD_PATH_DRIVE_PRIORITY = 'general';

//$D_CONVERT_DATUM_H = 1;
//$D_CONVERT_DATUM_H_ZOOM = 16;
//$D_CONVERT_DATUM_H_MINLAT = 111525003;
//$D_CONVERT_DATUM_H_MAXLAT = 148978827;
// 世界測地系カラム
$D_KYOTEN_WGS_COL['LAT'] = 'COL_192';
$D_KYOTEN_WGS_COL['LON'] = 'COL_193';

// 企業画像管理ツールでアップした画像を使用
$D_USE_CP_IMG = 1;

// 郵便番号にハイフン付与
$D_KYOTEN_ITEM_ZIP = 'col_10';

if ($script_name == "fw_list.htm") {
	if (isset($keyword) && $keyword != '') {	// 「店舗・ATM名からさがす」
		$tmp_sort_keyword = $keyword;
		$tmp_sort_keyword = mb_convert_encoding(unescape($tmp_sort_keyword), "EUC-JP", "UTF-8");
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
		}
		// 3.郵便局名(全角かな字)、郵便支店名(全角かな字)、銀行直営店名(全角かな字)を連結した文字列
		$D_SHOPW_KYOTEN_SORT .= ",";
		$D_SHOPW_KYOTEN_SORT .= "CONCAT_WS('',COL_21, COL_30, COL_38)"; // Danh - 20171027 - update sql to PostgreSQL
	}
}

// 詳細にcond適用
$D_USE_COND_DETAIL = 1;

// 詳細エラー時のリダイレクト先URL
//$D_KID_NOTFOUND_REDIRECT_URL = "$protocol://" . $D_DOMAIN_G . "/pc/error_japanpost.htm";

// Google Maps API
$D_GOOGLEMAPS = 1;
// 拠点アイコンに任意アイコンを使用
$D_GOOGLEMAPS_ICON_CUSTOM = 1;
// 地図検索時のイベント変更
$D_GOOGLEMAPS_SEARCH_EVENT_IDLE = 1;
// マップタイプ切り替えコントローラの非表示
$D_GOOGLEMAPS_MAP_TYPE_CONTROL_INVISIBLE = 1;
// ズームコントロールの位置
$D_GOOGLEMAPS_ZOOM_CONTROL_POSITION = 'TOP_RIGHT';

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

//駐車場の台数チェック
$D_COL_VAL_CHK['COL_14'][] = array('0', '0');
//駐車場備考が「※お知らせ」「※東日本」「※熊本」で始まる場合、
//最寄り一覧／拠点検索一覧にも駐車場備考を表示する。
$D_COL_VAL_CHK['COL_15'][] = array('※お知らせ', 'INFO');
$D_COL_VAL_CHK['COL_15'][] = array('※東日本'  , 'EASTJPN');
$D_COL_VAL_CHK['COL_15'][] = array('※熊本'    , 'KUMAMOTO');

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
$D_KYOTEN_ITEM_TIME['COL_119'] = 1;
$D_KYOTEN_ITEM_TIME['COL_120'] = 1;
$D_KYOTEN_ITEM_TIME['COL_121'] = 1;
$D_KYOTEN_ITEM_TIME['COL_122'] = 1;
$D_KYOTEN_ITEM_TIME['COL_123'] = 1;
$D_KYOTEN_ITEM_TIME['COL_124'] = 1;
//ゆうゆう時刻
$D_KYOTEN_ITEM_TIME['COL_151'] = 1;
$D_KYOTEN_ITEM_TIME['COL_152'] = 1;
$D_KYOTEN_ITEM_TIME['COL_153'] = 1;
$D_KYOTEN_ITEM_TIME['COL_154'] = 1;
$D_KYOTEN_ITEM_TIME['COL_155'] = 1;
$D_KYOTEN_ITEM_TIME['COL_156'] = 1;
//貯金時刻
$D_KYOTEN_ITEM_TIME['COL_127'] = 1;
$D_KYOTEN_ITEM_TIME['COL_128'] = 1;
$D_KYOTEN_ITEM_TIME['COL_129'] = 1;
$D_KYOTEN_ITEM_TIME['COL_130'] = 1;
$D_KYOTEN_ITEM_TIME['COL_131'] = 1;
$D_KYOTEN_ITEM_TIME['COL_132'] = 1;
//ATM時刻
$D_KYOTEN_ITEM_TIME['COL_135'] = 1;
$D_KYOTEN_ITEM_TIME['COL_136'] = 1;
$D_KYOTEN_ITEM_TIME['COL_137'] = 1;
$D_KYOTEN_ITEM_TIME['COL_138'] = 1;
$D_KYOTEN_ITEM_TIME['COL_139'] = 1;
$D_KYOTEN_ITEM_TIME['COL_140'] = 1;
//保険時刻
$D_KYOTEN_ITEM_TIME['COL_143'] = 1;
$D_KYOTEN_ITEM_TIME['COL_144'] = 1;
$D_KYOTEN_ITEM_TIME['COL_145'] = 1;
$D_KYOTEN_ITEM_TIME['COL_146'] = 1;
$D_KYOTEN_ITEM_TIME['COL_147'] = 1;
$D_KYOTEN_ITEM_TIME['COL_148'] = 1;

//詳細画面（貯金・ＡＴＭタブの「貯金サービスについて」の電話番号固定表示）
//$D_COL_VAL_CHK['kid'][] = array('300100788000', '300100788000');	//向島郵便局
//詳細画面（貯金・ＡＴＭタブの貯金営業時間欄に備考追加）
$D_COL_VAL_CHK['kid'][] = array('300101083000', '300101083000');	//ゆうちょ銀行　京橋店
$D_COL_VAL_CHK['kid'][] = array('300101056000', '300101056000');	//ゆうちょ銀行　立川店
$D_COL_VAL_CHK['kid'][] = array('300102001000', '300102001000');	//ゆうちょ銀行　横浜港店
$D_COL_VAL_CHK['kid'][] = array('300109067000', '300109067000');	//ゆうちょ銀行　都筑店
$D_COL_VAL_CHK['kid'][] = array('300141019000', '300141019000');	//ゆうちょ銀行　大阪東店
$D_COL_VAL_CHK['kid'][] = array('300140194000', '300140194000');	//ゆうちょ銀行　高槻店

//電話番号から-を取り除く（aタグのtel:用）
$D_KYOTEN_ITEM_TEL_ATAG['COL_23'] = 1;
$D_KYOTEN_ITEM_TEL_ATAG['COL_33'] = 1;
$D_KYOTEN_ITEM_TEL_ATAG['COL_34'] = 1;
$D_KYOTEN_ITEM_TEL_ATAG['COL_41'] = 1;

//--------------------------------------------
// 絞り込み条件
//--------------------------------------------
// 常に有効な絞り込み条件
// 表示フラグがONで、かつ「かんぽ店舗」を除外
$cond200 = 'COL_17:t AND (COL_19!:@@NULL@@ OR COL_27!:@@NULL@@ OR COL_36!:@@NULL@@)';

$D_COND = array();
$D_COND_GRP = array();
$D_COND_ANDOR = array();
$D_COND_GRP_ANDOR = 'AND';

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

if ($script_name == "index.htm" || $script_name == "search.htm" || $script_name == "fw.htm" || $script_name == "fw_list.htm") {
	foreach($D_COND[1]['opts'] as $no => $data) {
		$D_FREE_VAR[":cond1_".$no."_val"] = $data[0];
		if ($cond1 == $data[0]) {
			$D_FREE_VAR[":cond1_".$no."_select"] = 1;
			if ($script_name == "fw_list.htm") {
				// 「店舗・ATM名からさがす」
				if ($col == "FREE_SRCH") {
					// エラーメッセージ
					switch ($no) {
					case 2:
						$D_MSG_SEARCH_NODATA["ShopW"] = "該当する店舗名がありませんでした。<br>入力内容を変えて再度検索してください。<br>";
						$D_MSG_SEARCH_NULL["ShopW_col"] = "店舗名を入力して再度検索してください。";
						$D_MSG_SEARCH_MAXPAGE["ShopW"] = "該当する店舗名が多いため<br>入力内容を変えて再度検索してください。<br>";
						break;
					case 3:
						$D_MSG_SEARCH_NODATA["ShopW"] = "該当するATM名がありませんでした。<br>入力内容を変えて再度検索してください。<br>";
						$D_MSG_SEARCH_NULL["ShopW_col"] = "ATM名を入力して再度検索してください。";
						$D_MSG_SEARCH_MAXPAGE["ShopW"] = "該当するATM名が多いため<br>入力内容を変えて再度検索してください。<br>";
						break;
					default:
						$D_MSG_SEARCH_NODATA["ShopW"] = "該当する店舗・ATM名がありませんでした。<br>入力内容を変えて再度検索してください。<br>";
						$D_MSG_SEARCH_NULL["ShopW_col"] = "店舗・ATM名を入力して再度検索してください。";
						$D_MSG_SEARCH_MAXPAGE["ShopW"] = "該当する店舗・ATM名が多いため<br>入力内容を変えて再度検索してください。<br>";
						break;
					}
				}
				// 「住所からさがす」
				if ($col == "FREE_SRCH_02") {
					// エラーメッセージ
					switch ($no) {
					case 2:
						$D_MSG_SEARCH_NODATA["ShopW"] = "該当する店舗住所がありませんでした。<br>入力内容を変えて再度検索してください。<br>";
						$D_MSG_SEARCH_NULL["ShopW_col"] = "店舗住所を入力して再度検索してください。";
						$D_MSG_SEARCH_MAXPAGE["ShopW"] = "該当する店舗住所が多いため<br>入力内容を変えて再度検索してください。<br>";
						break;
					case 3:
						$D_MSG_SEARCH_NODATA["ShopW"] = "該当するATM住所がありませんでした。<br>入力内容を変えて再度検索してください。<br>";
						$D_MSG_SEARCH_NULL["ShopW_col"] = "ATM住所を入力して再度検索してください。";
						$D_MSG_SEARCH_MAXPAGE["ShopW"] = "該当するATM住所が多いため<br>入力内容を変えて再度検索してください。<br>";
						break;
					default:
						$D_MSG_SEARCH_NODATA["ShopW"] = "該当する店舗・ATM住所がありませんでした。<br>入力内容を変えて再度検索してください。<br>";
						$D_MSG_SEARCH_NULL["ShopW_col"] = "店舗・ATM住所を入力して再度検索してください。";
						$D_MSG_SEARCH_MAXPAGE["ShopW"] = "該当する店舗・ATM住所が多いため<br>入力内容を変えて再度検索してください。<br>";
						break;
					}
				}
			}
		}
	}
}
// 「現在地に近い郵便局をさがす」の検索条件
$D_COND[151] = array('type'=>'CB', 'val'=>'COL_08:0 AND ( COL_05:1 OR ( COL_05:0 AND COL_06:1 AND COL_07:0 ) OR ( COL_05:0 AND COL_06:0 AND COL_07:1 AND COL_40:01 ) )');
// 「現在地に近いATMをさがす」の検索条件
$D_COND[152] = array('type'=>'CB', 'val'=>'COL_09:t');
// 今あいているATMを検索した場合
$D_COND[153] = array('type'=>'CB', 'val'=>'');
if ($script_name == "n.htm" || $script_name == "fw.htm" || $script_name == "sf.htm") {
	$jp_nowtime = date('His');
	if (ZdcIsHoliday($jp_nowtime)) {// 祝日
		$D_COND[153]['val'] = 'COL_139:TIME2:LTE:'.$jp_nowtime.' AND COL_140:TIME2:GT:'.$jp_nowtime;
		$jp_daytype = 3;
	} else {
		$now_n = date('N');
		if ($now_n == 7) {			// 日曜
			$D_COND[153]['val'] = 'COL_139:TIME2:LTE:'.$jp_nowtime.' AND COL_140:TIME2:GT:'.$jp_nowtime;
			$jp_daytype = 3;
		} elseif ($now_n == 6) {	// 土曜
			$D_COND[153]['val'] = 'COL_137:TIME2:LTE:'.$jp_nowtime.' AND COL_138:TIME2:GT:'.$jp_nowtime;
			$jp_daytype = 2;
		} else {					// 平日
			$D_COND[153]['val'] = 'COL_135:TIME2:LTE:'.$jp_nowtime.' AND COL_136:TIME2:GT:'.$jp_nowtime;
			$jp_daytype = 1;
		}
	}
	// 一覧検索に独自パラメータ追加
	$D_NLIST_PRM_STR = $D_FWLIST_PRM_STR = '&jp_nowtime='.$jp_nowtime.'&jp_daytype='.$jp_daytype;
} elseif ($script_name == "n_list.htm" || $script_name == "fw_list.htm" || $script_name == "sf_list.htm") {
	// ATM営業時間と現在時間を比較
	$jp_nowtime_fmt = implode(":", str_split($jp_nowtime, 2));	// hhmiss => hh:mi:ss にフォーマット変換
	$D_COL_TIME_CHK['COL_135'][] = array($jp_nowtime_fmt, 'NOWTIME');
	$D_COL_TIME_CHK['COL_136'][] = array($jp_nowtime_fmt, 'NOWTIME');
	$D_COL_TIME_CHK['COL_137'][] = array($jp_nowtime_fmt, 'NOWTIME');
	$D_COL_TIME_CHK['COL_138'][] = array($jp_nowtime_fmt, 'NOWTIME');
	$D_COL_TIME_CHK['COL_139'][] = array($jp_nowtime_fmt, 'NOWTIME');
	$D_COL_TIME_CHK['COL_140'][] = array($jp_nowtime_fmt, 'NOWTIME');
	// ATMが営業時間中かチェック
	if ($jp_daytype == 1) {			// 平日
		$D_FLAGS_ALL_ON['atm_open'] = array('COL_135_LTE_NOWTIME_TIME','COL_136_GT_NOWTIME_TIME');
	} elseif ($jp_daytype == 2) {	// 土曜
		$D_FLAGS_ALL_ON['atm_open'] = array('COL_137_LTE_NOWTIME_TIME','COL_138_GT_NOWTIME_TIME');
	} elseif ($jp_daytype == 3) {	// 日曜祝日
		$D_FLAGS_ALL_ON['atm_open'] = array('COL_139_LTE_NOWTIME_TIME','COL_140_GT_NOWTIME_TIME');
	}
	// 一覧検索に独自パラメータ追加
	$D_NLIST_PRM_STR = $D_FWLIST_PRM_STR = '&jp_nowtime='.$jp_nowtime.'&jp_daytype='.$jp_daytype;
}
$D_FREE_VAR[":cond153"] = $D_COND[153]['val'];
// 常に有効な絞り込み条件
// 表示フラグがONで、かつ「かんぽ店舗」を除外
$D_COND[200] = array('type'=>'CB', 'val'=>'COL_17:t AND (COL_19!:@@NULL@@ OR COL_27!:@@NULL@@ OR COL_36!:@@NULL@@)');

$D_COND_GRP[0] = array(1);
$D_COND_ANDOR[0] = 'AND';
$D_COND_GRP[1] = array(200);
$D_COND_ANDOR[1] = 'AND';
$D_COND_GRP[2] = array(151);
$D_COND_ANDOR[2] = 'AND';
$D_COND_GRP[3] = array(152);
$D_COND_ANDOR[3] = 'AND';
$D_COND_GRP[4] = array(153);
$D_COND_ANDOR[4] = 'AND';
$D_COND_GRP[5] = array(1,2,3,4,5,6,7,8,9,10,
						11,12,13,14,15,16,17,18,19,20,
						21,22,23,24,25,26,27,28,29,30,
						31,32,33);
$D_COND_ANDOR[5] = 'AND';
$D_COND_GRP[6] = array(101,102);
$D_COND_ANDOR[6] = 'OR';
$D_COND_GRP[7] = array(103,104);
$D_COND_ANDOR[7] = 'OR';
$D_COND_GRP[8] = array(105,106);
$D_COND_ANDOR[8] = 'OR';
$D_COND_GRP[9] = array(107);
$D_COND_ANDOR[9] = 'OR';
$D_COND_GRP[10] = array(108,109);
$D_COND_ANDOR[10] = 'OR';

// cond*サニタイズ		add 2017/05/14 Y.Matsukawa
if(isset($D_COND_GRP) && count($D_COND_GRP) > 0){
	foreach($D_COND_GRP as $gno => $cnolist) {
		$arr_cond_jkn_wk = array();
		foreach($cnolist as $cno) {
			if (isset(${'cond'.$cno})) {
				// HTML特殊文字（&、<、>、"、'）をエスケープ
				${'cond'.$cno} = htmlspecialchars(${'cond'.$cno}, ENT_QUOTES);
				// JavaScript特殊文字（\、"、'、/、<、>、0x0D(CR)、0x0A(LF)）を除去
				${'cond'.$cno} = mb_ereg_replace("[\\\"'\/<>\r\n]", '', ${'cond'.$cno});
			}
		}
	}
}
?>
