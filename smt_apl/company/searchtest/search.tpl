  <div class="table heading-main02"><div><h1 class="icon-large-search">郵便局・ATMをさがす<span class="topTxtE">Post Office and ATM Locator</span></h1></div><div class="right"><a href="#multilang" class="button03 inlink">Global</a></div></div>
  <p>郵便局、ゆうゆう窓口、ゆうちょ銀行、ATMを検索できます。</p>

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
          <a href="javascript:document.fmGps1.submit();" class="icon-large-post">現在地に近い郵便局をさがす</a>
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
          <a href="javascript:document.fmGps2.submit();" class="icon-large-atm">現在地に近いATMをさがす</a>
        </li>
        <li class="no-link"><span class="icon-large-postoffice">店舗・ATM名からさがす</span>
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
                  <input type="search" placeholder="例：新宿郵便局、しんじゅく" name="keyword" value="">
                  <input type="submit" value="検索">
              </div>
            </form>
          </div>
        </li>
        <li class="no-link"><span class="icon-large-address">住所からさがす</span>
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
                  <input type="search" placeholder="例：宮城県仙台市、仙台市" name="keyword" value="">
                  <input type="submit" value="検索">
              </div>
            </form>
          </div>
        </li>
        <li class="no-link"><span class="icon-large-station">駅名からさがす</span>
          <div>
            <form name="formPl" method="get" action="{rval _urlPlFw}" onSubmit="{rval _jsPlFWSubmit}">
              <input type="hidden" name="enc" value="UTF8" />
              <!--{def freeparms}-->
              <!--{each freeparms}-->
              <input type="hidden" name="{rval freeparms/name}"	value="{rval freeparms/val}" />
              <!--{/each}-->
              <!--{/def}-->
              <div class="searchbox01">
                  <input type="search" placeholder="例：上野、上野駅" name="keyword" value="">
                  <input type="submit" value="検索">
              </div>
            </form>
          </div>
        </li>
<!--{comment}-->
        <li class="no-link"><span class="icon-large-rail">路線名からさがす</span>
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
                <option value="">都道府県を選択</option>
                <option value="01">北海道</option>
                <option value="02">青森県</option>
                <option value="03">岩手県</option>
                <option value="04">宮城県</option>
                <option value="05">秋田県</option>
                <option value="06">山形県</option>
                <option value="07">福島県</option>
                <option value="08">茨城県</option>
                <option value="09">栃木県</option>
                <option value="10">群馬県</option>
                <option value="11">埼玉県</option>
                <option value="12">千葉県</option>
                <option value="13">東京都</option>
                <option value="14">神奈川県</option>
                <option value="15">新潟県</option>
                <option value="16">富山県</option>
                <option value="17">石川県</option>
                <option value="18">福井県</option>
                <option value="19">山梨県</option>
                <option value="20">長野県</option>
                <option value="21">岐阜県</option>
                <option value="22">静岡県</option>
                <option value="23">愛知県</option>
                <option value="24">三重県</option>
                <option value="25">滋賀県</option>
                <option value="26">京都府</option>
                <option value="27">大阪府</option>
                <option value="28">兵庫県</option>
                <option value="29">奈良県</option>
                <option value="30">和歌山県</option>
                <option value="31">鳥取県</option>
                <option value="32">島根県</option>
                <option value="33">岡山県</option>
                <option value="34">広島県</option>
                <option value="35">山口県</option>
                <option value="36">徳島県</option>
                <option value="37">香川県</option>
                <option value="38">愛媛県</option>
                <option value="39">高知県</option>
                <option value="40">福岡県</option>
                <option value="41">佐賀県</option>
                <option value="42">長崎県</option>
                <option value="43">熊本県</option>
                <option value="44">大分県</option>
                <option value="45">宮崎県</option>
                <option value="46">鹿児島県</option>
                <option value="47">沖縄県</option>
              </select>
              <button type="submit">検索</button>
            </div>
          </form>
          </div>
        </li>
<!--{/comment}-->
        <li class="no-link"><span class="icon-large-rail">路線名からさがす</span>
          <div>
            <form name="formRo" method="get" action="search_fw_rosen.htm">
              <input type="hidden" name="enc" value="UTF8" />
              <!--{def freeparms}-->
              <!--{each freeparms}-->
              <input type="hidden" name="{rval freeparms/name}"	value="{rval freeparms/val}" />
              <!--{/each}-->
              <!--{/def}-->
              <div class="searchbox01">
                  <input type="search" placeholder="例：山手線、山手" name="keyword" value="">
                  <input type="submit" value="検索">
              </div>
            </form>
          </div>
        </li>
      </ul>
    </nav>

  <div class="box pa00">
    <ul class="ul01">
      <li><a href="{rval D_FREE_VAR:D_DIR_BASE_G}i.htm?type=1">検索のしかた</a></li>
      <li><a href="{rval D_FREE_VAR:D_DIR_BASE_G}i.htm?type=2">位置情報取得の設定について</a></li>
    </ul>
  </div>

  <h2 class="heading02">お知らせ</h2>
  <div class="summary">
<!--{ndef D_FREE_VAR:nenshi}-->
	<p>
		<a href="https://www.japanpost.jp/information/disaster.html" target="_blank" class="block">災害救助法が適用された地域の皆さまへの非常取扱いについて</a>
	</p>
    <a href="http://www.post.japanpost.jp/notification/saigai/index2.html" target="_blank" class="block">平成28年（2016年）熊本地震の影響について</a>
<!--{/ndef}-->
<!--{def D_FREE_VAR:nenshi}-->
	<p>年末年始の郵便局・ATMの営業時間やサービスの取扱いは本サイトに掲載している内容と異なる場合がございますので、以下のお知らせやATMコーナーの掲示物にてご確認ください。<br>
	<a href="http://www.post.japanpost.jp/notification/productinformation/2017/1226_01.html" target="_blank">・年末年始の営業時間等のお知らせ（日本郵便）</a><br>
	<a href="http://www.jp-bank.japanpost.jp/news/2017/news_id001267.html" target="_blank">・年末年始における各種サービスの取り扱いについて（ゆうちょ銀行）</a>
	</p>
<!--{/def}-->
  </div>
  <div class="summary">
    <h3>【ご注意ください】</h3>
    <p>最近、郵便局等にお問い合わせの際に、間違い電話が増えております。<br>郵便局等にお電話をおかけの際は、当サイトで番号をお確かめいただきますようお願い申し上げます。</p>
  </div>

