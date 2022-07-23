let todos;

const tmplTodoItem = (id, row) => {
    return `<li>
        <a href="#" class="todo" data-id="${id}">${row}</a>
        <i data-id="$(id)" class="todoCheck fas fa-check"></i>
        <i data-id="${id}" class="todoDelete fas fa-trash"></i>
    </li>`;
};
// -- sayfa yüklendiğinde çalıştırılacak işlemler. -- //
$(document).ready(function(){
    //-- localStorage'de todos adında dizi değişken var ise JSON formatına çevirip eşitliyor. -- //
    //-- localStorage'de todos adında dizi değişken yok ise yeni bir dizi değişkene eşitliyor. -- //
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    // -- todos elemanlarını teker teker sayfaya ekliyor. -- //
    $.each(todos, function(index, row){
        $("#list").prepend(tmplTodoItem(index, row));
    });
    
});
// -- todo ekleme butonuna tıkladığında yapılacak işlemler. -- //
$("#btn-add").click(function(){
    // -- inputtaki değeri aldık. -- //
    let value = $("#input-add").val();
    // -- Eğer input elemanının değeri yoksa, boşsa alert ile ekrana hata mesajı veriyoruz. -- //
    if(value == ""){
        alert("Lütfen boş bırakmayınız!");
    }
    // -- eğer input elemanında bir değer varsa aşağıdaki işlemlerden devam ediyoruz. -- //
    else{
    // -- todos dizi değişkenine ekledik. -- //
    todos.push(value);
    // -- localStorage'i güncelledik. -- //
    localStorage.setItem('todos', JSON.stringify(todos));
    // -- listenin elemanlarının geldiği alanı temizledik. -- //
    $('#list').empty();
    // -- todos elemanlarını ekrana basıyoruz. -- //
    $.each(todos, function(index, row){
        $("#list").prepend(tmplTodoItem(index, row));
    });
    // -- inputun elemanının değerini sıfırlıyoruz. -- //
    $("#input-add").val('');}
    }
    
,);
/* -- todo'nun kendisine tıklandığında yapılacak işlemler, burada on kullanılmasının nedeni <li> taglarının siteye canlı bir
şekilde eklenmesi, ancak bu şekilde erişilebiliyoruz. -- */
$(document).on('click', '.todo', function(e){
    // -- a tag'nın çalışmasını engelledik . -- //
    e.preventDefault();
    // -- todo'nun todos dizi değişkeni içersindeki id'sini alıyoruz, daha öncesinde döngüde yazmıştık (data-id) -- //
    let ID = $(this).attr('data-id');
    // -- alert içersine yazıyoruz. -- //
});
/* -- todoyu silmek için çöp kutusu simgesine tıklandığında yapılacak işlemler, burada on kullanılmasının nedeni <li> taglarını siteye canlı bir
şekilde eklenmesi, ancak bu şekilde erişilebiliyoruz. -- */
$(document).on('click', '.todoDelete', function(){
    
    // -- todo'nun todos dizi değişkeni içersindeki id'sini alıyoruz, daha öncesinde döngüde yazmıştık (data-id) -- //
    let ID = $(this).attr('data-id');
    // -- diziden todo'yu silme işlemini yapıyoruz. -- //
    todos.splice(ID, 1);
    // -- localStorage'i güncelledik. -- //
    localStorage.setItem('todos', JSON.stringify(todos));
    // -- listenin elemanlarının geldiği alanı temizledik. -- //
    $('#list').empty();
    // -- todos elemanlarını ekrana basıyoruz. -- //
    $.each(todos, function(index, row){
        $("#list").prepend(tmplTodoItem(index, row));
    });
});
$(document).on('click', '.todoCheck', function(){
    $(this).parent('li').toggleClass('checked');
})
// -- tüm todoları silmek için yapılan işlemler. -- //
$('#btn-delete-all').click(function(){
    // -- todos dizi yeni bir diziye eşitleyerek boş bir dizi elde ediyoruz. -- //
    todos = [];
    // -- localStorage'i güncelledik. -- //
    localStorage.setItem('todos', JSON.stringify(todos));
    // -- listenin elemanlarının geldiği alanı temizledik. -- //
    $('#list').empty();
    // -- todos elemanlarını ekrana basıyoruz. -- //
    $.each(todos, function(index, row){
        $("#list").prepend(tmplTodoItem(index, row));
    });
});