<!DOCTYPE HTML>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="format-detection" content="telephone=no">
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1">
<title>郵便局・ATMをさがす - 日本郵政グループ</title>
<link rel="stylesheet" href="{rval D_DIR_COMPANY}css/common.css" media="all" />
<link rel="stylesheet" href="{rval D_DIR_COMPANY}css/form.css" media="all" />
<link rel="stylesheet" href="{rval D_DIR_COMPANY}css/layout.css" media="all" />
<link rel="stylesheet" href="{rval D_DIR_COMPANY}css/custom.css" media="all" />
</head>
<body>

<header class="page-header">
  <strong><a href="{rval D_URL_SEARCH_TOP}" class="logo01">郵便局・日本郵政グループ</a></strong>
<!--{ndef search_top}-->
  <a href="javascript:history.back();" class="button01 header-left"><span>戻る</span></a>
  <a href="{rval D_URL_SEARCH_TOP}" class="button01 header-right"><span>検索<br>TOP</span></a>
<!--{/ndef}-->
</header>

<div class="main">
<!--{def shop_inf_htm}-->
	<p class="cust_errorview">
	<span class="cust_errortitle">おさがしのページが見つかりませんでした</span><br><br>
	大変申し訳ございません。お客さまがおさがしのページを見つけることができませんでした。<br>
	おさがしのページは移動もしくは削除された可能性があります。<br>
	お手数ですが、<a href="{rval D_URL_SEARCH_TOP}">郵便局・ATM検索トップページ</a>から再度のご利用をお願いいたします。
	</p>
<!--{/def}-->
<!--{ndef shop_inf_htm}-->
	<p class="cust_errorview">
	{rval err}
	</p>
<!--{/ndef}-->
</div>

<footer>
  <small>&copy;JAPAN POST GROUP</small>
  <div class="footer-logo"><a href="javascript:void(0);" class="logo02">郵便局・日本郵政グループ</a></div>
</footer>

</body>
</html>
