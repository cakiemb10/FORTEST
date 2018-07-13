  <div class="heading-main02"><h1 class="icon-large-search"><!--{def cond151}-->現在地に近い郵便局をさがす<!--{/def}--><!--{def cond152}-->現在地に近いATMをさがす<!--{/def}--><!--{ndef cond151}--><!--{ndef cond152}--><!--{def html_plname}-->{rval html_plname}に近い店舗を表示<!--{/def}--><!--{/ndef}--><!--{/ndef}--> </h1></div>
  <h2 class="heading02">検索結果：<em id="resultcnt"></em></h2>
  <div class="box-check">
    <input type="checkbox" name="openatm" id="atmcheck01" onClick="document.form['cond153'].checked=this.checked;document.form.action='n.htm';document.form.submit();" {rval cond153_sel}>
    <label for="atmcheck01">今あいているATMのみ表示</label>
  </div>
  <div class="btn-center">
    <form name="form" method="get" action="n.htm">
      <!--{def html_pltype}--><input type="hidden" name="pltype" value="{rval html_pltype}" /><!--{/def}-->
      <!--{def html_plname}--><input type="hidden" name="plname" value="{rval html_plname}" /><!--{/def}-->
      <!--{def html_plfilter}--><input type="hidden" name="plfilter" value="{rval html_plfilter}" /><!--{/def}-->
      <!--{def html_lat}--><input type="hidden" name="lat" value="{rval html_lat}" /><!--{/def}-->
      <!--{def html_lon}--><input type="hidden" name="lon" value="{rval html_lon}" /><!--{/def}-->
      <!--{def html_datum}--><input type="hidden" name="datum" value="{rval html_datum}" /><!--{/def}-->
      <!--{def html_loc}--><input type="hidden" name="loc" value="{rval html_loc}" /><!--{/def}-->
      <!--{def freeparms}-->
      <!--{each freeparms}-->
      <input type="hidden" name="{rval freeparms/name}"	value="{rval freeparms/val}" />
      <!--{/each}-->
      <!--{/def}-->
      <!--{def cond151}--><input type="hidden" name="cond151" value="{rval cond151}" /><!--{/def}-->
      <!--{def cond152}--><input type="hidden" name="cond152" value="{rval cond152}" /><!--{/def}-->
      <input type="checkbox" id="cond153" name="cond153" value="{rval D_FREE_VAR:cond153}" {rval cond153_sel}>
    </form>
    <a href="javascript:void(0);" class="button02 icon-map" onClick="document.form.action='nmap.htm';document.form.submit();">地図で表示</a>
  </div>
  <ul id="ZdcEmapSearchNShopList" class="arrow-list01">
  </ul>
