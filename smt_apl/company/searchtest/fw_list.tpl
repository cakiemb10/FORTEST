<!--{def hit_count}-->
    <img src="{rval D_DIR_COMPANY}img/spacer.gif" style="display:none;" onload="document.getElementById('resultcnt').textContent='{rval hit_count}��';" />
<!--{/def}-->
<!--{def list}-->
<!--{each list}-->
    <li>
    <a href="{rval list/url}">
      <h3><!--{def list/COL_20}-->{rval list/COL_20}<br><!--{/def}--><!--{def list/COL_29}-->{rval list/COL_29}<br><!--{/def}--><!--{def list/COL_37}-->�椦�����ԡ�{rval list/COL_37}<br><!--{/def}--><!--{def list/dist}-->��{rval list/dist}���<!--{/def}--></h3>
      <p><!--{def list/COL_10}-->�� {rval list/COL_10}<br><!--{/def}-->{rval list/ADDR}</p>
      <ul class="inline-icon">
<!--{ndef list/icon_id_06}-->
<!--{def list/COL_119}--><li><span class="icon-service01">͹��</span></li><!--{/def}-->
<!--{def list/COL_127}--><li><span class="icon-service02">����</span></li><!--{/def}-->
<!--{def list/COL_143}--><li><span class="icon-service03">�ݸ�</span></li><!--{/def}-->
<!--{def list/COLUMNS_yuuyuu_time_ANY_VALUE}--><li><span class="icon-service04">�椦�椦</span></li><!--{/def}-->
<!--{def list/COL_135}-->
<!--{def list/FLAGS_atm_open_ALL_ON}--><li><span class="icon-service08">ATM�Ķ���</span></li><!--{/def}-->
<!--{ndef list/FLAGS_atm_open_ALL_ON}--><li><span class="icon-service09">ATM���ֳ�</span></li><!--{/ndef}-->
<!--{/def}-->
<!--{/ndef}-->
<!--{def list/icon_id_06}-->
<!--{def list/FLAGS_atm_open_ALL_ON}--><li><span class="icon-service10">������ATM�Ķ���</span></li><!--{/def}-->
<!--{ndef list/FLAGS_atm_open_ALL_ON}--><li><span class="icon-service11">������ATM���ֳ�</span></li><!--{/ndef}-->
<!--{/def}-->
<!--{def list/COL_14_GT_0}--><li><span class="icon-service07">��־�</span></li><!--{/def}-->
      </ul>
    </a>
    </li>
<!--{/each}-->
<!--{def next}-->
    <a href="{rval next_url}" id="ZdcEmapSearchNext" class="more-link01"><span class="more-link01-txt">������ɤ߹����{rval next_pos}�����</span></a>
<!--{/def}-->
<!--{/def}-->
