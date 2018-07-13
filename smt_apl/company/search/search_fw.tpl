<!--{comment}-->
検索TOPの「駅名からさがす」から遷移してきた場合
<!--{/comment}-->
<!--{ndef mode_rs}-->
  <div class="heading-main02"><h1 class="icon-large-search">駅名からさがす</h1></div>
  <h2 class="heading02">検索結果：{rval count1}件</h2>
  <div class="searchbox01">
    <form name="form" method="get" action="search_fw.htm">
      <input type="hidden" name="enc" value="UTF8" />
      <!--{def freeparms}-->
      <!--{each freeparms}-->
      <input type="hidden" name="{rval freeparms/name}"	value="{rval freeparms/val}" />
      <!--{/each}-->
      <!--{/def}-->
      <input type="search" name="keyword" placeholder="駅名を入力" value="{rval html_keyword}">
      <input type="submit" value="検索">
    </form>
  </div>
  <ul id="ZdcEmapSearchFWList1" class="arrow-list01">
  </ul>
<!--{/ndef}-->
<!--{comment}-->
店舗詳細のルート検索から遷移してきた場合
<!--{/comment}-->
<!--{def mode_rs}-->
  <h1 class="heading-main01 heading-main-ttl02">
    <!--{def col_20}--><span class="icon-heading02">{rval col_20}<span><!--{def col_21}-->（{rval col_21}）<!--{/def}--></span></span><!--{/def}-->
    <!--{def col_29}--><span class="icon-heading02">{rval col_29}<span><!--{def col_30}-->（{rval col_30}）<!--{/def}--></span></span><!--{/def}-->
    <!--{def col_37}--><span class="icon-heading03">ゆうちょ銀行　{rval col_37}<span><!--{def col_38}-->（{rval col_38}）<!--{/def}--></span></span><!--{/def}-->
  </h1>
  <h2 class="heading02">出発地の候補<span>（ルート検索）</span></h2>
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
  <nav class="tab01">
    <ul>
      <li><a href="" <!--{def init_view1}-->class="current"<!--{/def}-->><span>駅名</span>（{rval count1}件）</a></li>
      <li><a href="" <!--{def init_view2}-->class="current"<!--{/def}-->><span>住所</span>（{rval count2}件）</a></li>
    </ul>
  </nav>
<article class="freeword-result01 <!--{def init_view1}-->block-on<!--{/def}--><!--{ndef init_view1}-->block-off<!--{/ndef}-->">
  <ul id="ZdcEmapSearchFWList1" class="arrow-list01">
  </ul>
</article>
<article class="freeword-result02 <!--{def init_view2}-->block-on<!--{/def}--><!--{ndef init_view2}-->block-off<!--{/ndef}-->">
  <ul id="ZdcEmapSearchFWList2" class="arrow-list01">
  </ul>
</article>
<!--{/def}-->
