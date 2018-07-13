<!--{def upper_url}-->
<div class="z_litem">
	<a href="{rval upper_url}">
		<span class="z_litem_name">{rval upper_name}</span><span class="z_iconmiddle"><span class="z_icon_map"></span></span>
	</a>
</div>
<div class="z_litem"><a></a></div>
<!--{/def}-->

<!--{def list}-->
<!--{each list}-->
<div class="z_litem">
	<a href="{rval list/url}">
		<span class="z_litem_name">{rval list/name}</span><span class="z_iconmiddle"><span class="z_icon_arrow"></span></span>
	</a>
</div>
<!--{/each}-->
<!--{/def}-->

<!--{def next}-->
<div id="ZdcEmapSearchNext" class="z_litem_nextPage">
	<a href="{rval next_url}">さらに読み込む　<span class="font-9">{rval next_pos}件〜</span></a>
</div>
<!--{/def}-->
