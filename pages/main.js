bindFunction('RegisterCallback', callbackPtr => {
    const callback = str => {
         // ヒープを確保してそれを渡す
        const bufferSize = helperFunctions.lengthBytesUTF8(str) + 1
        const buffer = Module._malloc(bufferSize)
        helperFunctions.stringToUTF8(str, buffer, bufferSize)
        
        // メソッドを実行する
        // viの部分はメソッドの引数や戻り値に応じて変更する
        Module.dynCall_vi(callbackPtr, buffer)
        
        // ヒープを解放する
        Module._free(buffer)
    }
    
    const input = document.getElementById('input')
    callback(input.value)
    input.addEventListener('input', () => callback(input.value))
})