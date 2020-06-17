const {
  client,
  ObjectID
} = require('../../dbConfig/mongo.js');

const Collection = client().db("RaskroiAccount").collection("Armatura");

var groupper = function(data){
  var groupped = [];

  for (var i=data.length-1;i>=0;i--){
    var group = false;
    for (var j=0;j<groupped.length;j++){
      if(data[i].type==groupped[j].type && data[i].thick==groupped[j].thick){
        for (var z=0;z<data[i].count;z++)
          groupped[j].items.push(data[i].length)
        group = true;
      }
    }
    if (!group){
      var tmp={
        type: data[i].type,
        thick: data[i].thick,
        items: []
      }
      for (var j=0;j<data[i].count;j++)
        tmp.items.push(data[i].length);

      groupped.push(tmp);
    }
  }

  return groupped;
}

var CollectObj = function(){
  return {
  total: 0,
  leave: 0,
  count: 1,
  arr: [],
  refresh: function(){
    this.total = 0;
    this.arr = [];
  },
  test: function(length, total){    
    return this.total+parseInt(length)<=total;
  },
  push: function(length){
    this.total += parseInt(length);
    this.arr.push(length);
  },
  Leave: function(total){
    this.leave = total - this.total;
  },
  Sort: function(){
    this.arr.sort((a,b)=>b-a);
  }
}};

var simpleRascroi = function(data,total){
  for (var z = 0;z<data.length;z++){
    
    var collectObj = new CollectObj();
    var cur = data[z];
    cur.rascroi = [];

    for (var i=0;i<cur.items.length;i++){
      if (collectObj.test(cur.items[i],total))
        collectObj.push(cur.items[i]);
      else{
        collectObj.Leave(total);
        collectObj.Sort();
        cur.rascroi.push(collectObj);        
        collectObj = new CollectObj();
        collectObj.push(cur.items[i]);
      }
    }

  }

  return data;
}

var groupRascroi = function(data){
  for (var z = 0; z < data.length; z++){
    cur=data[z];
    for (var i = 0; i < cur.rascroi.length; i++){
      for (var j = cur.rascroi.length-1; j > i;j--)
        if (cur.rascroi[i].arr.length===cur.rascroi[j].arr.length){
          var arr1 = cur.rascroi[i].arr, arr2 = cur.rascroi[j].arr;
          var test = true;
          for (var k = 0;k<arr1.length;k++)
            if (arr1[k]!==arr2[k]){
              test = false
              break;
            }
          if (test){
            cur.rascroi[i].count++;
            cur.rascroi.splice(j,1);
          }
        }
    }

  }

  return data;

}


var getByCart = (id,callBack) => {
  Collection.find({"guidCart":id}).toArray(function(err, results){

    var groupped = groupper(results);

    var rascroi = simpleRascroi(groupped,12000);

    var grouppedRascroi = groupRascroi(rascroi);

    // Объединить одинаковый раскрой 
    // остаток вывести в процент

    return callBack(err,grouppedRascroi);
  });
}

module.exports = {
  getByCart: getByCart
};