<table border="0" cellpadding="0" cellspacing="0" width="100%">
	<tr>
		<td align="center">
			<table id="searchAddrTableTitle">
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
			<table id="searchAddrTableExp">
				<tr>
					<td>
						{rval selname}������Ǥ�������
					</td>
				</tr>
			</table>
			<!--{/def}-->
			<!--{def area}-->
			<!-- ���ꥢɽ�� -->
			<table class="searchAddrTableData">
				<tr>
					<td colspan="3">
						<a href = "{rval _urlAreaLink}">{rval area}&nbsp;&nbsp;�ն���Ͽޤ�ɽ�����ޤ�</a>
					</td>
				</tr>
			</table>
			<!-- ���ꥢɽ�������ޤ� -->
			<!--{/def}-->
			<!--{def kana}-->
			<!-- ����ɽ�� -->
			<table class="searchAddrTableData">
				<tr>
					<!--{each kana}--> 
					<td><a href="{val kana/_urlLink}">{rval kana/on}</a></td>
					<!--{/each}-->
				</tr>
			</table>
			<!-- ����ɽ�������ޤ� -->
			<!--{/def}-->
			<table class="searchAddrTableData">
		<!--{each list}--> 
			<!--{def list/lf}-->
				</tr>
				<tr>
			<!--{/def}-->
			<!--{def list/name}--> 
				<td width="33%"><a href="{val list/_urlNameLink}">{rval list/name}</a></td>
			<!--{/def}-->
			<!--{def list/null}-->
				<td width="188" align="left"><br></td>
			<!--{/def}-->
		<!--{/each}-->
			</table>
			<table id="searchAddrTablePage">
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
</table>
