<!--{comment}-->タブ表示のエラー画面<!--{/comment}-->
<!--{def D_FREE_VAR:search_errpr_tab}-->
<!--{def type_ShopW}-->
<form name="form" action="{rval _urlSearch}" method="get" onSubmit="{rval _jsSetCond}(this, document.formCond);{rval _jsSetFreeParams}(this);{rval _jsEscapeKeyword}(this);">
	<input name="type" type="hidden" value="ShopW" />
	<!--{def D_FREE_VAR:postname}--><input name="col" type="hidden" value="FREE_SRCH" /><!--{/def}-->
	<!--{def D_FREE_VAR:postaddr}--><input name="col" type="hidden" value="FREE_SRCH_02" /><!--{/def}-->
	<input type="hidden" name="cond1" value="{rval cond1}" />
	<input type="hidden" name="keyword" class="searchFW" value="{rval keyword}" />
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
	<input type="hidden" name="scond200" value="1">
</form>
<table border="0" cellpadding="0" cellspacing="0" width="100%">
	<tr>
		<td align="center">
			<table id="searchShopListTitle">
				<tr>
					<td id="searchShopListTitleNm">
					<!--{def D_FREE_VAR:postarea}-->
					店舗リスト
					<!--{/def}-->
					<!--{ndef D_FREE_VAR:postarea}-->
						<!--{def keyword}-->
							<!--{def D_FREE_VAR:postname}-->店舗フリーワード<!--{/def}--><!--{def D_FREE_VAR:postaddr}-->住所フリーワード<!--{/def}-->:&nbsp;{rval keyword}
						<!--{/def}-->
						<!--{ndef keyword}-->
							<!--{def D_FREE_VAR:postname}-->店舗フリーワード<!--{/def}--><!--{def D_FREE_VAR:postaddr}-->住所フリーワード<!--{/def}-->:
						<!--{/def}-->
					<!--{/ndef}-->
					</td>
				</tr>
			</table>
			<ul class="tab03">
				<li<!--{def cond1_2}--> class="select"<!--{/def}--> onClick="document.form.cond1.value=2;document.form.search.click();">店舗</li>
				<li<!--{def cond1_3}--> class="select"<!--{/def}--> onClick="document.form.cond1.value=3;document.form.search.click();">ATM</li>
				<li<!--{def cond1_1}--> class="select"<!--{/def}--> onClick="document.form.cond1.value=1;document.form.search.click();">すべて</li>
			</ul>
			<table class="tab03_box">
				<tr>
					<td>
						<table id="searchErrorExp">
							<tr>
								<td style="padding: 10px;">{rval msg}</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>
<!--{/def}-->
<!--{comment}-->タブ非表示のエラー画面<!--{/comment}-->
<!--{ndef D_FREE_VAR:search_errpr_tab}-->
<table border="0" cellpadding="0" cellspacing="0" width="100%">
	<tr>
		<td align="center">
			<table id="searchErrorTitle">
				<tr>
					<td>検索エラー</td>
				</tr>
			</table>
			<table id="searchErrorExp">
				<tr>
					<td>{rval msg}</td>
				</tr>
			</table>
			<table id="searchErrorLink">
				<tr>
					<td><a href="javascript:{rval _jsBack};">再検索</a></td>
				</tr>
			</table>
		</td>
	</tr>
</table>
<!--{/ndef}-->
