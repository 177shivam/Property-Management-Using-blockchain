App = {
  web3Provider: null,
  contracts: {},
  loading: false,

  init: function() {
    console.log("App initialized...")
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContracts();
  },

  
  initContracts: function() {
    $.getJSON("reg.json", function(regg) {
      App.contracts.reg = TruffleContract(regg);
      App.contracts.reg.setProvider(App.web3Provider);
      return App.render();
    })
  },

  render: function() {
    

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if(err === null) {
        App.account = account;
        $('#accountAddress').html("Your Account: " + account);
      }
    });
  },
  
  addProperty: function(){
    var ownername=$('#ownername').val();
    var ownerid=$('#ownerid').val();
    var propaddress=$('#address').val();
    var dimension=$('#dimension').val();
    var passcode=$('#passcode').val();
    var uniqueid=$('#uniqueid').val();
    var ss = "Build Up";
    if(document.getElementById("Land").checked)
     ss="Land";
    
    console.log(ss);
    App.contracts.reg.deployed().then(function(instance){
      return  instance.addproperty(App.account, ownername,ownerid,passcode,ss,propaddress,dimension ,uniqueid)
      .then(function(result){
      console.log(result);
      App.render();
    });
    });
  },

  searchbypropid:function(){
    var propid = $('#propid').val();
    App.contracts.reg.deployed().then(function(instance){
      return  instance.propid_search.call(propid);
    }).then(function(result){
      console.log(result);
      $('.disp-name').html(result[0]);
      $('.disp-nid').html(result[1]);
      $('.disp-code').html(result[2]);
      $('.disp-type').html(result[3]);
      $('.disp-address').html(result[4]);
      $('.disp-dimension').html(result[5]);
      $('.disp-pid').html(result[6]);
      App.render();
    });
  },

  transferprop:function(){
    var propid = $('#transferpropid').val();
    var ownername = $('#transferowner').val();
    var ownerid = $('#transferid').val();
    App.contracts.reg.deployed().then(function(instance){
      return  instance.transfer(propid,ownername,ownerid);
    }).then(function(result){
      console.log(result);
      App.render();
    });
  },

  addsearch:function(){
    var propid = $('#propid').val();
   /* App.contracts.reg.deployed().then(function(instance){
      return  instance.add_search(propid);
    }).then(function(result){
      console.log(result);
      App.render();
    });*/
  }

}

$(function() {
  $(window).load(function() {
    App.init();
  })
});
