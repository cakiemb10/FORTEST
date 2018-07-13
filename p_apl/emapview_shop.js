<?PHP
// ------------------------------------------------------------
// 地図制御javasctipt 主に拠点検索に関係するもの
// 
// 開発履歴
// 2011/10/15 Y.Matsukawa	新規作成
// 2011/12/05 Y.Matsukawa	別CID参照
// 2011/12/19 Y.Matsukawa	地図表示時、最寄り検索が２回実行される
// 2011/12/27 H.osamoto		セブンミール業務支援用処理追加
// 2012/01/10 Y.Matsukawa	最寄り０件の時に地図が表示されない
// 2012/01/10 Y.Matsukawa	詳細店舗を最寄り一覧に出さないのを固定仕様とする
// 2012/01/11 N.Wada		検索範囲（内部・外部）による表示の振り分け
// 2012/01/18 H.Osamoto		直線距離が指定数値($D_DIST_ABS)を超える場合リスト表示しない
// 2012/01/31 Y.Matsukawa	condを詳細へ引き継ぎ
// 2012/02/08 Y.Matsukawa	絞り込み条件改良（cond.tplのvalue指定不要に）
// 2012/03/16 Y.Matsukawa	【不具合修正】ルート探索スクリプトエラー
// 2012/05/22 H.Osamoto		【不具合修正】最寄駅・施設検索時にエラーとなる場合がある
// 2012/08/27 Y.Matsukawa	Light対応（不具合修正）
// 2012/09/07 Y.Matsukawa	「&」を含む値を任意パラメータに指定した場合、nlist.htmに不正な値が渡される
// 2012/09/19 H.Osamoto		地図上の拠点アイコンを数字アイコンに変更できるようにする
// 2012/10/01 Y.Matsukawa	Maplink対応
// 2012/10/15 K.Masuda		絞り込みcondのselectで、selectindexではなくvalue値で渡せるようにする
// 2012/11/06 H.Osamoto		SEJキャンペーン対応
// 2012/11/13 Y.Matsukawa	JCN満空情報取得
// 2013/01/24 K.Masuda		拠点アイコンマウスオーバーで店舗吹き出し表示
// 2013/02/01 K.Masuda		cond条件を括れるように改修
// 2013/03/12 H.Osamoto		地図付き拠点リスト印刷画面にて数字アイコン利用
// 2013/04/19 H.Osamoto		数字アイコンを企業毎に設定できるよう変更
// 2013/05/14 H.Osamoto		初期表示縮尺を設定できるよう変更
// 2013/05/22 H.Osamoto		最寄検索結果が0件の場合再検索で取得する件数指定機能追加
// 2013/06/03 Y.Matsukawa	出発地指定ルート固定表示
// 2013/06/11 Y.Matsukawa	郵便番号無効化
// 2013/08/02 Y.Matsukawa	任意地点から任意範囲外の拠点を除外
// 2013/08/22 Y.Matsukawa	地図なし店舗詳細対応
// 2014/02/05 Y.Matsukawa	クロスサイトスクリプティング対策
// 2014/02/21 H.Osamoto		ポリゴン内外判定追加
// 2014/04/28 H.Osamoto		SMS業務支援にて使用していたD_DIST_ABSをD_ABS_DISTに変更
// 2014/08/25 Q.Dai 		SiteIconOverlapping
// 2014/08/29 Q.Dai 		BrowsingHistoryDisplay
// 2014/10/06 Y.Matsukawa	連番アイコン
// 2014/10/08 Y.Matsukawa	最寄り駅からの任意距離の円表示
// 2014/11/28 Y.Matsukawa	検索位置にマーカー表示
// 2014/11/28 Y.Matsukawa	店舗アイコンクリックで一覧の該当店舗を頭出し
// 2014/12/08 Y.Matsukawa	詳細地図にも検索位置マーカー表示（中心に表示）
// 2014/12/09 Y.Matsukawa	拠点閲覧履歴の自動保存をフラグで制御
// 2015/01/16 Y.Matsukawa	別ドメインでのアクセスに対応
// 2015/01/28 Y.Matsukawa	最寄駅、最寄施設などをパンくずに追加
// 2015/02/16 F.Yokoi		input type=textの値を絞り込み条件に設定する処理の追加
// 2015/03/16 Y.Matsukawa	絞り込み：任意カラムの部分一致
// 2015/03/18 N.Wada		拠点アイコンに連番アイコンを重ねて表示させる
// 2015/03/18 N.Wada		拠点アイコン重なりチェックの緯度経度完全一致に対応
// 2015/03/25 Y.Matsukawa	【不具合】重なりアイコン利用時、IE7,8でフキダシが出なくなる
// 2015/03/26 H.Osamoto		最寄リスト印刷時に詳細表示拠点を除外する処理追加
// 2015/03/30 N.Wada		最寄画面印刷時に最初の検索の印刷かどうかで検索範囲を切り替える
// 							最寄画面と最寄印刷画面の検索地図範囲を同じにする
// 							最寄画面と最寄印刷画面の検索結果件数を同じにする
// 2015/03/30 H.Osamoto		フリーワードの数値比較機能追加
//							複合フリーワード対応追加
// 2015/04/08 F.Yokoi		ルート検索の歩行者/自動車切り替えフラグ追加
// 							「閉じる」に最上位シェイプレイヤー（移動距離・移動時間表示）削除追加
// 2015/04/23 H.Osamoto		検索中に絞り込み条件無効化とマウスカーソル変更処理追加
// 2015/04/27 H.Osamoto		拠点閲覧履歴に重複チェックを追加
// 2015/05/01 Y.Matsukawa	セブン&アイOMNI専用最寄り検索
// 2015/05/13 N.Wada		日本設備工業用 社員番号の若い順に連番をつける
// 2015/05/14 Y.Matsukawa	condをnmap/shop_dtlに直接記述（cond.htm未使用）モード
// 2015/05/19 Y.Matsukawa	【不具合修正】msg.htmとnlist.htmにhiddenのcondが渡らない
// 2015/05/26 N.Wada		緯度経度完全一致の重複アイコンの吹き出し内の拠点順を一覧表示と合わせる
// 2015/07/10 Y.Uesugi		噴出し非表示（シンプルプランの場合、アイコンにカーソル当てても噴出し表示しない）
// 2015/09/17 F.Yokoi		拠点アイコンにマウスアウト時に噴出しを削除する設定を追加
// 2015/09/30 Y.Uesugi		店舗検索最小検索追加
// 2015/11/27 H.Yasunaga	ヤンセンファーマ向けカスタマイズ
// 2015/12/04 F.Yokoi		店舗一覧地図表示時に任意のズームを設定する
// 							店舗詳細の一覧で自分自身を表示する
// 2016/01/18 Y.Uesugi		店舗一覧地図表示時に中心住所を表示する
// 2016/01/22 H.Yasunaga	711mapニッセン向けカスタマイズ
// 2016/01/28 H.Yasunaga	711mapニッセン向けカスタマイズ 縮尺表示不具合修正
// 2016/02/24 Y.Matsukawa	距離順連番で同一位置をまとめる
// 2016/03/14 Y.Matsukawa	吹き出し（複数リスト）に連番表示
// 2016/04/21 H.Osamoto		縮尺によるアイコン表示制御を削除
// 2016/06/30 N.Wada		日本設備工業用 拠点アイコンIDの変更に対応
// 2016/07/11 H.Yasunaga	711OMNI2(店舗タブ)用カスタマイズ
// 2016/08/22 H.Yasunaga	711OMNI2(店舗タブ)用カスタマイズ 吹き出し閉じるイベント追加
// 2016/09/16 T.Yoshino		再検索時に吹き出しを削除
// 2016/10/31 H.Osamoto		店舗一覧地図表示時にの不具合対応
// 2016/12/12 H.Yasunaga	ヤマトロッカー対応 吹き出し用にmsg.htmへのリクエストにパラメータを付与する
// 2017/03/27 H.Yasunaga	日本郵便カスタマイズ
// 2017/04/19 H.Yasunaga	日本郵便カスタマイズ
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
// cond定義
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
// condグルーピング定義
// ZdcEmapCondGroup[cond番号] = グループ番号(1〜n);
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
// 連番アイコン定義
// （例）
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
//拠点検索関係
//-------------------------------------------------------------
var ZdcEmapNearShop = new ZdcNearShop();
var ZdcEmapSearchPoint = null;//検索した位置を保持
var ZdcEmapSearchScale = null;//検索した縮尺を保持
var ZdcEmapSearchFirst = null;//位置決定後の最初の検索か否か
var ZdcEmapSearchFirstCstm = null;	<?php //最初の検索か否かカスタマイズ用フラグ	// add 2013/05/22 H.osamoto ?>
var ZdcEmapSearchFirstPrint = null;	<?php //最初の検索の印刷か否か	// add 2015/03/30 N.Wada ?>
var ZdcEmapIconDt = new Array();<?php // add 2014/08/19 Q.Dai?>
var ZdcEmapSearchCenter = null;	<?php // add 2014/12/08 Y.Matsukawa ?>

//検索決定
function ZdcEmapSearchSet(lat,lon,notmove) {
	//ZdcEmapShopDetailClose();
	//マップ移動
	ZdcEmapSearchEventStop();
	<?php //var center = new ZDC.LatLon(Number(lat), Number(lon));		mod 2014/12/08 Y.Matsukawa ?>
	ZdcEmapSearchCenter = new ZDC.LatLon(Number(lat), Number(lon));
	var latlon = ZdcEmapMapObj.getLatLon();
	<?php //if (!notmove) ZdcEmapMapObj.moveLatLon(center);		mod 2014/12/08 Y.Matsukawa ?>
	if (!notmove) ZdcEmapMapObj.moveLatLon(ZdcEmapSearchCenter);
	//if(<?PHP echo $D_INIT_LVL_SEARCH; ?> > 0) ZdcEmapMapObj.setZoom(<?PHP echo $D_INIT_LVL_SEARCH; ?>);
	if(<?PHP echo $D_INIT_LVL_CSTM; ?> > 0) ZdcEmapMapObj.setZoom(<?PHP echo $D_INIT_LVL_CSTM; ?>);		<?php // add 2013/05/14 H.Osamoto ?>
	<?php
	// 検索位置にマーカー表示		add 2014/11/28 Y.Matsukawa
	if ($D_SEARCH_MAP_ICON) {
	?>
	ZdcEmapSearchMapIcon(ZdcEmapSearchCenter);
	<?php
	}
	?>
	<?php
	// add 2015/05/01 Y.Matsukawa [
	// セブン&アイOMNI専用最寄り検索
	if ($D_711OMNI_INIT_RAD) {	// 初期範囲(800m)にSEJが1件以上あればその範囲で検索、なければ既定(5km)の地図範囲で検索
	?>
		ZdcEmapMapObj.setHome(ZdcEmapSearchCenter);
		ZdcEmap711omniSearchShopStart(<?php echo $D_711OMNI_INIT_RAD; ?>);
		return;
	<?php
	} else if ($D_711OMNI_ALT_RAD) {	// 初期検索なしの場合は、最初から既定(5km)の地図範囲で検索
	?>
		ZdcEmapMapObj.setHome(ZdcEmapSearchCenter);
		var latlons = ZdcEmapGetPointsByRad(ZdcEmapSearchCenter, <?php echo $D_711OMNI_ALT_RAD; ?>)
		var zi = ZdcEmapMapObj.getAdjustZoom(latlons, {fix:true});
		ZdcEmapMapObj.setZoom(zi.zoom);
		ZdcEmapSearchFirst = 0;		<?php //地図範囲を検索 ?>
		ZdcEmapSearchShopStart();
		return;
	<?php
	}
	// add 2015/05/01 Y.Matsukawa ] ?>
	//拠点検索
	ZdcEmapSearchFirst = 1;
	ZdcEmapSearchPoint = null;//必ず再検索させるため
	ZdcEmapSearchShopStart();
	<?php //ZdcEmapMapObj.setHome(center);		mod 2014/12/08 Y.Matsukawa ?>
	ZdcEmapMapObj.setHome(ZdcEmapSearchCenter);
}
//検索開始
function ZdcEmapSearchShopClick() {
	if(ZdcEmapButtonNG()) return;
	ZdcEmapSearchPoint = null;//必ず再検索させるため
	ZdcEmapSearchShop();
}
function ZdcEmapSearchShopStart() {
	if(ZdcEmapMapObj.ZdcEmapMode != "print") ZdcEmapSearchClickFlg = 1;
	<?php
	// add 2015/05/01 Y.Matsukawa [
	// セブン&アイOMNI専用最寄り検索の場合、縮尺調整しない
	if ($D_711OMNI_ALT_RAD) {
	?>
		ZdcEmapSearchClickFlg = 0;
	<?php
	}
	// add 2015/05/01 Y.Matsukawa ] ?>
	ZdcEmapSearchPoint = null;//必ず再検索させるため
	// del 2011/12/19 Y.Matsukawa [
	//	ZdcEmapSearchEventAdd("ZdcEmapSearchShop()");
	//	ZdcEmapSearchEventStart();
	// del 2011/12/19 Y.Matsukawa ]
	ZdcEmapSearchEventStop();		// add 2011/12/19 Y.Matsukawa
	//拠点以外のアイコンをクリア
	for( i = 0;i < ZdcEmapMapPoiMrkCnt;i ++) {
		if (ZdcEmapMapPoiMrkId[i]) {		<?php // add 2012/03/16 Y.Matsukawa ?>
			ZdcEmapMapObj.removeWidget(ZdcEmapMapPoiMrkId[i]);
			ZdcEmapMapPoiMrkId[i] = null;
		}
	}
	ZdcEmapMapPoiMrkCnt = 0;
	//画面を切り替える
	<?php //if(ZdcEmapCondObj.mode != "cond") {		mod 2015/05/14 Y.Matsukawa ?>
	if(ZdcEmapCondObj.mode != "cond" && <?php echo ($D_COND_STATIC ? "false":"true"); ?>) {
		ZdcEmapSearchShopClose();//拠点以外のリストを消す
		//var url = "<?PHP echo $D_DIR_BASE_L; ?>cond.htm?cid=<?PHP echo $cid; ?>";
		var url = "<?PHP echo $D_DIR_BASE_L; ?>cond.htm?";
		//for(i = 1;i <= 200;i ++) if(ZdcEmapSaveCond[i]) url = url + "&cond"+i+"="+ZdcEmapSaveCond[i];//絞込条件
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
			ZdcEmapSearchShop();//条件部が表示されてから検索開始
		});
		ZdcEmapCondObj.mode = "cond";
		ZdcEmapCondObj.style.visibility = "visible";
	} else {
		ZdcEmapSearchShop();
	}
}
//検索メイン処理
function ZdcEmapSearchShop() {
	ZdcEmapStationCircle();		// 周辺駅からの円描画		add 2014/10/08 Y.Matsukawa
	ZdcEmapReadOn();
	//位置・範囲取得
	var ZdcEmapSearchMapCenterAddr = ZdcEmapMapObj.getLatLon();
	var p = ZdcEmapMapObj.getLatLon();
	var box = ZdcEmapMapObj.getLatLonBox();
	var boxmin = box.getMin();
	var boxmax = box.getMax();
	if(ZdcEmapSearchPoint != null && <?PHP echo $D_SHOP_SEARCHPIX; ?> == -1) {
		//自動再検索しない
		ZdcEmapReadOff();
		return;
	}
	//自動検索イベント停止
	ZdcEmapSearchEventStop();
	//絞り込み条件取得
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
			// 最寄画面から渡された地図範囲を使う
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
		// 711mapニッセンカスタマイズ
		// 1/15000で検索させるためにradiusの設定をなくし地図の範囲を指定する
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
		// 詳細表示中の拠点ID
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
	// 任意地点から任意範囲外の拠点を除外
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
	// 検索中心位置の住所表示
	<?php
	if (isset($D_DISP_CENTER_ADDR) && $D_DISP_CENTER_ADDR != '') {
	?>
	ZdcEmapSetMapCenterAddr(callbackCenterAddr);
	<?php
	}
	?>
	// add 2016/01/18 Y.Uesugi ]

	ZdcEmapNearShop.opts = opts;
	
	//リストを表示する
	ZdcEmapSearchShopList(0);
	//アイコンを表示する
	ZdcEmapNearShop.search(opts,ZdcEmapSearchShopResult);
}

//絞り込み条件組み立て
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
						<?php // 完全一致 ?>
						if(obj.className == 'cond') {
							ZdcEmapCondParms += "&cond"+condno+"="+obj.value;
							col[colcnt] = ZdcEmapCondVal[condno]+obj.value;
							all[allcnt] = col[colcnt]; allcondno[allcnt] = condno; allcnt++;
							colcnt ++;
						<?php // 部分一致（任意カラム）		add 2015/03/16 Y.Matsukawa ?>
						} else if (ZdcEmapCondVal[condno] && ZdcEmapCondVal[condno].indexOf(":FW:") > 0) {
							ZdcEmapCondParms += "&cond"+condno+"="+encodeURIComponent(obj.value);
							col[colcnt] = ZdcEmapCondVal[condno]+"'"+obj.value+"'";
							all[allcnt] = col[colcnt]; allcondno[allcnt] = condno; allcnt++;
							colcnt ++;
						<?php // 数値比較（任意カラム）		add 2015/03/30 H.Osamoto ?>
						} else if (ZdcEmapCondVal[condno] && ZdcEmapCondVal[condno].indexOf(":NUMB:") > 0) {
							ZdcEmapCondParms += "&cond"+condno+"="+encodeURIComponent(obj.value);
							col[colcnt] = ZdcEmapCondVal[condno]+"'"+obj.value+"'";
							all[allcnt] = col[colcnt]; allcondno[allcnt] = condno; allcnt++;
							colcnt ++;
						<?php // 部分一致（フリーワード） ?>
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

		// グルーピング設定されている場合
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
		//		// グルーピング設定なし（既存動作）
		//		} else {
		//			// checkbox
		//			for(var i = 0;i < chkcnt;i ++) {
		//				if(cond) cond += " <?PHP echo $D_SHOP_COND; ?> ";
		//				cond += chk[i];
		//			}
		//			if(cond) cond = "("+cond+")";
		//			// select-one,radio,その他
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
// 連番付き拠点アイコンID変換表
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
// 最寄拠点検索結果の処理
//
//----------------------------------------------------------------------------------
function ZdcEmapSearchShopResult(result) {
	var i,item,mrk,tmp,icnt,maxlat=0,maxlon=0,minlat=999999999,minlon=999999999;
	function setLatLon(lat, lon){
		this.lat  = lat;
		this.lon = lon;
	}
	latlons = new Array();
	//マーカー削除
	if(ZdcEmapMapShopMrkCnt != null) {
		for( i = 0;i < ZdcEmapMapShopMrkCnt;i ++) {
			if (ZdcEmapMapShopMrkId[i]) {		<?php // add 2012/03/16 Y.Matsukawa ?>
				ZdcEmapMapObj.removeWidget(ZdcEmapMapShopMrkId[i]);
				ZdcEmapMapShopMrkId[i] = null;
			}
		}
	}
	ZdcEmapMapShopMrkCnt = 0;
	//エラー処理
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
	// add 2015/03/18 N.Wada ]
	?>
	<?php
	// add 2016/02/24 Y.Matsukawa [
	// 連番アイコン：同一地点をまとめる
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
	// add 2012/01/11 N.Wada ]
	?>
	<?php
	// add 2015/05/13 N.Wada [
	// 日本設備工業用 社員番号の若い順に連番をつける
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
	//地図に置く
	icnt = result.items.length;
	for (i=icnt-1; i>=0; i--) {
	<?php
	// add 2012/01/11 N.Wada [
	if ( isset($D_SHOP_RAD_SCREENING) && $D_SHOP_RAD_SCREENING ) {
		// 表示させる店舗数を超えた場合は、表示しないよう処理を飛ばす
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
		//		// 表示させる店舗数を超えた場合は、表示しないよう処理を飛ばす
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
		// 連番アイコン情報取得
		if ($D_LAYER_SEQ_ICON) { 
		?>
		<?php	// add 2016/02/24 Y.Matsukawa [
				// 同一地点店舗の連番をまとめる
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
		//最大最小緯度経度取得
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
		// 日本設備工業用 社員番号の若い順に連番をつける
		if ( isset($D_NSNET01_EMPNO_SEQ_ICON) && $D_NSNET01_EMPNO_SEQ_ICON ) {
		?>
		<?php //icn_img = ZdcEmapIconImg[item.icon+('0'+empnoSeq[i]).slice(-2)];	// 連番付き拠点アイコンIDを変換 mod 2016/06/30 N.Wada ?>
		icn_img = ZdcEmapIconImg[Nsnet01EmpnoSeqIconIdConv[item.icon]+('0'+empnoSeq[i]).slice(-2)];
		Nsnet01EmpnoSeq[item.id] = empnoSeq[i];		<?php // add 2016/03/14 Y.Matsukawa ?>
		<?php 
		}
		// add 2015/05/13 N.Wada ]
		?>
		<?php 
		// add 2015/03/18 N.Wada [
		// 重複アイコンがあれば差し替える
		if ($D_KYO_ICON_OVERLAP == 2 && $D_KYO_ICON_OVERLAP_ICON_ID) {
		?>
		if (IconGrp[i].indexOf(",") >= 0) {
			icn_img = ZdcEmapIconImg[<?php echo $D_KYO_ICON_OVERLAP_ICON_ID; ?>];
		}
		<?php 
		}
		// add 2015/03/18 N.Wada ]
		?>
		// 無効なアイコンIDの場合は透明アイコンに差し替え		add 2012/11/13 Y.Matsukawa
		if (icn_img == null) icn_img = ZdcEmapIconImg["@TP"];
		<?php // add 2014/10/06 Y.Matsukawa [ ?>
		<?php // 連番アイコン（アイコン画像を使わない） ?>
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
								// 連番アイコンを付加する場合
								?>
								ZdcEmapIconW[item.icon], ZdcEmapIconH[item.icon],tmp_w,tmp_h,
								ZdcEmapIconOffsetX[item.icon], ZdcEmapIconOffsetY[item.icon],tmp_ox,tmp_oy,
								<?php 
								} else {
								// 2015/03/18 N.Wada add ]
								// 連番アイコンを付加しない場合
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
									// クリック
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
									// マウスオーバー
									if(!$D_KYO_ICON_MO) echo "null";
									if($D_KYO_ICON_MO) echo "function() { ZdcEmapShopMsg(this.id); }";
								?>
								// mod 2013/01/24 K.Masuda ]
								,item.lvl
								,seq_icon		<?php // add 2014/10/06 Y.Matsukawa ?>
								// add 2015/09/17 F.Yokoi [
								,
								<?PHP
									// マウスアウト
									if(!$D_KYO_ICON_MOUT) echo "null";
									if($D_KYO_ICON_MOUT) echo "function() { ZdcEmapShopMsgClose(this.id); }";
								?>
								// add 2015/09/17 F.Yokoi ]
							);
		<?php // add 2016/12/12 H.Yasunaga ヤマトロッカー対応 [ ?>
		<?php
			if (isset($D_YTC_LOCKER) && $D_YTC_LOCKER) {
		?>
			mrk.ukrtoridate = item.nohindate;
		<?php	
			}
		?>
		<?php // add 2016/12/12 H.Yasunaga ] ?>
		if (ZdcEmapMapShopMrkId[i] != null) ZdcEmapMapObj.removeWidget(ZdcEmapMapShopMrkId[i]);//念のため
		ZdcEmapMapObj.addWidget(mrk);
		if (mrk.userwidget) mrk.open();		<?php // add 2014/10/06 Y.Matsukawa ?>
		ZdcEmapMapShopMrkId[i] = mrk;
		ZdcEmapMapShopMrkCnt ++;
		ZdcEmapIconDt[i] = item.lat + ":" + item.lon + ":" + ZdcEmapIconW[item.icon] + ":" + ZdcEmapIconH[item.icon];<?php // add 2014/08/19 Q.Dai?>
	}
	if(ZdcEmapSearchClickFlg) {
		ZdcEmapSearchClickFlg = 0;
		//初期検索時は画面移動
		if (ZdcEmapMapShopMrkCnt > 0) {
			//拠点が収まる範囲に移動
			if (!ZdcEmapMapShopDetailMrkId) {
				var center_latlon = ZdcEmapMapObj.getLatLon();
				var latdist;
				var londist;
				var varminlat;
				var varminlon;
				var varmaxlat;
				var varmaxlon;
				var varlatlon_box = new Array();
				// 最も離れたlatの差分
				//var minlatdist = Math.abs(minlat - center_latlon.lat);
				//var maxlatdist = Math.abs(maxlat - center_latlon.lat);
				var minlatdist = Math.abs(Math.floor(minlat*10000000) - Math.floor(center_latlon.lat*10000000))/10000000;
				var maxlatdist = Math.abs(Math.floor(maxlat*10000000) - Math.floor(center_latlon.lat*10000000))/10000000;
				if (minlatdist > maxlatdist) {
					latdist = minlatdist;
				} else {
					latdist = maxlatdist;
				}
				// 最も離れたlonの差分
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
				// 地図表示縮尺取得用仮想拠点
				varlatlon_box[0] = new ZDC.LatLon(varminlat, varminlon);
				varlatlon_box[1] = new ZDC.LatLon(varmaxlat, varmaxlon);
				var adjust = ZdcEmapMapObj.getAdjustZoom(varlatlon_box);
				//if (adjust) ZdcEmapMapObj.setZoom(adjust.zoom);		del 2011/12/19 Y.Matsukawa
				<?php
				// mod 2016/01/22 H.Yasunaga[
				// 711mapニッセンカスタマイズ
				// 地図初期表示の縮尺を1/15000に固定
				if ($D_711NISSEN_FIX_ZOOM) {
				?>
					if (adjust) {
						// mod 2016/01/27 H.Yasunaga [	
						//if (adjust.zoom < <?php echo $D_INIT_LVL; ?> ) {
						if (result.researched == "1") {
						// mod 2016/01/27 H.Yasunaga ]
							// 再検索後は縮尺変更を行う
							ZdcEmapMapObj.setZoom(adjust.zoom);
						}
						// 最寄り店舗検索
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
			//検索半径の縮尺に移動  ※位置によってgetPoint2PointDistanceの値が変わるため毎回計算している
			// mod 2011/07/07 H.Osamoto [
			//	var p = new ZdcPoint();
			//	p = ZdcEmapMapObj.getMapLocation();
			//	//var px = new ZdcPoint();
			//	//var py = new ZdcPoint();
			//	//px = new ZdcPoint(p.mx+1000,p.my,<?PHP echo $D_PFLG; ?>);//+1000なのは値が小さいとNaNになるため
			//	//py = new ZdcPoint(p.mx,p.my+1000,<?PHP echo $D_PFLG; ?>);
			//	//var mx = ZdcEmapGeometricObj.getPoint2PointDistance(p,px);//経度1000ミリ秒ごとの距離
			//	//var my = ZdcEmapGeometricObj.getPoint2PointDistance(p,py);//緯度1000ミリ秒ごとの距離
			//	//mx = 1000 / mx;//1mごとの経度
			//	//my = 1000 / my;//1mごとの緯度
			//	//var rx = parseInt(mx * <?PHP echo $D_SHOP_RAD; ?>);//経度の範囲
			//	//var ry = parseInt(my * <?PHP echo $D_SHOP_RAD; ?>);//経度の範囲
			//	var rx = parseInt((450000 / (11 * 1000)) * <?PHP echo $D_SHOP_RAD; ?>);//CGIと計算をあわせる
			//	var ry = parseInt((300000 / (9 * 1000)) * <?PHP echo $D_SHOP_RAD; ?>);//〃
			//	var p1 = new ZdcPoint(p.mx - rx,p.my - ry,<?PHP echo $D_PFLG; ?>);
			//	var p2 = new ZdcPoint(p.mx + rx,p.my + ry,<?PHP echo $D_PFLG; ?>);
			//	var bx = new ZdcBox(p1,p2);
			//	var lv = ZdcEmapMapObj.getMapBoxScale( bx, p );
			//	if(lv < 18) lv = lv + 1;//１つズームイン
			//	ZdcEmapMapObj.setMapScale(lv);
			// mod 2011/07/07 H.Osamoto ]
		}
	}
	// add 2011/12/27 H.osamoto [
	//検索位置アイコンを表示する
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
	
	//指定店舗アイコンを表示する
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
			
			//フォーカスカーソルを表示する
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
								// クリック
								if($D_KYO_ICON_CLK == 1) echo "function() { ZdcEmapShopMsg(this.id); }"; 
								else if($D_KYO_ICON_CLK == 2) echo "function() { window.location.href='".$D_DIR_BASE_G."dtl/'+this.id+'/?".($P_FREEPARAMS_ENC?'&'.$P_FREEPARAMS_ENC:'').($condprm?'&'.$condprm:'').($his?'&his='.urlencode($his):'')."'; }";		// add 2012/07/06 Y.Matsukawa
								else echo "null"; 
							?>
							, null, null
							);
			if (ZdcEmapMapShopMrkId[ZdcEmapMapShopMrkId.length] != null) ZdcEmapMapObj.removeWidget(ZdcEmapMapShopMrkId[ZdcEmapMapShopMrkId.length]);//念のため
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
	// add start 2016/07/11 H.Yasunaga 711OMNI2用カスタマイズ [ 
	// 711OMNI2はpostMessageで受け取った拠点のみを表示する
	// 周辺拠点検索を行わないようガード
	if (isset($D_711OMNI2) == false || $D_711OMNI2 = 0) {
	?>
	ZdcEmapSearchEventStart();
	<?php
	}
	// add end 2016/07/11 H.Yasunaga ]
	?>
	//色々閉じる
	//ZdcEmapSearchClose();
	ZdcEmapPoiRouteClear();
	
	<?php //add 2016/09/15 T.Yoshino ?>
	// 再検索時に吹き出しを削除
	if( <?php if(isset($D_RELOAD_BALLOON)){echo "true";}else{echo "false";} ?> ){
		ZdcEmapShopMsgClose();
	}
	
	//検索位置を保持
	ZdcEmapSearchPoint = ZdcEmapMapObj.getLatLon();
	ZdcEmapSearchScale = ZdcEmapMapObj.getZoom();
	ZdcEmapReadOff();
	<?php
	// add 2016/03/14 Y.Matsukawa [
	// フキダシ表示中に再検索した際、検索後にフキダシを出し直す
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

//リスト表示
function ZdcEmapSearchShopListClick(page) {
	if(ZdcEmapButtonNG()) return;
	ZdcEmapSearchShopList(page)
}
function ZdcEmapSearchShopList(page) {
	//リストを表示させる
	if(<?PHP echo $D_SHOP_CLOSELIST; ?> && ZdcEmapMapShopDetailMrkId != null) {
		//リスト非表示モードで詳細表示中だと出さない
		ZdcEmapListObj.innerHTML = "";
		return;
	}
	// add 2012/09/28 Y.Matsukawa [
	<?php if ($D_SERVICE_TYPE != 'S') { ?>
	// Standard以外は表示しない
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
	 		// 最寄画面から渡された検索結果件数を渡す
	?>
	url += "&cntfix=<?php echo ($cntfix); ?>";
	<?php
		}
		if(isset($arealatlon) && $arealatlon) {
	 		// 最寄画面から渡された検索地図範囲を渡す
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
	// 詳細表示中
	if (ZdcEmapMapShopDetailMrkId != null) {
		// 詳細表示フラグ
		url += "&detail=1";
		// 詳細表示中の拠点ID
		var mrk = ZdcEmapMapShopDetailMrkId;
	<?php if (isset($D_SHOP_LIST_DTLSHOP) && $D_SHOP_LIST_DTLSHOP != '') { // mod 2015/12/04 F.Yokoi ?>
	<?php } else { // mod 2015/12/04 F.Yokoi ?>
		if (mrk && mrk.data1) url += "&dkid="+mrk.data1;
	<?php } // mod 2015/12/04 F.Yokoi ?>
	}
	<?php if($https_req){ ?>url += "&https_req=1";<?php } ?>
	<?php
	// add 2014/12/10 Y.Matsukawa [
	// Cookie（閲覧履歴）保存済みの拠点ID（複数）を引き渡し ?>
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
	// 日本設備工業用 社員番号の若い順に連番をつける
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
//リストから選択
function ZdcEmapShopClick(id) {
	if(ZdcEmapButtonNG()) return;
	ZdcEmapSearchPoint = null;//必ず再検索させるため
	var mrk = ZdcEmapMapShopMrkId[id];
	if (ZdcEmapMapShopMrkId[id].lvl) {
		lvl = ZdcEmapMapShopMrkId[id].lvl;
	} else {
		lvl = "";
	}
	var latlons_id = eval(latlons.length) - eval(id) - 1;
	//表示する
	ZdcEmapShopDetailKidClick(ZdcEmapMapShopMrkId[id].data1,latlons[latlons_id].lat,latlons[latlons_id].lon,ZdcEmapMapShopMrkId[id].data2,ZdcEmapMapShopMrkId[id].nflg,lvl);
}
//最寄検索を隠す
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
//指定されたアイコンを前面にもってくる
function ZdcEmapMapFrontShopMrk(id){
	if(ZdcEmapMapShopMrkId[id] != null) {
		var mrk = ZdcEmapMapShopMrkId[id];
		ZdcEmapMapFrontShopReset();
		mrk.setZindex(101);
		ZdcEmapMapFrontShopMrkId = ZdcEmapMapShopMrkId[id];
	}
}
//詳細アイコンを前面にもってくる
function ZdcEmapMapFrontShopDetail(){
	var mrk;
	if(ZdcEmapMapShopDetailMrkId != null) {
		//フォーカス
		ZdcEmapMapFrontShopReset();
		mrk = ZdcEmapMapCurFocusMrkId;
		mrk.setZindex(102);
		mrk = ZdcEmapMapShopDetailMrkId;
		mrk.setZindex(101);
		ZdcEmapMapFrontShopMrkId = ZdcEmapMapShopDetailMrkId;
	}
}
//前面に持ってきたアイコンを元に戻す
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

//詳細表示(アイコンのみ表示)
function ZdcEmapShopIcon(lat,lon,icnno,nflg,NotMoveFlag) {
	//登録されていないアイコンIDの場合は処理しない
	<?php //if (!ZdcEmapIconImg[icnno]) return;		mod 2012/10/01 Y.Matsukawa ?>
	if (!ZdcEmapIconImg[icnno]) {
		icnno = "@TP";//透明画像
	}
	var mrk;
	//地図移動
	if( NotMoveFlag == undefined || NotMoveFlag != 1 ){
		ZdcEmapMapMove(lat, lon);
	}
	var center = new ZDC.LatLon(Number(lat), Number(lon));
	ZdcEmapMapObj.setHome(center);
	
	//フォーカスカーソルを表示する
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
	
	//詳細アイコンを表示する
	if(nflg == 1) tmp = ZdcEmapIconImg["@NEW"];
		else tmp = "";
	mrk = ZdcEmapMakeMrkApi2(0, lat, lon, 
							ZdcEmapIconW[icnno], ZdcEmapIconH[icnno],ZdcEmapIconW['@NEW'],ZdcEmapIconH['@NEW'],
							ZdcEmapIconOffsetX[icnno], ZdcEmapIconOffsetY[icnno],ZdcEmapIconW[icnno]-ZdcEmapIconW['@NEW'],ZdcEmapIconH[icnno],
							ZdcEmapIconImg[icnno],tmp,
							'', icnno, '', nflg, null, null, null
						);
	if (ZdcEmapMapShopDetailMrkId != null) ZdcEmapMapObj.removeWidget(ZdcEmapMapShopDetailMrkId);//念のため
	ZdcEmapMapObj.addWidget(mrk);
	ZdcEmapMapShopDetailMrkId = mrk;
		
	latlons = new ZDC.LatLon(lat, lon);
	mrk = new ZDC.Marker(latlons,{
		/* マーカのサイズに合わせて位置を調整する */
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

//フキダシ表示
var userwidgethukidasi;
var ZdcEmapMsgSemaphore = false;		<?php // add 2015/01/20 Y.Matsukawa ?>
<?php //function ZdcEmapShopMsg(id , overlap) {		mod 2016/03/14 Y.Matsukawa ?>
function ZdcEmapShopMsg(id , overlap, update) {
	<?php // add 2014/08/19 Q.Dai [?>
	// set default value for overlap parameter
	overlap = typeof overlap !== 'undefined' ? overlap : '';
	<?php // add 2014/08/19 Q.Dai ]?>
	
	if (!update) {	<?php // add 2016/03/14 Y.Matsukawa ?>
		if(ZdcEmapMapObj.ZdcEmapMode == "print") return;//印刷モード時は吹き出し出さない
		if(ZdcEmapButtonNG()) return;
		if(ZdcEmapCondObj.mode == "eki" || ZdcEmapCondObj.mode == "jnr" || ZdcEmapCondObj.mode == "froute") return;//最寄駅や施設を出してる時は出さない
		<?php //ZdcEmapShopMsgClose();		del 2015/01/20 Y.Matsukawa ?>
		//縮尺が範囲外なら表示しない
		var s = ZdcEmapMapObj.getZoom();
		<?php	// del 2016/04/21 H.Osamoto if(s < < ?PHP echo $D_VIEW_ICON_MAX; ? > || s > < ?PHP echo $D_VIEW_ICON_MIN; ? >) return; ?>
		<?php // add 2015/01/20 Y.Matsukawa [ ?>
		<?php
		// 割り込み処理防止 ?>
		if(ZdcEmapMsgSemaphore) return;
		ZdcEmapMsgSemaphore = true;
		ZdcEmapShopMsgClose();
		<?php // add 2015/01/20 Y.Matsukawa ] ?>
	}
	//アイコンを前面に出す
	if(id != null) ZdcEmapMapFrontShopMrk(id);
	else ZdcEmapMapFrontShopDetail();
	//デザイン
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
		<?php // add 2016/12/12 H.Yasunaga ヤマトロッカー対応 ?>
		<?php
		if (isset($D_YTC_LOCKER) && $D_YTC_LOCKER) {
		?>
		url += '&rdate='+obj.ukrtoridate;
		<?php
		}
		?>
		<?php // add 2016/12/12 H.Yasunaga ヤマトロッカー対応 ?>
	} <?php // add 2014/08/21 Q.Dai ] ?>
	<?php // add 2014/12/08 Y.Matsukawa [ ?>
	if (ZdcEmapSearchCenter) {
		url += "&srchplace="+ZdcEmapSearchCenter.lat+","+ZdcEmapSearchCenter.lon;
	}
	<?php // add 2014/12/08 Y.Matsukawa ] ?>
	//フキダシを表示させる
	//var url = "<?PHP echo $D_DIR_BASE_L; ?>msg.htm?cid=<?PHP echo $cid; ?>&id="+i+"&kid="+obj.data1;	// del 2014/08/19 Q.Dai
	url += ZdcEmapCondParms;	<?php // add 2012/01/31 Y.Matsukawa ?>
	//url += "&<?php echo $P_FREEPARAMS; ?>";		mod 2012/09/07 Y.Matsukawa
	url += "&<?php echo $P_FREEPARAMS_ENC; ?>";
	url += "<?php echo ($his?'&his='.urlencode($his):''); ?>";
	
	<?php // add 2017/03/27 H.Yasunaga 日本郵便カスタマイズ [ ?>
	<?php
	// mod 2017/04/19 H.Yasunaga 日本郵便カスタマイズ
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
			<?php // add 2016/08/22 H.Yasunaga 吹き出し閉じるイベント追加 吹き出しの表示非表示で処理の振り分けを行うため [ ?>
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
//閉じる
function ZdcEmapShopMsgClose() {
	if (userwidgethukidasi) {
		userwidgethukidasi.close();
		userwidgethukidasi = null;
	}
	ZdcEmapMapFrontShopReset();
	ZdcEmapTipsClose();//TIPSもついでに閉じる
	<?php // add 2015/04/08 F.Yokoi [ ?>
	//最上位シェイプレイヤーを閉じる
	if(ZdcEmapTipsTopShapeLayer)
	{
		ZdcEmapTipsTopShapeLayer.close();
	}
	<?php // add 2015/04/08 F.Yokoi ] ?>
}
<?php // 表示中のフキダシ内容を再取得／再表示する		add 2016/03/14 Y.Matsukawa ?>
function ZdcEmapUpdateMsgByKyotenid(kyotenid, overlap) {
	if (!userwidgethukidasi) return;
	// 拠点IDに該当するアイコンがあるかどうか
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

//印刷画面開く
function ZdcEmapShopPrintClick(id) {
	if(ZdcEmapButtonNG()) return;
	//window.open = "<?PHP echo $D_DIR_BASE_G; ?>print.htm?cid=<?PHP echo $cid; ?>&kid="+id;
	window.open = "<?PHP echo $D_DIR_BASE_G; ?>print.htm?kid="+id;
}
//詳細の最寄施設検索
function ZdcEmapShopDetailNpoiClick() {
	if(ZdcEmapButtonNG()) return;
	if(ZdcEmapMapShopDetailMrkId == null) return;
	//最寄拠点検索を停止
	ZdcEmapSearchEventStop();
	//詳細に移動
	//var obj = ZdcEmapMapUserLyr.getMarkerById(ZdcEmapMapShopDetailMrkId);
	//ZdcEmapMapMove(obj.Point.my, obj.Point.mx);
	ZdcEmapMapMove(ZdcEmapMapShopDetailMrkId.lat, ZdcEmapMapShopDetailMrkId.lon);
	//最寄施設検索
	ZdcEmapPoiClick(1);
	// パンくず追加		add 2015/01/28 Y.Matsukawa
	ZdcEmapAddOptionalHistory('<?php echo $D_HISTORY_NAME["Npoi"]; ?>');
}
function ZdcEmapPoiClick(mode) {
	if(ZdcEmapButtonNG()) return;
	ZdcEmapPoiRouteClear();
	ZdcEmapSearchEventStop();
	ZdcEmapShopMsgClose();
	//画面を切り替える
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
//検索開始
function ZdcEmapSearchNpoi(mode) {
	ZdcEmapReadOn();
	
	//var p   = new ZdcPoint();
	//p = ZdcEmapMapObj.getMapLocation();
	var center_latlon = ZdcEmapMapObj.getLatLon();
	
	//検索条件取得
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
	if(!code) code = '<?PHP echo $D_POI_JNRMN; ?>';//デフォルトジャンル
	//検索範囲の計算
	var rad = 0;
	if(mode == 0) {
		//地図内検索
		//var box = ZdcEmapMapObj.getMapBoundBox();
		//if((box.maxx - box.minx) > (box.maxy - box.miny)) {
		//	//横幅をとる
		//	var p1 = new ZdcPoint(box.maxx,box.maxy,<?PHP echo $D_PFLG; ?>);
		//	var p2 = new ZdcPoint(box.minx,box.maxy,<?PHP echo $D_PFLG; ?>);
		//} else {
		//	//縦幅をとる
		//	var p1 = new ZdcPoint(box.maxx,box.maxy,<?PHP echo $D_PFLG; ?>);
		//	var p2 = new ZdcPoint(box.maxx,box.miny,<?PHP echo $D_PFLG; ?>);
		//}
		//rad = parseInt(ZdcEmapGeometricObj.getPoint2PointDistance(p1,p2) / 2.1);//地図範囲ギリギリを対象としないよう2.1と少し丸める
		var box = ZdcEmapMapObj.getLatLonBox();
		var boxmin = box.getMin();
		var boxmax = box.getMax();
		var dist_x = ZDC.getLatLonToLatLonDistance(new ZDC.LatLon(boxmin.lat, boxmin.lon), new ZDC.LatLon(boxmin.lat, boxmax.lon));
		var dist_y = ZDC.getLatLonToLatLonDistance(new ZDC.LatLon(boxmin.lat, boxmin.lon), new ZDC.LatLon(boxmax.lat, boxmin.lon));
		rad = Math.floor((dist_x>dist_y?dist_y:dist_x)/2.1);
	} else {
		//最寄検索
		rad = <?PHP echo $D_POI_RAD; ?>;
	}
	if (rad > <?PHP echo $API_RAD_MAX; ?>) rad = <?PHP echo $API_RAD_MAX; ?>;//最寄り検索APIの半径指定上限値を超えている場合は上限値で検索
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
	//		//ジャンルの指定があった時のみ検索させる
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
//検索処理
//function ZdcEmapPoiResult(result) {
function ZdcEmapPoiResult(status, result) {
	//ZdcEmapSearchClose();
	ZdcEmapPoiRouteClear();
	//エラー処理
	//if(result.status != 0 && result.status != 3 && result.status != 5 && result.status != 9) {
	if(status.code != "000" || status.text != "ok") {
		alert("<?PHP echo $D_MSG_ERR_JS_RESULT; ?> poires["+status.code+","+status.text+"]");
		ZdcEmapListObj.innerHTML = "";
		ZdcEmapReadOff();
		return;
	}
	//地図に置く
	var i,p,mrk,titlelink,title,item,maxlat=0,maxlon=0,minlat=999999999,minlon=999999999;;
	for( i = 0;i < ZdcEmapMapPoiMrkCnt;i ++) {
		//ZdcEmapMapUserLyr.removeMarkerById(ZdcEmapMapPoiMrkId[i]);//マーカー削除
		if (ZdcEmapMapPoiMrkId[i]) {		<?php // add 2012/03/16 Y.Matsukawa ?>
			ZdcEmapMapObj.removeWidget(ZdcEmapMapPoiMrkId[i]);
			ZdcEmapMapPoiMrkId[i] = null;
		}
	}
	ZdcEmapMapPoiMrkCnt = 0;
	//for( i in result.item ){	mod 2012/05/22 H.Osamoto
	for( i = 0; i < result.item.length; i++ ){
		item = result.item[i];
		//アイコンの作成
		mrk = ZdcEmapMakeMrkApi2(i,item.poi.latlon.lat,item.poi.latlon.lon,
							<?PHP echo $D_ICON_POI_W; ?>,<?PHP echo $D_ICON_POI_H; ?>,0,0,
							<?PHP echo $D_ICON_POI_OFFSET_X; ?>,<?PHP echo $D_ICON_POI_OFFSET_Y; ?>,0,0,
							'<?PHP echo $D_ICON_POI_IMAGE_DIR; ?>'+item.poi.genre.code.substr(0,5)+'.gif','',
							item.icons,'',item.poiName,0,
							function() { ZdcEmapTipsClick(this.id); },
							null);
		if (ZdcEmapMapPoiMrkId[i] != null) ZdcEmapMapObj.removeWidget(ZdcEmapMapPoiMrkId[i]);//念のため
		ZdcEmapMapObj.addWidget(mrk);
		ZdcEmapMapPoiMrkId[i] = mrk;
		ZdcEmapMapPoiMrkId[i].lat = item.poi.latlon.lat;
		ZdcEmapMapPoiMrkId[i].lon = item.poi.latlon.lon;
		ZdcEmapMapPoiMrkId[i].message = item.poi.text;
		//最大最小緯度経度取得
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
		// 最も離れたlatの差分
		var minlatdist = Math.abs(minlat - ZdcEmapNpoiLatLon.lat);
		var maxlatdist = Math.abs(maxlat - ZdcEmapNpoiLatLon.lat);
		if (minlatdist > maxlatdist) {
			latdist = minlatdist;
		} else {
			latdist = maxlatdist;
		}
		// 最も離れたlonの差分
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
		// 地図表示縮尺取得用仮想表示エリア
		varlatlon_box[0] = new ZDC.LatLon(varminlat, varminlon);
		varlatlon_box[1] = new ZDC.LatLon(varmaxlat, varmaxlon);
		var adjust = ZdcEmapMapObj.getAdjustZoom(varlatlon_box);
		ZdcEmapMapObj.moveLatLon(ZdcEmapNpoiLatLon)
		if (adjust) ZdcEmapMapObj.setZoom(adjust.zoom);
	}
	ZdcEmapMapFrontShopDetail();
	ZdcEmapMapCursorRemove();
	//自動縮尺変更
	//ZdcEmapMapMoveBoxApi2(minlat,minlon,maxlat,maxlon);
	ZdcEmapReadOff();
}
//リスト表示
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

//詳細表示(拠点指定) 拠点接続用
function ZdcEmapShopDetailKidFirst(kid,lat,lon,icnno,nflg,nomove,lvl) {
	if (!ZdcEmapMapObj) return;		<?php // add 2013/08/22 Y.Matsukawa ?>
	ZdcEmapSearchClickFlg = 1;
	if (!lvl) lvl = 0;
	//画面遷移履歴
	//var tmp = "ZdcEmapSearchEventStop();ZdcEmapMapMove('"+lat+"','"+lon+"','"+ZdcEmapMapObj.getZoom()+"');"
	//		+ "ZdcEmapShopDetailKidFirst('"+kid+"','"+lat+"','"+lon+"','"+icnno+"','"+nflg+"','"+lvl+"');";
	//ZdcEmapHistoryAdd("<?PHP echo $D_HISTORY_NAME["Detail"]; ?>",tmp);
	//ZdcEmapHistorySave();
	//
	ZdcEmapShopDetailKid(kid,lat,lon,icnno,nflg,nomove,lvl);
	if(<?php echo $D_DSP_OTHER_KBN; ?> == 0) ZdcEmapSearchShopStart();
	if(<?php echo $D_DSP_OTHER_KBN; ?>) {
		//拠点以外のアイコンをクリア
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
	// 検索位置にマーカー表示		add 2014/12/08 Y.Matsukawa
	if ($D_SEARCH_MAP_ICON_DTL) {
	?>
	if (ZdcEmapSearchCenter) {
		ZdcEmapSearchMapIcon(ZdcEmapSearchCenter);
	}
	<?php
	}
	?>
	<?php
	// 縮尺 ?>
	lvl = parseInt(lvl);
	if (lvl && lvl != 0) {
		ZdcEmapMapObj.setZoom(lvl);
	} else if(<?PHP echo $D_INIT_LVL_DETAIL; ?> > 0) {
		ZdcEmapMapObj.setZoom(<?PHP echo $D_INIT_LVL_DETAIL; ?> - 1);
	}
<?php	// 拠点詳細表示拠点をCookieに書き出し
		//if ($D_COOKIE_SHOPDTL_MAX > 0) {		mod 2014/12/09 Y.Matsukawa
		if ($D_COOKIE_SHOPDTL_AUTOSAVE && $D_COOKIE_SHOPDTL_MAX > 0) {
?>
	var knmenc_obj = document.getElementById("ZdcEmapShopNameEnc");
	var knmenc = "";
	if (knmenc_obj) knmenc = knmenc_obj.value;
	ZdcEmapCookieWriteShopDetail('<?PHP echo $cid; ?>', kid, knmenc);
<?php	}
?>
<?php	// カスタム関数が定義されていたら実行 ?>
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
	//フォーカスカーソルを表示する
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
	
	//詳細アイコンを表示する
	<?php // add 2012/11/13 Y.Matsukawa [ ?>
	if (!ZdcEmapIconImg[icnno]) {
		icnno = "@TP";//透明画像
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
	//動作モードの切り替え
	if(<?php echo $D_DSP_OTHER_KBN; ?>) {
		//拠点詳細以外は非表示
		ZdcEmapSearchEventStop();
		ZdcEmapSearchShopClose();
	} else {
		//最寄拠点表示
		ZdcEmapSearchEventStart();
	}
	if (!notmove) ZdcEmapMapMove(lat, lon);
	var center = new ZDC.LatLon(Number(lat), Number(lon));
	ZdcEmapMapObj.setHome(center);
	<?php
	// 検索位置と店舗アイコンが入りきる縮尺に変更		add 2014/12/08 Y.Matsukawa
	if ($D_SEARCH_MAP_ICON_DTL || $D_SEARCH_MAP_CENTER) {
	?>
	if (ZdcEmapSearchCenter) {
		var adj = ZdcEmapMapObj.getAdjustZoom([ZdcEmapSearchCenter, new ZDC.LatLon(lat, lon)], {fix:true});
		ZdcEmapMapObj.setZoom(adj.zoom);
	}
	<?php
	} ?>
	//他の情報を閉じる
	ZdcEmapShopMsgClose();
	//ZdcEmapSearchClose();
	ZdcEmapPoiRouteClear();
	
	// add 2011/12/27 H.osamoto [
	//検索位置アイコンを表示する
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
//最寄駅検索
//-------------------------------------------------------------
<?php if($D_REQ_JSAPI_V20["search"]){ ?>
var ZdcEmapNekiLat;
var ZdcEmapNekiLon;
<?php } ?>
//駅検索開始
function ZdcEmapStationClick(lat,lon) {
	if(ZdcEmapButtonNG()) return;
	<?php	// カスタム関数が定義されていたら実行 ?>
		if (typeof ZdcEmapCFBeforeStationClick == 'function') {
			ZdcEmapCFBeforeStationClick();
		}
	ZdcEmapPoiRouteClear();
	ZdcEmapShopMsgClose();
	ZdcEmapSearchEventStop();
	ZdcEmapFreeRouteStatic(lat,lon);		<?php // add 2013/06/03 Y.Matsukawa ?>
	//
	ZdcEmapStation(lat,lon);
	//画面を切り替える
	if(ZdcEmapCondObj.mode != "eki") {
		ZdcEmapSearchShopClose();
		ZdcEmapCondObj.innerHTML = "";
		ZdcEmapCondObj.mode = "eki";
		ZdcEmapCondObj.style.visibility = "hidden";
	}
	// パンくず追加		add 2015/01/28 Y.Matsukawa
	ZdcEmapAddOptionalHistory('<?php echo $D_HISTORY_NAME["Neki"]; ?>');
}
//駅検索メイン処理
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

	//リストを表示する
	ZdcEmapStationList(0);
	
	//アイコンを取得する
	ZdcEmapStationResult(stt, res);
}

//検索処理
function ZdcEmapStationResult(status, result) {
	//ZdcEmapSearchClose();
	ZdcEmapPoiRouteClear();
	//エラー処理
	if(status.code != "000" || status.text != "ok") {
		alert("<?PHP echo $D_MSG_ERR_JS_RESULT; ?> ekires["+status.code+","+status.text+"]");
		ZdcEmapSearchEventStart();
		ZdcEmapListObj.innerHTML = "";
		ZdcEmapReadOff();
		return;
	}
	//地図に置く
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
		//アイコンの作成

// mod 2015/07/10 Y.Uesugi [
		//噴出し非表示(日本語表記を非表示)
		if ("<?PHP echo $D_MAP_NO_TIPS_CLICK; ?>") {
			mrk = ZdcEmapMakeMrkApi2(i,item.poi.latlon.lat,item.poi.latlon.lon,
								<?PHP echo $D_ICON_EKI_W; ?>,<?PHP echo $D_ICON_EKI_H; ?>,0,0,
								<?PHP echo $D_ICON_EKI_OFFSET_X; ?>,<?PHP echo $D_ICON_EKI_OFFSET_Y; ?>,0,0,
								'<?PHP echo $D_ICON_EKI_IMAGE; ?>','',
								item.icons, '', item.poi.text, 0,
								function() { ZdcEmapRouteSearchApi2(this.id) },
								0,null);
		} else {
		//噴出し表示
			mrk = ZdcEmapMakeMrkApi2(i,item.poi.latlon.lat,item.poi.latlon.lon,
								<?PHP echo $D_ICON_EKI_W; ?>,<?PHP echo $D_ICON_EKI_H; ?>,0,0,
								<?PHP echo $D_ICON_EKI_OFFSET_X; ?>,<?PHP echo $D_ICON_EKI_OFFSET_Y; ?>,0,0,
								'<?PHP echo $D_ICON_EKI_IMAGE; ?>','',
								item.icons, '', item.poi.text, 0,
								function() { ZdcEmapRouteSearchApi2(this.id) },
								function() { ZdcEmapTipsClick(this.id); },null);
		}
// mod 2015/07/10 Y.Uesugi ]

		if (ZdcEmapMapPoiMrkId[i] != null) ZdcEmapMapObj.removeWidget(ZdcEmapMapPoiMrkId[i]);//念のため
		ZdcEmapMapObj.addWidget(mrk);
		ZdcEmapMapPoiMrkId[i] = mrk;
		ZdcEmapMapPoiMrkId[i].lat = item.poi.latlon.lat;
		ZdcEmapMapPoiMrkId[i].lon = item.poi.latlon.lon;
		ZdcEmapMapPoiMrkId[i].message = item.poi.text;
		//最大最小緯度経度取得
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
		
		// 最も離れたlatの差分
		var minlatdist = Math.abs(minlat - center_latlon.lat);
		var maxlatdist = Math.abs(maxlat - center_latlon.lat);
		if (minlatdist > maxlatdist) {
			latdist = minlatdist;
		} else {
			latdist = maxlatdist;
		}
		
		// 最も離れたlonの差分
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
		
		// 地図表示縮尺取得用仮想表示エリア
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
//リスト表示
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
// 出発地を指定してルート探索
//-------------------------------------------------------------
?>
//-------------------------------------------------------------
// 出発地指定ルートの入力初期値をセット
//-------------------------------------------------------------
var ZdcEmapFRouteInitStr = null;
function ZdcEmapSetFRouteInit(str) {
	ZdcEmapFRouteInitStr = str;
}
// 出発地を指定してルート探索モード開始
function ZdcEmapFreeRouteClick(lat, lon) {
	if(ZdcEmapButtonNG()) return;
	<?php	// カスタム関数が定義されていたら実行 ?>
		if (typeof ZdcEmapCFBeforeRouteClick == 'function') {
			ZdcEmapCFBeforeRouteClick();
		}
	//拠点以外のアイコンをクリア
	for( i = 0;i < ZdcEmapMapPoiMrkCnt;i ++) {
		if (ZdcEmapMapPoiMrkId[i]) {		<?php // add 2012/03/16 Y.Matsukawa ?>
			ZdcEmapMapObj.removeWidget(ZdcEmapMapPoiMrkId[i]);
			ZdcEmapMapPoiMrkId[i] = null;
		}
	}
	ZdcEmapPoiRouteClear();		// ルートクリア
	ZdcEmapShopMsgClose();		// 吹き出し消去
	ZdcEmapSearchEventStop();	// 検索イベント停止
	// 画面を切り替える
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
	// パンくず追加		add 2015/01/28 Y.Matsukawa
	ZdcEmapAddOptionalHistory('<?php echo $D_HISTORY_NAME["FRoute"]; ?>');
}
// 出発地を指定してルート探索モード開始（Light／Maplink）
function ZdcEmapFreeRouteClickLight(lat, lon) {
	if(ZdcEmapButtonNG()) return;
	//拠点以外のアイコンをクリア
	for( i = 0;i < ZdcEmapMapPoiMrkCnt;i ++) {
		if (ZdcEmapMapPoiMrkId[i]) {		<?php // add 2012/08/27 Y.Matsukawa ?>
			<?php //ZdcEmapMapUserLyr.removeMarkerById(ZdcEmapMapPoiMrkId[i]);		mod 2012/08/27 Y.Matsukawa ?>
			ZdcEmapMapObj.removeWidget(ZdcEmapMapPoiMrkId[i]);
			ZdcEmapMapPoiMrkId[i] = null;
		}
	}
	ZdcEmapPoiRouteClear();		// ルートクリア
	ZdcEmapShopMsgClose();		// 吹き出し消去
	ZdcEmapSearchEventStop();	// 検索イベント停止
	// 画面を切り替える
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
<?php // 出発地を指定してルート固定表示		add 2013/06/03 Y.Matsukawa ?>
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
// ルート表示
function ZdcEmapFreeRouteDraw(lat, lon) {
	if(ZdcEmapButtonNG()) return;
	// 地図中心位置を取得
	var center = ZdcEmapMapObj.getLatLon();
	var mx = center.lon;
	var my = center.lat;
	ZdcEmapRouteCase = 'free';		<?php // add 2013/06/03 Y.Matsukawa ?>
	<?php // add 2013/06/03 Y.Matsukawa [ ?>
	if(ZdcEmapFRouteStaticObj) {
		//拠点以外のアイコンをクリア
		for( i = 0;i < ZdcEmapMapPoiMrkCnt;i ++) {
			if (ZdcEmapMapPoiMrkId[i]) {		<?php // add 2012/03/16 Y.Matsukawa ?>
				ZdcEmapMapObj.removeWidget(ZdcEmapMapPoiMrkId[i]);
				ZdcEmapMapPoiMrkId[i] = null;
			}
		}
		ZdcEmapPoiRouteClear();		// ルートクリア
		ZdcEmapShopMsgClose();		// 吹き出し消去
		ZdcEmapSearchEventStop();	// 検索イベント停止
		ZdcEmapSearchShopClose();
		ZdcEmapCondObj.innerHTML = "";
		ZdcEmapCondObj.mode = "";
		ZdcEmapCondObj.style.visibility = "hidden";
		ZdcEmapFreeRouteClose();
	}
	<?php // add 2013/06/03 Y.Matsukawa ] ?>
	// ルート描画
	ZdcEmapRouteSearch("<?php echo $D_USER_DEFNAME; ?>", lon, lat, "地図中心", mx, my);
	<?php if ($D_FROUTE_CLOSE) { ?>
	ZdcEmapFreeRouteClose();
	<?php } ?>
}
// 出発地指定ルート探索を閉じる
function ZdcEmapFreeRouteClose() {
	ZdcEmapListObj.innerHTML = '';
}
// フリーワード検索
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
			//拠点以外のアイコンをクリア
			for( i = 0;i < ZdcEmapMapPoiMrkCnt;i ++) {
				if (ZdcEmapMapPoiMrkId[i]) {		<?php // add 2012/03/16 Y.Matsukawa ?>
					ZdcEmapMapObj.removeWidget(ZdcEmapMapPoiMrkId[i]);
					ZdcEmapMapPoiMrkId[i] = null;
				}
			}
			ZdcEmapPoiRouteClear();		// ルートクリア
			ZdcEmapShopMsgClose();		// 吹き出し消去
			ZdcEmapSearchEventStop();	// 検索イベント停止
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
// フリーワード検索（ページ送り）
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
// 【拠点閲覧履歴】Cookieに読み込み
//-------------------------------------------------------------
?>
function ZdcEmapCookieGetShopList(cid) {
	var shop_list = new Array();
	var pc_shopdtl = "";
	var key = "PC_SHOPDTL_"+cid;
	if (!navigator.cookieEnabled) return shop_list;
	// Cookie読み込み
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
// 【拠点閲覧履歴】拠点をCookieに書き出し
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
	//	// Cookie読み込み
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
	// Cookie書き出し
	ZdcEmapWriteCookie(key, save_value, <?php echo $D_COOKIE_SHOPDTL_EXPIRE; ?>);
}

<?php
//-------------------------------------------------------------
// Cookie書き出し
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
// 【拠点閲覧履歴】Cookieから拠点を削除（1件またはn件）
//-------------------------------------------------------------
?>
function ZdcEmapCookieRemoveShop(cid, kid) {
	var key = "PC_SHOPDTL_"+cid;
	var save_value = "";
	var kid_list = new Array();
	if (typeof kid == "string") {
		// 1件（string）
		kid_list = "|"+kid+"|";
	} else {
		// n件（Array）
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
	// Cookie書き出し
	ZdcEmapWriteCookie(key, save_value, <?php echo $D_COOKIE_SHOPDTL_EXPIRE; ?>);
}

<?php
// add 2015/01/04 Y.Matsukawa
//-------------------------------------------------------------
// 【拠点閲覧履歴】Cookieクリア
//-------------------------------------------------------------
?>
function ZdcEmapCookieClear(cid) {
	var key = "PC_SHOPDTL_"+cid;
	ZdcEmapWriteCookie(key, "", <?php echo $D_COOKIE_SHOPDTL_EXPIRE; ?>);
}

<?php
// add 2014/12/10 Y.Matsukawa
//-------------------------------------------------------------
// 【拠点閲覧履歴】Cookie保存済みの拠点IDリスト（カンマ区切り文字列）を取得
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
// 【拠点閲覧履歴】Cookie保存済みの拠点件数を取得
//-------------------------------------------------------------
?>
function ZdcEmapCookieGetCount(cid) {
	var shop_list = ZdcEmapCookieGetShopList(cid);
	return shop_list.length;
}

<?php
// add 2014/12/11 Y.Matsukawa
//-------------------------------------------------------------
// 【拠点閲覧履歴】閲覧履歴一覧画面を表示
//-------------------------------------------------------------
?>
function ZdcEmapShowCookieShopList(callback) {
	var url = "<?PHP echo $D_DIR_BASE_L; ?>klistck.htm?";
	if (ZdcEmapCondParms) url += ZdcEmapCondParms+"&";
	url += "<?php echo ($P_FREEPARAMS_ENC?$P_FREEPARAMS_ENC.'&':''); ?>";
	// Cookie（閲覧履歴）保存済みの拠点ID（複数）を引き渡し ?>
	var ckkids = ZdcEmapCookieGetKidList("<?php echo $D_CID; ?>");
	url += "&ckkids="+ckkids;
	var dd = new Date();
	var ts = dd.getTime();
	url += "&ts="+ts;
	ZdcEmapHttpRequestHtml(url, callback, false, 2);
}

//-------------------------------------------------------------
// cond書き換え
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
// 画面遷移時に現在表示している縮尺を引き継ぐ
//-------------------------------------------------------------
function ZdcEmapDeliverMapZoom(url) {
	var zoom = ZdcEmapMapObj.getZoom();
	if (zoom == 0) zoom = 1;
	url += "&lvl="+zoom;
	location.href = url;
}

// add 2014/11/28 Y.Matsukawa
//-------------------------------------------------------------
// 検索位置にマーカー表示
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
// 地図中心位置の住所表示
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
	//default値
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
	//正常時
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
// 最寄り店舗一覧の頭出し
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
// 検索位置から店舗へのルート表示
//-------------------------------------------------------------
function ZdcEmapRouteFromSearchPlace(shop_lat, shop_lon, route_type) {<?php // mod 2015/04/08 F.Yokoi ?>
	if(ZdcEmapButtonNG()) return;
	if(!ZdcEmapSearchCenter) return;
	ZdcEmapRouteCase = 'searchplace';
	//拠点以外のアイコンをクリア
	for( i = 0;i < ZdcEmapMapPoiMrkCnt;i ++) {
		if (ZdcEmapMapPoiMrkId[i]) {
			ZdcEmapMapObj.removeWidget(ZdcEmapMapPoiMrkId[i]);
			ZdcEmapMapPoiMrkId[i] = null;
		}
	}
	ZdcEmapPoiRouteClear();		// ルートクリア
	ZdcEmapShopMsgClose();		// 吹き出し消去
	ZdcEmapSearchEventStop();	// 検索イベント停止
	ZdcEmapSearchShopClose();
	ZdcEmapCondObj.innerHTML = "";
	ZdcEmapCondObj.mode = "";
	ZdcEmapCondObj.style.visibility = "hidden";
	ZdcEmapFreeRouteClose();
	// ルート描画
	ZdcEmapRouteSearch("<?php echo $D_USER_DEFNAME; ?>", shop_lon, shop_lat, "検索位置", ZdcEmapSearchCenter.lon, ZdcEmapSearchCenter.lat, route_type);<?php // mod 2015/04/08 F.Yokoi ?>
	// パンくず追加		add 2015/01/28 Y.Matsukawa
	ZdcEmapAddOptionalHistory('<?php echo $D_HISTORY_NAME["SPRoute"]; ?>');
}

// add 2014/12/14 Y.Matsukawa
//-------------------------------------------------------------
// 詳細へ遷移
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
// 絞り込みを全解除
//-------------------------------------------------------------
function ZdcEmapCondAllReset() {
	if(document.ZdcEmapCondForm) {
		var chg = 0;
		ZdcEmapDisableReSearch = true;	// 再検索停止
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
		ZdcEmapDisableReSearch = false;	// 再検索再開
		if (chg > 0) {
			ZdcEmapSearchShopClick();	// 再検索
		}
	}
}

<?php
// セブン&アイ専用最寄り検索		add 2015/05/01 Y.Matsukawa ?>
function ZdcEmap711omniSearchShopStart(init_rad) {
	<?php
	// 初期検索範囲（m）の緯度経度差分（ミリ秒）を算出 ?>
	var latlons = ZdcEmapGetPointsByRad(ZdcEmapSearchCenter, init_rad)
	var zi = ZdcEmapMapObj.getAdjustZoom(latlons, {fix:true});
	ZdcEmapMapObj.setZoom(zi.zoom);
	var box = ZdcEmapMapObj.getLatLonBox();
	var boxmin = box.getMin();
	var boxmax = box.getMax();
	// 初期検索範囲にSEJ店舗が1つ以上存在するかどうか
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
	// エラー処理
	if(result.status != 0 && result.status != 3 && result.status != 5 && result.status != 9) {
		alert("<?PHP echo $D_MSG_ERR_JS_RESULT; ?> listres["+result.status+"]");
		ZdcEmapCondEnabled();
		ZdcEmapSearchEventStart();
		ZdcEmapSearchShopClose();
		ZdcEmapReadOff();
		return;
	}
	// 件数確認
	var cnt = result.items.length;
	if (cnt) {
		// SEJ店舗ありなら地図範囲で最寄り検索
		ZdcEmapSearchFirst = 0;//地図範囲を検索
		ZdcEmapSearchShopStart();
	} else {
		// SEJ店舗なしなら既定半径の入りきる縮尺で最寄り検索
		var latlons = ZdcEmapGetPointsByRad(ZdcEmapSearchCenter, <?php echo $D_711OMNI_ALT_RAD; ?>)
		var zi = ZdcEmapMapObj.getAdjustZoom(latlons, {fix:true});
		ZdcEmapMapObj.setZoom(zi.zoom);
		ZdcEmapSearchFirst = 0;//地図範囲を検索
		ZdcEmapSearchShopStart();
	}
}

// add 2015/11/27 H.Yasunaga ヤンセンファーマ向けカスタマイズ
// ヤンセンファーマ用
// 出発地を指定してルート探索モード開始（Light／Maplink）
function ZdcEmapJanssenFreeRouteClickLight(lat, lon, route_type) {
	if(ZdcEmapButtonNG()) return;
	//拠点以外のアイコンをクリア
	for( i = 0;i < ZdcEmapMapPoiMrkCnt;i ++) {
		if (ZdcEmapMapPoiMrkId[i]) {		<?php // add 2012/08/27 Y.Matsukawa ?>
			<?php //ZdcEmapMapUserLyr.removeMarkerById(ZdcEmapMapPoiMrkId[i]);		mod 2012/08/27 Y.Matsukawa ?>
			ZdcEmapMapObj.removeWidget(ZdcEmapMapPoiMrkId[i]);
			ZdcEmapMapPoiMrkId[i] = null;
		}
	}
	ZdcEmapPoiRouteClear();		// ルートクリア
	ZdcEmapShopMsgClose();		// 吹き出し消去
	ZdcEmapSearchEventStop();	// 検索イベント停止
	// 画面を切り替える
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

// フリーワード検索
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
			//拠点以外のアイコンをクリア
			for( i = 0;i < ZdcEmapMapPoiMrkCnt;i ++) {
				if (ZdcEmapMapPoiMrkId[i]) {		<?php // add 2012/03/16 Y.Matsukawa ?>
					ZdcEmapMapObj.removeWidget(ZdcEmapMapPoiMrkId[i]);
					ZdcEmapMapPoiMrkId[i] = null;
				}
			}
			ZdcEmapPoiRouteClear();		// ルートクリア
			ZdcEmapShopMsgClose();		// 吹き出し消去
			ZdcEmapSearchEventStop();	// 検索イベント停止
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
// フリーワード検索（ページ送り）
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
