function cascader(config) {
    const DEFAULT_FIELD_NAMES = {
        label: 'label',
        value: 'value',
        children: 'children',
    };
    this.root = config.root;
    this.triggerType = config.triggerType || 'click';
    this.dataSource = config.dataSource || [];
    this.placeholder = config.placeholder || '请选择';
    this.defaultValue = config.defaultValue || [];
    this.fieldNames = config.fieldNames || DEFAULT_FIELD_NAMES;

    var menuHTML = 
        `<div class="yt-cascader-menu-wrap">
            <ul class="yt-cascader-menu" key="1"></ul>
        </div>`;
    var pickerHTML =
        `<span class="yt-cascader-picker">
            <input placeholder=${this.placeholder} class="yt-cascader-input">
            <i class="icon-down yt-cascader-arrow">v</i>
            ${menuHTML}
        </span>`;
    var mainWrap = document.getElementById(this.root);
    var pickerDom, menuWrapDom, menuDom;
            

    const getDomById = (id) => {
        return document.getElementById(id);
    };

    const getDomByClass = (className) => {
        return document.getElementsByClassName(className);
    };

    // 初始化级联数据
    const initPickerMenu = (menu, ) => {
        // let menuList = menuWrapDom.children;
        
        this.dataSource && this.dataSource.length > 0 ?
        this.dataSource.map((item, index) => {
            menu.innerHTML += `<li class="yt-cascader-menu-item" key="${index+1}">${item.label}</li>`;
            
        }) 
        : '暂无数据'
        
    };

    // 事件绑定
    const initEvent = () => {
        
        pickerDom.onfocus = () => {
            menuWrapDom.style.display = 'flex';
        };
        
        pickerDom.onblur = () => {
            // menuWrapDom.style.display = 'none';
        };

        menu
    };
    
    this.initPage = () => {
        mainWrap.innerHTML = pickerHTML;
        pickerDom = getDomByClass('yt-cascader-input')[0];
        menuWrapDom = getDomByClass('yt-cascader-menu-wrap')[0];
        menuDom = getDomByClass('yt-cascader-menu');
        initPickerMenu(0);
        initEvent();
    };
}