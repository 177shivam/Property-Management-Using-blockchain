pragma solidity 0.5.0;
contract reg {

    struct detail{
        string ownernam;
        string owneri;
        string passcod;
        string proptyp;
        string propaddres;
        string dimensio;
        string propi;
        address add;
    }

    mapping(string => detail) detailprop;
    string[] public apropid;    

    function addproperty(address addr, string memory ownername, string memory ownerid, string memory passcode, string memory proptype, 
        string memory propaddress, string memory dimension, string memory propid) public {
        //var prop = detailprop[propid];
        detailprop[propid].owneri=ownerid;
        detailprop[propid].ownernam=ownername;
        detailprop[propid].passcod=passcode;
        detailprop[propid].proptyp=proptype;
        detailprop[propid].propaddres=propaddress;
        detailprop[propid].dimensio=dimension;
        detailprop[propid].propi=propid;
        detailprop[propid].add=addr;

        apropid.push(propid);
    }

    function propid_search(string memory propid) public view returns(string memory,string memory,string memory,string memory,string memory,string memory,string memory){
        return (detailprop[propid].ownernam,detailprop[propid].owneri,detailprop[propid].passcod,detailprop[propid].proptyp,detailprop[propid].propaddres
        ,detailprop[propid].dimensio,detailprop[propid].propi);
    }

    /*function add_search(string memory add) public view returns(string memory,string memory,string memory,string memory,string memory,string memory,string memory){
        if()
        return (detailprop[propid].ownernam,detailprop[propid].owneri,detailprop[propid].passcod,detailprop[propid].proptyp,detailprop[propid].propaddres
        ,detailprop[propid].dimensio,detailprop[propid].propi);
    }*/

    function transfer(string memory propid, string memory ownername, string memory ownerid ) public {
        require(bytes(detailprop[propid].propi).length!=0);
        detailprop[propid].owneri=ownerid;
        detailprop[propid].ownernam=ownername;}
     
}