<?PHP
// ------------------------------------------------------------
// javasctipt 主に拠点検索に関係するもの
// 
// 2011/03/10 Y.Matsukawa	新規作成
// 2011/07/13 Y.Matsukawa	機能追加（ルート探索、最寄駅）
// 2011/07/05 Y.Nakajima	VM化に伴うapache,phpVerUP対応改修
// 2011/08/08 Y.Matsukawa	機能追加（絞り込み拡張、拠点エリア検索、駅リスト検索）
// 2011/08/12 K.Masuda		拠点フリーワード検索で対象カラム指定
// 2011/09/02 Y.Matsukawa	Maplinkルート探索対応
// 2011/10/04 K.Masuda		検索TOPから現在地取得(GPS)利用可能にする
// 2012/01/11 Y.Matsukawa	任意パラメータ
// 2012/02/21 Y.Matsukawa	店舗一覧にチェックボックス設置
// 2012/02/29 K.Masuda		フリーワード検索の文字化け対応
// 2012/03/08 K.Masuda		拠点フリーワード検索の文字化け対応
// 2012/04/24 Y.Matsukawa	施設リスト検索
// 2012/05/14 Y.Matsukawa	全件一覧ページング
// 2012/05/23 Y.Matsukawa	formN.plfilterがhiddenの場合に対応
// 2012/07/05 H.Osamoto		検索TOPに住所・駅名・施設検索を設置可能にする
// 2012/07/18 Y.Matsukawa	最寄施設
// 2012/09/10 Y.Matsukawa	【不具合修正】任意パラメータに「&」を含めると正しく引き継がれない、任意パラメータに半角スペース指定すると消える
// 2012/12/03 Y.Matsukawa	場所検索からTOPへ戻る際にアンカー移動
// 2014/03/12 Y.Matsukawa	路線検索
// 2014/09/11 Y.Matsukawa	【機種依存不具合】一覧がリフレッシュされない場合がある
// 2015/01/16 Y.Matsukawa	別ドメインでのアクセスに対応
// 2015/02/02 Y.Matsukawa	jQueryの読み込み停止
// 2015/02/10 Y.Matsukawa	店舗リスト検索TOP
// 2015/05/27 Y.Matsukawa	cond取得関数をsearch.jsからcommon.jsへ移植（地図画面でも使うため）
// 2015/09/25 H.Yasunaga	ZdcEmapCondGetForm2追加
// 2016/01/19 F.Yokoi		タブクリックに5（店舗名）を追加
// 2016/01/28 H.Yasunaga	711mapニッセンカスタマイズ
// 2016/03/18 Y.Matsukawa	長尺URL対応（リファラー等を付加しない）
// 2016/03/22 Y.Matsukawa	n_list.htm呼び出し時のアクセス元パラメータを復活
// 2016/04/17 Y.Matsukawa	k.htmでcond利用
// 2016/05/23 Y.Matsukawa	カテゴリ毎の最寄り一覧表示（リロクラブ対応）
// 2017/04/21 N.Wada		フリーワード検索（路線）追加
// ------------------------------------------------------------
require_once('/home/emap/src/smt/inc/define.inc');

//phpファイルはeuc
//jsファイルはeuc
//htmlファイルからjsファイルを読み出すときはeuc
//htmlのエンコードはutf8で指定

?>
var ZdcEmapSearchShopFwListObj;
var ZdcEmapSearchNShopListObj;
var ZdcEmapSearchKListObj;			<?php // add 2012/05/14 Y.Matsukawa ?>
var ZdcEmapSearchShopLListObj;		<?php // add 2011/08/08 Y.Matsukawa ?>
var ZdcEmapSearchAddrLListObj;		<?php // add 2011/08/08 Y.Matsukawa ?>
var ZdcEmapSearchEkiLListObj;		<?php // add 2011/08/08 Y.Matsukawa ?>
var ZdcEmapSearchPoiLListObj;		<?php // add 2012/04/24 Y.Matsukawa ?>
var ZdcEmapSearchRosenLListObj;		<?php // add 2014/03/12 Y.Matsukawa ?>
var ZdcEmapSearchFWRosenListObj;		<?php // add 2017/04/21 N.Wada ?>
var ZdcEmapSearchFWListObj1 = null;
var ZdcEmapSearchFWListObj2 = null;
var ZdcEmapSearchFWListObj3 = null;
var ZdcEmapSearchCountObj;
var ZdcEmapSearchNekiListObj;		<?php // add 2011/07/13 Y.Matsukawa ?>
var ZdcEmapSearchNpoiListObj;		<?php // add 2012/07/18 Y.Matsukawa ?>
var ZdcEmapRefListObj = null;		<?php // add 2014/09/11 Y.Matsukawa ?>
var ZdcEmapGPSCondParams="";		<?php // add 2012/05/23 Y.Matsukawa ?>
<?php	// add 2011/08/08 Y.Matsukawa [ ?>
var ZdcEmapCond = new Array();
<?php	$i = 0;
		if($D_COND_GRP && count($D_COND_GRP) > 0){
			foreach($D_COND_GRP as $cnolist) {
				foreach($cnolist as $cno) {
?>
ZdcEmapCond[<?php echo $i; ?>] = <?php echo $cno; ?>;
<?php			$i++;
				}
			}
		}
?>
<?php	// add 2011/08/08 Y.Matsukawa ] ?>

<?php	// add 2015/02/10 Y.Matsukawa [ ?>
var ZdcEmapShopADispnm = new Array();
<?php	if (isset($D_SHOPA_DISPNM) && is_array($D_SHOPA_DISPNM)) {
			foreach ($D_SHOPA_DISPNM as $i => $sh) {
?>
ZdcEmapShopADispnm[<?php echo $i; ?>] = new Array();
ZdcEmapShopADispnm[<?php echo $i; ?>][1] = "<?php echo $sh[1]; ?>";
ZdcEmapShopADispnm[<?php echo $i; ?>][2] = "<?php echo $sh[2]; ?>";
<?php		}
		}
		// add 2015/02/10 Y.Matsukawa ] ?>
<?php
// add 2015/02/10 Y.Matsukawa [ ?>
var ZdcEmapAreaSortLpad = new Array();
<?php
if (isset($D_AREA_SORT_LPAD) && $D_AREA_SORT_LPAD) {
	foreach ($D_AREA_SORT_LPAD as $t => $arr) {
?>
ZdcEmapAreaSortLpad[<?php echo $t; ?>] = new Array();
<?php
		foreach ($arr as $k => $lpad) {
?>
ZdcEmapAreaSortLpad[<?php echo $t; ?>][<?php echo $k; ?>] = new Array();
ZdcEmapAreaSortLpad[<?php echo $t; ?>][<?php echo $k; ?>]["len"] = <?php echo $D_AREA_SORT_LPAD[$t][$k]['len']; ?>;
ZdcEmapAreaSortLpad[<?php echo $t; ?>][<?php echo $k; ?>]["char"] = "<?php echo $D_AREA_SORT_LPAD[$t][$k]['char']; ?>";
<?php
		}
	}
}
// add 2015/02/10 Y.Matsukawa ]
?>
<?php // add 2016/01/28 H.Yasunaga 711map ニッセンカスタマイズ ] ?>
var NISSEN_SearchNear2 = false;
<?php // add 2016/01/28 H.Yasunaga ] ?>
<?php
// 「場所を指定」クリック
?>
function ZdcEmapClickLoc() {
	var frm1 = document.formN;
	var frm2 = document.formPl;
	if (!frm1 || !frm2) return;
	var sel = frm1.plfilter;
	var hid = frm2.plfilter;
	if (sel && hid) {
		<?php //hid.value = sel.options[sel.selectedIndex].value;		del 2012/05/23 Y.Matsukawa ?>
		<?php // add 2012/05/23 Y.Matsukawa [ ?>
		if (sel.type == "select-one") {
			hid.value = sel.options[sel.selectedIndex].value;
		} else {
			hid.value = sel.value;
		}
		<?php // add 2012/05/23 Y.Matsukawa ] ?>
	}
	<?php	// add 2011/08/08 Y.Matsukawa [ ?>
	var condto,condfr;
	if (ZdcEmapCond.length > 0) {
		for(var i=0; i < ZdcEmapCond.length; i++) {
			condfr = eval("frm1.cond"+ZdcEmapCond[i]);
			condto = eval("frm2.cond"+ZdcEmapCond[i]);
			if (condfr && condto) {
				switch (condfr.type) {
					case "checkbox":
						if(condfr.checked == true) {
							condto.value = condfr.value;
						} else {
							condto.value = "";
						}
						break;
					case "select-one":
						condto.value = condfr.options[condfr.selectedIndex].value;
						break;
					case "radio":
						if(condfr.checked == true && condfr.value) {
							condto.value = condfr.value;
						} else {
							condto.value = "";
						}
						break;
					case "hidden":
						condto.value = condfr.value;
						break;
				}
			}
		}
	}
	<?php	// add 2011/08/08 Y.Matsukawa ] ?>
	frm2.submit();
}
<?php
// 絞り込みcondパネル		add 2011/08/08 Y.Matsukawa
?>
function ZdcEmapCondPanelInit() {
<?php
	// add 2015/02/02 Y.Matsukawa [
	// jQuery停止している場合は使えません
	if ($D_DISABLE_JQUERY) {
?>
	return;
<?php
	}
	// add 2015/02/02 Y.Matsukawa ]
?>
	$(function(){
		if ($("#z_pl_cond_panel_btn").length) {
			$("#z_pl_cond_panel_btn").click(function(){
				if ($("#z_pl_cond_panel_btn_icon").length) {
					$("#z_pl_cond_panel_btn_icon").toggleClass("z_icon_sld_open");
				}
				$("#z_pl_cond_panel").slideToggle("slow");
			});
		}
		if ($("#z_fw_cond_panel_btn").length) {
			$("#z_fw_cond_panel_btn").click(function(){
				if ($("#z_fw_cond_panel_btn_icon").length) {
					$("#z_fw_cond_panel_btn_icon").toggleClass("z_icon_sld_open");
				}
				$("#z_fw_cond_panel").slideToggle("slow");
			});
		}
		if ($("#z_sl_cond_panel_btn").length) {
			$("#z_sl_cond_panel_btn").click(function(){
				if ($("#z_sl_cond_panel_btn_icon").length) {
					$("#z_sl_cond_panel_btn_icon").toggleClass("z_icon_sld_open");
				}
				$("#z_sl_cond_panel").slideToggle("slow");
			});
		}
		if ($("#z_l1_cond_panel_btn").length) {
			$("#z_l1_cond_panel_btn").click(function(){
				if ($("#z_l1_cond_panel_btn_icon").length) {
					$("#z_l1_cond_panel_btn_icon").toggleClass("z_icon_sld_open");
				}
				$("#z_l1_cond_panel").slideToggle("slow");
			});
		}
		if ($("#z_l2_cond_panel_btn").length) {
			$("#z_l2_cond_panel_btn").click(function(){
				if ($("#z_l2_cond_panel_btn_icon").length) {
					$("#z_l2_cond_panel_btn_icon").toggleClass("z_icon_sld_open");
				}
				$("#z_l2_cond_panel").slideToggle("slow");
			});
		}
		if ($("#z_l3_cond_panel_btn").length) {
			$("#z_l3_cond_panel_btn").click(function(){
				if ($("#z_l3_cond_panel_btn_icon").length) {
					$("#z_l3_cond_panel_btn_icon").toggleClass("z_icon_sld_open");
				}
				$("#z_l3_cond_panel").slideToggle("slow");
			});
		}
		if ($("#z_l4_cond_panel_btn").length) {
			$("#z_l4_cond_panel_btn").click(function(){
				if ($("#z_l4_cond_panel_btn_icon").length) {
					$("#z_l4_cond_panel_btn_icon").toggleClass("z_icon_sld_open");
				}
				$("#z_l4_cond_panel").slideToggle("slow");
			});
		}
		if ($("#z_l5_cond_panel_btn").length) {
			$("#z_l5_cond_panel_btn").click(function(){
				if ($("#z_l5_cond_panel_btn_icon").length) {
					$("#z_l5_cond_panel_btn_icon").toggleClass("z_icon_sld_open");
				}
				$("#z_l5_cond_panel").slideToggle("slow");
			});
		}
		if ($("#z_f1_cond_panel_btn").length) {
			$("#z_f1_cond_panel_btn").click(function(){
				if ($("#z_f1_cond_panel_btn_icon").length) {
					$("#z_f1_cond_panel_btn_icon").toggleClass("z_icon_sld_open");
				}
				$("#z_f1_cond_panel").slideToggle("slow");
			});
		}
		if ($("#z_f2_cond_panel_btn").length) {
			$("#z_f2_cond_panel_btn").click(function(){
				if ($("#z_f2_cond_panel_btn_icon").length) {
					$("#z_f2_cond_panel_btn_icon").toggleClass("z_icon_sld_open");
				}
				$("#z_f2_cond_panel").slideToggle("slow");
			});
		}
		if ($("#z_f3_cond_panel_btn").length) {
			$("#z_f3_cond_panel_btn").click(function(){
				if ($("#z_f3_cond_panel_btn_icon").length) {
					$("#z_f3_cond_panel_btn_icon").toggleClass("z_icon_sld_open");
				}
				$("#z_f3_cond_panel").slideToggle("slow");
			});
		}
		if ($("#z_f4_cond_panel_btn").length) {
			$("#z_f4_cond_panel_btn").click(function(){
				if ($("#z_f4_cond_panel_btn_icon").length) {
					$("#z_f4_cond_panel_btn_icon").toggleClass("z_icon_sld_open");
				}
				$("#z_f4_cond_panel").slideToggle("slow");
			});
		}
		if ($("#z_f5_cond_panel_btn").length) {
			$("#z_f5_cond_panel_btn").click(function(){
				if ($("#z_f5_cond_panel_btn_icon").length) {
					$("#z_f5_cond_panel_btn_icon").toggleClass("z_icon_sld_open");
				}
				$("#z_f5_cond_panel").slideToggle("slow");
			});
		}
	});
}
<?php
// 絞り込みcond選択状況		add 2011/08/08 Y.Matsukawa
?>
function ZdcEmapCondSelected(frm) {
	var cond;
	if (ZdcEmapCond.length > 0) {
		for(var i=0; i < ZdcEmapCond.length; i++) {
			cond = eval("frm.cond"+ZdcEmapCond[i]);
			if (cond) {
				switch (cond.type) {
					case "checkbox":
						if (cond.checked == true) return true;
						break;
					case "select-one":
						if (cond.selectedIndex > 0) return true;
						break;
					case "radio":
						if (cond.checked == true && cond.value) return true;
						break;
					case "hidden":
						break;
				}
			}
		}
	}
	return false;
}
<?php
// 絞り込みcondボタンクリック		add 2011/08/08 Y.Matsukawa
?>
function ZdcEmapCondBtnClick(typ) {
	var btn = document.getElementById("z_"+typ+"_cond_panel_btn");
	var txt = document.getElementById("z_"+typ+"_cond_panel_btn_txt");
	var frm;
	switch (typ) {
		case 'pl':
			frm = document.formN;
			break;
		case 'fw':
			frm = document.formFw;
			break;
		case 'sl':
			frm = document.formSL;
			break;
		case 'l1':
			frm = document.formL1;
			break;
		case 'l2':
			frm = document.formL2;
			break;
		case 'l3':
			frm = document.formL3;
			break;
		case 'l4':
			frm = document.formL4;
			break;
		case 'l5':
			frm = document.formL5;
			break;
		case 'f1':
			frm = document.formF1;
			break;
		case 'f2':
			frm = document.formF2;
			break;
		case 'f3':
			frm = document.formF3;
			break;
		case 'f4':
			frm = document.formF4;
			break;
		case 'f5':
			frm = document.formF5;
			break;
	}
	if (!frm) return;
	if (!btn) return;
	if (ZdcEmapCondSelected(frm) == true) {
		btn.className = 'z_cond_panel_btn_on';
		if (txt) txt.innerHTML = '<?php echo $D_COND_BTN_ON; ?>';
	} else {
		btn.className = 'z_cond_panel_btn';
		if (txt) txt.innerHTML = '<?php echo $D_COND_BTN; ?>';
	}
}

<?php
// TOP現在地取得の絞り込み条件取得		add 2012/05/23 Y.Matsukawa
?>
function ZdcEmapMakeGPSCondParams(frm) {
	ZdcEmapGPSCondParams = "";
	if (frm.plfilter) {
		if (frm.plfilter.value) {
			ZdcEmapGPSCondParams += "&plfilter="+frm.plfilter.value;
		}
	}
	if (ZdcEmapCond.length > 0) {
		for(var i=0; i < ZdcEmapCond.length; i++) {
			cond = eval("frm.cond"+ZdcEmapCond[i]);
			if (cond) {
				if (cond.value) {
					ZdcEmapGPSCondParams += "&cond"+ZdcEmapCond[i]+"="+cond.value;
				}
			}
		}
	}
}

<?php
// 拠点フリーワード検索：画面初期化
?>
function ZdcEmapSearchShopFWInit() {
	ZdcEmapSearchShopFwListObj = document.getElementById('ZdcEmapSearchShopFwList');
}
<?php
// 拠点フリーワード検索：実行
?>
<?php //function ZdcEmapSearchShopFW(keyword, filter, page) {	mod 2011/08/08 Y.Matsukawa ?>
<?php //function ZdcEmapSearchShopFW(keyword, filter, cond, page) {		mod 2011/08/12 K/Masuda ?>
<?php //function ZdcEmapSearchShopFW(keyword, filter, cond, page, col) {		mod 2012/01/11 Y.Matsukawa ?>
function ZdcEmapSearchShopFW(keyword, filter, cond, page, col, parms) {
	<?php //パラメーター組み立て ?>
	//var prm = "keyword="+keyword;	// mod 2012/03/08 K.Masuda
	var prm = "keyword="+escape(keyword);
	if (filter) prm += "&filter="+filter;
	if (cond) prm += cond;		<?php // add 2011/08/08 Y.Matsukawa ?>
	if (parms) prm += "&"+parms;		<?php // add 2012/01/11 Y.Matsukawa ?>
	if (!page) page = 1;
	prm += "&pg="+page;
	<?php //画面書き換え ?>
	<?php // mod 2011/07/05 Y.Nakajima ?>
	var url = "<?PHP echo $D_DIR_BASE_L; ?>fw_list.htm?"
			+ prm 
			<?php if(isset($https_req) && $https_req){ ?>+"&https_req=1"<?php } ?>
			+ "&col=" + col;	<?php // add 2011/08/12 K.Masuda ?>
	;
	<?php
	// add 2015/01/16 Y.Matsukawa [
	if($_SERVER['HTTP_HOST']){ echo 'url += "&PARENT_HTTP_HOST='.urlencode($_SERVER['HTTP_HOST']).'";'; }
	// add 2015/01/16 Y.Matsukawa ] ?>
	<?php //ZdcEmapSearchRequest(url, ZdcEmapSearchShopFwListObj);		mod 2012/09/10 Y.Matsukawa ?>
	ZdcEmapSearchRequest(url, ZdcEmapSearchShopFwListObj, false, 2);
}
<?php
// 拠点フリーワード検索：リスト初期化		add 2012/02/21 Y.Matsukawa
?>
function ZdcEmapSearchShopFWListClear() {
	if(ZdcEmapSearchShopFwListObj) ZdcEmapSearchShopFwListObj.innerHTML = "";
}
<?php
// 拠点フリーワード：入力ボックス
?>
function ZdcEmapShopFWIn(kwObj) {
	if (kwObj.value == "<?php echo $D_SHOP_FW_INIT; ?>") {
		kwObj.value = "";
	}
	kwObj.className = "freewordBox freewordBox-ent";
}
function ZdcEmapShopFWOut(kwObj) {
	if (kwObj.value == "") {
		kwObj.value = "<?php echo $D_SHOP_FW_INIT; ?>";
	}
	if (kwObj.value == "<?php echo $D_SHOP_FW_INIT; ?>") {
		kwObj.className = "freewordBox";
	}
}
function ZdcEmapShopFWSubmit(formObj) {
	if (!formObj.keyword) return;
	if (formObj.keyword.value == "<?php echo $D_SHOP_FW_INIT; ?>") {
		formObj.keyword.value = "";
	}
}
<?php // add 2011/08/12 K.Masuda [ 
// 拠点フリーワード（カラム指定）：入力ボックス
?>
function ZdcEmapShopFWInCol(kwObj) {
	if (kwObj.value == "<?php echo $D_SHOP_FW_INIT_COL; ?>") {
		kwObj.value = "";
	}
	kwObj.className = "freewordBox freewordBox-ent";
}
function ZdcEmapShopFWOutCol(kwObj) {
	if (kwObj.value == "") {
		kwObj.value = "<?php echo $D_SHOP_FW_INIT_COL; ?>";
	}
	if (kwObj.value == "<?php echo $D_SHOP_FW_INIT_COL; ?>") {
		kwObj.className = "freewordBox";
	}
}
function ZdcEmapShopFWSubmitCol(formObj) {
	if (!formObj.keyword) return;
	if (formObj.keyword.value == "<?php echo $D_SHOP_FW_INIT_COL; ?>") {
		formObj.keyword.value = "";
	}
}
<?php // add 2011/08/12 K.Masuda ] ?>

<?php
// 拠点リスト検索：画面初期化		add 2011/08/08 Y.Matsukawa
?>
function ZdcEmapSearchShopLInit(ltype) {
	ZdcEmapSearchShopLListObj = document.getElementById('ZdcEmapSearchShopLList');
}
<?php
// 拠点リスト検索：実行		add 2011/08/08 Y.Matsukawa
?>
function ZdcEmapSearchShopL(ltype, area1, area2, filter, cond, page) {
	<?php //パラメーター組み立て ?>
	var prm = "&ltype="+ltype;
	if (area1) prm += "&area1="+area1;
	if (area2) prm += "&area2="+area2;
	if (filter) prm += "&filter="+filter;
	if (cond) prm += cond;
	if (!page) page = 1;
	prm += "&pg="+page;
	<?php //画面書き換え ?>
	var url = "<?PHP echo $D_DIR_BASE_L; ?>sl_list.htm?"
			+ prm 
			<?php if($https_req){ ?>+"&https_req=1"<?php } ?>
	;
	<?php
	// add 2015/01/16 Y.Matsukawa [
	if($_SERVER['HTTP_HOST']){ echo 'url += "&PARENT_HTTP_HOST='.urlencode($_SERVER['HTTP_HOST']).'";'; }
	// add 2015/01/16 Y.Matsukawa ] ?>
	<?php //ZdcEmapSearchRequest(url, ZdcEmapSearchShopLListObj);		mod 2012/09/10 Y.Matsukawa ?>
	ZdcEmapSearchRequest(url, ZdcEmapSearchShopLListObj, false, 2);
}
<?php
// 拠点リスト検索：リスト初期化		add 2012/02/21 Y.Matsukawa
?>
function ZdcEmapSearchShopLListClear() {
	if(ZdcEmapSearchShopLListObj) ZdcEmapSearchShopLListObj.innerHTML = "";
}

<?php
// 最寄り拠点一覧：画面初期化
?>
function ZdcEmapNearShopInit() {
	ZdcEmapSearchNShopListObj = document.getElementById('ZdcEmapSearchNShopList');
}
<?php
// 最寄り拠点一覧：実行
?>
<?php //function ZdcEmapSearchNearShop(lat, lon, datum, filter, parm, page) {		mod 2012/02/21 Y.Matsukawa ?>
<?php //function ZdcEmapSearchNearShop(lat, lon, datum, filter, parm, cond, page) {		mod 2016/05/23 Y.Matsukawa ?>
function ZdcEmapSearchNearShop(lat, lon, datum, filter, parm, cond, page, replaceId) {
	<?php //パラメーター組み立て ?>
	var prm = "lat="+lat+"&lon="+lon;
	if (datum) prm += "&datum="+datum;
	if (filter) prm += "&filter="+filter;
	if (parm) prm += parm;
	if (cond) prm += cond;		<?php // add 2012/02/21 Y.Matsukawa ?>
	if (!page) page = 1;
	prm += "&pg="+page;
	<?php //画面書き換え ?>
	<?php // mod 2011/07/05 Y.Nakajima ?>
	var url = "<?PHP echo $D_DIR_BASE_L; ?>n_list.htm?"
			+ prm 
			<?php if(isset($https_req) && $https_req){ ?>+"&https_req=1"<?php } ?>
	;
	<?php
	// add 2015/01/16 Y.Matsukawa [
	if($_SERVER['HTTP_HOST']){ echo 'url += "&PARENT_HTTP_HOST='.urlencode($_SERVER['HTTP_HOST']).'";'; }
	// add 2015/01/16 Y.Matsukawa ] ?>
	<?php // add 2016/05/23 Y.Matsukawa [ ?>
	if (replaceId) {
		var listObj = document.getElementById(replaceId);
		if (listObj) {
			ZdcEmapSearchRequest(url, listObj, true, 2, false, replaceId);
		}
	} else {
	<?php // add 2016/05/23 Y.Matsukawa ] ?>
		//ZdcEmapSearchRequest(url, ZdcEmapSearchNShopListObj);		mod 2012/09/10 Y.Matsukawa
		<?php //ZdcEmapSearchRequest(url, ZdcEmapSearchNShopListObj, false, 2);		mod 2016/03/18 Y.Matsukawa ?>
		<?php //ZdcEmapSearchRequest(url, ZdcEmapSearchNShopListObj, false, 2, 1);		mod 2016/03/22 Y.Matsukawa ?>
		ZdcEmapSearchRequest(url, ZdcEmapSearchNShopListObj, false, 2);
	}
}

<?php // add 2016/01/28 H.Yasunaga 711map ニッセンカスタマイズ [ ?>
function ZdcEmapSearchNearShop2(lat, lon, datum, filter, parm, cond, page, latlon) {
	NISSEN_SearchNear2 = true;
	<?php //パラメーター組み立て ?>
	var prm = "lat="+lat+"&lon="+lon;
	if (latlon) prm += "&latlon="+latlon;
	if (datum) prm += "&datum="+datum;
	if (filter) prm += "&filter="+filter;
	if (parm) prm += parm;
	if (cond) prm += cond;		<?php // add 2012/02/21 Y.Matsukawa ?>
	if (!page) page = 1;
	prm += "&pg="+page;
	<?php //画面書き換え ?>
	<?php // mod 2011/07/05 Y.Nakajima ?>
	var url = "<?PHP echo $D_DIR_BASE_L; ?>n_list.htm?"
			+ prm 
			<?php if(isset($https_req) && $https_req){ ?>+"&https_req=1"<?php } ?>
	;
	<?php
	// add 2015/01/16 Y.Matsukawa [
	if($_SERVER['HTTP_HOST']){ echo 'url += "&PARENT_HTTP_HOST='.urlencode($_SERVER['HTTP_HOST']).'";'; }
	// add 2015/01/16 Y.Matsukawa ] ?>
	//ZdcEmapSearchRequest(url, ZdcEmapSearchNShopListObj);		mod 2012/09/10 Y.Matsukawa
	// mod 2016/01/28 H.Yasunaga 711mapニッセンカスタマイズ [
	//ZdcEmapSearchRequest(url, ZdcEmapSearchNShopListObj, false, 2);
	ZdcEmapSearchRequest(url, ZdcEmapSearchNShopListObj, true, 2);
	// mod 2016/01/28 H.Yasunaga 711mapニッセンカスタマイズ ]
}
<?php // add 2016/01/28 H.Yasunaga 711map ニッセンカスタマイズ ] ?>


<?php
// 最寄り拠点一覧：リスト初期化		add 2012/02/21 Y.Matsukawa
?>
function ZdcEmapSearchNearShopListClear() {
	if(ZdcEmapSearchNShopListObj) ZdcEmapSearchNShopListObj.innerHTML = "";
}

<?php
// add 2011/07/13 Y.Matsukawa 
// 最寄り駅一覧：画面初期化 
?>
function ZdcEmapNearEkiInit() {
	ZdcEmapSearchNekiListObj = document.getElementById('ZdcEmapSearchNekiList');
}
<?php
// 最寄り駅一覧：実行
?>
<?php // function ZdcEmapSearchNearEki(lat, lon, datum, kid, page) {	mod 2012/01/11 Y.Matsukawa ?>
function ZdcEmapSearchNearEki(lat, lon, datum, kid, page, parms) {
	<?php //パラメーター組み立て ?>
	var prm = "lat="+lat+"&lon="+lon;
	if (datum) prm += "&datum="+datum;
	if (kid) prm += "&kid="+kid;
	if (parms) prm += "&"+parms;		<?php // add 2012/01/11 Y.Matsukawa ?>
	if (!page) page = 1;
	prm += "&pg="+page;
	<?php //画面書き換え ?>
	var url = "<?PHP echo $D_DIR_BASE_L; ?>ne_list.htm?"
			+ prm 
			<?php if($https_req){ ?>+"&https_req=1"<?php } ?>
	;
	<?php
	// add 2015/01/16 Y.Matsukawa [
	if($_SERVER['HTTP_HOST']){ echo 'url += "&PARENT_HTTP_HOST='.urlencode($_SERVER['HTTP_HOST']).'";'; }
	// add 2015/01/16 Y.Matsukawa ] ?>
	<?php //ZdcEmapSearchRequest(url, ZdcEmapSearchNekiListObj);		mod 2012/09/10 Y.Matsukawa ?>
	ZdcEmapSearchRequest(url, ZdcEmapSearchNekiListObj, false, 2);
}
<?php
// 最寄り駅一覧（Maplinkから）：実行		add 2011/09/02 Y.Matsukawa
?>
<?php // function ZdcEmapSearchNearEkiMaplink(maplinkprm, page) {	mod 2012/01/11 Y.Matsukawa ?>
function ZdcEmapSearchNearEkiMaplink(maplinkprm, page, parms) {
	<?php //パラメーター組み立て ?>
	var prm = "svtype=N";
	prm += "&"+maplinkprm;
	if (parms) prm += "&"+parms;		<?php // add 2012/01/11 Y.Matsukawa ?>
	if (!page) page = 1;
	prm += "&pg="+page;
	<?php //画面書き換え ?>
	var url = "<?PHP echo $D_DIR_BASE_L; ?>ne_list.htm?"
			+ prm 
			<?php if($https_req){ ?>+"&https_req=1"<?php } ?>
	;
	<?php
	// add 2015/01/16 Y.Matsukawa [
	if($_SERVER['HTTP_HOST']){ echo 'url += "&PARENT_HTTP_HOST='.urlencode($_SERVER['HTTP_HOST']).'";'; }
	// add 2015/01/16 Y.Matsukawa ] ?>
	<?php //ZdcEmapSearchRequest(url, ZdcEmapSearchNekiListObj);		mod 2012/09/10 Y.Matsukawa ?>
	ZdcEmapSearchRequest(url, ZdcEmapSearchNekiListObj, false, 2);
}

<?php
// add 2012/07/18 Y.Matsukawa
// 最寄り施設一覧：画面初期化 
?>
function ZdcEmapNearPoiInit() {
	ZdcEmapSearchNpoiListObj = document.getElementById('ZdcEmapSearchNpoiList');
}
<?php
// add 2012/07/18 Y.Matsukawa
// 最寄り施設一覧：実行
?>
function ZdcEmapSearchNearPoi(lat, lon, datum, jnrmn, kid, page, parms) {
	<?php //パラメーター組み立て ?>
	var prm = "lat="+lat+"&lon="+lon;
	if (datum) prm += "&datum="+datum;
	if (jnrmn) prm += "&jnrmn="+jnrmn;
	if (kid) prm += "&kid="+kid;
	if (parms) prm += "&"+parms;
	if (!page) page = 1;
	prm += "&pg="+page;
	<?php //画面書き換え ?>
	var url = "<?PHP echo $D_DIR_BASE_L; ?>np_list.htm?"
			+ prm 
			<?php if($https_req){ ?>+"&https_req=1"<?php } ?>
	;
	<?php
	// add 2015/01/16 Y.Matsukawa [
	if($_SERVER['HTTP_HOST']){ echo 'url += "&PARENT_HTTP_HOST='.urlencode($_SERVER['HTTP_HOST']).'";'; }
	// add 2015/01/16 Y.Matsukawa ] ?>
	<?php //ZdcEmapSearchRequest(url, ZdcEmapSearchNpoiListObj);		mod 2012/09/10 Y.Matsukawa ?>
	ZdcEmapSearchRequest(url, ZdcEmapSearchNpoiListObj, false, 2);
}
<?php
// add 2012/07/18 Y.Matsukawa
// 最寄り施設一覧（Maplinkから）：実行
?>
function ZdcEmapSearchNearPoiMaplink(maplinkprm, jnrmn, page, parms) {
	<?php //パラメーター組み立て ?>
	var prm = "svtype=N";
	if (jnrmn) prm += "&jnrmn="+jnrmn;
	prm += "&"+maplinkprm;
	if (parms) prm += "&"+parms;
	if (!page) page = 1;
	prm += "&pg="+page;
	<?php //画面書き換え ?>
	var url = "<?PHP echo $D_DIR_BASE_L; ?>np_list.htm?"
			+ prm 
			<?php if($https_req){ ?>+"&https_req=1"<?php } ?>
	;
	<?php
	// add 2015/01/16 Y.Matsukawa [
	if($_SERVER['HTTP_HOST']){ echo 'url += "&PARENT_HTTP_HOST='.urlencode($_SERVER['HTTP_HOST']).'";'; }
	// add 2015/01/16 Y.Matsukawa ] ?>
	<?php //ZdcEmapSearchRequest(url, ZdcEmapSearchNpoiListObj);		mod 2012/09/10 Y.Matsukawa ?>
	ZdcEmapSearchRequest(url, ZdcEmapSearchNpoiListObj, false, 2);
}

<?php
// 店舗全件一覧：画面初期化		add 2012/05/14 Y.Matsukawa
?>
function ZdcEmapKListInit() {
	ZdcEmapSearchKListObj = document.getElementById('ZdcEmapSearchKList');
}
<?php
// 店舗全件一覧：実行		add 2012/05/14 Y.Matsukawa
?>
<?php //function ZdcEmapSearchKList(col, sortkeys, parm, page) {		mod 2016/04/17 Y.Matsukawa ?>
function ZdcEmapSearchKList(col, sortkeys, parm, cond, page) {
	<?php //パラメーター組み立て ?>
	var prm = "col="+col+"&sortkeys="+sortkeys;
	if (parm) prm += parm;
	if (cond) prm += cond;		<?php // add 2016/04/17 Y.Matsukawa ?>
	if (!page) page = 1;
	prm += "&pg="+page;
	<?php //画面書き換え ?>
	var url = "<?PHP echo $D_DIR_BASE_L; ?>k_list.htm?"
			+ prm 
			<?php if(isset($https_req) && $https_req){ ?>+"&https_req=1"<?php } ?>
	;
	<?php //ZdcEmapSearchRequest(url, ZdcEmapSearchKListObj);		mod 2012/09/10 Y.Matsukawa ?>
	ZdcEmapSearchRequest(url, ZdcEmapSearchKListObj, false, 2);
}

<?php
// 住所リスト検索：画面初期化
?>
function ZdcEmapSearchAddrLInit() {
	ZdcEmapSearchAddrLListObj = document.getElementById('ZdcEmapSearchAddrLList');
}
<?php 
// 住所リスト検索：実行
?>
function ZdcEmapSearchAddrL(area, adcd, parm, page, replace) {
	<?php //パラメーター組み立て ?>
	var prm = "";
	if (area) prm += "area="+area;
	if (adcd) prm += "adcd="+adcd;
	if (parm) prm += parm;
	if (!page) page = 1;
	prm += "&pg="+page;
	<?php //画面書き換え ?>
	var url = "<?PHP echo $D_DIR_BASE_L; ?>search_addr_list.htm?"
			+ prm 
			<?php if($https_req){ ?>+"&https_req=1"<?php } ?>
	;
	<?php
	// add 2015/01/16 Y.Matsukawa [
	if($_SERVER['HTTP_HOST']){ echo 'url += "&PARENT_HTTP_HOST='.urlencode($_SERVER['HTTP_HOST']).'";'; }
	// add 2015/01/16 Y.Matsukawa ] ?>
	<?php //ZdcEmapSearchRequest(url, ZdcEmapSearchAddrLListObj, replace);		mod 2012/09/10 Y.Matsukawa ?>
	ZdcEmapSearchRequest(url, ZdcEmapSearchAddrLListObj, replace, 2);
}

<?php
// 駅リスト検索：画面初期化		add 2011/08/08 Y.Matsukawa
?>
function ZdcEmapSearchEkiLInit() {
	ZdcEmapSearchEkiLListObj = document.getElementById('ZdcEmapSearchEkiLList');
}
<?php
// 駅リスト検索：実行		add 2011/08/08 Y.Matsukawa
?>
function ZdcEmapSearchEkiL(area, tod, kn, parm, page, replace) {
	<?php //パラメーター組み立て ?>
	var prm = "";
	if (area != "") prm += "&area="+area;
	if (tod != "") prm += "&tod="+tod;
	if (kn != "") prm += "&kn="+kn;
	if (parm) prm += parm;
	if (!page) page = 1;
	prm += "&pg="+page;
	<?php //画面書き換え ?>
	var url = "<?PHP echo $D_DIR_BASE_L; ?>search_eki_list.htm?"
			+ prm 
			<?php if($https_req){ ?>+"&https_req=1"<?php } ?>
	;
	<?php
	// add 2015/01/16 Y.Matsukawa [
	if($_SERVER['HTTP_HOST']){ echo 'url += "&PARENT_HTTP_HOST='.urlencode($_SERVER['HTTP_HOST']).'";'; }
	// add 2015/01/16 Y.Matsukawa ] ?>
	<?php //ZdcEmapSearchRequest(url, ZdcEmapSearchEkiLListObj, replace);		mod 2012/09/10 Y.Matsukawa ?>
	ZdcEmapSearchRequest(url, ZdcEmapSearchEkiLListObj, replace, 2);
}

<?php
// 路線検索：画面初期化		add 2014/03/12 Y.Matsukawa
?>
function ZdcEmapSearchRosenLInit() {
	ZdcEmapSearchRosenLListObj = document.getElementById('ZdcEmapSearchRosenLList');
}
<?php 
// 路線検索：実行		add 2014/03/12 Y.Matsukawa
?>
function ZdcEmapSearchRosenL(area, tod, line, parm, page, replace) {
	<?php //パラメーター組み立て ?>
	var prm = "";
	if (area) prm += "&area="+area;
	if (tod) prm += "&tod="+tod;
	if (line) prm += "&line="+line;
	if (parm) prm += parm;
	if (!page) page = 1;
	prm += "&pg="+page;
	<?php //画面書き換え ?>
	var url = "<?PHP echo $D_DIR_BASE_L; ?>search_rosen_list.htm?"
			+ prm 
			<?php if($https_req){ ?>+"&https_req=1"<?php } ?>
	;
	<?php
	// add 2015/01/16 Y.Matsukawa [
	if($_SERVER['HTTP_HOST']){ echo 'url += "&PARENT_HTTP_HOST='.urlencode($_SERVER['HTTP_HOST']).'";'; }
	// add 2015/01/16 Y.Matsukawa ] ?>
	ZdcEmapSearchRequest(url, ZdcEmapSearchRosenLListObj, replace, 2);
}

<?php
// 路線FW検索：画面初期化		add 2017/04/21 N.Wada
?>
function ZdcEmapSearchFWRosenInit() {
	ZdcEmapSearchFWRosenListObj = document.getElementById('ZdcEmapSearchFWRosenList');
}
<?php 
// 路線FW検索：実行		add 2017/04/21 N.Wada
?>
function ZdcEmapSearchFWRosen(keyword, parm, page, replace) {
	<?php //パラメーター組み立て ?>
	var prm = "";
	if (keyword) prm += "&keyword="+keyword;
	if (parm) prm += parm;
	if (!page) page = 1;
	prm += "&pg="+page;
	<?php //画面書き換え ?>
	var url = "<?PHP echo $D_DIR_BASE_L; ?>search_fw_rosen_list.htm?"
			+ prm 
			<?php if($https_req){ ?>+"&https_req=1"<?php } ?>
	;
	<?php
	if($_SERVER['HTTP_HOST']){ echo 'url += "&PARENT_HTTP_HOST='.urlencode($_SERVER['HTTP_HOST']).'";'; }
	?>
	ZdcEmapSearchRequest(url, ZdcEmapSearchFWRosenListObj, replace, 2);
}

<?php
// 施設リスト検索：画面初期化		add 2012/04/24 Y.Matsukawa
?>
function ZdcEmapSearchPoiLInit() {
	ZdcEmapSearchPoiLListObj = document.getElementById('ZdcEmapSearchPoiLList');
}
<?php
// 施設リスト検索：実行		add 2012/04/24 Y.Matsukawa
?>
function ZdcEmapSearchPoiL(jnrmn, jnr, area, tod, parm, page, replace) {
	<?php //パラメーター組み立て ?>
	var prm = "";
	if (jnrmn != "") prm += "&jnrmn="+jnrmn;
	if (jnr != "") prm += "&jnr="+jnr;
	if (area != "") prm += "&area="+area;
	if (tod != "") prm += "&tod="+tod;
	if (parm) prm += parm;
	if (!page) page = 1;
	//prm += "&pg="+page;
	prm = "pg="+page+prm;
	<?php //画面書き換え ?>
	var url = "<?PHP echo $D_DIR_BASE_L; ?>search_poi_list.htm?"
			+ prm 
			<?php if($https_req){ ?>+"&https_req=1"<?php } ?>
	;
	<?php
	// add 2015/01/16 Y.Matsukawa [
	if($_SERVER['HTTP_HOST']){ echo 'url += "&PARENT_HTTP_HOST='.urlencode($_SERVER['HTTP_HOST']).'";'; }
	// add 2015/01/16 Y.Matsukawa ] ?>
	<?php //ZdcEmapSearchRequest(url, ZdcEmapSearchPoiLListObj, replace);		mod 2012/09/10 Y.Matsukawa ?>
	ZdcEmapSearchRequest(url, ZdcEmapSearchPoiLListObj, replace, 2);
}

<?php
// フリーワード検索：画面初期化
?>
var ZdcEmapSearchFWTarget = null;
function ZdcEmapSearchFWInit(target) {
	if (!target) return;
	ZdcEmapSearchFWTarget = target;
}
<?php
// フリーワード検索：実行
?>
function ZdcEmapSearchFW(target, keyword, parm, page) {
	var targetArr = new Array();
	if (target == "all") {
		targetArr = ZdcEmapSearchFWTarget.split("|");
	} else {
		targetArr[0] = target;
	}
	<?php //パラメーター組み立て ?>
	<?php //var prm = "keyword="+keyword;	mod 2012/02/29 K.Masuda ?>
	var prm = "keyword="+escape(keyword);
	if (!page) page = 1;
	if (parm) prm += parm;
	prm += "&pg="+page;
	<?php //画面書き換え ?>
	for (i=0; i<targetArr.length; i++) {
		var no = targetArr[i];
		<?php // mod 2011/07/05 Y.Nakajima ?>
		var url = "<?PHP echo $D_DIR_BASE_L; ?>search_fw_list.htm?"
				+ prm
				+ "&target="+no
				<?php if(isset($https_req) && $https_req){ ?>+"&https_req=1"<?php } ?>
		;
		<?php
		// add 2015/01/16 Y.Matsukawa [
		if($_SERVER['HTTP_HOST']){ echo 'url += "&PARENT_HTTP_HOST='.urlencode($_SERVER['HTTP_HOST']).'";'; }
		// add 2015/01/16 Y.Matsukawa ] ?>
		<?php //ZdcEmapMultiSearchRequest(url, no, document.getElementById('ZdcEmapSearchFWList'+no));		mod 2012/09/10 Y.Matsukawa ?>
		ZdcEmapMultiSearchRequest(url, no, document.getElementById('ZdcEmapSearchFWList'+no), false, 2);
	}
}
<?php
// フリーワード検索：タブクリック
?>
function ZdcEmapSearchFWTabClick(no) {
	<?php //for (i=1; i<=3; i++) { // mod 2016/01/19 F.Yokoi ?>
	for (i=1; i<=5; i++) {
		var tabObj = document.getElementById('ZdcEmapSearchFWTab'+i);
		var listObj = document.getElementById('ZdcEmapSearchFWList'+i);
		if (tabObj && listObj) { <?php // add 2016/01/19 F.Yokoi ?>
			if (no == i) {
				tabObj.className = "on";
				listObj.style.display = "block";
			} else {
				tabObj.className = "";
				listObj.style.display = "none";
			}
		} <?php // add 2016/01/19 F.Yokoi ?>
	}
}
<?php
// フリーワード：入力ボックス
?>
function ZdcEmapSearchFWIn(kwObj) {
	if (kwObj.value == "<?php echo $D_PL_FW_INIT; ?>") {
		kwObj.value = "";
	}
	kwObj.className = "freewordBox freewordBox-ent";
}
function ZdcEmapSearchFWOut(kwObj) {
	if (kwObj.value == "") {
		kwObj.value = "<?php echo $D_PL_FW_INIT; ?>";
	}
	if (kwObj.value == "<?php echo $D_PL_FW_INIT; ?>") {
		kwObj.className = "freewordBox";
	}
}
function ZdcEmapSearchFWSubmit(formObj) {
	if (!formObj.keyword) return;
	if (formObj.keyword.value == "<?php echo $D_PL_FW_INIT; ?>") {
		formObj.keyword.value = "";
	}
}

<?php
// 住所・駅名・施設名フリーワード：入力ボックス		add 2012/07/05 H.osamoto
?>
function ZdcEmapMultiFWIn(kwObj, type) {
	switch (type){
		<?php // 住所 ?>
		case 1:
			if (kwObj.value == "<?php echo $D_ADDR_FW_INIT; ?>") {
				kwObj.value = "";
			}
			kwObj.className = "freewordBox freewordBox-ent";
			break;
		<?php // 駅名 ?>
		case 2:
			if (kwObj.value == "<?php echo $D_ST_FW_INIT; ?>") {
				kwObj.value = "";
			}
			kwObj.className = "freewordBox freewordBox-ent";
			break;
		<?php // 施設 ?>
		case 3:
			if (kwObj.value == "<?php echo $D_POI_FW_INIT; ?>") {
				kwObj.value = "";
			}
			kwObj.className = "freewordBox freewordBox-ent";
			break;
		<?php // add 2016/01/19 F.Yokoi [ ?>
		<?php // 店舗名 ?>
		case 5:
			if (kwObj.value == "<?php echo $D_SHOP_FW_INIT; ?>") {
				kwObj.value = "";
			}
			kwObj.className = "freewordBox freewordBox-ent";
			break;
		<?php // add 2016/01/19 F.Yokoi ] ?>
	}
}
function ZdcEmapMultiFWOut(kwObj, type) {
	switch (type){
		<?php // 住所 ?>
		case 1:
			if (kwObj.value == "") {
				kwObj.value = "<?php echo $D_ADDR_FW_INIT; ?>";
			}
			if (kwObj.value == "<?php echo $D_ADDR_FW_INIT; ?>") {
				kwObj.className = "freewordBox";
			}
			break;
		<?php // 駅名 ?>
		case 2:
			if (kwObj.value == "") {
				kwObj.value = "<?php echo $D_ST_FW_INIT; ?>";
			}
			if (kwObj.value == "<?php echo $D_ST_FW_INIT; ?>") {
				kwObj.className = "freewordBox";
			}
			break;
		<?php // 施設 ?>
		case 3:
			if (kwObj.value == "") {
				kwObj.value = "<?php echo $D_POI_FW_INIT; ?>";
			}
			if (kwObj.value == "<?php echo $D_POI_FW_INIT; ?>") {
				kwObj.className = "freewordBox";
			}
			break;
		<?php // add 2016/01/19 F.Yokoi [ ?>
		<?php // 店舗名 ?>
		case 5:
			if (kwObj.value == "") {
				kwObj.value = "<?php echo $D_SHOP_FW_INIT; ?>";
			}
			if (kwObj.value == "<?php echo $D_SHOP_FW_INIT; ?>") {
				kwObj.className = "freewordBox";
			}
			break;
		<?php // add 2016/01/19 F.Yokoi ] ?>
	}
}
function ZdcEmapMultiFWSubmit(formObj, type) {
	if (!formObj.keyword) return;
	switch (type){
		<?php // 住所 ?>
		case 1:
			if (formObj.keyword.value == "<?php echo $D_ADDR_FW_INIT; ?>") {
				formObj.keyword.value = "";
			}
			break;
		<?php // 駅名 ?>
		case 2:
			if (formObj.keyword.value == "<?php echo $D_ST_FW_INIT; ?>") {
				formObj.keyword.value = "";
			}
			break;
		<?php // 施設 ?>
		case 3:
			if (formObj.keyword.value == "<?php echo $D_POI_FW_INIT; ?>") {
				formObj.keyword.value = "";
			}
			break;
		<?php // add 2016/01/19 F.Yokoi [ ?>
		<?php // 店舗名 ?>
		case 5:
			if (formObj.keyword.value == "<?php echo $D_SHOP_FW_INIT; ?>") {
				formObj.keyword.value = "";
			}
			break;
		<?php // add 2016/01/19 F.Yokoi ] ?>
	}
}

<?php // 一覧をリフレッシュ		add 2014/09/11 Y.Matsukawa ?>
function ZdcEmapRefList() {
	if (ZdcEmapRefListObj) {
		ZdcEmapRefListObj.innerHTML = ZdcEmapRefListObj.innerHTML + ' ';
		ZdcEmapRefListObj.offsetLeft;
		ZdcEmapRefListObj = null;
		<?php
		// 最寄り地図に一覧を表示している場合、イベント再開		add 2016/04/14 Y.Matsukawa
		if ($D_NMAP_AND_NLIST) {
		?>
		if (typeof ZdcEmapNListEventStart == "function") {
			ZdcEmapNListEventStart();
		}
		<?php
		}
		?>
	}
}

<?php
// 検索リクエスト処理
?>
<?php //function ZdcEmapSearchRequest(url, listObj, replace) {		mod 2012/09/10 Y.Matsukawa ?>
<?php //function ZdcEmapSearchRequest(url, listObj, replace, typ) {		mod 2016/03/18 Y.Matsukawa ?>
<?php //function ZdcEmapSearchRequest(url, listObj, replace, typ, noref) {		mod 2016/05/23 Y.Matsukawa ?>
function ZdcEmapSearchRequest(url, listObj, replace, typ, noref, replaceId) {
	if(typ == undefined) typ = 1;		<?php // add 2012/09/10 Y.Matsukawa ?>
	<?php // 次読み込みリンクを「読み込み中」に変更 ?>
	var ZdcEmapSearchNextObj = document.getElementById("ZdcEmapSearchNext");
	if (!ZdcEmapSearchNextObj && replaceId) ZdcEmapSearchNextObj = document.getElementById(replaceId);		<?php // add 2016/05/23 Y.Matsukawa ?>
	if (ZdcEmapSearchNextObj)
		ZdcEmapSearchNextObj.innerHTML = "<p><?php echo $D_WAIT_MSG; ?></p>";
	ZdcEmapHttpRequestHtml(url, function(html, status){
		if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> search["+status+"]";
		<?php // 次読み込みリンクを削除 ?>
		var ZdcEmapSearchNextObj = document.getElementById("ZdcEmapSearchNext");
		if (listObj && ZdcEmapSearchNextObj)
			listObj.removeChild(ZdcEmapSearchNextObj);
		<?php // 検索結果を追加 ?>
		if (replace) {
			listObj.innerHTML = html;
		} else {
			listObj.innerHTML += html;
		}
		listObj.style.visibility = "visible";
		<?php // add 2016/01/28 H.Yasunaga ニッセンカスタマイズ [ ?>
		if (NISSEN_SearchNear2 == true) {
			NISSEN_SearchNear2 = false;
			var n_list_count = document.getElementById("n_list_hit_count");
			var tab_sote_count = document.getElementById("tab_store_count");
			tab_store_count.innerHTML = "(" + n_list_count.value + "件)";
		}
		<?php // add 2016/01/28 H.Yasunaga ] ?>

		<?php // add 2014/09/11 Y.Matsukawa [ ?>
		<?php // 一部機種で一覧がリフレッシュされない不具合に対応 ?>
		ZdcEmapRefListObj = listObj;
		setTimeout(ZdcEmapRefList, 100);
		<?php // add 2014/09/11 Y.Matsukawa ] ?>
	<?php //});		mod 2012/09/10 Y.Matsukawa ?>
	<?php //}, false, typ);		mod 2016/03/18 Y.Matsukawa ?>
	}, false, typ, noref);
}
<?php
// 検索リクエスト処理（複数）
?>
<?php //function ZdcEmapMultiSearchRequest(url, target, listObj, replace) {		mod 2012/09/10 Y.Matsukawa ?>
function ZdcEmapMultiSearchRequest(url, target, listObj, replace, typ) {
	if(typ == undefined) typ = 1;		<?php // add 2012/09/10 Y.Matsukawa ?>
	<?php // 次読み込みリンクを「読み込み中」に変更 ?>
	var ZdcEmapSearchNextObj = document.getElementById("ZdcEmapSearchNext"+target);
	if (ZdcEmapSearchNextObj)
		ZdcEmapSearchNextObj.innerHTML = "<p><?php echo $D_WAIT_MSG; ?></p>";
	ZdcEmapHttpRequestHtml(url, function(html, status){
		if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> search["+status+"]";
		<?php // 次読み込みリンクを削除 ?>
		var ZdcEmapSearchNextObj = document.getElementById("ZdcEmapSearchNext"+target);
		if (listObj && ZdcEmapSearchNextObj)
			listObj.removeChild(ZdcEmapSearchNextObj);
		<?php // 検索結果を追加 ?>
		if (replace) {
			listObj.innerHTML = html;
		} else {
			listObj.innerHTML += html;
		}
		listObj.style.visibility = "visible";
		<?php // add 2014/09/11 Y.Matsukawa [ ?>
		<?php // 一部機種で一覧がリフレッシュされない不具合に対応 ?>
		ZdcEmapRefListObj = listObj;
		setTimeout(ZdcEmapRefList, 100);
		<?php // add 2014/09/11 Y.Matsukawa ] ?>
	<?php //});		mod 2012/09/10 Y.Matsukawa ?>
	}, false, typ);
}

function ZdcEmapLocProgress() {
	var c=document.getElementById("ZdcEmapLocCmmt");
	if(c){
		c.innerHTML = "現在地を取得中...";
	}
}
function ZdcEmapLocFinish() {
	var c=document.getElementById("ZdcEmapLocCmmt");
	if(c){
		c.innerHTML = "";
	}
}

<?php // add 2011/10/04 K.Masuda [ ?>
var flt = "";
function GetFilter(){
	if( document.getElementById("gpsfilter").value ){
		flt = document.getElementById("gpsfilter").value;
	} else {
		flt = "";
	}
}
<?php // add 2011/10/04 K.Masuda ] ?>

<?php // del 2015/05/27 Y.Matsukawa [ ※common.jsへ移植
//< ?php
// formCondから絞り込み条件（パラメータ文字列）を取得		add 2012/02/21 Y.Matsukawa
//? >
//< ?php //function ZdcEmapGetCondParm() {		mod 2012/09/10 Y.Matsukawa ? >
//function ZdcEmapGetCondParm(esc) {
//	var form = document.formCond;
//	if (!form) return '';
//	var condparm = '';
//	var chk = null;
//< ?php
//	if($D_COND && count($D_COND) > 0){
//		foreach($D_COND as $i => $condinf) {
//			if ($condinf['type'] == 'CB') {
//? >
//	chk = form.cond< ?php echo $i; ? >;
//	//if (chk && chk.checked) condparm += "&cond< ?php echo $i; ? >="+chk.value;		mod 2012/09/10 Y.Matsukawa
//	< ?php // add 2012/09/10 Y.Matsukawa [ ? >
//	if (chk && chk.checked) {
//		condparm += "&cond< ?php echo $i; ? >=";
//		if (esc) {
//			condparm += encodeURIComponent(chk.value);
//		} else {
//			condparm += chk.value;
//		}
//	}
//	< ?php // add 2012/09/10 Y.Matsukawa ] ? >
//< ?php
//			}
//		}
//	}
//? >
//	return condparm;
//}
//
//< ?php
// formCondから絞り込み条件を取得して、任意formのhiddenにセット		add 2012/02/21 Y.Matsukawa
//? >
//function ZdcEmapCondGetForm(formTo) {
//	var form = document.formCond;
//	if (!form) return;
//< ?php
//	if($D_COND && count($D_COND) > 0){
//		foreach($D_COND as $i => $condinf) {
//			if ($condinf['type'] == 'CB') {
//? >
//	chk = form.cond< ?php echo $i; ? >;
//	if (chk && chk.checked) {
//		condto = formTo.cond< ?php echo $i; ? >;
//		if (!condto) {
//			condto = document.createElement("input");
//			condto.setAttribute("type", "hidden");
//			condto.setAttribute("name", "cond< ?php echo $i; ? >");
//			formTo.appendChild(condto);
//		}
//		condto.value = chk.value;
//	}
//< ?php
//			}
//		}
//	}
//? >
//}
// del 2015/05/27 Y.Matsukawa ] ※common.jsへ移植 ?>
<?php
// formCondから絞り込み条件を取得して、任意formのhiddenにセット
// 画面を戻った際にcreateElementしたタグが残るため、チェックが外れている場合はタグを削除する
//		add 2015/09/25 H.Yasunaga
?>
function ZdcEmapCondGetForm2(formTo) {
	var form = document.formCond;
	if (!form) return;
<?php
	if($D_COND && count($D_COND) > 0){
		foreach($D_COND as $i => $condinf) {
			if ($condinf['type'] == 'CB') {
?>
	chk = form.cond<?php echo $i; ?>;
	if (chk && chk.checked) {
		condto = formTo.cond<?php echo $i; ?>;
		if (!condto) {
			condto = document.createElement("input");
			condto.setAttribute("type", "hidden");
			condto.setAttribute("name", "cond<?php echo $i; ?>");
			formTo.appendChild(condto);
		}
		condto.value = chk.value;
	}else if (chk && !chk.checked) {
		condto = formTo.cond<?php echo $i; ?>;
		if (condto) {
			formTo.removeChild(condto);
		}
	}
<?php
			}
		}
	}
?>
}


<?php
// 最寄り施設一覧：リスト初期化		add 2012/07/18 Y.Matsukawa
?>
function ZdcEmapSearchNpoiListClear() {
	if(ZdcEmapSearchNpoiListObj) ZdcEmapSearchNpoiListObj.innerHTML = "";
}

<?php
// formJnrからジャンルメニュー（複数）文字列を取得		add 2012/07/18 Y.Matsukawa
?>
function ZdcEmapGetJnrmn() {
	var form = document.formJnr;
	if (!form) return '';
	var jnrmn = '';
	var chk = null;
<?php
	if($D_POI_JNRMN && count($D_POI_JNRMN) > 0){
		foreach($D_POI_JNRMN as $i => $jnrinf) {
?>
	chk = form.jnr<?php echo $i; ?>;
	if (chk && chk.checked) {
		if (jnrmn != "") jnrmn += ",";
		jnrmn += chk.value;
	}
<?php
		}
	}
?>
	return jnrmn;
}

<?php
// ページ内移動（場所検索からTOPへ戻った時）		add 2012/12/03 Y.Matsukawa
?>
function ZdcEmapPgMvPlDone() {
	var pagePathname = location.pathname;
	var pageSearch = location.search;
	var qstr = pageSearch.split('&');
	var jflg = 0,pt;
	if( ! pagePathname.match(/search.htm/) ){ return; }
	for(var q=0; q<qstr.length; q++) {
		if( qstr[q] == '' ) continue;
		if( qstr[q].match(/pltype=/) ){ 
			pt = qstr[q];
			jflg = 1;
			break;
		}
	}
	if( jflg == 1 ){
		if( pt.match(/pltype=1/) ){
			location.hash = "<?php echo ($D_PL_GPS_RETURN_HASH ? $D_PL_GPS_RETURN_HASH : $D_PL_RETURN_HASH); ?>";
		} else {
			location.hash = "<?php echo $D_PL_RETURN_HASH; ?>";
		}
	}
}

<?php
// 拠点リスト検索（リストボックス）第一階層再読み込み		add 2015/02/10 Y.Matsukawa
?>
function ZdcEmapRefreshArea1List(areaptn) {
	<?php // 第二階層リストボックスを消す ?>
	var list2 = document.getElementById("ZdcEmapArea2List");
	if (list2) list2.style.display = "none";
	<?php // 第一階層リストボックスをクリア ?>
	var list1 = document.getElementById("ZdcEmapArea1List");
	if (!list1) return;
	var cnt = list1.options.length;
	for (var i = cnt - 1; 0 <= i; --i) {
		list1.removeChild(list1.options[i]);
	}
	<?php // 第一階層取得 ?>
	var opts = new ZdcSearchShopAreaOptions();
	opts.cid = "<?PHP echo $D_DATA_CID; ?>"
	opts.pos = 1;
	opts.maxCount = 1000;
	opts.areaptn = areaptn;
	if (ZdcEmapAreaSortLpad[areaptn] && ZdcEmapAreaSortLpad[areaptn][1] && ZdcEmapAreaSortLpad[areaptn][1]['len']) {
		opts.sortlpad = ZdcEmapAreaSortLpad[areaptn][1]['len']+","+ZdcEmapAreaSortLpad[areaptn][1]['char'];
	}
	opts.jkn = ZdcEmapCommGetCondJkn();
	opts.timeout = <?PHP echo $D_AJAX_TIMEOUT; ?>;
	ZdcEmapSearchShopArea.opts = opts;
	ZdcEmapSearchShopArea.search(opts, function (result) {
		if(result.status != 0 && result.status != 3 && result.status != 5 && result.status != 9) {
			alert("<?PHP echo $D_MSG_ERR_JS_RESULT; ?> ["+result.status+"]");
			return;
		}
		var list1 = document.getElementById("ZdcEmapArea1List");
		if (!list1) return;
		list1.style.display = 'block';
		var option = document.createElement('option');
		option.setAttribute('value', '');
		option.innerText = ZdcEmapShopADispnm[result.options.areaptn][1]+'を選択してください';
		list1.appendChild(option);
		var cnt = result.items.length;
		if (cnt > 0) {
			for (var i=0; i<cnt; i++) {
				var item = result.items[i];
				option = document.createElement('option');
				option.setAttribute('value', item.value);
				option.innerText = item.name+"("+item.count+")";
				list1.appendChild(option);
			}
		}
	});
}

<?php
// 拠点リスト検索（リストボックス）第一階層選択		add 2015/02/10 Y.Matsukawa
?>
function ZdcEmapChangeArea1List(areaptn) {
	var list1 = document.getElementById("ZdcEmapArea1List");
	var list2 = document.getElementById("ZdcEmapArea2List");
	if (!list1 || !list2) return;
	<?php // 第二階層リストボックスをクリア ?>
	var cnt = list2.options.length;
	for (var i = cnt - 1; 0 <= i; --i) {
		list2.removeChild(list2.options[i]);
	}
	<?php // 第一階層選択値に従って第二階層リストボックスを書き換える ?>
	var opt = null;
	var area1 = list1.options[list1.selectedIndex].value;
	if (area1 == "") {
		list2.style.display = "none";
	} else {
		<?php // 第二階層取得 ?>
		var opts = new ZdcSearchShopAreaOptions();
		opts.cid = "<?PHP echo $D_DATA_CID; ?>"
		opts.pos = 1;
		opts.maxCount = 1000;
		opts.areaptn = areaptn;
		opts.area1 = area1;
		if (ZdcEmapAreaSortLpad[areaptn] && ZdcEmapAreaSortLpad[areaptn][2] && ZdcEmapAreaSortLpad[areaptn][2]['len']) {
			opts.sortlpad = ZdcEmapAreaSortLpad[areaptn][2]['len']+","+ZdcEmapAreaSortLpad[areaptn][2]['char'];
		}
		opts.jkn = ZdcEmapCommGetCondJkn();
		opts.timeout = <?PHP echo $D_AJAX_TIMEOUT; ?>;
		ZdcEmapSearchShopArea.opts = opts;
		ZdcEmapSearchShopArea.search(opts, function (result) {
			if(result.status != 0 && result.status != 3 && result.status != 5 && result.status != 9) {
				alert("<?PHP echo $D_MSG_ERR_JS_RESULT; ?> ["+result.status+"]");
				return;
			}
			var list2 = document.getElementById("ZdcEmapArea2List");
			if (!list2) return;
			list2.style.display = 'block';
			var option = document.createElement('option');
			option.setAttribute('value', '');
			option.innerText = ZdcEmapShopADispnm[result.options.areaptn][2]+'を選択してください';
			list2.appendChild(option);
			var cnt = result.items.length;
			if (cnt > 0) {
				for (var i=0; i<cnt; i++) {
					var item = result.items[i];
					option = document.createElement('option');
					option.setAttribute('value', item.value);
					option.innerText = item.name+"("+item.count+")";
					list2.appendChild(option);
				}
			}
		});
	}
}
