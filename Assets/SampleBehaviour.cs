using System;
using System.Runtime.InteropServices;
using AOT;
using UnityEngine;
using UnityEngine.UI;

public class SampleBehaviour : MonoBehaviour
{
    [SerializeField] private Text text;

    private static SampleBehaviour _instance;

    [DllImport("__Internal")]
    private static extern void RegisterCallback(Action<string> callback);

    [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterAssembliesLoaded)]
    private static void Initialize()
    {
        // avoid capture keyboard input by unity
        WebGLInput.captureAllKeyboardInput = false;
    }

    [MonoPInvokeCallback(typeof(Action<string>))]
    private static void Callback(string str)
    {
        if (_instance == null) return;

        _instance.text.text = str;
    }

    void Start()
    {
        _instance = this;
        RegisterCallback(Callback);
    }
}