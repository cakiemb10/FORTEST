<!--{def list}-->
<!--{each list}-->
	<!--{def list/ekiname}-->
    <li><a href="{rval list/url}">{rval list/ekiname}&nbsp;(<!--{def list/todname}-->{rval list/todname}��<!--{/def}-->{rval list/linename})&nbsp;����</a></li>
	<!--{/def}-->
	<!--{ndef list/ekiname}-->
    <li><a href="{rval list/url}">{rval list/name}<!--{ndef Pinpoint}-->&nbsp;����<!--{/ndef}--></a></li>
	<!--{/ndef}-->
<!--{/each}-->
<!--{def next}-->
    <a href="{rval next_url}" id="ZdcEmapSearchNext{rval search_target}" class="more-link01"><span class="more-link01-txt">������ɤ߹����{rval next_pos}�����</span></a>
<!--{/def}-->
<!--{/def}-->
