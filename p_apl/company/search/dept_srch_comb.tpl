	<nav class="tab01 mt10">
		<ul>
			<li><a href=""<!--{def list/st}--> class="current"<!--{/def}--><!--{ndef list/st}--><!--{ndef list/addr}--> class="current"<!--{/ndef}--><!--{/ndef}-->><span>駅名</span>（{rval st/max}件）</a></li>
			<li><a href=""<!--{ndef list/st}--><!--{def list/addr}--> class="current"<!--{/def}--><!--{/ndef}-->><span>住所</span>（{rval addr/max}件）</a></li>
		</ul>
	</nav>
	<div class="routeBox mb10"<!--{ndef list/st}--><!--{def list/addr}--> style="display:none;"<!--{/def}--><!--{/ndef}-->>
	<!--{def st/msg}-->
		<p>{rval st/msg}</p>
	<!--{/def}-->
	<!--{def list/st}-->
		<ul class="routeList">
	<!--{each list/st}-->
			<li><a href="{rval list/st/_urlRootSearchCombLink}">{rval list/st/name}{rval list/st/name2}</a></li>
	<!--{/each}-->
		</ul>
	<!--{/def}-->
	</div>
	<div class="routeBox mb10"<!--{def list/st}--> style="display:none;"<!--{/def}--><!--{ndef list/st}--><!--{ndef list/addr}--> style="display:none;"<!--{/ndef}--><!--{/ndef}-->>
	<!--{def addr/msg}-->
		<p>{rval addr/msg}</p>
	<!--{/def}-->
	<!--{def list/addr}-->
		<ul class="routeList">
	<!--{each list/addr}-->
			<li><a href="{rval list/addr/_urlRootSearchCombLink}">{rval list/addr/name}</a></li>
	<!--{/each}-->
		</ul>
	<!--{/def}-->
	</div>
    <img src="{rval D_FREE_VAR:D_DIR_COMPANY_HTTPS}images/spacer.gif" style="display:none;" onload="combRootDeptEventSet();" />
	<!-- <img src="{rval D_FREE_VAR:D_DIR_COMPANY_HTTPS}images/load.gif" id="combRouteProcessing" style="display:none;position:absolute;top:10px;left:150px;"> -->
	<div id="combRouteProcessing">
		<div style="position:relative;">
			<img id="combRouteProcessing-bgimg" src="{rval D_DIR_BASE}img/load-back.png" />
			<img id="combRouteProcessing-animg" src="{rval D_DIR_BASE}img/load.gif" />
			<div id="combRouteProcessing-text">ルート検索中</div>
		</div>
	</div>
