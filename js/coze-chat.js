/* ═══════════════════ JINXIU AI / COZE CHAT SDK ═══════════════════ */
(function () {
  'use strict';

  var BOT_ID = '7649420454331662336';
  var SDK_URL = 'https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/0.1.0-beta.5/libs/cn/index.js';
  var launchButton = document.getElementById('aiChatLaunch');
  var statusText = document.getElementById('aiChatStatus');
  var mountPoint = document.getElementById('aiChatMount');
  var client = null;
  var loading = null;

  if (!launchButton || !statusText) return;

  function setStatus(message, state) {
    statusText.textContent = message;
    statusText.dataset.state = state || '';
  }

  function loadSdk() {
    if (window.CozeWebSDK && window.CozeWebSDK.WebChatClient) {
      return Promise.resolve();
    }
    if (loading) return loading;

    loading = new Promise(function (resolve, reject) {
      var script = document.createElement('script');
      script.src = SDK_URL;
      script.async = true;
      script.onload = function () {
        if (window.CozeWebSDK && window.CozeWebSDK.WebChatClient) resolve();
        else reject(new Error('Coze SDK 未正确初始化'));
      };
      script.onerror = function () {
        reject(new Error('Coze SDK 加载失败'));
      };
      document.head.appendChild(script);
    });

    return loading;
  }

  function createClient() {
    return new window.CozeWebSDK.WebChatClient({
      config: {
        bot_id: BOT_ID
      },
      componentProps: {
        title: '锦秀问答',
        lang: 'zh-CN',
        layout: window.matchMedia('(max-width: 640px)').matches ? 'mobile' : 'pc',
        width: 420
      },
      el: mountPoint
    });
  }

  launchButton.addEventListener('click', function () {
    launchButton.disabled = true;
    setStatus('正在连接锦秀问答…', 'loading');

    loadSdk()
      .then(function () {
        if (!client) client = createClient();
        if (typeof client.showChatBot === 'function') {
          client.showChatBot();
        } else {
          window.setTimeout(function () {
            var sdkEntry = mountPoint && mountPoint.querySelector('img');
            if (sdkEntry && sdkEntry.parentElement) sdkEntry.parentElement.click();
          }, 0);
        }
        launchButton.textContent = '再次打开锦秀问答';
        setStatus('已连接。若问答窗口未自动展开，请点击新出现的“锦秀问答”入口。', 'ready');
      })
      .catch(function () {
        setStatus('问答组件暂时无法连接，请检查网络后重试。', 'error');
      })
      .finally(function () {
        launchButton.disabled = false;
      });
  });
})();
