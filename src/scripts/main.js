(function($) {
  var theme = 'classic'; // начальное значение темы


  //обработкчик события нажатия на ссылку в меню
  function setRouting() {
    $("body").on("click", ".nav-link, .dropdown-item, a.content-link", function(e) {
      var link = e.target.getAttribute("href"); //берем аттрибут href ссылки на которую нажали
      if (link) {
        setContent(link); //подгрузаем контент из папки pages
        history.pushState({prev: window.location.pathname}, null, link); // добавляем в истрию браузера переход по ссылке, так как на самом деле перезагрузки страницы нет
        e.preventDefault(); // отменяем дефолтное действие браузера на нажатие ссылки ( т е перезагрузку страницы)
      }
    });
  }

  //загрузка контента из папки pages
  function setContent(link) {
    let contentEl = $("content"); // в элемент контент
    contentEl.load("pages/" + link + ".html", function(text, status, jq) {
      contentEl.hide(); // прячем корневой элемент
      contentEl.fadeIn("slow"); // плавно его показываем для прикольного эффекта
      if(link.replace('/', '') === 'settings') {
        updateFormState(); // если это страница настроек, обновляем инфу о выбранные радиобаттонах (фон и тема)
      }
      if (status === "error") {
        contentEl.load("/pages/404.html"); //если не загрузилось , то показывает 404 страницу
      }
    });
  }

  function updateFormState() {
    // бежим по всем радио баттонам темы и обновляем состояние 
    var themes = $('form').find('input[type="radio"][name="theme"]')
    themes.each(function(index, item){
      var value = item.getAttribute('value');
        item.checked = value === theme;
    })
  }

  function attachFormHandlers() {
    // обработка событий формы

    //выбор картинки
    $("body" ).on("click", ".image-radio", function(e) {
        var $radio = $(this).find('input[type="radio"][name="back"]');
        var checked = !$radio.prop("checked");
        $radio.prop("checked", checked); // селектаем соответствующий радио баттон по нажатию картнки
        syncRadioState(); // обновляем остальные радио баттоны (чтобы убрать селект у других)
        if(checked) {
            var imageSrc = $(this).find('img').attr('src');
            $('body').css('background-image', 'url(' + imageSrc + ')'); // устанавливаем картинку заднего фона
        }
        
        e.preventDefault(); // отменяем дефолтное действие браузера на нажатие радио баттона
      });

      $("body" ).on("click", ".theme-radio", function(e) {
        theme = $(this).find('input').attr('value'); // берез значение темы
        updateFormState(); // бежим по всем радио баттонам темы и обновляем состояние
        setTheme(theme) // устанавливаем
      });


      // обработка нажатия ссылки Назад на страницах с контентом
      $("body").on("click", "a.back", function(e) {
        if(window.history.length && window.history.state) {  // если в истории браузера есть инфа о предыдущей странице window.history.state.prev, то переходим на нее
          setContent(window.history.state.prev)
          window.history.back(); 
        } else {
          history.pushState({}, null, '/'); // если история пуста, то переходим на главную
          setContent('/home')
        }
      });
  }

  function setTheme(theme) {
    $('body').attr('class', theme); // добавляем класс с темой на body
  }

  // добавление\удаление класса выбранного элемента радио баттона
  function syncRadioState() { 
    $(".image-radio").each(function () {
        if ($(this).find('input[type="radio"]')[0].checked) {
          $(this).addClass('image-radio-checked');
        }
        else {
          $(this).removeClass('image-radio-checked');
        }
      });
  }

  //загружаем соответсвующий урлу контент при открытии сайта
  function loadInitialContent(pathname) {
    pathname = pathname.replace("/", "");
    if (pathname === "") {
      pathname = "home";
    }
    setContent(pathname);
  }

  // как только страница прогрузилась выполняем инициализацию 
  $(document).ready(function() {
    setRouting(); // настраиваем роутинг
    attachFormHandlers(); // подписываемся на события
    loadInitialContent(window.location.pathname); // загружаем контент
  });
  
})(jQuery); // самовызываемая функция которая как аргумент принимает jQuery (jQuery подключен в скриптахх в хтмл)
