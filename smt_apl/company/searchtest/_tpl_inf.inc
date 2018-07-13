<?php
//========================================================
// マスタテンプレートID
//========================================================
$MST_ID	= "Standard02";
//========================================================
// サービス種別
//		"S"：スタンダード、"L"：ライト、"N"：拠点なし（マップリンク）
//========================================================
$SMT_EMAP_KBN = "S";
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
,"pageview_2.tpl"			=> array("NM"=>"基本レイアウト",			"CR"=>"N",	"ED"=>"W")
,"pageview_8.tpl"			=> array("NM"=>"基本レイアウト(フッタ)",	"CR"=>"N",	"ED"=>"W")
,"pageview_9.tpl"			=> array("NM"=>"基本レイアウト(BOTTOM)",	"CR"=>"N",	"ED"=>"W")
,"mapview_0.tpl"			=> array("NM"=>"地図レイアウト(TOP)",		"CR"=>"N",	"ED"=>"W")
,"mapview_9.tpl"			=> array("NM"=>"地図レイアウト(BOTTOM)",	"CR"=>"N",	"ED"=>"W")
,"inf.tpl"					=> array("NM"=>"店舗詳細",								"ED"=>"W")
,"map.tpl"					=> array("NM"=>"店舗地図",					"CR"=>"N",	"ED"=>"W")
,"msg.tpl"					=> array("NM"=>"フキダシ",					"CR"=>"N",	"ED"=>"W")
,"search.tpl"				=> array("NM"=>"検索TOP",								"ED"=>"W")
,"search_addr.tpl"			=> array("NM"=>"住所リスト",				"CR"=>"N",	"ED"=>"W")
,"search_addr_list.tpl"		=> array("NM"=>"住所リスト(一覧)",			"CR"=>"N",	"ED"=>"W")
,"search_eki.tpl"			=> array("NM"=>"駅リスト",					"CR"=>"N",	"ED"=>"W")
,"search_eki_list.tpl"		=> array("NM"=>"駅リスト(一覧)",			"CR"=>"N",	"ED"=>"W")
,"search_rosen.tpl"			=> array("NM"=>"路線リスト",				"CR"=>"N",	"ED"=>"W")
,"search_rosen_list.tpl"	=> array("NM"=>"路線リスト(一覧)",			"CR"=>"N",	"ED"=>"W")
,"search_poi.tpl"			=> array("NM"=>"施設リスト",				"CR"=>"N",	"ED"=>"W")
,"search_poi_list.tpl"		=> array("NM"=>"施設リスト(一覧)",			"CR"=>"N",	"ED"=>"W")
,"search_fw.tpl"			=> array("NM"=>"フリーワード検索",			"CR"=>"N",	"ED"=>"W")
,"search_fw_list.tpl"		=> array("NM"=>"フリーワード検索(一覧)",	"CR"=>"N",	"ED"=>"W")
,"loc.tpl"					=> array("NM"=>"現在地接続",				"CR"=>"N",	"ED"=>"W")
,"n.tpl"					=> array("NM"=>"最寄り店舗リスト",			"CR"=>"N",	"ED"=>"W")
,"n_list.tpl"				=> array("NM"=>"最寄り店舗リスト(一覧)",	"CR"=>"N",	"ED"=>"W")
,"nmap.tpl"					=> array("NM"=>"最寄り店舗地図",			"CR"=>"N",	"ED"=>"W")
,"sl.tpl"					=> array("NM"=>"店舗リスト検索",			"CR"=>"N",	"ED"=>"W")
,"sl_list.tpl"				=> array("NM"=>"店舗リスト検索(一覧)",		"CR"=>"N",	"ED"=>"W")
,"fw.tpl"					=> array("NM"=>"店舗フリーワード検索",		"CR"=>"N",	"ED"=>"W")
,"fw_list.tpl"				=> array("NM"=>"店舗フリーワード検索(一覧)","CR"=>"N",	"ED"=>"W")
,"ne.tpl"					=> array("NM"=>"最寄り駅リスト",			"CR"=>"N",	"ED"=>"W")
,"ne_list.tpl"				=> array("NM"=>"最寄り駅リスト(一覧)",		"CR"=>"N",	"ED"=>"W")
,"np.tpl"					=> array("NM"=>"最寄り施設リスト",			"CR"=>"N",	"ED"=>"W")
,"np_list.tpl"				=> array("NM"=>"最寄り施設リスト(一覧)",	"CR"=>"N",	"ED"=>"W")
,"route_srch_pl.tpl"		=> array("NM"=>"出発地指定ルート(場所検索)",			"ED"=>"W")
,"route_srch_comb.tpl"		=> array("NM"=>"複合ルート",							"ED"=>"W")
,"errorview.tpl"			=> array("NM"=>"エラー画面",				"CR"=>"N",	"ED"=>"W")
,"error.tpl"				=> array("NM"=>"エラーメッセージ",			"CR"=>"N",	"ED"=>"W")
,"i1.tpl"					=> array("NM"=>"情報画面1",					"CR"=>"N",	"ED"=>"W")
,"i2.tpl"					=> array("NM"=>"情報画面2",					"CR"=>"N",	"ED"=>"W")
,"i3.tpl"					=> array("NM"=>"情報画面3",					"CR"=>"N",	"ED"=>"W")
,"setting.inc"				=> array("NM"=>"設定ファイル",							"ED"=>"R", "GP"=>"S")
,"setting_option.inc"		=> array("NM"=>"オプション設定ファイル",	"CR"=>"N",	"ED"=>"W")
,"css/reset.css"			=> array("NM"=>"reset.css",					"CR"=>"N",	"ED"=>"W")
,"css/smart.css"			=> array("NM"=>"smart.css",					"CR"=>"N",	"ED"=>"W")
,"css/map.css"				=> array("NM"=>"map.css",					"CR"=>"N",	"ED"=>"W")
,"css/custom.css"			=> array("NM"=>"custom.css",				"CR"=>"N",	"ED"=>"W")
,"css/common.css"			=> array("NM"=>"common.css",				"CR"=>"N",	"ED"=>"W")
,"css/form.css"				=> array("NM"=>"form.css",					"CR"=>"N",	"ED"=>"W")
,"css/layout.css"			=> array("NM"=>"layout.css",				"CR"=>"N",	"ED"=>"W")
,"js/custom.js"				=> array("NM"=>"custom.js",					"CR"=>"N",	"ED"=>"W")
);
?>
