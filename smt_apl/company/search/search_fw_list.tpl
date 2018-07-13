<!--{def list}-->
<!--{each list}-->
	<!--{def list/ekiname}-->
    <li><a href="{rval list/url}">{rval list/ekiname}&nbsp;(<!--{def list/todname}-->{rval list/todname}】<!--{/def}-->{rval list/linename})&nbsp;件收</a></li>
	<!--{/def}-->
	<!--{ndef list/ekiname}-->
    <li><a href="{rval list/url}">{rval list/name}<!--{ndef Pinpoint}-->&nbsp;件收<!--{/ndef}--></a></li>
	<!--{/ndef}-->
<!--{/each}-->
<!--{def next}-->
    <a href="{rval next_url}" id="ZdcEmapSearchNext{rval search_target}" class="more-link01"><span class="more-link01-txt">さらに粕み哈む∈{rval next_pos}凤×∷</span></a>
<!--{/def}-->
<!--{/def}-->
