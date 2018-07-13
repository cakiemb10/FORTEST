<div id="ZdcEmapWait">
	<div style="position:relative;">
		<img id="ZdcEmapWait-bgimg" src="{rval D_DIR_BASE}img/load-back.png" />
		<img id="ZdcEmapWait-animg" src="{rval D_DIR_BASE}img/load.gif" />
		<div id="ZdcEmapWait-text">{rval D_WAIT_MSG}</div>
	</div>
</div>
<div id="ZdcEmapNotFound">
	<span>地図表示範囲内に店舗がありません。<br>地図を移動させたり、縮尺を変更いただくと、<br>付近の店舗を表示します。</span>
</div>
<div style="padding-top: 45px;">
<div id="mapMoveMyLocation" class="map-mylocation" onclick="{rval _jsLocMoveMyLoc}"><img src="{rval D_DIR_COMPANY}img/location.png" alt="here"></div>
<div id="ZdcEmapMap" class="map"></div>
</div>
