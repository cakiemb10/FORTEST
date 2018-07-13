<?php
include_once('css_func.inc');
/*==========================================================================

自動計算項目

============================================================================*/
/*--------------------------------------------------------*/
/* ■全体の幅（#wrapper） */
/* 左右余白分を差し引きます */
$CSS_VAL['MAIN_W'] = css_add_sizeval(
	$CSS_VAL['MAIN_W'],
	"-".$CSS_VAL['MAIN_PAD_L']
	.","
	."-".$CSS_VAL['MAIN_PAD_R']
);
/*--------------------------------------------------------*/
/* ■遷移履歴（パンくず） */
/* 幅 */
/* 全体（#wrapper）の幅に合わせます。 */
$CSS_VAL['HIS_W'] = css_add_sizeval(
	$CSS_VAL['MAIN_W'],
	"-".$CSS_VAL['HIS_WAKU_L_W']
	.","
	."-".$CSS_VAL['HIS_WAKU_R_W']
	.","
	."-".$CSS_VAL['HIS_PAD_L']
	.","
	."-".$CSS_VAL['HIS_PAD_R']
);
/*--------------------------------------------------------*/
/* ■左エリアの幅 */
/* 地図の幅に合わせます。 */
$CSS_VAL['LEFT_W'] = css_add_sizeval(
	$CSS_VAL['ZDCMAP_W'],
	$CSS_VAL['ZDCMAP_WAKU_L_W']
	.","
	.$CSS_VAL['ZDCMAP_WAKU_R_W']
);
/*--------------------------------------------------------*/
/* ■右エリアの幅 */
/* 全体幅から地図の幅と余白の幅を引きます */
$CSS_VAL['RIGHT_W'] = css_add_sizeval(
	$CSS_VAL['MAIN_W'],
	"-".$CSS_VAL['ZDCMAP_W']
	.","
	."-".$CSS_VAL['ZDCMAP_WAKU_L_W']
	.","
	."-".$CSS_VAL['ZDCMAP_WAKU_R_W']
);
/*--------------------------------------------------------*/
/* ■地図閲覧規約リンクのエリア */
/* 幅 */
/* 地図の幅に合わせます。 */
$CSS_VAL['MAPRULE_W'] = css_add_sizeval(
	$CSS_VAL['ZDCMAP_W'],
	$CSS_VAL['ZDCMAP_WAKU_L_W']
	.","
	.$CSS_VAL['ZDCMAP_WAKU_R_W']
);
/*--------------------------------------------------------*/
/* ■拠点絞り込み条件 */
/* 幅 */
/* 地図の幅に合わせます。 */
$CSS_VAL['COND_W'] = css_add_sizeval(
	$CSS_VAL['ZDCMAP_W'],
	$CSS_VAL['ZDCMAP_WAKU_L_W']
	.","
	.$CSS_VAL['ZDCMAP_WAKU_R_W']
	.","
	."-".$CSS_VAL['COND_WAKU_L_W']
	.","
	."-".$CSS_VAL['COND_WAKU_R_W']
);
/*--------------------------------------------------------*/
/* ■周辺施設絞り込み条件 */
/* 幅 */
/* 地図の幅に合わせます。 */
$CSS_VAL['JNR_W'] = css_add_sizeval(
	$CSS_VAL['ZDCMAP_W'],
	$CSS_VAL['ZDCMAP_WAKU_L_W']
	.","
	.$CSS_VAL['ZDCMAP_WAKU_R_W']
	.","
	."-".$CSS_VAL['JNR_WAKU_L_W']
	.","
	."-".$CSS_VAL['JNR_WAKU_R_W']
);
/*--------------------------------------------------------*/
/* ■拠点詳細（拠点名表示部） */
/* 幅 */
/* 全体幅から地図の幅と余白の幅を引きます */
$CSS_VAL['KYODTL_NM_W'] = css_add_sizeval(
	$CSS_VAL['MAIN_W'],
	"-".$CSS_VAL['ZDCMAP_W']
	.","
	."-".$CSS_VAL['ZDCMAP_WAKU_L_W']
	.","
	."-".$CSS_VAL['ZDCMAP_WAKU_R_W']
	.","
	."-".$CSS_VAL['MAR_MAP_KYODTL']
	.","
	."-".$CSS_VAL['KYODTL_NM_PAD_L']
	.","
	."-".$CSS_VAL['KYODTL_NM_PAD_R']
	.","
	."-".$CSS_VAL['KYODTL_NM_WAKU_L_W']
	.","
	."-".$CSS_VAL['KYODTL_NM_WAKU_R_W']
);
/*--------------------------------------------------------*/
/* ■拠点詳細データ部 */
/* 幅 */
/* 拠点名ブロックの幅に合わせます。 */
$CSS_VAL['KYODTL_DT_W'] = css_add_sizeval(
	$CSS_VAL['KYODTL_NM_W'],
	$CSS_VAL['KYODTL_NM_WAKU_L_W']
	.","
	.$CSS_VAL['KYODTL_NM_WAKU_R_W']
	.","
	.$CSS_VAL['KYODTL_NM_PAD_L']
	.","
	.$CSS_VAL['KYODTL_NM_PAD_R']
	.","
	."-".$CSS_VAL['KYODTL_DT_WAKU_L_W']
	.","
	."-".$CSS_VAL['KYODTL_DT_WAKU_R_W']
);
/* ■拠点詳細（携帯URLテキストボックス） */
/* 幅 */
$CSS_VAL['KYODTL_DT_MURL_W'] = css_add_sizeval(
	$CSS_VAL['KYODTL_DT_W'],
	"-".$CSS_VAL['KYODTL_DT_INM_W']
	.","
	."-".$CSS_VAL['KYODTL_DT_PAD_L']
	.","
	."-".$CSS_VAL['KYODTL_DT_PAD_R']
);
/*--------------------------------------------------------*/
/* ■検索結果一覧【駅リスト、施設リスト】 */
/* 【Safari】margin（下） */
$CSS_VAL['SAF_SRCH_TBL_MAR_B'] = css_add_sizeval(
	$CSS_VAL['SRCH_TBL_WAKU_W'],
	"2px"
);
/*--------------------------------------------------------*/
/* ■最寄り拠点一覧 */
/* 幅 */
/* 拠点詳細の幅に合わせます。 */
$CSS_VAL['KYOLIST_W'] = css_add_sizeval(
	$CSS_VAL['KYODTL_NM_W'],
	$CSS_VAL['KYODTL_NM_WAKU_L_W']
	.","
	.$CSS_VAL['KYODTL_NM_WAKU_R_W']
	.","
	.$CSS_VAL['KYODTL_NM_PAD_L']
	.","
	.$CSS_VAL['KYODTL_NM_PAD_R']
	.","
	."-".$CSS_VAL['KYOLIST_WAKU_L_W']
	.","
	."-".$CSS_VAL['KYOLIST_WAKU_R_W']
);
/* 枠線（下）太さ */
/* 枠線（下）と明細行罫線が合わさって太くなってしまうので、罫線の幅を減算します。【IE,FF】 */
/* 但し、Safariでは自動調整が不要なため、別変数に退避しておきます。 */
$CSS_VAL['SAF_KYOLIST_WAKU_B_W'] = $CSS_VAL['KYOLIST_WAKU_B_W'];
$CSS_VAL['KYOLIST_WAKU_B_W'] = css_add_sizeval(
	$CSS_VAL['KYOLIST_WAKU_B_W'],
	"-".$CSS_VAL['KYOLIST_D_KEI_W']
);
/*--------------------------------------------------------*/
/* ■最寄り駅一覧 */
/* 幅 */
/* 拠点詳細の幅に合わせます。 */
$CSS_VAL['NEKI_W'] = css_add_sizeval(
	$CSS_VAL['KYODTL_NM_W'],
	$CSS_VAL['KYODTL_NM_WAKU_L_W']
	.","
	.$CSS_VAL['KYODTL_NM_WAKU_R_W']
	.","
	.$CSS_VAL['KYODTL_NM_PAD_L']
	.","
	.$CSS_VAL['KYODTL_NM_PAD_R']
	.","
	."-".$CSS_VAL['NEKI_WAKU_L_W']
	.","
	."-".$CSS_VAL['NEKI_WAKU_R_W']
);
/* 枠線（下）太さ */
/* 枠線（下）と明細行罫線が合わさって太くなってしまうので、罫線の幅を減算します。【IE,FF】 */
/* 但し、Safariでは自動調整が不要なため、別変数に退避しておきます。 */
$CSS_VAL['SAF_NEKI_WAKU_B_W'] = $CSS_VAL['NEKI_WAKU_B_W'];
$CSS_VAL['NEKI_WAKU_B_W'] = css_add_sizeval(
	$CSS_VAL['NEKI_WAKU_B_W'],
	"-".$CSS_VAL['NEKI_D_KEI_W']
);
/*--------------------------------------------------------*/
/* ■周辺施設一覧 */
/* 幅 */
/* 拠点詳細の幅に合わせます。 */
$CSS_VAL['NPOI_W'] = css_add_sizeval(
	$CSS_VAL['KYODTL_NM_W'],
	$CSS_VAL['KYODTL_NM_WAKU_L_W']
	.","
	.$CSS_VAL['KYODTL_NM_WAKU_R_W']
	.","
	.$CSS_VAL['KYODTL_NM_PAD_L']
	.","
	.$CSS_VAL['KYODTL_NM_PAD_R']
	.","
	."-".$CSS_VAL['NPOI_WAKU_L_W']
	.","
	."-".$CSS_VAL['NPOI_WAKU_R_W']
);
/* 枠線（下）太さ */
/* 枠線（下）と明細行罫線が合わさって太くなってしまうので、罫線の幅を減算します。【IE,FF】 */
/* 但し、Safariでは自動調整が不要なため、別変数に退避しておきます。 */
$CSS_VAL['SAF_NPOI_WAKU_B_W'] = $CSS_VAL['NPOI_WAKU_B_W'];
$CSS_VAL['NPOI_WAKU_B_W'] = css_add_sizeval(
	$CSS_VAL['NPOI_WAKU_B_W'],
	"-".$CSS_VAL['NPOI_D_KEI_W']
);
/* 距離の説明の幅 */
$CSS_VAL['NPOI_EXP_W'] = css_add_sizeval(
	$CSS_VAL['NPOI_W'],
	$CSS_VAL['NPOI_WAKU_L_W']
	.","
	.$CSS_VAL['NPOI_WAKU_R_W']
);
/*--------------------------------------------------------*/
/* ■出発地を指定してルート探索 */
/* 幅 */
/* 拠点詳細の幅に合わせます。 */
$CSS_VAL['FROUTE_W'] = css_add_sizeval(
	$CSS_VAL['KYODTL_NM_W'],
	$CSS_VAL['KYODTL_NM_WAKU_L_W']
	.","
	.$CSS_VAL['KYODTL_NM_WAKU_R_W']
	.","
	.$CSS_VAL['KYODTL_NM_PAD_L']
	.","
	.$CSS_VAL['KYODTL_NM_PAD_R']
	.","
	."-".$CSS_VAL['FROUTE_WAKU_L_W']
	.","
	."-".$CSS_VAL['FROUTE_WAKU_R_W']
);
/* 枠線（下）太さ */
/* 枠線（下）と明細行罫線が合わさって太くなってしまうので、罫線の幅を減算します。【IE,FF】 */
/* 但し、Safariでは自動調整が不要なため、別変数に退避しておきます。 */
//$CSS_VAL['SAF_FROUTE_WAKU_B_W'] = $CSS_VAL['FROUTE_WAKU_B_W'];
//$CSS_VAL['FROUTE_WAKU_B_W'] = css_add_sizeval(
//	$CSS_VAL['FROUTE_WAKU_B_W'],
//	"-".$CSS_VAL['FROUTE_D_KEI_W']
//);
/* 検索入力ボックスの幅 */
$CSS_VAL['FROUTE_SRCH_ENT_TXT_W'] = css_add_sizeval(
	$CSS_VAL['FROUTE_W'],
	"-".$CSS_VAL['FROUTE_SRCH_PAD_L']
	.","
	."-".$CSS_VAL['FROUTE_SRCH_PAD_R']
	.","
	."-60px"
);
/*--------------------------------------------------------*/
/* ■印刷画面（拠点名） */
/* 幅 */
$CSS_VAL['PR_NM_W'] = css_add_sizeval(
	$CSS_VAL['PR_W'],
	"-".$CSS_VAL['PR_NM_WAKU_L_W']
	.","
	."-".$CSS_VAL['PR_NM_WAKU_R_W']
	.","
	."-".$CSS_VAL['PR_NM_PAD_L']
	.","
	."-".$CSS_VAL['PR_NM_PAD_R']
);
/*--------------------------------------------------------*/
/* ■印刷画面 明細の枠線（下） */
/* 枠線（下）と明細行罫線が合わさって太くなってしまうので、罫線の幅を減算します。【IE,FF】 */
/* 但し、Safariでは自動調整が不要なため、別変数に退避しておきます。 */
$CSS_VAL['SAF_PR_DTL_WAKU_B_W'] = $CSS_VAL['PR_DTL_WAKU_B_W'];
$CSS_VAL['PR_DTL_WAKU_B_W'] = css_add_sizeval(
	$CSS_VAL['PR_DTL_WAKU_B_W'],
	"-".$CSS_VAL['PR_DTL_KEI_W']
);
/*--------------------------------------------------------*/
/* ■印刷画面 明細の幅 */
$CSS_VAL['PR_DTL_W'] = css_add_sizeval(
	$CSS_VAL['PR_W'],
	"-".$CSS_VAL['PR_DTL_WAKU_L_W']
	.","
	."-".$CSS_VAL['PR_DTL_WAKU_R_W']
);
/*--------------------------------------------------------*/
/* ■印刷画面 地図の幅 */
$CSS_VAL['PR_MAP_W'] = css_add_sizeval(
	$CSS_VAL['PR_W'],
	"-".$CSS_VAL['PR_MAP_WAKU_L_W']
	.","
	."-".$CSS_VAL['PR_MAP_WAKU_R_W']
);
/*--------------------------------------------------------*/
/* ■検索画面の高さ */
if ($CSS_VAL['MAIN_H']) {
	$CSS_VAL['SRCH_WIN_H'] = '100%';
} else {
	$CSS_VAL['SRCH_WIN_H'] = '9999px';
}
/*--------------------------------------------------------*/
/* ■検索画面 タイトル（「拠点検索」）の幅 */
$CSS_VAL['SRCH_TTL_W'] = css_add_sizeval(
	$CSS_VAL['MAIN_W'],
	"-".$CSS_VAL['SRCH_TTL_WAKU_L_W']
	.","
	."-".$CSS_VAL['SRCH_TTL_WAKU_R_W']
	.","
	."-".$CSS_VAL['SRCH_TTL_PAD_L']
	.","
	."-".$CSS_VAL['SRCH_TTL_PAD_R']
);
/*--------------------------------------------------------*/
/* ■検索画面 日本地図画像 */
	/* 幅 */
	$CSS_VAL['SRCH_JMAP_W'] =			'355px';
	/* 高さ */
	$CSS_VAL['SRCH_JMAP_H'] =			'304px';
/*--------------------------------------------------------*/
/* ■検索画面 左側の幅 */
$CSS_VAL['SRCH_LEFT_W'] = css_add_sizeval(
	$CSS_VAL['SRCH_JMAP_W'],
	$CSS_VAL['SRCH_JMAP_WAKU_W']
	.","
	.$CSS_VAL['SRCH_JMAP_WAKU_W']
);
/* ■検索画面 グループタイトル（左側）の幅 */
$CSS_VAL['SRCH_GRPTTL_L_W'] = css_add_sizeval(
	$CSS_VAL['SRCH_LEFT_W'],
	"-".$CSS_VAL['SRCH_GRPTTL_WAKU_L_W']
	.","
	."-".$CSS_VAL['SRCH_GRPTTL_WAKU_R_W']
	.","
	."-".$CSS_VAL['SRCH_GRPTTL_PAD_L']
	.","
	."-".$CSS_VAL['SRCH_GRPTTL_PAD_R']
);
/* ■検索画面 右側の幅 */
$CSS_VAL['SRCH_RIGHT_W'] = css_add_sizeval(
	$CSS_VAL['MAIN_W'],
	"-".$CSS_VAL['SRCH_LEFT_W']
	.","
	."-".$CSS_VAL['SRCH_MAR_CENTER']
);
/* ■検索画面 グループタイトル（右側）の幅 */
$CSS_VAL['SRCH_GRPTTL_R_W'] = css_add_sizeval(
	$CSS_VAL['SRCH_RIGHT_W'],
	"-".$CSS_VAL['SRCH_GRPTTL_WAKU_L_W']
	.","
	."-".$CSS_VAL['SRCH_GRPTTL_WAKU_R_W']
	.","
	."-".$CSS_VAL['SRCH_GRPTTL_PAD_L']
	.","
	."-".$CSS_VAL['SRCH_GRPTTL_PAD_R']
);
/* ■検索画面 絞り込み条件の幅 */
$CSS_VAL['SRCH_COND_W'] = css_add_sizeval(
	$CSS_VAL['MAIN_W'],
	"-".$CSS_VAL['COND_WAKU_L_W']
	.","
	."-".$CSS_VAL['COND_WAKU_R_W']
);
/*--------------------------------------------------------*/
/* ■絞り込み条件チェックボックスの列数に応じたTD幅 */
$CSS_VAL['COND_CB_TD_W'] = "33%";
if ($oDEmapConf->OPT_10_10) {
	$CSS_VAL['COND_CB_TD_W'] = floor(100 / $oDEmapConf->OPT_10_10)."%";
}
/* ■絞り込み条件リストボックスの列数に応じたTD幅 */
$CSS_VAL['COND_LB_TD_W'] = "100%";
if ($oDEmapConf->OPT_10_12) {
	$CSS_VAL['COND_LB_TD_W'] = floor(100 / $oDEmapConf->OPT_10_12)."%";
}
/*--------------------------------------------------------*/
/* ■絞り込み条件チェックボックスの列数に応じたTD幅 */
$CSS_VAL['SRCH_COND_CB_TD_W'] = "20%";
if ($oDEmapConf->OPT_10_11) {
	$CSS_VAL['SRCH_COND_CB_TD_W'] = floor(100 / $oDEmapConf->OPT_10_11)."%";
}
/* ■絞り込み条件リストボックスの列数に応じたTD幅 */
$CSS_VAL['SRCH_COND_LB_TD_W'] = "33%";
if ($oDEmapConf->OPT_10_13) {
	$CSS_VAL['SRCH_COND_LB_TD_W'] = floor(100 / $oDEmapConf->OPT_10_13)."%";
}

?>
