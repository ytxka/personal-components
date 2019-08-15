function Pagination(root, config) {
    this.currPage = 2; // 当前页码
    this.pageSize = config.pageSize || 10; // 分页大小（每页条数）
    this.totalCount = config.totalCount || 0; // 总条数
    this.preText = config.preText || '<';
    this.nextText = config.nextText || '>';
    this.totalPage = Math.ceil(this.totalCount / this.pageSize);
    
    this.initPage = () => {
        this.wrap = document.getElementById(root);
        this.wrap.innerHTML = '';
        this.wrap.innerHTML += `<div class="sum">总条数：${this.totalCount}</div>`;
        // 上一页
        this.wrap.innerHTML += `<div class="pagination-item pre" id="prePage">${this.preText}</div>`;
        // 页码容器
        this.wrap.innerHTML += '<div class="pageNum-wrap" id="pageNumWrap"></div>'
        this.pageNumWrap = document.getElementById("pageNumWrap");
        // 渲染页码
        this.isShowMorePage();
        // 下一页
        this.wrap.innerHTML += `<div class="pagination-item next" id="nextPage">${this.nextText}</div>`;
        // 分页大小选择框
        this.wrap.innerHTML +=
            `<div class="select-wrap">
                <select class="select-page-size" id="selectSize">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </select>
                条/页
            </div>`

        this.preDom = document.getElementById('prePage');
        this.nextDom = document.getElementById('nextPage'); 
        this.pageNumsDom = document.getElementsByClassName('pageNum');
        
        this.totalPage !== 0 ? 
            this.pageNumsDom[this.currPage - 1].classList.add('active')
            : this.pageNumsDom[0].classList.add('active')
        this.selectSizeDom = document.getElementById("selectSize");
        this.isDisabledPre();
        this.isDisabledNext();
        this.initEvent();
    }

    // 显示元素
    this.showItem = (ele) => {
        ele.style.display = 'block';
    }

    // 隐藏元素
    this.hideItem = (ele) => {
        ele.style.display = 'none';
    }

    // 分页大小改变时，重新渲染页码
    this.reDrawNum = () => {
        this.totalPage = Math.ceil(this.totalCount / this.pageSize);
        this.wrap.children[2].innerHTML = ''
        this.pageNumWrap.innerHTML = '';
        this.isShowMorePage();
        this.isDisabledPre();
        this.isDisabledNext();
        this.initEvent();
    }

    // 页数大于10时，显示为更多分页样式，否则显示为基础样式
    this.isShowMorePage = () => {
        this.wrap.children[2].innerHTML += '<div class="pagination-item pageNum active" key="1">1</div>'
        this.wrap.children[2].innerHTML += '<div class="pagination-item more-page more-page-left" id="pointLeft">···</div>'
        let pointLeft = document.getElementById("pointLeft");
        console.log(this.wrap);
        
        if(this.totalPage <= 10) {
            for(let i = 1; i < this.totalPage; i++) {
                this.wrap.children[2].innerHTML += `<div class="pagination-item pageNum" key=${i+1}>${i+1}</div>`
            }
        } else {
            // 不显示左边的点
            if(this.currPage < 5) {
                this.hideItem(pointLeft);
                for(let i = 1; i < 7; i++) {
                    this.wrap.children[2].innerHTML += `<div class="pagination-item pageNum" key=${i+1}>${i+1}</div>`
                }
            } else { // 显示左边的点
                this.showItem(pointLeft);
                for(let i = this.currPage - 2; i <= this.currPage + 2; i++) {
                    this.wrap.children[2].innerHTML += `<div class="pagination-item pageNum" key=${i}>${i}</div>`
                }
            }
            this.wrap.children[2].innerHTML += '<div class="pagination-item more-page">···</div>'
            this.wrap.children[2].innerHTML += `<div class="pagination-item pageNum" key=${this.totalPage}>${this.totalPage}</div>`
        }
    }

    // 是否禁用pre-btn
    this.isDisabledPre = () => {
        if (this.currPage === 1 || this.totalPage === 0) {
            this.preDom.classList.add('disabled');
            this.preDom.removeEventListener('click', this.handleClickPre)
        }
    }

    // 是否禁用next-btn
    this.isDisabledNext = () => {
        if (this.currPage === this.totalPage || this.totalPage === 0) {
            this.nextDom.classList.add('disabled');
            this.nextDom.removeEventListener('click', this.handleClickNext)
        }
    }

    // 上一页
    this.handleClickPre = () =>{
        // 启用next-btn
        if (this.currPage === this.totalPage) {
            this.nextDom.classList.remove('disabled');
        }
        this.pageNumsDom[this.currPage - 1].classList.remove('active');
        this.currPage -= 1;
        this.pageNumsDom[this.currPage - 1].classList.add('active');
        this.isDisabledPre();
    }

    // 下一页
    this.handleClickNext = () => {
        // 启用pre-btn
        if (this.currPage === 1) {
            this.preDom.classList.remove('disabled');
        }
        this.pageNumsDom[this.currPage - 1].classList.remove('active');
        this.currPage += 1;
        this.pageNumsDom[this.currPage - 1].classList.add('active');
        this.isDisabledNext();
    }

    // 第n页
    this.handleClickNum = (currItem, newItem, newIndex) => {
        currItem.classList.remove('active');
        newItem.classList.add('active');
        this.currPage = newIndex;
        if (newIndex !== 1) {
            this.preDom.classList.remove('disabled');
        }
        if (newIndex !== this.totalPage) {
            this.nextDom.classList.remove('disabled');
        }
        this.isDisabledPre();
        this.isDisabledNext();
    }

    // 分页大小改变
    this.handlePageSizeChange = (e) => {
        this.pageSize = e.target.value;
        this.reDrawNum();
    }

    // 事件监听
    this.initEvent = () => {
        // 上一页
        this.preDom.addEventListener('click', () => {
            if (this.currPage === 1 || this.totalPage === 0) { // 不存在上一页
                return;
            } else { // 存在上一页
                this.handleClickPre();
            }
        });

        // 下一页
        this.nextDom.addEventListener('click', () => {
            if (this.currPage === this.totalPage || this.totalPage === 0) { // 不存在下一页
                return;
            } else { // 存在下一页
                this.handleClickNext();
            }
        });

        // 第n页
        for(let i = 0; i < this.pageNumsDom.length; i++) {
            this.pageNumsDom[i].addEventListener('click', () => {
                if (this.currPage === i + 1) {
                    return;
                } else {
                    this.handleClickNum(this.pageNumsDom[this.currPage - 1], this.pageNumsDom[i], i + 1);
                }
            })
        }

        // 分页大小
        this.selectSizeDom.onchange = this.handlePageSizeChange;
    }
}