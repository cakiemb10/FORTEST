<?php
function css_sep_sizeval($sizeval) {
	$n = "0";
	$u = "";
	if (preg_match('/([0-9.\-]+)/i', $sizeval, $num)) {
		$n = $num[0];
		$u = substr($sizeval, strlen($num[0]));
	} else {
		$u = $sval;
	}
	return array($n, $u);
}

function css_add_sizeval($sval, $addvals) {
	$arr_sval = css_sep_sizeval(trim($sval));
	$arr_addval = explode(",", $addvals);
	foreach ($arr_addval as $addval) {
		$arr_addval = css_sep_sizeval(trim($addval));
		if ($arr_sval[1] == $arr_addval[1]) {
			$arr_sval[0] += $arr_addval[0];
		}
	}
	if ($arr_sval[0] < 0) $arr_sval[0] = 0;
	return implode("", $arr_sval);
}
?>
