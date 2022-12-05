const plugin = {}

const methodNames = [
    "RegisterCallback",
]

const helperFunctionNames = [
    'lengthBytesUTF8',
    'stringToUTF8',
    'Pointer_stringify',
]

const helperFunctions = '{' + helperFunctionNames.map(x => `${x}:${x}`).join(',') + '}'

for (let i = 0; i < methodNames.length; i++) {
    const methodName = methodNames[i]
    plugin[methodName] = function () { }
    plugin[methodName+'__postset'] = `_${methodName} = __unity_getBinding(Module, ${helperFunctions}, '${methodName}')`
}

mergeInto(LibraryManager.library, plugin)