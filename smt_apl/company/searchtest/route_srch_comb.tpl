  <h1 class="heading-main01 heading-main-ttl02">
    <!--{def col_20}--><span class="icon-heading02">{rval col_20}<span><!--{def col_21}-->（{rval col_21}）<!--{/def}--></span></span><!--{/def}-->
    <!--{def col_29}--><span class="icon-heading02">{rval col_29}<span><!--{def col_30}-->（{rval col_30}）<!--{/def}--></span></span><!--{/def}-->
    <!--{def col_37}--><span class="icon-heading03">ゆうちょ銀行　{rval col_37}<span><!--{def col_38}-->（{rval col_38}）<!--{/def}--></span></span><!--{/def}-->
  </h1>
  <h2 class="heading02">ルートの候補<span>（ルート検索）</span></h2>
  <div class="searchbox01">
    <form name="form" method="get" action="search_fw.htm">
      <input type="hidden" name="enc" value="UTF8" />
      <input type="hidden" name="mode" value="rs" />
      <input type="hidden" name="kid" value="{rval kid}" />
      <!--{def freeparms}-->
      <!--{each freeparms}-->
      <input type="hidden" name="{rval freeparms/name}"	value="{rval freeparms/val}" />
      <!--{/each}-->
      <!--{/def}-->
      <input type="search" placeholder="出発地を入力（駅名/住所）" name="keyword" value="{rval html_keyword}">
      <input type="submit" value="検索">
    </form>
  </div>
  <nav class="tab02">
    <ul>
      <li><a href="" class="current"><span><span class="route-icon-car">車で行く</span>（<!--{def drive}--><!--{each drive}--><!--{def drive/no_1}--><!--{def drive/total_time_hour}-->{rval drive/total_time_hour}時間<!--{/def}-->{rval drive/total_time_min}分<!--{/def}--><!--{/each}--><!--{/def}--><!--{ndef drive}-->-<!--{/ndef}-->）</span></a></li>
      <li><a href=""><span><span class="route-icon-train">電車で行く</span>（<!--{def comb}--><!--{each comb}--><!--{def comb/no_1}--><!--{def comb/total_time_hour}-->{rval comb/total_time_hour}時間<!--{/def}-->{rval comb/total_time_min}分<!--{/def}--><!--{/each}--><!--{/def}--><!--{ndef comb}-->-<!--{/ndef}-->）</span></a></li>
      <li><a href=""><span><span class="route-icon-walk">徒歩で行く</span>（<!--{def walk}--><!--{each walk}--><!--{def walk/no_1}--><!--{def walk/total_time_hour}-->{rval walk/total_time_hour}時間<!--{/def}-->{rval walk/total_time_min}分<!--{/def}--><!--{/each}--><!--{/def}--><!--{ndef walk}-->-<!--{/ndef}-->）</span></a></li>
    </ul>
  </nav>

<!--{comment}-->
車ルート
<!--{/comment}-->
<article class="route-type01 block-on">
<!--{def drive}-->
  <!--{each drive}-->
    <!--{def drive/no_1}-->
  <div class="route-summary">
    <dl class="dl01 w4em">
      <dt>距 離</dt>
      <dd><!--{def drive/distance_km}-->{rval drive/distance_km}km<!--{/def}--><!--{ndef drive/distance_km}-->{rval drive/distance}m<!--{/ndef}--></dd>
      <dt>時 間</dt>
      <dd><!--{def drive/total_time_hour}-->{rval drive/total_time_hour}時間<!--{/def}-->{rval drive/total_time_min}分</dd>
      <dt>料 金</dt>
      <dd>{rval drive/fare_format}円</dd>
    </dl>
  </div>

  <ul class="arrow-list02">
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
    <a href="{rval drive/url}" class="button02 icon-route">地図でルートを確認</a>
  </ul>
    <!--{/def}-->
  <!--{/each}-->
<!--{/def}-->
<!--{ndef drive}-->
  <p>出発地と目的地の距離が近いため、車ルートの表示ができませんでした。徒歩ルートを参照ください。</p>
<!--{/ndef}-->
</article>

<!--{comment}-->
交通機関ルート
<!--{/comment}-->
<article class="route-type02 block-off">
<!--{def comb}-->
  <ul class="accordion-list01">
  <!--{each comb}-->
    <li class="<!--{def comb/no_1}-->accordion-open<!--{/def}--><!--{ndef comb/no_1}-->accordion-close<!--{/ndef}-->">
        <a href="" class="route-summary">
          <h3>候補{rval comb/no} （{rval comb/start_hour}:{rval comb/start_min}〜{rval comb/end_hour}:{rval comb/end_min}）<!--{def comb/train}--><span class="route-icon-train">電車</span><!--{/def}--><!--{def comb/walk}--><span class="route-icon-walk">徒歩</span><!--{/def}--><!--{def comb/drive}--><span class="route-icon-car">車</span><!--{/def}--><!--{def comb/airplane}--><span class="route-icon-airplane">飛行機</span><!--{/def}--><!--{def comb/bus}--><span class="route-icon-bus">バス</span><!--{/def}--></h3>
          <dl class="dl01 w4em">
            <dt>時 間</dt>
            <dd><!--{def comb/total_time_hour}-->{rval comb/total_time_hour}時間<!--{/def}-->{rval comb/total_time_min}分</dd>
            <dt>料 金</dt>
            <dd>{rval comb/fare_format}円</dd>
            <dt>乗 換</dt>
            <dd>{rval comb/transcnt}回</dd>
          </dl>
        </a>
        <ul class="route-list01" <!--{ndef comb/no_1}-->style="display:none;"<!--{/ndef}-->>
    <!--{each comb/list}-->
      <!--{def comb/list/route_start}-->
          <li class="icon-start">
      <!--{/def}-->
      <!--{ndef comb/list/route_start}-->
      <!--{ndef comb/list/route_end}-->
          <li class="icon-arrow-bottom">
      <!--{/ndef}-->
      <!--{/ndef}-->
      <!--{def comb/list/route_end}-->
          <li class="icon-goal">
      <!--{/def}-->
            {rval comb/list/start_name}<!--{def comb/list/train}-->駅<!--{/def}-->
      <!--{def comb/list/train}-->
            <div class="icon-train mt5">
      <!--{/def}-->
      <!--{def comb/list/walk}-->
            <div class="icon-walk mt5">
      <!--{/def}-->
      <!--{def comb/list/drive}-->
            <div class="icon-car mt5">
      <!--{/def}-->
      <!--{def comb/list/airplane}-->
            <div class="icon-airplane mt5">
      <!--{/def}-->
      <!--{def comb/list/bus}-->
            <div class="icon-bus mt5">
      <!--{/def}-->
              <span class="f12"><!--{def comb/list/walk}-->徒歩<!--{/def}--><!--{ndef comb/list/walk}--><!--{def comb/list/linenm}-->{rval comb/list/linenm}<!--{/def}--><!--{/ndef}--></span>
            </div>
            <div class="mt5">
      <!--{ndef comb/list/route_end}-->
              {rval comb/list/end_name}<!--{def comb/list/train}-->駅<!--{/def}-->
      <!--{/ndef}-->
      <!--{def comb/list/route_end}-->
              <!--{def col_20}-->{rval col_20}<br><!--{/def}--><!--{def col_29}-->{rval col_29}<br><!--{/def}--><!--{def col_37}-->ゆうちょ銀行　{rval col_37}<!--{/def}-->
      <!--{/def}-->
            </div>
          </li>
    <!--{/each}-->
    <!--{def comb/bus}-->
          <li class="bus-comment">
            実際のバス運行ルートとは異なりますので、ご注意ください。
          </li>
    <!--{/def}-->
          <a href="{rval comb/url}<!--{def comb/bus}-->{rval D_FREE_VAR:map_url_add}<!--{/def}-->" class="button02 icon-route">地図でルートを確認</a>
        </ul>
    </li>
  <!--{/each}-->
  </ul>
<!--{/def}-->
<!--{ndef comb}-->
  <p>出発地から「<!--{def col_20}-->{rval col_20}<!--{/def}--><!--{def col_29}-->{rval col_29}<!--{/def}--><!--{def col_37}-->ゆうちょ銀行　{rval col_37}<!--{/def}-->」まで交通機関を使ったルートが検索できませんでした。</p>
<!--{/ndef}-->
</article>

<!--{comment}-->
徒歩ルート
<!--{/comment}-->
<article class="route-type03 block-off">
<!--{def walk}-->
  <!--{each walk}-->
  <ul class="arrow-list02 mrl10">
    <!--{each walk/list}-->
      <!--{def walk/list/route_start}-->
    <li><a href="javascript:void(0);" class="icon-start">{rval walk/list/start_name}</a></li>
      <!--{/def}-->
      <!--{def walk/list/route_end}-->
    <li><a href="javascript:void(0);" class="icon-goal"><!--{def col_20}-->{rval col_20}<br><!--{/def}--><!--{def col_29}-->{rval col_29}<br><!--{/def}--><!--{def col_37}-->ゆうちょ銀行　{rval col_37}<br><!--{/def}--></a></li>
      <!--{/def}-->
    <!--{/each}-->
    <div class="walk-comment">歩行不可の道路を含んでいる場合がありますので、実際の交通規制に従ってください。</div>
    <a href="{rval walk/url}" class="button02 icon-route">地図でルートを確認</a>
  </ul>
  <!--{/each}-->
<!--{/def}-->
<!--{ndef walk}-->
  <p>出発地から「<!--{def col_20}-->{rval col_20}<!--{/def}--><!--{def col_29}-->{rval col_29}<!--{/def}--><!--{def col_37}-->ゆうちょ銀行　{rval col_37}<!--{/def}-->」までのルートが検索できませんでした。</p>
<!--{/ndef}-->
</article>

<input type="hidden" id="bus_latlons_all" value='{rval bus_latlons_all}'>
<img src="{rval D_DIR_COMPANY}img/spacer.gif" style="display:none;" onload="ZdcEmapSetBusLatlons();" />
