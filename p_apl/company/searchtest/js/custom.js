/* カスタマイズ用のJavaScriptコードをここに記述してください */

function checkForm(form) {
	var formOK = false;
	var youbi = "", timespan = "", cond_val = "";

	for (var i=0,len=form.youbi.length; i<len; i++) {
		if (form.youbi[i].checked) {
			youbi = form.youbi[i].value;
			break;
		}
	}
	timespan = form.timespan.value;
	if (youbi) {
		formOK = true;
		cond_val += youbi;
	}
	if (timespan) {
		formOK = true;
		cond_val += timespan;
	}

	switch (form.tabno.value) {
		case "1":
			form.cond101.value = "";
			form.cond102.value = "";
			if (form.cond2.checked) formOK = true;
			if (form.cond3.checked) formOK = true;
			if (form.cond4.checked) formOK = true;
			if (form.cond5.checked) formOK = true;
			if (form.cond6.checked) formOK = true;
			if (form.cond7.checked) formOK = true;
			if (form.cond2.checked) {
				form.cond101.value = cond_val;
			}
			if (form.cond7.checked) {
				form.cond102.value = cond_val;
			}
			if (!form.cond2.checked && !form.cond7.checked) {
				form.cond101.value = cond_val;
				form.cond102.value = cond_val;
			}
			break;
		case "2":
			form.cond103.value = "";
			form.cond104.value = "";
			if (form.cond8.checked) formOK = true;
			if (form.cond9.checked) formOK = true;
			if (form.cond10.checked) formOK = true;
			if (form.cond11.checked) formOK = true;
			if (form.cond12.checked) formOK = true;
			if (form.cond13.checked) formOK = true;
			if (form.cond14.checked) formOK = true;
			if (form.cond15.checked) formOK = true;
			if (form.cond16.checked) formOK = true;
			if (form.cond17.checked) formOK = true;
			if (form.cond18.checked) formOK = true;
			form.cond103.value = cond_val;
			if (form.cond16.checked) {
				form.cond104.value = cond_val;
				if (! form.cond8.checked &&
					! form.cond9.checked &&
					! form.cond10.checked &&
					! form.cond11.checked &&
					! form.cond12.checked &&
					! form.cond13.checked &&
					! form.cond14.checked &&
					! form.cond15.checked &&
					! form.cond17.checked &&
					! form.cond18.checked) {
					form.cond103.value = "";
				}
			}
			break;
		case "3":
			form.cond105.value = "";
			form.cond106.value = "";
			if (form.cond19.checked) formOK = true;
			if (form.cond20.checked) formOK = true;
			if (form.cond21.checked) formOK = true;
			if (form.cond22.checked) formOK = true;
			if (form.cond23.checked) formOK = true;
			if (form.cond24.checked) formOK = true;
			form.cond105.value = cond_val;
			if (form.cond24.checked) {
				form.cond106.value = cond_val;
				if (! form.cond19.checked &&
					! form.cond20.checked &&
					! form.cond21.checked &&
					! form.cond22.checked &&
					! form.cond23.checked) {
					form.cond105.value = "";
				}
			}
			break;
		case "4":
			form.cond107.value = "";
			if (form.cond25.checked) formOK = true;
			if (form.cond32.checked) formOK = true;
			if (form.cond33.checked) formOK = true;
			form.cond107.value = cond_val;
			break;
		case "5":
			form.cond108.value = "";
			form.cond109.value = "";
			if (form.cond26.checked) formOK = true;
			if (form.cond27.checked) formOK = true;
			if (form.cond28.checked) formOK = true;
			if (form.cond29.checked) formOK = true;
			if (form.cond30.checked) formOK = true;
			form.cond109.value = cond_val;
			if (form.cond30.checked) {
				form.cond108.value = cond_val;
				if (! form.cond26.checked &&
					! form.cond27.checked &&
					! form.cond28.checked &&
					! form.cond29.checked) {
					form.cond109.value = "";
				}
			}
			break;
		default:
			formOK = false;
			break;
	}

	if (form.cond31.checked) formOK = true;

	if (formOK) {
		return true;
	} else {
		alert("条件を選択してください");
		return false;
	}
}

//大きな地図で見る
function custOpenGdlg() {
	var dlg = document.getElementById("cust_gdlg_dlg");
	if (!dlg) return;
	dlg.style.display = "block";
	dlg.style.height = (document.body.clientHeight+20)+"px";
}
function custCloseGdlg() {
	var dlg = document.getElementById("cust_gdlg_dlg");
	if (!dlg) return;
	var form = document.formCond;
	if (form) form.reset();
	dlg.style.display = "none";
}

//最寄駅ルート関連
function searchNearEki() {
	ZdcEmapNekiListObj = document.getElementById('ZdcEmapNekiList');
	ZdcEmapNekiLat = ZdcEmapMapShopDetailMrkId.lat;
	ZdcEmapNekiLon = ZdcEmapMapShopDetailMrkId.lon;
	ZdcEmapStationList(0);
}

function routeListEventSet() {
 $('.routeList li').click(function(e) {
  $('.routeList li').removeClass('ptb2').find('a').removeClass('select');
  $(this).addClass('ptb2').find('a').addClass('select');
 });
}

function clickRouteByStation() {
	if(ZdcEmapMapShopMrkCnt != null) {
		for( i = 0;i < ZdcEmapMapShopMrkCnt;i ++) {
			if (ZdcEmapMapShopMrkId[i]) {
				ZdcEmapMapShopMrkId[i].setMap(null);
				ZdcEmapMapShopMrkId[i] = null;
			}
		}
		ZdcEmapMapShopMrkCnt = 0;
	}
	ZdcEmapShopMsgClose();
	ZdcEmapSearchEventStop();
	ZdcEmapAddOptionalHistory('最寄り駅ルート','javascript:returnShopDetail()');
	ZdcEmapRouteType=1;
}

function searchCombRootDept(keyword) {
	if (keyword.trim() == '') return;
	formComb2.keyword.value = keyword;
	formComb3.keyword.value = keyword;
	if(ZdcEmapMapShopMrkCnt != null) {
		for( i = 0;i < ZdcEmapMapShopMrkCnt;i ++) {
			if (ZdcEmapMapShopMrkId[i]) {
				ZdcEmapMapShopMrkId[i].setMap(null);
				ZdcEmapMapShopMrkId[i] = null;
			}
		}
		ZdcEmapMapShopMrkCnt = 0;
	}
	ZdcEmapShopMsgClose();
	ZdcEmapSearchEventStop();
	ZdcEmapRouteClear();
	hideExceptAddr();
	ZdcEmapAddOptionalHistory('複合ルート','javascript:returnShopDetail()');
	ZdcEmapSrchCombRootDept(keyword);
}

function combRootDeptEventSet() {
	showCombDepature();
	hideCombRoot();
 $('.tab01 a').click(function(e) {
  e.preventDefault();
  var $tab = $('.tab01 a');
  var index = $tab.index(this);
  $tab.removeClass('current');
  $(this).addClass('current');
  $('#ZdcEmapSrchCombRootDept .routeBox').hide().eq(index).show();
 });
}

function combRootResultEventSet() {
	hideCombDepature();
	showCombRoot();
 $('.tab02 a').click(function(e) {
  ZdcEmapRouteClear();
  e.preventDefault();
  var $tab = $('.tab02 a');
  var index = $tab.index(this);
  $tab.removeClass('current');
  $(this).addClass('current');
  var $rd = $('#ZdcEmapSrchCombRootResult .routeBox')
   .hide().eq(index).show();
  if ($rd.find('a.route-draw')[0]) $rd.find('a.route-draw')[0].click();
  if (index === 1) {
   $rd.find('a.routeRank').removeClass('current').eq(0).addClass('current');
   $rd.find('.routeList3').hide().eq(0).show();
  }
 });
 $('.route-summary2 a.routeRank').click(function(e) {
  e.preventDefault();
  var self = this;
  $('.route-summary2 a.routeRank').each(function(i, elem) {
    if ($(elem).is($(self))) {
      if ($(elem).hasClass('current')) {
        ZdcEmapRouteClear();
      } else {
        $(elem).parent().next().find('a.route-draw')[0].click();
      }
      $(elem)
       .toggleClass('current')
       .parent().next().slideToggle();
    } else {
      $(elem)
       .removeClass('current')
       .parent().next().slideUp();
    }
  });
 });
 $('.tab02 a')[0].click();
}

function returnShopDetail() {
	ZdcEmapRouteClear();
	ZdcEmapRemoveOptionalHistory();
	formComb.keyword.value = "";
	$('.routeList li').removeClass('ptb2').find('a').removeClass('select');
	document.getElementById('dtlmapInit').click();
	hideCombDepature();
	hideCombRoot();
	showExceptAddr();
}

//印刷画面関連
var PrintParam = '';
function setPrintParam(param) {
	PrintParam = param;
}

function openShopPrint(url) {
	if(ZdcEmapRoutePolyline.length) {
		window.open(url+PrintParam);
	} else {
		window.open(url);
	}
}

//画面表示制御
function showExceptAddr() {
 $("#exceptAddr").show();
}
function hideExceptAddr() {
 $("#exceptAddr").hide();
}
function showCombDepature() {
 $("#combDepature").show();
}
function hideCombDepature() {
 $("#combDepature").hide();
}
function showCombRoot() {
 $("#combRoot").show();
}
function hideCombRoot() {
 $("#combRoot").hide();
}
