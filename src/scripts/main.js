(function($){
    function setRouting() {
        $('body').on('click', '.nav-link, .dropdown-item, a.content-link', function(e) {
            var link = e.target.getAttribute('href');
            if(link) {
                console.log(link);
                console.log($)
                setContent(link);
                history.pushState({}, null, link);
                e.preventDefault();
            }
            
        })
    }

    function setContent(link) {
        $('content').load('pages/' + link + '.html', function(text, status, jq) {
            console.log(status);
            if(status === "error") {
                $('content').load('/pages/404.html');
            }
        });
    }

    function loadInitialContent(pathname) {
        pathname = pathname.replace('/', '')
        if(pathname === '') {
            pathname = 'home';
        }
        setContent(pathname);
    }

    $(document).ready(function(){
        setRouting();
        loadInitialContent(window.location.pathname);
    })

    
})(jQuery)