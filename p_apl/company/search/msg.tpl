<div id="fukidashi">
<!--{def fukilist}-->
	<!--{each fukilist}-->
	<div class="fukidashi-list">
		<div class="fukidashi-name">
			<a href="{rval fukilist/_urlDetail}">
				<!--{def fukilist/col_20}-->
				<p><img src="{rval D_DIR_COMPANY}images/icon_post.gif">&nbsp;{rval fukilist/col_20}</p>
				<!--{/def}-->
				<!--{def fukilist/col_29}-->
				<p><img src="{rval D_DIR_COMPANY}images/icon_post.gif">&nbsp;{rval fukilist/col_29}</p>
				<!--{/def}-->
				<!--{def fukilist/col_37}-->
				<p><img src="{rval D_DIR_COMPANY}images/icon_bank.gif">&nbsp;ゆうちょ銀行　{rval fukilist/col_37}</p>
				<!--{/def}-->
			</a>
		</div>
		<!--{def fukilist/addr}-->
		<div class="fukidashi-data">
			{rval fukilist/addr}
		</div>
		<!--{/def}-->
		<div class="fukidashi-data">
			<!--{ndef fukilist/icon_06}-->
			<!--{def fukilist/col_119}-->
			<img src="{rval D_DIR_COMPANY}images/icon_yuubin.gif">
			<!--{/def}-->
			<!--{def fukilist/col_127}-->
			<img src="{rval D_DIR_COMPANY}images/icon_yuucho.gif">
			<!--{/def}-->
			<!--{def fukilist/col_143}-->
			<img src="{rval D_DIR_COMPANY}images/icon_hoken.gif">
			<!--{/def}-->
			<!--{def fukilist/COLUMNS_yuuyuu_time_ANY_VALUE}-->
			<img src="{rval D_DIR_COMPANY}images/icon_yuuyuu.gif">
			<!--{/def}-->
			<!--{def fukilist/col_135}-->
			<img src="{rval D_DIR_COMPANY}images/icon_atm.gif">
			<!--{/def}-->
			<!--{/ndef}-->
			<!--{def fukilist/icon_06}-->
			<img src="{rval D_DIR_COMPANY}images/icon_atm_s.gif">
			<!--{/def}-->
			<!--{def fukilist/col_14_GT_0}-->
			<img src="{rval D_DIR_COMPANY}images/icon_parking.gif">
			<!--{/def}-->
		</div>
	</div>
	<!--{/each}-->
<!--{/def}-->
<!--{ndef fukilist}-->
	<div class="fukidashi-name">
		<a href="{rval _urlDetail}">
			<!--{def col_20}-->
			<p><img src="{rval D_DIR_COMPANY}images/icon_post.gif">&nbsp;{rval col_20}</p>
			<!--{/def}-->
			<!--{def col_29}-->
			<p><img src="{rval D_DIR_COMPANY}images/icon_post.gif">&nbsp;{rval col_29}</p>
			<!--{/def}-->
			<!--{def col_37}-->
			<p><img src="{rval D_DIR_COMPANY}images/icon_bank.gif">&nbsp;ゆうちょ銀行　{rval col_37}</p>
			<!--{/def}-->
		</a>
	</div>
	<!--{def addr}-->
	<div class="fukidashi-data">
		{rval addr}
	</div>
	<!--{/def}-->
	<div class="fukidashi-data">
		<!--{ndef icon_06}-->
		<!--{def col_119}-->
		<img src="{rval D_DIR_COMPANY}images/icon_yuubin.gif">
		<!--{/def}-->
		<!--{def col_127}-->
		<img src="{rval D_DIR_COMPANY}images/icon_yuucho.gif">
		<!--{/def}-->
		<!--{def col_143}-->
		<img src="{rval D_DIR_COMPANY}images/icon_hoken.gif">
		<!--{/def}-->
		<!--{def COLUMNS_yuuyuu_time_ANY_VALUE}-->
		<img src="{rval D_DIR_COMPANY}images/icon_yuuyuu.gif">
		<!--{/def}-->
		<!--{def col_135}-->
		<img src="{rval D_DIR_COMPANY}images/icon_atm.gif">
		<!--{/def}-->
		<!--{/ndef}-->
		<!--{def icon_06}-->
		<img src="{rval D_DIR_COMPANY}images/icon_atm_s.gif">
		<!--{/def}-->
		<!--{def col_14_GT_0}-->
		<img src="{rval D_DIR_COMPANY}images/icon_parking.gif">
		<!--{/def}-->
	</div>
<!--{/ndef}-->
</div>
