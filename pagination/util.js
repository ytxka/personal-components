function Pagination(root, config) {
    this.currPage = 5; // 当前页码
    this.pageSize = config.pageSize || 10; // 分页大小（每页条数）
    this.totalCount = config.totalCount || 0; // 总条数
    this.preText = config.preText || '<';
    this.nextText = config.nextText || '>';
    this.totalPage = Math.ceil(this.totalCount / this.pageSize);

    
    // 页面初始化
    this.initPage = () => {
        let wrap = document.getElementById(root);
        wrap.innerHTML += `<div class="sum">总条数：${this.totalCount}</div>`
        wrap.innerHTML += `<div class="pagination-item pre" id="prePage">${this.preText}</div>`;
        wrap.innerHTML += '<div class="pagination-item pageNum" key="1">1</div>'
        for(let i = 1; i < this.totalPage; i++) {
            wrap.innerHTML += `<div class="pagination-item pageNum" key=${i+1}>${i+1}</div>`
        }
        wrap.innerHTML += `<div class="pagination-item next" id="nextPage">${this.nextText}</div>`;
       
        this.preDom = document.getElementById('prePage');
        this.nextDom = document.getElementById('nextPage'); 
        this.pageNumsDom = document.getElementsByClassName('pageNum');
        
        this.totalPage !== 0 ? 
            this.pageNumsDom[this.currPage - 1].classList.add('active')
            : this.pageNumsDom[0].classList.add('active')
        this.isDisabledPre();
        this.isDisabledNext();
        this.initEvent();
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
        console.log('pre');
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
        console.log('next');
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
    }
}