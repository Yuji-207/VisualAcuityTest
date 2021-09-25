let sound_path = 'seatbelt_sign.wav';
const device = document.getElementById("device");


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
        // 画面サイズと解像度を入力させる
    }

    let pixel = 7.5 / 25.4 * dpi;  // 直径のピクセル数, 7.5[mm] / 25.4[mm/inch] * dpi
    return pixel;
};

function num2dir(num) {
    if (num === '2') {
        return 0;
    } else if (num === '3') {
        return 45;
    } else if (num === '6') {
        return 90;
    } else if (num === '9') {
        return 135;
    } else if (num === '8') {
        return 180;
    } else if (num === '7') {
        return 225;
    } else if (num === '4') {
        return 270;
    } else if (num === '1') {
        return 315;
    } else {
        return '-';
    }
}

function score(dir, answer) {

    if (typeof(answer) === 'number') {

        let diff = Math.abs(dir - answer);

        if (diff === 0) {
            return 0.2;
        } else if (diff === 45 || diff === 315) {
            return 0.1;
        } else {
            return 0.0;
        }
        
    } else {
        return 0.0;
    }

}


// Start Button
document.getElementById('start').onclick = () => {
    
    dirs = [];

    document.getElementById('start').classList.add('d-none');
    document.getElementById('waiting').classList.remove('d-none');

    window.setTimeout(() => {
    
        let count = 0;
        let display = false;

        while (true) {  // 画像が画面内の入らない場合をスキップ
            count_skip = 0;
            let acuity = Math.floor(count / 5) * 0.1 + 0.1;
            let pixel = defaultSize() / acuity;
            if (pixel <= screen.width) {
                count_skip = count;
                break
            }
            count++;
        }

        id = setInterval(() =>　{

            let acuity = Math.floor(count / 5) * 0.1 + 0.1;  // 視力を計算

            if (acuity <= 1.5) {

                // Play Sound
                let audioElem = new Audio();
                audioElem.src = sound_path;
                audioElem.play();
                
                let pixel = String(defaultSize() / acuity) + 'px';  // 画像サイズを設定
                document.getElementById('ring').style.width = pixel;
                document.getElementById('ring').style.height = pixel;

                var rotate = Math.floor(Math.random() / 0.125) * 0.125;  // 画像の回転角を設定
                rotate = rotate * 360 - 90;  // 度数法に変換し, 0度を0時方向に修正
                document.getElementById('ring').style.transform = 'rotate(' + rotate + 'deg)';
                dirs.push(rotate + 90);

                if (!display) {
                    document.getElementById('waiting').classList.add('d-none');
                    document.getElementById('finish').classList.remove('d-none');
                    document.getElementById('ring').classList.remove('d-none');
                    display = true;
                }

                count++;

            } else {
                clearInterval(id);
            }

        }, 3000);  // 3秒待機
    }, 10000);  // 10秒待機
};


// Finish Button
document.getElementById('finish').onclick = () => {
    document.getElementById('start').classList.remove('d-none');
    document.getElementById('finish').classList.add('d-none');
    document.getElementById('waiting').classList.add('d-none');
    document.getElementById('ring').classList.add('d-none');
    clearInterval(id);
};


// Answer
document.getElementById('answer-btn').onclick = () => {

    document.getElementById('tbody').innerHTML = "";  // 既存の表を削除
    const numbers = document.getElementById('answer').value.split('');

    for (let i=0; i<dirs.length; i++) {

        let acuity = Math.floor((Math.floor(i + count_skip / 5) * 0.1 + 0.1) * 10) / 10;
        let dir = dirs[i];
        let number = numbers[i];
        let answer = num2dir(number);

        document.getElementById('tbody').insertAdjacentHTML(
            'beforeend', 
            `<tr>\
                <th scope="row">${i + 1}</th>\
                <td>${acuity}</td>\
                <td>${dir}</td>\
                <td>${answer}</td>\
                <td>${score(dir, answer)}</td>\
            </tr>`
        );
    }

    // 表までスクロール
    let position = document.getElementById('table').getBoundingClientRect();
    window.scrollTo(0, position.top);

};
