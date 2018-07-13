<!--{ndef i_htm}-->
	<div id="history">
<!--{def history}-->
<!--{each history}-->
	<!--{ndef history/first}-->&nbsp;&gt;&nbsp;<!--{/ndef}-->
	<!--{def history/url}--><a href="{rval history/url}"><!--{/def}-->{rval history/name}<!--{def history/url}--></a><!--{/def}-->
<!--{/each}-->
<!--{/def}-->
	</div>
	<!--{def history}-->
	<input type="hidden" id="history_count" value="{rval history_count}" />
	<!--{each history}-->
		<input type="hidden" id="history_name_{rval history/index}" value="{rval history/name}" />
		<!--{def history/url}--><input type="hidden" id="history_url_{rval history/index}" value="{rval history/url}" /><!--{/def}-->
		<!--{def history/hidden_url}--><input type="hidden" id="history_url_{rval history/index}" value="{rval history/hidden_url}" /><!--{/def}-->
	<!--{/each}-->
	<!--{/def}-->
	<div id="contents" class="contents-withhis"> 
<!--{/ndef}-->
