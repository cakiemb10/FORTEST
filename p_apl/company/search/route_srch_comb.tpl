	<nav class="tab02 mt10">
		<ul>
			<li><a href="" class="current"><span><span class="routeIcon"><img src="{rval D_FREE_VAR:D_DIR_COMPANY_HTTPS}images/icon_car.png" alt="��"></span>��<!--{def drive}--><!--{each drive}--><!--{def drive/no_1}--><!--{def drive/total_time_hour}-->{rval drive/total_time_hour}����<!--{/def}-->{rval drive/total_time_min}ʬ<!--{/def}--><!--{/each}--><!--{/def}--><!--{ndef drive}-->-<!--{/ndef}-->��</span></a></li>
			<li><a href=""><span><span class="routeIcon"><img src="{rval D_FREE_VAR:D_DIR_COMPANY_HTTPS}images/icon_train.png" alt="�ż�"></span>��<!--{def comb}--><!--{each comb}--><!--{def comb/no_1}--><!--{def comb/total_time_hour}-->{rval comb/total_time_hour}����<!--{/def}-->{rval comb/total_time_min}ʬ<!--{/def}--><!--{/each}--><!--{/def}--><!--{ndef comb}-->-<!--{/ndef}-->��</span></a></li>
			<li><a href=""><span><span class="routeIcon"><img src="{rval D_FREE_VAR:D_DIR_COMPANY_HTTPS}images/icon_walk.png" alt="����"></span>��<!--{def walk}--><!--{each walk}--><!--{def walk/no_1}--><!--{def walk/total_time_hour}-->{rval walk/total_time_hour}����<!--{/def}-->{rval walk/total_time_min}ʬ<!--{/def}--><!--{/each}--><!--{/def}--><!--{ndef walk}-->-<!--{/ndef}-->��</span></a></li>
		</ul>
	</nav>

<!--{comment}-->
�֥롼��
<!--{/comment}-->
	<div class="routeBox mb10">
<!--{def drive}-->
  <!--{each drive}-->
    <!--{def drive/no_1}-->
		<div class="route-summary">
			<dl class="dl01 w4em">
				<dt>�� Υ</dt><dd><!--{def drive/distance_km}-->{rval drive/distance_km}km<!--{/def}--><!--{ndef drive/distance_km}-->{rval drive/distance}m<!--{/ndef}--></dd>
				<dt>�� ��</dt><dd><!--{def drive/total_time_hour}-->{rval drive/total_time_hour}����<!--{/def}-->{rval drive/total_time_min}ʬ</dd>
				<dt>�� ��</dt><dd>{rval drive/fare_format}��</dd>
			</dl>
		</div>
		<a class="route-draw" href="javascript:void(0);" onClick="{rval drive/_jsRouteDraw}setPrintParam('{rval drive/print_param}');" >�롼�����Τ�ɽ��</a>
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
			<li><a href="javascript:void(0);" class="icon-goal"><!--{def col_20}-->{rval col_20}<br><!--{/def}--><!--{def col_29}-->{rval col_29}<br><!--{/def}--><!--{def col_37}-->�椦�����ԡ�{rval col_37}<br><!--{/def}--></a></li>
			<!--{/def}-->
		<!--{/each}-->
		</ul>
    <!--{/def}-->
  <!--{/each}-->
<!--{/def}-->
<!--{ndef drive}-->
		��ȯ�Ϥ���Ū�Ϥε�Υ���ᤤ���ᡢ�֥롼�Ȥ�ɽ�����Ǥ��ޤ���Ǥ���������롼�Ȥ򻲾Ȥ���������
<!--{/ndef}-->
	</div>

<!--{comment}-->
���̵��إ롼��
<!--{/comment}-->
	<div class="routeBox mb10" style="display:none;">
<!--{def comb}-->
		<div class="route-summary2">
			<ul>
	<!--{each comb}-->
				<li>
					<a href="" class="routeRank <!--{def comb/no_1}-->current<!--{/def}-->">
						<span class="fb">����{rval comb/no} ��{rval comb/start_hour}:{rval comb/start_min}��{rval comb/end_hour}:{rval comb/end_min}��</span><span class="rsIcon"><!--{def comb/train}--><img src="{rval D_FREE_VAR:D_DIR_COMPANY_HTTPS}images/icon_train.png" alt="�ż�">&nbsp;<!--{/def}--><!--{def comb/walk}--><img src="{rval D_FREE_VAR:D_DIR_COMPANY_HTTPS}images/icon_walk.png" alt="����">&nbsp;<!--{/def}--><!--{def comb/drive}--><img src="{rval D_FREE_VAR:D_DIR_COMPANY_HTTPS}images/icon_car.png" alt="��">&nbsp;<!--{/def}--><!--{def comb/airplane}--><img src="{rval D_FREE_VAR:D_DIR_COMPANY_HTTPS}images/icon_airplane.png" alt="���Ե�">&nbsp;<!--{/def}--><!--{def comb/bus}--><img src="{rval D_FREE_VAR:D_DIR_COMPANY_HTTPS}images/icon_bus.png" alt="�Х�"><!--{/def}--></span>
						<dl class="dl01 w4em">
							<dt>�� ��</dt><dd><!--{def comb/total_time_hour}-->{rval comb/total_time_hour}����<!--{/def}-->{rval comb/total_time_min}ʬ</dd>
							<dt>�� ��</dt><dd>{rval comb/fare_format}��</dd>
							<dt>�� ��</dt><dd>{rval comb/transcnt}��</dd>
						</dl>
					</a>
				</li>
				<ul class="routeList3 mt10 mb20" <!--{ndef comb/no_1}-->style="display:none;"<!--{/ndef}-->>
					<a class="route-draw" href="javascript:void(0);" onClick="{rval comb/_jsRouteDraw}setPrintParam('{rval comb/print_param}');">�롼�����Τ�ɽ��</a>
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
						{rval comb/list/start_name}<!--{def comb/list/train}-->��<!--{/def}-->
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
							<div class="ml20 lh12"><!--{def comb/list/walk}-->����<!--{/def}--><!--{ndef comb/list/walk}--><!--{def comb/list/linenm}-->{rval comb/list/linenm}<!--{/def}--><!--{/ndef}--></div>
						</div>
			<!--{ndef comb/list/route_end}-->
						{rval comb/list/end_name}<!--{def comb/list/train}-->��<!--{/def}-->
			<!--{/ndef}-->
			<!--{def comb/list/route_end}-->
						<!--{def col_20}-->{rval col_20}<br><!--{/def}--><!--{def col_29}-->{rval col_29}<br><!--{/def}--><!--{def col_37}-->�椦�����ԡ�{rval col_37}<!--{/def}-->
			<!--{/def}-->
					</li>
		<!--{/each}-->
		<!--{def comb/bus}-->
					<li class="bus-comment">
						�ºݤΥХ����ԥ롼�ȤȤϰۤʤ�ޤ��Τǡ�����դ���������
					</li>
		<!--{/def}-->
				</ul>
	<!--{/each}-->
			</ul>
		</div>
<!--{/def}-->
<!--{ndef comb}-->
	��ȯ�Ϥ����<!--{def col_20}-->{rval col_20}<!--{/def}--><!--{def col_29}-->{rval col_29}<!--{/def}--><!--{def col_37}-->�椦�����ԡ�{rval col_37}<!--{/def}-->�פޤǸ��̵��ؤ�Ȥä��롼�Ȥ������Ǥ��ޤ���Ǥ�����
<!--{/ndef}-->
	</div>

<!--{comment}-->
����롼��
<!--{/comment}-->
	<div class="routeBox mb10" style="display:none;">
<!--{def walk}-->
	<!--{each walk}-->
		<a class="route-draw" href="javascript:void(0);" onClick="{rval walk/_jsRouteDraw}setPrintParam('{rval walk/print_param}');" >�롼�����Τ�ɽ��</a>
		<ul class="routeList2 mt10">
		<!--{each walk/list}-->
			<!--{def walk/list/route_start}-->
			<li><a href="javascript:void(0);" class="icon-start">{rval walk/list/start_name}</a></li>
			<!--{/def}-->
			<!--{def walk/list/route_end}-->
			<li><a href="javascript:void(0);" class="icon-goal"><!--{def col_20}-->{rval col_20}<br><!--{/def}--><!--{def col_29}-->{rval col_29}<br><!--{/def}--><!--{def col_37}-->�椦�����ԡ�{rval col_37}<br><!--{/def}--></a></li>
			<!--{/def}-->
		<!--{/each}-->
		</ul>
		<span class="walk-comment">����ԲĤ�ƻϩ��ޤ�Ǥ����礬����ޤ��Τǡ��ºݤθ��̵����˽��äƤ���������</span>
	<!--{/each}-->
<!--{/def}-->
<!--{ndef walk}-->
		��ȯ�Ϥ����<!--{def col_20}-->{rval col_20}<!--{/def}--><!--{def col_29}-->{rval col_29}<!--{/def}--><!--{def col_37}-->�椦�����ԡ�{rval col_37}<!--{/def}-->�פޤǤΥ롼�Ȥ������Ǥ��ޤ���Ǥ�����
<!--{/ndef}-->
	</div>

	<input type="hidden" id="bus_latlons_all" value='{rval bus_latlons_all}'>
	<img src="{rval D_FREE_VAR:D_DIR_COMPANY_HTTPS}images/spacer.gif" style="display:none;" onload="combRootResultEventSet();ZdcEmapSetBusLatlons();" />
