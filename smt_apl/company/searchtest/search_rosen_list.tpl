<!--{def upper_name}-->
    <img src="{rval D_DIR_COMPANY}img/spacer.gif" style="display:none;" onload="document.getElementById('upper_name').textContent='{rval upper_name}';" />
<!--{/def}-->
<!--{def list}-->
<!--{each list}-->
    <li><a href="{rval list/url}">{rval list/name}<!--{def list/todname}-->&nbsp;({rval list/todname})&nbsp;周辺<!--{/def}--></a></li>
<!--{/each}-->
<!--{def next}-->
    <a href="{rval next_url}" id="ZdcEmapSearchNext" class="more-link01"><span class="more-link01-txt">さらに読み込む（{rval next_pos}件〜）</span></a>
<!--{/def}-->
<!--{/def}-->
