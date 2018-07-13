<?php
//========================================================
// マスタテンプレートID
//========================================================
$MST_ID = "P2EasyDesign01";
//========================================================
// サービス種別
//		"S"：スタンダード、"L"：ライト、"N"：拠点なし（マップリンク）
//========================================================
$PC_EMAP_KBN = "S";
//========================================================
// テンプレートファイル定義
//		key:テンプレートファイル名
//		val(array):
//			"NM"=>Template Customizer 表示名
//			"CR"=>Template Engine 制御コード有無("N"：制御コードなし)
//			"ED"=>Template Customizer アクセス制限("W"：編集可、"R"：参照のみ)
//			"GP"=>Template Engine 生成グループ("S"：設定ファイルのみ、"D"：デザイン設定反映)
//========================================================
$TPL_FILE_DEF = array(
 "pageview_0.tpl"			=> array("NM"=>"基本レイアウト(TOP)",		"CR"=>"N",	"ED"=>"W")
,"pageview_1.tpl"			=> array("NM"=>"基本レイアウト(ヘッダ)",	"CR"=>"N",	"ED"=>"W")
,"pageview_2.tpl"			=> array("NM"=>"基本レイアウト(メイン上部)",			"ED"=>"W")
,"pageview_7.tpl"			=> array("NM"=>"基本レイアウト(メイン下部)","CR"=>"N",	"ED"=>"W")
,"pageview_8.tpl"			=> array("NM"=>"基本レイアウト(フッタ)",	"CR"=>"N",	"ED"=>"W")
,"pageview_9.tpl"			=> array("NM"=>"基本レイアウト(BOTTOM)",	"CR"=>"N",	"ED"=>"W")
,"nmap.tpl"					=> array("NM"=>"最寄り店舗地図",						"ED"=>"W")
,"nlist.tpl"				=> array("NM"=>"最寄り店舗リスト",						"ED"=>"W")
,"msg.tpl"					=> array("NM"=>"フキダシ",								"ED"=>"W")
,"cond.tpl"					=> array("NM"=>"絞込条件",								"ED"=>"W")
,"shop_dtl.tpl"				=> array("NM"=>"店舗詳細(地図)",						"ED"=>"W")
,"neki.tpl"					=> array("NM"=>"最寄駅リスト",							"ED"=>"W")
,"npoi.tpl"					=> array("NM"=>"周辺施設リスト",			"CR"=>"N",	"ED"=>"W")
,"npoi_jnr.tpl"				=> array("NM"=>"周辺施設ジャンル",						"ED"=>"W")
,"froute.tpl"				=> array("NM"=>"出発地指定ルート",						"ED"=>"W")
,"errorview.tpl"			=> array("NM"=>"エラー画面",							"ED"=>"W")
,"shop_print_0.tpl"			=> array("NM"=>"印刷画面(TOP)",				"CR"=>"N",	"ED"=>"W")
,"shop_print_1.tpl"			=> array("NM"=>"印刷画面(ヘッダ)",			"CR"=>"N",	"ED"=>"W")
,"shop_print_5.tpl"			=> array("NM"=>"印刷画面",								"ED"=>"W")
,"shop_print_8.tpl"			=> array("NM"=>"印刷画面(フッタ)",			"CR"=>"N",	"ED"=>"W")
,"shop_print_9.tpl"			=> array("NM"=>"印刷画面(BOTTOM)",			"CR"=>"N",	"ED"=>"W")
,"search_top.tpl"			=> array("NM"=>"検索画面",								"ED"=>"W")
,"search_rail.tpl"			=> array("NM"=>"路線図",					"CR"=>"N",	"ED"=>"W")
,"search_area.tpl"			=> array("NM"=>"地域図",					"CR"=>"N",	"ED"=>"W")
,"search_shop_list.tpl"		=> array("NM"=>"店舗検索リスト",						"ED"=>"W")
,"search_list.tpl"			=> array("NM"=>"検索リスト",				"CR"=>"N",	"ED"=>"W")
,"search_list_comb.tpl"		=> array("NM"=>"複合FWリスト",				"CR"=>"N",	"ED"=>"W")
,"search_table.tpl"			=> array("NM"=>"検索テーブル",				"CR"=>"N",	"ED"=>"W")
,"search_addrtable.tpl"		=> array("NM"=>"住所検索テーブル",			"CR"=>"N",	"ED"=>"W")
,"search_error.tpl"			=> array("NM"=>"検索エラー画面",			"CR"=>"N",	"ED"=>"W")
,"jump.tpl"					=> array("NM"=>"top.location変更用",		"CR"=>"N",	"ED"=>"W")
,"i3.tpl"					=> array("NM"=>"情報画面3",					"CR"=>"N",	"ED"=>"W")
,"i4.tpl"					=> array("NM"=>"情報画面4",					"CR"=>"N",	"ED"=>"W")
,"dept_srch_comb.tpl"		=> array("NM"=>"複合ルート(検索)",			"CR"=>"N",	"ED"=>"W")
,"route_srch_comb.tpl"		=> array("NM"=>"複合ルート(結果)",			"CR"=>"N",	"ED"=>"W")
,"setting.inc"				=> array("NM"=>"設定ファイル",							"ED"=>"R", "GP"=>"S")
,"setting_option.inc"		=> array("NM"=>"オプション設定ファイル",	"CR"=>"N",	"ED"=>"W")
,"css/default.css"			=> array("NM"=>"default.css",				"CR"=>"N",	"ED"=>"W")
,"css/layout.css"			=> array("NM"=>"layout.css",							"ED"=>"W", "GP"=>"D")
,"css/base.css"				=> array("NM"=>"base.css",								"ED"=>"W", "GP"=>"D")
,"css/print_page.css"		=> array("NM"=>"print_page.css",						"ED"=>"W", "GP"=>"D")
,"css/print.css"			=> array("NM"=>"print.css",					"CR"=>"N",	"ED"=>"W")
,"css/help.css"				=> array("NM"=>"help.css",					"CR"=>"N",	"ED"=>"W")
,"css/route.css"			=> array("NM"=>"route.css",					"CR"=>"N",	"ED"=>"W")
,"css/custom.css"			=> array("NM"=>"custom.css",				"CR"=>"N",	"ED"=>"W")
,"js/custom.js"				=> array("NM"=>"custom.js",					"CR"=>"N",	"ED"=>"W")
);
?>
