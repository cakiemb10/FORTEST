  <h1 class="heading-main01 heading-main-ttl02">
    <!--{def col_20}--><span class="icon-heading02">{rval col_20}<span><!--{def col_21}-->��{rval col_21}��<!--{/def}--></span></span><!--{/def}-->
    <!--{def col_29}--><span class="icon-heading02">{rval col_29}<span><!--{def col_30}-->��{rval col_30}��<!--{/def}--></span></span><!--{/def}-->
    <!--{def col_37}--><span class="icon-heading03">�椦�����ԡ�{rval col_37}<span><!--{def col_38}-->��{rval col_38}��<!--{/def}--></span></span><!--{/def}-->
  </h1>
  <h2 class="heading02">�롼�Ȥθ���<span>�ʥ롼�ȸ�����</span></h2>
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
  <nav class="tab02">
    <ul>
      <li><a href="" class="current"><span><span class="route-icon-car">�֤ǹԤ�</span>��<!--{def drive}--><!--{each drive}--><!--{def drive/no_1}--><!--{def drive/total_time_hour}-->{rval drive/total_time_hour}����<!--{/def}-->{rval drive/total_time_min}ʬ<!--{/def}--><!--{/each}--><!--{/def}--><!--{ndef drive}-->-<!--{/ndef}-->��</span></a></li>
      <li><a href=""><span><span class="route-icon-train">�ż֤ǹԤ�</span>��<!--{def comb}--><!--{each comb}--><!--{def comb/no_1}--><!--{def comb/total_time_hour}-->{rval comb/total_time_hour}����<!--{/def}-->{rval comb/total_time_min}ʬ<!--{/def}--><!--{/each}--><!--{/def}--><!--{ndef comb}-->-<!--{/ndef}-->��</span></a></li>
      <li><a href=""><span><span class="route-icon-walk">����ǹԤ�</span>��<!--{def walk}--><!--{each walk}--><!--{def walk/no_1}--><!--{def walk/total_time_hour}-->{rval walk/total_time_hour}����<!--{/def}-->{rval walk/total_time_min}ʬ<!--{/def}--><!--{/each}--><!--{/def}--><!--{ndef walk}-->-<!--{/ndef}-->��</span></a></li>
    </ul>
  </nav>

<!--{comment}-->
�֥롼��
<!--{/comment}-->
<article class="route-type01 block-on">
<!--{def drive}-->
  <!--{each drive}-->
    <!--{def drive/no_1}-->
  <div class="route-summary">
    <dl class="dl01 w4em">
      <dt>�� Υ</dt>
      <dd><!--{def drive/distance_km}-->{rval drive/distance_km}km<!--{/def}--><!--{ndef drive/distance_km}-->{rval drive/distance}m<!--{/ndef}--></dd>
      <dt>�� ��</dt>
      <dd><!--{def drive/total_time_hour}-->{rval drive/total_time_hour}����<!--{/def}-->{rval drive/total_time_min}ʬ</dd>
      <dt>�� ��</dt>
      <dd>{rval drive/fare_format}��</dd>
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
    <li><a href="javascript:void(0);" class="icon-goal"><!--{def col_20}-->{rval col_20}<br><!--{/def}--><!--{def col_29}-->{rval col_29}<br><!--{/def}--><!--{def col_37}-->�椦�����ԡ�{rval col_37}<br><!--{/def}--></a></li>
      <!--{/def}-->
    <!--{/each}-->
    <a href="{rval drive/url}" class="button02 icon-route">�Ͽޤǥ롼�Ȥ��ǧ</a>
  </ul>
    <!--{/def}-->
  <!--{/each}-->
<!--{/def}-->
<!--{ndef drive}-->
  <p>��ȯ�Ϥ���Ū�Ϥε�Υ���ᤤ���ᡢ�֥롼�Ȥ�ɽ�����Ǥ��ޤ���Ǥ���������롼�Ȥ򻲾Ȥ���������</p>
<!--{/ndef}-->
</article>

<!--{comment}-->
���̵��إ롼��
<!--{/comment}-->
<article class="route-type02 block-off">
<!--{def comb}-->
  <ul class="accordion-list01">
  <!--{each comb}-->
    <li class="<!--{def comb/no_1}-->accordion-open<!--{/def}--><!--{ndef comb/no_1}-->accordion-close<!--{/ndef}-->">
        <a href="" class="route-summary">
          <h3>����{rval comb/no} ��{rval comb/start_hour}:{rval comb/start_min}��{rval comb/end_hour}:{rval comb/end_min}��<!--{def comb/train}--><span class="route-icon-train">�ż�</span><!--{/def}--><!--{def comb/walk}--><span class="route-icon-walk">����</span><!--{/def}--><!--{def comb/drive}--><span class="route-icon-car">��</span><!--{/def}--><!--{def comb/airplane}--><span class="route-icon-airplane">���Ե�</span><!--{/def}--><!--{def comb/bus}--><span class="route-icon-bus">�Х�</span><!--{/def}--></h3>
          <dl class="dl01 w4em">
            <dt>�� ��</dt>
            <dd><!--{def comb/total_time_hour}-->{rval comb/total_time_hour}����<!--{/def}-->{rval comb/total_time_min}ʬ</dd>
            <dt>�� ��</dt>
            <dd>{rval comb/fare_format}��</dd>
            <dt>�� ��</dt>
            <dd>{rval comb/transcnt}��</dd>
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
            {rval comb/list/start_name}<!--{def comb/list/train}-->��<!--{/def}-->
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
              <span class="f12"><!--{def comb/list/walk}-->����<!--{/def}--><!--{ndef comb/list/walk}--><!--{def comb/list/linenm}-->{rval comb/list/linenm}<!--{/def}--><!--{/ndef}--></span>
            </div>
            <div class="mt5">
      <!--{ndef comb/list/route_end}-->
              {rval comb/list/end_name}<!--{def comb/list/train}-->��<!--{/def}-->
      <!--{/ndef}-->
      <!--{def comb/list/route_end}-->
              <!--{def col_20}-->{rval col_20}<br><!--{/def}--><!--{def col_29}-->{rval col_29}<br><!--{/def}--><!--{def col_37}-->�椦�����ԡ�{rval col_37}<!--{/def}-->
      <!--{/def}-->
            </div>
          </li>
    <!--{/each}-->
    <!--{def comb/bus}-->
          <li class="bus-comment">
            �ºݤΥХ����ԥ롼�ȤȤϰۤʤ�ޤ��Τǡ�����դ���������
          </li>
    <!--{/def}-->
          <a href="{rval comb/url}<!--{def comb/bus}-->{rval D_FREE_VAR:map_url_add}<!--{/def}-->" class="button02 icon-route">�Ͽޤǥ롼�Ȥ��ǧ</a>
        </ul>
    </li>
  <!--{/each}-->
  </ul>
<!--{/def}-->
<!--{ndef comb}-->
  <p>��ȯ�Ϥ����<!--{def col_20}-->{rval col_20}<!--{/def}--><!--{def col_29}-->{rval col_29}<!--{/def}--><!--{def col_37}-->�椦�����ԡ�{rval col_37}<!--{/def}-->�פޤǸ��̵��ؤ�Ȥä��롼�Ȥ������Ǥ��ޤ���Ǥ�����</p>
<!--{/ndef}-->
</article>

<!--{comment}-->
����롼��
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
    <li><a href="javascript:void(0);" class="icon-goal"><!--{def col_20}-->{rval col_20}<br><!--{/def}--><!--{def col_29}-->{rval col_29}<br><!--{/def}--><!--{def col_37}-->�椦�����ԡ�{rval col_37}<br><!--{/def}--></a></li>
      <!--{/def}-->
    <!--{/each}-->
    <div class="walk-comment">����ԲĤ�ƻϩ��ޤ�Ǥ����礬����ޤ��Τǡ��ºݤθ��̵����˽��äƤ���������</div>
    <a href="{rval walk/url}" class="button02 icon-route">�Ͽޤǥ롼�Ȥ��ǧ</a>
  </ul>
  <!--{/each}-->
<!--{/def}-->
<!--{ndef walk}-->
  <p>��ȯ�Ϥ����<!--{def col_20}-->{rval col_20}<!--{/def}--><!--{def col_29}-->{rval col_29}<!--{/def}--><!--{def col_37}-->�椦�����ԡ�{rval col_37}<!--{/def}-->�פޤǤΥ롼�Ȥ������Ǥ��ޤ���Ǥ�����</p>
<!--{/ndef}-->
</article>

<input type="hidden" id="bus_latlons_all" value='{rval bus_latlons_all}'>
<img src="{rval D_DIR_COMPANY}img/spacer.gif" style="display:none;" onload="ZdcEmapSetBusLatlons();" />
