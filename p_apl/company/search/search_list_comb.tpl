<table border="0" cellpadding="0" cellspacing="0" id="searchCombFrame">
	<tr>
		<td colspan="3" align="center">
			<table id="searchCombListTitle">
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
			<table class="searchCombListPage">
				<tr>
					<th>Ź��̾</th>
					<td>
						<!--{def list/shop}-->
						{rval shop/max}����&nbsp;&nbsp;&nbsp;{rval shop/start}-{rval shop/end}��ɽ��
						&nbsp;&nbsp;<a href="{rval all_disp/_urlShop}">����ɽ��</a>
						<!--{/def}-->
					</td>
				</tr>
			</table>
			<table class="searchCombListData">
				<!--{def shop/msg}-->
				<tr>
					<td>
						<p>{rval shop/msg}</p>
					</td>
				</tr>
				<!--{/def}-->
				<!--{def list/shop}-->
				<!--{each list/shop}-->
				<tr>
					<td>
						<table class="searchCombListInnerTable">
							<tr>
								<td>
									<a href="{rval list/shop/_urlNameLink}">{rval list/shop/name}</a>
								</td>
							</tr>
							<tr>
								<td>
									{rval list/shop/addr}
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<!--{/each}-->
				<!--{/def}-->
			</table>
		</td>
	</tr>
	<tr>
		<td valign="top" style="width:345px;">
			<table class="searchCombListPage">
				<tr>
					<th>����</th>
					<td>
						<!--{def list/addr}-->
						{rval addr/max}����&nbsp;&nbsp;&nbsp;{rval addr/start}-{rval addr/end}��ɽ��
						&nbsp;&nbsp;<a href="{rval all_disp/_urlAddr}">����ɽ��</a>
						<!--{/def}-->
					</td>
				</tr>
			</table>
			<table class="searchCombListData">
				<!--{def addr/msg}-->
				<tr>
					<td>
						<p>{rval addr/msg}</p>
					</td>
				</tr>
				<!--{/def}-->
				<!--{def list/addr}-->
				<!--{each list/addr}-->
				<tr>
					<td>
						<a href="{rval list/addr/_urlNameLink}">{rval list/addr/name}</a>
					</td>
				</tr>
				<!--{/each}-->
				<!--{/def}-->
			</table>
		</td>
		<td>&nbsp;</td>
		<td valign="top" style="width:345px;">
			<table class="searchCombListPage">
				<tr>
					<th>��</th>
					<td>
						<!--{def list/st}-->
						{rval st/max}����&nbsp;&nbsp;&nbsp;{rval st/start}-{rval st/end}��ɽ��
						&nbsp;&nbsp;<a href="{rval all_disp/_urlSt}">����ɽ��</a>
						<!--{/def}-->
					</td>
				</tr>
			</table>
			<table class="searchCombListData">
				<!--{def st/msg}-->
				<tr>
					<td>
						<p>{rval st/msg}</p>
					</td>
				</tr>
				<!--{/def}-->
				<!--{def list/st}-->
				<!--{each list/st}-->
				<tr>
					<td>
						<a href="{rval list/st/_urlNameLink}">{rval list/st/name}{rval list/st/name2}</a>
					</td>
				</tr>
				<!--{/each}-->
				<!--{/def}-->
			</table>
		</td>
	</tr>
</table>
