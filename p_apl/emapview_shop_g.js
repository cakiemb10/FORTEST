<?PHP
// ------------------------------------------------------------
// Google Maps版 地図制御（主に拠点検索に関係するもの）
// 
// 開発履歴
// 2013/10/02 Y.Matsukawa	新規作成
// 2015/02/16 F.Yokoi		input type=textの値を絞り込み条件に設定する処理の追加
// 2015/06/03 N.Wada		店舗詳細をajaxで表示を追加
// 							検索結果をajaxで表示を追加
// 							検索後に１件目の店舗のフキダシを表示
// 							絞り込みを全解除を追加（emapview_shop.jsから移植）
// 2015/10/20 N.Wada		MarkerClustererを追加（要markerclusterer.js）
// 							吹き出しをInfoBoxに置き換えた場合、再検索時に吹き出しを明示的に削除する
// 							拠点アイコンの前面表示とそれを戻す処理、拠点リストのページ切り替えを追加
// 							拠点一覧のページ切り替え追加
// 							店舗検索開始のイベントを切り替えた場合、初回表示時に２回検索しないように制御追加
// 							店舗検索結果後に任意の関数を実行
// 2015/11/13 N.Wada		クラスターアイコン吹き出し表示処理中にウェイトメッセージ表示追加
// 2015/11/26 N.Wada		初回検索時に初期表示縮尺の地図範囲での検索を強制するフラグ
// 2016/03/01 N.Wada		アイコン登録関数内ではアイコンを地図には表示させず、関数呼び出し側で表示させる
// 2016/03/02 N.Wada		最寄り拠点検索結果の拠点が収まる範囲に移動の処理を最適化
// 2016/03/03 N.Wada		検索位置にマーカー表示
// 2016/03/04 N.Wada		詳細表示にフォーカスカーソル表示を追加
// 2016/03/05 N.Wada		最寄検索結果が0件の場合再検索で取得する件数指定機能追加
// 2016/03/06 N.Wada		店舗検索最小検索追加
// 2016/03/07 N.Wada		初回検索時に最寄り店舗一覧に初回検索フラグを渡す
// 2016/03/08 N.Wada		最寄り駅検索追加
// 2016/03/17 N.Wada		検索履歴追加
// 2016/03/22 N.Wada		拠点アイコンの中央下が拠点位置を指すパターン追加
// 2016/04/27 N.Wada		フキダシから詳細画面へ遷移すると、パンくず情報が欠落する不具合修正
// 2016/05/13 N.Wada		閲覧履歴（複数）Cookieのキーに任意の文字列を追加
// 2016/06/18 N.Wada		詳細画面でリスト非表示モード時は最寄り一覧は表示しない
// 2016/06/22 Y.Matsukawa	別ドメインでのアクセスに対応
// 2016/06/23 N.Wada		フキダシから詳細画面へ遷移すると、絞り込み条件が引き継がれない不具合修正
// 2016/08/15 Y.Matsukawa	測地系変換高精度（特定エリア／特定縮尺のみ）
// 2016/08/16 Y.Matsukawa	世界測地系保持
// 2017/02/16 N.Wada		最寄駅リスト表示
// 2017/02/27 N.Wada		複合ルート検索追加
// 2017/06/09 N.Wada		初期表示縮尺を設定できるよう変更
// 2017/06/22 N.Wada		最寄り拠点の初期縮尺と再検索縮尺による二段階検索機能追加
// 2017/07/04 Y.Uesugi		舗詳細ページにおいて、選択した拠点アイコンが前面に表示するよう修正
// 2017/08/09 T.Luu         中心アイコンをクリックすると吹き出しを表示という処理を追加
// 2018/06/26 Y.Matsukawa	バスルート：タイムアウト対策
// 2018/06/29 Dam Phan		Apply new design #18619
// 2018/06/21 Chien Nguyen		Change filter of nearest shop map #18858
// 2018/07/03 N.Wada		複合ルート検索中は画面操作を制限する
// ------------------------------------------------------------
require_once('/home/emap/src/p/inc/define.inc');
require_once('/home/emap/src/p/inc/act_get_parm.inc');
?>

var ZdcEmapAjaxSelectShop = 0;	<?php // 2015/06/03 N.Wada ?>
<?php
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
// condグルーピング定義
// ZdcEmapCondGroup[cond番号] = グループ番号(1〜n);
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
// 拠点検索関係
//-------------------------------------------------------------
var ZdcEmapNearShop = new ZdcNearShop();
var ZdcEmapSearchPoint = null;//検索した位置を保持
var ZdcEmapSearchScale = null;//検索した縮尺を保持
var ZdcEmapSearchFirst = null;//位置決定後の最初の検索か否か
var ZdcEmapSearchFirstCstm = null;	<?php //最初の検索か否かカスタマイズ用フラグ	// add 2016/03/05 N.Wada ?>
var ZdcEmapSearchCenter = null;	<?php // add 2016/03/03 N.Wada ?>
var ZdcEmapBoundsChanged = null;
var ZdcEmapSearchShopCancel = null;	<?php // 2015/06/03 N.Wada ?>
var ZdcEmapResultAfterFunc = null;	<?php // 2015/06/03 N.Wada ?>
var ZdcEmapSearchFirstInitLvFlg = null;	<?php // add 2015/11/26 N.Wada ?>
var ZdcEmapCenterIconClicked = null; // 2016/08/09 T.Luu
// 検索決定
function ZdcEmapSearchSet(lat,lon,notmove) {
	// マップ移動
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
	// 検索位置にマーカー表示		add 2016/03/03 N.Wada
	if ($D_SEARCH_MAP_ICON) {
	?>
	ZdcEmapSearchMapIcon(ZdcEmapSearchCenter);
	<?php
	}
	?>
	// 拠点検索
	ZdcEmapSearchFirst = 1;
	ZdcEmapSearchPoint = null;//必ず再検索させるため
	//ZdcEmapSearchShopStart();
	ZdcEmapBoundsChanged = google.maps.event.addListener (ZdcEmapMapObj, 'bounds_changed', ZdcEmapSearchShopStart);

}
//検索開始
function ZdcEmapSearchShopClick() {
	if(ZdcEmapButtonNG()) return;
	ZdcEmapSearchPoint = null;//必ず再検索させるため
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
	ZdcEmapSearchPoint = null;//必ず再検索させるため
	ZdcEmapSearchEventStop();
	//画面を切り替える
	if(ZdcEmapCondObj.mode != "cond") {
		//ZdcEmapSearchShopClose();//拠点以外のリストを消す
		var url = "<?PHP echo $D_DIR_BASE_L; ?>cond.htm?";
		<?php if(isset($condprm) && $condprm != '') { ?>url += "&<?php echo $condprm; ?>";<?php } ?>
		url += "&<?php echo $P_FREEPARAMS; ?>";
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

// 検索メイン処理
function ZdcEmapSearchShop() {
	<?php // add 2015/10/20 N.Wada ?>
	<?php if (isset($D_GOOGLEMAPS_SEARCH_EVENT_IDLE) && $D_GOOGLEMAPS_SEARCH_EVENT_IDLE) { ?>
	if(ZdcEmapSearchShopCancel) {
		ZdcEmapSearchShopCancel = 0;
		return;
	}
	<?php } ?>
	ZdcEmapReadOn();
	//位置・範囲取得
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
		//自動再検索しない
		ZdcEmapReadOff();
		return;
	}
	//自動検索イベント停止
	ZdcEmapSearchEventStop();
	//絞り込み条件取得
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
		// 詳細表示中の拠点ID
		var mrk = ZdcEmapMapShopDetailMrkId;
		if (mrk && mrk.data1) opts.exceptKid = mrk.data1;
	}
	ZdcEmapNearShop.opts = opts;
	//リストを表示する
	ZdcEmapSearchShopList(0);
	//アイコンを表示する
	if (typeof(search_flg) != 'undefined') {
		ZdcEmapNearShop.searchPost(opts,ZdcEmapSearchShopResult);
	} else {
		ZdcEmapNearShop.search(opts,ZdcEmapSearchShopResult);
	}
}

//絞り込み条件組み立て
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
		// Set condition cond101 and cond102 of tap 郵便サービスから選ぶ
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

		// Set condition cond103 and cond104 of tap 貯金サービスから選ぶ
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

		// Set condition cond105 and cond106 of tap 保険サービスから選ぶ
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

		// Set condition cond107 of tap ATMから選ぶ
		var cond107 = $('select[name=youbi4]').val() + $('select[name=timespan4]').val();	// mod 2018/06/29 Dam Phan Change youbi to dropdownlist
		$('input[name=cond107]').val(cond107);

		// Set condition cond108 and cond109 of tap 他サービスから選ぶ
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


//検索結果の処理
var ZdcEmapConvertDatumH = false;	<?php // add 2016/08/15 Y.Matsukawa ?>
var ZdcEmapConvertDatumHDone = false;	<?php // add 2016/08/15 Y.Matsukawa ?>
function ZdcEmapSearchShopResult(result) {
	var i,item,mrk,tmp,icnt,maxlat=0,maxlon=0,minlat=999999999,minlon=999999999;
	function setLatLon(lat, lon){
		this.lat  = lat;
		this.lon = lon;
	}
	latlons = new Array();
	
	//吹き出し削除
	ZdcEmapShopMsgClose();		<?php // add 2015/10/20 N.Wada ?>

	<?php // add 2015/10/20 N.Wada ?>
	//マーカークラスター削除
	<?php if (isset($D_GOOGLEMAPS_MARKER_CLUSTERER) && $D_GOOGLEMAPS_MARKER_CLUSTERER) { ?>
	ZdcEmapMapShopMrkClstObj.clearMarkers();
	<?php } ?>

	//マーカー削除
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
	//エラー処理
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
	// 高精度測地系変換
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

	//地図に置く
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
		//最大最小緯度経度取得
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
		// 無効なアイコンIDの場合は透明アイコンに差し替え
		if (icn_img == null) icn_img = ZdcEmapIconImg["@TP"];
		
		latlons[ZdcEmapMapShopMrkCnt] = new ZDC.LatLon(item.lat, item.lon);
		<?php
		// add 2016/08/16 Y.Matsukawa [
		// 拠点に世界測地系緯度経度を保持している場合はそれを使用
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
		// 世界測地系緯度経度 ?>
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
								<?php if (isset($D_ICON_ANCHOR_CENTER_BOTTOM) && $D_ICON_ANCHOR_CENTER_BOTTOM) { // 拠点アイコン中央下が拠点位置	add 2016/03/22 N.Wada ?>
								Math.ceil(ZdcEmapIconW[item.icon]/2), ZdcEmapIconH[item.icon],ZdcEmapIconW[item.icon]-ZdcEmapIconW['@NEW'],ZdcEmapIconH[item.icon],
								<?php } else { // 拠点アイコン中心が拠点位置 ?>
								ZdcEmapIconOffsetX[item.icon], ZdcEmapIconOffsetY[item.icon],ZdcEmapIconW[item.icon]-ZdcEmapIconW['@NEW'],ZdcEmapIconH[item.icon],
								<?php } ?>
								icn_img,tmp,
								item.id, item.icon, '', item.nflg,
								<?PHP
									// クリック
									if($D_KYO_ICON_CLK == 1) echo "function() { ZdcEmapShopMsg(this.id); }"; 
									else if($D_KYO_ICON_CLK == 2) echo "function() { window.location.href='".$D_DIR_BASE_G."dtl/'+this.data1+'/?".($P_FREEPARAMS_ENC?'&'.$P_FREEPARAMS_ENC:'').($condprm?'&'.$condprm:'').($his?'&his='.urlencode($his):'')."'; }";		// add 2012/07/06 Y.Matsukawa
									else echo "null"; 
								?>
								,
								<?PHP
									// マウスオーバー
									if(!$D_KYO_ICON_MO) echo "null";
									if($D_KYO_ICON_MO) echo "function() { ZdcEmapShopMsg(this.id); }";
								?>
								,item.lvl
								,wgs		<?php // add 2016/08/15 Y.Matsukawa ?>
							);
		<?php /* Google Maps JavaScript API V3の書式に変更
		//if (ZdcEmapMapShopMrkId[i] != null) ZdcEmapMapObj.removeWidget(ZdcEmapMapShopMrkId[i]);//念のため
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
	// マーカークラスター生成
	<?php if (isset($D_GOOGLEMAPS_MARKER_CLUSTERER) && $D_GOOGLEMAPS_MARKER_CLUSTERER) { ?>
	//ZdcEmapMapShopMrkClstObj.addMarkers(ZdcEmapMapShopMrkId);
	ZdcEmapMapShopMrkClstObj.addMarkers(ZdcEmapMapShopMrkId.slice(0,ZdcEmapMapShopMrkCnt));	// 配列をマーカ数分だけ渡すように（null値の配列は渡さないように）
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
		//初期検索時は画面移動
		if (ZdcEmapMapShopMrkCnt > 0) {
			//拠点が収まる範囲に移動
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
				//// 最も離れたlatの差分
				//var minlatdist = Math.abs(Math.floor(minlat*10000000) - Math.floor(center_latlon.lat*10000000))/10000000;
				//var maxlatdist = Math.abs(Math.floor(maxlat*10000000) - Math.floor(center_latlon.lat*10000000))/10000000;
				//if (minlatdist > maxlatdist) {
				//	latdist = minlatdist;
				//} else {
				//	latdist = maxlatdist;
				//}
				//// 最も離れたlonの差分
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
				//// 地図表示縮尺取得用仮想拠点
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
					<?php // idleイベントはfitBounds後に発生してしまうので２回検索しないようにする	add 2015/10/20 N.Wada ?>
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
	//色々閉じる
	ZdcEmapRouteClear();	<?php // add 2016/03/08 N.Wada ?>
	//検索位置を保持
	//	ZdcEmapSearchPoint = ZdcEmapMapObj.getLatLon();
	//	ZdcEmapSearchScale = ZdcEmapMapObj.getZoom();
	ZdcEmapSearchPoint = ZdcEmapMapObj.getCenter();
	ZdcEmapSearchScale = ZdcEmapMapObj.getZoom();
	ZdcEmapReadOff();
	<?php
	// 検索後に１件目の店舗のフキダシを表示	add 2015/06/03 N.Wada
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
	<?php // セットされた任意の関数を実行	add 2015/10/20 N.Wada ?>
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
//指定されたアイコンを前面にもってくる
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
//詳細アイコンを前面にもってくる
function ZdcEmapMapFrontShopDetail(){
	var mrk;
	if(ZdcEmapMapShopDetailMrkId != null) {
		//フォーカス
		ZdcEmapMapFrontShopReset();
		mrk = ZdcEmapMapCurFocusMrkId;
		<?php /* Google Maps JavaScript API V3の書式に変更
		//mrk.setZindex(102);
		*/ ?>
		mrk.setZIndex(102);
		mrk = ZdcEmapMapShopDetailMrkId;
		<?php /* Google Maps JavaScript API V3の書式に変更
		//mrk.setZindex(101);
		*/ ?>
		mrk.setZIndex(101);
		ZdcEmapMapFrontShopMrkId = ZdcEmapMapShopDetailMrkId;
	}
}
<?php // add 2015/10/20 N.Wada ?>
//前面に持ってきたアイコンを元に戻す
function ZdcEmapMapFrontShopReset() {
	if (ZdcEmapMapFrontShopMrkId != null) {
		var mrk = ZdcEmapMapFrontShopMrkId;
		//if (mrk && mrk.b) mrk.setZindex(100);
		if (mrk) mrk.setZIndex(100);
		ZdcEmapMapFrontShopMrkId = null;
	}
}

//詳細表示(アイコンのみ表示)
var ZdcEmapConvertDatumHPrt = false;	<?php // add 2016/08/15 Y.Matsukawa ?>
var ZdcEmapConvertDatumHPrtDone = false;	<?php // add 2016/08/15 Y.Matsukawa ?>
<?php //function ZdcEmapShopIcon(lat,lon,icnno,nflg,NotMoveFlag) {		mod 2016/08/15 Y.Matsukawa ?>
function ZdcEmapShopIcon(lat, lon, icnno, nflg, NotMoveFlag, wgs) {
	//登録されていないアイコンIDの場合は処理しない
	if (!ZdcEmapIconImg[icnno]) {
		icnno = "@TP";//透明画像
	}
	var mrk;
	//地図移動
	if( NotMoveFlag == undefined || NotMoveFlag != 1 ){
		<?php //ZdcEmapMapMove(lat, lon);		mod 2016/08/15 Y.Matsukawa ?>
		ZdcEmapMapMove(lat, lon, null, wgs);
	}
//	var center = new ZDC.LatLon(Number(lat), Number(lon));
//	ZdcEmapMapObj.setHome(center);

<?php
	// add 2016/08/15 Y.Matsukawa [
	// 高精度測地系変換
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
	
//	//フォーカスカーソルを表示する
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
	
	//詳細アイコンを表示する
	if(nflg == 1) tmp = ZdcEmapIconImg["@NEW"];
		else tmp = "";
	mrk = ZdcEmapMakeMrkApi2(0, lat, lon, 
							ZdcEmapIconW[icnno], ZdcEmapIconH[icnno],ZdcEmapIconW['@NEW'],ZdcEmapIconH['@NEW'],
							<?php if (isset($D_ICON_ANCHOR_CENTER_BOTTOM) && $D_ICON_ANCHOR_CENTER_BOTTOM) { // 拠点アイコン中央下が拠点位置	add 2016/03/22 N.Wada ?>
							Math.ceil(ZdcEmapIconW[icnno]/2), ZdcEmapIconH[icnno],ZdcEmapIconW[icnno]-ZdcEmapIconW['@NEW'],ZdcEmapIconH[icnno],
							<?php } else { // 拠点アイコン中心が拠点位置 ?>
							ZdcEmapIconOffsetX[icnno], ZdcEmapIconOffsetY[icnno],ZdcEmapIconW[icnno]-ZdcEmapIconW['@NEW'],ZdcEmapIconH[icnno],
							<?php } ?>
							ZdcEmapIconImg[icnno],tmp,
							'', icnno, '', nflg, null, null, null
							,wgs		<?php // add 2016/08/15 Y.Matsukawa ?>
						);
	<?php /* Google Maps JavaScript API V3の書式に変更
	//if (ZdcEmapMapShopDetailMrkId != null) ZdcEmapMapObj.removeWidget(ZdcEmapMapShopDetailMrkId);//念のため
	//ZdcEmapMapObj.addWidget(mrk);
	*/ ?>
	<?php // add 2016/03/01 N.Wada [ ?>
	if (ZdcEmapMapShopDetailMrkId != null) ZdcEmapMapShopDetailMrkId.setMap(null);
	mrk.setMap(ZdcEmapMapObj);
	<?php // add 2016/03/01 N.Wada ] ?>
	ZdcEmapMapShopDetailMrkId = mrk;
		
//	latlons = new ZDC.LatLon(lat, lon);
//	mrk = new ZDC.Marker(latlons,{
//		/* マーカのサイズに合わせて位置を調整する */
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

//リスト表示
<?php // add 2015/10/20 N.Wada ?>
function ZdcEmapSearchShopListClick(page) {
	if(ZdcEmapButtonNG()) return;
	ZdcEmapSearchShopList(page)
}
function ZdcEmapSearchShopList(page) {
	<?php // add 2016/06/18 N.Wada [ ?>
	//リストを表示させる
	if(<?PHP echo $D_SHOP_CLOSELIST; ?> && ZdcEmapMapShopDetailMrkId != null) {
		//リスト非表示モードで詳細表示中だと出さない
		ZdcEmapListObj.innerHTML = "";
		return;
	}
	<?php // add 2016/06/18 N.Wada ] ?>
	<?php if ($D_SERVICE_TYPE != 'S') { ?>
	// Standard以外は表示しない
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
	// 高精度測地系変換
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

//フキダシ表示
var userwidgethukidasi = new google.maps.InfoWindow();
<?php if (isset($D_GOOGLEMAPS_POI_CLICK_INFOWINDOW_DISABLE) && $D_GOOGLEMAPS_POI_CLICK_INFOWINDOW_DISABLE) { // add 2015/10/20 N.Wada ?>
userwidgethukidasi.set("noSuppress", true);
<?php } ?>
<?php
//ボタン押下拒否判定のキャンセル追加	// mod 2015/06/03 N.Wada
//function ZdcEmapShopMsg(id) {
//	if(ZdcEmapButtonNG()) return;
?>
function ZdcEmapShopMsg(id, NGcancel) {
	NGcancel = NGcancel || false;
	if(!NGcancel && ZdcEmapButtonNG()) return;
	//if(ZdcEmapCondObj.mode == "eki" || ZdcEmapCondObj.mode == "jnr" || ZdcEmapCondObj.mode == "froute") return;//最寄駅や施設を出してる時は出さない
	ZdcEmapShopMsgClose();
	//	//アイコンを前面に出す
	//	if(id != null) ZdcEmapMapFrontShopMrk(id);
	//	else ZdcEmapMapFrontShopDetail();
	//デザイン
	if(id != null) var obj = ZdcEmapMapShopMrkId[id];
	else var obj = ZdcEmapMapShopDetailMrkId;
	
	if(!obj) return;
	
	//フキダシを表示させる
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
	<?php //対象がクラスターアイコンだった場合、その位置へと吹き出しを移動する add 2015/10/20 N.Wada [ ?>
	<?php if (isset($D_GOOGLEMAPS_MARKER_CLUSTERER) && $D_GOOGLEMAPS_MARKER_CLUSTERER) { ?>
		var clsts = ZdcEmapMapShopMrkClstObj.getClusters();
		loopout: for (var i=0, cl=clsts.length; i<cl; i++) {
			var mrks = clsts[i].getMarkers();
			if (mrks.length <= 1) continue;	<?php //1個以下の場合はクラスターアイコンではない ?>
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
//フキダシ表示（マーカークラスタ用）
function ZdcEmapShopMsgCluster(mCluster) {
	if(ZdcEmapButtonNG()) return;
	ZdcEmapShopMsgClose();

	var markers = mCluster.getMarkers();
	if(markers.length == 0) return;

	//デザイン
	var id = markers[0].id;
	if(id != null) var obj = ZdcEmapMapShopMrkId[id];
	
	if(!obj) return;
	
	ZdcEampVisibleWait();	<?php // add 2015/11/13 N.Wada ?>
	
	var latlng = mCluster.getCenter();

	//フキダシを表示させる
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
//閉じる
function ZdcEmapShopMsgClose() {
	if (userwidgethukidasi) {
		userwidgethukidasi.close();
		//userwidgethukidasi = null;
	}
	//ZdcEmapMapFrontShopReset();
	//ZdcEmapTipsClose();//TIPSもついでに閉じる
}

//詳細表示(拠点指定) 拠点接続用
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
	// 高精度測地系変換
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
	// 拠点詳細表示拠点をCookieに書き出し	add 2016/03/17 N.Wada
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
	//フォーカスカーソルを表示する
	mrk = ZdcEmapMakeMrkApi2(0, lat, lon, 
							ZdcEmapIconW['@SEL'], ZdcEmapIconH['@SEL'],0,0,
							<?php if (isset($D_ICON_ANCHOR_CENTER_BOTTOM) && $D_ICON_ANCHOR_CENTER_BOTTOM) { // 拠点アイコン中央下が拠点位置	add 2016/03/22 N.Wada ?>
							ZdcEmapIconOffsetX['@SEL'], Math.ceil(ZdcEmapIconH['@SEL'] + (ZdcEmapIconH[icnno] - ZdcEmapIconH['@SEL']) / 2),0,0,
							<?php } else { // 拠点アイコン中心が拠点位置 ?>
							ZdcEmapIconOffsetX['@SEL'], ZdcEmapIconOffsetY['@SEL'],0,0,
							<?php } ?>
							ZdcEmapIconImg['@SEL'],'',
							'', '', '', 0, null, null, null
							,wgs		<?php // add 2016/08/15 Y.Matsukawa ?>
						);
	<?php /* Google Maps JavaScript API V3の書式に変更
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
	
	//詳細アイコンを表示する
	if (!ZdcEmapIconImg[icnno]) {
		icnno = "@TP";//透明画像
	}
	if(nflg == 1) tmp = ZdcEmapIconImg["@NEW"];
		else tmp = "";
	mrk = ZdcEmapMakeMrkApi2(0, lat, lon, 
							ZdcEmapIconW[icnno], ZdcEmapIconH[icnno],ZdcEmapIconW['@NEW'],ZdcEmapIconH['@NEW'],
							<?php if (isset($D_ICON_ANCHOR_CENTER_BOTTOM) && $D_ICON_ANCHOR_CENTER_BOTTOM) { // 拠点アイコン中央下が拠点位置	add 2016/03/22 N.Wada ?>
							Math.ceil(ZdcEmapIconW[icnno]/2), ZdcEmapIconH[icnno],ZdcEmapIconW[icnno]-ZdcEmapIconW['@NEW'],ZdcEmapIconH[icnno],
							<?php } else { // 拠点アイコン中心が拠点位置 ?>
							ZdcEmapIconOffsetX[icnno], ZdcEmapIconOffsetY[icnno],ZdcEmapIconW[icnno]-ZdcEmapIconW['@NEW'],ZdcEmapIconH[icnno],
							<?php } ?>
							ZdcEmapIconImg[icnno],tmp,
							kid, icnno, '', nflg, null, null, lvl
							,wgs		<?php // add 2016/08/15 Y.Matsukawa ?>
						);
	
	<?php /* Google Maps JavaScript API V3の書式に変更
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
	//動作モードの切り替え
	if(<?php echo $D_DSP_OTHER_KBN; ?>) {
		//拠点詳細以外は非表示
		ZdcEmapSearchEventStop();
		//ZdcEmapSearchShopClose();
	} else {
		//最寄拠点表示
		ZdcEmapSearchEventStart();
	}
	if (!notmove) ZdcEmapMapMove(lat, lon);
	//var center = new ZDC.LatLon(Number(lat), Number(lon));
	//ZdcEmapMapObj.setHome(center);
	//他の情報を閉じる
	ZdcEmapShopMsgClose();
	ZdcEmapRouteClear();	<?php // add 2016/03/08 N.Wada ?>
}

//-------------------------------------------------------------
//最寄駅検索
//-------------------------------------------------------------
var ZdcEmapNekiLat;
var ZdcEmapNekiLon;
var ZdcEmapNekiList;
<?php // add 2016/03/08 N.Wada ?>
//駅検索メイン処理
function ZdcEmapStation(lat, lon) {
	ZdcEmapReadOn();
	//
	
	var tmplatlon;
	
	if (lat && lon){
		tmplatlon = new ZDC.LatLon(Number(lat), Number(lon));
	} else {
		<?php /* Google Maps JavaScript API V3の書式に変更
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
	//エラー処理
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

<?php // 最寄駅リスト表示	add 2017/02/16 N.Wada ?>
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
//複合ルート検索
//-------------------------------------------------------------
<?php // add 2017/03/06 N.Wada ?>
function ZdcEmapSrchCombRootDept(keyword) {
	ZdcEmapSrchCombRootDeptObj.innerHTML = "";

	//検索条件
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

	//検索条件
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

<?php // 出発地を指定してルート固定表示 ?>
function ZdcEmapFreeRouteStatic(lat, lon) {
	// 未対応
	return;
}

<?php
// add 2016/03/17 N.Wada
//-------------------------------------------------------------
// 【拠点閲覧履歴】Cookieに読み込み
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
// add 2016/03/17 N.Wada
//-------------------------------------------------------------
// 【拠点閲覧履歴】拠点をCookieに書き出し
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
	// Cookie書き出し
	ZdcEmapWriteCookie(key, save_value, <?php echo $D_COOKIE_SHOPDTL_EXPIRE; ?>);
}

<?php
// add 2016/03/17 N.Wada
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

// add 2015/06/03 N.Wada
//店舗詳細ajax表示
function ZdcEmapShopDetailAjax(kid) {
	ZdcEmapDetailPopObj.innerHTML = "";
	
	var url = "<?PHP echo $D_DIR_BASE_L; ?>dtl/"+kid+"/?";
	ZdcEmapHttpRequestHtml(url, function(html,status){
		if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> cond["+status+"]";
		ZdcEmapDetailPopObj.innerHTML = html;
	});
}

// add 2015/06/03 N.Wada
//検索結果ajax表示
function ZdcEmapSearchResultAjax(form) {
	ZdcEmapSearchPopObj.innerHTML = "";

	//検索条件
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
	url += ZdcEmapCondParms;	//絞り込み条件
	ZdcEmapHttpRequestHtml(url, function(html,status){
		if(status) html = "<?PHP echo $D_MSG_ERR_JS_REQUEST; ?> cond["+status+"]";
		ZdcEmapSearchPopObj.innerHTML = html;
	});
}

// add 2015/06/03 N.Wada
// 絞り込みを全解除
function ZdcEmapCondAllReset() {
	if(document.ZdcEmapCondForm) {
		var chg = 0;
		//ZdcEmapDisableReSearch = true;	// 再検索停止
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
		//ZdcEmapDisableReSearch = false;	// 再検索再開
		if (chg > 0) {
			ZdcEmapSearchShopClick();	// 再検索
		}
	}
}

// add 2016/03/03 N.Wada
//-------------------------------------------------------------
// 検索位置にマーカー表示
//-------------------------------------------------------------
function ZdcEmapSearchMapIcon(latlon) {
	var latlon_wgs = ZdcEmapTky2Wgs(latlon.lat, latlon.lon);
<?php	if ($D_SEARCH_MAP_ICON_IMG) { ?>
	<?php /* Google Maps JavaScript API V3の書式に変更
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
		optimized : false,	<?php // アニメーションGIFを有効に ?>
		position : new google.maps.LatLng(latlon_wgs.lat, latlon_wgs.lon)
	});

// add T.Luu 2017/08/09
<?php if (isset($D_SHOW_CENTER_MARK_BALLOON_FLG) && $D_SHOW_CENTER_MARK_BALLOON_FLG) { ?>		
	if( ZdcEmapCenterIconClicked ) google.maps.event.removeListener( ZdcEmapCenterIconClicked );
	// マーカ-をクリックイベントを登録
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

// 中心アイコンの吹き出しを表示	
// result 	: CGIから受け取った情報
function ZdcEmapGetAddrInfoResult( result ){	
	// 初期化	
	var addrinfo;	
	var position;
	
	//住所情報を取得	
	if ( result.items && result.items.length ) {		
		addrinfo = result.items[0].addr;
	}
	// 位置取得
	if ( result.options ){		
		position = {lat: result.options.lat, lng: result.options.lon};
	}
	
	ZdcEmapShowAddrBalloon( addrinfo, position);
}

// 吹き出し表示
function ZdcEmapShowAddrBalloon( addrinfo , position ){
	
	// 吹き出しを閉じる
	if(addrBalloon){
		addrBalloon.close();
	}else{
		addrBalloon = new google.maps.InfoWindow();
	}
	
	// 吹き出しを表示
	if( addrinfo ){
		addrBalloon.setContent(　addrinfo　);
		addrBalloon.open(　ZdcEmapMapObj, mrk　);
	}
	
	if ( position ){
	    addrBalloon.setPosition(position);	
	}	
}	

// 住所情報を取得する
// opts 	: 設定情報
// callback : コルバック関数
function ZdcEmapGetAddrInfor(　opts, callback ){	
	// 初期化	
	var owner      = this;
	var enc        = "EUC";
	var pflg       = "1";
	var datum      = "WGS84";	
	var target_url = "<?php echo $D_SSAPI['getadstr']; ?>";
	var request_url= '';
	var prm        = '';
	
	// いつもNAVICGIの住所逆引きのパラメータを準備
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
		// 受信情報を分析
		var result	    = new ZdcMapCenterAddrSelectResult(reference_text, status);
		result.type 	= owner.type;
		result.options  = opts;
		owner.result    = result;
		
		if( callback != null ){
			callback(result);
		}
	}, opts.timeout);	
}	

// オプションオブジェクト定義
function ZdcMapCenterAddrSelectOptions(frewd){
	//default値
	this.lat = '';
	this.lon = '';
	this.timeout = 60000;
}
// 住所オブジェクト定義
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
	<?php /* Google Maps JavaScript API V3の書式に変更
	var mrk = new ZDC.Marker(latlon,{
		color: ZDC.MARKER_COLOR_ID_GREEN_S
	});
	*/ ?>
	var mrk = new google.maps.Marker({
		position : new google.maps.LatLng(latlon_wgs.lat, latlon_wgs.lon)
	});
<?php	} ?>
	<?php /* Google Maps JavaScript API V3の書式に変更
	mrk.setZindex(300);
	ZdcEmapMapObj.addWidget(mrk);
	*/ ?>
	mrk.setZIndex(0);
	mrk.setMap(ZdcEmapMapObj);
}

