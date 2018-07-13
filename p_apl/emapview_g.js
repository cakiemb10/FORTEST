<?PHP
// ------------------------------------------------------------
// Google Maps�� �Ͽ�����
// 
// ��ȯ����
// 2013/10/02 Y.Matsukawa	��������
// 2015/06/03 N.Wada		����������������������ѲĤ�
// 							Ź�޾ܺ٤�ajax��ɽ��
// 							������̤�ajax��ɽ��
// 2015/10/20 N.Wada		Ź�޸������ϤΥ��٥�Ȥ��ڤ��ؤ�
// 							�᤭�Ф��������ޥ������ɲá���infobox.js��
// 							MarkerClusterer���ɲá���markerclusterer.js��
// 							POI��������ɽ�������ɲ�
// 							�Ͽ޾�Υ������������ɲ�
// 							�������������������˥��ץ���������ɲ�
// 							�Ͽޥ���ȥ����ɽ�������ɲ�
// 2015/11/13 N.Wada		�������ȥ�å�����ɽ���ɲ�
// 2015/11/26 N.Wada		�Ͻ�������˰����Υ������٥뤬�����ʤ��Զ�罤��
// 							�ޡ��������饹�����ǥ��饹����󥰤����ϰϤ�������ɲ�
// 2016/03/01 N.Wada		����������Ͽ�ؿ���Ǥϥ���������Ͽޤˤ�ɽ�����������ؿ��ƤӽФ�¦��ɽ��������
// 2016/03/02 N.Wada		���Զ����ϿޤΥ������륳��ȥ����ɽ���ե饰������
// 							Google�Ͽޤǥʥӥ�������󡦥ѥ󥳥�ȥ��뤬̵���ˤʤä�������
// 2016/03/03 N.Wada		�ѥ󤯤���ưŪ���ɲáʺǲ����ء�
// 2016/03/04 N.Wada		�ܺ�ɽ���˥ե���������������ɽ�����ɲ�
// 2016/03/08 N.Wada		�롼��õ���ɲ�
// 2016/03/22 N.Wada		���������������������������֤�ؤ��ѥ������ɲ�
// 2016/03/23 N.Wada		���������Ѥ��ȼ�UI�ɲ�
// 2016/08/16 Y.Matsukawa	����¬�Ϸ��ݻ�
// 2017/02/16 N.Wada		�Ǵ�إꥹ��ɽ��
// 2017/02/20 N.Wada		�롼�ȸ�������¬�Ϸ��ݻ�
// 2017/02/23 N.Wada		�ʥӥ��������ID�ˤ��ʣ��롼���ɲ�
// 2017/02/28 N.Wada		ʣ��롼�ȷ��ɽ��
// 2017/03/05 N.Wada		���Զ����ѿ���delete�Ǥ��ʤ��Τ�����˽��������
// 2017/02/28 N.Wada		��ȯ��ʣ��FW���ɽ��
// 2017/03/28 Y.Matsukawa	�ѥ󤯤������ɲä򸵤��᤹
// 2017/04/14 Y.Matsukawa	Google POI�ʤ�Ź��ɽ��
// 2017/08/03 Y.Matsukawa	Google POI�ʤ�Ź�˾ܺ٥��ƥ��꡼����
// 2017/11/14 Y.Matsukawa	�롼�Ȼ�����������դˤ���
// 2018/05/17 N.Wada		��Լԥ롼�ȸ�����ư�֥롼�ȡʰ���ƻͥ��˸��������ؤ��뤿�ᡢ�ѥ�᡼���˰���ƻ�ե饰�ɲ�
// 2018/06/18 N.Wada		�Х��롼�Ȥλ����������֤�ľ���ǤϤʤ������δ֤γƥХ�����ͳ������
// ------------------------------------------------------------
require_once('/home/emap/src/p/inc/define.inc');
require_once('/home/emap/src/p/inc/define_get_icon.inc');
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
function ZdcEmapSetMyLocation(lat_wgs, lon_wgs) {
	ZdcEmapMyLocation = ZdcEmapWgs2Tky(lat_wgs, lon_wgs);
}
//-------------------------------------------------------------
//�������
//-------------------------------------------------------------
//�Ͽ�
var ZdcEmapMapObj = null;
var ZdcEmapWindowWidth = 0;		<?php // add 2015/11/13 N.Wada ?>
var ZdcEmapWindowHeight = 0;	<?php // add 2015/11/13 N.Wada ?>
//�������ֹ楪�ե��å�
var ZdcEmapZoomOffset = 4;
//����
var ZdcEmapListObj;
var ZdcEmapNekiListObj;		<?php // add 2017/02/16 N.Wada ?>
var ZdcEmapDetailObj;
var ZdcEmapCondObj;
var ZdcEmapDetailPopObj;	// add 2015/06/03 N.Wada
var ZdcEmapSearchPopObj;	// add 2015/06/03 N.Wada
var ZdcEmapSrchCombRootDeptObj;			<?php // add 2017/03/06 N.Wada ?>
var ZdcEmapSrchCombRootResultObj;		<?php // add 2017/02/28 N.Wada ?>
//�ޡ���������
var ZdcEmapMapShopMrkId = new Array(<?PHP echo $D_SHOP_MAX; ?>);
var ZdcEmapMapShopMrkCnt = null;
var ZdcEmapMapShopDetailMrkId = null;
var ZdcEmapMapCurFocusMrkId = null;
//�ޡ��������饹����
var ZdcEmapMapShopMrkClstObj;	<?php // add 2015/10/20 N.Wada ?>
//�ƥܥ���Υ��٥�ȴ���
var ZdcEmapSearchClickFlg = 0;
//�����������
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
	// ������������Υ��ե��åȤ��������ˤ���	mod 2015/10/20 N.Wada
	//printf("ZdcEmapIconOffsetX['%s'] = %d;",$key,ceil($val["W"]/2)*-1);
	//printf("ZdcEmapIconOffsetY['%s'] = %d;",$key,ceil($val["H"]/2)*-1);
	printf("ZdcEmapIconOffsetX['%s'] = %d;",$key,ceil($val["W"]/2));
	printf("ZdcEmapIconOffsetY['%s'] = %d;",$key,ceil($val["H"]/2));
}
?>

var ZdcEmapRouteReverse = 0;	<?php // �롼�Ȼ�����������ո����ˤ���		add 2017/11/14 Y.Matsukawa ?>

//����¾
var ZdcEmapSaveCond = new Array(<?PHP echo $D_SHOP_MAX; ?>);//�ʹ����
<?PHP for($i = 1;$i <= 200;$i ++) if($_VARS["cond".$i]) printf("ZdcEmapSaveCond[%d] = '%s';",$i,$_VARS["cond".$i]); ?>

var QSTRING = location.search.replace(/^\?/, '');

//������ؿ�
<?php //function ZdcEmapInit(init_lat, init_lon, init_lv){		mod 2016/08/16 Y.Matsukawa ?>
function ZdcEmapInit(init_lat, init_lon, init_lv, wgs){
	var i, len;	<?php // add 2016/03/22 N.Wada ?>

	if (!document.getElementById("ZdcEmapMap")) return;

	<?php // add 2015/11/13 N.Wada ?>
	ZdcEmapWindowWidth  = document.body.clientWidth;
	ZdcEmapWindowHeight = document.body.clientHeight;

	if (!init_lv || init_lv == 0) {
		init_lv = <?PHP echo $D_INIT_LVL; ?>;
	}
	init_lv = init_lv - 1;
	
	<?php // add 2016/08/16 Y.Matsukawa [ ?>
	if (wgs) {
		var latlon = new ZDC.LatLon(init_lat, init_lon);
	} else {
	<?php // add 2016/08/16 Y.Matsukawa ] ?>
		var latlon = ZdcEmapTky2Wgs(init_lat, init_lon);
	}
	var latlng = new google.maps.LatLng(latlon.lat, latlon.lon);
	var opts = {
	<?php //mod 2015/10/20 N.Wada
		//zoom: 15,
		//center: latlng,
		//mapTypeId: google.maps.MapTypeId.ROADMAP,
		//maxZoom: 22,
		//minZoom: 5,
		//mapTypeControl: true,
		//navigationControl: true,
		//scaleControl: true,
		//streetViewControl: false
	?>
	<?php //mod 2015/11/26 N.Wada
		 //zoom: 15
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
		<?php /* ,panControl: <?php if (isset($D_GOOGLEMAPS_PAN_CONTROL_INVISIBLE) && $D_GOOGLEMAPS_PAN_CONTROL_INVISIBLE) { ?>false<?php } else { ?>true<?php } ?> del 2016/03/02 N.Wada */?>
		,streetViewControl: false
	<?php } ?>
	};
	ZdcEmapMapObj = new google.maps.Map(document.getElementById("ZdcEmapMap"), opts);
	document.getElementById("ZdcEmapMap").style.visibility = 'visible';

	<?php // ���������Ѥ��ȼ�UI	add 2016/03/23 N.Wada ?>
	<?php if (isset($D_GOOGLEMAPS_EMAP_ORIGINAL_UI) && $D_GOOGLEMAPS_EMAP_ORIGINAL_UI) { ?>
	ZdcEmapOriginalUI(init_lat, init_lon);
	<?php } ?>

	// ���٥�ȥ�
//	google.maps.event.addListener(ZdcEmapMapObj, 'zoom_changed', function() {
//		ZdcEmapEventLog('mapapi_ChangeZoom');
//	});
//	google.maps.event.addListener(ZdcEmapMapObj, 'dragend', function() {
//		ZdcEmapEventLog('mapapi_ChangeLocation');
//	});

	//��e-map�ѥ���ȥ��� --------------------------------
	//�ꥹ��ɽ����
	ZdcEmapListObj  = document.getElementById('ZdcEmapList');
	if(!ZdcEmapListObj) ZdcEmapListObj = document.createElement('DIV');//light�ѥ��ߡ�
	ZdcEmapNekiListObj = ZdcEmapListObj;	<?php // add 2017/02/16 N.Wada ?>
	//������������
	ZdcEmapCondObj = document.getElementById('ZdcEmapCond');
	if(!ZdcEmapCondObj) ZdcEmapCondObj = document.createElement('DIV');//light�ѥ��ߡ�
	//Ź�޾ܺ�ɽ����	add 2015/06/03 N.Wada
	<?php if (isset($D_DETAIL_AJAX) && $D_DETAIL_AJAX) { ?>
	ZdcEmapDetailPopObj = document.getElementById('ZdcEmapDetailPop');
	if(!ZdcEmapDetailPopObj) ZdcEmapDetailPopObj = document.createElement('DIV');//light�ѥ��ߡ�
	<?php } ?>
	//�������ɽ����	add 2015/06/03 N.Wada
	<?php if (isset($D_SEARCH_RESULT_AJAX) && $D_SEARCH_RESULT_AJAX) { ?>
	ZdcEmapSearchPopObj = document.getElementById('ZdcEmapSearchPop');
	if(!ZdcEmapSearchPopObj) ZdcEmapSearchPopObj = document.createElement('DIV');//light�ѥ��ߡ�
	<?php } ?>
	<?php // add 2017/03/06 N.Wada ?>
	//��ȯ��ʣ��FW���ɽ����
	ZdcEmapSrchCombRootDeptObj  = document.getElementById('ZdcEmapSrchCombRootDept');
	if(!ZdcEmapSrchCombRootDeptObj) ZdcEmapSrchCombRootDeptObj = document.createElement('DIV');//light�ѥ��ߡ�
	<?php // add 2017/02/28 N.Wada ?>
	//ʣ��롼�ȷ��ɽ����
	ZdcEmapSrchCombRootResultObj  = document.getElementById('ZdcEmapSrchCombRootResult');
	if(!ZdcEmapSrchCombRootResultObj) ZdcEmapSrchCombRootResultObj = document.createElement('DIV');//light�ѥ��ߡ�

	<?php // add 2015/10/20 N.Wada ?>
	<?php if (isset($D_GOOGLEMAPS_POI_INVISIBLE) && $D_GOOGLEMAPS_POI_INVISIBLE) { ?>
	// POI����������ɽ��
	var mapStylePoiInvisible = new google.maps.StyledMapType([
		{
			 featureType: "poi"
			,elementType: "labels"
			,stylers: [
				{ visibility: "off" }
			]
		}
	], { name: "Poi Invisible" });
	ZdcEmapMapObj.mapTypes.set("poi_invisible", mapStylePoiInvisible);
	ZdcEmapMapObj.setMapTypeId("poi_invisible");
	<?php } elseif (isset($D_GOOGLEMAPS_POI_CLICK_INFOWINDOW_DISABLE) && $D_GOOGLEMAPS_POI_CLICK_INFOWINDOW_DISABLE) { ?>
	// POI��������᤭�Ф�̵��
	<?php
	// del 2017/03/16 Y.Matsukawa [
	//	var set = google.maps.InfoWindow.prototype.set;
	//	google.maps.InfoWindow.prototype.set = function(key, val) {
	//		if (key === "map") {
	//			if (! this.get("noSuppress")) {
	//				return;
	//			}
	//		}
	//		set.apply(this, arguments);
	//	}
	// del 2017/03/16 Y.Matsukawa ] ?>
	<?php // add 2017/04/14 Y.Matsukawa [ ?>
	<?php // POI��������ɽ�� ?>
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
	<?php // add 2017/04/14 Y.Matsukawa ] ?>
	<?php // add 2017/08/03 Y.Matsukawa [ ?>
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
	<?php // add 2017/08/03 Y.Matsukawa ] ?>
	ZdcEmapMapObj.setClickableIcons(false);		<?php // add 2017/03/16 Y.Matsukawa ?>
	<?php } ?>

	<?php // add 2015/10/20 N.Wada ?>
	<?php if (isset($D_GOOGLEMAPS_MSG_CUSTOM) && $D_GOOGLEMAPS_MSG_CUSTOM) { ?>
	// �᤭�Ф��������ޥ���
	userwidgethukidasi = new InfoBox();
		<?php if (isset($D_GOOGLEMAPS_MSG_CUSTOM_OPTION) && $D_GOOGLEMAPS_MSG_CUSTOM_OPTION) { ?>
	userwidgethukidasi.setOptions(<?php echo $D_GOOGLEMAPS_MSG_CUSTOM_OPTION ?>);
		<?php } ?>
	<?php } ?>

	<?php // add 2015/10/20 N.Wada ?>
	<?php if (isset($D_GOOGLEMAPS_MARKER_CLUSTERER) && $D_GOOGLEMAPS_MARKER_CLUSTERER) { ?>
	// �ޡ��������饹����
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

//-------------------------------------------------------------
//�Ͽ�����
//-------------------------------------------------------------
<?php // add 2015/10/20 N.Wada ?>
//�Ͽ޾�˥�������ɽ��
var ZdcEmapMapCurMrkId = null;
//function ZdcEmapMapCursorSet(lat, lon){	mod 2016/03/22 N.Wada
<?php //function ZdcEmapMapCursorSet(lat, lon, iconid, is_cluster){		mod 2016/08/15 Y.Matsukawa ?>
function ZdcEmapMapCursorSet(lat, lon, iconid, is_cluster, wgs){
	//��������κ���
	<?php	// mod 2016/03/22 N.Wada
	//var mrk = ZdcEmapMakeMrkApi2(0, lat, lon, 
	//						ZdcEmapIconW['@SELB'], ZdcEmapIconH['@SELB'],0,0,
	//						ZdcEmapIconOffsetX['@SELB'], ZdcEmapIconOffsetY['@SELB'],0,0,
	//						ZdcEmapIconImg['@SELB'], '',
	//						'', '', '', 0, null, null, null
	//					);
	?>
	var offset_x = ZdcEmapIconOffsetX['@SELB'];
	var offset_y = ZdcEmapIconOffsetY['@SELB'];
	<?php // add 2016/03/22 N.Wada [ ?>
	<?php if (isset($D_ICON_ANCHOR_CENTER_BOTTOM) && $D_ICON_ANCHOR_CENTER_BOTTOM) { // ��������������������������� ?>
	offset_y = Math.ceil(ZdcEmapIconH['@SELB'] + (ZdcEmapIconH[iconid] - ZdcEmapIconH['@SELB']) / 2);
	<?php } ?>
	<?php // add 2016/03/22 N.Wada ] ?>
	var mrk = ZdcEmapMakeMrkApi2(0, lat, lon, 
							ZdcEmapIconW['@SELB'], ZdcEmapIconH['@SELB'],0,0,
							offset_x, offset_y,0,0,
							ZdcEmapIconImg['@SELB'], '',
							'', '', '', 0, null, null, null
							,wgs	<?php // add 2016/08/15 Y.Matsukawa ?>
						);
	<?php /* Google Maps JavaScript API V3�ν񼰤��ѹ�
	//if (ZdcEmapMapShopMrkId[i] != null) ZdcEmapMapObj.removeWidget(ZdcEmapMapCurMrkId);	mod 2011/12/20 Y.Matsukawa
	//if (ZdcEmapMapCurMrkId != null) ZdcEmapMapObj.removeWidget(ZdcEmapMapCurMrkId);
	//ZdcEmapMapObj.addWidget(mrk);
	*/ ?>
	<?php // add 2016/03/01 N.Wada [ ?>
	if (ZdcEmapMapCurMrkId != null) ZdcEmapMapCurMrkId.setMap(null);
	mrk.setMap(ZdcEmapMapObj);
	<?php // add 2016/03/01 N.Wada ] ?>
	ZdcEmapMapCursorRemove();
	ZdcEmapMapCurMrkId = mrk;
}
<?php // add 2015/10/20 N.Wada ?>
//�Ͽ޾�˥�������ɽ��(ID����)
function ZdcEmapMapCursorSetById(id){
	if(ZdcEmapMapShopMrkId[id] != null) {
	<?php if (isset($D_GOOGLEMAPS_MARKER_CLUSTERER) && $D_GOOGLEMAPS_MARKER_CLUSTERER) { ?>
		var mrk = ZdcEmapMapShopMrkId[id];
		var clsts = ZdcEmapMapShopMrkClstObj.getClusters();
		for (var i=0, cl=clsts.length; i<cl; i++) {
			var mrks = clsts[i].getMarkers();
			for (var j=0, ml=mrks.length; j<ml; j++) {
				if (mrk.data1 == mrks[j].data1) {
					var latlng = clsts[i].getCenter();
					var latlon = ZdcEmapWgs2Tky(latlng.lat(), latlng.lng());
					<?php //ZdcEmapMapCursorSet(latlon.lat, latlon.lon);	mod 2016/03/22 N.Wada ?>
					ZdcEmapMapCursorSet(latlon.lat, latlon.lon, mrk.data2, (ml > 1));
					return;
				}
			}
		}
	<?php } else { ?>
		var mrk = ZdcEmapMapShopMrkId[id];
		<?php //ZdcEmapMapCursorSet(mrk.lat, mrk.lon);	mod 2016/03/22 N.Wada ?>
		ZdcEmapMapCursorSet(mrk.lat, mrk.lon, mrk.data2, false);
	<?php } ?>
	}
}
<?php // add 2015/10/20 N.Wada ?>
//�Ͽ޾�Υ������볰��
function ZdcEmapMapCursorRemove(){
	if (ZdcEmapMapCurMrkId != null) {
		//ZdcEmapMapObj.removeWidget(ZdcEmapMapCurMrkId);
		ZdcEmapMapCurMrkId.setMap(null);
		ZdcEmapMapCurMrkId = null;
	}
	//�ܺ�ɽ����
	//ZdcEmapMapFrontShopDetail();//�ܺ٥�����������̤ˤ�äƤ���
}
//�Ͽް�ư
<?php //function ZdcEmapMapMove(lat, lon, lvl){		mod 2016/08/15 Y.Matsukawa ?>
function ZdcEmapMapMove(lat, lon, lvl, wgs){
//	var center = new ZDC.LatLon(Number(lat), Number(lon));
//	ZdcEmapMapObj.moveLatLon(center);
//	if(lvl) ZdcEmapMapObj.setZoom(lvl);
	var latlon = ZdcEmapTky2Wgs(lat, lon);
	if (wgs) latlon = new ZDC.LatLon(lat, lon);		<?php // add 2016/08/15 Y.Matsukawa ?>
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
<?php // add 2016/03/02 N.Wada ?>
//�Ͽް�ư�ʶ����
function ZdcEmapMapMoveBox(minlat,minlon,maxlat,maxlon){
	var latlon_wgs, sw_wgs, ne_wgs;
	// ����������������׻�
	latlon_wgs = ZdcEmapTky2Wgs( minlat, minlon );
	sw_wgs = new google.maps.LatLng(latlon_wgs.lat, latlon_wgs.lon);
	latlon_wgs = ZdcEmapTky2Wgs( maxlat, maxlon );
	ne_wgs = new google.maps.LatLng(latlon_wgs.lat, latlon_wgs.lon);
	// �Ͽޤ�Ĵ��
	ZdcEmapMapObj.fitBounds(new google.maps.LatLngBounds(sw_wgs, ne_wgs));
}
<?php // add 2016/03/02 N.Wada ?>
//�Ͽް�ư�ʶ�����濴�����
function ZdcEmapMapMoveBoxCenterFixed(minlat,minlon,maxlat,maxlon,centerlat,centerlon){
	// �濴����Ǥ�Υ�줿lat��lon�κ�ʬ��׻�
	var lat_delta = Math.max( Math.abs( minlat - centerlat ), Math.abs( maxlat - centerlat ) );
	var lon_delta = Math.max( Math.abs( minlon - centerlon ), Math.abs( maxlon - centerlon ) );
	// �Ͽް�ư
	ZdcEmapMapMoveBox( centerlat-lat_delta, centerlon-lon_delta, centerlat+lat_delta, centerlon+lon_delta )
	// �Ͽް�ư��Υ������
	var center_wgs = ZdcEmapTky2Wgs(centerlat, centerlon);
	ZdcEmapMapObj.setCenter(new google.maps.LatLng(center_wgs.lat, center_wgs.lon));
}

//-------------------------------------------------------------
//��ư�����Υ��٥�ȴ���
//-------------------------------------------------------------
var ZdcEmapSearchEventFlg  = 0;
var ZdcEmapSearchEventFunc = null;
var ZdcEmapSearchEventDragmapend;
var ZdcEmapSearchEventScrollmapend;
var ZdcEmapSearchEventChangezoomend;
var ZdcEmapSearchEventIdle;		<?php // add 2015/10/20 N.Wada ?>
var ZdcEmapSearchEventChangezoomAvailable = 1;
var ZdcEmapSearchEventCenterChangeAvailable = 1;
//�����¹�
function ZdcEmapSearchEventAction() {
	<?php // add 2015/11/13 N.Wada ?>
	ZdcEmapWindowWidth  = document.body.clientWidth;
	ZdcEmapWindowHeight = document.body.clientHeight;

	if(!ZdcEmapSearchEventFlg) return;
<?php	// �Ͽ������˺Ƹ������ʤ��⡼��
		if ($D_SHOP_NO_SEARCH_USER_ACT) { ?>
	return;
<?php	} ?>
	<?php if(isset($print_flg) && $print_flg){ ?>return;<?php } ?>
	if (!ZdcEmapSearchEventCenterChangeAvailable) {
		ZdcEmapSearchEventCenterChangeAvailable = 1;
		return;
	}
	ZdcEmapSearchPoint = null;
	eval(ZdcEmapSearchEventFunc);
}
function ZdcEmapEventDragAction() {
	ZdcEmapSearchEventAction();
}
function ZdcEmapEventScrollAction() {
	ZdcEmapSearchEventAction();
}
function ZdcEmapEventZoomAction() {
	if (!ZdcEmapSearchEventChangezoomAvailable) {
		ZdcEmapSearchEventChangezoomAvailable = 1;
		return;
	}
	ZdcEmapSearchEventAction();
}
//�������٥�ȳ���
function ZdcEmapSearchEventStart() {
	ZdcEmapSearchEventAdd("ZdcEmapSearchShop()");
	ZdcEmapSearchEventFlg = 1;
}
//�������٥�����
function ZdcEmapSearchEventStop() {
	ZdcEmapSearchEventDel();
	ZdcEmapSearchEventFlg = 0;
}

//�������٥���ɲ�
function ZdcEmapSearchEventAdd(func) {
	ZdcEmapSearchEventDel();
	ZdcEmapSearchEventFunc = func;
//	ZdcEmapSearchEventDragmapend    = ZDC.addListener(ZdcEmapMapObj, ZDC.MAP_DRAG_END,   ZdcEmapEventDragAction);
//	ZdcEmapSearchEventScrollmapend  = ZDC.addListener(ZdcEmapMapObj, ZDC.MAP_SCROLL_END, ZdcEmapEventScrollAction);
//	ZdcEmapSearchEventChangezoomend = ZDC.addListener(ZdcEmapMapObj, ZDC.MAP_CHG_ZOOM,   ZdcEmapEventZoomAction);
	<?php  // add 2015/10/20 N.Wada [ ?>
	<?php if (isset($D_GOOGLEMAPS_SEARCH_EVENT_IDLE) && $D_GOOGLEMAPS_SEARCH_EVENT_IDLE) { ?>
	ZdcEmapSearchEventIdle = google.maps.event.addListener(ZdcEmapMapObj, "idle", ZdcEmapEventZoomAction);
	<?php } else { ?>
	<?php  // add 2015/10/20 N.Wada ] ?>
	ZdcEmapSearchEventDragmapend    = google.maps.event.addListener(ZdcEmapMapObj, "center_changed", ZdcEmapEventDragAction);
	ZdcEmapSearchEventChangezoomend = google.maps.event.addListener(ZdcEmapMapObj, "zoom_changed",   ZdcEmapEventZoomAction);
	<?php } ?>
}

//�������٥�Ⱥ��
function ZdcEmapSearchEventDel() {
//	if(ZdcEmapSearchEventDragmapend)    ZDC.removeListener(ZdcEmapSearchEventDragmapend);
//	if(ZdcEmapSearchEventScrollmapend)  ZDC.removeListener(ZdcEmapSearchEventScrollmapend);
//	if(ZdcEmapSearchEventChangezoomend) ZDC.removeListener(ZdcEmapSearchEventChangezoomend);
	<?php  // add 2015/10/20 N.Wada [ ?>
	<?php if (isset($D_GOOGLEMAPS_SEARCH_EVENT_IDLE) && $D_GOOGLEMAPS_SEARCH_EVENT_IDLE) { ?>
	if(ZdcEmapSearchEventIdle) google.maps.event.removeListener(ZdcEmapSearchEventIdle);
	<?php } else { ?>
	<?php  // add 2015/10/20 N.Wada ] ?>
	if(ZdcEmapSearchEventDragmapend)    google.maps.event.removeListener(ZdcEmapSearchEventDragmapend);
	if(ZdcEmapSearchEventChangezoomend) google.maps.event.removeListener(ZdcEmapSearchEventChangezoomend);
	<?php } ?>
	
	ZdcEmapSearchEventDragmapend = null;
	ZdcEmapSearchEventScrollmapend = null;
	ZdcEmapSearchEventChangezoomend = null;
	ZdcEmapSearchEventIdle = null;		<?php // add 2015/10/20 N.Wada ?>
	<?php //delete ZdcEmapSearchEventFunc;	mod 2017/03/05 N.Wada ?>
	ZdcEmapSearchEventFunc = null;
}
//�ܥ��󲡲�����Ƚ��
function ZdcEmapButtonNG() {
	if(ZdcEmapReadCheck()) return 1;//�ɤ߹������ư�����

	return 0;
}
//�ɤ߹�����ե饰
var ZdcEmapReading = 0;//�ɤ߹����桦������ե饰
function ZdcEmapReadOn() {
	ZdcEmapReading ++;
	//if(ZdcEmapReading == 1) ZdcEampVisibleWait();	<?php // add 2015/11/13 N.Wada ?>
	
}
function ZdcEmapReadOff() {
	if(ZdcEmapReading <= 0) return;
	ZdcEmapReading --;
	//if(ZdcEmapReading == 0) ZdcEampHiddenWait();	<?php // add 2015/11/13 N.Wada ?>
	
}
function ZdcEmapReadCheck() {
	if(ZdcEmapReading > 0) return 1;//�ɤ߹������ư�����
	return 0;
}
<?php // add 2015/11/13 N.Wada ?>
function ZdcEampVisibleWait() {
	var wait = document.getElementById("ZdcEmapWait");
	if (!wait) return;
	wait.style.left   = (ZdcEmapWindowWidth / 2 + (<?php echo $D_MAP_WAIT_OFFSETX; ?>))+'px';
	wait.style.top    = (ZdcEmapWindowHeight / 2 + (<?php echo $D_MAP_WAIT_OFFSETY; ?>))+'px';
	//	wait.style.width  = <?php echo $D_WAIT_MSG_PIX_W; ?>;
	//	wait.style.height = <?php echo $D_WAIT_MSG_PIX_H; ?>;
	wait.style.display = "block";
}
<?php // add 2015/11/13 N.Wada ?>
function ZdcEampHiddenWait() {
	var wait = document.getElementById("ZdcEmapWait");
	if (!wait) return;
	//	wait.style.width  = 0;
	//	wait.style.height = 0;
	wait.style.display = "none";
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
						wgs		<?php // add 2016/08/15 Y.Matsukawa ?>
						) {
	var mrk;
	var w;
	var h;
	var latlon_wgs = ZdcEmapTky2Wgs(lat, lon);
	var lat_wgs = latlon_wgs.lat;
	var lon_wgs = latlon_wgs.lon;
	var latlon = new ZDC.LatLon(lat, lon);
	var iconimage;
	
	<?php // add 2016/08/15 Y.Matsukawa [ ?>
	if (wgs) {
		lat_wgs = lat;
		lon_wgs = lon;
	}
	<?php // add 2016/08/15 Y.Matsukawa ] ?>
	
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
	
	if (newimage) {
//		//��������κ�����new��������ͭ��ξ���
//		mrk = new ZDC.Marker(latlon,{
//			/* �ޡ����Υ������˹�碌�ư��֤�Ĵ������ */
//			offset: new ZDC.Pixel(offsetx, offsety),
//			contentOffset: new ZDC.Pixel(newoffsetx, newoffsety),
//			custom: {
//				base : {
//					src: iconimage,
//					imgSize: ZDC.WH(sizew, sizeh)
//				},
//				content : {
//					src: newimage,
//					imgSize: ZDC.WH(newsizew, newsizeh)
//				}
//			}
//		});
	} else {
		//��������κ������̾��
		//		mrk = new ZDC.Marker(latlon,{
		//			/* �ޡ����Υ������˹�碌�ư��֤�Ĵ������ */
		//			offset: new ZDC.Pixel(offsetx, offsety),
		//			custom: {
		//				base : {
		//					src: iconimage,
		//					imgSize: ZDC.WH(sizew, sizeh)
		//				}
		//			}
		//		});
		mrk = new google.maps.Marker({
			<?php //map : ZdcEmapMapObj,	del 2016/03/01 N.Wada ?>
			//icon : iconimage,
			<?php // add 2015/06/03 N.Wada [ ?>
			<?php if (isset($D_GOOGLEMAPS_ICON_CUSTOM) && $D_GOOGLEMAPS_ICON_CUSTOM) { ?>
			<?php // mod 2015/10/20 N.Wada [
			//icon : iconimage,
			?>
			icon : new google.maps.MarkerImage(
				iconimage,
				new google.maps.Size(sizew, sizeh),
				new google.maps.Point(0, 0),
				new google.maps.Point(offsetx, offsety)
			),
			optimized : false,	<?php // ���˥᡼�����GIF��ͭ���� ?>
			<?php // mod 2015/10/20 N.Wada ] ?>
			<?php } ?>
			<?php // add 2015/06/03 N.Wada ] ?>
			position : new google.maps.LatLng(lat_wgs, lon_wgs)
		});
	}
	
	
	//�ޡ������δ��ܾ���
	mrk.id     = id;
	mrk.data1  = data1;
	mrk.data2  = data2;
	mrk.nflg   = nflg;
	mrk.lat    = lat;
	mrk.lon    = lon;
	if (lvl) mrk.lvl = lvl;
	
	//����å����Υ��٥����Ͽ
	if (mouseclickmarker) {
		//�᤭�Ф��ƥ������ѥ��󥫡����٥��
		//ZDC.addListener(mrk, ZDC.MARKER_CLICK, mouseclickmarker);
		google.maps.event.addListener(mrk, "click", mouseclickmarker);
	}

	return mrk;
}

//-------------------------------------------------------------
//�롼��õ��
//-------------------------------------------------------------
var ZdcEmapRouteType = null;	<?php //�롼�ȼ����1:��Լ�/2:��ư�֡�	add 2016/03/08 N.Wada ?>
var ZdcEmapRouteCase = null;	<?php //�롼�Ƚ�ȯ�ϡ�free:Ǥ�դ�����/myloc:������/eki:�ء�	add 2016/03/08 N.Wada ?>
var ZdcEmapRoutePoint1 = null;
var ZdcEmapRoutePoint2 = null;
var ZdcEmapRouteSearchShopDetailEventClicked = null;
var ZdcEmapRoutePolyline = [];
var ZdcEmapRoutePolylineBus = [];	<?php // add 2018/06/18 N.Wada ?>
var ZdcEmapRouteStartFlag;
var ZdcEmapRouteEndFlag;
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
<?php //function ZdcEmapRouteSearchMyLoc(e_lat, e_lon) {		mod 2017/02/20 N.Wada ?>
function ZdcEmapRouteSearchMyLoc(e_lat, e_lon, wgs) {
	if (!ZdcEmapMyLocation) return;
	<?php //ZdcEmapRouteSearch(ZdcEmapMyLocation.lat, ZdcEmapMyLocation.lon, e_lat, e_lon);		mod 2017/02/20 N.Wada ?>
	ZdcEmapRouteSearch(ZdcEmapMyLocation.lat, ZdcEmapMyLocation.lon, e_lat, e_lon, wgs);
}
<?php // add 2016/03/08 N.Wada ?>
<?php //function ZdcEmapRouteSearch(s_lat, s_lon, e_lat, e_lon) {		mod 2017/02/20 N.Wada ?>
function ZdcEmapRouteSearch(s_lat, s_lon, e_lat, e_lon, wgs) {
	if(ZdcEmapButtonNG()) return;
	if(ZdcEmapRouteType == 0) return;
	ZdcEmapRouteClear();

	//�ѥ�᡼����������
	ZdcEmapRoutePoint1 = new ZDC.LatLon(s_lat, s_lon);
	ZdcEmapRoutePoint2 = new ZDC.LatLon(e_lat, e_lon);
	
	if (!ZdcEmapRouteType) ZdcEmapRouteType = 1;
	
	if(ZdcEmapRouteType == 1)
		<?php //ZdcEmapRouteSearchWalkApi2(ZdcEmapRoutePoint1, ZdcEmapRoutePoint2);		mod 2017/02/20 N.Wada ?>
		ZdcEmapRouteSearchWalkApi2(ZdcEmapRoutePoint1, ZdcEmapRoutePoint2, wgs);
	if(ZdcEmapRouteType == 2)
		<?php //ZdcEmapRouteSearchCarApi2(ZdcEmapRoutePoint1, ZdcEmapRoutePoint2);		mod 2017/02/20 N.Wada ?>
		ZdcEmapRouteSearchCarApi2(ZdcEmapRoutePoint1, ZdcEmapRoutePoint2, wgs);
	<?php // add 2018/05/17 N.Wada ?>
	if(ZdcEmapRouteType == 3)
		ZdcEmapRouteSearchCarApi2(ZdcEmapRoutePoint1, ZdcEmapRoutePoint2, wgs, 1);
}
<?php // add 2016/03/08 N.Wada ?>
// ��Լԥ롼�ȸ���(API2.0��)
<?php //function ZdcEmapRouteSearchWalkApi2(p1,p2) {		mod 2017/02/20 N.Wada ?>
function ZdcEmapRouteSearchWalkApi2(p1, p2, wgs) {
	ZdcEmapReadOn();
	
	/* �������������ΰ��ٷ��� */
	from = p1;
	/* �����������ΰ��ٷ��� */
	to   = p2;
<?php // add 2017/11/14 Y.Matsukawa [ ?>
<?php // �롼�Ȥ�ո����ˤ��� ?>
	if (ZdcEmapRouteReverse) {
		from = p2;
		to   = p1;
	}
<?php // add 2017/11/14 Y.Matsukawa ] ?>

	/* ��ԼԤ�®����80m/min�Ȥ��� */
	var walk_speed = 80;
	var datum = 'TOKYO'; if (wgs) datum = 'WGS84';		<?php // add 2017/02/20 N.Wada ?>
	
	ZDC.Search.getRouteByWalk({
		from: from,
		to: to
		, datum: datum		<?php // add 2017/02/20 N.Wada ?>
		<?php if (!$D_ROUTE_EKI_EXIT) { ?>, station: "bothoff"<?php } ?>
	},function(status, res) {
		if (status.code == '000') {
			/* �������� */
			<?php //ZdcEmapRouteWrite(status, res, 1);		mod 2017/02/20 N.Wada ?>
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
				<?php //ZdcEmapRouteSearchCarApi2(ZdcEmapRoutePoint1,ZdcEmapRoutePoint2);	mod 2017/02/20 N.Wada ?>
				ZdcEmapRouteSearchCarApi2(ZdcEmapRoutePoint1, ZdcEmapRoutePoint2, wgs);
			} else {
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
<?php //function ZdcEmapRouteSearchCarApi2(p1,p2) {		mod 2017/02/20 N.Wada ?>
<?php //function ZdcEmapRouteSearchCarApi2(p1, p2, wgs) {		mod 2018/05/17 N.Wada ?>
function ZdcEmapRouteSearchCarApi2(p1, p2, wgs, localroad) {
	ZdcEmapReadOn();
	
	/* �������������ΰ��ٷ��� */
	from = p1;
	/* �����������ΰ��ٷ��� */
	to   = p2;
	var datum = 'TOKYO'; if (wgs) datum = 'WGS84';		<?php // add 2017/02/20 N.Wada ?>
	var toll = true; if (localroad) toll = false;		<?php // add 2018/05/17 N.Wada ?>
	
	ZDC.Search.getRouteByDrive({
		from: from,
		to: to
		, datum: datum		<?php // add 2017/02/20 N.Wada ?>
		, toll: toll		<?php // add 2018/05/17 N.Wada ?>
	},function(status, res) {
		if (status.code == '000') {
			/* �������� */
			<?php //ZdcEmapRouteWrite(status, res, 2);		mod 2017/02/20 N.Wada ?>
			ZdcEmapRouteWrite(status, res, 2, wgs);
		} else {
			/* �������� */
			alert('<?PHP echo $D_MSG_ERR_JS_ROUTE; ?> [' + status.code + ']');
			// �롼�ȸ�����λ
			ZdcEmapReadOff();
		}
	});
}
<?php // add 2016/03/08 N.Wada ?>
// �롼������
<?php //function ZdcEmapRouteWrite(status, res, stype) {	mod 2017/02/20 N.Wada ?>
function ZdcEmapRouteWrite(status, res, stype, wgs) {
	<?php /* ����������Ȥ�	del 2016/03/08 N.Wada
	//var guyde_type = {
	//	'start': {
	//		custom: {
	//			base: {
	//				src: '<?PHP echo $D_ROUTE_START_IMAGE; ?>',
	//				imgSize: new ZDC.WH(35, 35),
	//				imgTL: new ZDC.TL(0, 0)
	//			}
	//		},
	//		offset: ZDC.Pixel(-5, -36)
	//	},
	//	'end': {
	//		custom: {
	//			base: {
	//				src: '<?PHP echo $D_ROUTE_GOAL_IMAGE; ?>',
	//				imgSize: new ZDC.WH(35, 35),
	//				imgTL: new ZDC.TL(0, 0)
	//			}
	//		},
	//		offset: ZDC.Pixel(-5, -36)
	//	}
	//};
	//
	//var line_property = {
	//	//��Լ���
	//	'�̾���ϩ': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
	//	'������ƻ': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
	//	'������ϩ': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
	//	'��ƻ��': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
	//	'Ƨ������ϩ': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
	//	'Ϣ����ϩ': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
	//	'��ʪ����ϩ': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
	//	'��������ϩ': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
	//	'�费���': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
	//	'��ϩ��': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
	//	'�������ߥ��': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
	//	//��ư����
	//	'��®ƻϩ': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
	//	'�ԻԹ�®ƻϩ': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
	//	'��ƻ': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
	//	'��������ƻ': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
	//	'��ƻ�ܸ�ƻ': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
	//	'����ƻϩ(����)': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
	//	'����ƻϩ(����¾)': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
	//	'Ƴ��ϩ': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
	//	'�ٳ�ϩ(����)': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
	//	'�ٳ�ϩ(�ܺ�)': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
	//	'�ե��꡼��ϩ': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
	//	'ƻϩ��': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'}
	//};
	*/ ?>

	/* �������Ȥȥ�����Υ���������Ͽޤ˽ž����ޤ� */
	<?php /* Google Maps JavaScript API V3�ν񼰤��ѹ�
	//ZdcEmapRouteStartFlag = new ZDC.Marker(from,guyde_type['start']);
	//ZdcEmapRouteEndFlag   = new ZDC.Marker(to,guyde_type['end']);
	*/ ?>
	ZdcEmapRouteClear();
	var latlon_wgs;
	<?php //latlon_wgs = ZdcEmapTky2Wgs(from.lat,from.lon);		del 2017/02/20 N.Wada ?>
	<?php // add 2017/02/20 N.Wada [ ?>
	if (wgs) {
		latlon_wgs = new ZDC.LatLon(from.lat,from.lon);
	} else {
		latlon_wgs = ZdcEmapTky2Wgs(from.lat,from.lon);
	}
	<?php // add 2017/02/20 N.Wada ] ?>
	<?php // add 2017/11/14 Y.Matsukawa [ ?>
	<?php // �롼�Ȥ�ո����ˤ��� ?>
	if (ZdcEmapRouteReverse) {
		ZdcEmapRouteReverse = 0;
		if (wgs) {
			latlon_wgs = new ZDC.LatLon(to.lat,to.lon);
		} else {
			latlon_wgs = ZdcEmapTky2Wgs(to.lat,to.lon);
		}
	}
	<?php // add 2017/11/14 Y.Matsukawa ] ?>
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
	<?php //latlon_wgs = ZdcEmapTky2Wgs(to.lat,to.lon);		del 2017/02/20 N.Wada ?>
	<?php // add 2017/02/20 N.Wada [ ?>
	if (wgs) {
		latlon_wgs = new ZDC.LatLon(to.lat,to.lon);
	} else {
		latlon_wgs = ZdcEmapTky2Wgs(to.lat,to.lon);
	}
	<?php // add 2017/02/20 N.Wada ] ?>
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
	<?php /* Google Maps JavaScript API V3�ν񼰤��ѹ�
	//ZdcEmapRouteStartFlag.setZindex(110);
	//ZdcEmapRouteEndFlag.setZindex(110);
	*/ ?>
	ZdcEmapRouteStartFlag.setZIndex(110);
	ZdcEmapRouteEndFlag.setZIndex(110);

	<?php /* Google Maps JavaScript API V3�ν񼰤��ѹ�
	//ZdcEmapMapObj.addWidget(ZdcEmapRouteStartFlag);
	//ZdcEmapMapObj.addWidget(ZdcEmapRouteEndFlag);
	*/ ?>
	ZdcEmapRouteStartFlag.setMap(ZdcEmapMapObj);
	ZdcEmapRouteEndFlag.setMap(ZdcEmapMapObj);

	var link = res.route.link;
	
	//var latlons = [];
	var latlngbounds_wgs = new google.maps.LatLngBounds();	<?php // add 2016/03/08 N.Wada ?>
	for (var i=0, j=link.length; i<j; i++) {
		
		<?php // ����������Ȥ�	mod 2016/03/08 N.Wada [
		//if (stype == 1) {
		//	var opt = line_property[link[i].type.replace(/^\s+|\s+$/g, "")];
		//} else {
		//	var opt = line_property[link[i].roadType.replace(/^\s+|\s+$/g, "")];
		//}
		?>
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
		<?php // mod 2016/03/08 N.Wada ] ?>
		<?php /* Google Maps JavaScript API V3�ν񼰤��ѹ�
		//var pl = new ZDC.Polyline([], opt);
		//
		//for (var k=0, l=link[i].line.length; k<l; k++) {
		//	pl.addPoint(link[i].line[k]); 
		//	
		//	latlons[i] = link[i].line[0];
        //
		//	if(i == j-1 && k == 1) {
		//		latlons[i+1] = link[i].line[1];
		//	}
		//}
		//ZdcEmapMapObj.addWidget(pl);
		*/ ?>
		var pl = new google.maps.Polyline(opt);
		
		var path = [];
		for (var k=0, l=link[i].line.length; k<l; k++) {
			<?php //latlon_wgs = ZdcEmapTky2Wgs(link[i].line[k].lat,link[i].line[k].lon);		del 2017/02/20 N.Wada ?>
			<?php // add 2017/02/20 N.Wada [ ?>
			if (wgs) {
				latlon_wgs = new ZDC.LatLon(link[i].line[k].lat,link[i].line[k].lon);
			} else {
				latlon_wgs = ZdcEmapTky2Wgs(link[i].line[k].lat,link[i].line[k].lon);
			}
			<?php // add 2017/02/20 N.Wada ] ?>
			path[k] = new google.maps.LatLng(latlon_wgs.lat, latlon_wgs.lon);
			latlngbounds_wgs.extend( path[k] );	<?php // add 2016/03/08 N.Wada ?>
		}
		pl.setPath(path);
		pl.setMap(ZdcEmapMapObj);
		ZdcEmapRoutePolyline[i] = pl;
	}
	/* ����������ɽ���Ǥ���̼ܥ�٥����� */
	<?php /* Google Maps JavaScript API V3�ν񼰤��ѹ�
	var adjust = ZdcEmapMapObj.getAdjustZoom(latlons);
	ZdcEmapMapObj.moveLatLon(adjust.latlon);
	ZdcEmapMapObj.setZoom(adjust.zoom);
	*/ ?>
	ZdcEmapMapObj.fitBounds(latlngbounds_wgs);	<?php // add 2016/03/08 N.Wada ?>
	
	// �롼�ȸ�����λ
	ZdcEmapReadOff();

};

<?php // add 2017/02/23 N.Wada ?>
// �ʥӥ��������ID�ˤ��ʣ��롼�Ⱦܺټ���(API2.0��)
function ZdcEmapRouteCombGetByNaviID(naviid, wgs) {
	ZdcEmapReadOn();
	ZdcEmapRouteClear();

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
<?php // add 2017/02/23 N.Wada ?>
// ʣ��롼������(API2.0��)
<?php //function ZdcEmapRouteCombWrite(status, res, wgs) {	mod 2018/06/18 N.Wada ?>
function ZdcEmapRouteCombWrite(status, res, wgs, naviid) {
	ZdcEmapShopMsgClose();
	ZdcEmapRouteClear();
	
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
							var bus_s = new ZDC.LatLon(navi_sections[i].line[0].lat, navi_sections[i].line[0].lon);
							var bus_e = new ZDC.LatLon(navi_sections[i].line[navi_sections[i].line.length-1].lat, navi_sections[i].line[navi_sections[i].line.length-1].lon);
							var pl = new google.maps.Polyline(opt);
							var path = [];
							<?php if ($D_SEARCH_COMB_ROUTE_BUS_API == 'js') { // js¦�ǥХ��롼�Ȥ���� ?>
							if (bus_latlons.length <=<?PHP echo $D_ROUTE_DRIVE_WAY_POINT_MAX; ?>) {
								// ��ư�֥롼��õ�����緿�֡ˤ�����
								var datum = 'TOKYO'; if (wgs) datum = 'WGS84';
								var mpoints = [];
								for (var k=0, l=bus_latlons.length; k<l; k++) {
									mpoints[k] = new ZDC.LatLon(bus_latlons[k].lat, bus_latlons[k].lon);
								}
								ZDC.Search.getRouteByDrive({
									from: bus_s,
									to: bus_e,
									mpoints: mpoints,
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
			<?php /* Google Maps JavaScript API V3�ν񼰤��ѹ�
			//ZdcEmapMapObj.removeWidget(ZdcEmapRoutePolyline[i]);
			*/ ?>
			ZdcEmapRoutePolyline[i].setMap(null);
			<?php //delete ZdcEmapRoutePolyline[i];	del 2017/03/05 N.Wada ?>
		}
	}
	ZdcEmapRoutePolyline = [];	<?php // add 2017/03/05 N.Wada ?>
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
		<?php /* Google Maps JavaScript API V3�ν񼰤��ѹ�
		//ZdcEmapMapObj.removeWidget(ZdcEmapRouteStartFlag);
		*/ ?>
		ZdcEmapRouteStartFlag.setMap(null);
		<?php //delete ZdcEmapRouteStartFlag;	mod 2017/03/05 N.Wada ?>
		ZdcEmapRouteStartFlag = null;
	}
	if(ZdcEmapRouteEndFlag){
		<?php /* Google Maps JavaScript API V3�ν񼰤��ѹ�
		//ZdcEmapMapObj.removeWidget(ZdcEmapRouteEndFlag);
		*/ ?>
		ZdcEmapRouteEndFlag.setMap(null);
		<?php //delete ZdcEmapRouteEndFlag;	mod 2017/03/05 N.Wada ?>
		ZdcEmapRouteEndFlag = null;
	}
}


//-------------------------------------------------------------
//�Ͽ�UI
//-------------------------------------------------------------
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
	mapControlAdd(elmMoveMyLoc, google.maps.ControlPosition.RIGHT_BOTTOM);
	mapControlAdd(elmInitPos,   google.maps.ControlPosition.RIGHT_TOP);
	mapControlAdd(elmSrchRoute, google.maps.ControlPosition.LEFT_TOP);

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

//-------------------------------------------------------------
//����¾
//-------------------------------------------------------------
//HTML�ɤ߹�����ajax�̿��ؿ�
function ZdcEmapHttpRequestHtml(url, func, nowaitmsg, typ) {
	if(!nowaitmsg) ZdcEmapReadOn();//�ɤ߹�����ե饰on
	if(typ == undefined) typ = 1;
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
	},<?PHP echo $D_AJAX_TIMEOUT; ?>,typ);
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
	if ("<?PHP echo $D_LOG_FREE_PARM; ?>") {
		url += "&freeparm=<?php echo $D_LOG_FREE_PARM; ?>";
	}

	var httpReq = new ZdcEmapHttpRequest('EUC', 'EUC');

	httpReq.request(url, function(reference_text,status){
	}, 60000);
}

var ZdcEmapBeforeAddOptHisHTML = "";		<?php // add 2017/03/28 Y.Matsukawa ?>
<?php // �ѥ󤯤���ưŪ���ɲáʺǲ����ء�		add 2016/03/03 N.Wada ?>
<?php //function ZdcEmapAddOptionalHistory(name) {		mod 2017/03/28 Y.Matsukawa ?>
function ZdcEmapAddOptionalHistory(name, lasturl) {
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
			if (i == cnt && lasturl) url = lasturl;		<?php // add 2017/03/28 Y.Matsukawa ?>
			if (idx > 1) his += "\t\t\t&nbsp;&gt;&nbsp;\t\t";
			his += '<a href="'+url+'">'+nm+'</a>';
		}
	}
	his += "\t\t\t&nbsp;&gt;&nbsp;\t\t";
	his += name;
	obj = document.getElementById("history");
	if (!obj) return;
	if (!ZdcEmapBeforeAddOptHisHTML) ZdcEmapBeforeAddOptHisHTML = obj.innerHTML;		<?php // add 2017/03/28 Y.Matsukawa ?>
	obj.innerHTML = his;
}
<?php // �ѥ󤯤��ɲä򸵤��᤹		add 2017/03/28 Y.Matsukawa ?>
function ZdcEmapRemoveOptionalHistory() {
	if (ZdcEmapBeforeAddOptHisHTML) {
		var obj = document.getElementById("history");
		if (!obj) return;
		obj.innerHTML = ZdcEmapBeforeAddOptHisHTML;
		ZdcEmapBeforeAddOptHisHTML = "";
	}
}
<?php // �Х���ΰ��ٷ�����¸		add 2018/06/18 N.Wada ?>
function ZdcEmapSetBusLatlons(type) {
	var key = (type == "print" ? 'bus_latlons_all_print' : 'bus_latlons_all');
	var val = document.getElementById(key).value;
	sessionStorage.removeItem(key);
	sessionStorage.setItem(key, val);
}
<?php // �Х���ΰ��ٷ��ټ���		add 2018/06/18 N.Wada ?>
function ZdcEmapGetBusLatlonsByNaviId(naviid) {
	if (sessionStorage.getItem('bus_latlons_all')) {
		var bus_latlons_all = JSON.parse(sessionStorage.getItem('bus_latlons_all'));
		if (bus_latlons_all[naviid]) {
			return bus_latlons_all[naviid];
		}
	}
	if (sessionStorage.getItem('bus_latlons_all_print')) {
		var bus_latlons_all_print = JSON.parse(sessionStorage.getItem('bus_latlons_all_print'));
		if (bus_latlons_all_print[naviid]) {
			return bus_latlons_all_print[naviid];
		}
	}
	return undefined;
}
