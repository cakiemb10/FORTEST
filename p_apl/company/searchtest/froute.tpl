<div id="freeRoute">
	<div id="freeRouteAction">
		<a href="javascript:{rval _jsFreeRouteDraw}"><img src="{rval D_DIR_COMPANY}images/neki_route_icon.gif" alt="" width="9" height="9" />
			�Ͽ��濴����Υ롼�Ȥ�ɽ��</a><br />
	</div>
	<form action="" onSubmit="{rval _jsFreeRouteSearch};return false;" style="margin:0; padding:0;">
	<table id="freeRouteSearch">
		<tr><td class="freeRouteSearchTitle">�Ͽް�ư</td></tr>
		<tr><td class="freeRouteSearchEnt">
			<input id="freeRouteSearchEntText" type="text" name="keyword" value="{rval keyword}" />
			<input type="submit" value="����" />
		</td></tr>
		<tr><td class="freeRouteSearchGuide">���꡿͹���ֹ�����Ϥ��Ƥ�������</td></tr>
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
				<a href="javascript:{rval _jsPrev};">����</a>&nbsp;��&nbsp;
			<!--{/def}-->
				{rval start}-{rval end}��/{rval max}����
			<!--{def _jsNext}-->
				&nbsp;��&nbsp;<a href="javascript:{rval _jsNext};">����</a>
			<!--{/def}-->
			</td>
		</tr>
	</table>
<!--{/def}-->
</div>
