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
// 2015/11/18 Xuan Chien	GPSログ出力対応
// 2016/01/26 H.Yasunaga	711mapニッセンカスタマイズ
// 2016/01/28 H.Yasunaga	711mapニッセンカスタマイズ 店舗一覧の再検索
// 2016/02/18 Y.Matsukawa	最寄り検索にだけ適用するcond
// 2016/02/25 H.Osamoto		711map(ユニクロ)専用最寄り検索機能追加
// 2016/11/09 K.Tani		【不具合対応】S1.0/iOS.10にて地図のピンチインピンチアウトによる拡大縮小ができない
// ------------------------------------------------------------
require_once('/home/emap/src/smt/inc/define.inc');
require_once('/home/emap/src/smt/inc/act_get_freeparm.inc');		// add 2012/01/11 Y.Matsukawa
// アイコン情報取得
include("/home/emap/src/smt/inc/define_get_icon.inc");
?>
// マーカー
var ZdcEmapMapShopMrkId = new Array(<?PHP echo $D_SHOP_MAX; ?>);
var ZdcEmapMapShopMrkCnt = null;
// 地図
var ZdcEmapMapObj = null;
// 地図余白領域	add 2011/08/26 H.osamoto
var ZdcEmapAnyDispPx = 0;
var ZdcEmapAnyDispPy = 0;	// add 2011/12/26 K.Masuda
// ユーザーレイヤー
var ZdcEmapMapUserLyr = new ZdcUserLayer();
var ZdcEmapMapUserLyrId = null;
// マーカー
var ZdcEmapMapShopMrkId = new Array(<?PHP echo $D_SHOP_MAX; ?>);
var ZdcEmapMapShopMrkCnt = null;
var ZdcEmapMapShopDetailMrkId = null;
var ZdcEmapMapCurFocusMrkId = null;
var ZdcEmapMapPoiMrkId = new Array(20);		// add 2011/07/13 Y.Matsukawa
var ZdcEmapMapPoiMrkCnt = null;		// add 2011/07/13 Y.Matsukawa
// 吹き出し
var ZdcEmapMsg = new ZdcUserMsgWindow();
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

//-------------------------------------------------------------
//自動検索のイベント管理
//-------------------------------------------------------------
var ZdcEmapSearchEventFlg  = 0;
var ZdcEmapSearchEventFunc = null;
var ZdcEmapSearchEventDragmapend;
var ZdcEmapSearchEventScrollmapend;
var ZdcEmapSearchEventChangezoomend;

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
	ZdcEmapMapObj = new ZdcMap(document.getElementById("ZdcEmapMap"),
								new ZdcPoint(init_lon, init_lat, <?PHP echo $D_PFLG; ?>),
								init_lv
								, <?php echo $D_MAP_TYPE; ?>			// add 2011/09/01 Y.Matsukawa
								);

	// 地図の縮尺レベル変更イベント( changezoomend ) をハンドルする
	ZdcEvent.addListener( ZdcEmapMapObj, 'changezoomend', function() {
		// セレクトボックスの選択を変更する
		ZdcEmapMapScaleToLvlSelect();
		// ズームボタンのイメージを変更する
		if(<?php echo ($D_SCALE_TYPE)?'1':'0'; ?> == '1') ZdcEmapLvlScaleBtn();	// add 2012/08/16 K.Masuda
	} );

	ZdcEmapMapObj.addMapScaleBar( new ZdcScaleBar( '3' ) );

	ZdcEmapMapObj.reflashMap();

	ZdcEmapMapObj.saveMapLocation();

	ZdcEmapMapScaleToLvlSelect();

	//ユーザーレイヤー
	ZdcEmapMapUserLyr.setLayerScale(1,15);
	ZdcEmapMapUserLyr.clearMarker();
	ZdcEmapMapUserLyrId = ZdcEmapMapObj.addUserLayer(ZdcEmapMapUserLyr); 

	// add 2016/11/09 K.Tani [
	document.getElementById("ZdcEmapMap").ontouchmove = function ( event ) {
		event.preventDefault();
	};
	// add 2016/11/09 K.Tani ]
	
	ZdcEvent.addListener(ZdcEmapMapObj, "clickmapnomove", function(e) {
		ZdcEmapShopMsgClose();
	});
	// add 2012/02/22 H.osamoto [
	ZdcEvent.addListener(ZdcEmapMapObj, "changezoomend", ZdcEmapMapEventLogZoom);
	ZdcEvent.addListener(ZdcEmapMapObj, "dragmapend", ZdcEmapMapEventLogLoc);
	// add 2012/02/22 H.osamoto ]

	if(<?php echo ($D_SCALE_TYPE)?'1':'0'; ?> == '1') ZdcEmapLvlScaleBtn();	// add 2012/08/16 K.Masuda
	
	setTimeout(ZdcEmapRefMap, 100);		<?php // add 2014/09/11 Y.Matsukawa ?>
}

<?php //function ZdcEmapShopMapInit(kid,lat,lon,icnno,nflg,lvl) {		mod 2011/07/13 Y.Matsukawa ?>
function ZdcEmapShopMapInit(kid,lat,lon,icnno,nflg,lvl,mode) {
	var mrk,tmp;
	var tooltip_w,tooltip_h,tooltip_offset_x,tooltip_offset_y;		// add 2011/08/10 H.Osamoto
	if (lvl && lvl != 0) {
		ZdcEmapMapObj.setMapScale(lvl);
	} else if(<?PHP echo $D_INIT_LVL_DETAIL; ?> > 0) {
		ZdcEmapMapObj.setMapScale(<?PHP echo $D_INIT_LVL_DETAIL; ?>);
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
							function() { ZdcEmapShopMsg(null, 1, 'detail'); }
							);
	}
	<?php // mod 2012/12/17 H.Osamoto ] ?>
	if(ZdcEmapMapShopDetailMrkId != null) ZdcEmapMapUserLyr.removeMarkerById(ZdcEmapMapShopDetailMrkId);
	ZdcEmapMapShopDetailMrkId = ZdcEmapMapUserLyr.addMarker(mrk);

	// add 2011/08/10 H.osamoto [
	if (nflg == 1) {
		var tooltip = new ZdcTooltip();
		var tooltipHTML = '<img src="'+ZdcEmapIconImg["@NEW"]+'">';
		tooltip.setZdcTooltip(mrk.Point, tooltipHTML, tooltip_w, tooltip_h, new ZdcPixel(tooltip_offset_x, tooltip_offset_y), 4);
		tooltip.mrkid = mrk.id;
<?php	//ZdcEvent.addListener(tooltip, "mouseclicktooltip", function() { ZdcEmapShopMsg(this.mrkid, 1); });	mod 2012/02/02 N.Wada ?>
		ZdcEvent.addListener(tooltip, "mouseclicktooltip", function() { ZdcEmapShopMsg(this.mrkid, 1, 'detail'); });
		ZdcEmapMapUserLyr.addZdcTooltip(tooltip);
		mrk.toolid = tooltip.id;
		ZdcEmapMapUserLyr.visibleZdcTooltipById(mrk.toolid);
	}
	// add 2011/08/10 H.osamoto ]
	
	if (mode == '') {		<?php // add 2011/07/13 Y.Matsukawa ?>
<?php	//ZdcEmapShopMsg(null, 1);	mod 2012/02/02 N.Wada ?>
		ZdcEmapShopMsg(null, 1, 'detail');
		ZdcEmapMapObj.reflashMap();
	}
	ZdcEmapMapObj.saveMapLocation();
}

<?php // add 2011/04/26 Y.Matsukawa ?>
function ZdcEmapMaplinkInit(lat,lon,icnno,lvl,parm_nm) {
	var mrk,tmp;
	if (lvl && lvl != 0) {
		ZdcEmapMapObj.setMapScale(lvl);
	} else if(<?PHP echo $D_INIT_LVL; ?> > 0) {
		ZdcEmapMapObj.setMapScale(<?PHP echo $D_INIT_LVL; ?>);
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
	if(ZdcEmapMapShopDetailMrkId != null) ZdcEmapMapUserLyr.removeMarkerById(ZdcEmapMapShopDetailMrkId);
	ZdcEmapMapShopDetailMrkId = ZdcEmapMapUserLyr.addMarker(mrk);

	ZdcEmapShopMsgMaplink(parm_nm);
	
	ZdcEmapMapObj.reflashMap();

	ZdcEmapMapObj.saveMapLocation();
}

function ZdcEmapMakeMrk(id,lat,lon,
						sizew,sizeh,shadowsizew,shadowsizeh,
						offsetx,offsety,shdoffsetx,shdoffsety,msgoffsetx,msgoffsety,
						image,shadowimage,
						data1,data2,nflg,
						mouseclickmarker
						,lvl
						) {

	var p,mrk,item;
	var icon = new ZdcIcon();
	
	//アイコンの作成
	icon.size      = new ZdcSize(sizew, sizeh);
	icon.offset    = new ZdcPixel(offsetx, offsety);
	<?php
	// icon.imageの末尾が「.gif」でないと、内部的にGIF以外として処理されてしまうので、末尾を無理矢理「.gif」にしています。
	// GIF以外で処理されてしまうと、IEで印刷時に透過GIFが透過しません。
	// タイムスタンプ値を付加しているのは、キャッシュ抑制のためです。これがないと、アイコン画像を差し替えた際に表示が崩れることがあります。（IEのみ）
	?>
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
	//マーカークリック時のイベント登録
	if(mrk.mouseclickmarker) ZdcEvent.addListener(mrk, "mouseclickmarker", mrk.mouseclickmarker);

	return mrk;
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
	<?PHP echo $D_JSCODE_MSGSHOP; ?>
	
	if(id != null) var obj = ZdcEmapMapUserLyr.getMarkerById(ZdcEmapMapShopMrkId[id]);
	else var obj = ZdcEmapMapUserLyr.getMarkerById(ZdcEmapMapShopDetailMrkId);
	
	//フキダシを表示させる
	<?php // add 2014/08/18 AnPham [?>
	if( overlap == 1) {
		var kidprm = "";
		for (var i = 0; i < IconGrp.length; i++) {
			var grpKid = IconGrp[i].split(',');
			if( grpKid.length > 1) { 
				if( grpKid.indexOf( obj.data1) == 0) {// choosen "clicked icon" is first.
					for( var k=0; k < grpKid.length; k++ ){
						if( grpKid[k] == ""){ continue; }
						kidprm += "&kid" + k + "=" + grpKid[k];
					}
				}
			} else if( grpKid.length == 1)
				kidprm += "&kid=" + obj.data1;
		}
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
		var node = document.createElement('DIV');
		node.innerHTML = html;
		obj.openUserMsgWindow(ZdcEmapMsg,obj.Point,node,1);
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
	<?PHP echo $D_JSCODE_MSGSHOP; ?>

	var obj = ZdcEmapMapUserLyr.getMarkerById(ZdcEmapMapShopDetailMrkId);

	//フキダシを表示させる
	var url = "<?PHP echo $D_DIR_BASE_L; ?>maplink_msg.htm?"+parm_nm;
	<?php if($https_req){ ?>url += "&https_req=1";<?php } ?>
	//url += "<?php echo ($freeparms?'&'.$freeparms:''); ?>";		// add 2012/01/11 Y.Matsukawa	mod 2012/09/10 Y.Matsukawa
	url += "<?php echo ($freeparms_enc?'&'.$freeparms_enc:''); ?>";
	ZdcEmapHttpRequestHtml(url, function(html,status){
		if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> msg["+status+"]";
		var node = document.createElement('DIV');
		node.innerHTML = html;
		obj.openUserMsgWindow(ZdcEmapMsg,obj.Point,node,1);
		ZdcEmapReadOff();
	<?php //});		mod 2012/09/10 Y.Matsukawa ?>
	}, false, 2);
}

function ZdcEmapShopMsgClose() {
	if (ZdcEmapMapObj.getUserMsgOpenStatus()) {
		ZdcEmapMapObj.closeUserMsgWindow();
	}
	//ZdcEmapMapFrontShopReset();
}

function ZdcEmapMapScaleToLvlSelect() {
	var newLvl = ZdcEmapMapObj.getMapScale();
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
	ZdcEmapMapObj.setMapScale(newLvl);
}

function ZdcEmapResetMapLocation() {
	ZdcEmapMapObj.restoreMapLocation();
}

<?php // add 2012/08/16 K.Masuda [ ?>
// +-ボタン
function ZdcEmapLvlScaleBtn(){
<?php // mod 2014/02/27 H.Osamoto [ ?>
	//	var now_lvl = ZdcEmapMapObj.getMapScale();
	var now_lvl = parseInt(ZdcEmapMapObj.getMapScale());
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
	var now_lvl = parseInt(ZdcEmapMapObj.getMapScale());
<?php // mod 2014/02/27 H.Osamoto ] ?>
	if( max_lvl <= now_lvl || now_lvl >= min_lvl ){
		if(type == 'p'){
			if( now_lvl < min_lvl ){
				now_lvl++;
			}
			ZdcEmapMapObj.setMapScale(now_lvl);
		} else {
			if( now_lvl > max_lvl ){
				now_lvl--;
			}
			ZdcEmapMapObj.setMapScale(now_lvl);
		}
	} else {
		if(type == 'p'){
			now_lvl = min_lvl;
		} else {
			now_lvl = max_lvl;
		}
		ZdcEmapMapObj.setMapScale(now_lvl);
	}
	ZdcEmapLvlScaleBtn();
}
<?php // add 2012/08/16 K.Masuda ] ?>

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

<?php // 神奈川電通地図移動		add 2012/12/17 H.Osamoto [ ?>
function ZdcEmapMapMoveBoxKanaden(minlat,minlon,maxlat,maxlon){
	var p1 = new ZdcPoint(minlon,minlat,<?PHP echo $D_PFLG; ?>);	<?php // 現在位置 ?>
	var p2 = new ZdcPoint(maxlon,maxlat,<?PHP echo $D_PFLG; ?>);	<?php // 目的地 ?>
	var bx = new ZdcBox(p1,p2);
	var s = ZdcEmapMapObj.getMapBoxScale(bx, p1);
	
	ZdcEmapMapObj.setMapLocation(p1);
	ZdcEmapMapObj.setMapScale(s);
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
	
	<?php
	// add 2016/02/25 H.Osamoto [
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
	// add 2016/02/25 H.Osamoto ] ?>
	
<?php // add 2012/10/24 Y.Matsukawa ] ?>
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
	//アイコン表示位置設定
	var p = new ZdcPoint();
	p = ZdcEmapMapObj.getMapLocation();
	ZdcEmapIconPoint = new ZdcPoint(p.mx, p.my, 2);
	//ユーザレイヤー作成
	ZdcEmapIconLayer = new ZdcUserLayer();
	ZdcEmapIconLayer.setLayerScale(1, 15);
	//アイコン作成
	ZdcEmapIcon1 = new ZdcIcon();
	ZdcEmapIcon1.offset = new ZdcPixel(<?PHP echo ceil(- $D_ICON_SHOP_W / 2); ?>, <?PHP echo ceil(- $D_ICON_SHOP_H / 2); ?>);
	ZdcEmapIcon1.image = '<?PHP echo $D_ICON_SHOP_IMG; ?>';
	//ユーザレイヤーに追加
	ZdcEmapIconLayer.addMarker(new ZdcMarker(ZdcEmapIconPoint, ZdcEmapIcon1));
	//地図にユーザレイヤーを追加
	ZdcEmapMapObj.addUserLayer(ZdcEmapIconLayer);
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
	//位置・範囲取得
	var p   = new ZdcPoint();
	p = ZdcEmapMapObj.getMapLocation();
	var box = ZdcEmapMapObj.getMapBoundBox();
	//検索するか否かの判断
	if(ZdcEmapSearchPoint != null) {
		var pix1 = ZdcEmapMapObj.convertPoint2Pixel( ZdcEmapSearchPoint, 2 );
		var pix2 = ZdcEmapMapObj.convertPoint2Pixel( p, 2 );
		if(Math.abs(pix1.x-pix2.x) < <?PHP echo $D_SHOP_SEARCHPIX; ?> && 
		   Math.abs(pix1.y-pix2.y) < <?PHP echo $D_SHOP_SEARCHPIX; ?> &&
		   ZdcEmapSearchScale == ZdcEmapMapObj.getMapScale()) {
			ZdcEmapReadOff();
			return;
		}
	}
	if(ZdcEmapSearchPoint != null && <?PHP echo $D_SHOP_SEARCHPIX; ?> == -1) {
		//自動再検索しない
		ZdcEmapReadOff();
		return;
	}
	//自動検索イベント停止
	ZdcEmapSearchEventStop();
	//ZdcEmapShopMsgClose();
	//
	var opts = new ZdcNearShopOptions();
	//opts.cid='<?PHP echo $D_CID; ?>'		mod 2012/01/19 N.Wada
	opts.cid='<?PHP echo $D_DATA_CID; ?>'
	opts.lat = p.my;
	opts.lon = p.mx;
	if(ZdcEmapSearchFirst != 1) {
		opts.latlon = box.miny+","+box.minx+","+box.maxy+","+box.maxx;
		opts.radius = <?PHP echo $D_SHOP_RAD_RE; ?>;
	} else {
		ZdcEmapSearchFirst = 0;
		<?php // add 2013/05/22 H.Osamoto [ ?>
		<?php if (isset($D_RESEARCH_CNT) && $D_RESEARCH_CNT) { ?>
		opts.researchCount = <?PHP echo $D_RESEARCH_CNT; ?>;
		<?php } ?>
		<?php // add 2013/05/22 H.Osamoto ] ?>
		opts.radius = <?PHP echo $D_SHOP_RAD; ?>;
		<?php
		// add 2016/01/28 H.Yasunaga [
		// 711mapニッセンカスタマイズ
		// 1/15000で検索させるためにradiusの設定をなくし地図の範囲を指定する
		if ($D_711NISSEN_FIX_ZOOM) { ?>
			opts.radius = 0;
			//opts.latlon = boxmin.lat+","+boxmin.lon+","+boxmax.lat+","+boxmax.lon;
			opts.latlon = box.miny+","+box.minx+","+box.maxy+","+box.maxx;
		<?php 
		}
		// add 2016/01/28 H.Yasunaga ] ?>
	}
	<?php
	// add 2016/02/18 Y.Matsukawa [
	// 最寄り検索のみに適用するcond条件
	if ($D_N_COND != "") { ?>
	if (cond) {
		cond = "("+cond+") AND <?php echo $D_N_COND; ?>";
	} else {
		cond = "<?php echo $D_N_COND; ?>";
	}
	<?php
	}
	// add 2016/02/18 Y.Matsukawa ] ?>
	if (cond) opts.jkn = cond;
	opts.pos = 1;
	opts.maxCount = <?PHP echo $D_SHOP_MAX; ?>;
	opts.limitCount = <?PHP echo $D_SHOP_MAX; ?>;
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
	ZdcEmapNearShop.opts = opts;
	
	//アイコンを表示する
	ZdcEmapNearShop.search(opts,ZdcEmapSearchShopResult);
}
//検索結果の処理
function ZdcEmapSearchShopResult(result) {
	var i,item,mrk,tmp,icnt,maxlat=0,maxlon=0,minlat=999999999,minlon=999999999;
	var tooltip_w,tooltip_h,tooltip_offset_x,tooltip_offset_y;		// add 2011/08/10 H.Osamoto
	//マーカー削除
	if(ZdcEmapMapShopMrkCnt != null) {
		for( i = 0;i < ZdcEmapMapShopMrkCnt;i ++) {
			ZdcEmapMapUserLyr.removeMarkerById(ZdcEmapMapShopMrkId[i]);
			ZdcEmapMapUserLyr.clearZdcTooltip();	// add 2011/08/10 H.osamoto
			ZdcEmapMapShopMrkId[i] = null;
		}
	}
	ZdcEmapMapShopMrkCnt = 0;
	//エラー処理
	if(result.status != 0 && result.status != 3 && result.status != 5 && result.status != 9) {
		alert("<?PHP echo $D_MSG_ERR_JS_RESULT; ?> listres["+result.status+"]");
		ZdcEmapSearchEventStart();
		<?php //ZdcEmapSearchShopClose();		del 2015/07/01 Y.Matsukawa ?>
		ZdcEmapReadOff();
		return;
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
						<?php	//function() { ZdcEmapShopMsg(this.id, 1); },	mod 2012/02/02 N.Wada ?>
						<?php 	// function() { ZdcEmapShopMsg(this.id, 1, 'bunpu'); },// mod 2014/08/18 AnPham ?>
								function() { ZdcEmapShopMsg(this.id, 1, 'bunpu', <?php echo empty($D_KYO_ICON_OVERLAP)?'""':$D_KYO_ICON_OVERLAP; ?>); },
								null,
								null,
								item.lvl
								);
			if (ZdcEmapMapShopMrkId[i] != null) ZdcEmapMapUserLyr.removeMarkerById(ZdcEmapMapShopMrkId[i]);//念のため
			ZdcEmapMapShopMrkId[i] = ZdcEmapMapUserLyr.addMarker(mrk);
			// add 2011/08/10 H.osamoto [
			if (item.nflg == 1) {
				var tooltip = new ZdcTooltip();
				var tooltipHTML = '<img src="'+ZdcEmapIconImg["@NEW"]+'">';
				tooltip.setZdcTooltip(mrk.Point, tooltipHTML, tooltip_w, tooltip_h, new ZdcPixel(tooltip_offset_x, tooltip_offset_y), 4);
				tooltip.mrkid = mrk.id;
		<?php	//ZdcEvent.addListener(tooltip, "mouseclicktooltip", function() { ZdcEmapShopMsg(this.mrkid, 1); });	mod 2012/02/02 N.Wada ?>
				ZdcEvent.addListener(tooltip, "mouseclicktooltip", function() { ZdcEmapShopMsg(this.mrkid, 1, 'bunpu'); });
				ZdcEmapMapUserLyr.addZdcTooltip(tooltip);
				mrk.toolid = tooltip.id;
				ZdcEmapMapUserLyr.visibleZdcTooltipById(mrk.toolid);
			}
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
			ZdcEmapMapShopMrkCnt ++;
			ZdcEmapIconDt[i] = item.lat + ":" + item.lon + ":" + ZdcEmapIconW[item.icon] + ":" + ZdcEmapIconH[item.icon];<?php // add 2014/08/18 AnPham?>
		}
		ZdcEmapSearchRetryVCnt = 0;		<?php // add 2012/10/24 Y.Matsukawa ?>
		// add 2011/06/29 Y.Matsukawa [
		if(ZdcEmapSearchClickFlg) {
			ZdcEmapSearchClickFlg = 0;
		// add 2011/06/29 Y.Matsukawa ]
			//初期検索時は画面移動
			if (ZdcEmapMapShopMrkCnt > 0) {
				//拠点が収まる範囲に移動
				<?php // mod 2016/01/26 H.Yasunaga 711mapニッセンの場合再検索後は縮尺を決めずに表示[ ?>
				<?php if ($D_711NISSEN_FIX_ZOOM) { ?>
				if (result.researched == "1") {
					ZdcEmapMapMoveBox(minlat,minlon,maxlat,maxlon,ZdcEmapMapObj.getMapLocation(),1);
				}
				<?php //add 2016/01/28 H.Yasunaga 711mapニッセンカスタマイズ　店舗一覧の再検索[ ?>
				window.parent.ZdcEmapSearchNearShopListClear();
				var box = ZdcEmapMapObj.getMapBoundBox();
				var loc = ZdcEmapMapObj.getMapLocation();
				var filter = "<?php echo urlencode($filter); ?>";
				var freemarams = "<?php echo $pl_prm_enc['pl'].$pl_prm_plfilter_enc.($freeparms_enc?'&'.$freeparms_enc:''); ?>";
				var condparams = "<?php echo $cond_prm_enc; ?>";
				var latlonparams =  box.miny + "," + box.minx + "," + box.maxy + "," + box.maxx;
				window.parent.ZdcEmapSearchNearShop2(loc.my, loc.mx, '', filter, freemarams, condparams, 1,latlonparams);
				// 拠点アイコン再検索
				// add //add 2016/01/28 H.Yasunaga [
				ZdcEmapSearchShopStart(ZdcEmapSearchCond);
				// add //add 2016/01/28 H.Yasunaga ]
				<?php //add 2016/01/28 H.Yasunaga ] ?>
				
				<?php } else { ?>
				ZdcEmapMapMoveBox(minlat,minlon,maxlat,maxlon,ZdcEmapMapObj.getMapLocation(),1);
				<?php } ?>
				<?php // mod 2016/01/26 H.Yasunaga ] ?>
			} else {
				//検索半径の縮尺に移動  ※位置によってgetPoint2PointDistanceの値が変わるため毎回計算している
				var p = new ZdcPoint();
				p = ZdcEmapMapObj.getMapLocation();
				var rx = parseInt((450000 / (11 * 1000)) * <?PHP echo $D_SHOP_RAD; ?>);//CGIと計算をあわせる
				var ry = parseInt((300000 / (9 * 1000)) * <?PHP echo $D_SHOP_RAD; ?>);//〃
				var p1 = new ZdcPoint(p.mx - rx,p.my - ry,<?PHP echo $D_PFLG; ?>);
				var p2 = new ZdcPoint(p.mx + rx,p.my + ry,<?PHP echo $D_PFLG; ?>);
				var bx = new ZdcBox(p1,p2);
				var lv = ZdcEmapMapObj.getMapBoxScale( bx, p );
				if(lv < 18) lv = lv + 1;//１つズームイン
				ZdcEmapMapObj.setMapScale(lv);
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
	ZdcEmapMapObj.reflashMap();
	ZdcEmapSearchEventStart();
	//検索位置を保持
	ZdcEmapSearchPoint = ZdcEmapMapObj.getMapLocation();
	ZdcEmapSearchScale = ZdcEmapMapObj.getMapScale();
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
// フキダシを閉じる
function ZdcEmapShopMsgClose() {
	if (ZdcEmapMapObj.getUserMsgOpenStatus()) {
		ZdcEmapMapObj.closeUserMsgWindow();
	}
}


//検索実行
function ZdcEmapSearchEventAction() {
	if(!ZdcEmapSearchEventFlg) return;
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
	ZdcEmapSearchEventDragmapend    = ZdcEvent.addListener(ZdcEmapMapObj, "dragmapend"   , ZdcEmapSearchEventAction);
	ZdcEmapSearchEventScrollmapend  = ZdcEvent.addListener(ZdcEmapMapObj, "scrollmapend" , ZdcEmapSearchEventAction);
	ZdcEmapSearchEventChangezoomend = ZdcEvent.addListener(ZdcEmapMapObj, "changezoomend", ZdcEmapSearchEventAction);
}
//検索イベント削除
function ZdcEmapSearchEventDel() {
	ZdcEmapSearchEventStop();
	if(ZdcEmapSearchEventDragmapend)    ZdcEvent.removeListener(ZdcEmapSearchEventDragmapend);
	//if(ZdcEmapSearchEventScrollmapend)  ZdcEvent.removeListener(ZdcEmapSearchEventScrollmapend);
	if(ZdcEmapSearchEventChangezoomend) ZdcEvent.removeListener(ZdcEmapSearchEventChangezoomend);
	
	ZdcEmapSearchEventDragmapend = null;
	//ZdcEmapSearchEventScrollmapend = null;
	ZdcEmapSearchEventChangezoomend = null;
	delete ZdcEmapSearchEventFunc;
}
//検索イベント開始
function ZdcEmapSearchEventStart() {
	ZdcEmapSearchEventFlg = 1;
}
//検索イベント停止
function ZdcEmapSearchEventStop() {
	ZdcEmapSearchEventFlg = 0;
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
function ZdcEmapChangeOrientation()
{
	ZdcEmapWindowHeight = ZdcEmapWindowHeight - ZdcEmapAnyDispPx;	// add 2011/08/26 H.osamoto
	ZdcEmapWindowWidth  = ZdcEmapWindowWidth  - ZdcEmapAnyDispPy;	// add 2011/12/26 K.Masuda
	if ( window.orientation == 90 || window.orientation == -90 )
	{
		// Landscape(横表示)
		ZdcEmapMapObj.removeMapScaleBar();
		ZdcEmapMapObj.resizeMapWindow( 0, 0, ZdcEmapWindowWidth, ZdcEmapWindowHeight );
		ZdcEmapMapObj.addMapScaleBar( new ZdcScaleBar( '3' ) );
	}
	else
	{
		// Portrait(縦表示)
		ZdcEmapMapObj.removeMapScaleBar();
		ZdcEmapMapObj.resizeMapWindow( 0, 0, ZdcEmapWindowWidth, ZdcEmapWindowHeight );
		ZdcEmapMapObj.addMapScaleBar( new ZdcScaleBar( '3' ) );
	}
	
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
<?php } ?>

<?php
// add 2011/07/13 Y.Matsukawa
//---------------------------------------------------------------------------
// 地図移動
//---------------------------------------------------------------------------
?>
function ZdcEmapMapMoveBox(minlat,minlon,maxlat,maxlon,pt,noin){
	var p1 = new ZdcPoint(minlon,minlat,2);
	var p2 = new ZdcPoint(maxlon,maxlat,2);
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
// 現在地からルート探索
function ZdcEmapLocRoute(loc_lat, loc_lon, shop_lat, shop_lon) {
	if(ZdcEmapLocRouteType == 0) return;
	ZdcEmapRouteType = ZdcEmapLocRouteType;

	ZdcEmapShopMsgClose();
	ZdcEmapRouteClear();
	ZdcEmapPoiMrkClear();

	ZdcEmapRoutePoint1 = new ZdcPoint(shop_lon, shop_lat, 2);
	ZdcEmapRoutePoint2 = ZdcCommon.WGS2TKY(loc_lon, loc_lat);
	if(ZdcEmapRouteType == 1)
		ZdcEmapRouteSearchWalk(ZdcEmapRoutePoint1, ZdcEmapRoutePoint2);
	if(ZdcEmapRouteType == 2)
		ZdcEmapRouteSearchCar(ZdcEmapRoutePoint1, ZdcEmapRoutePoint2);
	//画面の移動
	ZdcEmapMapMoveBox(ZdcEmapRoutePoint1.my, ZdcEmapRoutePoint1.mx, ZdcEmapRoutePoint2.my, ZdcEmapRoutePoint2.mx);
	<?php
		// add 2015/11/18 Xuan Chien [
		// GPSログ出力
		if (isset($D_SGPS_LOG) && $D_SGPS_LOG == '1') {
	?>
		ZdcEmapGpsLog(ZdcEmapRoutePoint2.my, ZdcEmapRoutePoint2.mx);
	<?php
		}
		// add 2015/11/18 Xuan Chien ]
	?>
}
// 最寄り駅アイコン表示
function ZdcEmapEki(eki_lat, eki_lon, shop_lat, shop_lon) {
	var point1 = new ZdcPoint(eki_lon, eki_lat, 2);
	var point2 = new ZdcPoint(shop_lon, shop_lat, 2);

	// 駅アイコン表示
	ZdcEmapPoiMrkClear();
	var i = ZdcEmapMapPoiMrkCnt;
	var mrk = ZdcEmapMakeMrk(i,eki_lat,eki_lon,
						<?PHP echo $D_ICON_EKI_W; ?>,<?PHP echo $D_ICON_EKI_H; ?>,0,0,
						<?PHP echo $D_ICON_EKI_OFFSET_X; ?>,<?PHP echo $D_ICON_EKI_OFFSET_Y; ?>,0,0,0,0,
						'<?PHP echo $D_ICON_EKI_IMAGE; ?>',"",
						"","",0,
						null,
						null,
						null);
	if (ZdcEmapMapPoiMrkId[i] != null) ZdcEmapMapUserLyr.removeMarkerById(ZdcEmapMapPoiMrkId[i]);//念のため
	ZdcEmapMapPoiMrkId[i] = ZdcEmapMapUserLyr.addMarker(mrk);
	ZdcEmapMapPoiMrkCnt ++;

	//画面の移動
	ZdcEmapMapMoveBox(point1.my, point1.mx, point2.my, point2.mx);
}
// 駅からルート探索
function ZdcEmapEkiRoute(eki_lat, eki_lon, shop_lat, shop_lon) {
	if(ZdcEmapNekiRouteType == 0) return;
	ZdcEmapRouteType = ZdcEmapNekiRouteType;

	ZdcEmapShopMsgClose();
	ZdcEmapRouteClear();

	ZdcEmapRoutePoint1 = new ZdcPoint(shop_lon, shop_lat, 2);
	ZdcEmapRoutePoint2 = new ZdcPoint(eki_lon, eki_lat, 2);
	if(ZdcEmapRouteType == 1)
		ZdcEmapRouteSearchWalk(ZdcEmapRoutePoint1, ZdcEmapRoutePoint2);
	if(ZdcEmapRouteType == 2)
		ZdcEmapRouteSearchCar(ZdcEmapRoutePoint1, ZdcEmapRoutePoint2);
	//画面の移動
	ZdcEmapMapMoveBox(ZdcEmapRoutePoint1.my, ZdcEmapRoutePoint1.mx, ZdcEmapRoutePoint2.my, ZdcEmapRoutePoint2.mx);
}
<?php // 最寄り施設アイコン表示		add 2012/07/18 Y.Matsukawa ?>
function ZdcEmapPoi(poi_lat, poi_lon, poi_jnrmn, shop_lat, shop_lon) {
	var point1 = new ZdcPoint(poi_lon, poi_lat, 2);
	var point2 = new ZdcPoint(shop_lon, shop_lat, 2);

	ZdcEmapPoiMrkClear();
	var i = ZdcEmapMapPoiMrkCnt;
	var mrk = ZdcEmapMakeMrk(i,poi_lat,poi_lon,
						<?PHP echo $D_ICON_POI_W; ?>,<?PHP echo $D_ICON_POI_H; ?>,0,0,
						<?PHP echo $D_ICON_POI_OFFSET_X; ?>,<?PHP echo $D_ICON_POI_OFFSET_Y; ?>,0,0,0,0,
						'<?PHP echo $D_ICON_POI_IMAGE_DIR; ?>'+poi_jnrmn+'.gif',"",
						"","",0,
						null,
						null,
						null);
	if (ZdcEmapMapPoiMrkId[i] != null) ZdcEmapMapUserLyr.removeMarkerById(ZdcEmapMapPoiMrkId[i]);//念のため
	ZdcEmapMapPoiMrkId[i] = ZdcEmapMapUserLyr.addMarker(mrk);
	ZdcEmapMapPoiMrkCnt ++;

	ZdcEmapMapMoveBox(point1.my, point1.mx, point2.my, point2.mx);
}
<?php // 施設からルート探索		add 2012/07/18 Y.Matsukawa ?>
function ZdcEmapPoiRoute(poi_lat, poi_lon, shop_lat, shop_lon) {
	if(ZdcEmapNpoiRouteType == 0) return;
	ZdcEmapRouteType = ZdcEmapNpoiRouteType;

	ZdcEmapShopMsgClose();
	ZdcEmapRouteClear();

	ZdcEmapRoutePoint1 = new ZdcPoint(poi_lon, poi_lat, 2);
	ZdcEmapRoutePoint2 = new ZdcPoint(shop_lon, shop_lat, 2);
	if(ZdcEmapRouteType == 1)
		ZdcEmapRouteSearchWalk(ZdcEmapRoutePoint1, ZdcEmapRoutePoint2);
	if(ZdcEmapRouteType == 2)
		ZdcEmapRouteSearchCar(ZdcEmapRoutePoint1, ZdcEmapRoutePoint2);

	ZdcEmapMapMoveBox(ZdcEmapRoutePoint1.my, ZdcEmapRoutePoint1.mx, ZdcEmapRoutePoint2.my, ZdcEmapRoutePoint2.mx);
}
<?php // 神奈川電通現在地アイコン表示		add 2012/12/17 H.Osamoto [ ?>
function ZdcEmapShopKanaden(now_lat, now_lon, shop_lat, shop_lon) {
	var point1 = new ZdcPoint(now_lon, now_lat, 2);
	var point2 = new ZdcPoint(shop_lon, shop_lat, 2);

	ZdcEmapPoiMrkClear();
	var i = ZdcEmapMapPoiMrkCnt;
	var mrk = ZdcEmapMakeMrk(i,now_lat,now_lon,
						<?PHP echo $D_ICON_NOW_W; ?>,<?PHP echo $D_ICON_NOW_H; ?>,0,0,
						<?PHP echo $D_ICON_NOW_OFFSET_X; ?>,<?PHP echo $D_ICON_NOW_OFFSET_Y; ?>,0,0,0,0,
						'<?PHP echo $D_ICON_NOW_IMG; ?>',"",
						"","",0,
						null,
						null,
						null);
	if (ZdcEmapMapPoiMrkId[i] != null) ZdcEmapMapUserLyr.removeMarkerById(ZdcEmapMapPoiMrkId[i]);//念のため
	ZdcEmapMapPoiMrkId[i] = ZdcEmapMapUserLyr.addMarker(mrk);
	ZdcEmapMapPoiMrkCnt ++;

	//画面の移動
	ZdcEmapMapMoveBoxKanaden(point1.my, point1.mx, point2.my, point2.mx);
}
<?php // 神奈川電通目的地アイコン表示		add 2012/12/17 H.Osamoto ] ?>
<?php // 神奈川電通最寄り駅アイコン表示		add 2012/12/17 H.Osamoto [ ?>
function ZdcEmapEkiKanaden(eki_lat, eki_lon, shop_lat, shop_lon) {
	var point1 = new ZdcPoint(eki_lon, eki_lat, 2);
	var point2 = new ZdcPoint(shop_lon, shop_lat, 2);

	var i = ZdcEmapMapPoiMrkCnt;
	var mrk = ZdcEmapMakeMrk(i,eki_lat,eki_lon,
						<?PHP echo $D_ICON_EKI_W; ?>,<?PHP echo $D_ICON_EKI_H; ?>,0,0,
						<?PHP echo $D_ICON_EKI_OFFSET_X; ?>,<?PHP echo $D_ICON_EKI_OFFSET_Y; ?>,0,0,0,0,
						'<?PHP echo $D_ICON_EKI_IMAGE; ?>',"",
						"","",0,
						null,
						null,
						null);
	if (ZdcEmapMapPoiMrkId[i] != null) ZdcEmapMapUserLyr.removeMarkerById(ZdcEmapMapPoiMrkId[i]);//念のため
	ZdcEmapMapPoiMrkId[i] = ZdcEmapMapUserLyr.addMarker(mrk);
	ZdcEmapMapPoiMrkCnt ++;

	//画面の移動
	ZdcEmapMapMoveBoxKanaden(point2.my, point2.mx, point1.my, point1.mx);
}
<?php // 神奈川電通最寄り駅アイコン表示		add 2012/12/17 H.Osamoto ] ?>
<?php // 神奈川電通最寄り施設アイコン表示		add 2012/12/17 H.Osamoto [ ?>
function ZdcEmapPoiKanaden(poi_lat, poi_lon, poi_jnrmn, shop_lat, shop_lon) {
	var point1 = new ZdcPoint(poi_lon, poi_lat, 2);
	var point2 = new ZdcPoint(shop_lon, shop_lat, 2);

	var i = ZdcEmapMapPoiMrkCnt;
	var mrk = ZdcEmapMakeMrk(i,poi_lat,poi_lon,
						<?PHP echo $D_ICON_EKI_W; ?>,<?PHP echo $D_ICON_EKI_H; ?>,0,0,
						<?PHP echo $D_ICON_EKI_OFFSET_X; ?>,<?PHP echo $D_ICON_EKI_OFFSET_Y; ?>,0,0,0,0,
						'<?PHP echo $D_ICON_EKI_IMAGE; ?>',"",
						"","",0,
						null,
						null,
						null);
	if (ZdcEmapMapPoiMrkId[i] != null) ZdcEmapMapUserLyr.removeMarkerById(ZdcEmapMapPoiMrkId[i]);//念のため
	ZdcEmapMapPoiMrkId[i] = ZdcEmapMapUserLyr.addMarker(mrk);
	ZdcEmapMapPoiMrkCnt ++;

	ZdcEmapMapMoveBoxKanaden(point2.my, point2.mx, point1.my, point1.mx);
}
<?php // 神奈川電通最寄り施設アイコン表示		add 2012/12/17 H.Osamoto ] ?>

// 出発地指定ルート探索
function ZdcEmapSearchRoute(srch_lat, srch_lon, shop_lat, shop_lon) {
	if(ZdcEmapSearchRouteType == 0) return;
	ZdcEmapRouteType = ZdcEmapSearchRouteType;

	ZdcEmapShopMsgClose();
	ZdcEmapRouteClear();

	ZdcEmapRoutePoint1 = new ZdcPoint(shop_lon, shop_lat, 2);
	ZdcEmapRoutePoint2 = new ZdcPoint(srch_lon, srch_lat, 2);
	if(ZdcEmapRouteType == 1)
		ZdcEmapRouteSearchWalk(ZdcEmapRoutePoint1, ZdcEmapRoutePoint2);
	if(ZdcEmapRouteType == 2)
		ZdcEmapRouteSearchCar(ZdcEmapRoutePoint1, ZdcEmapRoutePoint2);
	//画面の移動
	ZdcEmapMapMoveBox(ZdcEmapRoutePoint1.my, ZdcEmapRoutePoint1.mx, ZdcEmapRoutePoint2.my, ZdcEmapRoutePoint2.mx);
}
// 歩行者ルート
function ZdcEmapRouteSearchWalk(p1,p2) {
	ZdcEmapReadOn();
	//オブジェクト作成
	ZdcEmapRouteOptionsObj = new ZdcPRouteSearchOptions();
	ZdcEmapRouteSearchObj = new ZdcPRouteSearch();
	ZdcEmapRouteOptionsObj.showMarker = false;
	ZdcEmapRouteOptionsObj.pointFlg = 2;
	ZdcEmapRouteSearchObj.timeout = <?PHP echo $D_ROUTE_TIMEOUT; ?>;
	ZdcEvent.addListener(ZdcEmapRouteSearchObj, 'end', ZdcEmapRouteSearchEndWalk);
	ZdcEmapMapObj.addPRouteSearch(ZdcEmapRouteSearchObj);
	
	//デザイン指定
	//ZdcEmapRouteSearchObj.routeWidth = <?PHP echo $D_ROUTE_WALK_WIDTH; ?>;	// 2011/08/24 K.Masuda
	ZdcEmapRouteSearchObj.routeWidth = "<?PHP echo $D_ROUTE_WALK_WIDTH; ?>";
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
	ZdcEmapRouteOptionsObj.arrivalPoint.floorFlg = ZdcEmapRouteWalkArrFloorFlg;
	ZdcEmapRouteOptionsObj.arrivalPoint.stationFlg = ZdcEmapRouteWalkArrStationFlg;
	ZdcEmapRouteOptionsObj.arrivalPoint.floor = ZdcEmapRouteWalkArrFloor;
	//出発点(拠点)
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
			ZdcEmapRouteSearchCar(ZdcEmapRoutePoint1,ZdcEmapRoutePoint2);
		} else {
			// alert('<?PHP echo $D_MSG_ERR_JS_ROUTE; ?> [' + result.status + ']');	// mod 2015/03/09 H.Osamoto
			alert('<?PHP echo $D_MSG_ERR_JS_ROUTE; ?>');
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
// 自動車検索
function ZdcEmapRouteSearchCar(p1,p2) {
	ZdcEmapReadOn();
	//オブジェクト作成
	ZdcEmapRouteOptionsObj = new ZdcRouteSearchOptions();
	ZdcEmapRouteSearchObj = new ZdcRouteSearch();
	ZdcEmapRouteOptionsObj.showMarker = false;
	ZdcEmapRouteOptionsObj.pointFlg = 2;
	ZdcEmapRouteSearchObj.timeout = <?PHP echo $D_ROUTE_TIMEOUT; ?>;
	ZdcEvent.addListener(ZdcEmapRouteSearchObj, 'end', ZdcEmapRouteSearchEndCar);
	ZdcEmapMapObj.addRouteSearch(ZdcEmapRouteSearchObj);
	
	//デザイン指定
	//ZdcEmapRouteSearchObj.routeWidth = <?PHP echo $D_ROUTE_CAR_WIDTH; ?>;		// 2011/08/24 K.Masuda
	ZdcEmapRouteSearchObj.routeWidth = "<?PHP echo $D_ROUTE_CAR_WIDTH; ?>";
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
		// alert('<?PHP echo $D_MSG_ERR_JS_ROUTE; ?> [' + result.status + ']');	mod 2015/03/09 H.Osamoto
		alert('<?PHP echo $D_MSG_ERR_JS_ROUTE; ?>');
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
// ルート削除
function ZdcEmapRouteClear() {
	if(!ZdcEmapRouteSearchObj) return;
	if(ZdcEmapRouteOptionsObj.departurePoint.point) {
		ZdcEmapRouteSearchObj.clearRoute();
	} else {
		ZdcEmapMapObj.removeRouteSearch();
	}
	delete ZdcEmapRouteOptionsObj;
	delete ZdcEmapRouteSearchObj;
	//スタート／ゴールのレイヤーを削除
	if(ZdcEmapRouteFlagLayer) ZdcEmapRouteFlagLayer.clearMarker();
	ZdcEmapMapObj.removeUserLayer(ZdcEmapRouteFlagLayer);
	delete ZdcEmapRouteFlagIcon1;
	delete ZdcEmapRouteFlagIcon2;
}
//ルート開始／終了地点のアイコンを描画
function ZdcEmapRouteFlag() {
	//ユーザレイヤー作成
	ZdcEmapRouteFlagLayer = new ZdcUserLayer();
	ZdcEmapRouteFlagLayer.setLayerScale(1, 15);
	//ZdcEmapRouteFlagLayer.setLayerType('manual');
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

// 駅・施設アイコン消去
function ZdcEmapPoiMrkClear() {
	var i;
	for( i = 0;i < ZdcEmapMapPoiMrkCnt;i ++) {
		ZdcEmapMapUserLyr.removeMarkerById(ZdcEmapMapPoiMrkId[i]);//マーカー削除
		ZdcEmapMapPoiMrkId[i] = null;
	}
	ZdcEmapMapPoiMrkCnt = 0;
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
D_ZOOM["8"]=67; D_ZOOM2PXMS_LAT["67"]=1150.326797; D_ZOOM2PXMS_LON["67"]=1411.764706;
D_ZOOM["9"]=62; D_ZOOM2PXMS_LAT["62"]=539.2156863; D_ZOOM2PXMS_LON["62"]=661.7647059;
D_ZOOM["10"]=56; D_ZOOM2PXMS_LAT["56"]=206.6993464; D_ZOOM2PXMS_LON["56"]=253.6764706;
D_ZOOM["11"]=55; D_ZOOM2PXMS_LAT["55"]=152.7777778; D_ZOOM2PXMS_LON["55"]=187.5000000;
D_ZOOM["12"]=52; D_ZOOM2PXMS_LAT["52"]=98.85620915; D_ZOOM2PXMS_LON["52"]=121.3235294;
D_ZOOM["13"]=50; D_ZOOM2PXMS_LAT["50"]=74.14215686; D_ZOOM2PXMS_LON["50"]=90.99264706;
D_ZOOM["14"]=44; D_ZOOM2PXMS_LAT["44"]=33.70098039; D_ZOOM2PXMS_LON["44"]=41.36029412;
D_ZOOM["15"]=39; D_ZOOM2PXMS_LAT["39"]=15.72712418; D_ZOOM2PXMS_LON["39"]=19.30147059;
var IconGrp = new Array();
function ZdcEmapIconOverlap(icnt,lvl){
	IconGrp = new Array();
	var icdt,ic,tmpic,p1,p2,c1,c2,c3,c4,obj;
	var nlatmin = new Array();
	var nlatmax = new Array();
	var nlonmin = new Array();
	var nlonmax = new Array();
	var ZGobj = new ZdcGeometric();

	for(ic=icnt-1; ic>=0; ic--){
		icdt = ZdcEmapIconDt[ic].split(":");
		// icdt[0] lat:緯度
		// icdt[1] lon:経度
		// icdt[2] w:アイコン幅
		// icdt[3] h:アイコン高
		nlatmin[ic] = Math.round(parseInt(icdt[0]) + (D_ZOOM2PXMS_LAT[D_ZOOM[lvl]] * (parseInt(icdt[2]) / 2)));	// 右上緯度
		nlonmin[ic] = Math.round(parseInt(icdt[1]) + (D_ZOOM2PXMS_LON[D_ZOOM[lvl]] * (parseInt(icdt[3]) / 2)));	// 右上経度
		nlatmax[ic] = Math.round(parseInt(icdt[0]) - (D_ZOOM2PXMS_LAT[D_ZOOM[lvl]] * (parseInt(icdt[2]) / 2)));	// 左下緯度
		nlonmax[ic] = Math.round(parseInt(icdt[1]) - (D_ZOOM2PXMS_LON[D_ZOOM[lvl]] * (parseInt(icdt[3]) / 2)));	// 左下経度
	}
	for(ic=icnt-1; ic>=0; ic--){
		// id->kid変換
		obj = ZdcEmapMapUserLyr.getMarkerById(ZdcEmapMapShopMrkId[ic]);
		IconGrp[ic] = obj.data1;
		// 重なり判定
		for(tmpic=icnt-1; tmpic>=0; tmpic--){
			if( tmpic == ic){ continue; }	// 自分自身は除外
			// id->kid変換
			obj = ZdcEmapMapUserLyr.getMarkerById(ZdcEmapMapShopMrkId[tmpic]);
			// 矩形緯度経度
			p1 = new ZdcPoint(nlonmin[ic],nlatmin[ic],<?PHP echo $D_PFLG; ?>);
			p2 = new ZdcPoint(nlonmax[ic],nlatmax[ic],<?PHP echo $D_PFLG; ?>);
			// 線分緯度経度
			c1 = new ZdcPoint(nlonmin[tmpic],nlatmin[tmpic],<?PHP echo $D_PFLG; ?>);	// 右上緯度経度
			c2 = new ZdcPoint(nlonmax[tmpic],nlatmin[tmpic],<?PHP echo $D_PFLG; ?>);	// 左上緯度経度
			c3 = new ZdcPoint(nlonmax[tmpic],nlatmax[tmpic],<?PHP echo $D_PFLG; ?>);	// 左下緯度経度
			c4 = new ZdcPoint(nlonmin[tmpic],nlatmax[tmpic],<?PHP echo $D_PFLG; ?>);	// 右下緯度経度
			// 矩形に線分が交差するか？
			if( ZGobj.isLineCrossRect(c1,c2,p1,p2) ){ IconGrp[ic] += "," + obj.data1; continue; }
			if( ZGobj.isLineCrossRect(c2,c3,p1,p2) ){ IconGrp[ic] += "," + obj.data1; continue; }
			if( ZGobj.isLineCrossRect(c3,c4,p1,p2) ){ IconGrp[ic] += "," + obj.data1; continue; }
			if( ZGobj.isLineCrossRect(c4,c1,p1,p2) ){ IconGrp[ic] += "," + obj.data1; continue; }
		}
	}
}
<?php // add 2014/08/18 AnPham ]?>

<?php // 中心位置から等距離の2点（左下・右上）緯度経度配列を返却		add 2016/02/25 H.Osamoto ?>
function ZdcEmapGetPointsByRad(latlon, rad) {
	var lat_dist = Math.round((300000 / (9 * 1000)) * rad);
	var lon_dist = Math.round((450000 / (11 * 1000)) * rad);
	var lat_ms = latlon.my;
	var lon_ms = latlon.mx;

	var p1 = new ZdcPoint(lon_ms - lon_dist,lat_ms - lat_dist,<?PHP echo $D_PFLG; ?>);
	var p2 = new ZdcPoint(lon_ms + lon_dist,lat_ms + lat_dist,<?PHP echo $D_PFLG; ?>);

	return new Array(p1, p2);
}

<?php
// 711map(ユニクロ)専用最寄り検索		add 2016/02/25 H.Osamoto ?>
function ZdcEmap711omniSearchShop(init_rad) {
	var p = ZdcEmapMapObj.getMapLocation();
	latlon = new ZdcPoint(p.mx, p.my, 2);
	<?php
	// 初期検索範囲（m）の緯度経度差分（ミリ秒）を算出 ?>
	var latlons = ZdcEmapGetPointsByRad(latlon, init_rad)
	
	var bx = new ZdcBox(latlons[0], latlons[1]);
	var lv = ZdcEmapMapObj.getMapBoxScale( bx, p );
	if(lv < 18) lv = lv + 1;//１つズームイン
	ZdcEmapMapObj.setMapScale(lv);
	
	var box = ZdcEmapMapObj.getMapBoundBox();

	// 初期検索範囲にSEJ店舗が1つ以上存在するかどうか
	var opts = new ZdcNearShopOptions();
	opts.cid = "<?php echo $D_DATA_CID; ?>";
	opts.lat = p.my;
	opts.lon = p.mx;
	opts.latlon = box.miny+","+box.minx+","+box.maxy+","+box.maxx;
	opts.radius  = 0;
	opts.jkn = "<?php echo $D_711OMNI_INIT_JKN; ?>";
	opts.pos = 1;
	opts.maxCount = 1;
	opts.limitCount = 1;
	opts.timeout = <?php echo $D_AJAX_TIMEOUT; ?>;
	ZdcEmapNearShop.opts = opts;
	ZdcEmapNearShop.search(opts, ZdcEmap711omniSearchShopResult);
}
function ZdcEmap711omniSearchShopResult(result) {
	// エラー処理
	if(result.status != 0 && result.status != 3 && result.status != 5 && result.status != 9) {
		alert("<?PHP echo $D_MSG_ERR_JS_RESULT; ?> listres["+result.status+"]");
		ZdcEmapSearchEventStart();
		ZdcEmapReadOff();
		return;
	}
	// 件数確認
	var cnt = result.items.length;
	if (cnt) {
		// SEJ店舗ありなら地図範囲で最寄り検索
		ZdcEmapSearchFirst = 0;//地図範囲を検索
		ZdcEmapSearchShop(ZdcEmapSearchCond);
		ZdcEmapSearchEventAdd('ZdcEmapSearchShop("' + ZdcEmapSearchCond + '")');
	} else {
		// 店舗なしなら既定半径の入りきる縮尺で最寄り検索
		var p = ZdcEmapMapObj.getMapLocation();
		latlon = new ZdcPoint(p.mx, p.my, 2);
		
		var latlons = ZdcEmapGetPointsByRad(latlon, <?php echo $D_711OMNI_ALT_RAD; ?>);
		
		var bx = new ZdcBox(latlons[0], latlons[1]);
		var lv = ZdcEmapMapObj.getMapBoxScale( bx, p );
		ZdcEmapMapObj.setMapScale(lv);
		
		ZdcEmapSearchFirst = 0;//地図範囲を検索
		ZdcEmapSearchShop(ZdcEmapSearchCond);
		ZdcEmapSearchEventAdd('ZdcEmapSearchShop("' + ZdcEmapSearchCond + '")');
	}
}
