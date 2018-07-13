	<nav class="tab02 mt10">
		<ul>
			<li><a href="" class="current"><span><span class="routeIcon"><img src="{rval D_FREE_VAR:D_DIR_COMPANY_HTTPS}images/icon_car.png" alt="車"></span>（<!--{def drive}--><!--{each drive}--><!--{def drive/no_1}--><!--{def drive/total_time_hour}-->{rval drive/total_time_hour}時間<!--{/def}-->{rval drive/total_time_min}分<!--{/def}--><!--{/each}--><!--{/def}--><!--{ndef drive}-->-<!--{/ndef}-->）</span></a></li>
			<li><a href=""><span><span class="routeIcon"><img src="{rval D_FREE_VAR:D_DIR_COMPANY_HTTPS}images/icon_train.png" alt="電車"></span>（<!--{def comb}--><!--{each comb}--><!--{def comb/no_1}--><!--{def comb/total_time_hour}-->{rval comb/total_time_hour}時間<!--{/def}-->{rval comb/total_time_min}分<!--{/def}--><!--{/each}--><!--{/def}--><!--{ndef comb}-->-<!--{/ndef}-->）</span></a></li>
			<li><a href=""><span><span class="routeIcon"><img src="{rval D_FREE_VAR:D_DIR_COMPANY_HTTPS}images/icon_walk.png" alt="徒歩"></span>（<!--{def walk}--><!--{each walk}--><!--{def walk/no_1}--><!--{def walk/total_time_hour}-->{rval walk/total_time_hour}時間<!--{/def}-->{rval walk/total_time_min}分<!--{/def}--><!--{/each}--><!--{/def}--><!--{ndef walk}-->-<!--{/ndef}-->）</span></a></li>
		</ul>
	</nav>

<!--{comment}-->
車ルート
<!--{/comment}-->
	<div class="routeBox mb10">
<!--{def drive}-->
  <!--{each drive}-->
    <!--{def drive/no_1}-->
		<div class="route-summary">
			<dl class="dl01 w4em">
				<dt>距 離</dt><dd><!--{def drive/distance_km}-->{rval drive/distance_km}km<!--{/def}--><!--{ndef drive/distance_km}-->{rval drive/distance}m<!--{/ndef}--></dd>
				<dt>時 間</dt><dd><!--{def drive/total_time_hour}-->{rval drive/total_time_hour}時間<!--{/def}-->{rval drive/total_time_min}分</dd>
				<dt>料 金</dt><dd>{rval drive/fare_format}円</dd>
			</dl>
		</div>
		<a class="route-draw" href="javascript:void(0);" onClick="{rval drive/_jsRouteDraw}setPrintParam('{rval drive/print_param}');" >ルート全体を表示</a>
		<ul class="routeList2 mt10">
		<!--{each drive/list}-->
			<!--{def drive/list/route_start}-->
			<li><a href="javascript:void(0);" class="icon-start">{rval drive/list/start_name}</a></li>
			<!--{/def}-->
			<!--{ndef drive/list/route_start}-->
			<!--{ndef drive/list/route_end}-->
			<li><a href="javascript:void(0);" class="icon-arrow-bottom">{rval drive/list/start_name}</a></li>
			<!--{/ndef}-->
			<!--{/ndef}-->
			<!--{def drive/list/route_end}-->
			<li><a href="javascript:void(0);" class="icon-goal"><!--{def col_20}-->{rval col_20}<br><!--{/def}--><!--{def col_29}-->{rval col_29}<br><!--{/def}--><!--{def col_37}-->ゆうちょ銀行　{rval col_37}<br><!--{/def}--></a></li>
			<!--{/def}-->
		<!--{/each}-->
		</ul>
    <!--{/def}-->
  <!--{/each}-->
<!--{/def}-->
<!--{ndef drive}-->
		出発地と目的地の距離が近いため、車ルートの表示ができませんでした。徒歩ルートを参照ください。
<!--{/ndef}-->
	</div>

<!--{comment}-->
交通機関ルート
<!--{/comment}-->
	<div class="routeBox mb10" style="display:none;">
<!--{def comb}-->
		<div class="route-summary2">
			<ul>
	<!--{each comb}-->
				<li>
					<a href="" class="routeRank <!--{def comb/no_1}-->current<!--{/def}-->">
						<span class="fb">候補{rval comb/no} （{rval comb/start_hour}:{rval comb/start_min}〜{rval comb/end_hour}:{rval comb/end_min}）</span><span class="rsIcon"><!--{def comb/train}--><img src="{rval D_FREE_VAR:D_DIR_COMPANY_HTTPS}images/icon_train.png" alt="電車">&nbsp;<!--{/def}--><!--{def comb/walk}--><img src="{rval D_FREE_VAR:D_DIR_COMPANY_HTTPS}images/icon_walk.png" alt="徒歩">&nbsp;<!--{/def}--><!--{def comb/drive}--><img src="{rval D_FREE_VAR:D_DIR_COMPANY_HTTPS}images/icon_car.png" alt="車">&nbsp;<!--{/def}--><!--{def comb/airplane}--><img src="{rval D_FREE_VAR:D_DIR_COMPANY_HTTPS}images/icon_airplane.png" alt="飛行機">&nbsp;<!--{/def}--><!--{def comb/bus}--><img src="{rval D_FREE_VAR:D_DIR_COMPANY_HTTPS}images/icon_bus.png" alt="バス"><!--{/def}--></span>
						<dl class="dl01 w4em">
							<dt>時 間</dt><dd><!--{def comb/total_time_hour}-->{rval comb/total_time_hour}時間<!--{/def}-->{rval comb/total_time_min}分</dd>
							<dt>料 金</dt><dd>{rval comb/fare_format}円</dd>
							<dt>乗 換</dt><dd>{rval comb/transcnt}回</dd>
						</dl>
					</a>
				</li>
				<ul class="routeList3 mt10 mb20" <!--{ndef comb/no_1}-->style="display:none;"<!--{/ndef}-->>
					<a class="route-draw" href="javascript:void(0);" onClick="{rval comb/_jsRouteDraw}setPrintParam('{rval comb/print_param}');">ルート全体を表示</a>
		<!--{each comb/list}-->
			<!--{def comb/list/route_start}-->
					<li class="icon-start">
			<!--{/def}-->
			<!--{ndef comb/list/route_start}-->
			<!--{ndef comb/list/route_end}-->
					<li class="icon-arrow">
			<!--{/ndef}-->
			<!--{/ndef}-->
			<!--{def comb/list/route_end}-->
					<li class="icon-goal">
			<!--{/def}-->
						{rval comb/list/start_name}<!--{def comb/list/train}-->駅<!--{/def}-->
			<!--{def comb/list/train}-->
						<div class="icon-train mt10 mb10">
			<!--{/def}-->
			<!--{def comb/list/walk}-->
						<div class="icon-walk mt10 mb10">
			<!--{/def}-->
			<!--{def comb/list/drive}-->
						<div class="icon-car mt10 mb10">
			<!--{/def}-->
			<!--{def comb/list/airplane}-->
						<div class="icon-airplane mt10 mb10">
			<!--{/def}-->
			<!--{def comb/list/bus}-->
						<div class="icon-bus mt10 mb10">
			<!--{/def}-->
							<div class="ml20 lh12"><!--{def comb/list/walk}-->徒歩<!--{/def}--><!--{ndef comb/list/walk}--><!--{def comb/list/linenm}-->{rval comb/list/linenm}<!--{/def}--><!--{/ndef}--></div>
						</div>
			<!--{ndef comb/list/route_end}-->
						{rval comb/list/end_name}<!--{def comb/list/train}-->駅<!--{/def}-->
			<!--{/ndef}-->
			<!--{def comb/list/route_end}-->
						<!--{def col_20}-->{rval col_20}<br><!--{/def}--><!--{def col_29}-->{rval col_29}<br><!--{/def}--><!--{def col_37}-->ゆうちょ銀行　{rval col_37}<!--{/def}-->
			<!--{/def}-->
					</li>
		<!--{/each}-->
		<!--{def comb/bus}-->
					<li class="bus-comment">
						実際のバス運行ルートとは異なりますので、ご注意ください。
					</li>
		<!--{/def}-->
				</ul>
	<!--{/each}-->
			</ul>
		</div>
<!--{/def}-->
<!--{ndef comb}-->
	出発地から「<!--{def col_20}-->{rval col_20}<!--{/def}--><!--{def col_29}-->{rval col_29}<!--{/def}--><!--{def col_37}-->ゆうちょ銀行　{rval col_37}<!--{/def}-->」まで交通機関を使ったルートが検索できませんでした。
<!--{/ndef}-->
	</div>

<!--{comment}-->
徒歩ルート
<!--{/comment}-->
	<div class="routeBox mb10" style="display:none;">
<!--{def walk}-->
	<!--{each walk}-->
		<a class="route-draw" href="javascript:void(0);" onClick="{rval walk/_jsRouteDraw}setPrintParam('{rval walk/print_param}');" >ルート全体を表示</a>
		<ul class="routeList2 mt10">
		<!--{each walk/list}-->
			<!--{def walk/list/route_start}-->
			<li><a href="javascript:void(0);" class="icon-start">{rval walk/list/start_name}</a></li>
			<!--{/def}-->
			<!--{def walk/list/route_end}-->
			<li><a href="javascript:void(0);" class="icon-goal"><!--{def col_20}-->{rval col_20}<br><!--{/def}--><!--{def col_29}-->{rval col_29}<br><!--{/def}--><!--{def col_37}-->ゆうちょ銀行　{rval col_37}<br><!--{/def}--></a></li>
			<!--{/def}-->
		<!--{/each}-->
		</ul>
		<span class="walk-comment">歩行不可の道路を含んでいる場合がありますので、実際の交通規制に従ってください。</span>
	<!--{/each}-->
<!--{/def}-->
<!--{ndef walk}-->
		出発地から「<!--{def col_20}-->{rval col_20}<!--{/def}--><!--{def col_29}-->{rval col_29}<!--{/def}--><!--{def col_37}-->ゆうちょ銀行　{rval col_37}<!--{/def}-->」までのルートが検索できませんでした。
<!--{/ndef}-->
	</div>

	<input type="hidden" id="bus_latlons_all" value='{rval bus_latlons_all}'>
	<img src="{rval D_FREE_VAR:D_DIR_COMPANY_HTTPS}images/spacer.gif" style="display:none;" onload="combRootResultEventSet();ZdcEmapSetBusLatlons();" />
