<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
	<tr>
		<td align="center">
			<table id="searchListTitle">
				<tr>
					<td>
					<!--{def keyword}-->
						{rval title}:&nbsp;{rval keyword}
					<!--{/def}-->
					<!--{ndef keyword}-->
						{rval title}
					<!--{/def}-->
					</td>
				</tr>
			</table>
			<!--{def selname}-->
			<table id="searchListExp">
				<tr>
					<td>
						{rval selname}������Ǥ�������
					</td>
				</tr>
			</table>
			<!--{/def}-->
			<table id="searchListData">
			<!--{each list}-->
				<tr>
					<td><a href="{rval list/_urlNameLink}">{rval list/name}</a></td>
				</tr>
			<!--{/each}-->
			</table>
			<table class="searchListPage">
				<tr>
					<td>
					<!--{def _urlPrev}-->
						<a href="{rval _urlPrev}">����</a>&nbsp;��&nbsp;
					<!--{/def}-->
						{rval start}-{rval end}��/{rval max}����
					<!--{def _urlNext}-->
						&nbsp;��&nbsp;<a href="{rval _urlNext}">����</a>
					<!--{/def}-->
					</td>
				</tr>
			</table>
		</td>
	</tr>
</tbody>
</table>
