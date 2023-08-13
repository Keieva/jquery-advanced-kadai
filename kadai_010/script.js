$ (function(){
    // もっと見るの上にカーソルがあるとき
     $('.button-more').on('mouseover',function(){
       $(this).animate({
            opacity:0.5,
            marginLeft:20,
        },100);
        
    });

    $('.button-more').on('mouseout',function(){
        $(this).animate({
            opacity: 1,
            marginLeft: 0,
        },100);
    });

    // カルーセル
    $('.carousel').slick({
        autoplay: true,
        dots: true,
        infinite: true,
        autoplaySpeed: 1000,
        arrows: false,     
    });

    // AjaxでSTATIC FORMSデータを送信
    $('#submit').on('click',function(event){
        // formタグによる送信を拒否
        event.preventDefault();

        // 入力チェックした結果、エラーがあるかないかを判定
        let result = inputCheck();
        // エラー判定とメッセージ取得
        let error = result.error;
        let message = result.message;

        // エラーがなかったらフォームを送信する
        if(error == false){
            // Ajaxでformを送信する
            $.ajax({
                url: "https://api.staticforms.xyz/submit",
                type: 'POST',
                data: $('#form').serialize(),
                success:function(result){
                    alert('お問い合わせを送信しました')
                },
                error:function(xhr,resp,text){
                    alert('お問い合わせ送信できませんでした')
                }
            })
        }else{
            // エラーメッセージを表示する
            alert(message);
        }
    });

    // フォーカスが外れたとき（blur)にフォームの入力チェックをする
    $('#name').blur(function(){
        inputCheck();
    });
    $('#furigana').blur(function(){
        inputCheck();
    });
    $('#email').blur(function(){
        inputCheck();
    });
    $('#tel').blur(function(){
        inputCheck();
    });
    $('#message').blur(function (){
        inputCheck();
    });
    
    $('#agree').click(function(){
        inputCheck();
    });

    $('#prefecture').blur(function(){
        inputCheck();
    })

    // お問い合わせフォームの入力チェック
    function inputCheck(){
        // エラーチェックの結果
        let result;

        // エラーメッセージのテキスト
        let message= '';

        // エラーがなければfalse,エラーがあればtrue
        let error = false;

        // お名前のチェック
        if($('#name').val()===''){
            $('#name').css('background-color','#f79999');
            error = true;
            message +='お名前を入力してください。\n';
        }else{
            $('#name').css('background-color','#fafafa');
        }

        // フリガナチェック
        if($('#furigana').val()===''){
            $('#furigana').css('background-color','#f79999');
            error =true;
            message +='フリガナを入力してください\n';
        }else{
            $('#furigana').css('background-color','#fafafa');
        }
        
        // お問い合わせ内容チェック
        if ($('#message').val()==""){
            // エラーあり
            $('#message').css('background-color','#f79999');
            error =true;
            message +='お問い合わせを入力してください\n'
        }else{
            // エラーなし
            $('#message').css('background-color','#fafafa');
            
            
        }
        // メールアドレスチェック
        if($('#email').val()==""||
        $('#email').val().indexOf('@')== -1||
        $('#email').val().indexOf('.')== -1){
        //  エラーあり
        $('#email').css('background-color','#f79999');
        error = true;
        message += 'メールアドレスが未記入または「@」「.」が含まれていません\n';
        }else{
            // エラーなし
             $('#email').css('background-color','#fafafa')
         }

        //  電話番号チェック（未入力はOK,未入力でない場合-が必要）
        if($('#tel').val()!=''&& $('#tel').val().indexOf('-') ==-1){
            // エラーあり
            $('#tel').css('background-color','#f79999');
            error = true;
            message +='電話番号に「-」が含まれていません　\n';
        }else{
            // エラーなし
            $('#tel').css('background-color','#fafafa');
        }
        // 都道府県入力チェック
        if($('#prefecture').val() ==""){
            // エラーあり
            $('#prefecture').css('background-color','#f79999');
            error=true;
            message +='都道府県を選択してください \n';
        }else{
            // エラーなし
            $('#prefecture').css('background-color','#fafafa');
        }
        
        // 個人情報のチェックボックス入力チェック
        if($('#agree').prop('checked')==false){
            error= true;
            message +='個人情報の取り扱いについてご同意いただける場合は、チェックボックスにチェックしてください\n';
        }

        // 判定結果に応じて送信ボタンの表示を変更
        if(error==true){
            $('#submit').attr('src','images/button-submit.png');
        }else{
            $('#submit').attr('src','images/button-submit-blue.png');
        }

        // オブジェクトでエラー判定とメッセージを返す
        result={
            error :error,
            message: message
        }

        // 戻り値としてエラーがあるかどうかを返す
        return result;
    }
    });


    