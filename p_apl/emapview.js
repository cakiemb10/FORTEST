<?PHP
// ------------------------------------------------------------
// �Ͽ�����javasctipt �ᥤ��
// 
// ��ȯ����
// 2011/10/15 Y.Matsukawa	��������
// 2011/12/13 Y.Matsukawa	�ե�����Close��˺Ǵ�긡������ʤ��ʤ�Τǡ��ե�����ɽ����⸡������褦���ѹ�
// 2011/12/19 Y.Matsukawa	�Ͽ�ɽ�������Ǵ�긡��������¹Ԥ����
// 2011/12/27 H.osamoto		���֥�ߡ����̳�ٱ��ѽ����ɲ�
// 2012/01/31 Y.Matsukawa	�쥤�䡼����
// 2012/02/20 H.osamoto		API���٥�ȥ����Ϥ˼�ͳ����(freeprm)���ɲ�
// 2012/03/16 Y.Matsukawa	���Զ�罤���ۥ롼��õ��������ץȥ��顼
// 2012/03/19 Y.Matsukawa	�Ͽޥ���ȥ���Υ����פ��ѹ���ǽ��
// 2012/04/02 K.Masuda		�Ͽ��濴�������ؿ��ɲá��Ͽ��濴�ޡ����ɲ�
// 2012/08/17 Y.Matsukawa	�롼��õ���ؽи���θ�ʤ���ǥե���Ȳ�
// 2012/08/27 Y.Matsukawa	Light�б����Զ�罤����
// 2012/09/07 Y.Matsukawa	��&�פ�ޤ��ͤ�Ǥ�եѥ�᡼���˻��ꤷ����硢nlist.htm���������ͤ��Ϥ����
// 2012/11/06 H.Osamoto		SEJ�����ڡ����б�
// 2013/06/03 Y.Matsukawa	��ȯ�ϻ���롼�ȸ���ɽ��
// 2013/08/22 Y.Matsukawa	�Ͽޤʤ�Ź�޾ܺ��б�
// 2014/09/08 H.Osamoto		�Ͽ�ɽ���̼��ϰ����µ�ǽ�ɲ�
// 2014/10/06 Y.Matsukawa	Ϣ�֥�������
// 2014/10/08 Y.Matsukawa	�Ǵ��ؤ����Ǥ�յ�Υ�α�ɽ��
// 2014/10/15 Y.Matsukawa	Ϣ�֥������������
// 2015/01/28 Y.Matsukawa	�Ǵ�ء��Ǵ���ߤʤɤ�ѥ󤯤����ɲ�
// 2015/04/08 F.Yokoi		�롼�ȸ�������Լ�/��ư���ڤ��ؤ��ե饰�ɲ�
//							��Լԥ롼�ȸ����������Ի��Υ��顼��ɽ����ǽ�ɲ�
//							�Ͽ޾�ؤΥ롼�ȵ�Υ�����֤�ɽ����ǽ�ɲ�
// 2015/04/23 H.Osamoto		������˹ʤ���߾��̵�����ȥޥ������������ѹ������ɲ�
// 2015/05/01 Y.Matsukawa	���֥�&����OMNI���ѺǴ�긡��
// 2015/05/14 Y.Matsukawa	cond��nmap/shop_dtl��ľ�ܵ��ҡ�cond.htm̤���ѡ˥⡼��
// 2015/07/10 Y.Uesugi		�쥤�䡼�����ɲ�
// 2015/09/17 F.Yokoi		����������Ͽ(API2.0��)�˥ޥ��������Ȼ��ν��������ɲ�
// 2016/01/08 Y.Uesugi		�Ͽ��濴�ޡ����β������ѹ���ǽ�ɲ�
// 2016/04/21 H.Osamoto		�̼ܤˤ�륢������ɽ���������
// 2016/07/11 H.Yasunaga	711OMNI2(Ź�ޥ���)�ѥ������ޥ��� �Ͽޥ���ȥ�����ѿ��ɲ�
// 2016/08/25 Y.Uesugi		�롼�Ȥ˥ޡ���ɽ�����ɲ�
// 2016/09/29 Y.Uesugi		�롼�ȸ����Υǥե����������ɲ�
// 2016/10/03 Y.Uesugi		VICS�б� �Ͽ޽ž�
// 2016/10/11 Y.Uesugi		VICS�б� �ޥåץ�����(ZDC.MAPTYPE_FLAT_COLOR)�ɲ�
// 2017/03/13 K.Tani		�Ͽ��濴�ޡ�������offset����
// ------------------------------------------------------------
require_once('/home/emap/src/p/inc/define.inc');
require_once('/home/emap/src/p/inc/define_get_icon.inc');
?>

//-------------------------------------------------------------
//�������
//-------------------------------------------------------------
var ZdcEmapDisableReSearch = false;	<?php // add 2014/12/14 Y.Matsukawa ?>
//�Ͽ�
var ZdcEmapMapObj = null;
var ZdcEmapMapUsrctl = null;
var ZdcEmapMapZoomctl = null;
//�桼�����쥤�䡼
var ZdcEmapMapUserLyrId = null;
//�ޡ���������
var ZdcEmapMapShopMrkId = new Array(<?PHP echo $D_SHOP_MAX; ?>);
var ZdcEmapMapShopMrkCnt = null;
var ZdcEmapMapPoiMrkId = new Array(<?PHP echo $D_POI_MAX; ?>);
var ZdcEmapMapPoiMrkCnt = null;
var ZdcEmapMapShopDetailMrkId = null;
var ZdcEmapMapCurFocusMrkId = null;
var ZdcEmapMapSearchPoint = null; // add 2011/12/27 H.osamoto
//�᤭�Ф�
//����
var ZdcEmapListObj;
var ZdcEmapDetailObj;
var ZdcEmapCondObj;
var ZdcEmapCondStaticObj;		<?php // add 2015/05/14 Y.Matsukawa ?>
var ZdcEmapFRouteStaticObj;		<?php //��ȯ�ϻ���롼�ȸ���ɽ��		add 2013/06/03 Y.Matsukawa ?>
var ZdcEmapRouteCase = '';		<?php //�롼�ȼ����eki/free��		add 2013/06/03 Y.Matsukawa ?>
//My���ꥢ�ɲ���ɽ�����ꥢ
var ZdcEmapMyareaWrapperObj;
//�ƥܥ���Υ��٥�ȴ���
var ZdcEmapSearchClickFlg = 0;
//�����������
var ZdcEmapIconImg = new Array();
var ZdcEmapIconW = new Array();
var ZdcEmapIconH = new Array();
var ZdcEmapIconOffsetX = new Array();
var ZdcEmapIconOffsetY = new Array();
// �Ͽް��ٷ���
var mappoint;
var widget2,widget3;	// add 2012/04/02 K.Masuda
var detailflg;	// add 2012/11/06 H.osamoto
var printflg;	// add 2012/11/06 H.osamoto

<?php 
// add start 2016/07/11 H.Yasunaga 711OMNI2�ѥ������ޥ��� [
if (isset($D_711OMNI2) == true) {
	echo 'var controlWidget;';	
} 
// add end 2016/07/11 H.Yasunaga]
?>

<?PHP
foreach( $D_ICON as $key=>$val) {
	printf("ZdcEmapIconImg['%s'] = '%s';",$key,$val["IMG"]);
	printf("ZdcEmapIconW['%s'] = %d;",$key,$val["W"]);
	printf("ZdcEmapIconH['%s'] = %d;",$key,$val["H"]);
	printf("ZdcEmapIconOffsetX['%s'] = %d;",$key,ceil($val["W"]/2)*-1);
	printf("ZdcEmapIconOffsetY['%s'] = %d;",$key,ceil($val["H"]/2)*-1);
}
?>
var Zdc_smap_g_oMap     = null;
var Zdc_smap_g_oAjax    = null;

//����¾
var ZdcEmapSaveCond = new Array(<?PHP echo $D_SHOP_MAX; ?>);//�ʹ����
<?PHP for($i = 1;$i <= 200;$i ++) if($_VARS["cond".$i]) printf("ZdcEmapSaveCond[%d] = '%s';",$i,$_VARS["cond".$i]); ?>

var QSTRING = location.search.replace(/^\?/, '');

//������ؿ�
function ZdcEmapInit(init_lat, init_lon, init_lv){
	if (!document.getElementById('ZdcEmapMap')) return;		<?php // add 2013/08/22 Y.Matsukawa ?>
	//�Ͽޤδ������� ----------------------------------------
	var svrurl = "<?PHP echo $D_JS_SVRURL; ?>";
	//�������
	if (!init_lat || !init_lon) {
		init_lat = <?PHP echo $D_INIT_LAT; ?>;
		init_lon = <?PHP echo $D_INIT_LON; ?>;
	}
	if (!init_lv || init_lv == 0) {
		init_lv = <?PHP echo $D_INIT_LVL; ?>;
	}
	init_lv = init_lv - 1;

<?php
// add 2012/01/31 Y.Matsukawa [
if ($D_MAP_LAYER_KBN=='1') {
	echo 'var map_type = ZDC.MAPTYPE_COLOR;';
} else if ($D_MAP_LAYER_KBN=='2') {
	echo 'var map_type = ZDC.MAPTYPE_NOICON;';
} else if ($D_MAP_LAYER_KBN=='3') {
	echo 'var map_type = ZDC.MAPTYPE_TOWNWALK;';
} else if ($D_MAP_LAYER_KBN=='4') {
	echo 'var map_type = ZDC.MAPTYPE_COLOR;';
} else if ($D_MAP_LAYER_KBN=='5') {
	echo 'var map_type = ZDC.MAPTYPE_ALPHABETS;';
// add 2015/07/10 Y.Uesugi [
} else if ($D_MAP_LAYER_KBN=='6') {
	echo 'var map_type = ZDC.MAPTYPE_ALPHABETSV2;';
} else if ($D_MAP_LAYER_KBN=='7') {
	echo 'var map_type = ZDC.MAPTYPE_KANTAI;';
} else if ($D_MAP_LAYER_KBN=='8') {
	echo 'var map_type = ZDC.MAPTYPE_HANTAI;';
} else if ($D_MAP_LAYER_KBN=='9') {
	echo 'var map_type = ZDC.MAPTYPE_HANGEUL;';
// add 2015/07/10 Y.Uesugi ]
// add 2016/10/11 Y.Uesugi [
} else if ($D_MAP_LAYER_KBN=='10') {
	echo 'var map_type = ZDC.MAPTYPE_FLAT_COLOR;';
// add 2016/10/11 Y.Uesugi ]
} else {
	echo 'var map_type = ZDC.MAPTYPE_COLOR;';
}
// add 2012/01/31 Y.Matsukawa ]
// add 2015/04/17 Y.Matsukawa [
if ($D_MAP_WHEEL_KBN) {
	echo 'var wheelType = 1;';
} else {
	echo 'var wheelType = 3;';
}
// add 2015/04/17 Y.Matsukawa ]
?>
	ZdcEmapMapObj = new ZDC.Map(
					document.getElementById('ZdcEmapMap'),
					{
						latlon : new ZDC.LatLon(init_lat, init_lon),
						zoom : init_lv,
						<?php if ($D_MAP_ZOOM_RANGE) { 	// add 2014/09/08 H.Osamoto [ ?>
						zoomRange: [<?PHP echo $D_MAP_ZOOM_RANGE; ?>],
						<?php } 	// add 2014/09/08 H.Osamoto ] ?>
						wheelType: wheelType,	<?php // add 2015/04/17 Y.Matsukawa ?>
						<?php //mapType: ZDC.MAPTYPE_COLOR		mod 2012/01/31 Y.Matsukawa ?>
						mapType: map_type
					}
				);

	<?php	// del 2015/04/17 Y.Matsukawa [
	//	// �Ͽ޾�ǤΥۥ���������̵���ˤ���
	//	var ua = navigator.userAgent, we,
	//	map = document.getElementById('ZdcEmapMap'); //�Ͽޤ�ɽ������div����
	//	if (ua.match(/Gecko/) && ua.match(/(Firebird|Firefox)/)) {
	//		we = 'DOMMouseScroll';
	//	} else {
	//		we = 'mousewheel';
	//	}
	//	< ?php //ZDC.clearListeners(map.firstChild, we);		del 2012/08/27 Y.Matsukawa ? >
	//	< ?php // add 2012/08/27 Y.Matsukawa [ ? >
	//	var elements = map.childNodes;
	//	for (var e = 0; e < elements.length; e++) {
	//		if (elements[e].tagName && elements[e].tagName.toLowerCase() == 'div' && !elements[e].id) {
	//			ZDC.clearListeners(elements[e], we);
	//			break;
	//		}
	//	}
	//	< ?php // add 2012/08/27 Y.Matsukawa ] ? >
			// del 2015/04/17 Y.Matsukawa ] ?>
	// �Ͽޥ��֥륯��å��ǥ�������
	ZDC.addListener(ZdcEmapMapObj, ZDC.MAP_DBLCLICK, ZdcEmapMoveLatLon);
	ZDC.addListener(ZdcEmapMapObj, ZDC.MAP_CHG_ZOOM, ZdcEmapMapEventLogZoom);
	ZDC.addListener(ZdcEmapMapObj, ZDC.MAP_CHG_LATLON, ZdcEmapMapEventLogLoc);
	
	//��e-map�ѥ���ȥ��� --------------------------------
	//�ꥹ��ɽ����
	ZdcEmapListObj  = document.getElementById('ZdcEmapList');
	if(!ZdcEmapListObj) ZdcEmapListObj = document.createElement('DIV');//light�ѥ��ߡ�
	//������������
	ZdcEmapCondObj = document.getElementById('ZdcEmapCond');
	if(!ZdcEmapCondObj) ZdcEmapCondObj = document.createElement('DIV');//light�ѥ��ߡ�
	<?php // add 2015/05/14 Y.Matsukawa [ ?>
	ZdcEmapCondStaticObj = document.getElementById('ZdcEmapCondStatic');
	if(!ZdcEmapCondStaticObj) ZdcEmapCondStaticObj = document.createElement('DIV');//light�ѥ��ߡ�
	<?php // add 2015/05/14 Y.Matsukawa ] ?>
	//��ȯ�ϻ���롼�ȸ���ɽ��		add 2013/06/03 Y.Matsukawa
	ZdcEmapFRouteStaticObj = document.getElementById('ZdcEmapFRouteStatic');

	//����¾ -----------------------------------------------
	//��������С�
	<?php	if ($D_MAP_SCALEBAR) {		// add 2012/03/16 Y.Matsukawa ?>
	widgetScaleBar = new ZDC.ScaleBar();
	ZdcEmapMapObj.addWidget(widgetScaleBar);
	<?php	} ?>
	//ɸ�ॳ��ȥ���
	var widget = new ZDC.Control(
		{
			pos: {
				top: 10,
				left: 10
			},
<?php		//type: ZDC.CTRL_TYPE_NORMAL,		del 2012/03/19 Y.Matsukawa ?>
<?php	// add 2012/03/19 Y.Matsukawa [ ?>
<?php	if ($D_MAP_CONTROL == 2) { ?>
			type: ZDC.CTRL_TYPE_SMALL,
<?php	} else if ($D_MAP_CONTROL == 3) { ?>
			type: ZDC.CTRL_TYPE_ZM,
<?php	} else { ?>
			type: ZDC.CTRL_TYPE_NORMAL,
<?php	} ?>
<?php	// add 2012/03/19 Y.Matsukawa ] ?>
			close: true
		}
	);
	ZdcEmapMapObj.addWidget(widget);
<?php	// add start 2016/07/11 H.Yasunaga 711OMNI2�ѥ������ޥ��� [ ?>
<?php	if (isset($D_711OMNI2) == true) { ?>
	controlWidget = widget;
<?php	} ?>
<?php	// add end 2016/07/11 H.Yasunaga] ?>
	//�桼������ȥ���
	//createUserControl();

	//�Ͽ��濴�ޡ���
<?php	// add 2012/04/02 K.Masuda [ ?>
<?php if (isset($D_MAPCENTER_MARK) && $D_MAPCENTER_MARK) { ?>

	<?php	// add 2016/01/08 Y.Uesugi [ ?>
	<?php if (isset($D_MAPCENTER_MARK_IMG) && $D_MAPCENTER_MARK_IMG) { ?>
		var opt = {};
		opt.src ='<?PHP echo $D_MAPCENTER_MARK_IMG; ?>'; //����URL
			<?php	// add 2017/03/13 K.Tani [ ?>
			<?php if ($D_MAPCENTER_MARK_IMG_OFX != 0 || $D_MAPCENTER_MARK_IMG_OFY != 0) { ?>
				opt.offset = new ZDC.Pixel(<?PHP echo $D_MAPCENTER_MARK_IMG_OFX; ?>, <?PHP echo $D_MAPCENTER_MARK_IMG_OFY; ?>);
			<?php } ?>
			<?php	// add 2017/03/13 K.Tani ] ?>
		widget2 = new ZDC.MapCenter(opt);
	<?php	} else { ?>
		widget2 = new ZDC.MapCenter();
	<?php } ?>
	//	widget2 = new ZDC.MapCenter();
	<?php	// add 2016/01/08 Y.Uesugi ] ?>

	ZdcEmapMapObj.addWidget(widget2);
<?php } ?>
<?php	// add 2012/04/02 K.Masuda ] ?>

	// add 2016/10/03 Y.Uesugi [
	//VICS�б� �Ͽ޽ž�
<?php if (isset($D_CUST_VICS) && $D_CUST_VICS) { ?>

	// VICS�ѥ��᡼���쥤�䡼����
	var imageLayer = new ZDC.ImageLayer(
		{
			hosts: ['<?php echo $D_CUST_VICS_HOSTS; ?>'],
			path: '<?php echo $D_CUST_VICS_PATH; ?>'
		},
		{
			cid:		'<?php echo $D_CUST_VICS_CID; ?>',
			layer:		'<?php echo $D_CUST_VICS_LAYER; ?>',
			marktype:	'<?php echo $D_CUST_VICS_MARKTYPE; ?>',
			style:		'<?php echo $D_CUST_VICS_STYLE; ?>',
			datum:		'<?php echo $D_CUST_VICS_DATUM; ?>',
		}
	);
	ZdcEmapMapObj.addWidget(imageLayer);

	// �̼ܤ���ꤹ��
	<?php if (isset($D_MAPLINK_LVL_CSTM) && $D_MAPLINK_LVL_CSTM != '') { ?>
	ZdcEmapMapObj.setZoom(<?php echo $D_MAPLINK_LVL_CSTM; ?>);
	<?php } ?>
<?php } ?>
	// add 2016/10/03 Y.Uesugi ]
}

// �桼������ȥ���
function createUserControl() {
	/* �桼������ȥ���˻��Ѥ������ */
	var imgurldir = '<?PHP echo $D_DIR_BASE; ?>img/usrcontrol/';
	
	var control = {
		/* �ۡ���ݥ������ذ�ư�ܥ��� */
		home:
		{
			/* ������URL */
			src: imgurldir + 'home.png',
			/* ���ְ��� */
			pos:{top: 28,right: 34},
			/* ������ɽ�������� */
			imgSize:{width: 22,height: 22}
		},
		north:
		{
			src: imgurldir + 'north.png',
			pos: {top: 10,right: 38},
			imgSize: {width: 16,height: 17}
		},
		east:
		{
			src: imgurldir + 'east.png',
			pos: {top: 30,right: 18},
			imgSize: {width: 16,height: 17}
		},
		south:
		{
			src: imgurldir + 'south.png',
			pos: {top: 50,right: 38},
			imgSize: {width: 16,height: 17}
		},
		west:
		{
			src: imgurldir + 'west.png',
			pos: {top: 30,right: 58},
			imgSize: {width: 16,height: 17}
		},
		bar:
		{
			src: imgurldir + 'bar.png',
			pos: {top: 91,right: 38},
			imgSize: {width: 17,height: 110}
		},
		btn:
		{
			src: imgurldir + 'btn.png',
			pos: {top: 0,right: 1},
			imgSize: {width: 15,height: 10}
		},
		minus:
		{
			src: imgurldir + 'minus.png',
			pos: {top: 206,right: 38},
			imgSize: {width: 16,height: 17}
		},
		plus:
		{
			src: imgurldir + 'plus.png',
			pos: {top: 72,right: 38},
			imgSize: {width: 16,height: 17}
		}
	};
	
	var options = {
		/* �Ĥޤߤξ�°���(�̼ܥ�٥��ѹ��С���top: -2px�ΰ���) */
		start: -2,
		/* �Ĥޤߤΰ�ư�� */
		interval: 6
	};
	
	/* �桼������ȥ������� */
	widget = new ZDC.UserControl(control, options);
	
	/* �桼������ȥ�����ɲ� */
	ZdcEmapMapObj.addWidget(widget);
};



//-------------------------------------------------------------
//�Ͽ�����
//-------------------------------------------------------------
// ����å����֤ذ�ư
function ZdcEmapMoveLatLon() {
	var latlon = ZdcEmapMapObj.getClickLatLon();
	ZdcEmapMapObj.moveLatLon(latlon);
}
//�Ͽ޾�˥�������ɽ��
var ZdcEmapMapCurMrkId = null;
function ZdcEmapMapCursorSet(lat, lon){
	//��������κ���
	mrk = ZdcEmapMakeMrkApi2(0, lat, lon, 
							ZdcEmapIconW['@SELB'], ZdcEmapIconH['@SELB'],0,0,
							ZdcEmapIconOffsetX['@SELB'], ZdcEmapIconOffsetY['@SELB'],0,0,
							ZdcEmapIconImg['@SELB'], '',
							'', '', '', 0, null, null, null
						);
	//if (ZdcEmapMapShopMrkId[i] != null) ZdcEmapMapObj.removeWidget(ZdcEmapMapCurMrkId);	mod 2011/12/20 Y.Matsukawa
	if (ZdcEmapMapCurMrkId != null) ZdcEmapMapObj.removeWidget(ZdcEmapMapCurMrkId);
	ZdcEmapMapObj.addWidget(mrk);
	ZdcEmapMapCurMrkId = mrk;
}
//�Ͽ޾�Υ������볰��
function ZdcEmapMapCursorRemove(){
	if (ZdcEmapMapCurMrkId != null) {
		ZdcEmapMapObj.removeWidget(ZdcEmapMapCurMrkId);
		ZdcEmapMapCurMrkId = null;
	}
	//�ܺ�ɽ����
	ZdcEmapMapFrontShopDetail();//�ܺ٥�����������̤ˤ�äƤ���
}
//�Ͽް�ư
function ZdcEmapMapMove(lat, lon, lvl){
	var center = new ZDC.LatLon(Number(lat), Number(lon));
	ZdcEmapMapObj.moveLatLon(center);
	if(lvl) ZdcEmapMapObj.setZoom(lvl);
}
function ZdcEmapMapScroll(lat, lon){
	var center = new ZDC.LatLon(lat, lon);
	//�ޥåװ�ư
	ZdcEmapMapObj.moveLatLon(center);
}
//�Ͽް�ư
function ZdcEmapMapMoveBox(minlat,minlon,maxlat,maxlon,pt,noin){
	var p1 = new ZdcPoint(minlon,minlat,<?PHP echo $D_PFLG; ?>);
	var p2 = new ZdcPoint(maxlon,maxlat,<?PHP echo $D_PFLG; ?>);
	var bx = new ZdcBox(p1,p2);
	if(pt != null) {
		var s = ZdcEmapMapObj.getMapBoxScale(bx,pt);
		ZdcEmapMapObj.setMapLocation(pt);
		if(noin != 1 || (noin == 1 && s < ZdcEmapMapObj.getMapScale())) ZdcEmapMapObj.setMapScale(s);
	} else {
		var s = ZdcEmapMapObj.getMapBoxScale(bx);
		ZdcEmapMapObj.setMapLocation(bx.getBoxCenter());
		if(noin != 1 || (noin == 1 && s < ZdcEmapMapObj.getMapScale())) ZdcEmapMapObj.setMapScale(s);
	}
}

//�Ͽް�ư(API2.0��)
function ZdcEmapMapMoveBoxApi2(minlat,minlon,maxlat,maxlon){
	
	var varlatlon_box = new Array();
	
	// �Ͽ�ɽ���̼ܼ����Ѳ���ɽ�����ꥢ
	varlatlon_box[0] = new ZDC.LatLon(minlat, minlon);
	varlatlon_box[1] = new ZDC.LatLon(maxlat, maxlon);
	var adjust = ZdcEmapMapObj.getAdjustZoom(varlatlon_box);
	
	// �Ͽް�ư���̼��ѹ�
	ZdcEmapMapObj.moveLatLon(adjust.latlon);
	ZdcEmapMapObj.setZoom(adjust.zoom);
}

//-------------------------------------------------------------
//����������Ͽ
//-------------------------------------------------------------
function ZdcEmapMakeMrk(id,lat,lon,
						sizew,sizeh,shadowsizew,shadowsizeh,
						offsetx,offsety,shdoffsetx,shdoffsety,msgoffsetx,msgoffsety,
						image,shadowimage,
						data1,data2,nflg,
						mouseclickmarker,mouseovermarker,mouseoutmarker
						,lvl
						) {
	
	var p,mrk,item;
	var icon = new ZdcIcon();
	
	//��������κ���
	icon.size      = new ZdcSize(sizew, sizeh);
	icon.offset    = new ZdcPixel(offsetx, offsety);
	// icon.image����������.gif�פǤʤ��ȡ�����Ū��GIF�ʳ��Ȥ��ƽ�������Ƥ��ޤ��Τǡ�������̵��������.gif�פˤ��Ƥ��ޤ���
	// GIF�ʳ��ǽ�������Ƥ��ޤ��ȡ�IE�ǰ�������Ʃ��GIF��Ʃ�ᤷ�ޤ���
	// �����ॹ������ͤ��ղä��Ƥ���Τϡ�����å��������Τ���Ǥ������줬�ʤ��ȡ�������������򺹤��ؤ����ݤ�ɽ��������뤳�Ȥ�����ޤ�����IE�Τߡ�
	if (image.substr(image.length-4, 4) == ".gif") {
		icon.image = image;
	} else {
		dd = new Date();
		ts = dd.getTime();
		if (image.indexOf('?') < 0) {
			icon.image = image+"?dummy="+ts+".gif";
		} else {
			icon.image = image+"&dummy="+ts+".gif";
		}
	}
	if(shadowimage) {
		icon.shadowsize = new ZdcSize(shadowsizew, shadowsizeh);
		icon.shdoffset = new ZdcPixel(shdoffsetx,shdoffsety);
		icon.shadowimage   = shadowimage;
	}
	icon.msgoffset = new ZdcPixel(msgoffsetx,msgoffsety);
	//�ޡ������κ���
	p   = new ZdcPoint(lon, lat, <?PHP echo $D_PFLG; ?>);
	mrk = new ZdcMarker(p, icon);
	//�ޡ������δ��ܾ���
	mrk.id     = id;
	mrk.data1  = data1;
	mrk.data2  = data2;
	mrk.nflg   = nflg;
	if (lvl) mrk.lvl = lvl;
	mrk.Point  = p;
	mrk.mouseclickmarker = mouseclickmarker;
	mrk.mouseovermarker  = mouseovermarker;
	mrk.mouseoutmarker   = mouseoutmarker;
	//�ޡ���������å����Υ��٥����Ͽ
	if(mrk.mouseclickmarker) ZdcEvent.addListener(mrk, "mouseclickmarker", mrk.mouseclickmarker);
	if(mrk.mouseovermarker)  ZdcEvent.addListener(mrk, "mouseovermarker" , mrk.mouseovermarker);
	if(mrk.mouseoutmarker)   ZdcEvent.addListener(mrk, "mouseoutmarker"  , mrk.mouseoutmarker);
	// ���٥�Ȥʤ��λ��ϥޥ�������������ѹ����ʤ�
	if (!mrk.mouseclickmarker && !mrk.mouseovermarker) mrk.setType('static');

	return mrk;
}

//-------------------------------------------------------------
//����������Ͽ(API2.0��)
//-------------------------------------------------------------
var rtnhtml;
function ZdcEmapMakeMrkApi2(id,lat,lon,
						sizew,sizeh,newsizew,newsizeh,
						offsetx,offsety,newoffsetx,newoffsety,
						image,newimage,
						data1,data2,message,nflg,
						mouseclickmarker,
						mouseovermarker,
						lvl,
						seq_icon,		<?php // add 2014/10/06 Y.Matsukawa ?>
						mouseoutmarker	<?php // add 2015/09/17 F.Yokoi ?>
						) {
	var mrk;
	var w;
	var h;
	var latlon = new ZDC.LatLon(lat, lon);
	var iconimage
	
	// icon.image����������.gif�פǤʤ��ȡ�����Ū��GIF�ʳ��Ȥ��ƽ�������Ƥ��ޤ��Τǡ�������̵��������.gif�פˤ��Ƥ��ޤ���
	// GIF�ʳ��ǽ�������Ƥ��ޤ��ȡ�IE�ǰ�������Ʃ��GIF��Ʃ�ᤷ�ޤ���
	// �����ॹ������ͤ��ղä��Ƥ���Τϡ�����å��������Τ���Ǥ������줬�ʤ��ȡ�������������򺹤��ؤ����ݤ�ɽ��������뤳�Ȥ�����ޤ�����IE�Τߡ�
	if (image.substr(image.length-4, 4) == ".gif") {
		iconimage = image;
	} else {
		dd = new Date();
		ts = dd.getTime();
		if (image.indexOf('?') < 0) {
			iconimage = image+"?dummy="+ts+".gif";
		} else {
			iconimage = image+"&dummy="+ts+".gif";
		}
	}

	<?php // add 2014/10/06 Y.Matsukawa [ ?>
	// Ϣ�֥�������ʵ���������������ϻȤ�ʤ���
	if (seq_icon) {
		<?php // add 2014/10/15 Y.Matsukawa [ ?>
		if (seq_icon.img) {
			var divstyle = "display:table-cell;text-align:center;vertical-align:middle;";
			divstyle += "width:"+seq_icon.width+"px;";
			divstyle += "height:"+seq_icon.height+"px;";
			divstyle += "background-image:url(img/icon_seq/"+seq_icon.img+");";
			divstyle += "background-repeat:no-repeat;";
			divstyle += "background-color:transparent;";
			if (mouseclickmarker) divstyle += "cursor:pointer;";
			var numstyle = "";
			numstyle += "color:"+seq_icon.textColor+";";
			numstyle += "font-weight:"+seq_icon.fontWeight+";";
			numstyle += "font-size:"+seq_icon.fontSize+";";
			numstyle += "font-family:"+seq_icon.fontFamily+";";
			numstyle += "background-color:transparent;";
			var w = seq_icon.width + (seq_icon.borderWidth * 2);
			var h = seq_icon.height + (seq_icon.borderWidth * 2);
			var ofsx = (Math.floor(w / 2)) * -1;
			var ofsy = (Math.floor(h / 2)) * -1;
			mrk = new ZDC.UserWidget(latlon, {
				html: '<div style="'+divstyle+'">'
					+ '<span style="'+numstyle+'">'+seq_icon.seq+'</span>'
					+ '</div>',
				size: new ZDC.WH(w, h),
				offset: new ZDC.Pixel(ofsx, ofsy),
				propagation: false
			});
		} else {
		<?php // add 2014/10/15 Y.Matsukawa ] ?>
			var divstyle = "display:table-cell;text-align:center;vertical-align:middle;";
			if (seq_icon.circle) divstyle += "border-radius:50%;";
			divstyle += "border:"+seq_icon.borderColor+" "+seq_icon.borderWidth+"px solid;";
			divstyle += "background-color:"+seq_icon.backgroundColor+";";
			divstyle += "width:"+seq_icon.width+"px;";
			divstyle += "height:"+seq_icon.height+"px;";
			if (mouseclickmarker) divstyle += "cursor:pointer;";
			var numstyle = "";
			numstyle += "color:"+seq_icon.textColor+";";
			numstyle += "font-weight:"+seq_icon.fontWeight+";";
			numstyle += "font-size:"+seq_icon.fontSize+";";
			numstyle += "font-family:"+seq_icon.fontFamily+";";
			var w = seq_icon.width + (seq_icon.borderWidth * 2);
			var h = seq_icon.height + (seq_icon.borderWidth * 2);
			var ofsx = (Math.floor(w / 2)) * -1;
			var ofsy = (Math.floor(h / 2)) * -1;
			mrk = new ZDC.UserWidget(latlon, {
				html: '<div style="'+divstyle+'">'
					+ '<span style="'+numstyle+'">'+seq_icon.seq+'</span>'
					+ '</div>',
				size: new ZDC.WH(w, h),
				offset: new ZDC.Pixel(ofsx, ofsy),
				propagation: false
			});
		}
		mrk.userwidget = true;

	// �̾�ε�����������ʲ�����
	} else {
	<?php // add 2014/10/06 Y.Matsukawa ] ?>
		// new�������󤢤�ξ��
		if (newimage) {
			// ������������
			mrk = new ZDC.Marker(latlon,{
				/* �ޡ����Υ������˹�碌�ư��֤�Ĵ������ */
				offset: new ZDC.Pixel(offsetx, offsety),
				contentOffset: new ZDC.Pixel(newoffsetx, newoffsety),
				custom: {
					base : {
						src: iconimage,
						imgSize: ZDC.WH(sizew, sizeh)
					},
					content : {
						src: newimage,
						imgSize: ZDC.WH(newsizew, newsizeh)
					}
				}
			});
		// new��������ʤ��ξ��
		} else {
			// ������������
			mrk = new ZDC.Marker(latlon,{
				/* �ޡ����Υ������˹�碌�ư��֤�Ĵ������ */
				offset: new ZDC.Pixel(offsetx, offsety),
				custom: {
					base : {
						src: iconimage,
						imgSize: ZDC.WH(sizew, sizeh)
					}
				}
			});
		}
	}
	
	//�ޡ������δ��ܾ���
	mrk.id     = id;
	mrk.data1  = data1;
	mrk.data2  = data2;
	mrk.nflg   = nflg;
	mrk.lat     = lat;
	mrk.lon     = lon;
	if (lvl) mrk.lvl = lvl;
	
	//����å����Υ��٥����Ͽ
	if (mouseclickmarker) {
		//�᤭�Ф��ƥ������ѥ��󥫡����٥��
		<?php // add 2014/10/06 Y.Matsukawa [ ?>
		if (mrk.userwidget) {
			ZDC.addListener(mrk, ZDC.USERWIDGET_CLICK, mouseclickmarker);
		} else {
		<?php // add 2014/10/06 Y.Matsukawa ] ?>
			ZDC.addListener(mrk, ZDC.MARKER_CLICK, mouseclickmarker);
		}
	}

	//�ޥ��������С����Υ��٥����Ͽ
	if (mouseovermarker) {
		var center = ZdcEmapMapObj.getLatLon();
		var box = ZdcEmapMapObj.getLatLonBox();
		var maplatlen = box.getMax().lat - box.getMin().lat;
		var maplonlen = box.getMax().lon - box.getMin().lon;
		//ɽ�����֤�Ĵ��
		if (center.lat > lat) {
			//�Ͽ��濴��겼¦��ɽ��������
			var offsetycenter1 = 10;
			var offsetycenter2 = 90;
			var offsety = -40;
		} else {
			//�Ͽ��濴����¦��ɽ��������
			var offsetycenter1 = -10;
			var offsetycenter2 = -120;
			var offsety = 25;
		}
		if (center.lon > lon) {
			//�Ͽ��濴��꺸¦��ɽ��������
			var offsetxcenter1 = 10;
			var offsetxcenter2 = 102;
			var offsetx = 20;
		} else {
			//�Ͽ��濴��걦¦��ɽ��������
			var offsetxcenter1 = -10;
			var offsetxcenter2 = -120;
			var offsetx = -170;
		}
		
		var mes = message.split("(");
		var userwidgetmoverlabel =
		{
			html: '<div style="background-color: #FFFFFF; font-size:16px; text-align:center; border:1px solid;">'+mes[0]+'</div>',
			size: new ZDC.WH(150, 60),
			offset: new ZDC.Pixel(offsetx, offsety)
		};
		var latlonmover = new ZDC.LatLon(lat, lon);
		var userwidgetmover = new ZDC.UserWidget(latlonmover, userwidgetmoverlabel);
		
		//�᤭�Ф��ƥ����ȥ��٥��
		ZdcEmapMapObj.addWidget(userwidgetmover);
		
		//�ޥ��������С����٥����Ͽ
		<?php // add 2014/10/06 Y.Matsukawa [ ?>
		if (mrk.userwidget) {
			ZDC.addListener(mrk, ZDC.USERWIDGET_MOUSEOVER, mouseovermarker);
		} else {
		<?php // add 2014/10/06 Y.Matsukawa ] ?>
			ZDC.addListener(mrk, ZDC.MARKER_MOUSEOVER, mouseovermarker);
		}

		<?php // add 2015/09/17 F.Yokoi [ ?>
		//�ޥ��������ȥ��٥����Ͽ
		if (mrk.userwidget) {
			ZDC.addListener(mrk, ZDC.USERWIDGET_MOUSEOUT, mouseoutmarker);
		} else {
			ZDC.addListener(mrk, ZDC.MARKER_MOUSEOUT, mouseoutmarker);
		}
		<?php // add 2015/09/17 F.Yokoi ] ?>

	}
	
	return mrk;
}

//-------------------------------------------------------------
//�᤭�Ф��ѥ��󥫡�
//-------------------------------------------------------------
var ZdcEmapHukidasiAnchor = null;
function ZdcEmapAnchorDraw(id) {
	ZdcEmapTipsHideInfoInterval();
	//ư��Ƚ��
	if(id == null) id = this.id;
	
	//�إ��������ɸ����
	var icnlat = ZdcEmapMapPoiMrkId[id].lat;
	var icnlon = ZdcEmapMapPoiMrkId[id].lon;
	
	var center = ZdcEmapMapObj.getLatLon();
	var box = ZdcEmapMapObj.getLatLonBox();
	var maplatlen = box.getMax().lat - box.getMin().lat;
	var maplonlen = box.getMax().lon - box.getMin().lon;
	
	var s = ZdcEmapMapObj.getZoom();
	<?php	// del 2016/04/21 H.Osamoto if(s < < ?PHP echo $D_VIEW_ICON_MAX; ? > || s > < ?PHP echo $D_VIEW_ICON_MIN; ? >) return; ?>
	//���֥������Ȥκ���
	ZdcEmapTipsMarker = ZdcEmapMapPoiMrkId[id];
	if(!ZdcEmapMapObj || !ZdcEmapTipsMarker) return;
	
	//ɽ�����֤�Ĵ��
	if (center.lat > icnlat) {
		//�Ͽ��濴��겼¦��ɽ��������
		var offsetycenter1 = 3;
		var offsetycenter2 = 22;
	} else {
		//�Ͽ��濴����¦��ɽ��������
		var offsetycenter1 = -3;
		var offsetycenter2 = -30;
	}
	if (center.lon > icnlon) {
		//�Ͽ��濴��꺸¦��ɽ��������
		var offsetxcenter1 = 3;
		var offsetxcenter2 = 25;
	} else {
		//�Ͽ��濴��걦¦��ɽ��������
		var offsetxcenter1 = -3;
		var offsetxcenter2 = -30;
	}
	
	var mrklat1 = ZdcEmapTipsMarker.lat + (offsetycenter1 * (maplatlen / 448));
	var mrklon1 = ZdcEmapTipsMarker.lon + (offsetxcenter1 * (maplonlen / 448));
	var mrklat2 = ZdcEmapTipsMarker.lat + (offsetycenter2 * (maplatlen / 448));
	var mrklon2 = ZdcEmapTipsMarker.lon + (offsetxcenter2 * (maplonlen / 448));
	
	var latlons = [];
	latlons[0] = new ZDC.LatLon(mrklat1, mrklon1);
	latlons[1] = new ZDC.LatLon(mrklat2, mrklon2);
	
	/* ������� */
	var pl = new ZDC.Polyline(latlons, 
	{
		strokeWeight: 1,
		fillColor: '#FF0000'
	});

	/* �����Ͽޤ��ɲ� */
	ZdcEmapMapObj.addWidget(pl);
	
	ZdcEmapHukidasiAnchor = pl;
	ZDC.addListener(ZdcEmapTipsMarker, ZDC.MARKER_MOUSEOUT, function(){pl.hidden();});
}


//-------------------------------------------------------------
//�롼��õ��
//-------------------------------------------------------------
var ZdcEmapRouteOptionsObj;
var ZdcEmapRouteSearchObj;
var ZdcEmapRoutePoint1 = null;
var ZdcEmapRoutePoint2 = null;
var ZdcEmapRouteName1  = null;
var ZdcEmapRouteName2  = null;
var ZdcEmapRouteFlagLayer;
var ZdcEmapRouteFlagIcon1;
var ZdcEmapRouteFlagIcon2;
var ZdcEmapRouteFlagStartMarker1;
var ZdcEmapRouteFlagStartMarker2;
//����ե�����Ǿ����Ѥ������Ѥ��ѿ������Ƥ���
var ZdcEmapRouteType              = <?PHP echo $D_ROUTE_TYPE; ?>;
var ZdcEmapRouteWalkPSC           = <?PHP echo $D_ROUTE_WALK_PSC; ?>;
var ZdcEmapRouteWalkFloorFlg      = <?PHP echo $D_ROUTE_WALK_FLOORFLG; ?>;
var ZdcEmapRouteWalkDepFloor      = <?PHP echo $D_ROUTE_WALK_DEP_FLOOR; ?>;
var ZdcEmapRouteWalkDepStationFlg = <?PHP echo $D_ROUTE_WALK_DEP_STATIONFLG; ?>;
var ZdcEmapRouteWalkArrFloorFlg   = <?PHP echo $D_ROUTE_WALK_ARR_FLOORFLG; ?>;
var ZdcEmapRouteWalkArrStationFlg = <?PHP echo $D_ROUTE_WALK_ARR_STATIONFLG; ?>;
var ZdcEmapRouteWalkArrFloor      = <?PHP echo $D_ROUTE_WALK_ARR_FLOOR; ?>;
//���������(API2.0��)
function ZdcEmapRouteSearchApi2(id, route_type) {<?php // mod 2015/04/09 F.Yokoi ?>
	if(ZdcEmapButtonNG()) return;
	if(ZdcEmapRouteType == 0) return;
	ZdcEmapPoiRouteClear();
	ZdcEmapRouteCase = 'eki';		<?php // add 2013/06/03 Y.Matsukawa ?>

	<?php // add 2016/09/29 Y.Uesugi [ ?>
	//�롼�ȥ����פΥǥե���Ȼ���
	if (route_type === undefined) {
		<?php if ($D_ROUTE_TYPE) { ?>
			ZdcEmapRouteType = <?PHP echo $D_ROUTE_TYPE; ?>;
		<?php } ?>
	}
	<?php // add 2016/09/29 Y.Uesugi ] ?>

	<?php //ZdcEmapRouteType = route_type === undefined ? 1 : route_type;< ?php // add 2015/04/08 F.Yokoi ? >		mod 2015/07/10 Y.Matsukawa ?>
	if (route_type !== undefined) ZdcEmapRouteType = route_type;

	var stationpoint = ZdcEmapMapPoiMrkId[id];
	var shoppoint = ZdcEmapMapShopDetailMrkId;
	
	//�ѥ�᡼����������
	ZdcEmapRoutePoint1 = new ZDC.LatLon(stationpoint.lat, stationpoint.lon);
	ZdcEmapRoutePoint2 = new ZDC.LatLon(shoppoint.lat, shoppoint.lon);
	
	if(ZdcEmapRouteType == 1 || ZdcEmapRouteType == 3)
		ZdcEmapRouteSearchWalkApi2(stationpoint, shoppoint);
	if(ZdcEmapRouteType == 2)
		ZdcEmapRouteSearchCarApi2(stationpoint, shoppoint);

	//���̤ΰ�ư
	ZdcEmapMapMoveBoxApi2(stationpoint.lat,stationpoint.lon,shoppoint.lat,shoppoint.lon);
}
//���������
function ZdcEmapRouteSearch(name1,mx1,my1,name2,mx2,my2,route_type) {<?php // mod 2015/04/08 F.Yokoi ?>
	if(ZdcEmapButtonNG()) return;
	if(ZdcEmapRouteType == 0) return;
	ZdcEmapPoiRouteClear();
	
	//�ѥ�᡼����������
	ZdcEmapRouteName1 = name1;
	ZdcEmapRouteName2 = name2;
	var stationpoint = new ZDC.LatLon(Number(my2), Number(mx2));
	var shoppoint = new ZDC.LatLon(Number(my1), Number(mx1));
	ZdcEmapRoutePoint1 = stationpoint;
	ZdcEmapRoutePoint2 = shoppoint;

	<?php // add 2016/09/29 Y.Uesugi [ ?>
	//�롼�ȥ����פΥǥե���Ȼ���
	if (route_type === undefined) {
		<?php if ($D_ROUTE_TYPE) { ?>
			ZdcEmapRouteType = <?PHP echo $D_ROUTE_TYPE; ?>;
		<?php } ?>
	}
	<?php // add 2016/09/29 Y.Uesugi ] ?>

	<?php //ZdcEmapRouteType = route_type === undefined ? 1 : route_type;< ?php // add 2015/04/08 F.Yokoi ? >		mod 2015/07/10 Y.Matsukawa ?>
	if (route_type !== undefined) ZdcEmapRouteType = route_type;

	if(ZdcEmapRouteType == 1 || ZdcEmapRouteType == 3)
		ZdcEmapRouteSearchWalkApi2(stationpoint, shoppoint);
	if(ZdcEmapRouteType == 2)
		ZdcEmapRouteSearchCarApi2(stationpoint, shoppoint);

	//���̤ΰ�ư
	ZdcEmapMapMoveBoxApi2(stationpoint.lat,stationpoint.lon,shoppoint.lat,shoppoint.lon);
}
// ��Լԥ롼�ȸ���(API2.0��)
function ZdcEmapRouteSearchWalkApi2(p1,p2) {
	ZdcEmapReadOn();
	
	/* �������������ΰ��ٷ��� */
	from = p1;
	/* �����������ΰ��ٷ��� */
	to   = p2;
	/* ��ԼԤ�®����80m/min�Ȥ��� */
	var walk_speed = 80;

	ZDC.Search.getRouteByWalk({
		from: from,
		to: to
		<?php if (!$D_ROUTE_EKI_EXIT) { ?>, station: "bothoff"<?php }	// add 2012/08/17 Y.Matsukawa ?>
	},function(status, res) {
		if (status.code == '000') {
			/* �������� */
			ZdcEmapwriteRoute(status, res, 1);
			<?php if ($D_ROUTE_DISTANCE_DSP_MAP) { // mod 2015/04/08 F.Yokoi [ ?>
			var walk_time = res.route.distance / walk_speed;
			walk_time = Math.ceil(walk_time);

			ZdcEmapDispRouteDistanceMap(res.route.distance, walk_time);
			<?php } else { ?>
			ZdcEmapDispRouteDistance(res.route.distance);
			<?php } // mod 2015/04/08 F.Yokoi ] ?>
		} else {
			/* �������� */
			if(ZdcEmapRouteType == 1) {

				<?php // mod 2015/12/01 H.Yasunaga ��Υ���᤹������⥢�顼�Ȥ�ɽ�������Τǻ����Ƚ����ΰ��֤�Ʊ�����ϥ��顼�Ȥ�ɽ�����ʤ�[ ?> 
				<?php // mod 2016/08/31 Y.Uesugi ľ����Υ��8m�ʲ��ξ��⥢�顼�Ȥ�ɽ�������Τǥ��顼����ɽ���Ȥ���[ ?> 
				var distance = Math.ceil(ZDC.getLatLonToLatLonDistance(from, to));
				if ((from.lat != to.lat || from.lon != to.lon) && distance > 8) {
				<?php //mod 2016/08/31 Y.Uesugi ] ?>
					<?php if ($D_MSG_ERR_SEARCH_WALK_ALERT != '') { // add 2015/04/08 F.Yokoi [ ?>
					alert("<?php echo $D_MSG_ERR_SEARCH_WALK_ALERT; ?>");
					<?php } // add 2015/04/08 F.Yokoi ] ?>
				}
				<?php // mod 2015/12/01 H.Yasunaga ] ?>

				//���Ԥ��ä���缫ư�֤ǺƸ�������
				ZdcEmapRouteSearchCarApi2(ZdcEmapRoutePoint1,ZdcEmapRoutePoint2);
			} else {
				alert('<?PHP echo $D_MSG_ERR_JS_ROUTE; ?> [' + status.code + ']');
			}
			return;
		}
	});
}
// ��ư�֥롼�ȸ���(API2.0��)
function ZdcEmapRouteSearchCarApi2(p1,p2) {
	//ZdcEmapReadOn();
	
	/* �������������ΰ��ٷ��� */
	from = p1;
	/* �����������ΰ��ٷ��� */
	to   = p2;
	
	ZDC.Search.getRouteByDrive({
		from: from,
		to: to
<?php // add 2016/08/25 Y.Uesugi [ ?>
<?php if ($D_ROUTE_LINE_TOLL_FALSE) { ?>
		/* ͭ��ƻϩ�򸡺��оݤȤ��ʤ� */
		, toll: false
<?php } ?>
<?php // add 2016/08/25 Y.Uesugi ] ?>
	},function(status, res) {
		if (status.code == '000') {
			/* �������� */
			ZdcEmapwriteRoute(status, res, 2);
			<?php if ($D_ROUTE_DISTANCE_DSP_MAP) { // mod 2015/04/08 F.Yokoi [ ?>
			ZdcEmapDispRouteDistanceMap(res.route.distance, res.route.time);
			<?php } else { ?>
			ZdcEmapDispRouteDistance(res.route.distance);
			<?php } // mod 2015/04/08 F.Yokoi ] ?>
		} else {
			/* �������� */
			alert('<?PHP echo $D_MSG_ERR_JS_ROUTE; ?> [' + status.code + ']');
			// �롼�ȸ�����λ
			ZdcEmapReadOff();
		}
	});
}
// �롼������
var ZdcEmapRoutePolyline = [];
var ZdcEmapRouteStartFlag;
var ZdcEmapRouteEndFlag;
var ZdcEmapRouteMarker = [];	<?php // add 2016/08/25 Y.Uesugi ?>
var ZdcEmapMsgInfo = null;		<?php // add 2016/08/25 Y.Uesugi ?>
function ZdcEmapwriteRoute(status, res, stype) {
	
	var guyde_type = {
		'start': {
			custom: {
				base: {
					src: '<?PHP echo $D_ROUTE_START_IMAGE; ?>',
					imgSize: new ZDC.WH(35, 35),
					imgTL: new ZDC.TL(0, 0)
				}
			},
			offset: ZDC.Pixel(-5, -36)
		},
		'end': {
			custom: {
				base: {
					src: '<?PHP echo $D_ROUTE_GOAL_IMAGE; ?>',
					imgSize: new ZDC.WH(35, 35),
					imgTL: new ZDC.TL(0, 0)
				}
			},
			offset: ZDC.Pixel(-5, -36)
		}
	};
	
	var line_property = {
		//��Լ���
		'�̾���ϩ': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'������ƻ': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'������ϩ': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'��ƻ��': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'Ƨ������ϩ': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'Ϣ����ϩ': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'��ʪ����ϩ': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'��������ϩ': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'�费���': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'��ϩ��': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'�������ߥ��': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		//��ư����
		'��®ƻϩ': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'�ԻԹ�®ƻϩ': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'��ƻ': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'��������ƻ': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'��ƻ�ܸ�ƻ': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'����ƻϩ(����)': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'����ƻϩ(����¾)': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'Ƴ��ϩ': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'�ٳ�ϩ(����)': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'�ٳ�ϩ(�ܺ�)': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'�ե��꡼��ϩ': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'ƻϩ��': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'}
	};



	/* �������Ȥȥ�����Υ���������Ͽޤ˽ž����ޤ� */
	ZdcEmapRouteStartFlag = new ZDC.Marker(from,guyde_type['start']);
	ZdcEmapRouteEndFlag   = new ZDC.Marker(to,guyde_type['end']);
	/*
	�������Ȥȥ�����Υ������åȤ�¾�Υޡ�����
	���ˤʤ�ʤ��褦��z-index�����ꤷ�ޤ�
	*/
	ZdcEmapRouteStartFlag.setZindex(110);
	ZdcEmapRouteEndFlag.setZindex(110);

	ZdcEmapMapObj.addWidget(ZdcEmapRouteStartFlag);
	ZdcEmapMapObj.addWidget(ZdcEmapRouteEndFlag);

	var link = res.route.link;
	
	var latlons = [];
	for (var i=0, j=link.length; i<j; i++) {
		
		if (stype == 1) {
			var opt = line_property[link[i].type.replace(/^\s+|\s+$/g, "")];
		} else {
			var opt = line_property[link[i].roadType.replace(/^\s+|\s+$/g, "")];
		}
		var pl = new ZDC.Polyline([], opt);
		
		for (var k=0, l=link[i].line.length; k<l; k++) {
			pl.addPoint(link[i].line[k]); 
			
			latlons[i] = link[i].line[0];

			if(i == j-1 && k == 1) {
				latlons[i+1] = link[i].line[1];
			}
		}
		ZdcEmapMapObj.addWidget(pl);
		ZdcEmapRoutePolyline[i] = pl;

		<?php // add 2016/08/25 Y.Uesugi [ ?>
		<?php if ($D_ROUTE_LINE_PROPERTY_DSP_MAP_WALK) { ?>
			// ��Լ�
			if (stype == 1) {
				// �ޡ�����ɽ��
				if (link[i].type != '�̾���ϩ' || link[i].structureType != '�̾�') {
					var guide = link[i].type;

					ZdcEmapRouteMarker[i] = new ZDC.Marker(link[i].line[0]);
					ZdcEmapMapObj.addWidget(ZdcEmapRouteMarker[i]);

					/* �ޡ����򥯥�å������Ȥ���ư�� */
					ZDC.bind(ZdcEmapRouteMarker[i], ZDC.MARKER_CLICK, {link: link[i]}, ZdcEmapMarkerClickWalk);

					/* ������� */
					init_lat = <?PHP echo $D_INIT_LAT; ?>;
					init_lon = <?PHP echo $D_INIT_LON; ?>;

					/* �ޡ����˿᤭�Ф���ɽ�� */
					ZdcEmapMsgInfo = new ZDC.MsgInfo(new ZDC.LatLon(init_lat, init_lon), {offset: ZDC.Pixel(0, -18)});
					ZdcEmapMapObj.addWidget(ZdcEmapMsgInfo);
				}
			}
		<?php } ?>
		<?php if ($D_ROUTE_LINE_PROPERTY_DSP_MAP_DRIVE) { ?>
			// ��ư��
			if (stype == 2) {
				if ((link[i].type != '�̾���ϩ' || link[i].structureType != '�̾�') && link[i].guidance != null) {
					var guide = link[i].guidance.guideType;

					/* ���� || ���̵ڤ����� || ETC */
					var url = link[i].guidance.crossImageUri ||
							  link[i].guidance.signboardImageUri ||
							  link[i].guidance.etcImageUri;
					if (url) {
						ZdcEmapRouteMarker[i] = new ZDC.Marker(link[i].line[0]);
						ZdcEmapMapObj.addWidget(ZdcEmapRouteMarker[i]);

						/* �ޡ����򥯥�å������Ȥ���ư�� */
						ZDC.bind(ZdcEmapRouteMarker[i], ZDC.MARKER_CLICK, {link: link[i]}, ZdcEmapMarkerClickDrive);

						/* ������� */
						init_lat = <?PHP echo $D_INIT_LAT; ?>;
						init_lon = <?PHP echo $D_INIT_LON; ?>;

						/* �ޡ����˿᤭�Ф���ɽ�� */
						ZdcEmapMsgInfo = new ZDC.MsgInfo(new ZDC.LatLon(init_lat, init_lon), {offset: ZDC.Pixel(0, -18)});
						ZdcEmapMapObj.addWidget(ZdcEmapMsgInfo);

					}
				}
			}
		<?php } ?>
		<?php // add 2016/08/25 Y.Uesugi ] ?>

	}
	/* ����������ɽ���Ǥ���̼ܥ�٥����� */
	var adjust = ZdcEmapMapObj.getAdjustZoom(latlons);
	ZdcEmapMapObj.moveLatLon(adjust.latlon);
	ZdcEmapMapObj.setZoom(adjust.zoom);
	
	// �롼�ȸ�����λ
	ZdcEmapReadOff();

};

// �롼�ȵ�Υɽ��(API2.0��)
function ZdcEmapDispRouteDistance(dist) {
	if (ZdcEmapRouteCase != 'free') return;		<?php // add 2013/06/03 Y.Matsukawa ?>
	//�롼�ȵ�Υɽ��
	var ZdcEmapRouteDistance = document.getElementById("ZdcEmapRouteDistance");
	if (ZdcEmapRouteDistance) {
		distance = dist;
		if (distance < 1000) {
			distance = distance+' m';
		} else {
			distance = distance / 100;
			distance = Math.round(distance);
			distance = distance / 10;
			distance += ' km';
		}
		ZdcEmapRouteDistance.innerHTML = distance;
	}
}

<?php // add 2015/04/08 F.Yokoi [ ?>
// �롼�ȵ�Υ������ɽ��(API2.0�ѡ��Ͽ޾�)
function ZdcEmapDispRouteDistanceMap(dist, time) {
	if (ZdcEmapTipsTopShapeLayer) {
		ZdcEmapTipsTopShapeLayer.close(); // �쥤�䡼�Υ��ꥢ
	}

	//�롼�ȵ�Υɽ��
	var distance = dist;
	if (distance < 1000) {
		distance = distance+' m';
	} else {
		distance = distance / 100;
		distance = Math.round(distance);
		distance = distance / 10;
		distance += ' km';
	}

	<?php //add start 2015/12/01 H.Yasunaga ��ư����(time)��nullʬ��ɽ�������Τ� 1ʬ�ˤ���[ ?>
	if (time == null) {
		time = 1;
	}
	<?php //add start 2015/12/01 H.Yasunaga] ?>

	if (time != '') {
		var userwidgetrouterlabel =
		{
			html: '<div style="<?php echo $D_ROUTE_DISTANCE_DSP_STYLE; ?>">��ư��Υ��' + distance + '<br />��ư���֡�' + time + ' ʬ</div>',
			size: new ZDC.WH('<?php echo $D_ROUTE_DISTANCE_DSP_W; ?>', '<?php echo $D_ROUTE_DISTANCE_DSP_H; ?>')
		};
	} else {
		var userwidgetrouterlabel =
		{
			html: '<div style="<?php echo $D_ROUTE_DISTANCE_DSP_STYLE; ?>">��ư��Υ��' + distance + '</div>',
			size: new ZDC.WH('<?php echo $D_ROUTE_DISTANCE_DSP_W; ?>', '<?php echo $D_ROUTE_DISTANCE_DSP_H; ?>')
		};
	}

	var positionrouter = new ZDC.TL('<?php echo $D_ROUTE_DISTANCE_DSP_Y; ?>', '<?php echo $D_ROUTE_DISTANCE_DSP_X; ?>');
	var userwidgetrouter = new ZDC.StaticUserWidget(positionrouter, userwidgetrouterlabel);

	//�쥤�䡼��ɽ��
	ZdcEmapMapObj.addWidget(userwidgetrouter);
	userwidgetrouter.open();
	ZdcEmapTipsTopShapeLayer = userwidgetrouter;
}
<?php // add 2015/04/08 F.Yokoi ] ?>

//��ԼԸ���
function ZdcEmapRouteSearchWalk(name1,p1,name2,p2) {
	ZdcEmapReadOn();
	//���֥������Ⱥ���
	ZdcEmapRouteOptionsObj = new ZdcPRouteSearchOptions();
	ZdcEmapRouteSearchObj = new ZdcPRouteSearch();
	ZdcEmapRouteOptionsObj.showMarker = false;
	ZdcEmapRouteOptionsObj.pointFlg = <?PHP echo $D_PFLG; ?>;
	ZdcEmapRouteSearchObj.timeout = <?PHP echo $D_ROUTE_TIMEOUT; ?>;
	ZdcEvent.addListener(ZdcEmapRouteSearchObj, 'end', ZdcEmapRouteSearchEndWalk);
	ZdcEmapMapObj.addPRouteSearch(ZdcEmapRouteSearchObj);
	
	//�ǥ��������
	ZdcEmapRouteSearchObj.routeWidth = <?PHP echo $D_ROUTE_WALK_WIDTH; ?>;
	ZdcEmapRouteSearchObj.routeOpacity = "<?PHP echo $D_ROUTE_WALK_OPACITY; ?>";
	ZdcEmapRouteSearchObj.routeColor = "<?PHP echo $D_ROUTE_WALK_COLOR; ?>";
	
	//���ֻ���
	ZdcEmapRouteOptionsObj.arrivalPoint.point = p1;
	ZdcEmapRouteOptionsObj.departurePoint.point = p2;
	
	//����������
	//����
	ZdcEmapRouteOptionsObj.psc = ZdcEmapRouteWalkPSC;
	ZdcEmapRouteOptionsObj.floorFlg = ZdcEmapRouteWalkFloorFlg;
	//������(��ȯ��)
	ZdcEmapRouteOptionsObj.arrivalPoint.name = name1;
	ZdcEmapRouteOptionsObj.arrivalPoint.floorFlg = ZdcEmapRouteWalkArrFloorFlg;
	ZdcEmapRouteOptionsObj.arrivalPoint.stationFlg = ZdcEmapRouteWalkArrStationFlg;
	ZdcEmapRouteOptionsObj.arrivalPoint.floor = ZdcEmapRouteWalkArrFloor;
	//��ȯ��(����)
	ZdcEmapRouteOptionsObj.departurePoint.name = name2;
	ZdcEmapRouteOptionsObj.departurePoint.stationFlg = ZdcEmapRouteWalkDepStationFlg;
	ZdcEmapRouteOptionsObj.departurePoint.floor = ZdcEmapRouteWalkDepFloor;
	//��������
	ZdcEmapRouteSearchObj.search(ZdcEmapRouteOptionsObj);
}
function ZdcEmapRouteSearchEndWalk() {
	ZdcEmapReadOff();
	var result = this.getResult();
	if(result && (result.status !== 0)) {
		//���顼����
		if(ZdcEmapRouteType == 1) {
			//���Ԥ��ä���缫ư�֤ǺƸ�������
			ZdcEmapRouteSearchCar(ZdcEmapRouteName1,ZdcEmapRoutePoint1,ZdcEmapRouteName2,ZdcEmapRoutePoint2);
		} else {
			alert('<?PHP echo $D_MSG_ERR_JS_ROUTE; ?> [' + result.status + ']');
		}
		return;
	}
	//�������ȡ�������Υ������������
	ZdcEmapRouteFlag();
	//�롼�ȵ�Υɽ��
	var ZdcEmapRouteDistance = document.getElementById("ZdcEmapRouteDistance");
	if (ZdcEmapRouteDistance) {
		distance = result.distance;
		if (distance < 1000) {
			distance = distance+' m';
		} else {
			distance = distance / 100;
			distance = Math.round(distance);
			distance = distance / 10;
			distance += ' km';
		}
		ZdcEmapRouteDistance.innerHTML = distance;
	}
}
//��ư�ָ���
function ZdcEmapRouteSearchCar(name1,p1,name2,p2) {
	ZdcEmapReadOn();
	//���֥������Ⱥ���
	ZdcEmapRouteOptionsObj = new ZdcRouteSearchOptions();
	ZdcEmapRouteSearchObj = new ZdcRouteSearch();
	ZdcEmapRouteOptionsObj.showMarker = false;
	ZdcEmapRouteOptionsObj.pointFlg = <?PHP echo $D_PFLG; ?>;
	ZdcEmapRouteSearchObj.timeout = <?PHP echo $D_ROUTE_TIMEOUT; ?>;
	ZdcEvent.addListener(ZdcEmapRouteSearchObj, 'end', ZdcEmapRouteSearchEndCar);
	ZdcEmapMapObj.addRouteSearch(ZdcEmapRouteSearchObj);
	
	//�ǥ��������
	ZdcEmapRouteSearchObj.routeWidth = <?PHP echo $D_ROUTE_CAR_WIDTH; ?>;
	ZdcEmapRouteSearchObj.routeOpacity = "<?PHP echo $D_ROUTE_CAR_OPACITY; ?>";
	ZdcEmapRouteSearchObj.routeColor = "<?PHP echo $D_ROUTE_CAR_COLOR; ?>";
	
	//���ֻ���
	ZdcEmapRouteOptionsObj.arrivalPoint = p1;
	ZdcEmapRouteOptionsObj.departurePoint = p2;

	//��������
	ZdcEmapRouteSearchObj.search(ZdcEmapRouteOptionsObj);
}
function ZdcEmapRouteSearchEndCar() {
	ZdcEmapReadOff();
	var result = this.getResult();
	if(result && (result.status !== 0)) {
		//���顼����
		alert('<?PHP echo $D_MSG_ERR_JS_ROUTE; ?> [' + result.status + ']');
		return;
	}
	//�������ȡ�������Υ������������
	ZdcEmapRouteFlag();
	//�롼�ȵ�Υɽ��
	var ZdcEmapRouteDistance = document.getElementById("ZdcEmapRouteDistance");
	if (ZdcEmapRouteDistance) {
		distance = result.distance;
		if (distance < 1000) {
			distance = distance+' m';
		} else {
			distance = distance / 100;
			distance = Math.round(distance);
			distance = distance / 10;
			distance += ' km';
		}
		ZdcEmapRouteDistance.innerHTML = distance;
	}
}
//�롼�Ⱥ��
function ZdcEmapPoiRouteClear() {
	if(!ZdcEmapRoutePolyline.length) return;
	
	for (var i=0; i<ZdcEmapRoutePolyline.length; i++) {
		if (ZdcEmapRoutePolyline[i]) {		<?php // add 2012/03/16 Y.Matsukawa ?>
			ZdcEmapMapObj.removeWidget(ZdcEmapRoutePolyline[i]);
			delete ZdcEmapRoutePolyline[i];
		}
	}
	
	//�������ȡ�������Υ쥤�䡼����
	if(ZdcEmapRouteStartFlag){
		ZdcEmapMapObj.removeWidget(ZdcEmapRouteStartFlag);
		delete ZdcEmapRouteStartFlag;
	}
	if(ZdcEmapRouteEndFlag){
		ZdcEmapMapObj.removeWidget(ZdcEmapRouteEndFlag);
		delete ZdcEmapRouteEndFlag;
	}

<?php // add 2016/08/25 Y.Uesugi [ ?>
	<?php if ($D_ROUTE_LINE_PROPERTY_DSP_MAP_WALK || D_ROUTE_LINE_PROPERTY_DSP_MAP_DRIVE) { ?>
	// �ޡ�������
	if(ZdcEmapRouteMarker.length){
		for (var i=0; i<ZdcEmapRouteMarker.length; i++) {
			if (ZdcEmapRouteMarker[i]) {
				ZdcEmapMapObj.removeWidget(ZdcEmapRouteMarker[i]);
				delete ZdcEmapRouteMarker[i];
			}
		}
	}
	// �ޡ����ο᤭�Ф�����
	if(ZdcEmapMsgInfo){
		ZdcEmapMapObj.removeWidget(ZdcEmapMsgInfo);
		delete ZdcEmapMsgInfo;
	}
	<?php } ?>
<?php // add 2016/08/25 Y.Uesugi ] ?>
}
//�롼�ȳ��ϡ���λ�����Υ������������
function ZdcEmapRouteFlag() {
	//�桼���쥤�䡼����
	ZdcEmapRouteFlagLayer = new ZdcUserLayer();
	ZdcEmapRouteFlagLayer.setLayerScale(1, 18);
	ZdcEmapRouteFlagLayer.setLayerType('manual');
	//�����������
	ZdcEmapRouteFlagIcon1 = new ZdcIcon();
	ZdcEmapRouteFlagIcon1.offset = new ZdcPixel(<?PHP echo $D_ROUTE_GOAL_OFFSET_X; ?>, <?PHP echo $D_ROUTE_GOAL_OFFSET_Y; ?>);
	ZdcEmapRouteFlagIcon1.image = '<?PHP echo $D_ROUTE_GOAL_IMAGE; ?>';
	ZdcEmapRouteFlagIcon2 = new ZdcIcon();
	ZdcEmapRouteFlagIcon2.offset = new ZdcPixel(<?PHP echo $D_ROUTE_START_OFFSET_X; ?>, <?PHP echo $D_ROUTE_START_OFFSET_Y; ?>);
	ZdcEmapRouteFlagIcon2.image = '<?PHP echo $D_ROUTE_START_IMAGE; ?>';
	//�桼���쥤�䡼���ɲ�
	if(ZdcEmapRoutePoint1) ZdcEmapRouteFlagLayer.addMarker(new ZdcMarker(ZdcEmapRoutePoint1, ZdcEmapRouteFlagIcon1));
	if(ZdcEmapRoutePoint2) ZdcEmapRouteFlagLayer.addMarker(new ZdcMarker(ZdcEmapRoutePoint2, ZdcEmapRouteFlagIcon2));
	//�Ͽޤ˥桼���쥤�䡼���ɲ�
	ZdcEmapMapObj.addUserLayer(ZdcEmapRouteFlagLayer);
	//�롼�ȥ쥤�䡼�ξ�˰�ư
	ZdcEmapRouteFlagLayer.doc.style.zIndex = "3999";
}

<?php // add 2016/08/25 Y.Uesugi [ ?>
//�롼�ȥХ롼��ο᤭�Ф�������������
function ZdcEmapMarkerClickWalk() {
	var html = '<div id="MarkerWalkMsg" style = "width:200px; height:50px;">';
		html += '<table id="MarkerWalkMsgTbl" border="1" style="width:180px;">';
		html += '<tr>';
		html += '<td width="35%" style="font-size:10pt;">��ϩ����</td>';
		html += '<td style="font-size:10pt;">' + this.link.structureType + '</td>';
		html += '</tr>';
		html += '<tr>';
		html += '<td style="font-size:10pt;">��¤����</td>';
		html += '<td style="font-size:10pt;">'+ this.link.type +'</td>';
		html += '</tr></table></div>';

	ZdcEmapMsgInfo.setHtml(html);
	ZdcEmapMsgInfo.moveLatLon(new ZDC.LatLon(this.link.line[0].lat, this.link.line[0].lon));
	ZdcEmapMsgInfo.open();
};

//�롼�ȥХ롼��ο᤭�Ф�������ʼ�ư�֡�
function ZdcEmapMarkerClickDrive() {
	var url = this.link.guidance.crossImageUri ||
	this.link.guidance.signboardImageUri ||
	this.link.guidance.etcImageUri;

	var road_name  = this.link.guidance.roadName;
	var cross_name = this.link.guidance.crossName;

	if (road_name == null) {
		road_name = '�ʤ�';
	}
	if (cross_name == null) {
		cross_name = '�ʤ�';
	}
	var html = '<div id="MarkerDriveMsg" style = "width:200px; height:167px; overflow-y:scroll;">';
		html += '<img src=' + url + '></src>';
		html += '<table id="MarkerDriveMsgTbl" border="1" style="width:180px;">';
		html += '<tr>';
		html += '<td width="35%" style="font-size:9pt;">ƻϩ̾</td>';
		html += '<td style="font-size:9pt;">'+ road_name +'</td>';
		html += '</tr>';
		html += '<tr>';
		html += '<td style="font-size:9pt;">����̾</td>';
		html += '<td style="font-size:9pt;">'+ cross_name +'</td>';
		html += '</tr></table></div>';

	ZdcEmapMsgInfo.setHtml(html);
	ZdcEmapMsgInfo.moveLatLon(new ZDC.LatLon(this.link.line[0].lat, this.link.line[0].lon));
	ZdcEmapMsgInfo.open();
};
<?php // add 2016/08/25 Y.Uesugi ] ?>


//-------------------------------------------------------------
//��ư�����Υ��٥�ȴ���
//-------------------------------------------------------------
var ZdcEmapSearchEventFlg  = 0;
var ZdcEmapSearchEventFunc = null;
var ZdcEmapSearchEventDragmapend;
var ZdcEmapSearchEventScrollmapend;
var ZdcEmapSearchEventChangezoomend;
var ZdcEmapSearchEventChangezoomAvailable = 1;		<?php // add 2011/12/19 Y.Matsukawa ?>
//�����¹�
function ZdcEmapSearchEventAction() {
	if(!ZdcEmapSearchEventFlg) return;
<?php	// del 2011/12/13 Y.Matsukawa [
		//	if(userwidgethukidasi) {
		//		if(userwidgethukidasi.kg) {
		//			return;//�ե�����ɽ����ϸ������ʤ�
		//		}
		//	}
		// del 2011/12/13 Y.Matsukawa ] ?>
<?php	// add 2011/12/20 Y.Matsukawa [
		// �Ͽ������˺Ƹ������ʤ��⡼��
		if ($D_SHOP_NO_SEARCH_USER_ACT) { ?>
	return;
<?php	}
		// add 2011/12/20 Y.Matsukawa ] ?>
	<?php if(isset($print_flg) && $print_flg){ ?>return;<?php } ?>	<?php	// add 2012/11/06 H.Osamoto ?>
	ZdcEmapSearchPoint = null;
	eval(ZdcEmapSearchEventFunc);
}
<?php	// add 2011/12/19 Y.Matsukawa ?>
function ZdcEmapEventDragAction() {
	ZdcEmapSearchEventAction();
}
<?php	// add 2011/12/19 Y.Matsukawa ?>
function ZdcEmapEventScrollAction() {
	ZdcEmapSearchEventAction();
}
<?php	// add 2011/12/19 Y.Matsukawa ?>
function ZdcEmapEventZoomAction() {
	<?php // �Ǵ���Ͽ޽��ɽ��ľ��˥������ѹ����٥�Ȥ�ȯ�������Ǵ�긡��������¹Ԥ���Ƥ��ޤ��Τ���� ?>
	if (!ZdcEmapSearchEventChangezoomAvailable) {
		ZdcEmapSearchEventChangezoomAvailable = 1;
		return;
	}
	ZdcEmapSearchEventAction();
}
//�������٥���ɲ�
function ZdcEmapSearchEventAdd(func) {
	ZdcEmapSearchEventDel();
	ZdcEmapSearchEventFunc = func;
<?php	// del 2011/12/19 Y.Matsukawa [
		//	ZdcEmapSearchEventDragmapend    = ZDC.addListener(ZdcEmapMapObj, ZDC.MAP_DRAG_END, ZdcEmapSearchEventAction);
		//	ZdcEmapSearchEventScrollmapend  = ZDC.addListener(ZdcEmapMapObj, ZDC.MAP_SCROLL_END, ZdcEmapSearchEventAction);
		//	ZdcEmapSearchEventChangezoomend = ZDC.addListener(ZdcEmapMapObj, ZDC.MAP_CHG_ZOOM, ZdcEmapSearchEventAction);
		// del 2011/12/19 Y.Matsukawa ] ?>
<?php	// add 2011/12/19 Y.Matsukawa [ ?>
	ZdcEmapSearchEventDragmapend    = ZDC.addListener(ZdcEmapMapObj, ZDC.MAP_DRAG_END,   ZdcEmapEventDragAction);
	ZdcEmapSearchEventScrollmapend  = ZDC.addListener(ZdcEmapMapObj, ZDC.MAP_SCROLL_END, ZdcEmapEventScrollAction);
	ZdcEmapSearchEventChangezoomend = ZDC.addListener(ZdcEmapMapObj, ZDC.MAP_CHG_ZOOM,   ZdcEmapEventZoomAction);
<?php	// add 2011/12/19 Y.Matsukawa ] ?>
}

//�������٥�Ⱥ��
function ZdcEmapSearchEventDel() {
	<?php //ZdcEmapSearchEventStop();		del 2011/12/19 Y.Matsukawa ?>
	if(ZdcEmapSearchEventDragmapend)    ZDC.removeListener(ZdcEmapSearchEventDragmapend);
	if(ZdcEmapSearchEventScrollmapend)  ZDC.removeListener(ZdcEmapSearchEventScrollmapend);
	if(ZdcEmapSearchEventChangezoomend) ZDC.removeListener(ZdcEmapSearchEventChangezoomend);
	
	ZdcEmapSearchEventDragmapend = null;
	ZdcEmapSearchEventScrollmapend = null;
	ZdcEmapSearchEventChangezoomend = null;
	delete ZdcEmapSearchEventFunc;
}
//�������٥�ȳ���
function ZdcEmapSearchEventStart() {
	ZdcEmapSearchEventAdd("ZdcEmapSearchShop()");		<?php // add 2011/12/19 Y.Matsukawa ?>
	ZdcEmapSearchEventFlg = 1;
}
//�������٥�����
function ZdcEmapSearchEventStop() {
	ZdcEmapSearchEventDel();		<?php // add 2011/12/19 Y.Matsukawa ?>
	ZdcEmapSearchEventFlg = 0;
}



//-------------------------------------------------------------
//�᤭�Ф�
//  Shape�쥤�䡼������ȥ���å����������ʤ������䤳���������򤷤Ƥ���
//  ��äȴ�ñ�˼����Ǥ���褦�ˤʤä�����ľ������
//-------------------------------------------------------------
var ZdcEmapTipsInterval = 5000;//�ʰ�ʮ�Ф�ɽ���ֳ�
var ZdcEmapTipsTimerID = null;//����Ū��ʮ�Ф���ä������ޡ�ID
var ZdcEmapTipsMarker = null;//ʮ�Ф�ɽ���Υޡ��������֥�������
var ZdcEmapTipsShapeLayer = null;//ʮ�Ф��쥤�䡼
var ZdcEmapTipsShape = null;//�ʰ�ʮ�Ф��������ץ��֥�������
var ZdcEmapTipsTopMarker = null;//�Ǿ��ɽ���Ѱ���ޡ������쥤�䡼
var ZdcEmapTipsTopMarkerLayer = null;//�Ǿ��ɽ���Ѱ���ޡ��������֥�������
var ZdcEmapTipsTopShapeLayer = null;//�Ǿ��ɽ���Ѱ��ʮ�Ф��쥤�䡼<?php // add 2015/04/08 F.Yokoi ?>
//���ߥǡ����δʰ�ʮ�Ф�ɽ���᥽�å�
function ZdcEmapTipsClick(id) {
	ZdcEmapTipsHideInfoInterval();
	//ư��Ƚ��
	if(id == null) id = this.id;
	var s = ZdcEmapMapObj.getZoom();
	<?php	// del 2016/04/21 H.Osamoto if(s < < ?PHP echo $D_VIEW_ICON_MAX; ? > || s > < ?PHP echo $D_VIEW_ICON_MIN; ? >) return; ?>
	//���֥������Ȥκ���
	ZdcEmapTipsMarker = ZdcEmapMapPoiMrkId[id];
	if(!ZdcEmapMapObj || !ZdcEmapTipsMarker) return;

	var lat = ZdcEmapTipsMarker.lat;
	var lon = ZdcEmapTipsMarker.lon;
	var center = ZdcEmapMapObj.getLatLon();
	var box = ZdcEmapMapObj.getLatLonBox();
	var maplatlen = box.getMax().lat - box.getMin().lat;
	var maplonlen = box.getMax().lon - box.getMin().lon;
	
	
	//ɽ�����֤�Ĵ��
	if (center.lat > lat) {
		//�Ͽ��濴��겼¦��ɽ��������
		var offsetycenter1 = 10;
		var offsetycenter2 = 90;
		var offsety = -40;
	} else {
		//�Ͽ��濴����¦��ɽ��������
		var offsetycenter1 = -10;
		var offsetycenter2 = -120;
		var offsety = 25;
	}
	if (center.lon > lon) {
		//�Ͽ��濴��꺸¦��ɽ��������
		var offsetxcenter1 = 10;
		var offsetxcenter2 = 102;
		var offsetx = 20;
	} else {
		//�Ͽ��濴��걦¦��ɽ��������
		var offsetxcenter1 = -10;
		var offsetxcenter2 = -120;
		var offsetx = -170;
	}
	
	var message = ZdcEmapTipsMarker.message;
	var mes = message.split("(");
	var userwidgetmoverlabel =
	{
		html: '<div style="background-color: #FFFFFF; font-size:16px; text-align:center; padding-top: 3px; padding-bottom: 2px; border:1px solid;">'+mes[0]+'</div>',
		size: new ZDC.WH(150, 60),
		offset: new ZDC.Pixel(offsetx, offsety)
	};
	var latlonmover = new ZDC.LatLon(lat, lon);
	var userwidgetmover = new ZDC.UserWidget(latlonmover, userwidgetmoverlabel);
	
	
	//�᤭�Ф�ɽ��
	ZdcEmapMapObj.addWidget(userwidgetmover);
	ZDC.addListener(ZdcEmapTipsMarker, ZDC.MARKER_MOUSEOUT, function(){userwidgetmover.close();});
	//ZdcEmapAnchorDraw(id);
	userwidgetmover.open();
	ZdcEmapTipsShapeLayer = userwidgetmover;
	ZdcEmapTipsTimerID = setTimeout(ZdcEmapTipsHideInfoInterval, ZdcEmapTipsInterval);
}
//�쥤�䡼���Ĥ���
function ZdcEmapTipsClose() {
	//�������ץ쥤�䡼���Ĥ���
	if(ZdcEmapTipsShapeLayer)
	{
		ZdcEmapTipsShapeLayer.close();
	}
	if(ZdcEmapHukidasiAnchor)
	{
		ZdcEmapMapObj.removeWidget(ZdcEmapHukidasiAnchor);
	}
	ZdcEmapTipsShapeLayer = null;
	ZdcEmapTipsShape = null;
	ZdcEmapHukidasiAnchor = null;
	//�Ǿ�̥ޡ������쥤�䡼���Ĥ���
	if(ZdcEmapTipsTopMarkerLayer)
	{
		ZdcEmapTipsTopMarkerLayer.clearMarker();
		ZdcEmapMapObj.removeUserLayer(ZdcEmapTipsTopMarkerLayer);
		ZdcEmapTipsTopMarker.mouseclickmarker = null;
	}
	ZdcEmapTipsTopMarker = null;
	ZdcEmapTipsTopMarkerLayer = null;
	//�����ޡ��Υ��ꥢ
	if(ZdcEmapTipsTimerID) clearTimeout(ZdcEmapTipsTimerID);
	ZdcEmapTipsTimerID = null;
}
//����Ū�˴ʰ�ʮ�Ф���ɽ���᥽�å�
function ZdcEmapTipsHideInfoInterval() {
	if(ZdcEmapTipsTimerID) clearTimeout(ZdcEmapTipsTimerID);
	ZdcEmapTipsTimerID = null;
	ZdcEmapTipsClose();
}
//�ʰ�ʮ�Ф���ɽ���᥽�å�
function ZdcEmapTipsHideInfo() {
	if(!ZdcEmapTipsIsMouseOutMarker()) return;
	ZdcEmapTipsClose();
}
//IE��mouseout���٥�Ȥ��ޡ��������֥������ȤλҥΡ��ɤδ֤�ȯ�����Ƥ��뤫�ɤ���
function ZdcEmapTipsIsMouseOutMarker() {
	if(!document.all) return true;
	if(!ZdcEmapTipsTopMarker) return true;
	if(!window.event || window.event.type != "mouseout") return false;
	var tmp = window.event.toElement;
	while(tmp) {
		if(tmp == ZdcEmapTipsTopMarker.doc) return false;
		tmp = tmp.parentElement;
	}
	return true;
}



//-------------------------------------------------------------
//����¾
//-------------------------------------------------------------
//HTML�ɤ߹�����ajax�̿��ؿ�
<?php //function ZdcEmapHttpRequestHtml(url,func,nowaitmsg) {		mod 2012/09/07 Y.Matsukawa ?>
function ZdcEmapHttpRequestHtml(url, func, nowaitmsg, typ) {
	if(!nowaitmsg) ZdcEmapReadOn();//�ɤ߹�����ե饰on
	if(typ == undefined) typ = 1;		<?php // add 2012/09/06 Y.Matsukawa ?>
	//�̿�����
	var ZdcEmapHttpRequestObj = new ZdcEmapHttpRequest('EUC', 'EUC');
	ZdcEmapHttpRequestObj.request(url, function(html,status) {
		if(status == 3) status = 0;//�����ॢ���Ȥ�̵�� Ϣ³�ƤӽФ�����ư����ꤷ�ʤ��Τ�
		if(status == 9) status = 0;//�ƥ�ץ졼�Ȥ�̵�������б�
		if(html == null) html = "";//null�ϽФ��ʤ�
		if(status == 0) {
			func(html,status);
		} else {
			//���顼����
			func(html,status);
		}
		ZdcEmapReadOff();//�ɤ߹�����ե饰off
	//},<?PHP echo $D_AJAX_TIMEOUT; ?>);		mod 2012/09/07 Y.Matsukawa
	},<?PHP echo $D_AJAX_TIMEOUT; ?>,typ);
}
//�ܥ��󲡲�����Ƚ��
function ZdcEmapButtonNG() {
	if(ZdcEmapReadCheck()) return 1;//�ɤ߹������ư�����
	if(ZdcEmapDisableReSearch) return 1;	// add 2014/12/14 Y.Matsukawa
	return 0;
}
//�ɤ߹�����ե饰
var ZdcEmapReading = 0;//�ɤ߹����桦������ե饰
function ZdcEmapReadOn() {
	ZdcEmapReading ++;
}
function ZdcEmapReadOff() {
	if(ZdcEmapReading <= 0) return;
	ZdcEmapReading --;
}
function ZdcEmapReadCheck() {
	if(ZdcEmapReading > 0) return 1;//�ɤ߹������ư�����
	return 0;
}
//���ꤵ�줿�ء����ߥ�����������̤ˤ�äƤ���
function ZdcEmapMapFrontPoi(id){
//	if(ZdcEmapMapPoiMrkId[id] != null) {
//		var mrk = ZdcEmapMapUserLyr.getMarkerById(ZdcEmapMapPoiMrkId[id]);
//		ZdcEmapMapUserLyr.removeMarkerById(ZdcEmapMapPoiMrkId[id]);
//		ZdcEmapMapPoiMrkId[id] = ZdcEmapMapUserLyr.addMarker(mrk);
//		//���٥�����Ƥʤ���
//		if(mrk.mouseclickmarker) ZdcEvent.addListener(mrk, "mouseclickmarker", mrk.mouseclickmarker);
//		if(mrk.mouseovermarker)  ZdcEvent.addListener(mrk, "mouseovermarker" , mrk.mouseovermarker);
//		if(mrk.mouseoutmarker)   ZdcEvent.addListener(mrk, "mouseoutmarker"  , mrk.mouseoutmarker);
//	}
}

//common func
ZdcSetErrorStatus = function(retcd, st){
	var status;
	if (st == undefined){
		var errPart = retcd.charAt(4);
		var errPartStr = retcd.slice(3, 5);
		if( errPart == '9' ){
			status = 1;		//�ѥ�᡼�����顼
		}else if( retcd.substr(4,4) == '1009' ){
			status = 5;		//�����ǡ����ʤ�
		}else if ( errPart == '2' ){
			status = 6;		//ǧ�ڥ��顼
		}else if ( errPart == '6' || errPart == '7' || errPart == '8' || errPartStr == '15'){
			status = 2;		//�����С����顼
		}else{
			status = 9;		//����¾���顼
		}
	}else{
		status = st;
	}
	this.retCode  = retcd || '';
	this.type = '';
	this.status = status;
	this.recCount    = 0;
	this.hitCount = 0;
	this.rest =   false;
	this.items = [];
}

// API���٥�ȥ�����
// ��event_log.cgi��ƤӽФ���
function ZdcEmapEventLog(evt) {
	var url = "<?php echo $D_SSAPI['event_log']; ?>";
	url += "?key=<?php echo $D_SSAPI_KEY; ?>";
	url += "&event="+evt;
	url += "&opt=<?php echo $D_CID; ?>";
	// add 2012/02/20 H.osamoto [
	if ("<?PHP echo $D_LOG_FREE_PARM; ?>") {
		url += "&freeparm=<?php echo $D_LOG_FREE_PARM; ?>";
	}
	// add 2012/02/20 H.osamoto ]

	var httpReq = new ZdcEmapHttpRequest('EUC', 'EUC');

	httpReq.request(url, function(reference_text,status){
	}, 60000);
}
function ZdcEmapMapEventLogZoom() { ZdcEmapEventLog('mapapi_ChangeZoom'); }
function ZdcEmapMapEventLogLoc() { ZdcEmapEventLog('mapapi_ChangeLocation'); }

// add 2012/04/02 K.Masuda [
//-------------------------------------------------------------
// �Ͽ��濴�������ؿ�
// ������type 1 : �����ٷ���
//            2 : �ߥ��÷���
//            3 : ��ʬ�÷���
//       datum TOKYO : ����¬�Ϸ�
//             WGS84 : ����¬�Ϸ�
// �ֵѡ����ٷ��٥��֥�������
//-------------------------------------------------------------
function ZdcEmapGetMapCenter(type,datum){
	var p;
	var center = ZdcEmapMapObj.getLatLon();
	if( datum == 'WGS84' ){
		// ����¬�Ϸ�
		center = ZDC.tkyTowgs(center);
	}
	if( type == 2 ){
		// �ߥ��÷���
		msLat = ZDC.degToms(center.lat);
		msLon = ZDC.degToms(center.lon);
		p = new ZDC.LatLon(msLat,msLon);
		return p;
	} else if( type == 3 ){
		// ��ʬ�÷���
		dmsLat = ZDC.degTodms(center.lat);
		dmsLon = ZDC.degTodms(center.lon);
		p = new ZDC.LatLon(dmsLat.deg+"."+dmsLat.min+"."+dmsLat.sec,dmsLon.deg+"."+dmsLon.min+"."+dmsLon.sec);
		return p;
	} else {
		// �����ٷ���
		return center;
	}
}
// add 2012/04/02 K.Masuda ]

<?php // add 2014/10/08 Y.Matsukawa [ ?>
<?php // ���ձؤ���α����� ?>
var ZdcEmapStationCircleMode = 0;
var ZdcEmapStationCircleWidgets = new Array();
var ZdcEmapStationCircleRad = <?php echo $D_STT_CIRCLE_RAD; ?>;<?php // add 2014/10/23 Y.Matsukawa ?>
function ZdcEmapStationCircleStart() {
	ZdcEmapStationCircleMode = 1;
	ZdcEmapStationCircle();
}
function ZdcEmapStationCircleEnd() {
	ZdcEmapStationCircleRemove();
	ZdcEmapStationCircleMode = 0;
}
function ZdcEmapStationCircle() {
	if (!ZdcEmapStationCircleMode) return;
	ZdcEmapSearchEventStop();
	ZdcEmapReadOn();
	var ll = ZdcEmapMapObj.getLatLon();
	var box = ZdcEmapMapObj.getLatLonBox();
	var rad = Math.ceil(ZDC.getLatLonToLatLonDistance(box.getMax(), box.getMin()) / 2);
	if (rad > 10000) rad = 10000;
	var ival = {
		latlon: ll,
		radius: rad,
		datum: "<?PHP echo $D_DATUM; ?>",
		limit: "0,100"
	};
	ZDC.Search.getStationByLatLon(ival, function(stt, res){
		ZdcEmapStationCircleResult(stt, res);
	});
}
function ZdcEmapStationCircleResult(status, result) {
	// ���顼����
	if(status.code != "000" || status.text != "ok") {
		alert("<?PHP echo $D_MSG_ERR_JS_RESULT; ?> ekires["+status.code+","+status.text+"]");
		ZdcEmapSearchEventStart();
		ZdcEmapReadOff();
		return;
	}
	// ������
	ZdcEmapStationCircleRemove();
	var latloncheck = "";
	var cnt = 0;
	//for(i = 0; i < result.item.length; i++) {
	for(i = result.item.length - 1; i >= 0; i--) {
		var item = result.item[i];
		var ll = item.poi.latlon;
		var llstr = ll.lat+":"+ll.lon;
		if (latloncheck.indexOf(llstr) < 0) {	// Ʊ����ٷ��٤�ʣ�������褷�ʤ���
			latloncheck += llstr+",";
			ZdcEmapStationCircleWidgets[cnt] = new ZDC.Oval({
				latlon: ll,
				<?php // del 2014/10/23 Y.Matsukawa [ ?>
				//x: < ?php echo $D_STT_CIRCLE_RAD; ? >,
				//y: < ?php echo $D_STT_CIRCLE_RAD; ? >},{
				<?php // del 2014/10/23 Y.Matsukawa ] ?>
				<?php // add 2014/10/23 Y.Matsukawa [ ?>
				x: ZdcEmapStationCircleRad,
				y: ZdcEmapStationCircleRad},{
				<?php // add 2014/10/23 Y.Matsukawa ] ?>
				strokeColor: "<?php echo $D_STT_CIRCLE_INFO['strokeColor']; ?>",
				strokeWeight: <?php echo $D_STT_CIRCLE_INFO['strokeWeight']; ?>,
				fillColor: "<?php echo $D_STT_CIRCLE_INFO['fillColor']; ?>",
				fillOpacity: <?php echo $D_STT_CIRCLE_INFO['fillOpacity']; ?>,
				lineStyle: "<?php echo $D_STT_CIRCLE_INFO['lineStyle']; ?>",
				lineOpacity: <?php echo $D_STT_CIRCLE_INFO['lineOpacity']; ?>,
				propagation: true,
				circle: false
			});
			ZdcEmapMapObj.addWidget(ZdcEmapStationCircleWidgets[cnt]);
			cnt++;
		}
	}
	ZdcEmapSearchEventStart();
	ZdcEmapReadOff();
}
function ZdcEmapStationCircleRemove() {
	var cnt = ZdcEmapStationCircleWidgets.length;
	for (i = 0; i < cnt; i++) {
		ZdcEmapMapObj.removeWidget(ZdcEmapStationCircleWidgets[i]);
		ZdcEmapStationCircleWidgets[i] = null;
	}
	ZdcEmapStationCircleWidgets = new Array();
}
<?php // add 2014/10/08 Y.Matsukawa ] ?>

<?php // �ѥ󤯤���ưŪ���ɲáʺǲ����ء�		add 2015/01/28 Y.Matsukawa ?>
function ZdcEmapAddOptionalHistory(name) {
	var obj = null;
	obj = document.getElementById("history_count");
	if (!obj) return;
	var cnt = obj.value;
	var his = "";
	var idx = 0;
	for (var i = 1; i <= cnt; i++) {
		obj = document.getElementById("history_name_"+i);
		if (obj) {
			idx++;
			var nm = obj.value;
			var url = "";
			obj = document.getElementById("history_url_"+i);
			if (obj) url = obj.value;
			if (idx > 1) his += "\t\t\t&nbsp;&gt;&nbsp;\t\t";
			his += '<a href="'+url+'">'+nm+'</a>';
		}
	}
	his += "\t\t\t&nbsp;&gt;&nbsp;\t\t";
	his += name;
	obj = document.getElementById("history");
	if (!obj) return;
	obj.innerHTML = his;
}

<?php // �ʤ���߾���ѹ��Բ�		add 2015/04/23 H.Osamoto ?>
function ZdcEmapCondDisabled() {
	if (document.ZdcEmapCondForm !== undefined) {
		document.body.style.cursor = 'wait';
		document.ZdcEmapCondForm.disabled = true;
		for(i=0;i<document.ZdcEmapCondForm.elements.length;i++){
			document.ZdcEmapCondForm.elements[i].disabled = true;
		}
	}

}

<?php // �ʤ���߾���ѹ��Բ�		add 2015/04/23 H.Osamoto ?>
function ZdcEmapCondEnabled() {
	if (document.ZdcEmapCondForm !== undefined) {
		document.body.style.cursor = 'auto';
		document.ZdcEmapCondForm.disabled = false;
		for(i=0;i<document.ZdcEmapCondForm.elements.length;i++){
			document.ZdcEmapCondForm.elements[i].disabled = false;
		}
	}
}

<?php // �濴���֤�������Υ�Σ����ʾ岼�����˰��ٷ���������ֵ�		add 2015/05/01 Y.Matsukawa ?>
function ZdcEmapGetPointsByRad(latlon, rad) {
	//var lat_dist = Math.floor(Math.sqrt(rad) / (9/300000*1000));
	//var lon_dist = Math.floor(Math.sqrt(rad) / (11/450000*1000));
	var lat_dist = (300000 / (9 * 1000)) * rad;
	var lon_dist = (450000 / (11 * 1000)) * rad;
	var lat_ms = ZDC.degToms(latlon.lat);
	var lon_ms = ZDC.degToms(latlon.lon);
	var p1 = new ZDC.LatLon(ZDC.msTodeg(lat_ms + lat_dist), latlon.lon);
	var p2 = new ZDC.LatLon(ZDC.msTodeg(lat_ms - lat_dist), latlon.lon);
	var p3 = new ZDC.LatLon(latlon.lat, ZDC.msTodeg(lon_ms + lon_dist));
	var p4 = new ZDC.LatLon(latlon.lat, ZDC.msTodeg(lon_ms - lon_dist));
	return new Array(p1, p2, p3, p4);
}
