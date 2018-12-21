pragma solidity >=0.4.24;


interface IUserList {
    function isAddrRegistered(address _who) external view returns(bool);
    function isNickRegistered(bytes32 _nick) external view returns(bool);
}


contract LockLove {

    struct Promise {
        address formAddress;
        string  formPromise;
        address toAddress;
        string  toPromise;
        //bool  isPrivate;
    }

    struct Pending {
        address formAddress;
        string formPromise;
        address toAddress;
    }
    
    Pending[] public lsPending;
    Promise[] public lsPomise;
    IUserList public userList;

    //Pending -> List like address
    mapping (uint => address[]) public lsLikePending;
     //Address -> Pending ID
    mapping (address => uint[]) public lsPendingOwner;
    //Address -> Promise ID
    mapping (address => uint[]) public lsPromiseOwner;
    //
    event NewPending(address indexed formAddress, string formPromise, address indexed toAddress);
    //
    event NewPromise(address indexed formAddress, string formPromise, address indexed toAddress, string toPromise);
    
    constructor (IUserList _userList) public {
        require(address(_userList) != address(0));
        userList = _userList;
    }

    modifier onlyRegiter {
        require(userList.isAddrRegistered(msg.sender));
        _;
    }

    function setUserList(IUserList _userList) public {
        userList = _userList;
    }

    // Send pending.
    function sentPending(address _toAddress, string memory _formPromise) public onlyRegiter {
        require(msg.sender != _toAddress, "From address must be different with to address!");

        //Create new pending
        Pending memory newPen = Pending(msg.sender, _formPromise, _toAddress);
        uint id = lsPending.push(newPen) - 1;
        //Add ID mapping
        lsPendingOwner[msg.sender].push(id);
        lsPendingOwner[_toAddress].push(id);

        //Rase event new pedding request.
        emit NewPending(msg.sender, _formPromise, _toAddress);
    }

    // Send like pending.
    function sentLikePending(uint index, address _toAddress) public {
        //Add address liker to map
        lsLikePending[index].push(_toAddress);
    }

    // Confirm Pending --> Change to promise
    function sentPromise(uint _index, string memory _toPromise) public onlyRegiter {
        //Confirm Confirm address must be owner response promise!
        uint pendingID = lsPendingOwner[msg.sender][_index];
        Pending storage myPen = lsPending[pendingID];
        require(msg.sender == myPen.toAddress, "Confirm address must be owner response promise!");

        //Create new promise
        Promise memory newPro = Promise(myPen.formAddress, myPen.formPromise, msg.sender, _toPromise);
        //Promise ID mapping to address.
        uint id = lsPomise.push(newPro) - 1;
        lsPromiseOwner[msg.sender].push(id);
        lsPromiseOwner[myPen.formAddress].push(id);

        //Clear Pending which changed to Promise.
        delete lsPending[pendingID];
        //Remove pending in owner pending list.
        removePending(_index, lsPendingOwner[msg.sender]);
        removePending(_index, lsPendingOwner[myPen.formAddress]);

        //Rase event new promise
        emit NewPromise(msg.sender, myPen.formPromise, myPen.toAddress, _toPromise);
    }

    //
    function getOwnerPending() public view returns(address[] memory toList, string memory formPromise) {
        uint len = lsPendingOwner[msg.sender].length;
        uint index = 0;
        bytes memory contentCollector;
        toList = new address[](len);
        for (uint i = 0; i < len; i++) {
            index = lsPendingOwner[msg.sender][i];
            toList[i] = lsPending[index].toAddress;
            contentCollector = abi.encodePacked(contentCollector, lsPending[index].formPromise, ";");//byte(0)
        }
        formPromise = string(contentCollector);
    }

    //
    function getOwnerPromise() public view returns(string memory formPromise, address[] memory toList, string memory toPromise) {
        uint len = lsPromiseOwner[msg.sender].length;
        uint index = 0;
        bytes memory formCollector;
        bytes memory toCollector;
        toList = new address[](len);
        for (uint i = 0; i < len; i++) {
            index = lsPromiseOwner[msg.sender][i];
            toList[i] = lsPomise[index].toAddress;
            formCollector = abi.encodePacked(formCollector, lsPomise[index].formPromise, ";");//byte(0)
            toCollector = abi.encodePacked(toCollector, lsPomise[index].toPromise, ";");//byte(0)
        }
        formPromise = string(formCollector);
        toPromise = string(toCollector);
    }

    //
    function getAllPromise() public view returns(address[] memory fromList, string memory formPromise, address[] memory toList, string memory toPromise) {
        uint len = lsPomise.length;
        bytes memory formCollector;
        bytes memory toCollector;
        toList = new address[](len);
        fromList = new address[](len);
        for (uint i = 0; i < len; i++) {
            toList[i] = lsPomise[i].toAddress;
            fromList[i] = lsPomise[i].formAddress;
            formCollector = abi.encodePacked(formCollector, lsPomise[i].formPromise, ";");//byte(0)
            toCollector = abi.encodePacked(toCollector, lsPomise[i].toPromise, ";");//byte(0)
        }
        formPromise = string(formCollector);
        toPromise = string(toCollector);
    }

    //
    function getAllPending() public view returns(address[] memory fromList, string memory formPromise, address[] memory toList) {
        uint len = lsPending.length;
        bytes memory formCollector;
        // bytes memory toCollector;
        toList = new address[](len);
        fromList = new address[](len);
        for (uint i = 0; i < len; i++) {
            toList[i] = lsPending[i].toAddress;
            fromList[i] = lsPending[i].formAddress;
            formCollector = abi.encodePacked(formCollector, lsPending[i].formPromise, ";");//byte(0)
            // toCollector = abi.encodePacked(toCollector, lsPomise[i].toPromise, ";");//byte(0)
        }
        formPromise = string(formCollector);
        // toPromise = string(toCollector);
    }

    //
    function removePending(uint index, uint[] storage array) internal {
        if (index >= array.length) return;

        for (uint i = index; i < array.length-1; i++) {
            array[i] = array[i+1];
        }
        delete array[array.length-1];
        array.length--;
    }
}