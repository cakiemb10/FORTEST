<!--{comment}-->
表示1（店舗詳細上部）
<!--{/comment}-->
  <h1 class="heading-main01 heading-main-ttl02">
    <!--{def col_20}--><span class="icon-heading02">{rval col_20}<span><!--{def col_21}-->（{rval col_21}）<!--{/def}--></span></span><!--{/def}-->
    <!--{def col_29}--><span class="icon-heading02">{rval col_29}<span><!--{def col_30}-->（{rval col_30}）<!--{/def}--></span></span><!--{/def}-->
    <!--{def col_37}--><span class="icon-heading03">ゆうちょ銀行　{rval col_37}<span><!--{def col_38}-->（{rval col_38}）<!--{/def}--></span></span><!--{/def}-->
  </h1>
  <dl class="dl02 w5em">
    <dt>住所</dt>
    <dd>
    <p><!--{def col_10}-->〒 {rval col_10}<br><!--{/def}-->{rval addr}</p>
    <ul>
      <li><a href="{rval _jsShopMap}" class="icon-map">地図で確認</a></li>
      <li><a href="#routesearch" class="icon-route02 inlink">ここへ行く</a></li>
      <li><a href="https://maps.google.com/maps?q={rval lat_wgs_dec},{rval lon_wgs_dec}" target="_blank" class="icon-streetview">ストリートビューで確認</a></li>
    </ul>
    </dd>
    <dt>駐車場</dt>
    <dd><!--{def COL_14_GT_0}-->あり（{rval col_14}台）<!--{/def}--><!--{ndef COL_14_GT_0}-->なし<!--{/ndef}--></dd>
    <!--{def col_15}-->
    <dt>備考</dt>
    <dd>{rval col_15}</dd>
    <!--{/def}-->
  </dl>

  <nav class="tab03 col04">
    <ul>
<!--{comment}-->
表示2（局単独&併設の局ﾀﾌﾞ）
<!--{/comment}-->
      <!--{ndef icon_06}-->
      <!--{def col_119}-->
      <li><a href="" class="orange01 current"><span>郵便局</span></a></li>
      <!--{/def}-->
      <!--{/ndef}-->
<!--{comment}-->
表示3（局単独の郵便ﾀﾌﾞ）
<!--{/comment}-->
      <!--{ndef icon_06}-->
      <!--{def col_05b}-->
      <!--{ndef col_06b}-->
      <li><a href="" class="red01"><span>郵便</span></a></li>
      <!--{/ndef}-->
      <!--{/def}-->
      <!--{/ndef}-->
<!--{comment}-->
表示4-1（郵便併設の郵便（ゆうゆう）ﾀﾌﾞ）
<!--{/comment}-->
      <!--{ndef icon_06}-->
      <!--{def col_06b}-->
      <li><a href="" class="red01"><span>郵便<div class="red01b">（ゆうゆう窓口）</div></span></a></li>
      <!--{/def}-->
      <!--{/ndef}-->
<!--{comment}-->
表示5(局単独、局+ゆうちょ、局+郵便+ゆうちょの貯金ﾀﾌﾞ)
<!--{/comment}-->
      <!--{ndef icon_06}-->
      <!--{def col_127}-->
      <li><a href="" class="green01"><span>貯金･ATM</span></a></li>
      <!--{/def}-->
      <!--{/ndef}-->
<!--{comment}-->
表示6（ATMﾀﾌﾞ）
<!--{/comment}-->
      <!--{ndef icon_06}-->
      <!--{ndef col_127}-->
      <!--{def col_135}-->
      <li><a href="" class="green01"><span>ATM</span></a></li>
      <!--{/def}-->
      <!--{/ndef}-->
      <!--{/ndef}-->
<!--{comment}-->
表示7（保険ﾀﾌﾞ）
<!--{/comment}-->
      <!--{ndef icon_06}-->
      <!--{def col_143}-->
      <li><a href="" class="blue01"><span>保険</span></a></li>
      <!--{/def}-->
      <!--{/ndef}-->
<!--{comment}-->
表示8（小型ATMﾀﾌﾞ）
<!--{/comment}-->
      <!--{def icon_06}-->
      <!--{ndef col_127}-->
      <!--{def col_135}-->
      <li><a href="" class="green01"><span>ATM</span></a></li>
      <!--{/def}-->
      <!--{/ndef}-->
      <!--{/def}-->
    </ul>
  </nav>

<!--{comment}-->
表示2（局単独&併設の局ﾀﾌﾞ）
<!--{/comment}-->
  <!--{ndef icon_06}-->
  <!--{def col_119}-->
  <!-- table-layout01/ -->
  <!-- 表示時はblock-onに -->
  <div class="table-layout01 block-on">
    <h2 class="heading03 bg-orange01">営業時間</h2>
    <!--{def col_119}-->
    <h3 class="heading03 bg-gray01">郵便窓口</h3>
    <table class="table01 w9em">
    <tr>
      <th>平日</th>
      <td>
        <!--{def col_119}--><!--{def col_120}-->{rval COL_119_TIME} 〜 {rval COL_120_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_119}--><!--{ndef col_120}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    <tr>
      <th>土曜日</th>
      <td>
        <!--{def col_121}--><!--{def col_122}-->{rval COL_121_TIME} 〜 {rval COL_122_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_121}--><!--{ndef col_122}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    <tr>
      <th>日曜日･休日</th>
      <td>
        <!--{def col_123}--><!--{def col_124}-->{rval COL_123_TIME} 〜 {rval COL_124_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_123}--><!--{ndef col_124}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    </table>
    <!--{def col_126}-->
    <div class="layout-box01">
      <p>{rval col_126}</p>
    </div>
    <!--{/def}-->
    <!--{/def}-->

    <!--{def COLUMNS_yuuyuu_time_ANY_VALUE}-->
    <h3 class="heading03 bg-gray01">ゆうゆう窓口</h3>
    <table class="table01 w9em">
    <tr>
      <th>平日</th>
      <td>
        <!--{def col_151}--><!--{def col_152}-->
          <span id="tab11_yuyu_timespan1">{rval COL_151_TIME} 〜 {rval COL_152_TIME}</span>
          <!--{def FLAGS_yuuyuu_bunkatsu_ALL_ON}-->
          <!--{def col_119_GT_col_151_TIME}-->
          <!--{def col_119_LT_col_152_TIME}-->
          <!--{def col_120_GT_col_151_TIME}-->
          <!--{def col_120_LT_col_152_TIME}-->
          {rval COL_151_TIME} 〜 {rval COL_119_TIME}／{rval COL_120_TIME} 〜 {rval COL_152_TIME}<script type="text/javascript">document.getElementById("tab11_yuyu_timespan1").style.display="none";</script>
          <!--{/def}-->
          <!--{/def}-->
          <!--{/def}-->
          <!--{/def}-->
          <!--{/def}-->
        <!--{/def}--><!--{/def}-->
        <!--{ndef col_151}--><!--{ndef col_152}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    <tr>
      <th>土曜日</th>
      <td>
        <!--{def col_153}--><!--{def col_154}-->
          <span id="tab11_yuyu_timespan2">{rval COL_153_TIME} 〜 {rval COL_154_TIME}</span>
          <!--{def FLAGS_yuuyuu_bunkatsu_ALL_ON}-->
          <!--{def col_121_GT_col_153_TIME}-->
          <!--{def col_121_LT_col_154_TIME}-->
          <!--{def col_122_GT_col_153_TIME}-->
          <!--{def col_122_LT_col_154_TIME}-->
          {rval COL_153_TIME} 〜 {rval COL_121_TIME}／{rval COL_122_TIME} 〜 {rval COL_154_TIME}<script type="text/javascript">document.getElementById("tab11_yuyu_timespan2").style.display="none";</script>
          <!--{/def}-->
          <!--{/def}-->
          <!--{/def}-->
          <!--{/def}-->
          <!--{/def}-->
        <!--{/def}--><!--{/def}-->
        <!--{ndef col_153}--><!--{ndef col_154}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    <tr>
      <th>日曜日･休日</th>
      <td>
        <!--{def col_155}--><!--{def col_156}-->
          <span id="tab11_yuyu_timespan3">{rval COL_155_TIME} 〜 {rval COL_156_TIME}</span>
          <!--{def FLAGS_yuuyuu_bunkatsu_ALL_ON}-->
          <!--{def col_123_GT_col_155_TIME}-->
          <!--{def col_123_LT_col_156_TIME}-->
          <!--{def col_124_GT_col_155_TIME}-->
          <!--{def col_124_LT_col_156_TIME}-->
          {rval COL_155_TIME} 〜 {rval COL_123_TIME}／{rval COL_124_TIME} 〜 {rval COL_156_TIME}<script type="text/javascript">document.getElementById("tab11_yuyu_timespan3").style.display="none";</script>
          <!--{/def}-->
          <!--{/def}-->
          <!--{/def}-->
          <!--{/def}-->
          <!--{/def}-->
        <!--{/def}--><!--{/def}-->
        <!--{ndef col_155}--><!--{ndef col_156}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    </table>
    <!--{def col_158}-->
    <div class="layout-box01">
      <p>{rval col_158}</p>
    </div>
    <!--{/def}-->
    <!--{/def}-->

    <!--{def col_127}-->
    <h3 class="heading03 bg-gray01">貯金窓口</h3>
    <table class="table01 w9em">
    <tr>
      <th>平日</th>
      <td>
        <!--{def col_127}--><!--{def col_128}-->{rval COL_127_TIME} 〜 {rval COL_128_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_127}--><!--{ndef col_128}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    <tr>
      <th>土曜日</th>
      <td>
        <!--{def col_129}--><!--{def col_130}-->{rval COL_129_TIME} 〜 {rval COL_130_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_129}--><!--{ndef col_130}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    <tr>
      <th>日曜日･休日</th>
      <td>
        <!--{def col_131}--><!--{def col_132}-->{rval COL_131_TIME} 〜 {rval COL_132_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_131}--><!--{ndef col_132}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    </table>
    <!--{/def}-->

    <!--{def col_135}-->
    <h3 class="heading03 bg-gray01">ATM</h3>
    <table class="table01 w9em">
    <tr>
      <th>平日</th>
      <td>
        <!--{def col_135}--><!--{def col_136}-->{rval COL_135_TIME} 〜 {rval COL_136_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_135}--><!--{ndef col_136}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    <tr>
      <th>土曜日</th>
      <td>
        <!--{def col_137}--><!--{def col_138}-->{rval COL_137_TIME} 〜 {rval COL_138_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_137}--><!--{ndef col_138}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    <tr>
      <th>日曜日･休日</th>
      <td>
        <!--{def col_139}--><!--{def col_140}-->{rval COL_139_TIME} 〜 {rval COL_140_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_139}--><!--{ndef col_140}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    <!--{/def}-->
    </table>
    <!--{def col_09lt}-->
    <div class="layout-box01">
      <p>※預入など、時間帯によっては、お取り扱いをしていないサービスがございます。<br><a href="http://www.jp-bank.japanpost.jp/kojin/access/atm/kj_acs_atm_index.html" target="_blank">ご利用いただけるサービスや時間帯など詳しくはこちら（ゆうちょ銀行）</a></p>
    </div>
    <!--{/def}-->

    <!--{def col_143}-->
    <h3 class="heading03 bg-gray01">保険窓口</h3>
    <table class="table01 w9em">
    <tr>
      <th>平日</th>
      <td>
        <!--{def col_143}--><!--{def col_144}-->{rval COL_143_TIME} 〜 {rval COL_144_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_143}--><!--{ndef col_144}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    <tr>
      <th>土曜日</th>
      <td>
        <!--{def col_145}--><!--{def col_146}-->{rval COL_145_TIME} 〜 {rval COL_146_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_145}--><!--{ndef col_146}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    <tr>
      <th>日曜日･休日</th>
      <td>
        <!--{def col_147}--><!--{def col_148}-->{rval COL_147_TIME} 〜 {rval COL_148_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_147}--><!--{ndef col_148}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    </table>
    <!--{/def}-->

    <p<!--{ndef col_182}--><!--{ndef col_183}--> style="display:none;"<!--{/ndef}--><!--{/ndef}-->><!--{def col_182}-->{rval col_182}<br><!--{/def}--><!--{def col_183}-->{rval col_183}<!--{/def}--></p>

    <!--{def COLUMNS_kurashi_service_msg_ANY_MATCH_VALUE}-->
    <h2 class="heading03 bg-orange01">地方公共団体事務・宝くじ</h2>
    <table class="table02">
    <tr>
      <th class="w99p">証明書交付事務</th>
      <td><!--{def col_106l1}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_106l1}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">受託窓口事務(受託販売事務)</th>
      <td><!--{def col_108l1}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_108l1}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">受託窓口事務(受託交付事務)</th>
      <td><!--{def col_110l1}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_110l1}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">その他の地方公共団体事務</th>
      <td><!--{def col_112l1}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_112l1}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">宝くじの販売</th>
      <td><!--{def col_114b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_114b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    </table>
    <p>各取り扱い内容の詳細については<a href="{rval pcdtlurl_http}" target="_blank">PCサイト</a>をご確認ください</p>
    <!--{/def}-->

    <h2 class="heading03 bg-orange01">お問い合わせ</h2>
    <p>※サービスの内容によってお問い合わせ先が異なります。</p>

    <h3 class="heading03 bg-gray01">窓口でのお取り扱い</h3>
    <table class="table01 w13em">
    <tr>
      <th><!--{def col_20}-->{rval col_20}<br>（日本郵便株式会社）<!--{/def}--></th>
      <td>
        <!--{def col_23}-->窓口業務について：<br>&nbsp;&nbsp;<a href="tel:{rval col_23_tel_atag}">{rval col_23}</a><!--{/def}--><br>
        <!--{def col_25}-->FAX番号：<br>&nbsp;&nbsp;{rval col_25}<!--{/def}-->
      </td>
    </tr>
    </table>

    <!--{def col_06b}-->
    <!--{ndef col_05b}-->
    <!--{def COLUMNS_syuuka_tel_ANY_VALUE}-->
    <h3 class="heading03 bg-gray01">郵便サービスについて</h3>
    <table class="table01 w13em">
    <tr>
      <th><!--{def col_20}-->{rval col_20}<br>（日本郵便株式会社）<!--{/def}--></th>
      <td>
        <!--{def col_33}-->代表電話番号：<br>&nbsp;&nbsp;<a href="tel:{rval col_33_tel_atag}">{rval col_33}</a><!--{/def}--><br>
        <!--{def col_34}-->集荷電話番号：<br>&nbsp;&nbsp;<a href="tel:{rval col_34_tel_atag}">{rval col_34}</a><!--{/def}-->
      </td>
    </tr>
    </table>
    <!--{/def}-->
    <!--{/ndef}-->
    <!--{def col_05b}-->
    <!--{def COLUMNS_syuuka_tel_ANY_VALUE}-->
    <h3 class="heading03 bg-gray01">集荷・配送について</h3>
    <table class="table01 w13em">
    <tr>
      <th><!--{def col_20}-->{rval col_20}<br>（日本郵便株式会社）<!--{/def}--></th>
      <td>
        <!--{def col_33}-->代表電話番号：<br>&nbsp;&nbsp;<a href="tel:{rval col_33_tel_atag}">{rval col_33}</a><!--{/def}--><br>
        <!--{def col_34}-->集荷について：<br>&nbsp;&nbsp;<a href="tel:{rval col_34_tel_atag}">{rval col_34}</a><!--{/def}-->
      </td>
    </tr>
    </table>
    <!--{/def}-->
    <!--{def COLUMNS_madoguchi_tel_ANY_VALUE}-->
    <h3 class="heading03 bg-gray01">集荷・配送を除く郵便サービスについて</h3>
    <table class="table01 w13em">
    <tr>
      <th><!--{def col_20}-->{rval col_20}<br>（日本郵便株式会社）<!--{/def}--></th>
      <td>
        <!--{def col_23}-->窓口業務について：<br>&nbsp;&nbsp;<a href="tel:{rval col_23_tel_atag}">{rval col_23}</a><!--{/def}--><br>
        <!--{def col_25}-->FAX番号：<br>&nbsp;&nbsp;{rval col_25}<!--{/def}-->
      </td>
    </tr>
    </table>
    <!--{/def}-->
    <!--{/def}-->
    <div class="layout-box01"<!--{ndef col_26}--><!--{ndef col_35}--> style="display:none;"<!--{/ndef}--><!--{/ndef}-->>
      <!--{def col_26}--><p>{rval col_26}</p><!--{/def}-->
      <!--{def col_35}--><p>{rval col_35}</p><!--{/def}-->
    </div>
    <!--{/def}-->

    <!--{def col_127}-->
    <h3 class="heading03 bg-gray01">貯金サービスについて</h3>
    <table class="table01 w13em">
    <tr>
      <th>
        <!--{def col_37}-->
        {rval col_37}<br><span>（株式会社ゆうちょ銀行）</span>
        <!--{/def}-->
        <!--{ndef col_37}-->
        <!--{def col_20}-->
        {rval col_20}<br><span>（日本郵便株式会社）</span>
        <!--{/def}-->
        <!--{/ndef}-->
      </th>
      <td>
        <!--{def col_41}-->
        貯金サービスについて：<br>&nbsp;&nbsp;<a href="tel:{rval col_41_tel_atag}">{rval col_41}</a>
        <!--{/def}-->
        <!--{ndef col_41}-->
        <!--{def col_23}-->
        貯金サービスについて：<br>&nbsp;&nbsp;<a href="tel:{rval col_23_tel_atag}">{rval col_23}</a>
        <!--{/def}-->
        <!--{/ndef}-->
      </td>
    </tr>
    </table>
    <!--{/def}-->

    <!--{def col_143}-->
    <h3 class="heading03 bg-gray01">保険サービスについて</h3>
    <table class="table01 w13em">
    <tr>
      <th><!--{def col_20}-->{rval col_20}<br>（日本郵便株式会社）<!--{/def}--></th>
      <td>
        <!--{def col_23}-->保険サービスについて：<br>&nbsp;&nbsp;<a href="tel:{rval col_23_tel_atag}">{rval col_23}</a><!--{/def}--><br>
        <!--{def col_25}-->FAX番号：<br>&nbsp;&nbsp;{rval col_25}<!--{/def}-->
      </td>
    </tr>
    </table>
    <!--{/def}-->

    <h3 class="heading03 bg-gray01">通帳やカードの紛失・盗難に伴うお取引の停止</h3>
    <table class="table01 w13em">
    <tr>
      <th>フリーダイヤル<span class="red01 block">（年中無休/24時間受付)</span></th>
      <td><a href="tel:0120794889">0120-794889</a></td>
    </tr>
    </table>
  </div>
  <!-- /table-layout01 -->
  <!--{/def}-->
  <!--{/ndef}-->

<!--{comment}-->
表示3（局単独の郵便ﾀﾌﾞ）
<!--{/comment}-->
  <!--{ndef icon_06}-->
  <!--{def col_05b}-->
  <!--{ndef col_06b}-->
  <!-- table-layout02/ -->
  <!-- 表示時はblock-offに -->
  <div class="table-layout02 block-off">
    <h2 class="heading03 bg-red01">営業時間</h2>
    <h3 class="heading03 bg-gray01">郵便窓口</h3>
    <table class="table01 w9em">
    <tr>
      <th>平日</th>
      <td>
        <!--{def col_119}--><!--{def col_120}-->{rval COL_119_TIME} 〜 {rval COL_120_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_119}--><!--{ndef col_120}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    <tr>
      <th>土曜日</th>
      <td>
        <!--{def col_121}--><!--{def col_122}-->{rval COL_121_TIME} 〜 {rval COL_122_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_121}--><!--{ndef col_122}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    <tr>
      <th>日曜日･休日</th>
      <td>
        <!--{def col_123}--><!--{def col_124}-->{rval COL_123_TIME} 〜 {rval COL_124_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_123}--><!--{ndef col_124}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    </table>
    <!--{def col_126}-->
    <div class="layout-box01">
      <p>{rval col_126}</p>
    </div>
    <!--{/def}-->

    <h2 class="heading03 bg-red01">取り扱い内容</h2>
    <table class="table02">
    <tr>
      <th class="w99p">郵便</th>
      <td><!--{def col_51b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_51b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">印紙</th>
      <td><!--{def col_52b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_52b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">ゆうパック</th>
      <td><!--{def col_53b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_53b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">チルドゆうパック</th>
      <td><!--{def col_54b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_54b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">内容証明</th>
      <td><!--{def col_55b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_55b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    </table>
    <!--{def col_55b}-->
    <h4 class="strong">内容証明の取り扱いについて</h4>
    <p>「内容証明」につきましては、一部の郵便局で、窓口の営業時間にかかわらず、平日のみのお取り扱いとなる場合がございます。土曜日、日曜日、休日にご利用になる場合は、お手数ですが、事前に郵便局までご確認いただきますよう、よろしくお願いいたします。</p>
    <!--{/def}-->
  </div>
  <!-- /table-layout02 -->
  <!--{/ndef}-->
  <!--{/def}-->
  <!--{/ndef}-->

<!--{comment}-->
表示4-1（郵便併設の郵便（ゆうゆう）ﾀﾌﾞ）
<!--{/comment}-->
  <!--{ndef icon_06}-->
  <!--{def col_06b}-->
  <!-- table-layout02/ -->
  <!-- 表示時はblock-offに -->
  <div class="table-layout02 block-off">
    <!--{def col_20}-->
    <h4>{rval col_20} のお取り扱い</h4>
    <!--{/def}-->
    <h2 class="heading03 bg-red01">営業時間</h2>
    <!--{def col_119}-->
    <h3 class="heading03 bg-gray01">郵便窓口</h3>
    <table class="table01 w9em">
    <tr>
      <th>平日</th>
      <td>
        <!--{def col_119}--><!--{def col_120}-->{rval COL_119_TIME} 〜 {rval COL_120_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_119}--><!--{ndef col_120}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    <tr>
      <th>土曜日</th>
      <td>
        <!--{def col_121}--><!--{def col_122}-->{rval COL_121_TIME} 〜 {rval COL_122_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_121}--><!--{ndef col_122}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    <tr>
      <th>日曜日･休日</th>
      <td>
        <!--{def col_123}--><!--{def col_124}-->{rval COL_123_TIME} 〜 {rval COL_124_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_123}--><!--{ndef col_124}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    </table>
    <!--{def col_126}-->
    <div class="layout-box01">
      <p>{rval col_126}</p>
    </div>
    <!--{/def}-->
    <!--{/def}-->

    <!--{def COLUMNS_yuuyuu_time_ANY_VALUE}-->
    <h3 class="heading03 bg-gray01">ゆうゆう窓口</h3>
    <table class="table01 w9em">
    <tr>
      <th>平日</th>
      <td>
        <!--{def col_151}--><!--{def col_152}-->
          <span id="tab13_yuyu_timespan1">{rval COL_151_TIME} 〜 {rval COL_152_TIME}</span>
          <!--{def FLAGS_yuuyuu_bunkatsu_ALL_ON}-->
          <!--{def col_119_GT_col_151_TIME}-->
          <!--{def col_119_LT_col_152_TIME}-->
          <!--{def col_120_GT_col_151_TIME}-->
          <!--{def col_120_LT_col_152_TIME}-->
          {rval COL_151_TIME} 〜 {rval COL_119_TIME}／{rval COL_120_TIME} 〜 {rval COL_152_TIME}<script type="text/javascript">document.getElementById("tab13_yuyu_timespan1").style.display="none";</script>
          <!--{/def}-->
          <!--{/def}-->
          <!--{/def}-->
          <!--{/def}-->
          <!--{/def}-->
        <!--{/def}--><!--{/def}-->
        <!--{ndef col_151}--><!--{ndef col_152}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    <tr>
      <th>土曜日</th>
      <td>
        <!--{def col_153}--><!--{def col_154}-->
          <span id="tab13_yuyu_timespan2">{rval COL_153_TIME} 〜 {rval COL_154_TIME}</span>
          <!--{def FLAGS_yuuyuu_bunkatsu_ALL_ON}-->
          <!--{def col_121_GT_col_153_TIME}-->
          <!--{def col_121_LT_col_154_TIME}-->
          <!--{def col_122_GT_col_153_TIME}-->
          <!--{def col_122_LT_col_154_TIME}-->
          {rval COL_153_TIME} 〜 {rval COL_121_TIME}／{rval COL_122_TIME} 〜 {rval COL_154_TIME}<script type="text/javascript">document.getElementById("tab13_yuyu_timespan2").style.display="none";</script>
          <!--{/def}-->
          <!--{/def}-->
          <!--{/def}-->
          <!--{/def}-->
          <!--{/def}-->
        <!--{/def}--><!--{/def}-->
        <!--{ndef col_153}--><!--{ndef col_154}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    <tr>
      <th>日曜日･休日</th>
      <td>
        <!--{def col_155}--><!--{def col_156}-->
          <span id="tab13_yuyu_timespan3">{rval COL_155_TIME} 〜 {rval COL_156_TIME}</span>
          <!--{def FLAGS_yuuyuu_bunkatsu_ALL_ON}-->
          <!--{def col_123_GT_col_155_TIME}-->
          <!--{def col_123_LT_col_156_TIME}-->
          <!--{def col_124_GT_col_155_TIME}-->
          <!--{def col_124_LT_col_156_TIME}-->
          {rval COL_155_TIME} 〜 {rval COL_123_TIME}／{rval COL_124_TIME} 〜 {rval COL_156_TIME}<script type="text/javascript">document.getElementById("tab13_yuyu_timespan3").style.display="none";</script>
          <!--{/def}-->
          <!--{/def}-->
          <!--{/def}-->
          <!--{/def}-->
          <!--{/def}-->
        <!--{/def}--><!--{/def}-->
        <!--{ndef col_155}--><!--{ndef col_156}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    </table>
    <!--{def col_158}-->
    <div class="layout-box01">
      <p>{rval col_158}</p>
    </div>
    <!--{/def}-->
    <!--{/def}-->

    <h2 class="heading03 bg-red01">取り扱い内容</h2>
    <table class="table02">
    <tr>
      <th class="w99p">郵便</th>
      <td><!--{def col_51b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_51b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">印紙</th>
      <td><!--{def col_52b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_52b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">ゆうパック</th>
      <td><!--{def col_53b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_53b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">チルドゆうパック</th>
      <td><!--{def col_54b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_54b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">内容証明</th>
      <td><!--{def col_55b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_55b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    </table>
    <!--{def col_55b}-->
    <h4 class="strong">内容証明の取り扱いについて</h4>
    <p>「内容証明」につきましては、一部の郵便局で、窓口の営業時間にかかわらず、平日のみのお取り扱いとなる場合がございます。土曜日、日曜日、休日にご利用になる場合は、お手数ですが、事前に郵便局までご確認いただきますよう、よろしくお願いいたします。</p>
    <!--{/def}-->

    <h2 class="heading03 bg-red01">お問い合わせ</h2>
    <p>※サービスの内容によってお問い合わせ先が異なります。</p>

    <!--{ndef col_05b}-->
    <!--{def COLUMNS_syuuka_tel_ANY_VALUE}-->
    <h3 class="heading03 bg-gray01">郵便サービスについて</h3>
    <table class="table01 w13em">
    <tr>
      <!--{comment}--><!--ゆうゆう窓口単独の場合の「お問い合わせ」で、郵便局名等の表示がないため、左側のセルが空になってしまい不自然なので、この場合だけ左のセルを無くして1列の表にしてください。--><!--{/comment}-->
      <!--{def col_20}--><th>{rval col_20}<br>（日本郵便株式会社）</th><!--{/def}-->
      <td>
        <!--{def col_33}-->代表電話番号：<br>&nbsp;&nbsp;<a href="tel:{rval col_33_tel_atag}">{rval col_33}</a><!--{/def}--><br>
        <!--{def col_34}-->集荷電話番号：<br>&nbsp;&nbsp;<a href="tel:{rval col_34_tel_atag}">{rval col_34}</a><!--{/def}-->
      </td>
    </tr>
    </table>
    <!--{/def}-->
    <!--{/ndef}-->
    <!--{def col_05b}-->
    <!--{def COLUMNS_syuuka_tel_ANY_VALUE}-->
    <h3 class="heading03 bg-gray01">集荷・配送について</h3>
    <table class="table01 w13em">
    <tr>
      <th><!--{def col_20}-->{rval col_20}<br>（日本郵便株式会社）<!--{/def}--></th>
      <td>
        <!--{def col_33}-->代表電話番号：<br>&nbsp;&nbsp;<a href="tel:{rval col_33_tel_atag}">{rval col_33}</a><!--{/def}--><br>
        <!--{def col_34}-->集荷について：<br>&nbsp;&nbsp;<a href="tel:{rval col_34_tel_atag}">{rval col_34}</a><!--{/def}-->
      </td>
    </tr>
    </table>
    <!--{/def}-->
    <!--{def COLUMNS_madoguchi_tel_ANY_VALUE}-->
    <h3 class="heading03 bg-gray01">集荷・配送を除く郵便サービスについて</h3>
    <table class="table01 w13em">
    <tr>
      <th><!--{def col_20}-->{rval col_20}<br>（日本郵便株式会社）<!--{/def}--></th>
      <td>
        <!--{def col_23}-->窓口業務について：<br>&nbsp;&nbsp;<a href="tel:{rval col_23_tel_atag}">{rval col_23}</a><!--{/def}--><br>
        <!--{def col_25}-->FAX番号：<br>&nbsp;&nbsp;{rval col_25}<!--{/def}-->
      </td>
    </tr>
    </table>
    <!--{/def}-->
    <!--{/def}-->
    <div class="layout-box01"<!--{ndef col_26}--><!--{ndef col_35}--> style="display:none;"<!--{/ndef}--><!--{/ndef}-->>
      <!--{def col_26}--><p>{rval col_26}</p><!--{/def}-->
      <!--{def col_35}--><p>{rval col_35}</p><!--{/def}-->
    </div>
  </div>
  <!-- /table-layout02 -->
  <!--{/def}-->
  <!--{/ndef}-->

<!--{comment}-->
表示5(局単独、局+ゆうちょ、局+郵便+ゆうちょの貯金ﾀﾌﾞ)
<!--{/comment}-->
  <!--{ndef icon_06}-->
  <!--{def col_127}-->
  <!-- table-layout03/ -->
  <!-- 表示時はblock-offに -->
  <div class="table-layout03 block-off">
    <!--{def col_37}-->
    <h4>ゆうちょ銀行　{rval col_37} <!--{def col_39}-->（正式名称：{rval col_39}）<!--{/def}-->のお取り扱い</h4>
    <!--{/def}-->
    <!--{ndef col_37}-->
    <!--{def col_20}-->
    <h4>{rval col_20} のお取り扱い</h4>
    <!--{/def}-->
    <!--{/ndef}-->
    <!--{def col_03}-->
    <h4>[取扱店番号：{rval col_03}]</h4>
    <!--{/def}-->
    <h2 class="heading03 bg-green01">営業時間</h2>
    <!--{def col_127}-->
    <h3 class="heading03 bg-gray01">貯金窓口</h3>
    <table class="table01 w9em">
    <tr>
      <th>平日</th>
      <td>
        <!--{def col_127}--><!--{def col_128}-->{rval COL_127_TIME} 〜 {rval COL_128_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_127}--><!--{ndef col_128}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    <tr>
      <th>土曜日</th>
      <td>
        <!--{def col_129}--><!--{def col_130}-->{rval COL_129_TIME} 〜 {rval COL_130_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_129}--><!--{ndef col_130}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    <tr>
      <th>日曜日･休日</th>
      <td>
        <!--{def col_131}--><!--{def col_132}-->{rval COL_131_TIME} 〜 {rval COL_132_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_131}--><!--{ndef col_132}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    </table>
    <!--{/def}-->

<!--{comment}-->
    <div class="layout-box01"<!--{ndef kid_EQ_300101083000}--><!--{ndef kid_EQ_300101056000}--><!--{ndef kid_EQ_300102001000}--><!--{ndef kid_EQ_300109067000}--><!--{ndef kid_EQ_300141019000}--><!--{ndef kid_EQ_300140194000}--> style="display:none;"<!--{/ndef}--><!--{/ndef}--><!--{/ndef}--><!--{/ndef}--><!--{/ndef}--><!--{/ndef}-->>
      <p class="strong">貯金窓口営業時間についてのお知らせ</p>
      <p>
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
        <a href="http://www.jp-bank.japanpost.jp/news/2017/news_id001223.html" target="_blank">一部店舗の窓口営業時間を変更しました</a>
      </p>
    </div>
<!--{/comment}-->

    <!--{def col_135}-->
    <h3 class="heading03 bg-gray01">ATM</h3>
    <table class="table01 w9em">
    <tr>
      <th>平日</th>
      <td>
        <!--{def col_135}--><!--{def col_136}-->{rval COL_135_TIME} 〜 {rval COL_136_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_135}--><!--{ndef col_136}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    <tr>
      <th>土曜日</th>
      <td>
        <!--{def col_137}--><!--{def col_138}-->{rval COL_137_TIME} 〜 {rval COL_138_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_137}--><!--{ndef col_138}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    <tr>
      <th>日曜日･休日</th>
      <td>
        <!--{def col_139}--><!--{def col_140}-->{rval COL_139_TIME} 〜 {rval COL_140_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_139}--><!--{ndef col_140}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    <!--{/def}-->
    </table>
    <!--{def col_09lt}-->
    <div class="layout-box01">
      <p>時間帯によっては、お取り扱いをしていないサービスがございます。<br><a href="http://www.jp-bank.japanpost.jp/kojin/access/atm/kj_acs_atm_index.html" target="_blank">ご利用いただけるサービスや時間帯など詳しくはこちら（ゆうちょ銀行）</a></p>
      <p>※24時間ご利用いただけるATMについては、以下のとおり一部お取り扱いのできない時間帯があります。</p>
      <p>・平日であっても、日曜日・休日の翌日の場合、7:00からお取り扱いを開始します。</p>
      <p>・連休の場合は、連休2日目から最終日までのお取扱時間は7:00〜21:00までとなります。</p>
    </div>
    <!--{/def}-->

    <!--{def col_142}-->
    <h4>営業時間について</h4>
    <p>{rval col_142}</p>
    <!--{/def}-->

    <h2 class="heading03 bg-green01">取り扱い内容</h2>
    <table class="table02">
    <tr>
      <th class="w99p">貯金</th>
      <td><!--{def FLAGS_chokin_ANY_ON}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef FLAGS_chokin_ANY_ON}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">貸付</th>
      <td>
        <span id="kashitsuke2" class="handled"><span>
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
        ×<script type="text/javascript">document.getElementById("kashitsuke").style.display="none";document.getElementById("kashitsuke2").className="no-handled";</script>
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
        </span></span>
      </td>
    </tr>
    <tr>
      <th class="w99p">為替</th>
      <td><!--{def FLAGS_kawase_ANY_ON}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef FLAGS_kawase_ANY_ON}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">振替</th>
      <td><!--{def FLAGS_furikae_ANY_ON}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef FLAGS_furikae_ANY_ON}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">振込（他の金融機関口座への送金）</th>
      <td><!--{def col_75b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_75b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">国際送金</th>
      <td><!--{def col_85b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_85b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">外貨両替（注）</th>
      <td><!--{def col_86b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_86b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">国債</th>
      <td><!--{def col_91b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_91b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">投資信託</th>
      <td><!--{def col_92b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_92b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">確定拠出年金</th>
      <td><!--{def col_94b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_94b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <!--{def col_07b}-->
    <tr>
      <th class="w99p">変額年金保険</th>
      <td><!--{def col_93b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_93b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <!--{/def}-->
    <tr>
      <th class="w99p">スルガ銀行の個人ローンのお申し込み<br>（住宅ローン）</th>
      <td><!--{def col_95b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_95b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">スルガ銀行の個人ローンのお申し込み<br>（パーソナルローン・カードローン）</th>
      <td><!--{def col_168b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_168b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">財形定額貯金</th>
      <td><!--{def col_65b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_65b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">自動払出預入</th>
      <td><!--{def col_79b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_79b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">小切手払い</th>
      <td><!--{def col_167b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_167b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">貯金小切手の振出</th>
      <td><!--{def col_78b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_78b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">簡易払い</th>
      <td><!--{def FLAGS_kanih_ANY_ON}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef FLAGS_kanih_ANY_ON}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">JP BANK カード（クレジットカード）</th>
      <td>
        <span id="jp_bank_card2" class="no-handled"><span>
        <span id="jp_bank_card">×</span>
        <!--{def col_07b}-->
        ○<script type="text/javascript">document.getElementById("jp_bank_card").style.display="none";document.getElementById("jp_bank_card2").className="handled";</script>
        <!--{/def}-->
        <!--{ndef col_07b}-->
        <!--{def col_05b}-->
        <!--{ndef col_22l03}-->
        <!--{def COLUMNS_chokin_time_ANY_VALUE}-->
        ○<script type="text/javascript">document.getElementById("jp_bank_card").style.display="none";document.getElementById("jp_bank_card2").className="handled";</script>
        <!--{/def}-->
        <!--{/ndef}-->
        <!--{/def}-->
        <!--{/ndef}-->
        </span></span>
      </td>
    </tr>
    <tr>
      <th class="w99p">通帳取り扱い（ATM）</th>
      <td><!--{def col_170b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_170b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">硬貨でのお取り扱い（ATM）</th>
      <td><!--{def col_171b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_171b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">払込用紙による通常払込み（ATM）</th>
      <td><!--{def col_70b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_70b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    </table>
    <!--{def col_86b}-->
    <p>（注）販売する通貨の種類および在庫状況は取扱店により異なります。詳しくは窓口でお尋ねください。</p>
    <!--{/def}-->
    <h4 class="strong">ゆうちょ銀行口座から他の金融機関口座への振込利用上の注意</h4>
    <h5>【窓口利用】</h5>
    <p>平日15時以降にお受けした場合、お振込が翌営業日扱いになります。<br>※平日14時30分以降にお受けした場合、または振込事務の繁忙日等やむを得ない事情がある場合は、お振込が翌営業日扱いになることがあります。</p>
    <h5>【ATM利用】</h5>
    <p>平日15時以降または土曜日、日曜日・休日（1月2日、1月3日および12月31日を含みます。）にお取り扱いしたお振込は、翌営業日扱いとなります。<br>※ATM利用明細票に振込予定日の記載がないものについては、お取り扱い日が振込予定日となります。</p>

    <h2 class="heading03 bg-green01">お問い合わせ</h2>
    <p>※サービスの内容によってお問い合わせ先が異なります。</p>

    <h3 class="heading03 bg-gray01">貯金サービスについて</h3>
    <table class="table01 w13em">
    <tr>
      <th>
        <!--{def col_37}-->
        {rval col_37}<br><span>（株式会社ゆうちょ銀行）</span>
        <!--{/def}-->
        <!--{ndef col_37}-->
        <!--{def col_20}-->
        {rval col_20}<br><span>（日本郵便株式会社）</span>
        <!--{/def}-->
        <!--{/ndef}-->
      </th>
      <td>
        <!--{def col_41}-->
        貯金サービスについて：<br>&nbsp;&nbsp;<a href="tel:{rval col_41_tel_atag}">{rval col_41}</a>
        <!--{/def}-->
        <!--{ndef col_41}-->
        <!--{def col_23}-->
        貯金サービスについて：<br>&nbsp;&nbsp;<a href="tel:{rval col_23_tel_atag}">{rval col_23}</a>
        <!--{/def}-->
        <!--{/ndef}-->
      </td>
    </tr>
    </table>

    <h3 class="heading03 bg-gray01">通帳やカードの紛失・盗難に伴うお取引の停止</h3>
    <table class="table01 w13em">
    <tr>
      <th>フリーダイヤル<span class="red01 block">（年中無休/24時間受付)</span></th>
      <td><a href="tel:0120794889">0120-794889</a></td>
    </tr>
    </table>
  </div>
  <!-- /table-layout03 -->
  <!--{/def}-->
  <!--{/ndef}-->

<!--{comment}-->
表示6（ATMﾀﾌﾞ）
<!--{/comment}-->
  <!--{ndef icon_06}-->
  <!--{ndef col_127}-->
  <!--{def col_135}-->
  <!-- table-layout03/ -->
  <!-- 表示時はblock-offに -->
  <div class="table-layout03 block-off">
    <h2 class="heading03 bg-green01">営業時間</h2>
    <h3 class="heading03 bg-gray01">ATM</h3>
    <table class="table01 w9em">
    <tr>
      <th>平日</th>
      <td>
        <!--{def col_135}--><!--{def col_136}-->{rval COL_135_TIME} 〜 {rval COL_136_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_135}--><!--{ndef col_136}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    <tr>
      <th>土曜日</th>
      <td>
        <!--{def col_137}--><!--{def col_138}-->{rval COL_137_TIME} 〜 {rval COL_138_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_137}--><!--{ndef col_138}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    <tr>
      <th>日曜日･休日</th>
      <td>
        <!--{def col_139}--><!--{def col_140}-->{rval COL_139_TIME} 〜 {rval COL_140_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_139}--><!--{ndef col_140}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    </table>
    <!--{def col_09lt}-->
    <div class="layout-box01">
      <p>時間帯によっては、お取り扱いをしていないサービスがございます。<br><a href="http://www.jp-bank.japanpost.jp/kojin/access/atm/kj_acs_atm_index.html" target="_blank">ご利用いただけるサービスや時間帯など詳しくはこちら（ゆうちょ銀行）</a></p>
      <p>※24時間ご利用いただけるATMについては、以下のとおり一部お取り扱いのできない時間帯があります。</p>
      <p>・平日であっても、日曜日・休日の翌日の場合、7:00からお取り扱いを開始します。</p>
      <p>・連休の場合は、連休2日目から最終日までのお取扱時間は7:00〜21:00までとなります。</p>
    </div>
    <!--{/def}-->

    <h2 class="heading03 bg-green01">取り扱い内容</h2>
    <table class="table02">
    <tr>
      <th class="w99p">通帳取り扱い（ATM）</th>
      <td><!--{def col_170b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_170b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">硬貨でのお取り扱い（ATM）</th>
      <td><!--{def col_171b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_171b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">払込用紙による通常払込み（ATM）</th>
      <td><!--{def col_70b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_70b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    </table>
    <h4 class="strong">ゆうちょ銀行口座から他の金融機関口座への振込利用上の注意</h4>
    <h5>【窓口利用】</h5>
    <p>平日15時以降にお受けした場合、お振込が翌営業日扱いになります。<br>※平日14時30分以降にお受けした場合、または振込事務の繁忙日等やむを得ない事情がある場合は、お振込が翌営業日扱いになることがあります。</p>
    <h5>【ATM利用】</h5>
    <p>平日15時以降または土曜日、日曜日・休日（1月2日、1月3日および12月31日を含みます。）にお取り扱いしたお振込は、翌営業日扱いとなります。<br>※ATM利用明細票に振込予定日の記載がないものについては、お取り扱い日が振込予定日となります。</p>
  </div>
  <!-- /table-layout03 -->
  <!--{/def}-->
  <!--{/ndef}-->
  <!--{/ndef}-->

<!--{comment}-->
表示7（保険ﾀﾌﾞ）
<!--{/comment}-->
  <!--{ndef icon_06}-->
  <!--{def col_143}-->
  <!-- table-layout04/ -->
  <!-- 表示時はblock-offに -->
  <div class="table-layout04 block-off">
    <!--{def col_20}-->
    <h4>{rval col_20} のお取り扱い</h4>
    <!--{/def}-->
    <h2 class="heading03 bg-blue01">営業時間</h2>
    <h3 class="heading03 bg-gray01">保険窓口</h3>
    <table class="table01 w9em">
    <tr>
      <th>平日</th>
      <td>
        <!--{def col_143}--><!--{def col_144}-->{rval COL_143_TIME} 〜 {rval COL_144_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_143}--><!--{ndef col_144}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    <tr>
      <th>土曜日</th>
      <td>
        <!--{def col_145}--><!--{def col_146}-->{rval COL_145_TIME} 〜 {rval COL_146_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_145}--><!--{ndef col_146}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    <tr>
      <th>日曜日･休日</th>
      <td>
        <!--{def col_147}--><!--{def col_148}-->{rval COL_147_TIME} 〜 {rval COL_148_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_147}--><!--{ndef col_148}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    </table>

    <h2 class="heading03 bg-blue01">取り扱い内容</h2>
    <table class="table02">
    <tr>
      <th class="w99p">生命保険</th>
      <td><!--{def col_22l03}--><!--{def col_96b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_96b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--><!--{/def}--><!--{ndef col_22l03}--><!--{def FLAGS_seiho_ANY_ON}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef FLAGS_seiho_ANY_ON}--><span class="no-handled"><span>×</span></span><!--{/ndef}--><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">バイク自賠責保険</th>
      <td><!--{def col_102b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_102b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">自動車保険</th>
      <td><!--{def col_101b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_101b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">がん保険</th>
      <td><!--{def col_103b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_103b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">引受条件緩和型医療保険</th>
      <td><!--{def col_104b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_104b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">変額年金保険<!--{def col_05b}--><!--{def col_07b}-->（※）<!--{/def}--><!--{/def}--></th>
      <td><!--{def col_93b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_93b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    </table>
    <!--{def col_05b}--><!--{def col_07b}-->
    <p>（※）併設のゆうちょ銀行店舗でお取り扱いしております。</p>
    <!--{/def}--><!--{/def}-->
    <!--{ndef col_96b}--><!--{def FLAGS_seiho_msg_ANY_ON}-->
    <h4 class="strong">生命保険の取り扱いについて</h4>
    <p>※生命保険のご契約はお受けできませんが、保険料の払込み、満期保険金のお受取りについてはご利用いただけます。</p>
    <!--{/def}--><!--{/ndef}-->

    <h2 class="heading03 bg-blue01">お問い合わせ</h2>
    <p>※サービスの内容によってお問い合わせ先が異なります。</p>

    <h3 class="heading03 bg-gray01">保険サービスについて</h3>
    <table class="table01 w13em">
    <tr>
      <th><!--{def col_20}-->{rval col_20}<br>（日本郵便株式会社）<!--{/def}--></th>
      <td>
        <!--{def col_23}-->窓口業務について：<br>&nbsp;&nbsp;<a href="tel:{rval col_23_tel_atag}">{rval col_23}</a><!--{/def}--><br>
        <!--{def col_25}-->FAX番号：<br>&nbsp;&nbsp;{rval col_25}<!--{/def}-->
      </td>
    </tr>
    </table>

  </div>
  <!-- /table-layout04 -->
  <!--{/def}-->
  <!--{/ndef}-->

<!--{comment}-->
表示8（小型ATMﾀﾌﾞ）
<!--{/comment}-->
  <!--{def icon_06}-->
  <!--{ndef col_127}-->
  <!--{def col_135}-->
  <!-- table-layout03/ -->
  <!-- 表示時はblock-offに -->
  <div class="table-layout03 block-off">
    <h2 class="heading03 bg-green01">営業時間</h2>
    <p>※設置場所の営業時間に準じます</p>
    <h3 class="heading03 bg-gray01">ATM</h3>
    <table class="table01 w9em">
    <tr>
      <th>平日</th>
      <td>
        <!--{def col_135}--><!--{def col_136}-->{rval COL_135_TIME} 〜 {rval COL_136_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_135}--><!--{ndef col_136}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    <tr>
      <th>土曜日</th>
      <td>
        <!--{def col_137}--><!--{def col_138}-->{rval COL_137_TIME} 〜 {rval COL_138_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_137}--><!--{ndef col_138}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    <tr>
      <th>日曜日･休日</th>
      <td>
        <!--{def col_139}--><!--{def col_140}-->{rval COL_139_TIME} 〜 {rval COL_140_TIME}<!--{/def}--><!--{/def}-->
        <!--{ndef col_139}--><!--{ndef col_140}-->お取り扱いしません<!--{/ndef}--><!--{/ndef}-->
      </td>
    </tr>
    </table>
    <div class="layout-box01">
      <p>※このATMでは、通帳のお取り扱いをしておりません。</p>
      <p>※時間帯によっては、お取り扱いをしていないサービスがございます。</p>
      <p><a href="http://www.jp-bank.japanpost.jp/kojin/access/atm/kj_acs_atm_index.html" target="_blank" class="txtIndent newWinAtm hoverTxt">ご利用いただけるサービスや時間帯など詳しくはこちら（ゆうちょ銀行）</a></p>
      <p>・第3月曜日は、7:00から営業を開始します。（ただし、設置場所の営業時間に準じて、7:00以降に営業を開始する場合があります。)</p>
    </div>

    <h2 class="heading03 bg-green01">取り扱い内容</h2>
    <table class="table02">
    <tr>
      <th class="w99p">通帳取り扱い（ATM）</th>
      <td><!--{def col_170b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_170b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">硬貨でのお取り扱い（ATM）</th>
      <td><!--{def col_171b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_171b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    <tr>
      <th class="w99p">払込用紙による通常払込み（ATM）</th>
      <td><!--{def col_70b}--><span class="handled"><span>○</span></span><!--{/def}--><!--{ndef col_70b}--><span class="no-handled"><span>×</span></span><!--{/ndef}--></td>
    </tr>
    </table>
    <h4 class="strong">ゆうちょ銀行口座から他の金融機関口座への振込利用上の注意</h4>
    <h5>【ATM利用】</h5>
    <p>平日15時以降または土曜日、日曜日・休日（12月31日を含みます。）にお取り扱いしたお振込は、翌営業日扱いとなります。なお、1月1日から1月3日まではお取扱いできません。<br>※ATM利用明細票に振込予定日の記載がないものについては、お取り扱い日が振込予定日となります。</p>
  </div>
  <!-- /table-layout03 -->
  <!--{/def}-->
  <!--{/ndef}-->
  <!--{/def}-->

<section class="routebox">
  <span id="routesearch" class="inlinkpoint"></span>
  <h2 class="heading02">ルート検索</h2>
  <div class="searchbox01">
  <form name="formFw" method="get" action="{rval _urlSearchRouteFW}">
    <input type="hidden" name="enc" value="UTF8" />
    <input type="hidden" name="mode" value="rs" />
    <input type="hidden" name="kid" value="{rval kid}" />
    <!--{def freeparms}-->
    <!--{each freeparms}-->
    <input type="hidden" name="{rval freeparms/name}"	value="{rval freeparms/val}" />
    <!--{/each}-->
    <!--{/def}-->
    <input type="search" placeholder="出発地を入力（駅名/住所）" name="keyword" value="">
    <input type="submit" value="検索">
  </form>
  </div>
  <ul class="button-layout col02">
    <li><a href="{rval _jsShopMap}{rval D_FREE_VAR:map_url_add}" class="button02 icon-car">現在地から検索</a></li>
  </ul>
</section>
