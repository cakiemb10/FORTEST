  <div class="table heading-main02"><div><h1 class="icon-large-search">͹�ضɡ�ATM�򤵤���<span class="topTxtE">Post Office and ATM Locator</span></h1></div><div class="right"><a href="#multilang" class="button03 inlink">Global</a></div></div>
  <p>͹�ضɡ��椦�椦������椦�����ԡ�ATM�򸡺��Ǥ��ޤ���</p>

    <nav class="arrow-list01 bt01">
      <ul>
        <li>
          <form name="fmGps1" action="javascript:ZdcEmapMakeGPSCondParams(document.fmGps1);{rval _urlLocationTop}">
            <input type="hidden" name="gpsfilter" id="gpsfilter">
            <input type="hidden" name="cond151" id="cond151" value="COL_08:0 AND ( COL_05:1 OR ( COL_05:0 AND COL_06:1 AND COL_07:0 ) OR ( COL_05:0 AND COL_06:0 AND COL_07:1 AND COL_40:01 ) )">
            <!--{def freeparms}-->
            <!--{each freeparms}-->
            <input type="hidden" name="{rval freeparms/name}"	value="{rval freeparms/val}" />
            <!--{/each}-->
            <!--{/def}-->
          </form>
          <a href="javascript:document.fmGps1.submit();" class="icon-large-post">�����Ϥ˶ᤤ͹�ضɤ򤵤���</a>
        </li>
        <li>
          <form name="fmGps2" action="javascript:ZdcEmapMakeGPSCondParams(document.fmGps2);{rval _urlLocationTop}">
            <input type="hidden" name="gpsfilter" id="gpsfilter">
            <input type="hidden" name="cond152" id="cond152" value="COL_09:t">
            <!--{def freeparms}-->
            <!--{each freeparms}-->
            <input type="hidden" name="{rval freeparms/name}"	value="{rval freeparms/val}" />
            <!--{/each}-->
            <!--{/def}-->
          </form>
          <a href="javascript:document.fmGps2.submit();" class="icon-large-atm">�����Ϥ˶ᤤATM�򤵤���</a>
        </li>
        <li class="no-link"><span class="icon-large-postoffice">Ź�ޡ�ATM̾���餵����</span>
          <div>
            <form name="formFw" method="get" action="fw.htm" onSubmit="{rval _jsFWSubmit}">
              <input type="hidden" name="enc" value="UTF8" />
              <!--{def freeparms}-->
              <!--{each freeparms}-->
              <input type="hidden" name="{rval freeparms/name}"	value="{rval freeparms/val}" />
              <!--{/each}-->
              <!--{/def}-->
              <input name="col" type="hidden" value="FREE_SRCH" />
              <input type="hidden" name="cond1" value="{rval D_FREE_VAR:cond1_2_val}">
              <div class="searchbox01">
                  <input type="search" placeholder="�㡧����͹�ضɡ����󤸤夯" name="keyword" value="">
                  <input type="submit" value="����">
              </div>
            </form>
          </div>
        </li>
        <li class="no-link"><span class="icon-large-address">���꤫�餵����</span>
          <div>
            <form name="formFw2" method="get" action="fw.htm" onSubmit="{rval _jsFWSubmit}">
              <input type="hidden" name="enc" value="UTF8" />
              <!--{def freeparms}-->
              <!--{each freeparms}-->
              <input type="hidden" name="{rval freeparms/name}"	value="{rval freeparms/val}" />
              <!--{/each}-->
              <!--{/def}-->
              <input name="col" type="hidden" value="FREE_SRCH_02" />
              <input type="hidden" name="cond1" value="{rval D_FREE_VAR:cond1_2_val}">
              <div class="searchbox01">
                  <input type="search" placeholder="�㡧�ܾ븩����ԡ������" name="keyword" value="">
                  <input type="submit" value="����">
              </div>
            </form>
          </div>
        </li>
        <li class="no-link"><span class="icon-large-station">��̾���餵����</span>
          <div>
            <form name="formPl" method="get" action="{rval _urlPlFw}" onSubmit="{rval _jsPlFWSubmit}">
              <input type="hidden" name="enc" value="UTF8" />
              <!--{def freeparms}-->
              <!--{each freeparms}-->
              <input type="hidden" name="{rval freeparms/name}"	value="{rval freeparms/val}" />
              <!--{/each}-->
              <!--{/def}-->
              <div class="searchbox01">
                  <input type="search" placeholder="�㡧��������" name="keyword" value="">
                  <input type="submit" value="����">
              </div>
            </form>
          </div>
        </li>
<!--{comment}-->
        <li class="no-link"><span class="icon-large-rail">ϩ��̾���餵����</span>
          <div>
          <form name="formRo" method="get" action="search_rosen.htm" onSubmit="if(this.tod.value==''){return false;}">
            <input type="hidden" name="start" value="1">
            <!--{def freeparms}-->
            <!--{each freeparms}-->
            <input type="hidden" name="{rval freeparms/name}"	value="{rval freeparms/val}" />
            <!--{/each}-->
            <!--{/def}-->
            <div class="box-select">
              <select name="tod" id="select01">
                <option value="">��ƻ�ܸ�������</option>
                <option value="01">�̳�ƻ</option>
                <option value="02">�Ŀ���</option>
                <option value="03">��긩</option>
                <option value="04">�ܾ븩</option>
                <option value="05">���ĸ�</option>
                <option value="06">������</option>
                <option value="07">ʡ�縩</option>
                <option value="08">��븩</option>
                <option value="09">���ڸ�</option>
                <option value="10">���ϸ�</option>
                <option value="11">��̸�</option>
                <option value="12">���ո�</option>
                <option value="13">�����</option>
                <option value="14">�����</option>
                <option value="15">���㸩</option>
                <option value="16">�ٻ���</option>
                <option value="17">���</option>
                <option value="18">ʡ�温</option>
                <option value="19">������</option>
                <option value="20">Ĺ�</option>
                <option value="21">���츩</option>
                <option value="22">�Ų���</option>
                <option value="23">���θ�</option>
                <option value="24">���Ÿ�</option>
                <option value="25">���츩</option>
                <option value="26">������</option>
                <option value="27">�����</option>
                <option value="28">ʼ�˸�</option>
                <option value="29">���ɸ�</option>
                <option value="30">�²λ���</option>
                <option value="31">Ļ�踩</option>
                <option value="32">�纬��</option>
                <option value="33">������</option>
                <option value="34">���縩</option>
                <option value="35">������</option>
                <option value="36">���縩</option>
                <option value="37">���</option>
                <option value="38">��ɲ��</option>
                <option value="39">���θ�</option>
                <option value="40">ʡ����</option>
                <option value="41">���츩</option>
                <option value="42">Ĺ�긩</option>
                <option value="43">���ܸ�</option>
                <option value="44">��ʬ��</option>
                <option value="45">�ܺ긩</option>
                <option value="46">�����縩</option>
                <option value="47">���츩</option>
              </select>
              <button type="submit">����</button>
            </div>
          </form>
          </div>
        </li>
<!--{/comment}-->
        <li class="no-link"><span class="icon-large-rail">ϩ��̾���餵����</span>
          <div>
            <form name="formRo" method="get" action="search_fw_rosen.htm">
              <input type="hidden" name="enc" value="UTF8" />
              <!--{def freeparms}-->
              <!--{each freeparms}-->
              <input type="hidden" name="{rval freeparms/name}"	value="{rval freeparms/val}" />
              <!--{/each}-->
              <!--{/def}-->
              <div class="searchbox01">
                  <input type="search" placeholder="�㡧������������" name="keyword" value="">
                  <input type="submit" value="����">
              </div>
            </form>
          </div>
        </li>
      </ul>
    </nav>

  <div class="box pa00">
    <ul class="ul01">
      <li><a href="{rval D_FREE_VAR:D_DIR_BASE_G}i.htm?type=1">�����Τ�����</a></li>
      <li><a href="{rval D_FREE_VAR:D_DIR_BASE_G}i.htm?type=2">���־������������ˤĤ���</a></li>
    </ul>
  </div>

  <h2 class="heading02">���Τ餻</h2>
  <div class="summary">
<!--{ndef D_FREE_VAR:nenshi}-->
	<p>
		<a href="https://www.japanpost.jp/information/disaster.html" target="_blank" class="block">�ҳ��߽�ˡ��Ŭ�Ѥ��줿�ϰ�γ����ޤؤ����谷���ˤĤ���</a>
	</p>
    <a href="http://www.post.japanpost.jp/notification/saigai/index2.html" target="_blank" class="block">ʿ��28ǯ��2016ǯ�˷����Ͽ̤αƶ��ˤĤ���</a>
<!--{/ndef}-->
<!--{def D_FREE_VAR:nenshi}-->
	<p>ǯ��ǯ�Ϥ�͹�ضɡ�ATM�αĶȻ��֤䥵���ӥ��μ谷�����ܥ����Ȥ˷Ǻܤ��Ƥ������ƤȰۤʤ��礬�������ޤ��Τǡ��ʲ��Τ��Τ餻��ATM�����ʡ��ηǼ�ʪ�ˤƤ���ǧ����������<br>
	<a href="http://www.post.japanpost.jp/notification/productinformation/2017/1226_01.html" target="_blank">��ǯ��ǯ�ϤαĶȻ������Τ��Τ餻������͹�ء�</a><br>
	<a href="http://www.jp-bank.japanpost.jp/news/2017/news_id001267.html" target="_blank">��ǯ��ǯ�Ϥˤ�����Ƽ掠���ӥ��μ�갷���ˤĤ��ơʤ椦�����ԡ�</a>
	</p>
<!--{/def}-->
  </div>
  <div class="summary">
    <h3>�ڤ���դ���������</h3>
    <p>�Ƕᡢ͹�ض����ˤ��䤤��碌�κݤˡ��ְ㤤���ä������Ƥ���ޤ���<br>͹�ض����ˤ����ä򤪤����κݤϡ��������Ȥ��ֹ�򤪳Τ��ᤤ�������ޤ��褦���ꤤ�����夲�ޤ���</p>
  </div>

