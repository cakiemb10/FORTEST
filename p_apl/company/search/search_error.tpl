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
<!-- Add form search -->
<!--{def type_ShopW}-->
<div id="condTabs">
	<form name="tab1-formSA" action="{rval _urlSearch}" method="get" onSubmit="return checkForm(this);{rval _jsSetFreeParams}(this);">
		<ul class="tabsetIn checktab">
			<li>
				<input id="tab1" type="radio" name="radio" value="" checked="checked">
				<label class="tabBtn" for="tab1" style="background-color:#CC0000;">郵便サービスから選ぶ</label>
				<div class="tabContents" style="border:4px solid #CC0000;">
					<input name="type" type="hidden" value="ShopW" />
					<!--{def D_FREE_VAR:postname}--><input name="col" type="hidden" value="FREE_SRCH" /><!--{/def}-->
					<!--{def D_FREE_VAR:postaddr}--><input name="col" type="hidden" value="FREE_SRCH_02" /><!--{/def}-->
					<!--{def D_FREE_VAR:postnum}-->
						<input name="col" type="hidden" value="COL_03" />
						<input name="mptn" type="hidden" value="F">
					<!--{/def}-->
					<input type="hidden" name="cond1" value="{rval cond1}" />
					<input type="hidden" name="keyword" class="searchFW" value="{rval keyword}" />
					<input type="hidden" name="cond101" value="">
					<input type="hidden" name="cond102" value="">
					<input type="hidden" name="cond200" value="1">
					<div>
						<div class="condSection">
							<dl class="">
								<dd class="">
									<input name="cond2" value="1" id="cond2" {rval cond2_sel} type="checkbox">
									<label for="cond2">郵便窓口</label>
								</dd>
								<dd class="">
									<input name="cond3" value="1" id="cond3" {rval cond3_sel} type="checkbox">
									<label for="cond3">印紙</label>
								</dd>
								<dd class="">
									<input name="cond4" value="1" id="cond4" {rval cond4_sel} type="checkbox">
									<label for="cond4">ゆうパック</label>
								</dd>
								<dd class="">
									<input name="cond5" value="1" id="cond5" {rval cond5_sel} type="checkbox">
									<label for="cond5">チルドゆうパック</label>
								</dd>
							</dl>
						</div>
						<div class="condSection">
							<dl class="">
								<dd class="">
									<input name="cond6" value="1" id="cond6" {rval cond6_sel} type="checkbox">
									<label for="cond6">内容証明</label>
								</dd>
								<dd class="">
									<input name="cond7" value="1" id="cond7" {rval cond7_sel} type="checkbox">
									<label for="cond7">ゆうゆう窓口</label>
								</dd>
							</dl>
						</div>
					</div>
					<div class="condCommon">
						<ul class="condCommonJkn">
							<?php
								$con_date_tab1 = '';
								if($_GET['cond101'] != ''){
									$con_date_tab1 = substr($_GET['cond101'],0,1);
								}
								if($_GET['cond102'] != ''){
									$con_date_tab1 = substr($_GET['cond102'],0,1);
								}
							?>
							<li>
								<input name="youbi1" <?php if($con_date_tab1 == '1'){echo 'checked';} ?> value="1" id="tab1-youbi1" type="radio">
								<label for="tab1-youbi1">平日</label>
							</li>
							<li>
								<input name="youbi1" <?php if($con_date_tab1 == '2'){echo 'checked';} ?> value="2" id="tab1-youbi2" type="radio">
								<label for="tab1-youbi2">土曜</label>
							</li>
							<li>
								<input name="youbi1" <?php if($con_date_tab1 == '3'){echo 'checked';} ?> value="3" id="tab1-youbi3" type="radio">
								<label for="tab1-youbi3">日曜・休日</label></li>
							<li>
							<li>
								<select name="timespan1">
									<option value="">ご利用時間（選択してください）</option>
									<?php 
										$con_time_tab1 = '';
										if(strlen($_GET['cond101']) >= 2){
											$con_time_tab1 = substr($_GET['cond101'], -2);
										}
										if(strlen($_GET['cond102']) >= 2){
											$con_time_tab1 = substr($_GET['cond102'], -2);
										}
									?>
									<option <?php if($con_time_tab1 == '01'){echo 'selected';} ?> value="01">7:00より前（0:00〜7:00）</option>
									<option <?php if($con_time_tab1 == '02'){echo 'selected';} ?> value="02">7:00〜8:00</option>
									<option <?php if($con_time_tab1 == '03'){echo 'selected';} ?> value="03">8:00〜9:00</option>
									<option <?php if($con_time_tab1 == '04'){echo 'selected';} ?> value="04">9:00〜10:00</option>
									<option <?php if($con_time_tab1 == '05'){echo 'selected';} ?> value="05">10:00〜11:00</option>
									<option <?php if($con_time_tab1 == '06'){echo 'selected';} ?> value="06">11:00〜12:00</option>
									<option <?php if($con_time_tab1 == '07'){echo 'selected';} ?> value="07">12:00〜13:00</option>
									<option <?php if($con_time_tab1 == '08'){echo 'selected';} ?> value="08">13:00〜14:00</option>
									<option <?php if($con_time_tab1 == '09'){echo 'selected';} ?> value="09">14:00〜15:00</option>
									<option <?php if($con_time_tab1 == '10'){echo 'selected';} ?> value="10">15:00〜16:00</option>
									<option <?php if($con_time_tab1 == '11'){echo 'selected';} ?> value="11">16:00〜17:00</option>
									<option <?php if($con_time_tab1 == '12'){echo 'selected';} ?> value="12">17:00〜18:00</option>
									<option <?php if($con_time_tab1 == '13'){echo 'selected';} ?> value="13">18:00〜19:00</option>
									<option <?php if($con_time_tab1 == '14'){echo 'selected';} ?> value="14">19:00〜20:00</option>
									<option <?php if($con_time_tab1 == '15'){echo 'selected';} ?> value="15">20:00〜21:00</option>
									<option <?php if($con_time_tab1 == '16'){echo 'selected';} ?> value="16">21:00〜22:00</option>
									<option <?php if($con_time_tab1 == '17'){echo 'selected';} ?> value="17">22:00〜23:00</option>
									<option <?php if($con_time_tab1 == '18'){echo 'selected';} ?> value="18">23:00〜24:00</option>
								</select>
							</li>
						</ul>								
					</div>
				</div>
			</li>
			<li>
				<input id="tab2" type="radio" name="radio" value="">
				<label class="tabBtn" for="tab2" style="background-color:#009900;">貯金サービスから選ぶ</label>
				<div class="tabContents" style="border:4px solid #009900;">
					<input type="hidden" name="cond103" value="">
					<input type="hidden" name="cond104" value="">
					<div>
						<div class="condSection">
							<dl class="">
								<dd class="">
									<input name="cond8" value="1" id="cond8" {rval cond8_sel} type="checkbox">
									<label for="cond8">貯金</label>
								</dd>
								<dd class="">
									<input name="cond14" value="1" id="cond14" {rval cond14_sel} type="checkbox">
									<label for="cond14">国債</label>
								</dd>
								<dd class="">
									<input name="cond15" value="1" id="cond15" {rval cond15_sel} type="checkbox">
									<label for="cond15">投資信託</label>
								</dd>
								<dd class="">
									<input name="cond16" value="1" id="cond16" {rval cond16_sel} type="checkbox">
									<label for="cond16">変額年金保険</label>
								</dd>
							</dl>
						</div>
						<div class="condSection">
							<dl class="">
								<dt>・送金・支払い・受取</dt>
								<dd class="">
									<input name="cond9" value="1" id="cond9"  {rval cond9_sel} type="checkbox">
									<label for="cond9">為替</label>
								</dd>
								<dd class="">
									<input name="cond10" value="1" id="cond10" {rval cond10_sel} type="checkbox">
									<label for="cond10">振替</label>
								</dd>
								<dd class="">
									<input name="cond11" value="1" id="cond11" {rval cond11_sel} type="checkbox">
									<label for="cond11">振込</label>
								</dd>
							</dl>
						</div>
						<div class="condSection">
							<dl class="">
								<dt>・国際送金・外貨</dt>
								<dd class="">
									<input name="cond12" value="1" id="cond12" {rval cond12_sel} type="checkbox">
									<label for="cond12">国際送金</label>
								</dd>
								<dd class="">
									<input name="cond13" value="1" id="cond13" {rval cond13_sel} type="checkbox">
									<label for="cond13">外貨両替</label>
								</dd>
							</dl>
						</div>
						<div class="condSection">
							<dl class="">
								<dt>・個人ローン</dt>
								<dd class="">
									<input name="cond17" value="1" id="cond17" {rval cond17_sel} type="checkbox">
									<label for="cond17">住宅ローン</label>
								</dd>
								<dd class="">
									<input name="cond18" value="1" id="cond18" {rval cond18_sel} type="checkbox">
									<label for="cond18">パーソナルローン(目的別ローン）、カードローン</label>
								</dd>
							</dl>
						</div>
					</div>
					<div class="condCommon">
						<ul class="condCommonJkn">
							<?php
								$con_date_tab2 = '';
								if($_GET['cond103'] != ''){
									$con_date_tab2 = substr($_GET['cond103'],0,1);
								}
								if($_GET['cond104'] != ''){
									$con_date_tab2 = substr($_GET['cond104'],0,1);
								}
							?>
							<li>
								<input name="youbi2" <?php if($con_date_tab2 == '1'){echo 'checked';} ?> value="1" id="tab2-youbi1" type="radio">
								<label for="tab2-youbi1">平日</label>
							</li>
							<li>
								<input name="youbi2" <?php if($con_date_tab2 == '2'){echo 'checked';} ?> value="2" id="tab2-youbi2" type="radio">
								<label for="tab2-youbi2">土曜</label>
							</li>
							<li>
								<input name="youbi2" <?php if($con_date_tab2 == '3'){echo 'checked';} ?> value="3" id="tab2-youbi3" type="radio">
								<label for="tab2-youbi3">日曜・休日</label>
							</li>
							<li>
								<select name="timespan2">
									<option value="">ご利用時間（選択してください）</option>
									<?php 
										$con_time_tab2 = '';
										if(strlen($_GET['cond103']) >= 2){
											$con_time_tab2 = substr($_GET['cond103'], -2);
										}
										if(strlen($_GET['cond104']) >= 2){
											$con_time_tab2 = substr($_GET['cond104'], -2);
										}
									?>
									<option <?php if($con_time_tab2 == '01'){echo 'selected';} ?> value="01">7:00より前（0:00〜7:00）</option>
									<option <?php if($con_time_tab2 == '02'){echo 'selected';} ?> value="02">7:00〜8:00</option>
									<option <?php if($con_time_tab2 == '03'){echo 'selected';} ?> value="03">8:00〜9:00</option>
									<option <?php if($con_time_tab2 == '04'){echo 'selected';} ?> value="04">9:00〜10:00</option>
									<option <?php if($con_time_tab2 == '05'){echo 'selected';} ?> value="05">10:00〜11:00</option>
									<option <?php if($con_time_tab2 == '06'){echo 'selected';} ?> value="06">11:00〜12:00</option>
									<option <?php if($con_time_tab2 == '07'){echo 'selected';} ?> value="07">12:00〜13:00</option>
									<option <?php if($con_time_tab2 == '08'){echo 'selected';} ?> value="08">13:00〜14:00</option>
									<option <?php if($con_time_tab2 == '09'){echo 'selected';} ?> value="09">14:00〜15:00</option>
									<option <?php if($con_time_tab2 == '10'){echo 'selected';} ?> value="10">15:00〜16:00</option>
									<option <?php if($con_time_tab2 == '11'){echo 'selected';} ?> value="11">16:00〜17:00</option>
									<option <?php if($con_time_tab2 == '12'){echo 'selected';} ?> value="12">17:00〜18:00</option>
									<option <?php if($con_time_tab2 == '13'){echo 'selected';} ?> value="13">18:00〜19:00</option>
									<option <?php if($con_time_tab2 == '14'){echo 'selected';} ?> value="14">19:00〜20:00</option>
									<option <?php if($con_time_tab2 == '15'){echo 'selected';} ?> value="15">20:00〜21:00</option>
									<option <?php if($con_time_tab2 == '16'){echo 'selected';} ?> value="16">21:00〜22:00</option>
									<option <?php if($con_time_tab2 == '17'){echo 'selected';} ?> value="17">22:00〜23:00</option>
									<option <?php if($con_time_tab2 == '18'){echo 'selected';} ?> value="18">23:00〜24:00</option>
								</select>
							</li>
						</ul>
					</div>
				</div>
			</li>
			<li>
				<input id="tab3" type="radio" name="radio" value="">
				<label class="tabBtn" for="tab3" style="background-color:#0000CC;">保険サービスから選ぶ</label>
				<div class="tabContents" style="border:4px solid #0000CC;">
					<input type="hidden" name="cond105" value="">
					<input type="hidden" name="cond106" value="">
					<div>
						<div class="condSection">
							<dl class="">
								<dd class="">
									<input name="cond19" value="1" id="cond19" {rval cond19_sel} type="checkbox">
									<label for="cond19">生命保険</label>
								</dd>
								<dd class="">
									<input name="cond22" value="1" id="cond22" {rval cond22_sel} type="checkbox">
									<label for="cond22">がん保険</label>
								</dd>
								<dd class="">
									<input name="cond23" value="1" id="cond23" {rval cond23_sel} type="checkbox">
									<label for="cond23">引受条件緩和型医療保険</label>
								</dd>
								<dd class="">
									<input name="cond24" value="1" id="cond24" {rval cond24_sel} type="checkbox">
									<label for="cond24">変額年金保険</label>
								</dd>
							</dl>
						</div>
						<div class="condSection">
							<dl class="">
								<dt>・損害保険</dt>
								<dd class="">
									<input name="cond20" value="1" id="cond20" {rval cond20_sel} type="checkbox">
									<label for="cond20">バイク自賠責保険</label>
								</dd>
								<dd class="">
									<input name="cond21" value="1" id="cond21" {rval cond21_sel} type="checkbox">
									<label for="cond21">自動車保険</label>
								</dd>
							</dl>
						</div>
					</div>
					<div class="condCommon">
						<ul class="condCommonJkn">
							<?php
								$con_date_tab3 = '';
								if($_GET['cond105'] != ''){
									$con_date_tab3 = substr($_GET['cond105'],0,1);
								}
								if($_GET['cond106'] != ''){
									$con_date_tab3 = substr($_GET['cond106'],0,1);
								}
							?>
							<li>
								<input name="youbi3" <?php if($con_date_tab3 == '1'){echo 'checked';} ?> value="1" id="tab3-youbi1" type="radio">
								<label for="tab3-youbi1">平日</label>
							</li>
							<li>
								<input name="youbi3" <?php if($con_date_tab3 == '2'){echo 'checked';} ?> value="2" id="tab3-youbi2" type="radio">
								<label for="tab3-youbi2">土曜</label>
							</li>
							<li>
								<input name="youbi3" <?php if($con_date_tab3 == '3'){echo 'checked';} ?> value="3" id="tab3-youbi3" type="radio">
								<label for="tab3-youbi3">日曜・休日</label>
							</li>
							<li>
								<select name="timespan3">
									<option value="">ご利用時間（選択してください）</option>
									<?php 
										$con_time_tab3 = '';
										if(strlen($_GET['cond105']) >= 2){
											$con_time_tab3 = substr($_GET['cond105'], -2);
										}
										if(strlen($_GET['cond106']) >= 2){
											$con_time_tab3 = substr($_GET['cond106'], -2);
										}
									?>
									<option <?php if($con_time_tab3 == '01'){echo 'selected';} ?> value="01">7:00より前（0:00〜7:00）</option>
									<option <?php if($con_time_tab3 == '02'){echo 'selected';} ?> value="02">7:00〜8:00</option>
									<option <?php if($con_time_tab3 == '03'){echo 'selected';} ?> value="03">8:00〜9:00</option>
									<option <?php if($con_time_tab3 == '04'){echo 'selected';} ?> value="04">9:00〜10:00</option>
									<option <?php if($con_time_tab3 == '05'){echo 'selected';} ?> value="05">10:00〜11:00</option>
									<option <?php if($con_time_tab3 == '06'){echo 'selected';} ?> value="06">11:00〜12:00</option>
									<option <?php if($con_time_tab3 == '07'){echo 'selected';} ?> value="07">12:00〜13:00</option>
									<option <?php if($con_time_tab3 == '08'){echo 'selected';} ?> value="08">13:00〜14:00</option>
									<option <?php if($con_time_tab3 == '09'){echo 'selected';} ?> value="09">14:00〜15:00</option>
									<option <?php if($con_time_tab3 == '10'){echo 'selected';} ?> value="10">15:00〜16:00</option>
									<option <?php if($con_time_tab3 == '11'){echo 'selected';} ?> value="11">16:00〜17:00</option>
									<option <?php if($con_time_tab3 == '12'){echo 'selected';} ?> value="12">17:00〜18:00</option>
									<option <?php if($con_time_tab3 == '13'){echo 'selected';} ?> value="13">18:00〜19:00</option>
									<option <?php if($con_time_tab3 == '14'){echo 'selected';} ?> value="14">19:00〜20:00</option>
									<option <?php if($con_time_tab3 == '15'){echo 'selected';} ?> value="15">20:00〜21:00</option>
									<option <?php if($con_time_tab3 == '16'){echo 'selected';} ?> value="16">21:00〜22:00</option>
									<option <?php if($con_time_tab3 == '17'){echo 'selected';} ?> value="17">22:00〜23:00</option>
									<option <?php if($con_time_tab3 == '18'){echo 'selected';} ?> value="18">23:00〜24:00</option>
								</select>
							</li>
						</ul>
					</div>
				</div>
			</li>
			<li>
				<input id="tab4" type="radio" name="radio" value="">
				<label class="tabBtn" for="tab4" style="background-color:#009900;">ATMから選ぶ</label>
				<div class="tabContents" style="border:4px solid #009900;">
					<input type="hidden" name="cond107" value="">
					<div>
						<div class="condSection">
							<dl class="">
								<dd class="">
									<input name="cond25" value="1" id="cond25" {rval cond25_sel} type="checkbox">
									<label for="cond25">払込用紙による通常払込み</label>
								</dd>
								<dd class="">
									<input name="cond32" value="1" id="cond32" {rval cond32_sel} type="checkbox">
									<label for="cond32">硬貨でのお取り扱い</label>
								</dd>
								<dd class="">
									<input name="cond33" value="1" id="cond33" {rval cond33_sel} type="checkbox">
									<label for="cond33">通帳を利用できないATMを除く</label>
								</dd>
							</dl>
						</div>
					</div>
					<div class="condCommon">
						<ul class="condCommonJkn">
							<?php
								$con_date_tab4 = '';
								if($_GET['cond107'] != ''){
									$con_date_tab4 = substr($_GET['cond107'],0,1);
								}
							?>
							<li>
								<input name="youbi4" <?php if($con_date_tab4 == '1'){echo 'checked';} ?> value="1" id="tab4-youbi1" type="radio">
								<label for="tab4-youbi1">平日</label>
							</li>
							<li>
								<input name="youbi4" <?php if($con_date_tab4 == '2'){echo 'checked';} ?> value="2" id="tab4-youbi2" type="radio">
								<label for="tab4-youbi2">土曜</label>
							</li>
							<li>
								<input name="youbi4" <?php if($con_date_tab4 == '3'){echo 'checked';} ?> value="3" id="tab4-youbi3" type="radio">
								<label for="tab4-youbi3">日曜・休日</label>
							</li>
							<li>
								<select name="timespan4">
									<option value="">ご利用時間（選択してください）</option>
									<?php 
										$con_time_tab4 = '';
										if(strlen($_GET['cond107']) >= 2){
											$con_time_tab4 = substr($_GET['cond107'], -2);
										}
									?>
									<option <?php if($con_time_tab4 == '01'){echo 'selected';} ?> value="01">7:00より前（0:00〜7:00）</option>
									<option <?php if($con_time_tab4 == '02'){echo 'selected';} ?> value="02">7:00〜8:00</option>
									<option <?php if($con_time_tab4 == '03'){echo 'selected';} ?> value="03">8:00〜9:00</option>
									<option <?php if($con_time_tab4 == '04'){echo 'selected';} ?> value="04">9:00〜10:00</option>
									<option <?php if($con_time_tab4 == '05'){echo 'selected';} ?> value="05">10:00〜11:00</option>
									<option <?php if($con_time_tab4 == '06'){echo 'selected';} ?> value="06">11:00〜12:00</option>
									<option <?php if($con_time_tab4 == '07'){echo 'selected';} ?> value="07">12:00〜13:00</option>
									<option <?php if($con_time_tab4 == '08'){echo 'selected';} ?> value="08">13:00〜14:00</option>
									<option <?php if($con_time_tab4 == '09'){echo 'selected';} ?> value="09">14:00〜15:00</option>
									<option <?php if($con_time_tab4 == '10'){echo 'selected';} ?> value="10">15:00〜16:00</option>
									<option <?php if($con_time_tab4 == '11'){echo 'selected';} ?> value="11">16:00〜17:00</option>
									<option <?php if($con_time_tab4 == '12'){echo 'selected';} ?> value="12">17:00〜18:00</option>
									<option <?php if($con_time_tab4 == '13'){echo 'selected';} ?> value="13">18:00〜19:00</option>
									<option <?php if($con_time_tab4 == '14'){echo 'selected';} ?> value="14">19:00〜20:00</option>
									<option <?php if($con_time_tab4 == '15'){echo 'selected';} ?> value="15">20:00〜21:00</option>
									<option <?php if($con_time_tab4 == '16'){echo 'selected';} ?> value="16">21:00〜22:00</option>
									<option <?php if($con_time_tab4 == '17'){echo 'selected';} ?> value="17">22:00〜23:00</option>
									<option <?php if($con_time_tab4 == '18'){echo 'selected';} ?> value="18">23:00〜24:00</option>
								</select>
							</li>
						</ul>
					</div>
				</div>
			</li>
			<li>
				<input id="tab5" type="radio" name="radio" value="">
				<label class="tabBtn" for="tab5" style="background-color:#FF6600;">他サービスから選ぶ</label>
				<div class="tabContents" style="border:4px solid #FF6600;">
					<input type="hidden" name="cond108" value="">
					<input type="hidden" name="cond109" value="">
					<div>
						<div class="condSection">
							<dl class="">
								<dt>・地方公共団体</dt>
								<dd class="">
									<input name="cond26" value="1" id="cond26" {rval cond26_sel} type="checkbox">
									<label for="cond26">証明書交付事務</label>
								</dd>
								<dd class="">
									<input name="cond27" value="1" id="cond27" {rval cond27_sel} type="checkbox">
									<label for="cond27">受託販売事務</label>
								</dd>
								<dd class="">
									<input name="cond28" value="1" id="cond28" {rval cond28_sel} type="checkbox">
									<label for="cond28">受託交付事務</label>
								</dd>
								<dd class="">
									<input name="cond29" value="1" id="cond29" {rval cond29_sel} type="checkbox">
									<label for="cond29">その他の地方公共団体事務</label>
								</dd>
							</dl>
						</div>
						<div class="condSection">
							<dl class="">
								<dd class="">
									<input name="cond30" value="1" id="cond30" {rval cond30_sel} type="checkbox">
									<label for="cond30">宝くじ</label>
								</dd>
							</dl>
						</div>
					</div>
					<div class="condCommon">
						<ul class="condCommonJkn">
							<?php
								$con_date_tab5 = '';
								if($_GET['cond108'] != ''){
									$con_date_tab5 = substr($_GET['cond108'],0,1);
								}
								if($_GET['cond109'] != ''){
									$con_date_tab5 = substr($_GET['cond109'],0,1);
								}
							?>
							<li>
								<input name="youbi5" <?php if($con_date_tab5 == '1'){echo 'checked';} ?> value="1" id="tab5-youbi1" type="radio">
								<label for="tab5-youbi1">平日</label>
							</li>
							<li>
								<input name="youbi5" <?php if($con_date_tab5 == '2'){echo 'checked';} ?> value="2" id="tab5-youbi2" type="radio">
								<label for="tab5-youbi2">土曜</label>
							</li>
							<li>
								<input name="youbi5" <?php if($con_date_tab5 == '3'){echo 'checked';} ?> value="3" id="tab5-youbi3" type="radio">
								<label for="tab5-youbi3">日曜・休日</label>
							</li>
							<li>
								<select name="timespan5">
									<option value="">ご利用時間（選択してください）</option>
									<?php 
										$con_time_tab5 = '';
										if(strlen($_GET['cond108']) >= 2){
											$con_time_tab5 = substr($_GET['cond108'], -2);
										}
										if(strlen($_GET['cond109']) >= 2){
											$con_time_tab5 = substr($_GET['cond109'], -2);
										}
									?>
									<option <?php if($con_time_tab5 == '01'){echo 'selected';} ?> value="01">7:00より前（0:00〜7:00）</option>
									<option <?php if($con_time_tab5 == '02'){echo 'selected';} ?> value="02">7:00〜8:00</option>
									<option <?php if($con_time_tab5 == '03'){echo 'selected';} ?> value="03">8:00〜9:00</option>
									<option <?php if($con_time_tab5 == '04'){echo 'selected';} ?> value="04">9:00〜10:00</option>
									<option <?php if($con_time_tab5 == '05'){echo 'selected';} ?> value="05">10:00〜11:00</option>
									<option <?php if($con_time_tab5 == '06'){echo 'selected';} ?> value="06">11:00〜12:00</option>
									<option <?php if($con_time_tab5 == '07'){echo 'selected';} ?> value="07">12:00〜13:00</option>
									<option <?php if($con_time_tab5 == '08'){echo 'selected';} ?> value="08">13:00〜14:00</option>
									<option <?php if($con_time_tab5 == '09'){echo 'selected';} ?> value="09">14:00〜15:00</option>
									<option <?php if($con_time_tab5 == '10'){echo 'selected';} ?> value="10">15:00〜16:00</option>
									<option <?php if($con_time_tab5 == '11'){echo 'selected';} ?> value="11">16:00〜17:00</option>
									<option <?php if($con_time_tab5 == '12'){echo 'selected';} ?> value="12">17:00〜18:00</option>
									<option <?php if($con_time_tab5 == '13'){echo 'selected';} ?> value="13">18:00〜19:00</option>
									<option <?php if($con_time_tab5 == '14'){echo 'selected';} ?> value="14">19:00〜20:00</option>
									<option <?php if($con_time_tab5 == '15'){echo 'selected';} ?> value="15">20:00〜21:00</option>
									<option <?php if($con_time_tab5 == '16'){echo 'selected';} ?> value="16">21:00〜22:00</option>
									<option <?php if($con_time_tab5 == '17'){echo 'selected';} ?> value="17">22:00〜23:00</option>
									<option <?php if($con_time_tab5 == '18'){echo 'selected';} ?> value="18">23:00〜24:00</option>
								</select>
							</li>
						</ul>
					</div>
				</div>
			</li>
		</ul>
		<div>
			<span class="park">駐車場の有無</span>
			<input name="cond31" value="1" id="tab5-cond31" {rval cond31_sel} type="checkbox">
			<label for="tab5-cond31">駐車場あり</label>
		</div>
		<div>
			<button type="submit" class="searchButton">検　索</button>
		</div>
	</form>	
</div>
<!--{/ndef}-->
