	<div class="mt5 mb5">最寄り駅からルートを検索</div>
<!--{def msg}-->
	<div class="mt5 mb5">{rval msg}</div>
<!--{/def}-->
<!--{def list}-->
	<ul class="routeList">
	<!--{each list}-->
		<li><a href="javascript:clickRouteByStation();{rval list/_jsRoute};setPrintParam('{rval list/print_param}');">{rval list/name}</a></li>
	<!--{/each}-->
	</ul>
    <img src="{rval D_DIR_COMPANY}images/spacer.gif" style="display:none;" onload="routeListEventSet();" />
<!--{/def}-->
