  <div class="heading-main02"><h1 class="icon-large-search">路線名からさがす</h1></div>
  <h2 class="heading02"><em id="upper_name"></em></h2>
  <h2 class="heading02">検索結果：<em id="resultcnt"></em></h2>
  <div class="searchbox01">
    <form name="form" method="get" action="search_fw_rosen.htm">
      <input type="hidden" name="enc" value="UTF8" />
      <!--{def freeparms}-->
      <!--{each freeparms}-->
      <input type="hidden" name="{rval freeparms/name}"	value="{rval freeparms/val}" />
      <!--{/each}-->
      <!--{/def}-->
      <input type="search" name="keyword" placeholder="路線名を入力" value="{rval html_keyword}">
      <input type="submit" value="検索">
    </form>
  </div>
  <ul id="ZdcEmapSearchFWRosenList" class="arrow-list01">
  </ul>
