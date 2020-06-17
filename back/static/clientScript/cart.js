var $cartTable;
$(()=>{
  $cartTable = $("#cartTable");

  fillCart();

  $("#addCart").click(addCart);
  $("#redactCart").click(updateCart);
  
});

var fillCart = ()=>{

  $.ajax({
    method: "GET",
    url: "/orders/getAll",
    dataType: "json",
    success: (response) => {

      if (0===response.success || response.data.length===0){
        $cartTable.html("<div>Ничего не найдено</div>");
        return;
      }

      if (2===response.success || response.data.length===0){
        $cartTable.html("<div>Проблема с SQL</div>");
        return;
      }

      var data = response.data;

      var table="<table>";
      for (var i=0;i<data.length;i++){
        table +=
        "<tr>"+
          "<td class='guidTD'>"+data[i]._id+"</td>"+
          "<td>"+data[i].dateadd+"</td>"+
          "<td class='nameTD'>"+data[i].name+"</td>"+
          "<td class='commentTD'>"+data[i].comment+"</td>"+
          "<td><input type='button' value='Удалить' class='bDelete' /></td>"+
          "<td><input type='button' value='Редактировать' class='bRedact' /></td>"+
          "<td><input type='button' value='Открыть' class='bOpen' /></td>"+
        "</tr>";
      }
      table += "</table>";

      $cartTable.html(table);

      $(".bDelete").click(deleteCart);
      $(".bRedact").click(redactCart);
      $(".bOpen").click(openCart);

    }
  });
}

var addCart = function(){
  var newCart = {
    name: $("#cartName").val(),
    comment: $("#cartComment").val()
  }


  $.ajax({
    method: "POST",
    url: "/orders/add",
    data: JSON.stringify(newCart),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: (data)=>{
      if (data.success===0)
        alert(data.message);
      else
        fillCart();
    }
  });

}

var deleteCart = function(){
  var guid = $(".guidTD",$(this).closest("tr")).first().text();

  $.ajax({
    method: "DELETE",
    url: "/orders/delete/"+guid,
    dataType: "json",
    success: (response) => {
      fillCart();
    }
  });
}

var openCart = function(){
  var $tr = $(this).closest("tr");
  var guid = $(".guidTD",$tr).first().text();
  window.location.href = "/orders/armatura/"+guid;  
}

var redactCart = function(){
  var $tr = $(this).closest("tr");
  var guid = $(".guidTD",$tr).first().text();
  var name = $(".nameTD",$tr).first().text();
  var comment = $(".commentTD",$tr).first().text();

  $("#cartNameR").val(name);
  $("#cartCommentR").val(comment);
  $("#cartGUID").val(guid);
}

var updateCart = function(){

  updateObj = {
    name:$("#cartNameR").val(),
    comment:$("#cartCommentR").val()
  }

  $.ajax({
    method: "PUT",
    url: "/orders/update/"+$("#cartGUID").val(),
    data: JSON.stringify(updateObj),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: (data)=>{
      if (data.success===0)
        alert(data.message);
      else
        fillCart();
    }
  });

}