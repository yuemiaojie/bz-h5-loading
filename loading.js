/**
 *  @author Yue
 *  @summary 2020/11/6 -loading插件
 *  @version 1.2.8
 */

function BzLoading(config) {
  this._defConfig = this._defConfig();
  this.config = this._valiParams(config);
  this.settings = Object.assign(this._defConfig, this.config);
  this.wrap = document.querySelector('body');
  this.showStatus = false;
};

BzLoading.prototype._noScroll = function () {
  var bzMaskView = document.querySelector('.bz-mask_view');
  bzMaskView.addEventListener("touchstart", function (e) {
    e.stopPropagation();
    e.preventDefault();
  }, false);
};

BzLoading.prototype._relieveNoScroll = function () {
  var bzMaskView = document.querySelector('.bz-mask_view');
  bzMaskView.removeEventListener("touchstart", function (e) {
    e.stopPropagation();
    e.preventDefault();
  }, false);
};

BzLoading.prototype._defConfig = function () {
  return {
    type: 1,
    text: '加载中...'
  };
};

BzLoading.prototype._getType = function (val) {
  var _toStr = Function.prototype.call.bind(Object.prototype.toString);
  switch (_toStr(val)) {
    case '[object Number]':
      return 'num';
    case '[object String]':
      return 'str';
    case '[object Object]':
      return 'obj';

    default:
      break;
  };
};

BzLoading.prototype._hasOwn = function (obj, key) {
  return obj.hasOwnProperty(key);
};

BzLoading.prototype._valiParams = function (params) {
  this._getType(params) !== 'obj' && (params = {});
  var type = this._hasOwn(params, 'type') && this._getType(params.type) === 'num' ? params.type : 1;
  var text = this._hasOwn(params, 'text') && this._getType(params.text) === 'str' ? params.text : '加载中...';
  return {
    type: type,
    text: text
  };
};

BzLoading.prototype._createDom = function () {
  // 创建根元素
  var loadingWrapper = document.createElement('div');
  loadingWrapper.className = 'bz-loading-wrapper';
  // 创建loading元素
  var loadingView = document.createElement('div');
  loadingView.className = 'bz-loading-view';
  // 创建mask元素
  var maskView = document.createElement('div');
  maskView.className = 'bz-mask_view';
  // 创建loading加载中元素
  var tipView = document.createElement('div');
  tipView.className = 'bz-tip-view';
  tipView.innerText = this.settings.text;

  switch (this.settings.type) {
    case 1:
      loadingHtml =
        '<div class="bz-loading01">' +
        '<div class="bz-container1">' +
        '  <div class="bz-circle bz-circle1"></div>' +
        '  <div class="bz-circle bz-circle2"></div>' +
        '  <div class="bz-circle bz-circle3"></div>' +
        '  <div class="bz-circle bz-circle4"></div>' +
        '</div>' +
        '<div class="bz-container2">' +
        '  <div class="bz-circle bz-circle1"></div>' +
        '  <div class="bz-circle bz-circle2"></div>' +
        '  <div class="bz-circle bz-circle3"></div>' +
        '  <div class="bz-circle bz-circle4"></div>' +
        '</div>'
      '</div>';
      break;
    case 2:
      loadingHtml =
        '<div class="bz-loading02">' +
        '<span class="bz-loading02__spinner bz-loading02__spinner--circular">' +
        '<svg width="40" height="40" class="bz-loading02__circular">' +
        '<circle cx="20" cy="20" r="17" fill="none"></circle>' +
        '</svg>' +
        '</span>' +
        '</div>';
      break;
    case 3:
      loadingHtml =
        '<div class="bz-loading03">' +
        '  <span class="bz-loading__spinner bz-loading__spinner--spinner">' +
        '    <i></i>' +
        '    <i></i>' +
        '    <i></i>' +
        '    <i></i>' +
        '    <i></i>' +
        '    <i></i>' +
        '    <i></i>' +
        '    <i></i>' +
        '    <i></i>' +
        '    <i></i>' +
        '    <i></i>' +
        '    <i></i>' +
        '  </span>' +
        '</div>';
      break;
    case 4:
      loadingHtml =
        '<div class="bz-loading04">' +
        '  <div class="bz-loading04_strip"></div>' +
        '  <div class="bz-loading04_strip"></div>' +
        '  <div class="bz-loading04_strip"></div>' +
        '  <div class="bz-loading04_strip"></div>' +
        '  <div class="bz-loading04_strip"></div>' +
        '</div>'
      break;
    case 5:
      loadingHtml =
        '<div class="bz-loading5"></div>';
      break;
    case 6:
      loadingHtml =
        '<div class="bz-loading6">' +
        '  <div class="bz-loading6_ball ball001"></div>' +
        '  <div class="bz-loading6_ball ball002"></div>' +
        '  <div class="bz-loading6_ball ball003"></div>' +
        '</div>'
      break;
    case 7:
      loadingHtml =
        '<div class="bz-loading7">' +
        '  <div class="bz-loading7_ball"></div>' +
        '</div>'
      break;
    default:
      loadingHtml = '';
      break;
  };
  loadingView.innerHTML = loadingHtml;
  loadingWrapper.appendChild(loadingView);
  loadingWrapper.appendChild(tipView);
  loadingWrapper.appendChild(maskView);
  this.wrap.appendChild(loadingWrapper);
};

// loading展示
BzLoading.prototype.show = function () {
  if (this.showStatus) return false;
  this.showStatus = true;
  var bzLoading = document.querySelector('.bz-loading-wrapper');
  if (!bzLoading) {
    this._createDom();
    this._noScroll();
  } else {
    bzLoading.style.display = 'block';
  }
};

// loading隐藏
BzLoading.prototype.hide = function () {
  this.showStatus = false;
  var bzLoading = document.querySelector('.bz-loading-wrapper');
  bzLoading.style.display = 'none';
};
