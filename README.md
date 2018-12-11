# lock-love

Mọi người clone code sau đó import module vào nhé.

- bugs : Sửa một số bug có thể sửa. Đa phần là do thiết lập hệ thống.
- conflict : xuất hiện khá nhiều conflict Mọi người cẩn thận mỏi tay đó :v
- tính nắng: Có thể sửa, add một transaction thông qua host: localhost:4200/test.
- test các address token qua ganache:  truffle console --network ganache >> migrate --reset(reset adress).
                                                                         >> test -->( deployed and test contract in vow/src).
- tính năng chuẩn bị được thêm:
    1. tạo transaction khi nhắn tin .
    2. mỗi khi người dùng tạo tài khoản sẽ hỏi thông tin --> tạo cho người dùng một contract.
    3. Check validate of contract by metamask
