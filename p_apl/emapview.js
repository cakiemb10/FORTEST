<?PHP
// ------------------------------------------------------------
// 地図制御javasctipt メイン
// 
// 開発履歴
// 2011/10/15 Y.Matsukawa	新規作成
// 2011/12/13 Y.Matsukawa	フキダシClose後に最寄り検索されなくなるので、フキダシ表示中も検索するように変更
// 2011/12/19 Y.Matsukawa	地図表示時、最寄り検索が２回実行される
// 2011/12/27 H.osamoto		セブンミール業務支援用処理追加
// 2012/01/31 Y.Matsukawa	レイヤー指定
// 2012/02/20 H.osamoto		APIイベントログ出力に自由項目(freeprm)を追加
// 2012/03/16 Y.Matsukawa	【不具合修正】ルート探索スクリプトエラー
// 2012/03/19 Y.Matsukawa	地図コントローラのタイプを変更可能に
// 2012/04/02 K.Masuda		地図中心点取得関数追加、地図中心マーク追加
// 2012/08/17 Y.Matsukawa	ルート探索駅出口考慮なしをデフォルト化
// 2012/08/27 Y.Matsukawa	Light対応（不具合修正）
// 2012/09/07 Y.Matsukawa	「&」を含む値を任意パラメータに指定した場合、nlist.htmに不正な値が渡される
// 2012/11/06 H.Osamoto		SEJキャンペーン対応
// 2013/06/03 Y.Matsukawa	出発地指定ルート固定表示
// 2013/08/22 Y.Matsukawa	地図なし店舗詳細対応
// 2014/09/08 H.Osamoto		地図表示縮尺範囲制限機能追加
// 2014/10/06 Y.Matsukawa	連番アイコン
// 2014/10/08 Y.Matsukawa	最寄り駅からの任意距離の円表示
// 2014/10/15 Y.Matsukawa	連番アイコン画像版
// 2015/01/28 Y.Matsukawa	最寄駅、最寄施設などをパンくずに追加
// 2015/04/08 F.Yokoi		ルート検索の歩行者/自動車切り替えフラグ追加
//							歩行者ルート検索取得失敗時のアラート表示機能追加
//							地図上へのルート距離・時間の表示機能追加
// 2015/04/23 H.Osamoto		検索中に絞り込み条件無効化とマウスカーソル変更処理追加
// 2015/05/01 Y.Matsukawa	セブン&アイOMNI専用最寄り検索
// 2015/05/14 Y.Matsukawa	condをnmap/shop_dtlに直接記述（cond.htm未使用）モード
// 2015/07/10 Y.Uesugi		レイヤー指定追加
// 2015/09/17 F.Yokoi		アイコン登録(API2.0用)にマウスアウト時の処理指定追加
// 2016/01/08 Y.Uesugi		地図中心マークの画像の変更機能追加
// 2016/04/21 H.Osamoto		縮尺によるアイコン表示制御を削除
// 2016/07/11 H.Yasunaga	711OMNI2(店舗タブ)用カスタマイズ 地図コントロールの変数追加
// 2016/08/25 Y.Uesugi		ルートにマーカ表示を追加
// 2016/09/29 Y.Uesugi		ルート検索のデフォルト設定を追加
// 2016/10/03 Y.Uesugi		VICS対応 地図重畳
// 2016/10/11 Y.Uesugi		VICS対応 マップタイプ(ZDC.MAPTYPE_FLAT_COLOR)追加
// 2017/03/13 K.Tani		地図中心マーク画像offset指定
// ------------------------------------------------------------
require_once('/home/emap/src/p/inc/define.inc');
require_once('/home/emap/src/p/inc/define_get_icon.inc');
?>

//-------------------------------------------------------------
//初期設定
//-------------------------------------------------------------
var ZdcEmapDisableReSearch = false;	<?php // add 2014/12/14 Y.Matsukawa ?>
//地図
var ZdcEmapMapObj = null;
var ZdcEmapMapUsrctl = null;
var ZdcEmapMapZoomctl = null;
//ユーザーレイヤー
var ZdcEmapMapUserLyrId = null;
//マーカー記憶
var ZdcEmapMapShopMrkId = new Array(<?PHP echo $D_SHOP_MAX; ?>);
var ZdcEmapMapShopMrkCnt = null;
var ZdcEmapMapPoiMrkId = new Array(<?PHP echo $D_POI_MAX; ?>);
var ZdcEmapMapPoiMrkCnt = null;
var ZdcEmapMapShopDetailMrkId = null;
var ZdcEmapMapCurFocusMrkId = null;
var ZdcEmapMapSearchPoint = null; // add 2011/12/27 H.osamoto
//吹き出し
//小窓
var ZdcEmapListObj;
var ZdcEmapDetailObj;
var ZdcEmapCondObj;
var ZdcEmapCondStaticObj;		<?php // add 2015/05/14 Y.Matsukawa ?>
var ZdcEmapFRouteStaticObj;		<?php //出発地指定ルート固定表示		add 2013/06/03 Y.Matsukawa ?>
var ZdcEmapRouteCase = '';		<?php //ルート種類（eki/free）		add 2013/06/03 Y.Matsukawa ?>
//Myエリア追加用表示エリア
var ZdcEmapMyareaWrapperObj;
//各ボタンのイベント管理
var ZdcEmapSearchClickFlg = 0;
//アイコン情報
var ZdcEmapIconImg = new Array();
var ZdcEmapIconW = new Array();
var ZdcEmapIconH = new Array();
var ZdcEmapIconOffsetX = new Array();
var ZdcEmapIconOffsetY = new Array();
// 地図緯度経度
var mappoint;
var widget2,widget3;	// add 2012/04/02 K.Masuda
var detailflg;	// add 2012/11/06 H.osamoto
var printflg;	// add 2012/11/06 H.osamoto

<?php 
// add start 2016/07/11 H.Yasunaga 711OMNI2用カスタマイズ [
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

//その他
var ZdcEmapSaveCond = new Array(<?PHP echo $D_SHOP_MAX; ?>);//絞込条件
<?PHP for($i = 1;$i <= 200;$i ++) if($_VARS["cond".$i]) printf("ZdcEmapSaveCond[%d] = '%s';",$i,$_VARS["cond".$i]); ?>

var QSTRING = location.search.replace(/^\?/, '');

//初期化関数
function ZdcEmapInit(init_lat, init_lon, init_lv){
	if (!document.getElementById('ZdcEmapMap')) return;		<?php // add 2013/08/22 Y.Matsukawa ?>
	//地図の基本設定 ----------------------------------------
	var svrurl = "<?PHP echo $D_JS_SVRURL; ?>";
	//初期位置
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
	//	// 地図上でのホイール操作を無効にする
	//	var ua = navigator.userAgent, we,
	//	map = document.getElementById('ZdcEmapMap'); //地図を表示するdiv要素
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
	// 地図ダブルクリックでスクロール
	ZDC.addListener(ZdcEmapMapObj, ZDC.MAP_DBLCLICK, ZdcEmapMoveLatLon);
	ZDC.addListener(ZdcEmapMapObj, ZDC.MAP_CHG_ZOOM, ZdcEmapMapEventLogZoom);
	ZDC.addListener(ZdcEmapMapObj, ZDC.MAP_CHG_LATLON, ZdcEmapMapEventLogLoc);
	
	//各e-map用コントロール --------------------------------
	//リスト表示部
	ZdcEmapListObj  = document.getElementById('ZdcEmapList');
	if(!ZdcEmapListObj) ZdcEmapListObj = document.createElement('DIV');//light用ダミー
	//検索条件指定部
	ZdcEmapCondObj = document.getElementById('ZdcEmapCond');
	if(!ZdcEmapCondObj) ZdcEmapCondObj = document.createElement('DIV');//light用ダミー
	<?php // add 2015/05/14 Y.Matsukawa [ ?>
	ZdcEmapCondStaticObj = document.getElementById('ZdcEmapCondStatic');
	if(!ZdcEmapCondStaticObj) ZdcEmapCondStaticObj = document.createElement('DIV');//light用ダミー
	<?php // add 2015/05/14 Y.Matsukawa ] ?>
	//出発地指定ルート固定表示		add 2013/06/03 Y.Matsukawa
	ZdcEmapFRouteStaticObj = document.getElementById('ZdcEmapFRouteStatic');

	//その他 -----------------------------------------------
	//スケールバー
	<?php	if ($D_MAP_SCALEBAR) {		// add 2012/03/16 Y.Matsukawa ?>
	widgetScaleBar = new ZDC.ScaleBar();
	ZdcEmapMapObj.addWidget(widgetScaleBar);
	<?php	} ?>
	//標準コントロール
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
<?php	// add start 2016/07/11 H.Yasunaga 711OMNI2用カスタマイズ [ ?>
<?php	if (isset($D_711OMNI2) == true) { ?>
	controlWidget = widget;
<?php	} ?>
<?php	// add end 2016/07/11 H.Yasunaga] ?>
	//ユーザコントロール
	//createUserControl();

	//地図中心マーク
<?php	// add 2012/04/02 K.Masuda [ ?>
<?php if (isset($D_MAPCENTER_MARK) && $D_MAPCENTER_MARK) { ?>

	<?php	// add 2016/01/08 Y.Uesugi [ ?>
	<?php if (isset($D_MAPCENTER_MARK_IMG) && $D_MAPCENTER_MARK_IMG) { ?>
		var opt = {};
		opt.src ='<?PHP echo $D_MAPCENTER_MARK_IMG; ?>'; //画像URL
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
	//VICS対応 地図重畳
<?php if (isset($D_CUST_VICS) && $D_CUST_VICS) { ?>

	// VICS用イメージレイヤー指定
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

	// 縮尺を指定する
	<?php if (isset($D_MAPLINK_LVL_CSTM) && $D_MAPLINK_LVL_CSTM != '') { ?>
	ZdcEmapMapObj.setZoom(<?php echo $D_MAPLINK_LVL_CSTM; ?>);
	<?php } ?>
<?php } ?>
	// add 2016/10/03 Y.Uesugi ]
}

// ユーザコントロール
function createUserControl() {
	/* ユーザコントロールに使用する画像 */
	var imgurldir = '<?PHP echo $D_DIR_BASE; ?>img/usrcontrol/';
	
	var control = {
		/* ホームポジションへ移動ボタン */
		home:
		{
			/* 画像のURL */
			src: imgurldir + 'home.png',
			/* 配置位置 */
			pos:{top: 28,right: 34},
			/* 画像の表示サイズ */
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
		/* つまみの上限位置(縮尺レベル変更バーのtop: -2pxの位置) */
		start: -2,
		/* つまみの移動量 */
		interval: 6
	};
	
	/* ユーザコントロールを作成 */
	widget = new ZDC.UserControl(control, options);
	
	/* ユーザコントロールを追加 */
	ZdcEmapMapObj.addWidget(widget);
};



//-------------------------------------------------------------
//地図制御
//-------------------------------------------------------------
// クリック位置へ移動
function ZdcEmapMoveLatLon() {
	var latlon = ZdcEmapMapObj.getClickLatLon();
	ZdcEmapMapObj.moveLatLon(latlon);
}
//地図上にカーソル表示
var ZdcEmapMapCurMrkId = null;
function ZdcEmapMapCursorSet(lat, lon){
	//アイコンの作成
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
//地図上のカーソル外す
function ZdcEmapMapCursorRemove(){
	if (ZdcEmapMapCurMrkId != null) {
		ZdcEmapMapObj.removeWidget(ZdcEmapMapCurMrkId);
		ZdcEmapMapCurMrkId = null;
	}
	//詳細表示中
	ZdcEmapMapFrontShopDetail();//詳細アイコンを前面にもってくる
}
//地図移動
function ZdcEmapMapMove(lat, lon, lvl){
	var center = new ZDC.LatLon(Number(lat), Number(lon));
	ZdcEmapMapObj.moveLatLon(center);
	if(lvl) ZdcEmapMapObj.setZoom(lvl);
}
function ZdcEmapMapScroll(lat, lon){
	var center = new ZDC.LatLon(lat, lon);
	//マップ移動
	ZdcEmapMapObj.moveLatLon(center);
}
//地図移動
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

//地図移動(API2.0用)
function ZdcEmapMapMoveBoxApi2(minlat,minlon,maxlat,maxlon){
	
	var varlatlon_box = new Array();
	
	// 地図表示縮尺取得用仮想表示エリア
	varlatlon_box[0] = new ZDC.LatLon(minlat, minlon);
	varlatlon_box[1] = new ZDC.LatLon(maxlat, maxlon);
	var adjust = ZdcEmapMapObj.getAdjustZoom(varlatlon_box);
	
	// 地図移動＆縮尺変更
	ZdcEmapMapObj.moveLatLon(adjust.latlon);
	ZdcEmapMapObj.setZoom(adjust.zoom);
}

//-------------------------------------------------------------
//アイコン登録
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
	
	//アイコンの作成
	icon.size      = new ZdcSize(sizew, sizeh);
	icon.offset    = new ZdcPixel(offsetx, offsety);
	// icon.imageの末尾が「.gif」でないと、内部的にGIF以外として処理されてしまうので、末尾を無理矢理「.gif」にしています。
	// GIF以外で処理されてしまうと、IEで印刷時に透過GIFが透過しません。
	// タイムスタンプ値を付加しているのは、キャッシュ抑制のためです。これがないと、アイコン画像を差し替えた際に表示が崩れることがあります。（IEのみ）
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
	//マーカーの作成
	p   = new ZdcPoint(lon, lat, <?PHP echo $D_PFLG; ?>);
	mrk = new ZdcMarker(p, icon);
	//マーカーの基本情報
	mrk.id     = id;
	mrk.data1  = data1;
	mrk.data2  = data2;
	mrk.nflg   = nflg;
	if (lvl) mrk.lvl = lvl;
	mrk.Point  = p;
	mrk.mouseclickmarker = mouseclickmarker;
	mrk.mouseovermarker  = mouseovermarker;
	mrk.mouseoutmarker   = mouseoutmarker;
	//マーカークリック時のイベント登録
	if(mrk.mouseclickmarker) ZdcEvent.addListener(mrk, "mouseclickmarker", mrk.mouseclickmarker);
	if(mrk.mouseovermarker)  ZdcEvent.addListener(mrk, "mouseovermarker" , mrk.mouseovermarker);
	if(mrk.mouseoutmarker)   ZdcEvent.addListener(mrk, "mouseoutmarker"  , mrk.mouseoutmarker);
	// イベントなしの時はマウスカーソルを変更しない
	if (!mrk.mouseclickmarker && !mrk.mouseovermarker) mrk.setType('static');

	return mrk;
}

//-------------------------------------------------------------
//アイコン登録(API2.0用)
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
	
	// icon.imageの末尾が「.gif」でないと、内部的にGIF以外として処理されてしまうので、末尾を無理矢理「.gif」にしています。
	// GIF以外で処理されてしまうと、IEで印刷時に透過GIFが透過しません。
	// タイムスタンプ値を付加しているのは、キャッシュ抑制のためです。これがないと、アイコン画像を差し替えた際に表示が崩れることがあります。（IEのみ）
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
	// 連番アイコン（拠点アイコン画像は使わない）
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

	// 通常の拠点アイコン（画像）
	} else {
	<?php // add 2014/10/06 Y.Matsukawa ] ?>
		// newアイコンありの場合
		if (newimage) {
			// 拠点アイコン
			mrk = new ZDC.Marker(latlon,{
				/* マーカのサイズに合わせて位置を調整する */
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
		// newアイコンなしの場合
		} else {
			// 拠点アイコン
			mrk = new ZDC.Marker(latlon,{
				/* マーカのサイズに合わせて位置を調整する */
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
	
	//マーカーの基本情報
	mrk.id     = id;
	mrk.data1  = data1;
	mrk.data2  = data2;
	mrk.nflg   = nflg;
	mrk.lat     = lat;
	mrk.lon     = lon;
	if (lvl) mrk.lvl = lvl;
	
	//クリック時のイベント登録
	if (mouseclickmarker) {
		//吹き出しテキスト用アンカーイベント
		<?php // add 2014/10/06 Y.Matsukawa [ ?>
		if (mrk.userwidget) {
			ZDC.addListener(mrk, ZDC.USERWIDGET_CLICK, mouseclickmarker);
		} else {
		<?php // add 2014/10/06 Y.Matsukawa ] ?>
			ZDC.addListener(mrk, ZDC.MARKER_CLICK, mouseclickmarker);
		}
	}

	//マウスオーバー時のイベント登録
	if (mouseovermarker) {
		var center = ZdcEmapMapObj.getLatLon();
		var box = ZdcEmapMapObj.getLatLonBox();
		var maplatlen = box.getMax().lat - box.getMin().lat;
		var maplonlen = box.getMax().lon - box.getMin().lon;
		//表示位置の調整
		if (center.lat > lat) {
			//地図中心より下側に表示する場合
			var offsetycenter1 = 10;
			var offsetycenter2 = 90;
			var offsety = -40;
		} else {
			//地図中心より上側に表示する場合
			var offsetycenter1 = -10;
			var offsetycenter2 = -120;
			var offsety = 25;
		}
		if (center.lon > lon) {
			//地図中心より左側に表示する場合
			var offsetxcenter1 = 10;
			var offsetxcenter2 = 102;
			var offsetx = 20;
		} else {
			//地図中心より右側に表示する場合
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
		
		//吹き出しテキストイベント
		ZdcEmapMapObj.addWidget(userwidgetmover);
		
		//マウスオーバーイベント登録
		<?php // add 2014/10/06 Y.Matsukawa [ ?>
		if (mrk.userwidget) {
			ZDC.addListener(mrk, ZDC.USERWIDGET_MOUSEOVER, mouseovermarker);
		} else {
		<?php // add 2014/10/06 Y.Matsukawa ] ?>
			ZDC.addListener(mrk, ZDC.MARKER_MOUSEOVER, mouseovermarker);
		}

		<?php // add 2015/09/17 F.Yokoi [ ?>
		//マウスアウトイベント登録
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
//吹き出し用アンカー
//-------------------------------------------------------------
var ZdcEmapHukidasiAnchor = null;
function ZdcEmapAnchorDraw(id) {
	ZdcEmapTipsHideInfoInterval();
	//動作判定
	if(id == null) id = this.id;
	
	//駅アイコン座標取得
	var icnlat = ZdcEmapMapPoiMrkId[id].lat;
	var icnlon = ZdcEmapMapPoiMrkId[id].lon;
	
	var center = ZdcEmapMapObj.getLatLon();
	var box = ZdcEmapMapObj.getLatLonBox();
	var maplatlen = box.getMax().lat - box.getMin().lat;
	var maplonlen = box.getMax().lon - box.getMin().lon;
	
	var s = ZdcEmapMapObj.getZoom();
	<?php	// del 2016/04/21 H.Osamoto if(s < < ?PHP echo $D_VIEW_ICON_MAX; ? > || s > < ?PHP echo $D_VIEW_ICON_MIN; ? >) return; ?>
	//オブジェクトの作成
	ZdcEmapTipsMarker = ZdcEmapMapPoiMrkId[id];
	if(!ZdcEmapMapObj || !ZdcEmapTipsMarker) return;
	
	//表示位置の調整
	if (center.lat > icnlat) {
		//地図中心より下側に表示する場合
		var offsetycenter1 = 3;
		var offsetycenter2 = 22;
	} else {
		//地図中心より上側に表示する場合
		var offsetycenter1 = -3;
		var offsetycenter2 = -30;
	}
	if (center.lon > icnlon) {
		//地図中心より左側に表示する場合
		var offsetxcenter1 = 3;
		var offsetxcenter2 = 25;
	} else {
		//地図中心より右側に表示する場合
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
	
	/* 線を作成 */
	var pl = new ZDC.Polyline(latlons, 
	{
		strokeWeight: 1,
		fillColor: '#FF0000'
	});

	/* 線を地図に追加 */
	ZdcEmapMapObj.addWidget(pl);
	
	ZdcEmapHukidasiAnchor = pl;
	ZDC.addListener(ZdcEmapTipsMarker, ZDC.MARKER_MOUSEOUT, function(){pl.hidden();});
}


//-------------------------------------------------------------
//ルート探索
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
//将来フォームで条件を変えられる用に変数化しておく
var ZdcEmapRouteType              = <?PHP echo $D_ROUTE_TYPE; ?>;
var ZdcEmapRouteWalkPSC           = <?PHP echo $D_ROUTE_WALK_PSC; ?>;
var ZdcEmapRouteWalkFloorFlg      = <?PHP echo $D_ROUTE_WALK_FLOORFLG; ?>;
var ZdcEmapRouteWalkDepFloor      = <?PHP echo $D_ROUTE_WALK_DEP_FLOOR; ?>;
var ZdcEmapRouteWalkDepStationFlg = <?PHP echo $D_ROUTE_WALK_DEP_STATIONFLG; ?>;
var ZdcEmapRouteWalkArrFloorFlg   = <?PHP echo $D_ROUTE_WALK_ARR_FLOORFLG; ?>;
var ZdcEmapRouteWalkArrStationFlg = <?PHP echo $D_ROUTE_WALK_ARR_STATIONFLG; ?>;
var ZdcEmapRouteWalkArrFloor      = <?PHP echo $D_ROUTE_WALK_ARR_FLOOR; ?>;
//検索入り口(API2.0用)
function ZdcEmapRouteSearchApi2(id, route_type) {<?php // mod 2015/04/09 F.Yokoi ?>
	if(ZdcEmapButtonNG()) return;
	if(ZdcEmapRouteType == 0) return;
	ZdcEmapPoiRouteClear();
	ZdcEmapRouteCase = 'eki';		<?php // add 2013/06/03 Y.Matsukawa ?>

	<?php // add 2016/09/29 Y.Uesugi [ ?>
	//ルートタイプのデフォルト指定
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
	
	//パラメーターの設定
	ZdcEmapRoutePoint1 = new ZDC.LatLon(stationpoint.lat, stationpoint.lon);
	ZdcEmapRoutePoint2 = new ZDC.LatLon(shoppoint.lat, shoppoint.lon);
	
	if(ZdcEmapRouteType == 1 || ZdcEmapRouteType == 3)
		ZdcEmapRouteSearchWalkApi2(stationpoint, shoppoint);
	if(ZdcEmapRouteType == 2)
		ZdcEmapRouteSearchCarApi2(stationpoint, shoppoint);

	//画面の移動
	ZdcEmapMapMoveBoxApi2(stationpoint.lat,stationpoint.lon,shoppoint.lat,shoppoint.lon);
}
//検索入り口
function ZdcEmapRouteSearch(name1,mx1,my1,name2,mx2,my2,route_type) {<?php // mod 2015/04/08 F.Yokoi ?>
	if(ZdcEmapButtonNG()) return;
	if(ZdcEmapRouteType == 0) return;
	ZdcEmapPoiRouteClear();
	
	//パラメーターの設定
	ZdcEmapRouteName1 = name1;
	ZdcEmapRouteName2 = name2;
	var stationpoint = new ZDC.LatLon(Number(my2), Number(mx2));
	var shoppoint = new ZDC.LatLon(Number(my1), Number(mx1));
	ZdcEmapRoutePoint1 = stationpoint;
	ZdcEmapRoutePoint2 = shoppoint;

	<?php // add 2016/09/29 Y.Uesugi [ ?>
	//ルートタイプのデフォルト指定
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

	//画面の移動
	ZdcEmapMapMoveBoxApi2(stationpoint.lat,stationpoint.lon,shoppoint.lat,shoppoint.lon);
}
// 歩行者ルート検索(API2.0用)
function ZdcEmapRouteSearchWalkApi2(p1,p2) {
	ZdcEmapReadOn();
	
	/* スタート地点の緯度経度 */
	from = p1;
	/* ゴール地点の緯度経度 */
	to   = p2;
	/* 歩行者の速さを80m/minとする */
	var walk_speed = 80;

	ZDC.Search.getRouteByWalk({
		from: from,
		to: to
		<?php if (!$D_ROUTE_EKI_EXIT) { ?>, station: "bothoff"<?php }	// add 2012/08/17 Y.Matsukawa ?>
	},function(status, res) {
		if (status.code == '000') {
			/* 取得成功 */
			ZdcEmapwriteRoute(status, res, 1);
			<?php if ($D_ROUTE_DISTANCE_DSP_MAP) { // mod 2015/04/08 F.Yokoi [ ?>
			var walk_time = res.route.distance / walk_speed;
			walk_time = Math.ceil(walk_time);

			ZdcEmapDispRouteDistanceMap(res.route.distance, walk_time);
			<?php } else { ?>
			ZdcEmapDispRouteDistance(res.route.distance);
			<?php } // mod 2015/04/08 F.Yokoi ] ?>
		} else {
			/* 取得失敗 */
			if(ZdcEmapRouteType == 1) {

				<?php // mod 2015/12/01 H.Yasunaga 距離が近すぎる場合もアラートが表示されるので始点と終点の位置が同じ場合はアラートを表示しない[ ?> 
				<?php // mod 2016/08/31 Y.Uesugi 直線距離が8m以下の場合もアラートが表示されるのでアラート非表示とする[ ?> 
				var distance = Math.ceil(ZDC.getLatLonToLatLonDistance(from, to));
				if ((from.lat != to.lat || from.lon != to.lon) && distance > 8) {
				<?php //mod 2016/08/31 Y.Uesugi ] ?>
					<?php if ($D_MSG_ERR_SEARCH_WALK_ALERT != '') { // add 2015/04/08 F.Yokoi [ ?>
					alert("<?php echo $D_MSG_ERR_SEARCH_WALK_ALERT; ?>");
					<?php } // add 2015/04/08 F.Yokoi ] ?>
				}
				<?php // mod 2015/12/01 H.Yasunaga ] ?>

				//失敗だった場合自動車で再検索する
				ZdcEmapRouteSearchCarApi2(ZdcEmapRoutePoint1,ZdcEmapRoutePoint2);
			} else {
				alert('<?PHP echo $D_MSG_ERR_JS_ROUTE; ?> [' + status.code + ']');
			}
			return;
		}
	});
}
// 自動車ルート検索(API2.0用)
function ZdcEmapRouteSearchCarApi2(p1,p2) {
	//ZdcEmapReadOn();
	
	/* スタート地点の緯度経度 */
	from = p1;
	/* ゴール地点の緯度経度 */
	to   = p2;
	
	ZDC.Search.getRouteByDrive({
		from: from,
		to: to
<?php // add 2016/08/25 Y.Uesugi [ ?>
<?php if ($D_ROUTE_LINE_TOLL_FALSE) { ?>
		/* 有料道路を検索対象としない */
		, toll: false
<?php } ?>
<?php // add 2016/08/25 Y.Uesugi ] ?>
	},function(status, res) {
		if (status.code == '000') {
			/* 取得成功 */
			ZdcEmapwriteRoute(status, res, 2);
			<?php if ($D_ROUTE_DISTANCE_DSP_MAP) { // mod 2015/04/08 F.Yokoi [ ?>
			ZdcEmapDispRouteDistanceMap(res.route.distance, res.route.time);
			<?php } else { ?>
			ZdcEmapDispRouteDistance(res.route.distance);
			<?php } // mod 2015/04/08 F.Yokoi ] ?>
		} else {
			/* 取得失敗 */
			alert('<?PHP echo $D_MSG_ERR_JS_ROUTE; ?> [' + status.code + ']');
			// ルート検索終了
			ZdcEmapReadOff();
		}
	});
}
// ルート描画
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
		//歩行者用
		'通常通路': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'横断歩道': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'横断通路': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'歩道橋': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'踏切内通路': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'連絡通路': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'建物内通路': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'敷地内通路': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'乗換リンク': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'通路外': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'引き込みリンク': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		//自動車用
		'高速道路': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'都市高速道路': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'国道': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'主要地方道': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'都道府県道': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'一般道路(幹線)': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'一般道路(その他)': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'導入路': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'細街路(主要)': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'細街路(詳細)': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'フェリー航路': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'},
		'道路外': {strokeColor: '#3000ff', strokeWeight: 5, lineOpacity: 0.6, lineStyle: 'solid'}
	};



	/* スタートとゴールのアイコンを地図に重畳します */
	ZdcEmapRouteStartFlag = new ZDC.Marker(from,guyde_type['start']);
	ZdcEmapRouteEndFlag   = new ZDC.Marker(to,guyde_type['end']);
	/*
	スタートとゴールのウィジットが他のマーカの
	下にならないようにz-indexを設定します
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
			// 歩行者
			if (stype == 1) {
				// マーカを表示
				if (link[i].type != '通常通路' || link[i].structureType != '通常') {
					var guide = link[i].type;

					ZdcEmapRouteMarker[i] = new ZDC.Marker(link[i].line[0]);
					ZdcEmapMapObj.addWidget(ZdcEmapRouteMarker[i]);

					/* マーカをクリックしたときの動作 */
					ZDC.bind(ZdcEmapRouteMarker[i], ZDC.MARKER_CLICK, {link: link[i]}, ZdcEmapMarkerClickWalk);

					/* 初期位置 */
					init_lat = <?PHP echo $D_INIT_LAT; ?>;
					init_lon = <?PHP echo $D_INIT_LON; ?>;

					/* マーカに吹き出しを表示 */
					ZdcEmapMsgInfo = new ZDC.MsgInfo(new ZDC.LatLon(init_lat, init_lon), {offset: ZDC.Pixel(0, -18)});
					ZdcEmapMapObj.addWidget(ZdcEmapMsgInfo);
				}
			}
		<?php } ?>
		<?php if ($D_ROUTE_LINE_PROPERTY_DSP_MAP_DRIVE) { ?>
			// 自動車
			if (stype == 2) {
				if ((link[i].type != '通常通路' || link[i].structureType != '通常') && link[i].guidance != null) {
					var guide = link[i].guidance.guideType;

					/* 交差点 || 方面及び方向 || ETC */
					var url = link[i].guidance.crossImageUri ||
							  link[i].guidance.signboardImageUri ||
							  link[i].guidance.etcImageUri;
					if (url) {
						ZdcEmapRouteMarker[i] = new ZDC.Marker(link[i].line[0]);
						ZdcEmapMapObj.addWidget(ZdcEmapRouteMarker[i]);

						/* マーカをクリックしたときの動作 */
						ZDC.bind(ZdcEmapRouteMarker[i], ZDC.MARKER_CLICK, {link: link[i]}, ZdcEmapMarkerClickDrive);

						/* 初期位置 */
						init_lat = <?PHP echo $D_INIT_LAT; ?>;
						init_lon = <?PHP echo $D_INIT_LON; ?>;

						/* マーカに吹き出しを表示 */
						ZdcEmapMsgInfo = new ZDC.MsgInfo(new ZDC.LatLon(init_lat, init_lon), {offset: ZDC.Pixel(0, -18)});
						ZdcEmapMapObj.addWidget(ZdcEmapMsgInfo);

					}
				}
			}
		<?php } ?>
		<?php // add 2016/08/25 Y.Uesugi ] ?>

	}
	/* 地点が全て表示できる縮尺レベルを取得 */
	var adjust = ZdcEmapMapObj.getAdjustZoom(latlons);
	ZdcEmapMapObj.moveLatLon(adjust.latlon);
	ZdcEmapMapObj.setZoom(adjust.zoom);
	
	// ルート検索終了
	ZdcEmapReadOff();

};

// ルート距離表示(API2.0用)
function ZdcEmapDispRouteDistance(dist) {
	if (ZdcEmapRouteCase != 'free') return;		<?php // add 2013/06/03 Y.Matsukawa ?>
	//ルート距離表示
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
// ルート距離・時間表示(API2.0用、地図上)
function ZdcEmapDispRouteDistanceMap(dist, time) {
	if (ZdcEmapTipsTopShapeLayer) {
		ZdcEmapTipsTopShapeLayer.close(); // レイヤーのクリア
	}

	//ルート距離表示
	var distance = dist;
	if (distance < 1000) {
		distance = distance+' m';
	} else {
		distance = distance / 100;
		distance = Math.round(distance);
		distance = distance / 10;
		distance += ' km';
	}

	<?php //add start 2015/12/01 H.Yasunaga 移動時間(time)がnull分と表記されるのを 1分にする[ ?>
	if (time == null) {
		time = 1;
	}
	<?php //add start 2015/12/01 H.Yasunaga] ?>

	if (time != '') {
		var userwidgetrouterlabel =
		{
			html: '<div style="<?php echo $D_ROUTE_DISTANCE_DSP_STYLE; ?>">移動距離：' + distance + '<br />移動時間：' + time + ' 分</div>',
			size: new ZDC.WH('<?php echo $D_ROUTE_DISTANCE_DSP_W; ?>', '<?php echo $D_ROUTE_DISTANCE_DSP_H; ?>')
		};
	} else {
		var userwidgetrouterlabel =
		{
			html: '<div style="<?php echo $D_ROUTE_DISTANCE_DSP_STYLE; ?>">移動距離：' + distance + '</div>',
			size: new ZDC.WH('<?php echo $D_ROUTE_DISTANCE_DSP_W; ?>', '<?php echo $D_ROUTE_DISTANCE_DSP_H; ?>')
		};
	}

	var positionrouter = new ZDC.TL('<?php echo $D_ROUTE_DISTANCE_DSP_Y; ?>', '<?php echo $D_ROUTE_DISTANCE_DSP_X; ?>');
	var userwidgetrouter = new ZDC.StaticUserWidget(positionrouter, userwidgetrouterlabel);

	//レイヤーへ表示
	ZdcEmapMapObj.addWidget(userwidgetrouter);
	userwidgetrouter.open();
	ZdcEmapTipsTopShapeLayer = userwidgetrouter;
}
<?php // add 2015/04/08 F.Yokoi ] ?>

//歩行者検索
function ZdcEmapRouteSearchWalk(name1,p1,name2,p2) {
	ZdcEmapReadOn();
	//オブジェクト作成
	ZdcEmapRouteOptionsObj = new ZdcPRouteSearchOptions();
	ZdcEmapRouteSearchObj = new ZdcPRouteSearch();
	ZdcEmapRouteOptionsObj.showMarker = false;
	ZdcEmapRouteOptionsObj.pointFlg = <?PHP echo $D_PFLG; ?>;
	ZdcEmapRouteSearchObj.timeout = <?PHP echo $D_ROUTE_TIMEOUT; ?>;
	ZdcEvent.addListener(ZdcEmapRouteSearchObj, 'end', ZdcEmapRouteSearchEndWalk);
	ZdcEmapMapObj.addPRouteSearch(ZdcEmapRouteSearchObj);
	
	//デザイン指定
	ZdcEmapRouteSearchObj.routeWidth = <?PHP echo $D_ROUTE_WALK_WIDTH; ?>;
	ZdcEmapRouteSearchObj.routeOpacity = "<?PHP echo $D_ROUTE_WALK_OPACITY; ?>";
	ZdcEmapRouteSearchObj.routeColor = "<?PHP echo $D_ROUTE_WALK_COLOR; ?>";
	
	//位置指定
	ZdcEmapRouteOptionsObj.arrivalPoint.point = p1;
	ZdcEmapRouteOptionsObj.departurePoint.point = p2;
	
	//検索条件指定
	//共通
	ZdcEmapRouteOptionsObj.psc = ZdcEmapRouteWalkPSC;
	ZdcEmapRouteOptionsObj.floorFlg = ZdcEmapRouteWalkFloorFlg;
	//到着点(出発点)
	ZdcEmapRouteOptionsObj.arrivalPoint.name = name1;
	ZdcEmapRouteOptionsObj.arrivalPoint.floorFlg = ZdcEmapRouteWalkArrFloorFlg;
	ZdcEmapRouteOptionsObj.arrivalPoint.stationFlg = ZdcEmapRouteWalkArrStationFlg;
	ZdcEmapRouteOptionsObj.arrivalPoint.floor = ZdcEmapRouteWalkArrFloor;
	//出発点(拠点)
	ZdcEmapRouteOptionsObj.departurePoint.name = name2;
	ZdcEmapRouteOptionsObj.departurePoint.stationFlg = ZdcEmapRouteWalkDepStationFlg;
	ZdcEmapRouteOptionsObj.departurePoint.floor = ZdcEmapRouteWalkDepFloor;
	//検索開始
	ZdcEmapRouteSearchObj.search(ZdcEmapRouteOptionsObj);
}
function ZdcEmapRouteSearchEndWalk() {
	ZdcEmapReadOff();
	var result = this.getResult();
	if(result && (result.status !== 0)) {
		//エラー処理
		if(ZdcEmapRouteType == 1) {
			//失敗だった場合自動車で再検索する
			ZdcEmapRouteSearchCar(ZdcEmapRouteName1,ZdcEmapRoutePoint1,ZdcEmapRouteName2,ZdcEmapRoutePoint2);
		} else {
			alert('<?PHP echo $D_MSG_ERR_JS_ROUTE; ?> [' + result.status + ']');
		}
		return;
	}
	//スタート／ゴールのアイコンを描画
	ZdcEmapRouteFlag();
	//ルート距離表示
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
//自動車検索
function ZdcEmapRouteSearchCar(name1,p1,name2,p2) {
	ZdcEmapReadOn();
	//オブジェクト作成
	ZdcEmapRouteOptionsObj = new ZdcRouteSearchOptions();
	ZdcEmapRouteSearchObj = new ZdcRouteSearch();
	ZdcEmapRouteOptionsObj.showMarker = false;
	ZdcEmapRouteOptionsObj.pointFlg = <?PHP echo $D_PFLG; ?>;
	ZdcEmapRouteSearchObj.timeout = <?PHP echo $D_ROUTE_TIMEOUT; ?>;
	ZdcEvent.addListener(ZdcEmapRouteSearchObj, 'end', ZdcEmapRouteSearchEndCar);
	ZdcEmapMapObj.addRouteSearch(ZdcEmapRouteSearchObj);
	
	//デザイン指定
	ZdcEmapRouteSearchObj.routeWidth = <?PHP echo $D_ROUTE_CAR_WIDTH; ?>;
	ZdcEmapRouteSearchObj.routeOpacity = "<?PHP echo $D_ROUTE_CAR_OPACITY; ?>";
	ZdcEmapRouteSearchObj.routeColor = "<?PHP echo $D_ROUTE_CAR_COLOR; ?>";
	
	//位置指定
	ZdcEmapRouteOptionsObj.arrivalPoint = p1;
	ZdcEmapRouteOptionsObj.departurePoint = p2;

	//検索開始
	ZdcEmapRouteSearchObj.search(ZdcEmapRouteOptionsObj);
}
function ZdcEmapRouteSearchEndCar() {
	ZdcEmapReadOff();
	var result = this.getResult();
	if(result && (result.status !== 0)) {
		//エラー処理
		alert('<?PHP echo $D_MSG_ERR_JS_ROUTE; ?> [' + result.status + ']');
		return;
	}
	//スタート／ゴールのアイコンを描画
	ZdcEmapRouteFlag();
	//ルート距離表示
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
//ルート削除
function ZdcEmapPoiRouteClear() {
	if(!ZdcEmapRoutePolyline.length) return;
	
	for (var i=0; i<ZdcEmapRoutePolyline.length; i++) {
		if (ZdcEmapRoutePolyline[i]) {		<?php // add 2012/03/16 Y.Matsukawa ?>
			ZdcEmapMapObj.removeWidget(ZdcEmapRoutePolyline[i]);
			delete ZdcEmapRoutePolyline[i];
		}
	}
	
	//スタート／ゴールのレイヤーを削除
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
	// マーカを削除
	if(ZdcEmapRouteMarker.length){
		for (var i=0; i<ZdcEmapRouteMarker.length; i++) {
			if (ZdcEmapRouteMarker[i]) {
				ZdcEmapMapObj.removeWidget(ZdcEmapRouteMarker[i]);
				delete ZdcEmapRouteMarker[i];
			}
		}
	}
	// マーカの吹き出しを削除
	if(ZdcEmapMsgInfo){
		ZdcEmapMapObj.removeWidget(ZdcEmapMsgInfo);
		delete ZdcEmapMsgInfo;
	}
	<?php } ?>
<?php // add 2016/08/25 Y.Uesugi ] ?>
}
//ルート開始／終了地点のアイコンを描画
function ZdcEmapRouteFlag() {
	//ユーザレイヤー作成
	ZdcEmapRouteFlagLayer = new ZdcUserLayer();
	ZdcEmapRouteFlagLayer.setLayerScale(1, 18);
	ZdcEmapRouteFlagLayer.setLayerType('manual');
	//アイコン作成
	ZdcEmapRouteFlagIcon1 = new ZdcIcon();
	ZdcEmapRouteFlagIcon1.offset = new ZdcPixel(<?PHP echo $D_ROUTE_GOAL_OFFSET_X; ?>, <?PHP echo $D_ROUTE_GOAL_OFFSET_Y; ?>);
	ZdcEmapRouteFlagIcon1.image = '<?PHP echo $D_ROUTE_GOAL_IMAGE; ?>';
	ZdcEmapRouteFlagIcon2 = new ZdcIcon();
	ZdcEmapRouteFlagIcon2.offset = new ZdcPixel(<?PHP echo $D_ROUTE_START_OFFSET_X; ?>, <?PHP echo $D_ROUTE_START_OFFSET_Y; ?>);
	ZdcEmapRouteFlagIcon2.image = '<?PHP echo $D_ROUTE_START_IMAGE; ?>';
	//ユーザレイヤーに追加
	if(ZdcEmapRoutePoint1) ZdcEmapRouteFlagLayer.addMarker(new ZdcMarker(ZdcEmapRoutePoint1, ZdcEmapRouteFlagIcon1));
	if(ZdcEmapRoutePoint2) ZdcEmapRouteFlagLayer.addMarker(new ZdcMarker(ZdcEmapRoutePoint2, ZdcEmapRouteFlagIcon2));
	//地図にユーザレイヤーを追加
	ZdcEmapMapObj.addUserLayer(ZdcEmapRouteFlagLayer);
	//ルートレイヤーの上に移動
	ZdcEmapRouteFlagLayer.doc.style.zIndex = "3999";
}

<?php // add 2016/08/25 Y.Uesugi [ ?>
//ルートバルーンの吹き出しを描画（徒歩）
function ZdcEmapMarkerClickWalk() {
	var html = '<div id="MarkerWalkMsg" style = "width:200px; height:50px;">';
		html += '<table id="MarkerWalkMsgTbl" border="1" style="width:180px;">';
		html += '<tr>';
		html += '<td width="35%" style="font-size:10pt;">通路種別</td>';
		html += '<td style="font-size:10pt;">' + this.link.structureType + '</td>';
		html += '</tr>';
		html += '<tr>';
		html += '<td style="font-size:10pt;">構造種別</td>';
		html += '<td style="font-size:10pt;">'+ this.link.type +'</td>';
		html += '</tr></table></div>';

	ZdcEmapMsgInfo.setHtml(html);
	ZdcEmapMsgInfo.moveLatLon(new ZDC.LatLon(this.link.line[0].lat, this.link.line[0].lon));
	ZdcEmapMsgInfo.open();
};

//ルートバルーンの吹き出しを描画（自動車）
function ZdcEmapMarkerClickDrive() {
	var url = this.link.guidance.crossImageUri ||
	this.link.guidance.signboardImageUri ||
	this.link.guidance.etcImageUri;

	var road_name  = this.link.guidance.roadName;
	var cross_name = this.link.guidance.crossName;

	if (road_name == null) {
		road_name = 'なし';
	}
	if (cross_name == null) {
		cross_name = 'なし';
	}
	var html = '<div id="MarkerDriveMsg" style = "width:200px; height:167px; overflow-y:scroll;">';
		html += '<img src=' + url + '></src>';
		html += '<table id="MarkerDriveMsgTbl" border="1" style="width:180px;">';
		html += '<tr>';
		html += '<td width="35%" style="font-size:9pt;">道路名</td>';
		html += '<td style="font-size:9pt;">'+ road_name +'</td>';
		html += '</tr>';
		html += '<tr>';
		html += '<td style="font-size:9pt;">交差点名</td>';
		html += '<td style="font-size:9pt;">'+ cross_name +'</td>';
		html += '</tr></table></div>';

	ZdcEmapMsgInfo.setHtml(html);
	ZdcEmapMsgInfo.moveLatLon(new ZDC.LatLon(this.link.line[0].lat, this.link.line[0].lon));
	ZdcEmapMsgInfo.open();
};
<?php // add 2016/08/25 Y.Uesugi ] ?>


//-------------------------------------------------------------
//自動検索のイベント管理
//-------------------------------------------------------------
var ZdcEmapSearchEventFlg  = 0;
var ZdcEmapSearchEventFunc = null;
var ZdcEmapSearchEventDragmapend;
var ZdcEmapSearchEventScrollmapend;
var ZdcEmapSearchEventChangezoomend;
var ZdcEmapSearchEventChangezoomAvailable = 1;		<?php // add 2011/12/19 Y.Matsukawa ?>
//検索実行
function ZdcEmapSearchEventAction() {
	if(!ZdcEmapSearchEventFlg) return;
<?php	// del 2011/12/13 Y.Matsukawa [
		//	if(userwidgethukidasi) {
		//		if(userwidgethukidasi.kg) {
		//			return;//フキダシ表示中は検索しない
		//		}
		//	}
		// del 2011/12/13 Y.Matsukawa ] ?>
<?php	// add 2011/12/20 Y.Matsukawa [
		// 地図操作時に再検索しないモード
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
	<?php // 最寄り地図初期表示直後にズーム変更イベントが発生し、最寄り検索が２回実行されてしまうのを回避 ?>
	if (!ZdcEmapSearchEventChangezoomAvailable) {
		ZdcEmapSearchEventChangezoomAvailable = 1;
		return;
	}
	ZdcEmapSearchEventAction();
}
//検索イベント追加
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

//検索イベント削除
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
//検索イベント開始
function ZdcEmapSearchEventStart() {
	ZdcEmapSearchEventAdd("ZdcEmapSearchShop()");		<?php // add 2011/12/19 Y.Matsukawa ?>
	ZdcEmapSearchEventFlg = 1;
}
//検索イベント停止
function ZdcEmapSearchEventStop() {
	ZdcEmapSearchEventDel();		<?php // add 2011/12/19 Y.Matsukawa ?>
	ZdcEmapSearchEventFlg = 0;
}



//-------------------------------------------------------------
//吹き出し
//  Shapeレイヤーがあるとクリック等が効かないためややこしい処理をしている
//  もっと簡単に実装できるようになったら作り直すこと
//-------------------------------------------------------------
var ZdcEmapTipsInterval = 5000;//簡易噴出し表示間隔
var ZdcEmapTipsTimerID = null;//強制的に噴出しを消すタイマーID
var ZdcEmapTipsMarker = null;//噴出し表示のマーカーオブジェクト
var ZdcEmapTipsShapeLayer = null;//噴出しレイヤー
var ZdcEmapTipsShape = null;//簡易噴出しシェープオブジェクト
var ZdcEmapTipsTopMarker = null;//最上位表示用一時マーカーレイヤー
var ZdcEmapTipsTopMarkerLayer = null;//最上位表示用一時マーカーオブジェクト
var ZdcEmapTipsTopShapeLayer = null;//最上位表示用一時噴出しレイヤー<?php // add 2015/04/08 F.Yokoi ?>
//施設データの簡易噴出し表示メソッド
function ZdcEmapTipsClick(id) {
	ZdcEmapTipsHideInfoInterval();
	//動作判定
	if(id == null) id = this.id;
	var s = ZdcEmapMapObj.getZoom();
	<?php	// del 2016/04/21 H.Osamoto if(s < < ?PHP echo $D_VIEW_ICON_MAX; ? > || s > < ?PHP echo $D_VIEW_ICON_MIN; ? >) return; ?>
	//オブジェクトの作成
	ZdcEmapTipsMarker = ZdcEmapMapPoiMrkId[id];
	if(!ZdcEmapMapObj || !ZdcEmapTipsMarker) return;

	var lat = ZdcEmapTipsMarker.lat;
	var lon = ZdcEmapTipsMarker.lon;
	var center = ZdcEmapMapObj.getLatLon();
	var box = ZdcEmapMapObj.getLatLonBox();
	var maplatlen = box.getMax().lat - box.getMin().lat;
	var maplonlen = box.getMax().lon - box.getMin().lon;
	
	
	//表示位置の調整
	if (center.lat > lat) {
		//地図中心より下側に表示する場合
		var offsetycenter1 = 10;
		var offsetycenter2 = 90;
		var offsety = -40;
	} else {
		//地図中心より上側に表示する場合
		var offsetycenter1 = -10;
		var offsetycenter2 = -120;
		var offsety = 25;
	}
	if (center.lon > lon) {
		//地図中心より左側に表示する場合
		var offsetxcenter1 = 10;
		var offsetxcenter2 = 102;
		var offsetx = 20;
	} else {
		//地図中心より右側に表示する場合
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
	
	
	//吹き出し表示
	ZdcEmapMapObj.addWidget(userwidgetmover);
	ZDC.addListener(ZdcEmapTipsMarker, ZDC.MARKER_MOUSEOUT, function(){userwidgetmover.close();});
	//ZdcEmapAnchorDraw(id);
	userwidgetmover.open();
	ZdcEmapTipsShapeLayer = userwidgetmover;
	ZdcEmapTipsTimerID = setTimeout(ZdcEmapTipsHideInfoInterval, ZdcEmapTipsInterval);
}
//レイヤーを閉じる
function ZdcEmapTipsClose() {
	//シェイプレイヤーを閉じる
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
	//最上位マーカーレイヤーを閉じる
	if(ZdcEmapTipsTopMarkerLayer)
	{
		ZdcEmapTipsTopMarkerLayer.clearMarker();
		ZdcEmapMapObj.removeUserLayer(ZdcEmapTipsTopMarkerLayer);
		ZdcEmapTipsTopMarker.mouseclickmarker = null;
	}
	ZdcEmapTipsTopMarker = null;
	ZdcEmapTipsTopMarkerLayer = null;
	//タイマーのクリア
	if(ZdcEmapTipsTimerID) clearTimeout(ZdcEmapTipsTimerID);
	ZdcEmapTipsTimerID = null;
}
//強制的に簡易噴出し非表示メソッド
function ZdcEmapTipsHideInfoInterval() {
	if(ZdcEmapTipsTimerID) clearTimeout(ZdcEmapTipsTimerID);
	ZdcEmapTipsTimerID = null;
	ZdcEmapTipsClose();
}
//簡易噴出し非表示メソッド
function ZdcEmapTipsHideInfo() {
	if(!ZdcEmapTipsIsMouseOutMarker()) return;
	ZdcEmapTipsClose();
}
//IEでmouseoutイベントがマーカーオブジェクトの子ノードの間で発生しているかどうか
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
//その他
//-------------------------------------------------------------
//HTML読み込み用ajax通信関数
<?php //function ZdcEmapHttpRequestHtml(url,func,nowaitmsg) {		mod 2012/09/07 Y.Matsukawa ?>
function ZdcEmapHttpRequestHtml(url, func, nowaitmsg, typ) {
	if(!nowaitmsg) ZdcEmapReadOn();//読み込み中フラグon
	if(typ == undefined) typ = 1;		<?php // add 2012/09/06 Y.Matsukawa ?>
	//通信処理
	var ZdcEmapHttpRequestObj = new ZdcEmapHttpRequest('EUC', 'EUC');
	ZdcEmapHttpRequestObj.request(url, function(html,status) {
		if(status == 3) status = 0;//タイムアウトは無視 連続呼び出し時の動作が安定しないので
		if(status == 9) status = 0;//テンプレートが無い場合に対応
		if(html == null) html = "";//nullは出さない
		if(status == 0) {
			func(html,status);
		} else {
			//エラー処理
			func(html,status);
		}
		ZdcEmapReadOff();//読み込み中フラグoff
	//},<?PHP echo $D_AJAX_TIMEOUT; ?>);		mod 2012/09/07 Y.Matsukawa
	},<?PHP echo $D_AJAX_TIMEOUT; ?>,typ);
}
//ボタン押下拒否判定
function ZdcEmapButtonNG() {
	if(ZdcEmapReadCheck()) return 1;//読み込み中の動作がある
	if(ZdcEmapDisableReSearch) return 1;	// add 2014/12/14 Y.Matsukawa
	return 0;
}
//読み込み中フラグ
var ZdcEmapReading = 0;//読み込み中・処理中フラグ
function ZdcEmapReadOn() {
	ZdcEmapReading ++;
}
function ZdcEmapReadOff() {
	if(ZdcEmapReading <= 0) return;
	ZdcEmapReading --;
}
function ZdcEmapReadCheck() {
	if(ZdcEmapReading > 0) return 1;//読み込み中の動作がある
	return 0;
}
//指定された駅・施設アイコンを前面にもってくる
function ZdcEmapMapFrontPoi(id){
//	if(ZdcEmapMapPoiMrkId[id] != null) {
//		var mrk = ZdcEmapMapUserLyr.getMarkerById(ZdcEmapMapPoiMrkId[id]);
//		ZdcEmapMapUserLyr.removeMarkerById(ZdcEmapMapPoiMrkId[id]);
//		ZdcEmapMapPoiMrkId[id] = ZdcEmapMapUserLyr.addMarker(mrk);
//		//イベント当てなおし
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
			status = 1;		//パラメータエラー
		}else if( retcd.substr(4,4) == '1009' ){
			status = 5;		//該当データなし
		}else if ( errPart == '2' ){
			status = 6;		//認証エラー
		}else if ( errPart == '6' || errPart == '7' || errPart == '8' || errPartStr == '15'){
			status = 2;		//サーバーエラー
		}else{
			status = 9;		//その他エラー
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

// APIイベントログ出力
// （event_log.cgiを呼び出し）
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
// 地図中心点取得関数
// 引数：type 1 : 十進度形式
//            2 : ミリ秒形式
//            3 : 度分秒形式
//       datum TOKYO : 日本測地系
//             WGS84 : 世界測地系
// 返却：緯度経度オブジェクト
//-------------------------------------------------------------
function ZdcEmapGetMapCenter(type,datum){
	var p;
	var center = ZdcEmapMapObj.getLatLon();
	if( datum == 'WGS84' ){
		// 世界測地系
		center = ZDC.tkyTowgs(center);
	}
	if( type == 2 ){
		// ミリ秒形式
		msLat = ZDC.degToms(center.lat);
		msLon = ZDC.degToms(center.lon);
		p = new ZDC.LatLon(msLat,msLon);
		return p;
	} else if( type == 3 ){
		// 度分秒形式
		dmsLat = ZDC.degTodms(center.lat);
		dmsLon = ZDC.degTodms(center.lon);
		p = new ZDC.LatLon(dmsLat.deg+"."+dmsLat.min+"."+dmsLat.sec,dmsLon.deg+"."+dmsLon.min+"."+dmsLon.sec);
		return p;
	} else {
		// 十進度形式
		return center;
	}
}
// add 2012/04/02 K.Masuda ]

<?php // add 2014/10/08 Y.Matsukawa [ ?>
<?php // 周辺駅からの円描画 ?>
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
	// エラー処理
	if(status.code != "000" || status.text != "ok") {
		alert("<?PHP echo $D_MSG_ERR_JS_RESULT; ?> ekires["+status.code+","+status.text+"]");
		ZdcEmapSearchEventStart();
		ZdcEmapReadOff();
		return;
	}
	// 円描画
	ZdcEmapStationCircleRemove();
	var latloncheck = "";
	var cnt = 0;
	//for(i = 0; i < result.item.length; i++) {
	for(i = result.item.length - 1; i >= 0; i--) {
		var item = result.item[i];
		var ll = item.poi.latlon;
		var llstr = ll.lat+":"+ll.lon;
		if (latloncheck.indexOf(llstr) < 0) {	// 同一緯度経度で複数回描画しない為
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

<?php // パンくずを動的に追加（最下位層）		add 2015/01/28 Y.Matsukawa ?>
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

<?php // 絞り込み条件変更不可		add 2015/04/23 H.Osamoto ?>
function ZdcEmapCondDisabled() {
	if (document.ZdcEmapCondForm !== undefined) {
		document.body.style.cursor = 'wait';
		document.ZdcEmapCondForm.disabled = true;
		for(i=0;i<document.ZdcEmapCondForm.elements.length;i++){
			document.ZdcEmapCondForm.elements[i].disabled = true;
		}
	}

}

<?php // 絞り込み条件変更不可		add 2015/04/23 H.Osamoto ?>
function ZdcEmapCondEnabled() {
	if (document.ZdcEmapCondForm !== undefined) {
		document.body.style.cursor = 'auto';
		document.ZdcEmapCondForm.disabled = false;
		for(i=0;i<document.ZdcEmapCondForm.elements.length;i++){
			document.ZdcEmapCondForm.elements[i].disabled = false;
		}
	}
}

<?php // 中心位置から等距離の４点（上下左右）緯度経度配列を返却		add 2015/05/01 Y.Matsukawa ?>
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
