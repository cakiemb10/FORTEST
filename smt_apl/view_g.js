<?PHP
// ------------------------------------------------------------
// Google Maps�� �Ͽ�����
// 
// ��ȯ����
// 2015/10/30 N.Wada		��������
// 							�᤭�Ф��������ޥ������ɲá���infobox.js��
// 							MarkerClusterer���ɲá���markerclusterer.js��
// 							POI��������ɽ�������ɲ�
// 							�������������������˥��ץ���������ɲ�
// 							�Ͽޥ���ȥ����ɽ�������ɲ�
// 							Ź�޸������ϤΥ��٥�Ȥ��ڤ��ؤ�����硢���ɽ�����ˣ��󸡺����ʤ��褦�������ɲ�
// 							Ź�޸�����̸��Ǥ�դδؿ���¹�
// 							��������Υ���å�����Ǥ�դδؿ���¹�
// 							�ڥɥ���iD���Ͽޥ������������js�ǹԤ��Τ�̵����
// 							�Ƹ������˽���ʹ�����Ȥ�ʤ��褦�ˤ��뵡ǽ���ɲ�
// 2015/11/26 N.Wada		��󸡺����˽��ɽ���̼ܤ��Ͽ��ϰϤǤθ�����������ե饰
// 							�ޡ��������饹�����ǥ��饹����󥰤����ϰϤ�������ɲ�
// 2016/03/01 N.Wada		����������Ͽ�ؿ���Ǥϥ���������Ͽޤˤ�ɽ�����������ؿ��ƤӽФ�¦��ɽ��������
// 2016/03/02 N.Wada		���Զ����ϿޤΥ������륳��ȥ����ɽ���ե饰������
// 							Google�Ͽޤǥʥӥ�������󡦥ѥ󥳥�ȥ��뤬̵���ˤʤä�������
// 							�Ǵ�����������̤ε��������ޤ��ϰϤ˰�ư�ν������Ŭ��
// 2016/03/03 N.Wada		�������֤˥ޡ�����ɽ��
// 2016/03/05 N.Wada		�Ǵ󸡺���̤�0��ξ��Ƹ����Ǽ������������굡ǽ�ɲ�
// 2016/03/06 N.Wada		Ź�޸����Ǿ������ɲ�
// 2016/03/07 N.Wada		Ź�޾ܺ��Ͽ��ɲ�
// 2016/03/22 N.Wada		���������������������������֤�ؤ��ѥ������ɲ�
// 2016/03/23 N.Wada		���������Ѥ��ȼ�UI�ɲ�
// 2016/04/14 N.Wada		Google Maps�Ǥˤϥ��饹�����������󤬤���Τǵ�����������Ťʤ���ե饰�ν�������
// 2016/04/24 N.Wada		�Ǵ����̤Υե�����ɽ�������Ͽޤ���ư���Ƥ⡢�Ƹ������ʤ��褦�������ɲ�
// 							�Ǵ�����������̸�ϥե���������
// 2016/12/19 N.Wada		Google Maps��ɸ�ॺ����ܥ���ΰ����ɲ�
// 2017/01/19 N.Wada		����¬�Ϸ��ݻ�
// 2017/01/20 N.Wada		�����ϥ롼��õ��������¬�ϷϤǼ¹�
// 2017/01/21 N.Wada		�ʥӥ��������ID�ˤ��ʣ��롼���ɲ�
// 2017/02/14 Y.Matsukawa	���Զ�罤��������¬�Ϸϥ�������ѻ��ν̼�Ĵ������
// 2017/04/27 Y.Matsukawa	Google POI�ʤ�Ź��ɽ��
// 2017/04/27 Y.Matsukawa	POI�������󥯥�å��֥�������ˡ���ѹ�
// 2017/06/10 N.Wada		���ɽ���̼ܤ�����Ǥ���褦�ѹ�
// 2017/06/10 N.Wada		�Ǵ����̤�0��ξ����Ͽޤ˥�å�������ɽ��
// 2017/06/22 N.Wada		�Ǵ������ν���̼ܤȺƸ����̼ܤˤ�����ʳ�������ǽ�ɲ�
// 2017/09/05 N.Wada		2���ܤθ�������0���å��������Ф���б�
// 2017/09/11 Y.Matsukawa	Google POI�ʤ�Ź�˾ܺ٥��ƥ��꡼����
// 2018/05/17 N.Wada		��Լԥ롼�ȸ�����ư�֥롼�ȡʰ���ƻͥ��˸��������ؤ��뤿�ᡢ�ѥ�᡼���˰���ƻ�ե饰�ɲ�
// 2018/06/18 N.Wada		�Х��롼�Ȥλ����������֤�ľ���ǤϤʤ������δ֤γƥХ�����ͳ������
// ------------------------------------------------------------
require_once('/home/emap/src/smt/inc/define.inc');
require_once('/home/emap/src/smt/inc/act_get_freeparm.inc');
// ��������������
include("/home/emap/src/smt/inc/define_get_icon.inc");
?>
// ¬�Ϸ��Ѵ�
function ZdcEmapTky2Wgs(lat, lon) {
	return ZDC.tkyTowgs(new ZDC.LatLon(lat, lon));
}
function ZdcEmapWgs2Tky(lat, lon) {
	return ZDC.wgsTotky(new ZDC.LatLon(lat, lon));
}
<?php // add 2016/03/23 N.Wada ?>
//������
var ZdcEmapMyLocation;
<?php //function ZdcEmapSetMyLocation(lat_wgs, lon_wgs) {		mod 2017/01/20 N.Wada ?>
function ZdcEmapSetMyLocation(lat_wgs, lon_wgs, wgs) {
	<?php //ZdcEmapMyLocation = ZdcEmapWgs2Tky(lat_wgs, lon_wgs);		del 2017/01/20 N.Wada ?>
	<?php // add 2017/01/20 N.Wada [ ?>
	if (wgs) {
		ZdcEmapMyLocation = new ZDC.LatLon(lat_wgs, lon_wgs);
	} else {
		ZdcEmapMyLocation = ZdcEmapWgs2Tky(lat_wgs, lon_wgs);
	}
	<?php // add 2017/01/20 N.Wada ] ?>
}
// �Ͽ�
var ZdcEmapMapObj = null;
// �Ͽ�;���ΰ�
var ZdcEmapAnyDispPx = 0;
var ZdcEmapAnyDispPy = 0;
// �ޡ�����
var ZdcEmapListMarkers = [];
var ZdcEmapMrkClickFunc = null;		<?php // add 2015/10/30 N.Wada ?>
// �ޡ��������饹����
var ZdcEmapMapShopMrkClstObj = null;	<?php // add 2015/10/30 N.Wada ?>
var ZdcEmapMrkClstClickFunc = null;		<?php // add 2015/10/30 N.Wada ?>
//var ZdcEmapListPointMarkers = [];
//var ZdcEmapScaleType = "<?php echo ($D_SCALE_TYPE?'1':'0'); ?>";
var ZdcEmapWindowWidth = 0;
var ZdcEmapWindowHeight = 0;
//
// ������λ���ư���ؿ�
var ZdcEmapResultAfterFunc = null;	<?php // 2015/10/30 N.Wada ?>
// �᤭�Ф�
var ZdcEmapMsg = null;
// �����������
var ZdcEmapIconImg = new Array();
var ZdcEmapIconW = new Array();
var ZdcEmapIconH = new Array();
var ZdcEmapIconOffsetX = new Array();
var ZdcEmapIconOffsetY = new Array();
<?PHP
foreach( $D_ICON as $key=>$val) {
	printf("ZdcEmapIconImg['%s'] = '%s';",$key,$val["IMG"]);
	printf("ZdcEmapIconW['%s'] = %d;",$key,$val["W"]);
	printf("ZdcEmapIconH['%s'] = %d;",$key,$val["H"]);
	// ������������Υ��ե��åȤ��������ˤ���	mod 2015/10/30 N.Wada
	//printf("ZdcEmapIconOffsetX['%s'] = %d;",$key,ceil($val["W"]/2)*-1);
	//printf("ZdcEmapIconOffsetY['%s'] = %d;",$key,ceil($val["H"]/2)*-1);
	printf("ZdcEmapIconOffsetX['%s'] = %d;",$key,ceil($val["W"]/2));
	printf("ZdcEmapIconOffsetY['%s'] = %d;",$key,ceil($val["H"]/2));
}
?>

var ZdcEmapSearchFirst = null;//���ַ����κǽ�θ������ݤ�
var ZdcEmapSearchRetry = null;//�Ͽ��ϰϤǸ���������̤�0����ä����ˡ�Ⱦ�»���ǺƸ���
var ZdcEmapSearchRetryVCnt = 0;//ʬ���Ͽ޺Ƹ����塢�ǽ��n�郎���꤭��̼ܤ��ѹ�����
var ZdcEmapSearchCond = null; //�ʤ���߾��
var ZdcEmapSearchPoint = null;//�����������֤��ݻ�
var ZdcEmapSearchScale = null;//���������̼ܤ��ݻ�
var ZdcEmapSearchClickFlg = 0;//�Ǵ󸡺���˹����Ͽް�ư�������Υ���եꥯ���ɻߥե饰
var ZdcEmapLastOrientation = null;//������ɥ��Ĳ�
var ZdcEmapSearchFirstInitLvFlg = null;	<?php // add 2015/11/26 N.Wada ?>

//-------------------------------------------------------------
//��ư�����Υ��٥�ȴ���
//-------------------------------------------------------------
var ZdcEmapSearchEventFlg  = 0;
var ZdcEmapSearchEventFunc = null;
<?php // mod 2015/10/30 N.Wada
//var ZdcEmapSearchEventDragmapend;
//var ZdcEmapSearchEventScrollmapend;
//var ZdcEmapSearchEventChangezoomend;
?>
var ZdcEmapSearchEventIdle;
var ZdcEmapBoundsChanged = null;
var ZdcEmapSearchShopCancel = null;	<?php // 2015/10/30 N.Wada ?>
var ZdcEmapSearchEventCenterChangeAvailable = 1;	<?php // 2016/04/24 N.Wada ?>

<?php //function ZdcEmapInit(init_lat, init_lon, init_lv, nmapflg){		mod 2017/01/19 N.Wada ?>
function ZdcEmapInit(init_lat, init_lon, init_lv, nmapflg, wgs, fmt){
	var i, len;	<?php // add 2016/03/22 N.Wada ?>

	ZdcEmapWindowWidth  = window.innerWidth;
	ZdcEmapWindowHeight = window.innerHeight;
	//ZdcEmapLastOrientation = window.orientation;		<?php // add 2012/03/01 Y.Matsukawa ?>
	ZdcEmapLastOrientation = 999;		<?php // ����onresize��ͭ���ˤ����Android�Զ���б���	add 2012/03/22 Y.Matsukawa ?>
	
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	<?php
	// del 2017/01/19 N.Wada [
	//init_lat = ZDC.msTodeg(init_lat);
	//init_lon = ZDC.msTodeg(init_lon);
	// del 2017/01/19 N.Wada ]
	?>
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
	<?php // add 2015/10/30 N.Wada [ ?>
	<?php
	// del 2017/01/19 N.Wada [
	//var latlon = ZdcEmapTky2Wgs(init_lat, init_lon);
	//var latlng = new google.maps.LatLng(latlon.lat, latlon.lon);
	// del 2017/01/19 N.Wada ]
	?>
	<?php // add 2015/10/30 N.Wada ] ?>
	<?php // add 2017/01/19 N.Wada [ ?>
	if (fmt != 'deg') {
		init_lat = ZDC.msTodeg(init_lat);
		init_lon = ZDC.msTodeg(init_lon);
	}
	if (wgs) {
		var latlng = new google.maps.LatLng(init_lat, init_lon);
	} else {
		var latlon = ZdcEmapTky2Wgs(init_lat, init_lon);
		var latlng = new google.maps.LatLng(latlon.lat, latlon.lon);
	}
	<?php // add 2017/01/19 N.Wada ] ?>

	// add 2011/08/10 H.osamoto [
	if (nmapflg && <?PHP echo $D_NMAP_ANY_DISP_PX; ?> > 0) {
		ZdcEmapWindowHeight = ZdcEmapWindowHeight - <?PHP echo $D_NMAP_ANY_DISP_PX; ?>;
		ZdcEmapAnyDispPx = <?PHP echo $D_NMAP_ANY_DISP_PX; ?>;
	}
	if (!nmapflg && <?PHP echo $D_MAP_ANY_DISP_PX; ?> > 0) {
		ZdcEmapWindowHeight = ZdcEmapWindowHeight - <?PHP echo $D_MAP_ANY_DISP_PX; ?>;
		ZdcEmapAnyDispPx = <?PHP echo $D_MAP_ANY_DISP_PX; ?>;
	}
	// add 2011/08/10 H.osamoto ]

	// add 2011/12/26 K.Masuda [
	if (nmapflg && <?PHP echo $D_NMAP_ANY_DISP_PY; ?> > 0) {
		ZdcEmapWindowWidth = ZdcEmapWindowWidth - <?PHP echo $D_NMAP_ANY_DISP_PY; ?>;
		ZdcEmapAnyDispPy = <?PHP echo $D_NMAP_ANY_DISP_PY; ?>;
	}
	if (!nmapflg && <?PHP echo $D_MAP_ANY_DISP_PY; ?> > 0) {
		ZdcEmapWindowWidth = ZdcEmapWindowWidth - <?PHP echo $D_MAP_ANY_DISP_PY; ?>;
		ZdcEmapAnyDispPy = <?PHP echo $D_MAP_ANY_DISP_PY; ?>;
	}
	// add 2011/12/26 K.Masuda ]

	<?php // �Ͽޥ�����������̵����	add 2015/10/30 N.Wada ?>
	<?php if (isset($D_GOOGLEMAPS_WIN_SIZE_SET_DISABLE) && $D_GOOGLEMAPS_WIN_SIZE_SET_DISABLE) { ?>
	<?php } else { ?>
	document.getElementById("ZdcEmapMap").setAttribute( 'style',
		'postion:absolute; top:0px; left:0px; width:' + ZdcEmapWindowWidth + 'px; height:' + ZdcEmapWindowHeight + 'px; z-index:0;' );
	<?php } ?>

	if (!init_lv || init_lv == 0) {
		init_lv = <?PHP echo $D_INIT_LVL; ?>;
	}
	init_lv = init_lv - 1;
	var opts = {
	<?php //mod 2015/10/30 N.Wada
		//zoom: init_lv,
		//center: latlng,
		//mapTypeId: google.maps.MapTypeId.ROADMAP,
		//maxZoom: 22,
		//minZoom: 5,
		//mapTypeControl: true,
		//navigationControl: true,
		//scaleControl: true,
		//streetViewControl: false
	?>
		 zoom: init_lv
		,center: latlng
		,mapTypeId: google.maps.MapTypeId.ROADMAP
		,maxZoom: 22
		,minZoom: 5
	<?php // ���������Ѥ��ȼ�UI��Ȥ�����google�Ͽ�ɸ��UI���ԲĤ�	add 2016/03/23 N.Wada ?>
	<?php if (isset($D_GOOGLEMAPS_EMAP_ORIGINAL_UI) && $D_GOOGLEMAPS_EMAP_ORIGINAL_UI) { ?>
		,disableDefaultUI: true
	<?php } else { ?>
		,mapTypeControl: <?php if (isset($D_GOOGLEMAPS_MAP_TYPE_CONTROL_INVISIBLE) && $D_GOOGLEMAPS_MAP_TYPE_CONTROL_INVISIBLE) { ?>false<?php } else { ?>true<?php } ?>
		<?php /* ,navigationControl: <?php if (isset($D_GOOGLEMAPS_NAVIGATION_CONTROL_INVISIBLE) && $D_GOOGLEMAPS_NAVIGATION_CONTROL_INVISIBLE) { ?>false<?php } else { ?>true<?php } ?> del 2016/03/02 N.Wada */?>
		<?php /* ,scaleControl: <?php if (isset($D_GOOGLEMAPS_NAVIGATION_CONTROL_INVISIBLE) && $D_GOOGLEMAPS_NAVIGATION_CONTROL_INVISIBLE) { ?>false<?php } else { ?>true<?php } ?> mod 2016/03/02 N.Wada */?>
		,scaleControl: <?php if (isset($D_GOOGLEMAPS_SCALE_CONTROL_INVISIBLE) && $D_GOOGLEMAPS_SCALE_CONTROL_INVISIBLE) { ?>false<?php } else { ?>true<?php } ?>
		,zoomControl: <?php if (isset($D_GOOGLEMAPS_ZOOM_CONTROL_INVISIBLE) && $D_GOOGLEMAPS_ZOOM_CONTROL_INVISIBLE) { ?>false<?php } else { ?>true<?php } ?>
		<?php // add 2016/12/19 N.Wada [
		if ($D_GOOGLEMAPS_ZOOM_CONTROL_POSITION) {
		?>
		,zoomControlOptions: { position: google.maps.ControlPosition.<?php echo $D_GOOGLEMAPS_ZOOM_CONTROL_POSITION; ?> }
		<?php
		}
		// add 2016/12/19 N.Wada ] ?>
		<?php /* ,panControl: <?php if (isset($D_GOOGLEMAPS_PAN_CONTROL_INVISIBLE) && $D_GOOGLEMAPS_PAN_CONTROL_INVISIBLE) { ?>false<?php } else { ?>true<?php } ?> del 2016/03/02 N.Wada */?>
		,streetViewControl: false
	<?php } ?>
	};
	ZdcEmapMapObj = new google.maps.Map(document.getElementById("ZdcEmapMap"), opts);

	<?php // ���������Ѥ��ȼ�UI	add 2016/03/23 N.Wada ?>
	<?php if (isset($D_GOOGLEMAPS_EMAP_ORIGINAL_UI) && $D_GOOGLEMAPS_EMAP_ORIGINAL_UI) { ?>
	ZdcEmapOriginalUI(init_lat, init_lon);
	<?php } ?>

	<?php // add 2015/10/30 N.Wada ?>
	<?php if (isset($D_GOOGLEMAPS_POI_INVISIBLE) && $D_GOOGLEMAPS_POI_INVISIBLE) { ?>
	// POI����������ɽ��
	var mapStylePoiInvisible = new google.maps.StyledMapType([
		{
			featureType: "poi",
			elementType: "labels",
			stylers: [
				{ visibility: "off" }
			]
		}
	], { name: "Poi Invisible" });
	ZdcEmapMapObj.mapTypes.set("poi_invisible", mapStylePoiInvisible);
	ZdcEmapMapObj.setMapTypeId("poi_invisible");
	<?php } elseif (isset($D_GOOGLEMAPS_POI_CLICK_INFOWINDOW_DISABLE) && $D_GOOGLEMAPS_POI_CLICK_INFOWINDOW_DISABLE) { ?>
	<?php // add 2017/04/27 Y.Matsukawa [ ?>
	<?php if ($D_GOOGLEMAPS_POI_BUSINESS) { ?>
	var mapStylePoiBusiness = new google.maps.StyledMapType([
		{
			 featureType: "poi"
			,elementType: "labels"
			,stylers: [
				{ visibility: "on" }
			]
		}
	], { name: "Poi Business" });
	ZdcEmapMapObj.mapTypes.set("poi_business", mapStylePoiBusiness);
	ZdcEmapMapObj.setMapTypeId("poi_business");
	<?php } ?>
	<?php // add 2017/04/27 Y.Matsukawa ] ?>
	// POI��������᤭�Ф�̵��
	<?php
	// del 2017/04/27 Y.Matsukawa [
	//	var set = google.maps.InfoWindow.prototype.set;
	//	google.maps.InfoWindow.prototype.set = function(key, val) {
	//		if (key === "map") {
	//			if (! this.get("noSuppress")) {
	//				return;
	//			}
	//		}
	//		set.apply(this, arguments);
	//	}
	// del 2017/04/27 Y.Matsukawa ]
	?>
	<?php // add 2017/09/11 Y.Matsukawa [ ?>
	<?php // POI���������BUSINESS�ʳ���ɽ���� ?>
	<?php	if ($D_GOOGLEMAPS_POI_EXCLUDE_BUSINESS) { ?>
	var mapStylePoiBusiness = new google.maps.StyledMapType([
		{
			 featureType: "poi"
			,elementType: "labels"
			,stylers: [
				{ visibility: "on" }
			]
		},
		{
			 featureType: "poi.business"
			,stylers: [
				{ visibility: "off" }
			]
		}
	], { name: "Poi Business" });
	ZdcEmapMapObj.mapTypes.set("poi_business", mapStylePoiBusiness);
	ZdcEmapMapObj.setMapTypeId("poi_business");
	<?php	} ?>
	<?php // POI���������BUSINESS��ɽ���ʾܺ٥��ƥ��꡼����� ?>
	<?php	if ($D_GOOGLEMAPS_POI_BUSINESS_DETAILS) { ?>
	var mapStylePoiBusiness = new google.maps.StyledMapType([
	<?php		foreach ($D_GOOGLEMAPS_POI_BUSINESS_DETAILS as $p => $poitype) { ?>
	<?php			if ($p > 0) { ?>,<?php } ?>
		{
			 featureType: "<?php echo $poitype ?>"
			,elementType: "labels"
			,stylers: [{ visibility: "on" }]
		}
	<?php		} ?>
	], { name: "Poi Business" });
	ZdcEmapMapObj.mapTypes.set("poi_business", mapStylePoiBusiness);
	ZdcEmapMapObj.setMapTypeId("poi_business");
	<?php	} ?>
	<?php // add 2017/09/11 Y.Matsukawa ] ?>
	ZdcEmapMapObj.setClickableIcons(false);	<?php // add 2017/04/27 Y.Matsukawa ?>
	<?php } ?>

	<?php /* del 2015/10/30 N.Wada [ ?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	//// ��������С�ɽ��
	//ZdcEmapMapObj.addWidget(new ZDC.ScaleBar({bottom: 3, left: 10}));
	//// �ۡ�����֥��å�
	//ZdcEmapMapObj.setHome();
	//// �̼ܥꥹ�ȥܥå���
	//ZdcEmapMapScaleToLvlSelect();
	//// �̼ܡܡݥܥ���
	//if(ZdcEmapScaleType == '1')
	//	ZdcEmapLvlScaleBtn();
	//// �Ͽ޾奯��å��ʥɥ�å��Ǥʤ���
	//ZDC.addListener(ZdcEmapMapObj, ZDC.MAP_MOUSEDOWN, function(){
	//	curentMapLatLon = ZdcEmapMapObj.getLatLon();
	//});
	//ZDC.addListener(ZdcEmapMapObj, ZDC.MAP_MOUSEUP, function(){
	//	// �ե��������Ĥ���
	//	if(ZdcEmapMapObj.getLatLon().lat == curentMapLatLon.lat &&
	//		ZdcEmapMapObj.getLatLon().lon == curentMapLatLon.lon){
	//		ZdcEmapShopMsgClose();
	//	}
	//});
	//// �ɥ�å�
	//ZDC.addListener(ZdcEmapMapObj, ZDC.MAP_DRAG_END, function(){
	//	// �ݶ������
	//	ZdcEmapMapEventLogLoc();
	//});
	//// �̼��ѹ�
	//ZDC.addListener(ZdcEmapMapObj, ZDC.MAP_CHG_ZOOM, function(){
	//	// �ݶ������
	//	ZdcEmapMapEventLogZoom();
	//	// �̼ܥꥹ�ȥܥå�������
	//	ZdcEmapMapScaleToLvlSelect();
	//	// �̼ܡܡݥܥ��󹹿�
	//	if(ZdcEmapScaleType == '1')
	//		ZdcEmapLvlScaleBtn();
	//});
	// �ե�����ɽ���ѥ��֥�������
	//ZdcEmapMsg = new ZDC.MsgInfo(ZdcEmapMapObj.getLatLon(), {
	//	'closeBtn':true 
	//});
	//ZdcEmapMapObj.addWidget(ZdcEmapMsg);
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
	*/ ?>
	<?php // add 2015/10/30 N.Wada [ ?>
	// �ե�����ɽ���ѥ��֥�������
	ZdcEmapMsg = new google.maps.InfoWindow();
	<?php if (isset($D_GOOGLEMAPS_POI_CLICK_INFOWINDOW_DISABLE) && $D_GOOGLEMAPS_POI_CLICK_INFOWINDOW_DISABLE) { ?>
	ZdcEmapMsg.set("noSuppress", true);
	<?php } ?>
	<?php if (isset($D_GOOGLEMAPS_MSG_CUSTOM) && $D_GOOGLEMAPS_MSG_CUSTOM) { ?>
	// �᤭�Ф��������ޥ���
	ZdcEmapMsg = new InfoBox();
		<?php if (isset($D_GOOGLEMAPS_MSG_CUSTOM_OPTION) && $D_GOOGLEMAPS_MSG_CUSTOM_OPTION) { ?>
		ZdcEmapMsg.setOptions(<?php echo $D_GOOGLEMAPS_MSG_CUSTOM_OPTION ?>);
		<?php } ?>
	<?php } ?>
	<?php // add 2015/10/30 N.Wada ] ?>

	<?php // add 2015/10/30 N.Wada ?>
	// �ޡ��������饹����
	<?php if (isset($D_GOOGLEMAPS_MARKER_CLUSTERER) && $D_GOOGLEMAPS_MARKER_CLUSTERER) { ?>
	var options_markerclusterer = {};
		<?php // add 2015/11/26 N.Wada [ ?>
		<?php if (isset($D_GOOGLEMAPS_MARKER_CLUSTERER_GLID_SIZE) && $D_GOOGLEMAPS_MARKER_CLUSTERER_GLID_SIZE) { ?>
	options_markerclusterer.gridSize = <?php echo $D_GOOGLEMAPS_MARKER_CLUSTERER_GLID_SIZE; ?>;
		<?php } ?>
		<?php // add 2015/11/26 N.Wada ] ?>
		<?php if (isset($D_GOOGLEMAPS_MARKER_CLUSTERER_CLICK_ZOOM_FALSE) && $D_GOOGLEMAPS_MARKER_CLUSTERER_CLICK_ZOOM_FALSE) { ?>
	options_markerclusterer.zoomOnClick = false;
		<?php } ?>
		<?php if (isset($D_GOOGLEMAPS_MARKER_CLUSTERER_STYLES) && $D_GOOGLEMAPS_MARKER_CLUSTERER_STYLES) { ?>
	var clusterStyles = [<?php echo $D_GOOGLEMAPS_MARKER_CLUSTERER_STYLES; ?>];
			<?php // add 2016/03/22 N.Wada [ ?>
			<?php if (isset($D_ICON_ANCHOR_CENTER_BOTTOM) && $D_ICON_ANCHOR_CENTER_BOTTOM) { // ��������������������������֤ʤ饯�饹������������⤽��˹�碌�� ?>
	for (i=0, len=clusterStyles.length; i<len; i++) {
		clusterStyles[i].anchorIcon = [clusterStyles[i].height, Math.ceil(clusterStyles[i].width / 2)];
	}
			<?php } ?>
			<?php // add 2016/03/22 N.Wada [ ?>
	options_markerclusterer.styles = clusterStyles;
		<?php } ?>
	ZdcEmapMapShopMrkClstObj = new MarkerClusterer(ZdcEmapMapObj, [], options_markerclusterer);
	<?php } ?>
}

<?php // add 2016/03/07 N.Wada ?>
<?php //function ZdcEmapShopMapInit(kid,lat,lon,icnno,nflg,lvl,mode) {		mod 2017/01/19 N.Wada ?>
function ZdcEmapShopMapInit(kid, lat, lon, icnno, nflg, lvl, mode, wgs) {
	var mrk,tmp;
	if (lvl && lvl != 0) {
		//lvl = EncRealZoom(lvl);
		ZdcEmapMapObj.setZoom(lvl - 1);
	} else if(<?PHP echo $D_INIT_LVL_DETAIL; ?> > 0) {
		//lvl = EncRealZoom(<?PHP echo $D_INIT_LVL_DETAIL; ?>);
		ZdcEmapMapObj.setZoom(lvl - 1);
	}
	//Ź�ޥ��������ɽ������
	if (ZdcEmapIconImg[icnno] == null) icnno = "@TP";		<?php // add 2012/11/15 Y.Matsukawa ?>
	if (mode == "nomsgbox") {
		mrk = ZdcEmapMakeMrk(0,
							lat,
							lon,
							ZdcEmapIconW[icnno],
							ZdcEmapIconH[icnno],
							ZdcEmapIconW['@NEW'],
							ZdcEmapIconH['@NEW'],
						<?php if (isset($D_ICON_ANCHOR_CENTER_BOTTOM) && $D_ICON_ANCHOR_CENTER_BOTTOM) { // ���������������������������	add 2016/03/22 N.Wada ?>
							Math.ceil(ZdcEmapIconW[icnno]/2),
							ZdcEmapIconH[icnno],
							ZdcEmapIconW[icnno]-ZdcEmapIconW['@NEW'],
							ZdcEmapIconH[icnno],
						<?php } else { // �������������濴���������� ?>
							ZdcEmapIconOffsetX[icnno],
							ZdcEmapIconOffsetY[icnno],
							ZdcEmapIconW[icnno]-ZdcEmapIconW['@NEW'],
							ZdcEmapIconH[icnno],
						<?php } ?>
							<?PHP echo $D_ICON_MSGOFFSETX; ?>,
							<?PHP echo $D_ICON_MSGOFFSETY; ?>,
							ZdcEmapIconImg[icnno],
							ZdcEmapIconImg["@NEW"],
							kid,
							icnno,
							nflg,
							null
							,null		<?php // add 2017/01/19 N.Wada ?>
							,wgs		<?php // add 2017/01/19 N.Wada ?>
							);
	} else {
		mrk = ZdcEmapMakeMrk(0,
							lat,
							lon,
							ZdcEmapIconW[icnno],
							ZdcEmapIconH[icnno],
							ZdcEmapIconW['@NEW'],
							ZdcEmapIconH['@NEW'],
						<?php if (isset($D_ICON_ANCHOR_CENTER_BOTTOM) && $D_ICON_ANCHOR_CENTER_BOTTOM) { // ���������������������������	add 2016/03/22 N.Wada ?>
							Math.ceil(ZdcEmapIconW[icnno]/2),
							ZdcEmapIconH[icnno],
							ZdcEmapIconW[icnno]-ZdcEmapIconW['@NEW'],
							ZdcEmapIconH[icnno],
						<?php } else { // �������������濴���������� ?>
							ZdcEmapIconOffsetX[icnno],
							ZdcEmapIconOffsetY[icnno],
							ZdcEmapIconW[icnno]-ZdcEmapIconW['@NEW'],
							ZdcEmapIconH[icnno],
						<?php } ?>
							<?PHP echo $D_ICON_MSGOFFSETX; ?>,
							<?PHP echo $D_ICON_MSGOFFSETY; ?>,
							ZdcEmapIconImg[icnno],
							ZdcEmapIconImg["@NEW"],
							kid,
							icnno,
							nflg,
							function() { ZdcEmapShopMsg(0, 1, 'detail'); }
							,null		<?php // add 2017/01/19 N.Wada ?>
							,wgs		<?php // add 2017/01/19 N.Wada ?>
							);
	}
	ZdcEmapListMarkers[0] = mrk;
	<?php /* Google Maps JavaScript API V3�ν񼰤��ѹ�
	//ZdcEmapMapObj.addWidget(mrk.marker);
	*/ ?>
	mrk.marker.setZIndex(100);
	mrk.marker.setMap(ZdcEmapMapObj);

	<?php /* Google Maps JavaScript API V3�ν񼰤��ѹ�
	//if(mrk.tooltip != null)
	//	ZdcEmapMapObj.addWidget(mrk.tooltip);
	*/ ?>
	if(mrk.tooltip != null) mrk.tooltip.setMap(ZdcEmapMapObj);

	if (mode == '') {		<?php // add 2011/07/13 Y.Matsukawa ?>
		ZdcEmapShopMsg(0, 1, 'detail');
	}
}

//����������Ͽ(API2.0��)
function ZdcEmapMakeMrk(id,
						lat,
						lon,
						sizew,
						sizeh,
						shadowsizew,
						shadowsizeh,
						offsetx,
						offsety,
						shdoffsetx,
						shdoffsety,
						msgoffsetx,
						msgoffsety,
						image,
						shadowimage,
						data1,
						data2,
						nflg,
						mouseclickmarker
						, lvl
						,wgs		<?php // add 2017/01/19 N.Wada ?>
						) {
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	<?php
	// del 2017/01/19 N.Wada [
	//lat = ZDC.msTodeg(lat);
	//lon = ZDC.msTodeg(lon);
	//var latlon_wgs = ZdcEmapTky2Wgs(lat, lon);
	//var latlng = new google.maps.LatLng(latlon_wgs.lat, latlon_wgs.lon);
	// del 2017/01/19 N.Wada [
	?>
	<?php // add 2017/01/19 N.Wada [ ?>
	lat = ZDC.msTodeg(lat);
	lon = ZDC.msTodeg(lon);
	if (!wgs) {
		var latlon_wgs = ZdcEmapTky2Wgs(lat, lon);
		var latlng = new google.maps.LatLng(latlon_wgs.lat, latlon_wgs.lon);
	} else {
		var latlng = new google.maps.LatLng(lat, lon);
	}
	<?php // add 2017/01/19 N.Wada ] ?>
	if(image.substr(image.length - 4, 4) != '.gif'){
		var ts = new Date().getTime();
		image += image.indexOf('?') < 0 ? '?' : '&' + 'dummy=' + ts + '.gif';
	}
	<?php // mod 2015/10/30 N.Wada
	//var latlon = new ZDC.LatLon(lat, lon);
	//var marker = new ZDC.Marker(latlon, {
	//	custom:{
	//		base:{
	//			src:image
	//		}
	//	},
	//	offset: ZDC.Pixel(offsetx, offsety)
	//});
	?>
	var marker = new google.maps.Marker({
		<?php //map : ZdcEmapMapObj,	del 2016/03/01 N.Wada ?>
		<?php if (isset($D_GOOGLEMAPS_ICON_CUSTOM) && $D_GOOGLEMAPS_ICON_CUSTOM) { ?>
		icon : new google.maps.MarkerImage(
			image,
			new google.maps.Size(sizew, sizeh),
			new google.maps.Point(0, 0),
			new google.maps.Point(offsetx, offsety)
		),
		optimized : false,	<?php // ���˥᡼�����GIF��ͭ���� ?>
		<?php } ?>
		position : latlng
	});
	marker.data = {id: id};
	if(typeof mouseclickmarker == 'function')
		<?php // mod 2015/10/30 N.Wada
		//ZDC.addListener(marker, ZDC.MARKER_MOUSEUP, mouseclickmarker);
		?>
		google.maps.event.addListener(marker, "click", mouseclickmarker);
	var tooltip = null;
	if(nflg == 1){
		<?php // mod 2015/10/30 N.Wada [ ?>
		//tooltip = new ZDC.Marker(latlon, {
		//	custom:{
		//		base:{
		//			src:ZdcEmapIconImg['@NEW']
		//		}
		//	},
		//	offset: ZDC.Pixel(
		//		<?php echo $D_TOOLTIP_OFFSET_X; ?> - sizew / 2,
		//		<?php echo $D_TOOLTIP_OFFSET_Y; ?> + sizeh / 2
		//	)
		//});
		var tooltip = new google.maps.Marker({
			<?php //map : ZdcEmapMapObj,	del 2016/03/01 N.Wada ?>
			icon : new google.maps.MarkerImage(
				shadowimage,
				new google.maps.Size(shadowsizew, shadowsizeh),
				new google.maps.Point(0, 0),
				new google.maps.Point(shdoffsetx, shdoffsety)
			),
			optimized : false,	<?php // ���˥᡼�����GIF��ͭ���� ?>
			position : latlng
		});
		<?php // mod 2015/10/30 N.Wada ] ?>
		tooltip.data = {id: id};
		if(typeof mouseclickmarker == 'function')
			<?php // mod 2015/10/30 N.Wada
			//ZDC.addListener(tooltip, ZDC.MARKER_MOUSEUP, mouseclickmarker);
			?>
			google.maps.event.addListener(tooltip, "click", mouseclickmarker);
	}
	return {
		'id': id,
		'marker': marker,
		'tooltip': tooltip,
		'data1': data1,
		'data2': data2,
		'w': sizew,
		'h': sizeh
	}
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
}

//�ե�����ɽ��
//function ZdcEmapShopMsg(id, link, maptype, overlap) {	mod 2016/04/14 N.Wada
function ZdcEmapShopMsg(id, link, maptype) {
	<?php // del 2016/04/14 N.Wada [ ?>
	<?php /* ?>
	<?php // add 2014/08/18 AnPham [?>
	// set default value for overlap parameter
	overlap = typeof overlap !== 'undefined' ? overlap : '';
	<?php // add 2014/08/18 AnPham ]?>
	<?php */ ?>
	<?php // del 2016/04/14 N.Wada ] ?>
	ZdcEmapReadOn();
	ZdcEmapShopMsgClose(); 
	//�ǥ�����
	var obj = ZdcEmapListMarkers[id];		<?php // add 2015/06/08 Y.Matsukawa ?>
	//�ե�������ɽ��������
	<?php // del 2016/04/14 N.Wada [ ?>
	<?php /* ?>
	<?php // mod 2014/08/18 AnPham [?>
	if( overlap == 1) {
		<?php // add 2015/07/01 Y.Matsukawa [ ?>
		var kidprm = '';
		var grpKid = markerOverlaps[id].split(',');
		if( grpKid.length > 1){ 
			for(var k = 0; k < grpKid.length; k++){
				if(grpKid[k] == '')
					continue;
				kidprm += '&kid' + k + '=' + grpKid[k];
			}
		}else{
			kidprm += '&kid=' + obj.data1;
		}
		<?php // add 2015/07/01 Y.Matsukawa ] ?>
		//var url = "<?PHP echo $D_DIR_BASE_L; ?>shop_msg.htm?cid=<?PHP echo $cid; ?>&id="+id+kidprm;
		var url = "<?PHP echo $D_DIR_BASE_L; ?>shop_msg.htm?cid=<?PHP echo $cid; ?>"+kidprm;
	} else  { <?php // add 2014/08/18 AnPham ] ?>
		//var url = "<?PHP echo $D_DIR_BASE_L; ?>shop_msg.htm?cid=<?PHP echo $cid; ?>&id="+id+"&kid="+obj.data1;
		var url = "<?PHP echo $D_DIR_BASE_L; ?>shop_msg.htm?cid=<?PHP echo $cid; ?>&kid="+obj.data1;
	} <?php // add 2014/08/18 AnPham?>
	<?php */ ?>
	var url = "<?PHP echo $D_DIR_BASE_L; ?>shop_msg.htm?cid=<?PHP echo $cid; ?>&kid="+obj.data1;
	<?php // mod 2016/04/14 N.Wada ] ?>

	//url += "&<?php echo $P_FREEPARAMS; ?>";
	//url += "<?php echo ($freeparms?'&'.$freeparms:''); ?>";		// add 2012/01/11 Y.Matsukawa		mod 2012/09/10 Y.Matsukawa
	url += "<?php echo ($freeparms_enc?'&'.$freeparms_enc:''); ?>";
	<?php if($https_req){ ?>url += "&https_req=1";<?php } ?>
	if (link) url += "&link="+link;
	if (maptype) url += "&maptype="+maptype;	<?php // add 2012/02/02 N.Wada ?>
	<?php
	// add 2015/01/16 Y.Matsukawa [
	if($_SERVER['HTTP_HOST']){ echo 'url += "&PARENT_HTTP_HOST='.urlencode($_SERVER['HTTP_HOST']).'";'; }
	// add 2015/01/16 Y.Matsukawa ] ?>
	ZdcEmapHttpRequestHtml(url, function(html,status){
		if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> msg["+status+"]";
		ZdcEmapSearchEventCenterChangeAvailable = 0;	<?php // add 2016/04/24 N.Wada ?>
		<?php // add 2015/06/08 Y.Matsukawa [ ?>
		//ZdcEmapMsg.setHtml(html);
		//ZdcEmapMsg.moveLatLon(obj.marker.getLatLon());
		//ZdcEmapMsg.open();
		ZdcEmapMsg.setContent(html);
		ZdcEmapMsg.open(ZdcEmapMapObj, obj.marker);
		<?php // add 2015/06/08 Y.Matsukawa ] ?>
		ZdcEmapReadOff();
	<?php //});		mod 2012/09/10 Y.Matsukawa ?>
	}, false, 2);
}

//�ե�����ɽ���ʥޡ��������饹���ѡ�
function ZdcEmapShopMsgCluster(mCluster, link, maptype) {
	ZdcEmapReadOn();
	ZdcEmapShopMsgClose(); 

	var markers = mCluster.getMarkers();
	if(markers.length == 0) return;

	//�ե�������ɽ��������
	var kidprm = "";
	for (var i=0; i<markers.length; i++) {
		obj = ZdcEmapListMarkers[markers[i].data.id];
		if(!obj || obj.data1 == ""){ continue; }
		kidprm += "&kid" + i + "=" + obj.data1;
	}
	//var url = "<?PHP echo $D_DIR_BASE_L; ?>shop_msg.htm?cid=<?PHP echo $cid; ?>&id="+id+kidprm;
	var url = "<?PHP echo $D_DIR_BASE_L; ?>shop_msg.htm?cid=<?PHP echo $cid; ?>"+kidprm;
	url += "<?php echo ($freeparms_enc?'&'.$freeparms_enc:''); ?>";
	<?php if($https_req){ ?>url += "&https_req=1";<?php } ?>
	if (link) url += "&link="+link;
	if (maptype) url += "&maptype="+maptype;
	<?php
	if($_SERVER['HTTP_HOST']){ echo 'url += "&PARENT_HTTP_HOST='.urlencode($_SERVER['HTTP_HOST']).'";'; }
	?>
	ZdcEmapHttpRequestHtml(url, function(html,status){
		if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> msg["+status+"]";
		ZdcEmapSearchEventCenterChangeAvailable = 0;	<?php // add 2016/04/24 N.Wada ?>
		ZdcEmapMsg.setContent(html);
		ZdcEmapMsg.setPosition(mCluster.getCenter());
		ZdcEmapMsg.open(ZdcEmapMapObj);
		ZdcEmapReadOff();
	}, false, 2);
}

//�ե������õ�
function ZdcEmapShopMsgClose() {
	//ZdcEmapMapFrontShopReset();
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	if(ZdcEmapMsg != null)
		ZdcEmapMsg.close();
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
}

<?php // add 2016/03/23 N.Wada ?>
//�Ͽް�ư
function ZdcEmapMapMove(lat, lon, lvl){
	var latlon = ZdcEmapTky2Wgs(lat, lon);
	var pos = new google.maps.LatLng(latlon.lat, latlon.lon);
	ZdcEmapMapObj.setCenter(pos);
	if(lvl) ZdcEmapMapObj.setZoom(lvl + ZdcEmapZoomOffset);
}
<?php // add 2016/03/23 N.Wada ?>
//�Ͽް�ư�ʸ����ϡ�
function ZdcEmapMapMoveMyLoc(){
	if (!ZdcEmapMyLocation) return;
	ZdcEmapMapMove(ZdcEmapMyLocation.lat, ZdcEmapMyLocation.lon);
}
//�Ͽް�ư�ʶ����
<?php //function ZdcEmapMapMoveBox(minlat,minlon,maxlat,maxlon,pt,noin){	mod 2016/03/02 N.Wada ?>
<?php //function ZdcEmapMapMoveBox(minlat,minlon,maxlat,maxlon){		mod 2017/02/14 Y.Matsukawa ?>
function ZdcEmapMapMoveBox(minlat, minlon, maxlat, maxlon, wgs){
	<?php // mod 2015/10/30 N.Wada [
	//var swLatlon = new ZDC.LatLon(minlat, minlon);
	//var neLatlon = new ZDC.LatLon(maxlat, maxlon);
	//var latlons = [swLatlon, neLatlon];
	//if(pt != null) {
	//	latlons.push(pt);
	//	var adjust = ZdcEmapMapObj.getAdjustZoom(latlons, {fix: true});
	//} else {
	//	var adjust = ZdcEmapMapObj.getAdjustZoom(latlons, {fix: false});
	//}
	//if(null != adjust){
	//	ZdcEmapMapObj.moveLatLon(adjust.latlon);
	//	if(noin != 1 || (noin == 1 && adjust.zoom < ZdcEmapMapObj.getZoom()))
	//		ZdcEmapMapObj.setZoom(adjust.zoom);
	//}
	?>
	<?php // del 2016/03/02 N.Wada
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
	//var minlatlng = ZdcEmapTky2Wgs(varminlat, varminlon);
	//var swLatLng = new google.maps.LatLng(minlatlng.lat, minlatlng.lon);
	//var maxlatlng = ZdcEmapTky2Wgs(varmaxlat, varmaxlon);
	//var neLatLng = new google.maps.LatLng(maxlatlng.lat, maxlatlng.lon);
	//ZdcEmapMapObj.fitBounds(new google.maps.LatLngBounds(swLatLng, neLatLng));
	?>
	<?php // add 2016/03/02 N.Wada [ ?>
	var latlon_wgs, sw_wgs, ne_wgs;
	// ����������������׻�
	latlon_wgs = ZdcEmapTky2Wgs( minlat, minlon );
	if (wgs) latlon_wgs = new ZDC.LatLon(minlat, minlon);		<?php // add 2017/02/14 Y.Matsukawa ?>
	sw_wgs = new google.maps.LatLng(latlon_wgs.lat, latlon_wgs.lon);
	latlon_wgs = ZdcEmapTky2Wgs( maxlat, maxlon );
	if (wgs) latlon_wgs = new ZDC.LatLon(maxlat, maxlon);		<?php // add 2017/02/14 Y.Matsukawa ?>
	ne_wgs = new google.maps.LatLng(latlon_wgs.lat, latlon_wgs.lon);
	// �Ͽޤ�Ĵ��
	ZdcEmapMapObj.fitBounds(new google.maps.LatLngBounds(sw_wgs, ne_wgs));
	<?php // add 2016/03/02 N.Wada ] ?>
}
<?php // add 2016/03/02 N.Wada ?>
//�Ͽް�ư�ʶ�����濴�����
<?php //function ZdcEmapMapMoveBoxCenterFixed(minlat,minlon,maxlat,maxlon,centerlat,centerlon){		mod 2017/02/14 Y.Matsukawa ?>
function ZdcEmapMapMoveBoxCenterFixed(minlat, minlon, maxlat, maxlon, centerlat, centerlon, wgs){
	// �濴����Ǥ�Υ�줿lat��lon�κ�ʬ��׻�
	var lat_delta = Math.max( Math.abs( minlat - centerlat ), Math.abs( maxlat - centerlat ) );
	var lon_delta = Math.max( Math.abs( minlon - centerlon ), Math.abs( maxlon - centerlon ) );
	// �Ͽް�ư
	<?php //ZdcEmapMapMoveBox( centerlat-lat_delta, centerlon-lon_delta, centerlat+lat_delta, centerlon+lon_delta )		mod 2017/02/14 Y.Matsukawa ?>
	ZdcEmapMapMoveBox(centerlat-lat_delta, centerlon-lon_delta, centerlat+lat_delta, centerlon+lon_delta, wgs);
	// �Ͽް�ư��Υ������
	<?php // add 2017/02/14 Y.Matsukawa [ ?>
	if (wgs) {
		ZdcEmapMapObj.setCenter(new google.maps.LatLng(centerlat, centerlon));
	} else {
	<?php // add 2017/02/14 Y.Matsukawa ] ?>
		var center_wgs = ZdcEmapTky2Wgs(centerlat, centerlon);
		ZdcEmapMapObj.setCenter(new google.maps.LatLng(center_wgs.lat, center_wgs.lon));
	}
}

// �Ǵ��Ź��ʬ��ɽ��
function ZdcEmapSearchShopStart(cond) {
<?php // add 2012/10/24 Y.Matsukawa [ ?>
<?php	// ����Ⱦ�¤Ǹ��������ҥåȤ���Ź�ޤ��������꤭��̼ܤ��ѹ�����
		if($D_SHOP_SCALE_OPT) { ?>
	ZdcEmapSearchFirst = 1;
<?php	// ���ɽ���̼ܤ��Ͽ��ϰϤǸ�������ʽ̼��ѹ��ʤ���
		} else { ?>
<?php 		// �ҥå�0����ä������Ⱦ�¤ǺƸ�������
			if($D_SHOP_SEARCH_RETRY) { ?>
	ZdcEmapSearchRetry = 1;
<?php 		} ?>
<?php	} ?>

	ZdcEmapSearchCond = cond;

<?php // add 2012/10/24 Y.Matsukawa ] ?>

	ZdcEmapSearchClickFlg = 1;
	<?php // add add 2015/11/26 N.Wada [ ?>
	if(ZdcEmapSearchFirstInitLvFlg == 1) {
		ZdcEmapSearchFirstInitLvFlg = 0;
		ZdcEmapSearchFirst = 0;
		ZdcEmapSearchClickFlg = 0;
	}
	<?php // add add 2015/11/26 N.Wada ] ?>
	<?php // mod 2015/10/30 N.Wada
	//ZdcEmapSearchShop(cond);
	?>
	ZdcEmapSearchEventAdd("ZdcEmapSearchShop('"+cond+"')");
	ZdcEmapBoundsChanged = google.maps.event.addListener(ZdcEmapMapObj, 'bounds_changed', function(){ ZdcEmapSearchShop(cond); });

    <?php
	// add 2016/03/03 N.Wada [
	if($D_SEARCH_MAP_ICON){
	?>
	ZdcEmapSearchMapIcon();
    <?php
	}
	// add 2016/03/03 N.Wada ]
	?>
}

<?php
// add 2016/03/03 N.Wada [
//����������֤˥��������ɽ��
?>
function ZdcEmapSearchMapIcon() {
	var latlon = ZdcEmapMapObj.getCenter();
<?php	if ($D_SEARCH_MAP_ICON_IMG) { ?>
	var marker = new google.maps.Marker({
		map : ZdcEmapMapObj,
		icon : new google.maps.MarkerImage(
			"<?php echo $D_SEARCH_MAP_ICON_IMG; ?>",
			new google.maps.Size(<?php echo $D_SEARCH_MAP_ICON_W; ?>, <?php echo $D_SEARCH_MAP_ICON_H; ?>),
			new google.maps.Point(0, 0),
			new google.maps.Point(<?php echo $D_SEARCH_MAP_ICON_OFX; ?>, <?php echo $D_SEARCH_MAP_ICON_OFY; ?>)
		),
		optimized : false,	<?php // ���˥᡼�����GIF��ͭ���� ?>
		position : latlon
	});
<?php	} else { ?>
	var marker = new google.maps.Marker({
		map : ZdcEmapMapObj,
		position : latlon
	});
<?php	} ?>
	marker.setZIndex(0);
}
<?php
// add 2016/03/03 N.Wada ]
// �Ǵ��Ź��ʬ�ۺƸ���		add 2011/08/10 H.osamoto
?>
<?php //function ZdcEmapResearchShopStart(cond) {		mod 2012/02/21 Y.Matsukawa ?>
function ZdcEmapResearchShopStart(cond, cond2) {
	<?php // add 2012/02/21 Y.Matsukawa [ ?>
	var jkn = "";
	<?php // add 2015/10/30 N.Wada [ ?>
	<?php if (isset($D_RESARCH_INIT_COND_UNUSED) && $D_RESARCH_INIT_COND_UNUSED) { ?>
	jkn = cond2;
	<?php } else { ?>
	<?php // add 2015/10/30 N.Wada ] ?>
	if (cond) jkn += cond;
	if (cond2) {
		if (jkn) jkn += " AND ";
		jkn += "("+cond2+")";
	}
	<?php } ?>
	<?php // add 2012/02/21 Y.Matsukawa ] ?>
	ZdcEmapSearchFirst = 1;
	ZdcEmapSearchPoint = null;//ɬ���Ƹ��������뤿��
	<?php //ZdcEmapSearchShop(cond);		mod 2012/02/21 Y.Matsukawa ?>
	ZdcEmapSearchShop(jkn);
	<?php //ZdcEmapSearchEventAdd("ZdcEmapSearchShop('"+cond+"')");		mod 2012/02/28 Y.Matsukawa ?>
	ZdcEmapSearchEventAdd("ZdcEmapSearchShop('"+jkn+"')");
}

function ZdcEmapSearchShop(cond) {
	google.maps.event.removeListener(ZdcEmapBoundsChanged);
	if(ZdcEmapSearchShopCancel) {
		ZdcEmapSearchShopCancel = 0;
		return;
	}
	ZdcEmapReadOn();
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	//var p = ZdcEmapMapObj.getLatLon();
	//var box =  ZdcEmapMapObj.getLatLonBox();
	var p;
	p = ZdcEmapMapObj.getCenter();
	var center = ZdcEmapWgs2Tky(p.lat(), p.lng());
	p = ZdcEmapMapObj.getBounds().getSouthWest();
	var boxmin = ZdcEmapWgs2Tky(p.lat(), p.lng());
	p = ZdcEmapMapObj.getBounds().getNorthEast();
	var boxmax = ZdcEmapWgs2Tky(p.lat(), p.lng());
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
	if(ZdcEmapSearchPoint != null && <?PHP echo $D_SHOP_SEARCHPIX; ?> == -1) {
		//��ư�Ƹ������ʤ�
		ZdcEmapReadOff();
		return;
	}
	//��ư�������٥�����
	ZdcEmapSearchEventStop();

	<?php //var opts = new ZdcNearShopOptions();	mod 2017/01/19 N.Wada ?>
	var opts = new ZdcNearShopOptions2();
	opts.cid='<?PHP echo $D_DATA_CID; ?>'
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	//opts.lat = ZDC.degToms(p.lat);
	//opts.lon = ZDC.degToms(p.lon);
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
	opts.lat = ZDC.degToms(center.lat);
	opts.lon = ZDC.degToms(center.lon);
	<?php //if(ZdcEmapSearchFirst != 1) {	mod 2017/06/10 N.Wada ?>
	if((ZdcEmapSearchFirst != 1) || (<?PHP echo $D_INIT_LVL_CSTM; ?> > 0)) {
		<?php // add 2015/06/08 Y.Matsukawa [ ?>
		//opts.latlon = ZDC.degToms(box.getMin().lat)
		//		+ "," + ZDC.degToms(box.getMin().lon)
		//		+ "," + ZDC.degToms(box.getMax().lat)
		//		+ "," + ZDC.degToms(box.getMax().lon);
		<?php // add 2015/06/08 Y.Matsukawa ] ?>
		opts.latlon = ZDC.degToms(boxmin.lat)
				+ "," + ZDC.degToms(boxmin.lon)
				+ "," + ZDC.degToms(boxmax.lat)
				+ "," + ZDC.degToms(boxmax.lon);
		opts.radius = <?PHP echo $D_SHOP_RAD_RE; ?>;
	} else {
		ZdcEmapSearchFirst = 0;
		<?php // add 2016/03/05 N.Wada [ ?>
		<?php if (isset($D_RESEARCH_CNT) && $D_RESEARCH_CNT) { ?>
		opts.researchCount = <?PHP echo $D_RESEARCH_CNT; ?>;
		<?php } ?>
		<?php // add 2016/03/05 N.Wada ] ?>
		opts.radius = <?PHP echo $D_SHOP_RAD; ?>;
	}
	if (cond) opts.jkn = cond;
	opts.pos = 1;
	opts.minCount = <?PHP echo $D_SHOP_MIN; ?>;	<?php // add 2016/03/06 N.Wada ?>
	opts.maxCount = <?PHP echo $D_SHOP_MAX; ?>;
	opts.limitCount = <?PHP echo $D_SHOP_MAX; ?>;
	opts.timeout = <?PHP echo $D_AJAX_TIMEOUT; ?>;
	<?php //ZdcEmapNearShop.opts = opts;		mod 2015/06/08 Y.Matsukawa ?>
	ZdcEmapNearShop2.opts = opts;
	
	//���������ɽ������
	<?php //ZdcEmapNearShop.search(opts,ZdcEmapSearchShopResult);		mod 2015/06/08 Y.Matsukawa ?>
	ZdcEmapNearShop2.search(opts,ZdcEmapSearchShopResult);
}

//������̤ν���
function ZdcEmapSearchShopResult(result) {
	var i,item,mrk,tmp,icnt,maxlat=0,maxlon=0,minlat=999999999,minlon=999999999;
	//var tooltip_w,tooltip_h,tooltip_offset_x,tooltip_offset_y;		// add 2011/08/10 H.Osamoto

	//�᤭�Ф����
	ZdcEmapShopMsgClose();		<?php // add 2016/04/24 N.Wada ?>

	<?php // add 2015/10/20 N.Wada [ ?>
	// �ޡ��������饹�������
	<?php if (isset($D_GOOGLEMAPS_MARKER_CLUSTERER) && $D_GOOGLEMAPS_MARKER_CLUSTERER) { ?>
	ZdcEmapMapShopMrkClstObj.clearMarkers();
	<?php } ?>
	<?php // add 2015/10/20 N.Wada ] ?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	// �ޡ��������
	for(i = 0; i < ZdcEmapListMarkers.length; i++){
		//ZdcEmapMapObj.removeWidget(ZdcEmapListMarkers[i].marker);
		ZdcEmapListMarkers[i].marker.setMap(null);
		if(ZdcEmapListMarkers[i].tooltip) {
			//ZdcEmapMapObj.removeWidget(ZdcEmapListMarkers[i].tooltip);
			ZdcEmapListMarkers[i].tooltip.setMap(null);
		}
	}
	ZdcEmapListMarkers = [];
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
	//���顼����
	if(result.status != 0 && result.status != 3 && result.status != 5 && result.status != 9) {
		alert("<?PHP echo $D_MSG_ERR_JS_RESULT; ?> listres["+result.status+"]");
		ZdcEmapSearchEventStart();
		ZdcEmapReadOff();
		return;
	}
	//�Ͽޤ��֤�
	icnt = result.items.length;
	if (icnt > 0) {
		for (i=icnt-1; i>=0; i--) {
			item = result.items[i];
			if(!item.icon) break;
			if(item.nflg == 1) tmp = ZdcEmapIconImg["@NEW"];
				else tmp = "";
			// add 2011/08/10 H.Osamoto [
			// ����������֤���ꤹ������̾��new��������ɽ��������Ԥ�ʤ�
			//if (tooltip_w && tooltip_h) {
			//	tmp = "";
			//}
			// ̵���ʥ�������ID�ξ���Ʃ����������˺����ؤ�		add 2012/11/15 Y.Matsukawa
			if (ZdcEmapIconImg[item.icon] == null) ZdcEmapIconImg[item.icon] = ZdcEmapIconImg["@TP"];
			// add 2011/08/10 H.Osamoto ]
		<?php
		// add 2017/01/19 N.Wada [
		// ����������¬�Ϸϰ��ٷ��٤��ݻ����Ƥ�����Ϥ�������
		if ($D_KYOTEN_WGS_COL) {
			if ($D_KYOTEN_WGS_COL['LAT'] && $D_KYOTEN_WGS_COL['LON']) {
		?>
		item.lat_wgs = item.<?php echo strtolower($D_KYOTEN_WGS_COL['LAT']) ?>;
		item.lon_wgs = item.<?php echo strtolower($D_KYOTEN_WGS_COL['LON']) ?>;
//		if (item.lat_wgs) item.lat_wgs = ZDC.msTodeg(item.lat_wgs);
//		if (item.lon_wgs) item.lon_wgs = ZDC.msTodeg(item.lon_wgs);
		<?php
			}
		}
		?>
		var wgs = false;
		if (item.lat_wgs && item.lon_wgs) {
			item.lat = item.lat_wgs;
			item.lon = item.lon_wgs;
			wgs = true;
		}
		<?php
		// add 2017/01/19 N.Wada ] ?>
			mrk = ZdcEmapMakeMrk(i,
								item.lat,
								item.lon,
								ZdcEmapIconW[item.icon],
								ZdcEmapIconH[item.icon],
								ZdcEmapIconW['@NEW'],
								ZdcEmapIconH['@NEW'],
								//ZdcEmapIconOffsetX[item.icon],ZdcEmapIconOffsetY[item.icon],ZdcEmapIconW[item.icon]-ZdcEmapIconW['@NEW'],ZdcEmapIconH[item.icon],<?PHP echo $D_ICON_MSGOFFSETX; ?>,<?PHP echo $D_ICON_MSGOFFSETY; ?>,
							<?php if (isset($D_ICON_ANCHOR_CENTER_BOTTOM) && $D_ICON_ANCHOR_CENTER_BOTTOM) { // ���������������������������	add 2016/03/22 N.Wada ?>
								Math.ceil(ZdcEmapIconW[item.icon]/2),
								ZdcEmapIconH[item.icon],
								ZdcEmapIconW[item.icon]-ZdcEmapIconW['@NEW'],
								ZdcEmapIconH[item.icon],
								<?PHP echo $D_ICON_MSGOFFSETX; ?>,
								<?PHP echo $D_ICON_MSGOFFSETY; ?>,
							<?php } else { // �������������濴���������� ?>
								ZdcEmapIconOffsetX[item.icon],
								ZdcEmapIconOffsetY[item.icon],
								ZdcEmapIconW['@NEW']-ZdcEmapIconOffsetX[item.icon],
								ZdcEmapIconOffsetY[item.icon]*-1,
								<?PHP echo $D_ICON_MSGOFFSETX; ?>,
								<?PHP echo $D_ICON_MSGOFFSETY; ?>,
							<?php } ?>
								ZdcEmapIconImg[item.icon],
								tmp,
								item.id,
								item.icon,
								item.nflg,
								<?php //function() { ZdcEmapShopMsg(this.id, 1); },	mod 2012/02/02 N.Wada ?>
								<?php // function() { ZdcEmapShopMsg(this.id, 1, 'bunpu'); },// mod 2014/08/18 AnPham ?>
								<?php //function() { ZdcEmapShopMsg(this.id, 1, 'bunpu', < ?php echo empty($D_KYO_ICON_OVERLAP)?'""':$D_KYO_ICON_OVERLAP; ? >); },		mod 2015/06/08 Y.Matsukawa ?>
								<?php //function() { ZdcEmapShopMsg(this.data.id, 1, 'bunpu', < ?php echo empty($D_KYO_ICON_OVERLAP)?'""':$D_KYO_ICON_OVERLAP; ? >); },	mod 2015/10/30 N.Wada ?>
								function() {
									if (typeof ZdcEmapMrkClickFunc === "function") {
										ZdcEmapMrkClickFunc(this.data.id);
									} else {
										//ZdcEmapShopMsg(this.data.id, 1, 'bunpu', <?php echo empty($D_KYO_ICON_OVERLAP)?'""':$D_KYO_ICON_OVERLAP; ?>);	 mod 2016/04/14 N.Wada
										ZdcEmapShopMsg(this.data.id, 1, 'bunpu');
									}
								},
								<?php
								// del 2017/01/19 N.Wada [
								//null,
								//null,
								// del 2017/01/19 N.Wada ]
								?>
								item.lvl
								,wgs		<?php // add 2017/01/19 N.Wada ?>
								);
			// add 2011/08/10 H.osamoto [
			<?php // add 2015/06/08 Y.Matsukawa [ ?>
			<?php /* Google Maps JavaScript API V3�ν񼰤��ѹ�
			//ZdcEmapMapObj.addWidget(mrk.marker);
			*/ ?>
			mrk.marker.setMap(ZdcEmapMapObj);
			ZdcEmapListMarkers[i] = mrk;
			<?php /* Google Maps JavaScript API V3�ν񼰤��ѹ�
			//if(mrk.tooltip != null)
			//	ZdcEmapMapObj.addWidget(mrk.tooltip);
			*/ ?>
			if(mrk.tooltip != null) mrk.tooltip.setMap(ZdcEmapMapObj);
			<?php // add 2015/06/08 Y.Matsukawa ] ?>
			// add 2011/08/10 H.osamoto ]
			//����Ǿ����ٷ��ټ���
			<?php // add 2012/10/24 Y.Matsukawa [ ?>
			ZdcEmapSearchRetry = 0;
			if (ZdcEmapSearchRetryVCnt) {
				if (i+1 <= ZdcEmapSearchRetryVCnt) {
					if(item.lat > maxlat) maxlat = item.lat;
					if(item.lon > maxlon) maxlon = item.lon;
					if(item.lat < minlat) minlat = item.lat;
					if(item.lon < minlon) minlon = item.lon;
				}
			} else {
			<?php // add 2012/10/24 Y.Matsukawa ] ?>
				if(item.lat > maxlat) maxlat = item.lat;
				if(item.lon > maxlon) maxlon = item.lon;
				if(item.lat < minlat) minlat = item.lat;
				if(item.lon < minlon) minlon = item.lon;
			}
		}

		<?php // add 2015/10/20 N.Wada ?>
		// �ޡ��������饹��������
		<?php if (isset($D_GOOGLEMAPS_MARKER_CLUSTERER) && $D_GOOGLEMAPS_MARKER_CLUSTERER) { ?>
		for(i = 0; i < ZdcEmapListMarkers.length; i++){
			ZdcEmapMapShopMrkClstObj.addMarker(ZdcEmapListMarkers[i].marker);
		}
			<?php if (isset($D_GOOGLEMAPS_MARKER_CLUSTERER_CLICK_OPEN_MSG) && $D_GOOGLEMAPS_MARKER_CLUSTERER_CLICK_OPEN_MSG) { ?>
		google.maps.event.clearListeners(ZdcEmapMapShopMrkClstObj, "clusterclick");
		google.maps.event.addListener(ZdcEmapMapShopMrkClstObj, "clusterclick", function (mCluster) {
			if (typeof ZdcEmapMrkClstClickFunc === "function") {
				ZdcEmapMrkClstClickFunc(mCluster);
			} else {
				ZdcEmapShopMsgCluster(mCluster, 1, 'bunpu');
			}
		});
			<?php } ?>
		<?php } ?>

		<?php // add 2016/03/02 N.Wada ?>
		var p = ZdcEmapMapObj.getCenter();
		var center = ZdcEmapWgs2Tky(p.lat(), p.lng());
		
		ZdcEmapSearchRetryVCnt = 0;		<?php // add 2012/10/24 Y.Matsukawa ?>
		// add 2011/06/29 Y.Matsukawa [
		if(ZdcEmapSearchClickFlg) {
			ZdcEmapSearchClickFlg = 0;
		// add 2011/06/29 Y.Matsukawa ]
			//����������ϲ��̰�ư
			<?php //if (ZdcEmapMapShopMrkCnt > 0) {		mod 2015/06/08 Y.Matsukawa ?>
			if(ZdcEmapListMarkers.length > 0){
				if(<?php echo $D_INIT_LVL_CSTM; ?> == 0) {	<?php // add 2017/06/10 N.Wada ?>
					//���������ޤ��ϰϤ˰�ư
					<?php //ZdcEmapMapMoveBox(minlat,minlon,maxlat,maxlon,ZdcEmapMapObj.getMapLocation(),1);		mod 2015/06/08 Y.Matsukawa ?>
					<?php //ZdcEmapMapMoveBox(ZDC.msTodeg(minlat), ZDC.msTodeg(minlon), ZDC.msTodeg(maxlat), ZDC.msTodeg(maxlon), ZdcEmapMapObj.getLatLon(), 1);	mod 2015/10/30 N.Wada ?>
					<?php //ZdcEmapMapMoveBox(ZDC.msTodeg(minlat), ZDC.msTodeg(minlon), ZDC.msTodeg(maxlat), ZDC.msTodeg(maxlon), ZdcEmapMapObj.getCenter(), 1);	mod 2016/03/02 N.Wada ?>
					<?php //ZdcEmapMapMoveBoxCenterFixed(ZDC.msTodeg(minlat), ZDC.msTodeg(minlon), ZDC.msTodeg(maxlat), ZDC.msTodeg(maxlon), center.lat, center.lon);		mod 2017/02/14 Y.Matsukawa ?>
					ZdcEmapMapMoveBoxCenterFixed(ZDC.msTodeg(minlat), ZDC.msTodeg(minlon), ZDC.msTodeg(maxlat), ZDC.msTodeg(maxlon), center.lat, center.lon, wgs);
					<?php // idle���٥�Ȥ�fitBounds���ȯ�����Ƥ��ޤ��Τǣ��󸡺����ʤ��褦�ˤ���	add 2015/10/30 N.Wada ?>
					ZdcEmapSearchShopCancel = 1;
				}
			} else {
				//����Ⱦ�¤ν̼ܤ˰�ư
				<?php // add 2015/06/08 Y.Matsukawa [ ?>
				<?php //var p = ZdcEmapMapObj.getLatLon();	// mod 2015/10/30 N.Wada ?>
				<?php // del 2016/03/02 N.Wada
				//var p = ZdcEmapMapObj.getCenter();
				//var center = ZdcEmapWgs2Tky(p.lat(), p.lng());
				?>
				var rx = parseInt((450000 / (11 * 1000)) * <?PHP echo $D_SHOP_RAD; ?>);//CGI�ȷ׻��򤢤碌��
				var ry = parseInt((300000 / (9 * 1000)) * <?PHP echo $D_SHOP_RAD; ?>);//��
				<?php /* mod 2016/03/02 N.Wada
				ZdcEmapMapMoveBox(
					<?php // mod 2015/10/30 N.Wada
					//p.lat - ZDC.msTodeg(rx),
					//p.lon - ZDC.msTodeg(ry),
					//p.lat + ZDC.msTodeg(rx),
					//p.lon + ZDC.msTodeg(ry),
					//p
					?>
					center.lat - ZDC.msTodeg(rx),
					center.lon - ZDC.msTodeg(ry),
					center.lat + ZDC.msTodeg(rx),
					center.lon + ZDC.msTodeg(ry),
					center
				);
				*/ ?>
				ZdcEmapMapMoveBoxCenterFixed(
					center.lat - ZDC.msTodeg(rx),
					center.lon - ZDC.msTodeg(ry),
					center.lat + ZDC.msTodeg(rx),
					center.lon + ZDC.msTodeg(ry),
					center.lat,
					center.lon
				);
				<?php // add 2015/06/08 Y.Matsukawa ] ?>
			}
		}
<?php	// add 2012/10/24 Y.Matsukawa [ ?>
	} else {
		if (ZdcEmapSearchRetry) {
			ZdcEmapSearchRetry = 0;
			ZdcEmapSearchFirst = 1;
			ZdcEmapSearchClickFlg = 1;
			ZdcEmapSearchPoint = null;//ɬ���Ƹ��������뤿��
			ZdcEmapSearchRetryVCnt = <?php echo $D_SHOP_SEARCH_RETRY_VCNT; ?>;
			ZdcEmapReadOff();
			ZdcEmapSearchShop(ZdcEmapSearchCond);
			return;
		}
		<?php /* del 2017/09/05 N.Wada [
		<?php // add 2017/06/10 N.Wada [ ?>
		ZdcEampVisibleNotFound();
		google.maps.event.addListenerOnce(ZdcEmapMapObj, "bounds_changed", ZdcEampHiddenNotFound);
		<?php // add 2017/06/10 N.Wada ] ?>
		del 2017/09/05 N.Wada ] */ ?>
<?php	// add 2012/10/24 Y.Matsukawa ] ?>
	}

	ZdcEmapSearchEventStart();
	//�������֤��ݻ�
	<?php //ZdcEmapSearchPoint = ZdcEmapMapObj.getMapLocation();		mod 2015/06/08 Y.Matsukawa ?>
	<?php //ZdcEmapSearchPoint = ZdcEmapMapObj.getZoom();				mod 2015/10/30 N.Wada ?>
	ZdcEmapSearchPoint = ZdcEmapMapObj.getCenter();
	<?php //ZdcEmapSearchScale = ZdcEmapMapObj.getMapScale();		mod 2015/06/08 Y.Matsukawa ?>
	<?php //ZdcEmapSearchScale = ZdcEmapMapObj.getLatLon();			mod 2015/10/30 N.Wada ?>
	ZdcEmapSearchScale = ZdcEmapMapObj.getZoom();
	ZdcEmapReadOff();

	<?php // add 2017/06/22 N.Wada [ ?>
	if (ZdcEmapSearchFirst == 1 && <?php echo $D_INIT_LVL_CSTM_RE; ?> > 0) {
		ZdcEmapSearchFirst = 0;
		if (ZdcEmapListMarkers.length == 0) {
			ZdcEmapMapObj.setZoom(<?php echo $D_INIT_LVL_CSTM_RE; ?>);
		}
	}
	<?php // add 2017/09/05 N.Wada [ ?>
	else
	{
		if (ZdcEmapListMarkers.length == 0) {
			ZdcEampVisibleNotFound();
			google.maps.event.addListenerOnce(ZdcEmapMapObj, "bounds_changed", ZdcEampHiddenNotFound);
		}
	}
	<?php // add 2017/09/05 N.Wada ] ?>
	<?php // add 2017/06/22 N.Wada ] ?>

	<?php // ���åȤ��줿Ǥ�դδؿ���¹�	add 2015/10/30 N.Wada ?>
	if (typeof ZdcEmapResultAfterFunc === "function") ZdcEmapResultAfterFunc();
}

// �������٥�ȳ���
function ZdcEmapSearchEventStart() {
	ZdcEmapSearchEventFlg = 1;
}
// �������٥�����
function ZdcEmapSearchEventStop() {
	ZdcEmapSearchEventFlg = 0;
}

//�����¹�
function ZdcEmapSearchEventAction() {
	if(!ZdcEmapSearchEventFlg) return;
	//if(ZdcEmapMapObj.getUserMsgOpenStatus()) return;//�ե�����ɽ����ϸ������ʤ�
<?php	// add 2012/01/10 N.Wada [
		// �Ͽ������˺Ƹ������ʤ��⡼��
		if ($D_SHOP_NO_SEARCH_USER_ACT) { ?>
	return;
<?php	}
	// add 2012/01/10 N.Wada ] ?>
	<?php // add 2016/04/24 N.Wada [ ?>
	if (!ZdcEmapSearchEventCenterChangeAvailable) {
		ZdcEmapSearchEventCenterChangeAvailable = 1;
		return;
	}
	<?php // add 2016/04/24 N.Wada ] ?>
	eval(ZdcEmapSearchEventFunc);
}
//�������٥���ɲ�
function ZdcEmapSearchEventAdd(func) {
	ZdcEmapSearchEventDel();
	ZdcEmapSearchEventFunc = func;
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	<?php // mod 2015/10/30 N.Wada
	//ZdcEmapSearchEventDragmapend = ZDC.addListener(
	//	ZdcEmapMapObj, ZDC.MAP_CHG_LATLON, ZdcEmapSearchEventAction
	//);
	?>
	ZdcEmapSearchEventIdle = google.maps.event.addListener(ZdcEmapMapObj, "idle", ZdcEmapSearchEventAction);
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
}
//�������٥�Ⱥ��
function ZdcEmapSearchEventDel() {
	ZdcEmapSearchEventStop();
	<?php // mod 2015/10/30 N.Wada [ ?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	//if(ZdcEmapSearchEventDragmapend)    ZDC.removeListener(ZdcEmapSearchEventDragmapend);
	//if(ZdcEmapSearchEventChangezoomend) ZDC.removeListener(ZdcEmapSearchEventChangezoomend);
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
	//ZdcEmapSearchEventDragmapend = null;
	////ZdcEmapSearchEventScrollmapend = null;
	//ZdcEmapSearchEventChangezoomend = null;
	<?php // mod 2015/10/30 N.Wada ] ?>
	if(ZdcEmapSearchEventIdle) google.maps.event.removeListener(ZdcEmapSearchEventIdle);
	ZdcEmapSearchEventIdle = null;
	delete ZdcEmapSearchEventFunc;
}

// �ɤ߹���������
var ZdcEmapReading = 0;//�ɤ߹����桦������ե饰
function ZdcEmapReadOn() {
	ZdcEmapReading ++;
	//if(ZdcEmapReading == 1) ZdcEmapMapObj.visibleZdcWait();
	if(ZdcEmapReading == 1) ZdcEampVisibleWait();
}
function ZdcEmapReadOff() {
	if(ZdcEmapReading <= 0) return;
	ZdcEmapReading --;
	//if(ZdcEmapReading == 0) ZdcEmapMapObj.hiddenZdcWait();
	if(ZdcEmapReading == 0) ZdcEampHiddenWait();
}
function ZdcEampVisibleWait() {
	var wait = document.getElementById("ZdcEmapWait");
	if (!wait) return;
	wait.style.left   = (ZdcEmapWindowWidth / 2 + (<?php echo $D_WAIT_MSG_OFFSET_X; ?>))+'px';
	wait.style.top    = (ZdcEmapWindowHeight / 2 + (<?php echo $D_WAIT_MSG_OFFSET_Y; ?>))+'px';
	//	wait.style.width  = <?php echo $D_WAIT_MSG_PIX_W; ?>;
	//	wait.style.height = <?php echo $D_WAIT_MSG_PIX_H; ?>;
	wait.style.display = "block";
}
function ZdcEampHiddenWait() {
	var wait = document.getElementById("ZdcEmapWait");
	if (!wait) return;
	//	wait.style.width  = 0;
	//	wait.style.height = 0;
	wait.style.display = "none";
}
<?php //add 2017/06/10 N.Wada [ ?>
function ZdcEampVisibleNotFound() {
	var nf = document.getElementById("ZdcEmapNotFound");
	if (!nf) return;
	nf.style.left   = (ZdcEmapWindowWidth / 2 + (<?php echo $D_NF_MSG_OFFSET_X; ?>))+'px';
	nf.style.top    = (ZdcEmapWindowHeight / 2 + (<?php echo $D_NF_MSG_OFFSET_Y; ?>))+'px';
	nf.style.display = "block";
}
function ZdcEampHiddenNotFound() {
	var nf = document.getElementById("ZdcEmapNotFound");
	if (!nf) return;
	nf.style.display = "none";
}
<?php //add 2017/06/10 N.Wada ] ?>

<?php //add 2016/03/23 N.Wada ?>
//���������Ѥ��ȼ�UI
function ZdcEmapOriginalUI(lat, lon) {
	var elmZoom = document.getElementById("mapZoom"),
		elmMoveMyLoc = document.getElementById("mapMoveMyLocation"),
		elmInitPos = document.getElementById("mapInitPosition"),
		elmSrchRoute = document.getElementById("mapSearchRoute"),
		elmSelectRoute,
		timer_id,
		counter = 0,
		i,
		len,
		neki,
		optgroup,
		option;

	function mapControlAdd(element, position) {
		var control;
		if (!element) return;
		control = document.createElement('div');
		control.appendChild(element);
		control.index = 1;
		ZdcEmapMapObj.controls[position].push(control);
	}
	
	mapControlAdd(elmZoom,      google.maps.ControlPosition.RIGHT_BOTTOM);
	mapControlAdd(elmMoveMyLoc, google.maps.ControlPosition.LEFT_BOTTOM);
	mapControlAdd(elmInitPos,   google.maps.ControlPosition.LEFT_BOTTOM);
	mapControlAdd(elmSrchRoute, google.maps.ControlPosition.TOP_CENTER);

	if (elmSrchRoute) {
		// �Ǵ��ظ���
		ZdcEmapStation(lat,lon);
		// ������λ��˥ץ������˺Ǵ��ؤ��ɲ�
		(function setSelectRouteNekiList() {
			timer_id = setTimeout( setSelectRouteNekiList, 100 );
			if ( ZdcEmapNekiList && (elmSelectRoute = document.getElementById("selectRoute")) ) {
				if ( timer_id ) clearTimeout( timer_id );
				if ( (len = ZdcEmapNekiList.length) > 0) {
					optgroup = document.createElement('optgroup');
					optgroup.setAttribute("label", "���դαؤ���");
					for( i = 0; i < len; i++ ){
						neki = ZdcEmapNekiList[i];
						option = document.createElement('option');
						option.value = "eki,"+i;
						option.appendChild(document.createTextNode(neki.text));
						optgroup.appendChild(option);
					}
					elmSelectRoute.appendChild(optgroup);
				}
			}
			if (counter >= 9) {
				clearTimeout( timer_id );
			}
			counter++;
		}());
	}
}

<?php //add 2016/03/23 N.Wada ?>
//�Ͽޥ����।��
function ZdcEmapZoomIn() {
	ZdcEmapMapObj.setZoom(ZdcEmapMapObj.getZoom() + 1);
}

<?php //add 2016/03/23 N.Wada ?>
//�Ͽޥ����ॢ����
function ZdcEmapZoomOut() {
	ZdcEmapMapObj.setZoom(ZdcEmapMapObj.getZoom() - 1);
}

//---------------------------------------------------------------------------
// Landscape(��ɽ������ɽ���ˤ��Ͽޥ��������ڤ��ؤ��ޤ���
// onLoad ���ȡ�onorientationchange ���˥����뤵��ޤ���
//---------------------------------------------------------------------------
function ZdcEmapChangeOrientation()
{
	ZdcEmapWindowHeight = ZdcEmapWindowHeight - ZdcEmapAnyDispPx;	// add 2011/08/26 H.osamoto
	ZdcEmapWindowWidth  = ZdcEmapWindowWidth  - ZdcEmapAnyDispPy;	// add 2011/12/26 K.Masuda
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	var mapDom = document.getElementById('ZdcEmapMap');
	mapDom.style.width = ZdcEmapWindowWidth + 'px';
	mapDom.style.height = ZdcEmapWindowHeight + 'px';
	<?php // mod 2015/10/30 N.Wada
	//ZdcEmapMapObj.refresh();
	?>
	google.maps.event.trigger(ZdcEmapMapObj, 'resize');
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
}
window.onload = function()
{
	ZdcEmapWindowWidth  = window.innerWidth;
	ZdcEmapWindowHeight = window.innerHeight;
};
<?php if ($carrier->isIPHONE()) { ?>
window.onorientationchange = function()
{
	ZdcEmapWindowWidth  = window.innerWidth;
	ZdcEmapWindowHeight = window.innerHeight;

	<?php // �Ͽޥ�����������̵����	add 2015/10/30 N.Wada ?>
	<?php if (isset($D_GOOGLEMAPS_WIN_SIZE_SET_DISABLE) && $D_GOOGLEMAPS_WIN_SIZE_SET_DISABLE) { ?>
	<?php } else { ?>
	ZdcEmapChangeOrientation();
	<?php } ?>
};
<?php } ?>
<?php if ($carrier->isANDROID()) { ?>
window.onresize = function()
{
	<?php // add 2012/03/01 Y.Matsukawa [ ?>
	<?php // ������ɥ��������Ѥ�ä��������ꥵ�������� ?>
	ZdcEmapLastOrientation = window.orientation;
	<?php // add 2012/03/01 Y.Matsukawa ] ?>
	ZdcEmapWindowWidth  = window.innerWidth;
	ZdcEmapWindowHeight = window.innerHeight;

	<?php // �Ͽޥ�����������̵����	add 2015/10/30 N.Wada ?>
	<?php if (isset($D_GOOGLEMAPS_WIN_SIZE_SET_DISABLE) && $D_GOOGLEMAPS_WIN_SIZE_SET_DISABLE) { ?>
	<?php } else { ?>
	ZdcEmapChangeOrientation();
	<?php } ?>
};
<?php } ?>

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
		tmplatlon = ZdcEmapWgs2Tky(ZdcEmapMapObj.getCenter().lat(), ZdcEmapMapObj.getCenter().lng());
	}
	
	ZdcEmapNekiLat = tmplatlon.lat;
	ZdcEmapNekiLon = tmplatlon.lon;
	
	var ival = {
		latlon: tmplatlon,
		radius: <?PHP echo $D_NEKI_RAD; ?>,
		datum: "<?PHP echo $D_DATUM; ?>",
		limit: "0"+","+"<?PHP echo $D_NEKI_MAX; ?>"
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

<?php
// add 2016/03/08 N.Wada
//---------------------------------------------------------------------------
// �롼��õ��
//---------------------------------------------------------------------------
?>
var ZdcEmapRouteType = null;	<?php //�롼�ȼ����1:��Լ�/2:��ư�֡�	add 2016/03/08 N.Wada ?>
var ZdcEmapRouteCase = null;	<?php //�롼�Ƚ�ȯ�ϡ�free:Ǥ�դ�����/myloc:������/eki:�ء�	add 2016/03/08 N.Wada ?>
var ZdcEmapRoutePoint1 = null;
var ZdcEmapRoutePoint2 = null;
var ZdcEmapRouteSearchShopDetailEventClicked = null;
<?php // add 2016/03/08 N.Wada ?>
function ZdcEmapChangeRouteType(type) {
	var elmWalkOn = document.getElementById("mapRouteTypeWalkOn"),
		elmWalkOff = document.getElementById("mapRouteTypeWalkOff"),
		elmCarOn = document.getElementById("mapRouteTypeCarOn"),
		elmCarOff = document.getElementById("mapRouteTypeCarOff");
	
	ZdcEmapRouteType = type;
	switch (ZdcEmapRouteType) {
		case 1:
			elmWalkOn.style.display = "";
			elmWalkOff.style.display = "none";
			elmCarOn.style.display = "none";
			elmCarOff.style.display = "";
			break;
		case 2:
			elmWalkOn.style.display = "none";
			elmWalkOff.style.display = "";
			elmCarOn.style.display = "";
			elmCarOff.style.display = "none";
			break;
		default:
			break;
	}
	
	if (ZdcEmapRoutePoint1 && ZdcEmapRoutePoint2) {
		ZdcEmapRouteSearch(ZdcEmapRoutePoint1.lat, ZdcEmapRoutePoint1.lon, ZdcEmapRoutePoint2.lat, ZdcEmapRoutePoint2.lon);
	}
}
<?php // add 2016/03/08 N.Wada ?>
function ZdcEmapChangeRouteCase(lat, lon) {
	var selectElem,
		selectedValue,
		tmpAry,
		neki,
		element;
	
	if(ZdcEmapRouteSearchShopDetailEventClicked) google.maps.event.removeListener(ZdcEmapRouteSearchShopDetailEventClicked);
	ZdcEmapMapObj.setOptions({ draggableCursor: null });

	selectElem = document.getElementById("selectRoute")
	selectedValue = selectElem.options[selectElem.selectedIndex].value;
	if (!selectedValue) {
		ZdcEmapRoutePoint1 = null;
		ZdcEmapRoutePoint2 = null;
		ZdcEmapRouteClear();
		return;
	}
	
	tmpAry = selectedValue.split(",");
	ZdcEmapRouteCase = tmpAry[0].trim();
	switch (ZdcEmapRouteCase) {
		case 'free':
			ZdcEmapMapObj.setOptions({ draggableCursor: 'crosshair' });
			ZdcEmapRouteSearchShopDetailEventClicked = google.maps.event.addListener(ZdcEmapMapObj, 'click', function(e) {
				var latlon = ZdcEmapWgs2Tky(e.latLng.lat(), e.latLng.lng());
				ZdcEmapRouteSearch(latlon.lat, latlon.lon, lat, lon)
			});
			break;
		case 'myloc':
			if ((element = document.getElementById("mapRouteMyLocation"))) {
				element.click();
			}
			break;
		case 'eki':
			neki = ZdcEmapNekiList[tmpAry[1].trim()];
			if (neki.lat && neki.lon) {
				ZdcEmapRouteSearch(neki.lat, neki.lon, lat, lon)
			}
			break;
		default:
			break;
	}
}
<?php // add 2016/03/08 N.Wada ?>
<?php //function ZdcEmapRouteSearchMyLoc(e_lat, e_lon) {		mod 2017/01/20 N.Wada ?>
function ZdcEmapRouteSearchMyLoc(e_lat, e_lon, wgs) {
	if (!ZdcEmapMyLocation) return;
	<?php //ZdcEmapRouteSearch(ZdcEmapMyLocation.lat, ZdcEmapMyLocation.lon, e_lat, e_lon);		mod 2017/01/20 N.Wada ?>
	ZdcEmapRouteSearch(ZdcEmapMyLocation.lat, ZdcEmapMyLocation.lon, e_lat, e_lon, wgs);
}
<?php // add 2016/03/08 N.Wada ?>
<?php //function ZdcEmapRouteSearch(s_lat, s_lon, e_lat, e_lon) {		mod 2017/01/20 N.Wada ?>
function ZdcEmapRouteSearch(s_lat, s_lon, e_lat, e_lon, wgs) {
	if(ZdcEmapRouteType == 0) return;
	ZdcEmapRouteClear();
	ZdcEampVisibleWait();

	//�ѥ�᡼����������
	ZdcEmapRoutePoint1 = new ZDC.LatLon(s_lat, s_lon);
	ZdcEmapRoutePoint2 = new ZDC.LatLon(e_lat, e_lon);
	
	if (!ZdcEmapRouteType) ZdcEmapRouteType = 1;
	
	if(ZdcEmapRouteType == 1)
		<?php //ZdcEmapRouteSearchWalkApi2(ZdcEmapRoutePoint1, ZdcEmapRoutePoint2);		mod 2017/01/20 N.Wada ?>
		ZdcEmapRouteSearchWalkApi2(ZdcEmapRoutePoint1, ZdcEmapRoutePoint2, wgs);
	if(ZdcEmapRouteType == 2)
		<?php //ZdcEmapRouteSearchCarApi2(ZdcEmapRoutePoint1, ZdcEmapRoutePoint2);		mod 2017/01/20 N.Wada ?>
		ZdcEmapRouteSearchCarApi2(ZdcEmapRoutePoint1, ZdcEmapRoutePoint2, wgs);
	<?php // add 2018/05/17 N.Wada ?>
	if(ZdcEmapRouteType == 3)
		ZdcEmapRouteSearchCarApi2(ZdcEmapRoutePoint1, ZdcEmapRoutePoint2, wgs, 1);
}
<?php // add 2016/03/08 N.Wada ?>
// ��Լԥ롼�ȸ���(API2.0��)
<?php //function ZdcEmapRouteSearchWalkApi2(p1,p2) {		mod 2017/01/20 N.Wada ?>
function ZdcEmapRouteSearchWalkApi2(p1, p2, wgs) {
	ZdcEmapReadOn();
	
	/* �������������ΰ��ٷ��� */
	from = p1;
	/* �����������ΰ��ٷ��� */
	to   = p2;
	/* ��ԼԤ�®����80m/min�Ȥ��� */
	var walk_speed = 80;
	var datum = 'TOKYO'; if (wgs) datum = 'WGS84';		<?php // add 2017/01/20 N.Wada ?>

	ZDC.Search.getRouteByWalk({
		from: from,
		to: to
		, datum: datum		<?php // add 2017/01/20 N.Wada ?>
		<?php if (!$D_ROUTE_EKI_EXIT) { ?>, station: "bothoff"<?php } ?>
	},function(status, res) {
		if (status.code == '000') {
			/* �������� */
			<?php //ZdcEmapRouteWrite(status, res, 1);		mod 2017/01/20 N.Wada ?>
			ZdcEmapRouteWrite(status, res, 1, wgs);
		} else {
			/* �������� */
			if(ZdcEmapRouteType == 1) {
				<?php // ��Υ���᤹������⥢�顼�Ȥ�ɽ�������Τǻ����Ƚ����ΰ��֤�Ʊ�����ϥ��顼�Ȥ�ɽ�����ʤ�[ ?> 
				if (from.lat != to.lat || from.lon != to.lon) {
					<?php if ($D_MSG_ERR_SEARCH_WALK_ALERT != '') { ?>
					alert("<?php echo $D_MSG_ERR_SEARCH_WALK_ALERT; ?>");
					<?php } ?>
				}
				<?php ?>
				// �롼�ȸ�����λ
				ZdcEmapReadOff();
				//���Ԥ��ä���缫ư�֤ǺƸ�������
				<?php //ZdcEmapRouteSearchCarApi2(ZdcEmapRoutePoint1,ZdcEmapRoutePoint2);		mod 2017/02/23 N.Wada ?>
				ZdcEmapRouteSearchCarApi2(ZdcEmapRoutePoint1,ZdcEmapRoutePoint2, wgs);
			} else {
				ZdcEampHiddenWait();
				alert('<?PHP echo $D_MSG_ERR_JS_ROUTE; ?> [' + status.code + ']');
				// �롼�ȸ�����λ
				ZdcEmapReadOff();
			}
			return;
		}
	});
}
<?php // add 2016/03/08 N.Wada ?>
// ��ư�֥롼�ȸ���(API2.0��)
<?php //function ZdcEmapRouteSearchCarApi2(p1,p2) {		mod 2017/01/20 N.Wada ?>
<?php //function ZdcEmapRouteSearchCarApi2(p1, p2, wgs) {		mod 2018/05/17 N.Wada ?>
function ZdcEmapRouteSearchCarApi2(p1, p2, wgs, localroad) {
	ZdcEmapReadOn();
	
	/* �������������ΰ��ٷ��� */
	from = p1;
	/* �����������ΰ��ٷ��� */
	to   = p2;
	var datum = 'TOKYO'; if (wgs) datum = 'WGS84';		<?php // add 2017/01/20 N.Wada ?>
	var toll = true; if (localroad) toll = false;		<?php // add 2018/05/17 N.Wada ?>
	
	ZDC.Search.getRouteByDrive({
		from: from,
		to: to
		, datum: datum		<?php // add 2017/01/20 N.Wada ?>
		, toll: toll		<?php // add 2018/05/17 N.Wada ?>
	},function(status, res) {
		if (status.code == '000') {
			/* �������� */
			<?php //ZdcEmapRouteWrite(status, res, 2);		mod 2017/01/20 N.Wada ?>
			ZdcEmapRouteWrite(status, res, 2, wgs);
		} else {
			ZdcEampHiddenWait();
			/* �������� */
			alert('<?PHP echo $D_MSG_ERR_JS_ROUTE; ?> [' + status.code + ']');
			// �롼�ȸ�����λ
			ZdcEmapReadOff();
		}
	});
}
<?php // add 2016/03/08 N.Wada ?>
// �롼������
var ZdcEmapRoutePolyline = [];
var ZdcEmapRoutePolylineBus = [];	<?php // add 2018/06/18 N.Wada ?>
var ZdcEmapRouteStartFlag;
var ZdcEmapRouteEndFlag;
<?php //function ZdcEmapRouteWrite(status, res, stype) {		mod 2017/01/20 N.Wada ?>
function ZdcEmapRouteWrite(status, res, stype, wgs) {
	ZdcEmapShopMsgClose();
	/* �������Ȥȥ�����Υ���������Ͽޤ˽ž����ޤ� */
	var latlon_wgs;
	<?php //latlon_wgs = ZdcEmapTky2Wgs(from.lat,from.lon);		del 2017/01/20 N.Wada ?>
	<?php // add 2017/01/20 N.Wada [ ?>
	if (wgs) {
		latlon_wgs = new ZDC.LatLon(from.lat,from.lon);
	} else {
		latlon_wgs = ZdcEmapTky2Wgs(from.lat,from.lon);
	}
	<?php // add 2017/01/20 N.Wada ] ?>
	ZdcEmapRouteStartFlag = new google.maps.Marker({
		icon : new google.maps.MarkerImage(
			'<?PHP echo $D_ROUTE_START_IMAGE; ?>',
			new google.maps.Size(<?PHP echo $D_ROUTE_START_WIDTH; ?>, <?PHP echo $D_ROUTE_START_HEIGHT; ?>),
			new google.maps.Point(0, 0),
			new google.maps.Point(<?PHP echo $D_ROUTE_START_OFFSET_X; ?>, <?PHP echo $D_ROUTE_START_OFFSET_Y; ?>)
		),
		optimized : false,	<?php // ���˥᡼�����GIF��ͭ���� ?>
		position : new google.maps.LatLng(latlon_wgs.lat, latlon_wgs.lon)
	});
	<?php //latlon_wgs = ZdcEmapTky2Wgs(to.lat,to.lon);		del 2017/01/20 N.Wada ?>
	if (wgs) {
		latlon_wgs = new ZDC.LatLon(to.lat,to.lon);
	} else {
		latlon_wgs = ZdcEmapTky2Wgs(to.lat,to.lon);
	}
	ZdcEmapRouteEndFlag = new google.maps.Marker({
		icon : new google.maps.MarkerImage(
			'<?PHP echo $D_ROUTE_GOAL_IMAGE; ?>',
			new google.maps.Size(<?PHP echo $D_ROUTE_GOAL_WIDTH; ?>, <?PHP echo $D_ROUTE_GOAL_HEIGHT; ?>),
			new google.maps.Point(0, 0),
			new google.maps.Point(<?PHP echo $D_ROUTE_GOAL_OFFSET_X; ?>, <?PHP echo $D_ROUTE_GOAL_OFFSET_Y; ?>)
		),
		optimized : false,	<?php // ���˥᡼�����GIF��ͭ���� ?>
		position : new google.maps.LatLng(latlon_wgs.lat, latlon_wgs.lon)
	});
	/*
	�������Ȥȥ�����Υ������åȤ�¾�Υޡ�����
	���ˤʤ�ʤ��褦��z-index�����ꤷ�ޤ�
	*/
	ZdcEmapRouteStartFlag.setZIndex(110);
	ZdcEmapRouteEndFlag.setZIndex(110);

	ZdcEmapRouteStartFlag.setMap(ZdcEmapMapObj);
	ZdcEmapRouteEndFlag.setMap(ZdcEmapMapObj);

	var link = res.route.link;
	
	var latlngbounds_wgs = new google.maps.LatLngBounds();	<?php // add 2016/03/08 N.Wada ?>
	for (var i=0, j=link.length; i<j; i++) {
		
		var opt;
		if (stype == 1) {
			// ��Լ�
			opt = {
				'strokeWeight': <?php echo $D_ROUTE_WALK_WIDTH; ?>,
				'strokeOpacity':  <?php echo $D_ROUTE_WALK_OPACITY; ?>,
				'strokeColor':  "<?php echo $D_ROUTE_WALK_COLOR; ?>" 
			};
		} else {
			// ��ư��
			opt = {
				'strokeWeight': <?php echo $D_ROUTE_CAR_WIDTH; ?>,
				'strokeOpacity':  <?php echo $D_ROUTE_CAR_OPACITY; ?>,
				'strokeColor':  "<?php echo $D_ROUTE_CAR_COLOR; ?>" 
			};
		}
		var pl = new google.maps.Polyline(opt);
		
		var path = [];
		for (var k=0, l=link[i].line.length; k<l; k++) {
			<?php //latlon_wgs = ZdcEmapTky2Wgs(link[i].line[k].lat,link[i].line[k].lon);		del 2017/01/20 N.Wada ?>
			<?php // add 2017/01/20 N.Wada [ ?>
			if (wgs) {
				latlon_wgs = new ZDC.LatLon(link[i].line[k].lat,link[i].line[k].lon);
			} else {
				latlon_wgs = ZdcEmapTky2Wgs(link[i].line[k].lat,link[i].line[k].lon);
			}
			<?php // add 2017/01/20 N.Wada ] ?>
			path[k] = new google.maps.LatLng(latlon_wgs.lat, latlon_wgs.lon);
			latlngbounds_wgs.extend( path[k] );	<?php // add 2016/03/08 N.Wada ?>
		}
		pl.setPath(path);
		pl.setMap(ZdcEmapMapObj);
		ZdcEmapRoutePolyline[i] = pl;
	}
	/* ����������ɽ���Ǥ���̼ܥ�٥����� */
	ZdcEmapMapObj.fitBounds(latlngbounds_wgs);	<?php // add 2016/03/08 N.Wada ?>
	
	ZdcEampHiddenWait();
	// �롼�ȸ�����λ
	ZdcEmapReadOff();

};
<?php // add 2017/01/21 N.Wada ?>
// �ʥӥ��������ID�ˤ��ʣ��롼�Ⱦܺټ���(API2.0��)
function ZdcEmapRouteCombGetByNaviID(naviid, wgs) {
	ZdcEmapReadOn();

	var datum = 'TOKYO'; if (wgs) datum = 'WGS84';

	ZDC.Search.getCombRouteByNaviId({
		naviid: naviid,
		datum: datum
	},function(status, res) {
		if (status.code == '000') {
			/* �������� */
			<?php //ZdcEmapRouteCombWrite(status, res, wgs);	mod 2018/06/18 N.Wada ?>
			ZdcEmapRouteCombWrite(status, res, wgs, naviid);
		} else {
			ZdcEampHiddenWait();
			/* �������� */
			alert('<?PHP echo $D_MSG_ERR_JS_ROUTE; ?> [' + status.code + ']');
			// �롼�ȸ�����λ
			ZdcEmapReadOff();
		}
	});
}
<?php // add 2017/01/21 N.Wada ?>
// ʣ��롼������(API2.0��)
<?php //function ZdcEmapRouteCombWrite(status, res, wgs) {	mod 2018/06/18 N.Wada ?>
function ZdcEmapRouteCombWrite(status, res, wgs, naviid) {
	ZdcEmapShopMsgClose();
	
	var latlon_wgs;	<?php // add 2018/06/18 N.Wada ?>
	var latlngbounds_wgs = new google.maps.LatLngBounds();
	var navi_sections = res.navi_sections;
	var from, to;
	var bus_latlons_list = ZdcEmapGetBusLatlonsByNaviId(naviid);	<?php // �Х륹�롼�ȤΥХ���ΰ��ٷ��٤����	add 2018/06/18 N.Wada ?>
	for (var i=0, j=navi_sections.length; i<j; i++) {
		if (navi_sections[i].line) {
			var opt;
			if (navi_sections[i].datatype == 'walk') {
				// ��Լ�
				opt = {
					'strokeWeight': <?php echo $D_ROUTE_WALK_WIDTH; ?>,
					'strokeOpacity':  <?php echo $D_ROUTE_WALK_OPACITY; ?>,
					'strokeColor':  "<?php echo $D_ROUTE_WALK_COLOR; ?>" 
				};
			} else if (navi_sections[i].datatype == 'car') {
				// ��ư��
				opt = {
					'strokeWeight': <?php echo $D_ROUTE_CAR_WIDTH; ?>,
					'strokeOpacity':  <?php echo $D_ROUTE_CAR_OPACITY; ?>,
					'strokeColor':  "<?php echo $D_ROUTE_CAR_COLOR; ?>" 
				};
			} else if (navi_sections[i].datatype == 'train') {
				// �ż�
				opt = {
					'strokeWeight': <?php echo $D_ROUTE_TRAIN_WIDTH; ?>,
					'strokeOpacity':  <?php echo $D_ROUTE_TRAIN_OPACITY; ?>,
					'strokeColor':  "<?php echo $D_ROUTE_TRAIN_COLOR; ?>" 
				};
				<?php // �Х��롼�Ȥ��������� add 2018/06/18 ?>
				if (navi_sections[i].route_type.code == '3003') {
					if (Array.isArray(bus_latlons_list)) {
						var bus_latlons = bus_latlons_list.shift();
						if (bus_latlons !== undefined && Array.isArray(bus_latlons)) {
							var bus_s = navi_sections[i].line[0];
							var bus_e = navi_sections[i].line[navi_sections[i].line.length-1];
							var pl = new google.maps.Polyline(opt);
							var path = [];
							<?php if ($D_SEARCH_COMB_ROUTE_BUS_API == 'js') { // js¦�ǥХ��롼�Ȥ���� ?>
							if (bus_latlons.length <= <?PHP echo $D_ROUTE_DRIVE_WAY_POINT_MAX; ?>) {
								// ��ư�֥롼��õ�����緿�֡ˤ�����
								var datum = 'TOKYO'; if (wgs) datum = 'WGS84';
								ZDC.Search.getRouteByDrive({
									from: bus_s,
									to: bus_e,
									mpoints: bus_latlons,
									datum: datum,
									cartype: 'large'
								},function(status, res) {
									if (status.code == '000') {
										var link = res.route.link;
										for (var i=0, j=link.length; i<j; i++) {
											var pl = new google.maps.Polyline(opt);
											var path = [];
											for (var k=0, l=link[i].line.length; k<l; k++) {
												path[k] = new google.maps.LatLng(link[i].line[k].lat,link[i].line[k].lon);
											}
											pl.setPath(path);
											pl.setMap(ZdcEmapMapObj);
											ZdcEmapRoutePolylineBus.push(pl);
										}
									} else {
										alert('<?PHP echo $D_MSG_ERR_JS_ROUTE; ?> [' + status.code + ']');
									}
								});
							} else {
								// �Х���֤�ľ���ǤĤʤ�
								bus_latlons.unshift(bus_s);
								bus_latlons.push(bus_e);
								for (var m=0, n=bus_latlons.length; m<n; m++) {
									path[m] = new google.maps.LatLng(bus_latlons[m].lat, bus_latlons[m].lon);
									latlngbounds_wgs.extend( path[m] );
								}
							}
							<?php } else { // php¦�ǥХ��롼�Ȥ����������ΰ��ٷ��٥ꥹ�ȤʤΤǤ��Τޤ�ľ���ǤĤʤ� ?>
							bus_latlons.unshift(bus_s);
							bus_latlons.push(bus_e);
							for (var m=0, n=bus_latlons.length; m<n; m++) {
								path[m] = new google.maps.LatLng(bus_latlons[m].lat, bus_latlons[m].lon);
								latlngbounds_wgs.extend( path[m] );
							}
							<?php } ?>
							pl.setPath(path);
							pl.setMap(ZdcEmapMapObj);
							ZdcEmapRoutePolyline[i] = pl;
							if (!to) to = navi_sections[i].line[0];
							from = navi_sections[i].line[l-1];
							// ʣ��롼�ȷ��������η�̤�ȤäƤΥХ��롼�Ȥ�����Ϥ��ʤ�
							continue;
						}
					}
				}
			} else {
				// ����ʳ��ʼ�ư�֤������Ȥ���
				opt = {
					'strokeWeight': <?php echo $D_ROUTE_CAR_WIDTH; ?>,
					'strokeOpacity':  <?php echo $D_ROUTE_CAR_OPACITY; ?>,
					'strokeColor':  "<?php echo $D_ROUTE_CAR_COLOR; ?>" 
				};
			}
			var pl = new google.maps.Polyline(opt);
			
			var path = [];
			for (var k=0, l=navi_sections[i].line.length; k<l; k++) {
				if (wgs) {
					latlon_wgs = new ZDC.LatLon(navi_sections[i].line[k].lat,navi_sections[i].line[k].lon);
				} else {
					latlon_wgs = ZdcEmapTky2Wgs(navi_sections[i].line[k].lat,navi_sections[i].line[k].lon);
				}
				path[k] = new google.maps.LatLng(latlon_wgs.lat, latlon_wgs.lon);
				latlngbounds_wgs.extend( path[k] );
			}
			pl.setPath(path);
			pl.setMap(ZdcEmapMapObj);
			ZdcEmapRoutePolyline[i] = pl;
			if (!to) to = navi_sections[i].line[0];
			from = navi_sections[i].line[l-1];
		}
	}
	/* ����������ɽ���Ǥ���̼ܥ�٥����� */
	ZdcEmapMapObj.fitBounds(latlngbounds_wgs);

	/* �������Ȥȥ�����Υ���������Ͽޤ˽ž����ޤ� */
	var latlon_wgs;
	if (wgs) {
		latlon_wgs = new ZDC.LatLon(to.lat,to.lon);
	} else {
		latlon_wgs = ZdcEmapTky2Wgs(to.lat,to.lon);
	}
	ZdcEmapRouteStartFlag = new google.maps.Marker({
		icon : new google.maps.MarkerImage(
			'<?PHP echo $D_ROUTE_START_IMAGE; ?>',
			new google.maps.Size(<?PHP echo $D_ROUTE_START_WIDTH; ?>, <?PHP echo $D_ROUTE_START_HEIGHT; ?>),
			new google.maps.Point(0, 0),
			new google.maps.Point(<?PHP echo $D_ROUTE_START_OFFSET_X; ?>, <?PHP echo $D_ROUTE_START_OFFSET_Y; ?>)
		),
		optimized : false,	<?php // ���˥᡼�����GIF��ͭ���� ?>
		position : new google.maps.LatLng(latlon_wgs.lat, latlon_wgs.lon)
	});
	if (wgs) {
		latlon_wgs = new ZDC.LatLon(to.lat,to.lon);
	} else {
		latlon_wgs = ZdcEmapTky2Wgs(to.lat,to.lon);
	}
	latlon_wgs = ZdcEmapTky2Wgs(to.lat,to.lon);
	ZdcEmapRouteEndFlag = new google.maps.Marker({
		icon : new google.maps.MarkerImage(
			'<?PHP echo $D_ROUTE_GOAL_IMAGE; ?>',
			new google.maps.Size(<?PHP echo $D_ROUTE_GOAL_WIDTH; ?>, <?PHP echo $D_ROUTE_GOAL_HEIGHT; ?>),
			new google.maps.Point(0, 0),
			new google.maps.Point(<?PHP echo $D_ROUTE_GOAL_OFFSET_X; ?>, <?PHP echo $D_ROUTE_GOAL_OFFSET_Y; ?>)
		),
		optimized : false,	<?php // ���˥᡼�����GIF��ͭ���� ?>
		position : new google.maps.LatLng(latlon_wgs.lat, latlon_wgs.lon)
	});
	/*
	�������Ȥȥ�����Υ������åȤ�¾�Υޡ�����
	���ˤʤ�ʤ��褦��z-index�����ꤷ�ޤ�
	*/
	ZdcEmapRouteStartFlag.setZIndex(110);
	ZdcEmapRouteEndFlag.setZIndex(110);

	ZdcEmapRouteStartFlag.setMap(ZdcEmapMapObj);
	ZdcEmapRouteEndFlag.setMap(ZdcEmapMapObj);

	ZdcEampHiddenWait();
	// �롼�ȸ�����λ
	ZdcEmapReadOff();

};

<?php // add 2016/03/08 N.Wada ?>
//�롼�Ⱥ��
function ZdcEmapRouteClear() {
	if(!ZdcEmapRoutePolyline.length) return;
	
	for (var i=0; i<ZdcEmapRoutePolyline.length; i++) {
		if (ZdcEmapRoutePolyline[i]) {
			ZdcEmapRoutePolyline[i].setMap(null);
			delete ZdcEmapRoutePolyline[i];
		}
	}
	<?php // add 2018/06/18 N.Wada [ ?>
	for (var i=0; i<ZdcEmapRoutePolylineBus.length; i++) {
		if (ZdcEmapRoutePolylineBus[i]) {
			ZdcEmapRoutePolylineBus[i].setMap(null);
		}
	}
	ZdcEmapRoutePolylineBus = [];
	<?php // add 2018/06/18 N.Wada ] ?>
	
	//�������ȡ�������Υ쥤�䡼����
	if(ZdcEmapRouteStartFlag){
		ZdcEmapRouteStartFlag.setMap(null);
		delete ZdcEmapRouteStartFlag;
	}
	if(ZdcEmapRouteEndFlag){
		ZdcEmapRouteEndFlag.setMap(null);
		delete ZdcEmapRouteEndFlag;
	}
}




<?php
// formCond����ʤ���߾��������jkn��ʸ�����		add 2012/02/21 Y.Matsukawa
?>
function ZdcEmapGetCondJkn() {
	var form = document.formCond;
	if (!form) return '';
	var jkn = '';
	var chk = null;
	var arr_cond = new Array();
<?php
if(isset($D_COND_GRP) && count($D_COND_GRP) > 0){
	$i = 0;
	foreach($D_COND_GRP as $gno => $cnolist) {
?>
		arr_cond[<?php echo $i; ?>] = "";
<?php
		foreach($cnolist as $cno) {
?>
	chk = form.cond<?php echo $cno; ?>;
	if (chk && chk.checked) {
		if (arr_cond[<?php echo $i; ?>] != "")
			arr_cond[<?php echo $i; ?>] += " <?php echo $D_COND_ANDOR[$gno]; ?> ";
		arr_cond[<?php echo $i; ?>] += chk.value;
	}
<?php
		}
		$i++;
	}
}
?>
	if (arr_cond.length > 0) {
		for(var i=0; i < arr_cond.length; i++) {
			if (arr_cond[i] && arr_cond[i] != "") {
				if (jkn) jkn += " <?php echo $D_COND_GRP_ANDOR; ?> ";
				jkn += "("+arr_cond[i]+")";
			}
		}
	}
	return jkn;
}
