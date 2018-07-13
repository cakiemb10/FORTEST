<div id="npoiList">
<!--{def msg}-->
	<div id="npoiListErrMsg">{rval msg}</div>
<!--{/def}-->
<!--{def list}-->
	<div id="npoiListHd">
		<table id="npoiListHeader">
			<tr>
				<td class="npoiListTitle">件收卉肋</td>
				<td class="npoiListPage">
					<!--{def _jsPrev}-->
					<a href="javascript:{rval _jsPrev}">涟へ</a>
					<!--{/def}-->
					&nbsp;{rval start}-{rval end}凤/{rval max}凤面
					<!--{def _jsNext}-->
					&nbsp;ⅹ<a href="javascript:{rval _jsNext}">肌へ</a>
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
<div id="npoiListDistExp">∈&nbsp;∷柒の眶机は面看からの调违です</div>
<!--{/def}-->