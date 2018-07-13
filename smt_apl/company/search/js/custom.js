/* カスタマイズ用のJavaScriptコードをここに記述してください */
// DOMを全て読み込んでから処理する
$(function()
{
	// [.syncer-acdn]にクリックイベントを設定する
	$( '.syncer-acdn' ).click( function()
	{
		// [data-target]の属性値を代入する
		var target = $( this ).data( 'target' ) ;

		// [target]と同じ名前のIDを持つ要素に[slideToggle()]を実行する
		$( '#' + target ).slideToggle() ;

                $(this).parent("li").toggleClass("accordion-open2");

		// 終了
		return false ;
	} ) ;
}) ;
