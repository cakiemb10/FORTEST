<div id="npoiList">
<!--{def msg}-->
	<div id="npoiListErrMsg">{rval msg}</div>
<!--{/def}-->
<!--{def list}-->
	<div id="npoiListHd">
		<table id="npoiListHeader">
			<tr>
				<td class="npoiListTitle">���ջ���</td>
				<td class="npoiListPage">
					<!--{def _jsPrev}-->
					<a href="javascript:{rval _jsPrev}">����</a>��
					<!--{/def}-->
					&nbsp;{rval start}-{rval end}��/{rval max}����
					<!--{def _jsNext}-->
					&nbsp;��<a href="javascript:{rval _jsNext}">����</a>
					<!--{/def}-->
				</td>
			</tr>
		</table>
	</div>
	<div id="npoiListDt">
		<table class="npoiListTableOut">
			<!--{each list}-->
			<tr>
				<td>
					<table class="npoiListTable">
						<tr>
							<td class="npoiListName">
								<img src="{rval list/jnrimg}" alt="{rval list/jnrnm}" width="16" height="16" />
								<a href="javascript:{rval list/_jsMsg}" onMouseOver="{rval list/_jsCurSet}" onMouseOut="{rval list/_jsCurRemove}">
									{rval list/name}</a>
							</td>
							<td class="npoiListDist" nowrap>
								&nbsp;({rval list/dist_m})
							</td>
						</tr>
						<tr>
							<td class="npoiListDtl" colspan="2">
								<table class="npoiAddrTable">
									<tr>
										<td>
											{rval list/addr}</td>
										<td style="text-align:right;" align="right">
											{rval list/tel}</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
			<!--{/each}-->
		</table>
	</div>
<!--{/def}-->
</div>
<!--{def list}-->
<div id="npoiListDistExp">��&nbsp;����ο������濴����ε�Υ�Ǥ�</div>
<!--{/def}-->