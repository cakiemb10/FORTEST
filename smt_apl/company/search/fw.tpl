  <div class="heading-main02"><h1 class="icon-large-search"><!--{def D_FREE_VAR:postname}-->店舗・ATM名<!--{/def}--><!--{def D_FREE_VAR:postaddr}-->住所<!--{/def}-->からさがす</h1></div>
  <h2 class="heading02">検索結果：<em id="resultcnt"></em></h2>
  <div class="searchbox01">
    <form name="form" method="get" action="fw.htm">
      <input type="hidden" name="enc" value="UTF8" />
      <!--{def freeparms}-->
      <!--{each freeparms}-->
      <input type="hidden" name="{rval freeparms/name}"	value="{rval freeparms/val}" />
      <!--{/each}-->
      <!--{/def}-->
      <input type="hidden" name="col" id="postname" value="{rval col}">
      <input type="hidden" id="cond1" name="cond1" value="{rval cond1}" />
      <input type="checkbox" id="cond153" name="cond153" value="{rval D_FREE_VAR:cond153}" {rval cond153_sel}>
      <!--{def D_FREE_VAR:postname}--><input type="search" name="keyword" placeholder="店舗・ATM名を入力" value="{rval html_keyword}"><!--{/def}-->
      <!--{def D_FREE_VAR:postaddr}--><input type="search" name="keyword" placeholder="住所を入力" value="{rval html_keyword}"><!--{/def}-->
      <input type="submit" name="search" value="検索">
    </form>
  </div>
  <ul class="tab04">
    <li<!--{def D_FREE_VAR:cond1_2_select}--> class="select"<!--{/def}--> onClick="document.form.cond1.value='{rval D_FREE_VAR:cond1_2_val}';document.form.search.click();">店舗</li>
    <li<!--{def D_FREE_VAR:cond1_3_select}--> class="select"<!--{/def}--> onClick="document.form.cond1.value='{rval D_FREE_VAR:cond1_3_val}';document.form.search.click();">ATM</li>
    <li<!--{def D_FREE_VAR:cond1_1_select}--> class="select"<!--{/def}--> onClick="document.form.cond1.value='{rval D_FREE_VAR:cond1_1_val}';document.form.search.click();">すべて</li>
  </ul>
  <div class="box-check">
    <input type="checkbox" name="openatm" id="atmcheck01" onClick="document.form['cond153'].checked=this.checked;document.form.submit();" {rval cond153_sel}>
    <label for="atmcheck01">今あいているATMのみ表示</label>
  </div>
  <ul id="ZdcEmapSearchShopFwList" class="arrow-list01">
  </ul>
