<span style="position: absolute; top: -36px; right: 0px;">
	<div class="select-box">
		<select onChange="(this.value ? location.href=this.value : '');">
			<option value="">language（Japanese）</option>
			<option value="{rval D_FREE_VAR:en_url}">English</option>
			<option value="{rval D_FREE_VAR:tw_url}">繁體中文</option>
			<option value="{rval D_FREE_VAR:cn_url}">&#31616;体中文</option>
			<option value="{rval D_FREE_VAR:ko_url}">&#54620;&#44397;&#50612;</option>
			<option value="{rval D_FREE_VAR:th_url}">&#3652;&#3607;&#3618;</option>
			<option value="{rval D_FREE_VAR:fr_url}">fran&ccedil;ais</option>
			<option value="{rval D_FREE_VAR:it_url}">italiano</option>
		</select>
	</div>
</span>
<div id="searchTopWrapper">
	<div class="section" id="headline">
		<div class="sectionInner">
			<table id="area_news" class="clearfix" valign="center">
				<tbody>
					<tr>
						<td id="info_flg" style="width:85px;height:33px;">
							<span style="margin-left:8px;color:#fff;font-size:15px;font-weight:bold;">お知らせ</span>
						</td>
						<td style="padding-top:5px;">
<!--{ndef D_FREE_VAR:nenshi}-->
							<p style="vertical-align:middle;">
							<a href="https://www.japanpost.jp/information/disaster.html" target="_blank">災害救助法が適用された地域の皆さまへの非常取扱いについて<img style="margin-left: 6px; vertical-align: middle; width: 9px; " width="9" height="9" alt="別ウィンドウで移動します" src="{rval D_DIR_COMPANY}/images/ico_external-window05.gif"></a><br>
							<a href="http://www.post.japanpost.jp/notification/saigai/index2.html" target="_blank">平成28年（2016年）熊本地震の影響について<img style="margin-left: 6px; vertical-align: middle; width: 9px; " width="9" height="9" alt="別ウィンドウで移動します" src="{rval D_DIR_COMPANY}/images/ico_external-window05.gif"></a>
							</p>
<!--{/ndef}-->
<!--{def D_FREE_VAR:nenshi}-->
							<p style="vertical-align:middle;">年末年始の郵便局・ATMの営業時間やサービスの取扱いは本サイトに掲載している内容と異なる場合がございますので、以下のお知らせやATMコーナーの掲示物にてご確認ください。<br>
							<a href="http://www.post.japanpost.jp/notification/productinformation/2017/1226_01.html" target="_blank">・年末年始の営業時間等のお知らせ（日本郵便）<img style="margin-left: 6px; vertical-align: middle; width: 9px; " width="9" height="9" alt="別ウィンドウで移動します" src="{rval D_DIR_COMPANY}/images/ico_external-window05.gif"></a><br>
							<a href="http://www.jp-bank.japanpost.jp/news/2017/news_id001267.html" target="_blank">・年末年始における各種サービスの取り扱いについて（ゆうちょ銀行）<img style="margin-left: 6px; vertical-align: middle; width: 9px; " width="9" height="9" alt="別ウィンドウで移動します" src="{rval D_DIR_COMPANY}/images/ico_external-window05.gif"></a>
							</p>
<!--{/def}-->
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<div id="searchTop">
		<div id="searchTopLeft">
			<div class="searchTopGroup" style="position: relative;">
				<div class="searchTopSubTitleL">
					日本地図からさがす
				</div>
				<form action="{rval _urlArea}" method="get" name="formArea" style="margin:0;padding:0;height:0;">
					<input name="area" type="hidden" />
				</form>
				<table class="searchTopEntTable">
					<tr>
						<td style="padding-top:5px;">
							<img src="{rval D_DIR_COMPANY}images/a1_area_map_top.gif?20171127" alt="map" usemap="#areaMapTopImgMap" id="areaMapTopImg" border="0" >
							<map name="areaMapTopImgMap" id="areaMapTopImgMap">
							<!-- 北海道 -->
							<area shape="rect" coords="448,32,513,136" href="javascript:{rval _jsArea}(document.formArea, '01a', document.formCond);" alt="北海道（西）" />
							<area shape="rect" coords="514,32,583,137" href="javascript:{rval _jsArea}(document.formArea, '01b', document.formCond);" alt="北海道（東）" />

							<!-- 東北 -->
							<area shape="rect" coords="448,179,487,215" href="javascript:{rval _jsArea}(document.formArea, '05', document.formCond);" alt="秋田" />
							<area shape="rect" coords="489,180,529,215" href="javascript:{rval _jsArea}(document.formArea, '03', document.formCond);" alt="岩手" />
							<area shape="rect" coords="448,142,530,178" href="javascript:{rval _jsArea}(document.formArea, '02', document.formCond);" alt="青森" />
							<area shape="poly" coords="449,217,486,218,484,251,458,252,458,235,447,235" href="javascript:{rval _jsArea}(document.formArea, '06', document.formCond);" alt="山形" />
							<area shape="rect" coords="489,217,522,254" href="javascript:{rval _jsArea}(document.formArea, '04', document.formCond);" alt="宮城" />
							<area shape="rect" coords="456,256,522,282" href="javascript:{rval _jsArea}(document.formArea, '07', document.formCond);" alt="福島" />

							<!-- 関東 -->
							<area shape="rect" coords="435,284,464,310" href="javascript:{rval _jsArea}(document.formArea, '10', document.formCond);" alt="群馬" />
							<area shape="rect" coords="465,285,492,311" href="javascript:{rval _jsArea}(document.formArea, '09', document.formCond);" alt="栃木" />
							<area shape="rect" coords="495,285,530,326" href="javascript:{rval _jsArea}(document.formArea, '08', document.formCond);" alt="茨城" />
							<area shape="rect" coords="436,313,493,332" href="javascript:{rval _jsArea}(document.formArea, '11', document.formCond);" alt="埼玉" />
							<area shape="rect" coords="495,329,528,380" href="javascript:{rval _jsArea}(document.formArea, '12', document.formCond);" alt="千葉" />
							<area shape="rect" coords="453,335,494,354" href="javascript:{rval _jsArea}(document.formArea, '13', document.formCond);" alt="東京" />
							<area shape="rect" coords="453,356,492,375" href="javascript:{rval _jsArea}(document.formArea, '14', document.formCond);" alt="神奈川" />

							<!-- 中部 -->
							<area shape="poly" coords="409,282,409,273,393,252,401,244,448,238,453,239,455,280" href="javascript:{rval _jsArea}(document.formArea, '15', document.formCond);" alt="新潟" />
							<area shape="rect" coords="373,275,405,307" href="javascript:{rval _jsArea}(document.formArea, '16', document.formCond);" alt="富山" />
							<area shape="rect" coords="337,266,369,307" href="javascript:{rval _jsArea}(document.formArea, '17', document.formCond);" alt="石川" />
							<area shape="rect" coords="321,310,369,335" href="javascript:{rval _jsArea}(document.formArea, '18', document.formCond);" alt="福井" />
							<area shape="rect" coords="370,310,397,362" href="javascript:{rval _jsArea}(document.formArea, '21', document.formCond);" alt="岐阜" />
							<area shape="rect" coords="425,334,451,360" href="javascript:{rval _jsArea}(document.formArea, '19', document.formCond);" alt="山梨" />
							<area shape="rect" coords="367,364,403,392" href="javascript:{rval _jsArea}(document.formArea, '23', document.formCond);" alt="愛知" />
							<area shape="poly" coords="406,365,450,364,451,378,462,378,461,394,443,394,442,381,438,380,422,392,407,391" href="javascript:{rval _jsArea}(document.formArea, '22', document.formCond);" alt="静岡" />
							<area shape="poly" coords="409,285,432,285,432,333,422,333,422,361,399,360,400,312,409,312" href="javascript:{rval _jsArea}(document.formArea, '20', document.formCond);" alt="長野" />

							<!-- 近畿 -->
							<area shape="rect" coords="344,336,364,360" href="javascript:{rval _jsArea}(document.formArea, '25', document.formCond);" alt="滋賀" />
							<area shape="rect" coords="344,362,364,414" href="javascript:{rval _jsArea}(document.formArea, '24', document.formCond);" alt="三重" />
							<area shape="poly" coords="300,321,320,321,319,336,342,336,342,359,322,358,323,350,300,351" href="javascript:{rval _jsArea}(document.formArea, '26', document.formCond);" alt="京都" />
							<area shape="rect" coords="322,363,341,399" href="javascript:{rval _jsArea}(document.formArea, '29', document.formCond);" alt="奈良" />
							<area shape="rect" coords="298,355,319,384" href="javascript:{rval _jsArea}(document.formArea, '27', document.formCond);" alt="大阪" />
							<area shape="rect" coords="269,321,296,379" href="javascript:{rval _jsArea}(document.formArea, '28', document.formCond);" alt="兵庫" />
							<area shape="poly" coords="341,415,341,402,319,401,319,386,302,386,302,415" href="javascript:{rval _jsArea}(document.formArea, '30', document.formCond);" alt="和歌山" />

							<!-- 中国 -->
							<area shape="rect" coords="237,321,269,343" href="javascript:{rval _jsArea}(document.formArea, '31', document.formCond);" alt="鳥取" />
							<area shape="rect" coords="239,346,268,369" href="javascript:{rval _jsArea}(document.formArea, '33', document.formCond);" alt="岡山" />
							<area shape="rect" coords="202,321,234,343" href="javascript:{rval _jsArea}(document.formArea, '32', document.formCond);" alt="島根" />
							<area shape="rect" coords="204,346,234,368" href="javascript:{rval _jsArea}(document.formArea, '34', document.formCond);" alt="広島" />
							<area shape="rect" coords="174,322,199,367" href="javascript:{rval _jsArea}(document.formArea, '35', document.formCond);" alt="山口" />

							<!-- 四国 -->
							<area shape="rect" coords="185,377,233,413" href="javascript:{rval _jsArea}(document.formArea, '38', document.formCond);" alt="愛媛" />
							<area shape="rect" coords="236,378,280,395" href="javascript:{rval _jsArea}(document.formArea, '37', document.formCond);" alt="香川" />
							<area shape="rect" coords="237,397,281,415" href="javascript:{rval _jsArea}(document.formArea, '36', document.formCond);" alt="徳島" />
							<area shape="rect" coords="186,416,279,442" href="javascript:{rval _jsArea}(document.formArea, '39', document.formCond);" alt="高知" />

							<!-- 九州・沖縄 -->
							<area shape="poly" coords="125,348,125,380,144,379,145,359,162,359,162,348" href="javascript:{rval _jsArea}(document.formArea, '40', document.formCond);" alt="福岡" />
							<area shape="rect" coords="103,348,122,383" href="javascript:{rval _jsArea}(document.formArea, '41', document.formCond);" alt="佐賀" />
							<area shape="rect" coords="78,348,101,391" href="javascript:{rval _jsArea}(document.formArea, '42', document.formCond);" alt="長崎" />
							<area shape="rect" coords="148,362,170,393" href="javascript:{rval _jsArea}(document.formArea, '44', document.formCond);" alt="大分" />
							<area shape="rect" coords="108,383,144,423" href="javascript:{rval _jsArea}(document.formArea, '43', document.formCond);" alt="熊本" />
							<area shape="rect" coords="147,395,169,425" href="javascript:{rval _jsArea}(document.formArea, '45', document.formCond);" alt="宮崎" />
							<area shape="rect" coords="107,427,167,459" href="javascript:{rval _jsArea}(document.formArea, '46', document.formCond);" alt="鹿児島" />
							<area shape="rect" coords="21,426,42,458" href="javascript:{rval _jsArea}(document.formArea, '47', document.formCond);" alt="沖縄" />

							</map>

						</td>
					</tr>
				</table>
				<div class="fsMap" style="position: absolute; top: 60px; left: 10px;">
					<form action="nmap.htm" method="get" name="formFSMap" onSubmit="{rval _jsSetCond}(this, document.formCond);{rval _jsSetFreeParams}(this);">
						<input name="lat" type="hidden" value="{rval D_FREE_VAR:free_scroll_lat}" />
						<input name="lon" type="hidden" value="{rval D_FREE_VAR:free_scroll_lon}" />
						<button type="submit" class="fsMapButton">
							フリースクロール地図でさがす
						</button>
					</form>
				</div>
			</div>
		</div>
		<div id="searchTopRight">
			<div class="searchTopGroup">
				<div class="searchTopSubTitleL">
					店舗・ATM名からさがす
				</div>
				<table class="searchTopEntTable">
					<tr>
						<td class="searchTopEnt1">
							<form name="formSW" action="{rval _urlSearch}" method="get" onSubmit="{rval _jsSetCond}(this, document.formCond);{rval _jsSetFreeParams}(this);{rval _jsEscapeKeyword}(this);">
								<input name="type" type="hidden" value="ShopW" />
								<input name="col" type="hidden" value="FREE_SRCH" />
								<input type="hidden" name="cond1" value="2" />
								<input type="text" name="keyword" class="searchFW" value="{rval fwshop}" placeholder="例：新宿郵便局、しんじゅく">
								<button type="submit" class="searchButton">
									検　索
								</button>
							</form>
						</td>
					</tr>
				</table>
			</div>
			<div class="searchTopGroup">
				<div class="searchTopSubTitleR">
					住所からさがす
				</div>
				<table class="searchTopEntTable">
					<tr>
						<td class="searchTopEnt1" colspan="2" style="padding-bottom:4px;">
							<form name="formSW2" action="{rval _urlSearch}" method="get" onSubmit="{rval _jsSetCond}(this, document.formCond);{rval _jsSetFreeParams}(this);{rval _jsEscapeKeyword}(this);">
								<input name="type" type="hidden" value="ShopW" />
								<input name="col" type="hidden" value="FREE_SRCH_02" />
								<input type="hidden" name="cond1" value="2" />
								<input type="text" name="keyword" class="searchFW" value="{rval fwshop}" placeholder="例：宮城県仙台市、仙台市">
								<button type="submit" class="searchButton">
									検　索
								</button>
							</form>
						</td>
					</tr>
				</table>
				<table class="searchTopEntTable">
					<tr>
						<td class="searchTopTypeNm">
							住所リストから選択
						</td>
						<td class="searchTopEnt2" style="text-align:right;padding-right:7px;">
							<form name="formSA" action="{rval _urlSearch}" method="get" onSubmit="{rval _jsSetCond}(this, document.formCond);{rval _jsSetFreeParams}(this);">
								<input name="type" type="hidden" value="ShopA" />
								<input type="hidden" name="cond1" value="1" />
								<input name="areaptn" type="hidden" value="1" />
								<select name="area1" class="searchTodSelect">
<option value="">全国</option>
<option value="01">北海道</option>
<option value="02">青森県</option>
<option value="03">岩手県</option>
<option value="04">宮城県</option>
<option value="05">秋田県</option>
<option value="06">山形県</option>
<option value="07">福島県</option>
<option value="08">茨城県</option>
<option value="09">栃木県</option>
<option value="10">群馬県</option>
<option value="11">埼玉県</option>
<option value="12">千葉県</option>
<option value="13">東京都</option>
<option value="14">神奈川県</option>
<option value="15">新潟県</option>
<option value="16">富山県</option>
<option value="17">石川県</option>
<option value="18">福井県</option>
<option value="19">山梨県</option>
<option value="20">長野県</option>
<option value="21">岐阜県</option>
<option value="22">静岡県</option>
<option value="23">愛知県</option>
<option value="24">三重県</option>
<option value="25">滋賀県</option>
<option value="26">京都府</option>
<option value="27">大阪府</option>
<option value="28">兵庫県</option>
<option value="29">奈良県</option>
<option value="30">和歌山県</option>
<option value="31">鳥取県</option>
<option value="32">島根県</option>
<option value="33">岡山県</option>
<option value="34">広島県</option>
<option value="35">山口県</option>
<option value="36">徳島県</option>
<option value="37">香川県</option>
<option value="38">愛媛県</option>
<option value="39">高知県</option>
<option value="40">福岡県</option>
<option value="41">佐賀県</option>
<option value="42">長崎県</option>
<option value="43">熊本県</option>
<option value="44">大分県</option>
<option value="45">宮崎県</option>
<option value="46">鹿児島県</option>
<option value="47">沖縄県</option>
								</select>
								<button type="submit" class="searchButton">
									リスト表示
								</button>
							</form>
						</td>
					</tr>
				</table>
			</div>
			<div class="searchTopGroup">
				<div class="searchTopSubTitleR">
					駅名・路線図からさがす
				</div>
				<table class="searchTopEntTable">
					<tr>
						<td class="searchTopEnt1" colspan="2" style="padding-bottom:4px;">
							<form name="formStW" action="{rval _urlSearch}" method="get" onSubmit="{rval _jsSetCond}(this, document.formCond);{rval _jsSetFreeParams}(this);{rval _jsEscapeKeyword}(this);">
								<input name="type"   type="hidden" value="StW" />
								<input type="text" name="keyword" class="searchFW" value="{rval fweki}" placeholder="例：上野、上野駅">
								<button type="submit" class="searchButton">
									検　索
								</button>
							</form>
						</td>
					</tr>
					<tr>
						<td class="searchTopTypeNm">
							駅リストから選択
						</td>
						<td class="searchTopEnt2" style="text-align:right;padding-right:7px;">
							<form name="formStL" action="{rval _urlSearch}" method="get" onSubmit="{rval _jsSetCond}(this, document.formCond);{rval _jsSetFreeParams}(this);">
								<input name="type" type="hidden" value="StL" />
								<select name="adcd" class="searchTodSelect">
<option value="00">全国</option>
<option value="01">北海道</option>
<option value="02">青森県</option>
<option value="03">岩手県</option>
<option value="04">宮城県</option>
<option value="05">秋田県</option>
<option value="06">山形県</option>
<option value="07">福島県</option>
<option value="08">茨城県</option>
<option value="09">栃木県</option>
<option value="10">群馬県</option>
<option value="11">埼玉県</option>
<option value="12">千葉県</option>
<option value="13">東京都</option>
<option value="14">神奈川県</option>
<option value="15">新潟県</option>
<option value="16">富山県</option>
<option value="17">石川県</option>
<option value="18">福井県</option>
<option value="19">山梨県</option>
<option value="20">長野県</option>
<option value="21">岐阜県</option>
<option value="22">静岡県</option>
<option value="23">愛知県</option>
<option value="24">三重県</option>
<option value="25">滋賀県</option>
<option value="26">京都府</option>
<option value="27">大阪府</option>
<option value="28">兵庫県</option>
<option value="29">奈良県</option>
<option value="30">和歌山県</option>
<option value="31">鳥取県</option>
<option value="32">島根県</option>
<option value="33">岡山県</option>
<option value="34">広島県</option>
<option value="35">山口県</option>
<option value="36">徳島県</option>
<option value="37">香川県</option>
<option value="38">愛媛県</option>
<option value="39">高知県</option>
<option value="40">福岡県</option>
<option value="41">佐賀県</option>
<option value="42">長崎県</option>
<option value="43">熊本県</option>
<option value="44">大分県</option>
<option value="45">宮崎県</option>
<option value="46">鹿児島県</option>
<option value="47">沖縄県</option>
								</select>
								<button type="submit" class="searchButton">
									リスト表示
								</button>
							</form>
						</td>
					</tr>
					<tr>
						<td class="searchTopTypeNm">
							路線図から選択
						</td>
						<td class="searchTopEnt2">
							<form action="{rval _urlRosen}" method="get" name="formRail" style="margin:0;padding:0;height:0;">
								<input name="area" type="hidden" />
							</form>
							<div id="searchTopRosenzu">
								<a href="javascript:{rval _jsRail}(document.formRail, '1', document.formCond);">札幌</a>
								&nbsp;|&nbsp;
								<a href="javascript:{rval _jsRail}(document.formRail, '2', document.formCond);">仙台</a>
								&nbsp;|&nbsp;
								<a href="javascript:{rval _jsRail}(document.formRail, '3', document.formCond);">東京</a>
								&nbsp;|&nbsp;
								<a href="javascript:{rval _jsRail}(document.formRail, '4', document.formCond);">名古屋</a>
								&nbsp;|&nbsp;
								<br>
								<a href="javascript:{rval _jsRail}(document.formRail, '5', document.formCond);">京都</a>
								&nbsp;|&nbsp;
								<a href="javascript:{rval _jsRail}(document.formRail, '6', document.formCond);">大阪</a>
								&nbsp;|&nbsp;
								<a href="javascript:{rval _jsRail}(document.formRail, '7', document.formCond);">福岡</a>
							</div>
						</td>
					</tr>
				</table>
			</div>
			<div class="searchTopGroup">
				<div class="searchTopSubTitleR">
					郵便番号からさがす
				</div>
				<table class="searchTopEntTable">
					<tr>
						<td class="searchTopEnt1" colspan="2">
							<form name="formZipW" action="{rval _urlSearch}" method="get" onSubmit="{rval _jsSetCond}(this, document.formCond);{rval _jsSetFreeParams}(this);">
								<input name="type" type="hidden" value="ZipW" />
								<input type="text" name="keyword" class="searchFW" value="{rval fwzip}" placeholder="例：101-0001、9010001">
								<button type="submit" class="searchButton">
									検　索
								</button>
							</form>
						</td>
					</tr>
				</table>
			</div>
			<div class="searchTopGroup">
				<div class="searchTopSubTitleR">
					取扱店番号からさがす
				</div>
				<table class="searchTopEntTable">
					<tr>
						<td class="searchTopEnt1">
							<form name="formSN" action="{rval _urlSearch}" method="get" onSubmit="{rval _jsSetCond}(this, document.formCond);{rval _jsSetFreeParams}(this);{rval _jsEscapeKeyword}(this);">
								<input name="type" type="hidden" value="ShopW" />
								<input name="col" type="hidden" value="COL_03" />
								<input name="mptn" type="hidden" value="F" />
								<input type="text" name="keyword" class="searchFW" value="{rval fwshop}" placeholder="例：00253">
								<button type="submit" class="searchButton">
									検　索
								</button>
								<br>
								　　<a href="javascript:document.getElementById('snlink_submit').click();">取扱店番号について</a>
							</form>
							<form name="formSNlink" action="{rval _urlSearch}" method="get" onSubmit="{rval _jsSetCond}(this, document.formCond);{rval _jsSetFreeParams}(this);{rval _jsEscapeKeyword}(this);" style="display:none;">
								<input name="type" type="hidden" value="ShopW" />
								<input name="col" type="hidden" value="COL_03" />
								<input name="keyword" type="hidden" value="{rval D_FREE_VAR:tenpo_gai_atm_no}">
								<input name="atmlink" type="hidden" value="1" />
								<button type="submit" class="searchButton" id="snlink_submit"></button>
							</form>
						</td>
					</tr>
				</table>
			</div>
			<div class="searchTopGroup">
				<div class="searchTopSubTitleR">
					名所等からさがす
				</div>
				<table class="searchTopEntTable">
					<tr>
						<td class="searchTopEnt1">
							<form name="formPoiW" action="{rval _urlSearch}" method="get" onSubmit="ZdcEmapSetCond(this, document.formCond);ZdcEmapSetFreeParams(this);ZdcEmapEscapeKeyword(this);">
								<input name="type" type="hidden" value="PoiW" />
								<input type="text" name="keyword" class="searchFW" value="{rval fwpoi}" placeholder="例：東京タワー">
								<button type="submit" class="searchButton">
									検　索
								</button>
							</form>
						</td>
					</tr>
				</table>
			</div>
		</div>

	</div>

	<form name="formCond">
	<input type="hidden" name="scond200" value="1">
	</form>

	<div id="searchTopCondFrame">
		<div class="searchTopSubTitleL" style="width:auto;">
			利用条件からさがす
		</div>
		<div id="condMsg"><span>ご利用になるサービスや営業時間から検索できます。</span></div>

		<div id="condTabs">
			<ul class="tabsetIn checktab">
				<li>
					<input id="tab1" type="radio" name="radio" value="" checked="checked">
					<label class="tabBtn" for="tab1" style="background-color:#CC0000;">郵便サービスから選ぶ</label>
					<div class="tabContents" style="border:4px solid #CC0000;">
						<form name="tab1-formSA" action="{rval _urlSearch}" method="get" onSubmit="return checkForm(this);{rval _jsSetFreeParams}(this);">
							<input name="type" type="hidden" value="ShopA" />
							<input name="areaptn" type="hidden" value="1" />
							<input name="tabno" type="hidden" value="1" />
							<input type="hidden" name="cond101" value="">
							<input type="hidden" name="cond102" value="">
							<input type="hidden" name="cond200" value="1">
							<div>
								<div class="condSection">
									<dl class="">
										<dd class="">
											<input name="cond2" value="1" id="cond2" onclick="{rval _jsSearch}" {rval cond2chk} type="checkbox">
											<label for="cond2">郵便窓口</label>
										</dd>
										<dd class="">
											<input name="cond3" value="1" id="cond3" onclick="{rval _jsSearch}" {rval cond3chk} type="checkbox">
											<label for="cond3">印紙</label>
										</dd>
										<dd class="">
											<input name="cond4" value="1" id="cond4" onclick="{rval _jsSearch}" {rval cond4chk} type="checkbox">
											<label for="cond4">ゆうパック</label>
										</dd>
										<dd class="">
											<input name="cond5" value="1" id="cond5" onclick="{rval _jsSearch}" {rval cond5chk} type="checkbox">
											<label for="cond5">チルドゆうパック</label>
										</dd>
									</dl>
								</div>
								<div class="condSection">
									<dl class="">
										<dd class="">
											<input name="cond6" value="1" id="cond6" onclick="{rval _jsSearch}" {rval cond6chk} type="checkbox">
											<label for="cond6">内容証明</label>
										</dd>
										<dd class="">
											<input name="cond7" value="1" id="cond7" onclick="{rval _jsSearch}" {rval cond7chk} type="checkbox">
											<label for="cond7">ゆうゆう窓口</label>
										</dd>
									</dl>
								</div>
							</div>
							<div class="condCommon">
								<ul class="condCommonJkn">
									<li><input name="youbi" value="1" id="tab1-youbi1" type="radio"><label for="tab1-youbi1">平日</label></li>
									<li><input name="youbi" value="2" id="tab1-youbi2" type="radio"><label for="tab1-youbi2">土曜</label></li>
									<li><input name="youbi" value="3" id="tab1-youbi3" type="radio"><label for="tab1-youbi3">日曜・休日</label></li>
									<li>
										<select name="timespan">
											<option value="">ご利用時間（選択してください）</option>
											<option value="01">7:00より前（0:00〜7:00）</option>
											<option value="02">7:00〜8:00</option>
											<option value="03">8:00〜9:00</option>
											<option value="04">9:00〜10:00</option>
											<option value="05">10:00〜11:00</option>
											<option value="06">11:00〜12:00</option>
											<option value="07">12:00〜13:00</option>
											<option value="08">13:00〜14:00</option>
											<option value="09">14:00〜15:00</option>
											<option value="10">15:00〜16:00</option>
											<option value="11">16:00〜17:00</option>
											<option value="12">17:00〜18:00</option>
											<option value="13">18:00〜19:00</option>
											<option value="14">19:00〜20:00</option>
											<option value="15">20:00〜21:00</option>
											<option value="16">21:00〜22:00</option>
											<option value="17">22:00〜23:00</option>
											<option value="18">23:00〜24:00</option>
										</select>
									</li>
									<li><span class="park">駐車場の有無</span><input name="cond31" value="1" id="tab1-cond31" type="checkbox"><label for="tab1-cond31">駐車場あり</label></li>
								</ul>
								<ul class="condCommonBtn">
									<li><button type="submit" class="searchButton">検　索</button></li>
								</ul>
							</div>
						</form>
					</div>
				</li>
				<li>
					<input id="tab2" type="radio" name="radio" value="">
					<label class="tabBtn" for="tab2" style="background-color:#009900;">貯金サービスから選ぶ</label>
					<div class="tabContents" style="border:4px solid #009900;">
						<form name="tab2-formSA" action="{rval _urlSearch}" method="get" onSubmit="return checkForm(this);{rval _jsSetFreeParams}(this);">
							<input name="type" type="hidden" value="ShopA" />
							<input name="areaptn" type="hidden" value="1" />
							<input name="tabno" type="hidden" value="2" />
							<input type="hidden" name="cond103" value="">
							<input type="hidden" name="cond104" value="">
							<input type="hidden" name="cond200" value="1">
							<div>
								<div class="condSection">
									<dl class="">
										<dd class="">
											<input name="cond8" value="1" id="cond8" onclick="{rval _jsSearch}" {rval cond8chk} type="checkbox">
											<label for="cond8">貯金</label>
										</dd>
										<dd class="">
											<input name="cond14" value="1" id="cond14" onclick="{rval _jsSearch}" {rval cond14chk} type="checkbox">
											<label for="cond14">国債</label>
										</dd>
										<dd class="">
											<input name="cond15" value="1" id="cond15" onclick="{rval _jsSearch}" {rval cond15chk} type="checkbox">
											<label for="cond15">投資信託</label>
										</dd>
										<dd class="">
											<input name="cond16" value="1" id="cond16" onclick="{rval _jsSearch}" {rval cond16chk} type="checkbox">
											<label for="cond16">変額年金保険</label>
										</dd>
									</dl>
								</div>
								<div class="condSection">
									<dl class="">
										<dt>・送金・支払い・受取</dt>
										<dd class="">
											<input name="cond9" value="1" id="cond9" onclick="{rval _jsSearch}" {rval cond9chk} type="checkbox">
											<label for="cond9">為替</label>
										</dd>
										<dd class="">
											<input name="cond10" value="1" id="cond10" onclick="{rval _jsSearch}" {rval cond10chk} type="checkbox">
											<label for="cond10">振替</label>
										</dd>
										<dd class="">
											<input name="cond11" value="1" id="cond11" onclick="{rval _jsSearch}" {rval cond11chk} type="checkbox">
											<label for="cond11">振込</label>
										</dd>
									</dl>
								</div>
								<div class="condSection">
									<dl class="">
										<dt>・国際送金・外貨</dt>
										<dd class="">
											<input name="cond12" value="1" id="cond12" onclick="{rval _jsSearch}" {rval cond12chk} type="checkbox">
											<label for="cond12">国際送金</label>
										</dd>
										<dd class="">
											<input name="cond13" value="1" id="cond13" onclick="{rval _jsSearch}" {rval cond13chk} type="checkbox">
											<label for="cond13">外貨両替</label>
										</dd>
									</dl>
								</div>
								<div class="condSection">
									<dl class="">
										<dt>・個人ローン</dt>
										<dd class="">
											<input name="cond17" value="1" id="cond17" onclick="{rval _jsSearch}" {rval cond17chk} type="checkbox">
											<label for="cond17">住宅ローン</label>
										</dd>
										<dd class="">
											<input name="cond18" value="1" id="cond18" onclick="{rval _jsSearch}" {rval cond18chk} type="checkbox">
											<label for="cond18">パーソナルローン(目的別ローン）、カードローン</label>
										</dd>
									</dl>
								</div>
							</div>
							<div class="condCommon">
								<ul class="condCommonJkn">
									<li><input name="youbi" value="1" id="tab2-youbi1" type="radio"><label for="tab2-youbi1">平日</label></li>
									<li><input name="youbi" value="2" id="tab2-youbi2" type="radio"><label for="tab2-youbi2">土曜</label></li>
									<li><input name="youbi" value="3" id="tab2-youbi3" type="radio"><label for="tab2-youbi3">日曜・休日</label></li>
									<li>
										<select name="timespan">
											<option value="">ご利用時間（選択してください）</option>
											<option value="01">7:00より前（0:00〜7:00）</option>
											<option value="02">7:00〜8:00</option>
											<option value="03">8:00〜9:00</option>
											<option value="04">9:00〜10:00</option>
											<option value="05">10:00〜11:00</option>
											<option value="06">11:00〜12:00</option>
											<option value="07">12:00〜13:00</option>
											<option value="08">13:00〜14:00</option>
											<option value="09">14:00〜15:00</option>
											<option value="10">15:00〜16:00</option>
											<option value="11">16:00〜17:00</option>
											<option value="12">17:00〜18:00</option>
											<option value="13">18:00〜19:00</option>
											<option value="14">19:00〜20:00</option>
											<option value="15">20:00〜21:00</option>
											<option value="16">21:00〜22:00</option>
											<option value="17">22:00〜23:00</option>
											<option value="18">23:00〜24:00</option>
										</select>
									</li>
									<li><span class="park">駐車場の有無</span><input name="cond31" value="1" id="tab2-cond31" type="checkbox"><label for="tab2-cond31">駐車場あり</label></li>
								</ul>
								<ul class="condCommonBtn">
									<li><button type="submit" class="searchButton">検　索</button></li>
								</ul>
							</div>
						</form>
					</div>
				</li>
				<li>
					<input id="tab3" type="radio" name="radio" value="">
					<label class="tabBtn" for="tab3" style="background-color:#0000CC;">保険サービスから選ぶ</label>
					<div class="tabContents" style="border:4px solid #0000CC;">
						<form name="tab3-formSA" action="{rval _urlSearch}" method="get" onSubmit="return checkForm(this);{rval _jsSetFreeParams}(this);">
							<input name="type" type="hidden" value="ShopA" />
							<input name="areaptn" type="hidden" value="1" />
							<input name="tabno" type="hidden" value="3" />
							<input type="hidden" name="cond105" value="">
							<input type="hidden" name="cond106" value="">
							<input type="hidden" name="cond200" value="1">
							<div>
								<div class="condSection">
									<dl class="">
										<dd class="">
											<input name="cond19" value="1" id="cond19" onclick="{rval _jsSearch}" {rval cond19chk} type="checkbox">
											<label for="cond19">生命保険</label>
										</dd>
										<dd class="">
											<input name="cond22" value="1" id="cond22" onclick="{rval _jsSearch}" {rval cond22chk} type="checkbox">
											<label for="cond22">がん保険</label>
										</dd>
										<dd class="">
											<input name="cond23" value="1" id="cond23" onclick="{rval _jsSearch}" {rval cond23chk} type="checkbox">
											<label for="cond23">引受条件緩和型医療保険</label>
										</dd>
										<dd class="">
											<input name="cond24" value="1" id="cond24" onclick="{rval _jsSearch}" {rval cond24chk} type="checkbox">
											<label for="cond24">変額年金保険</label>
										</dd>
									</dl>
								</div>
								<div class="condSection">
									<dl class="">
										<dt>・損害保険</dt>
										<dd class="">
											<input name="cond20" value="1" id="cond20" onclick="{rval _jsSearch}" {rval cond20chk} type="checkbox">
											<label for="cond20">バイク自賠責保険</label>
										</dd>
										<dd class="">
											<input name="cond21" value="1" id="cond21" onclick="{rval _jsSearch}" {rval cond21chk} type="checkbox">
											<label for="cond21">自動車保険</label>
										</dd>
									</dl>
								</div>
							</div>
							<div class="condCommon">
								<ul class="condCommonJkn">
									<li><input name="youbi" value="1" id="tab3-youbi1" type="radio"><label for="tab3-youbi1">平日</label></li>
									<li><input name="youbi" value="2" id="tab3-youbi2" type="radio"><label for="tab3-youbi2">土曜</label></li>
									<li><input name="youbi" value="3" id="tab3-youbi3" type="radio"><label for="tab3-youbi3">日曜・休日</label></li>
									<li>
										<select name="timespan">
											<option value="">ご利用時間（選択してください）</option>
											<option value="01">7:00より前（0:00〜7:00）</option>
											<option value="02">7:00〜8:00</option>
											<option value="03">8:00〜9:00</option>
											<option value="04">9:00〜10:00</option>
											<option value="05">10:00〜11:00</option>
											<option value="06">11:00〜12:00</option>
											<option value="07">12:00〜13:00</option>
											<option value="08">13:00〜14:00</option>
											<option value="09">14:00〜15:00</option>
											<option value="10">15:00〜16:00</option>
											<option value="11">16:00〜17:00</option>
											<option value="12">17:00〜18:00</option>
											<option value="13">18:00〜19:00</option>
											<option value="14">19:00〜20:00</option>
											<option value="15">20:00〜21:00</option>
											<option value="16">21:00〜22:00</option>
											<option value="17">22:00〜23:00</option>
											<option value="18">23:00〜24:00</option>
										</select>
									</li>
									<li><span class="park">駐車場の有無</span><input name="cond31" value="1" id="tab3-cond31" type="checkbox"><label for="tab3-cond31">駐車場あり</label></li>
								</ul>
								<ul class="condCommonBtn">
									<li><button type="submit" class="searchButton">検　索</button></li>
								</ul>
							</div>
						</form>
					</div>
				</li>
				<li>
					<input id="tab4" type="radio" name="radio" value="">
					<label class="tabBtn" for="tab4" style="background-color:#009900;">ATMから選ぶ</label>
					<div class="tabContents" style="border:4px solid #009900;">
						<form name="tab4-formSA" action="{rval _urlSearch}" method="get" onSubmit="return checkForm(this);{rval _jsSetFreeParams}(this);">
							<input name="type" type="hidden" value="ShopA" />
							<input name="areaptn" type="hidden" value="1" />
							<input name="tabno" type="hidden" value="4" />
							<input type="hidden" name="cond107" value="">
							<input type="hidden" name="cond200" value="1">
							<div>
								<div class="condSection">
									<dl class="">
										<dd class="">
											<input name="cond25" value="1" id="cond25" onclick="{rval _jsSearch}" {rval cond25chk} type="checkbox">
											<label for="cond25">払込用紙による通常払込み</label>
										</dd>
										<dd class="">
											<input name="cond32" value="1" id="cond32" onclick="{rval _jsSearch}" {rval cond32chk} type="checkbox">
											<label for="cond32">硬貨でのお取り扱い</label>
										</dd>
										<dd class="">
											<input name="cond33" value="1" id="cond33" onclick="{rval _jsSearch}" {rval cond33chk} type="checkbox">
											<label for="cond33">通帳を利用できないATMを除く</label>
										</dd>
									</dl>
								</div>
							</div>
							<div class="condCommon">
								<ul class="condCommonJkn">
									<li><input name="youbi" value="1" id="tab4-youbi1" type="radio"><label for="tab4-youbi1">平日</label></li>
									<li><input name="youbi" value="2" id="tab4-youbi2" type="radio"><label for="tab4-youbi2">土曜</label></li>
									<li><input name="youbi" value="3" id="tab4-youbi3" type="radio"><label for="tab4-youbi3">日曜・休日</label></li>
									<li>
										<select name="timespan">
											<option value="">ご利用時間（選択してください）</option>
											<option value="01">7:00より前（0:00〜7:00）</option>
											<option value="02">7:00〜8:00</option>
											<option value="03">8:00〜9:00</option>
											<option value="04">9:00〜10:00</option>
											<option value="05">10:00〜11:00</option>
											<option value="06">11:00〜12:00</option>
											<option value="07">12:00〜13:00</option>
											<option value="08">13:00〜14:00</option>
											<option value="09">14:00〜15:00</option>
											<option value="10">15:00〜16:00</option>
											<option value="11">16:00〜17:00</option>
											<option value="12">17:00〜18:00</option>
											<option value="13">18:00〜19:00</option>
											<option value="14">19:00〜20:00</option>
											<option value="15">20:00〜21:00</option>
											<option value="16">21:00〜22:00</option>
											<option value="17">22:00〜23:00</option>
											<option value="18">23:00〜24:00</option>
										</select>
									</li>
									<li><span class="park">駐車場の有無</span><input name="cond31" value="1" id="tab4-cond31" type="checkbox"><label for="tab4-cond31">駐車場あり</label></li>
								</ul>
								<ul class="condCommonBtn">
									<li><button type="submit" class="searchButton">検　索</button></li>
								</ul>
							</div>
						</form>
					</div>
				</li>
				<li>
					<input id="tab5" type="radio" name="radio" value="">
					<label class="tabBtn" for="tab5" style="background-color:#FF6600;">他サービスから選ぶ</label>
					<div class="tabContents" style="border:4px solid #FF6600;">
						<form name="tab5-formSA" action="{rval _urlSearch}" method="get" onSubmit="return checkForm(this);{rval _jsSetFreeParams}(this);">
							<input name="type" type="hidden" value="ShopA" />
							<input name="areaptn" type="hidden" value="1" />
							<input name="tabno" type="hidden" value="5" />
							<input type="hidden" name="cond108" value="">
							<input type="hidden" name="cond109" value="">
							<input type="hidden" name="cond200" value="1">
							<div>
								<div class="condSection">
									<dl class="">
										<dt>・地方公共団体</dt>
										<dd class="">
											<input name="cond26" value="1" id="cond26" onclick="{rval _jsSearch}" {rval cond26chk} type="checkbox">
											<label for="cond26">証明書交付事務</label>
										</dd>
										<dd class="">
											<input name="cond27" value="1" id="cond27" onclick="{rval _jsSearch}" {rval cond27chk} type="checkbox">
											<label for="cond27">受託販売事務</label>
										</dd>
										<dd class="">
											<input name="cond28" value="1" id="cond28" onclick="{rval _jsSearch}" {rval cond28chk} type="checkbox">
											<label for="cond28">受託交付事務</label>
										</dd>
										<dd class="">
											<input name="cond29" value="1" id="cond29" onclick="{rval _jsSearch}" {rval cond29chk} type="checkbox">
											<label for="cond29">その他の地方公共団体事務</label>
										</dd>
									</dl>
								</div>
								<div class="condSection">
									<dl class="">
										<dd class="">
											<input name="cond30" value="1" id="cond30" onclick="{rval _jsSearch}" {rval cond30chk} type="checkbox">
											<label for="cond30">宝くじ</label>
										</dd>
									</dl>
								</div>
							</div>
							<div class="condCommon">
								<ul class="condCommonJkn">
									<li><input name="youbi" value="1" id="tab5-youbi1" type="radio"><label for="tab5-youbi1">平日</label></li>
									<li><input name="youbi" value="2" id="tab5-youbi2" type="radio"><label for="tab5-youbi2">土曜</label></li>
									<li><input name="youbi" value="3" id="tab5-youbi3" type="radio"><label for="tab5-youbi3">日曜・休日</label></li>
									<li>
										<select name="timespan">
											<option value="">ご利用時間（選択してください）</option>
											<option value="01">7:00より前（0:00〜7:00）</option>
											<option value="02">7:00〜8:00</option>
											<option value="03">8:00〜9:00</option>
											<option value="04">9:00〜10:00</option>
											<option value="05">10:00〜11:00</option>
											<option value="06">11:00〜12:00</option>
											<option value="07">12:00〜13:00</option>
											<option value="08">13:00〜14:00</option>
											<option value="09">14:00〜15:00</option>
											<option value="10">15:00〜16:00</option>
											<option value="11">16:00〜17:00</option>
											<option value="12">17:00〜18:00</option>
											<option value="13">18:00〜19:00</option>
											<option value="14">19:00〜20:00</option>
											<option value="15">20:00〜21:00</option>
											<option value="16">21:00〜22:00</option>
											<option value="17">22:00〜23:00</option>
											<option value="18">23:00〜24:00</option>
										</select>
									</li>
									<li><span class="park">駐車場の有無</span><input name="cond31" value="1" id="tab5-cond31" type="checkbox"><label for="tab5-cond31">駐車場あり</label></li>
								</ul>
								<ul class="condCommonBtn">
									<li><button type="submit" class="searchButton">検　索</button></li>
								</ul>
							</div>
						</form>
					</div>
				</li>
			</ul>
		</div>
	</div>

</div>

<div style="text-align:center;margin-top:10px;"><img src="{rval D_DIR_COMPANY}images/footer_group.jpg" usemap="#footer_group"></div>
<map name="footer_group">
	<area href="http://www.japanpost.jp/" target="_blank" shape="rect" alt="日本郵政" coords="42,7,221,37">
	<area href="http://www.post.japanpost.jp" target="_blank" shape="rect" alt="日本郵便" coords="265,7,443,37">
	<area href="http://www.jp-bank.japanpost.jp" target="_blank" shape="rect" alt="ゆうちょ銀行" coords="487,7,665,37">
	<area href="http://www.jp-life.japanpost.jp" target="_blank" shape="rect" alt="かんぽ生命" coords="709,7,888,37">
</map>
