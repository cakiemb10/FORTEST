<!--{def hit_count}-->
    <img src="{rval D_DIR_COMPANY}img/spacer.gif" style="display:none;" onload="document.getElementById('resultcnt').textContent='{rval hit_count}��';" />
<!--{/def}-->
<!--{def list}-->
<!--{each list}-->
    <li><a href="{rval list/url}">{rval list/name}</a></li>
<!--{/each}-->
<!--{def next}-->
    <a href="{rval next_url}" id="ZdcEmapSearchNext" class="more-link01"><span class="more-link01-txt">������ɤ߹����{rval next_pos}�����</span></a>
<!--{/def}-->
<!--{/def}-->
