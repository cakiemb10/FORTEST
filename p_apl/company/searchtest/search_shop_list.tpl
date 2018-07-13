<!--{def type_ShopW}-->
<form name="form" action="{rval _urlSearch}" method="get" onSubmit="{rval _jsSetCond}(this, document.formCond);{rval _jsSetFreeParams}(this);{rval _jsEscapeKeyword}(this);">
	<input name="type" type="hidden" value="ShopW" />
	<!--{def D_FREE_VAR:postname}--><input name="col" type="hidden" value="FREE_SRCH" /><!--{/def}-->
	<!--{def D_FREE_VAR:postaddr}--><input name="col" type="hidden" value="FREE_SRCH_02" /><!--{/def}-->
	<input type="hidden" name="cond1" value="{rval cond1}" />
	<input type="hidden" name="keyword" class="searchFW" value="{rval keyword}" />
	<input type="hidden" name="page" value="0" />
	<input type="hidden" name="his" value="{rval ZdcHistoryParm}" />
	<button type="submit" name="search" style="display:none;"></button>
</form>
<!--{/def}-->
<!--{def type_ShopA}-->
<form name="form" action="{rval _urlSearch}" method="get" onSubmit="{rval _jsSetCond}(this, document.formCond);{rval _jsSetFreeParams}(this);">
	<input name="type" type="hidden" value="ShopA" />
	<input type="hidden" name="area1" value="{rval CUST_AREA1}" />
	<input type="hidden" name="area2" value="{rval CUST_AREA2}" />
	<input type="hidden" name="cond1" value="{rval cond1}" />
	<input type="hidden" name="page" value="0" />
	<input type="hidden" name="his" value="{rval ZdcHistoryParm}" />
	<button type="submit" name="search" style="display:none;"></button>
</form>
<!--{/def}-->

<form name="formCond">
<!--{def cond2}--><input type="hidden" name="scond2" value="{rval cond2}"><!--{/def}-->
<!--{def cond3}--><input type="hidden" name="scond3" value="{rval cond3}"><!--{/def}-->
<!--{def cond4}--><input type="hidden" name="scond4" value="{rval cond4}"><!--{/def}-->
<!--{def cond5}--><input type="hidden" name="scond5" value="{rval cond5}"><!--{/def}-->
<!--{def cond6}--><input type="hidden" name="scond6" value="{rval cond6}"><!--{/def}-->
<!--{def cond7}--><input type="hidden" name="scond7" value="{rval cond7}"><!--{/def}-->
<!--{def cond8}--><input type="hidden" name="scond8" value="{rval cond8}"><!--{/def}-->
<!--{def cond9}--><input type="hidden" name="scond9" value="{rval cond9}"><!--{/def}-->
<!--{def cond10}--><input type="hidden" name="scond10" value="{rval cond10}"><!--{/def}-->
<!--{def cond11}--><input type="hidden" name="scond11" value="{rval cond11}"><!--{/def}-->
<!--{def cond12}--><input type="hidden" name="scond12" value="{rval cond12}"><!--{/def}-->
<!--{def cond13}--><input type="hidden" name="scond13" value="{rval cond13}"><!--{/def}-->
<!--{def cond14}--><input type="hidden" name="scond14" value="{rval cond14}"><!--{/def}-->
<!--{def cond15}--><input type="hidden" name="scond15" value="{rval cond15}"><!--{/def}-->
<!--{def cond16}--><input type="hidden" name="scond16" value="{rval cond16}"><!--{/def}-->
<!--{def cond17}--><input type="hidden" name="scond17" value="{rval cond17}"><!--{/def}-->
<!--{def cond18}--><input type="hidden" name="scond18" value="{rval cond18}"><!--{/def}-->
<!--{def cond19}--><input type="hidden" name="scond19" value="{rval cond19}"><!--{/def}-->
<!--{def cond20}--><input type="hidden" name="scond20" value="{rval cond20}"><!--{/def}-->
<!--{def cond21}--><input type="hidden" name="scond21" value="{rval cond21}"><!--{/def}-->
<!--{def cond22}--><input type="hidden" name="scond22" value="{rval cond22}"><!--{/def}-->
<!--{def cond23}--><input type="hidden" name="scond23" value="{rval cond23}"><!--{/def}-->
<!--{def cond24}--><input type="hidden" name="scond24" value="{rval cond24}"><!--{/def}-->
<!--{def cond25}--><input type="hidden" name="scond25" value="{rval cond25}"><!--{/def}-->
<!--{def cond26}--><input type="hidden" name="scond26" value="{rval cond26}"><!--{/def}-->
<!--{def cond27}--><input type="hidden" name="scond27" value="{rval cond27}"><!--{/def}-->
<!--{def cond28}--><input type="hidden" name="scond28" value="{rval cond28}"><!--{/def}-->
<!--{def cond29}--><input type="hidden" name="scond29" value="{rval cond29}"><!--{/def}-->
<!--{def cond30}--><input type="hidden" name="scond30" value="{rval cond30}"><!--{/def}-->
<!--{def cond31}--><input type="hidden" name="scond31" value="{rval cond31}"><!--{/def}-->
<!--{def cond32}--><input type="hidden" name="scond32" value="{rval cond32}"><!--{/def}-->
<!--{def cond33}--><input type="hidden" name="scond33" value="{rval cond33}"><!--{/def}-->
<!--{def cond101}--><input type="hidden" name="scond101" value="{rval cond101}"><!--{/def}-->
<!--{def cond102}--><input type="hidden" name="scond102" value="{rval cond102}"><!--{/def}-->
<!--{def cond103}--><input type="hidden" name="scond103" value="{rval cond103}"><!--{/def}-->
<!--{def cond104}--><input type="hidden" name="scond104" value="{rval cond104}"><!--{/def}-->
<!--{def cond105}--><input type="hidden" name="scond105" value="{rval cond105}"><!--{/def}-->
<!--{def cond106}--><input type="hidden" name="scond106" value="{rval cond106}"><!--{/def}-->
<!--{def cond107}--><input type="hidden" name="scond107" value="{rval cond107}"><!--{/def}-->
<!--{def cond108}--><input type="hidden" name="scond108" value="{rval cond108}"><!--{/def}-->
<!--{def cond109}--><input type="hidden" name="scond109" value="{rval cond109}"><!--{/def}-->
<input type="hidden" name="scond200" value="1">
</form>

<table border="0" cellpadding="0" cellspacing="0" width="100%">
	<tr>
		<td align="center">
			<table id="searchShopListTitle">
				<tr>
					<td id="searchShopListTitleNm">
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
			<table id="searchShopListExp">
				<tr>
					<td>
						{rval selname}を選んでください
					</td>
				</tr>
			</table>
			<!--{def cond1}-->
			<ul class="tab03">
				<li<!--{def cond1_2}--> class="select"<!--{/def}--> onClick="document.form.cond1.value=2;document.form.search.click();">店舗</li>
				<li<!--{def cond1_3}--> class="select"<!--{/def}--> onClick="document.form.cond1.value=3;document.form.search.click();">ATM</li>
				<li<!--{def cond1_1}--> class="select"<!--{/def}--> onClick="document.form.cond1.value=1;document.form.search.click();">すべて</li>
			</ul>
			<!--{/def}-->
			<!--{/def}-->
<!--{def cond1}-->
<table class="tab03_box">
	<tr><td>
<!--{/def}-->
			<table id="searchShopListData">
			<!--{each list}-->
				<tr>
					<td class="searchShopListDataNm">
						<a href="{rval list/_urlNameLink}">
							<!--{def list/col_20}-->
							<p><img src="{rval D_DIR_COMPANY}images/icon_post.gif">&nbsp;{rval list/col_20}</p>
							<!--{/def}-->
							<!--{def list/col_29}-->
							<p><img src="{rval D_DIR_COMPANY}images/icon_post.gif">&nbsp;{rval list/col_29}</p>
							<!--{/def}-->
							<!--{def list/col_37}-->
							<p><img src="{rval D_DIR_COMPANY}images/icon_bank.gif">&nbsp;ゆうちょ銀行　{rval list/col_37}</p>
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
					</td>
					<td class="searchShopListDataDt">
						<table class="searchShopListDtTable">
								<!--{def list/addr}-->
							<tr>
								<td>
									{rval list/addr}
								</td>
							</tr>
								<!--{/def}-->
						</table>
					</td>
					<td class="searchShopListDataDt">
						<table class="searchShopListDtTable">
							<tr>
								<td>
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
								</td>
							</tr>
						</table>
					</td>
				</tr>
			<!--{/each}--> 
			</table>
			<table id="searchShopListPage">
				<tr>
					<td>
		<!--{def _urlPrev}-->
						<a href="{rval _urlPrev}">前へ</a>&nbsp;←&nbsp;
		<!--{/def}-->
						{rval start}-{rval end}件/{rval max}件中
		<!--{def _urlNext}-->
						&nbsp;→&nbsp;<a href="{rval _urlNext}">次へ</a>
		<!--{/def}-->
					</td>
				</tr>
			</table>
<!--{def cond1}-->
		</td>
	</tr>
</table>
<!--{/def}-->
</td></tr></table>
