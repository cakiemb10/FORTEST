</div>
<!-- �����˥եå��򵭽Ҥ��Ƥ������� -->

<!-- ��������ܥ���/ -->
<a href="#pagetop" class="pagescroll"></a>
<!-- /��������ܥ��� -->

<!--{def cp_img_list}-->
<!--{each cp_img_list}-->
<aside class="banner-area"<!--{ndef search_top}--><!--{ndef shop_inf}--> style="display:none;"<!--{/ndef}--><!--{/ndef}-->>
<a href="{rval cp_img_list/URL}" target="_blank"><img src="{rval cp_img_list/IMG_G}" /></a>
</aside>
<!--{/each}-->
<!--{/def}-->

<!--{def search_top}-->
<nav class="arrow-list01 bt01">
  <ul>
    <li><a href="http://www.japanpost.jp/" target="_blank"><span class="list-logo01">����͹��</span></a></li>
    <li><a href="http://www.post.japanpost.jp/" target="_blank"><span class="list-logo02">����͹��</span></a></li>
    <li><a href="http://www.jp-bank.japanpost.jp/" target="_blank"><span class="list-logo03">�椦������</span></a></li>
    <li><a href="http://jp-life-sps.japanpost.jp/" target="_blank"><span class="list-logo04">�������̿</span></a></li>
  </ul>
</nav>

<section class="box">
  <span id="multilang"></span>
  <h2 class="heading02">Find your nearest post office and ATM.</h2>
  <ul class="ul02">
    <li><a href="{rval D_FREE_VAR:en_url}">English</a></li>
    <li><a href="{rval D_FREE_VAR:tw_url}">������ʸ</a></li>
    <li><a href="{rval D_FREE_VAR:cn_url}">&#31616;����ʸ</a></li>
    <li><a href="{rval D_FREE_VAR:ko_url}">&#54620;&#44397;&#50612;</a></li>
    <li><a href="{rval D_FREE_VAR:th_url}">&#3652;&#3607;&#3618;</a></li>
    <li><a href="{rval D_FREE_VAR:fr_url}">fran&ccedil;ais</a></li>
    <li><a href="{rval D_FREE_VAR:it_url}">italiano</a></li>
  </ul>
</section>
<!--{/def}-->

<div class="btn-center">
<!--{ndef shop_inf}-->
  <a href="{rval D_FREE_VAR:pc_site_url}" class="button02 icon-pc">PC�ǤϤ�����</a>
<!--{/ndef}-->
<!--{def shop_inf}-->
  <a href="{rval pcdtlurl}" class="button02 icon-pc">PC�ǤϤ�����</a>
<!--{/def}-->
</div>

<footer>
<!--{comment}-->
    <a href="{rval D_FREE_VAR:D_DIR_BASE_G}i.htm?type=3" class="more-link02">�����ȤΤ����ѤˤĤ���</a>
<!--{/comment}-->
  <small>&copy;JAPAN POST GROUP</small>
  <div class="footer-logo"><a href="javascript:void(0);" class="logo02">͹�ضɡ�����͹�����롼��</a></div>
</footer>
