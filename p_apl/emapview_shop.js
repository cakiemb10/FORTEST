<?PHP
// ------------------------------------------------------------
// �Ͽ�����javasctipt ��˵��������˴ط�������
// 
// ��ȯ����
// 2011/10/15 Y.Matsukawa	��������
// 2011/12/05 Y.Matsukawa	��CID����
// 2011/12/19 Y.Matsukawa	�Ͽ�ɽ�������Ǵ�긡��������¹Ԥ����
// 2011/12/27 H.osamoto		���֥�ߡ����̳�ٱ��ѽ����ɲ�
// 2012/01/10 Y.Matsukawa	�Ǵ�꣰��λ����Ͽޤ�ɽ������ʤ�
// 2012/01/10 Y.Matsukawa	�ܺ�Ź�ޤ�Ǵ������˽Ф��ʤ��Τ������ͤȤ���
// 2012/01/11 N.Wada		�����ϰϡ������������ˤˤ��ɽ���ο���ʬ��
// 2012/01/18 H.Osamoto		ľ����Υ���������($D_DIST_ABS)��Ķ������ꥹ��ɽ�����ʤ�
// 2012/01/31 Y.Matsukawa	cond��ܺ٤ذ����Ѥ�
// 2012/02/08 Y.Matsukawa	�ʤ���߾����ɡ�cond.tpl��value�������פˡ�
// 2012/03/16 Y.Matsukawa	���Զ�罤���ۥ롼��õ��������ץȥ��顼
// 2012/05/22 H.Osamoto		���Զ�罤���ۺǴ�ء����߸������˥��顼�Ȥʤ��礬����
// 2012/08/27 Y.Matsukawa	Light�б����Զ�罤����
// 2012/09/07 Y.Matsukawa	��&�פ�ޤ��ͤ�Ǥ�եѥ�᡼���˻��ꤷ����硢nlist.htm���������ͤ��Ϥ����
// 2012/09/19 H.Osamoto		�Ͽ޾�ε�������������������������ѹ��Ǥ���褦�ˤ���
// 2012/10/01 Y.Matsukawa	Maplink�б�
// 2012/10/15 K.Masuda		�ʤ����cond��select�ǡ�selectindex�ǤϤʤ�value�ͤ��Ϥ���褦�ˤ���
// 2012/11/06 H.Osamoto		SEJ�����ڡ����б�
// 2012/11/13 Y.Matsukawa	JCN�����������
// 2013/01/24 K.Masuda		������������ޥ��������С���Ź�޿᤭�Ф�ɽ��
// 2013/02/01 K.Masuda		cond�������褦�˲���
// 2013/03/12 H.Osamoto		�Ͽ��դ������ꥹ�Ȱ������̤ˤƿ���������������
// 2013/04/19 H.Osamoto		����������������������Ǥ���褦�ѹ�
// 2013/05/14 H.Osamoto		���ɽ���̼ܤ�����Ǥ���褦�ѹ�
// 2013/05/22 H.Osamoto		�Ǵ󸡺���̤�0��ξ��Ƹ����Ǽ������������굡ǽ�ɲ�
// 2013/06/03 Y.Matsukawa	��ȯ�ϻ���롼�ȸ���ɽ��
// 2013/06/11 Y.Matsukawa	͹���ֹ�̵����
// 2013/08/02 Y.Matsukawa	Ǥ����������Ǥ���ϰϳ��ε��������
// 2013/08/22 Y.Matsukawa	�Ͽޤʤ�Ź�޾ܺ��б�
// 2014/02/05 Y.Matsukawa	���������ȥ�����ץƥ����к�
// 2014/02/21 H.Osamoto		�ݥꥴ���⳰Ƚ���ɲ�
// 2014/04/28 H.Osamoto		SMS��̳�ٱ�ˤƻ��Ѥ��Ƥ���D_DIST_ABS��D_ABS_DIST���ѹ�
// 2014/08/25 Q.Dai 		SiteIconOverlapping
// 2014/08/29 Q.Dai 		BrowsingHistoryDisplay
// 2014/10/06 Y.Matsukawa	Ϣ�֥�������
// 2014/10/08 Y.Matsukawa	�Ǵ��ؤ����Ǥ�յ�Υ�α�ɽ��
// 2014/11/28 Y.Matsukawa	�������֤˥ޡ�����ɽ��
// 2014/11/28 Y.Matsukawa	Ź�ޥ������󥯥�å��ǰ����γ���Ź�ޤ�Ƭ�Ф�
// 2014/12/08 Y.Matsukawa	�ܺ��Ͽޤˤ⸡�����֥ޡ�����ɽ�����濴��ɽ����
// 2014/12/09 Y.Matsukawa	������������μ�ư��¸��ե饰������
// 2015/01/16 Y.Matsukawa	�̥ɥᥤ��ǤΥ����������б�
// 2015/01/28 Y.Matsukawa	�Ǵ�ء��Ǵ���ߤʤɤ�ѥ󤯤����ɲ�
// 2015/02/16 F.Yokoi		input type=text���ͤ�ʤ���߾������ꤹ��������ɲ�
// 2015/03/16 Y.Matsukawa	�ʤ���ߡ�Ǥ�ե�������ʬ����
// 2015/03/18 N.Wada		�������������Ϣ�֥��������Ťͤ�ɽ��������
// 2015/03/18 N.Wada		������������Ťʤ�����å��ΰ��ٷ��ٴ������פ��б�
// 2015/03/25 Y.Matsukawa	���Զ��۽Ťʤꥢ���������ѻ���IE7,8�ǥե��������Фʤ��ʤ�
// 2015/03/26 H.Osamoto		�Ǵ�ꥹ�Ȱ������˾ܺ�ɽ�������������������ɲ�
// 2015/03/30 N.Wada		�Ǵ���̰������˺ǽ�θ����ΰ������ɤ����Ǹ����ϰϤ��ڤ��ؤ���
// 							�Ǵ���̤ȺǴ�������̤θ����Ͽ��ϰϤ�Ʊ���ˤ���
// 							�Ǵ���̤ȺǴ�������̤θ�����̷����Ʊ���ˤ���
// 2015/03/30 H.Osamoto		�ե꡼��ɤο�����ӵ�ǽ�ɲ�
//							ʣ��ե꡼����б��ɲ�
// 2015/04/08 F.Yokoi		�롼�ȸ�������Լ�/��ư���ڤ��ؤ��ե饰�ɲ�
// 							���Ĥ���פ˺Ǿ�̥������ץ쥤�䡼�ʰ�ư��Υ����ư����ɽ���˺���ɲ�
// 2015/04/23 H.Osamoto		������˹ʤ���߾��̵�����ȥޥ������������ѹ������ɲ�
// 2015/04/27 H.Osamoto		������������˽�ʣ�����å����ɲ�
// 2015/05/01 Y.Matsukawa	���֥�&����OMNI���ѺǴ�긡��
// 2015/05/13 N.Wada		�������������� �Ұ��ֹ�μ㤤���Ϣ�֤�Ĥ���
// 2015/05/14 Y.Matsukawa	cond��nmap/shop_dtl��ľ�ܵ��ҡ�cond.htm̤���ѡ˥⡼��
// 2015/05/19 Y.Matsukawa	���Զ�罤����msg.htm��nlist.htm��hidden��cond���Ϥ�ʤ�
// 2015/05/26 N.Wada		���ٷ��ٴ������פν�ʣ��������ο᤭�Ф���ε���������ɽ���ȹ�碌��
// 2015/07/10 Y.Uesugi		ʮ�Ф���ɽ���ʥ���ץ�ץ��ξ�硢��������˥����������ƤƤ�ʮ�Ф�ɽ�����ʤ���
// 2015/09/17 F.Yokoi		������������˥ޥ��������Ȼ���ʮ�Ф���������������ɲ�
// 2015/09/30 Y.Uesugi		Ź�޸����Ǿ������ɲ�
// 2015/11/27 H.Yasunaga	��󥻥�ե����޸����������ޥ���
// 2015/12/04 F.Yokoi		Ź�ް����Ͽ�ɽ������Ǥ�դΥ���������ꤹ��
// 							Ź�޾ܺ٤ΰ����Ǽ�ʬ���Ȥ�ɽ������
// 2016/01/18 Y.Uesugi		Ź�ް����Ͽ�ɽ�������濴�����ɽ������
// 2016/01/22 H.Yasunaga	711map�˥å�������������ޥ���
// 2016/01/28 H.Yasunaga	711map�˥å�������������ޥ��� �̼�ɽ���Զ�罤��
// 2016/02/24 Y.Matsukawa	��Υ��Ϣ�֤�Ʊ����֤�ޤȤ��
// 2016/03/14 Y.Matsukawa	�᤭�Ф���ʣ���ꥹ�ȡˤ�Ϣ��ɽ��
// 2016/04/21 H.Osamoto		�̼ܤˤ�륢������ɽ���������
// 2016/06/30 N.Wada		�������������� ������������ID���ѹ����б�
// 2016/07/11 H.Yasunaga	711OMNI2(Ź�ޥ���)�ѥ������ޥ���
// 2016/08/22 H.Yasunaga	711OMNI2(Ź�ޥ���)�ѥ������ޥ��� �᤭�Ф��Ĥ��륤�٥���ɲ�
// 2016/09/16 T.Yoshino		�Ƹ������˿᤭�Ф�����
// 2016/10/31 H.Osamoto		Ź�ް����Ͽ�ɽ�����ˤ��Զ���б�
// 2016/12/12 H.Yasunaga	��ޥȥ�å����б� �᤭�Ф��Ѥ�msg.htm�ؤΥꥯ�����Ȥ˥ѥ�᡼������Ϳ����
// 2017/03/27 H.Yasunaga	����͹�إ������ޥ���
// 2017/04/19 H.Yasunaga	����͹�إ������ޥ���
// ------------------------------------------------------------
require_once('/home/emap/src/p/inc/define.inc');
require_once('/home/emap/src/p/inc/act_get_parm.inc');
?>

//var ZdcEmapKyotenId = null;
//if (typeof ZdcKyotenId == 'function') {
//	ZdcEmapKyotenId = new ZdcKyotenId();
//}

<?php // add 2012/02/08 Y.Matsukawa
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
ZdcEmapCondOpts[<?php echo $i; ?>][<?php echo $n; ?>] = "<?php echo $op[0]; ?>";
<?php
			}
// add 20150216 F.Yokoi [
		} else if ($cnd['type'] == 'TXT') {
?>
ZdcEmapCondVal[<?php echo $i; ?>] = "<?php echo $cnd['val']; ?>";
<?php
// add 20140216 F.Yokoi ]
// add 2015/03/30 H.Osamoto [
		} else if ($cnd['type'] == 'TXTMULTI') {
?>
ZdcEmapCondVal[<?php echo $i; ?>] = "<?php echo $cnd['val']; ?>";
<?php
// add 2015/03/30 H.Osamoto ]
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
var ZdcEmapCondAppend = new Array();	<?php // add 2013/02/01 K.Masuda ?>
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

<?php
// add 2014/10/06 Y.Matsukawa
//-------------------------------------------------------------
// Ϣ�֥����������
// �����
// ZdcEmapSeqIconInfo["010"] = {
//     width:24,
//     height:24,
//     textColor:"#000000",
//     fontWeight:"bold",
//     fontFamily:"Century",
//     borderColor:"#000000",
//     borderWidth:1,
//     circle:1,
//     backgroundColor:"white"
// }
//-------------------------------------------------------------
?>
var ZdcEmapSeqIconInfo = new Array();
<?php
if (is_array($D_SEQ_ICON_INFO) && count($D_SEQ_ICON_INFO)) {
	foreach ($D_SEQ_ICON_INFO as $k=>$a) {
?>
ZdcEmapSeqIconInfo["<?php echo $k; ?>"] = {
	<?php if($a['img']) { ?>img:"<?php echo $a['img']; ?>",<?php } ?>
	width:<?php echo $a['width']; ?>,
	height:<?php echo $a['height']; ?>,
	textColor:"<?php echo $a['textColor']; ?>",
	fontWeight:"<?php echo $a['fontWeight']; ?>",
	fontFamily:"<?php echo $a['fontFamily']; ?>",
	fontSize:"<?php echo $a['fontSize']; ?>",
	borderColor:"<?php echo $a['borderColor']; ?>",
	<?php if($a['borderWidth']) { ?>borderWidth:<?php echo $a['borderWidth']; ?>,<?php } ?>
	<?php if($a['circle']) { ?>circle:<?php echo $a['circle']; ?>,<?php } ?>
	backgroundColor:"<?php echo $a['backgroundColor']; ?>"
};
<?php
	}
}
?>

//-------------------------------------------------------------
//���������ط�
//-------------------------------------------------------------
var ZdcEmapNearShop = new ZdcNearShop();
var ZdcEmapSearchPoint = null;//�����������֤��ݻ�
var ZdcEmapSearchScale = null;//���������̼ܤ��ݻ�
var ZdcEmapSearchFirst = null;//���ַ����κǽ�θ������ݤ�
var ZdcEmapSearchFirstCstm = null;	<?php //�ǽ�θ������ݤ��������ޥ����ѥե饰	// add 2013/05/22 H.osamoto ?>
var ZdcEmapSearchFirstPrint = null;	<?php //�ǽ�θ����ΰ������ݤ�	// add 2015/03/30 N.Wada ?>
var ZdcEmapIconDt = new Array();<?php // add 2014/08/19 Q.Dai?>
var ZdcEmapSearchCenter = null;	<?php // add 2014/12/08 Y.Matsukawa ?>

//��������
function ZdcEmapSearchSet(lat,lon,notmove) {
	//ZdcEmapShopDetailClose();
	//�ޥåװ�ư
	ZdcEmapSearchEventStop();
	<?php //var center = new ZDC.LatLon(Number(lat), Number(lon));		mod 2014/12/08 Y.Matsukawa ?>
	ZdcEmapSearchCenter = new ZDC.LatLon(Number(lat), Number(lon));
	var latlon = ZdcEmapMapObj.getLatLon();
	<?php //if (!notmove) ZdcEmapMapObj.moveLatLon(center);		mod 2014/12/08 Y.Matsukawa ?>
	if (!notmove) ZdcEmapMapObj.moveLatLon(ZdcEmapSearchCenter);
	//if(<?PHP echo $D_INIT_LVL_SEARCH; ?> > 0) ZdcEmapMapObj.setZoom(<?PHP echo $D_INIT_LVL_SEARCH; ?>);
	if(<?PHP echo $D_INIT_LVL_CSTM; ?> > 0) ZdcEmapMapObj.setZoom(<?PHP echo $D_INIT_LVL_CSTM; ?>);		<?php // add 2013/05/14 H.Osamoto ?>
	<?php
	// �������֤˥ޡ�����ɽ��		add 2014/11/28 Y.Matsukawa
	if ($D_SEARCH_MAP_ICON) {
	?>
	ZdcEmapSearchMapIcon(ZdcEmapSearchCenter);
	<?php
	}
	?>
	<?php
	// add 2015/05/01 Y.Matsukawa [
	// ���֥�&����OMNI���ѺǴ�긡��
	if ($D_711OMNI_INIT_RAD) {	// ����ϰ�(800m)��SEJ��1��ʾ夢��Ф����ϰϤǸ������ʤ���д���(5km)���Ͽ��ϰϤǸ���
	?>
		ZdcEmapMapObj.setHome(ZdcEmapSearchCenter);
		ZdcEmap711omniSearchShopStart(<?php echo $D_711OMNI_INIT_RAD; ?>);
		return;
	<?php
	} else if ($D_711OMNI_ALT_RAD) {	// ��������ʤ��ξ��ϡ��ǽ餫�����(5km)���Ͽ��ϰϤǸ���
	?>
		ZdcEmapMapObj.setHome(ZdcEmapSearchCenter);
		var latlons = ZdcEmapGetPointsByRad(ZdcEmapSearchCenter, <?php echo $D_711OMNI_ALT_RAD; ?>)
		var zi = ZdcEmapMapObj.getAdjustZoom(latlons, {fix:true});
		ZdcEmapMapObj.setZoom(zi.zoom);
		ZdcEmapSearchFirst = 0;		<?php //�Ͽ��ϰϤ򸡺� ?>
		ZdcEmapSearchShopStart();
		return;
	<?php
	}
	// add 2015/05/01 Y.Matsukawa ] ?>
	//��������
	ZdcEmapSearchFirst = 1;
	ZdcEmapSearchPoint = null;//ɬ���Ƹ��������뤿��
	ZdcEmapSearchShopStart();
	<?php //ZdcEmapMapObj.setHome(center);		mod 2014/12/08 Y.Matsukawa ?>
	ZdcEmapMapObj.setHome(ZdcEmapSearchCenter);
}
//��������
function ZdcEmapSearchShopClick() {
	if(ZdcEmapButtonNG()) return;
	ZdcEmapSearchPoint = null;//ɬ���Ƹ��������뤿��
	ZdcEmapSearchShop();
}
function ZdcEmapSearchShopStart() {
	if(ZdcEmapMapObj.ZdcEmapMode != "print") ZdcEmapSearchClickFlg = 1;
	<?php
	// add 2015/05/01 Y.Matsukawa [
	// ���֥�&����OMNI���ѺǴ�긡���ξ�硢�̼�Ĵ�����ʤ�
	if ($D_711OMNI_ALT_RAD) {
	?>
		ZdcEmapSearchClickFlg = 0;
	<?php
	}
	// add 2015/05/01 Y.Matsukawa ] ?>
	ZdcEmapSearchPoint = null;//ɬ���Ƹ��������뤿��
	// del 2011/12/19 Y.Matsukawa [
	//	ZdcEmapSearchEventAdd("ZdcEmapSearchShop()");
	//	ZdcEmapSearchEventStart();
	// del 2011/12/19 Y.Matsukawa ]
	ZdcEmapSearchEventStop();		// add 2011/12/19 Y.Matsukawa
	//�����ʳ��Υ�������򥯥ꥢ
	for( i = 0;i < ZdcEmapMapPoiMrkCnt;i ++) {
		if (ZdcEmapMapPoiMrkId[i]) {		<?php // add 2012/03/16 Y.Matsukawa ?>
			ZdcEmapMapObj.removeWidget(ZdcEmapMapPoiMrkId[i]);
			ZdcEmapMapPoiMrkId[i] = null;
		}
	}
	ZdcEmapMapPoiMrkCnt = 0;
	//���̤��ڤ��ؤ���
	<?php //if(ZdcEmapCondObj.mode != "cond") {		mod 2015/05/14 Y.Matsukawa ?>
	if(ZdcEmapCondObj.mode != "cond" && <?php echo ($D_COND_STATIC ? "false":"true"); ?>) {
		ZdcEmapSearchShopClose();//�����ʳ��Υꥹ�Ȥ�ä�
		//var url = "<?PHP echo $D_DIR_BASE_L; ?>cond.htm?cid=<?PHP echo $cid; ?>";
		var url = "<?PHP echo $D_DIR_BASE_L; ?>cond.htm?";
		//for(i = 1;i <= 200;i ++) if(ZdcEmapSaveCond[i]) url = url + "&cond"+i+"="+ZdcEmapSaveCond[i];//�ʹ����
		//<?php if(isset($condprm) && $condprm != '') { ?>url += "&<?php echo $condprm; ?>";<?php } ?>		mod 2014/02/05 Y.Matsukawa
		<?php if(isset($condprm_js) && $condprm_js != '') { ?>url += "&<?php echo $condprm_js; ?>";<?php } ?>
		//url += "&<?php echo $P_FREEPARAMS; ?>";		mod 2014/02/05 Y.Matsukawa
		url += "&<?php echo $P_FREEPARAMS_JS; ?>";
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
//�����ᥤ�����
function ZdcEmapSearchShop() {
	ZdcEmapStationCircle();		// ���ձؤ���α�����		add 2014/10/08 Y.Matsukawa
	ZdcEmapReadOn();
	//���֡��ϰϼ���
	var ZdcEmapSearchMapCenterAddr = ZdcEmapMapObj.getLatLon();
	var p = ZdcEmapMapObj.getLatLon();
	var box = ZdcEmapMapObj.getLatLonBox();
	var boxmin = box.getMin();
	var boxmax = box.getMax();
	if(ZdcEmapSearchPoint != null && <?PHP echo $D_SHOP_SEARCHPIX; ?> == -1) {
		//��ư�Ƹ������ʤ�
		ZdcEmapReadOff();
		return;
	}
	//��ư�������٥�����
	ZdcEmapSearchEventStop();
	//�ʤ���߾�����
	cond = ZdcEmapGetCond();
	ZdcEmapCondDisabled();<?php // add 2015/04/23 H.Osamoto ?>
	//
	var opts = new ZdcNearShopOptions();
	//opts.cid='<?PHP echo $D_CID; ?>';		mod 2011/12/05 Y.Matsukawa
	opts.cid='<?PHP echo $D_DATA_CID; ?>';
	opts.lat = p.lat;
	opts.lon = p.lon;
	<?PHP //if(ZdcEmapSearchFirst != 1) {	mod 2013/05/14 H.Osamoto ?>
	if((ZdcEmapSearchFirst != 1) || (<?PHP echo $D_INIT_LVL_CSTM; ?> > 0)) {
		//opts.latlon = box.min.lat+","+box.min.lon+","+box.max.lat+","+box.max.lon;
		<?php
		// add 2015/03/30 N.Wada [
		if(isset($D_NMAP_PRINT_CNT_FIX) && $D_NMAP_PRINT_CNT_FIX && isset($arealatlon) && $arealatlon) {
			// �Ǵ���̤����Ϥ��줿�Ͽ��ϰϤ�Ȥ�
		?>
		opts.latlon = "<?php echo $arealatlon; ?>";
		<?php
		} else {
		?>
		opts.latlon = boxmin.lat+","+boxmin.lon+","+boxmax.lat+","+boxmax.lon;
		<?php
		}
		// add 2015/03/30 N.Wada ]
		?>
		opts.radius = <?PHP echo $D_SHOP_RAD_RE; ?>;
		ZdcEmapSearchFirstPrint = 0;	<?php // add 2015/03/30 N.Wada ?>
	} else {
		ZdcEmapSearchFirst = 0;
		<?php // add 2013/05/22 H.Osamoto [ ?>
		<?php if (isset($D_RESEARCH_CNT) && $D_RESEARCH_CNT) { ?>
		ZdcEmapSearchFirstCstm = 1;
		opts.researchCount = <?PHP echo $D_RESEARCH_CNT; ?>;
		<?php } ?>
		<?php // add 2013/05/22 H.Osamoto ] ?>
		opts.radius = <?PHP echo $D_SHOP_RAD; ?>;
		ZdcEmapSearchFirstPrint = 1;	<?php // add 2015/03/30 N.Wada ?>

		<?php
		// add 2016/01/28 H.Yasunaga [
		// 711map�˥å��󥫥����ޥ���
		// 1/15000�Ǹ��������뤿���radius�������ʤ����Ͽޤ��ϰϤ���ꤹ��
		if ($D_711NISSEN_FIX_ZOOM) { ?>
			opts.radius = 0;
			opts.latlon = boxmin.lat+","+boxmin.lon+","+boxmax.lat+","+boxmax.lon;
		<?php
		// add 2016/01/28 H.Yasunaga ]
		} ?>

	}
	opts.jkn = cond;
	opts.pos = 1;
	opts.minCount = <?PHP echo $D_SHOP_MIN; ?>;	<?php // add 2015/09/30 Y.Uesugi ?>
	opts.maxCount = <?PHP echo $D_SHOP_MAX; ?>;
	opts.limitCount = <?PHP echo $D_SHOP_MAX; ?>;
	opts.timeout = <?PHP echo $D_AJAX_TIMEOUT; ?>;
	<?PHP //if ($D_SHOP_LIST_NO_DTLSHOP) {		del 2012/01/10 Y.Matsukawa ?>
	if (ZdcEmapMapShopDetailMrkId != null) {
		// �ܺ�ɽ����ε���ID
		var mrk = ZdcEmapMapShopDetailMrkId;
		if (mrk && mrk.data1) opts.exceptKid = mrk.data1;
	}
	<?PHP //}		del 2012/01/10 Y.Matsukawa ?>
	// add 2011/12/27 H.osamoto [
	if ("<?PHP echo $D_TYPE_SMSG; ?>") {
		if ("<?PHP echo $exkid; ?>" != "") {
			opts.exceptKid = "<?php echo $exkid; ?>";
		}
	}
	// add 2011/12/27 H.osamoto ]
	<?php // add 2015/03/26 H.osamoto [ ?>
	if ("<?php echo $pexkid; ?>" != "") {
		opts.exceptKid = "<?php echo $pexkid; ?>";
	}
	<?php // add 2015/03/26 H.osamoto ] ?>
<?php
	// add 2012/11/13 Y.Matsukawa [
	if (isset($D_NKYOTEN_CUST) && $D_NKYOTEN_CUST != '') {
?>
	opts.cust = "<?php echo $D_NKYOTEN_CUST; ?>";
<?php
	}
	// add 2012/11/13 Y.Matsukawa ]
?>
<?php
	// add 2013/08/02 Y.Matsukawa [
	// Ǥ����������Ǥ���ϰϳ��ε��������
	if(isset($D_SHOP_EXAREA)) {
?>
	opts.exarea = "<?php echo $D_SHOP_EXAREA['lat'].','.$D_SHOP_EXAREA['lon'].','.$D_SHOP_EXAREA['rad']; ?>";
<?php
	}
	// add 2012/11/13 Y.Matsukawa ]
?>
<?php
	// add 2014/02/21 H.Osamoto [
	if (isset($D_POLY_COL) && $D_POLY_COL != '') {
?>
	opts.polycol = "<?php echo $D_POLY_COL; ?>";
<?php
	}
	// add 2014/02/21 H.Osamoto ]
?>

	// add 2016/01/18 Y.Uesugi [
	// �����濴���֤ν���ɽ��
	<?php
	if (isset($D_DISP_CENTER_ADDR) && $D_DISP_CENTER_ADDR != '') {
	?>
	ZdcEmapSetMapCenterAddr(callbackCenterAddr);
	<?php
	}
	?>
	// add 2016/01/18 Y.Uesugi ]

	ZdcEmapNearShop.opts = opts;
	
	//�ꥹ�Ȥ�ɽ������
	ZdcEmapSearchShopList(0);
	//���������ɽ������
	ZdcEmapNearShop.search(opts,ZdcEmapSearchShopResult);
}

//�ʤ���߾���Ȥ�Ω��
var ZdcEmapCondParms = "";	<?php // add 2012/01/31 Y.Matsukawa ?>
function ZdcEmapGetCond() {
	var cond="";
	var condArr=new Array();
	ZdcEmapCondParms = "";	<?php // add 2012/01/31 Y.Matsukawa ?>
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
						ZdcEmapCondParms += "&cond"+condno+"=1";	<?php // add 2012/01/31 Y.Matsukawa ?>
						<?php //chk[chkcnt] = obj.value;	del 2012/02/08 Y.Matsukawa ?>
						chk[chkcnt] = ZdcEmapCondVal[condno];	<?php // add 2012/02/08 Y.Matsukawa ?>
						all[allcnt] = chk[chkcnt]; allcondno[allcnt] = condno; allcnt++;
						chkcnt ++;
					}
					break;
				case "select-one":
					if(obj.options[obj.selectedIndex].value) {
						<?php // add 2012/01/31 Y.Matsukawa [ ?>
						<?php // mod 2012/10/15 K.Masuda [ ?>
						//var n = obj.selectedIndex + 1;
						//ZdcEmapCondParms += "&cond"+condno+"="+n;
						if("<?php echo $SELECT_OPTION_VAL; ?>" != ""){
							ZdcEmapCondParms += "&cond"+condno+"="+obj.value;
						} else {
							var n = obj.selectedIndex + 1;
							ZdcEmapCondParms += "&cond"+condno+"="+n;
						}
						<?php // mod 2012/10/15 K.Masuda ] ?>
						<?php // add 2012/01/31 Y.Matsukawa ] ?>
						<?php //col[colcnt] = obj.options[obj.selectedIndex].value;		del 2012/02/08 Y.Matsukawa ?>
						col[colcnt] = ZdcEmapCondOpts[condno][obj.options[obj.selectedIndex].value];	<?php // add 2012/02/08 Y.Matsukawa ?>
						if (col[colcnt] != '') {	<?php // add 2012/02/08 Y.Matsukawa ?>
							all[allcnt] = col[colcnt]; allcondno[allcnt] = condno; allcnt++;
							colcnt ++;
						}
					}
					break;
				case "radio":
					if(obj.checked == true && obj.value) {
						<?php // add 2012/01/31 Y.Matsukawa [ ?>
						var radios = eval("document.ZdcEmapCondForm."+obj.name);
						if (radios) {
							<?php
							// del 2014/12/18 Y.Matsukawa [
							//for (i = 0; i < radios.length; i++){
							//	if (radios[i].value == obj.value) {
							//		var n = i + 1;
							//		ZdcEmapCondParms += "&cond"+condno+"="+n;
							//	}
							//}
							// del 2014/12/18 Y.Matsukawa ]
							?>
							ZdcEmapCondParms += "&cond"+condno+"="+obj.value;	<?php // add 2014/12/18 Y.Matsukawa ?>
						}
						<?php // add 2012/01/31 Y.Matsukawa ] ?>
						<?php //col[colcnt] = obj.value;	del 2012/02/08 Y.Matsukawa ?>
						col[colcnt] = ZdcEmapCondOpts[condno][obj.value];	<?php // add 2012/02/08 Y.Matsukawa ?>
						if (col[colcnt] != '') {	<?php // add 2012/02/08 Y.Matsukawa ?>
							all[allcnt] = col[colcnt]; allcondno[allcnt] = condno; allcnt++;
							colcnt ++;
						}
					}
					break;
				case "text":
					if(obj.value) {
						<?php // mod 2015/03/30 H.Osamoto [ ?>
						if(ZdcEmapCondType[condno] == 'TXTMULTI' ) {
							ZdcEmapCondParms += "&cond"+condno+"="+encodeURIComponent(obj.value);
							col[colcnt] = ZdcEmapCondVal[condno].replace(/@@@val@@@/g, obj.value);
							all[allcnt] = col[colcnt]; allcondno[allcnt] = condno; allcnt++;
							colcnt ++;
						} else {
						<?php // mod 2015/03/30 H.Osamoto ] ?>
						<?php // mod 2015/02/16 F.Yokoi [ ?>
						<?php // �������� ?>
						if(obj.className == 'cond') {
							ZdcEmapCondParms += "&cond"+condno+"="+obj.value;
							col[colcnt] = ZdcEmapCondVal[condno]+obj.value;
							all[allcnt] = col[colcnt]; allcondno[allcnt] = condno; allcnt++;
							colcnt ++;
						<?php // ��ʬ���ס�Ǥ�ե�����		add 2015/03/16 Y.Matsukawa ?>
						} else if (ZdcEmapCondVal[condno] && ZdcEmapCondVal[condno].indexOf(":FW:") > 0) {
							ZdcEmapCondParms += "&cond"+condno+"="+encodeURIComponent(obj.value);
							col[colcnt] = ZdcEmapCondVal[condno]+"'"+obj.value+"'";
							all[allcnt] = col[colcnt]; allcondno[allcnt] = condno; allcnt++;
							colcnt ++;
						<?php // ������ӡ�Ǥ�ե�����		add 2015/03/30 H.Osamoto ?>
						} else if (ZdcEmapCondVal[condno] && ZdcEmapCondVal[condno].indexOf(":NUMB:") > 0) {
							ZdcEmapCondParms += "&cond"+condno+"="+encodeURIComponent(obj.value);
							col[colcnt] = ZdcEmapCondVal[condno]+"'"+obj.value+"'";
							all[allcnt] = col[colcnt]; allcondno[allcnt] = condno; allcnt++;
							colcnt ++;
						<?php // ��ʬ���סʥե꡼��ɡ� ?>
						} else {
							fw[fwcnt] = "FREE_SRCH:FW:"+"'"+obj.value+"'";
							all[allcnt] = fw[fwcnt]; allcondno[allcnt] = condno; allcnt++;
							fwcnt ++;
						}
						<?php // mod 2015/02/16 F.Yokoi ] ?>
						<?php // mod 2015/03/30 H.Osamoto [ ?>
						}
						<?php // mod 2015/03/30 H.Osamoto ] ?>
					}
					break;
				case "button":
					break;
				default:
					if(obj.value) {
						ZdcEmapCondParms += "&cond"+condno+"=1";	<?php // add 2015/05/19 Y.Matsukawa ?>
						<?php //col[colcnt] = obj.value;	del 2012/02/08 Y.Matsukawa ?>
						col[colcnt] = ZdcEmapCondVal[condno];	<?php // add 2012/02/08 Y.Matsukawa ?>
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
		// del 2012/02/08 Y.Matsukawa [
		//		// ���롼�ԥ�����ʤ��ʴ�¸ư���
		//		} else {
		//			// checkbox
		//			for(var i = 0;i < chkcnt;i ++) {
		//				if(cond) cond += " <?PHP echo $D_SHOP_COND; ?> ";
		//				cond += chk[i];
		//			}
		//			if(cond) cond = "("+cond+")";
		//			// select-one,radio,����¾
		//			for(var j = 0;j < colcnt;j ++) {
		//				if(cond) cond += " <?PHP echo $D_SHOP_COND_COL; ?> ";
		//				cond += "("+col[j]+")";
		//			}
		//			// text
		//			for(var k = 0;k < fwcnt;k ++) {
		//				if(cond) cond += " <?PHP echo $D_SHOP_COND_COL; ?> ";
		//				cond += fw[k];
		//			}
		// del 2012/02/08 Y.Matsukawa ]
		}
	}
	<?php // add 2013/02/01 K.Masuda [ ?>
	if(typeof ZdcEmapCondAppend[0] !== 'undefined'){
		if( ZdcEmapCondAppend[0] != ''){
			if(cond != ''){
				cond = '('+cond+') '+ZdcEmapCondAppend[1]+' '+ZdcEmapCondAppend[0];
			} else {
				cond = ZdcEmapCondAppend[0];
			}
		}
	}
	<?php // add 2013/02/01 K.Masuda ] ?>
	return cond;
}

var Nsnet01EmpnoSeq = null;		<?php // add 2016/03/14 Y.Matsukawa ?>
<?php
// add 2016/06/30 N.Wada [
// Ϣ���դ�������������ID�Ѵ�ɽ
if ( isset($D_NSNET01_EMPNO_SEQ_ICON) && $D_NSNET01_EMPNO_SEQ_ICON ) {
	printf("var Nsnet01EmpnoSeqIconIdConv = new Array();");
	foreach ( $D_NSNET01_EMPNO_SEQ_ICON_ID_CONV as $key => $val ) {
		printf("Nsnet01EmpnoSeqIconIdConv['%s'] = '%s';",$key,$val);
	}
}
// add 2016/06/30 N.Wada [
?>
//----------------------------------------------------------------------------------
//
// ZdcEmapSearchShopResult
//
// �Ǵ����������̤ν���
//
//----------------------------------------------------------------------------------
function ZdcEmapSearchShopResult(result) {
	var i,item,mrk,tmp,icnt,maxlat=0,maxlon=0,minlat=999999999,minlon=999999999;
	function setLatLon(lat, lon){
		this.lat  = lat;
		this.lon = lon;
	}
	latlons = new Array();
	//�ޡ��������
	if(ZdcEmapMapShopMrkCnt != null) {
		for( i = 0;i < ZdcEmapMapShopMrkCnt;i ++) {
			if (ZdcEmapMapShopMrkId[i]) {		<?php // add 2012/03/16 Y.Matsukawa ?>
				ZdcEmapMapObj.removeWidget(ZdcEmapMapShopMrkId[i]);
				ZdcEmapMapShopMrkId[i] = null;
			}
		}
	}
	ZdcEmapMapShopMrkCnt = 0;
	//���顼����
	if(result.status != 0 && result.status != 3 && result.status != 5 && result.status != 9) {
		alert("<?PHP echo $D_MSG_ERR_JS_RESULT; ?> listres["+result.status+"]");
		ZdcEmapCondEnabled();	<?php // add 2015/04/23 H.Osamoto ?>
		ZdcEmapSearchEventStart();
		ZdcEmapSearchShopClose();
		ZdcEmapReadOff();
		return;
	}
	<?php
	// add 2015/03/18 N.Wada [
	// ���ٷ��٤��������פ��������Ĵ��
	if ( $D_KYO_ICON_OVERLAP == 2 ) {
	?>
	var ic,tmpic;
	IconGrp = new Array();
	icnt = result.items.length;
	for(ic=icnt-1; ic>=0; ic--){
		IconGrp[ic] = result.items[ic].id;
		for(tmpic=icnt-1; tmpic>=0; tmpic--){
			if( tmpic == ic ){ continue; }
			if( result.items[ic].lat == result.items[tmpic].lat && result.items[ic].lon == result.items[tmpic].lon ) {
				IconGrp[ic] += "," + result.items[tmpic].id;
			}
		}
	}
	<?php
	}
	// add 2015/03/18 N.Wada ]
	?>
	<?php
	// add 2016/02/24 Y.Matsukawa [
	// Ϣ�֥�������Ʊ��������ޤȤ��
	if ($D_LAYER_SEQ_ICON && $D_LAYER_SEQ_SAMEPOINT_CLUSTER) {
	?>
	icnt = result.items.length;
	var pre = {lat:0, lon:0};
	var lseq = 0;
	for(var ii = 0; ii < icnt; ii++){
		var crr = result.items[ii];
		if (crr.lat != pre.lat || crr.lon != pre.lon) {
			lseq++;
			pre.lat = crr.lat;
			pre.lon = crr.lon;
		}
		result.items[ii].lseq = lseq;
	}
	<?php
	}
	// add 2016/02/24 Y.Matsukawa ]
	?>
	<?php
	// add 2012/01/11 N.Wada [
	// ɽ������Ź�ޤ�����
	if ( isset($D_SHOP_RAD_SCREENING) && $D_SHOP_RAD_SCREENING ) {
		// �ꥹ����ˤϵ�Υ���ᤤ���Ź�ޤ���Ǽ����Ƥ�������ǽ�����Ԥ�
		// ���르�ꥺ���nlist.htm�ȹ�碌�Ƥ�������
	?>
	var shop_cnt_total = 0;
	var shop_cnt_in = 0;
	var shop_cnt_out = 0;
	icnt = result.items.length;
	for(i=0; i<icnt; i++) {
		item = result.items[i];
		if( item.dist <= parseFloat(<?PHP echo $D_SHOP_RAD_INSIDE; ?>) ) {
			if( shop_cnt_in == <?PHP echo $D_SHOP_RAD_PTN1_IN; ?> ) break;
			shop_cnt_in++;
		} else if( item.dist <= parseFloat(<?PHP echo $D_SHOP_RAD_OUTSIDE; ?>) ) {
			if( shop_cnt_in == <?PHP echo $D_SHOP_RAD_PTN1_IN; ?> ) break;
			if( shop_cnt_in == <?PHP echo $D_SHOP_RAD_PTN2_IN; ?> ) break;
			if( shop_cnt_in == <?PHP echo $D_SHOP_RAD_PTN3_IN; ?> && shop_cnt_out == <?PHP echo $D_SHOP_RAD_PTN3_OUT; ?> ) break;
			if( shop_cnt_out == <?PHP echo $D_SHOP_RAD_PTN4_OUT; ?> ) break;
			shop_cnt_out++;
		} else {
			break;
		}
	}
	shop_cnt_total = shop_cnt_in + shop_cnt_out;
	<?php
	}
	// add 2012/01/11 N.Wada ]
	?>
	<?php
	// add 2015/05/13 N.Wada [
	// �������������� �Ұ��ֹ�μ㤤���Ϣ�֤�Ĥ���
	if ( isset($D_NSNET01_EMPNO_SEQ_ICON) && $D_NSNET01_EMPNO_SEQ_ICON ) {
	?>
	var Nsnet01EmpnoColName = new Array();
	<?php
		foreach( $D_NSNET01_EMPNO_COL as $key=>$val) {
			printf("Nsnet01EmpnoColName['%s'] = '%s';\n",$key,$val["name"]);
		}
	?>
	var tmpAry = new Array(), empnoSeq = new Array();
	var job = document.nsnet01Form.job.value;
	var empnoCol = ((typeof Nsnet01EmpnoColName[job] != 'undefined') ? Nsnet01EmpnoColName[job] : Nsnet01EmpnoColName[1]);
	var seq = 0, idx, empno, empno_prev;
	icnt = result.items.length;
	for(i=0; i<icnt; i++) {
		tmpAry.push({idx: i, empno: result.items[i][empnoCol]});
	}
	tmpAry.sort(function(a,b){return a.empno-b.empno;});
	icnt = tmpAry.length;
	for(i=0; i<icnt; i++) {
		empno = tmpAry[i].empno;
		idx = tmpAry[i].idx;
		if(empno) {
			if(empno != empno_prev) seq++;
			empnoSeq[idx] = seq;
			empno_prev = empno;
		} else {
			empnoSeq[idx] = <?php echo $D_NSNET01_EMPNO_EMPTY_SEQ; ?>;
		}
	}
	<?php
	}
	// add 2015/05/13 N.Wada ]
	?>
	ZdcEmapSearchFirstCstm = 0;	<?php //add 2013/05/22 H.osamoto ?>
	Nsnet01EmpnoSeq = new Object();		<?php // add 2016/03/14 Y.Matsukawa ?>
	//�Ͽޤ��֤�
	icnt = result.items.length;
	for (i=icnt-1; i>=0; i--) {
	<?php
	// add 2012/01/11 N.Wada [
	if ( isset($D_SHOP_RAD_SCREENING) && $D_SHOP_RAD_SCREENING ) {
		// ɽ��������Ź�޿���Ķ�������ϡ�ɽ�����ʤ��褦���������Ф�
	?>
		if( i >= shop_cnt_total ) continue;
	<?php
	}
	// add 2012/01/11 N.Wada ]
	?>
		<?php
		// del 2014/04/28 H.osamoto [
		//	// add 2012/01/18 H.osamoto [
		//	if ( isset($D_DIST_ABS) && $D_DIST_ABS ) {
		//		// ɽ��������Ź�޿���Ķ�������ϡ�ɽ�����ʤ��褦���������Ф�
		//	?>
		//			if( <?PHP echo $D_DIST_ABS; ?> < result.items[i].dist ) continue;
		//	<?php
		//	}
		//	// add 2012/01/18 H.Osamoto ]
		// del 2014/04/28 H.osamoto ]
		?>
		// add 2012/01/18 H.osamoto ]
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
		<?php 
		// 2015/03/18 N.Wada add [
		// Ϣ�֥�������������
		if ($D_LAYER_SEQ_ICON) { 
		?>
		<?php	// add 2016/02/24 Y.Matsukawa [
				// Ʊ������Ź�ޤ�Ϣ�֤�ޤȤ��
				if ($D_LAYER_SEQ_SAMEPOINT_CLUSTER) { ?>
			var lseq = item.lseq;
		<?php	} else { ?>
			var lseq = i + 1;
		<?php	}
				// add 2016/02/24 Y.Matsukawa ] ?>
			<?php //tmp = '< ?php echo $D_LAYER_SEQ_ICON_NAME; ? >'+(i+1)+'< ?php echo $D_LAYER_SEQ_ICON_EXT; ? >';		mod 2016/02/24 Y.Matsukawa ?>
			tmp = '<?php echo $D_LAYER_SEQ_ICON_NAME; ?>'+lseq+'<?php echo $D_LAYER_SEQ_ICON_EXT; ?>';
			tmp_w = '<?php echo $D_LAYER_SEQ_ICON_W; ?>';
			tmp_h = '<?php echo $D_LAYER_SEQ_ICON_H; ?>';
			tmp_ox = '<?php echo $D_LAYER_SEQ_ICON_OX; ?>';
			tmp_oy = '<?php echo $D_LAYER_SEQ_ICON_OY; ?>';
		<?php 
		}
		// 2015/03/18 N.Wada add ]
		?>
		//����Ǿ����ٷ��ټ���
		if(item.lat > maxlat) maxlat = item.lat;
		if(item.lon > maxlon) maxlon = item.lon;
		if(item.lat < minlat) minlat = item.lat;
		if(item.lon < minlon) minlon = item.lon;
		
		// 2012/09/19 H.Osamoto add [
		icn_img = ZdcEmapIconImg[item.icon];
		icn_num = i + 1;
		//	if ("<?PHP echo $D_NUM_ICON; ?>" && result.options.exceptKid == "") {	mod 2012/11/06 H.Osamoto
		if ("<?PHP echo $D_NUM_ICON; ?>" && "<?PHP echo $detailflg; ?>" != 1 &&  "<?PHP echo $printflg; ?>" != 1) {
			//	icn_img = "<?PHP echo $D_DIR_BASE_G; ?>"+"img/icon_num/icon_num_"+icn_num+".gif";	mod 2013/04/19 H.Osamoto
			icn_img = "<?PHP echo $D_NUM_ICON_GIF; ?>"+icn_num+".gif";
		// 2013/03/12 H.Osamoto add [
		} else if ("<?PHP echo $num_icon_p; ?>") {
			//	icn_img = "<?PHP echo $D_DIR_BASE_G; ?>"+"img/icon_num/icon_num_"+icn_num+".gif";	mod 2013/04/19 H.Osamoto
			icn_img = "<?PHP echo $D_NUM_ICON_GIF; ?>"+icn_num+".gif";
		// 2013/03/12 H.Osamoto add ]
		}
		// 2012/09/19 H.Osamoto add ]
		<?php
		// add 2015/05/13 N.Wada [
		// �������������� �Ұ��ֹ�μ㤤���Ϣ�֤�Ĥ���
		if ( isset($D_NSNET01_EMPNO_SEQ_ICON) && $D_NSNET01_EMPNO_SEQ_ICON ) {
		?>
		<?php //icn_img = ZdcEmapIconImg[item.icon+('0'+empnoSeq[i]).slice(-2)];	// Ϣ���դ�������������ID���Ѵ� mod 2016/06/30 N.Wada ?>
		icn_img = ZdcEmapIconImg[Nsnet01EmpnoSeqIconIdConv[item.icon]+('0'+empnoSeq[i]).slice(-2)];
		Nsnet01EmpnoSeq[item.id] = empnoSeq[i];		<?php // add 2016/03/14 Y.Matsukawa ?>
		<?php 
		}
		// add 2015/05/13 N.Wada ]
		?>
		<?php 
		// add 2015/03/18 N.Wada [
		// ��ʣ�������󤬤���к����ؤ���
		if ($D_KYO_ICON_OVERLAP == 2 && $D_KYO_ICON_OVERLAP_ICON_ID) {
		?>
		if (IconGrp[i].indexOf(",") >= 0) {
			icn_img = ZdcEmapIconImg[<?php echo $D_KYO_ICON_OVERLAP_ICON_ID; ?>];
		}
		<?php 
		}
		// add 2015/03/18 N.Wada ]
		?>
		// ̵���ʥ�������ID�ξ���Ʃ����������˺����ؤ�		add 2012/11/13 Y.Matsukawa
		if (icn_img == null) icn_img = ZdcEmapIconImg["@TP"];
		<?php // add 2014/10/06 Y.Matsukawa [ ?>
		<?php // Ϣ�֥�������ʥ������������Ȥ�ʤ��� ?>
		<?php if ($D_SEQ_ICON_COL) { ?>
		var icon_key = item.<?PHP echo strtolower($D_SEQ_ICON_COL); ?>;
		if (!icon_key) icon_key = "0";
		<?php } else { ?>
		var icon_key = "0";
		<?php } ?>
		var seq_icon = null;
		if (ZdcEmapSeqIconInfo[icon_key]) {
			seq_icon = ZdcEmapSeqIconInfo[icon_key];
			seq_icon.seq = i + 1;
		}
		<?php // add 2014/10/06 Y.Matsukawa [ ?>
		latlons[ZdcEmapMapShopMrkCnt] = new ZDC.LatLon(item.lat, item.lon);
		mrk = ZdcEmapMakeMrkApi2(i, item.lat, item.lon, 
								<?php 
								// 2015/03/18 N.Wada add [
								if ($D_LAYER_SEQ_ICON) { 
								// Ϣ�֥���������ղä�����
								?>
								ZdcEmapIconW[item.icon], ZdcEmapIconH[item.icon],tmp_w,tmp_h,
								ZdcEmapIconOffsetX[item.icon], ZdcEmapIconOffsetY[item.icon],tmp_ox,tmp_oy,
								<?php 
								} else {
								// 2015/03/18 N.Wada add ]
								// Ϣ�֥���������ղä��ʤ����
								?>
								ZdcEmapIconW[item.icon], ZdcEmapIconH[item.icon],ZdcEmapIconW['@NEW'],ZdcEmapIconH['@NEW'],
								ZdcEmapIconOffsetX[item.icon], ZdcEmapIconOffsetY[item.icon],ZdcEmapIconW[item.icon]-ZdcEmapIconW['@NEW'],ZdcEmapIconH[item.icon],
								<?php 
								}
								?>
								//	ZdcEmapIconImg[item.icon],tmp,	2012/09/19 H.Osamoto mod
								icn_img,tmp,
								item.id, item.icon, '', item.nflg,
								<?PHP
									// ����å�
									if($D_KYO_ICON_CLK == 1) echo "function() { ZdcEmapShopMsg(this.id, '$D_KYO_ICON_OVERLAP'); }";		// add 2014/08/19 Q.Dai
									//else if($D_KYO_ICON_CLK == 2) echo "function() { window.location.href='".$D_DIR_BASE_G."dtl/'+this.data1+'/?".($P_FREEPARAMS_ENC?'&'.$P_FREEPARAMS_ENC:'').($condprm?'&'.$condprm:'').($his?'&his='.urlencode($his):'')."'; }";		// del 2012/07/06 Y.Matsukawa
									//else if($D_KYO_ICON_CLK == 2) echo "function() { ZdcEmapShopMsgOrDetail(this.data1,this.Point.my,this.Point.mx,this.data2,this.nflg,this.lvl,this.id); }";		// add 2014/08/19 Q.Dai		mod 2014/12/14 Y.Matsukawa
									else if($D_KYO_ICON_CLK == 2) echo "function() { ZdcEmapShopDetail(this.data1); }";		// add 2014/08/19 Q.Dai
									else if($D_KYO_ICON_CLK == 3) echo "function() { ZdcEmapScrollShopList(this.data1); }";		// add 2014/11/28 Y.Matsukawa
									else echo "null"; 
								?>
								// mod 2013/01/24 K.Masuda [
								//, null
								,
								<?PHP
									// �ޥ��������С�
									if(!$D_KYO_ICON_MO) echo "null";
									if($D_KYO_ICON_MO) echo "function() { ZdcEmapShopMsg(this.id); }";
								?>
								// mod 2013/01/24 K.Masuda ]
								,item.lvl
								,seq_icon		<?php // add 2014/10/06 Y.Matsukawa ?>
								// add 2015/09/17 F.Yokoi [
								,
								<?PHP
									// �ޥ���������
									if(!$D_KYO_ICON_MOUT) echo "null";
									if($D_KYO_ICON_MOUT) echo "function() { ZdcEmapShopMsgClose(this.id); }";
								?>
								// add 2015/09/17 F.Yokoi ]
							);
		<?php // add 2016/12/12 H.Yasunaga ��ޥȥ�å����б� [ ?>
		<?php
			if (isset($D_YTC_LOCKER) && $D_YTC_LOCKER) {
		?>
			mrk.ukrtoridate = item.nohindate;
		<?php	
			}
		?>
		<?php // add 2016/12/12 H.Yasunaga ] ?>
		if (ZdcEmapMapShopMrkId[i] != null) ZdcEmapMapObj.removeWidget(ZdcEmapMapShopMrkId[i]);//ǰ�Τ���
		ZdcEmapMapObj.addWidget(mrk);
		if (mrk.userwidget) mrk.open();		<?php // add 2014/10/06 Y.Matsukawa ?>
		ZdcEmapMapShopMrkId[i] = mrk;
		ZdcEmapMapShopMrkCnt ++;
		ZdcEmapIconDt[i] = item.lat + ":" + item.lon + ":" + ZdcEmapIconW[item.icon] + ":" + ZdcEmapIconH[item.icon];<?php // add 2014/08/19 Q.Dai?>
	}
	if(ZdcEmapSearchClickFlg) {
		ZdcEmapSearchClickFlg = 0;
		//����������ϲ��̰�ư
		if (ZdcEmapMapShopMrkCnt > 0) {
			//���������ޤ��ϰϤ˰�ư
			if (!ZdcEmapMapShopDetailMrkId) {
				var center_latlon = ZdcEmapMapObj.getLatLon();
				var latdist;
				var londist;
				var varminlat;
				var varminlon;
				var varmaxlat;
				var varmaxlon;
				var varlatlon_box = new Array();
				// �Ǥ�Υ�줿lat�κ�ʬ
				//var minlatdist = Math.abs(minlat - center_latlon.lat);
				//var maxlatdist = Math.abs(maxlat - center_latlon.lat);
				var minlatdist = Math.abs(Math.floor(minlat*10000000) - Math.floor(center_latlon.lat*10000000))/10000000;
				var maxlatdist = Math.abs(Math.floor(maxlat*10000000) - Math.floor(center_latlon.lat*10000000))/10000000;
				if (minlatdist > maxlatdist) {
					latdist = minlatdist;
				} else {
					latdist = maxlatdist;
				}
				// �Ǥ�Υ�줿lon�κ�ʬ
				//var minlondist = Math.abs(minlon - center_latlon.lon);
				//var maxlondist = Math.abs(maxlon - center_latlon.lon);
				var minlondist = Math.abs(Math.floor(minlon*10000000) - Math.floor(center_latlon.lon*10000000))/10000000;
				var maxlondist = Math.abs(Math.floor(maxlon*10000000) - Math.floor(center_latlon.lon*10000000))/10000000;
				if (minlondist > maxlondist) {
					londist = minlondist;
				} else {
					londist = maxlondist;
				}
				//varminlat = center_latlon.lat - latdist;
				//varminlon = center_latlon.lon - londist;
				//varmaxlat = center_latlon.lat + latdist;
				//varmaxlon = center_latlon.lon + londist;
				varminlat = Math.floor((center_latlon.lat*10000000) - (latdist*10000000))/10000000;
				varminlon = Math.floor((center_latlon.lon*10000000) - (londist*10000000))/10000000;
				varmaxlat = Math.floor((center_latlon.lat*10000000) + (latdist*10000000))/10000000;
				varmaxlon = Math.floor((center_latlon.lon*10000000) + (londist*10000000))/10000000;
				// �Ͽ�ɽ���̼ܼ����Ѳ��۵���
				varlatlon_box[0] = new ZDC.LatLon(varminlat, varminlon);
				varlatlon_box[1] = new ZDC.LatLon(varmaxlat, varmaxlon);
				var adjust = ZdcEmapMapObj.getAdjustZoom(varlatlon_box);
				//if (adjust) ZdcEmapMapObj.setZoom(adjust.zoom);		del 2011/12/19 Y.Matsukawa
				<?php
				// mod 2016/01/22 H.Yasunaga[
				// 711map�˥å��󥫥����ޥ���
				// �Ͽ޽��ɽ���ν̼ܤ�1/15000�˸���
				if ($D_711NISSEN_FIX_ZOOM) {
				?>
					if (adjust) {
						// mod 2016/01/27 H.Yasunaga [	
						//if (adjust.zoom < <?php echo $D_INIT_LVL; ?> ) {
						if (result.researched == "1") {
						// mod 2016/01/27 H.Yasunaga ]
							// �Ƹ�����Ͻ̼��ѹ���Ԥ�
							ZdcEmapMapObj.setZoom(adjust.zoom);
						}
						// �Ǵ��Ź�޸���
						ZdcEmapSearchShop();
						ZdcEmapSearchEventChangezoomAvailable = 0;
					}
				<?php
				} else {
				 ?>
					// add 2011/12/19 Y.Matsukawa [
					if (adjust) {
						ZdcEmapSearchEventChangezoomAvailable = 0;
						ZdcEmapMapObj.setZoom(adjust.zoom);
					}
					// add 2011/12/19 Y.Matsukawa ]
				<?php 
				} 
				// mod 2016/01/22 H.Yasunaga ]?>
				<?php //document.getElementById('ZdcEmapMap').style.visibility = "visible";		del 2012/01/10 Y.Matsukawa ?>
				<?php if (isset($D_MAP_LVL_CSTM) && $D_MAP_LVL_CSTM != '') { //add 2015/12/04 F.Yokoi [ ?>
				ZdcEmapMapObj.setZoom(<?php echo $D_MAP_LVL_CSTM; ?>);
				<?php } //add 2015/12/04 F.Yokoi ] ?>
			}
		} else if (!result.options.exceptKid) {
			//����Ⱦ�¤ν̼ܤ˰�ư  �����֤ˤ�ä�getPoint2PointDistance���ͤ��Ѥ�뤿�����׻����Ƥ���
			// mod 2011/07/07 H.Osamoto [
			//	var p = new ZdcPoint();
			//	p = ZdcEmapMapObj.getMapLocation();
			//	//var px = new ZdcPoint();
			//	//var py = new ZdcPoint();
			//	//px = new ZdcPoint(p.mx+1000,p.my,<?PHP echo $D_PFLG; ?>);//+1000�ʤΤ��ͤ���������NaN�ˤʤ뤿��
			//	//py = new ZdcPoint(p.mx,p.my+1000,<?PHP echo $D_PFLG; ?>);
			//	//var mx = ZdcEmapGeometricObj.getPoint2PointDistance(p,px);//����1000�ߥ��ä��Ȥε�Υ
			//	//var my = ZdcEmapGeometricObj.getPoint2PointDistance(p,py);//����1000�ߥ��ä��Ȥε�Υ
			//	//mx = 1000 / mx;//1m���Ȥη���
			//	//my = 1000 / my;//1m���Ȥΰ���
			//	//var rx = parseInt(mx * <?PHP echo $D_SHOP_RAD; ?>);//���٤��ϰ�
			//	//var ry = parseInt(my * <?PHP echo $D_SHOP_RAD; ?>);//���٤��ϰ�
			//	var rx = parseInt((450000 / (11 * 1000)) * <?PHP echo $D_SHOP_RAD; ?>);//CGI�ȷ׻��򤢤碌��
			//	var ry = parseInt((300000 / (9 * 1000)) * <?PHP echo $D_SHOP_RAD; ?>);//��
			//	var p1 = new ZdcPoint(p.mx - rx,p.my - ry,<?PHP echo $D_PFLG; ?>);
			//	var p2 = new ZdcPoint(p.mx + rx,p.my + ry,<?PHP echo $D_PFLG; ?>);
			//	var bx = new ZdcBox(p1,p2);
			//	var lv = ZdcEmapMapObj.getMapBoxScale( bx, p );
			//	if(lv < 18) lv = lv + 1;//���ĥ����।��
			//	ZdcEmapMapObj.setMapScale(lv);
			// mod 2011/07/07 H.Osamoto ]
		}
	}
	// add 2011/12/27 H.osamoto [
	//�������֥��������ɽ������
	if ("<?PHP echo $D_TYPE_SMSG; ?>") {
		if (!ZdcEmapMapSearchPoint) {
			var center_latlon = ZdcEmapMapObj.getLatLon();
			ZdcEmapMapSearchPoint = ZdcEmapMakeMrkApi2(0, center_latlon.lat, center_latlon.lon, 
								<?PHP echo $D_ICON_EKI_W; ?>,<?PHP echo $D_ICON_EKI_H; ?>,0,0,
								<?PHP echo $D_ICON_EKI_OFFSET_X; ?>,<?PHP echo $D_ICON_EKI_OFFSET_Y; ?>,0,0,
								'<?PHP echo $D_ICON_EKI_IMAGE; ?>','',
								'', '', '', 0, null, null, null
								);
			ZdcEmapMapObj.addWidget(ZdcEmapMapSearchPoint);
		}
	}
	
	//����Ź�ޥ��������ɽ������
	if ("<?PHP echo $D_TYPE_SMSG; ?>") {
		if ("<?PHP echo $exkid; ?>" != "") {
			var shopno_cursor_w = '';
			var shopno_cursor_h = '';
			var shopno_cursor_offset_w = '';
			var shopno_cursor_offset_h = '';
			if ("<?PHP echo $D_SHOPNO_CURSOR_W; ?>") shopno_cursor_w = Number("<?PHP echo $D_SHOPNO_CURSOR_W; ?>");
			if ("<?PHP echo $D_SHOPNO_CURSOR_H; ?>") shopno_cursor_h = Number("<?PHP echo $D_SHOPNO_CURSOR_H; ?>");
			if ("<?PHP echo $D_SHOPNO_CURSOR_OFFSET_X; ?>") shopno_cursor_offset_w = Number("<?PHP echo $D_SHOPNO_CURSOR_OFFSET_X; ?>");
			if ("<?PHP echo $D_SHOPNO_CURSOR_OFFSET_Y; ?>") shopno_cursor_offset_h = Number("<?PHP echo $D_SHOPNO_CURSOR_OFFSET_Y; ?>");
			
			//�ե����������������ɽ������
			mrk_search_shop_cur = ZdcEmapMakeMrkApi2(0, '<?PHP echo $exlat; ?>', '<?PHP echo $exlon; ?>', 
							shopno_cursor_w,shopno_cursor_h,0,0,
							shopno_cursor_offset_w,shopno_cursor_offset_h,0,0,
							'<?PHP echo $D_SHOPNO_CURSOR_IMG; ?>','',
							'', '', '', 0, null, null, null
							);
			ZdcEmapMapObj.addWidget(mrk_search_shop_cur);
			
			mrk_search_shop = ZdcEmapMakeMrkApi2(ZdcEmapMapShopMrkId.length, '<?PHP echo $exlat; ?>', '<?PHP echo $exlon; ?>', 
							ZdcEmapIconW['<?PHP echo $exicon; ?>'], ZdcEmapIconH['<?PHP echo $exicon; ?>'],ZdcEmapIconW['@NEW'],ZdcEmapIconH['@NEW'],
							ZdcEmapIconOffsetX['<?PHP echo $exicon; ?>'], ZdcEmapIconOffsetY['<?PHP echo $exicon; ?>'],ZdcEmapIconW['<?PHP echo $exicon; ?>']-ZdcEmapIconW['@NEW'],ZdcEmapIconH['<?PHP echo $exicon; ?>'],
							ZdcEmapIconImg['<?PHP echo $exicon; ?>'],'',
							'<?PHP echo $exkid; ?>', '<?PHP echo $exicon; ?>', '', 0,
							<?PHP
								// ����å�
								if($D_KYO_ICON_CLK == 1) echo "function() { ZdcEmapShopMsg(this.id); }"; 
								else if($D_KYO_ICON_CLK == 2) echo "function() { window.location.href='".$D_DIR_BASE_G."dtl/'+this.id+'/?".($P_FREEPARAMS_ENC?'&'.$P_FREEPARAMS_ENC:'').($condprm?'&'.$condprm:'').($his?'&his='.urlencode($his):'')."'; }";		// add 2012/07/06 Y.Matsukawa
								else echo "null"; 
							?>
							, null, null
							);
			if (ZdcEmapMapShopMrkId[ZdcEmapMapShopMrkId.length] != null) ZdcEmapMapObj.removeWidget(ZdcEmapMapShopMrkId[ZdcEmapMapShopMrkId.length]);//ǰ�Τ���
			ZdcEmapMapObj.addWidget(mrk_search_shop);
			ZdcEmapMapShopMrkId[ZdcEmapMapShopMrkId.length] = mrk_search_shop;
		}
	}
	// add 2011/12/27 H.osamoto ]
	document.getElementById('ZdcEmapMap').style.visibility = "visible";		<?php // add 2012/01/10 Y.Matsukawa ?>
	ZdcEmapMapFrontShopDetail();
	ZdcEmapMapCursorRemove();
	ZdcEmapCondEnabled();	<?php // add 2015/04/23 H.Osamoto ?>
	<?php
	// add start 2016/07/11 H.Yasunaga 711OMNI2�ѥ������ޥ��� [ 
	// 711OMNI2��postMessage�Ǽ�����ä������Τߤ�ɽ������
	// ���յ���������Ԥ�ʤ��褦������
	if (isset($D_711OMNI2) == false || $D_711OMNI2 = 0) {
	?>
	ZdcEmapSearchEventStart();
	<?php
	}
	// add end 2016/07/11 H.Yasunaga ]
	?>
	//�����Ĥ���
	//ZdcEmapSearchClose();
	ZdcEmapPoiRouteClear();
	
	<?php //add 2016/09/15 T.Yoshino ?>
	// �Ƹ������˿᤭�Ф�����
	if( <?php if(isset($D_RELOAD_BALLOON)){echo "true";}else{echo "false";} ?> ){
		ZdcEmapShopMsgClose();
	}
	
	//�������֤��ݻ�
	ZdcEmapSearchPoint = ZdcEmapMapObj.getLatLon();
	ZdcEmapSearchScale = ZdcEmapMapObj.getZoom();
	ZdcEmapReadOff();
	<?php
	// add 2016/03/14 Y.Matsukawa [
	// �ե�����ɽ����˺Ƹ��������ݡ�������˥ե�������Ф�ľ��
	if (isset($D_REFRESH_FUKIDASHI_SEARCH_COMPLETE) && $D_REFRESH_FUKIDASHI_SEARCH_COMPLETE) {
	?>
	if (userwidgethukidasi) {
		ZdcEmapUpdateMsgByKyotenid(userwidgethukidasi.kyotenid, "<?php echo $D_KYO_ICON_OVERLAP; ?>");
	}
	<?php
	}
	// add 2016/03/14 Y.Matsukawa ]
	?>
	<?php //add 2014/08/21 Q.Dai [ ?>
	<?php if($D_KYO_ICON_OVERLAP == 1){ ?>
		ZdcEmapIconOverlap(icnt,ZdcEmapSearchScale);
	<?php } ?>
	<?php //add 2014/08/21 Q.Dai ] ?>
}

//�ꥹ��ɽ��
function ZdcEmapSearchShopListClick(page) {
	if(ZdcEmapButtonNG()) return;
	ZdcEmapSearchShopList(page)
}
function ZdcEmapSearchShopList(page) {
	//�ꥹ�Ȥ�ɽ��������
	if(<?PHP echo $D_SHOP_CLOSELIST; ?> && ZdcEmapMapShopDetailMrkId != null) {
		//�ꥹ����ɽ���⡼�ɤǾܺ�ɽ������ȽФ��ʤ�
		ZdcEmapListObj.innerHTML = "";
		return;
	}
	// add 2012/09/28 Y.Matsukawa [
	<?php if ($D_SERVICE_TYPE != 'S') { ?>
	// Standard�ʳ���ɽ�����ʤ�
	ZdcEmapListObj.innerHTML = "";
	return;
	<?php } ?>
	// add 2012/09/28 Y.Matsukawa ]
	//var url = "<?PHP echo $D_DIR_BASE_L; ?>nlist.htm?cid=<?PHP echo $cid; ?>"+
	var url = "<?PHP echo $D_DIR_BASE_L; ?>nlist.htm?"+
			  "&lat="+ZdcEmapNearShop.opts.lat+"&lon="+ZdcEmapNearShop.opts.lon+"&latlon="+ZdcEmapNearShop.opts.latlon+
			  <?php //"&radius="+ZdcEmapNearShop.opts.radius+"&jkn="+ZdcEmapNearShop.opts.jkn+"&page="+page;		del 2012/09/07 Y.Matsukawa ?>
			  "&radius="+ZdcEmapNearShop.opts.radius+"&jkn="+encodeURI(ZdcEmapNearShop.opts.jkn)+"&page="+page;
	url += ZdcEmapCondParms;	<?php // add 2012/01/31 Y.Matsukawa ?>
	//url += "&<?php echo $P_FREEPARAMS; ?>";		mod 2012/09/07 Y.Matsukawa
	url += "&<?php echo $P_FREEPARAMS_ENC; ?>";
	url += "<?php echo ($his?'&his='.urlencode($his):''); ?>";
	url += "<?php echo ($exkid?'&exkid='.$exkid:''); ?>";	// add 2011/12/27 H.osamoto
	<?php // add 2015/03/26 H.osamoto [ ?>
	if ("<?php echo $pexkid; ?>" != "") {
		url += "<?php echo ($pexkid?'&pexkid='.$pexkid:''); ?>";
	}
	<?php // add 2015/03/26 H.osamoto ] ?>
	url += "<?php echo ($print_flg?'&print_flg=1':''); ?>";	// add 2012/11/06 H.osamoto
	<?php
	// add 2015/03/30 N.Wada [
	if(isset($D_NMAP_PRINT_CNT_FIX) && $D_NMAP_PRINT_CNT_FIX) {
	 	if(isset($cntfix) && ctype_digit($cntfix)) {
	 		// �Ǵ���̤����Ϥ��줿������̷�����Ϥ�
	?>
	url += "&cntfix=<?php echo ($cntfix); ?>";
	<?php
		}
		if(isset($arealatlon) && $arealatlon) {
	 		// �Ǵ���̤����Ϥ��줿�����Ͽ��ϰϤ��Ϥ�
	?>
	url += "&latlon=<?php echo ($arealatlon); ?>";
	<?php
		}
	}
	// add 2015/03/30 N.Wada ]
	?>
	<?php // add 2013/04/15 H.Osamoto [ ?>
	if(ZdcEmapSearchFirstCstm == 1) {
		url += "&first_search=1";
	}
	<?php // add 2013/04/15 H.Osamoto ] ?>
	<?php // add 2014/12/08 Y.Matsukawa [ ?>
	if (ZdcEmapSearchCenter) {
		url += "&srchplace="+ZdcEmapSearchCenter.lat+","+ZdcEmapSearchCenter.lon;
	}
	<?php // add 2014/12/08 Y.Matsukawa ] ?>
	// �ܺ�ɽ����
	if (ZdcEmapMapShopDetailMrkId != null) {
		// �ܺ�ɽ���ե饰
		url += "&detail=1";
		// �ܺ�ɽ����ε���ID
		var mrk = ZdcEmapMapShopDetailMrkId;
	<?php if (isset($D_SHOP_LIST_DTLSHOP) && $D_SHOP_LIST_DTLSHOP != '') { // mod 2015/12/04 F.Yokoi ?>
	<?php } else { // mod 2015/12/04 F.Yokoi ?>
		if (mrk && mrk.data1) url += "&dkid="+mrk.data1;
	<?php } // mod 2015/12/04 F.Yokoi ?>
	}
	<?php if($https_req){ ?>url += "&https_req=1";<?php } ?>
	<?php
	// add 2014/12/10 Y.Matsukawa [
	// Cookie�ʱ����������¸�Ѥߤε���ID��ʣ���ˤ�����Ϥ� ?>
	var ckkids = ZdcEmapCookieGetKidList("<?php echo $D_CID; ?>");
	if (ckkids != "") url += "&ckkids="+ckkids;
	<?php
	// add 2014/12/10 Y.Matsukawa ] ?>
	<?php
	// add 2015/01/16 Y.Matsukawa [
	if($_SERVER['HTTP_HOST']){ echo 'url += "&PARENT_HTTP_HOST='.urlencode($_SERVER['HTTP_HOST']).'";'; }
	// add 2015/01/16 Y.Matsukawa ] ?>
	<?php
	// add 2015/05/13 N.Wada [
	// �������������� �Ұ��ֹ�μ㤤���Ϣ�֤�Ĥ���
	if ( isset($D_NSNET01_EMPNO_SEQ_ICON) && $D_NSNET01_EMPNO_SEQ_ICON ) {
	?>
	var job = document.nsnet01Form.job.value;
	url += "&nsnet01_job="+(job ? job : 1);
	<?php
	}
	// add 2015/05/13 N.Wada [
	?>
	ZdcEmapHttpRequestHtml(url, function(html,status){
		if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> list["+status+"]";
		ZdcEmapListObj.innerHTML = html;
	<?php // });		mod 2012/09/07 Y.Matsukawa ?>
	}, false, 2);
}
//�ꥹ�Ȥ�������
function ZdcEmapShopClick(id) {
	if(ZdcEmapButtonNG()) return;
	ZdcEmapSearchPoint = null;//ɬ���Ƹ��������뤿��
	var mrk = ZdcEmapMapShopMrkId[id];
	if (ZdcEmapMapShopMrkId[id].lvl) {
		lvl = ZdcEmapMapShopMrkId[id].lvl;
	} else {
		lvl = "";
	}
	var latlons_id = eval(latlons.length) - eval(id) - 1;
	//ɽ������
	ZdcEmapShopDetailKidClick(ZdcEmapMapShopMrkId[id].data1,latlons[latlons_id].lat,latlons[latlons_id].lon,ZdcEmapMapShopMrkId[id].data2,ZdcEmapMapShopMrkId[id].nflg,lvl);
}
//�Ǵ󸡺��򱣤�
function ZdcEmapSearchShopClose() {
	ZdcEmapCondObj.innerHTML = "";
	ZdcEmapCondObj.mode = "";
	<?php
	// add 2015/05/14 Y.Matsukawa [
	if ($D_COND_STATIC) {
	?>
	ZdcEmapCondStaticObj.style.display = "none";
	<?php
	}
	// add 2015/05/14 Y.Matsukawa ] ?>
	ZdcEmapListObj.innerHTML = "";
	for( i = 0;i < ZdcEmapMapShopMrkCnt;i ++) {
		if (ZdcEmapMapShopMrkId[i]) {		<?php // add 2012/03/16 Y.Matsukawa ?>
			ZdcEmapMapObj.removeWidget(ZdcEmapMapShopMrkId[i]);
			ZdcEmapMapShopMrkId[i] = null;
		}
	}
	ZdcEmapMapShopMrkCnt = 0;
}
var ZdcEmapMapFrontShopMrkId = null;
//���ꤵ�줿������������̤ˤ�äƤ���
function ZdcEmapMapFrontShopMrk(id){
	if(ZdcEmapMapShopMrkId[id] != null) {
		var mrk = ZdcEmapMapShopMrkId[id];
		ZdcEmapMapFrontShopReset();
		mrk.setZindex(101);
		ZdcEmapMapFrontShopMrkId = ZdcEmapMapShopMrkId[id];
	}
}
//�ܺ٥�����������̤ˤ�äƤ���
function ZdcEmapMapFrontShopDetail(){
	var mrk;
	if(ZdcEmapMapShopDetailMrkId != null) {
		//�ե�������
		ZdcEmapMapFrontShopReset();
		mrk = ZdcEmapMapCurFocusMrkId;
		mrk.setZindex(102);
		mrk = ZdcEmapMapShopDetailMrkId;
		mrk.setZindex(101);
		ZdcEmapMapFrontShopMrkId = ZdcEmapMapShopDetailMrkId;
	}
}
//���̤˻��äƤ�����������򸵤��᤹
function ZdcEmapMapFrontShopReset() {
	if (ZdcEmapMapFrontShopMrkId != null) {
		var mrk = ZdcEmapMapFrontShopMrkId;
		if (mrk && mrk.b) mrk.setZindex(100);
		ZdcEmapMapFrontShopMrkId = null;
	}
}

//add 2014/08/21 Q.Dai [
var D_ZOOM = new Array();
var D_ZOOM2PXMS_LAT = new Array();
var D_ZOOM2PXMS_LON = new Array();
D_ZOOM["1"]=89; D_ZOOM2PXMS_LAT["89"]=128836.6013; D_ZOOM2PXMS_LON["89"]=158117.6471;
D_ZOOM["2"]=87; D_ZOOM2PXMS_LAT["87"]=64418.30065; D_ZOOM2PXMS_LON["87"]=79058.82353;
D_ZOOM["3"]=85; D_ZOOM2PXMS_LAT["85"]=28183.00654; D_ZOOM2PXMS_LON["85"]=34588.23529;
D_ZOOM["4"]=82; D_ZOOM2PXMS_LAT["82"]=14954.24837; D_ZOOM2PXMS_LON["82"]=18352.94118;
D_ZOOM["5"]=81; D_ZOOM2PXMS_LAT["81"]=10352.94118; D_ZOOM2PXMS_LON["81"]=12705.88235;
D_ZOOM["6"]=77; D_ZOOM2PXMS_LAT["77"]=5751.633987; D_ZOOM2PXMS_LON["77"]=7058.823529;
D_ZOOM["7"]=72; D_ZOOM2PXMS_LAT["72"]=2588.235294; D_ZOOM2PXMS_LON["72"]=3176.470588;
D_ZOOM["8"]=70; D_ZOOM2PXMS_LAT["70"]=1581.699346; D_ZOOM2PXMS_LON["70"]=1941.176471;
D_ZOOM["9"]=67; D_ZOOM2PXMS_LAT["67"]=1150.326797; D_ZOOM2PXMS_LON["67"]=1411.764706;
D_ZOOM["10"]=62; D_ZOOM2PXMS_LAT["62"]=539.2156863; D_ZOOM2PXMS_LON["62"]=661.7647059;
D_ZOOM["11"]=56; D_ZOOM2PXMS_LAT["56"]=206.6993464; D_ZOOM2PXMS_LON["56"]=253.6764706;
D_ZOOM["12"]=55; D_ZOOM2PXMS_LAT["55"]=152.7777778; D_ZOOM2PXMS_LON["55"]=187.5000000;
D_ZOOM["13"]=52; D_ZOOM2PXMS_LAT["52"]=98.85620915; D_ZOOM2PXMS_LON["52"]=121.3235294;
D_ZOOM["14"]=50; D_ZOOM2PXMS_LAT["50"]=74.14215686; D_ZOOM2PXMS_LON["50"]=90.99264706;
D_ZOOM["15"]=46; D_ZOOM2PXMS_LAT["46"]=47.18137255; D_ZOOM2PXMS_LON["46"]=57.90441176;
D_ZOOM["16"]=44; D_ZOOM2PXMS_LAT["44"]=33.70098039; D_ZOOM2PXMS_LON["44"]=41.36029412;
D_ZOOM["17"]=42; D_ZOOM2PXMS_LAT["42"]=26.96078431; D_ZOOM2PXMS_LON["42"]=33.08823529;
D_ZOOM["18"]=39; D_ZOOM2PXMS_LAT["39"]=15.72712418; D_ZOOM2PXMS_LON["39"]=19.30147059;
//var IconGrp = new Array(); del 2014/08/28 Q.Dai
function ZdcEmapIconOverlap(icnt,lvl){
	IconGrp = new Array();
	var icdt,ic,tmpic,p1,p2,c1,c2,c3,c4,obj;
	var nlatmin = new Array();
	var nlatmax = new Array();
	var nlonmin = new Array();
	var nlonmax = new Array();
	// var ZGobj = new ZdcGeometric();
	lvl++; //add 2014/08/28 Q.Dai
	for(ic=icnt-1; ic>=0; ic--){
		icdt = ZdcEmapIconDt[ic].split(":");
		// del 2014/08/28 [
		// nlatmin[ic] = Math.round(parseInt(icdt[0]) + (D_ZOOM2PXMS_LAT[D_ZOOM[lvl]] * (parseInt(icdt[2]) / 2)));
		// nlonmin[ic] = Math.round(parseInt(icdt[1]) + (D_ZOOM2PXMS_LON[D_ZOOM[lvl]] * (parseInt(icdt[3]) / 2)));
		// nlatmax[ic] = Math.round(parseInt(icdt[0]) - (D_ZOOM2PXMS_LAT[D_ZOOM[lvl]] * (parseInt(icdt[2]) / 2)));
		// nlonmax[ic] = Math.round(parseInt(icdt[1]) - (D_ZOOM2PXMS_LON[D_ZOOM[lvl]] * (parseInt(icdt[3]) / 2)));
		// del 2014/08/28 ]
		// add 2014/08/28 [
		nlatmin[ic] = (parseFloat(icdt[0]) - (ZDC.msTodeg(D_ZOOM2PXMS_LAT[D_ZOOM[lvl]]) * (parseFloat(icdt[2]) / 2)));
		nlonmin[ic] = (parseFloat(icdt[1]) - (ZDC.msTodeg(D_ZOOM2PXMS_LON[D_ZOOM[lvl]]) * (parseFloat(icdt[3]) / 2)));
		nlatmax[ic] = (parseFloat(icdt[0]) + (ZDC.msTodeg(D_ZOOM2PXMS_LAT[D_ZOOM[lvl]]) * (parseFloat(icdt[2]) / 2)));
		nlonmax[ic] = (parseFloat(icdt[1]) + (ZDC.msTodeg(D_ZOOM2PXMS_LON[D_ZOOM[lvl]]) * (parseFloat(icdt[3]) / 2)));
		// add 2014/08/28 ]
	}
	for(ic=icnt-1; ic>=0; ic--){
		obj = ZdcEmapMapShopMrkId[ic];
		IconGrp[ic] = obj.data1;
		for(tmpic=icnt-1; tmpic>=0; tmpic--){
			if( tmpic == ic){ continue; }

			obj = ZdcEmapMapShopMrkId[tmpic];
			if( obj == null) continue;// debug
			// del 2014/08/28 [
			// p1 = new ZDC.LatLon(nlonmin[ic],nlatmin[ic]);
			// p2 = new ZDC.LatLon(nlonmax[ic],nlatmax[ic]);
			// //
			// c1 = new ZDC.LatLon(nlonmin[tmpic],nlatmin[tmpic]);
			// c2 = new ZDC.LatLon(nlonmax[tmpic],nlatmin[tmpic]);
			// c3 = new ZDC.LatLon(nlonmax[tmpic],nlatmax[tmpic]);
			// c4 = new ZDC.LatLon(nlonmin[tmpic],nlatmax[tmpic]);
			// // del 2014/08/28 ]

			// add 2014/08/28 [
			p1 = new ZDC.LatLon(nlatmin[ic],nlonmin[ic]);
			p2 = new ZDC.LatLon(nlatmax[ic],nlonmax[ic]);

			c1 = new ZDC.LatLon(nlatmin[tmpic],nlonmin[tmpic]);
			c2 = new ZDC.LatLon(nlatmax[tmpic],nlonmin[tmpic]);
			c3 = new ZDC.LatLon(nlatmax[tmpic],nlonmax[tmpic]);
			c4 = new ZDC.LatLon(nlatmin[tmpic],nlonmax[tmpic]);
			// add 2014/08/28 [

			p_box = new ZDC.LatLonBox(p1,p2);

			if( ZDC.getLineCrossRectLatLons(c1, c2, p_box)){
				IconGrp[ic] += "," + obj.data1;
				continue;
			}
			if( ZDC.getLineCrossRectLatLons(c2, c3, p_box)){
				IconGrp[ic] += "," + obj.data1;
				continue;
			}
			if( ZDC.getLineCrossRectLatLons(c3, c4, p_box)){
				IconGrp[ic] += "," + obj.data1;
				continue;
			}
			if( ZDC.getLineCrossRectLatLons(c4, c1, p_box)){
				IconGrp[ic] += "," + obj.data1;
				continue;
			}
		}
	}
}
// add 2014/08/21 Q.Dai ]

//�ܺ�ɽ��(��������Τ�ɽ��)
function ZdcEmapShopIcon(lat,lon,icnno,nflg,NotMoveFlag) {
	//��Ͽ����Ƥ��ʤ���������ID�ξ��Ͻ������ʤ�
	<?php //if (!ZdcEmapIconImg[icnno]) return;		mod 2012/10/01 Y.Matsukawa ?>
	if (!ZdcEmapIconImg[icnno]) {
		icnno = "@TP";//Ʃ������
	}
	var mrk;
	//�Ͽް�ư
	if( NotMoveFlag == undefined || NotMoveFlag != 1 ){
		ZdcEmapMapMove(lat, lon);
	}
	var center = new ZDC.LatLon(Number(lat), Number(lon));
	ZdcEmapMapObj.setHome(center);
	
	//�ե����������������ɽ������
	mrk = ZdcEmapMakeMrkApi2(0, lat, lon, 
							ZdcEmapIconW['@SEL'], ZdcEmapIconH['@SEL'],0,0,
							ZdcEmapIconOffsetX['@SEL'], ZdcEmapIconOffsetY['@SEL'],0,0,
							ZdcEmapIconImg['@SEL'],'',
							'', '', '', 0, null, null, null
						);
	if(ZdcEmapMapCurMrkId != null) ZdcEmapMapObj.removeWidget(ZdcEmapMapCurMrkId);
	if(ZdcEmapMapCurFocusMrkId != null) ZdcEmapMapObj.removeWidget(ZdcEmapMapCurFocusMrkId);
	ZdcEmapMapObj.addWidget(mrk);
	ZdcEmapMapCurFocusMrkId = mrk;
	mrk.setZindex(101);
	
	//�ܺ٥��������ɽ������
	if(nflg == 1) tmp = ZdcEmapIconImg["@NEW"];
		else tmp = "";
	mrk = ZdcEmapMakeMrkApi2(0, lat, lon, 
							ZdcEmapIconW[icnno], ZdcEmapIconH[icnno],ZdcEmapIconW['@NEW'],ZdcEmapIconH['@NEW'],
							ZdcEmapIconOffsetX[icnno], ZdcEmapIconOffsetY[icnno],ZdcEmapIconW[icnno]-ZdcEmapIconW['@NEW'],ZdcEmapIconH[icnno],
							ZdcEmapIconImg[icnno],tmp,
							'', icnno, '', nflg, null, null, null
						);
	if (ZdcEmapMapShopDetailMrkId != null) ZdcEmapMapObj.removeWidget(ZdcEmapMapShopDetailMrkId);//ǰ�Τ���
	ZdcEmapMapObj.addWidget(mrk);
	ZdcEmapMapShopDetailMrkId = mrk;
		
	latlons = new ZDC.LatLon(lat, lon);
	mrk = new ZDC.Marker(latlons,{
		/* �ޡ����Υ������˹�碌�ư��֤�Ĵ������ */
		offset: new ZDC.Pixel(ZdcEmapIconOffsetX[icnno], ZdcEmapIconOffsetY[icnno]),
		custom: {
			base : {
				src: ZdcEmapIconImg[icnno],
				imgSize: ZDC.WH(ZdcEmapIconW[icnno], ZdcEmapIconH[icnno])
			}
		}
	});
	if(ZdcEmapMapShopDetailMrkId != null) ZdcEmapMapObj.removeWidget(ZdcEmapMapShopDetailMrkId);
	ZdcEmapMapObj.addWidget(mrk);
	ZdcEmapMapShopDetailMrkId = mrk;
	ZdcEmapMapShopDetailMrkId.lat = lat;
	ZdcEmapMapShopDetailMrkId.lon = lon;
}

//�ե�����ɽ��
var userwidgethukidasi;
var ZdcEmapMsgSemaphore = false;		<?php // add 2015/01/20 Y.Matsukawa ?>
<?php //function ZdcEmapShopMsg(id , overlap) {		mod 2016/03/14 Y.Matsukawa ?>
function ZdcEmapShopMsg(id , overlap, update) {
	<?php // add 2014/08/19 Q.Dai [?>
	// set default value for overlap parameter
	overlap = typeof overlap !== 'undefined' ? overlap : '';
	<?php // add 2014/08/19 Q.Dai ]?>
	
	if (!update) {	<?php // add 2016/03/14 Y.Matsukawa ?>
		if(ZdcEmapMapObj.ZdcEmapMode == "print") return;//�����⡼�ɻ��Ͽ᤭�Ф��Ф��ʤ�
		if(ZdcEmapButtonNG()) return;
		if(ZdcEmapCondObj.mode == "eki" || ZdcEmapCondObj.mode == "jnr" || ZdcEmapCondObj.mode == "froute") return;//�Ǵ�ؤ���ߤ�Ф��Ƥ���ϽФ��ʤ�
		<?php //ZdcEmapShopMsgClose();		del 2015/01/20 Y.Matsukawa ?>
		//�̼ܤ��ϰϳ��ʤ�ɽ�����ʤ�
		var s = ZdcEmapMapObj.getZoom();
		<?php	// del 2016/04/21 H.Osamoto if(s < < ?PHP echo $D_VIEW_ICON_MAX; ? > || s > < ?PHP echo $D_VIEW_ICON_MIN; ? >) return; ?>
		<?php // add 2015/01/20 Y.Matsukawa [ ?>
		<?php
		// �����߽����ɻ� ?>
		if(ZdcEmapMsgSemaphore) return;
		ZdcEmapMsgSemaphore = true;
		ZdcEmapShopMsgClose();
		<?php // add 2015/01/20 Y.Matsukawa ] ?>
	}
	//������������̤˽Ф�
	if(id != null) ZdcEmapMapFrontShopMrk(id);
	else ZdcEmapMapFrontShopDetail();
	//�ǥ�����
	if(id != null) var obj = ZdcEmapMapShopMrkId[id];
	else var obj = ZdcEmapMapShopDetailMrkId;
	<?php // add 2014/08/21 Q.Dai [ ?>
	<?php //if( overlap == 1) { // mod 2015/03/18 N.Wada	?>
	if( overlap >= 1) {
		var kidprm = "";
		var lseqprm = "";	<?php // add 2016/03/14 Y.Matsukawa ?>
		for (var i = 0; i < IconGrp.length; i++) {
			var grpKid = IconGrp[i].split(',');
			<?php //if( grpKid.indexOf( obj.data1) == 0) {// choosen "clicked icon" is first.		mod 2015/03/25 Y.Matsukawa ?>
			if( grpKid[0] == obj.data1 ) {	// choosen "clicked icon" is first.
				if(grpKid.length > 1) {
					if ( overlap == 2 ) grpKid.sort();	<?php // add 2015/05/26 N.Wada ?>
					for( var k=0; k < grpKid.length; k++ ){
						if( grpKid[k] == ""){ continue; }
						kidprm += "&kid" + k + "=" + grpKid[k];
						<?php // add 2016/03/14 Y.Matsukawa [ ?>
						if (Nsnet01EmpnoSeq && Nsnet01EmpnoSeq[grpKid[k]]) {
							lseqprm += "&lseq" + k + "=" + Nsnet01EmpnoSeq[grpKid[k]];
						}
						<?php // add 2016/03/14 Y.Matsukawa ] ?>
					}
				} else {
					kidprm = "&kid="+obj.data1;
					<?php // add 2016/03/14 Y.Matsukawa [ ?>
					if (Nsnet01EmpnoSeq && Nsnet01EmpnoSeq[obj.data1]) {
						lseqprm += "&lseq=" + Nsnet01EmpnoSeq[obj.data1];
					}
					<?php // add 2016/03/14 Y.Matsukawa ] ?>
				}
			}
		}
		<?php //var url = "< ?PHP echo $D_DIR_BASE_L; ? >msg.htm?id="+i+kidprm;		mod 2016/03/14 Y.Matsukawa ?>
		var url = "<?PHP echo $D_DIR_BASE_L; ?>msg.htm?id="+i+kidprm+lseqprm;
	} else  {
		var url = "<?PHP echo $D_DIR_BASE_L; ?>msg.htm?id="+i+"&kid="+obj.data1;
		<?php // add 2016/12/12 H.Yasunaga ��ޥȥ�å����б� ?>
		<?php
		if (isset($D_YTC_LOCKER) && $D_YTC_LOCKER) {
		?>
		url += '&rdate='+obj.ukrtoridate;
		<?php
		}
		?>
		<?php // add 2016/12/12 H.Yasunaga ��ޥȥ�å����б� ?>
	} <?php // add 2014/08/21 Q.Dai ] ?>
	<?php // add 2014/12/08 Y.Matsukawa [ ?>
	if (ZdcEmapSearchCenter) {
		url += "&srchplace="+ZdcEmapSearchCenter.lat+","+ZdcEmapSearchCenter.lon;
	}
	<?php // add 2014/12/08 Y.Matsukawa ] ?>
	//�ե�������ɽ��������
	//var url = "<?PHP echo $D_DIR_BASE_L; ?>msg.htm?cid=<?PHP echo $cid; ?>&id="+i+"&kid="+obj.data1;	// del 2014/08/19 Q.Dai
	url += ZdcEmapCondParms;	<?php // add 2012/01/31 Y.Matsukawa ?>
	//url += "&<?php echo $P_FREEPARAMS; ?>";		mod 2012/09/07 Y.Matsukawa
	url += "&<?php echo $P_FREEPARAMS_ENC; ?>";
	url += "<?php echo ($his?'&his='.urlencode($his):''); ?>";
	
	<?php // add 2017/03/27 H.Yasunaga ����͹�إ������ޥ��� [ ?>
	<?php
	// mod 2017/04/19 H.Yasunaga ����͹�إ������ޥ���
	//if ($cid == "jppost15" || $cid == "jppost15test") {
	if ($cid == "jppost15" || $cid == "jppost15test" || $cid == "jppost17" || $cid == "jppost17test") {
	// mod 2017/04/19 H.Yasunaga ]
	?>
		url += "&enc=EUC";
	<?php
	}
	?>
	<?php // add 2017/03/27 H.Yasunaga ] ?>
	
	<?php if($https_req){ ?>url += "&https_req=1";<?php } ?>
	<?php
	// add 2015/01/16 Y.Matsukawa [
	if($_SERVER['HTTP_HOST']){ echo 'url += "&PARENT_HTTP_HOST='.urlencode($_SERVER['HTTP_HOST']).'";'; }
	// add 2015/01/16 Y.Matsukawa ] ?>
	ZdcEmapHttpRequestHtml(url, function(html,status){
		if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> msg["+status+"]";
		<?php // add 2016/03/14 Y.Matsukawa [ ?>
		if (update) {
			if (userwidgethukidasi) userwidgethukidasi.setHtml(html);
		} else {
		<?php // add 2016/03/14 Y.Matsukawa ] ?>
			var userwidgethukidasilabel =
			{
				html: html,
				offset: new ZDC.Pixel(0, 0)
			};
			var hukidasilatlon = new ZDC.LatLon(Number(obj.lat), Number(obj.lon));
			userwidgethukidasi = new ZDC.MsgInfo(hukidasilatlon, userwidgethukidasilabel);
			userwidgethukidasi.kyotenid = obj.data1;
			<?php // add 2016/08/22 H.Yasunaga �᤭�Ф��Ĥ��륤�٥���ɲ� �᤭�Ф���ɽ����ɽ���ǽ����ο���ʬ����Ԥ����� [ ?>
			<?php if ($cid == '711OMNI2' || $cid == '711OMNI2test') { ?>
				ZDC.addListener(userwidgethukidasi,ZDC.MSGINFO_CLOSE, function(){ userwidgethukidasi = null; });
			<?php } ?>
			<?php // add end ] ?>

			ZdcEmapMapObj.addWidget(userwidgethukidasi);
			userwidgethukidasi.open();
			ZdcEmapMsgSemaphore = false;		<?php // add 2015/01/20 Y.Matsukawa ?>
			
		}
	<?php //}, true);		mod 2012/09/07 Y.Matsukawa ?>
	}, true, 2);
}
//�Ĥ���
function ZdcEmapShopMsgClose() {
	if (userwidgethukidasi) {
		userwidgethukidasi.close();
		userwidgethukidasi = null;
	}
	ZdcEmapMapFrontShopReset();
	ZdcEmapTipsClose();//TIPS��Ĥ��Ǥ��Ĥ���
	<?php // add 2015/04/08 F.Yokoi [ ?>
	//�Ǿ�̥������ץ쥤�䡼���Ĥ���
	if(ZdcEmapTipsTopShapeLayer)
	{
		ZdcEmapTipsTopShapeLayer.close();
	}
	<?php // add 2015/04/08 F.Yokoi ] ?>
}
<?php // ɽ����Υե��������Ƥ�Ƽ�������ɽ������		add 2016/03/14 Y.Matsukawa ?>
function ZdcEmapUpdateMsgByKyotenid(kyotenid, overlap) {
	if (!userwidgethukidasi) return;
	// ����ID�˳������륢�����󤬤��뤫�ɤ���
	var id = -1;
	if (ZdcEmapMapShopMrkCnt != null) {
		for (i = 0; i < ZdcEmapMapShopMrkCnt; i++) {
			if (ZdcEmapMapShopMrkId[i]) {
				var obj = ZdcEmapMapShopMrkId[i];
				if (obj.data1 == kyotenid) {
					id = i;
				}
			}
		}
	}
	if (id < 0) {
		ZdcEmapShopMsgClose();
	} else {
		ZdcEmapShopMsg(id, overlap, 'update');
	}
}

//�������̳���
function ZdcEmapShopPrintClick(id) {
	if(ZdcEmapButtonNG()) return;
	//window.open = "<?PHP echo $D_DIR_BASE_G; ?>print.htm?cid=<?PHP echo $cid; ?>&kid="+id;
	window.open = "<?PHP echo $D_DIR_BASE_G; ?>print.htm?kid="+id;
}
//�ܺ٤κǴ���߸���
function ZdcEmapShopDetailNpoiClick() {
	if(ZdcEmapButtonNG()) return;
	if(ZdcEmapMapShopDetailMrkId == null) return;
	//�Ǵ�������������
	ZdcEmapSearchEventStop();
	//�ܺ٤˰�ư
	//var obj = ZdcEmapMapUserLyr.getMarkerById(ZdcEmapMapShopDetailMrkId);
	//ZdcEmapMapMove(obj.Point.my, obj.Point.mx);
	ZdcEmapMapMove(ZdcEmapMapShopDetailMrkId.lat, ZdcEmapMapShopDetailMrkId.lon);
	//�Ǵ���߸���
	ZdcEmapPoiClick(1);
	// �ѥ󤯤��ɲ�		add 2015/01/28 Y.Matsukawa
	ZdcEmapAddOptionalHistory('<?php echo $D_HISTORY_NAME["Npoi"]; ?>');
}
function ZdcEmapPoiClick(mode) {
	if(ZdcEmapButtonNG()) return;
	ZdcEmapPoiRouteClear();
	ZdcEmapSearchEventStop();
	ZdcEmapShopMsgClose();
	//���̤��ڤ��ؤ���
	if(ZdcEmapCondObj.mode != "jnr") {
		ZdcEmapSearchShopClose();
		if(ZdcEmapMapShopDetailMrkId) ZdcEmapFreeRouteStatic(ZdcEmapMapShopDetailMrkId.lat, ZdcEmapMapShopDetailMrkId.lon);		<?php // add 2013/06/03 Y.Matsukawa ?>
		var url = "<?PHP echo $D_DIR_BASE_L; ?>npoi_jnr.htm?";
		<?php if(isset($https_req) && $https_req){ ?>url += "&https_req=1";<?php } ?>
		ZdcEmapHttpRequestHtml(url, function(html,status){
			if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> jnr["+status+"]";
			ZdcEmapCondObj.innerHTML = html;
			ZdcEmapSearchNpoi(mode);
		});
		//if(ZdcEmapCondObj.mode == "eki" || ZdcEmapCondObj.mode == "jnr" || ZdcEmapCondObj.mode == "froute") ZdcEmapHistoryChange("<?PHP echo $D_HISTORY_NAME["Npoi"]; ?>","");
		//else ZdcEmapHistoryAdd("<?PHP echo $D_HISTORY_NAME["Npoi"]; ?>","");
		//ZdcEmapHistorySave();
		ZdcEmapCondObj.mode = "jnr";
		ZdcEmapCondObj.style.visibility = "visible";
	} else {
		ZdcEmapSearchNpoi(mode);
	}
}
var ZdcEmapNpoiLatLon;
var ZdcEmapNpoiRad;
var ZdcEmapNpoiGenreMenu;
var ZdcEmapNpoiLimit;
//��������
function ZdcEmapSearchNpoi(mode) {
	ZdcEmapReadOn();
	
	//var p   = new ZdcPoint();
	//p = ZdcEmapMapObj.getMapLocation();
	var center_latlon = ZdcEmapMapObj.getLatLon();
	
	//����������
	var code="";
	if(document.ZdcEmapJnrForm) {
		var obj,jnr=new Array(),jnrcnt=0;
		for(var i = 0;i < document.ZdcEmapJnrForm.elements.length;i ++) {
			obj = document.ZdcEmapJnrForm.elements[i];
			if(!obj) break;
			switch(obj.type) {
				case "checkbox":
					if(obj.checked == true) {
						jnr[jnrcnt] = obj.value;
						jnrcnt ++;
					}
					break;
				case "select-one":
					if(obj.options[obj.selectedIndex].value) {
						jnr[jnrcnt] = obj.options[obj.selectedIndex].value;
						jnrcnt ++;
					}
					break;
				case "radio":
					if(obj.checked == true && obj.value) {
						jnr[jnrcnt] = obj.value;
						jnrcnt ++;
					}
					break;
				default:
					if(obj.value) {
						jnr[jnrcnt] = obj.value;
						jnrcnt ++;
					}
					break;
			}
		}
		for(var i = 0;i < jnrcnt;i ++) {
			if(code) code += ",";
			code += jnr[i];
		}
	}
	if(!code) code = '<?PHP echo $D_POI_JNRMN; ?>';//�ǥե���ȥ�����
	//�����ϰϤη׻�
	var rad = 0;
	if(mode == 0) {
		//�Ͽ��⸡��
		//var box = ZdcEmapMapObj.getMapBoundBox();
		//if((box.maxx - box.minx) > (box.maxy - box.miny)) {
		//	//������Ȥ�
		//	var p1 = new ZdcPoint(box.maxx,box.maxy,<?PHP echo $D_PFLG; ?>);
		//	var p2 = new ZdcPoint(box.minx,box.maxy,<?PHP echo $D_PFLG; ?>);
		//} else {
		//	//������Ȥ�
		//	var p1 = new ZdcPoint(box.maxx,box.maxy,<?PHP echo $D_PFLG; ?>);
		//	var p2 = new ZdcPoint(box.maxx,box.miny,<?PHP echo $D_PFLG; ?>);
		//}
		//rad = parseInt(ZdcEmapGeometricObj.getPoint2PointDistance(p1,p2) / 2.1);//�Ͽ��ϰϥ��ꥮ����оݤȤ��ʤ��褦2.1�Ⱦ����ݤ��
		var box = ZdcEmapMapObj.getLatLonBox();
		var boxmin = box.getMin();
		var boxmax = box.getMax();
		var dist_x = ZDC.getLatLonToLatLonDistance(new ZDC.LatLon(boxmin.lat, boxmin.lon), new ZDC.LatLon(boxmin.lat, boxmax.lon));
		var dist_y = ZDC.getLatLonToLatLonDistance(new ZDC.LatLon(boxmin.lat, boxmin.lon), new ZDC.LatLon(boxmax.lat, boxmin.lon));
		rad = Math.floor((dist_x>dist_y?dist_y:dist_x)/2.1);
	} else {
		//�Ǵ󸡺�
		rad = <?PHP echo $D_POI_RAD; ?>;
	}
	if (rad > <?PHP echo $API_RAD_MAX; ?>) rad = <?PHP echo $API_RAD_MAX; ?>;//�Ǵ�긡��API��Ⱦ�»������ͤ�Ķ���Ƥ�����Ͼ���ͤǸ���
	//
	//	var opts = new ZdcNearPoiOptions();
	//	opts.startPos = 1;
	//	opts.maxCount =  <?PHP if (isset($D_POI_MAX)) echo $D_POI_MAX; ?>;
	//	opts.genreMenuCode = code;
	//	opts.genreCode = '<?PHP if (isset($D_POI_JNR)) echo $D_POI_JNR; ?>';
	//	opts.lat = p.my;
	//	opts.lon = p.mx;
	//	opts.lat = latlon.lat;
	//	opts.lon = latlon.lon;
	//	opts.limitCount = <?PHP if (isset($D_POI_MAX)) echo $D_POI_MAX; ?>;
	//	opts.radius = rad;
	//	opts.pointFlg = <?PHP echo $D_PFLG; ?>;
	//	opts.lang = '<?PHP echo $D_POI_LANG; ?>';
	//	ZdcEmapNpoi.opts = opts;
	//	
	//	if(opts.genreMenuCode) {
	//		//������λ��꤬���ä����Τ߸���������
	//		ZdcEmapPoiList(0);
	//		ZdcEmapNpoi.search(opts);
	//	}
	
	ZdcEmapNpoiLatLon = center_latlon;
	ZdcEmapNpoiRad = rad;
	ZdcEmapNpoiGenreMenu = code;
	ZdcEmapNpoiLimit = "0"+","+"<?PHP echo $D_POI_MAX; ?>";
	
	var query = {
		latlon: ZdcEmapNpoiLatLon,
		radius: ZdcEmapNpoiRad,
		genrecode: ZdcEmapNpoiGenreMenu,
		limit: ZdcEmapNpoiLimit
	}
	ZdcEmapPoiList(0);
	ZDC.Search.getPoiByLatLon(query, function(info, item){
		ZdcEmapPoiResult(info, item);
	});
}
//��������
//function ZdcEmapPoiResult(result) {
function ZdcEmapPoiResult(status, result) {
	//ZdcEmapSearchClose();
	ZdcEmapPoiRouteClear();
	//���顼����
	//if(result.status != 0 && result.status != 3 && result.status != 5 && result.status != 9) {
	if(status.code != "000" || status.text != "ok") {
		alert("<?PHP echo $D_MSG_ERR_JS_RESULT; ?> poires["+status.code+","+status.text+"]");
		ZdcEmapListObj.innerHTML = "";
		ZdcEmapReadOff();
		return;
	}
	//�Ͽޤ��֤�
	var i,p,mrk,titlelink,title,item,maxlat=0,maxlon=0,minlat=999999999,minlon=999999999;;
	for( i = 0;i < ZdcEmapMapPoiMrkCnt;i ++) {
		//ZdcEmapMapUserLyr.removeMarkerById(ZdcEmapMapPoiMrkId[i]);//�ޡ��������
		if (ZdcEmapMapPoiMrkId[i]) {		<?php // add 2012/03/16 Y.Matsukawa ?>
			ZdcEmapMapObj.removeWidget(ZdcEmapMapPoiMrkId[i]);
			ZdcEmapMapPoiMrkId[i] = null;
		}
	}
	ZdcEmapMapPoiMrkCnt = 0;
	//for( i in result.item ){	mod 2012/05/22 H.Osamoto
	for( i = 0; i < result.item.length; i++ ){
		item = result.item[i];
		//��������κ���
		mrk = ZdcEmapMakeMrkApi2(i,item.poi.latlon.lat,item.poi.latlon.lon,
							<?PHP echo $D_ICON_POI_W; ?>,<?PHP echo $D_ICON_POI_H; ?>,0,0,
							<?PHP echo $D_ICON_POI_OFFSET_X; ?>,<?PHP echo $D_ICON_POI_OFFSET_Y; ?>,0,0,
							'<?PHP echo $D_ICON_POI_IMAGE_DIR; ?>'+item.poi.genre.code.substr(0,5)+'.gif','',
							item.icons,'',item.poiName,0,
							function() { ZdcEmapTipsClick(this.id); },
							null);
		if (ZdcEmapMapPoiMrkId[i] != null) ZdcEmapMapObj.removeWidget(ZdcEmapMapPoiMrkId[i]);//ǰ�Τ���
		ZdcEmapMapObj.addWidget(mrk);
		ZdcEmapMapPoiMrkId[i] = mrk;
		ZdcEmapMapPoiMrkId[i].lat = item.poi.latlon.lat;
		ZdcEmapMapPoiMrkId[i].lon = item.poi.latlon.lon;
		ZdcEmapMapPoiMrkId[i].message = item.poi.text;
		//����Ǿ����ٷ��ټ���
		if(item.poi.latlon.lat > maxlat) maxlat = item.poi.latlon.lat;
		if(item.poi.latlon.lon > maxlon) maxlon = item.poi.latlon.lon;
		if(item.poi.latlon.lat < minlat) minlat = item.poi.latlon.lat;
		if(item.poi.latlon.lon < minlon) minlon = item.poi.latlon.lon;
		ZdcEmapMapPoiMrkCnt ++;
	}
	if (ZdcEmapMapPoiMrkCnt > 0) {
		var latdist;
		var londist;
		var varminlat;
		var varminlon;
		var varmaxlat;
		var varmaxlon;
		var varlatlon_box = new Array();
		// �Ǥ�Υ�줿lat�κ�ʬ
		var minlatdist = Math.abs(minlat - ZdcEmapNpoiLatLon.lat);
		var maxlatdist = Math.abs(maxlat - ZdcEmapNpoiLatLon.lat);
		if (minlatdist > maxlatdist) {
			latdist = minlatdist;
		} else {
			latdist = maxlatdist;
		}
		// �Ǥ�Υ�줿lon�κ�ʬ
		var minlondist = Math.abs(minlon - ZdcEmapNpoiLatLon.lon);
		var maxlondist = Math.abs(maxlon - ZdcEmapNpoiLatLon.lon);
		if (minlondist > maxlondist) {
			londist = minlondist;
		} else {
			londist = maxlondist;
		}
		varminlat = ZdcEmapNpoiLatLon.lat - latdist;
		varminlon = ZdcEmapNpoiLatLon.lon - londist;
		varmaxlat = ZdcEmapNpoiLatLon.lat + latdist;
		varmaxlon = ZdcEmapNpoiLatLon.lon + londist;
		// �Ͽ�ɽ���̼ܼ����Ѳ���ɽ�����ꥢ
		varlatlon_box[0] = new ZDC.LatLon(varminlat, varminlon);
		varlatlon_box[1] = new ZDC.LatLon(varmaxlat, varmaxlon);
		var adjust = ZdcEmapMapObj.getAdjustZoom(varlatlon_box);
		ZdcEmapMapObj.moveLatLon(ZdcEmapNpoiLatLon)
		if (adjust) ZdcEmapMapObj.setZoom(adjust.zoom);
	}
	ZdcEmapMapFrontShopDetail();
	ZdcEmapMapCursorRemove();
	//��ư�̼��ѹ�
	//ZdcEmapMapMoveBoxApi2(minlat,minlon,maxlat,maxlon);
	ZdcEmapReadOff();
}
//�ꥹ��ɽ��
function ZdcEmapPoiListClick(page) {
	if(ZdcEmapButtonNG()) return;
	ZdcEmapPoiList(page);
}
function ZdcEmapPoiList(page) {
	//	var url = "<?PHP echo $D_DIR_BASE_L; ?>emapview_npoi.htm?cid=<?PHP echo $cid; ?>"+
	//			"&jnrmn="+ZdcEmapNpoi.opts.genreMenuCode+"&jnr="+ZdcEmapNpoi.opts.genreCode+
	//			"&lat="+ZdcEmapNpoi.opts.lat+"&lon="+ZdcEmapNpoi.opts.lon+"&radius="+ZdcEmapNpoi.opts.radius+"&page="+page;
	var url = "<?PHP echo $D_DIR_BASE_L; ?>npoi.htm?"+
			"jnrmn="+ZdcEmapNpoiGenreMenu+
			"&lat="+ZdcEmapNpoiLatLon.lat+"&lon="+ZdcEmapNpoiLatLon.lon+"&radius="+ZdcEmapNpoiRad+"&page="+page;
	<?php if(isset($https_req) && $https_req){ ?>url += "&https_req=1";<?php } ?>
	ZdcEmapHttpRequestHtml(url, function(html,status){
		if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> poi["+status+"]";
		ZdcEmapListObj.innerHTML = html;
	});
}

function ZdcEmapCFAfterShopDetailEx(result) {
	if (typeof ZdcEmapCFAfterShopDetail == 'function') {
		ZdcEmapCFAfterShopDetail(result.item);
	}
}

//�ܺ�ɽ��(��������) ������³��
function ZdcEmapShopDetailKidFirst(kid,lat,lon,icnno,nflg,nomove,lvl) {
	if (!ZdcEmapMapObj) return;		<?php // add 2013/08/22 Y.Matsukawa ?>
	ZdcEmapSearchClickFlg = 1;
	if (!lvl) lvl = 0;
	//������������
	//var tmp = "ZdcEmapSearchEventStop();ZdcEmapMapMove('"+lat+"','"+lon+"','"+ZdcEmapMapObj.getZoom()+"');"
	//		+ "ZdcEmapShopDetailKidFirst('"+kid+"','"+lat+"','"+lon+"','"+icnno+"','"+nflg+"','"+lvl+"');";
	//ZdcEmapHistoryAdd("<?PHP echo $D_HISTORY_NAME["Detail"]; ?>",tmp);
	//ZdcEmapHistorySave();
	//
	ZdcEmapShopDetailKid(kid,lat,lon,icnno,nflg,nomove,lvl);
	if(<?php echo $D_DSP_OTHER_KBN; ?> == 0) ZdcEmapSearchShopStart();
	if(<?php echo $D_DSP_OTHER_KBN; ?>) {
		//�����ʳ��Υ�������򥯥ꥢ
		for( i = 0;i < ZdcEmapMapPoiMrkCnt;i ++) {
			if (ZdcEmapMapPoiMrkId[i]) {		<?php // add 2012/03/16 Y.Matsukawa ?>
				ZdcEmapMapObj.removeWidget(ZdcEmapMapPoiMrkId[i]);
				ZdcEmapMapPoiMrkId[i] = null;
			}
		}
	}
}
function ZdcEmapShopDetailKid(kid,lat,lon,icnno,nflg,notmove,lvl) {
	var mrk,tmp;
	ZdcEmapSearchEventStop();
	<?php
	// �������֤˥ޡ�����ɽ��		add 2014/12/08 Y.Matsukawa
	if ($D_SEARCH_MAP_ICON_DTL) {
	?>
	if (ZdcEmapSearchCenter) {
		ZdcEmapSearchMapIcon(ZdcEmapSearchCenter);
	}
	<?php
	}
	?>
	<?php
	// �̼� ?>
	lvl = parseInt(lvl);
	if (lvl && lvl != 0) {
		ZdcEmapMapObj.setZoom(lvl);
	} else if(<?PHP echo $D_INIT_LVL_DETAIL; ?> > 0) {
		ZdcEmapMapObj.setZoom(<?PHP echo $D_INIT_LVL_DETAIL; ?> - 1);
	}
<?php	// �����ܺ�ɽ��������Cookie�˽񤭽Ф�
		//if ($D_COOKIE_SHOPDTL_MAX > 0) {		mod 2014/12/09 Y.Matsukawa
		if ($D_COOKIE_SHOPDTL_AUTOSAVE && $D_COOKIE_SHOPDTL_MAX > 0) {
?>
	var knmenc_obj = document.getElementById("ZdcEmapShopNameEnc");
	var knmenc = "";
	if (knmenc_obj) knmenc = knmenc_obj.value;
	ZdcEmapCookieWriteShopDetail('<?PHP echo $cid; ?>', kid, knmenc);
<?php	}
?>
<?php	// ��������ؿ����������Ƥ�����¹� ?>
	if (typeof ZdcEmapCFAfterShopDetail == 'function') {
		var opts = new ZdcKyotenIdOptions();
		//opts.cid = '<?PHP echo $D_CID; ?>'		<?php // mod 2011/12/05 Y.Matsukawa ?>
		opts.cid = '<?PHP echo $D_DATA_CID; ?>';
		opts.kid = kid;
		opts.nolog = true;
		opts.timeout = <?PHP echo $D_AJAX_TIMEOUT; ?>;
		ZdcEmapKyotenId.opts = opts;
		ZdcEmapKyotenId.search(opts, ZdcEmapCFAfterShopDetailEx);
	}
	//�ե����������������ɽ������
	mrk = ZdcEmapMakeMrkApi2(0, lat, lon, 
							ZdcEmapIconW['@SEL'], ZdcEmapIconH['@SEL'],0,0,
							ZdcEmapIconOffsetX['@SEL'], ZdcEmapIconOffsetY['@SEL'],0,0,
							ZdcEmapIconImg['@SEL'],'',
							'', '', '', 0, null, null, null
						);
	if(ZdcEmapMapCurMrkId != null) ZdcEmapMapObj.removeWidget(ZdcEmapMapCurMrkId);
	if(ZdcEmapMapCurFocusMrkId != null) ZdcEmapMapObj.removeWidget(ZdcEmapMapCurFocusMrkId);
	ZdcEmapMapObj.addWidget(mrk);
	ZdcEmapMapCurFocusMrkId = mrk;
	mrk.setZindex(101);
	
	//�ܺ٥��������ɽ������
	<?php // add 2012/11/13 Y.Matsukawa [ ?>
	if (!ZdcEmapIconImg[icnno]) {
		icnno = "@TP";//Ʃ������
	}
	<?php // add 2012/11/13 Y.Matsukawa ] ?>
	if(nflg == 1) tmp = ZdcEmapIconImg["@NEW"];
		else tmp = "";
	mrk = ZdcEmapMakeMrkApi2(0, lat, lon, 
							ZdcEmapIconW[icnno], ZdcEmapIconH[icnno],ZdcEmapIconW['@NEW'],ZdcEmapIconH['@NEW'],
							ZdcEmapIconOffsetX[icnno], ZdcEmapIconOffsetY[icnno],ZdcEmapIconW[icnno]-ZdcEmapIconW['@NEW'],ZdcEmapIconH[icnno],
							ZdcEmapIconImg[icnno],tmp,
							kid, icnno, '', nflg, null, null, lvl
						);
	
	if(ZdcEmapMapShopDetailMrkId != null) ZdcEmapMapObj.removeWidget(ZdcEmapMapShopDetailMrkId);
	ZdcEmapMapObj.addWidget(mrk);
	ZdcEmapMapShopDetailMrkId = mrk;
	ZdcEmapMapShopDetailMrkId.data1 = kid;
	ZdcEmapMapShopDetailMrkId.lat = lat;
	ZdcEmapMapShopDetailMrkId.lon = lon;
	//ư��⡼�ɤ��ڤ��ؤ�
	if(<?php echo $D_DSP_OTHER_KBN; ?>) {
		//�����ٰܺʳ�����ɽ��
		ZdcEmapSearchEventStop();
		ZdcEmapSearchShopClose();
	} else {
		//�Ǵ����ɽ��
		ZdcEmapSearchEventStart();
	}
	if (!notmove) ZdcEmapMapMove(lat, lon);
	var center = new ZDC.LatLon(Number(lat), Number(lon));
	ZdcEmapMapObj.setHome(center);
	<?php
	// �������֤�Ź�ޥ����������꤭��̼ܤ��ѹ�		add 2014/12/08 Y.Matsukawa
	if ($D_SEARCH_MAP_ICON_DTL || $D_SEARCH_MAP_CENTER) {
	?>
	if (ZdcEmapSearchCenter) {
		var adj = ZdcEmapMapObj.getAdjustZoom([ZdcEmapSearchCenter, new ZDC.LatLon(lat, lon)], {fix:true});
		ZdcEmapMapObj.setZoom(adj.zoom);
	}
	<?php
	} ?>
	//¾�ξ�����Ĥ���
	ZdcEmapShopMsgClose();
	//ZdcEmapSearchClose();
	ZdcEmapPoiRouteClear();
	
	// add 2011/12/27 H.osamoto [
	//�������֥��������ɽ������
	if ("<?PHP echo $D_TYPE_SMSG; ?>") {
		if (!ZdcEmapMapSearchPoint) {
			ZdcEmapMapSearchPoint = ZdcEmapMakeMrkApi2(0, '<?PHP echo $p_f4; ?>', '<?PHP echo $p_f5; ?>', 
								<?PHP echo $D_ICON_EKI_W; ?>,<?PHP echo $D_ICON_EKI_H; ?>,0,0,
								<?PHP echo $D_ICON_EKI_OFFSET_X; ?>,<?PHP echo $D_ICON_EKI_OFFSET_Y; ?>,0,0,
								'<?PHP echo $D_ICON_EKI_IMAGE; ?>','',
								'', '', '', 0, null, null, null
								);
			ZdcEmapMapObj.addWidget(ZdcEmapMapSearchPoint);
		}
	}
	// add 2011/12/27 H.osamoto ]
}

//-------------------------------------------------------------
//�Ǵ�ظ���
//-------------------------------------------------------------
<?php if($D_REQ_JSAPI_V20["search"]){ ?>
var ZdcEmapNekiLat;
var ZdcEmapNekiLon;
<?php } ?>
//�ظ�������
function ZdcEmapStationClick(lat,lon) {
	if(ZdcEmapButtonNG()) return;
	<?php	// ��������ؿ����������Ƥ�����¹� ?>
		if (typeof ZdcEmapCFBeforeStationClick == 'function') {
			ZdcEmapCFBeforeStationClick();
		}
	ZdcEmapPoiRouteClear();
	ZdcEmapShopMsgClose();
	ZdcEmapSearchEventStop();
	ZdcEmapFreeRouteStatic(lat,lon);		<?php // add 2013/06/03 Y.Matsukawa ?>
	//
	ZdcEmapStation(lat,lon);
	//���̤��ڤ��ؤ���
	if(ZdcEmapCondObj.mode != "eki") {
		ZdcEmapSearchShopClose();
		ZdcEmapCondObj.innerHTML = "";
		ZdcEmapCondObj.mode = "eki";
		ZdcEmapCondObj.style.visibility = "hidden";
	}
	// �ѥ󤯤��ɲ�		add 2015/01/28 Y.Matsukawa
	ZdcEmapAddOptionalHistory('<?php echo $D_HISTORY_NAME["Neki"]; ?>');
}
//�ظ����ᥤ�����
function ZdcEmapStation(lat,lon) {
	ZdcEmapReadOn();
	//
	
	var result;
	
	if (lat && lon){
		tmplatlon = new ZDC.LatLon(Number(lat), Number(lon));
	} else {
		tmplatlon = ZdcEmapMapObj.getLatLon();
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

function ZdcGetNearStationResult(stt, res) {

	//�ꥹ�Ȥ�ɽ������
	ZdcEmapStationList(0);
	
	//����������������
	ZdcEmapStationResult(stt, res);
}

//��������
function ZdcEmapStationResult(status, result) {
	//ZdcEmapSearchClose();
	ZdcEmapPoiRouteClear();
	//���顼����
	if(status.code != "000" || status.text != "ok") {
		alert("<?PHP echo $D_MSG_ERR_JS_RESULT; ?> ekires["+status.code+","+status.text+"]");
		ZdcEmapSearchEventStart();
		ZdcEmapListObj.innerHTML = "";
		ZdcEmapReadOff();
		return;
	}
	//�Ͽޤ��֤�
	var i,item,mrk,maxlat=ZdcEmapNekiLat,maxlon=ZdcEmapNekiLon,minlat=maxlat,minlon=maxlon;
	for( i = 0;i < ZdcEmapMapPoiMrkCnt;i ++) {
		if (ZdcEmapMapPoiMrkId[i]) {		<?php // add 2012/03/16 Y.Matsukawa ?>
			ZdcEmapMapObj.removeWidget(ZdcEmapMapPoiMrkId[i]);
			ZdcEmapMapPoiMrkId[i] = null;
		}
	}
	ZdcEmapMapPoiMrkCnt = 0;
	//for( i in result.item ){	mod 2012/05/22 H.Osamoto
	for( i = 0; i < result.item.length; i++ ){
		item = result.item[i];
		//��������κ���

// mod 2015/07/10 Y.Uesugi [
		//ʮ�Ф���ɽ��(���ܸ�ɽ������ɽ��)
		if ("<?PHP echo $D_MAP_NO_TIPS_CLICK; ?>") {
			mrk = ZdcEmapMakeMrkApi2(i,item.poi.latlon.lat,item.poi.latlon.lon,
								<?PHP echo $D_ICON_EKI_W; ?>,<?PHP echo $D_ICON_EKI_H; ?>,0,0,
								<?PHP echo $D_ICON_EKI_OFFSET_X; ?>,<?PHP echo $D_ICON_EKI_OFFSET_Y; ?>,0,0,
								'<?PHP echo $D_ICON_EKI_IMAGE; ?>','',
								item.icons, '', item.poi.text, 0,
								function() { ZdcEmapRouteSearchApi2(this.id) },
								0,null);
		} else {
		//ʮ�Ф�ɽ��
			mrk = ZdcEmapMakeMrkApi2(i,item.poi.latlon.lat,item.poi.latlon.lon,
								<?PHP echo $D_ICON_EKI_W; ?>,<?PHP echo $D_ICON_EKI_H; ?>,0,0,
								<?PHP echo $D_ICON_EKI_OFFSET_X; ?>,<?PHP echo $D_ICON_EKI_OFFSET_Y; ?>,0,0,
								'<?PHP echo $D_ICON_EKI_IMAGE; ?>','',
								item.icons, '', item.poi.text, 0,
								function() { ZdcEmapRouteSearchApi2(this.id) },
								function() { ZdcEmapTipsClick(this.id); },null);
		}
// mod 2015/07/10 Y.Uesugi ]

		if (ZdcEmapMapPoiMrkId[i] != null) ZdcEmapMapObj.removeWidget(ZdcEmapMapPoiMrkId[i]);//ǰ�Τ���
		ZdcEmapMapObj.addWidget(mrk);
		ZdcEmapMapPoiMrkId[i] = mrk;
		ZdcEmapMapPoiMrkId[i].lat = item.poi.latlon.lat;
		ZdcEmapMapPoiMrkId[i].lon = item.poi.latlon.lon;
		ZdcEmapMapPoiMrkId[i].message = item.poi.text;
		//����Ǿ����ٷ��ټ���
		if(item.poi.latlon.lat > maxlat) maxlat = item.poi.latlon.lat;
		if(item.poi.latlon.lon > maxlon) maxlon = item.poi.latlon.lon;
		if(item.poi.latlon.lat < minlat) minlat = item.poi.latlon.lat;
		if(item.poi.latlon.lon < minlon) minlon = item.poi.latlon.lon;
		ZdcEmapMapPoiMrkCnt ++;
	}
	if (ZdcEmapMapPoiMrkCnt > 0) {
		var center_latlon = new ZDC.LatLon(Number(ZdcEmapMapShopDetailMrkId.lat), Number(ZdcEmapMapShopDetailMrkId.lon));
		
		var latdist;
		var londist;
		var varminlat;
		var varminlon;
		var varmaxlat;
		var varmaxlon;
		var varlatlon_box = new Array();
		
		// �Ǥ�Υ�줿lat�κ�ʬ
		var minlatdist = Math.abs(minlat - center_latlon.lat);
		var maxlatdist = Math.abs(maxlat - center_latlon.lat);
		if (minlatdist > maxlatdist) {
			latdist = minlatdist;
		} else {
			latdist = maxlatdist;
		}
		
		// �Ǥ�Υ�줿lon�κ�ʬ
		var minlondist = Math.abs(minlon - center_latlon.lon);
		var maxlondist = Math.abs(maxlon - center_latlon.lon);
		if (minlondist > maxlondist) {
			londist = minlondist;
		} else {
			londist = maxlondist;
		}
		
		varminlat = center_latlon.lat - latdist;
		varminlon = center_latlon.lon - londist;
		varmaxlat = center_latlon.lat + latdist;
		varmaxlon = center_latlon.lon + londist;
		
		// �Ͽ�ɽ���̼ܼ����Ѳ���ɽ�����ꥢ
		varlatlon_box[0] = new ZDC.LatLon(varminlat, varminlon);
		varlatlon_box[1] = new ZDC.LatLon(varmaxlat, varmaxlon);
		
		var adjust = ZdcEmapMapObj.getAdjustZoom(varlatlon_box);
		
		ZdcEmapMapObj.moveLatLon(center_latlon)
		if (adjust) ZdcEmapMapObj.setZoom(adjust.zoom);
	}
	ZdcEmapMapFrontShopDetail();
	ZdcEmapMapCursorRemove();
	ZdcEmapReadOff();
}
//�ꥹ��ɽ��
function ZdcEmapStationListClick(page) {
	if(ZdcEmapButtonNG()) return;
	ZdcEmapStationList(page)
}
function ZdcEmapStationList(page) {
	//var url = "<?PHP echo $D_DIR_BASE_L; ?>neki.htm?cid=<?PHP echo $cid; ?>"+
	var url = "<?PHP echo $D_DIR_BASE_L; ?>neki.htm?"+
			  "lat="+ZdcEmapNekiLat+"&lon="+ZdcEmapNekiLon+"&page="+page;
	<?php if($https_req){ ?>url += "&https_req=1";<?php } ?>
	ZdcEmapHttpRequestHtml(url, function(html,status){
		if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> eki["+status+"]";
		ZdcEmapListObj.innerHTML = html;
	});
}

<?php
//-------------------------------------------------------------
// ��ȯ�Ϥ���ꤷ�ƥ롼��õ��
//-------------------------------------------------------------
?>
//-------------------------------------------------------------
// ��ȯ�ϻ���롼�Ȥ����Ͻ���ͤ򥻥å�
//-------------------------------------------------------------
var ZdcEmapFRouteInitStr = null;
function ZdcEmapSetFRouteInit(str) {
	ZdcEmapFRouteInitStr = str;
}
// ��ȯ�Ϥ���ꤷ�ƥ롼��õ���⡼�ɳ���
function ZdcEmapFreeRouteClick(lat, lon) {
	if(ZdcEmapButtonNG()) return;
	<?php	// ��������ؿ����������Ƥ�����¹� ?>
		if (typeof ZdcEmapCFBeforeRouteClick == 'function') {
			ZdcEmapCFBeforeRouteClick();
		}
	//�����ʳ��Υ�������򥯥ꥢ
	for( i = 0;i < ZdcEmapMapPoiMrkCnt;i ++) {
		if (ZdcEmapMapPoiMrkId[i]) {		<?php // add 2012/03/16 Y.Matsukawa ?>
			ZdcEmapMapObj.removeWidget(ZdcEmapMapPoiMrkId[i]);
			ZdcEmapMapPoiMrkId[i] = null;
		}
	}
	ZdcEmapPoiRouteClear();		// �롼�ȥ��ꥢ
	ZdcEmapShopMsgClose();		// �᤭�Ф��õ�
	ZdcEmapSearchEventStop();	// �������٥�����
	// ���̤��ڤ��ؤ���
	if(ZdcEmapCondObj.mode != "froute") {
		ZdcEmapSearchShopClose();
		ZdcEmapCondObj.innerHTML = "";
		ZdcEmapCondObj.mode = "froute";
		ZdcEmapCondObj.style.visibility = "hidden";
		//var url = "<?PHP echo $D_DIR_BASE_L; ?>emapview_froute.htm?cid=<?PHP echo $cid; ?>"
		var url = "<?PHP echo $D_DIR_BASE_L; ?>froute.htm?"
				+"lat="+lat+"&lon="+lon+"&mode=init"
		;
		//<?php if($P_FREEPARAMS){ ?>url += "&<?php echo $P_FREEPARAMS; ?>";<?php } ?>		mod 2014/02/05 Y.Matsukawa
		<?php if($P_FREEPARAMS_JS){ ?>url += "&<?php echo $P_FREEPARAMS_JS; ?>";<?php } ?>
		<?php if($https_req){ ?>url += "&https_req=1";<?php } ?>
		if (ZdcEmapFRouteInitStr) url += "&frouteinit="+ZdcEmapFRouteInitStr;
		ZdcEmapHttpRequestHtml(url, function(html,status){
			if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> froute["+status+"]";
			ZdcEmapListObj.innerHTML = html;
		});
	}
	// �ѥ󤯤��ɲ�		add 2015/01/28 Y.Matsukawa
	ZdcEmapAddOptionalHistory('<?php echo $D_HISTORY_NAME["FRoute"]; ?>');
}
// ��ȯ�Ϥ���ꤷ�ƥ롼��õ���⡼�ɳ��ϡ�Light��Maplink��
function ZdcEmapFreeRouteClickLight(lat, lon) {
	if(ZdcEmapButtonNG()) return;
	//�����ʳ��Υ�������򥯥ꥢ
	for( i = 0;i < ZdcEmapMapPoiMrkCnt;i ++) {
		if (ZdcEmapMapPoiMrkId[i]) {		<?php // add 2012/08/27 Y.Matsukawa ?>
			<?php //ZdcEmapMapUserLyr.removeMarkerById(ZdcEmapMapPoiMrkId[i]);		mod 2012/08/27 Y.Matsukawa ?>
			ZdcEmapMapObj.removeWidget(ZdcEmapMapPoiMrkId[i]);
			ZdcEmapMapPoiMrkId[i] = null;
		}
	}
	ZdcEmapPoiRouteClear();		// �롼�ȥ��ꥢ
	ZdcEmapShopMsgClose();		// �᤭�Ф��õ�
	ZdcEmapSearchEventStop();	// �������٥�����
	// ���̤��ڤ��ؤ���
	ZdcEmapSearchShopClose();
	//var url = "<?PHP echo $D_DIR_BASE_L; ?>emapview_froute.htm?cid=<?PHP echo $cid; ?>"
	var url = "<?PHP echo $D_DIR_BASE_L; ?>froute.htm?"
			+"lat="+lat+"&lon="+lon+"&mode=init"
	;
	//<?php if($P_FREEPARAMS){ ?>url += "&<?php echo $P_FREEPARAMS; ?>";<?php } ?>		mod 2014/02/05 Y.Matsukawa
	<?php if($P_FREEPARAMS_JS){ ?>url += "&<?php echo $P_FREEPARAMS_JS; ?>";<?php } ?>
	<?php if($https_req){ ?>url += "&https_req=1";<?php } ?>
	ZdcEmapHttpRequestHtml(url, function(html,status){
		if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> froute["+status+"]";
		ZdcEmapListObj.innerHTML = html;
	});
}
<?php // ��ȯ�Ϥ���ꤷ�ƥ롼�ȸ���ɽ��		add 2013/06/03 Y.Matsukawa ?>
function ZdcEmapFreeRouteStatic(lat, lon) {
	if(!ZdcEmapFRouteStaticObj) return;
	var url = "<?PHP echo $D_DIR_BASE_L; ?>froute.htm?"
			+"lat="+lat+"&lon="+lon+"&mode=init"
	;
	//<?php if($P_FREEPARAMS){ ?>url += "&<?php echo $P_FREEPARAMS; ?>";<?php } ?>		mod 2014/02/05 Y.Matsukawa
	<?php if($P_FREEPARAMS_JS){ ?>url += "&<?php echo $P_FREEPARAMS_JS; ?>";<?php } ?>
	<?php if($https_req){ ?>url += "&https_req=1";<?php } ?>
	if (ZdcEmapFRouteInitStr) url += "&frouteinit="+ZdcEmapFRouteInitStr;
	ZdcEmapHttpRequestHtml(url, function(html,status){
		if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> froute["+status+"]";
		ZdcEmapFRouteStaticObj.innerHTML = html;
	});
}
// �롼��ɽ��
function ZdcEmapFreeRouteDraw(lat, lon) {
	if(ZdcEmapButtonNG()) return;
	// �Ͽ��濴���֤����
	var center = ZdcEmapMapObj.getLatLon();
	var mx = center.lon;
	var my = center.lat;
	ZdcEmapRouteCase = 'free';		<?php // add 2013/06/03 Y.Matsukawa ?>
	<?php // add 2013/06/03 Y.Matsukawa [ ?>
	if(ZdcEmapFRouteStaticObj) {
		//�����ʳ��Υ�������򥯥ꥢ
		for( i = 0;i < ZdcEmapMapPoiMrkCnt;i ++) {
			if (ZdcEmapMapPoiMrkId[i]) {		<?php // add 2012/03/16 Y.Matsukawa ?>
				ZdcEmapMapObj.removeWidget(ZdcEmapMapPoiMrkId[i]);
				ZdcEmapMapPoiMrkId[i] = null;
			}
		}
		ZdcEmapPoiRouteClear();		// �롼�ȥ��ꥢ
		ZdcEmapShopMsgClose();		// �᤭�Ф��õ�
		ZdcEmapSearchEventStop();	// �������٥�����
		ZdcEmapSearchShopClose();
		ZdcEmapCondObj.innerHTML = "";
		ZdcEmapCondObj.mode = "";
		ZdcEmapCondObj.style.visibility = "hidden";
		ZdcEmapFreeRouteClose();
	}
	<?php // add 2013/06/03 Y.Matsukawa ] ?>
	// �롼������
	ZdcEmapRouteSearch("<?php echo $D_USER_DEFNAME; ?>", lon, lat, "�Ͽ��濴", mx, my);
	<?php if ($D_FROUTE_CLOSE) { ?>
	ZdcEmapFreeRouteClose();
	<?php } ?>
}
// ��ȯ�ϻ���롼��õ�����Ĥ���
function ZdcEmapFreeRouteClose() {
	ZdcEmapListObj.innerHTML = '';
}
// �ե꡼��ɸ���
function ZdcEmapFreeRouteSearch(lat, lon) {
	var txt = document.getElementById("freeRouteSearchEntText");
	if (!txt || !txt.value) return;
	//var url = "<?PHP echo $D_DIR_BASE_L; ?>emapview_froute.htm?cid=<?PHP echo $cid; ?>"
	var url = "<?PHP echo $D_DIR_BASE_L; ?>froute.htm?"
			+"lat="+lat+"&lon="+lon+"&mode=srch"
			+"&keyword="+txt.value
	;
	// add 2013/06/11 Y.Matsukawa [
	var typ = document.getElementById("freeRouteSearchType");
	if (typ && typ.value) {
		url += "&type="+typ.value;
	}
	var adcd = document.getElementById("freeRouteSearchAdcd");
	if (adcd && adcd.value) {
		url += "&adcd="+adcd.value;
	}
	// add 2013/06/11 Y.Matsukawa ]
	//<?php if($P_FREEPARAMS){ ?>url += "&<?php echo $P_FREEPARAMS; ?>";<?php } ?>		mod 2014/02/05 Y.Matsukawa
	<?php if($P_FREEPARAMS_JS){ ?>url += "&<?php echo $P_FREEPARAMS_JS; ?>";<?php } ?>
	<?php if($https_req){ ?>url += "&https_req=1";<?php } ?>
	ZdcEmapHttpRequestHtml(url, function(html,status){
		if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> froute["+status+"]";
		<?php // add 2013/06/03 Y.Matsukawa [ ?>
		if(ZdcEmapFRouteStaticObj) {
			//�����ʳ��Υ�������򥯥ꥢ
			for( i = 0;i < ZdcEmapMapPoiMrkCnt;i ++) {
				if (ZdcEmapMapPoiMrkId[i]) {		<?php // add 2012/03/16 Y.Matsukawa ?>
					ZdcEmapMapObj.removeWidget(ZdcEmapMapPoiMrkId[i]);
					ZdcEmapMapPoiMrkId[i] = null;
				}
			}
			ZdcEmapPoiRouteClear();		// �롼�ȥ��ꥢ
			ZdcEmapShopMsgClose();		// �᤭�Ф��õ�
			ZdcEmapSearchEventStop();	// �������٥�����
			ZdcEmapSearchShopClose();
			ZdcEmapCondObj.innerHTML = "";
			ZdcEmapCondObj.mode = "";
			ZdcEmapCondObj.style.visibility = "hidden";
			ZdcEmapFreeRouteClose();
			ZdcEmapFRouteStaticObj.innerHTML = html;
		} else {
		<?php // add 2013/06/03 Y.Matsukawa ] ?>
			ZdcEmapListObj.innerHTML = html;
		}
	});
}
// �ե꡼��ɸ����ʥڡ��������
<?php //function ZdcEmapFreeRoutePage(lat, lon, page, type, keyword) {		mod 2013/06/11 Y.Matsukawa ?>
function ZdcEmapFreeRoutePage(lat, lon, page, type, keyword, adcd) {
	if (!page) page = 0;
	if (!type) type = "";
	if (!adcd) adcd = "";		<?php // add 2013/06/11 Y.Matsukawa ?>
	//var url = "<?PHP echo $D_DIR_BASE_L; ?>emapview_froute.htm?cid=<?PHP echo $cid; ?>"
	var url = "<?PHP echo $D_DIR_BASE_L; ?>froute.htm?"
			+"lat="+lat+"&lon="+lon+"&mode=srch&page="+page+"&type="+type
			+"&keyword="+keyword
	;
	if(adcd) url += "&adcd="+adcd;		<?php // add 2013/06/11 Y.Matsukawa ?>
	//<?php if($P_FREEPARAMS){ ?>url += "&<?php echo $P_FREEPARAMS; ?>";<?php } ?>		mod 2014/02/05 Y.Matsukawa
	<?php if($P_FREEPARAMS_JS){ ?>url += "&<?php echo $P_FREEPARAMS_JS; ?>";<?php } ?>
	<?php if($https_req){ ?>url += "&https_req=1";<?php } ?>
	ZdcEmapHttpRequestHtml(url, function(html,status){
		if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> froute["+status+"]";
		<?php // add 2013/06/03 Y.Matsukawa [ ?>
		if(ZdcEmapFRouteStaticObj) {
			ZdcEmapFRouteStaticObj.innerHTML = html;
		} else {
		<?php // add 2013/06/03 Y.Matsukawa ] ?>
			ZdcEmapListObj.innerHTML = html;
		}
	});
}

<?php
//-------------------------------------------------------------
// �ڵ������������Cookie���ɤ߹���
//-------------------------------------------------------------
?>
function ZdcEmapCookieGetShopList(cid) {
	var shop_list = new Array();
	var pc_shopdtl = "";
	var key = "PC_SHOPDTL_"+cid;
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
//-------------------------------------------------------------
// �ڵ�����������۵�����Cookie�˽񤭽Ф�
//-------------------------------------------------------------
?>
function ZdcEmapCookieWriteShopDetail(cid, kid, knmenc) {
	var key = "PC_SHOPDTL_"+cid;
	var save_value = "";
	var new_value = kid+","+knmenc;
	<?php 
	// del 2014/12/11 Y.Matsukawa [
	//	var pc_shopdtl = "";
	//	if (!navigator.cookieEnabled) return;
	//	// Cookie�ɤ߹���
	//	var ck = document.cookie;
	//	if (ck != "") {
	//		cookies = ck.split(";");
	//		for (i = 0; i < cookies.length; i++) {
	//			kv = cookies[i].split("=");
	//			if (kv[0].replace(/^\s+|\s+$/g, "") == key && kv[1]) {
	//				pc_shopdtl = kv[1].replace(/^\s+|\s+$/g, "");
	//				break;
	//			}
	//		}
	//		if (pc_shopdtl != "") {
	//			vals = pc_shopdtl.split(",");
	//			var max = Math.floor(vals.length/2);
	//			if (max > < ?php echo $D_COOKIE_SHOPDTL_MAX-1; ? >) max = < ?php echo $D_COOKIE_SHOPDTL_MAX-1; ? >;
	//			var oc = 0;
	//			for (i = 0; i < max*2; i++) {
	//				if (vals[i*2] != undefined) {
	//					if (vals[i*2+1] == undefined) vals[i*2+1] = '';
	//					old_value = vals[i*2]+","+vals[i*2+1];
	//					if (old_value != new_value) {
	//						save_value += ","+old_value;
	//						oc++;
	//						if (oc >= max) break;
	//					}
	//				}
	//			}
	//		}
	//	}
	// del 2014/12/11 Y.Matsukawa ] ?>
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

<?php
// add 2014/12/09 Y.Matsukawa
//-------------------------------------------------------------
// �ڵ������������Cookie�������������1��ޤ���n���
//-------------------------------------------------------------
?>
function ZdcEmapCookieRemoveShop(cid, kid) {
	var key = "PC_SHOPDTL_"+cid;
	var save_value = "";
	var kid_list = new Array();
	if (typeof kid == "string") {
		// 1���string��
		kid_list = "|"+kid+"|";
	} else {
		// n���Array��
		kid_list = "|"+kid.join("|")+"|";
	}
	var shop_list = ZdcEmapCookieGetShopList(cid);
	var cnt = shop_list.length;
	if (cnt > 0) {
		for (var i = 0; i < cnt; i++) {
			if (kid_list.indexOf("|"+shop_list[i]["kid"]+"|") < 0) {
				if (save_value != "") save_value += ",";
				save_value += shop_list[i]["kid"] + "," + shop_list[i]["name"];
			}
		}
	}
	// Cookie�񤭽Ф�
	ZdcEmapWriteCookie(key, save_value, <?php echo $D_COOKIE_SHOPDTL_EXPIRE; ?>);
}

<?php
// add 2015/01/04 Y.Matsukawa
//-------------------------------------------------------------
// �ڵ������������Cookie���ꥢ
//-------------------------------------------------------------
?>
function ZdcEmapCookieClear(cid) {
	var key = "PC_SHOPDTL_"+cid;
	ZdcEmapWriteCookie(key, "", <?php echo $D_COOKIE_SHOPDTL_EXPIRE; ?>);
}

<?php
// add 2014/12/10 Y.Matsukawa
//-------------------------------------------------------------
// �ڵ������������Cookie��¸�Ѥߤε���ID�ꥹ�ȡʥ���޶��ڤ�ʸ����ˤ����
//-------------------------------------------------------------
?>
function ZdcEmapCookieGetKidList(cid) {
	var shop_list = ZdcEmapCookieGetShopList(cid);
	var cnt = shop_list.length;
	if (cnt > 0) {
		var kid_list = new Array();
		for (var i = 0; i < cnt; i++) {
			kid_list[i] = shop_list[i]["kid"];
		}
		return kid_list.join(",");
	} else {
		return "";
	}
}

<?php
// add 2014/12/10 Y.Matsukawa
//-------------------------------------------------------------
// �ڵ������������Cookie��¸�Ѥߤε�����������
//-------------------------------------------------------------
?>
function ZdcEmapCookieGetCount(cid) {
	var shop_list = ZdcEmapCookieGetShopList(cid);
	return shop_list.length;
}

<?php
// add 2014/12/11 Y.Matsukawa
//-------------------------------------------------------------
// �ڵ�����������۱�������������̤�ɽ��
//-------------------------------------------------------------
?>
function ZdcEmapShowCookieShopList(callback) {
	var url = "<?PHP echo $D_DIR_BASE_L; ?>klistck.htm?";
	if (ZdcEmapCondParms) url += ZdcEmapCondParms+"&";
	url += "<?php echo ($P_FREEPARAMS_ENC?$P_FREEPARAMS_ENC.'&':''); ?>";
	// Cookie�ʱ����������¸�Ѥߤε���ID��ʣ���ˤ�����Ϥ� ?>
	var ckkids = ZdcEmapCookieGetKidList("<?php echo $D_CID; ?>");
	url += "&ckkids="+ckkids;
	var dd = new Date();
	var ts = dd.getTime();
	url += "&ts="+ts;
	ZdcEmapHttpRequestHtml(url, callback, false, 2);
}

//-------------------------------------------------------------
// cond�񤭴���
//-------------------------------------------------------------
function ZdcEmapChangeCond(prm) {
	//var url = "<?PHP echo $D_DIR_BASE_L; ?>cond.htm?cid=<?PHP echo $cid; ?>";
	var url = "<?PHP echo $D_DIR_BASE_L; ?>cond.htm?";
	if (prm) url = url + "&" + prm;
	//<?php if(isset($condprm) && $condprm != '') { ?>url += "&<?php echo $condprm; ?>";<?php } ?>		mod 2014/02/05 Y.Matsukawa
	<?php if(isset($condprm_js) && $condprm_js != '') { ?>url += "&<?php echo $condprm_js; ?>";<?php } ?>
	//<?php if($P_FREEPARAMS){ ?>url += "&<?php echo $P_FREEPARAMS; ?>";<?php } ?>		mod 2014/02/05 Y.Matsukawa
	<?php if($P_FREEPARAMS_JS){ ?>url += "&<?php echo $P_FREEPARAMS_JS; ?>";<?php } ?>
	<?php if($adcd!=""){ ?>url += "&adcd=<?php echo $adcd; ?>";<?php } ?>
	<?php if($area!=""){ ?>url += "&area=<?php echo $area; ?>";<?php } ?>
	<?php if($https_req){ ?>url += "&https_req=1";<?php } ?>
	ZdcEmapHttpRequestHtml(url, function(html,status){
		if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> cond["+status+"]";
		ZdcEmapCondObj.innerHTML = html;
	});
}
//-------------------------------------------------------------
// �������ܻ��˸���ɽ�����Ƥ���̼ܤ�����Ѥ�
//-------------------------------------------------------------
function ZdcEmapDeliverMapZoom(url) {
	var zoom = ZdcEmapMapObj.getZoom();
	if (zoom == 0) zoom = 1;
	url += "&lvl="+zoom;
	location.href = url;
}

// add 2014/11/28 Y.Matsukawa
//-------------------------------------------------------------
// �������֤˥ޡ�����ɽ��
//-------------------------------------------------------------
function ZdcEmapSearchMapIcon(latlon) {
<?php	if ($D_SEARCH_MAP_ICON_IMG) { ?>
	var mrk = new ZDC.Marker(latlon,{
		offset: new ZDC.Pixel(<?php echo $D_SEARCH_MAP_ICON_OFX; ?>, <?php echo $D_SEARCH_MAP_ICON_OFY; ?>),
		custom: {
			base : {
				src: "<?php echo $D_SEARCH_MAP_ICON_IMG; ?>",
				imgSize: ZDC.WH(<?php echo $D_SEARCH_MAP_ICON_W; ?>, <?php echo $D_SEARCH_MAP_ICON_H; ?>)
			}
		}
	});
<?php	} else { ?>
	var mrk = new ZDC.Marker(latlon,{
		color: ZDC.MARKER_COLOR_ID_GREEN_S
	});
<?php	} ?>
	mrk.setZindex(300);
	ZdcEmapMapObj.addWidget(mrk);
}

// add 2016/01/18 Y.Uesugi [
//-------------------------------------------------------------
// �Ͽ��濴���֤ν���ɽ��
//-------------------------------------------------------------
function ZdcMapCenterAddrSelect(){
	this.type = 'ZdcMapCenterAddrSelect';
	this.result = false;
	this.text_data = null;
}
ZdcMapCenterAddrSelect.prototype.getResult = function(){
	return this.result;
}
ZdcMapCenterAddrSelect.prototype.abort = function(){
	if( this.httpReq ){
		this.httpReq.abort();
	}
}
ZdcMapCenterAddrSelect.prototype.search = function(opts, callback){
	var center = ZdcEmapMapObj.getLatLon();

	var owner = this;
	var enc = "EUC";
	var target_url = "<?php echo $D_SSAPI['getadstr']; ?>";
	var prm = '';
	prm += '&key=<?PHP echo $D_SSAPI_KEY; ?>';
	prm += '&lat='+center.lat;
	prm += '&lon='+center.lon;
	prm += "&mclv=6";
	prm += '&enc='+enc;
	var request_url = target_url+'?'+prm;
	this.httpReq = new ZdcEmapHttpRequest('EUC', 'EUC');
	this.httpReq.request(request_url, function(reference_text, status){
		var result = new ZdcMapCenterAddrSelectResult(reference_text, status);
		result.type = owner.type;
		result.options = opts;
		owner.result = result;
		if( callback != null ){
			callback(result);
		}
	}, opts.timeout);
}
function ZdcMapCenterAddrSelectOptions(frewd){
	//default��
	this.lat = '';
	this.lon = '';
	this.timeout = 60000;
}
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

var ZdcMapCenterAddrSelectObj = new ZdcMapCenterAddrSelect();
function ZdcEmapSetMapCenterAddr(callback) {
	 var opts = new ZdcMapCenterAddrSelectOptions();
	 if(ZdcEmapSearchCenter != null) { <?php // add 2016/10/31 H.Osamoto ?>
	 opts.lat = ZdcEmapSearchCenter.lat;
	 opts.lon = ZdcEmapSearchCenter.lon;
	 opts.timeout = <?PHP echo $D_AJAX_TIMEOUT; ?>;
	 ZdcMapCenterAddrSelectObj.opts = opts;
	 ZdcMapCenterAddrSelectObj.search(opts, callback);
	 } <?php // add 2016/10/31 H.Osamoto ?>
}

function callbackCenterAddr(result) {
	//�����
	if (result.items && result.items.length) {
		var addr = document.getElementById('ZdcEmapAddr');
		if(addr){
			addr.innerHTML = result.items[0].addr;
		}
	}
}
// add 2016/01/18 Y.Uesugi ]


// add 2014/11/28 Y.Matsukawa
//-------------------------------------------------------------
// �Ǵ��Ź�ް�����Ƭ�Ф�
//-------------------------------------------------------------
var ZdcEmapNlistPopRow = null;
function ZdcEmapScrollShopList(kid) {
<?php if ($D_NLIST_POP_COLOR) { ?>
	if (ZdcEmapNlistPopRow) {
		ZdcEmapNlistPopRow.style.backgroundColor = "transparent";
	}
	var r = document.getElementById('nlist_row_'+kid);
	if (r) {
		ZdcEmapNlistPopRow = r;
		ZdcEmapNlistPopRow.style.backgroundColor = "<?php echo $D_NLIST_POP_COLOR; ?>";
	}
<?php } ?>
	var a = document.getElementById('nlist_anc_up_'+kid);
	if (a) {
		a.focus();
	}
	a = document.getElementById('nlist_anc_dw_'+kid);
	if (a) {
		a.focus();
	}
}

// add 2014/12/08 Y.Matsukawa
// mod 2015/04/08 F.Yokoi
//-------------------------------------------------------------
// �������֤���Ź�ޤؤΥ롼��ɽ��
//-------------------------------------------------------------
function ZdcEmapRouteFromSearchPlace(shop_lat, shop_lon, route_type) {<?php // mod 2015/04/08 F.Yokoi ?>
	if(ZdcEmapButtonNG()) return;
	if(!ZdcEmapSearchCenter) return;
	ZdcEmapRouteCase = 'searchplace';
	//�����ʳ��Υ�������򥯥ꥢ
	for( i = 0;i < ZdcEmapMapPoiMrkCnt;i ++) {
		if (ZdcEmapMapPoiMrkId[i]) {
			ZdcEmapMapObj.removeWidget(ZdcEmapMapPoiMrkId[i]);
			ZdcEmapMapPoiMrkId[i] = null;
		}
	}
	ZdcEmapPoiRouteClear();		// �롼�ȥ��ꥢ
	ZdcEmapShopMsgClose();		// �᤭�Ф��õ�
	ZdcEmapSearchEventStop();	// �������٥�����
	ZdcEmapSearchShopClose();
	ZdcEmapCondObj.innerHTML = "";
	ZdcEmapCondObj.mode = "";
	ZdcEmapCondObj.style.visibility = "hidden";
	ZdcEmapFreeRouteClose();
	// �롼������
	ZdcEmapRouteSearch("<?php echo $D_USER_DEFNAME; ?>", shop_lon, shop_lat, "��������", ZdcEmapSearchCenter.lon, ZdcEmapSearchCenter.lat, route_type);<?php // mod 2015/04/08 F.Yokoi ?>
	// �ѥ󤯤��ɲ�		add 2015/01/28 Y.Matsukawa
	ZdcEmapAddOptionalHistory('<?php echo $D_HISTORY_NAME["SPRoute"]; ?>');
}

// add 2014/12/14 Y.Matsukawa
//-------------------------------------------------------------
// �ܺ٤�����
//-------------------------------------------------------------
function ZdcEmapShopDetail(kid) {
	var url = "<?php echo $D_DIR_BASE_G; ?>dtl/"+kid+"/?"
			+"<?php echo ($P_FREEPARAMS_ENC?$P_FREEPARAMS_ENC.'&':''); ?>"
			+"<?php echo ($condprm_enc?$condprm_enc.'&':''); ?>"
			+"<?php echo ($his?'his='.urlencode($his):''); ?>";
	if (ZdcEmapSearchCenter) {
		url += "&srchplace="+ZdcEmapSearchCenter.lat+","+ZdcEmapSearchCenter.lon;
	}
	location.href = url;
}
// add 2014/12/14 Y.Matsukawa
//-------------------------------------------------------------
// �ʤ���ߤ������
//-------------------------------------------------------------
function ZdcEmapCondAllReset() {
	if(document.ZdcEmapCondForm) {
		var chg = 0;
		ZdcEmapDisableReSearch = true;	// �Ƹ������
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
		ZdcEmapDisableReSearch = false;	// �Ƹ����Ƴ�
		if (chg > 0) {
			ZdcEmapSearchShopClick();	// �Ƹ���
		}
	}
}

<?php
// ���֥�&�������ѺǴ�긡��		add 2015/05/01 Y.Matsukawa ?>
function ZdcEmap711omniSearchShopStart(init_rad) {
	<?php
	// ��������ϰϡ�m�ˤΰ��ٷ��ٺ�ʬ�ʥߥ��áˤ򻻽� ?>
	var latlons = ZdcEmapGetPointsByRad(ZdcEmapSearchCenter, init_rad)
	var zi = ZdcEmapMapObj.getAdjustZoom(latlons, {fix:true});
	ZdcEmapMapObj.setZoom(zi.zoom);
	var box = ZdcEmapMapObj.getLatLonBox();
	var boxmin = box.getMin();
	var boxmax = box.getMax();
	// ��������ϰϤ�SEJŹ�ޤ�1�İʾ�¸�ߤ��뤫�ɤ���
	var opts = new ZdcNearShopOptions();
	opts.cid = "<?PHP echo $D_DATA_CID; ?>";
	opts.lat = ZdcEmapSearchCenter.lat;
	opts.lon = ZdcEmapSearchCenter.lon;
	opts.latlon = boxmin.lat+","+boxmin.lon+","+boxmax.lat+","+boxmax.lon;
	opts.jkn = "<?php echo $D_711OMNI_INIT_JKN; ?>";
	opts.pos = 1;
	opts.maxCount = 1;
	opts.limitCount = 1;
	opts.timeout = <?PHP echo $D_AJAX_TIMEOUT; ?>;
	ZdcEmapNearShop.opts = opts;
	ZdcEmapNearShop.search(opts, ZdcEmap711omniSearchShopResult);
}
function ZdcEmap711omniSearchShopResult(result) {
	// ���顼����
	if(result.status != 0 && result.status != 3 && result.status != 5 && result.status != 9) {
		alert("<?PHP echo $D_MSG_ERR_JS_RESULT; ?> listres["+result.status+"]");
		ZdcEmapCondEnabled();
		ZdcEmapSearchEventStart();
		ZdcEmapSearchShopClose();
		ZdcEmapReadOff();
		return;
	}
	// �����ǧ
	var cnt = result.items.length;
	if (cnt) {
		// SEJŹ�ޤ���ʤ��Ͽ��ϰϤǺǴ�긡��
		ZdcEmapSearchFirst = 0;//�Ͽ��ϰϤ򸡺�
		ZdcEmapSearchShopStart();
	} else {
		// SEJŹ�ޤʤ��ʤ����Ⱦ�¤����꤭��̼ܤǺǴ�긡��
		var latlons = ZdcEmapGetPointsByRad(ZdcEmapSearchCenter, <?php echo $D_711OMNI_ALT_RAD; ?>)
		var zi = ZdcEmapMapObj.getAdjustZoom(latlons, {fix:true});
		ZdcEmapMapObj.setZoom(zi.zoom);
		ZdcEmapSearchFirst = 0;//�Ͽ��ϰϤ򸡺�
		ZdcEmapSearchShopStart();
	}
}

// add 2015/11/27 H.Yasunaga ��󥻥�ե����޸����������ޥ���
// ��󥻥�ե�������
// ��ȯ�Ϥ���ꤷ�ƥ롼��õ���⡼�ɳ��ϡ�Light��Maplink��
function ZdcEmapJanssenFreeRouteClickLight(lat, lon, route_type) {
	if(ZdcEmapButtonNG()) return;
	//�����ʳ��Υ�������򥯥ꥢ
	for( i = 0;i < ZdcEmapMapPoiMrkCnt;i ++) {
		if (ZdcEmapMapPoiMrkId[i]) {		<?php // add 2012/08/27 Y.Matsukawa ?>
			<?php //ZdcEmapMapUserLyr.removeMarkerById(ZdcEmapMapPoiMrkId[i]);		mod 2012/08/27 Y.Matsukawa ?>
			ZdcEmapMapObj.removeWidget(ZdcEmapMapPoiMrkId[i]);
			ZdcEmapMapPoiMrkId[i] = null;
		}
	}
	ZdcEmapPoiRouteClear();		// �롼�ȥ��ꥢ
	ZdcEmapShopMsgClose();		// �᤭�Ф��õ�
	ZdcEmapSearchEventStop();	// �������٥�����
	// ���̤��ڤ��ؤ���
	ZdcEmapSearchShopClose();
	//var url = "<?PHP echo $D_DIR_BASE_L; ?>emapview_froute.htm?cid=<?PHP echo $cid; ?>"
	var url = "<?PHP echo $D_DIR_BASE_L; ?>froute.htm?"
			+"lat="+lat+"&lon="+lon+"&mode=init"+"&routetype="+route_type;
	;
	//<?php if($P_FREEPARAMS){ ?>url += "&<?php echo $P_FREEPARAMS; ?>";<?php } ?>		mod 2014/02/05 Y.Matsukawa
	<?php if($P_FREEPARAMS_JS){ ?>url += "&<?php echo $P_FREEPARAMS_JS; ?>";<?php } ?>
	<?php if($https_req){ ?>url += "&https_req=1";<?php } ?>
	ZdcEmapHttpRequestHtml(url, function(html,status){
		if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> froute["+status+"]";
		ZdcEmapListObj.innerHTML = html;
	});
}

// �ե꡼��ɸ���
function ZdcEmapJanssenFreeRouteSearch(lat, lon, route_type) {
	var txt = document.getElementById("freeRouteSearchEntText");
	if (!txt || !txt.value) return;
	//var url = "<?PHP echo $D_DIR_BASE_L; ?>emapview_froute.htm?cid=<?PHP echo $cid; ?>"
	var url = "<?PHP echo $D_DIR_BASE_L; ?>froute.htm?"
			+"lat="+lat+"&lon="+lon+"&mode=srch"
			+"&keyword="+txt.value
			+"&routetype="+route_type
	;
	// add 2013/06/11 Y.Matsukawa [
	var typ = document.getElementById("freeRouteSearchType");
	if (typ && typ.value) {
		url += "&type="+typ.value;
	}
	var adcd = document.getElementById("freeRouteSearchAdcd");
	if (adcd && adcd.value) {
		url += "&adcd="+adcd.value;
	}
	// add 2013/06/11 Y.Matsukawa ]
	//<?php if($P_FREEPARAMS){ ?>url += "&<?php echo $P_FREEPARAMS; ?>";<?php } ?>		mod 2014/02/05 Y.Matsukawa
	<?php if($P_FREEPARAMS_JS){ ?>url += "&<?php echo $P_FREEPARAMS_JS; ?>";<?php } ?>
	<?php if($https_req){ ?>url += "&https_req=1";<?php } ?>
	ZdcEmapHttpRequestHtml(url, function(html,status){
		if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> froute["+status+"]";
		<?php // add 2013/06/03 Y.Matsukawa [ ?>
		if(ZdcEmapFRouteStaticObj) {
			//�����ʳ��Υ�������򥯥ꥢ
			for( i = 0;i < ZdcEmapMapPoiMrkCnt;i ++) {
				if (ZdcEmapMapPoiMrkId[i]) {		<?php // add 2012/03/16 Y.Matsukawa ?>
					ZdcEmapMapObj.removeWidget(ZdcEmapMapPoiMrkId[i]);
					ZdcEmapMapPoiMrkId[i] = null;
				}
			}
			ZdcEmapPoiRouteClear();		// �롼�ȥ��ꥢ
			ZdcEmapShopMsgClose();		// �᤭�Ф��õ�
			ZdcEmapSearchEventStop();	// �������٥�����
			ZdcEmapSearchShopClose();
			ZdcEmapCondObj.innerHTML = "";
			ZdcEmapCondObj.mode = "";
			ZdcEmapCondObj.style.visibility = "hidden";
			ZdcEmapFreeRouteClose();
			ZdcEmapFRouteStaticObj.innerHTML = html;
		} else {
		<?php // add 2013/06/03 Y.Matsukawa ] ?>
			ZdcEmapListObj.innerHTML = html;
		}
	});
}
// �ե꡼��ɸ����ʥڡ��������
<?php //function ZdcEmapFreeRoutePage(lat, lon, page, type, keyword) {		mod 2013/06/11 Y.Matsukawa ?>
function ZdcEmapJanssenFreeRoutePage(lat, lon, page, type, keyword, adcd, route_type) {
	if (!page) page = 0;
	if (!type) type = "";
	if (!adcd) adcd = "";		<?php // add 2013/06/11 Y.Matsukawa ?>
	//var url = "<?PHP echo $D_DIR_BASE_L; ?>emapview_froute.htm?cid=<?PHP echo $cid; ?>"
	var url = "<?PHP echo $D_DIR_BASE_L; ?>froute.htm?"
			+"lat="+lat+"&lon="+lon+"&mode=srch&page="+page+"&type="+type
			+"&keyword="+keyword
			+"&routetype="+route_type
	;
	if(adcd) url += "&adcd="+adcd;		<?php // add 2013/06/11 Y.Matsukawa ?>
	//<?php if($P_FREEPARAMS){ ?>url += "&<?php echo $P_FREEPARAMS; ?>";<?php } ?>		mod 2014/02/05 Y.Matsukawa
	<?php if($P_FREEPARAMS_JS){ ?>url += "&<?php echo $P_FREEPARAMS_JS; ?>";<?php } ?>
	<?php if($https_req){ ?>url += "&https_req=1";<?php } ?>
	ZdcEmapHttpRequestHtml(url, function(html,status){
		if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> froute["+status+"]";
		<?php // add 2013/06/03 Y.Matsukawa [ ?>
		if(ZdcEmapFRouteStaticObj) {
			ZdcEmapFRouteStaticObj.innerHTML = html;
		} else {
		<?php // add 2013/06/03 Y.Matsukawa ] ?>
			ZdcEmapListObj.innerHTML = html;
		}
	});
}
// add 2015/11/27 H.Yasunaga ]
