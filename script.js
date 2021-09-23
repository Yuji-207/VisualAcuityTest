const device = document.getElementById("device");
let sound_path = 'seatbelt_sign.wav';

function defaultSize() {

    let name = device.value;

    if (name === 'macbook') {
        var dpi = 127.67;
    } else if (name === 'pixel3') {
        var dpi = 443;
    } else if (name === 'pixel3xl') {
        var dpi = 523;
    } else if (name === 'huawei'){
        var dpi = 537.75;
    } else {
        ;  // 画面サイズと解像度を入力させる
    }

    let pixel = 7.5 / 25.4 * dpi;  // 1辺のピクセル数, 7.5[mm] / 25.4[mm/inch] * dpi
    return pixel;
};


// Start Button
document.getElementById('start').onclick = () => {

    document.getElementById('start').classList.add('d-none');
    document.getElementById('waiting').classList.remove('d-none');

    window.setTimeout(() => {
        
        document.getElementById('waiting').classList.add('d-none');
        document.getElementById('finish').classList.remove('d-none');
    
        let count = 0;
        var intervalId = setInterval(() =>　{

            // Play Sound
            let audioElem = new Audio();
            audioElem.src = sound_path;
            audioElem.play();

            let mag = Math.floor(count / 5) * 0.1 + 0.1;  // 視力を計算

            if (mag <= 1.0) {

                let pixel = String(defaultSize() / mag) + 'px';  // 画像サイズを設定
                document.getElementById('ring').style.width = pixel;
                document.getElementById('ring').style.height = pixel;

                var rotate = Math.floor(Math.random() / 0.125) * 0.125;  // 画像の回転角を設定
                rotate = rotate * 360 - 90;  // 度数法に変換し, 0度を0時方向に修正
                document.getElementById('ring').style.transform = 'rotate(' + rotate + 'deg)';

                if (count === 0) {
                    document.getElementById('ring').classList.remove('d-none');
                }

            } else {
                clearInterval(intervalId);
            }

            console.log(Math.floor(mag*10)/10, rotate+90);
            count++;

        }, 5000);  // 5秒待機
    }, 10000);  // 10秒待機
};


// Finish Button
document.getElementById('finish').onclick = () => {
    clearInterval(intervalId);
    document.getElementById('start').classList.remove('d-none');
    document.getElementById('finish').classList.add('d-none');
    document.getElementById('waiting').classList.add('d-none');
    document.getElementById('ring').classList.add('d-none');
};
