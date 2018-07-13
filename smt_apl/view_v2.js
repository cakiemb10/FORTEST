<?PHP
// ------------------------------------------------------------
// javasctipt 主に拠点検索に関係するもの
//
// 2011/03/10 Y.Matsukawa	新規作成
// 2011/04/26 Y.Matsukawa	Maplink
// 2011/06/29 Y.Matsukawa	【不具合修正】最寄検索中に地図スクロールすると縮尺が変わる
// 2011/07/13 Y.Matsukawa	機能追加（ルート探索、最寄駅）
// 2011/08/10 H.Osamoto		newアイコンを拠点アイコンに重畳する
// 2011/08/24 K.Masuda		ルート機能のバグ修正（"なし）
// 2011/08/26 H.Osamoto		地図リサイズ時に余白領域を設定する
// 2011/09/01 Y.Matsukawa	地図タイプ指定
// 2011/12/26 K.Masuda 		地図の横サイズ変更可能にする
// 2012/01/10 N.Wada		地図操作時に再検索しないモードを追加
// 2012/01/10 N.Wada		検索範囲（内部・外部）による表示の振り分け
// 2012/01/11 Y.Matsukawa	任意パラメータ
// 2012/01/19 N.Wada		別CID参照
// 2012/02/02 N.Wada		吹き出しの内容の切り替え
// 2012/02/21 Y.Matsukawa	店舗一覧にチェックボックス設置
// 2012/02/22 H.osamoto		APIイベントログ出力追加
// 2012/02/28 Y.Matsukawa	再検索時の絞り込み不正
// 2012/02/29 K.Masuda		検索初期位置にアイコン表示
// 2012/03/01 Y.Matsukawa	【不具合修正】地図画面をスクロール可能にした場合、Androidでwindow.resizeが頻発して動作不安定になる
// 2012/03/22 Y.Matsukawa	【不具合対応】Androidブラウザ外から遷移した場合onloadでウィンドウサイズが正しく取得できない
// 2012/04/17 Y.Matsukawa	方向変更時以外もリサイズ処理（Galaxy-Tab等でリストボックス表示して戻ると地図がリサイズされないので）
// 2012/07/18 Y.Matsukawa	最寄施設
// 2012/08/16 K.Masuda		地図縮尺変更+-ボタン対応
// 2012/09/10 Y.Matsukawa	【不具合修正】任意パラメータに「&」を含めると正しく引き継がれない、任意パラメータに半角スペース指定すると消える
// 2012/10/24 Y.Matsukawa	分布表示新ロジック（ドコモプレミアクラブ対応）
// 2012/12/17 H.Osamoto		神奈川電通広告向けカスタマイズ
// 2013/05/22 H.Osamoto		最寄検索結果が0件の場合再検索で取得する件数指定機能追加
// 2014/02/27 H.Osamoto		地図縮尺変更+-ボタン不具合対応
// 2014/03/07 H.Osamoto		ポリゴン内外判定追加
// 2014/03/12 Y.Matsukawa	任意地点から任意範囲外の拠点を除外
// 2014/08/18 AnPham		SiteIconOverlapping
// 2014/09/11 Y.Matsukawa	【機種依存不具合】地図がリフレッシュされない場合がある
// 2014/09/11 Y.Matsukawa	縮尺ボタン（小サイズ）
// 2015/03/09 H.Osamoto		ルート探索失敗時の文言からエラーコードを削除
// 2015/05/25 Y.Matsukawa	セブン&アイOMNI専用最寄り検索
// 2015/06/08 Y.Matsukawa	API V2
// 2015/07/01 Y.Matsukawa	不具合修正：現在地ルート描画時の中心点ズレ
// 2015/07/01 Y.Matsukawa	不具合修正：重なりアイコンのフキダシ表示不正
// 2015/07/28 Y.Matsukawa	不具合修正：（2.0）ルート始点終点が逆
// 2015/10/13 F.Yokoi		地図の中心点の表示機能追加
// 2015/11/18 Xuan Chien	GPSログ出力対応
// 2016/02/22 Y.Matsukawa	最寄地図に最寄一覧表示
// 2016/03/09 Y.Matsukawa	半径を可変にする／BOX範囲指定を可能にする
// 2016/03/28 Y.Matsukawa	地図リサイズ時のディレイ
// 2016/04/08 Y.Matsukawa	最寄り一覧と地図の最大件数を個別指定
// 2016/04/12 Y.Matsukawa	パラメータで半径と件数を指定
// 2016/04/14 Y.Matsukawa	最寄り地図画面に一覧も表示する場合は、地図と一覧が両方完了した後にイベント再開する
// 2016/07/11 H.Yasunaga	711OMNI2(店舗タブ)用カスタマイズ
// 2016/07/29 H.Yasunaga	711OMNI2(店舗タブ)用カスタマイズ アイコンタップ時のポップアップ表示
// 2016/08/22 H.Yasunaga	711OMNI2(店舗タブ)用カスタマイズ 吹き出しの表示非表示を変数のnullにて判別するため、
//							ZdcEmapMsg変数の制御変更
// 2016/09/16 T.Yoshino		再検索時に吹き出しを削除
// 2016/12/14 T.Yoshino		吉野家特注表示件数変更
// 2017/02/02 K.Tani		711apl用カスタマイズ 800m、5km、1件あるまで対応
// 2017/02/03 K.Tani		711apl用カスタマイズ 初期表示の地図範囲を保持
//							地図スクロール時に最寄りリストを更新しない
// 2017/02/10 K.Tani		711apl用カスタマイズ 絞り込み条件追加
//							最寄り検索ロジック修正
// 2017/02/24 K.Tani		711apl用カスタマイズ 最低1件の入る範囲で再検索
// 2017/03/02 K.Tani		711apl用カスタマイズ 最大の縮尺にしても直近の最寄りが入らない場合の対応追加
// 2017/03/14 K.Tani		画面サイズ変更時の地図リサイズを行わない
// ------------------------------------------------------------
require_once('/home/emap/src/smt/inc/define.inc');
require_once('/home/emap/src/smt/inc/act_get_freeparm.inc');		// add 2012/01/11 Y.Matsukawa

// 半径がパラメータで指定された場合		add 2016/04/12 Y.Matsukawa
if (isset($rad) && $rad) {
	$D_SHOP_RAD = $rad;
}
// 件数がパラメータで指定された場合		add 2016/04/12 Y.Matsukawa
if (isset($limit) && $limit) {
	$D_SHOP_MAP_MAX = $limit;
}

// アイコン情報取得
include("/home/emap/src/smt/inc/define_get_icon.inc");
?>
// 地図
var ZdcEmapMapObj = null;
// 地図余白領域	add 2011/08/26 H.osamoto
var ZdcEmapAnyDispPx = 0;
var ZdcEmapAnyDispPy = 0;	// add 2011/12/26 K.Masuda
<?php
// del 2015/06/08 Y.Matsukawa [
// ユーザーレイヤー
//var ZdcEmapMapUserLyr = new ZdcUserLayer();
//var ZdcEmapMapUserLyrId = null;
// del 2015/06/08 Y.Matsukawa ]
?>
// マーカー
<?php
// del 2015/06/08 Y.Matsukawa [
//var ZdcEmapMapShopMrkId = new Array(< ?PHP echo $D_SHOP_MAX; ? >);
//var ZdcEmapMapShopMrkCnt = null;
//var ZdcEmapMapShopDetailMrkId = null;
//var ZdcEmapMapCurFocusMrkId = null;
//var ZdcEmapMapPoiMrkId = new Array(20);		// add 2011/07/13 Y.Matsukawa
//var ZdcEmapMapPoiMrkCnt = null;		// add 2011/07/13 Y.Matsukawa
// del 2015/06/08 Y.Matsukawa ]
?>
<?php // add 2015/06/08 Y.Matsukawa [ ?>
var ZdcEmapListMarkers = [];
var ZdcEmapListPointMarkers = [];
var ZdcEmapScaleType = "<?php echo ($D_SCALE_TYPE?'1':'0'); ?>";
var ZdcEmapWindowWidth = 0;
var ZdcEmapWindowHeight = 0;
<?php // add 2015/06/08 Y.Matsukawa ] ?>

// 吹き出し
<?php //var ZdcEmapMsg = new ZdcUserMsgWindow();		mod 2015/06/08 Y.Matsukawa ?>
var ZdcEmapMsg = null;
// アイコン情報
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
	printf("ZdcEmapIconOffsetX['%s'] = %d;",$key,ceil($val["W"]/2)*-1);
	printf("ZdcEmapIconOffsetY['%s'] = %d;",$key,ceil($val["H"]/2)*-1);
}
?>

var ZdcEmapSearchFirst = null;//位置決定後の最初の検索か否か
var ZdcEmapSearchRetry = null;//地図範囲で検索した結果が0件だった場合に、半径指定で再検索		add 2012/10/24 Y.Matsukawa
var ZdcEmapSearchRetryVCnt = 0;//分布地図再検索後、最初のn件が入りきる縮尺に変更する		add 2012/10/24 Y.Matsukawa
var ZdcEmapSearchCond = null; //絞り込み条件		add 2012/10/24 Y.Matsukawa
var ZdcEmapSearchPoint = null;//検索した位置を保持
var ZdcEmapSearchScale = null;//検索した縮尺を保持
var ZdcEmapSearchClickFlg = 0;//最寄検索中に更に地図移動した場合のコンフリクト防止フラグ		add 2011/06/29 Y.Matsukawa
var ZdcEmapLastOrientation = null;//ウィンドウ縦横		<?php //add 2012/03/01 Y.Matsukawa ?>

var ZdcEmapSearchBox = null;// 地図範囲を保持	add 2017/02/03 K.Tani

var ZdcEmapIconDt = new Array();<?php // add 2014/08/18 AnPham ?>

// add 2012/08/16 K.Masuda [
// 最大縮尺、最小縮尺
<?php // mod 2014/02/27 H.Osamoto [ ?>
//	var max_lvl = "<?php echo $D_MAX_LVL; ?>";
//	var min_lvl = "<?php echo $D_MIN_LVL; ?>";
var max_lvl = parseInt("<?php echo $D_MAX_LVL; ?>");
var min_lvl = parseInt("<?php echo $D_MIN_LVL; ?>");
<?php // mod 2014/02/27 H.Osamoto ] ?>
// add 2012/08/16 K.Masuda ]

<?php // add 2015/06/08 Y.Matsukawa [ ?>
var zoomRange = [], i;
for(i = parseInt('<?php echo $D_MAX_LVL; ?>'); i <= parseInt('<?php echo $D_MIN_LVL; ?>'); i++)
	zoomRange.push(i);
/**
 * Convert zoom from virtual zoom to real zoom
 */
function EncRealZoom(zoom){
	for(var i = 0; i < zoomRange.length; i++){
		if(zoom == zoomRange[i]){
			return i + 1;
		}
	}
}
/**
 * Convert zoom from real zoom to virtual zoom
 */
function DecRealZoom(zoom){
	return zoomRange[zoom] - 1;
}
<?php // add 2015/06/08 Y.Matsukawa ] ?>

//-------------------------------------------------------------
//自動検索のイベント管理
//-------------------------------------------------------------
var ZdcEmapSearchEventFlg  = 0;
var ZdcEmapSearchEventFunc = null;
var ZdcEmapSearchEventDragmapend;
var ZdcEmapSearchEventScrollmapend;
var ZdcEmapSearchEventChangezoomend;
var ZdcEmapNListEventFlg = 0;	<?php // add 2016/04/14 Y.Matsukawa ?>

<?php // 地図をリフレッシュ		add 2014/09/11 Y.Matsukawa ?>
function ZdcEmapRefMap() {
	var obj = document.getElementById("ZdcEmapMap");
	if (obj) {
		obj.offsetLeft;
	}
}

//function ZdcEmapInit(init_lat, init_lon, init_lv){	// mod 2011/08/10 H.osamoto
function ZdcEmapInit(init_lat, init_lon, init_lv, nmapflg){

	ZdcEmapWindowWidth  = window.innerWidth;
	ZdcEmapWindowHeight = window.innerHeight;
	ZdcEmapLastOrientation = window.orientation;		<?php // add 2012/03/01 Y.Matsukawa ?>
	ZdcEmapLastOrientation = 999;		<?php // 初回にonresizeを有効にする（Android不具合対応）	add 2012/03/22 Y.Matsukawa ?>
	
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	init_lat = ZDC.msTodeg(init_lat);
	init_lon = ZDC.msTodeg(init_lon);
	<?php // add 2015/06/08 Y.Matsukawa ] ?>

	<?php
	// add 2016/03/03 Y.Matsukawa [
	// 地図サイズを％指定
	if ($D_NMAP_SIZE_PER_H) {
	?>
	if (nmapflg) {
		ZdcEmapAnyDispPx = Math.round(ZdcEmapWindowHeight * (1 - <?php echo $D_NMAP_SIZE_PER_H; ?>))
		ZdcEmapWindowHeight = ZdcEmapWindowHeight - ZdcEmapAnyDispPx;
	}
	<?php
	}
	// add 2016/03/03 Y.Matsukawa ]
	?>
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

	document.getElementById("ZdcEmapMap").setAttribute( 'style',
		'postion:absolute; top:0px; left:0px; width:' + ZdcEmapWindowWidth + 'px; height:' + ZdcEmapWindowHeight + 'px; z-index:0;' );

	if (!init_lv || init_lv == 0) {
		init_lv = <?PHP echo $D_INIT_LVL; ?>;
	}
	init_lv = EncRealZoom(init_lv);		// add 2015/06/08 Y.Matsukawa
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	ZdcEmapMapObj = new ZdcMap(document.getElementById("ZdcEmapMap"),
	//								new ZdcPoint(init_lon, init_lat, < ?PHP echo $D_PFLG; ? >),
	//								init_lv
	//								, < ?php echo $D_MAP_TYPE; ? >			// add 2011/09/01 Y.Matsukawa
	//								);
	// del 2015/06/08 Y.Matsukawa ]
	?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	ZdcEmapMapObj = new ZDC.Map(document.getElementById('ZdcEmapMap'), {
			latlon: new ZDC.LatLon(init_lat, init_lon),
			zoom: init_lv - 1, // Fix zoom level
			mapType: <?php echo $D_MAP_TYPE; ?>  == 9 ? 15 : <?php echo $D_MAP_TYPE; ?>,
			zoomRange: zoomRange // Set zoom range
		}
	);
	<?php // add 2015/06/08 Y.Matsukawa ] ?>

	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	// 地図の縮尺レベル変更イベント( changezoomend ) をハンドルする
	//	ZdcEvent.addListener( ZdcEmapMapObj, 'changezoomend', function() {
	//		// セレクトボックスの選択を変更する
	//		ZdcEmapMapScaleToLvlSelect();
	//		// ズームボタンのイメージを変更する
	//		if(< ?php echo ($D_SCALE_TYPE)?'1':'0'; ? > == '1') ZdcEmapLvlScaleBtn();	// add 2012/08/16 K.Masuda
	//	} );
	//	ZdcEmapMapObj.addMapScaleBar( new ZdcScaleBar( '3' ) );
	//	ZdcEmapMapObj.reflashMap();
	//	ZdcEmapMapObj.saveMapLocation();
	//	ZdcEmapMapScaleToLvlSelect();
	//	//ユーザーレイヤー
	//	ZdcEmapMapUserLyr.setLayerScale(1,15);
	//	ZdcEmapMapUserLyr.clearMarker();
	//	ZdcEmapMapUserLyrId = ZdcEmapMapObj.addUserLayer(ZdcEmapMapUserLyr); 
	//	ZdcEvent.addListener(ZdcEmapMapObj, "clickmapnomove", function(e) {
	//		ZdcEmapShopMsgClose();
	//	});
	//	// add 2012/02/22 H.osamoto [
	//	ZdcEvent.addListener(ZdcEmapMapObj, "changezoomend", ZdcEmapMapEventLogZoom);
	//	ZdcEvent.addListener(ZdcEmapMapObj, "dragmapend", ZdcEmapMapEventLogLoc);
	//	// add 2012/02/22 H.osamoto ]
	// del 2015/06/08 Y.Matsukawa ]
	?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	// スケールバー表示
	ZdcEmapMapObj.addWidget(new ZDC.ScaleBar({bottom: 3, left: 10}));
	// ホーム位置セット
	ZdcEmapMapObj.setHome();
	// 縮尺リストボックス
	ZdcEmapMapScaleToLvlSelect();
	// 縮尺＋−ボタン
	if(ZdcEmapScaleType == '1')
		ZdcEmapLvlScaleBtn();
	// 地図上クリック（ドラッグでない）
	ZDC.addListener(ZdcEmapMapObj, ZDC.MAP_MOUSEDOWN, function(){
		curentMapLatLon = ZdcEmapMapObj.getLatLon();
	});
	ZDC.addListener(ZdcEmapMapObj, ZDC.MAP_MOUSEUP, function(){
		// フキダシを閉じる
		if(ZdcEmapMapObj.getLatLon().lat == curentMapLatLon.lat &&
			ZdcEmapMapObj.getLatLon().lon == curentMapLatLon.lon){
			ZdcEmapShopMsgClose();
		}
	});
	// ドラッグ
	ZDC.addListener(ZdcEmapMapObj, ZDC.MAP_DRAG_END, function(){
		// 課金ログ出力
		ZdcEmapMapEventLogLoc();
	});
	// 縮尺変更
	ZDC.addListener(ZdcEmapMapObj, ZDC.MAP_CHG_ZOOM, function(){
		// 課金ログ出力
		ZdcEmapMapEventLogZoom();
		// 縮尺リストボックス更新
		ZdcEmapMapScaleToLvlSelect();
		// 縮尺＋−ボタン更新
		if(ZdcEmapScaleType == '1')
			ZdcEmapLvlScaleBtn();
	});
	// フキダシ表示用オブジェクト
	<?php //add start 2016/08/22 H.Yasunaga 711OMNI2(店舗タブ)カスタマイズ [ ?>
	<?php if ($cid != '711OMNI2' && $cid != '711OMNI2test') { ?>
	<?php // add end ] ?>
	ZdcEmapMsg = new ZDC.MsgInfo(ZdcEmapMapObj.getLatLon(), {
		'closeBtn':true 
	});
	ZdcEmapMapObj.addWidget(ZdcEmapMsg);
	<?php //add start 2016/08/22 H.Yasunaga 711OMNI2(店舗タブ)カスタマイズ [ ?>
	<?php } ?>
	<?php // add end ] ?>
	<?php // add 2015/06/08 Y.Matsukawa ] ?>

	//if(< ?php echo ($D_SCALE_TYPE)?'1':'0'; ? > == '1') ZdcEmapLvlScaleBtn();	// add 2012/08/16 K.Masuda		mod 2015/06/08 Y.Matsukawa ?>
	if(ZdcEmapScaleType == '1') ZdcEmapLvlScaleBtn();

	setTimeout(ZdcEmapRefMap, 100);		<?php // add 2014/09/11 Y.Matsukawa ?>

	<?php // add 2015/10/13 F.Yokoi [ ?>
	<?php if (isset($D_MAPCENTER_MARK) && $D_MAPCENTER_MARK) { ?>
	//地図中心マーク
	ZdcEmapMapObj.addWidget(new ZDC.MapCenter());
	<?php } ?>
	<?php // add 2015/10/13 F.Yokoi ] ?>
}

<?php //function ZdcEmapShopMapInit(kid,lat,lon,icnno,nflg,lvl) {		mod 2011/07/13 Y.Matsukawa ?>
function ZdcEmapShopMapInit(kid,lat,lon,icnno,nflg,lvl,mode) {
	var mrk,tmp;
	var tooltip_w,tooltip_h,tooltip_offset_x,tooltip_offset_y;		// add 2011/08/10 H.Osamoto
	if (lvl && lvl != 0) {
		<?php //ZdcEmapMapObj.setMapScale(lvl);		del 2015/06/08 Y.Matsukawa ?>
		<?php // add 2015/06/08 Y.Matsukawa [ ?>
		lvl = EncRealZoom(lvl);
		ZdcEmapMapObj.setZoom(lvl - 1);
		<?php // add 2015/06/08 Y.Matsukawa ] ?>
	} else if(<?PHP echo $D_INIT_LVL_DETAIL; ?> > 0) {
		<?php //ZdcEmapMapObj.setMapScale(< ?PHP echo $D_INIT_LVL_DETAIL; ? >);		del 2015/06/08 Y.Matsukawa ?>
		<?php // add 2015/06/08 Y.Matsukawa [ ?>
		lvl = EncRealZoom(<?PHP echo $D_INIT_LVL_DETAIL; ?>);
		ZdcEmapMapObj.setZoom(lvl - 1);
		<?php // add 2015/06/08 Y.Matsukawa ] ?>
	}
	// add 2011/08/10 H.Osamoto [
	<?php 
	if ($D_TOOLTIP_W && $D_TOOLTIP_H) { 
	?>
		tooltip_w = <?PHP echo $D_TOOLTIP_W; ?>;
		tooltip_h = <?PHP echo $D_TOOLTIP_H; ?>;
		tooltip_offset_x = <?PHP echo $D_TOOLTIP_OFFSET_X; ?>;
		tooltip_offset_y = <?PHP echo $D_TOOLTIP_OFFSET_Y; ?>;
	<?php 
	}
	?>
	// add 2011/08/10 H.Osamoto ]
//	//フォーカスカーソルを表示する
//	mrk = ZdcEmapMakeMrk(0,lat,lon,
//						ZdcEmapIconW['@SEL'],ZdcEmapIconH['@SEL'],
//						0,0,
//						ZdcEmapIconOffsetX['@SEL'],ZdcEmapIconOffsetY['@SEL'],
//						0,0,
//						0,0,
//						ZdcEmapIconImg['@SEL'],'',
//						'','',0,
//						null
//						);
//	if(ZdcEmapMapCurFocusMrkId != null) ZdcEmapMapUserLyr.removeMarkerById(ZdcEmapMapCurFocusMrkId);
//	ZdcEmapMapCurFocusMrkId = ZdcEmapMapUserLyr.addMarker(mrk);
//	mrk.setTopZIndex(3);
	//店舗アイコンを表示する
	if(nflg == 1) tmp = ZdcEmapIconImg["@NEW"];
	else tmp = "";
	// add 2011/08/10 H.Osamoto [
	// アイコン位置を指定する場合は通常のnewアイコン表示処理を行わない
	if (tooltip_w && tooltip_h) {
		tmp = "";
	}
	// add 2011/08/10 H.Osamoto ]
	if (ZdcEmapIconImg[icnno] == null) icnno = "@TP";		<?php // add 2012/11/15 Y.Matsukawa ?>
	<?php // mod 2012/12/17 H.Osamoto [ ?>
	//	mrk = ZdcEmapMakeMrk(0,lat,lon,
	//						ZdcEmapIconW[icnno],ZdcEmapIconH[icnno],
	//						ZdcEmapIconW['@NEW'],ZdcEmapIconH['@NEW'],
	//						ZdcEmapIconOffsetX[icnno],ZdcEmapIconOffsetY[icnno],
	//						ZdcEmapIconW[icnno]-ZdcEmapIconW['@NEW'],ZdcEmapIconH[icnno],
	//						<?PHP echo $D_ICON_MSGOFFSETX; ?>,<?PHP echo $D_ICON_MSGOFFSETY; ?>,
	//						ZdcEmapIconImg[icnno],tmp,
	//						kid,icnno,nflg,
 	//				<?php	//function() { ZdcEmapShopMsg(null, 1); }	mod 2012/02/02 N.Wada ?>
	//						function() { ZdcEmapShopMsg(null, 1, 'detail'); }
	//						);
	if (mode == "nomsgbox") {
		mrk = ZdcEmapMakeMrk(0,lat,lon,
							ZdcEmapIconW[icnno],ZdcEmapIconH[icnno],
							ZdcEmapIconW['@NEW'],ZdcEmapIconH['@NEW'],
							ZdcEmapIconOffsetX[icnno],ZdcEmapIconOffsetY[icnno],
							ZdcEmapIconW[icnno]-ZdcEmapIconW['@NEW'],ZdcEmapIconH[icnno],
							<?PHP echo $D_ICON_MSGOFFSETX; ?>,<?PHP echo $D_ICON_MSGOFFSETY; ?>,
							ZdcEmapIconImg[icnno],tmp,
							kid,icnno,nflg,
							null
							);
	} else {
		mrk = ZdcEmapMakeMrk(0,lat,lon,
							ZdcEmapIconW[icnno],ZdcEmapIconH[icnno],
							ZdcEmapIconW['@NEW'],ZdcEmapIconH['@NEW'],
							ZdcEmapIconOffsetX[icnno],ZdcEmapIconOffsetY[icnno],
							ZdcEmapIconW[icnno]-ZdcEmapIconW['@NEW'],ZdcEmapIconH[icnno],
							<?PHP echo $D_ICON_MSGOFFSETX; ?>,<?PHP echo $D_ICON_MSGOFFSETY; ?>,
							ZdcEmapIconImg[icnno],tmp,
							kid,icnno,nflg,
	 						<?php	//function() { ZdcEmapShopMsg(null, 1); }	mod 2012/02/02 N.Wada ?>
							<?php //function() { ZdcEmapShopMsg(null, 1, 'detail'); }		mod 2015/06/08 Y.Matsukawa ?>
							function() { ZdcEmapShopMsg(0, 1, 'detail'); }
							);
	}
	<?php // mod 2012/12/17 H.Osamoto ] ?>
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	if(ZdcEmapMapShopDetailMrkId != null) ZdcEmapMapUserLyr.removeMarkerById(ZdcEmapMapShopDetailMrkId);
	//	ZdcEmapMapShopDetailMrkId = ZdcEmapMapUserLyr.addMarker(mrk);
	// del 2015/06/08 Y.Matsukawa ]
	?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	ZdcEmapListMarkers[0] = mrk;
	ZdcEmapMapObj.addWidget(mrk.marker);
	<?php // add 2015/06/08 Y.Matsukawa ] ?>

	<?php
	// del 2015/06/08 Y.Matsukawa [
	// add 2011/08/10 H.osamoto [
	//	if (nflg == 1) {
	//		var tooltip = new ZdcTooltip();
	//		var tooltipHTML = '<img src="'+ZdcEmapIconImg["@NEW"]+'">';
	//		tooltip.setZdcTooltip(mrk.Point, tooltipHTML, tooltip_w, tooltip_h, new ZdcPixel(tooltip_offset_x, tooltip_offset_y), 4);
	//		tooltip.mrkid = mrk.id;
	//		< ?php	//ZdcEvent.addListener(tooltip, "mouseclicktooltip", function() { ZdcEmapShopMsg(this.mrkid, 1); });	mod 2012/02/02 N.Wada ? >
	//		ZdcEvent.addListener(tooltip, "mouseclicktooltip", function() { ZdcEmapShopMsg(this.mrkid, 1, 'detail'); });
	//		ZdcEmapMapUserLyr.addZdcTooltip(tooltip);
	//		mrk.toolid = tooltip.id;
	//		ZdcEmapMapUserLyr.visibleZdcTooltipById(mrk.toolid);
	//	}
	// add 2011/08/10 H.osamoto ]
	// del 2015/06/08 Y.Matsukawa ]
	?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	if(mrk.tooltip != null)
		ZdcEmapMapObj.addWidget(mrk.tooltip);
	<?php // add 2015/06/08 Y.Matsukawa ] ?>

	if (mode == '') {		<?php // add 2011/07/13 Y.Matsukawa ?>
		<?php	//ZdcEmapShopMsg(null, 1);	mod 2012/02/02 N.Wada ?>
		<?php //ZdcEmapShopMsg(null, 1, 'detail');		mod 2015/06/08 Y.Matsukawa ?>
		ZdcEmapShopMsg(0, 1, 'detail');
		<?php //ZdcEmapMapObj.reflashMap();		del 2015/06/08 Y.Matsukawa ?>
	}
	<?php //ZdcEmapMapObj.saveMapLocation();		mod 2015/06/08 Y.Matsukawa ?>
	ZdcEmapMapObj.setHome();
}

<?php // add 2011/04/26 Y.Matsukawa ?>
function ZdcEmapMaplinkInit(lat,lon,icnno,lvl,parm_nm) {
	var mrk,tmp;
	if (lvl && lvl != 0) {
		<?php //ZdcEmapMapObj.setMapScale(lvl);		del 2015/06/08 Y.Matsukawa ?>
		<?php // add 2015/06/08 Y.Matsukawa [ ?>
		lvl = EncRealZoom(lvl);
		ZdcEmapMapObj.setZoom(lvl - 1); // fix zoom level
		<?php // add 2015/06/08 Y.Matsukawa ] ?>
	} else if(<?PHP echo $D_INIT_LVL; ?> > 0) {
		<?php //ZdcEmapMapObj.setMapScale(< ?PHP echo $D_INIT_LVL; ? >);		mod 2015/06/08 Y.Matsukawa ?>
		<?php // add 2015/06/08 Y.Matsukawa [ ?>
		lvl = EncRealZoom(<?PHP echo $D_INIT_LVL; ?>);
		ZdcEmapMapObj.setZoom(lvl - 1);
		<?php // add 2015/06/08 Y.Matsukawa ] ?>
	}
	if (icnno == '') icnno = '@SHOP';
	//店舗アイコンを表示する
	mrk = ZdcEmapMakeMrk(0,lat,lon,
						ZdcEmapIconW[icnno],ZdcEmapIconH[icnno],
						ZdcEmapIconW['@NEW'],ZdcEmapIconH['@NEW'],
						ZdcEmapIconOffsetX[icnno],ZdcEmapIconOffsetY[icnno],
						ZdcEmapIconW[icnno]-ZdcEmapIconW['@NEW'],ZdcEmapIconH[icnno],
						<?PHP echo $D_ICON_MSGOFFSETX; ?>,<?PHP echo $D_ICON_MSGOFFSETY; ?>,
						ZdcEmapIconImg[icnno],"",
						null,icnno,null,
						function() { ZdcEmapShopMsgMaplink(parm_nm); }
						);
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	if(ZdcEmapMapShopDetailMrkId != null) ZdcEmapMapUserLyr.removeMarkerById(ZdcEmapMapShopDetailMrkId);
	//	ZdcEmapMapShopDetailMrkId = ZdcEmapMapUserLyr.addMarker(mrk);
	// del 2015/06/08 Y.Matsukawa
	?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	ZdcEmapListMarkers[0] = mrk;
	ZdcEmapMapObj.addWidget(mrk.marker);
	<?php // add 2015/06/08 Y.Matsukawa ] ?>

	ZdcEmapShopMsgMaplink(parm_nm);

	<?php //ZdcEmapMapObj.reflashMap();		del 2015/06/08 Y.Matsukawa ?>

	<?php //ZdcEmapMapObj.saveMapLocation();		mod 2015/06/08 Y.Matsukawa ?>
	ZdcEmapMapObj.setHome();
}

function ZdcEmapMakeMrk(id, lat, lon,
						sizew, sizeh, shadowsizew, shadowsizeh,
						offsetx, offsety, shdoffsetx, shdoffsety, msgoffsetx, msgoffsety,
						image, shadowimage,
						data1, data2, nflg,
						mouseclickmarker
						, lvl
						) {
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	var p,mrk,item;
	//	var icon = new ZdcIcon();
	//	//アイコンの作成
	//	icon.size      = new ZdcSize(sizew, sizeh);
	//	icon.offset    = new ZdcPixel(offsetx, offsety);
	//	< ?php
	//	// icon.imageの末尾が「.gif」でないと、内部的にGIF以外として処理されてしまうので、末尾を無理矢理「.gif」にしています。
	//	// GIF以外で処理されてしまうと、IEで印刷時に透過GIFが透過しません。
	//	// タイムスタンプ値を付加しているのは、キャッシュ抑制のためです。これがないと、アイコン画像を差し替えた際に表示が崩れることがあります。（IEのみ）
	//	? >
	//	if (image.substr(image.length-4, 4) == ".gif") {
	//		icon.image = image;
	//	} else {
	//		dd = new Date();
	//		ts = dd.getTime();
	//		if (image.indexOf('?') < 0) {
	//			icon.image = image+"?dummy="+ts+".gif";
	//		} else {
	//			icon.image = image+"&dummy="+ts+".gif";
	//		}
	//	}
	//	if(shadowimage) {
	//		icon.shadowsize = new ZdcSize(shadowsizew, shadowsizeh);
	//		icon.shdoffset = new ZdcPixel(shdoffsetx,shdoffsety);
	//		icon.shadowimage   = shadowimage;
	//	}
	//	icon.msgoffset = new ZdcPixel(msgoffsetx,msgoffsety);
	//	//マーカーの作成
	//	p   = new ZdcPoint(lon, lat, < ?PHP echo $D_PFLG; ? >);
	//	mrk = new ZdcMarker(p, icon);
	//	//マーカーの基本情報
	//	mrk.id     = id;
	//	mrk.data1  = data1;
	//	mrk.data2  = data2;
	//	mrk.nflg   = nflg;
	//	if (lvl) mrk.lvl = lvl;
	//	mrk.Point  = p;
	//	mrk.mouseclickmarker = mouseclickmarker;
	//	//マーカークリック時のイベント登録
	//	if(mrk.mouseclickmarker) ZdcEvent.addListener(mrk, "mouseclickmarker", mrk.mouseclickmarker);
	//	return mrk;
	// del 2015/06/08 Y.Matsukawa ]
	?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	lat = ZDC.msTodeg(lat);
	lon = ZDC.msTodeg(lon);
	if(image.substr(image.length - 4, 4) != '.gif'){
		var ts = new Date().getTime();
		image += image.indexOf('?') < 0 ? '?' : '&' + 'dummy=' + ts + '.gif';
	}
	var latlon = new ZDC.LatLon(lat, lon);
	var marker = new ZDC.Marker(latlon, {
		custom:{
			base:{
				src:image
			}
		},
		offset: ZDC.Pixel(offsetx, offsety)
	});
	marker.data = {id: id};
	if(typeof mouseclickmarker == 'function')
		ZDC.addListener(marker, ZDC.MARKER_MOUSEUP, mouseclickmarker);
	var tooltip = null;
	if(nflg == 1){
		tooltip = new ZDC.Marker(latlon, {
			custom:{
				base:{
					src:ZdcEmapIconImg['@NEW']
				}
			},
			offset: ZDC.Pixel(
				<?php echo $D_TOOLTIP_OFFSET_X; ?> - sizew / 2,
				<?php echo $D_TOOLTIP_OFFSET_Y; ?> + sizeh / 2
			)
		});
		tooltip.data = {id: id};
		if(typeof mouseclickmarker == 'function')
			ZDC.addListener(tooltip, ZDC.MARKER_MOUSEUP, mouseclickmarker);
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

//フキダシ表示
<?php //function ZdcEmapShopMsg(id, link) {	mod 2012/02/02 N.Wada ?>
<?php // function ZdcEmapShopMsg(id, link, maptype) {// mod 2014/08/18 AnPham ?>
function ZdcEmapShopMsg(id, link, maptype, overlap) {
	<?php // add 2014/08/18 AnPham [?>
	// set default value for overlap parameter
	overlap = typeof overlap !== 'undefined' ? overlap : '';
	<?php // add 2014/08/18 AnPham ]?>
	ZdcEmapReadOn();
	ZdcEmapShopMsgClose(); 
//	//アイコンを前面に出す
//	if(id != null) ZdcEmapMapFrontShopMrk(id);
//	else ZdcEmapMapFrontShopDetail();
	//デザイン
	<?PHP //echo $D_JSCODE_MSGSHOP;		del 2015/06/08 Y.Matsukawa ?>
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	if(id != null) var obj = ZdcEmapMapUserLyr.getMarkerById(ZdcEmapMapShopMrkId[id]);
	//	else var obj = ZdcEmapMapUserLyr.getMarkerById(ZdcEmapMapShopDetailMrkId);
	// del 2015/06/08 Y.Matsukawa ]
	?>
	var obj = ZdcEmapListMarkers[id];		<?php // add 2015/06/08 Y.Matsukawa ?>
	//フキダシを表示させる
	<?php // add 2014/08/18 AnPham [?>
	<?php //if( overlap == 1) {		del 2016/03/16 Y.Matsukawa ?>
		<?php
		// del 2015/07/01 Y.Matsukawa [
		//		var kidprm = "";
		//		for (var i = 0; i < IconGrp.length; i++) {
		//			var grpKid = IconGrp[i].split(',');
		//			if( grpKid.length > 1) { 
		//				if( grpKid.indexOf( obj.data1) == 0) {// choosen "clicked icon" is first.
		//					for( var k=0; k < grpKid.length; k++ ){
		//						if( grpKid[k] == ""){ continue; }
		//						kidprm += "&kid" + k + "=" + grpKid[k];
		//					}
		//				}
		//			} else if( grpKid.length == 1)
		//				kidprm += "&kid=" + obj.data1;
		//		}
		// add 2016/03/16 Y.Matsukawa ]
		?>
	<?php // add 2016/03/16 Y.Matsukawa [ ?>
	var kidprm = "";
	if( overlap == 2) {
		<?php // 同一位置拠点のグルーピング ?>
		if (IconGrp.length > 0) {
			for (var i = 0; i < IconGrp.length; i++) {
				var grpKid = IconGrp[i].split(',');
				if (grpKid[0] == obj.data1) {	// choosen "clicked icon" is first.
					if(grpKid.length > 1) {
						if (overlap == 2) grpKid.sort();
						for (var k = 0; k < grpKid.length; k++){
							if (grpKid[k] == "") {continue;}
							kidprm += "&kid" + k + "=" + grpKid[k];
						}
					} else {
						kidprm = "&kid="+obj.data1;
					}
				}
			}
		}
	} else if( overlap == 1) {
	<?php // add 2016/03/16 Y.Matsukawa ] ?>
		<?php // add 2015/07/01 Y.Matsukawa [ ?>
		<?php // アイコン重なり ?>
		<?php //var kidprm = '';		del 2016/03/16 Y.Matsukawa ?>
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
	<?php // add 2016/03/16 Y.Matsukawa [ ?>
	}
	if (overlap) {
	<?php // add 2016/03/16 Y.Matsukawa ] ?>
		var url = "<?PHP echo $D_DIR_BASE_L; ?>shop_msg.htm?cid=<?PHP echo $cid; ?>&id="+id+kidprm;
	} else  { <?php // add 2014/08/18 AnPham ] ?>
		var url = "<?PHP echo $D_DIR_BASE_L; ?>shop_msg.htm?cid=<?PHP echo $cid; ?>&id="+id+"&kid="+obj.data1;
	} <?php // add 2014/08/18 AnPham?>

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
		<?php
		// del 2015/06/08 Y.Matsukawa [
		//		var node = document.createElement('DIV');
		//		node.innerHTML = html;
		//		obj.openUserMsgWindow(ZdcEmapMsg,obj.Point,node,1);
		// del 2015/06/08 Y.Matsukawa ]
		?>
		<?php // add 2015/06/08 Y.Matsukawa [ ?>
		<?php // add start 2016/08/22 H.Yasunaga 711OMNI2用カスタマイズ [ ?>
		<?php if ($cid == '711OMNI2' || $cid == '711OMNI2test') { ?>
		ZdcEmapMsg = new ZDC.MsgInfo(ZdcEmapMapObj.getLatLon(), {
			'closeBtn':true 
		});
		ZDC.addListener(ZdcEmapMsg,ZDC.MSGINFO_CLOSE, function(){ ZdcEmapMsg = null; });
		ZdcEmapMapObj.addWidget(ZdcEmapMsg);
		<?php } ?>
		<?php // add end ] ?>
		ZdcEmapMsg.setHtml(html);
		ZdcEmapMsg.moveLatLon(obj.marker.getLatLon());
		ZdcEmapMsg.open();
		<?php // add 2015/06/08 Y.Matsukawa ] ?>
		ZdcEmapReadOff();
	<?php //});		mod 2012/09/10 Y.Matsukawa ?>
	}, false, 2);
}

<?php // add 2011/04/26 Y.Matsukawa ?>
//フキダシ（Maplink用）表示
function ZdcEmapShopMsgMaplink(parm_nm) {
	if (parm_nm == '') return;
	ZdcEmapReadOn();
	ZdcEmapShopMsgClose(); 
	//デザイン
	<?PHP //echo $D_JSCODE_MSGSHOP;		del 2015/06/08 Y.Matsukawa ?>

	<?php //var obj = ZdcEmapMapUserLyr.getMarkerById(ZdcEmapMapShopDetailMrkId);		del 2015/06/08 Y.Matsukawa ?>

	//フキダシを表示させる
	var url = "<?PHP echo $D_DIR_BASE_L; ?>maplink_msg.htm?"+parm_nm;
	<?php if($https_req){ ?>url += "&https_req=1";<?php } ?>
	//url += "<?php echo ($freeparms?'&'.$freeparms:''); ?>";		// add 2012/01/11 Y.Matsukawa	mod 2012/09/10 Y.Matsukawa
	url += "<?php echo ($freeparms_enc?'&'.$freeparms_enc:''); ?>";
	ZdcEmapHttpRequestHtml(url, function(html,status){
		if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> msg["+status+"]";
		<?php
		// del 2015/06/08 Y.Matsukawa [
		//		var node = document.createElement('DIV');
		//		node.innerHTML = html;
		//		obj.openUserMsgWindow(ZdcEmapMsg,obj.Point,node,1);
		// del 2015/06/08 Y.Matsukawa ]
		?>
		<?php // add 2015/06/08 Y.Matsukawa [ ?>
		<?php // add start 2016/08/22 H.Yasunaga 711OMNI2用カスタマイズ [ ?>
		<?php if ($cid == '711OMNI2' || $cid == '711OMNI2test') { ?>
		ZdcEmapMsg = new ZDC.MsgInfo(ZdcEmapMapObj.getLatLon(), {
			'closeBtn':true 
		});
		ZDC.addListener(ZdcEmapMsg,ZDC.MSGINFO_CLOSE, function(){ ZdcEmapMsg = null; });
		ZdcEmapMapObj.addWidget(ZdcEmapMsg);
		<?php } ?>
		<?php // add end ] ?>
		ZdcEmapMsg.setHtml(html);
		ZdcEmapMsg.moveLatLon(ZdcEmapListMarkers[0].marker.getLatLon());
		ZdcEmapMsg.open();
		<?php // add 2015/06/08 Y.Matsukawa ] ?>
		ZdcEmapReadOff();
	<?php //});		mod 2012/09/10 Y.Matsukawa ?>
	}, false, 2);
}

function ZdcEmapShopMsgClose() {
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	if (ZdcEmapMapObj.getUserMsgOpenStatus()) {
	//		ZdcEmapMapObj.closeUserMsgWindow();
	//	}
	// del 2015/06/08 Y.Matsukawa ]
	?>
	//ZdcEmapMapFrontShopReset();
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	if(ZdcEmapMsg != null)
		ZdcEmapMsg.close();
		<?php // add start 2016/08/22 H.Yasunaga 711OMNI2用カスタマイズ [ ?>
		<?php if ($cid == '711OMNI2' || $cid == '711OMNI2test') { ?>
		ZdcEmapMsg = null;
		<?php } ?>
		<?php // add end ] ?>
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
}

function ZdcEmapMapScaleToLvlSelect() {
	<?php //var newLvl = ZdcEmapMapObj.getMapScale();		mod 2015/06/08 Y.Matsukawa ?>
	var newLvl = DecRealZoom(ZdcEmapMapObj.getZoom()) + 1;
	var e = document.getElementById( "ZdcEmapLvlSelect" );
	for (var i = 0; i < e.options.length; ++i) {
		if (newLvl == e.options[i].value) {
			e.selectedIndex = i;
			break;
		}
	}
}

function ZdcEmapLvlSelectChanged() {
	var e = document.getElementById( "ZdcEmapLvlSelect" );
	var newLvl = e.options[e.selectedIndex].value;
	<?php //ZdcEmapMapObj.setMapScale(newLvl);		mod 2015/06/08 Y.Matsukawa ?>
	ZdcEmapMapObj.setZoom(EncRealZoom(newLvl) - 1);
}

function ZdcEmapResetMapLocation() {
	<?php //ZdcEmapMapObj.restoreMapLocation();		mod 2015/06/08 Y.Matsukawa ?>
	ZdcEmapMapObj.moveHome();
}

<?php // add 2012/08/16 K.Masuda [ ?>
// +-ボタン
function ZdcEmapLvlScaleBtn(){
<?php // mod 2014/02/27 H.Osamoto [ ?>
	//	var now_lvl = ZdcEmapMapObj.getMapScale();
	<?php //var now_lvl = parseInt(ZdcEmapMapObj.getMapScale());		mod 2015/06/08 Y.Matsukawa ?>
	var now_lvl = parseInt(DecRealZoom(ZdcEmapMapObj.getZoom()) + 1);
<?php // mod 2014/02/27 H.Osamoto ] ?>
	var btnp = document.getElementById( "ZdcEmapLvlBtnP" ); //（＋）
	var btnm = document.getElementById( "ZdcEmapLvlBtnM" ); //（−）
	<?php // del 2014/09/11 Y.Matsukawa [
	//	if( now_lvl == max_lvl ){
	//		if(btnm.src)btnm.src = "<?php echo $D_DIR_BASE_G; ? >img/btn_minus_dis.png"; //（−）
	//	} else if( now_lvl == min_lvl ){
	//		if(btnp.src)btnp.src = "<?php echo $D_DIR_BASE_G; ? >img/btn_plus_dis.png";  //（＋）
	//	} else {
	//		if(btnp.src)btnp.src = "<?php echo $D_DIR_BASE_G; ? >img/btn_plus_def.png";  //（＋）
	//		if(btnm.src)btnm.src = "<?php echo $D_DIR_BASE_G; ? >img/btn_minus_def.png"; //（−）
	//	}
	// del 2014/09/11 Y.Matsukawa ] ?>
	<?php // add 2014/09/11 Y.Matsukawa [ ?>
	if( now_lvl == max_lvl ){
		if(btnp.src)btnp.src = "<?php echo $D_DIR_BASE_G; ?>img/btn<?php echo $D_LVL_BTN_SIZE; ?>_plus_def.png";  //（＋）
		if(btnm.src)btnm.src = "<?php echo $D_DIR_BASE_G; ?>img/btn<?php echo $D_LVL_BTN_SIZE; ?>_minus_dis.png"; //（−）
	} else if( now_lvl == min_lvl ){
		if(btnp.src)btnp.src = "<?php echo $D_DIR_BASE_G; ?>img/btn<?php echo $D_LVL_BTN_SIZE; ?>_plus_dis.png";  //（＋）
		if(btnm.src)btnm.src = "<?php echo $D_DIR_BASE_G; ?>img/btn<?php echo $D_LVL_BTN_SIZE; ?>_minus_def.png"; //（−）
	} else {
		if(btnp.src)btnp.src = "<?php echo $D_DIR_BASE_G; ?>img/btn<?php echo $D_LVL_BTN_SIZE; ?>_plus_def.png";  //（＋）
		if(btnm.src)btnm.src = "<?php echo $D_DIR_BASE_G; ?>img/btn<?php echo $D_LVL_BTN_SIZE; ?>_minus_def.png"; //（−）
	}
	<?php // add 2014/09/11 Y.Matsukawa ] ?>
}
// +-ボタンでの地図縮尺変更
function ZdcEmapLvlScaleChanged(type){
<?php // mod 2014/02/27 H.Osamoto [ ?>
	//	var now_lvl = ZdcEmapMapObj.getMapScale();
	<?php //var now_lvl = parseInt(ZdcEmapMapObj.getMapScale());		mod 2015/06/08 Y.Matsukawa ?>
	var now_lvl = parseInt(DecRealZoom(ZdcEmapMapObj.getZoom()) + 1);
<?php // mod 2014/02/27 H.Osamoto ] ?>
	if( max_lvl <= now_lvl || now_lvl >= min_lvl ){
		if(type == 'p'){
			if( now_lvl < min_lvl ){
				now_lvl++;
			}
			<?php //ZdcEmapMapObj.setMapScale(now_lvl);		mod 2015/06/08 Y.Matsukawa ?>
			now_lvl = EncRealZoom(now_lvl);
			ZdcEmapMapObj.setZoom(now_lvl - 1);
		} else {
			if( now_lvl > max_lvl ){
				now_lvl--;
			}
			<?php //ZdcEmapMapObj.setMapScale(now_lvl);		mod 2015/06/08 Y.Matsukawa ?>
			now_lvl = EncRealZoom(now_lvl);
			ZdcEmapMapObj.setZoom(now_lvl - 1);
		}
	} else {
		if(type == 'p'){
			now_lvl = min_lvl;
		} else {
			now_lvl = max_lvl;
		}
		<?php //ZdcEmapMapObj.setMapScale(now_lvl);		mod 2015/06/08 Y.Matsukawa ?>
		now_lvl = EncRealZoom(now_lvl);
		ZdcEmapMapObj.setZoom(now_lvl - 1);
	}
	ZdcEmapLvlScaleBtn();
}
<?php // add 2012/08/16 K.Masuda ] ?>

//地図移動
function ZdcEmapMapMoveBox(minlat,minlon,maxlat,maxlon,pt,noin){
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	var p1 = new ZdcPoint(minlon,minlat,< ?PHP echo $D_PFLG; ? >);
	//	var p2 = new ZdcPoint(maxlon,maxlat,< ?PHP echo $D_PFLG; ? >);
	//	var bx = new ZdcBox(p1,p2);
	//	if(pt != null) {
	//		var s = ZdcEmapMapObj.getMapBoxScale(bx,pt);
	//		ZdcEmapMapObj.setMapLocation(pt);
	//		if(noin != 1 || (noin == 1 && s < ZdcEmapMapObj.getMapScale())) ZdcEmapMapObj.setMapScale(s);
	//	} else {
	//		var s = ZdcEmapMapObj.getMapBoxScale(bx);
	//		ZdcEmapMapObj.setMapLocation(bx.getBoxCenter());
	//		if(noin != 1 || (noin == 1 && s < ZdcEmapMapObj.getMapScale())) ZdcEmapMapObj.setMapScale(s);
	//	}
	// del 2015/06/08 Y.Matsukawa ]
	?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	var swLatlon = new ZDC.LatLon(minlat, minlon);
	var neLatlon = new ZDC.LatLon(maxlat, maxlon);
	var latlons = [swLatlon, neLatlon];
	if(pt != null) {
		latlons.push(pt);
		var adjust = ZdcEmapMapObj.getAdjustZoom(latlons, {fix: true});
	} else {
		var adjust = ZdcEmapMapObj.getAdjustZoom(latlons, {fix: false});
	}
	if(null != adjust){
		ZdcEmapMapObj.moveLatLon(adjust.latlon);
		if(noin != 1 || (noin == 1 && adjust.zoom < ZdcEmapMapObj.getZoom()))
			ZdcEmapMapObj.setZoom(adjust.zoom);
	}
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
}

<?php // 神奈川電通地図移動		add 2012/12/17 H.Osamoto [ ?>
function ZdcEmapMapMoveBoxKanaden(minlat,minlon,maxlat,maxlon){
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	var p1 = new ZdcPoint(minlon,minlat,< ?PHP echo $D_PFLG; ? >);	< ?php // 現在位置 ? >
	//	var p2 = new ZdcPoint(maxlon,maxlat,< ?PHP echo $D_PFLG; ? >);	< ?php // 目的地 ? >
	//	var bx = new ZdcBox(p1,p2);
	//	var s = ZdcEmapMapObj.getMapBoxScale(bx, p1);
	//	ZdcEmapMapObj.setMapLocation(p1);
	//	ZdcEmapMapObj.setMapScale(s);
	// del 2015/06/08 Y.Matsukawa ]
	?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	var swLat = ZDC.msTodeg(minLat);
	var swLon = ZDC.msTodeg(minLon);
	var neLat = ZDC.msTodeg(maxLat);
	var neLon = ZDC.msTodeg(maxLon);
	var swLatlon = new ZDC.LatLon(swLat, swLon);
	var neLatlon = new ZDC.LatLon(neLat, neLon);
	var adjust = ZdcEmapMapObj.getAdjustZoom([swLatlon, neLatlon], {
		fix: false
	});
	ZdcEmapMapObj.moveLatLon(adjust.latlon);
	ZdcEmapMapObj.setZoom(adjust.zoom);
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
}
<?php // 神奈川電通目的地アイコン表示		add 2012/12/17 H.Osamoto ] ?>

// 最寄り店舗分布表示
function ZdcEmapSearchShopStart(cond) {
<?php	//ZdcEmapSearchFirst = 1;		del 2012/10/24 Y.Matsukawa ?>
<?php // add 2012/10/24 Y.Matsukawa [ ?>
<?php	// 指定半径で検索し、ヒットした店舗が全て入りきる縮尺に変更する
		if($D_SHOP_SCALE_OPT) { ?>
	ZdcEmapSearchFirst = 1;
<?php	// 初期表示縮尺の地図範囲で検索する（縮尺変更なし）
		} else { ?>
<?php 		// ヒット0件だったら指定半径で再検索する
			if($D_SHOP_SEARCH_RETRY) { ?>
	ZdcEmapSearchRetry = 1;
<?php 		} ?>
<?php	} ?>

	ZdcEmapSearchCond = cond;

<?php // add 2012/10/24 Y.Matsukawa ] ?>
	<?php
	// add 2015/05/25 Y.Matsukawa [
	// セブン&アイOMNI専用最寄り検索
	if ($D_711OMNI_INIT_RAD) {	// 初期範囲(800m)にSEJが1件以上あればその範囲で検索、なければ既定(5km)の地図範囲で検索
	?>
		ZdcEmap711omniSearchShop(<?php echo $D_711OMNI_INIT_RAD; ?>);
		return;
	<?php
	} else if ($D_711OMNI_ALT_RAD) {	// 初期検索なしの場合は、最初から既定(5km)の地図範囲で検索
	?>
		var latlons = ZdcEmapGetPointsByRad(ZdcEmapMapObj.getLatLon(), <?php echo $D_711OMNI_ALT_RAD; ?>)
		var zi = ZdcEmapMapObj.getAdjustZoom(latlons, {fix:true});
		ZdcEmapMapObj.setZoom(zi.zoom);
		ZdcEmapSearchFirst = 0;		<?php //地図範囲を検索 ?>
	<?php
	}
	// add 2015/05/25 Y.Matsukawa ] ?>

	<?php
	// add 2017/02/02 K.Tani [
	// セブン&アイ 711apl専用最寄り検索
	if ($D_711APL_INIT_RAD) {	// 初期範囲(800m)にSEJが1件以上あればその範囲で検索、なければ既定(5km)の地図範囲で検索
	?>
		ZdcEmap711aplSearchShop(<?php echo $D_711APL_INIT_RAD; ?>);
		return;
	<?php
	}
	// add 2017/02/02 K.Tani ] ?>

	ZdcEmapSearchClickFlg = 1;		// add 2011/06/29 Y.Matsukawa
	ZdcEmapSearchShop(cond);
	ZdcEmapSearchEventAdd("ZdcEmapSearchShop('"+cond+"')");

    <?php
	// add 2012/02/29 K.Masuda [
	if($D_SEARCH_MAP_ICON){
	?>
	ZdcEmapSearchMapIcon();
    <?php
	}
	// add 2012/02/29 K.Masuda ]
	?>
}
<?php
// add 2012/02/29 K.Masuda [
//検索初期位置にアイコンを表示
?>
function ZdcEmapSearchMapIcon() {
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	//アイコン表示位置設定
	//	var p = new ZdcPoint();
	//	p = ZdcEmapMapObj.getMapLocation();
	//	ZdcEmapIconPoint = new ZdcPoint(p.mx, p.my, 2);
	//	//ユーザレイヤー作成
	//	ZdcEmapIconLayer = new ZdcUserLayer();
	//	ZdcEmapIconLayer.setLayerScale(1, 15);
	//	//アイコン作成
	//	ZdcEmapIcon1 = new ZdcIcon();
	//	ZdcEmapIcon1.offset = new ZdcPixel(< ?PHP echo ceil(- $D_ICON_SHOP_W / 2); ? >, < ?PHP echo ceil(- $D_ICON_SHOP_H / 2); ? >);
	//	ZdcEmapIcon1.image = '< ?PHP echo $D_ICON_SHOP_IMG; ? >';
	//	//ユーザレイヤーに追加
	//	ZdcEmapIconLayer.addMarker(new ZdcMarker(ZdcEmapIconPoint, ZdcEmapIcon1));
	//	//地図にユーザレイヤーを追加
	//	ZdcEmapMapObj.addUserLayer(ZdcEmapIconLayer);
	// del 2015/06/08 Y.Matsukawa ]
	?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	var latlon = ZdcEmapMapObj.getLatLon();
	var marker = new ZDC.Marker(latlon, {
		custom:{
			base:{
				src: '<?php echo $D_ICON_SHOP_IMG; ?>'
			}
		},
		offset: ZDC.Pixel(
			<?php echo ceil(- $D_ICON_SHOP_W / 2); ?>, <?php echo ceil(- $D_ICON_SHOP_H / 2); ?>
		)
	});
	ZdcEmapMapObj.addWidget(marker);
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
}
<?php
// add 2012/02/29 K.Masuda ]
// 最寄り店舗分布再検索		add 2011/08/10 H.osamoto
?>
<?php //function ZdcEmapResearchShopStart(cond) {		mod 2012/02/21 Y.Matsukawa ?>
function ZdcEmapResearchShopStart(cond, cond2) {
	<?php // add 2012/02/21 Y.Matsukawa [ ?>
	var jkn = "";
	if (cond) jkn += cond;
	if (cond2) {
		if (jkn) jkn += " AND ";
		jkn += "("+cond2+")";
	}
	<?php // add 2012/02/21 Y.Matsukawa ] ?>
	ZdcEmapSearchFirst = 1;
	ZdcEmapSearchPoint = null;//必ず再検索させるため
	<?php //ZdcEmapSearchShop(cond);		mod 2012/02/21 Y.Matsukawa ?>
	ZdcEmapSearchShop(jkn);
	<?php //ZdcEmapSearchEventAdd("ZdcEmapSearchShop('"+cond+"')");		mod 2012/02/28 Y.Matsukawa ?>
	ZdcEmapSearchEventAdd("ZdcEmapSearchShop('"+jkn+"')");
}
function ZdcEmapSearchShop(cond) {
	ZdcEmapReadOn();
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	//位置・範囲取得
	//	var p   = new ZdcPoint();
	//	p = ZdcEmapMapObj.getMapLocation();
	//	var box = ZdcEmapMapObj.getMapBoundBox();
	//	//検索するか否かの判断
	//	if(ZdcEmapSearchPoint != null) {
	//		var pix1 = ZdcEmapMapObj.convertPoint2Pixel( ZdcEmapSearchPoint, 2 );
	//		var pix2 = ZdcEmapMapObj.convertPoint2Pixel( p, 2 );
	//		if(Math.abs(pix1.x-pix2.x) < < ?PHP echo $D_SHOP_SEARCHPIX; ? > && 
	//		   Math.abs(pix1.y-pix2.y) < < ?PHP echo $D_SHOP_SEARCHPIX; ? > &&
	//		   ZdcEmapSearchScale == ZdcEmapMapObj.getMapScale()) {
	//			ZdcEmapReadOff();
	//			return;
	//		}
	//	}
	// del 2015/06/08 Y.Matsukawa ]
	?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	var p = ZdcEmapMapObj.getLatLon();
	var box =  ZdcEmapMapObj.getLatLonBox();
	if(ZdcEmapSearchPoint != null){
		var pix1 = ZdcEmapMapObj.latLonToTL(ZdcEmapSearchPoint);
		var pix2 = ZdcEmapMapObj.latLonToTL(p);
		if(Math.abs(pix1.left-pix2.left) < <?PHP echo $D_SHOP_SEARCHPIX; ?>
		&& Math.abs(pix1.top-pix2.top) < <?PHP echo $D_SHOP_SEARCHPIX; ?>
		&& ZdcEmapSearchScale == ZdcEmapMapObj.getZoom()) {
			ZdcEmapReadOff();
			return;
		}
	}
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
	if(ZdcEmapSearchPoint != null && <?PHP echo $D_SHOP_SEARCHPIX; ?> == -1) {
		//自動再検索しない
		ZdcEmapReadOff();
		return;
	}
	//自動検索イベント停止
	ZdcEmapSearchEventStop();
	ZdcEmapNListEventStop();	<?php // add 2016/04/14 Y.Matsukawa ?>
	//ZdcEmapShopMsgClose();
	//
	var opts = new ZdcNearShopOptions();
	//opts.cid='<?PHP echo $D_CID; ?>'		mod 2012/01/19 N.Wada
	opts.cid='<?PHP echo $D_DATA_CID; ?>'
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	opts.lat = p.my;
	//	opts.lon = p.mx;
	// del 2015/06/08 Y.Matsukawa ]
	?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	opts.lat = ZDC.degToms(p.lat);
	opts.lon = ZDC.degToms(p.lon);
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
	if(ZdcEmapSearchFirst != 1) {
		<?php //opts.latlon = box.miny+","+box.minx+","+box.maxy+","+box.maxx;		del 2015/06/08 Y.Matsukawa ?>
		<?php // add 2015/06/08 Y.Matsukawa [ ?>
		opts.latlon = ZDC.degToms(box.getMin().lat)
				+ "," + ZDC.degToms(box.getMin().lon)
				+ "," + ZDC.degToms(box.getMax().lat)
				+ "," + ZDC.degToms(box.getMax().lon);
		<?php // add 2015/06/08 Y.Matsukawa ] ?>
		opts.radius = <?PHP echo $D_SHOP_RAD_RE; ?>;
		
	} else {
		ZdcEmapSearchFirst = 0;
		<?php // add 2013/05/22 H.Osamoto [ ?>
		<?php if (isset($D_RESEARCH_CNT) && $D_RESEARCH_CNT) { ?>
		opts.researchCount = <?PHP echo $D_RESEARCH_CNT; ?>;
		<?php } ?>
		<?php // add 2013/05/22 H.Osamoto ] ?>
		opts.radius = <?PHP echo $D_SHOP_RAD; ?>;
		
		<?php // add 2016/12/14 T.Yoshino [ ?>
		<?php if (isset($D_SHOPMAP_FIRST_CNT_CUST) && $D_SHOPMAP_FIRST_CNT_CUST) { ?>
		var custCnt = <?PHP echo $D_SHOPMAP_FIRST_CNT_CUST; ?>;
		if(custCnt)opts.researchCount = custCnt;
		<?php } ?>
		<?php // add 2016/12/14 T.Yoshino ] ?>
		
	}
	if (cond) opts.jkn = cond;
	opts.pos = 1;
	<?php //opts.maxCount = < ?PHP echo $D_SHOP_MAX; ? >;		mod 2016/04/08 Y.Matsukawa ?>
	opts.maxCount = <?PHP echo $D_SHOP_MAP_MAX; ?>;
	<?php //opts.limitCount = < ?PHP echo $D_SHOP_MAX; ? >;		mod 2016/04/08 Y.Matsukawa ?>
	opts.limitCount = <?PHP echo $D_SHOP_MAP_MAX; ?>;
	
	<?php // add 2016/12/14 T.Yoshino [ ?>
	<?php if (isset($D_SHOPMAP_FIRST_CNT_CUST) && $D_SHOPMAP_FIRST_CNT_CUST) { ?>
	if(custCnt)opts.maxCount = custCnt;
	if(custCnt)opts.limitCount = custCnt;
	<?php } ?>
	<?php // add 2016/12/14 T.Yoshino ] ?>
	
	opts.timeout = <?PHP echo $D_AJAX_TIMEOUT; ?>;
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
	// add 2014/03/07 H.Osamoto [
	if (isset($D_POLY_COL) && $D_POLY_COL != '') {
?>
	opts.polycol = "<?php echo $D_POLY_COL; ?>";
<?php
	}
	// add 2014/03/07 H.Osamoto ]
?>
<?php
	// add 2014/03/12 Y.Matsukawa [
	// 任意地点から任意範囲外の拠点を除外
	if(isset($D_SHOP_EXAREA)) {
?>
	opts.exarea = "<?php echo $D_SHOP_EXAREA['lat'].','.$D_SHOP_EXAREA['lon'].','.$D_SHOP_EXAREA['rad']; ?>";
<?php
	}
	// add 2014/03/12 Y.Matsukawa ]
?>
	<?php //ZdcEmapNearShop.opts = opts;		mod 2015/06/08 Y.Matsukawa ?>
	ZdcEmapNearShop2.opts = opts;
	
	//アイコンを表示する
	<?php //ZdcEmapNearShop.search(opts,ZdcEmapSearchShopResult);		mod 2015/06/08 Y.Matsukawa ?>
	ZdcEmapNearShop2.search(opts,ZdcEmapSearchShopResult);
	
	<?php
	// 最寄り地図画面に一覧を表示		add 2016/02/22 Y.Matsukawa
	if ($D_NMAP_AND_NLIST) {
	?>
	<?php
	// 再検索時、最寄りリストは更新しない		add 2017/02/03 K.Tani [
	if ($D_SHOP_NO_UPDATE_LIST_USER_ACT) { ?>
		// 初回表示以外
		if(ZdcEmapSearchBox){
			ZdcEmapNListEventStart(); // 地図は更新されるよう、フラグを戻す
			return;
		}
	<?php
	}
	// add 2017/02/03 K.Tani ]
	?>

	ZdcEmapNearShopInit();
	ZdcEmapSearchNShopListObj.innerHTML = "";
	<?php // add 2016/03/09 Y.Matsukawa [ ?>
	var parm = "<?php echo ($freeparms_enc?'&'.$freeparms_enc:''); ?>";
	if (opts.latlon) parm += "&latlon="+opts.latlon;
	if (opts.radius) parm += "&rad="+opts.radius;
	<?php // add 2016/03/09 Y.Matsukawa ] ?>
	<?php //ZdcEmapSearchNearShop(opts.lat, opts.lon, "", "", "", opts.jkn, 1);		mod 2016/03/09 Y.Matsukawa ?>
	ZdcEmapSearchNearShop(opts.lat, opts.lon, "", "", parm, ZdcEmapGetCondParm(true), 1);
	<?php
	}
	?>
}

var IconGrp = new Array();		<?php // add 2016/03/16 Y.Matsukawa ?>
//検索結果の処理
function ZdcEmapSearchShopResult(result) {
	var i,item,mrk,tmp,icnt,maxlat=0,maxlon=0,minlat=999999999,minlon=999999999;
	var tooltip_w,tooltip_h,tooltip_offset_x,tooltip_offset_y;		// add 2011/08/10 H.Osamoto
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	//マーカー削除
	//	if(ZdcEmapMapShopMrkCnt != null) {
	//		for( i = 0;i < ZdcEmapMapShopMrkCnt;i ++) {
	//			ZdcEmapMapUserLyr.removeMarkerById(ZdcEmapMapShopMrkId[i]);
	//			ZdcEmapMapUserLyr.clearZdcTooltip();	// add 2011/08/10 H.osamoto
	//			ZdcEmapMapShopMrkId[i] = null;
	//		}
	//	}
	//	ZdcEmapMapShopMrkCnt = 0;
	// del 2015/06/08 Y.Matsukawa ]
	?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	for(i = 0; i < ZdcEmapListMarkers.length; i++){
		ZdcEmapMapObj.removeWidget(ZdcEmapListMarkers[i].marker);
		if(ZdcEmapListMarkers[i].tooltip)
			ZdcEmapMapObj.removeWidget(ZdcEmapListMarkers[i].tooltip);
	}
	ZdcEmapListMarkers = [];
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
	//エラー処理
	if(result.status != 0 && result.status != 3 && result.status != 5 && result.status != 9) {
		alert("<?PHP echo $D_MSG_ERR_JS_RESULT; ?> listres["+result.status+"]");
		ZdcEmapSearchEventStart();
		<?php //ZdcEmapSearchShopClose();		del 2015/07/01 Y.Matsukawa ?>
		ZdcEmapReadOff();
		return;
	}
	<?php
	// add 2016/03/16 Y.Matsukawa [
	// 緯度経度が完全一致する拠点を調査
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
	// add 2016/03/16 Y.Matsukawa ]
	?>

	// add 2011/08/10 H.Osamoto [
	<?php 
	// del 2015/06/08 Y.Matsukawa [
	//	if ($D_TOOLTIP_W && $D_TOOLTIP_H) { 
	//	? >
	//		tooltip_w = < ?PHP echo $D_TOOLTIP_W; ? >;
	//		tooltip_h = < ?PHP echo $D_TOOLTIP_H; ? >;
	//		tooltip_offset_x = < ?PHP echo $D_TOOLTIP_OFFSET_X; ? >;
	//		tooltip_offset_y = < ?PHP echo $D_TOOLTIP_OFFSET_Y; ? >;
	//	< ?php 
	//	}
	// del 2015/06/08 Y.Matsukawa ]
	?>
<?php
// add 2012/01/10 N.Wada [
// 表示する店舗を選別
if ( isset($D_SHOP_RAD_SCREENING) && $D_SHOP_RAD_SCREENING ) {
	// リスト内には距離が近い順に店舗が格納されている前提で処理を行う
	// アルゴリズムはnlist.htmと合わせておくこと
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
// add 2012/01/10 N.Wada ]
?>
	// add 2011/08/10 H.Osamoto ]
	//地図に置く
	icnt = result.items.length;
	if (icnt > 0) {
		for (i=icnt-1; i>=0; i--) {
<?php
// add 2012/01/10 N.Wada [
if ( isset($D_SHOP_RAD_SCREENING) && $D_SHOP_RAD_SCREENING ) {
	// 表示させる店舗数を超えた場合は、表示しないよう処理を飛ばす
?>
		if( i >= shop_cnt_total ) continue;
<?php
}
// add 2012/01/10 N.Wada ]
?>
			item = result.items[i];
			if(!item.icon) break;
			if(item.nflg == 1) tmp = ZdcEmapIconImg["@NEW"];
				else tmp = "";
			// add 2011/08/10 H.Osamoto [
			// アイコン位置を指定する場合は通常のnewアイコン表示処理を行わない
			if (tooltip_w && tooltip_h) {
				tmp = "";
			}
			// 無効なアイコンIDの場合は透明アイコンに差し替え		add 2012/11/15 Y.Matsukawa
			if (ZdcEmapIconImg[item.icon] == null) ZdcEmapIconImg[item.icon] = ZdcEmapIconImg["@TP"];
			// add 2011/08/10 H.Osamoto ]
			mrk = ZdcEmapMakeMrk(i,item.lat,item.lon,
								ZdcEmapIconW[item.icon],ZdcEmapIconH[item.icon],ZdcEmapIconW['@NEW'],ZdcEmapIconH['@NEW'],
								ZdcEmapIconOffsetX[item.icon],ZdcEmapIconOffsetY[item.icon],ZdcEmapIconW[item.icon]-ZdcEmapIconW['@NEW'],ZdcEmapIconH[item.icon],<?PHP echo $D_ICON_MSGOFFSETX; ?>,<?PHP echo $D_ICON_MSGOFFSETY; ?>,
								ZdcEmapIconImg[item.icon],tmp,
								item.id,item.icon,item.nflg,
								<?php //function() { ZdcEmapShopMsg(this.id, 1); },	mod 2012/02/02 N.Wada ?>
								<?php // function() { ZdcEmapShopMsg(this.id, 1, 'bunpu'); },// mod 2014/08/18 AnPham ?>
								<?php //function() { ZdcEmapShopMsg(this.id, 1, 'bunpu', < ?php echo empty($D_KYO_ICON_OVERLAP)?'""':$D_KYO_ICON_OVERLAP; ? >); },		mod 2015/06/08 Y.Matsukawa ?>
								<?php //del start 2016/07/29 H.Yasunaga 2016/07/11に変更した処理をなくす [ ?>
								<?php //add start 2016/07/11 H.Yasunaga 711OMNI2はアイコンタップ時のメッセージを表示しない [ ?>
								<?php /*if (isset($D_711OMNI2) == false || $D_711OMNI2 = 0) {*/ ?>
								<?php //del end ] ?>
								function() { ZdcEmapShopMsg(this.data.id, 1, 'bunpu', <?php echo empty($D_KYO_ICON_OVERLAP)?'""':$D_KYO_ICON_OVERLAP; ?>); },
								<?php //del start 2016/07/29 H.Yasunaga 2016/07/11に変更した処理をなくす [ ?>
								<?php /*} else {*/ ?>
								//null,
								<?php /*}*/ ?>
								<?php // add end 2016/07/11 H.Yasunaga ] ?>
								<?php // del end 2016/07/29 H.Yasunaga ] ?>
								null,
								null,
								item.lvl
								);
			<?php
			// del 2015/06/08 Y.Matsukawa [
			//			if (ZdcEmapMapShopMrkId[i] != null) ZdcEmapMapUserLyr.removeMarkerById(ZdcEmapMapShopMrkId[i]);//念のため
			//			ZdcEmapMapShopMrkId[i] = ZdcEmapMapUserLyr.addMarker(mrk);
			//			if (item.nflg == 1) {
			//				var tooltip = new ZdcTooltip();
			//				var tooltipHTML = '<img src="'+ZdcEmapIconImg["@NEW"]+'">';
			//				tooltip.setZdcTooltip(mrk.Point, tooltipHTML, tooltip_w, tooltip_h, new ZdcPixel(tooltip_offset_x, tooltip_offset_y), 4);
			//				tooltip.mrkid = mrk.id;
			//				< ?php	//ZdcEvent.addListener(tooltip, "mouseclicktooltip", function() { ZdcEmapShopMsg(this.mrkid, 1); });	mod 2012/02/02 N.Wada ? >
			//				ZdcEvent.addListener(tooltip, "mouseclicktooltip", function() { ZdcEmapShopMsg(this.mrkid, 1, 'bunpu'); });
			//				ZdcEmapMapUserLyr.addZdcTooltip(tooltip);
			//				mrk.toolid = tooltip.id;
			//				ZdcEmapMapUserLyr.visibleZdcTooltipById(mrk.toolid);
			//			}
			// del 2015/06/08 Y.Matsukawa ]
			?>
			// add 2011/08/10 H.osamoto [
			<?php // add 2015/06/08 Y.Matsukawa [ ?>
			ZdcEmapMapObj.addWidget(mrk.marker);
			ZdcEmapListMarkers[i] = mrk;
			if(mrk.tooltip != null)
				ZdcEmapMapObj.addWidget(mrk.tooltip);
			<?php // add 2015/06/08 Y.Matsukawa ] ?>
			// add 2011/08/10 H.osamoto ]
			//最大最小緯度経度取得
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
			<?php //ZdcEmapMapShopMrkCnt ++;		del 2015/06/08 Y.Matsukawa ?>
			ZdcEmapIconDt[i] = item.lat + ":" + item.lon + ":" + ZdcEmapIconW[item.icon] + ":" + ZdcEmapIconH[item.icon];<?php // add 2014/08/18 AnPham?>
		}
		ZdcEmapSearchRetryVCnt = 0;		<?php // add 2012/10/24 Y.Matsukawa ?>
		// add 2011/06/29 Y.Matsukawa [
		if(ZdcEmapSearchClickFlg) {
			ZdcEmapSearchClickFlg = 0;
		// add 2011/06/29 Y.Matsukawa ]
			//初期検索時は画面移動
			<?php //if (ZdcEmapMapShopMrkCnt > 0) {		mod 2015/06/08 Y.Matsukawa ?>
			if(ZdcEmapListMarkers.length > 0){
				//拠点が収まる範囲に移動
				<?php //ZdcEmapMapMoveBox(minlat,minlon,maxlat,maxlon,ZdcEmapMapObj.getMapLocation(),1);		mod 2015/06/08 Y.Matsukawa ?>
				ZdcEmapMapMoveBox(ZDC.msTodeg(minlat), ZDC.msTodeg(minlon), ZDC.msTodeg(maxlat), ZDC.msTodeg(maxlon), ZdcEmapMapObj.getLatLon(), 1);
			} else {
				//検索半径の縮尺に移動
				<?php
				// del 2015/06/08 Y.Matsukawa [
				//				var p = new ZdcPoint();
				//				p = ZdcEmapMapObj.getMapLocation();
				//				var rx = parseInt((450000 / (11 * 1000)) * < ?PHP echo $D_SHOP_RAD; ? >);//CGIと計算をあわせる
				//				var ry = parseInt((300000 / (9 * 1000)) * < ?PHP echo $D_SHOP_RAD; ? >);//〃
				//				var p1 = new ZdcPoint(p.mx - rx,p.my - ry,< ?PHP echo $D_PFLG; ? >);
				//				var p2 = new ZdcPoint(p.mx + rx,p.my + ry,< ?PHP echo $D_PFLG; ? >);
				//				var bx = new ZdcBox(p1,p2);
				//				var lv = ZdcEmapMapObj.getMapBoxScale( bx, p );
				//				if(lv < 18) lv = lv + 1;//１つズームイン
				//				ZdcEmapMapObj.setMapScale(lv);
				// del 2015/06/08 Y.Matsukawa ]
				?>
				<?php // add 2015/06/08 Y.Matsukawa [ ?>
				var p = ZdcEmapMapObj.getLatLon();
				var rx = parseInt((450000 / (11 * 1000)) * <?PHP echo $D_SHOP_RAD; ?>);//CGIと計算をあわせる
				var ry = parseInt((300000 / (9 * 1000)) * <?PHP echo $D_SHOP_RAD; ?>);//〃
				ZdcEmapMapMoveBox(
					p.lat - ZDC.msTodeg(rx),
					p.lon - ZDC.msTodeg(ry),
					p.lat + ZDC.msTodeg(rx),
					p.lon + ZDC.msTodeg(ry),
					p
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
			ZdcEmapSearchPoint = null;//必ず再検索させるため
			ZdcEmapSearchRetryVCnt = <?php echo $D_SHOP_SEARCH_RETRY_VCNT; ?>;
			ZdcEmapReadOff();
			ZdcEmapSearchShop(ZdcEmapSearchCond);
			return;
		}
<?php	// add 2012/10/24 Y.Matsukawa ] ?>
	}
	
	<?php //add 2016/09/15 T.Yoshino ?>
	// 再検索時に吹き出しを削除
	if( <?php if(isset($D_RELOAD_BALLOON)){echo "true";}else{echo "false";} ?> ){
		ZdcEmapShopMsgClose();
	}
	
	<?php //ZdcEmapMapObj.reflashMap();		del 2015/06/08 Y.Matsukawa ?>
	ZdcEmapSearchEventStart();
	//検索位置を保持
	<?php //ZdcEmapSearchPoint = ZdcEmapMapObj.getMapLocation();		mod 2015/06/08 Y.Matsukawa ?>
	ZdcEmapSearchPoint = ZdcEmapMapObj.getZoom();
	<?php //ZdcEmapSearchScale = ZdcEmapMapObj.getMapScale();		mod 2015/06/08 Y.Matsukawa ?>
	ZdcEmapSearchScale = ZdcEmapMapObj.getLatLon();
	<?php // add 2017/02/03 K.Tani [ ?>
	// 初期表示の地図範囲を保持
	if(!ZdcEmapSearchBox){
		ZdcEmapSearchBox = ZdcEmapMapObj.getLatLonBox();
	}
	<?php // add 2017/02/03 K.Tani ] ?>
	
	ZdcEmapReadOff();

	<?php 
	// add 2014/08/18 AnPham [
	if( $D_KYO_ICON_OVERLAP == 1) {?>
	ZdcEmapIconOverlap(icnt,ZdcEmapSearchScale);
	<?php }
	// add 2014/08/18 AnPham ]
	?>
}

// 検索イベント開始
function ZdcEmapSearchEventStart() {
	ZdcEmapSearchEventFlg = 1;
}
// 検索イベント停止
function ZdcEmapSearchEventStop() {
	ZdcEmapSearchEventFlg = 0;
}

<?php // 最寄り一覧 検索イベント開始		add 2016/04/14 Y.Matsukawa ?>
function ZdcEmapNListEventStart() {
	ZdcEmapNListEventFlg = 1;
}
<?php // 最寄り一覧 検索イベント停止		add 2016/04/14 Y.Matsukawa ?>
function ZdcEmapNListEventStop() {
	ZdcEmapNListEventFlg = 0;
}

<?php
// del 2015/06/08 Y.Matsukawa [
// フキダシを閉じる
//function ZdcEmapShopMsgClose() {
//	if (ZdcEmapMapObj.getUserMsgOpenStatus()) {
//		ZdcEmapMapObj.closeUserMsgWindow();
//	}
//}
// del 2015/06/08 Y.Matsukawa ]
?>

//検索実行
function ZdcEmapSearchEventAction() {
	if(!ZdcEmapSearchEventFlg) return;
<?php
	// add 2016/04/14 Y.Matsukawa [
	// 最寄り地図画面に一覧を表示している場合、一覧の検索が完了するまではイベント再開しない
	if ($D_NMAP_AND_NLIST) {
?>
	if(!ZdcEmapNListEventFlg) return;
<?php
	}
	// add 2016/04/14 Y.Matsukawa ]
?>
	//if(ZdcEmapMapObj.getUserMsgOpenStatus()) return;//フキダシ表示中は検索しない
<?php	// add 2012/01/10 N.Wada [
		// 地図操作時に再検索しないモード
		if ($D_SHOP_NO_SEARCH_USER_ACT) { ?>
	return;
<?php	}
	// add 2012/01/10 N.Wada ] ?>
	eval(ZdcEmapSearchEventFunc);
}
//検索イベント追加
function ZdcEmapSearchEventAdd(func) {
	ZdcEmapSearchEventDel();
	ZdcEmapSearchEventFunc = func;
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	ZdcEmapSearchEventDragmapend    = ZdcEvent.addListener(ZdcEmapMapObj, "dragmapend"   , ZdcEmapSearchEventAction);
	//	ZdcEmapSearchEventScrollmapend  = ZdcEvent.addListener(ZdcEmapMapObj, "scrollmapend" , ZdcEmapSearchEventAction);
	//	ZdcEmapSearchEventChangezoomend = ZdcEvent.addListener(ZdcEmapMapObj, "changezoomend", ZdcEmapSearchEventAction);
	// del 2015/06/08 Y.Matsukawa ]
	?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	ZdcEmapSearchEventDragmapend = ZDC.addListener(
		ZdcEmapMapObj, ZDC.MAP_CHG_LATLON, ZdcEmapSearchEventAction
	);
	// Due when map move box not finish will double search
	// The function move box haven't callback function
	setTimeout(function(){
		ZdcEmapSearchEventChangezoomend = ZDC.addListener(
			ZdcEmapMapObj, ZDC.MAP_CHG_ZOOM, ZdcEmapSearchEventAction
		);
	}, 400);
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
}
//検索イベント削除
function ZdcEmapSearchEventDel() {
	ZdcEmapSearchEventStop();
	ZdcEmapNListEventStop();	<?php // add 2016/04/14 Y.Matsukawa ?>
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	if(ZdcEmapSearchEventDragmapend)    ZdcEvent.removeListener(ZdcEmapSearchEventDragmapend);
	//	//if(ZdcEmapSearchEventScrollmapend)  ZdcEvent.removeListener(ZdcEmapSearchEventScrollmapend);
	//	if(ZdcEmapSearchEventChangezoomend) ZdcEvent.removeListener(ZdcEmapSearchEventChangezoomend);
	// del 2015/06/08 Y.Matsukawa ]
	?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	if(ZdcEmapSearchEventDragmapend)    ZDC.removeListener(ZdcEmapSearchEventDragmapend);
	if(ZdcEmapSearchEventChangezoomend) ZDC.removeListener(ZdcEmapSearchEventChangezoomend);
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
	ZdcEmapSearchEventDragmapend = null;
	//ZdcEmapSearchEventScrollmapend = null;
	ZdcEmapSearchEventChangezoomend = null;
	delete ZdcEmapSearchEventFunc;
}

var ZdcEmapReading = 0;//読み込み中・処理中フラグ
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

//---------------------------------------------------------------------------
// Landscape(横表示／縦表示）で地図サイズを切り替えます。
// onLoad 時と、onorientationchange 時にコールされます。
//---------------------------------------------------------------------------
var ZdcEmapChangeOrientationTimer = null;	// add 2016/03/28 Y.Matsukawa
function ZdcEmapChangeOrientation()
{
	<?php
	// add 2016/03/28 Y.Matsukawa [
	// ディレイ設定ありの場合（デフォルトで0.5秒のディレイあり設定）
	if ($D_MAP_RESIZE_DELAY_MS) {
	?>
	if (ZdcEmapChangeOrientationTimer) {
		<?php // ディレイ完了 ?>
		clearInterval(ZdcEmapChangeOrientationTimer);
		ZdcEmapChangeOrientationTimer = null;
	} else {
		<?php
		// iOS：画面横向きから縦向きに変更した際、横向き時のZdcEmapMap.widthのせいで
		// window.innerWidthが大きいままになってしまい地図サイズ計算が不正になる。
		// これを回避するため、ZdcEmapMapサイズを一旦小さくする。
		?>
		var mapdiv = document.getElementById('ZdcEmapMap');
		mapdiv.style.width = '320px';
		mapdiv.style.height = '320px';
		ZdcEmapMapObj.refresh();
		<?php // ディレイタイマー起動 ?>
		ZdcEmapChangeOrientationTimer = setInterval(ZdcEmapChangeOrientation, <?php echo $D_MAP_RESIZE_DELAY_MS; ?>);
		return;
	}
	<?php
	}
	// add 2016/03/28 Y.Matsukawa ]
	?>
	<?php // add 2016/03/28 Y.Matsukawa [ ?>
	<?php // ディレイ後にウィンドウサイズ取得 ?>
	ZdcEmapWindowWidth  = window.innerWidth;
	ZdcEmapWindowHeight = window.innerHeight;
	<?php // add 2016/03/28 Y.Matsukawa ] ?>
	ZdcEmapWindowHeight = ZdcEmapWindowHeight - ZdcEmapAnyDispPx;	// add 2011/08/26 H.osamoto
	ZdcEmapWindowWidth  = ZdcEmapWindowWidth  - ZdcEmapAnyDispPy;	// add 2011/12/26 K.Masuda
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	if ( window.orientation == 90 || window.orientation == -90 )
	//	{
	//		// Landscape(横表示)
	//		ZdcEmapMapObj.removeMapScaleBar();
	//		ZdcEmapMapObj.resizeMapWindow( 0, 0, ZdcEmapWindowWidth, ZdcEmapWindowHeight );
	//		ZdcEmapMapObj.addMapScaleBar( new ZdcScaleBar( '3' ) );
	//	}
	//	else
	//	{
	//		// Portrait(縦表示)
	//		ZdcEmapMapObj.removeMapScaleBar();
	//		ZdcEmapMapObj.resizeMapWindow( 0, 0, ZdcEmapWindowWidth, ZdcEmapWindowHeight );
	//		ZdcEmapMapObj.addMapScaleBar( new ZdcScaleBar( '3' ) );
	//	}
	// del 2015/06/08 Y.Matsukawa ]
	?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	var mapDom = document.getElementById('ZdcEmapMap');
	mapDom.style.width = ZdcEmapWindowWidth + 'px';
	mapDom.style.height = ZdcEmapWindowHeight + 'px';
	ZdcEmapMapObj.refresh();
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

	ZdcEmapChangeOrientation();
};
<?php } ?>
<?php if ($carrier->isANDROID()) { ?>
<?php if ($D_MAP_NO_ORIENTATION_RESIZE_ANDROID != 1) { // add 2017/03/14 K.Tani ?>
window.onresize = function()
{
	<?php // add 2012/03/01 Y.Matsukawa [ ?>
	<?php // ウインドウ方向が変わった時だけリサイズ処理 ?>
	<?php //if (window.orientation == ZdcEmapLastOrientation) return;	del 2012/04/17 Y.Matsukawa ?>
	ZdcEmapLastOrientation = window.orientation;
	<?php // add 2012/03/01 Y.Matsukawa ] ?>
	ZdcEmapWindowWidth  = window.innerWidth;
	ZdcEmapWindowHeight = window.innerHeight;

	ZdcEmapChangeOrientation();
};
<?php } // add 2017/03/14 K.Tani ?>
<?php } ?>

<?php
// del 2015/06/08 Y.Matsukawa [
// add 2011/07/13 Y.Matsukawa
//---------------------------------------------------------------------------
// 地図移動
//---------------------------------------------------------------------------
//? >
//function ZdcEmapMapMoveBox(minlat,minlon,maxlat,maxlon,pt,noin){
//	var p1 = new ZdcPoint(minlon,minlat,2);
//	var p2 = new ZdcPoint(maxlon,maxlat,2);
//	var bx = new ZdcBox(p1,p2);
//	if(pt != null) {
//		var s = ZdcEmapMapObj.getMapBoxScale(bx,pt);
//		ZdcEmapMapObj.setMapLocation(pt);
//		if(noin != 1 || (noin == 1 && s < ZdcEmapMapObj.getMapScale())) ZdcEmapMapObj.setMapScale(s);
//	} else {
//		var s = ZdcEmapMapObj.getMapBoxScale(bx);
//		ZdcEmapMapObj.setMapLocation(bx.getBoxCenter());
//		if(noin != 1 || (noin == 1 && s < ZdcEmapMapObj.getMapScale())) ZdcEmapMapObj.setMapScale(s);
//	}
//}
// del 2015/06/08 Y.Matsukawa ]
?>

<?php
// add 2011/07/13 Y.Matsukawa
//---------------------------------------------------------------------------
// ルート探索
//---------------------------------------------------------------------------
?>
var ZdcEmapRouteOptionsObj;
var ZdcEmapRouteSearchObj;
var ZdcEmapRoutePoint1 = null;
var ZdcEmapRoutePoint2 = null;
var ZdcEmapRouteFlagLayer;
var ZdcEmapRouteFlagIcon1;
var ZdcEmapRouteFlagIcon2;
var ZdcEmapRouteFlagStartMarker1;
var ZdcEmapRouteFlagStartMarker2;
var ZdcEmapRouteType       = null;
var ZdcEmapLocRouteType    = <?PHP echo $D_LOC_ROUTE_TYPE; ?>;
var ZdcEmapNekiRouteType   = <?PHP echo $D_NEKI_ROUTE_TYPE; ?>;
var ZdcEmapNpoiRouteType   = <?PHP echo $D_NPOI_ROUTE_TYPE; ?>;		<?php // add 2012/07/18 Y.Matsukawa ?>
var ZdcEmapSearchRouteType = <?PHP echo $D_SEARCH_ROUTE_TYPE; ?>;
var ZdcEmapRouteWalkPSC           = <?PHP echo $D_ROUTE_WALK_PSC; ?>;
var ZdcEmapRouteWalkFloorFlg      = <?PHP echo $D_ROUTE_WALK_FLOORFLG; ?>;
var ZdcEmapRouteWalkDepFloor      = <?PHP echo $D_ROUTE_WALK_DEP_FLOOR; ?>;
var ZdcEmapRouteWalkDepStationFlg = <?PHP echo $D_ROUTE_WALK_DEP_STATIONFLG; ?>;
var ZdcEmapRouteWalkArrFloorFlg   = <?PHP echo $D_ROUTE_WALK_ARR_FLOORFLG; ?>;
var ZdcEmapRouteWalkArrStationFlg = <?PHP echo $D_ROUTE_WALK_ARR_STATIONFLG; ?>;
var ZdcEmapRouteWalkArrFloor      = <?PHP echo $D_ROUTE_WALK_ARR_FLOOR; ?>;
<?php // add 2015/06/08 Y.Matsukawa [ ?>
var routeInfo = {
	'from': null,
	'to': null,
	'polyline': null,
	'flagFrom': null,
	'flagTo': null
};
var pscWalk = {
	0: 'dist',
	1: 'time',
	3: 'easy',
	5: 'roof'
}
<?php // add 2015/06/08 Y.Matsukawa ] ?>

// 現在地からルート探索
function ZdcEmapLocRoute(loc_lat, loc_lon, shop_lat, shop_lon) {
	if(ZdcEmapLocRouteType == 0) return;
	ZdcEmapRouteType = ZdcEmapLocRouteType;

	ZdcEmapShopMsgClose();
	ZdcEmapRouteClear();
	ZdcEmapPoiMrkClear();

	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	ZdcEmapRoutePoint1 = new ZdcPoint(shop_lon, shop_lat, 2);
	//	ZdcEmapRoutePoint2 = ZdcCommon.WGS2TKY(loc_lon, loc_lat);
	//	if(ZdcEmapRouteType == 1)
	//		ZdcEmapRouteSearchWalk(ZdcEmapRoutePoint1, ZdcEmapRoutePoint2);
	//	if(ZdcEmapRouteType == 2)
	//		ZdcEmapRouteSearchCar(ZdcEmapRoutePoint1, ZdcEmapRoutePoint2);
	//	//画面の移動
	//	ZdcEmapMapMoveBox(ZdcEmapRoutePoint1.my, ZdcEmapRoutePoint1.mx, ZdcEmapRoutePoint2.my, ZdcEmapRoutePoint2.mx);
	// del 2015/06/08 Y.Matsukawa ]
	?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	<?php
	// del 2015/07/28 Y.Matsukawa [
	//	routeInfo.from = new ZDC.LatLon(ZDC.msTodeg(shop_lat), ZDC.msTodeg(shop_lon));
	//	routeInfo.to = ZDC.wgsTotky(new ZDC.LatLon(loc_lat, loc_lon));
	// del 2015/07/28 Y.Matsukawa ]
	?>
	<?php // add 2015/07/28 Y.Matsukawa [ ?>
	routeInfo.from = ZDC.wgsTotky(new ZDC.LatLon(loc_lat, loc_lon));
	routeInfo.to = new ZDC.LatLon(ZDC.msTodeg(shop_lat), ZDC.msTodeg(shop_lon));
	<?php // add 2015/07/28 Y.Matsukawa ] ?>
	if(ZdcEmapRouteType == 1)
		ZdcEmapRouteSearchWalk();
	if(ZdcEmapRouteType == 2)
		ZdcEmapRouteSearchCar();
	<?php //ZdcEmapMapMoveBox(loc_lat, loc_lon, ZDC.msTodeg(shop_lat), ZDC.msTodeg(shop_lon));		mod 2015/07/01 Y.Matsukawa ?>
	ZdcEmapMapMoveBox(routeInfo.to.lat, routeInfo.to.lon, routeInfo.from.lat, routeInfo.from.lon);
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
	<?php
		// add 2015/11/18 Xuan Chien [
		// GPSログ出力
		if (isset($D_SGPS_LOG) && $D_SGPS_LOG == '1') {
	?>
		ZdcEmapGpsLog(routeInfo.from.lat, routeInfo.from.lon);
	<?php
		}
		// add 2015/11/18 Xuan Chien ]
	?>
}
// 最寄り駅アイコン表示
function ZdcEmapEki(eki_lat, eki_lon, shop_lat, shop_lon) {
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	var point1 = new ZdcPoint(eki_lon, eki_lat, 2);
	//	var point2 = new ZdcPoint(shop_lon, shop_lat, 2);
	// del 2015/06/08 Y.Matsukawa ]
	?>
	// 駅アイコン表示
	ZdcEmapPoiMrkClear();
	<?php //var i = ZdcEmapMapPoiMrkCnt;		mod 2015/06/08 Y.Matsukawa ?>
	var i = ZdcEmapListPointMarkers.length;
	var mrk = ZdcEmapMakeMrk(i,eki_lat,eki_lon,
						<?PHP echo $D_ICON_EKI_W; ?>,<?PHP echo $D_ICON_EKI_H; ?>,0,0,
						<?PHP echo $D_ICON_EKI_OFFSET_X; ?>,<?PHP echo $D_ICON_EKI_OFFSET_Y; ?>,0,0,0,0,
						'<?PHP echo $D_ICON_EKI_IMAGE; ?>',"",
						"","",0,
						null,
						null,
						null);
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	if (ZdcEmapMapPoiMrkId[i] != null) ZdcEmapMapUserLyr.removeMarkerById(ZdcEmapMapPoiMrkId[i]);//念のため
	//	ZdcEmapMapPoiMrkId[i] = ZdcEmapMapUserLyr.addMarker(mrk);
	//	ZdcEmapMapPoiMrkCnt ++;
	//	//画面の移動
	//	ZdcEmapMapMoveBox(point1.my, point1.mx, point2.my, point2.mx);
	// del 2015/06/08 Y.Matsukawa ]
	?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	ZdcEmapListPointMarkers[i] = mrk;
	ZdcEmapMapObj.addWidget(mrk.marker);
	ZdcEmapMapMoveBox(ZDC.msTodeg(eki_lat), ZDC.msTodeg(eki_lon), ZDC.msTodeg(shop_lat), ZDC.msTodeg(shop_lon));
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
}
// 駅からルート探索
function ZdcEmapEkiRoute(eki_lat, eki_lon, shop_lat, shop_lon) {
	if(ZdcEmapNekiRouteType == 0) return;
	ZdcEmapRouteType = ZdcEmapNekiRouteType;

	ZdcEmapShopMsgClose();
	ZdcEmapRouteClear();
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	ZdcEmapRoutePoint1 = new ZdcPoint(shop_lon, shop_lat, 2);
	//	ZdcEmapRoutePoint2 = new ZdcPoint(eki_lon, eki_lat, 2);
	//	if(ZdcEmapRouteType == 1)
	//		ZdcEmapRouteSearchWalk(ZdcEmapRoutePoint1, ZdcEmapRoutePoint2);
	//	if(ZdcEmapRouteType == 2)
	//		ZdcEmapRouteSearchCar(ZdcEmapRoutePoint1, ZdcEmapRoutePoint2);
	//	//画面の移動
	//	ZdcEmapMapMoveBox(ZdcEmapRoutePoint1.my, ZdcEmapRoutePoint1.mx, ZdcEmapRoutePoint2.my, ZdcEmapRoutePoint2.mx);
	// del 2015/06/08 Y.Matsukawa ]
	?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	<?php
	// del 2015/07/28 Y.Matsukawa [
	//	routeInfo.from = new ZDC.LatLon(ZDC.msTodeg(shop_lat), ZDC.msTodeg(shop_lon));
	//	routeInfo.to = new ZDC.LatLon(ZDC.msTodeg(eki_lat), ZDC.msTodeg(eki_lon));
	// del 2015/07/28 Y.Matsukawa ]
	?>
	<?php // add 2015/07/28 Y.Matsukawa [ ?>
	routeInfo.from = new ZDC.LatLon(ZDC.msTodeg(eki_lat), ZDC.msTodeg(eki_lon));
	routeInfo.to = new ZDC.LatLon(ZDC.msTodeg(shop_lat), ZDC.msTodeg(shop_lon));
	<?php // add 2015/07/28 Y.Matsukawa ] ?>
	if(ZdcEmapRouteType == 1)
		ZdcEmapRouteSearchWalk();
	if(ZdcEmapRouteType == 2)
		ZdcEmapRouteSearchCar();
	ZdcEmapMapMoveBox(ZDC.msTodeg(eki_lat), ZDC.msTodeg(eki_lon), ZDC.msTodeg(shop_lat), ZDC.msTodeg(shop_lon));
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
}
<?php // 最寄り施設アイコン表示		add 2012/07/18 Y.Matsukawa ?>
function ZdcEmapPoi(poi_lat, poi_lon, poi_jnrmn, shop_lat, shop_lon) {
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	var point1 = new ZdcPoint(poi_lon, poi_lat, 2);
	//	var point2 = new ZdcPoint(shop_lon, shop_lat, 2);
	// del 2015/06/08 Y.Matsukawa ]
	?>
	ZdcEmapPoiMrkClear();
	<?php //var i = ZdcEmapMapPoiMrkCnt;		mod 2015/06/08 Y.Matsukawa [ ?>
	var i = ZdcEmapListPointMarkers.length;
	var mrk = ZdcEmapMakeMrk(i,poi_lat,poi_lon,
						<?PHP echo $D_ICON_POI_W; ?>,<?PHP echo $D_ICON_POI_H; ?>,0,0,
						<?PHP echo $D_ICON_POI_OFFSET_X; ?>,<?PHP echo $D_ICON_POI_OFFSET_Y; ?>,0,0,0,0,
						'<?PHP echo $D_ICON_POI_IMAGE_DIR; ?>'+poi_jnrmn+'.gif',"",
						"","",0,
						null,
						null,
						null);
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	if (ZdcEmapMapPoiMrkId[i] != null) ZdcEmapMapUserLyr.removeMarkerById(ZdcEmapMapPoiMrkId[i]);//念のため
	//	ZdcEmapMapPoiMrkId[i] = ZdcEmapMapUserLyr.addMarker(mrk);
	//	ZdcEmapMapPoiMrkCnt ++;
	//	ZdcEmapMapMoveBox(point1.my, point1.mx, point2.my, point2.mx);
	// del 2015/06/08 Y.Matsukawa ]
	?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	ZdcEmapListPointMarkers[i] = mrk;
	ZdcEmapMapObj.addWidget(mrk.marker);
	ZdcEmapMapMoveBox(ZDC.msTodeg(poi_lat), ZDC.msTodeg(poi_lon), ZDC.msTodeg(shop_lat), ZDC.msTodeg(shop_lon));
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
}
<?php // 施設からルート探索		add 2012/07/18 Y.Matsukawa ?>
function ZdcEmapPoiRoute(poi_lat, poi_lon, shop_lat, shop_lon) {
	if(ZdcEmapNpoiRouteType == 0) return;
	ZdcEmapRouteType = ZdcEmapNpoiRouteType;

	ZdcEmapShopMsgClose();
	ZdcEmapRouteClear();

	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	ZdcEmapRoutePoint1 = new ZdcPoint(poi_lon, poi_lat, 2);
	//	ZdcEmapRoutePoint2 = new ZdcPoint(shop_lon, shop_lat, 2);
	//	if(ZdcEmapRouteType == 1)
	//		ZdcEmapRouteSearchWalk(ZdcEmapRoutePoint1, ZdcEmapRoutePoint2);
	//	if(ZdcEmapRouteType == 2)
	//		ZdcEmapRouteSearchCar(ZdcEmapRoutePoint1, ZdcEmapRoutePoint2);
	//	ZdcEmapMapMoveBox(ZdcEmapRoutePoint1.my, ZdcEmapRoutePoint1.mx, ZdcEmapRoutePoint2.my, ZdcEmapRoutePoint2.mx);
	// del 2015/06/08 Y.Matsukawa ]
	?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	routeInfo.from = new ZDC.LatLon(ZDC.msTodeg(poi_lat), ZDC.msTodeg(poi_lon));
	routeInfo.to = new ZDC.LatLon(ZDC.msTodeg(shop_lat), ZDC.msTodeg(shop_lon));
	if(ZdcEmapRouteType == 1)
		ZdcEmapRouteSearchWalk();
	if(ZdcEmapRouteType == 2)
		ZdcEmapRouteSearchCar();
	ZdcEmapMapMoveBox(ZDC.msTodeg(poi_lat), ZDC.msTodeg(poi_lon), ZDC.msTodeg(shop_lat), ZDC.msTodeg(shop_lon));
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
}
<?php // 神奈川電通現在地アイコン表示		add 2012/12/17 H.Osamoto [ ?>
function ZdcEmapShopKanaden(now_lat, now_lon, shop_lat, shop_lon) {
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	var point1 = new ZdcPoint(now_lon, now_lat, 2);
	//	var point2 = new ZdcPoint(shop_lon, shop_lat, 2);
	// del 2015/06/08 Y.Matsukawa ]
	?>
	ZdcEmapPoiMrkClear();
	<?php //var i = ZdcEmapMapPoiMrkCnt;		mod 2015/06/08 Y.Matsukawa ?>
	var i = ZdcEmapListPointMarkers.length;
	var mrk = ZdcEmapMakeMrk(i,now_lat,now_lon,
						<?PHP echo $D_ICON_NOW_W; ?>,<?PHP echo $D_ICON_NOW_H; ?>,0,0,
						<?PHP echo $D_ICON_NOW_OFFSET_X; ?>,<?PHP echo $D_ICON_NOW_OFFSET_Y; ?>,0,0,0,0,
						'<?PHP echo $D_ICON_NOW_IMG; ?>',"",
						"","",0,
						null,
						null,
						null);
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	if (ZdcEmapMapPoiMrkId[i] != null) ZdcEmapMapUserLyr.removeMarkerById(ZdcEmapMapPoiMrkId[i]);//念のため
	//	ZdcEmapMapPoiMrkId[i] = ZdcEmapMapUserLyr.addMarker(mrk);
	//	ZdcEmapMapPoiMrkCnt ++;
	//	//画面の移動
	//	ZdcEmapMapMoveBoxKanaden(point1.my, point1.mx, point2.my, point2.mx);
	// del 2015/06/08 Y.Matsukawa ]
	?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	ZdcEmapListPointMarkers[i] = mrk;
	ZdcEmapMapObj.addWidget(mrk.marker);
	ZdcEmapMapMoveBox(ZDC.msTodeg(now_lat), ZDC.msTodeg(now_lon), ZDC.msTodeg(shop_lat), ZDC.msTodeg(shop_lon));
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
}
<?php // 神奈川電通目的地アイコン表示		add 2012/12/17 H.Osamoto ] ?>
<?php // 神奈川電通最寄り駅アイコン表示		add 2012/12/17 H.Osamoto [ ?>
function ZdcEmapEkiKanaden(eki_lat, eki_lon, shop_lat, shop_lon) {
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	var point1 = new ZdcPoint(eki_lon, eki_lat, 2);
	//	var point2 = new ZdcPoint(shop_lon, shop_lat, 2);
	// del 2015/06/08 Y.Matsukawa ]
	?>
	<?php //var i = ZdcEmapMapPoiMrkCnt;		mod 2015/06/08 Y.Matsukawa ?>
	var i = ZdcEmapListPointMarkers.length;
	var mrk = ZdcEmapMakeMrk(i,eki_lat,eki_lon,
						<?PHP echo $D_ICON_EKI_W; ?>,<?PHP echo $D_ICON_EKI_H; ?>,0,0,
						<?PHP echo $D_ICON_EKI_OFFSET_X; ?>,<?PHP echo $D_ICON_EKI_OFFSET_Y; ?>,0,0,0,0,
						'<?PHP echo $D_ICON_EKI_IMAGE; ?>',"",
						"","",0,
						null,
						null,
						null);
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	if (ZdcEmapMapPoiMrkId[i] != null) ZdcEmapMapUserLyr.removeMarkerById(ZdcEmapMapPoiMrkId[i]);//念のため
	//	ZdcEmapMapPoiMrkId[i] = ZdcEmapMapUserLyr.addMarker(mrk);
	//	ZdcEmapMapPoiMrkCnt ++;
	//	//画面の移動
	//	ZdcEmapMapMoveBoxKanaden(point2.my, point2.mx, point1.my, point1.mx);
	// del 2015/06/08 Y.Matsukawa ]
	?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	ZdcEmapListPointMarkers[i] = mrk;
	ZdcEmapMapObj.addWidget(mrk.marker);
	ZdcEmapMapMoveBox(ZDC.msTodeg(eki_lat), ZDC.msTodeg(eki_lon), ZDC.msTodeg(shop_lat), ZDC.msTodeg(shop_lon));
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
}
<?php // 神奈川電通最寄り駅アイコン表示		add 2012/12/17 H.Osamoto ] ?>
<?php // 神奈川電通最寄り施設アイコン表示		add 2012/12/17 H.Osamoto [ ?>
function ZdcEmapPoiKanaden(poi_lat, poi_lon, poi_jnrmn, shop_lat, shop_lon) {
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	var point1 = new ZdcPoint(poi_lon, poi_lat, 2);
	//	var point2 = new ZdcPoint(shop_lon, shop_lat, 2);
	// del 2015/06/08 Y.Matsukawa ]
	?>
	<?php //var i = ZdcEmapMapPoiMrkCnt;		mod 2015/06/08 Y.Matsukawa ?>
	var i = ZdcEmapListPointMarkers.length;
	var mrk = ZdcEmapMakeMrk(i,poi_lat,poi_lon,
						<?PHP echo $D_ICON_EKI_W; ?>,<?PHP echo $D_ICON_EKI_H; ?>,0,0,
						<?PHP echo $D_ICON_EKI_OFFSET_X; ?>,<?PHP echo $D_ICON_EKI_OFFSET_Y; ?>,0,0,0,0,
						'<?PHP echo $D_ICON_EKI_IMAGE; ?>',"",
						"","",0,
						null,
						null,
						null);
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	if (ZdcEmapMapPoiMrkId[i] != null) ZdcEmapMapUserLyr.removeMarkerById(ZdcEmapMapPoiMrkId[i]);//念のため
	//	ZdcEmapMapPoiMrkId[i] = ZdcEmapMapUserLyr.addMarker(mrk);
	//	ZdcEmapMapPoiMrkCnt ++;
	//	ZdcEmapMapMoveBoxKanaden(point2.my, point2.mx, point1.my, point1.mx);
	// del 2015/06/08 Y.Matsukawa ]
	?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	ZdcEmapListPointMarkers[i] = mrk;
	ZdcEmapMapObj.addWidget(mrk.marker);
	ZdcEmapMapMoveBox(ZDC.msTodeg(poi_lat), ZDC.msTodeg(poi_lon), ZDC.msTodeg(shop_lat), ZDC.msTodeg(shop_lon));
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
}
<?php // 神奈川電通最寄り施設アイコン表示		add 2012/12/17 H.Osamoto ] ?>

// 出発地指定ルート探索
function ZdcEmapSearchRoute(srch_lat, srch_lon, shop_lat, shop_lon) {
	if(ZdcEmapSearchRouteType == 0) return;
	ZdcEmapRouteType = ZdcEmapSearchRouteType;

	ZdcEmapShopMsgClose();
	ZdcEmapRouteClear();

	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	ZdcEmapRoutePoint1 = new ZdcPoint(shop_lon, shop_lat, 2);
	//	ZdcEmapRoutePoint2 = new ZdcPoint(srch_lon, srch_lat, 2);
	//	if(ZdcEmapRouteType == 1)
	//		ZdcEmapRouteSearchWalk(ZdcEmapRoutePoint1, ZdcEmapRoutePoint2);
	//	if(ZdcEmapRouteType == 2)
	//		ZdcEmapRouteSearchCar(ZdcEmapRoutePoint1, ZdcEmapRoutePoint2);
	//	//画面の移動
	//	ZdcEmapMapMoveBox(ZdcEmapRoutePoint1.my, ZdcEmapRoutePoint1.mx, ZdcEmapRoutePoint2.my, ZdcEmapRoutePoint2.mx);
	// del 2015/06/08 Y.Matsukawa ]
	?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	<?php
	// del 2015/07/28 Y.Matsukawa [
	//	routeInfo.from = new ZDC.LatLon(ZDC.msTodeg(shop_lat), ZDC.msTodeg(shop_lon));
	//	routeInfo.to = new ZDC.LatLon(ZDC.msTodeg(srch_lat), ZDC.msTodeg(srch_lon));
	// del 2015/07/28 Y.Matsukawa ]
	?>
	<?php // add 2015/07/28 Y.Matsukawa [ ?>
	routeInfo.from = new ZDC.LatLon(ZDC.msTodeg(srch_lat), ZDC.msTodeg(srch_lon));
	routeInfo.to = new ZDC.LatLon(ZDC.msTodeg(shop_lat), ZDC.msTodeg(shop_lon));
	<?php // add 2015/07/28 Y.Matsukawa ] ?>
	if(ZdcEmapRouteType == 1)
		ZdcEmapRouteSearchWalk();
	if(ZdcEmapRouteType == 2)
		ZdcEmapRouteSearchCar();
	ZdcEmapMapMoveBox(ZDC.msTodeg(shop_lat), ZDC.msTodeg(shop_lon), ZDC.msTodeg(srch_lat), ZDC.msTodeg(srch_lon));
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
}
// 歩行者ルート
<?php //function ZdcEmapRouteSearchWalk(p1,p2) {		mod 2015/06/08 Y.Matsukawa ?>
function ZdcEmapRouteSearchWalk() {
	ZdcEmapReadOn();
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	//オブジェクト作成
	//	ZdcEmapRouteOptionsObj = new ZdcPRouteSearchOptions();
	//	ZdcEmapRouteSearchObj = new ZdcPRouteSearch();
	//	ZdcEmapRouteOptionsObj.showMarker = false;
	//	ZdcEmapRouteOptionsObj.pointFlg = 2;
	//	ZdcEmapRouteSearchObj.timeout = < ?PHP echo $D_ROUTE_TIMEOUT; ? >;
	//	ZdcEvent.addListener(ZdcEmapRouteSearchObj, 'end', ZdcEmapRouteSearchEndWalk);
	//	ZdcEmapMapObj.addPRouteSearch(ZdcEmapRouteSearchObj);
	//	//デザイン指定
	//	//ZdcEmapRouteSearchObj.routeWidth = < ?PHP echo $D_ROUTE_WALK_WIDTH; ? >;	// 2011/08/24 K.Masuda
	//	ZdcEmapRouteSearchObj.routeWidth = "< ?PHP echo $D_ROUTE_WALK_WIDTH; ? >";
	//	ZdcEmapRouteSearchObj.routeOpacity = "< ?PHP echo $D_ROUTE_WALK_OPACITY; ? >";
	//	ZdcEmapRouteSearchObj.routeColor = "< ?PHP echo $D_ROUTE_WALK_COLOR; ? >";
	//	//位置指定
	//	ZdcEmapRouteOptionsObj.arrivalPoint.point = p1;
	//	ZdcEmapRouteOptionsObj.departurePoint.point = p2;
	//	//検索条件指定
	//	//共通
	//	ZdcEmapRouteOptionsObj.psc = ZdcEmapRouteWalkPSC;
	//	ZdcEmapRouteOptionsObj.floorFlg = ZdcEmapRouteWalkFloorFlg;
	//	//到着点(出発点)
	//	ZdcEmapRouteOptionsObj.arrivalPoint.floorFlg = ZdcEmapRouteWalkArrFloorFlg;
	//	ZdcEmapRouteOptionsObj.arrivalPoint.stationFlg = ZdcEmapRouteWalkArrStationFlg;
	//	ZdcEmapRouteOptionsObj.arrivalPoint.floor = ZdcEmapRouteWalkArrFloor;
	//	//出発点(拠点)
	//	ZdcEmapRouteOptionsObj.departurePoint.stationFlg = ZdcEmapRouteWalkDepStationFlg;
	//	ZdcEmapRouteOptionsObj.departurePoint.floor = ZdcEmapRouteWalkDepFloor;
	//	//検索開始
	//	ZdcEmapRouteSearchObj.search(ZdcEmapRouteOptionsObj);
	// del 2015/06/08 Y.Matsukawa ]
	?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	var query = {
		'from': routeInfo.from,
		'to': routeInfo.to,
		'searchtype': pscWalk[ZdcEmapRouteWalkPSC],
		'maxdist': 10
	};
	ZDC.Search.getRouteByWalk(query, function(status, res){
		ZdcEmapRouteSearchEndWalk(status, res);
	});
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
}
<?php //function ZdcEmapRouteSearchEndWalk() {		mod 2015/06/08 Y.Matsukawa ?>
function ZdcEmapRouteSearchEndWalk(status, res) {
	ZdcEmapReadOff();
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	var result = this.getResult();
	//	if(result && (result.status !== 0)) {
	// del 2015/06/08 Y.Matsukawa ]
	?>
	if(status.code != '000'){		<?php // add 2015/06/08 Y.Matsukawa ?>
		//エラー処理
		if(ZdcEmapRouteType == 1) {
			//失敗だった場合自動車で再検索する
			<?php //ZdcEmapRouteSearchCar(ZdcEmapRoutePoint1,ZdcEmapRoutePoint2);		mod 2015/06/08 Y.Matsukawa ?>
			ZdcEmapRouteSearchCar();
		} else {
			// alert('<?PHP echo $D_MSG_ERR_JS_ROUTE; ?> [' + result.status + ']');	// mod 2015/03/09 H.Osamoto
			alert('<?PHP echo $D_MSG_ERR_JS_ROUTE; ?>');
		}
		return;
	}
	//スタート／ゴールのアイコンを描画
	ZdcEmapRouteFlag();
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	var route = res.route;
	var latlons = [];
	for(var i = 0; i < route.link.length; i++)
		for(var j = 0; j<route.link[i].line.length; j++)
			latlons.push(new ZDC.LatLon(
				route.link[i].line[j].lat,
				route.link[i].line[j].lon
			));
	routeInfo.polyline = new ZDC.Polyline(latlons, {
		'strokeWeight': <?php echo $D_ROUTE_WALK_WIDTH; ?>,
		'lineOpacity':  <?php echo $D_ROUTE_WALK_OPACITY; ?>,
		'strokeColor':  "<?php echo $D_ROUTE_WALK_COLOR; ?>" 
	});
	ZdcEmapMapObj.addWidget(routeInfo.polyline);
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
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
// 自動車検索
<?php //function ZdcEmapRouteSearchCar(p1,p2) {		mod 2015/06/08 Y.Matsukawa ?>
function ZdcEmapRouteSearchCar() {
	ZdcEmapReadOn();
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	//オブジェクト作成
	//	ZdcEmapRouteOptionsObj = new ZdcRouteSearchOptions();
	//	ZdcEmapRouteSearchObj = new ZdcRouteSearch();
	//	ZdcEmapRouteOptionsObj.showMarker = false;
	//	ZdcEmapRouteOptionsObj.pointFlg = 2;
	//	ZdcEmapRouteSearchObj.timeout = < ?PHP echo $D_ROUTE_TIMEOUT; ? >;
	//	ZdcEvent.addListener(ZdcEmapRouteSearchObj, 'end', ZdcEmapRouteSearchEndCar);
	//	ZdcEmapMapObj.addRouteSearch(ZdcEmapRouteSearchObj);
	//	//デザイン指定
	//	//ZdcEmapRouteSearchObj.routeWidth = < ?PHP echo $D_ROUTE_CAR_WIDTH; ? >;		// 2011/08/24 K.Masuda
	//	ZdcEmapRouteSearchObj.routeWidth = "< ?PHP echo $D_ROUTE_CAR_WIDTH; ? >";
	//	ZdcEmapRouteSearchObj.routeOpacity = "< ?PHP echo $D_ROUTE_CAR_OPACITY; ? >";
	//	ZdcEmapRouteSearchObj.routeColor = "< ?PHP echo $D_ROUTE_CAR_COLOR; ? >";
	//	//位置指定
	//	ZdcEmapRouteOptionsObj.arrivalPoint = p1;
	//	ZdcEmapRouteOptionsObj.departurePoint = p2;
	//	//検索開始
	//	ZdcEmapRouteSearchObj.search(ZdcEmapRouteOptionsObj);
	// del 2015/06/08 Y.Matsukawa ]
	?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	var query = {
		'from': routeInfo.from,
		'to': routeInfo.to
	};
	ZDC.Search.getRouteByDrive(query, function(status, res){
		ZdcEmapRouteSearchEndCar(status, res);
	});	
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
}
<?php //function ZdcEmapRouteSearchEndCar() {		mod 2015/06/08 Y.Matsukawa ?>
function ZdcEmapRouteSearchEndCar(status, res) {
	ZdcEmapReadOff();
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	var result = this.getResult();
	//	if(result && (result.status !== 0)) {
	// del 2015/06/08 Y.Matsukawa ]
	?>
	if(status.code != '000'){		<?php // add 2015/06/08 Y.Matsukawa ?>
		//エラー処理
		// alert('<?PHP echo $D_MSG_ERR_JS_ROUTE; ?> [' + result.status + ']');	mod 2015/03/09 H.Osamoto
		alert('<?PHP echo $D_MSG_ERR_JS_ROUTE; ?>');
		return;
	}
	//スタート／ゴールのアイコンを描画
	ZdcEmapRouteFlag();
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	var route = res.route;
	var latlons = [];
	for(var i = 0; i < route.link.length; i++)
		for(var j = 0; j<route.link[i].line.length; j++)
			latlons.push(new ZDC.LatLon(
				route.link[i].line[j].lat,
				route.link[i].line[j].lon
			));
	routeInfo.polyline = new ZDC.Polyline(latlons, {
		'strokeWeight': <?php echo $D_ROUTE_CAR_WIDTH; ?>,
		'lineOpacity':  <?php echo $D_ROUTE_CAR_OPACITY; ?>,
		'strokeColor':  "<?php echo $D_ROUTE_CAR_COLOR; ?>" 
	});
	ZdcEmapMapObj.addWidget(routeInfo.polyline);
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
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
// ルート削除
function ZdcEmapRouteClear() {
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	if(!ZdcEmapRouteSearchObj) return;
	//	if(ZdcEmapRouteOptionsObj.departurePoint.point) {
	//		ZdcEmapRouteSearchObj.clearRoute();
	//	} else {
	//		ZdcEmapMapObj.removeRouteSearch();
	//	}
	//	delete ZdcEmapRouteOptionsObj;
	//	delete ZdcEmapRouteSearchObj;
	//	//スタート／ゴールのレイヤーを削除
	//	if(ZdcEmapRouteFlagLayer) ZdcEmapRouteFlagLayer.clearMarker();
	//	ZdcEmapMapObj.removeUserLayer(ZdcEmapRouteFlagLayer);
	//	delete ZdcEmapRouteFlagIcon1;
	//	delete ZdcEmapRouteFlagIcon2;
	// del 2015/06/08 Y.Matsukawa ]
	?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	if(routeInfo.flagFrom != null){
		ZdcEmapMapObj.removeWidget(routeInfo.flagFrom);
		routeInfo.flagFrom = null;
	}
	if(routeInfo.flagTo != null){
		ZdcEmapMapObj.removeWidget(routeInfo.flagTo);
		routeInfo.flagTo = null;
	}
	if(routeInfo.polyline != null){
		ZdcEmapMapObj.removeWidget(routeInfo.polyline);
		routeInfo.polyline = null;
	}
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
}
//ルート開始／終了地点のアイコンを描画
function ZdcEmapRouteFlag() {
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	//ユーザレイヤー作成
	//	ZdcEmapRouteFlagLayer = new ZdcUserLayer();
	//	ZdcEmapRouteFlagLayer.setLayerScale(1, 15);
	//	//ZdcEmapRouteFlagLayer.setLayerType('manual');
	//	//アイコン作成
	//	ZdcEmapRouteFlagIcon1 = new ZdcIcon();
	//	ZdcEmapRouteFlagIcon1.offset = new ZdcPixel(< ?PHP echo $D_ROUTE_GOAL_OFFSET_X; ? >, < ?PHP echo $D_ROUTE_GOAL_OFFSET_Y; ? >);
	//	ZdcEmapRouteFlagIcon1.image = '< ?PHP echo $D_ROUTE_GOAL_IMAGE; ? >';
	//	ZdcEmapRouteFlagIcon2 = new ZdcIcon();
	//	ZdcEmapRouteFlagIcon2.offset = new ZdcPixel(< ?PHP echo $D_ROUTE_START_OFFSET_X; ? >, < ?PHP echo $D_ROUTE_START_OFFSET_Y; ? >);
	//	ZdcEmapRouteFlagIcon2.image = '< ?PHP echo $D_ROUTE_START_IMAGE; ? >';
	//	//ユーザレイヤーに追加
	//	if(ZdcEmapRoutePoint1) ZdcEmapRouteFlagLayer.addMarker(new ZdcMarker(ZdcEmapRoutePoint1, ZdcEmapRouteFlagIcon1));
	//	if(ZdcEmapRoutePoint2) ZdcEmapRouteFlagLayer.addMarker(new ZdcMarker(ZdcEmapRoutePoint2, ZdcEmapRouteFlagIcon2));
	//	//地図にユーザレイヤーを追加
	//	ZdcEmapMapObj.addUserLayer(ZdcEmapRouteFlagLayer);
	//	//ルートレイヤーの上に移動
	//	ZdcEmapRouteFlagLayer.doc.style.zIndex = "3999";
	// del 2015/06/08 Y.Matsukawa ]
	?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	routeInfo.flagFrom =  new ZDC.Marker(routeInfo.from, {
		custom:{
			base:{
				src: '<?PHP echo $D_ROUTE_START_IMAGE; ?>'
			}
		},
		offset: ZDC.Pixel(<?php echo $D_ROUTE_START_OFFSET_X; ?>, <?php echo $D_ROUTE_START_OFFSET_Y; ?>)
	});
	routeInfo.flagTo =  new ZDC.Marker(routeInfo.to, {
		custom:{
			base:{
				src: '<?PHP echo $D_ROUTE_GOAL_IMAGE; ?>'
			}
		},
		offset: ZDC.Pixel(<?php echo $D_ROUTE_GOAL_OFFSET_X; ?>, <?php echo $D_ROUTE_GOAL_OFFSET_Y; ?>)
	});
	ZdcEmapMapObj.addWidget(routeInfo.flagFrom);
	ZdcEmapMapObj.addWidget(routeInfo.flagTo);
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
}

// 駅・施設アイコン消去
function ZdcEmapPoiMrkClear() {
	var i;
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	for( i = 0;i < ZdcEmapMapPoiMrkCnt;i ++) {
	//		ZdcEmapMapUserLyr.removeMarkerById(ZdcEmapMapPoiMrkId[i]);//マーカー削除
	//		ZdcEmapMapPoiMrkId[i] = null;
	//	}
	//	ZdcEmapMapPoiMrkCnt = 0;
	// del 2015/06/08 Y.Matsukawa ]
	?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	for(i = 0; i < ZdcEmapListPointMarkers.length; i++){
		ZdcEmapMapObj.removeWidget(ZdcEmapListPointMarkers[i].marker);
		if(ZdcEmapListPointMarkers[i].tooltip)
			ZdcEmapMapObj.removeWidget(ZdcEmapListPointMarkers[i].tooltip);
	}
	ZdcEmapListPointMarkers = [];
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
}

// add 2012/02/22 H.osamoto [
// APIイベントログ出力
// （event_log.cgiを呼び出し）
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
function ZdcEmapMapEventLogZoom() { ZdcEmapEventLog('mapapi_ChangeZoom'); }
function ZdcEmapMapEventLogLoc() { ZdcEmapEventLog('mapapi_ChangeLocation'); }
// add 2012/02/22 H.osamoto ]
// add 2015/11/18 Xuan Chien [
// GPS検索ログ出力
// （gps_log.cgiを呼び出し）
function ZdcEmapGpsLog(pLat, pLon) {
	var url = "<?php echo $D_SSAPI['gps_log']; ?>";
	url += "?cid=<?php echo $D_CID; ?>";
	url += "&lat="+pLat;
	url += "&lon="+pLon;

	var httpReq = new ZdcEmapHttpRequest('EUC', 'EUC');

	httpReq.request(url, function(reference_text,status){
	}, 60000);
}
// add 2015/11/18 Xuan Chien ]

<?php
// formCondから絞り込み条件を取得（jkn式文字列）		add 2012/02/21 Y.Matsukawa
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

<?php // add 2014/08/18 AnPham [ ?>
// For search Icon overlapping
<?php
// del 2015/06/08 Y.Matsukawa [
//var D_ZOOM = new Array();
//var D_ZOOM2PXMS_LAT = new Array();
//var D_ZOOM2PXMS_LON = new Array();
//D_ZOOM["1"]=89; D_ZOOM2PXMS_LAT["89"]=128836.6013; D_ZOOM2PXMS_LON["89"]=158117.6471;
//D_ZOOM["2"]=87; D_ZOOM2PXMS_LAT["87"]=64418.30065; D_ZOOM2PXMS_LON["87"]=79058.82353;
//D_ZOOM["3"]=85; D_ZOOM2PXMS_LAT["85"]=28183.00654; D_ZOOM2PXMS_LON["85"]=34588.23529;
//D_ZOOM["4"]=82; D_ZOOM2PXMS_LAT["82"]=14954.24837; D_ZOOM2PXMS_LON["82"]=18352.94118;
//D_ZOOM["5"]=81; D_ZOOM2PXMS_LAT["81"]=10352.94118; D_ZOOM2PXMS_LON["81"]=12705.88235;
//D_ZOOM["6"]=77; D_ZOOM2PXMS_LAT["77"]=5751.633987; D_ZOOM2PXMS_LON["77"]=7058.823529;
//D_ZOOM["7"]=72; D_ZOOM2PXMS_LAT["72"]=2588.235294; D_ZOOM2PXMS_LON["72"]=3176.470588;
//D_ZOOM["8"]=67; D_ZOOM2PXMS_LAT["67"]=1150.326797; D_ZOOM2PXMS_LON["67"]=1411.764706;
//D_ZOOM["9"]=62; D_ZOOM2PXMS_LAT["62"]=539.2156863; D_ZOOM2PXMS_LON["62"]=661.7647059;
//D_ZOOM["10"]=56; D_ZOOM2PXMS_LAT["56"]=206.6993464; D_ZOOM2PXMS_LON["56"]=253.6764706;
//D_ZOOM["11"]=55; D_ZOOM2PXMS_LAT["55"]=152.7777778; D_ZOOM2PXMS_LON["55"]=187.5000000;
//D_ZOOM["12"]=52; D_ZOOM2PXMS_LAT["52"]=98.85620915; D_ZOOM2PXMS_LON["52"]=121.3235294;
//D_ZOOM["13"]=50; D_ZOOM2PXMS_LAT["50"]=74.14215686; D_ZOOM2PXMS_LON["50"]=90.99264706;
//D_ZOOM["14"]=44; D_ZOOM2PXMS_LAT["44"]=33.70098039; D_ZOOM2PXMS_LON["44"]=41.36029412;
//D_ZOOM["15"]=39; D_ZOOM2PXMS_LAT["39"]=15.72712418; D_ZOOM2PXMS_LON["39"]=19.30147059;
//var IconGrp = new Array();
// del 2015/06/08 Y.Matsukawa ]
?>
<?php // add 2015/06/08 Y.Matsukawa [ ?>
var markerOverlaps = [];		<?php // add 2015/07/01 Y.Matsukawa ?>
var miriLat= [];
var miriLon= [];
miriLat['1'] = 128836.6013; miriLon['1'] = 158117.6471;
miriLat['2'] = 64418.30065; miriLon['2'] = 79058.82353;
miriLat['3'] = 28183.00654; miriLon['3'] = 34588.23529;
miriLat['4'] = 14954.24837; miriLon['4'] = 18352.94118;
miriLat['5'] = 10352.94118; miriLon['5'] = 12705.88235;
miriLat['6'] = 5751.633987; miriLon['6'] = 7058.823529;
miriLat['7'] = 2588.235294; miriLon['7'] = 3176.470588;
miriLat['8'] = 1581.699346; miriLon['8'] = 1941.176471;
miriLat['9'] = 1150.326797; miriLon['9'] = 1411.764706;
miriLat['10'] = 539.2156863; miriLon['10'] = 661.7647059;
miriLat['11'] = 206.6993464; miriLon['11'] = 253.6764706;
miriLat['12'] = 152.7777778; miriLon['12'] = 187.5000000;
miriLat['13'] = 98.85620915; miriLon['13'] = 121.3235294;
miriLat['14'] = 74.14215686; miriLon['14'] = 90.99264706;
miriLat['15'] = 47.18137255; miriLon['15'] = 57.90441176;
miriLat['16'] = 33.70098039; miriLon['16'] = 41.36029412;
miriLat['17'] = 26.96078431; miriLon['17'] = 33.08823529;
miriLat['18'] = 15.72712418; miriLon['18'] = 19.30147059;
<?php // add 2015/06/08 Y.Matsukawa ] ?>
function ZdcEmapIconOverlap(icnt,lvl){
	<?php
	// del 2015/06/08 Y.Matsukawa [
	//	IconGrp = new Array();
	//	var icdt,ic,tmpic,p1,p2,c1,c2,c3,c4,obj;
	//	var nlatmin = new Array();
	//	var nlatmax = new Array();
	//	var nlonmin = new Array();
	//	var nlonmax = new Array();
	//	var ZGobj = new ZdcGeometric();
	//
	//	for(ic=icnt-1; ic>=0; ic--){
	//		icdt = ZdcEmapIconDt[ic].split(":");
	//		// icdt[0] lat:緯度
	//		// icdt[1] lon:経度
	//		// icdt[2] w:アイコン幅
	//		// icdt[3] h:アイコン高
	//		nlatmin[ic] = Math.round(parseInt(icdt[0]) + (D_ZOOM2PXMS_LAT[D_ZOOM[lvl]] * (parseInt(icdt[2]) / 2)));	// 右上緯度
	//		nlonmin[ic] = Math.round(parseInt(icdt[1]) + (D_ZOOM2PXMS_LON[D_ZOOM[lvl]] * (parseInt(icdt[3]) / 2)));	// 右上経度
	//		nlatmax[ic] = Math.round(parseInt(icdt[0]) - (D_ZOOM2PXMS_LAT[D_ZOOM[lvl]] * (parseInt(icdt[2]) / 2)));	// 左下緯度
	//		nlonmax[ic] = Math.round(parseInt(icdt[1]) - (D_ZOOM2PXMS_LON[D_ZOOM[lvl]] * (parseInt(icdt[3]) / 2)));	// 左下経度
	//	}
	//	for(ic=icnt-1; ic>=0; ic--){
	//		// id->kid変換
	//		obj = ZdcEmapMapUserLyr.getMarkerById(ZdcEmapMapShopMrkId[ic]);
	//		IconGrp[ic] = obj.data1;
	//		// 重なり判定
	//		for(tmpic=icnt-1; tmpic>=0; tmpic--){
	//			if( tmpic == ic){ continue; }	// 自分自身は除外
	//			// id->kid変換
	//			obj = ZdcEmapMapUserLyr.getMarkerById(ZdcEmapMapShopMrkId[tmpic]);
	//			// 矩形緯度経度
	//			p1 = new ZdcPoint(nlonmin[ic],nlatmin[ic],< ?PHP echo $D_PFLG; ? >);
	//			p2 = new ZdcPoint(nlonmax[ic],nlatmax[ic],< ?PHP echo $D_PFLG; ? >);
	//			// 線分緯度経度
	//			c1 = new ZdcPoint(nlonmin[tmpic],nlatmin[tmpic],< ?PHP echo $D_PFLG; ? >);	// 右上緯度経度
	//			c2 = new ZdcPoint(nlonmax[tmpic],nlatmin[tmpic],< ?PHP echo $D_PFLG; ? >);	// 左上緯度経度
	//			c3 = new ZdcPoint(nlonmax[tmpic],nlatmax[tmpic],< ?PHP echo $D_PFLG; ? >);	// 左下緯度経度
	//			c4 = new ZdcPoint(nlonmin[tmpic],nlatmax[tmpic],< ?PHP echo $D_PFLG; ? >);	// 右下緯度経度
	//			// 矩形に線分が交差するか？
	//			if( ZGobj.isLineCrossRect(c1,c2,p1,p2) ){ IconGrp[ic] += "," + obj.data1; continue; }
	//			if( ZGobj.isLineCrossRect(c2,c3,p1,p2) ){ IconGrp[ic] += "," + obj.data1; continue; }
	//			if( ZGobj.isLineCrossRect(c3,c4,p1,p2) ){ IconGrp[ic] += "," + obj.data1; continue; }
	//			if( ZGobj.isLineCrossRect(c4,c1,p1,p2) ){ IconGrp[ic] += "," + obj.data1; continue; }
	//		}
	//	}
	// del 2015/06/08 Y.Matsukawa ]
	?>
	<?php // add 2015/06/08 Y.Matsukawa [ ?>
	var zoom = DecRealZoom(ZdcEmapMapObj.getZoom()) + 1;
	var minLat = [], minLon = [], maxLat = [], maxLon = [], latlon;
	for(var i = 0; i < ZdcEmapListMarkers.length; i++){
		markerOverlaps[ZdcEmapListMarkers[i].marker.data.id] = ZdcEmapListMarkers[i].data1;
		latlon = ZdcEmapListMarkers[i].marker.getLatLon();
		var w = ZdcEmapListMarkers[i].w;
		var h = ZdcEmapListMarkers[i].h;
		minLat[i] = (parseFloat(latlon.lat) -
			(miriLat[zoom]/3600000 * (parseInt(w) / 2)));
		minLon[i] = (parseFloat(latlon.lon) -
			(miriLon[zoom]/3600000 * (parseInt(h) / 2)));
		maxLat[i] = (parseFloat(latlon.lat) +
			(miriLat[zoom]/3600000 * (parseInt(w) / 2)));
		maxLon[i] = (parseFloat(latlon.lon) +
			(miriLon[zoom]/3600000 * (parseInt(h) / 2)));
	}
	for(var i = 0; i < ZdcEmapListMarkers.length; i++){
		latlon = ZdcEmapListMarkers[i].marker.getLatLon();
		var wsLatlon = new ZDC.LatLon(minLat[i], minLon[i]);
		var neLatlon = new ZDC.LatLon(maxLat[i], maxLon[i]);
		var box =  new ZDC.LatLonBox(wsLatlon, neLatlon);
		for(var j = i + 1; j < ZdcEmapListMarkers.length; j++){
			var p1 = new ZDC.LatLon(minLat[j],minLon[j]);
			var p2 = new ZDC.LatLon(maxLat[j],minLon[j]);
			var p3 = new ZDC.LatLon(maxLat[j],maxLon[j]);
			var p4 = new ZDC.LatLon(minLat[j],maxLon[j]);
			if( ZDC.getLineCrossRectLatLons(p1, p2, box)){
				markerOverlaps[ZdcEmapListMarkers[i].marker.data.id] += ',' +
					ZdcEmapListMarkers[j].data1;
				markerOverlaps[ZdcEmapListMarkers[j].marker.data.id] += ',' +
					ZdcEmapListMarkers[i].data1;
				continue;
			}
			if( ZDC.getLineCrossRectLatLons(p2, p3, box)){
				markerOverlaps[ZdcEmapListMarkers[i].marker.data.id] += ',' +
					ZdcEmapListMarkers[j].data1;
				markerOverlaps[ZdcEmapListMarkers[j].marker.data.id] += ',' +
					ZdcEmapListMarkers[i].data1;
				continue;
			}
			if( ZDC.getLineCrossRectLatLons(p3, p4, box)){
				markerOverlaps[ZdcEmapListMarkers[i].marker.data.id] += ',' +
					ZdcEmapListMarkers[j].data1;
				markerOverlaps[ZdcEmapListMarkers[j].marker.data.id] += ',' +
					ZdcEmapListMarkers[i].data1;
				continue;
			}
			if( ZDC.getLineCrossRectLatLons(p4, p1, box)){
				markerOverlaps[ZdcEmapListMarkers[i].marker.data.id] += ',' +
					ZdcEmapListMarkers[j].data1;
				markerOverlaps[ZdcEmapListMarkers[j].marker.data.id] += ',' +
					ZdcEmapListMarkers[i].data1;
				continue;
			}
		}
	}
	<?php // add 2015/06/08 Y.Matsukawa ] ?>
}
<?php // add 2014/08/18 AnPham ]?>

<?php // 中心位置から等距離の４点（上下左右）緯度経度配列を返却		add 2015/05/25 Y.Matsukawa ?>
function ZdcEmapGetPointsByRad(latlon, rad) {
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

<?php
// セブン&アイ専用最寄り検索		add 2015/05/01 Y.Matsukawa ?>
function ZdcEmap711omniSearchShop(init_rad) {
	var latlon = ZdcEmapMapObj.getLatLon();
	<?php
	// 初期検索範囲（m）の緯度経度差分（ミリ秒）を算出 ?>
	var latlons = ZdcEmapGetPointsByRad(latlon, init_rad)
	var zi = ZdcEmapMapObj.getAdjustZoom(latlons, {fix:true});
	ZdcEmapMapObj.setZoom(zi.zoom);
	var box = ZdcEmapMapObj.getLatLonBox();
	var boxmin = box.getMin();
	var boxmax = box.getMax();
	// 初期検索範囲にSEJ店舗が1つ以上存在するかどうか
	var opts = new ZdcNearShopOptions2();
	opts.cid = "<?php echo $D_DATA_CID; ?>";
	opts.lat = ZDC.degToms(latlon.lat);
	opts.lon = ZDC.degToms(latlon.lon);
	opts.latlon = ZDC.degToms(boxmin.lat)+","+ZDC.degToms(boxmin.lon)+","+ZDC.degToms(boxmax.lat)+","+ZDC.degToms(boxmax.lon);
	opts.jkn = "<?php echo $D_711OMNI_INIT_JKN; ?>";
	opts.pos = 1;
	opts.maxCount = 1;
	opts.limitCount = 1;
	opts.timeout = <?php echo $D_AJAX_TIMEOUT; ?>;
	ZdcEmapNearShop2.opts = opts;
	ZdcEmapNearShop2.search(opts, ZdcEmap711omniSearchShopResult);
}
function ZdcEmap711omniSearchShopResult(result) {
	// エラー処理
	if(result.status != 0 && result.status != 3 && result.status != 5 && result.status != 9) {
		alert("<?php echo $D_MSG_ERR_JS_RESULT; ?>" + ' [' + result.status + ']');
		ZdcEmapSearchEventStart();
		ZdcEmapReadOff();
		return;
	}
	// 件数確認
	var cnt = result.items.length;
	if (cnt) {
		// SEJ店舗ありなら地図範囲で最寄り検索
		searchFirst = 0;//地図範囲を検索
		searchClick = 0;//縮尺調整しない
		ZdcEmapSearchShop(ZdcEmapSearchCond);
		ZdcEmapSearchEventAdd('ZdcEmapSearchShop("' + ZdcEmapSearchCond + '")');
	} else {
		// SEJ店舗なしなら既定半径の入りきる縮尺で最寄り検索
		var latlons = ZdcEmapGetPointsByRad(ZdcEmapMapObj.getLatLon(), <?php echo $D_711OMNI_ALT_RAD; ?>)
		var zi = ZdcEmapMapObj.getAdjustZoom(latlons, {fix:true});
		ZdcEmapMapObj.setZoom(zi.zoom);
		searchFirst = 0;//地図範囲を検索
		searchClick = 0;//縮尺調整しない
		ZdcEmapSearchShop(ZdcEmapSearchCond);
		ZdcEmapSearchEventAdd('ZdcEmapSearchShop("' + ZdcEmapSearchCond + '")');
	}
}
<?php
// セブン&アイ 711apl 専用最寄り検索		add 2017/02/02 K.Tani ?>
<?php // add 2017/02/10 K.Tani [ ?>
var SearchCount = 0;
<?php // add 2017/02/10 K.Tani ] ?>
function ZdcEmap711aplSearchShop(init_rad) {
	var latlon = ZdcEmapMapObj.getLatLon();

	<?php // mod 2017/02/24 K.Tani [ ?>
	// 検索範囲を設定
	var opts = new ZdcNearShopOptions2();
	opts.cid = "<?php echo $D_DATA_CID; ?>";
	opts.lat = ZDC.degToms(latlon.lat);
	opts.lon = ZDC.degToms(latlon.lon);
	
	// 0:半径指定無し
	if(init_rad == 0){
		opts.radius = 0;
	}else{
		// 指定半径が入る範囲で検索
		var latlons = ZdcEmapGetPointsByRad(latlon, init_rad)
		var zi = ZdcEmapMapObj.getAdjustZoom(latlons, {fix:true});
		ZdcEmapMapObj.setZoom(zi.zoom);
		var box = ZdcEmapMapObj.getLatLonBox();
		var boxmin = box.getMin();
		var boxmax = box.getMax();
		opts.latlon = ZDC.degToms(boxmin.lat)+","+ZDC.degToms(boxmin.lon)+","+ZDC.degToms(boxmax.lat)+","+ZDC.degToms(boxmax.lon);
	}
	<?php
	// 初期検索範囲（m）の緯度経度差分（ミリ秒）を算出 ?>
//	var latlons = ZdcEmapGetPointsByRad(latlon, init_rad)
//	var zi = ZdcEmapMapObj.getAdjustZoom(latlons, {fix:true});
//	ZdcEmapMapObj.setZoom(zi.zoom);
//	var box = ZdcEmapMapObj.getLatLonBox();
//	var boxmin = box.getMin();
//	var boxmax = box.getMax();
	// 初期検索範囲にSEJ店舗が1つ以上存在するかどうか
//	var opts = new ZdcNearShopOptions2();
//	opts.cid = "<?php echo $D_DATA_CID; ?>";
//	opts.lat = ZDC.degToms(latlon.lat);
//	opts.lon = ZDC.degToms(latlon.lon);
//	opts.latlon = ZDC.degToms(boxmin.lat)+","+ZDC.degToms(boxmin.lon)+","+ZDC.degToms(boxmax.lat)+","+ZDC.degToms(boxmax.lon);
	<?php // mod 2017/02/24 K.Tani ] ?>

	<?php // add 2017/02/10 K.Tani [ ?>
	if (ZdcEmapSearchCond) opts.jkn = ZdcEmapSearchCond;
	<?php // add 2017/02/10 K.Tani ] ?>

	opts.pos = 1;
	opts.maxCount = 1;
	opts.limitCount = 1;
	opts.timeout = <?php echo $D_AJAX_TIMEOUT; ?>;
	ZdcEmapNearShop2.opts = opts;
	ZdcEmapNearShop2.search(opts, ZdcEmap711aplSearchShopResult);
}
function ZdcEmap711aplSearchShopResult(result) {

	// 検索回数カウント
	SearchCount++;

	// エラー処理
	if(result.status != 0 && result.status != 3 && result.status != 5 && result.status != 9) {
		alert("<?php echo $D_MSG_ERR_JS_RESULT; ?>" + ' [' + result.status + ']');
		ZdcEmapSearchEventStart();
		ZdcEmapReadOff();
		return;
	}
	// 件数確認
	var cnt = result.items.length;
	if (cnt) {
		<?php // mod 2017/02/24 K.Tani [ ?>
		if(SearchCount >= 3){
			// 店舗ありなら、店舗が入る範囲を設定し、最寄り検索
			var nLatlon = new ZDC.LatLon(ZDC.msTodeg(result.items[0].lat), ZDC.msTodeg(result.items[0].lon));
			var pLatlon = ZdcEmapMapObj.getLatLon();
			var latlons = [nLatlon, pLatlon];
			var zi = ZdcEmapMapObj.getAdjustZoom(latlons, {fix:true});
			
			<?php // mod 2017/03/02 K.Tani [ ?>
			if(zi != null){
				ZdcEmapMapObj.setZoom(zi.zoom);
				ZdcEmapSearchFirst = 0;
			}else{
				// 地図を最大範囲にしても直近の最寄りが入らない場合は最大縮尺にする
				ZdcEmapMapObj.setZoom(0);
				// 縮尺自動調整は行わない
				ZdcEmapSearchFirst = 1;
			}
			<?php // mod 2017/03/02 K.Tani ] ?>
			ZdcEmapSearchShop(ZdcEmapSearchCond);
			ZdcEmapSearchEventAdd('ZdcEmapSearchShop("' + ZdcEmapSearchCond + '")');
		}else{
			// 店舗ありなら地図範囲で最寄り検索
			ZdcEmapSearchFirst = 0;
			ZdcEmapSearchShop(ZdcEmapSearchCond);
			ZdcEmapSearchEventAdd('ZdcEmapSearchShop("' + ZdcEmapSearchCond + '")');
		}
		// 店舗ありなら地図範囲で最寄り検索
//		ZdcEmapSearchFirst = 0;
//		ZdcEmapSearchClickFlg = 1;
//		ZdcEmapSearchShop(ZdcEmapSearchCond);
//		ZdcEmapSearchEventAdd('ZdcEmapSearchShop("' + ZdcEmapSearchCond + '")');
		<?php // mod 2017/02/24 K.Tani ] ?>
	} else {

		<?php // add 2017/02/10 K.Tani [ ?>

		if(SearchCount < 2){
			// 2回目 検索開始
			ZdcEmap711aplSearchShop(<?php echo $D_711APL_ALT_RAD; ?>);
		<?php // add 2017/02/24 K.Tani [ ?>
		}else if(SearchCount < 3){
			// 3回目 範囲上限なし
			ZdcEmap711aplSearchShop(0);
		<?php // add 2017/02/24 K.Tani ] ?>
		}else{
			// 店舗なしなら通常の検索
			ZdcEmapSearchClickFlg = 1;
			ZdcEmapSearchShop(ZdcEmapSearchCond);
			ZdcEmapSearchEventAdd("ZdcEmapSearchShop('"+ZdcEmapSearchCond+"')");
		}
		<?php // add 2017/02/10 K.Tani ] ?>
	}
}
