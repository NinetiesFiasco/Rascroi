var $armaturaTable,guidCart;
$(()=>{

  var val = location.href.split('/');
  guidCart = val[val.length-1];

  $armaturaTable = $("#armaturaTable");

  fillArmatura();
  

  $("#addArmatura").click(addArmatura);
  $("#redactArmatura").click(updateArmatura);
  $("#getRascroi").click(getRascroi);
});

var getRascroi = ()=>{
  window.location.href = "/orders/rascroi/"+guidCart;
}

var fillArmatura = ()=>{
  
  $.ajax({
    method: "GET",
    url: "/orders/armatura/getByCart/"+guidCart,
    dataType: "json",
    success: (response) => {

      if (0===response.success || response.data.length===0){
        $armaturaTable.html("<div>Ничего не найдено</div>");
        return;
      }

      var data = response.data;
      var table = "";
      if (data.length>0){
        table="<table><thead><tr>";
        table += "<th>GUID</th><th>Дата добавления</th><th>Тип</th><th>Диаметр</th><th>Длина</th><th>Количество</th>";
        table += "<th rowspan='2'>Действия</th></thead><tbody>";
        for (var i=0;i<data.length;i++){
          table +=
          "<tr>"+
            "<td class='guidTD'>"+data[i]._id+"</td>"+
            "<td>"+data[i].dateadd+"</td>"+
            "<td class='typeTD'>"+data[i].type+"</td>"+
            "<td class='thickTD'>"+data[i].thick+"</td>"+
            "<td class='lengthTD'>"+data[i].length+"</td>"+
            "<td class='countTD'>"+data[i].count+"</td>"+
            "<td><input type='button' value='Удалить' class='bDelete' /></td>"+
            "<td><input type='button' value='Редактировать' class='bRedact' /></td>"+
          "</tr>";
        }
        table += "</tbody></table>";
      }
      $armaturaTable.html(table);

      $(".bDelete").click(deleteArmatura);
      $(".bRedact").click(redactArmatura);
      $(".bOpen").click(openArmatura);

    }
  });
}

var addArmatura = function(){
  var newArmatura = {
    type: $("#armaturaType").val(),
    thick: $("#armaturaThickness").val(),
    length: $("#armaturaLength").val(),
    count: $("#armaturaCount").val(),
    guidCart: guidCart
  };

  $.ajax({
    method: "POST",
    url: "/orders/armatura/add",
    data: JSON.stringify(newArmatura),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: (data)=>{
      if (data.success===0)
        alert(data.message);
      else
        fillArmatura();
    }
  });

}

var deleteArmatura = function(){
  var guid = $(".guidTD",$(this).closest("tr")).first().text();

  $.ajax({
    method: "DELETE",
    url: "/orders/armatura/delete/"+guid,
    dataType: "json",
    success: (response) => {
      fillArmatura();
    }
  });
}

var openArmatura = function(){
  var $tr = $(this).closest("tr");
  var guid = $(".guidTD",$tr).first().text();
  window.location.href = "/orders/armatura/"+guid;  
}

var redactArmatura = function(){

  var $tr = $(this).closest("tr");
  var type = $(".typeTD",$tr).first().text();
  var length = $(".lengthTD",$tr).first().text();
  var thick = $(".thickTD",$tr).first().text();
  var count = $(".countTD",$tr).first().text();
  var guid = $(".guidTD",$tr).first().text();


  $("#armaturaGUID").val(guid);
  $("#armaturaTypeR").val(type);
  $("#armaturaThicknessR").val(thick);
  $("#armaturaLengthR").val(length);
  $("#armaturaCountR").val(count);
}

var updateArmatura = function(){

  updateObj = {
    type: $("#armaturaTypeR").val(),
    thick: $("#armaturaThicknessR").val(),
    length: $("#armaturaLengthR").val(),
    count: $("#armaturaCountR").val(),
  }

  $.ajax({
    method: "PUT",
    url: "/orders/armatura/update/"+$("#armaturaGUID").val(),
    data: JSON.stringify(updateObj),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: (data)=>{
      if (data.success===0)
        alert(data.message);
      else
        fillArmatura();
    }
  });
}