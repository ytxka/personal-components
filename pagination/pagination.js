/**
 * 问题：
 * 事件绑定时使用的是id标识，因此使用时页面中只能存在1个分页器，否则无法正确渲染
 */
function Pagination(root, config) {
    this.currPage = 1;
    this.pageSize = config.pageSize || 10;
    this.totalCount = config.totalCount || 0;
    this.preText = config.preText || '<';
    this.nextText = config.nextText || '>';
    this.firstText = config.preText || '<<';
    this.lastText = config.preText || '>>';
    this.totalPage = Math.ceil(this.totalCount / this.pageSize);
    // 页数过多时(>10)，是否展示省略号
    this.isShowEllpsis = config.isShowEllpsis !== undefined ? config.isShowEllpsis : true;
    // 是否展示快速跳转到第一页和最后一页
    this.isShowFirstAndLast = config.isShowFirstAndLast || false;
    // 是否展示总条数
    this.isShowTotal = config.isShowTotal !== undefined ? config.isShowTotal : true;
    // 是否展示分页大小选择框
    this.isShowSelectPageSize = config.isShowSelectPageSize !== undefined ? config.isShowSelectPageSize : true;

    // 页面结构
    var mainWrap = document.getElementById(root);
    var ellipsisHTML = '<div class="pagination-item ellipsis">···</div>';
    var countTotalHTML = `<div class="text-total">总条数：${this.totalCount}</div>`;
    var firstHTML = `<div class="pagination-item first" id="firstPage">${this.firstText}</div>`;
    var lastHTML = `<div class="pagination-item last" id="lastPage">${this.lastText}</div>`;
    var preHTML = `<div class="pagination-item pre" id="prePage">${this.preText}</div>`;
    var nextHTML = `<div class="pagination-item next" id="nextPage">${this.nextText}</div>`;
    var pageNumWrapHTML = '<div class="page-num-wrap" id="pageNumWrap"></div>'
    var selectSizeHTML = 
        `<select class="select-page-size" id="selectSize">
            <option value="10">10条/页</option>
            <option value="20">20条/页</option>
            <option value="30">30条/页</option>
         </select>`    

    // 是否需要省略号
    const isNeedEllipsis = () => {
        return this.totalPage > 10;
    }
    
    // 是否需要右端省略号
    const isNeedRightEllipsis = () => {
        return this.isShowEllpsis && isNeedEllipsis() && (this.totalPage - this.currPage) >=4;
    }
    
    // 是否需要左端省略号
    const isNeedLeftEllipsis = () => {
        return this.isShowEllpsis && isNeedEllipsis() && this.currPage >=5;
    } 
    
    const getDomById = (id) => {
        return document.getElementById(id);
    }
    
    // 切换页码的active样式
    const changeActiveStyle = (oldIndex, newIndex) => {
        let oldDom = getDomById(`num${oldIndex}`);
        if(oldDom) oldDom.classList.remove('active');
        getDomById(`num${newIndex}`).classList.add('active');
    }

    const addDisableStyle = (eleId) => {
        getDomById(eleId) ? getDomById(eleId).classList.add('disabled') : '';
    }
    
    const removeDisableStyle = (eleId) => {
        getDomById(eleId) ? getDomById(eleId).classList.remove('disabled') : '';
    }
    
    // 判断样式：是否需要disabled
    const judgeBtnStyle = () => {
        if(this.totalPage === 0) {
            addDisableStyle('firstPage');
            addDisableStyle('prePage');
            if (this.isShowFirstAndLast) {
                addDisableStyle('lastPage');
                addDisableStyle('nextPage');
            }
            return;
        }
        if(this.currPage === 1) {
            addDisableStyle('prePage');
            removeDisableStyle('nextPage');
            if (this.isShowFirstAndLast) {
                addDisableStyle('firstPage');
                removeDisableStyle('lastPage');
            }
            return;
        }
        if(this.currPage === this.totalPage) {
            removeDisableStyle('prePage');
            addDisableStyle('nextPage');
            if (this.isShowFirstAndLast) {
                removeDisableStyle('firstPage');
                addDisableStyle('lastPage');
            }
            return;
        }
        else {
            if (this.isShowFirstAndLast) {
                removeDisableStyle('firstPage');
                removeDisableStyle('lastPage');
            }
            removeDisableStyle('prePage');
            removeDisableStyle('nextPage');
        }
    }

    // 分页大小改变
    const handlePageSizeChange = (e) => {
        this.pageSize = e.target.value;
        this.totalPage = Math.ceil(this.totalCount / this.pageSize);
        this.currPage = 1;
        drawNums();
        initEvent();
        getDomById('num1').classList.add('active');
    }

    // 需要省略号时的绘制页码部分
    const drawEllipsisNum = () => {
        var pageNumWrapDom = getDomById('pageNumWrap');
        pageNumWrapDom.innerHTML = '';
        // 左右都需要省略号
        if(isNeedLeftEllipsis() && isNeedRightEllipsis()) {
            pageNumWrapDom.innerHTML += '<div class="pagination-item page-num" id="num1">1</div>';
            pageNumWrapDom.innerHTML += ellipsisHTML;
            for(let i = this.currPage - 2; i <= this.currPage + 2; i++) {
                pageNumWrapDom.innerHTML += `<div class="pagination-item page-num" id="num${i}">${i}</div>`;
            }
            pageNumWrapDom.innerHTML += ellipsisHTML;
            pageNumWrapDom.innerHTML += `<div class="pagination-item page-num" id="num${this.totalPage}">${this.totalPage}</div>`;
        }

        // 只需要左端省略号
        else if(isNeedLeftEllipsis() && !isNeedRightEllipsis()) {
            pageNumWrapDom.innerHTML += '<div class="pagination-item page-num" id="num1">1</div>';
            pageNumWrapDom.innerHTML += ellipsisHTML;
            for(let i = this.totalPage - 4; i <= this.totalPage; i++) {
                pageNumWrapDom.innerHTML += `<div class="pagination-item page-num" id="num${i}">${i}</div>`;
            }
        }

        // 只需要右端省略号
        else if(!isNeedLeftEllipsis() && isNeedRightEllipsis()) {
            for(let i = 1; i <= 5; i++) {
                pageNumWrapDom.innerHTML += `<div class="pagination-item page-num" id="num${i}">${i}</div>`;
            }
            pageNumWrapDom.innerHTML += ellipsisHTML;
            pageNumWrapDom.innerHTML += `<div class="pagination-item page-num" id="num${this.totalPage}">${this.totalPage}</div>`;
        }
        judgeBtnStyle();
    }

    // 绘制页码部分
    const drawNums = () => {
        var pageNumWrapDom = getDomById('pageNumWrap');
        pageNumWrapDom.innerHTML = '';
        
        if(!this.isShowEllpsis || !isNeedEllipsis()) {
            for(let i = 0; i < this.totalPage; i++) {
                pageNumWrapDom.innerHTML += `<div class="pagination-item page-num" id="num${i+1}">${i+1}</div>`
            }
        } else {
            drawEllipsisNum();
        }
        judgeBtnStyle();
    }

    // 事件绑定
    const initEvent = () => {
        // 分页大小改变事件
        this.isShowSelectPageSize ? getDomById('selectSize').onchange = handlePageSizeChange : '';
        
        // 其他点击事件
        mainWrap.onclick = (e) => {
            if (this.totalPage === 0) {
                this.currPage = 1;
                judgeBtnStyle();
                return;
            }
            const id = e.target.id;

            // 如果点击的是页码
            if(id.match(/num/)) {
                let oldPage = this.currPage;
                let newPage = Number(id.replace('num', ''));
                if(this.isShowEllpsis && isNeedEllipsis() && this.currPage >= 4) {
                    this.currPage = newPage;
                    drawEllipsisNum();
                    changeActiveStyle(oldPage, newPage);
                } 
                else {
                    changeActiveStyle(this.currPage, newPage);
                    this.currPage = newPage;
                    judgeBtnStyle();
                }
                return;
            }

            let newPage;
            let oldPage = this.currPage;
            switch (id) {
                case 'firstPage':
                    if(this.currPage === 1) return;
                    changeActiveStyle(this.currPage, 1);
                    this.currPage = 1;
                    break;
                case 'lastPage':
                    if(this.currPage === this.totalPage) return;
                    changeActiveStyle(this.currPage, this.totalPage);
                    this.currPage = this.totalPage;
                    break;
                case 'prePage':
                    newPage = this.currPage !== 1 ? this.currPage - 1 : 1;
                    if(this.isShowEllpsis && isNeedEllipsis() && this.currPage >= 4) {
                        this.currPage = newPage;
                        drawEllipsisNum();
                        changeActiveStyle(oldPage, newPage);
                        return;
                    } 
                    changeActiveStyle(this.currPage, newPage);
                    this.currPage = newPage;
                    break;
                case 'nextPage':
                    newPage = this.currPage !== this.totalPage ? this.currPage + 1 : this.totalPage;
                    if(this.isShowEllpsis && isNeedEllipsis() && this.currPage >= 4) {
                        this.currPage = newPage;
                        drawEllipsisNum();
                        changeActiveStyle(oldPage, newPage);
                        return;
                    } 
                    changeActiveStyle(this.currPage, newPage);
                    this.currPage = newPage
                    break;
                default:
                    break;
            }
            judgeBtnStyle();
        };
    }
    
    // 页面初始化（翻页btn、分页大小选择框只初始化一次）
    this.initPage = () => {
        let baseHTML = preHTML + pageNumWrapHTML + nextHTML;
        countTotalHTML = this.isShowTotal ? countTotalHTML: '';
        firstHTML = this.isShowFirstAndLast ? firstHTML: '';
        lastHTML = this.isShowFirstAndLast ? lastHTML: '';
        selectSizeHTML = this.isShowSelectPageSize ? selectSizeHTML: '';
        // 页面渲染
        mainWrap.innerHTML = countTotalHTML + firstHTML + baseHTML + lastHTML + selectSizeHTML;
        drawNums();
        getDomById(`num${this.currPage}`).classList.add('active');
        initEvent();
    }
}