<!--{def fukilist}-->
<div id="z_map_msg">				
	<!--{each fukilist}-->			
	<div id="z_map_msg_name">			
		<a href="{rval fukilist/_urlShopInf}">		
			<b>	
			<!--{def fukilist/col_20}-->{rval fukilist/col_20}<br><!--{/def}-->
			<!--{def fukilist/col_29}-->{rval fukilist/col_29}<br><!--{/def}-->
			<!--{def fukilist/col_37}-->ゆうちょ銀行　{rval fukilist/col_37}<br><!--{/def}-->
			</b>	
		</a>		
		<!--{def fukilist/col_10}-->〒 {rval fukilist/col_10}<br><!--{/def}-->
		{rval fukilist/addr}
	</div>			
	<!--{/each}-->			
</div>				
<!--{/def}-->
<!--{ndef fukilist}-->
<div id="z_map_msg">
	<div id="z_map_msg_name">
<!--{def link}-->
		<a href="{rval _urlShopInf}">
<!--{/def}-->
		<b>
		<!--{def col_20}-->{rval col_20}<br><!--{/def}-->
		<!--{def col_29}-->{rval col_29}<br><!--{/def}-->
		<!--{def col_37}-->ゆうちょ銀行　{rval col_37}<br><!--{/def}-->
		</b>
<!--{def link}-->
		</a>
<!--{/def}-->
		<!--{def col_10}-->〒 {rval col_10}<br><!--{/def}-->
		{rval addr}
	</div>
</div>
<!--{/ndef}-->