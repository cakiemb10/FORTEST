<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
	<tr>
		<td align="center">
			<table id="searchTableTitle">
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
			<table id="searchTableExp">
				<tr>
					<td>
						{rval selname}������Ǥ�������
					</td>
				</tr>
			</table>
			<!--{/def}-->
			<!--{def kana}-->
			<!-- ����ɽ�� -->
			<table class="searchTableData">
				<tr>
					<!--{each kana}--> 
					<td><a href="{val kana/_urlLink}">{rval kana/on}</a></td>
					<!--{/each}-->
				</tr>
			</table>
			<!-- ����ɽ�������ޤ� -->
			<!--{/def}-->
			<table class="searchTableData">
		<!--{each list}--> 
			<!--{def list/lf}-->
				</tr>
				<tr>
			<!--{/def}-->
			<!--{def list/name}--> 
					<td width="200">
						<div><a href="{val list/_urlNameLink}">{rval list/name}</a></div>
					<!--{def type_StL}-->
						<!--{def list/name2}-->
						<div class="searchTableRosenNm">{rval list/name2}</div>
						<!--{/def}-->
					<!--{/def}-->
					<!--{def type_StW}-->
						<!--{def list/linename}-->
						<div class="searchTableRosenNm">(<!--{def list/todname}-->{rval list/todname}��<!--{/def}-->{rval list/linename})</div>
						<!--{/def}-->
					<!--{/def}-->
					</td>
			<!--{/def}-->
			<!--{def list/null}-->
					<td width="200"><br></td>
			<!--{/def}-->
		<!--{/each}-->
			</table>
			<table id="searchTablePage">
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
