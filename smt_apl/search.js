<?PHP
// ------------------------------------------------------------
// javasctipt ��˵��������˴ط�������
// 
// 2011/03/10 Y.Matsukawa	��������
// 2011/07/13 Y.Matsukawa	��ǽ�ɲáʥ롼��õ�����Ǵ�ء�
// 2011/07/05 Y.Nakajima	VM����ȼ��apache,phpVerUP�б�����
// 2011/08/08 Y.Matsukawa	��ǽ�ɲáʹʤ���߳�ĥ���������ꥢ�������إꥹ�ȸ�����
// 2011/08/12 K.Masuda		�����ե꡼��ɸ������оݥ�������
// 2011/09/02 Y.Matsukawa	Maplink�롼��õ���б�
// 2011/10/04 K.Masuda		����TOP���鸽���ϼ���(GPS)���Ѳ�ǽ�ˤ���
// 2012/01/11 Y.Matsukawa	Ǥ�եѥ�᡼��
// 2012/02/21 Y.Matsukawa	Ź�ް����˥����å��ܥå�������
// 2012/02/29 K.Masuda		�ե꡼��ɸ�����ʸ�������б�
// 2012/03/08 K.Masuda		�����ե꡼��ɸ�����ʸ�������б�
// 2012/04/24 Y.Matsukawa	���ߥꥹ�ȸ���
// 2012/05/14 Y.Matsukawa	��������ڡ�����
// 2012/05/23 Y.Matsukawa	formN.plfilter��hidden�ξ����б�
// 2012/07/05 H.Osamoto		����TOP�˽��ꡦ��̾�����߸��������ֲ�ǽ�ˤ���
// 2012/07/18 Y.Matsukawa	�Ǵ����
// 2012/09/10 Y.Matsukawa	���Զ�罤����Ǥ�եѥ�᡼���ˡ�&�פ�ޤ��������������Ѥ���ʤ���Ǥ�եѥ�᡼����Ⱦ�ѥ��ڡ������ꤹ��Ⱦä���
// 2012/12/03 Y.Matsukawa	��긡������TOP�����ݤ˥��󥫡���ư
// 2014/03/12 Y.Matsukawa	ϩ������
// 2014/09/11 Y.Matsukawa	�ڵ����¸�Զ��۰�������ե�å��夵��ʤ���礬����
// 2015/01/16 Y.Matsukawa	�̥ɥᥤ��ǤΥ����������б�
// 2015/02/02 Y.Matsukawa	jQuery���ɤ߹������
// 2015/02/10 Y.Matsukawa	Ź�ޥꥹ�ȸ���TOP
// 2015/05/27 Y.Matsukawa	cond�����ؿ���search.js����common.js�ذܿ����Ͽ޲��̤Ǥ�Ȥ������
// 2015/09/25 H.Yasunaga	ZdcEmapCondGetForm2�ɲ�
// 2016/01/19 F.Yokoi		���֥���å���5��Ź��̾�ˤ��ɲ�
// 2016/01/28 H.Yasunaga	711map�˥å��󥫥����ޥ���
// 2016/03/18 Y.Matsukawa	Ĺ��URL�б��ʥ�ե��顼�����ղä��ʤ���
// 2016/03/22 Y.Matsukawa	n_list.htm�ƤӽФ����Υ����������ѥ�᡼��������
// 2016/04/17 Y.Matsukawa	k.htm��cond����
// 2016/05/23 Y.Matsukawa	���ƥ�����κǴ�����ɽ���ʥ������б���
// 2017/04/21 N.Wada		�ե꡼��ɸ�����ϩ�����ɲ�
// ------------------------------------------------------------
require_once('/home/emap/src/smt/inc/define.inc');

//php�ե������euc
//js�ե������euc
//html�ե����뤫��js�ե�������ɤ߽Ф��Ȥ���euc
//html�Υ��󥳡��ɤ�utf8�ǻ���

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
<?php // add 2016/01/28 H.Yasunaga 711map �˥å��󥫥����ޥ��� ] ?>
var NISSEN_SearchNear2 = false;
<?php // add 2016/01/28 H.Yasunaga ] ?>
<?php
// �־������ץ���å�
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
// �ʤ����cond�ѥͥ�		add 2011/08/08 Y.Matsukawa
?>
function ZdcEmapCondPanelInit() {
<?php
	// add 2015/02/02 Y.Matsukawa [
	// jQuery��ߤ��Ƥ�����ϻȤ��ޤ���
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
// �ʤ����cond�������		add 2011/08/08 Y.Matsukawa
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
// �ʤ����cond�ܥ��󥯥�å�		add 2011/08/08 Y.Matsukawa
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
// TOP�����ϼ����ιʤ���߾�����		add 2012/05/23 Y.Matsukawa
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
// �����ե꡼��ɸ��������̽����
?>
function ZdcEmapSearchShopFWInit() {
	ZdcEmapSearchShopFwListObj = document.getElementById('ZdcEmapSearchShopFwList');
}
<?php
// �����ե꡼��ɸ������¹�
?>
<?php //function ZdcEmapSearchShopFW(keyword, filter, page) {	mod 2011/08/08 Y.Matsukawa ?>
<?php //function ZdcEmapSearchShopFW(keyword, filter, cond, page) {		mod 2011/08/12 K/Masuda ?>
<?php //function ZdcEmapSearchShopFW(keyword, filter, cond, page, col) {		mod 2012/01/11 Y.Matsukawa ?>
function ZdcEmapSearchShopFW(keyword, filter, cond, page, col, parms) {
	<?php //�ѥ�᡼�����Ȥ�Ω�� ?>
	//var prm = "keyword="+keyword;	// mod 2012/03/08 K.Masuda
	var prm = "keyword="+escape(keyword);
	if (filter) prm += "&filter="+filter;
	if (cond) prm += cond;		<?php // add 2011/08/08 Y.Matsukawa ?>
	if (parms) prm += "&"+parms;		<?php // add 2012/01/11 Y.Matsukawa ?>
	if (!page) page = 1;
	prm += "&pg="+page;
	<?php //���̽񤭴��� ?>
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
// �����ե꡼��ɸ������ꥹ�Ƚ����		add 2012/02/21 Y.Matsukawa
?>
function ZdcEmapSearchShopFWListClear() {
	if(ZdcEmapSearchShopFwListObj) ZdcEmapSearchShopFwListObj.innerHTML = "";
}
<?php
// �����ե꡼��ɡ����ϥܥå���
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
// �����ե꡼��ɡʥ�������ˡ����ϥܥå���
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
// �����ꥹ�ȸ��������̽����		add 2011/08/08 Y.Matsukawa
?>
function ZdcEmapSearchShopLInit(ltype) {
	ZdcEmapSearchShopLListObj = document.getElementById('ZdcEmapSearchShopLList');
}
<?php
// �����ꥹ�ȸ������¹�		add 2011/08/08 Y.Matsukawa
?>
function ZdcEmapSearchShopL(ltype, area1, area2, filter, cond, page) {
	<?php //�ѥ�᡼�����Ȥ�Ω�� ?>
	var prm = "&ltype="+ltype;
	if (area1) prm += "&area1="+area1;
	if (area2) prm += "&area2="+area2;
	if (filter) prm += "&filter="+filter;
	if (cond) prm += cond;
	if (!page) page = 1;
	prm += "&pg="+page;
	<?php //���̽񤭴��� ?>
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
// �����ꥹ�ȸ������ꥹ�Ƚ����		add 2012/02/21 Y.Matsukawa
?>
function ZdcEmapSearchShopLListClear() {
	if(ZdcEmapSearchShopLListObj) ZdcEmapSearchShopLListObj.innerHTML = "";
}

<?php
// �Ǵ��������������̽����
?>
function ZdcEmapNearShopInit() {
	ZdcEmapSearchNShopListObj = document.getElementById('ZdcEmapSearchNShopList');
}
<?php
// �Ǵ������������¹�
?>
<?php //function ZdcEmapSearchNearShop(lat, lon, datum, filter, parm, page) {		mod 2012/02/21 Y.Matsukawa ?>
<?php //function ZdcEmapSearchNearShop(lat, lon, datum, filter, parm, cond, page) {		mod 2016/05/23 Y.Matsukawa ?>
function ZdcEmapSearchNearShop(lat, lon, datum, filter, parm, cond, page, replaceId) {
	<?php //�ѥ�᡼�����Ȥ�Ω�� ?>
	var prm = "lat="+lat+"&lon="+lon;
	if (datum) prm += "&datum="+datum;
	if (filter) prm += "&filter="+filter;
	if (parm) prm += parm;
	if (cond) prm += cond;		<?php // add 2012/02/21 Y.Matsukawa ?>
	if (!page) page = 1;
	prm += "&pg="+page;
	<?php //���̽񤭴��� ?>
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

<?php // add 2016/01/28 H.Yasunaga 711map �˥å��󥫥����ޥ��� [ ?>
function ZdcEmapSearchNearShop2(lat, lon, datum, filter, parm, cond, page, latlon) {
	NISSEN_SearchNear2 = true;
	<?php //�ѥ�᡼�����Ȥ�Ω�� ?>
	var prm = "lat="+lat+"&lon="+lon;
	if (latlon) prm += "&latlon="+latlon;
	if (datum) prm += "&datum="+datum;
	if (filter) prm += "&filter="+filter;
	if (parm) prm += parm;
	if (cond) prm += cond;		<?php // add 2012/02/21 Y.Matsukawa ?>
	if (!page) page = 1;
	prm += "&pg="+page;
	<?php //���̽񤭴��� ?>
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
	// mod 2016/01/28 H.Yasunaga 711map�˥å��󥫥����ޥ��� [
	//ZdcEmapSearchRequest(url, ZdcEmapSearchNShopListObj, false, 2);
	ZdcEmapSearchRequest(url, ZdcEmapSearchNShopListObj, true, 2);
	// mod 2016/01/28 H.Yasunaga 711map�˥å��󥫥����ޥ��� ]
}
<?php // add 2016/01/28 H.Yasunaga 711map �˥å��󥫥����ޥ��� ] ?>


<?php
// �Ǵ������������ꥹ�Ƚ����		add 2012/02/21 Y.Matsukawa
?>
function ZdcEmapSearchNearShopListClear() {
	if(ZdcEmapSearchNShopListObj) ZdcEmapSearchNShopListObj.innerHTML = "";
}

<?php
// add 2011/07/13 Y.Matsukawa 
// �Ǵ��ذ��������̽���� 
?>
function ZdcEmapNearEkiInit() {
	ZdcEmapSearchNekiListObj = document.getElementById('ZdcEmapSearchNekiList');
}
<?php
// �Ǵ��ذ������¹�
?>
<?php // function ZdcEmapSearchNearEki(lat, lon, datum, kid, page) {	mod 2012/01/11 Y.Matsukawa ?>
function ZdcEmapSearchNearEki(lat, lon, datum, kid, page, parms) {
	<?php //�ѥ�᡼�����Ȥ�Ω�� ?>
	var prm = "lat="+lat+"&lon="+lon;
	if (datum) prm += "&datum="+datum;
	if (kid) prm += "&kid="+kid;
	if (parms) prm += "&"+parms;		<?php // add 2012/01/11 Y.Matsukawa ?>
	if (!page) page = 1;
	prm += "&pg="+page;
	<?php //���̽񤭴��� ?>
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
// �Ǵ��ذ�����Maplink����ˡ��¹�		add 2011/09/02 Y.Matsukawa
?>
<?php // function ZdcEmapSearchNearEkiMaplink(maplinkprm, page) {	mod 2012/01/11 Y.Matsukawa ?>
function ZdcEmapSearchNearEkiMaplink(maplinkprm, page, parms) {
	<?php //�ѥ�᡼�����Ȥ�Ω�� ?>
	var prm = "svtype=N";
	prm += "&"+maplinkprm;
	if (parms) prm += "&"+parms;		<?php // add 2012/01/11 Y.Matsukawa ?>
	if (!page) page = 1;
	prm += "&pg="+page;
	<?php //���̽񤭴��� ?>
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
// �Ǵ����߰��������̽���� 
?>
function ZdcEmapNearPoiInit() {
	ZdcEmapSearchNpoiListObj = document.getElementById('ZdcEmapSearchNpoiList');
}
<?php
// add 2012/07/18 Y.Matsukawa
// �Ǵ����߰������¹�
?>
function ZdcEmapSearchNearPoi(lat, lon, datum, jnrmn, kid, page, parms) {
	<?php //�ѥ�᡼�����Ȥ�Ω�� ?>
	var prm = "lat="+lat+"&lon="+lon;
	if (datum) prm += "&datum="+datum;
	if (jnrmn) prm += "&jnrmn="+jnrmn;
	if (kid) prm += "&kid="+kid;
	if (parms) prm += "&"+parms;
	if (!page) page = 1;
	prm += "&pg="+page;
	<?php //���̽񤭴��� ?>
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
// �Ǵ����߰�����Maplink����ˡ��¹�
?>
function ZdcEmapSearchNearPoiMaplink(maplinkprm, jnrmn, page, parms) {
	<?php //�ѥ�᡼�����Ȥ�Ω�� ?>
	var prm = "svtype=N";
	if (jnrmn) prm += "&jnrmn="+jnrmn;
	prm += "&"+maplinkprm;
	if (parms) prm += "&"+parms;
	if (!page) page = 1;
	prm += "&pg="+page;
	<?php //���̽񤭴��� ?>
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
// Ź��������������̽����		add 2012/05/14 Y.Matsukawa
?>
function ZdcEmapKListInit() {
	ZdcEmapSearchKListObj = document.getElementById('ZdcEmapSearchKList');
}
<?php
// Ź������������¹�		add 2012/05/14 Y.Matsukawa
?>
<?php //function ZdcEmapSearchKList(col, sortkeys, parm, page) {		mod 2016/04/17 Y.Matsukawa ?>
function ZdcEmapSearchKList(col, sortkeys, parm, cond, page) {
	<?php //�ѥ�᡼�����Ȥ�Ω�� ?>
	var prm = "col="+col+"&sortkeys="+sortkeys;
	if (parm) prm += parm;
	if (cond) prm += cond;		<?php // add 2016/04/17 Y.Matsukawa ?>
	if (!page) page = 1;
	prm += "&pg="+page;
	<?php //���̽񤭴��� ?>
	var url = "<?PHP echo $D_DIR_BASE_L; ?>k_list.htm?"
			+ prm 
			<?php if(isset($https_req) && $https_req){ ?>+"&https_req=1"<?php } ?>
	;
	<?php //ZdcEmapSearchRequest(url, ZdcEmapSearchKListObj);		mod 2012/09/10 Y.Matsukawa ?>
	ZdcEmapSearchRequest(url, ZdcEmapSearchKListObj, false, 2);
}

<?php
// ����ꥹ�ȸ��������̽����
?>
function ZdcEmapSearchAddrLInit() {
	ZdcEmapSearchAddrLListObj = document.getElementById('ZdcEmapSearchAddrLList');
}
<?php 
// ����ꥹ�ȸ������¹�
?>
function ZdcEmapSearchAddrL(area, adcd, parm, page, replace) {
	<?php //�ѥ�᡼�����Ȥ�Ω�� ?>
	var prm = "";
	if (area) prm += "area="+area;
	if (adcd) prm += "adcd="+adcd;
	if (parm) prm += parm;
	if (!page) page = 1;
	prm += "&pg="+page;
	<?php //���̽񤭴��� ?>
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
// �إꥹ�ȸ��������̽����		add 2011/08/08 Y.Matsukawa
?>
function ZdcEmapSearchEkiLInit() {
	ZdcEmapSearchEkiLListObj = document.getElementById('ZdcEmapSearchEkiLList');
}
<?php
// �إꥹ�ȸ������¹�		add 2011/08/08 Y.Matsukawa
?>
function ZdcEmapSearchEkiL(area, tod, kn, parm, page, replace) {
	<?php //�ѥ�᡼�����Ȥ�Ω�� ?>
	var prm = "";
	if (area != "") prm += "&area="+area;
	if (tod != "") prm += "&tod="+tod;
	if (kn != "") prm += "&kn="+kn;
	if (parm) prm += parm;
	if (!page) page = 1;
	prm += "&pg="+page;
	<?php //���̽񤭴��� ?>
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
// ϩ�����������̽����		add 2014/03/12 Y.Matsukawa
?>
function ZdcEmapSearchRosenLInit() {
	ZdcEmapSearchRosenLListObj = document.getElementById('ZdcEmapSearchRosenLList');
}
<?php 
// ϩ���������¹�		add 2014/03/12 Y.Matsukawa
?>
function ZdcEmapSearchRosenL(area, tod, line, parm, page, replace) {
	<?php //�ѥ�᡼�����Ȥ�Ω�� ?>
	var prm = "";
	if (area) prm += "&area="+area;
	if (tod) prm += "&tod="+tod;
	if (line) prm += "&line="+line;
	if (parm) prm += parm;
	if (!page) page = 1;
	prm += "&pg="+page;
	<?php //���̽񤭴��� ?>
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
// ϩ��FW���������̽����		add 2017/04/21 N.Wada
?>
function ZdcEmapSearchFWRosenInit() {
	ZdcEmapSearchFWRosenListObj = document.getElementById('ZdcEmapSearchFWRosenList');
}
<?php 
// ϩ��FW�������¹�		add 2017/04/21 N.Wada
?>
function ZdcEmapSearchFWRosen(keyword, parm, page, replace) {
	<?php //�ѥ�᡼�����Ȥ�Ω�� ?>
	var prm = "";
	if (keyword) prm += "&keyword="+keyword;
	if (parm) prm += parm;
	if (!page) page = 1;
	prm += "&pg="+page;
	<?php //���̽񤭴��� ?>
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
// ���ߥꥹ�ȸ��������̽����		add 2012/04/24 Y.Matsukawa
?>
function ZdcEmapSearchPoiLInit() {
	ZdcEmapSearchPoiLListObj = document.getElementById('ZdcEmapSearchPoiLList');
}
<?php
// ���ߥꥹ�ȸ������¹�		add 2012/04/24 Y.Matsukawa
?>
function ZdcEmapSearchPoiL(jnrmn, jnr, area, tod, parm, page, replace) {
	<?php //�ѥ�᡼�����Ȥ�Ω�� ?>
	var prm = "";
	if (jnrmn != "") prm += "&jnrmn="+jnrmn;
	if (jnr != "") prm += "&jnr="+jnr;
	if (area != "") prm += "&area="+area;
	if (tod != "") prm += "&tod="+tod;
	if (parm) prm += parm;
	if (!page) page = 1;
	//prm += "&pg="+page;
	prm = "pg="+page+prm;
	<?php //���̽񤭴��� ?>
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
// �ե꡼��ɸ��������̽����
?>
var ZdcEmapSearchFWTarget = null;
function ZdcEmapSearchFWInit(target) {
	if (!target) return;
	ZdcEmapSearchFWTarget = target;
}
<?php
// �ե꡼��ɸ������¹�
?>
function ZdcEmapSearchFW(target, keyword, parm, page) {
	var targetArr = new Array();
	if (target == "all") {
		targetArr = ZdcEmapSearchFWTarget.split("|");
	} else {
		targetArr[0] = target;
	}
	<?php //�ѥ�᡼�����Ȥ�Ω�� ?>
	<?php //var prm = "keyword="+keyword;	mod 2012/02/29 K.Masuda ?>
	var prm = "keyword="+escape(keyword);
	if (!page) page = 1;
	if (parm) prm += parm;
	prm += "&pg="+page;
	<?php //���̽񤭴��� ?>
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
// �ե꡼��ɸ��������֥���å�
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
// �ե꡼��ɡ����ϥܥå���
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
// ���ꡦ��̾������̾�ե꡼��ɡ����ϥܥå���		add 2012/07/05 H.osamoto
?>
function ZdcEmapMultiFWIn(kwObj, type) {
	switch (type){
		<?php // ���� ?>
		case 1:
			if (kwObj.value == "<?php echo $D_ADDR_FW_INIT; ?>") {
				kwObj.value = "";
			}
			kwObj.className = "freewordBox freewordBox-ent";
			break;
		<?php // ��̾ ?>
		case 2:
			if (kwObj.value == "<?php echo $D_ST_FW_INIT; ?>") {
				kwObj.value = "";
			}
			kwObj.className = "freewordBox freewordBox-ent";
			break;
		<?php // ���� ?>
		case 3:
			if (kwObj.value == "<?php echo $D_POI_FW_INIT; ?>") {
				kwObj.value = "";
			}
			kwObj.className = "freewordBox freewordBox-ent";
			break;
		<?php // add 2016/01/19 F.Yokoi [ ?>
		<?php // Ź��̾ ?>
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
		<?php // ���� ?>
		case 1:
			if (kwObj.value == "") {
				kwObj.value = "<?php echo $D_ADDR_FW_INIT; ?>";
			}
			if (kwObj.value == "<?php echo $D_ADDR_FW_INIT; ?>") {
				kwObj.className = "freewordBox";
			}
			break;
		<?php // ��̾ ?>
		case 2:
			if (kwObj.value == "") {
				kwObj.value = "<?php echo $D_ST_FW_INIT; ?>";
			}
			if (kwObj.value == "<?php echo $D_ST_FW_INIT; ?>") {
				kwObj.className = "freewordBox";
			}
			break;
		<?php // ���� ?>
		case 3:
			if (kwObj.value == "") {
				kwObj.value = "<?php echo $D_POI_FW_INIT; ?>";
			}
			if (kwObj.value == "<?php echo $D_POI_FW_INIT; ?>") {
				kwObj.className = "freewordBox";
			}
			break;
		<?php // add 2016/01/19 F.Yokoi [ ?>
		<?php // Ź��̾ ?>
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
		<?php // ���� ?>
		case 1:
			if (formObj.keyword.value == "<?php echo $D_ADDR_FW_INIT; ?>") {
				formObj.keyword.value = "";
			}
			break;
		<?php // ��̾ ?>
		case 2:
			if (formObj.keyword.value == "<?php echo $D_ST_FW_INIT; ?>") {
				formObj.keyword.value = "";
			}
			break;
		<?php // ���� ?>
		case 3:
			if (formObj.keyword.value == "<?php echo $D_POI_FW_INIT; ?>") {
				formObj.keyword.value = "";
			}
			break;
		<?php // add 2016/01/19 F.Yokoi [ ?>
		<?php // Ź��̾ ?>
		case 5:
			if (formObj.keyword.value == "<?php echo $D_SHOP_FW_INIT; ?>") {
				formObj.keyword.value = "";
			}
			break;
		<?php // add 2016/01/19 F.Yokoi ] ?>
	}
}

<?php // �������ե�å���		add 2014/09/11 Y.Matsukawa ?>
function ZdcEmapRefList() {
	if (ZdcEmapRefListObj) {
		ZdcEmapRefListObj.innerHTML = ZdcEmapRefListObj.innerHTML + ' ';
		ZdcEmapRefListObj.offsetLeft;
		ZdcEmapRefListObj = null;
		<?php
		// �Ǵ���Ͽޤ˰�����ɽ�����Ƥ����硢���٥�ȺƳ�		add 2016/04/14 Y.Matsukawa
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
// �����ꥯ�����Ƚ���
?>
<?php //function ZdcEmapSearchRequest(url, listObj, replace) {		mod 2012/09/10 Y.Matsukawa ?>
<?php //function ZdcEmapSearchRequest(url, listObj, replace, typ) {		mod 2016/03/18 Y.Matsukawa ?>
<?php //function ZdcEmapSearchRequest(url, listObj, replace, typ, noref) {		mod 2016/05/23 Y.Matsukawa ?>
function ZdcEmapSearchRequest(url, listObj, replace, typ, noref, replaceId) {
	if(typ == undefined) typ = 1;		<?php // add 2012/09/10 Y.Matsukawa ?>
	<?php // ���ɤ߹��ߥ�󥯤���ɤ߹�����פ��ѹ� ?>
	var ZdcEmapSearchNextObj = document.getElementById("ZdcEmapSearchNext");
	if (!ZdcEmapSearchNextObj && replaceId) ZdcEmapSearchNextObj = document.getElementById(replaceId);		<?php // add 2016/05/23 Y.Matsukawa ?>
	if (ZdcEmapSearchNextObj)
		ZdcEmapSearchNextObj.innerHTML = "<p><?php echo $D_WAIT_MSG; ?></p>";
	ZdcEmapHttpRequestHtml(url, function(html, status){
		if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> search["+status+"]";
		<?php // ���ɤ߹��ߥ�󥯤��� ?>
		var ZdcEmapSearchNextObj = document.getElementById("ZdcEmapSearchNext");
		if (listObj && ZdcEmapSearchNextObj)
			listObj.removeChild(ZdcEmapSearchNextObj);
		<?php // ������̤��ɲ� ?>
		if (replace) {
			listObj.innerHTML = html;
		} else {
			listObj.innerHTML += html;
		}
		listObj.style.visibility = "visible";
		<?php // add 2016/01/28 H.Yasunaga �˥å��󥫥����ޥ��� [ ?>
		if (NISSEN_SearchNear2 == true) {
			NISSEN_SearchNear2 = false;
			var n_list_count = document.getElementById("n_list_hit_count");
			var tab_sote_count = document.getElementById("tab_store_count");
			tab_store_count.innerHTML = "(" + n_list_count.value + "��)";
		}
		<?php // add 2016/01/28 H.Yasunaga ] ?>

		<?php // add 2014/09/11 Y.Matsukawa [ ?>
		<?php // ��������ǰ�������ե�å��夵��ʤ��Զ����б� ?>
		ZdcEmapRefListObj = listObj;
		setTimeout(ZdcEmapRefList, 100);
		<?php // add 2014/09/11 Y.Matsukawa ] ?>
	<?php //});		mod 2012/09/10 Y.Matsukawa ?>
	<?php //}, false, typ);		mod 2016/03/18 Y.Matsukawa ?>
	}, false, typ, noref);
}
<?php
// �����ꥯ�����Ƚ�����ʣ����
?>
<?php //function ZdcEmapMultiSearchRequest(url, target, listObj, replace) {		mod 2012/09/10 Y.Matsukawa ?>
function ZdcEmapMultiSearchRequest(url, target, listObj, replace, typ) {
	if(typ == undefined) typ = 1;		<?php // add 2012/09/10 Y.Matsukawa ?>
	<?php // ���ɤ߹��ߥ�󥯤���ɤ߹�����פ��ѹ� ?>
	var ZdcEmapSearchNextObj = document.getElementById("ZdcEmapSearchNext"+target);
	if (ZdcEmapSearchNextObj)
		ZdcEmapSearchNextObj.innerHTML = "<p><?php echo $D_WAIT_MSG; ?></p>";
	ZdcEmapHttpRequestHtml(url, function(html, status){
		if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> search["+status+"]";
		<?php // ���ɤ߹��ߥ�󥯤��� ?>
		var ZdcEmapSearchNextObj = document.getElementById("ZdcEmapSearchNext"+target);
		if (listObj && ZdcEmapSearchNextObj)
			listObj.removeChild(ZdcEmapSearchNextObj);
		<?php // ������̤��ɲ� ?>
		if (replace) {
			listObj.innerHTML = html;
		} else {
			listObj.innerHTML += html;
		}
		listObj.style.visibility = "visible";
		<?php // add 2014/09/11 Y.Matsukawa [ ?>
		<?php // ��������ǰ�������ե�å��夵��ʤ��Զ����б� ?>
		ZdcEmapRefListObj = listObj;
		setTimeout(ZdcEmapRefList, 100);
		<?php // add 2014/09/11 Y.Matsukawa ] ?>
	<?php //});		mod 2012/09/10 Y.Matsukawa ?>
	}, false, typ);
}

function ZdcEmapLocProgress() {
	var c=document.getElementById("ZdcEmapLocCmmt");
	if(c){
		c.innerHTML = "�����Ϥ������...";
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

<?php // del 2015/05/27 Y.Matsukawa [ ��common.js�ذܿ�
//< ?php
// formCond����ʤ���߾��ʥѥ�᡼��ʸ����ˤ����		add 2012/02/21 Y.Matsukawa
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
// formCond����ʤ���߾���������ơ�Ǥ��form��hidden�˥��å�		add 2012/02/21 Y.Matsukawa
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
// del 2015/05/27 Y.Matsukawa ] ��common.js�ذܿ� ?>
<?php
// formCond����ʤ���߾���������ơ�Ǥ��form��hidden�˥��å�
// ���̤���ä��ݤ�createElement�����������Ĥ뤿�ᡢ�����å�������Ƥ�����ϥ�����������
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
// �Ǵ����߰������ꥹ�Ƚ����		add 2012/07/18 Y.Matsukawa
?>
function ZdcEmapSearchNpoiListClear() {
	if(ZdcEmapSearchNpoiListObj) ZdcEmapSearchNpoiListObj.innerHTML = "";
}

<?php
// formJnr���饸�����˥塼��ʣ����ʸ��������		add 2012/07/18 Y.Matsukawa
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
// �ڡ������ư�ʾ�긡������TOP����ä�����		add 2012/12/03 Y.Matsukawa
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
// �����ꥹ�ȸ����ʥꥹ�ȥܥå�������쳬�غ��ɤ߹���		add 2015/02/10 Y.Matsukawa
?>
function ZdcEmapRefreshArea1List(areaptn) {
	<?php // �����إꥹ�ȥܥå�����ä� ?>
	var list2 = document.getElementById("ZdcEmapArea2List");
	if (list2) list2.style.display = "none";
	<?php // ��쳬�إꥹ�ȥܥå����򥯥ꥢ ?>
	var list1 = document.getElementById("ZdcEmapArea1List");
	if (!list1) return;
	var cnt = list1.options.length;
	for (var i = cnt - 1; 0 <= i; --i) {
		list1.removeChild(list1.options[i]);
	}
	<?php // ��쳬�ؼ��� ?>
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
		option.innerText = ZdcEmapShopADispnm[result.options.areaptn][1]+'�����򤷤Ƥ�������';
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
// �����ꥹ�ȸ����ʥꥹ�ȥܥå�������쳬������		add 2015/02/10 Y.Matsukawa
?>
function ZdcEmapChangeArea1List(areaptn) {
	var list1 = document.getElementById("ZdcEmapArea1List");
	var list2 = document.getElementById("ZdcEmapArea2List");
	if (!list1 || !list2) return;
	<?php // �����إꥹ�ȥܥå����򥯥ꥢ ?>
	var cnt = list2.options.length;
	for (var i = cnt - 1; 0 <= i; --i) {
		list2.removeChild(list2.options[i]);
	}
	<?php // ��쳬�������ͤ˽��ä������إꥹ�ȥܥå�����񤭴����� ?>
	var opt = null;
	var area1 = list1.options[list1.selectedIndex].value;
	if (area1 == "") {
		list2.style.display = "none";
	} else {
		<?php // �����ؼ��� ?>
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
			option.innerText = ZdcEmapShopADispnm[result.options.areaptn][2]+'�����򤷤Ƥ�������';
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
