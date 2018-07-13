<div id="kyotenPrint" onClick="openShopPrint('{rval _urlPrint}');">
	<img src="{rval D_DIR_COMPANY}images/print_b3_2.png" alt="印刷ページ" title="印刷ページ">
</div>

<!--{comment}-->
表示1（店舗詳細上部）
<!--{/comment}-->
<div class="section" id="headline">
	<div class="sectionInner">
		<h1 id="str_title" class="clearfix" style="padding-top:0px;padding-bottom:0px;">
			<!--{def col_20}-->
			<div class="title_area"><img src="{rval D_DIR_COMPANY}images/icon_post.gif" alt="" width="20" height="20" />
				<div class="str_title_hira">{rval col_20}&nbsp;</div>
				<div class="str_title_kana"><!--{def col_21}-->({rval col_21})<!--{/def}--></div>
			</div><br />
			<!--{/def}-->
			<!--{def col_29}-->
			<div class="title_area"><img src="{rval D_DIR_COMPANY}images/icon_post.gif" alt="" width="20" height="20" />
				<div class="str_title_hira">{rval col_29}&nbsp;</div>
				<div class="str_title_kana"><!--{def col_30}-->({rval col_30})<!--{/def}--></div>
			</div><br />
			<!--{/def}-->
			<!--{def col_37}-->
			<div class="title_area"><img src="{rval D_DIR_COMPANY}images/icon_bank.gif" alt="" width="20" height="20" />
				<div class="str_title_hira">ゆうちょ銀行　{rval col_37}&nbsp;</div>
				<div class="str_title_kana"><!--{def col_38}-->({rval col_38})<!--{/def}--></div>
			</div>
			<!--{/def}-->
		</h1>
	</div>
</div>

<div id="rightArea" style="float: left;">
	<div id="ZdcEmapDetail" style="line-height:0;">
		<div id="kyotenDtl">
			<h2>住所</h2>
			<!--{def col_10}-->〒{rval col_10}<br><!--{/def}-->
			{rval addr}
			<div id="exceptAddr">
				<div class="button-layout1"><a href="javascript:void(0);" class="button-streetview" onClick="custOpenGdlg();">大きな地図で見る</a></div>
				<h2>取り扱いサービス</h2>
				<!--{ndef icon_06}-->
				<!--{def col_119}-->
				<img src="{rval D_DIR_COMPANY}images/icon_yuubin.gif">
				<!--{/def}-->
				<!--{def col_127}-->
				<img src="{rval D_DIR_COMPANY}images/icon_yuucho.gif">
				<!--{/def}-->
				<!--{def col_143}-->
				<img src="{rval D_DIR_COMPANY}images/icon_hoken.gif">
				<!--{/def}-->
				<!--{def COLUMNS_yuuyuu_time_ANY_VALUE}-->
				<img src="{rval D_DIR_COMPANY}images/icon_yuuyuu.gif">
				<!--{/def}-->
				<!--{def col_135}-->
				<img src="{rval D_DIR_COMPANY}images/icon_atm.gif">
				<!--{/def}-->
				<!--{/ndef}-->
				<!--{def icon_06}-->
				<img src="{rval D_DIR_COMPANY}images/icon_atm_s.gif">
				<!--{/def}-->
				<h2>駐車場</h2>
				<!--{def col_14_GT_0}-->
				あり（{rval col_14}台）
				<!--{/def}-->
				<!--{ndef col_14_GT_0}-->
				なし
				<!--{/ndef}-->
				</tr>
				<!--{def col_15}-->
				<h2>備考</h2>
				{rval col_15}
				<!--{/def}-->
				<h2>モバイルサイト</h2>
				<img class="kyotenDtlQR" src="{rval qrimgurl}" alt="" height="82" width="82">
				<h2>ルート検索</h2>
				<form name="formComb" method="get" action="" onSubmit="searchCombRootDept(this.keyword.value);return false;">
					<input type="text" name="keyword" class="searchFW ph mt5" placeholder="出発地を入力（駅名/住所）" value="">
					<button type="submit" class="searchButton">検　索</button>
				</form>
				<div id="ZdcEmapList"></div>
				<div id="ZdcEmapNekiList"></div>
			</div>
			<div id="combDepature" style="display:none;">
				<h2>出発地の候補（ルート検索）</h2>
				<form name="formComb2" method="get" action="" onSubmit="searchCombRootDept(this.keyword.value);return false;">
					<input type="text" name="keyword" class="searchFW ph mt5" placeholder="出発地を入力（駅名/住所）" value="">
					<button type="submit" class="searchButton">検　索</button>
				</form>
				<div id="ZdcEmapSrchCombRootDept" style="position:relative;"></div>
				<a href="javascript:void(0);" onclick="returnShopDetail();">店舗詳細へ戻る</a>
			</div>
			<div id="combRoot" style="display:none;">
				<h2>ルートの候補（ルート検索）</h2>
				<form name="formComb3" method="get" action="" onSubmit="searchCombRootDept(this.keyword.value);return false;">
					<input type="text" name="keyword" class="searchFW ph mt5" placeholder="出発地を入力（駅名/住所）" value="">
					<button type="submit" class="searchButton">検　索</button>
				</form>
				<div id="ZdcEmapSrchCombRootResult"></div>
				<a href="javascript:void(0);" onclick="returnShopDetail();">店舗詳細へ戻る</a>
			</div>
			<button type="button" id="dtlmapInit" style="display:none;" onclick="{rval _jsInit}"></button>
		</div>
	</div>
</div>
<div id="leftArea" style="float: right;">
	<div id="ZdcEmapMap" style="width:590px;height:450px;"></div>
	<div id="mapCaution">
		<p>【地図の二次利用について】このページで公開している地図及び記載内容等、一切の情報は私的利用の範囲を超えて、許可なく複製、改変、送信等、二次利用することは著作権の侵害となりますのでご注意ください。</p>
	</div>
	<div id="ZdcEmapCond" style="display:none;"></div>
</div>

<div id="detailTabs">
	<ul id="detailTabContents" class="tabsetIn checktab">
<!--{comment}-->
表示2（局単独&併設の局ﾀﾌﾞ）
<!--{/comment}-->
		<!--{ndef icon_06}-->
		<!--{def col_119}-->
		<li>
			<input id="tab11" type="radio" name="radio" value="" onchange="javascript:changeTabHeight(11);">
			<label class="tabBtn" for="tab11" style="background-color:#FF6600;">郵便局からのお知らせ</label>
			<div id="tabContents11" class="tabContents" style="border:4px solid #FF6600;">

				<div id="tab_news" class="sectionDetail clearfix">
					<div class="sectionDetailInner">
						<h3>営業時間</h3>
						<p class="posB0">
						※サービスの内容によりご利用いただける時間が異なりますので、営業時間、取り扱い内容の詳細は、タブを切り替えてご確認ください。</p>


						<table cellspacing="0" border="1" summary="営業時間" class="tableTypeA">
							<thead>
								<tr>
									<th class="first">&nbsp;</th>
									<th>平日</th>
									<th>土曜日</th>
									<th>日曜日・休日</th>
									</tr>
							</thead>
							<tbody id="tabOn_time">
								<!--{def col_119}-->
								<tr>
									<th><img src="{rval D_DIR_COMPANY}images/icon_yuubin.gif">郵便窓口</th>
									<td>
										<!--{def col_119}--><!--{def col_120}-->{rval col_119_TIME}〜{rval col_120_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_119}--><!--{ndef col_120}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_121}--><!--{def col_122}-->{rval col_121_TIME}〜{rval col_122_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_121}--><!--{ndef col_122}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_123}--><!--{def col_124}-->{rval col_123_TIME}〜{rval col_124_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_123}--><!--{ndef col_124}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
								</tr>
								<!--{/def}-->
								<!--{def COLUMNS_yuuyuu_time_ANY_VALUE}-->
								<tr>
									<th><img src="{rval D_DIR_COMPANY}images/icon_yuuyuu.gif">ゆうゆう窓口</th>
									<td>
										<!--{def col_151}--><!--{def col_152}-->
											<span id="tab11_yuyu_timespan1">{rval col_151_TIME}〜{rval col_152_TIME}</span>
											<!--{def FLAGS_yuuyuu_bunkatsu_ALL_ON}-->
											<!--{def col_119_GT_col_151_TIME}-->
											<!--{def col_119_LT_col_152_TIME}-->
											<!--{def col_120_GT_col_151_TIME}-->
											<!--{def col_120_LT_col_152_TIME}-->
											{rval col_151_TIME}〜{rval col_119_TIME}／{rval col_120_TIME}〜{rval col_152_TIME}<script type="text/javascript">document.getElementById("tab11_yuyu_timespan1").style.display="none";</script>
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
										<!--{/def}--><!--{/def}-->
										<!--{ndef col_151}--><!--{ndef col_152}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_153}--><!--{def col_154}-->
											<span id="tab11_yuyu_timespan2">{rval col_153_TIME}〜{rval col_154_TIME}</span>
											<!--{def FLAGS_yuuyuu_bunkatsu_ALL_ON}-->
											<!--{def col_121_GT_col_153_TIME}-->
											<!--{def col_121_LT_col_154_TIME}-->
											<!--{def col_122_GT_col_153_TIME}-->
											<!--{def col_122_LT_col_154_TIME}-->
											{rval col_153_TIME}〜{rval col_121_TIME}／{rval col_122_TIME}〜{rval col_154_TIME}<script type="text/javascript">document.getElementById("tab11_yuyu_timespan2").style.display="none";</script>
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
										<!--{/def}--><!--{/def}-->
										<!--{ndef col_153}--><!--{ndef col_154}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_155}--><!--{def col_156}-->
											<span id="tab11_yuyu_timespan3">{rval col_155_TIME}〜{rval col_156_TIME}</span>
											<!--{def FLAGS_yuuyuu_bunkatsu_ALL_ON}-->
											<!--{def col_123_GT_col_155_TIME}-->
											<!--{def col_123_LT_col_156_TIME}-->
											<!--{def col_124_GT_col_155_TIME}-->
											<!--{def col_124_LT_col_156_TIME}-->
											{rval col_155_TIME}〜{rval col_123_TIME}／{rval col_124_TIME}〜{rval col_156_TIME}<script type="text/javascript">document.getElementById("tab11_yuyu_timespan3").style.display="none";</script>
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
										<!--{/def}--><!--{/def}-->
										<!--{ndef col_155}--><!--{ndef col_156}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
								</tr>
								<!--{/def}-->
								<!--{def col_127}-->
								<tr>
									<th><img src="{rval D_DIR_COMPANY}images/icon_yuucho.gif">貯金窓口</th>
									<td>
										<!--{def col_127}--><!--{def col_128}-->{rval col_127_TIME}〜{rval col_128_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_127}--><!--{ndef col_128}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_129}--><!--{def col_130}-->{rval col_129_TIME}〜{rval col_130_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_129}--><!--{ndef col_130}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_131}--><!--{def col_132}-->{rval col_131_TIME}〜{rval col_132_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_131}--><!--{ndef col_132}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
								</tr>
								<!--{/def}-->
								<!--{def col_135}-->
								<tr>
									<th><img src="{rval D_DIR_COMPANY}images/icon_atm.gif">ATM</th>
									<td>
										<!--{def col_135}--><!--{def col_136}-->{rval col_135_TIME}〜{rval col_136_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_135}--><!--{ndef col_136}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_137}--><!--{def col_138}-->{rval col_137_TIME}〜{rval col_138_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_137}--><!--{ndef col_138}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_139}--><!--{def col_140}-->{rval col_139_TIME}〜{rval col_140_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_139}--><!--{ndef col_140}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
								</tr>
								<!--{/def}-->
								<!--{def col_143}-->
								<tr>
									<th><img src="{rval D_DIR_COMPANY}images/icon_hoken.gif">保険窓口</th>
									<td>
										<!--{def col_143}--><!--{def col_144}-->{rval col_143_TIME}〜{rval col_144_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_143}--><!--{ndef col_144}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_145}--><!--{def col_146}-->{rval col_145_TIME}〜{rval col_146_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_145}--><!--{ndef col_146}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_147}--><!--{def col_148}-->{rval col_147_TIME}〜{rval col_148_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_147}--><!--{ndef col_148}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
								</tr>
								<!--{/def}-->
							</tbody>
						</table>

						<div style="margin-bottom:15px;">
							<!--{def col_182}-->{rval col_182}<br><!--{/def}-->
							<!--{def col_183}-->{rval col_183}<br><!--{/def}-->
						</div>

						<!--{def col_09lt}-->
						<div>
							<dl><dt>※24時間ご利用いただけるATMについては、以下のとおり一部お取り扱いのできない時間帯があります。</dt>
							<dd>・平日であっても、日曜日・休日の翌日の場合、7:00からお取り扱いを開始します。</dd>
							<dd>・連休の場合は、連休2日目から最終日までのお取扱時間は7:00〜21:00までとなります。</dd>
							</dl>
						</div>
						<!--{/def}-->

						<div class="clearfix">
							<div class="area_newsNews" style="background:none;width:413px;float:left;">
<!--{def cp_img_list}-->
								<h3>大切なお知らせ</h3>
<!--{each cp_img_list}-->
								<div style="width:413px; margin-bottom:15px;">
	<!--{def cp_img_list/URL}-->
									<a href="{rval cp_img_list/URL}" target="_blank">
	<!--{/def}-->
										<img src="{rval cp_img_list/IMG_G}" style="width:413px; height:120px;" alt="お知らせ">
	<!--{def cp_img_list/URL}-->
									</a>
	<!--{/def}-->
								</div>
<!--{/each}-->
<!--{/def}-->
								<p></p>
								<!--{comment}-->
								<div style="width:413px; height:120px; margin-bottom:0px;">
									<!--{def col_18l1}-->
									<a href="areabanner01" target="_blank">
										<img src="{rval D_DIR_COMPANY}images/areabanner01.png" style="width:413px; height:120px;" alt="">
									</a>
									<!--{/def}-->
									<!--{def col_18l2}-->
									<a href="areabanner02" target="_blank">
										<img src="{rval D_DIR_COMPANY}images/areabanner02.png" style="width:413px; height:120px;" alt="">
									</a>
									<!--{/def}-->
									<!--{def col_18l3}-->
									<a href="areabanner03" target="_blank">
										<img src="{rval D_DIR_COMPANY}images/areabanner03.png" style="width:413px; height:120px;" alt="">
									</a>
									<!--{/def}-->
									<!--{def col_18l4}-->
									<a href="areabanner04" target="_blank">
										<img src="{rval D_DIR_COMPANY}images/areabanner04.png" style="width:413px; height:120px;" alt="">
									</a>
									<!--{/def}-->
									<!--{def col_18l5}-->
									<a href="areabanner05" target="_blank">
										<img src="{rval D_DIR_COMPANY}images/areabanner05.png" style="width:413px; height:120px;" alt="">
									</a>
									<!--{/def}-->
									<!--{def col_18l6}-->
									<a href="areabanner06" target="_blank">
										<img src="{rval D_DIR_COMPANY}images/areabanner06.png" style="width:413px; height:120px;" alt="">
									</a>
									<!--{/def}-->
									<!--{def col_18l7}-->
									<a href="areabanner07" target="_blank">
										<img src="{rval D_DIR_COMPANY}images/areabanner07.png" style="width:413px; height:120px;" alt="">
									</a>
									<!--{/def}-->
									<!--{def col_18l8}-->
									<a href="areabanner08" target="_blank">
										<img src="{rval D_DIR_COMPANY}images/areabanner08.png" style="width:413px; height:120px;" alt="">
									</a>
									<!--{/def}-->
									<!--{def col_18l9}-->
									<a href="areabanner09" target="_blank">
										<img src="{rval D_DIR_COMPANY}images/areabanner09.png" style="width:413px; height:120px;" alt="">
									</a>
									<!--{/def}-->
									<!--{def col_18l10}-->
									<a href="areabanner10" target="_blank">
										<img src="{rval D_DIR_COMPANY}images/areabanner10.png" style="width:413px; height:120px;" alt="">
									</a>
									<!--{/def}-->
									<!--{def col_18l11}-->
									<a href="areabanner11" target="_blank">
										<img src="{rval D_DIR_COMPANY}images/areabanner11.png" style="width:413px; height:120px;" alt="">
									</a>
									<!--{/def}-->
									<!--{def col_18l12}-->
									<a href="areabanner12" target="_blank">
										<img src="{rval D_DIR_COMPANY}images/areabanner12.png" style="width:413px; height:120px;" alt="">
									</a>
									<!--{/def}-->
									<!--{def col_18l13}-->
									<a href="areabanner13" target="_blank">
										<img src="{rval D_DIR_COMPANY}images/areabanner13.png" style="width:413px; height:120px;" alt="">
									</a>
									<!--{/def}-->
								</div>
								<p></p>
								<!--{/comment}-->
							</div>

							<div style="width:350px;float:left;margin-left:30px;">
								<h3>くらしを支える郵便局サービス</h3>
                                                                <a href="https://www.post.japanpost.jp/life/mimamori/" target="_blank" >郵便局のみまもりサービス<img style="margin-left: 6px; vertical-align: middle; width: 9px; " width="9" height="9" alt="別ウィンドウで移動します" src="{rval D_DIR_COMPANY}/images/ico_external-window05.gif"></a>
								<br><br>
								
								<!--{def col_105b}-->
								<h4>地方公共団体事務</h4>
								<!--{/def}-->
								<div>
									<dl>
										<!--{def col_106l1}--><!--{def col_107}-->
										<dt>・証明書交付事務の内訳：</dt>
											<dd>{rval col_107}</dd>
										<!--{/def}--><!--{/def}-->
										<!--{def col_108l1}--><!--{def col_109}-->
										<dt>・受託窓口事務(受託販売事務)の内容：</dt>
											<dd>{rval col_109}</dd>
										<!--{/def}--><!--{/def}-->
										<!--{def col_110l1}--><!--{def col_111}-->
										<dt>・受託窓口事務(受託交付事務)の内容：</dt>
											<dd>{rval col_111}</dd>
										<!--{/def}--><!--{/def}-->
										<!--{def col_112l1}--><!--{def col_113}-->
										<dt>・その他の地方公共団体事務の内容：</dt>
											<dd>{rval col_113}</dd>
										<!--{/def}--><!--{/def}-->
										<!--{def col_114b}-->
										<dt>・宝くじ：</dt>
											<dd>宝くじの販売</dd>
										<!--{/def}-->
									</dl>
								</div>
							</div>
						</div>

						<h3 id="qus">お問い合わせ</h3>
						<p class="posB0">※サービスの内容によってお問い合わせ先が異なります。お電話のおかけ間違いにご注意ください。</p>
						<table cellspacing="0" border="1" summary="お問い合わせ" class="tableTypeC teltxt">
							<tbody>
								<tr>
									<th>窓口でのお取り扱い</th>
									<td>
										<!--{def col_20}-->{rval col_20}<span>（日本郵便株式会社）</span><!--{/def}-->
									</td>
									<td>
										<!--{def col_23}--><dl class="clearfix teltxt"><dt>窓口業務について</dt><dd>：&nbsp;{rval col_23}</dd></dl><!--{/def}-->
										<!--{def col_25}--><dl class="clearfix teltxt"><dt>FAX番号</dt><dd>：&nbsp;{rval col_25}</dd></dl><!--{/def}-->
									</td>
								</tr>
								<tr>
									<th>通帳やカードの紛失・盗難に伴うお取引の停止</th>
									<td>カード紛失センター<span>（株式会社ゆうちょ銀行）</span>または上記店舗
									</td>
									<td>
									<p>0120-794889&nbsp;（ナクシたときはハヤクお届け）<br>※通話料無料・年中無休・24時間受付</p>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

			</div>
		</li>
		<!--{/def}-->
		<!--{/ndef}-->
<!--{comment}-->
表示3（局単独の郵便ﾀﾌﾞ）
<!--{/comment}-->
		<!--{ndef icon_06}-->
		<!--{def col_05b}-->
		<!--{ndef col_06b}-->
		<li>
			<input id="tab12" type="radio" name="radio" value="" onchange="javascript:changeTabHeight(12);">
			<label class="tabBtn" for="tab12" style="background-color:#CC0000;">郵便</label>
			<div id="tabContents12" class="tabContents" style="border:4px solid #CC0000;">

				<div id="tab_window" class="sectionDetail clearfix">
					<div class="sectionDetailInner">
						<h3>営業時間</h3>
						<table cellspacing="0" border="1" summary="営業時間" class="tableTypeA">
							<thead>
								<tr>
									<th class="first">&nbsp;</th>
									<th>平日</th>
									<th>土曜日</th>
									<th>日曜日・休日</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th><img src="{rval D_DIR_COMPANY}images/icon_yuubin.gif">郵便窓口</th>
									<td>
										<!--{def col_119}--><!--{def col_120}-->{rval col_119_TIME}〜{rval col_120_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_119}--><!--{ndef col_120}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_121}--><!--{def col_122}-->{rval col_121_TIME}〜{rval col_122_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_121}--><!--{ndef col_122}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_123}--><!--{def col_124}-->{rval col_123_TIME}〜{rval col_124_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_123}--><!--{ndef col_124}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
								</tr>
							</tbody>
						</table>
						<!-- 営業時間について -->
						<h4<!--{ndef col_126}--> style="display:none;"<!--{/ndef}-->>営業時間について</h4>
						<!--{def col_126}--><p>{rval col_126}</p><!--{/def}-->
						<h3>取り扱い内容</h3>
						<table cellspacing="0" border="1" summary="取り扱い内容" class="tableTypeB">
							<tbody>
								<tr>
									<th>郵便</th>
									<td><!--{def col_51b}-->○<!--{/def}--><!--{ndef col_51b}-->×<!--{/ndef}--></td>
									<th>印紙</th>
									<td><!--{def col_52b}-->○<!--{/def}--><!--{ndef col_52b}-->×<!--{/ndef}--></td>
									<th>ゆうパック</th>
									<td><!--{def col_53b}-->○<!--{/def}--><!--{ndef col_53b}-->×<!--{/ndef}--></td>
								</tr>
								<tr>
									<th>チルドゆうパック</th>
									<td><!--{def col_54b}-->○<!--{/def}--><!--{ndef col_54b}-->×<!--{/ndef}--></td>
									<th>内容証明</th>
									<td><!--{def col_55b}-->○<!--{/def}--><!--{ndef col_55b}-->×<!--{/ndef}--></td>
									<th>&nbsp;</th>
									<td>&nbsp;</td>
								</tr>
							</tbody>
						</table>
						<h4<!--{ndef col_55b}--> style="display:none;"<!--{/ndef}-->>内容証明の取り扱いについて</h4>
						<p<!--{ndef col_55b}--> style="display:none;"<!--{/ndef}-->>「内容証明」につきましては、一部の郵便局で、窓口の営業時間にかかわらず、平日のみのお取り扱いとなる場合がございます。土曜日、日曜日、休日にご利用になる場合は、お手数ですが、事前に郵便局までご確認いただきますよう、よろしくお願いいたします。</p>
					</div>
				</div>

			</div>
		</li>
		<!--{/ndef}-->
		<!--{/def}-->
		<!--{/ndef}-->
<!--{comment}-->
表示4-1（郵便併設の郵便（ゆうゆう）ﾀﾌﾞ）
<!--{/comment}-->
		<!--{ndef icon_06}-->
		<!--{def col_06b}-->
		<li>
			<input id="tab13" type="radio" name="radio" value="" onchange="javascript:changeTabHeight(13);">
			<label class="tabBtn" for="tab13" style="background-color:#CC0000;">郵便（ゆうゆう窓口）</label>
			<div id="tabContents13" class="tabContents" style="border:4px solid #CC0000;">

				<div id="tab_window" class="sectionDetail clearfix">
					<div class="sectionDetailInner">
						<!--{def col_20}--><p>{rval col_20} のお取り扱い</p><!--{/def}-->
						<h3>営業時間</h3>
						<table cellspacing="0" border="1" summary="営業時間" class="tableTypeA">
							<thead>
								<tr>
									<th class="first">&nbsp;</th>
									<th>平日</th>
									<th>土曜日</th>
									<th>日曜日・休日</th>
								</tr>
							</thead>
							<tbody>
								<!--{def col_119}-->
								<tr>
									<th><img src="{rval D_DIR_COMPANY}images/icon_yuubin.gif">郵便窓口</th>
									<td>
										<!--{def col_119}--><!--{def col_120}-->{rval col_119_TIME}〜{rval col_120_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_119}--><!--{ndef col_120}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_121}--><!--{def col_122}-->{rval col_121_TIME}〜{rval col_122_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_121}--><!--{ndef col_122}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_123}--><!--{def col_124}-->{rval col_123_TIME}〜{rval col_124_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_123}--><!--{ndef col_124}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
								</tr>
								<!--{/def}-->
								<!--{def COLUMNS_yuuyuu_time_ANY_VALUE}-->
								<tr>
									<th><img src="{rval D_DIR_COMPANY}images/icon_yuuyuu.gif">ゆうゆう窓口</th>
									<td>
										<!--{def col_151}--><!--{def col_152}-->
											<span id="tab13_yuyu_timespan1">{rval col_151_TIME}〜{rval col_152_TIME}</span>
											<!--{def FLAGS_yuuyuu_bunkatsu_ALL_ON}-->
											<!--{def col_119_GT_col_151_TIME}-->
											<!--{def col_119_LT_col_152_TIME}-->
											<!--{def col_120_GT_col_151_TIME}-->
											<!--{def col_120_LT_col_152_TIME}-->
											{rval col_151_TIME}〜{rval col_119_TIME}／{rval col_120_TIME}〜{rval col_152_TIME}<script type="text/javascript">document.getElementById("tab13_yuyu_timespan1").style.display="none";</script>
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
										<!--{/def}--><!--{/def}-->
										<!--{ndef col_151}--><!--{ndef col_152}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_153}--><!--{def col_154}-->
											<span id="tab13_yuyu_timespan2">{rval col_153_TIME}〜{rval col_154_TIME}</span>
											<!--{def FLAGS_yuuyuu_bunkatsu_ALL_ON}-->
											<!--{def col_121_GT_col_153_TIME}-->
											<!--{def col_121_LT_col_154_TIME}-->
											<!--{def col_122_GT_col_153_TIME}-->
											<!--{def col_122_LT_col_154_TIME}-->
											{rval col_153_TIME}〜{rval col_121_TIME}／{rval col_122_TIME}〜{rval col_154_TIME}<script type="text/javascript">document.getElementById("tab13_yuyu_timespan2").style.display="none";</script>
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
										<!--{/def}--><!--{/def}-->
										<!--{ndef col_153}--><!--{ndef col_154}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_155}--><!--{def col_156}-->
											<span id="tab13_yuyu_timespan3">{rval col_155_TIME}〜{rval col_156_TIME}</span>
											<!--{def FLAGS_yuuyuu_bunkatsu_ALL_ON}-->
											<!--{def col_123_GT_col_155_TIME}-->
											<!--{def col_123_LT_col_156_TIME}-->
											<!--{def col_124_GT_col_155_TIME}-->
											<!--{def col_124_LT_col_156_TIME}-->
											{rval col_155_TIME}〜{rval col_123_TIME}／{rval col_124_TIME}〜{rval col_156_TIME}<script type="text/javascript">document.getElementById("tab13_yuyu_timespan3").style.display="none";</script>
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
										<!--{/def}--><!--{/def}-->
										<!--{ndef col_155}--><!--{ndef col_156}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
								</tr>
								<!--{/def}-->
							</tbody>
						</table>
						<!-- 営業時間について -->
						<h4<!--{ndef col_126}--><!--{ndef col_158}--> style="display:none;"<!--{/ndef}--><!--{/ndef}-->>営業時間について</h4>
						<!--{def col_126}--><p>{rval col_126}</p><!--{/def}-->
						<!--{def col_158}--><p>{rval col_158}</p><!--{/def}-->
						<h3>取り扱い内容</h3>
						<table cellspacing="0" border="1" summary="取り扱い内容" class="tableTypeB">
							<tbody>
								<tr>
									<th>郵便</th>
									<td><!--{def col_51b}-->○<!--{/def}--><!--{ndef col_51b}-->×<!--{/ndef}--></td>
									<th>印紙</th>
									<td><!--{def col_52b}-->○<!--{/def}--><!--{ndef col_52b}-->×<!--{/ndef}--></td>
									<th>ゆうパック</th>
									<td><!--{def col_53b}-->○<!--{/def}--><!--{ndef col_53b}-->×<!--{/ndef}--></td>
								</tr>
								<tr>
									<th>チルドゆうパック</th>
									<td><!--{def col_54b}-->○<!--{/def}--><!--{ndef col_54b}-->×<!--{/ndef}--></td>
									<th>内容証明</th>
									<td><!--{def col_55b}-->○<!--{/def}--><!--{ndef col_55b}-->×<!--{/ndef}--></td>
									<th>&nbsp;</th>
									<td>&nbsp;</td>
								</tr>
							</tbody>
						</table>
						<h4<!--{ndef col_55b}--> style="display:none;"<!--{/ndef}-->>内容証明の取り扱いについて</h4>
						<p<!--{ndef col_55b}--> style="display:none;"<!--{/ndef}-->>「内容証明」につきましては、一部の郵便局で、窓口の営業時間にかかわらず、平日のみのお取り扱いとなる場合がございます。土曜日、日曜日、休日にご利用になる場合は、お手数ですが、事前に郵便局までご確認いただきますよう、よろしくお願いいたします。</p>
						<h3 id="qus_window">お問い合わせ</h3>
						<p class="posB0">※サービスの内容によってお問い合わせ先が異なります。お電話のおかけ間違いにご注意ください。</p>
						<table cellspacing="0" border="1" summary="お問い合わせ" class="tableTypeC teltxt">
							<tbody>
								<!--{ndef col_05b}-->
								<!--{def COLUMNS_syuuka_tel_ANY_VALUE}-->
								<tr>
									<th>郵便サービスについて</th>
									<td>
										<!--{def col_33}--><dl class="clearfix teltxt"><dt>代表電話番号</dt><dd>：&nbsp;{rval col_33}</dd></dl><!--{/def}-->
										<!--{def col_34}--><dl class="clearfix teltxt"><dt>集荷電話番号</dt><dd>：&nbsp;{rval col_34}</dd></dl><!--{/def}-->
									</td>
								</tr>
								<!--{/def}-->
								<!--{/ndef}-->
								<!--{def col_05b}-->
								<!--{def COLUMNS_syuuka_tel_ANY_VALUE}-->
								<tr>
									<th>集荷・配送について</th>
									<td>
										<!--{def col_33}--><dl class="clearfix teltxt"><dt>代表電話番号</dt><dd>：&nbsp;{rval col_33}</dd></dl><!--{/def}-->
										<!--{def col_34}--><dl class="clearfix teltxt"><dt>集荷について</dt><dd>：&nbsp;{rval col_34}</dd></dl><!--{/def}-->
									</td>
								</tr>
								<!--{/def}-->
								<!--{def COLUMNS_madoguchi_tel_ANY_VALUE}-->
								<tr>
									<th>集荷・配送を除く郵便サービスについて</th>
									<td>
										<!--{def col_23}--><dl class="clearfix teltxt"><dt>窓口業務について</dt><dd>：&nbsp;{rval col_23}</dd></dl><!--{/def}-->
										<!--{def col_25}--><dl class="clearfix teltxt"><dt>FAX番号</dt><dd>：&nbsp;{rval col_25}</dd></dl><!--{/def}-->
									</td>
								</tr>
								<!--{/def}-->
								<!--{/def}-->
							</tbody>
						</table>

						<!-- お問い合わせの際の注意点 -->
						<h4<!--{ndef col_26}--><!--{ndef col_35}--> style="display:none;"<!--{/ndef}--><!--{/ndef}-->>お問い合わせの際の注意</h4>
						<dl<!--{ndef col_26}--><!--{ndef col_35}--> style="display:none;"<!--{/ndef}--><!--{/ndef}--> class="dlTypeA">
							<!--{def col_26}--><dd>{rval col_26}</dd><!--{/def}-->
							<!--{def col_35}--><dd>{rval col_35}</dd><!--{/def}-->
						</dl>
						<h5>郵便サービス全般について</h5>
						<p class="img_tel">ご質問にオペレータがお答えいたします。<br>
						<a href="http://www.post.japanpost.jp/question/contact_us/index2.html" target="_blank" class="newWinNet hoverTxt">郵便サービス全般のお問い合わせ</a></p>
					</div>
				</div>

			</div>
		</li>
		<!--{/def}-->
		<!--{/ndef}-->
<!--{comment}-->
表示5(局単独、局+ゆうちょ、局+郵便+ゆうちょの貯金ﾀﾌﾞ)
<!--{/comment}-->
		<!--{ndef icon_06}-->
		<!--{def col_127}-->
		<li>
			<input id="tab14" type="radio" name="radio" value="" onchange="javascript:changeTabHeight(14);">
			<label class="tabBtn" for="tab14" style="background-color:#009900;">貯金・ＡＴＭ</label>
			<div id="tabContents14" class="tabContents" style="border:4px solid #009900;">

				<div id="tab_depositAndAtm" class="sectionDetail clearfix">
					<div class="sectionDetailInner">
						<p>
							<!--{def col_37}-->
							ゆうちょ銀行　{rval col_37} <!--{def col_39}-->（正式名称：{rval col_39}）<!--{/def}-->のお取り扱い
							<!--{/def}-->
							<!--{ndef col_37}-->
							<!--{def col_20}-->
							{rval col_20} のお取り扱い
							<!--{/def}-->
							<!--{/ndef}-->
							<!--{def col_03}-->
							<br>[取扱店番号：{rval col_03}]
							<!--{/def}-->
						</p>
						
						<h3>営業時間</h3>
						<table cellspacing="0" border="1" summary="営業時間" class="tableTypeA">
							<thead>
								<tr>
									<th class="first">&nbsp;</th>
									<th>平日</th>
									<th>土曜日</th>
									<th>日曜日・休日</th>
								</tr>
							</thead>
							<tbody>
								<!--{def col_127}-->
								<tr>
									<th><img src="{rval D_DIR_COMPANY}images/icon_yuucho.gif">貯金窓口</th>
									<td>
										<!--{def col_127}--><!--{def col_128}-->{rval col_127_TIME}〜{rval col_128_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_127}--><!--{ndef col_128}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_129}--><!--{def col_130}-->{rval col_129_TIME}〜{rval col_130_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_129}--><!--{ndef col_130}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_131}--><!--{def col_132}-->{rval col_131_TIME}〜{rval col_132_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_131}--><!--{ndef col_132}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
								</tr>
								<!--{/def}-->
								<!--{def col_135}-->
								<tr>
									<th><img src="{rval D_DIR_COMPANY}images/icon_atm.gif">ATM</th>
									<td>
										<!--{def col_135}--><!--{def col_136}-->{rval col_135_TIME}〜{rval col_136_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_135}--><!--{ndef col_136}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_137}--><!--{def col_138}-->{rval col_137_TIME}〜{rval col_138_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_137}--><!--{ndef col_138}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_139}--><!--{def col_140}-->{rval col_139_TIME}〜{rval col_140_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_139}--><!--{ndef col_140}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
								</tr>
								<!--{/def}-->
							</tbody>
						</table>
<!--{comment}-->
						<div<!--{ndef kid_EQ_300101083000}--><!--{ndef kid_EQ_300101056000}--><!--{ndef kid_EQ_300102001000}--><!--{ndef kid_EQ_300109067000}--><!--{ndef kid_EQ_300141019000}--><!--{ndef kid_EQ_300140194000}--> style="display:none;"<!--{/ndef}--><!--{/ndef}--><!--{/ndef}--><!--{/ndef}--><!--{/ndef}--><!--{/ndef}-->>
						<h4>貯金窓口営業時間についてのお知らせ</h4>
						<ul id="atm_oshirase_contents" class="noListStyle">
							<li>
						<!--{def kid_EQ_300101083000}-->
								2017年4月3日（月）から、平日の窓口営業時間を 9:00 〜16:00に変更しました。<br><!--ゆうちょ銀行　京橋店-->
						<!--{/def}-->
						<!--{def kid_EQ_300101056000}-->
								2017年4月3日（月）から、平日の窓口営業時間を 9:00 〜18:00に変更しました。<br><!--ゆうちょ銀行　立川店-->
						<!--{/def}-->
						<!--{def kid_EQ_300102001000}-->
								2017年4月3日（月）から、平日の窓口営業時間を 9:00 〜16:00に変更しました。<br><!--ゆうちょ銀行　横浜港店-->
						<!--{/def}-->
						<!--{def kid_EQ_300109067000}-->
								2017年4月3日（月）から、平日の窓口営業時間を 9:00 〜18:00に変更しました。<br><!--ゆうちょ銀行　都筑店-->
						<!--{/def}-->
						<!--{def kid_EQ_300141019000}-->
								2017年4月3日（月）から、平日の窓口営業時間を 9:00 〜16:00に変更しました。<br><!--ゆうちょ銀行　大阪東店-->
						<!--{/def}-->
						<!--{def kid_EQ_300140194000}-->
								2017年4月3日（月）から、平日の窓口営業時間を 9:00 〜18:00に変更しました。<br><!--ゆうちょ銀行　高槻店-->
						<!--{/def}-->
								<a href="http://www.jp-bank.japanpost.jp/news/2017/news_id001223.html" target="_blank" class="txtIndent newWinAtm hoverTxt">一部店舗の窓口営業時間を変更しました</a>
							</li>
						</ul>
						</div>
<!--{/comment}-->
						<div<!--{ndef col_09lt}--><!--{ndef col_70b}--><!--{ndef col_40l02}--> style="display:none;"<!--{/ndef}--><!--{/ndef}--><!--{/ndef}-->>
						<h4>ATMについてのお知らせ</h4>
						<ul id="atm_oshirase_contents" class="noListStyle">
							<!--{def col_09lt}-->
							<li>
								時間帯によっては、お取り扱いをしていないサービスがございます。<br>
								<a href="http://www.jp-bank.japanpost.jp/kojin/access/atm/kj_acs_atm_index.html" target="_blank" class="txtIndent newWinAtm hoverTxt">ご利用いただけるサービスや時間帯など詳しくはこちら（ゆうちょ銀行）</a>
							</li>
							<dl>
								<dt>※24時間ご利用いただけるATMについては、以下のとおり一部お取り扱いのできない時間帯があります。</dt>
								<dd>・平日であっても、日曜日・休日の翌日の場合、7:00からお取り扱いを開始します。</dd>
								<dd>・連休の場合は、連休2日目から最終日までのお取扱時間は7:00〜21:00までとなります。</dd>
							</dl>
							<!--{/def}-->
						</ul>
						</div>
						
						<!--{def col_142}-->
						<h4>営業時間について</h4>
						<p></p>
						<p>{rval col_142}</p>
						<!--{/def}-->
						
						<h3>取り扱い内容</h3>
						<table cellspacing="0" border="1" summary="取り扱い内容" class="tableTypeB">
							<tbody>
								<tr>
									<th>貯金</th>
									<td><!--{def FLAGS_chokin_ANY_ON}-->○<!--{/def}--><!--{ndef FLAGS_chokin_ANY_ON}-->×<!--{/ndef}--></td>
									<th>貸付</th>
									<td>
										<span id="kashitsuke">○</span>
										<!--{def col_22l03}-->
										<!--{ndef col_57b}-->
										<!--{ndef col_58b}-->
										<!--{ndef col_59b}-->
										<!--{ndef col_60b}-->
										<!--{ndef col_61b}-->
										<!--{ndef col_62b}-->
										<!--{ndef col_63b}-->
										<!--{ndef col_64b}-->
										<!--{ndef col_65b}-->
										<!--{ndef col_66b}-->
										<!--{ndef col_67b}-->
										<!--{def col_68b}-->
										<!--{def col_69b}-->
										<!--{def col_71b}-->
										<!--{def col_72b}-->
										<!--{def col_73b}-->
										<!--{def col_74b}-->
										<!--{def col_76b}-->
										<!--{def col_81b}-->
										<!--{def col_82b}-->
										<!--{def col_83b}-->
										×<script type="text/javascript">document.getElementById("kashitsuke").style.display="none";</script>
										<!--{/def}-->
										<!--{/def}-->
										<!--{/def}-->
										<!--{/def}-->
										<!--{/def}-->
										<!--{/def}-->
										<!--{/def}-->
										<!--{/def}-->
										<!--{/def}-->
										<!--{/def}-->
										<!--{/ndef}-->
										<!--{/ndef}-->
										<!--{/ndef}-->
										<!--{/ndef}-->
										<!--{/ndef}-->
										<!--{/ndef}-->
										<!--{/ndef}-->
										<!--{/ndef}-->
										<!--{/ndef}-->
										<!--{/ndef}-->
										<!--{/ndef}-->
										<!--{/def}-->
									</td>
									<th>為替</th>
									<td><!--{def FLAGS_kawase_ANY_ON}-->○<!--{/def}--><!--{ndef FLAGS_kawase_ANY_ON}-->×<!--{/ndef}--></td>
								</tr>
								<tr>
									<th>振替</th>
									<td><!--{def FLAGS_furikae_ANY_ON}-->○<!--{/def}--><!--{ndef FLAGS_furikae_ANY_ON}-->×<!--{/ndef}--></td>
									<th>振込（他の金融機関口座への送金）</th>
									<td><!--{def col_75b}-->○<!--{/def}--><!--{ndef col_75b}-->×<!--{/ndef}--></td>
									<th>国際送金</th>
									<td><!--{def col_85b}-->○<!--{/def}--><!--{ndef col_85b}-->×<!--{/ndef}--></td>
								</tr>
								<tr>
									<th>外貨両替（注）</th>
									<td><!--{def col_86b}-->○<!--{/def}--><!--{ndef col_86b}-->×<!--{/ndef}--></td>
									<th>国債</th>
									<td><!--{def col_91b}-->○<!--{/def}--><!--{ndef col_91b}-->×<!--{/ndef}--></td>
									<th>投資信託</th>
									<td><!--{def col_92b}-->○<!--{/def}--><!--{ndef col_92b}-->×<!--{/ndef}--></td>
								</tr>
							<!--{def col_07b}-->
								<tr>
									<th>確定拠出年金</th>
									<td><!--{def col_94b}-->○<!--{/def}--><!--{ndef col_94b}-->×<!--{/ndef}--></td>
									<th>変額年金保険</th>
									<td><!--{def col_93b}-->○<!--{/def}--><!--{ndef col_93b}-->×<!--{/ndef}--></td>
									<th>スルガ銀行の個人ローンのお申し込み<br>（住宅ローン）</th>
									<td><!--{def col_95b}-->○<!--{/def}--><!--{ndef col_95b}-->×<!--{/ndef}--></td>
								</tr>
								<tr>
									<th>スルガ銀行の個人ローンのお申し込み<br>（パーソナルローン・カードローン）</th>
									<td><!--{def col_168b}-->○<!--{/def}--><!--{ndef col_168b}-->×<!--{/ndef}--></td>
									<th>財形定額貯金</th>
									<td><!--{def col_65b}-->○<!--{/def}--><!--{ndef col_65b}-->×<!--{/ndef}--></td>
									<th>自動払出預入</th>
									<td><!--{def col_79b}-->○<!--{/def}--><!--{ndef col_79b}-->×<!--{/ndef}--></td>
								</tr>
								<tr>
									<th>小切手払い</th>
									<td><!--{def col_167b}-->○<!--{/def}--><!--{ndef col_167b}-->×<!--{/ndef}--></td>
									<th>貯金小切手の振出</th>
									<td><!--{def col_78b}-->○<!--{/def}--><!--{ndef col_78b}-->×<!--{/ndef}--></td>
									<th>簡易払い</th>
									<td><!--{def FLAGS_kanih_ANY_ON}-->○<!--{/def}--><!--{ndef FLAGS_kanih_ANY_ON}-->×<!--{/ndef}--></td>
								</tr>
								<tr>
									<th>JP BANK カード（クレジットカード）</th>
									<td>○</td>
									<th>通帳取り扱い（ATM）</th>
									<td><!--{def col_170b}-->○<!--{/def}--><!--{ndef col_170b}-->×<!--{/ndef}--></td>
									<th>硬貨でのお取り扱い（ATM）</th>
									<td><!--{def col_171b}-->○<!--{/def}--><!--{ndef col_171b}-->×<!--{/ndef}--></td>
								</tr>
								<tr>
									<th>払込用紙による通常払込み（ATM）</th>
									<td><!--{def col_70b}-->○<!--{/def}--><!--{ndef col_70b}-->×<!--{/ndef}--></td>
									<th>&nbsp;</th><td>&nbsp;</td>
									<th>&nbsp;</th><td>&nbsp;</td>
								</tr>
							<!--{/def}-->
							<!--{ndef col_07b}-->
								<tr>
									<th>確定拠出年金</th>
									<td><!--{def col_94b}-->○<!--{/def}--><!--{ndef col_94b}-->×<!--{/ndef}--></td>
									<th>スルガ銀行の個人ローンのお申し込み<br>（住宅ローン）</th>
									<td><!--{def col_95b}-->○<!--{/def}--><!--{ndef col_95b}-->×<!--{/ndef}--></td>
									<th>スルガ銀行の個人ローンのお申し込み<br>（パーソナルローン・カードローン）</th>
									<td><!--{def col_168b}-->○<!--{/def}--><!--{ndef col_168b}-->×<!--{/ndef}--></td>
								</tr>
								<tr>
									<th>財形定額貯金</th>
									<td><!--{def col_65b}-->○<!--{/def}--><!--{ndef col_65b}-->×<!--{/ndef}--></td>
									<th>自動払出預入</th>
									<td><!--{def col_79b}-->○<!--{/def}--><!--{ndef col_79b}-->×<!--{/ndef}--></td>
									<th>小切手払い</th>
									<td><!--{def col_167b}-->○<!--{/def}--><!--{ndef col_167b}-->×<!--{/ndef}--></td>
								</tr>
								<tr>
									<th>貯金小切手の振出</th>
									<td><!--{def col_78b}-->○<!--{/def}--><!--{ndef col_78b}-->×<!--{/ndef}--></td>
									<th>簡易払い</th>
									<td><!--{def FLAGS_kanih_ANY_ON}-->○<!--{/def}--><!--{ndef FLAGS_kanih_ANY_ON}-->×<!--{/ndef}--></td>
									<th>JP BANK カード（クレジットカード）</th>
									<td>
										<span id="jp_bank_card">×</span>
										<!--{def col_05b}-->
										<!--{ndef col_22l03}-->
										<!--{def COLUMNS_chokin_time_ANY_VALUE}-->
										○<script type="text/javascript">document.getElementById("jp_bank_card").style.display="none";</script>
										<!--{/def}-->
										<!--{/ndef}-->
										<!--{/def}-->
									</td>
								</tr>
								<tr>
									<th>通帳取り扱い（ATM）</th>
									<td><!--{def col_170b}-->○<!--{/def}--><!--{ndef col_170b}-->×<!--{/ndef}--></td>
									<th>硬貨でのお取り扱い（ATM）</th>
									<td><!--{def col_171b}-->○<!--{/def}--><!--{ndef col_171b}-->×<!--{/ndef}--></td>
									<th>払込用紙による通常払込み（ATM）</th>
									<td><!--{def col_70b}-->○<!--{/def}--><!--{ndef col_70b}-->×<!--{/ndef}--></td>
								</tr>
							<!--{/ndef}-->
							</tbody>
						</table>
						<!--{def col_86b}-->
						<div style="float:left;">（注）　</div>
						<div style="float:left;">販売する通貨の種類および在庫状況は取扱店により異なります。詳しくは窓口でお尋ねください。</div>
						<div style="clear:both;"></div>
						<br>
						<!--{/def}-->
						
						<h4>ゆうちょ銀行口座から他の金融機関口座への振込利用上の注意</h4>
						<dl>
							<dt>○窓口利用</dt>
							<dd>平日15時以降にお受けした場合、お振込が翌営業日扱いになります。<br>※平日14時30分以降にお受けした場合、または振込事務の繁忙日等やむを得ない事情がある場合は、お振込が翌営業日扱いになることがあります。</dd>
							<dt>○ATM利用</dt>
							<dd>平日15時以降または土曜日、日曜日・休日（12月31日を含みます。）にお取り扱いしたお振込は、翌営業日扱いとなります。なお、1月1日から1月3日まではお取扱いできません。<br>※ATM利用明細票に振込予定日の記載がないものについては、お取り扱い日が振込予定日となります。</dd>
						</dl>

						<h3 id="qus_depositAndAtm">お問い合わせ</h3>
						<p class="posB0">※サービスの内容によってお問い合わせ先が異なります。お電話のおかけ間違いにご注意ください。</p>
						<table cellspacing="0" border="1" summary="お問い合わせ" class="tableTypeC teltxt">
							<tbody>
								<tr>
									<th>貯金サービスについて</th>
									<td>
										<!--{def col_37}-->
										{rval col_37}<span>（株式会社ゆうちょ銀行）</span>
										<!--{/def}-->
										<!--{ndef col_37}-->
										<!--{def col_20}-->
										{rval col_20}<span>（日本郵便株式会社）</span>
										<!--{/def}-->
										<!--{/ndef}-->
									</td>
									<td>
										<dl class="clearfix teltxt">
											<dt>貯金サービスについて</dt>
											<dd>
												<!--{def col_41}-->
												：&nbsp;{rval col_41}
												<!--{/def}-->
												<!--{ndef col_41}-->
												<!--{def col_23}-->
												：&nbsp;{rval col_23}
												<!--{/def}-->
												<!--{/ndef}-->
											</dd>
										</dl>
									</td>
								</tr>
								<tr>
									<th>通帳やカードの紛失・盗難に伴うお取引の停止</th>
									<td>カード紛失センター<span>（株式会社ゆうちょ銀行）</span>または上記店舗</td>
									<td>
										<p>0120-794889&nbsp;（ナクシたときはハヤクお届け）<br>※通話料無料・年中無休・24時間受付</p>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

			</div>
		</li>
		<!--{/def}-->
		<!--{/ndef}-->
<!--{comment}-->
表示6（ATMﾀﾌﾞ）
<!--{/comment}-->
		<!--{ndef icon_06}-->
		<!--{ndef col_127}-->
		<!--{def col_135}-->
		<li>
			<input id="tab15" type="radio" name="radio" value="" onchange="javascript:changeTabHeight(15);">
			<label class="tabBtn" for="tab15" style="background-color:#009900;">ＡＴＭ</label>
			<div id="tabContents15" class="tabContents" style="border:4px solid #009900;">

				<div id="tab_depositAndAtm" class="sectionDetail clearfix">
					<div class="sectionDetailInner">
						<h3>営業時間</h3>
						<table cellspacing="0" border="1" summary="営業時間" class="tableTypeA">
							<thead>
								<tr>
									<th class="first">&nbsp;</th>
									<th>平日</th>
									<th>土曜日</th>
									<th>日曜日・休日</th>
								</tr>
							</thead>
							<tbody>
								<!--{def col_135}-->
								<tr>
									<th><img src="{rval D_DIR_COMPANY}images/icon_atm.gif">ATM</th>
									<td>
										<!--{def col_135}--><!--{def col_136}-->{rval col_135_TIME}〜{rval col_136_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_135}--><!--{ndef col_136}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_137}--><!--{def col_138}-->{rval col_137_TIME}〜{rval col_138_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_137}--><!--{ndef col_138}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_139}--><!--{def col_140}-->{rval col_139_TIME}〜{rval col_140_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_139}--><!--{ndef col_140}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
								</tr>
								<!--{/def}-->
							</tbody>
						</table>

						<h4>ATMについてのお知らせ</h4>
						<ul class="noListStyle">
							<!--{def col_09lt}-->
							<li>
								時間帯によっては、お取り扱いをしていないサービスがございます。<br>
								<a href="http://www.jp-bank.japanpost.jp/kojin/access/atm/kj_acs_atm_index.html" target="_blank" class="txtIndent newWinAtm hoverTxt">ご利用いただけるサービスや時間帯など詳しくはこちら（ゆうちょ銀行）</a>
							</li>
							<dl>
								<dt>※24時間ご利用いただけるATMについては、以下のとおり一部お取り扱いのできない時間帯があります。</dt>
								<dd>・平日であっても、日曜日・休日の翌日の場合、7:00からお取り扱いを開始します。</dd>
								<dd>・連休の場合は、連休2日目から最終日までのお取扱時間は7:00〜21:00までとなります。</dd>
							</dl>
							<!--{/def}-->
						</ul>
						<h4>ゆうちょ銀行口座から他の金融機関口座への振込利用上の注意</h4>
						<dl>
							<dt>○窓口利用</dt>
							<dd>平日15時以降にお受けした場合、お振込が翌営業日扱いになります。<br>※平日14時30分以降にお受けした場合、または振込事務の繁忙日等やむを得ない事情がある場合は、お振込が翌営業日扱いになることがあります。</dd>
							<dt>○ATM利用</dt>
							<dd>平日15時以降または土曜日、日曜日・休日（12月31日を含みます。）にお取り扱いしたお振込は、翌営業日扱いとなります。なお、1月1日から1月3日まではお取扱いできません。<br>※ATM利用明細票に振込予定日の記載がないものについては、お取り扱い日が振込予定日となります。</dd>
						</dl>
						
						<h3>取り扱い内容</h3>
						<table cellspacing="0" border="1" summary="取り扱い内容" class="tableTypeB">
							<tbody>
								<tr>
									<th>通帳取り扱い（ATM）</th>
									<td><!--{def col_170b}-->○<!--{/def}--><!--{ndef col_170b}-->×<!--{/ndef}--></td>
									<th>硬貨でのお取り扱い（ATM）</th>
									<td><!--{def col_171b}-->○<!--{/def}--><!--{ndef col_171b}-->×<!--{/ndef}--></td>
									<th>払込用紙による通常払込み（ATM）</th>
									<td><!--{def col_70b}-->○<!--{/def}--><!--{ndef col_70b}-->×<!--{/ndef}--></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

			</div>
		</li>
		<!--{/def}-->
		<!--{/ndef}-->
		<!--{/ndef}-->
<!--{comment}-->
表示7（保険ﾀﾌﾞ）
<!--{/comment}-->
		<!--{ndef icon_06}-->
		<!--{def col_143}-->
		<li>
			<input id="tab16" type="radio" name="radio" value="" onchange="javascript:changeTabHeight(16);">
			<label class="tabBtn" for="tab16" style="background-color:#0000CC;">保険</label>
			<div id="tabContents16" class="tabContents" style="border:4px solid #0000CC;">

				<div id="tab_insurance" class="sectionDetail clearfix">
					<div class="sectionDetailInner">
						<!--{def col_20}-->
						<p>{rval col_20} のお取り扱い</p>
						<!--{/def}-->

						<h3>営業時間</h3>
						<table cellspacing="0" border="1" summary="営業時間" class="tableTypeA">
							<thead>
								<tr>
									<th class="first">&nbsp;</th>
									<th>平日</th>
									<th>土曜日</th>
									<th>日曜日・休日</th>
								</tr>
							</thead>
							<tbody>
								<!--{def col_143}-->
								<tr>
									<th><img src="{rval D_DIR_COMPANY}images/icon_hoken.gif">保険窓口</th>
									<td>
										<!--{def col_143}--><!--{def col_144}-->{rval col_143_TIME}〜{rval col_144_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_143}--><!--{ndef col_144}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_145}--><!--{def col_146}-->{rval col_145_TIME}〜{rval col_146_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_145}--><!--{ndef col_146}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_147}--><!--{def col_148}-->{rval col_147_TIME}〜{rval col_148_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_147}--><!--{ndef col_148}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
								</tr>
								<!--{/def}-->
							</tbody>
						</table>
						<!-- 営業時間について -->

						<h3>取り扱い内容</h3>
						<table cellspacing="0" border="1" summary="取り扱い内容" class="tableTypeB">
							<tbody>
								<tr>
									<th>生命保険</th>
									<td><!--{def col_22l03}--><!--{def col_96b}-->○<!--{/def}--><!--{ndef col_96b}-->×<!--{/ndef}--><!--{/def}--><!--{ndef col_22l03}--><!--{def FLAGS_seiho_ANY_ON}-->○<!--{/def}--><!--{ndef FLAGS_seiho_ANY_ON}-->×<!--{/ndef}--><!--{/ndef}--></td>
									<th>バイク自賠責保険</th>
									<td><!--{def col_102b}-->○<!--{/def}--><!--{ndef col_102b}-->×<!--{/ndef}--></td>
									<th>自動車保険</th>
									<td><!--{def col_101b}-->○<!--{/def}--><!--{ndef col_101b}-->×<!--{/ndef}--></td>
								</tr>
								<tr>
									<th>がん保険</th>
									<td><!--{def col_103b}-->○<!--{/def}--><!--{ndef col_103b}-->×<!--{/ndef}--></td>
									<th>引受条件緩和型医療保険</th>
									<td><!--{def col_104b}-->○<!--{/def}--><!--{ndef col_104b}-->×<!--{/ndef}--></td>
									<th>変額年金保険<!--{def col_05b}--><!--{def col_07b}-->（※）<!--{/def}--><!--{/def}--></th>
									<td><!--{def col_93b}-->○<!--{/def}--><!--{ndef col_93b}-->×<!--{/ndef}--></td>
								</tr>
							</tbody>
						</table>
						<!--{def col_05b}--><!--{def col_07b}-->
						<p style="text-align: right;">（※）併設のゆうちょ銀行店舗でお取り扱いしております。</p>
						<!--{/def}--><!--{/def}-->
						<!--{ndef col_96b}--><!--{def FLAGS_seiho_msg_ANY_ON}-->
						<h4>生命保険の取り扱いについて</h4>
						<p>※生命保険のご契約はお受けできませんが、保険料の払込み、満期保険金のお受取りについてはご利用いただけます。</p>
						<!--{/def}--><!--{/ndef}-->

						<h3 id="qus_insurance">お問い合わせ</h3>
						<p class="posB0">※サービスの内容によってお問い合わせ先が異なります。お電話のおかけ間違いにご注意ください。</p>
						<table cellspacing="0" border="1" summary="お問い合わせ" class="tableTypeC teltxt">
							<tbody>
								<tr>
									<th>保険サービスについて</th>
									<td><!--{def col_20}-->{rval col_20}<span>（日本郵便株式会社）</span><!--{/def}--></td>
									<td>
										<!--{def col_23}-->
										<dl class="clearfix teltxt">
											<dt>保険サービスについて</dt>
											<dd>：&nbsp;{rval col_23}</dd>
										</dl>
										<!--{/def}-->
										<!--{def col_25}-->
										<dl class="clearfix teltxt"
											<dt>FAX番号</dt>
											<dd>：&nbsp;{rval col_25}</dd>
										</dl>
										<!--{/def}-->
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

			</div>
		</li>
		<!--{/def}-->
		<!--{/ndef}-->
<!--{comment}-->
表示8（小型ATMﾀﾌﾞ）
<!--{/comment}-->
		<!--{def icon_06}-->
		<!--{ndef col_127}-->
		<!--{def col_135}-->
		<li>
			<input id="tab17" type="radio" name="radio" value="" onchange="javascript:changeTabHeight(17);">
			<label class="tabBtn" for="tab17" style="background-color:#009900;">ＡＴＭ</label>
			<div id="tabContents17" class="tabContents" style="border:4px solid #009900;">

				<div id="tab_depositAndAtm" class="sectionDetail clearfix">
					<div class="sectionDetailInner">
						<h3>営業時間　　<span style="font-weight:normal;">※設置場所の営業時間に準じます</span></h3>
						<table cellspacing="0" border="1" summary="営業時間" class="tableTypeA">
							<thead>
								<tr>
									<th class="first">&nbsp;</th>
									<th>平日</th>
									<th>土曜日</th>
									<th>日曜日・休日</th>
								</tr>
							</thead>
							<tbody>
								<!--{def col_135}-->
								<tr>
									<th><img src="{rval D_DIR_COMPANY}images/icon_atm_s.gif">ATM</th>
									<td>
										<!--{def col_135}--><!--{def col_136}-->{rval col_135_TIME}〜{rval col_136_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_135}--><!--{ndef col_136}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_137}--><!--{def col_138}-->{rval col_137_TIME}〜{rval col_138_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_137}--><!--{ndef col_138}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_139}--><!--{def col_140}-->{rval col_139_TIME}〜{rval col_140_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_139}--><!--{ndef col_140}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
									</td>
								</tr>
								<!--{/def}-->
							</tbody>
						</table>

						<h4>ATMについてのお知らせ</h4>
						<ul class="noListStyle">
							<li>
								※このATMでは、通帳のお取り扱いをしておりません。<br>
								※時間帯によっては、お取り扱いをしていないサービスがございます。<br>
								<a href="http://www.jp-bank.japanpost.jp/kojin/access/atm/kj_acs_atm_index.html" target="_blank" class="txtIndent newWinAtm hoverTxt">ご利用いただけるサービスや時間帯など詳しくはこちら（ゆうちょ銀行）</a><br>
								・第3月曜日は、7:00から営業を開始します。（ただし、設置場所の営業時間に準じて、7:00以降に営業を開始する場合があります。)
							</li>
						</ul>
						
						<h4>ゆうちょ銀行口座から他の金融機関口座への振込利用上の注意</h4>
						<dl>
							<dt>○ATM利用</dt>
							<dd>平日15時以降または土曜日、日曜日・休日（12月31日を含みます。）にお取り扱いしたお振込は、翌営業日扱いとなります。なお、1月1日から1月3日まではお取扱いできません。<br>※ATM利用明細票に振込予定日の記載がないものについては、お取り扱い日が振込予定日となります。</dd>
						</dl>
						
						<h3>取り扱い内容</h3>
						<table cellspacing="0" border="1" summary="取り扱い内容" class="tableTypeB">
							<tbody>
								<tr>
									<th>通帳取り扱い（ATM）</th>
									<td><!--{def col_170b}-->○<!--{/def}--><!--{ndef col_170b}-->×<!--{/ndef}--></td>
									<th>硬貨でのお取り扱い（ATM）</th>
									<td><!--{def col_171b}-->○<!--{/def}--><!--{ndef col_171b}-->×<!--{/ndef}--></td>
									<th>払込用紙による通常払込み（ATM）</th>
									<td><!--{def col_70b}-->○<!--{/def}--><!--{ndef col_70b}-->×<!--{/ndef}--></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

			</div>
		</li>
		<!--{/def}-->
		<!--{/ndef}-->
		<!--{/def}-->
	</ul>
</div>

<script type="text/javascript">
(function () {
	var tabnos = null, tabno, i, len, elm;
<!--{def D_FREE_VAR:jptab_1}-->
	tabnos = [12,13,11,14,15,17,16];
<!--{/def}-->
<!--{def D_FREE_VAR:jptab_2}-->
	tabnos = [14,15,17,11,12,13,16];
<!--{/def}-->
<!--{def D_FREE_VAR:jptab_3}-->
	tabnos = [16,11,12,13,14,15,17];
<!--{/def}-->
	if (tabnos === null) tabnos = [11,12,13,14,15,17,16];
	for(i=0,len=tabnos.length; i<len; i++) {
		tabno = tabnos[i];
		elm = document.getElementById("tab"+tabno);
		if(elm) {
			elm.checked = true;
			changeTabHeight(tabno);
			break;
		}
	}
}());
function changeTabHeight(id) {
	var elm, height = 0;
	elm = document.getElementById("tabContents"+id);
	if (elm) {
		height = elm.offsetHeight;
		elm = document.getElementById("detailTabContents");
		if (elm && height) {
			elm.style.height = (height+50)+'px';
		}
	}
}
</script>
