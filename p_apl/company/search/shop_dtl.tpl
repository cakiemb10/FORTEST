<div id="kyotenPrint" onClick="openShopPrint('{rval _urlPrint}');">
	<img src="{rval D_DIR_COMPANY}images/print_b3_2.png" alt="�����ڡ���" title="�����ڡ���">
</div>

<!--{comment}-->
ɽ��1��Ź�޾ܺپ�����
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
				<div class="str_title_hira">�椦�����ԡ�{rval col_37}&nbsp;</div>
				<div class="str_title_kana"><!--{def col_38}-->({rval col_38})<!--{/def}--></div>
			</div>
			<!--{/def}-->
		</h1>
	</div>
</div>

<div id="rightArea" style="float: left;">
	<div id="ZdcEmapDetail" style="line-height:0;">
		<div id="kyotenDtl">
			<h2>����</h2>
			<!--{def col_10}-->��{rval col_10}<br><!--{/def}-->
			{rval addr}
			<div id="exceptAddr">
				<div class="button-layout1"><a href="javascript:void(0);" class="button-streetview" onClick="custOpenGdlg();">�礭���ϿޤǸ���</a></div>
				<h2>��갷�������ӥ�</h2>
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
				<h2>��־�</h2>
				<!--{def col_14_GT_0}-->
				�����{rval col_14}���
				<!--{/def}-->
				<!--{ndef col_14_GT_0}-->
				�ʤ�
				<!--{/ndef}-->
				</tr>
				<!--{def col_15}-->
				<h2>����</h2>
				{rval col_15}
				<!--{/def}-->
				<h2>��Х��륵����</h2>
				<img class="kyotenDtlQR" src="{rval qrimgurl}" alt="" height="82" width="82">
				<h2>�롼�ȸ���</h2>
				<form name="formComb" method="get" action="" onSubmit="searchCombRootDept(this.keyword.value);return false;">
					<input type="text" name="keyword" class="searchFW ph mt5" placeholder="��ȯ�Ϥ����ϡʱ�̾/�����" value="">
					<button type="submit" class="searchButton">������</button>
				</form>
				<div id="ZdcEmapList"></div>
				<div id="ZdcEmapNekiList"></div>
			</div>
			<div id="combDepature" style="display:none;">
				<h2>��ȯ�Ϥθ���ʥ롼�ȸ�����</h2>
				<form name="formComb2" method="get" action="" onSubmit="searchCombRootDept(this.keyword.value);return false;">
					<input type="text" name="keyword" class="searchFW ph mt5" placeholder="��ȯ�Ϥ����ϡʱ�̾/�����" value="">
					<button type="submit" class="searchButton">������</button>
				</form>
				<div id="ZdcEmapSrchCombRootDept" style="position:relative;"></div>
				<a href="javascript:void(0);" onclick="returnShopDetail();">Ź�޾ܺ٤����</a>
			</div>
			<div id="combRoot" style="display:none;">
				<h2>�롼�Ȥθ���ʥ롼�ȸ�����</h2>
				<form name="formComb3" method="get" action="" onSubmit="searchCombRootDept(this.keyword.value);return false;">
					<input type="text" name="keyword" class="searchFW ph mt5" placeholder="��ȯ�Ϥ����ϡʱ�̾/�����" value="">
					<button type="submit" class="searchButton">������</button>
				</form>
				<div id="ZdcEmapSrchCombRootResult"></div>
				<a href="javascript:void(0);" onclick="returnShopDetail();">Ź�޾ܺ٤����</a>
			</div>
			<button type="button" id="dtlmapInit" style="display:none;" onclick="{rval _jsInit}"></button>
		</div>
	</div>
</div>
<div id="leftArea" style="float: right;">
	<div id="ZdcEmapMap" style="width:590px;height:450px;"></div>
	<div id="mapCaution">
		<p>���Ͽޤ������ѤˤĤ��ơۤ��Υڡ����Ǹ������Ƥ����Ͽ޵ڤӵ��������������ڤξ���ϻ�Ū���Ѥ��ϰϤ�Ķ���ơ����Ĥʤ�ʣ�������ѡ��������������Ѥ��뤳�Ȥ�����ο����Ȥʤ�ޤ��ΤǤ���դ���������</p>
	</div>
	<div id="ZdcEmapCond" style="display:none;"></div>
</div>

<div id="detailTabs">
	<ul id="detailTabContents" class="tabsetIn checktab">
<!--{comment}-->
ɽ��2�ʶ�ñ��&ʻ�ߤζɎ��̎ޡ�
<!--{/comment}-->
		<!--{ndef icon_06}-->
		<!--{def col_119}-->
		<li>
			<input id="tab11" type="radio" name="radio" value="" onchange="javascript:changeTabHeight(11);">
			<label class="tabBtn" for="tab11" style="background-color:#FF6600;">͹�ضɤ���Τ��Τ餻</label>
			<div id="tabContents11" class="tabContents" style="border:4px solid #FF6600;">

				<div id="tab_news" class="sectionDetail clearfix">
					<div class="sectionDetailInner">
						<h3>�ĶȻ���</h3>
						<p class="posB0">
						�������ӥ������Ƥˤ�ꤴ���Ѥ�����������֤��ۤʤ�ޤ��Τǡ��ĶȻ��֡���갷�����Ƥξܺ٤ϡ����֤��ڤ��ؤ��Ƥ���ǧ����������</p>


						<table cellspacing="0" border="1" summary="�ĶȻ���" class="tableTypeA">
							<thead>
								<tr>
									<th class="first">&nbsp;</th>
									<th>ʿ��</th>
									<th>������</th>
									<th>������������</th>
									</tr>
							</thead>
							<tbody id="tabOn_time">
								<!--{def col_119}-->
								<tr>
									<th><img src="{rval D_DIR_COMPANY}images/icon_yuubin.gif">͹�����</th>
									<td>
										<!--{def col_119}--><!--{def col_120}-->{rval col_119_TIME}��{rval col_120_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_119}--><!--{ndef col_120}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_121}--><!--{def col_122}-->{rval col_121_TIME}��{rval col_122_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_121}--><!--{ndef col_122}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_123}--><!--{def col_124}-->{rval col_123_TIME}��{rval col_124_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_123}--><!--{ndef col_124}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
								</tr>
								<!--{/def}-->
								<!--{def COLUMNS_yuuyuu_time_ANY_VALUE}-->
								<tr>
									<th><img src="{rval D_DIR_COMPANY}images/icon_yuuyuu.gif">�椦�椦���</th>
									<td>
										<!--{def col_151}--><!--{def col_152}-->
											<span id="tab11_yuyu_timespan1">{rval col_151_TIME}��{rval col_152_TIME}</span>
											<!--{def FLAGS_yuuyuu_bunkatsu_ALL_ON}-->
											<!--{def col_119_GT_col_151_TIME}-->
											<!--{def col_119_LT_col_152_TIME}-->
											<!--{def col_120_GT_col_151_TIME}-->
											<!--{def col_120_LT_col_152_TIME}-->
											{rval col_151_TIME}��{rval col_119_TIME}��{rval col_120_TIME}��{rval col_152_TIME}<script type="text/javascript">document.getElementById("tab11_yuyu_timespan1").style.display="none";</script>
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
										<!--{/def}--><!--{/def}-->
										<!--{ndef col_151}--><!--{ndef col_152}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_153}--><!--{def col_154}-->
											<span id="tab11_yuyu_timespan2">{rval col_153_TIME}��{rval col_154_TIME}</span>
											<!--{def FLAGS_yuuyuu_bunkatsu_ALL_ON}-->
											<!--{def col_121_GT_col_153_TIME}-->
											<!--{def col_121_LT_col_154_TIME}-->
											<!--{def col_122_GT_col_153_TIME}-->
											<!--{def col_122_LT_col_154_TIME}-->
											{rval col_153_TIME}��{rval col_121_TIME}��{rval col_122_TIME}��{rval col_154_TIME}<script type="text/javascript">document.getElementById("tab11_yuyu_timespan2").style.display="none";</script>
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
										<!--{/def}--><!--{/def}-->
										<!--{ndef col_153}--><!--{ndef col_154}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_155}--><!--{def col_156}-->
											<span id="tab11_yuyu_timespan3">{rval col_155_TIME}��{rval col_156_TIME}</span>
											<!--{def FLAGS_yuuyuu_bunkatsu_ALL_ON}-->
											<!--{def col_123_GT_col_155_TIME}-->
											<!--{def col_123_LT_col_156_TIME}-->
											<!--{def col_124_GT_col_155_TIME}-->
											<!--{def col_124_LT_col_156_TIME}-->
											{rval col_155_TIME}��{rval col_123_TIME}��{rval col_124_TIME}��{rval col_156_TIME}<script type="text/javascript">document.getElementById("tab11_yuyu_timespan3").style.display="none";</script>
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
										<!--{/def}--><!--{/def}-->
										<!--{ndef col_155}--><!--{ndef col_156}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
								</tr>
								<!--{/def}-->
								<!--{def col_127}-->
								<tr>
									<th><img src="{rval D_DIR_COMPANY}images/icon_yuucho.gif">�������</th>
									<td>
										<!--{def col_127}--><!--{def col_128}-->{rval col_127_TIME}��{rval col_128_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_127}--><!--{ndef col_128}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_129}--><!--{def col_130}-->{rval col_129_TIME}��{rval col_130_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_129}--><!--{ndef col_130}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_131}--><!--{def col_132}-->{rval col_131_TIME}��{rval col_132_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_131}--><!--{ndef col_132}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
								</tr>
								<!--{/def}-->
								<!--{def col_135}-->
								<tr>
									<th><img src="{rval D_DIR_COMPANY}images/icon_atm.gif">ATM</th>
									<td>
										<!--{def col_135}--><!--{def col_136}-->{rval col_135_TIME}��{rval col_136_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_135}--><!--{ndef col_136}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_137}--><!--{def col_138}-->{rval col_137_TIME}��{rval col_138_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_137}--><!--{ndef col_138}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_139}--><!--{def col_140}-->{rval col_139_TIME}��{rval col_140_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_139}--><!--{ndef col_140}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
								</tr>
								<!--{/def}-->
								<!--{def col_143}-->
								<tr>
									<th><img src="{rval D_DIR_COMPANY}images/icon_hoken.gif">�ݸ����</th>
									<td>
										<!--{def col_143}--><!--{def col_144}-->{rval col_143_TIME}��{rval col_144_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_143}--><!--{ndef col_144}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_145}--><!--{def col_146}-->{rval col_145_TIME}��{rval col_146_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_145}--><!--{ndef col_146}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_147}--><!--{def col_148}-->{rval col_147_TIME}��{rval col_148_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_147}--><!--{ndef col_148}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
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
							<dl><dt>��24���֤����Ѥ���������ATM�ˤĤ��Ƥϡ��ʲ��ΤȤ����������갷���ΤǤ��ʤ������Ӥ�����ޤ���</dt>
							<dd>��ʿ���Ǥ��äƤ⡢�������������������ξ�硢7:00���餪��갷���򳫻Ϥ��ޤ���</dd>
							<dd>��Ϣ�٤ξ��ϡ�Ϣ��2���ܤ���ǽ����ޤǤΤ��谷���֤�7:00��21:00�ޤǤȤʤ�ޤ���</dd>
							</dl>
						</div>
						<!--{/def}-->

						<div class="clearfix">
							<div class="area_newsNews" style="background:none;width:413px;float:left;">
<!--{def cp_img_list}-->
								<h3>���ڤʤ��Τ餻</h3>
<!--{each cp_img_list}-->
								<div style="width:413px; margin-bottom:15px;">
	<!--{def cp_img_list/URL}-->
									<a href="{rval cp_img_list/URL}" target="_blank">
	<!--{/def}-->
										<img src="{rval cp_img_list/IMG_G}" style="width:413px; height:120px;" alt="���Τ餻">
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
								<h3>���餷��٤���͹�ضɥ����ӥ�</h3>
                                                                <a href="https://www.post.japanpost.jp/life/mimamori/" target="_blank" >͹�ضɤΤߤޤ�ꥵ���ӥ�<img style="margin-left: 6px; vertical-align: middle; width: 9px; " width="9" height="9" alt="�̥�����ɥ��ǰ�ư���ޤ�" src="{rval D_DIR_COMPANY}/images/ico_external-window05.gif"></a>
								<br><br>
								
								<!--{def col_105b}-->
								<h4>�����������λ�̳</h4>
								<!--{/def}-->
								<div>
									<dl>
										<!--{def col_106l1}--><!--{def col_107}-->
										<dt>����������ջ�̳��������</dt>
											<dd>{rval col_107}</dd>
										<!--{/def}--><!--{/def}-->
										<!--{def col_108l1}--><!--{def col_109}-->
										<dt>�����������̳(���������̳)�����ơ�</dt>
											<dd>{rval col_109}</dd>
										<!--{/def}--><!--{/def}-->
										<!--{def col_110l1}--><!--{def col_111}-->
										<dt>�����������̳(�������ջ�̳)�����ơ�</dt>
											<dd>{rval col_111}</dd>
										<!--{/def}--><!--{/def}-->
										<!--{def col_112l1}--><!--{def col_113}-->
										<dt>������¾�������������λ�̳�����ơ�</dt>
											<dd>{rval col_113}</dd>
										<!--{/def}--><!--{/def}-->
										<!--{def col_114b}-->
										<dt>����������</dt>
											<dd>������������</dd>
										<!--{/def}-->
									</dl>
								</div>
							</div>
						</div>

						<h3 id="qus">���䤤��碌</h3>
						<p class="posB0">�������ӥ������Ƥˤ�äƤ��䤤��碌�褬�ۤʤ�ޤ��������äΤ������ְ㤤�ˤ���դ���������</p>
						<table cellspacing="0" border="1" summary="���䤤��碌" class="tableTypeC teltxt">
							<tbody>
								<tr>
									<th>����ǤΤ���갷��</th>
									<td>
										<!--{def col_20}-->{rval col_20}<span>������͹�س�����ҡ�</span><!--{/def}-->
									</td>
									<td>
										<!--{def col_23}--><dl class="clearfix teltxt"><dt>�����̳�ˤĤ���</dt><dd>��&nbsp;{rval col_23}</dd></dl><!--{/def}-->
										<!--{def col_25}--><dl class="clearfix teltxt"><dt>FAX�ֹ�</dt><dd>��&nbsp;{rval col_25}</dd></dl><!--{/def}-->
									</td>
								</tr>
								<tr>
									<th>��Ģ�䥫���ɤ�ʶ���������ȼ������������</th>
									<td>������ʶ�����󥿡�<span>�ʳ�����Ҥ椦�����ԡ�</span>�ޤ��Ͼ嵭Ź��
									</td>
									<td>
									<p>0120-794889&nbsp;�ʥʥ������Ȥ��ϥϥ䥯���Ϥ���<br>��������̵����ǯ��̵�١�24���ּ���</p>
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
ɽ��3�ʶ�ñ�Ȥ�͹�؎��̎ޡ�
<!--{/comment}-->
		<!--{ndef icon_06}-->
		<!--{def col_05b}-->
		<!--{ndef col_06b}-->
		<li>
			<input id="tab12" type="radio" name="radio" value="" onchange="javascript:changeTabHeight(12);">
			<label class="tabBtn" for="tab12" style="background-color:#CC0000;">͹��</label>
			<div id="tabContents12" class="tabContents" style="border:4px solid #CC0000;">

				<div id="tab_window" class="sectionDetail clearfix">
					<div class="sectionDetailInner">
						<h3>�ĶȻ���</h3>
						<table cellspacing="0" border="1" summary="�ĶȻ���" class="tableTypeA">
							<thead>
								<tr>
									<th class="first">&nbsp;</th>
									<th>ʿ��</th>
									<th>������</th>
									<th>������������</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th><img src="{rval D_DIR_COMPANY}images/icon_yuubin.gif">͹�����</th>
									<td>
										<!--{def col_119}--><!--{def col_120}-->{rval col_119_TIME}��{rval col_120_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_119}--><!--{ndef col_120}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_121}--><!--{def col_122}-->{rval col_121_TIME}��{rval col_122_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_121}--><!--{ndef col_122}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_123}--><!--{def col_124}-->{rval col_123_TIME}��{rval col_124_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_123}--><!--{ndef col_124}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
								</tr>
							</tbody>
						</table>
						<!-- �ĶȻ��֤ˤĤ��� -->
						<h4<!--{ndef col_126}--> style="display:none;"<!--{/ndef}-->>�ĶȻ��֤ˤĤ���</h4>
						<!--{def col_126}--><p>{rval col_126}</p><!--{/def}-->
						<h3>��갷������</h3>
						<table cellspacing="0" border="1" summary="��갷������" class="tableTypeB">
							<tbody>
								<tr>
									<th>͹��</th>
									<td><!--{def col_51b}-->��<!--{/def}--><!--{ndef col_51b}-->��<!--{/ndef}--></td>
									<th>����</th>
									<td><!--{def col_52b}-->��<!--{/def}--><!--{ndef col_52b}-->��<!--{/ndef}--></td>
									<th>�椦�ѥå�</th>
									<td><!--{def col_53b}-->��<!--{/def}--><!--{ndef col_53b}-->��<!--{/ndef}--></td>
								</tr>
								<tr>
									<th>����ɤ椦�ѥå�</th>
									<td><!--{def col_54b}-->��<!--{/def}--><!--{ndef col_54b}-->��<!--{/ndef}--></td>
									<th>���ƾ���</th>
									<td><!--{def col_55b}-->��<!--{/def}--><!--{ndef col_55b}-->��<!--{/ndef}--></td>
									<th>&nbsp;</th>
									<td>&nbsp;</td>
								</tr>
							</tbody>
						</table>
						<h4<!--{ndef col_55b}--> style="display:none;"<!--{/ndef}-->>���ƾ����μ�갷���ˤĤ���</h4>
						<p<!--{ndef col_55b}--> style="display:none;"<!--{/ndef}-->>�����ƾ����פˤĤ��ޤ��Ƥϡ�������͹�ضɤǡ�����αĶȻ��֤ˤ�����餺��ʿ���ΤߤΤ���갷���Ȥʤ��礬�������ޤ������������������������ˤ����Ѥˤʤ���ϡ�������Ǥ�����������͹�ضɤޤǤ���ǧ���������ޤ��褦����������ꤤ�������ޤ���</p>
					</div>
				</div>

			</div>
		</li>
		<!--{/ndef}-->
		<!--{/def}-->
		<!--{/ndef}-->
<!--{comment}-->
ɽ��4-1��͹��ʻ�ߤ�͹�ءʤ椦�椦�ˎ��̎ޡ�
<!--{/comment}-->
		<!--{ndef icon_06}-->
		<!--{def col_06b}-->
		<li>
			<input id="tab13" type="radio" name="radio" value="" onchange="javascript:changeTabHeight(13);">
			<label class="tabBtn" for="tab13" style="background-color:#CC0000;">͹�ءʤ椦�椦�����</label>
			<div id="tabContents13" class="tabContents" style="border:4px solid #CC0000;">

				<div id="tab_window" class="sectionDetail clearfix">
					<div class="sectionDetailInner">
						<!--{def col_20}--><p>{rval col_20} �Τ���갷��</p><!--{/def}-->
						<h3>�ĶȻ���</h3>
						<table cellspacing="0" border="1" summary="�ĶȻ���" class="tableTypeA">
							<thead>
								<tr>
									<th class="first">&nbsp;</th>
									<th>ʿ��</th>
									<th>������</th>
									<th>������������</th>
								</tr>
							</thead>
							<tbody>
								<!--{def col_119}-->
								<tr>
									<th><img src="{rval D_DIR_COMPANY}images/icon_yuubin.gif">͹�����</th>
									<td>
										<!--{def col_119}--><!--{def col_120}-->{rval col_119_TIME}��{rval col_120_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_119}--><!--{ndef col_120}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_121}--><!--{def col_122}-->{rval col_121_TIME}��{rval col_122_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_121}--><!--{ndef col_122}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_123}--><!--{def col_124}-->{rval col_123_TIME}��{rval col_124_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_123}--><!--{ndef col_124}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
								</tr>
								<!--{/def}-->
								<!--{def COLUMNS_yuuyuu_time_ANY_VALUE}-->
								<tr>
									<th><img src="{rval D_DIR_COMPANY}images/icon_yuuyuu.gif">�椦�椦���</th>
									<td>
										<!--{def col_151}--><!--{def col_152}-->
											<span id="tab13_yuyu_timespan1">{rval col_151_TIME}��{rval col_152_TIME}</span>
											<!--{def FLAGS_yuuyuu_bunkatsu_ALL_ON}-->
											<!--{def col_119_GT_col_151_TIME}-->
											<!--{def col_119_LT_col_152_TIME}-->
											<!--{def col_120_GT_col_151_TIME}-->
											<!--{def col_120_LT_col_152_TIME}-->
											{rval col_151_TIME}��{rval col_119_TIME}��{rval col_120_TIME}��{rval col_152_TIME}<script type="text/javascript">document.getElementById("tab13_yuyu_timespan1").style.display="none";</script>
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
										<!--{/def}--><!--{/def}-->
										<!--{ndef col_151}--><!--{ndef col_152}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_153}--><!--{def col_154}-->
											<span id="tab13_yuyu_timespan2">{rval col_153_TIME}��{rval col_154_TIME}</span>
											<!--{def FLAGS_yuuyuu_bunkatsu_ALL_ON}-->
											<!--{def col_121_GT_col_153_TIME}-->
											<!--{def col_121_LT_col_154_TIME}-->
											<!--{def col_122_GT_col_153_TIME}-->
											<!--{def col_122_LT_col_154_TIME}-->
											{rval col_153_TIME}��{rval col_121_TIME}��{rval col_122_TIME}��{rval col_154_TIME}<script type="text/javascript">document.getElementById("tab13_yuyu_timespan2").style.display="none";</script>
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
										<!--{/def}--><!--{/def}-->
										<!--{ndef col_153}--><!--{ndef col_154}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_155}--><!--{def col_156}-->
											<span id="tab13_yuyu_timespan3">{rval col_155_TIME}��{rval col_156_TIME}</span>
											<!--{def FLAGS_yuuyuu_bunkatsu_ALL_ON}-->
											<!--{def col_123_GT_col_155_TIME}-->
											<!--{def col_123_LT_col_156_TIME}-->
											<!--{def col_124_GT_col_155_TIME}-->
											<!--{def col_124_LT_col_156_TIME}-->
											{rval col_155_TIME}��{rval col_123_TIME}��{rval col_124_TIME}��{rval col_156_TIME}<script type="text/javascript">document.getElementById("tab13_yuyu_timespan3").style.display="none";</script>
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
											<!--{/def}-->
										<!--{/def}--><!--{/def}-->
										<!--{ndef col_155}--><!--{ndef col_156}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
								</tr>
								<!--{/def}-->
							</tbody>
						</table>
						<!-- �ĶȻ��֤ˤĤ��� -->
						<h4<!--{ndef col_126}--><!--{ndef col_158}--> style="display:none;"<!--{/ndef}--><!--{/ndef}-->>�ĶȻ��֤ˤĤ���</h4>
						<!--{def col_126}--><p>{rval col_126}</p><!--{/def}-->
						<!--{def col_158}--><p>{rval col_158}</p><!--{/def}-->
						<h3>��갷������</h3>
						<table cellspacing="0" border="1" summary="��갷������" class="tableTypeB">
							<tbody>
								<tr>
									<th>͹��</th>
									<td><!--{def col_51b}-->��<!--{/def}--><!--{ndef col_51b}-->��<!--{/ndef}--></td>
									<th>����</th>
									<td><!--{def col_52b}-->��<!--{/def}--><!--{ndef col_52b}-->��<!--{/ndef}--></td>
									<th>�椦�ѥå�</th>
									<td><!--{def col_53b}-->��<!--{/def}--><!--{ndef col_53b}-->��<!--{/ndef}--></td>
								</tr>
								<tr>
									<th>����ɤ椦�ѥå�</th>
									<td><!--{def col_54b}-->��<!--{/def}--><!--{ndef col_54b}-->��<!--{/ndef}--></td>
									<th>���ƾ���</th>
									<td><!--{def col_55b}-->��<!--{/def}--><!--{ndef col_55b}-->��<!--{/ndef}--></td>
									<th>&nbsp;</th>
									<td>&nbsp;</td>
								</tr>
							</tbody>
						</table>
						<h4<!--{ndef col_55b}--> style="display:none;"<!--{/ndef}-->>���ƾ����μ�갷���ˤĤ���</h4>
						<p<!--{ndef col_55b}--> style="display:none;"<!--{/ndef}-->>�����ƾ����פˤĤ��ޤ��Ƥϡ�������͹�ضɤǡ�����αĶȻ��֤ˤ�����餺��ʿ���ΤߤΤ���갷���Ȥʤ��礬�������ޤ������������������������ˤ����Ѥˤʤ���ϡ�������Ǥ�����������͹�ضɤޤǤ���ǧ���������ޤ��褦����������ꤤ�������ޤ���</p>
						<h3 id="qus_window">���䤤��碌</h3>
						<p class="posB0">�������ӥ������Ƥˤ�äƤ��䤤��碌�褬�ۤʤ�ޤ��������äΤ������ְ㤤�ˤ���դ���������</p>
						<table cellspacing="0" border="1" summary="���䤤��碌" class="tableTypeC teltxt">
							<tbody>
								<!--{ndef col_05b}-->
								<!--{def COLUMNS_syuuka_tel_ANY_VALUE}-->
								<tr>
									<th>͹�إ����ӥ��ˤĤ���</th>
									<td>
										<!--{def col_33}--><dl class="clearfix teltxt"><dt>��ɽ�����ֹ�</dt><dd>��&nbsp;{rval col_33}</dd></dl><!--{/def}-->
										<!--{def col_34}--><dl class="clearfix teltxt"><dt>���������ֹ�</dt><dd>��&nbsp;{rval col_34}</dd></dl><!--{/def}-->
									</td>
								</tr>
								<!--{/def}-->
								<!--{/ndef}-->
								<!--{def col_05b}-->
								<!--{def COLUMNS_syuuka_tel_ANY_VALUE}-->
								<tr>
									<th>���١������ˤĤ���</th>
									<td>
										<!--{def col_33}--><dl class="clearfix teltxt"><dt>��ɽ�����ֹ�</dt><dd>��&nbsp;{rval col_33}</dd></dl><!--{/def}-->
										<!--{def col_34}--><dl class="clearfix teltxt"><dt>���٤ˤĤ���</dt><dd>��&nbsp;{rval col_34}</dd></dl><!--{/def}-->
									</td>
								</tr>
								<!--{/def}-->
								<!--{def COLUMNS_madoguchi_tel_ANY_VALUE}-->
								<tr>
									<th>���١����������͹�إ����ӥ��ˤĤ���</th>
									<td>
										<!--{def col_23}--><dl class="clearfix teltxt"><dt>�����̳�ˤĤ���</dt><dd>��&nbsp;{rval col_23}</dd></dl><!--{/def}-->
										<!--{def col_25}--><dl class="clearfix teltxt"><dt>FAX�ֹ�</dt><dd>��&nbsp;{rval col_25}</dd></dl><!--{/def}-->
									</td>
								</tr>
								<!--{/def}-->
								<!--{/def}-->
							</tbody>
						</table>

						<!-- ���䤤��碌�κݤ������ -->
						<h4<!--{ndef col_26}--><!--{ndef col_35}--> style="display:none;"<!--{/ndef}--><!--{/ndef}-->>���䤤��碌�κݤ����</h4>
						<dl<!--{ndef col_26}--><!--{ndef col_35}--> style="display:none;"<!--{/ndef}--><!--{/ndef}--> class="dlTypeA">
							<!--{def col_26}--><dd>{rval col_26}</dd><!--{/def}-->
							<!--{def col_35}--><dd>{rval col_35}</dd><!--{/def}-->
						</dl>
						<h5>͹�إ����ӥ����̤ˤĤ���</h5>
						<p class="img_tel">������˥��ڥ졼�����������������ޤ���<br>
						<a href="http://www.post.japanpost.jp/question/contact_us/index2.html" target="_blank" class="newWinNet hoverTxt">͹�إ����ӥ����̤Τ��䤤��碌</a></p>
					</div>
				</div>

			</div>
		</li>
		<!--{/def}-->
		<!--{/ndef}-->
<!--{comment}-->
ɽ��5(��ñ�ȡ���+�椦���硢��+͹��+�椦�����������̎�)
<!--{/comment}-->
		<!--{ndef icon_06}-->
		<!--{def col_127}-->
		<li>
			<input id="tab14" type="radio" name="radio" value="" onchange="javascript:changeTabHeight(14);">
			<label class="tabBtn" for="tab14" style="background-color:#009900;">���⡦���ԣ�</label>
			<div id="tabContents14" class="tabContents" style="border:4px solid #009900;">

				<div id="tab_depositAndAtm" class="sectionDetail clearfix">
					<div class="sectionDetailInner">
						<p>
							<!--{def col_37}-->
							�椦�����ԡ�{rval col_37} <!--{def col_39}-->������̾�Ρ�{rval col_39}��<!--{/def}-->�Τ���갷��
							<!--{/def}-->
							<!--{ndef col_37}-->
							<!--{def col_20}-->
							{rval col_20} �Τ���갷��
							<!--{/def}-->
							<!--{/ndef}-->
							<!--{def col_03}-->
							<br>[�谷Ź�ֹ桧{rval col_03}]
							<!--{/def}-->
						</p>
						
						<h3>�ĶȻ���</h3>
						<table cellspacing="0" border="1" summary="�ĶȻ���" class="tableTypeA">
							<thead>
								<tr>
									<th class="first">&nbsp;</th>
									<th>ʿ��</th>
									<th>������</th>
									<th>������������</th>
								</tr>
							</thead>
							<tbody>
								<!--{def col_127}-->
								<tr>
									<th><img src="{rval D_DIR_COMPANY}images/icon_yuucho.gif">�������</th>
									<td>
										<!--{def col_127}--><!--{def col_128}-->{rval col_127_TIME}��{rval col_128_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_127}--><!--{ndef col_128}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_129}--><!--{def col_130}-->{rval col_129_TIME}��{rval col_130_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_129}--><!--{ndef col_130}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_131}--><!--{def col_132}-->{rval col_131_TIME}��{rval col_132_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_131}--><!--{ndef col_132}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
								</tr>
								<!--{/def}-->
								<!--{def col_135}-->
								<tr>
									<th><img src="{rval D_DIR_COMPANY}images/icon_atm.gif">ATM</th>
									<td>
										<!--{def col_135}--><!--{def col_136}-->{rval col_135_TIME}��{rval col_136_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_135}--><!--{ndef col_136}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_137}--><!--{def col_138}-->{rval col_137_TIME}��{rval col_138_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_137}--><!--{ndef col_138}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_139}--><!--{def col_140}-->{rval col_139_TIME}��{rval col_140_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_139}--><!--{ndef col_140}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
								</tr>
								<!--{/def}-->
							</tbody>
						</table>
<!--{comment}-->
						<div<!--{ndef kid_EQ_300101083000}--><!--{ndef kid_EQ_300101056000}--><!--{ndef kid_EQ_300102001000}--><!--{ndef kid_EQ_300109067000}--><!--{ndef kid_EQ_300141019000}--><!--{ndef kid_EQ_300140194000}--> style="display:none;"<!--{/ndef}--><!--{/ndef}--><!--{/ndef}--><!--{/ndef}--><!--{/ndef}--><!--{/ndef}-->>
						<h4>��������ĶȻ��֤ˤĤ��ƤΤ��Τ餻</h4>
						<ul id="atm_oshirase_contents" class="noListStyle">
							<li>
						<!--{def kid_EQ_300101083000}-->
								2017ǯ4��3���ʷ�ˤ��顢ʿ��������ĶȻ��֤� 9:00 ��16:00���ѹ����ޤ�����<br><!--�椦�����ԡ�����Ź-->
						<!--{/def}-->
						<!--{def kid_EQ_300101056000}-->
								2017ǯ4��3���ʷ�ˤ��顢ʿ��������ĶȻ��֤� 9:00 ��18:00���ѹ����ޤ�����<br><!--�椦�����ԡ�Ω��Ź-->
						<!--{/def}-->
						<!--{def kid_EQ_300102001000}-->
								2017ǯ4��3���ʷ�ˤ��顢ʿ��������ĶȻ��֤� 9:00 ��16:00���ѹ����ޤ�����<br><!--�椦�����ԡ����͹�Ź-->
						<!--{/def}-->
						<!--{def kid_EQ_300109067000}-->
								2017ǯ4��3���ʷ�ˤ��顢ʿ��������ĶȻ��֤� 9:00 ��18:00���ѹ����ޤ�����<br><!--�椦�����ԡ�����Ź-->
						<!--{/def}-->
						<!--{def kid_EQ_300141019000}-->
								2017ǯ4��3���ʷ�ˤ��顢ʿ��������ĶȻ��֤� 9:00 ��16:00���ѹ����ޤ�����<br><!--�椦�����ԡ������Ź-->
						<!--{/def}-->
						<!--{def kid_EQ_300140194000}-->
								2017ǯ4��3���ʷ�ˤ��顢ʿ��������ĶȻ��֤� 9:00 ��18:00���ѹ����ޤ�����<br><!--�椦�����ԡ�����Ź-->
						<!--{/def}-->
								<a href="http://www.jp-bank.japanpost.jp/news/2017/news_id001223.html" target="_blank" class="txtIndent newWinAtm hoverTxt">����Ź�ޤ�����ĶȻ��֤��ѹ����ޤ���</a>
							</li>
						</ul>
						</div>
<!--{/comment}-->
						<div<!--{ndef col_09lt}--><!--{ndef col_70b}--><!--{ndef col_40l02}--> style="display:none;"<!--{/ndef}--><!--{/ndef}--><!--{/ndef}-->>
						<h4>ATM�ˤĤ��ƤΤ��Τ餻</h4>
						<ul id="atm_oshirase_contents" class="noListStyle">
							<!--{def col_09lt}-->
							<li>
								�����Ӥˤ�äƤϡ�����갷���򤷤Ƥ��ʤ������ӥ����������ޤ���<br>
								<a href="http://www.jp-bank.japanpost.jp/kojin/access/atm/kj_acs_atm_index.html" target="_blank" class="txtIndent newWinAtm hoverTxt">�����Ѥ��������륵���ӥ�������Ӥʤɾܤ����Ϥ�����ʤ椦�����ԡ�</a>
							</li>
							<dl>
								<dt>��24���֤����Ѥ���������ATM�ˤĤ��Ƥϡ��ʲ��ΤȤ����������갷���ΤǤ��ʤ������Ӥ�����ޤ���</dt>
								<dd>��ʿ���Ǥ��äƤ⡢�������������������ξ�硢7:00���餪��갷���򳫻Ϥ��ޤ���</dd>
								<dd>��Ϣ�٤ξ��ϡ�Ϣ��2���ܤ���ǽ����ޤǤΤ��谷���֤�7:00��21:00�ޤǤȤʤ�ޤ���</dd>
							</dl>
							<!--{/def}-->
						</ul>
						</div>
						
						<!--{def col_142}-->
						<h4>�ĶȻ��֤ˤĤ���</h4>
						<p></p>
						<p>{rval col_142}</p>
						<!--{/def}-->
						
						<h3>��갷������</h3>
						<table cellspacing="0" border="1" summary="��갷������" class="tableTypeB">
							<tbody>
								<tr>
									<th>����</th>
									<td><!--{def FLAGS_chokin_ANY_ON}-->��<!--{/def}--><!--{ndef FLAGS_chokin_ANY_ON}-->��<!--{/ndef}--></td>
									<th>����</th>
									<td>
										<span id="kashitsuke">��</span>
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
										��<script type="text/javascript">document.getElementById("kashitsuke").style.display="none";</script>
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
									<th>����</th>
									<td><!--{def FLAGS_kawase_ANY_ON}-->��<!--{/def}--><!--{ndef FLAGS_kawase_ANY_ON}-->��<!--{/ndef}--></td>
								</tr>
								<tr>
									<th>����</th>
									<td><!--{def FLAGS_furikae_ANY_ON}-->��<!--{/def}--><!--{ndef FLAGS_furikae_ANY_ON}-->��<!--{/ndef}--></td>
									<th>������¾�ζ�ͻ���ظ��¤ؤ������</th>
									<td><!--{def col_75b}-->��<!--{/def}--><!--{ndef col_75b}-->��<!--{/ndef}--></td>
									<th>�������</th>
									<td><!--{def col_85b}-->��<!--{/def}--><!--{ndef col_85b}-->��<!--{/ndef}--></td>
								</tr>
								<tr>
									<th>����ξ�ء����</th>
									<td><!--{def col_86b}-->��<!--{/def}--><!--{ndef col_86b}-->��<!--{/ndef}--></td>
									<th>���</th>
									<td><!--{def col_91b}-->��<!--{/def}--><!--{ndef col_91b}-->��<!--{/ndef}--></td>
									<th>�����</th>
									<td><!--{def col_92b}-->��<!--{/def}--><!--{ndef col_92b}-->��<!--{/ndef}--></td>
								</tr>
							<!--{def col_07b}-->
								<tr>
									<th>������ǯ��</th>
									<td><!--{def col_94b}-->��<!--{/def}--><!--{ndef col_94b}-->��<!--{/ndef}--></td>
									<th>�ѳ�ǯ���ݸ�</th>
									<td><!--{def col_93b}-->��<!--{/def}--><!--{ndef col_93b}-->��<!--{/ndef}--></td>
									<th>���륬��ԤθĿͥ���Τ���������<br>�ʽ�������</th>
									<td><!--{def col_95b}-->��<!--{/def}--><!--{ndef col_95b}-->��<!--{/ndef}--></td>
								</tr>
								<tr>
									<th>���륬��ԤθĿͥ���Τ���������<br>�ʥѡ����ʥ���󡦥����ɥ����</th>
									<td><!--{def col_168b}-->��<!--{/def}--><!--{ndef col_168b}-->��<!--{/ndef}--></td>
									<th>����������</th>
									<td><!--{def col_65b}-->��<!--{/def}--><!--{ndef col_65b}-->��<!--{/ndef}--></td>
									<th>��ưʧ������</th>
									<td><!--{def col_79b}-->��<!--{/def}--><!--{ndef col_79b}-->��<!--{/ndef}--></td>
								</tr>
								<tr>
									<th>���ڼ�ʧ��</th>
									<td><!--{def col_167b}-->��<!--{/def}--><!--{ndef col_167b}-->��<!--{/ndef}--></td>
									<th>���⾮�ڼ�ο���</th>
									<td><!--{def col_78b}-->��<!--{/def}--><!--{ndef col_78b}-->��<!--{/ndef}--></td>
									<th>�ʰ�ʧ��</th>
									<td><!--{def FLAGS_kanih_ANY_ON}-->��<!--{/def}--><!--{ndef FLAGS_kanih_ANY_ON}-->��<!--{/ndef}--></td>
								</tr>
								<tr>
									<th>JP BANK �����ɡʥ��쥸�åȥ����ɡ�</th>
									<td>��</td>
									<th>��Ģ��갷����ATM��</th>
									<td><!--{def col_170b}-->��<!--{/def}--><!--{ndef col_170b}-->��<!--{/ndef}--></td>
									<th>�ŲߤǤΤ���갷����ATM��</th>
									<td><!--{def col_171b}-->��<!--{/def}--><!--{ndef col_171b}-->��<!--{/ndef}--></td>
								</tr>
								<tr>
									<th>ʧ���ѻ�ˤ���̾�ʧ���ߡ�ATM��</th>
									<td><!--{def col_70b}-->��<!--{/def}--><!--{ndef col_70b}-->��<!--{/ndef}--></td>
									<th>&nbsp;</th><td>&nbsp;</td>
									<th>&nbsp;</th><td>&nbsp;</td>
								</tr>
							<!--{/def}-->
							<!--{ndef col_07b}-->
								<tr>
									<th>������ǯ��</th>
									<td><!--{def col_94b}-->��<!--{/def}--><!--{ndef col_94b}-->��<!--{/ndef}--></td>
									<th>���륬��ԤθĿͥ���Τ���������<br>�ʽ�������</th>
									<td><!--{def col_95b}-->��<!--{/def}--><!--{ndef col_95b}-->��<!--{/ndef}--></td>
									<th>���륬��ԤθĿͥ���Τ���������<br>�ʥѡ����ʥ���󡦥����ɥ����</th>
									<td><!--{def col_168b}-->��<!--{/def}--><!--{ndef col_168b}-->��<!--{/ndef}--></td>
								</tr>
								<tr>
									<th>����������</th>
									<td><!--{def col_65b}-->��<!--{/def}--><!--{ndef col_65b}-->��<!--{/ndef}--></td>
									<th>��ưʧ������</th>
									<td><!--{def col_79b}-->��<!--{/def}--><!--{ndef col_79b}-->��<!--{/ndef}--></td>
									<th>���ڼ�ʧ��</th>
									<td><!--{def col_167b}-->��<!--{/def}--><!--{ndef col_167b}-->��<!--{/ndef}--></td>
								</tr>
								<tr>
									<th>���⾮�ڼ�ο���</th>
									<td><!--{def col_78b}-->��<!--{/def}--><!--{ndef col_78b}-->��<!--{/ndef}--></td>
									<th>�ʰ�ʧ��</th>
									<td><!--{def FLAGS_kanih_ANY_ON}-->��<!--{/def}--><!--{ndef FLAGS_kanih_ANY_ON}-->��<!--{/ndef}--></td>
									<th>JP BANK �����ɡʥ��쥸�åȥ����ɡ�</th>
									<td>
										<span id="jp_bank_card">��</span>
										<!--{def col_05b}-->
										<!--{ndef col_22l03}-->
										<!--{def COLUMNS_chokin_time_ANY_VALUE}-->
										��<script type="text/javascript">document.getElementById("jp_bank_card").style.display="none";</script>
										<!--{/def}-->
										<!--{/ndef}-->
										<!--{/def}-->
									</td>
								</tr>
								<tr>
									<th>��Ģ��갷����ATM��</th>
									<td><!--{def col_170b}-->��<!--{/def}--><!--{ndef col_170b}-->��<!--{/ndef}--></td>
									<th>�ŲߤǤΤ���갷����ATM��</th>
									<td><!--{def col_171b}-->��<!--{/def}--><!--{ndef col_171b}-->��<!--{/ndef}--></td>
									<th>ʧ���ѻ�ˤ���̾�ʧ���ߡ�ATM��</th>
									<td><!--{def col_70b}-->��<!--{/def}--><!--{ndef col_70b}-->��<!--{/ndef}--></td>
								</tr>
							<!--{/ndef}-->
							</tbody>
						</table>
						<!--{def col_86b}-->
						<div style="float:left;">����ˡ�</div>
						<div style="float:left;">���䤹���̲ߤμ��प��Ӻ߸˾����ϼ谷Ź�ˤ��ۤʤ�ޤ����ܤ���������Ǥ��Ҥͤ���������</div>
						<div style="clear:both;"></div>
						<br>
						<!--{/def}-->
						
						<h4>�椦�����Ը��¤���¾�ζ�ͻ���ظ��¤ؤο������Ѿ�����</h4>
						<dl>
							<dt>���������</dt>
							<dd>ʿ��15���ʹߤˤ�����������硢����������Ķ��������ˤʤ�ޤ���<br>��ʿ��14��30ʬ�ʹߤˤ�����������硢�ޤ��Ͽ�����̳����˻�����������ʤ����𤬤�����ϡ�����������Ķ��������ˤʤ뤳�Ȥ�����ޤ���</dd>
							<dt>��ATM����</dt>
							<dd>ʿ��15���ʹߤޤ�������������������������12��31����ޤߤޤ����ˤˤ���갷�������������ϡ���Ķ��������Ȥʤ�ޤ����ʤ���1��1������1��3���ޤǤϤ��谷���Ǥ��ޤ���<br>��ATM��������ɼ�˿���ͽ�����ε��ܤ��ʤ���ΤˤĤ��Ƥϡ�����갷����������ͽ�����Ȥʤ�ޤ���</dd>
						</dl>

						<h3 id="qus_depositAndAtm">���䤤��碌</h3>
						<p class="posB0">�������ӥ������Ƥˤ�äƤ��䤤��碌�褬�ۤʤ�ޤ��������äΤ������ְ㤤�ˤ���դ���������</p>
						<table cellspacing="0" border="1" summary="���䤤��碌" class="tableTypeC teltxt">
							<tbody>
								<tr>
									<th>���⥵���ӥ��ˤĤ���</th>
									<td>
										<!--{def col_37}-->
										{rval col_37}<span>�ʳ�����Ҥ椦�����ԡ�</span>
										<!--{/def}-->
										<!--{ndef col_37}-->
										<!--{def col_20}-->
										{rval col_20}<span>������͹�س�����ҡ�</span>
										<!--{/def}-->
										<!--{/ndef}-->
									</td>
									<td>
										<dl class="clearfix teltxt">
											<dt>���⥵���ӥ��ˤĤ���</dt>
											<dd>
												<!--{def col_41}-->
												��&nbsp;{rval col_41}
												<!--{/def}-->
												<!--{ndef col_41}-->
												<!--{def col_23}-->
												��&nbsp;{rval col_23}
												<!--{/def}-->
												<!--{/ndef}-->
											</dd>
										</dl>
									</td>
								</tr>
								<tr>
									<th>��Ģ�䥫���ɤ�ʶ���������ȼ������������</th>
									<td>������ʶ�����󥿡�<span>�ʳ�����Ҥ椦�����ԡ�</span>�ޤ��Ͼ嵭Ź��</td>
									<td>
										<p>0120-794889&nbsp;�ʥʥ������Ȥ��ϥϥ䥯���Ϥ���<br>��������̵����ǯ��̵�١�24���ּ���</p>
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
ɽ��6��ATM���̎ޡ�
<!--{/comment}-->
		<!--{ndef icon_06}-->
		<!--{ndef col_127}-->
		<!--{def col_135}-->
		<li>
			<input id="tab15" type="radio" name="radio" value="" onchange="javascript:changeTabHeight(15);">
			<label class="tabBtn" for="tab15" style="background-color:#009900;">���ԣ�</label>
			<div id="tabContents15" class="tabContents" style="border:4px solid #009900;">

				<div id="tab_depositAndAtm" class="sectionDetail clearfix">
					<div class="sectionDetailInner">
						<h3>�ĶȻ���</h3>
						<table cellspacing="0" border="1" summary="�ĶȻ���" class="tableTypeA">
							<thead>
								<tr>
									<th class="first">&nbsp;</th>
									<th>ʿ��</th>
									<th>������</th>
									<th>������������</th>
								</tr>
							</thead>
							<tbody>
								<!--{def col_135}-->
								<tr>
									<th><img src="{rval D_DIR_COMPANY}images/icon_atm.gif">ATM</th>
									<td>
										<!--{def col_135}--><!--{def col_136}-->{rval col_135_TIME}��{rval col_136_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_135}--><!--{ndef col_136}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_137}--><!--{def col_138}-->{rval col_137_TIME}��{rval col_138_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_137}--><!--{ndef col_138}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_139}--><!--{def col_140}-->{rval col_139_TIME}��{rval col_140_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_139}--><!--{ndef col_140}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
								</tr>
								<!--{/def}-->
							</tbody>
						</table>

						<h4>ATM�ˤĤ��ƤΤ��Τ餻</h4>
						<ul class="noListStyle">
							<!--{def col_09lt}-->
							<li>
								�����Ӥˤ�äƤϡ�����갷���򤷤Ƥ��ʤ������ӥ����������ޤ���<br>
								<a href="http://www.jp-bank.japanpost.jp/kojin/access/atm/kj_acs_atm_index.html" target="_blank" class="txtIndent newWinAtm hoverTxt">�����Ѥ��������륵���ӥ�������Ӥʤɾܤ����Ϥ�����ʤ椦�����ԡ�</a>
							</li>
							<dl>
								<dt>��24���֤����Ѥ���������ATM�ˤĤ��Ƥϡ��ʲ��ΤȤ����������갷���ΤǤ��ʤ������Ӥ�����ޤ���</dt>
								<dd>��ʿ���Ǥ��äƤ⡢�������������������ξ�硢7:00���餪��갷���򳫻Ϥ��ޤ���</dd>
								<dd>��Ϣ�٤ξ��ϡ�Ϣ��2���ܤ���ǽ����ޤǤΤ��谷���֤�7:00��21:00�ޤǤȤʤ�ޤ���</dd>
							</dl>
							<!--{/def}-->
						</ul>
						<h4>�椦�����Ը��¤���¾�ζ�ͻ���ظ��¤ؤο������Ѿ�����</h4>
						<dl>
							<dt>���������</dt>
							<dd>ʿ��15���ʹߤˤ�����������硢����������Ķ��������ˤʤ�ޤ���<br>��ʿ��14��30ʬ�ʹߤˤ�����������硢�ޤ��Ͽ�����̳����˻�����������ʤ����𤬤�����ϡ�����������Ķ��������ˤʤ뤳�Ȥ�����ޤ���</dd>
							<dt>��ATM����</dt>
							<dd>ʿ��15���ʹߤޤ�������������������������12��31����ޤߤޤ����ˤˤ���갷�������������ϡ���Ķ��������Ȥʤ�ޤ����ʤ���1��1������1��3���ޤǤϤ��谷���Ǥ��ޤ���<br>��ATM��������ɼ�˿���ͽ�����ε��ܤ��ʤ���ΤˤĤ��Ƥϡ�����갷����������ͽ�����Ȥʤ�ޤ���</dd>
						</dl>
						
						<h3>��갷������</h3>
						<table cellspacing="0" border="1" summary="��갷������" class="tableTypeB">
							<tbody>
								<tr>
									<th>��Ģ��갷����ATM��</th>
									<td><!--{def col_170b}-->��<!--{/def}--><!--{ndef col_170b}-->��<!--{/ndef}--></td>
									<th>�ŲߤǤΤ���갷����ATM��</th>
									<td><!--{def col_171b}-->��<!--{/def}--><!--{ndef col_171b}-->��<!--{/ndef}--></td>
									<th>ʧ���ѻ�ˤ���̾�ʧ���ߡ�ATM��</th>
									<td><!--{def col_70b}-->��<!--{/def}--><!--{ndef col_70b}-->��<!--{/ndef}--></td>
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
ɽ��7���ݸ����̎ޡ�
<!--{/comment}-->
		<!--{ndef icon_06}-->
		<!--{def col_143}-->
		<li>
			<input id="tab16" type="radio" name="radio" value="" onchange="javascript:changeTabHeight(16);">
			<label class="tabBtn" for="tab16" style="background-color:#0000CC;">�ݸ�</label>
			<div id="tabContents16" class="tabContents" style="border:4px solid #0000CC;">

				<div id="tab_insurance" class="sectionDetail clearfix">
					<div class="sectionDetailInner">
						<!--{def col_20}-->
						<p>{rval col_20} �Τ���갷��</p>
						<!--{/def}-->

						<h3>�ĶȻ���</h3>
						<table cellspacing="0" border="1" summary="�ĶȻ���" class="tableTypeA">
							<thead>
								<tr>
									<th class="first">&nbsp;</th>
									<th>ʿ��</th>
									<th>������</th>
									<th>������������</th>
								</tr>
							</thead>
							<tbody>
								<!--{def col_143}-->
								<tr>
									<th><img src="{rval D_DIR_COMPANY}images/icon_hoken.gif">�ݸ����</th>
									<td>
										<!--{def col_143}--><!--{def col_144}-->{rval col_143_TIME}��{rval col_144_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_143}--><!--{ndef col_144}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_145}--><!--{def col_146}-->{rval col_145_TIME}��{rval col_146_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_145}--><!--{ndef col_146}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_147}--><!--{def col_148}-->{rval col_147_TIME}��{rval col_148_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_147}--><!--{ndef col_148}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
								</tr>
								<!--{/def}-->
							</tbody>
						</table>
						<!-- �ĶȻ��֤ˤĤ��� -->

						<h3>��갷������</h3>
						<table cellspacing="0" border="1" summary="��갷������" class="tableTypeB">
							<tbody>
								<tr>
									<th>��̿�ݸ�</th>
									<td><!--{def col_22l03}--><!--{def col_96b}-->��<!--{/def}--><!--{ndef col_96b}-->��<!--{/ndef}--><!--{/def}--><!--{ndef col_22l03}--><!--{def FLAGS_seiho_ANY_ON}-->��<!--{/def}--><!--{ndef FLAGS_seiho_ANY_ON}-->��<!--{/ndef}--><!--{/ndef}--></td>
									<th>�Х����������ݸ�</th>
									<td><!--{def col_102b}-->��<!--{/def}--><!--{ndef col_102b}-->��<!--{/ndef}--></td>
									<th>��ư���ݸ�</th>
									<td><!--{def col_101b}-->��<!--{/def}--><!--{ndef col_101b}-->��<!--{/ndef}--></td>
								</tr>
								<tr>
									<th>�����ݸ�</th>
									<td><!--{def col_103b}-->��<!--{/def}--><!--{ndef col_103b}-->��<!--{/ndef}--></td>
									<th>���������·������ݸ�</th>
									<td><!--{def col_104b}-->��<!--{/def}--><!--{ndef col_104b}-->��<!--{/ndef}--></td>
									<th>�ѳ�ǯ���ݸ�<!--{def col_05b}--><!--{def col_07b}-->�ʢ���<!--{/def}--><!--{/def}--></th>
									<td><!--{def col_93b}-->��<!--{/def}--><!--{ndef col_93b}-->��<!--{/ndef}--></td>
								</tr>
							</tbody>
						</table>
						<!--{def col_05b}--><!--{def col_07b}-->
						<p style="text-align: right;">�ʢ���ʻ�ߤΤ椦������Ź�ޤǤ���갷�����Ƥ���ޤ���</p>
						<!--{/def}--><!--{/def}-->
						<!--{ndef col_96b}--><!--{def FLAGS_seiho_msg_ANY_ON}-->
						<h4>��̿�ݸ��μ�갷���ˤĤ���</h4>
						<p>����̿�ݸ��Τ�����Ϥ������Ǥ��ޤ��󤬡��ݸ�����ʧ���ߡ������ݸ���Τ������ˤĤ��ƤϤ����Ѥ��������ޤ���</p>
						<!--{/def}--><!--{/ndef}-->

						<h3 id="qus_insurance">���䤤��碌</h3>
						<p class="posB0">�������ӥ������Ƥˤ�äƤ��䤤��碌�褬�ۤʤ�ޤ��������äΤ������ְ㤤�ˤ���դ���������</p>
						<table cellspacing="0" border="1" summary="���䤤��碌" class="tableTypeC teltxt">
							<tbody>
								<tr>
									<th>�ݸ������ӥ��ˤĤ���</th>
									<td><!--{def col_20}-->{rval col_20}<span>������͹�س�����ҡ�</span><!--{/def}--></td>
									<td>
										<!--{def col_23}-->
										<dl class="clearfix teltxt">
											<dt>�ݸ������ӥ��ˤĤ���</dt>
											<dd>��&nbsp;{rval col_23}</dd>
										</dl>
										<!--{/def}-->
										<!--{def col_25}-->
										<dl class="clearfix teltxt"
											<dt>FAX�ֹ�</dt>
											<dd>��&nbsp;{rval col_25}</dd>
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
ɽ��8�ʾ���ATM���̎ޡ�
<!--{/comment}-->
		<!--{def icon_06}-->
		<!--{ndef col_127}-->
		<!--{def col_135}-->
		<li>
			<input id="tab17" type="radio" name="radio" value="" onchange="javascript:changeTabHeight(17);">
			<label class="tabBtn" for="tab17" style="background-color:#009900;">���ԣ�</label>
			<div id="tabContents17" class="tabContents" style="border:4px solid #009900;">

				<div id="tab_depositAndAtm" class="sectionDetail clearfix">
					<div class="sectionDetailInner">
						<h3>�ĶȻ��֡���<span style="font-weight:normal;">�����־��αĶȻ��֤˽स�ޤ�</span></h3>
						<table cellspacing="0" border="1" summary="�ĶȻ���" class="tableTypeA">
							<thead>
								<tr>
									<th class="first">&nbsp;</th>
									<th>ʿ��</th>
									<th>������</th>
									<th>������������</th>
								</tr>
							</thead>
							<tbody>
								<!--{def col_135}-->
								<tr>
									<th><img src="{rval D_DIR_COMPANY}images/icon_atm_s.gif">ATM</th>
									<td>
										<!--{def col_135}--><!--{def col_136}-->{rval col_135_TIME}��{rval col_136_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_135}--><!--{ndef col_136}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_137}--><!--{def col_138}-->{rval col_137_TIME}��{rval col_138_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_137}--><!--{ndef col_138}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
									<td>
										<!--{def col_139}--><!--{def col_140}-->{rval col_139_TIME}��{rval col_140_TIME}<!--{/def}--><!--{/def}-->
										<!--{ndef col_139}--><!--{ndef col_140}-->����갷�����ޤ���<!--{/ndef}--><!--{/ndef}-->
									</td>
								</tr>
								<!--{/def}-->
							</tbody>
						</table>

						<h4>ATM�ˤĤ��ƤΤ��Τ餻</h4>
						<ul class="noListStyle">
							<li>
								������ATM�Ǥϡ���Ģ�Τ���갷���򤷤Ƥ���ޤ���<br>
								�������Ӥˤ�äƤϡ�����갷���򤷤Ƥ��ʤ������ӥ����������ޤ���<br>
								<a href="http://www.jp-bank.japanpost.jp/kojin/access/atm/kj_acs_atm_index.html" target="_blank" class="txtIndent newWinAtm hoverTxt">�����Ѥ��������륵���ӥ�������Ӥʤɾܤ����Ϥ�����ʤ椦�����ԡ�</a><br>
								����3�������ϡ�7:00����ĶȤ򳫻Ϥ��ޤ����ʤ����������־��αĶȻ��֤˽स�ơ�7:00�ʹߤ˱ĶȤ򳫻Ϥ����礬����ޤ���)
							</li>
						</ul>
						
						<h4>�椦�����Ը��¤���¾�ζ�ͻ���ظ��¤ؤο������Ѿ�����</h4>
						<dl>
							<dt>��ATM����</dt>
							<dd>ʿ��15���ʹߤޤ�������������������������12��31����ޤߤޤ����ˤˤ���갷�������������ϡ���Ķ��������Ȥʤ�ޤ����ʤ���1��1������1��3���ޤǤϤ��谷���Ǥ��ޤ���<br>��ATM��������ɼ�˿���ͽ�����ε��ܤ��ʤ���ΤˤĤ��Ƥϡ�����갷����������ͽ�����Ȥʤ�ޤ���</dd>
						</dl>
						
						<h3>��갷������</h3>
						<table cellspacing="0" border="1" summary="��갷������" class="tableTypeB">
							<tbody>
								<tr>
									<th>��Ģ��갷����ATM��</th>
									<td><!--{def col_170b}-->��<!--{/def}--><!--{ndef col_170b}-->��<!--{/ndef}--></td>
									<th>�ŲߤǤΤ���갷����ATM��</th>
									<td><!--{def col_171b}-->��<!--{/def}--><!--{ndef col_171b}-->��<!--{/ndef}--></td>
									<th>ʧ���ѻ�ˤ���̾�ʧ���ߡ�ATM��</th>
									<td><!--{def col_70b}-->��<!--{/def}--><!--{ndef col_70b}-->��<!--{/ndef}--></td>
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
