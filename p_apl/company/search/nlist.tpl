<div id="kyotenList">
<!--{def msg}-->
	<div id="kyotenListErrMsg">{rval msg}</div>
<!--{/def}-->
<!--{def list}-->
	<div id="kyotenListHd">
		<table id="kyotenListHeader">
			<tr>
				<td class="kyotenListTitle">最寄り{rval D_USER_DEFNAME}一覧</td>
				<td class="kyotenListPage">
					<!--{def _jsPrev}-->
					<a href="javascript:{rval _jsPrev}">前へ</a>←
					<!--{/def}-->
					&nbsp;{rval start}-{rval end}件/{rval max}件中
					<!--{def _jsNext}-->
					&nbsp;→<a href="javascript:{rval _jsNext}">次へ</a>
					<!--{/def}-->
				</td>
			</tr>
		</table>
	</div>
	<div id="kyotenListDt">
		<table id="kyotenListTable">
			<!--{each list}-->
			<tr>
				<td id="nlist_row_{rval list/kid}">
					<div class="kyotenListName">
						<a href="{rval list/_urlDetail}" id="nlist_anc_up_{rval list/kid}"
						onMouseOver="{rval list/_jsCurSet};" onMouseOut="{rval list/_jsCurRemove};"
						>
							<!--{def list/col_20}-->
							<p>{rval list/col_20}</p>
							<!--{/def}-->
							<!--{def list/col_29}-->
							<p>{rval list/col_29}</p>
							<!--{/def}-->
							<!--{def list/col_37}-->
							<p>ゆうちょ銀行　{rval list/col_37}</p>
							<!--{/def}-->
						</a>
						<p class="listNote">
							<!--{def list/col_15_FWM_INFO}-->
							{rval list/col_15}
							<!--{/def}-->
							<!--{def list/col_15_FWM_EASTJPN}-->
							{rval list/col_15}
							<!--{/def}-->
							<!--{def list/col_15_FWM_KUMAMOTO}-->
							{rval list/col_15}
							<!--{/def}-->
						</p>
					</div>
					<!--{def list/addr}-->
					<div class="kyotenListData">
						{rval list/addr}
					</div>
					<!--{/def}-->
					<div class="kyotenListData">
						<!--{ndef list/icon_06}-->
						<!--{def list/col_119}-->
						<img src="{rval D_DIR_COMPANY}images/icon_yuubin.gif">
						<!--{/def}-->
						<!--{def list/col_127}-->
						<img src="{rval D_DIR_COMPANY}images/icon_yuucho.gif">
						<!--{/def}-->
						<!--{def list/col_143}-->
						<img src="{rval D_DIR_COMPANY}images/icon_hoken.gif">
						<!--{/def}-->
						<!--{def list/COLUMNS_yuuyuu_time_ANY_VALUE}-->
						<img src="{rval D_DIR_COMPANY}images/icon_yuuyuu.gif">
						<!--{/def}-->
						<!--{def list/col_135}-->
						<img src="{rval D_DIR_COMPANY}images/icon_atm.gif">
						<!--{/def}-->
						<!--{/ndef}-->
						<!--{def list/icon_06}-->
						<img src="{rval D_DIR_COMPANY}images/icon_atm_s.gif">
						<!--{/def}-->
						<!--{def list/col_14_GT_0}-->
						<img src="{rval D_DIR_COMPANY}images/icon_parking.gif">
						<!--{/def}-->
					</div>
					<a href="javascript:void(0);" id="nlist_anc_dw_{rval list/kid}" onFocus="this.blur();"></a>
				</td>
			</tr>
		<!--{/each}-->
		</table>
	</div>
<!--{/def}-->
</div>
