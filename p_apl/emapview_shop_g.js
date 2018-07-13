<?PHP
// ------------------------------------------------------------
// Google Maps�� �Ͽ�����ʼ�˵��������˴ط������Ρ�
// 
// ��ȯ����
// 2013/10/02 Y.Matsukawa	��������
// 2015/02/16 F.Yokoi		input type=text���ͤ�ʤ���߾������ꤹ��������ɲ�
// 2015/06/03 N.Wada		Ź�޾ܺ٤�ajax��ɽ�����ɲ�
// 							������̤�ajax��ɽ�����ɲ�
// 							������ˣ����ܤ�Ź�ޤΥե�������ɽ��
// 							�ʤ���ߤ���������ɲá�emapview_shop.js����ܿ���
// 2015/10/20 N.Wada		MarkerClusterer���ɲá���markerclusterer.js��
// 							�᤭�Ф���InfoBox���֤���������硢�Ƹ������˿᤭�Ф�������Ū�˺������
// 							�����������������ɽ���Ȥ�����᤹�����������ꥹ�ȤΥڡ����ڤ��ؤ����ɲ�
// 							���������Υڡ����ڤ��ؤ��ɲ�
// 							Ź�޸������ϤΥ��٥�Ȥ��ڤ��ؤ�����硢���ɽ�����ˣ��󸡺����ʤ��褦�������ɲ�
// 							Ź�޸�����̸��Ǥ�դδؿ���¹�
// 2015/11/13 N.Wada		���饹������������᤭�Ф�ɽ��������˥������ȥ�å�����ɽ���ɲ�
// 2015/11/26 N.Wada		��󸡺����˽��ɽ���̼ܤ��Ͽ��ϰϤǤθ�����������ե饰
// 2016/03/01 N.Wada		����������Ͽ�ؿ���Ǥϥ���������Ͽޤˤ�ɽ�����������ؿ��ƤӽФ�¦��ɽ��������
// 2016/03/02 N.Wada		�Ǵ�����������̤ε��������ޤ��ϰϤ˰�ư�ν������Ŭ��
// 2016/03/03 N.Wada		�������֤˥ޡ�����ɽ��
// 2016/03/04 N.Wada		�ܺ�ɽ���˥ե���������������ɽ�����ɲ�
// 2016/03/05 N.Wada		�Ǵ󸡺���̤�0��ξ��Ƹ����Ǽ������������굡ǽ�ɲ�
// 2016/03/06 N.Wada		Ź�޸����Ǿ������ɲ�
// 2016/03/07 N.Wada		��󸡺����˺Ǵ��Ź�ް����˽�󸡺��ե饰���Ϥ�
// 2016/03/08 N.Wada		�Ǵ��ظ����ɲ�
// 2016/03/17 N.Wada		���������ɲ�
// 2016/03/22 N.Wada		���������������������������֤�ؤ��ѥ������ɲ�
// 2016/04/27 N.Wada		�ե���������ܺٲ��̤����ܤ���ȡ��ѥ󤯤����󤬷�����Զ�罤��
// 2016/05/13 N.Wada		���������ʣ����Cookie�Υ�����Ǥ�դ�ʸ������ɲ�
// 2016/06/18 N.Wada		�ܺٲ��̤ǥꥹ����ɽ���⡼�ɻ��ϺǴ�������ɽ�����ʤ�
// 2016/06/22 Y.Matsukawa	�̥ɥᥤ��ǤΥ����������б�
// 2016/06/23 N.Wada		�ե���������ܺٲ��̤����ܤ���ȡ��ʤ���߾�郎�����Ѥ���ʤ��Զ�罤��
// 2016/08/15 Y.Matsukawa	¬�Ϸ��Ѵ������١����ꥨ�ꥢ������̼ܤΤߡ�
// 2016/08/16 Y.Matsukawa	����¬�Ϸ��ݻ�
// 2017/02/16 N.Wada		�Ǵ�إꥹ��ɽ��
// 2017/02/27 N.Wada		ʣ��롼�ȸ����ɲ�
// 2017/06/09 N.Wada		���ɽ���̼ܤ�����Ǥ���褦�ѹ�
// 2017/06/22 N.Wada		�Ǵ������ν���̼ܤȺƸ����̼ܤˤ�����ʳ�������ǽ�ɲ�
// 2017/07/04 Y.Uesugi		�޾ܺ٥ڡ����ˤ����ơ����򤷤����������������̤�ɽ������褦����
// 2017/08/09 T.Luu         �濴��������򥯥�å�����ȿ᤭�Ф���ɽ���Ȥ����������ɲ�
// 2018/06/26 Y.Matsukawa	�Х��롼�ȡ������ॢ�����к�
// 2018/06/29 Dam Phan		Apply new design #18619
// 2018/06/21 Chien Nguyen		Change filter of nearest shop map #18858
// 2018/07/03 N.Wada		ʣ��롼�ȸ�����ϲ����������¤���
// ------------------------------------------------------------
require_once('/home/emap/src/p/inc/define.inc');
require_once('/home/emap/src/p/inc/act_get_parm.inc');
?>

var ZdcEmapAjaxSelectShop = 0;	<?php // 2015/06/03 N.Wada ?>
<?php
//-------------------------------------------------------------
// cond���
//-------------------------------------------------------------
?>
var ZdcEmapCondType = new Array();
var ZdcEmapCondVal  = new Array();
var ZdcEmapCondOpts = new Array();
<?php
if (is_array($D_COND) && count($D_COND)) {
	foreach ($D_COND as $i => $cnd) {
?>
ZdcEmapCondType[<?php echo $i; ?>] = "<?php echo $cnd['type']; ?>";
<?php
		if ($cnd['type'] == 'CB') {
?>
ZdcEmapCondVal[<?php echo $i; ?>] = "<?php echo $cnd['val']; ?>";
<?php
		} else if ($cnd['type'] == 'SL') {
?>
ZdcEmapCondOpts[<?php echo $i; ?>] = new Array();
<?php
	foreach ($cnd['opts'] as $n => $op) {
?>
		ZdcEmapCondOpts["<?php echo $i; ?>"]["<?php echo $n; ?>"] = "<?php echo $op[0]; ?>";
<?php
			}
// add 20150216 F.Yokoi [
		} else if ($cnd['type'] == 'TXT') {
?>
ZdcEmapCondVal[<?php echo $i; ?>] = "<?php echo $cnd['val']; ?>";
<?php
// add 20140216 F.Yokoi ]
		}
	}
}
?>

<?php
//-------------------------------------------------------------
// cond���롼�ԥ����
// ZdcEmapCondGroup[cond�ֹ�] = ���롼���ֹ�(1��n);
//-------------------------------------------------------------
?>
var ZdcEmapCondGroup = new Array();
var ZdcEmapCondAndOr = new Array();
var ZdcEmapCondAppend = new Array();
<?php
if (is_array($D_COND_GRP) && count($D_COND_GRP)) {
	foreach ($D_COND_GRP as $g => $grp) {
?>
ZdcEmapCondAndOr[<?php echo $g ?>] = '<?php echo $D_COND_ANDOR[$g] ?>';
<?php
		foreach ($grp as $cnd) {
?>
ZdcEmapCondGroup[<?php echo $cnd ?>] = <?php echo $g ?>;
<?php
		}
	}
}
?>

//-------------------------------------------------------------
// ���������ط�
//-------------------------------------------------------------
var ZdcEmapNearShop = new ZdcNearShop();
var ZdcEmapSearchPoint = null;//�����������֤��ݻ�
var ZdcEmapSearchScale = null;//���������̼ܤ��ݻ�
var ZdcEmapSearchFirst = null;//���ַ����κǽ�θ������ݤ�
var ZdcEmapSearchFirstCstm = null;	<?php //�ǽ�θ������ݤ��������ޥ����ѥե饰	// add 2016/03/05 N.Wada ?>
var ZdcEmapSearchCenter = null;	<?php // add 2016/03/03 N.Wada ?>
var ZdcEmapBoundsChanged = null;
var ZdcEmapSearchShopCancel = null;	<?php // 2015/06/03 N.Wada ?>
var ZdcEmapResultAfterFunc = null;	<?php // 2015/06/03 N.Wada ?>
var ZdcEmapSearchFirstInitLvFlg = null;	<?php // add 2015/11/26 N.Wada ?>
var ZdcEmapCenterIconClicked = null; // 2016/08/09 T.Luu
// ��������
function ZdcEmapSearchSet(lat,lon,notmove) {
	// �ޥåװ�ư
	ZdcEmapSearchEventStop();
	<?php // mod 2016/03/03 N.Wada
	//var latlon = ZdcEmapTky2Wgs(lat, lon);
	//var center = new google.maps.LatLng(latlon.lat, latlon.lon);
	//if (!notmove) ZdcEmapMapObj.setCenter(center);
	?>
	ZdcEmapSearchCenter = new ZDC.LatLon(Number(lat), Number(lon));
	var latlon_wgs = ZdcEmapTky2Wgs(lat, lon);
	if (!notmove) ZdcEmapMapObj.setCenter(new google.maps.LatLng(latlon_wgs.lat, latlon_wgs.lon));
	if(<?PHP echo $D_INIT_LVL_CSTM; ?> > 0) ZdcEmapMapObj.setZoom(<?PHP echo $D_INIT_LVL_CSTM; ?>);		<?php // add 2017/06/09 N.Wada ?>
	<?php
	// �������֤˥ޡ�����ɽ��		add 2016/03/03 N.Wada
	if ($D_SEARCH_MAP_ICON) {
	?>
	ZdcEmapSearchMapIcon(ZdcEmapSearchCenter);
	<?php
	}
	?>
	// ��������
	ZdcEmapSearchFirst = 1;
	ZdcEmapSearchPoint = null;//ɬ���Ƹ��������뤿��
	//ZdcEmapSearchShopStart();
	ZdcEmapBoundsChanged = google.maps.event.addListener (ZdcEmapMapObj, 'bounds_changed', ZdcEmapSearchShopStart);

}
//��������
function ZdcEmapSearchShopClick() {
	if(ZdcEmapButtonNG()) return;
	ZdcEmapSearchPoint = null;//ɬ���Ƹ��������뤿��
	ZdcEmapSearchShop();
}

function ZdcEmapSearchShopStart() {
	google.maps.event.removeListener(ZdcEmapBoundsChanged);
	ZdcEmapSearchClickFlg = 1;
	<?php // add add 2015/11/26 N.Wada [ ?>
	if(ZdcEmapSearchFirstInitLvFlg == 1) {
		ZdcEmapSearchFirstInitLvFlg = 0;
		ZdcEmapSearchFirst = 0;
		ZdcEmapSearchClickFlg = 0;
	}
	<?php // add add 2015/11/26 N.Wada ] ?>
	ZdcEmapSearchPoint = null;//ɬ���Ƹ��������뤿��
	ZdcEmapSearchEventStop();
	//���̤��ڤ��ؤ���
	if(ZdcEmapCondObj.mode != "cond") {
		//ZdcEmapSearchShopClose();//�����ʳ��Υꥹ�Ȥ�ä�
		var url = "<?PHP echo $D_DIR_BASE_L; ?>cond.htm?";
		<?php if(isset($condprm) && $condprm != '') { ?>url += "&<?php echo $condprm; ?>";<?php } ?>
		url += "&<?php echo $P_FREEPARAMS; ?>";
		<?php if($adcd!=""){ ?>url += "&adcd=<?php echo $adcd; ?>";<?php } ?>
		<?php if($area!=""){ ?>url += "&area=<?php echo $area; ?>";<?php } ?>
		<?php if($https_req){ ?>url += "&https_req=1";<?php } ?>
		ZdcEmapHttpRequestHtml(url, function(html,status){
			if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> cond["+status+"]";
			ZdcEmapCondObj.innerHTML = html;
			ZdcEmapSearchShop();//�������ɽ������Ƥ��鸡������
		});
		ZdcEmapCondObj.mode = "cond";
		ZdcEmapCondObj.style.visibility = "visible";
	} else {
		ZdcEmapSearchShop();
	}
}

// �����ᥤ�����
function ZdcEmapSearchShop() {
	<?php // add 2015/10/20 N.Wada ?>
	<?php if (isset($D_GOOGLEMAPS_SEARCH_EVENT_IDLE) && $D_GOOGLEMAPS_SEARCH_EVENT_IDLE) { ?>
	if(ZdcEmapSearchShopCancel) {
		ZdcEmapSearchShopCancel = 0;
		return;
	}
	<?php } ?>
	ZdcEmapReadOn();
	//���֡��ϰϼ���
	//	var latlon = ZdcEmapMapObj.getLatLon();
	//	var p = ZdcEmapMapObj.getLatLon();
	//	var box = ZdcEmapMapObj.getLatLonBox();
	//	var boxmin = box.getMin();
	//	var boxmax = box.getMax();
	var p;
	p = ZdcEmapMapObj.getCenter();
	var center = ZdcEmapWgs2Tky(p.lat(), p.lng());
	p = ZdcEmapMapObj.getBounds().getSouthWest();
	var boxmin = ZdcEmapWgs2Tky(p.lat(), p.lng());
	p = ZdcEmapMapObj.getBounds().getNorthEast();
	var boxmax = ZdcEmapWgs2Tky(p.lat(), p.lng());
	
	if(ZdcEmapSearchPoint != null && <?PHP echo $D_SHOP_SEARCHPIX; ?> == -1) {
		//��ư�Ƹ������ʤ�
		ZdcEmapReadOff();
		return;
	}
	//��ư�������٥�����
	ZdcEmapSearchEventStop();
	//�ʤ���߾�����
	if(typeof(search_flg) != 'undefined'){
		cond = ZdcEmapGetCondTime();
	} else {
		cond = ZdcEmapGetCond();
	}
	var opts = new ZdcNearShopOptions();
	opts.cid='<?PHP echo $D_DATA_CID; ?>';
	opts.lat = center.lat;
	opts.lon = center.lon;
	if((ZdcEmapSearchFirst != 1) || (<?PHP echo $D_INIT_LVL_CSTM; ?> > 0)) {
		opts.latlon = boxmin.lat+","+boxmin.lon+","+boxmax.lat+","+boxmax.lon;
		opts.radius = <?PHP echo $D_SHOP_RAD_RE; ?>;
	} else {
		ZdcEmapSearchFirst = 0;
		<?php // add 2016/03/05 N.Wada [ ?>
		<?php if (isset($D_RESEARCH_CNT) && $D_RESEARCH_CNT) { ?>
		ZdcEmapSearchFirstCstm = 1;
		opts.researchCount = <?PHP echo $D_RESEARCH_CNT; ?>;
		<?php } ?>
		<?php // add 2016/03/05 N.Wada ] ?>
		opts.radius = <?PHP echo $D_SHOP_RAD; ?>;
	}
	opts.jkn = cond;
	opts.pos = 1;
	opts.minCount = <?PHP echo $D_SHOP_MIN; ?>;	<?php // add 2016/03/06 N.Wada ?>
	opts.maxCount = <?PHP echo $D_SHOP_MAX; ?>;
	opts.limitCount = <?PHP echo $D_SHOP_MAX; ?>;
	opts.timeout = <?PHP echo $D_AJAX_TIMEOUT; ?>;
	if (ZdcEmapMapShopDetailMrkId != null) {
		// �ܺ�ɽ����ε���ID
		var mrk = ZdcEmapMapShopDetailMrkId;
		if (mrk && mrk.data1) opts.exceptKid = mrk.data1;
	}
	ZdcEmapNearShop.opts = opts;
	//�ꥹ�Ȥ�ɽ������
	ZdcEmapSearchShopList(0);
	//���������ɽ������
	if (typeof(search_flg) != 'undefined') {
		ZdcEmapNearShop.searchPost(opts,ZdcEmapSearchShopResult);
	} else {
		ZdcEmapNearShop.search(opts,ZdcEmapSearchShopResult);
	}
}

//�ʤ���߾���Ȥ�Ω��
var ZdcEmapCondParms = "";
function ZdcEmapGetCond() {
	var cond="";
	var condArr=new Array();
	ZdcEmapCondParms = "";
	if(document.ZdcEmapCondForm) {
		var obj,chk=new Array(),chkcnt=0,col=new Array(),colcnt=0,fw=new Array(),fwcnt=0;
		var all=new Array(),allcnt=0,allcondno=new Array(),condno='';
		for(var i = 0;i < document.ZdcEmapCondForm.elements.length;i ++) {
			obj = document.ZdcEmapCondForm.elements[i];
			if(!obj) break;
			condno = obj.name.replace('cond','');
			switch(obj.type) {
				case "checkbox":
					if(obj.checked == true) {
						ZdcEmapCondParms += "&cond"+condno+"=1";
						chk[chkcnt] = ZdcEmapCondVal[condno];
						all[allcnt] = chk[chkcnt]; allcondno[allcnt] = condno; allcnt++;
						chkcnt ++;
					}
					break;
				case "select-one":
					if(obj.options[obj.selectedIndex].value) {
						if("<?php echo $SELECT_OPTION_VAL; ?>" != ""){
							ZdcEmapCondParms += "&cond"+condno+"="+obj.value;
						} else {
							var n = obj.selectedIndex + 1;
							ZdcEmapCondParms += "&cond"+condno+"="+n;
						}
						col[colcnt] = ZdcEmapCondOpts[condno][obj.options[obj.selectedIndex].value];
						if (col[colcnt] != '') {
							all[allcnt] = col[colcnt]; allcondno[allcnt] = condno; allcnt++;
							colcnt ++;
						}
					}
					break;
				case "radio":
					if(obj.checked == true && obj.value) {
						var radios = eval("document.ZdcEmapCondForm."+obj.name);
						if (radios) {
							for (i = 0; i < radios.length; i++){
								if (radios[i].value == obj.value) {
									var n = i + 1;
									ZdcEmapCondParms += "&cond"+condno+"="+n;
								}
							}
						}
						col[colcnt] = ZdcEmapCondOpts[condno][obj.value];
						if (col[colcnt] != '') {
							all[allcnt] = col[colcnt]; allcondno[allcnt] = condno; allcnt++;
							colcnt ++;
						}
					}
					break;
				case "text":
					if(obj.value) {
						<?php // mod 2015/02/16 F.Yokoi [ ?>
						if(obj.className == 'cond') {
							ZdcEmapCondParms += "&cond"+condno+"="+obj.value;
							col[colcnt] = ZdcEmapCondVal[condno]+obj.value;
							all[allcnt] = col[colcnt]; allcondno[allcnt] = condno; allcnt++;
							colcnt ++;
						} else {
							fw[fwcnt] = "FREE_SRCH:FW:"+"'"+obj.value+"'";
							all[allcnt] = fw[fwcnt]; allcondno[allcnt] = condno; allcnt++;
							fwcnt ++;
						}
						<?php // mod 2015/02/16 F.Yokoi ] ?>
					}
					break;
				case "button":
					break;
				default:
					if(obj.value) {
						col[colcnt] = ZdcEmapCondVal[condno];
						all[allcnt] = col[colcnt]; allcondno[allcnt] = condno; allcnt++;
						colcnt ++;
					}
					break;
			}
		}

		var cno,newcond = "",newqs = "";
		var qstr = QSTRING.split('&');
		for(var i=0; i<allcnt; i++) {
			cno = allcondno[i];
			newcond += "cond"+cno+"=1&";
		}
		for(var q=0; q<qstr.length; q++) {
			if( qstr[q] == '' ) continue;
			if( qstr[q].substr(0,4) != 'cond' ){
				newqs += qstr[q]+"&";
			}
		}
		QSTRING = newqs + newcond;

		// ���롼�ԥ����ꤵ��Ƥ�����
		if (ZdcEmapCondGroup.length > 0) {
			for(var i = 0;i < allcnt;i ++) {
				cn = allcondno[i];
				gr = ZdcEmapCondGroup[cn];
				if (gr != undefined) {
					if(!condArr[gr]) condArr[gr] = '';
					if(condArr[gr]) condArr[gr] += ' '+ZdcEmapCondAndOr[gr]+' ';
					condArr[gr] += all[i];
				}
			}
			if(condArr.length > 0) {
<?php
if (is_array($D_COND_GRP) && count($D_COND_GRP)) {
	foreach ($D_COND_GRP as $g => $grp) {
?>
				if(condArr[<?php echo $g ?>]) {
					if(cond) cond += ' <?PHP echo $D_COND_GRP_ANDOR; ?> ';
					cond += '('+condArr[<?php echo $g ?>]+')';
				}
<?php
	}
}
?>
			}
		}
	}
	if(typeof ZdcEmapCondAppend[0] !== 'undefined'){
		if( ZdcEmapCondAppend[0] != ''){
			if(cond != ''){
				cond = '('+cond+') '+ZdcEmapCondAppend[1]+' '+ZdcEmapCondAppend[0];
			} else {
				cond = ZdcEmapCondAppend[0];
			}
		}
	}
	return cond;
}

/***
 * Chien Nguyen Add 21/26/2018
 * Function get condition for search with time
***/
function ZdcEmapGetCondTime() {
	var cond="";
	var condArr=new Array();
	ZdcEmapCondParms = "";
	if(document.ZdcEmapCondForm) {
		var obj,chk=new Array(),chkcnt=0,col=new Array(),colcnt=0,fw=new Array(),fwcnt=0;
		var all=new Array(),allcnt=0,allcondno=new Array(),condno='';

		// Chien Nguyen add [
		// Set condition cond101 and cond102 of tap ͹�إ����ӥ���������
		var cond101 = $('select[name=youbi1]').val() + $('select[name=timespan1]').val();	// mod 2018/06/29 Dam Phan Change youbi to dropdownlist

		$('input[name=cond101]').val('');
		$('input[name=cond102]').val('');
		if ($('input[name=cond2]:checked').val()) {
			$('input[name=cond101]').val(cond101);
		}
		if ($('input[name=cond7]:checked').val()) {
			$('input[name=cond102]').val(cond101);
		}
		if (!$('input[name=cond2]:checked').val() && !$('input[name=cond7]:checked').val()) {
			$('input[name=cond101]').val(cond101);
			$('input[name=cond102]').val(cond101);
		}

		// Set condition cond103 and cond104 of tap ���⥵���ӥ���������
		var cond103 = $('select[name=youbi2]').val() + $('select[name=timespan2]').val();	// mod 2018/06/29 Dam Phan Change youbi to dropdownlist

		$('input[name=cond103]').val('');
		$('input[name=cond104]').val('');

		$('input[name=cond103]').val(cond103);
		if ($('input[name=cond16]:checked').val()) {
			$('input[name=cond104]').val(cond103);
			if (!$('input[name=cond8]:checked').val() ||
				!$('input[name=cond9]:checked').val() ||
				!$('input[name=cond10]:checked').val() ||
				!$('input[name=cond11]:checked').val() ||
				!$('input[name=cond12]:checked').val() ||
				!$('input[name=cond13]:checked').val() ||
				!$('input[name=cond14]:checked').val() ||
				!$('input[name=cond15]:checked').val() ||
				!$('input[name=cond17]:checked').val() ||
				!$('input[name=cond18]:checked').val()
			) {
				$('input[name=cond103]').val('');
			}
		}

		// Set condition cond105 and cond106 of tap �ݸ������ӥ���������
		var cond105 = $('select[name=youbi3]').val() + $('select[name=timespan3]').val();	// mod 2018/06/29 Dam Phan Change youbi to dropdownlist
		
		$('input[name=cond105]').val('');
		$('input[name=cond106]').val('');
		$('input[name=cond105]').val(cond105);
		if ($('input[name=cond24]:checked').val()) {
			$('input[name=cond106]').val(cond105);
			if (!$('input[name=cond19]:checked').val() ||
				!$('input[name=cond20]:checked').val() ||
				!$('input[name=cond21]:checked').val() ||
				!$('input[name=cond22]:checked').val() ||
				!$('input[name=cond23]:checked').val()
			) {
				$('input[name=cond105]').val('');
			}
		}

		// Set condition cond107 of tap ATM��������
		var cond107 = $('select[name=youbi4]').val() + $('select[name=timespan4]').val();	// mod 2018/06/29 Dam Phan Change youbi to dropdownlist
		$('input[name=cond107]').val(cond107);

		// Set condition cond108 and cond109 of tap ¾�����ӥ���������
		var cond108 = $('select[name=youbi5]').val() + $('select[name=timespan5]').val();	// mod 2018/06/29 Dam Phan Change youbi to dropdownlist

		$('input[name=cond108]').val('');
		$('input[name=cond109]').val('');
		$('input[name=cond109]').val(cond108);
		if ($('input[name=cond30]:checked').val()) {
			$('input[name=cond108]').val(cond108);
			if ( !$('input[name=cond26]:checked').val() ||
				 !$('input[name=cond27]:checked').val() ||
				 !$('input[name=cond28]:checked').val() ||
				 !$('input[name=cond29]:checked').val()
			) {
				$('input[name=cond109]').val('');
			}
		}
		// Chien Nguyen add ]

		for(var i = 0;i < document.ZdcEmapCondForm.elements.length;i ++) {
			obj = document.ZdcEmapCondForm.elements[i];
			if(!obj) break;
			condno = obj.name.replace('cond','');
			switch(obj.type) {
				case "checkbox":
					if(obj.checked == true) {
						ZdcEmapCondParms += "&cond"+condno+"=1";
						chk[chkcnt] = ZdcEmapCondVal[condno];
						all[allcnt] = chk[chkcnt]; allcondno[allcnt] = condno; allcnt++;
						chkcnt ++;
					}
					break;
				case "text":
					if(obj.value) {
						<?php // mod 2015/02/16 F.Yokoi [ ?>
						if(obj.className == 'cond') {
							ZdcEmapCondParms += "&cond"+condno+"="+obj.value;
							col[colcnt] = ZdcEmapCondVal[condno]+obj.value;
							all[allcnt] = col[colcnt]; allcondno[allcnt] = condno; allcnt++;
							colcnt ++;
						} else {
							fw[fwcnt] = "FREE_SRCH:FW:"+"'"+obj.value+"'";
							all[allcnt] = fw[fwcnt]; allcondno[allcnt] = condno; allcnt++;
							fwcnt ++;
						}
						<?php // mod 2015/02/16 F.Yokoi ] ?>
					}
					break;
				case "radio":
					break;
				case "button":
					break;
				default:
					if(obj.value) {
						if (condno >= 101 && condno <= 109) {
							col[colcnt] = ZdcEmapCondOpts[condno][obj.value];
						} else {
							col[colcnt] = ZdcEmapCondVal[condno];
						}
						all[allcnt] = col[colcnt]; allcondno[allcnt] = condno; allcnt++;
						colcnt ++;
					}
					break;
			}
		}

		var cno,newcond = "",newqs = "";
		var qstr = QSTRING.split('&');
		for(var i=0; i<allcnt; i++) {
			cno = allcondno[i];
			newcond += "cond"+cno+"=1&";
		}
		for(var q=0; q<qstr.length; q++) {
			if( qstr[q] == '' ) continue;
			if( qstr[q].substr(0,4) != 'cond' ){
				newqs += qstr[q]+"&";
			}
		}
		QSTRING = newqs + newcond;

		// ���롼�ԥ����ꤵ��Ƥ�����
		if (ZdcEmapCondGroup.length > 0) {
			for(var i = 0;i < allcnt;i ++) {
				cn = allcondno[i];
				gr = ZdcEmapCondGroup[cn];
				if (gr != undefined) {
					if(!condArr[gr]) condArr[gr] = '';
					if(condArr[gr]) condArr[gr] += ' '+ZdcEmapCondAndOr[gr]+' ';
					condArr[gr] += all[i];
				}
			}
			// console.log(ZdcEmapCondGroup);
			// console.log(allcondno);
			// console.log(condArr);
			if(condArr.length > 0) {
<?php
if (is_array($D_COND_GRP) && count($D_COND_GRP)) {
	foreach ($D_COND_GRP as $g => $grp) {
?>
				if(condArr[<?php echo $g ?>]) {
					if(cond) cond += ' <?PHP echo $D_COND_GRP_ANDOR; ?> ';
					cond += '('+condArr[<?php echo $g ?>]+')';
				}
<?php
	}
}
?>
			}
		}
	}
	if(typeof ZdcEmapCondAppend[0] !== 'undefined'){
		if( ZdcEmapCondAppend[0] != ''){
			if(cond != ''){
				cond = '('+cond+') '+ZdcEmapCondAppend[1]+' '+ZdcEmapCondAppend[0];
			} else {
				cond = ZdcEmapCondAppend[0];
			}
		}
	}
	return cond;
}


//������̤ν���
var ZdcEmapConvertDatumH = false;	<?php // add 2016/08/15 Y.Matsukawa ?>
var ZdcEmapConvertDatumHDone = false;	<?php // add 2016/08/15 Y.Matsukawa ?>
function ZdcEmapSearchShopResult(result) {
	var i,item,mrk,tmp,icnt,maxlat=0,maxlon=0,minlat=999999999,minlon=999999999;
	function setLatLon(lat, lon){
		this.lat  = lat;
		this.lon = lon;
	}
	latlons = new Array();
	
	//�᤭�Ф����
	ZdcEmapShopMsgClose();		<?php // add 2015/10/20 N.Wada ?>

	<?php // add 2015/10/20 N.Wada ?>
	//�ޡ��������饹�������
	<?php if (isset($D_GOOGLEMAPS_MARKER_CLUSTERER) && $D_GOOGLEMAPS_MARKER_CLUSTERER) { ?>
	ZdcEmapMapShopMrkClstObj.clearMarkers();
	<?php } ?>

	//�ޡ��������
	if(ZdcEmapMapShopMrkCnt != null) {
		for( i = 0;i < ZdcEmapMapShopMrkCnt;i ++) {
			if (ZdcEmapMapShopMrkId[i]) {
				//ZdcEmapMapObj.removeWidget(ZdcEmapMapShopMrkId[i]);
				ZdcEmapMapShopMrkId[i].setMap(null);
				ZdcEmapMapShopMrkId[i] = null;
			}
		}
	}
	ZdcEmapMapShopMrkCnt = 0;
	//���顼����
	if(result.status != 0 && result.status != 3 && result.status != 5 && result.status != 9) {
		alert("<?PHP echo $D_MSG_ERR_JS_RESULT; ?> listres["+result.status+"]");
		ZdcEmapSearchEventStart();
		//ZdcEmapSearchShopClose();
		ZdcEmapReadOff();
		return;
	}
	ZdcEmapSearchFirstCstm = 0;	<?php //add 2016/03/05 N.Wada ?>

<?php
	// add 2016/08/15 Y.Matsukawa [
	// ������¬�Ϸ��Ѵ�
	if (isset($D_CONVERT_DATUM_H) && $D_CONVERT_DATUM_H) {
?>
	if (!ZdcEmapConvertDatumHDone && result.items && result.items.length) {
		ZdcEmapConvertDatumH = true;
<?php	if (isset($D_CONVERT_DATUM_H_ZOOM) && $D_CONVERT_DATUM_H_ZOOM) { ?>
		if (ZdcEmapMapObj.getZoom() < <?php echo $D_CONVERT_DATUM_H_ZOOM; ?>) {
			ZdcEmapConvertDatumH = false;
		}
<?php	} ?>
		var wp = ZdcEmapMapObj.getCenter();
		var wcenter = ZdcEmapWgs2Tky(wp.lat(), wp.lng());
		if (ZDC.degToms(wcenter.lat) > <?php echo $D_CONVERT_DATUM_H_MINLAT; ?>
		&& ZDC.degToms(wcenter.lat) < <?php echo $D_CONVERT_DATUM_H_MAXLAT; ?>) {
			ZdcEmapConvertDatumH = false;
		}
		if (ZdcEmapConvertDatumH) {
			ZdcEmapConvertDatumHDone = true;
			var arrlatlon = new Array();
			var wc = result.items.length;
			for (i = 0; i < wc; i++) {
				item = result.items[i];
				arrlatlon.push(new ZDC.LatLon(item.lat, item.lon));
			}
			ZDC.Search.convertDatum({'latlons':arrlatlon, 'mode':'tkywgs'}, function(status, res){
				if (status.code == '000') {
					wc = res.length;
					for (i = 0; i < wc; i++) {
						result.items[i].lat_wgs = res[i].lat;
						result.items[i].lon_wgs = res[i].lon;
					}
				}
				ZdcEmapSearchShopResult(result);
			});
			return;
		}
	} else {
		ZdcEmapConvertDatumHDone = false;
	}
<?php
	}
	// add 2016/08/15 Y.Matsukawa ]
?>

	//�Ͽޤ��֤�
	icnt = result.items.length;
	for (i=icnt-1; i>=0; i--) {
<?php
if ( isset($D_DIST_ABS) && $D_DIST_ABS ) {
?>
		if( <?PHP echo $D_DIST_ABS; ?> < result.items[i].dist ) continue;
<?php
}
?>
		item = result.items[i];
		if(!item.icon) break;
		if(item.nflg == 1) tmp = ZdcEmapIconImg["@NEW"];
			else tmp = "";
		<?php 
		if ($D_NEW_ICON_COL) { 
		?>
		if(item.<?PHP echo $D_NEW_ICON_COL; ?> == 1) tmp = ZdcEmapIconImg["@NEW"];
		<?php 
		}
		?>
		//����Ǿ����ٷ��ټ���
		if(item.lat > maxlat) maxlat = item.lat;
		if(item.lon > maxlon) maxlon = item.lon;
		if(item.lat < minlat) minlat = item.lat;
		if(item.lon < minlon) minlon = item.lon;
		
		icn_img = ZdcEmapIconImg[item.icon];
		icn_num = i + 1;
		if ("<?PHP echo $D_NUM_ICON; ?>" && "<?PHP echo $detailflg; ?>" != 1 &&  "<?PHP echo $printflg; ?>" != 1) {
			icn_img = "<?PHP echo $D_NUM_ICON_GIF; ?>"+icn_num+".gif";
		} else if ("<?PHP echo $num_icon_p; ?>") {
			icn_img = "<?PHP echo $D_NUM_ICON_GIF; ?>"+icn_num+".gif";
		}
		// ̵���ʥ�������ID�ξ���Ʃ����������˺����ؤ�
		if (icn_img == null) icn_img = ZdcEmapIconImg["@TP"];
		
		latlons[ZdcEmapMapShopMrkCnt] = new ZDC.LatLon(item.lat, item.lon);
		<?php
		// add 2016/08/16 Y.Matsukawa [
		// ����������¬�Ϸϰ��ٷ��٤��ݻ����Ƥ�����Ϥ�������
		if ($D_KYOTEN_WGS_COL) {
			if ($D_KYOTEN_WGS_COL['LAT'] && $D_KYOTEN_WGS_COL['LON']) {
		?>
		item.lat_wgs = item.<?php echo strtolower($D_KYOTEN_WGS_COL['LAT']) ?>;
		item.lon_wgs = item.<?php echo strtolower($D_KYOTEN_WGS_COL['LON']) ?>;
		if (item.lat_wgs) item.lat_wgs = ZDC.msTodeg(item.lat_wgs);
		if (item.lon_wgs) item.lon_wgs = ZDC.msTodeg(item.lon_wgs);
		<?php
			}
		}
		// add 2016/08/16 Y.Matsukawa ] ?>
		<?php
		// add 2016/08/15 Y.Matsukawa [
		// ����¬�Ϸϰ��ٷ��� ?>
		var wgs = false;
		if (item.lat_wgs && item.lon_wgs) {
			item.lat = item.lat_wgs;
			item.lon = item.lon_wgs;
			wgs = true;
		}
		<?php
		// add 2016/08/15 Y.Matsukawa ] ?>
		mrk = ZdcEmapMakeMrkApi2(i, item.lat, item.lon, 
								ZdcEmapIconW[item.icon], ZdcEmapIconH[item.icon],ZdcEmapIconW['@NEW'],ZdcEmapIconH['@NEW'],
								<?php if (isset($D_ICON_ANCHOR_CENTER_BOTTOM) && $D_ICON_ANCHOR_CENTER_BOTTOM) { // ���������������������������	add 2016/03/22 N.Wada ?>
								Math.ceil(ZdcEmapIconW[item.icon]/2), ZdcEmapIconH[item.icon],ZdcEmapIconW[item.icon]-ZdcEmapIconW['@NEW'],ZdcEmapIconH[item.icon],
								<?php } else { // �������������濴���������� ?>
								ZdcEmapIconOffsetX[item.icon], ZdcEmapIconOffsetY[item.icon],ZdcEmapIconW[item.icon]-ZdcEmapIconW['@NEW'],ZdcEmapIconH[item.icon],
								<?php } ?>
								icn_img,tmp,
								item.id, item.icon, '', item.nflg,
								<?PHP
									// ����å�
									if($D_KYO_ICON_CLK == 1) echo "function() { ZdcEmapShopMsg(this.id); }"; 
									else if($D_KYO_ICON_CLK == 2) echo "function() { window.location.href='".$D_DIR_BASE_G."dtl/'+this.data1+'/?".($P_FREEPARAMS_ENC?'&'.$P_FREEPARAMS_ENC:'').($condprm?'&'.$condprm:'').($his?'&his='.urlencode($his):'')."'; }";		// add 2012/07/06 Y.Matsukawa
									else echo "null"; 
								?>
								,
								<?PHP
									// �ޥ��������С�
									if(!$D_KYO_ICON_MO) echo "null";
									if($D_KYO_ICON_MO) echo "function() { ZdcEmapShopMsg(this.id); }";
								?>
								,item.lvl
								,wgs		<?php // add 2016/08/15 Y.Matsukawa ?>
							);
		<?php /* Google Maps JavaScript API V3�ν񼰤��ѹ�
		//if (ZdcEmapMapShopMrkId[i] != null) ZdcEmapMapObj.removeWidget(ZdcEmapMapShopMrkId[i]);//ǰ�Τ���
		//ZdcEmapMapObj.addWidget(mrk);
		*/ ?>
		<?php // add 2016/03/01 N.Wada [ ?>
		if (ZdcEmapMapShopMrkId[i] != null) ZdcEmapMapShopMrkId[i].setMap(null);
		mrk.setMap(ZdcEmapMapObj);
		mrk.setZIndex(100);				// add 2017/07/04 Y.Uesugi
		<?php // add 2016/03/01 N.Wada ] ?>
		ZdcEmapMapShopMrkId[i] = mrk;
		ZdcEmapMapShopMrkCnt ++;
	}

	<?php // add 2015/10/20 N.Wada ?>
	// �ޡ��������饹��������
	<?php if (isset($D_GOOGLEMAPS_MARKER_CLUSTERER) && $D_GOOGLEMAPS_MARKER_CLUSTERER) { ?>
	//ZdcEmapMapShopMrkClstObj.addMarkers(ZdcEmapMapShopMrkId);
	ZdcEmapMapShopMrkClstObj.addMarkers(ZdcEmapMapShopMrkId.slice(0,ZdcEmapMapShopMrkCnt));	// �����ޡ�����ʬ�����Ϥ��褦�ˡ�null�ͤ�������Ϥ��ʤ��褦�ˡ�
		<?php if (isset($D_GOOGLEMAPS_MARKER_CLUSTERER_CLICK_OPEN_MSG) && $D_GOOGLEMAPS_MARKER_CLUSTERER_CLICK_OPEN_MSG) { ?>
	google.maps.event.clearListeners(ZdcEmapMapShopMrkClstObj, "clusterclick");
	google.maps.event.addListener(ZdcEmapMapShopMrkClstObj, "clusterclick", function (mCluster) {
		ZdcEmapShopMsgCluster(mCluster);
	});
		<?php } ?>
	<?php } ?>

	<?php // add 2016/03/02 N.Wada ?>
	var p = ZdcEmapMapObj.getCenter();
	var center = ZdcEmapWgs2Tky(p.lat(), p.lng());
	
	if(ZdcEmapSearchClickFlg) {
		ZdcEmapSearchClickFlg = 0;
		//����������ϲ��̰�ư
		if (ZdcEmapMapShopMrkCnt > 0) {
			//���������ޤ��ϰϤ˰�ư
			if (!ZdcEmapMapShopDetailMrkId) {
				<?php // del 2016/03/02 N.Wada
				////var center_latlon = ZdcEmapMapObj.getLatLon();
				//var center_latlon = ZdcEmapWgs2Tky(ZdcEmapMapObj.getCenter().lat(), ZdcEmapMapObj.getCenter().lng());
				//var latdist;
				//var londist;
				//var varminlat;
				//var varminlon;
				//var varmaxlat;
				//var varmaxlon;
				//var varlatlon_box = new Array();
				//// �Ǥ�Υ�줿lat�κ�ʬ
				//var minlatdist = Math.abs(Math.floor(minlat*10000000) - Math.floor(center_latlon.lat*10000000))/10000000;
				//var maxlatdist = Math.abs(Math.floor(maxlat*10000000) - Math.floor(center_latlon.lat*10000000))/10000000;
				//if (minlatdist > maxlatdist) {
				//	latdist = minlatdist;
				//} else {
				//	latdist = maxlatdist;
				//}
				//// �Ǥ�Υ�줿lon�κ�ʬ
				//var minlondist = Math.abs(Math.floor(minlon*10000000) - Math.floor(center_latlon.lon*10000000))/10000000;
				//var maxlondist = Math.abs(Math.floor(maxlon*10000000) - Math.floor(center_latlon.lon*10000000))/10000000;
				//if (minlondist > maxlondist) {
				//	londist = minlondist;
				//} else {
				//	londist = maxlondist;
				//}
				//varminlat = Math.floor((center_latlon.lat*10000000) - (latdist*10000000))/10000000;
				//varminlon = Math.floor((center_latlon.lon*10000000) - (londist*10000000))/10000000;
				//varmaxlat = Math.floor((center_latlon.lat*10000000) + (latdist*10000000))/10000000;
				//varmaxlon = Math.floor((center_latlon.lon*10000000) + (londist*10000000))/10000000;
				//// �Ͽ�ɽ���̼ܼ����Ѳ��۵���
				////				varlatlon_box[0] = new ZDC.LatLon(varminlat, varminlon);
				////				varlatlon_box[1] = new ZDC.LatLon(varmaxlat, varmaxlon);
				////				var adjust = ZdcEmapMapObj.getAdjustZoom(varlatlon_box);
				////				if (adjust) {
				////					ZdcEmapSearchEventChangezoomAvailable = 0;
				////					ZdcEmapMapObj.setZoom(adjust.zoom);
				////				}
				//var minlatlng = ZdcEmapTky2Wgs(varminlat, varminlon);
				//var swLatLng = new google.maps.LatLng(minlatlng.lat, minlatlng.lon);
				//var maxlatlng = ZdcEmapTky2Wgs(varmaxlat, varmaxlon);
				//var neLatLng = new google.maps.LatLng(maxlatlng.lat, maxlatlng.lon);
				//ZdcEmapMapObj.fitBounds(new google.maps.LatLngBounds(swLatLng, neLatLng));
				?>
				if(<?php echo $D_INIT_LVL_CSTM; ?> == 0) {	<?php // add 2017/06/09 N.Wada ?>
					<?php // add 2016/03/02 N.Wada ?>
					ZdcEmapMapMoveBoxCenterFixed(minlat, minlon, maxlat, maxlon, center.lat, center.lon);
					<?php // idle���٥�Ȥ�fitBounds���ȯ�����Ƥ��ޤ��Τǣ��󸡺����ʤ��褦�ˤ���	add 2015/10/20 N.Wada ?>
					<?php if (isset($D_GOOGLEMAPS_SEARCH_EVENT_IDLE) && $D_GOOGLEMAPS_SEARCH_EVENT_IDLE) { ?>
					ZdcEmapSearchShopCancel = 1;
					<?php } ?>
				}
			}
		}
	}

	document.getElementById('ZdcEmapMap').style.visibility = "visible";	<?php // add 2016/03/08 N.Wada ?>
	ZdcEmapMapFrontShopDetail();	<?php // add 2016/03/08 N.Wada ?>
	ZdcEmapMapCursorRemove();	<?php // add 2015/10/20 N.Wada ?>
	ZdcEmapSearchEventStart();
	//�����Ĥ���
	ZdcEmapRouteClear();	<?php // add 2016/03/08 N.Wada ?>
	//�������֤��ݻ�
	//	ZdcEmapSearchPoint = ZdcEmapMapObj.getLatLon();
	//	ZdcEmapSearchScale = ZdcEmapMapObj.getZoom();
	ZdcEmapSearchPoint = ZdcEmapMapObj.getCenter();
	ZdcEmapSearchScale = ZdcEmapMapObj.getZoom();
	ZdcEmapReadOff();
	<?php
	// ������ˣ����ܤ�Ź�ޤΥե�������ɽ��	add 2015/06/03 N.Wada
	if ( isset($D_SEARCH_FINISHED_MSG_SHOW) && $D_SEARCH_FINISHED_MSG_SHOW ) {
	?>
	//if (icnt) ZdcEmapShopMsg(0, true);
	if (ZdcEmapAjaxSelectShop) {
		ZdcEmapAjaxSelectShop = false;
		ZdcEmapShopMsg(0, true);
	}
	<?php
	}
	?>
	<?php // add 2017/06/22 N.Wada [ ?>
	if (ZdcEmapSearchFirst == 1 && <?php echo $D_INIT_LVL_CSTM_RE; ?> > 0) {
		ZdcEmapSearchFirst = 0;
		if (ZdcEmapMapShopMrkCnt == 0) {
			ZdcEmapMapObj.setZoom(<?php echo $D_INIT_LVL_CSTM_RE; ?>);
		}
	}
	<?php // add 2017/06/22 N.Wada ] ?>
	<?php // ���åȤ��줿Ǥ�դδؿ���¹�	add 2015/10/20 N.Wada ?>
	if (typeof ZdcEmapResultAfterFunc === "function") ZdcEmapResultAfterFunc();
}

<?php // add 2015/06/03 N.Wada ?>
function ZdcEmapFindShopMarker(kid) {
	if (ZdcEmapMapShopMrkId && ZdcEmapMapShopMrkId.length > 0) {
		var len = ZdcEmapMapShopMrkId.length;
		for (var i = 0; i < len; i++) {
			if (ZdcEmapMapShopMrkId[i].data1 == kid) {
				return ZdcEmapMapShopMrkId[i];
			}
		}
	}
	return null;
}

<?php // add 2015/10/20 N.Wada ?>
var ZdcEmapMapFrontShopMrkId = null;
//���ꤵ�줿������������̤ˤ�äƤ���
function ZdcEmapMapFrontShopMrk(id){
	if(ZdcEmapMapShopMrkId[id] != null) {
		var mrk = ZdcEmapMapShopMrkId[id];
		ZdcEmapMapFrontShopReset();
		//mrk.setZindex(101);
		mrk.setZIndex(101);
		ZdcEmapMapFrontShopMrkId = ZdcEmapMapShopMrkId[id];
	}
}
<?php // add 2016/03/08 N.Wada ?>
//�ܺ٥�����������̤ˤ�äƤ���
function ZdcEmapMapFrontShopDetail(){
	var mrk;
	if(ZdcEmapMapShopDetailMrkId != null) {
		//�ե�������
		ZdcEmapMapFrontShopReset();
		mrk = ZdcEmapMapCurFocusMrkId;
		<?php /* Google Maps JavaScript API V3�ν񼰤��ѹ�
		//mrk.setZindex(102);
		*/ ?>
		mrk.setZIndex(102);
		mrk = ZdcEmapMapShopDetailMrkId;
		<?php /* Google Maps JavaScript API V3�ν񼰤��ѹ�
		//mrk.setZindex(101);
		*/ ?>
		mrk.setZIndex(101);
		ZdcEmapMapFrontShopMrkId = ZdcEmapMapShopDetailMrkId;
	}
}
<?php // add 2015/10/20 N.Wada ?>
//���̤˻��äƤ�����������򸵤��᤹
function ZdcEmapMapFrontShopReset() {
	if (ZdcEmapMapFrontShopMrkId != null) {
		var mrk = ZdcEmapMapFrontShopMrkId;
		//if (mrk && mrk.b) mrk.setZindex(100);
		if (mrk) mrk.setZIndex(100);
		ZdcEmapMapFrontShopMrkId = null;
	}
}

//�ܺ�ɽ��(��������Τ�ɽ��)
var ZdcEmapConvertDatumHPrt = false;	<?php // add 2016/08/15 Y.Matsukawa ?>
var ZdcEmapConvertDatumHPrtDone = false;	<?php // add 2016/08/15 Y.Matsukawa ?>
<?php //function ZdcEmapShopIcon(lat,lon,icnno,nflg,NotMoveFlag) {		mod 2016/08/15 Y.Matsukawa ?>
function ZdcEmapShopIcon(lat, lon, icnno, nflg, NotMoveFlag, wgs) {
	//��Ͽ����Ƥ��ʤ���������ID�ξ��Ͻ������ʤ�
	if (!ZdcEmapIconImg[icnno]) {
		icnno = "@TP";//Ʃ������
	}
	var mrk;
	//�Ͽް�ư
	if( NotMoveFlag == undefined || NotMoveFlag != 1 ){
		<?php //ZdcEmapMapMove(lat, lon);		mod 2016/08/15 Y.Matsukawa ?>
		ZdcEmapMapMove(lat, lon, null, wgs);
	}
//	var center = new ZDC.LatLon(Number(lat), Number(lon));
//	ZdcEmapMapObj.setHome(center);

<?php
	// add 2016/08/15 Y.Matsukawa [
	// ������¬�Ϸ��Ѵ�
	if (isset($D_CONVERT_DATUM_H) && $D_CONVERT_DATUM_H) {
?>
	if (!ZdcEmapConvertDatumHPrtDone) {
		ZdcEmapConvertDatumHPrt = true;
		var wp = ZdcEmapMapObj.getCenter();
		var wcenter = ZdcEmapWgs2Tky(wp.lat(), wp.lng());
		if (ZDC.degToms(wcenter.lat) > <?php echo $D_CONVERT_DATUM_H_MINLAT; ?>
		&& ZDC.degToms(wcenter.lat) < <?php echo $D_CONVERT_DATUM_H_MAXLAT; ?>) {
			ZdcEmapConvertDatumHPrt = false;
		}
		if (ZdcEmapConvertDatumHPrt) {
			ZdcEmapConvertDatumHPrtDone = true;
			var arrlatlon = [new ZDC.LatLon(lat,lon)];
			ZDC.Search.convertDatum({'latlons':arrlatlon, 'mode':'tkywgs'}, function(status, res){
				var wlat = lat;
				var wlon = lon;
				if (status.code == '000') {
					wlat = res[0].lat;
					wlon = res[0].lon;
				}
				ZdcEmapShopIcon(wlat, wlon, icnno, nflg, NotMoveFlag, 1);
			});
			return;
		}
	} else {
		ZdcEmapConvertDatumHPrtDone = false;
	}
<?php
	}
	// add 2016/08/15 Y.Matsukawa ]
?>
	
//	//�ե����������������ɽ������
//	mrk = ZdcEmapMakeMrkApi2(0, lat, lon, 
//							ZdcEmapIconW['@SEL'], ZdcEmapIconH['@SEL'],0,0,
//							ZdcEmapIconOffsetX['@SEL'], ZdcEmapIconOffsetY['@SEL'],0,0,
//							ZdcEmapIconImg['@SEL'],'',
//							'', '', '', 0, null, null, null
//						);
//	if(ZdcEmapMapCurMrkId != null) ZdcEmapMapObj.removeWidget(ZdcEmapMapCurMrkId);
//	if(ZdcEmapMapCurFocusMrkId != null) ZdcEmapMapObj.removeWidget(ZdcEmapMapCurFocusMrkId);
//	ZdcEmapMapObj.addWidget(mrk);
//	ZdcEmapMapCurFocusMrkId = mrk;
//	mrk.setZindex(101);
	
	//�ܺ٥��������ɽ������
	if(nflg == 1) tmp = ZdcEmapIconImg["@NEW"];
		else tmp = "";
	mrk = ZdcEmapMakeMrkApi2(0, lat, lon, 
							ZdcEmapIconW[icnno], ZdcEmapIconH[icnno],ZdcEmapIconW['@NEW'],ZdcEmapIconH['@NEW'],
							<?php if (isset($D_ICON_ANCHOR_CENTER_BOTTOM) && $D_ICON_ANCHOR_CENTER_BOTTOM) { // ���������������������������	add 2016/03/22 N.Wada ?>
							Math.ceil(ZdcEmapIconW[icnno]/2), ZdcEmapIconH[icnno],ZdcEmapIconW[icnno]-ZdcEmapIconW['@NEW'],ZdcEmapIconH[icnno],
							<?php } else { // �������������濴���������� ?>
							ZdcEmapIconOffsetX[icnno], ZdcEmapIconOffsetY[icnno],ZdcEmapIconW[icnno]-ZdcEmapIconW['@NEW'],ZdcEmapIconH[icnno],
							<?php } ?>
							ZdcEmapIconImg[icnno],tmp,
							'', icnno, '', nflg, null, null, null
							,wgs		<?php // add 2016/08/15 Y.Matsukawa ?>
						);
	<?php /* Google Maps JavaScript API V3�ν񼰤��ѹ�
	//if (ZdcEmapMapShopDetailMrkId != null) ZdcEmapMapObj.removeWidget(ZdcEmapMapShopDetailMrkId);//ǰ�Τ���
	//ZdcEmapMapObj.addWidget(mrk);
	*/ ?>
	<?php // add 2016/03/01 N.Wada [ ?>
	if (ZdcEmapMapShopDetailMrkId != null) ZdcEmapMapShopDetailMrkId.setMap(null);
	mrk.setMap(ZdcEmapMapObj);
	<?php // add 2016/03/01 N.Wada ] ?>
	ZdcEmapMapShopDetailMrkId = mrk;
		
//	latlons = new ZDC.LatLon(lat, lon);
//	mrk = new ZDC.Marker(latlons,{
//		/* �ޡ����Υ������˹�碌�ư��֤�Ĵ������ */
//		offset: new ZDC.Pixel(ZdcEmapIconOffsetX[icnno], ZdcEmapIconOffsetY[icnno]),
//		custom: {
//			base : {
//				src: ZdcEmapIconImg[icnno],
//				imgSize: ZDC.WH(ZdcEmapIconW[icnno], ZdcEmapIconH[icnno])
//			}
//		}
//	});
//	if(ZdcEmapMapShopDetailMrkId != null) ZdcEmapMapObj.removeWidget(ZdcEmapMapShopDetailMrkId);
//	ZdcEmapMapObj.addWidget(mrk);
	ZdcEmapMapShopDetailMrkId = mrk;
	ZdcEmapMapShopDetailMrkId.lat = lat;
	ZdcEmapMapShopDetailMrkId.lon = lon;
}

//�ꥹ��ɽ��
<?php // add 2015/10/20 N.Wada ?>
function ZdcEmapSearchShopListClick(page) {
	if(ZdcEmapButtonNG()) return;
	ZdcEmapSearchShopList(page)
}
function ZdcEmapSearchShopList(page) {
	<?php // add 2016/06/18 N.Wada [ ?>
	//�ꥹ�Ȥ�ɽ��������
	if(<?PHP echo $D_SHOP_CLOSELIST; ?> && ZdcEmapMapShopDetailMrkId != null) {
		//�ꥹ����ɽ���⡼�ɤǾܺ�ɽ������ȽФ��ʤ�
		ZdcEmapListObj.innerHTML = "";
		return;
	}
	<?php // add 2016/06/18 N.Wada ] ?>
	<?php if ($D_SERVICE_TYPE != 'S') { ?>
	// Standard�ʳ���ɽ�����ʤ�
	ZdcEmapListObj.innerHTML = "";
	return;
	<?php } ?>
	var url = "<?PHP echo $D_DIR_BASE_L; ?>nlist.htm?"+
			  "&lat="+ZdcEmapNearShop.opts.lat+"&lon="+ZdcEmapNearShop.opts.lon+"&latlon="+ZdcEmapNearShop.opts.latlon+
			  "&radius="+ZdcEmapNearShop.opts.radius+"&jkn="+encodeURI(ZdcEmapNearShop.opts.jkn)+"&page="+page;
	url += ZdcEmapCondParms;
	url += "&<?php echo $P_FREEPARAMS_ENC; ?>";
	url += "<?php echo ($his?'&his='.urlencode($his):''); ?>";
	url += "<?php echo ($exkid?'&exkid='.$exkid:''); ?>";
	url += "<?php echo ($print_flg?'&print_flg=1':''); ?>";
	<?php // add 2016/03/07 N.Wada [ ?>
	if(ZdcEmapSearchFirstCstm == 1) {
		url += "&first_search=1";
	}
	<?php // add 2016/03/07 N.Wada ] ?>
	<?php if($https_req){ ?>url += "&https_req=1";<?php } ?>
	<?php
	// add 2016/08/15 Y.Matsukawa [
	// ������¬�Ϸ��Ѵ�
	if (isset($D_CONVERT_DATUM_H) && $D_CONVERT_DATUM_H) {
	?>
	if (ZdcEmapMapObj) {
		url += "&gzoom="+ZdcEmapMapObj.getZoom();
	}
	<?php
	}
	// add 2016/08/15 Y.Matsukawa ]
	?>
	<?php
	// add 2016/06/22 Y.Matsukawa [
	if($_SERVER['HTTP_HOST']){ echo 'url += "&PARENT_HTTP_HOST='.urlencode($_SERVER['HTTP_HOST']).'";'; }
	// add 2016/06/22 Y.Matsukawa ] ?>
	// Mod 2018/06/21 Chien Nguyen [
	if(typeof(search_flg) != 'undefined'){
		ZdcEmapHttpRequestHtmlPost(url, function(html,status){
			if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> list["+status+"]";
			ZdcEmapListObj.innerHTML = html;
		}, false, 2);
	} else {
		ZdcEmapHttpRequestHtml(url, function(html,status){
			if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> list["+status+"]";
			ZdcEmapListObj.innerHTML = html;
		}, false, 2);
	}
	// Mod 2018/06/21 Chien Nguyen ]
}

//�ե�����ɽ��
var userwidgethukidasi = new google.maps.InfoWindow();
<?php if (isset($D_GOOGLEMAPS_POI_CLICK_INFOWINDOW_DISABLE) && $D_GOOGLEMAPS_POI_CLICK_INFOWINDOW_DISABLE) { // add 2015/10/20 N.Wada ?>
userwidgethukidasi.set("noSuppress", true);
<?php } ?>
<?php
//�ܥ��󲡲�����Ƚ��Υ���󥻥��ɲ�	// mod 2015/06/03 N.Wada
//function ZdcEmapShopMsg(id) {
//	if(ZdcEmapButtonNG()) return;
?>
function ZdcEmapShopMsg(id, NGcancel) {
	NGcancel = NGcancel || false;
	if(!NGcancel && ZdcEmapButtonNG()) return;
	//if(ZdcEmapCondObj.mode == "eki" || ZdcEmapCondObj.mode == "jnr" || ZdcEmapCondObj.mode == "froute") return;//�Ǵ�ؤ���ߤ�Ф��Ƥ���ϽФ��ʤ�
	ZdcEmapShopMsgClose();
	//	//������������̤˽Ф�
	//	if(id != null) ZdcEmapMapFrontShopMrk(id);
	//	else ZdcEmapMapFrontShopDetail();
	//�ǥ�����
	if(id != null) var obj = ZdcEmapMapShopMrkId[id];
	else var obj = ZdcEmapMapShopDetailMrkId;
	
	if(!obj) return;
	
	//�ե�������ɽ��������
	var url = "<?PHP echo $D_DIR_BASE_L; ?>msg.htm?kid="+obj.data1;
	url += ZdcEmapCondParms;	<?php // add 2016/06/23 N.Wada ?>
	url += "&<?php echo $P_FREEPARAMS_ENC; ?>";
	url += "<?php echo ($his?'&his='.urlencode($his):''); ?>";	<?php // add 2016/04/27 N.Wada ?>
	<?php if($https_req){ ?>url += "&https_req=1";<?php } ?>
	<?php
	// add 2016/06/22 Y.Matsukawa [
	if($_SERVER['HTTP_HOST']){ echo 'url += "&PARENT_HTTP_HOST='.urlencode($_SERVER['HTTP_HOST']).'";'; }
	// add 2016/06/22 Y.Matsukawa ] ?>
	ZdcEmapHttpRequestHtml(url, function(html,status){
		ZdcEampHiddenWait();	<?php // add 2015/11/13 N.Wada ?>
		if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> msg["+status+"]";
		//		var userwidgethukidasilabel =
		//		{
		//			html: html,
		//			offset: new ZDC.Pixel(0, 0)
		//		};
		//		var hukidasilatlon = new ZDC.LatLon(Number(obj.lat), Number(obj.lon));
		//		userwidgethukidasi = new ZDC.MsgInfo(hukidasilatlon, userwidgethukidasilabel);
		//		ZdcEmapMapObj.addWidget(userwidgethukidasi);
		//		userwidgethukidasi.open();
		ZdcEmapSearchEventCenterChangeAvailable = 0;
		//userwidgethukidasi = new google.maps.InfoWindow();
		userwidgethukidasi.setContent(html);
		userwidgethukidasi.open(ZdcEmapMapObj, obj);
	<?php //�оݤ����饹��������������ä���硢���ΰ��֤ؤȿ᤭�Ф����ư���� add 2015/10/20 N.Wada [ ?>
	<?php if (isset($D_GOOGLEMAPS_MARKER_CLUSTERER) && $D_GOOGLEMAPS_MARKER_CLUSTERER) { ?>
		var clsts = ZdcEmapMapShopMrkClstObj.getClusters();
		loopout: for (var i=0, cl=clsts.length; i<cl; i++) {
			var mrks = clsts[i].getMarkers();
			if (mrks.length <= 1) continue;	<?php //1�İʲ��ξ��ϥ��饹������������ǤϤʤ� ?>
			for (var j=0, ml=mrks.length; j<ml; j++) {
				if (obj.data1 == mrks[j].data1) {
					userwidgethukidasi.setPosition(clsts[i].getCenter());
					break loopout;
				}
			}
		}
	<?php } ?>
	<?php // add 2015/10/20 N.Wada [ ?>
	}, true, 2);
}
<?php // add 2015/10/20 N.Wada ?>
//�ե�����ɽ���ʥޡ��������饹���ѡ�
function ZdcEmapShopMsgCluster(mCluster) {
	if(ZdcEmapButtonNG()) return;
	ZdcEmapShopMsgClose();

	var markers = mCluster.getMarkers();
	if(markers.length == 0) return;

	//�ǥ�����
	var id = markers[0].id;
	if(id != null) var obj = ZdcEmapMapShopMrkId[id];
	
	if(!obj) return;
	
	ZdcEampVisibleWait();	<?php // add 2015/11/13 N.Wada ?>
	
	var latlng = mCluster.getCenter();

	//�ե�������ɽ��������
	var kidprm = "";
	for (var i=0; i<markers.length; i++) {
		if(markers[i].data1 == ""){ continue; }
		kidprm += "&kid" + i + "=" + markers[i].data1;
	}
	var url = "<?PHP echo $D_DIR_BASE_L; ?>msg.htm?"+kidprm;
	url += "&<?php echo $P_FREEPARAMS_ENC; ?>";
	url += "<?php echo ($his?'&his='.urlencode($his):''); ?>";	<?php // add 2016/04/27 N.Wada ?>
	<?php if($https_req){ ?>url += "&https_req=1";<?php } ?>
	<?php
	// add 2016/06/22 Y.Matsukawa [
	if($_SERVER['HTTP_HOST']){ echo 'url += "&PARENT_HTTP_HOST='.urlencode($_SERVER['HTTP_HOST']).'";'; }
	// add 2016/06/22 Y.Matsukawa ] ?>
	ZdcEmapHttpRequestHtml(url, function(html,status){
		ZdcEampHiddenWait();	<?php // add 2015/11/13 N.Wada ?>
		if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> msg["+status+"]";
		ZdcEmapSearchEventCenterChangeAvailable = 0;
		userwidgethukidasi.setContent(html);
		userwidgethukidasi.setPosition(latlng);
		userwidgethukidasi.open(ZdcEmapMapObj);
	}, true, 2);
}
//�Ĥ���
function ZdcEmapShopMsgClose() {
	if (userwidgethukidasi) {
		userwidgethukidasi.close();
		//userwidgethukidasi = null;
	}
	//ZdcEmapMapFrontShopReset();
	//ZdcEmapTipsClose();//TIPS��Ĥ��Ǥ��Ĥ���
}

//�ܺ�ɽ��(��������) ������³��
<?php //function ZdcEmapShopDetailKidFirst(kid,lat,lon,icnno,nflg,nomove,lvl) {		mod 2016/08/16 Y.Matsukawa ?>
function ZdcEmapShopDetailKidFirst(kid, lat, lon, icnno, nflg, nomove, lvl, wgs) {
	if (!ZdcEmapMapObj) return;
	ZdcEmapSearchClickFlg = 1;
	if (!lvl) lvl = 0;
	<?php //ZdcEmapShopDetailKid(kid,lat,lon,icnno,nflg,nomove,lvl);		mod 2016/08/16 Y.Matsukawa ?>
	ZdcEmapShopDetailKid(kid, lat, lon, icnno, nflg, nomove, lvl, wgs);
	if(<?php echo $D_DSP_OTHER_KBN; ?> == 0) ZdcEmapSearchShopStart();
}
var ZdcEmapConvertDatumHDtl = false;	<?php // add 2016/08/15 Y.Matsukawa ?>
var ZdcEmapConvertDatumHDtlDone = false;	<?php // add 2016/08/15 Y.Matsukawa ?>
<?php //function ZdcEmapShopDetailKid(kid,lat,lon,icnno,nflg,notmove,lvl) {		mod 2016/08/15 Y.Matsukawa ?>
function ZdcEmapShopDetailKid(kid, lat, lon, icnno, nflg, notmove, lvl, wgs) {
	var mrk,tmp;
	ZdcEmapSearchEventStop();
	lvl = parseInt(lvl);
	if (lvl && lvl != 0) {
		ZdcEmapMapObj.setZoom(lvl + ZdcEmapZoomOffset);
	} else if(<?PHP echo $D_INIT_LVL_DETAIL; ?> > 0) {
		ZdcEmapMapObj.setZoom(<?PHP echo $D_INIT_LVL_DETAIL; ?> + ZdcEmapZoomOffset);
	}
<?php
	// add 2016/08/15 Y.Matsukawa [
	// ������¬�Ϸ��Ѵ�
	if (isset($D_CONVERT_DATUM_H) && $D_CONVERT_DATUM_H) {
?>
	if (!ZdcEmapConvertDatumHDtlDone) {
		ZdcEmapConvertDatumHDtl = true;
		var wp = ZdcEmapMapObj.getCenter();
		var wcenter = ZdcEmapWgs2Tky(wp.lat(), wp.lng());
		if (ZDC.degToms(wcenter.lat) > <?php echo $D_CONVERT_DATUM_H_MINLAT; ?>
		&& ZDC.degToms(wcenter.lat) < <?php echo $D_CONVERT_DATUM_H_MAXLAT; ?>) {
			ZdcEmapConvertDatumHDtl = false;
		}
		if (ZdcEmapConvertDatumHDtl) {
			ZdcEmapConvertDatumHDtlDone = true;
			var arrlatlon = [new ZDC.LatLon(lat,lon)];
			ZDC.Search.convertDatum({'latlons':arrlatlon, 'mode':'tkywgs'}, function(status, res){
				var wlat = lat;
				var wlon = lon;
				if (status.code == '000') {
					wlat = res[0].lat;
					wlon = res[0].lon;
				}
				ZdcEmapShopDetailKid(kid, wlat, wlon, icnno, nflg, notmove, lvl, 1);
			});
			return;
		}
	} else {
		ZdcEmapConvertDatumHDtlDone = false;
	}
<?php
	}
	// add 2016/08/15 Y.Matsukawa ]
?>

	<?php
	// �����ܺ�ɽ��������Cookie�˽񤭽Ф�	add 2016/03/17 N.Wada
	if ($D_COOKIE_SHOPDTL_AUTOSAVE && $D_COOKIE_SHOPDTL_MAX > 0) {
	?>
	var knmenc_obj = document.getElementById("ZdcEmapShopNameEnc");
	var knmenc = "";
	if (knmenc_obj) knmenc = knmenc_obj.value;
	ZdcEmapCookieWriteShopDetail('<?PHP echo $cid; ?>', kid, knmenc);
	<?php
	}
	?>
	<?php // add 2016/03/04 N.Wada [ ?>
	//�ե����������������ɽ������
	mrk = ZdcEmapMakeMrkApi2(0, lat, lon, 
							ZdcEmapIconW['@SEL'], ZdcEmapIconH['@SEL'],0,0,
							<?php if (isset($D_ICON_ANCHOR_CENTER_BOTTOM) && $D_ICON_ANCHOR_CENTER_BOTTOM) { // ���������������������������	add 2016/03/22 N.Wada ?>
							ZdcEmapIconOffsetX['@SEL'], Math.ceil(ZdcEmapIconH['@SEL'] + (ZdcEmapIconH[icnno] - ZdcEmapIconH['@SEL']) / 2),0,0,
							<?php } else { // �������������濴���������� ?>
							ZdcEmapIconOffsetX['@SEL'], ZdcEmapIconOffsetY['@SEL'],0,0,
							<?php } ?>
							ZdcEmapIconImg['@SEL'],'',
							'', '', '', 0, null, null, null
							,wgs		<?php // add 2016/08/15 Y.Matsukawa ?>
						);
	<?php /* Google Maps JavaScript API V3�ν񼰤��ѹ�
	//if(ZdcEmapMapCurMrkId != null) ZdcEmapMapObj.removeWidget(ZdcEmapMapCurMrkId);
	//if(ZdcEmapMapCurFocusMrkId != null) ZdcEmapMapObj.removeWidget(ZdcEmapMapCurFocusMrkId);
	//ZdcEmapMapObj.addWidget(mrk);
	//mrk.setZindex(101);
	*/ ?>
	if(ZdcEmapMapCurMrkId != null) ZdcEmapMapCurMrkId.setMap(null);
	if(ZdcEmapMapCurFocusMrkId != null) ZdcEmapMapCurFocusMrkId.setMap(null);
	mrk.setMap(ZdcEmapMapObj);
	mrk.setZIndex(101);
	ZdcEmapMapCurFocusMrkId = mrk;
	<?php // add 2016/03/04 N.Wada ] ?>
	
	//�ܺ٥��������ɽ������
	if (!ZdcEmapIconImg[icnno]) {
		icnno = "@TP";//Ʃ������
	}
	if(nflg == 1) tmp = ZdcEmapIconImg["@NEW"];
		else tmp = "";
	mrk = ZdcEmapMakeMrkApi2(0, lat, lon, 
							ZdcEmapIconW[icnno], ZdcEmapIconH[icnno],ZdcEmapIconW['@NEW'],ZdcEmapIconH['@NEW'],
							<?php if (isset($D_ICON_ANCHOR_CENTER_BOTTOM) && $D_ICON_ANCHOR_CENTER_BOTTOM) { // ���������������������������	add 2016/03/22 N.Wada ?>
							Math.ceil(ZdcEmapIconW[icnno]/2), ZdcEmapIconH[icnno],ZdcEmapIconW[icnno]-ZdcEmapIconW['@NEW'],ZdcEmapIconH[icnno],
							<?php } else { // �������������濴���������� ?>
							ZdcEmapIconOffsetX[icnno], ZdcEmapIconOffsetY[icnno],ZdcEmapIconW[icnno]-ZdcEmapIconW['@NEW'],ZdcEmapIconH[icnno],
							<?php } ?>
							ZdcEmapIconImg[icnno],tmp,
							kid, icnno, '', nflg, null, null, lvl
							,wgs		<?php // add 2016/08/15 Y.Matsukawa ?>
						);
	
	<?php /* Google Maps JavaScript API V3�ν񼰤��ѹ�
	//if(ZdcEmapMapShopDetailMrkId != null) ZdcEmapMapObj.removeWidget(ZdcEmapMapShopDetailMrkId);
	//ZdcEmapMapObj.addWidget(mrk);
	*/ ?>
	<?php // add 2016/03/01 N.Wada [ ?>
	if(ZdcEmapMapShopDetailMrkId != null) ZdcEmapMapShopDetailMrkId.setMap(null);
	mrk.setMap(ZdcEmapMapObj);
	mrk.setZIndex(100);
	<?php // add 2016/03/01 N.Wada ] ?>
	ZdcEmapMapShopDetailMrkId = mrk;
	ZdcEmapMapShopDetailMrkId.data1 = kid;
	ZdcEmapMapShopDetailMrkId.lat = lat;
	ZdcEmapMapShopDetailMrkId.lon = lon;
	//ư��⡼�ɤ��ڤ��ؤ�
	if(<?php echo $D_DSP_OTHER_KBN; ?>) {
		//�����ٰܺʳ�����ɽ��
		ZdcEmapSearchEventStop();
		//ZdcEmapSearchShopClose();
	} else {
		//�Ǵ����ɽ��
		ZdcEmapSearchEventStart();
	}
	if (!notmove) ZdcEmapMapMove(lat, lon);
	//var center = new ZDC.LatLon(Number(lat), Number(lon));
	//ZdcEmapMapObj.setHome(center);
	//¾�ξ�����Ĥ���
	ZdcEmapShopMsgClose();
	ZdcEmapRouteClear();	<?php // add 2016/03/08 N.Wada ?>
}

//-------------------------------------------------------------
//�Ǵ�ظ���
//-------------------------------------------------------------
var ZdcEmapNekiLat;
var ZdcEmapNekiLon;
var ZdcEmapNekiList;
<?php // add 2016/03/08 N.Wada ?>
//�ظ����ᥤ�����
function ZdcEmapStation(lat, lon) {
	ZdcEmapReadOn();
	//
	
	var tmplatlon;
	
	if (lat && lon){
		tmplatlon = new ZDC.LatLon(Number(lat), Number(lon));
	} else {
		<?php /* Google Maps JavaScript API V3�ν񼰤��ѹ�
		//tmplatlon = ZdcEmapMapObj.getLatLon();
		*/ ?>
		tmplatlon = ZdcEmapWgs2Tky(ZdcEmapMapObj.getCenter().lat(), ZdcEmapMapObj.getCenter().lng());
	}
	
	ZdcEmapNekiLat = tmplatlon.lat;
	ZdcEmapNekiLon = tmplatlon.lon;
	
	var ival = {
		latlon: tmplatlon,
		radius: <?PHP echo $D_ST_RAD; ?>,
		datum: "<?PHP echo $D_DATUM; ?>",
		limit: "0"+","+"<?PHP echo $D_ST_MAX; ?>"
	};
	
	ZDC.Search.getStationByLatLon(ival, function(stt, res){
		ZdcGetNearStationResult(stt, res);
	});
}

<?php // add 2016/03/08 N.Wada ?>
function ZdcGetNearStationResult(stt, res) {
	var i,
		len = res.item.length,
		item;
	//���顼����
	if(stt.code != "000" || stt.text != "ok") {
		ZdcEmapNekiList = null;
		alert("<?PHP echo $D_MSG_ERR_JS_RESULT; ?> ekires["+stt.code+","+stt.text+"]");
		ZdcEmapSearchEventStart();
		ZdcEmapListObj.innerHTML = "";
		ZdcEmapReadOff();
		return;
	}
	ZdcEmapNekiList = [];
	if ( len > 0 ) {
		for( i=0; i < len; i++ ){
			item = res.item[i];
			ZdcEmapNekiList.push({
				lat: item.poi.latlon.lat,
				lon: item.poi.latlon.lon,
				text: item.poi.text
			});
		}
	}
	ZdcEmapReadOff();
}

<?php // �Ǵ�إꥹ��ɽ��	add 2017/02/16 N.Wada ?>
function ZdcEmapStationList(page) {
	var url = "<?PHP echo $D_DIR_BASE_L; ?>neki.htm?"+
			  "lat="+ZdcEmapNekiLat+"&lon="+ZdcEmapNekiLon+"&page="+page;
	<?php if($https_req){ ?>url += "&https_req=1";<?php } ?>
	ZdcEmapHttpRequestHtml(url, function(html,status){
		if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> eki["+status+"]";
		ZdcEmapNekiListObj.innerHTML = html;
	});
}

//-------------------------------------------------------------
//ʣ��롼�ȸ���
//-------------------------------------------------------------
<?php // add 2017/03/06 N.Wada ?>
function ZdcEmapSrchCombRootDept(keyword) {
	ZdcEmapSrchCombRootDeptObj.innerHTML = "";

	//�������
	var url = "<?PHP echo $D_DIR_BASE_L; ?>dept_srch_comb.htm?keyword="+keyword;
	ZdcEmapHttpRequestHtml(url, function(html,status){
		if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> cond["+status+"]";
		ZdcEmapSrchCombRootDeptObj.innerHTML = html;
	});
}

<?php // add 2017/02/27 N.Wada ?>
function ZdcEmapSrchCombRootResult(lat, lon, fromname, whenno, date) {
	<?php // add 2018/07/03 N.Wada [ ?>
	var modal = document.getElementById("modal-full");
	if (modal) modal.style.display = 'block';
	<?php // add 2018/07/03 N.Wada ] ?>
	<?php // add 2018/06/26 Y.Matsukawa [ ?>
	var procimg = document.getElementById("combRouteProcessing");
	if (procimg) procimg.style.display = 'block';
	<?php // add 2018/06/26 Y.Matsukawa ] ?>
	ZdcEmapSrchCombRootResultObj.innerHTML = "";

	//�������
	var url = "<?PHP echo $D_DIR_BASE_L; ?>route_srch_comb.htm?kid="+ZdcEmapMapShopDetailMrkId.data1;
	if (lat && lon) url+= "&from="+lat+","+lon;
	if (fromname) url+= "&fromname="+fromname;
	if (whenno) url+= "&whenno="+whenno;
	if (date) url+= "&date="+date;
	ZdcEmapHttpRequestHtml(url, function(html,status){
		<?php // add 2018/07/03 N.Wada [ ?>
		if (modal) modal.style.display = 'none';
		<?php // add 2018/07/03 N.Wada ] ?>
		if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> cond["+status+"]";
		ZdcEmapSrchCombRootResultObj.innerHTML = html;
	});
}

<?php // ��ȯ�Ϥ���ꤷ�ƥ롼�ȸ���ɽ�� ?>
function ZdcEmapFreeRouteStatic(lat, lon) {
	// ̤�б�
	return;
}

<?php
// add 2016/03/17 N.Wada
//-------------------------------------------------------------
// �ڵ������������Cookie���ɤ߹���
//-------------------------------------------------------------
?>
function ZdcEmapCookieGetShopList(cid) {
	var shop_list = new Array();
	var pc_shopdtl = "";
	var key = "PC_SHOPDTL_"+cid;
	<?php if (isset($D_COOKIE_SHOPDTL_KEY_ADD) && $D_COOKIE_SHOPDTL_KEY_ADD) { // add 2016/05/13 N.Wada ?>
	key += "_"+"<?php echo $D_COOKIE_SHOPDTL_KEY_ADD; ?>";
	<?php } ?>
	if (!navigator.cookieEnabled) return shop_list;
	// Cookie�ɤ߹���
	var ck = document.cookie;
	if (ck != "") {
		cookies = ck.split(";");
		for (var i = 0; i < cookies.length; i++) {
			var kv = cookies[i].split("=");
			if (kv[0].replace(/^\s+|\s+$/g, "") == key && kv[1]) {
				pc_shopdtl = kv[1].replace(/^\s+|\s+$/g, "");
				break;
			}
		}
		if (pc_shopdtl != "") {
			var vals = pc_shopdtl.split(",");
			var max = Math.floor(vals.length/2);
			if (max > <?php echo $D_COOKIE_SHOPDTL_MAX-1; ?>) max = <?php echo $D_COOKIE_SHOPDTL_MAX-1; ?>;
			var oc = 0;
			var k = -1;
			for (var i = 0; i < max*2; i++) {
				if (vals[i*2] != undefined) {
					if (vals[i*2+1] == undefined) vals[i*2+1] = '';
					k++;
					shop_list[k] = new Array();
					shop_list[k]['kid'] = vals[i*2];
					shop_list[k]['name'] = vals[i*2+1];
				}
			}
		}
	}
	return shop_list;
}

<?php
// add 2016/03/17 N.Wada
//-------------------------------------------------------------
// �ڵ�����������۵�����Cookie�˽񤭽Ф�
//-------------------------------------------------------------
?>
function ZdcEmapCookieWriteShopDetail(cid, kid, knmenc) {
	var key = "PC_SHOPDTL_"+cid;
	<?php if (isset($D_COOKIE_SHOPDTL_KEY_ADD) && $D_COOKIE_SHOPDTL_KEY_ADD) { // add 2016/05/13 N.Wada ?>
	key += "_"+"<?php echo $D_COOKIE_SHOPDTL_KEY_ADD; ?>";
	<?php } ?>
	var save_value = "";
	var new_value = kid+","+knmenc;
	<?php // add 2014/12/11 Y.Matsukawa [ ?>
	var shop_list = ZdcEmapCookieGetShopList(cid);
	var cnt = shop_list.length;
	if (cnt > 0) {
		for (var i = 0; i < cnt; i++) {
			if (shop_list[i]["kid"] == kid) continue;	<?php // add 2014/04/27 H.Osamoto ?>
			save_value += "," + shop_list[i]["kid"] + "," + shop_list[i]["name"];
		}
	}
	<?php // add 2014/12/11 Y.Matsukawa ] ?>
	save_value = new_value + save_value;
	// Cookie�񤭽Ф�
	ZdcEmapWriteCookie(key, save_value, <?php echo $D_COOKIE_SHOPDTL_EXPIRE; ?>);
}

<?php
// add 2016/03/17 N.Wada
//-------------------------------------------------------------
// Cookie�񤭽Ф�
//-------------------------------------------------------------
?>
function ZdcEmapWriteCookie(key, value_esc, days) {
	var str = key + "=" + value_esc + ";";
	if (days != 0) {
		var dt = new Date();
		dt.setDate(dt.getDate() + days);
		str += "expires=" + dt.toGMTString() + ";";
	}
	str += "path=/;";
	document.cookie = str;
}

// add 2015/06/03 N.Wada
//Ź�޾ܺ�ajaxɽ��
function ZdcEmapShopDetailAjax(kid) {
	ZdcEmapDetailPopObj.innerHTML = "";
	
	var url = "<?PHP echo $D_DIR_BASE_L; ?>dtl/"+kid+"/?";
	ZdcEmapHttpRequestHtml(url, function(html,status){
		if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> cond["+status+"]";
		ZdcEmapDetailPopObj.innerHTML = html;
	});
}

// add 2015/06/03 N.Wada
//�������ajaxɽ��
function ZdcEmapSearchResultAjax(form) {
	ZdcEmapSearchPopObj.innerHTML = "";

	//�������
	var type = form.type.value;
	var keyword;
	switch (type) {
		case "Comb":
			keyword = form.keyword.value;
			break;
		default:
			break;
	}
	var url = "<?PHP echo $D_DIR_BASE_L; ?>search.htm?type="+type;
	if (keyword) url+= "&keyword="+keyword;
	url += ZdcEmapCondParms;	//�ʤ���߾��
	ZdcEmapHttpRequestHtml(url, function(html,status){
		if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> cond["+status+"]";
		ZdcEmapSearchPopObj.innerHTML = html;
	});
}

// add 2015/06/03 N.Wada
// �ʤ���ߤ������
function ZdcEmapCondAllReset() {
	if(document.ZdcEmapCondForm) {
		var chg = 0;
		//ZdcEmapDisableReSearch = true;	// �Ƹ������
		for(var i = 0;i < document.ZdcEmapCondForm.elements.length;i ++) {
			obj = document.ZdcEmapCondForm.elements[i];
			if (obj) {
				switch(obj.type) {
					case "checkbox":
						if(obj.checked == true) {
							obj.checked = false;
							chg++;
						}
						break;
					case "select-one":
						if (obj.selectedIndex > 0) {
							obj.selectedIndex = 0;
							chg++;
						}
						break;
					case "radio":
						if(obj.checked) {
							obj.checked = false;
							chg++;
						}
						break;
					case "text":
						if (obj.value != "") {
							obj.value = "";
							chg++;
						}
						break;
				}
			}
		}
		//ZdcEmapDisableReSearch = false;	// �Ƹ����Ƴ�
		if (chg > 0) {
			ZdcEmapSearchShopClick();	// �Ƹ���
		}
	}
}

// add 2016/03/03 N.Wada
//-------------------------------------------------------------
// �������֤˥ޡ�����ɽ��
//-------------------------------------------------------------
function ZdcEmapSearchMapIcon(latlon) {
	var latlon_wgs = ZdcEmapTky2Wgs(latlon.lat, latlon.lon);
<?php	if ($D_SEARCH_MAP_ICON_IMG) { ?>
	<?php /* Google Maps JavaScript API V3�ν񼰤��ѹ�
	var mrk = new ZDC.Marker(latlon,{
		offset: new ZDC.Pixel(<?php echo $D_SEARCH_MAP_ICON_OFX; ?>, <?php echo $D_SEARCH_MAP_ICON_OFY; ?>),
		custom: {
			base : {
				src: "<?php echo $D_SEARCH_MAP_ICON_IMG; ?>",
				imgSize: ZDC.WH(<?php echo $D_SEARCH_MAP_ICON_W; ?>, <?php echo $D_SEARCH_MAP_ICON_H; ?>)
			}
		}
	});
	*/ ?>
	var mrk = new google.maps.Marker({
		icon : new google.maps.MarkerImage(
			"<?php echo $D_SEARCH_MAP_ICON_IMG; ?>",
			new google.maps.Size(<?php echo $D_SEARCH_MAP_ICON_W; ?>, <?php echo $D_SEARCH_MAP_ICON_H; ?>),
			new google.maps.Point(0, 0),
			new google.maps.Point(<?php echo $D_SEARCH_MAP_ICON_OFX; ?>, <?php echo $D_SEARCH_MAP_ICON_OFY; ?>)
		),
		optimized : false,	<?php // ���˥᡼�����GIF��ͭ���� ?>
		position : new google.maps.LatLng(latlon_wgs.lat, latlon_wgs.lon)
	});

// add T.Luu 2017/08/09
<?php if (isset($D_SHOW_CENTER_MARK_BALLOON_FLG) && $D_SHOW_CENTER_MARK_BALLOON_FLG) { ?>		
	if( ZdcEmapCenterIconClicked ) google.maps.event.removeListener( ZdcEmapCenterIconClicked );
	// �ޡ���-�򥯥�å����٥�Ȥ���Ͽ
	ZdcEmapCenterIconClicked = google.maps.event.addListener(mrk, "click", function (e) {		
		var opts = new ZdcMapCenterAddrSelectOptions();
	    opts.lat = latlon_wgs.lat;
		opts.lon = latlon_wgs.lon;		  		   		  
		opts.timeout = <?PHP echo $D_AJAX_TIMEOUT; ?>;				  		
		ZdcEmapGetAddrInfor(opts , ZdcEmapGetAddrInfoResult);		
	});


var addrBalloon = new google.maps.InfoWindow();
<?php if (isset($D_GOOGLEMAPS_POI_CLICK_INFOWINDOW_DISABLE) && $D_GOOGLEMAPS_POI_CLICK_INFOWINDOW_DISABLE) { // add 2015/10/20 N.Wada ?>
addrBallon.set("noSuppress", true);
<?php } ?>	

// �濴��������ο᤭�Ф���ɽ��	
// result 	: CGI���������ä�����
function ZdcEmapGetAddrInfoResult( result ){	
	// �����	
	var addrinfo;	
	var position;
	
	//�����������	
	if ( result.items && result.items.length ) {		
		addrinfo = result.items[0].addr;
	}
	// ���ּ���
	if ( result.options ){		
		position = {lat: result.options.lat, lng: result.options.lon};
	}
	
	ZdcEmapShowAddrBalloon( addrinfo, position);
}

// �᤭�Ф�ɽ��
function ZdcEmapShowAddrBalloon( addrinfo , position ){
	
	// �᤭�Ф����Ĥ���
	if(addrBalloon){
		addrBalloon.close();
	}else{
		addrBalloon = new google.maps.InfoWindow();
	}
	
	// �᤭�Ф���ɽ��
	if( addrinfo ){
		addrBalloon.setContent(��addrinfo��);
		addrBalloon.open(��ZdcEmapMapObj, mrk��);
	}
	
	if ( position ){
	    addrBalloon.setPosition(position);	
	}	
}	

// ���������������
// opts 	: �������
// callback : ����Хå��ؿ�
function ZdcEmapGetAddrInfor(��opts, callback ){	
	// �����	
	var owner      = this;
	var enc        = "EUC";
	var pflg       = "1";
	var datum      = "WGS84";	
	var target_url = "<?php echo $D_SSAPI['getadstr']; ?>";
	var request_url= '';
	var prm        = '';
	
	// ���Ĥ�NAVICGI�ν���հ����Υѥ�᡼�������
	prm 		+= '&key=<?PHP echo $D_SSAPI_KEY; ?>';
	prm 		+= '&lat='+opts.lat;
	prm 		+= '&lon='+opts.lon;
	prm 		+= "&mclv=6";
	prm 		+= '&enc='+enc;
	prm 		+= '&pflg='+pflg;
	prm 		+= '&datum='+datum;
	request_url  = target_url+'?'+prm;
	
	this.httpReq = new ZdcEmapHttpRequest('EUC', 'EUC');
	
	this.httpReq.request(request_url, function(reference_text, status){		
		// ���������ʬ��
		var result	    = new ZdcMapCenterAddrSelectResult(reference_text, status);
		result.type 	= owner.type;
		result.options  = opts;
		owner.result    = result;
		
		if( callback != null ){
			callback(result);
		}
	}, opts.timeout);	
}	

// ���ץ���󥪥֥����������
function ZdcMapCenterAddrSelectOptions(frewd){
	//default��
	this.lat = '';
	this.lon = '';
	this.timeout = 60000;
}
// ���ꥪ�֥����������
function ZdcMapCenterAddrSelectResult(text_data, status){
	if( text_data == null ){
		ZdcSetErrorStatus.call(this, '', status);
		return;
	}
	//header
	var res = new Array();
	res = text_data.split('\n');
	var header = res.shift();
	var cols = header.split('\t');
	var retcd  = cols[0];
	var cnt    = parseFloat(cols[1]);
	var hitcnt = parseFloat(cols[2]);

	this.retCode  = retcd;
	this.type = '';
	this.status = status;
	this.recCount = cnt;
	this.hitCount = hitcnt;
	this.items = [];
	for(var i=0; i<cnt; i++){
		cols = res[i].split('\t');
		if( cols[0] == '' ){ continue; }
		var item = new ZdcMapCenterAddrSelectItem(cols);
		this.items.push(item);
	}
}

function ZdcMapCenterAddrSelectItem(cols,lvl){
	this.addr = cols[1];
}
<?php } ?>		
// add T.Luu 2017/08/09	
	
<?php	} else { ?>
	<?php /* Google Maps JavaScript API V3�ν񼰤��ѹ�
	var mrk = new ZDC.Marker(latlon,{
		color: ZDC.MARKER_COLOR_ID_GREEN_S
	});
	*/ ?>
	var mrk = new google.maps.Marker({
		position : new google.maps.LatLng(latlon_wgs.lat, latlon_wgs.lon)
	});
<?php	} ?>
	<?php /* Google Maps JavaScript API V3�ν񼰤��ѹ�
	mrk.setZindex(300);
	ZdcEmapMapObj.addWidget(mrk);
	*/ ?>
	mrk.setZIndex(0);
	mrk.setMap(ZdcEmapMapObj);
}

