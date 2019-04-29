(function($){
    function setRouting() {
        $('body').on('click', '.nav-link, .dropdown-item, a.content-link', function(e) {
            var link = e.target.getAttribute('href');
            if(link) {
                console.log(link);
                console.log($)
                $('content').load('pages/' + link + '.html', function(text, status, jq) {
                    console.log(status);
                    if(status === "error") {
                        $('content').load('/pages/404.html');
                    }
                });
                history.pushState({}, null, link);
                e.preventDefault();
            }
            
        })
    }

    function setHomeContent() {
        $('content').load('pages/home.html');
    }

    $(document).ready(function(){
        setRouting();
        setHomeContent();
    })

    
})(jQuery)