<!--{def head}-->
<div class="z_nlist_head clearfix">
<div class="fl">
	<p id="ZdcEmapSearchCount" class="z_nlist_count">{rval search_count_msg}</p>
</div>
</div>
<!--{/def}-->

<!--{def hit_count}-->
<input type="hidden" name="hit_count" value="{rval hit_count}" />
<!--{/def}-->
<!--{def list}-->
<!--{each list}-->
<div class="z_litem">
	<a href="{rval list/url}">
		<span class="z_litem_name">{rval list/name}<!--{def list/dist}-->({rval list/dist}m)<!--{/def}--></span><span class="z_iconmiddle"><span class="z_icon_arrow"></span></span>
	</a>
</div>
<!--{/each}-->
<!--{/def}-->

<!--{def next}-->
<div id="ZdcEmapSearchNext" class="z_litem_nextPage">
	<a href="{rval next_url}">さらに読み込む　<span class="font-9">{rval next_pos}件〜</span></a>
</div>
<!--{/def}-->
