<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
	<meta http-equiv="content-type" content="text/html;charset=EUC-JP">
	<meta http-equiv="x-ua-compatible" content="IE=edge" >
	<meta http-equiv="x-ua-compatible" content="IE=EmulateIEedge" >
	<meta http-equiv="Content-Style-Type" content="text/css">
	<meta http-equiv="Content-Script-Type" content="text/javascript">
<!--{def shop_dtl_htm}-->
	<!--{comment}-->パターン�　斃絞惷秒影函�<!--{/comment}-->
		<!--{def col_05b}--><!--{ndef col_06b}--><!--{ndef col_07b}-->
			<meta name="description" content="こちらは{rval name}のページです。住所 {rval addr}。電話番号 {rval col_23}。">
		<!--{/ndef}--><!--{/ndef}--><!--{/def}-->
	<!--{comment}-->パターン�◆擇罎Δ罎α觚�単独】<!--{/comment}-->
		<!--{ndef col_05b}--><!--{def col_06b}--><!--{ndef col_07b}-->
			<meta name="description" content="こちらは日本郵便{rval name}のページです。住所 {rval addr}。電話番号 {rval col_33}。">
		<!--{/ndef}--><!--{/def}--><!--{/ndef}-->
	<!--{comment}-->パターン��【郵便局+ゆうゆう窓口併設】<!--{/comment}-->
		<!--{def col_05b}--><!--{def col_06b}--><!--{ndef col_07b}-->
			<meta name="description" content="こちらは{rval name}のページです。住所 {rval addr}。郵便・貯金・保険 {rval col_23}。集荷・配送 {rval col_33}。">
		<!--{/ndef}--><!--{/def}--><!--{/def}-->
	<!--{comment}-->パターン�ぁ斃絞惷�+ゆうちょ併設】<!--{/comment}-->
		<!--{def col_05b}--><!--{ndef col_06b}--><!--{def col_07b}-->
			<meta name="description" content="こちらは{rval name}のページです。住所 {rval addr}。郵便・保険 {rval col_23}。貯金 {rval col_41}。">
		<!--{/def}--><!--{/ndef}--><!--{/def}-->
	<!--{comment}-->パターン�ァ斃絞惷�+ゆうゆう窓口+ゆうちょ併設】<!--{/comment}-->
		<!--{def col_05b}--><!--{def col_06b}--><!--{def col_07b}-->
			<meta name="description" content="こちらは{rval name}のページです。住所 {rval addr}。郵便・保険 {rval col_23}。集荷・配送 {rval col_33}。貯金 {rval col_41}。">
		<!--{/def}--><!--{/def}--><!--{/def}-->
	<!--{comment}-->パターン�Α擇罎Δ舛臙影函�<!--{/comment}-->
		<!--{ndef col_05b}--><!--{ndef col_06b}--><!--{def col_07b}--><!--{def col_40l01}-->
			<meta name="description" content="こちらはゆうちょ銀行{rval name}のページです。住所 {rval addr}。電話番号 {rval col_41}。">
		<!--{/def}--><!--{/def}--><!--{/ndef}--><!--{/ndef}-->
	<!--{comment}-->パターン�А擇罎Δ舛�ATM】<!--{/comment}-->
		<!--{ndef col_05b}--><!--{ndef col_06b}--><!--{def col_07b}--><!--{def col_40l02}-->
			<meta name="description" content="こちらは{rval name}（ゆうちょATM）のページです。住所 {rval addr}。">
		<!--{/def}--><!--{/def}--><!--{/ndef}--><!--{/ndef}-->
	<title><!--{ndef col_05b}--><!--{ndef col_06b}--><!--{def col_07b}--><!--{def col_40l01}-->ゆうちょ銀行 <!--{/def}--><!--{/def}--><!--{/ndef}--><!--{/ndef}-->{rval name} (<!--{def col_11l01}-->北海道<!--{/def}--><!--{def col_11l02}-->青森県<!--{/def}--><!--{def col_11l03}-->岩手県<!--{/def}--><!--{def col_11l04}-->宮城県<!--{/def}--><!--{def col_11l05}-->秋田県<!--{/def}--><!--{def col_11l06}-->山形県<!--{/def}--><!--{def col_11l07}-->福島県<!--{/def}--><!--{def col_11l08}-->茨城県<!--{/def}--><!--{def col_11l09}-->栃木県<!--{/def}--><!--{def col_11l10}-->群馬県<!--{/def}--><!--{def col_11l11}-->埼玉県<!--{/def}--><!--{def col_11l12}-->千葉県<!--{/def}--><!--{def col_11l13}-->東京都<!--{/def}--><!--{def col_11l14}-->神奈川県<!--{/def}--><!--{def col_11l15}-->新潟県<!--{/def}--><!--{def col_11l16}-->富山県<!--{/def}--><!--{def col_11l17}-->石川県<!--{/def}--><!--{def col_11l18}-->福井県<!--{/def}--><!--{def col_11l19}-->山梨県<!--{/def}--><!--{def col_11l20}-->長野県<!--{/def}--><!--{def col_11l21}-->岐阜県<!--{/def}--><!--{def col_11l22}-->静岡県<!--{/def}--><!--{def col_11l23}-->愛知県<!--{/def}--><!--{def col_11l24}-->三重県<!--{/def}--><!--{def col_11l25}-->滋賀県<!--{/def}--><!--{def col_11l26}-->京都府<!--{/def}--><!--{def col_11l27}-->大阪府<!--{/def}--><!--{def col_11l28}-->兵庫県<!--{/def}--><!--{def col_11l29}-->奈良県<!--{/def}--><!--{def col_11l30}-->和歌山県<!--{/def}--><!--{def col_11l31}-->鳥取県<!--{/def}--><!--{def col_11l32}-->島根県<!--{/def}--><!--{def col_11l33}-->岡山県<!--{/def}--><!--{def col_11l34}-->広島県<!--{/def}--><!--{def col_11l35}-->山口県<!--{/def}--><!--{def col_11l36}-->徳島県<!--{/def}--><!--{def col_11l37}-->香川県<!--{/def}--><!--{def col_11l38}-->愛媛県<!--{/def}--><!--{def col_11l39}-->高知県<!--{/def}--><!--{def col_11l40}-->福岡県<!--{/def}--><!--{def col_11l41}-->佐賀県<!--{/def}--><!--{def col_11l42}-->長崎県<!--{/def}--><!--{def col_11l43}-->熊本県<!--{/def}--><!--{def col_11l44}-->大分県<!--{/def}--><!--{def col_11l45}-->宮崎県<!--{/def}--><!--{def col_11l46}-->鹿児島県<!--{/def}--><!--{def col_11l47}-->沖縄県<!--{/def}-->) - 日本郵政グループ</title>
<!--{/def}-->
<!--{def i_htm}-->
	<title>検索のしかたヘルプ - 日本郵政グループ</title>
<!--{/def}-->
<!--{ndef shop_dtl_htm}-->
<!--{ndef i_htm}-->
	<meta name="description" content="全国の郵便局、ゆうゆう窓口、ゆうちょ銀行、ATMを検索できます。">
	<title>郵便局・ATMをさがす - 日本郵政グループ</title>
<!--{/ndef}-->
<!--{/ndef}-->
<!--{def D_FREE_VAR:canonical_url}-->
	<link rel="canonical" href="{rval D_FREE_VAR:canonical_url}">
<!--{/def}-->
	<link href="{rval D_DIR_COMPANY}css/default.css" rel="stylesheet" type="text/css">
	<link href="{rval D_DIR_COMPANY}css/layout.css"  rel="stylesheet" type="text/css" media="screen,print">
	<link href="{rval D_DIR_COMPANY}css/base.css"    rel="stylesheet" type="text/css" media="screen,print">
	<link href="{rval D_DIR_COMPANY}css/route.css"   rel="stylesheet" type="text/css" media="screen,print">
	<link href="{rval D_DIR_COMPANY}css/print.css"   rel="stylesheet" type="text/css" media="print">
	<link href="{rval D_DIR_COMPANY}css/help.css"   rel="stylesheet" type="text/css" media="screen,print">
	<link href="{rval D_DIR_COMPANY}css/custom.css"  rel="stylesheet" type="text/css" media="screen,print">
	<!--{each css}-->
	<link href="{rval css/src}" type="text/css" rel="stylesheet" media="all">
	<!--{/each}-->
	<!--{each js}-->
	<script charset="{rval js/charset}" type="text/javascript" src="{rval js/src}"></script>
	<!--{/each}-->
<script type="text/javascript" src="{rval D_DIR_COMPANY}js/jquery-3.1.1.min.js"></script>
<script charset="EUC-JP" type="text/javascript" src="{rval D_DIR_COMPANY}js/custom.js"></script>
<script type="text/JavaScript">
<!--
function MM_findObj(n, d) { //v4.01
var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_showHideLayers() { //v6.0
var i,p,v,obj,args=MM_showHideLayers.arguments;
for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
obj.visibility=v; }
}

//-->
</script>
<!--{def index_htm}-->
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-82254335-1', 'auto');
  ga('send', 'pageview');

</script>
<!--{/def}-->
</head>
<body onload="{rval _jsInit}<!--{def shop_dtl_htm}-->searchNearEki();<!--{/def}-->">
<!--{def shop_dtl_htm}-->
<div class="cust_gdlg_back" id="cust_gdlg_dlg">
	<div class="cust_gdlg_panel" id="cust_gdlg_panel">
		<a href="javascript:void(0);" id="cust_gdlg_close" onclick="custCloseGdlg();"><img src="{rval D_DIR_COMPANY}images/close.png"></a>
		ここから先は外部サイトへ移動します<br>
		<div class="buttonGok"><a href="https://maps.google.com/maps?q={rval lat_wgs_dec},{rval lon_wgs_dec}" target="_blank" class="button-gok" onclick="custCloseGdlg();">OK</a></div>	</div>
</div>
<!--{/def}-->
<!--{def D_FREE_VAR:smt_banner_show}-->
<p>
<!--{ndef shop_dtl_htm}-->
	<a href="{rval D_FREE_VAR:sp_site_url}"><img src="{rval D_DIR_COMPANY}images/bn_sp.jpg"></a>
<!--{/ndef}-->
<!--{def shop_dtl_htm}-->
	<a href="{rval smturl_inf_https}"><img src="{rval D_DIR_COMPANY}images/bn_sp.jpg"></a>
<!--{/def}-->
</p>
<!--{/def}-->

<!--{def i_htm}-->
<a name="help_header"></a>
<!--{/def}-->
<div style="background-color: #fff;width:950px;margin:0 auto;padding-bottom:4px;">
	<div id="header" style="position:relative;border-top:0px solid white;background:url({rval D_DIR_COMPANY}images/headerback_r.gif) left top repeat-x;height:60px;">
		<div id="branding" style="padding:0;">
			<p id="logo">
				<a href="{rval D_DIR_BASE}">
					<img id="logo" src="{rval D_DIR_COMPANY}images/logo_holding.gif" alt="日本郵政グループ" />
				</a>
				<img id="slogan" src="{rval D_DIR_COMPANY}images/slogan.gif" alt="そばにいるから、できることがある" title="そばにいるから、できることがある"  />
			</p>
		</div>
		<span style="position: absolute; top: 30px; right: 10px;">
<!--{ndef shop_dtl_htm}-->
			<a href="{rval D_FREE_VAR:sp_site_url}">スマートフォン版はこちら</a>
<!--{/ndef}-->
<!--{def shop_dtl_htm}-->
			<a href="{rval smturl_inf_https}">スマートフォン版はこちら</a>
<!--{/def}-->
		</span>
	</div>
</div>

<!--{ndef i_htm}-->
<div id="wrapper">
<!--{/ndef}-->
