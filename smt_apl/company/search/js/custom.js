/* �������ޥ����Ѥ�JavaScript�����ɤ򤳤��˵��Ҥ��Ƥ������� */
// DOM�������ɤ߹���Ǥ����������
$(function()
{
	// [.syncer-acdn]�˥���å����٥�Ȥ����ꤹ��
	$( '.syncer-acdn' ).click( function()
	{
		// [data-target]��°���ͤ���������
		var target = $( this ).data( 'target' ) ;

		// [target]��Ʊ��̾����ID��������Ǥ�[slideToggle()]��¹Ԥ���
		$( '#' + target ).slideToggle() ;

                $(this).parent("li").toggleClass("accordion-open2");

		// ��λ
		return false ;
	} ) ;
}) ;
