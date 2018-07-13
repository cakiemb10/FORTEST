	<div id="topMargin"></div>
	<div id="buttonPrint">
		<a onkeypress="javascript:print();" href="javascript:print();"><img src="{rval D_DIR_COMPANY}images/print_btn_print.gif" alt="このページを印刷する" title="このページを印刷する"></a></div>
	<div id="printName">
		<!--{def col_20}-->
		<p><img src="{rval D_DIR_COMPANY}images/icon_post.gif"><b>{rval col_20}</b><!--{def col_21}-->({rval col_21})<!--{/def}--></p>
		<!--{/def}-->
		<!--{def col_29}-->
		<p><img src="{rval D_DIR_COMPANY}images/icon_post.gif"><b>{rval col_29}</b><!--{def col_30}-->({rval col_30})<!--{/def}--></p>
		<!--{/def}-->
		<!--{def col_37}-->
		<p><img src="{rval D_DIR_COMPANY}images/icon_bank.gif"><b>ゆうちょ銀行　{rval col_37}</b><!--{def col_38}-->({rval col_38})<!--{/def}--></p>
		<!--{/def}-->
		</div>
	<table style="border:0;margin:0;padding:0;border-collapse: collapse;">
	<tr><td>
	<div id="printDtl">
		<table id="printDtlOuterTable">
			<tr>
				<td class="printDtlTdL">
					<table class="printDtlTable">
						<tr>
							<td>
								<!--{def col_10}-->〒{rval col_10}<br><!--{/def}-->
								{rval addr}<br><br>
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
							</td>
							<td>
								<!--{def col_14_GT_0}-->
								駐車場あり（{rval col_14}台）
								<!--{/def}-->
								<!--{ndef col_14_GT_0}-->
								駐車場なし
								<!--{/ndef}-->
								<br><br>
								<!--{def col_15}-->
								{rval col_15}
								<!--{/def}-->
							</td>
						</tr>
						<tr>
							<td colspan="2">
							<div id="tab_time" class="sectionDetailP clearfix">
								<table cellspacing="0" border="1" summary="取り扱い時間">
									<tr>
										<th class="first"></th>
										<th class="first">平日</th>
										<th class="first">土曜日</th>
										<th class="first">日曜日・休日</th>
									</tr>
									<!--{ndef icon_06}-->
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
									<!--{/ndef}-->
									<!--{def icon_06}-->
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
									<!--{/def}-->
								</table>
								</div>
								<div id="area_QR" class="unit">
									<p>モバイルサイトは<br>こちら<br><img class="kyotenDtlQR" src="{rval qrimgurl}" alt="" height="82" width="82"></p>
								</div>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</div>
	</td></tr>
	<tr>
		<td>
<!--{def routetype_comb}-->
			<div id="printDtlRoute" style="float:left;width:300px;">
<!--{comment}-->
複合ルート
<!--{/comment}-->
	<h2>ルート情報</h2>
	<p style="color:#f00">地図上のルートは実際のルートと異なる可能性があります。</p>
	<div class="routeBox mb10">
<!--{def comb}-->
		<div class="route-summary2">
			<ul>
	<!--{each comb}-->
				<li>
					<a href="javascript:void(0);" class="routeRank">
						<span class="fb">候補{rval comb/no} （{rval comb/start_hour}:{rval comb/start_min}〜{rval comb/end_hour}:{rval comb/end_min}）</span><span class="rsIcon"><!--{def comb/train}--><img src="{rval D_DIR_COMPANY}images/icon_train.png" alt="電車">&nbsp;<!--{/def}--><!--{def comb/walk}--><img src="{rval D_DIR_COMPANY}images/icon_walk.png" alt="徒歩">&nbsp;<!--{/def}--><!--{def comb/drive}--><img src="{rval D_DIR_COMPANY}images/icon_car.png" alt="車">&nbsp;<!--{/def}--><!--{def comb/airplane}--><img src="{rval D_DIR_COMPANY}images/icon_airplane.png" alt="飛行機">&nbsp;<!--{/def}--><!--{def comb/bus}--><img src="{rval D_DIR_COMPANY}images/icon_bus.png" alt="バス"><!--{/def}--></span>
						<dl class="dl01 w4em">
							<dt>時 間</dt><dd><!--{def comb/total_time_hour}-->{rval comb/total_time_hour}時間<!--{/def}-->{rval comb/total_time_min}分</dd>
							<dt>料 金</dt><dd>{rval comb/fare_format}円</dd>
							<dt>乗 換</dt><dd>{rval comb/transcnt}回</dd>
						</dl>
					</a>
				</li>
				<ul class="routeList3 mt10">
		<!--{each comb/list}-->
			<!--{def comb/list/route_start}-->
					<li class="icon-start">
			<!--{/def}-->
			<!--{ndef comb/list/route_start}-->
			<!--{ndef comb/list/route_end}-->
					<li class="icon-arrow">
			<!--{/ndef}-->
			<!--{/ndef}-->
			<!--{def comb/list/route_end}-->
					<li class="icon-goal">
			<!--{/def}-->
						{rval comb/list/start_name}<!--{def comb/list/train}-->駅<!--{/def}-->
			<!--{def comb/list/train}-->
						<div class="icon-train mt10 mb10">
			<!--{/def}-->
			<!--{def comb/list/walk}-->
						<div class="icon-walk mt10 mb10">
			<!--{/def}-->
			<!--{def comb/list/drive}-->
						<div class="icon-car mt10 mb10">
			<!--{/def}-->
			<!--{def comb/list/airplane}-->
						<div class="icon-airplane mt10 mb10">
			<!--{/def}-->
			<!--{def comb/list/bus}-->
						<div class="icon-bus mt10 mb10">
			<!--{/def}-->
							<div class="ml20 lh12"><!--{def comb/list/walk}-->徒歩<!--{/def}--><!--{ndef comb/list/walk}--><!--{def comb/list/linenm}-->{rval comb/list/linenm}<!--{/def}--><!--{/ndef}--></div>
						</div>
			<!--{ndef comb/list/route_end}-->
						{rval comb/list/end_name}<!--{def comb/list/train}-->駅<!--{/def}-->
			<!--{/ndef}-->
			<!--{def comb/list/route_end}-->
						<!--{def col_20}-->{rval col_20}<br><!--{/def}--><!--{def col_29}-->{rval col_29}<br><!--{/def}--><!--{def col_37}-->ゆうちょ銀行　{rval col_37}<!--{/def}-->
			<!--{/def}-->
					</li>
		<!--{/each}-->
		<!--{def comb/bus}-->
					<li class="bus-comment">
						実際のバス運行ルートとは異なりますので、ご注意ください。
					</li>
		<!--{/def}-->
				</ul>
	<!--{/each}-->
			</ul>
		</div>
<!--{/def}-->
<!--{ndef comb}-->
	出発地から「<!--{def col_20}-->{rval col_20}<!--{/def}--><!--{def col_29}-->{rval col_29}<!--{/def}--><!--{def col_37}-->ゆうちょ銀行　{rval col_37}<!--{/def}-->」までのルートが検索できませんでした。
<!--{/ndef}-->
	</div>
	<input type="hidden" id="bus_latlons_all_print" value='{rval bus_latlons_all}'>
	<img src="{rval D_FREE_VAR:D_DIR_COMPANY_HTTPS}images/spacer.gif" style="display:none;" onload="ZdcEmapSetBusLatlons('print');" />
			</div>
			<div id="" style="float:right;width:330px;">
				<div id="ZdcEmapMap" style="width:330px;height:350px;"></div>
				<div id="mapCaution">
					<p>【地図の二次利用について】このページで公開している地図及び記載内容等、一切の情報は私的利用の範囲を超えて、許可なく複製、改変、送信等、二次利用することは著作権の侵害となりますのでご注意ください。</p>
				</div>
			</div>
<!--{/def}-->
<!--{ndef routetype_comb}-->
	<div id="ZdcEmapMap" style="width:635px;height:350px;"></div>
	<div id="mapCaution">
		<p>【地図の二次利用について】このページで公開している地図及び記載内容等、一切の情報は私的利用の範囲を超えて、許可なく複製、改変、送信等、二次利用することは著作権の侵害となりますのでご注意ください。</p>
	</div>
<!--{/ndef}-->
		</td>
	</tr>
	</table>
<div id="site-infoP">
	<div class="group-id">
		<div class="copy-right">
			<p><img src="{rval D_DIR_COMPANY}images/grouplogo_holdings.gif" alt="JP&nbsp;日本郵政グループ"  /></p>
			<address><img src="{rval D_DIR_COMPANY}images/copyright_holdings.gif" alt="Copyright(C) JAPAN POST HOLDINGS Co.,Ltd.All Rights Reserved."  /></address>
		</div>
	</div>
</div>
