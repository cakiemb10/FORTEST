<!--{comment}-->
����TOP�Ρֱ�̾���餵�����פ������ܤ��Ƥ������
<!--{/comment}-->
<!--{ndef mode_rs}-->
  <div class="heading-main02"><h1 class="icon-large-search">��̾���餵����</h1></div>
  <h2 class="heading02">������̡�{rval count1}��</h2>
  <div class="searchbox01">
    <form name="form" method="get" action="search_fw.htm">
      <input type="hidden" name="enc" value="UTF8" />
      <!--{def freeparms}-->
      <!--{each freeparms}-->
      <input type="hidden" name="{rval freeparms/name}"	value="{rval freeparms/val}" />
      <!--{/each}-->
      <!--{/def}-->
      <input type="search" name="keyword" placeholder="��̾������" value="{rval html_keyword}">
      <input type="submit" value="����">
    </form>
  </div>
  <ul id="ZdcEmapSearchFWList1" class="arrow-list01">
  </ul>
<!--{/ndef}-->
<!--{comment}-->
Ź�޾ܺ٤Υ롼�ȸ����������ܤ��Ƥ������
<!--{/comment}-->
<!--{def mode_rs}-->
  <h1 class="heading-main01 heading-main-ttl02">
    <!--{def col_20}--><span class="icon-heading02">{rval col_20}<span><!--{def col_21}-->��{rval col_21}��<!--{/def}--></span></span><!--{/def}-->
    <!--{def col_29}--><span class="icon-heading02">{rval col_29}<span><!--{def col_30}-->��{rval col_30}��<!--{/def}--></span></span><!--{/def}-->
    <!--{def col_37}--><span class="icon-heading03">�椦�����ԡ�{rval col_37}<span><!--{def col_38}-->��{rval col_38}��<!--{/def}--></span></span><!--{/def}-->
  </h1>
  <h2 class="heading02">��ȯ�Ϥθ���<span>�ʥ롼�ȸ�����</span></h2>
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
      <input type="search" placeholder="��ȯ�Ϥ����ϡʱ�̾/�����" name="keyword" value="{rval html_keyword}">
      <input type="submit" value="����">
    </form>
  </div>
  <nav class="tab01">
    <ul>
      <li><a href="" <!--{def init_view1}-->class="current"<!--{/def}-->><span>��̾</span>��{rval count1}���</a></li>
      <li><a href="" <!--{def init_view2}-->class="current"<!--{/def}-->><span>����</span>��{rval count2}���</a></li>
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
