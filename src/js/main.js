const alphabets = ["A", "B", "G", "D", "H", ["F", "U", "V", "W"], "Z", ["C", "Ch"], "Th", ["I", "J", "Y"], "K", "L", "M", "N", "S", ["E", "O"], "P", "Tz", "Q", "R", "Sh", "T"]
const hebrew = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ", "ק", "ר", "ש", "ת"]

const translateText = () => {
    let str = document.numForm.numInput.value
    let result = {hebrew_normal : "" , hebrew_reverse : "", alphabets: [] }
    const extAlphabets = (currentStr, elemLeft) => {

        let newElem = elemLeft.shift() //破壊的に先頭1要素を取り出す
    
        if (Array.isArray(newElem)) { //要素が複数種類の場合        
            newElem.forEach(elem => {
                if (elemLeft.length == 0) {
                    result.alphabets.push(currentStr + elem)
                    return
                } else {
                    extAlphabets(currentStr + elem, elemLeft.slice())
                }
            })
        } else { // 要素が1種類の場合
            if (elemLeft.length == 0) {
                result.alphabets.push(currentStr + newElem)
                return
            } else {
                extAlphabets(currentStr + newElem, elemLeft.slice())
            }
        }
        return
    }
    const output = () => {
        document.getElementById("main").innerHTML = `
          <div class="row">
              <div class="col-sm-12 col-md-12 col-lg-12">
                  <div class="card fluid">
                      <div class="section"><h3>ヘブライ通常(右→左読み)</h3></div>
                      <div class="section"><ul><li>${result.hebrew_normal}</li></ul></div>
                  </div>
              </div>
          </div>
          <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12">
              <div class="card fluid">
                  <div class="section"><h3>ヘブライ逆順(左→右読み)</h3></div>
                  <div class="section"><ul><li>${result.hebrew_reverse}</li></ul></div>
              </div>
          </div>
          </div>
          <div class="row">
               <div class="col-sm-12 col-md-12 col-lg-12">
                  <div class="card fluid" id="alphabets">
                  <div class="section"><h3>英文字</h3></div>
                  <div class="section"><ul id="alphabet_list">${result.alphabets.map(element => '<li>' + element + '</li>').join('')}</ul></div>
              </div>
          </div>`
    }
    
    str = str.replace(/[０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xfee0)).replace(/　/g, " ")
    if(str.match(/^[\d ]+$/)){
        str = str.split(' ').filter(Boolean);
        if ( ! str.every( elem => elem.match(/^\d$|^1[0-9]|2[0-2]$/))){
            document.getElementById("main").innerHTML = `<p>入力に誤りがあるかプログラムが間違ってますぺろぺろ</p>`
            return false
        }
        let pickedAlphabets = [];
   
        str.forEach(elem => {
            pickedAlphabets.push(alphabets[elem - 1])
        });
        
        str.forEach(elem => result.hebrew_normal += hebrew[elem -1 ])
        result.hebrew_reverse = [...result.hebrew_normal].reverse().join('')
       
        let tmpStr = ""
        extAlphabets(tmpStr, pickedAlphabets)
        output()
    }

    else {
        document.getElementById("main").innerHTML = `<p>入力に誤りがあるかプログラムが間違ってますぺろぺろ</p>`

    }
    return false
}