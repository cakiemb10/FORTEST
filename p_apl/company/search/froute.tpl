<div id="freeRoute">
	<div id="freeRouteAction">
		<a href="javascript:{rval _jsFreeRouteDraw}"><img src="{rval D_DIR_COMPANY}images/neki_route_icon.gif" alt="" width="9" height="9" />
			地図中心からのルートを表示</a><br />
	</div>
	<form action="" onSubmit="{rval _jsFreeRouteSearch};return false;" style="margin:0; padding:0;">
	<table id="freeRouteSearch">
		<tr><td class="freeRouteSearchTitle">地図移動</td></tr>
		<tr><td class="freeRouteSearchEnt">
			<input id="freeRouteSearchEntText" type="text" name="keyword" value="{rval keyword}" />
			<input type="submit" value="検索" />
		</td></tr>
		<tr><td class="freeRouteSearchGuide">住所／郵便番号を入力してください</td></tr>
	</table>
	</form>
<!--{def msg}-->
	<div id="freeRouteErrMsg">{rval msg}</div>
<!--{/def}-->
<!--{def list}-->
	<table id="freeRouteSearchList">
	<!--{each list}-->
		<tr><td><a href="javascript:{rval list/_jsNameLink}">{rval list/name}</a></td></tr>
	<!--{/each}-->
	</table>
	<table id="freeRouteSearchListPage">
		<tr>
			<td>
			<!--{def _jsPrev}-->
				<a href="javascript:{rval _jsPrev};">前へ</a>&nbsp;←&nbsp;
			<!--{/def}-->
				{rval start}-{rval end}件/{rval max}件中
			<!--{def _jsNext}-->
				&nbsp;→&nbsp;<a href="javascript:{rval _jsNext};">次へ</a>
			<!--{/def}-->
			</td>
		</tr>
	</table>
<!--{/def}-->
</div>
