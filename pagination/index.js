import { pagination } from './util';

// let data = [
//     'sda',
//     'dsf',
//     'fefe',
//     'fefe',
//     'fefe',
//     'fefe',
//     'fefe',
//     'fefe',
//     'fefe',
//     'fefe',
//     'sda',
//     'dsf',
//     'fefe',
//     'fefe',
//     'fefe',
// ];

// let sourceData = data.concat(data);

const PAGE_CONFIG = {
    pageNum: 1,
    pageSize: 10,
    // sourceData,
}
pagination.init('pagination', PAGE_CONFIG)


